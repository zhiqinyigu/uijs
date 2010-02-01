if(typeofSina=="undefined") {
	Sina={
	}
}Sina.pkg=function (ns) {
	if(!ns||!ns.length) {
		return null
	}var levels=ns.split(".");	var nsobj=Sina;
	for(var i=(levels[0]=="Sina")?1:0;i<levels.length;++i) {
		nsobj[levels[i]]=nsobj[levels[i]]||{
		};
		nsobj=nsobj[levels[i]]
	}return nsobj
};function $E(oID) {
	var node=typeofoID=="string"?document.getElementById(oID):oID;
	if(node!=null) {
		return node
	}else {
	}return null
}function $C(tagName) {
	return document.createElement(tagName)
}function $N(name) {
	return document.getElementsByName(name)
}function $G() {
}function $G2() {
}function v5SendLog() {
}try{
	document.execCommand("BackgroundImageCache",false,true)
}catch(e) {
}(function () {
	var funcName="trace";
	var _traceList=[];
	var _startTime=new Date().valueOf ();
	var _curTime=new Date().valueOf ();
	var _runTime;
	var _trace=function (sText,oOption,sBgColor) {
		oOption=oOption||{
		};
		if(typeofoOption=="string") {
			oOption={
				"color":oOption
			};
			if(typeofsBgColor!="undefined"&&typeofsBgColor=="string") {
				oOption.bgColor=sBgColor
			}
		}_traceList[_traceList.length]=[sText,oOption]
	};
	var _traceError=function (oError) {
		_trace(oError,{
			"color":"#F00"
		})
	};
	_trace.error=_traceError;
	_trace.traceList=_traceList;
	_trace.toString =function () {
		return "Trace调试已关闭"
	};
	window[funcName]=_trace;
	window.traceError=_traceError
})();
Sina.pkg("Core");
if(typeofCore=="undefined") {
	Core=Sina.Core
}Sina.pkg("Core.Array");
Core.Array.each=function (ar,insp) {
	var r=[];
	for(var i=0;i<ar.length;i++) {
		var x=insp(ar[i],i);
		if(x!==null) {
			r.push(x)
		}
	}return r
};function Jobs() {
	this._jobTable=[]
}Jobs.prototype={
	_registedJobTable:{
	},initialize:function () {
	},_registJob:function (jobName,rel) {
		this._registedJobTable[jobName]=rel
	},add:function (jobName) {
		this._jobTable.push(jobName)
	},start:function () {
		var jobs=this._jobTable;
		var regJobs=this._registedJobTable;
		var i=0;
		var joblen=this._jobTable.length;
		var getTime=function () {
			return new Date().valueOf ()
		};
		var interNum=window.setInterval(function () {
			if(i>=joblen) {
				clearInterval(interNum);
				return
			}var jobName=jobs[i];
			var job=regJobs[jobName];
			i++;
			if(typeofjob=="undefined") {
				trace("<b>Job["+jobName+"] is undefiend!!!</b>",{
					"color":"#900","bgColor":"#FFF;"
				});
				return
			}var _try=true;
			var _start=getTime();
			try{
				job.call()
			}catch(e) {
				trace("<b>Job["+jobName+"] failed!!!</b>",{
					"color":"#900","bgColor":"#666;"
				});
				traceError(e);
				_try=false
			}finally{
				if(_try) {
					var _end=getTime();
					trace("<b>Job["+jobName+"] done in "+(_end-_start)+"ms.</b>",{
						"color":"#0F0","bgColor":"#666;"
					})
				}
			}
		},10)
	},call:function (jobName,args) {
		if(typeofthis._registedJobTable[jobName]!="undefined") {
			this._registedJobTable[jobName].apply(this,args)
		}else {
			trace("<b>Job["+jobName+"] is undefined!!!</b>",{
				"color":"#900","bgColor":"#FFF;"
			})
		}
	}
};
$registJob=function (name,rel) {
	Jobs.prototype._registJob(name,rel)
};
$callJob=function (name) {
	var args=[];
	if(arguments.length>1) {
		Core.Array.foreach(arguments,function (v,i) {
			args[i]=v
		});
		args.shift()
	}Jobs.prototype.call(name,args)
};
if(typeofApp=="undefined") {
	var App={
	}
}$SYSMSG.extend({
	"A00005":"test2","A00006":"操作成功.","M00001":"你提交的内容格式不正确.","M00002":"系统繁忙，请稍后再试。","M00003":"你尚未登录或登录已过期，请重新登录。","M00004":"系统繁忙，请稍后再试。","M00005":"发表内容被暂时锁定，通过审核后将被公开显示。由此带来的不便，我们深感抱歉。","M00006":"请不要发表违法和不良信息！","M00007":"IP访问受限。","M00008":"你使用的帐号或者IP发表微博过于频繁，已被锁定，请过几天再来发微博。","M00009":"参数错误","M00901":"请输入登录名","M00902":"请输入密码","M00903":"你输入的登录名与密码不匹配。","M00904":"你导入的联系人为空。","M00905":"你导入的联系人为空。","M00906":"你在新浪博客还没有好友和关注人。","M00907":"没有找到新浪博客的好友。","M00908":"添加关注失败。","M00909":"真遗憾，你导入的MSN联系人暂时没人加入新浪微博。","M00910":"真遗憾，你导入的邮箱联系人暂时没人加入新浪微博。","M00911":"你导入的新浪联系人还没人加入新浪微博，赶快去邀请他们吧。","M00912":"关注成功","M00913":"你的邀请已发送成功。","M00914":"你的新浪博客好友还没有人加入新浪微博。","M00915":"你在博客关注的人还没有人加入新浪微博","M00916":"你的新浪博客好友都已经被你关注了！","M00917":"你在新浪博客关注的人都已经被你在微博关注了！","M00918":"没有找到你在新浪博客关注的人。","M00919":"没有找到你在新浪博客的好友","M00920":"该用户已经注册了新浪微博","M00921":"已经给该邮箱发送了邀请","M00922":"邮件发送失败","M00923":"你的邀请名额已用完","M01001":"还没有开始微博呢，敬请期待。","M01002":"你填写的个人资料还不全。","M01003":"还没有经过我们的向导。","M01004":"会员编号不正确。","M01005":"你输入的昵称格式不正确。","M01006":"请选择","M01007":"请选择省份","M01008":"请设置所在地。","M01100":"请输入昵称","M01101":"请输入4个字母以上的昵称","M01102":"昵称不能超过20个字母或10个汉字","M01103":"含有非法字符，请修改","M01104":"请设置性别。","M01105":"请设置性别。","M01106":"请输入正确的邮箱地址。","M01107":"请上传jpg、gif格式的图片。","M01108":"请上传文件大小不超过5M的图片。","M01109":"保存失败，请重试。","M01110":"密码长度不正确，应为6～16个字符。","M01111":"密码格式不正确。","M01112":"密码错误","M01113":"密码中含有非字母和数字的字符，请重新输入","M01114":"两次输入的密码不一致，请重新输入。","M01115":"个性化域名输入不正确，请使用长度为4～20个字符的数字或者字母。","M01116":"个性化域名输入不正确，请使用长度为4～20个字符的数字或者字母。","M01117":"你输入的个性化域名不能修改。","M01118":"你输入的这个域名已经存在，请更换。","M01119":"你输入的个人简介不能超过70个字。","M01120":"含有非法字符，请修改","M01121":"你输入的个性化域名格式不正确。","M01122":"很抱歉，你输入的博客地址无法关联，请更换。","M01123":"请输入正确的QQ号","M01124":"你输入的QQ号码长度不能超过64个字符。","M01125":"你输入的MSN账号长度不能超过64个字符。","M01126":"请输入正确的MSN地址","M01127":"请输入正确的博客地址。","M01128":"昵称不能全是数字","M01129":"昵称已经存在，请更换一个。","M01130":"邀请码不正确","M01131":"请输入邀请码","M01132":"很抱歉！你目前还不是新浪博客7.0用户，无法添加此模块。","M01133":"请输入正确的身份证号码","M01134":"请输入正确的身份证号码","M01135":"请输入真实姓名","M01136":"请输入真实姓名","M01137":"修改昵称需要重新申请名人认证。","M01138":"一旦修改昵称，需要重新申请名人认证，请确认是否修改？","M01139":"请输入正确的学校，限制在25字以内","M01140":"请输入正确的学校","M01141":"最多可以输入70字以内的备注","M01142":"请输入正确的单位名称，限制在25字以内","M01143":"请输入正确的单位名称","M01144":"请输入正确的毕业年份","M01145":"请输入正确的离职年份","M01146":"最多只能添加15个学校","M01147":"最多只能添加15个职业信息","M01148":"请输入1到14个字符长度的标签","M01149":"含有非法字符，请修改","M01150":"含有非法字符，请修改","M01151":"最多可添加20个标签","M01152":"请上传文件大小不超过2M的图片。","M01153":"请输入正确的Gtalk地址","M01154":"请输入正确的UC号","M02001":"此条微博不存在或被隐藏。","M02002":"此条微博不存在或被隐藏。","M02003":"发消息间隔时间太短，请稍候再试。","M02004":"你的等级不够3级，不要耍小聪明，没用的！","M02005":"你发表的内容已经提交，请耐心等待管理员审核，请不要重复提交，谢谢！","M02006":"你发表的评论已经提交，请耐心等待管理员审核，请不要重复提交，谢谢！","M02007":"评论成功","M02008":"回复成功","M02009":"抱歉，您暂时无法发表微博文章。 如有问题，请您致电新浪客服咨询，电话95105670，谢谢。","M02010":"抱歉，您无法对此条微博进行评论。如有问题，请您致电新浪客服咨询，电话95105670，谢谢。","M02011":"本微博转发已关闭。","M02012":"本微博评论已关闭。","M02013":"抱歉，您暂时还不能关注此用户。如有问题，请您致电新浪客服咨询，电话95105670，谢谢。","M02014":"你已超过最高发布频率，从超过频率开始的2小时内不能提交发布。","M02015":"你已超过最高发布频率，从超过频率开始的24小时内不能提交发布。","M02016":"你使用的帐号或者IP操作过于频繁，已被锁定若干小时。如需帮助，请拨打电话95105670。","M04001":"你已经收藏100个话题啦，先取消几个吧","M04002":"关键词不能为空","M04003":"收藏话题失败","M05001":"你不能关注自己。","M05002":"你的关注人数已达到上限。","M05003":"由于批量添加的数量超过了上限，只关注了部分用户。","M05004":"请先关注再设置备注名称！","M05005":"请输入备注","M05006":"备注长度不正确，应为0～16个字符。","M05007":"备注不能超过16个字母或8个汉字。","M05008":"含有非法字符，请修改","M06000":"你还没有绑定手机。","M06001":"请绑定手机。","M06002":"你已成功绑定手机。","M06003":"你输入的手机号不正确。","M06004":"你已成功绑定手机。","M06005":"该手机号已被他人绑定，请检查号码是否正确。","M06006":"参数不正确！","M07001":"你还没有填写内容，请填写后提交。","M07002":"图片上传失败！","M07003":"请上传文件大小不超过5M的图片。","M07004":"请上传jpg、gif、png格式的图片。","M07005":"由于用户设置，你无法进行评论。","M08001":"确定要删除与#{name}之间的所有对话？","M08002":"确定要删除该条对话？","M08003":"确认删除通知？","M08004":"还没有选择要删除的通知","M09001":"收件人不存在","M09002":"请不要给自己发送私信","M09003":"私信发送成功","M09004":"他还没有关注你，暂时不能发私信给他哦！","M09005":"她还没有关注你，暂时不能发私信给她哦！","M10001":"已收藏过该微博！","M11001":"微博模块添加成功","M11002":"添加失败，请重试！","M12001":"未绑定MSN。","M12002":"已绑定MSN。","M12003":"此MSN帐号已被其他微博帐号绑定。","M12004":"此GTALK账号已被其他微博账号绑定。","M12005":"此UC号已被其他微博账号绑定。","M12101":"超过20个字符啦~输个常用名吧！","M12102":"含有非法字符，请修改","M13001":"根据对方的设置，你不能进行此操作。","M13002":"你已经把此用户加入黑名单，加关注前请先解除。","M13003":"不能将系统用户加入黑名单。","M14001":"请输入链接","M14002":"此链接地址没有识别出相应的音频。 ","M14003":"歌曲的名字不能为空！","M14004":'没有找到名字为"我等到花儿也谢了"的歌曲，换个词再试一下:)',"M14005":"mp3链接!","M14006":"暂时不支持新浪播客/优酷网/土豆网专辑播放链接","M14007":"你输入的链接地址无法识别:)","M14008":"此分组名已存在","M14009":"创建新分组失败","M14010":"请不要超过8个汉字","M14011":"创建的分组数目不能大于20个！","M14012":"你还没有关注他/她，不能加入分组。","M14013":"已经抢了5个沙发啦～休息一下，#{time}再来吧！","M14014":"请输入分组名","M14015":"已经把该联系人加入分组，不能重复加入。","M14016":"#{name}已经在当前分组啦","MR0001":'请输入常用邮箱，<a href="/reg_sinamail.php">没有邮箱？</a>',"MR0002":"请输入正确的邮箱地址。","MR0003":"请输入你的常用邮箱，如：example@example.com<br />它将成为你未来的登录账号","MR0004":'你可以用此邮箱<a href="#" onclick="App.ModLogin();return false;">登录</a>哦！',"MR0005":'该邮箱地址已被注册，尝试<a href="#" onclick="App.ModLogin();return false;">登录？</a>',"MR0006":'该邮箱地址已被注册，尝试<a href="#" onclick="App.ModLogin();return false;">登录？</a>',"MR0010":"含有不是字母和数字的字符，请修改。","MR0011":"只能6-16位密码，请修改。","MR0012":"密码由6-16位，字母、数字、半角“.”、“-”、“?”和下划线组成","MR0020":"两次输入的密码不一致，请修改。","MR0021":"请再次输入密码","MR0030":"可输入4-20位，包含英文、数字和中文","MR0031":"请输入昵称。","MR0032":"请输入4个字母以上的昵称。","MR0033":"昵称不能超过20个字母或10个汉字。","MR0034":"含有非法字符，请修改。","MR0035":"昵称不能全是数字，请修改。","MR0036":"昵称已被他人使用，请修改。","MR0040":"请选择省份","MR0050":"请输入验证码","MR0060":"请输入注册邀请码","MR0061":"请输入注册邀请码","MR0062":"邀请码不正确","MR0063":"邀请码已过期","MR0070":"邀请码已过期","MR0071":"需要同意《新浪网络服务使用协议》","MR0100":"请输入邮箱名","MR0101":"请输入正确的用户名","MR0102":"只能输入4-16位，请修改","MR0103":"该邮箱名已被注册了，换一个吧","MR0104":"请选择密码查询问题","MR0105":"4-16位之间，请用英文小写、数字、下划线","MR0106":"4-32个字母（支持大小写）、数字或2-16个汉字","MR0107":"请输入密码查询问题","MR0108":"只能输入4-32个字符，请修改","MR0109":"只能输入中文和字母，请修改","MR0110":"请输入6-80个数字、字母或3-40个汉字","MR0111":"请输入6-80个数字、字母或3-40个汉字","MR0112":"邮箱名已经存在","MR0113":"请输入6-80位字符，请修改","MR0114":"只能输入中文和字母，请修改","MR0115":"密码找回答案不能和问题相同","MR0116":"请输入密码找回答案","MR0117":"邮箱名不能全为数字，请修改","MR0118":"请去掉邮箱名首尾的下划线","MR0119":"邮箱名不能包含空格","R00041":"当前资料尚未保存.修改其他项目将导致当前正在编辑的资料丢失，是否继续？","R00042":"确认是否删除此学校信息","R00043":"确认是否删除此工作信息 ","R00044":"请输入名称，25个字内","R00045":"可以填写学院，班级，系别等信息，70字以内","R00046":"可以填写部门、组别、职位等信息，70字以内","R01001":"昵称请使用4～20个字符的中文或字母，不要含有空格","R01002":"例如demo@sina.com.cn","R01003":"例如17006666","R01004":"例如demo@hotmail.com","R01005":"请不要超过70个字。","R01006":"字母有大小写之分，6—16位，限用英文(A-Z,a-z)、数字(0-9)、半角“.”、“-”、“?”和下划线。 ","R01007":"请输入证件号码","R01008":"该邮箱已经注册","R01101":"请输入证件号码，保存后不可修改","R01102":"请填写真实姓名，方便我们联系你。你的资料不会透露给任何人。","R01404":"系统繁忙","R01405":"请输入正确的邮件地址","R01406":"该用户已激活或还未登录","R01407":"邮件重发失败","R01408":"您输入的两次密码不一样呀！","R01409":"您输入的验证码有错误！","R01410":"邮箱应为5－64位","R01411":"缺失符号@","R01412":"邮箱应为非新浪邮箱","R01413":"邮箱格式不合法","R01414":"密码中的下划线不能在最后","R01415":"真实姓名应为4－16位","R01416":"真实姓名只能由汉字，点和英文字母组成","R01417":"证件类型不正确","R01418":"证件号应为3－20位","R01419":"身份证输入不正确","R01420":"证件号码不能含有怪字符","R01421":"含有非法字符，请修改","R01422":"超过20个字符啦~输个常用名吧！","R01423":"邮箱名不能为空","R01424":"邮箱名已经存在","R01425":"只能输入4-16位，请修改","R01426":"邮箱名必须是英文小写、数字、下划线组成","R01427":"邮箱名不能以下划线开始或结束","R01428":"邮箱名不能全为数字，请修改","R01429":"提示问题错误","R01430":"问题答案不能与问题相同","R01431":"问题答案只能输入6-80个字符，请修改 ","R01432":"问题答案只能输入中文和字母，请修改","R01433":"问题长度应在4-32个字节之间","R01434":"问题不能包含特殊字符","R01435":"密码提示答案不能以空格、下划线开始或结束","R01436":"密码提示问题不能以空格、下划线开始或结束","R01437":"邮箱名不合法","M14017":"最多可输入500个汉字"
});
$SYSMSG.extend({
	"R01007":"<p class=stxt2>1、如果登录名是邮箱地址，</p><p class=stxt>请输入全称，例如yourname@sina.com.cn</p><p class=stxt2>2、请检查登录名大小写是否正确。</p><p class=stxt2>3、请检查密码大小写是否正确。</p>","R01008":"邮箱/UC号/会员帐号/手机号","CR0001":"请输入手机号","R01009":"请输入注册邀请码","M04002":"关键词不能为空","R01010":"<p class=stxt2>请到注册确认邮件中激活账户，</p><p class=stxt2>或者，<a target=_blank href=/reg/resend.php?user=#{mail}  >重发确认邮件</a>。</p>","R01011":"该账户尚未激活"
});
Sina.pkg("Core.Events");
Core.Events.addEvent=function (elm,func,evType,useCapture) {
	var _el=$E(elm);
	if(_el==null) {
		trace("addEvent 找不到对象："+elm);
		return
	}if(typeofuseCapture=="undefined") {
		useCapture=false
	}if(typeofevType=="undefined") {
		evType="click"
	}if(_el.addEventListener) {
		_el.addEventListener(evType,func,useCapture);
		return true
	}else {
		if(_el.attachEvent) {
			var r=_el.attachEvent("on"+evType,func);
			return true
		}else {
			_el["on"+evType]=func
		}
	}
};Core.Events.removeEvent=function (oElement,fHandler,sName) {
	var _el=$E(oElement);
	if(_el==null) {
		trace("removeEvent 找不到对象："+oElement);
		return
	}if(typeoffHandler!="function") {
		return
	}if(typeofsName=="undefined") {
		sName="click"
	}if(_el.addEventListener) {
		_el.removeEventListener(sName,fHandler,false)
	}else {
		if(_el.attachEvent) {
			_el.detachEvent("on"+sName,fHandler)
		}
	}fHandler[sName]=null
};
Sina.pkg("Core.Base");
(function () {
	var Detect=function () {
		var ua=navigator.userAgent.toLowerCase();
		this.$IE=/msie/.test(ua);
		this.$OPERA=/opera/.test(ua);
		this.$MOZ=/gecko/.test(ua);
		this.$IE5=/msie5/.test(ua);
		this.$IE55=/msie5.5/.test(ua);
		this.$IE6=/msie6/.test(ua);
		this.$IE7=/msie7/.test(ua);
		this.$SAFARI=/safari/.test(ua);
		this.$winXP=/windowsnt5.1/.test(ua);
		this.$winVista=/windowsnt6.0/.test(ua);
		this.$FF2=/Firefox\/2/i.test(ua)
	};
	Core.Base.detect=new Detect()
})();
Core.Events.getEvent=function () {
	return window.event
};
if(!Core.Base.detect.$IE) {
	Core.Events.getEvent=function () {
		if(window.event) {
			return window.event
		}var o=arguments.callee.caller;
		var e;
		var n=0;
		while(o!=null&&n<40) {
			e=o.arguments[0];
			if(e&&(e.constructor ==Event||e.constructor ==MouseEvent)) {
				return e
			}n++;
			o=o.caller
		}return e
	}
}Core.Events.stopEvent=function (el) {
	var ev=el?el:Core.Events.getEvent();
	ev.cancelBubble=true;
	ev.returnValue=false
};
if(!$IE) {
	Core.Events.stopEvent=function (el) {
		var ev=el?el:Core.Events.getEvent();
		ev.preventDefault();
		ev.stopPropagation()
	}
}Core.Events.fixEvent=function (e) {
	if(typeofe=="undefined") {
		e=window.event
	}if(!e.target) {
		e.target=e.srcElement;
		e.pageX=e.x;
		e.pageY=e.y
	}if(typeofe.layerX=="undefined") {
		e.layerX=e.offsetX
	}if(typeofe.layerY=="undefined") {
		e.layerY=e.offsetY
	}return e
};
Sina.pkg("Core.Dom");
Core.Dom.opacity=function (elm,value) {
	elm=$E(elm);
	elm.style.filter="alpha(opacity="+value+")";
	elm.style.opacity=value/100
};
Core.Dom.getElementsByClass=function (el,tg,clz) {
	el=el||document;
	var rs=[];
	clz=" "+clz+" ";
	var cldr=el.getElementsByTagName(tg),len=cldr.length;
	for(var i=0;i<len;++i) {
		var o=cldr[i];
		if(o.nodeType==1) {
			var ecl=" "+o.className+" ";
			if(ecl.indexOf(clz)!=-1) {
				rs[rs.length]=o
			}
		}
	}return rs
};
Core.Dom.byClz=Core.Dom.getElementsByClass;
Sina.pkg("Utils");
if(typeofUtils=="undefined") {
	Utils=Sina.Utils
}Sina.pkg("Core.Function");
Core.Function.bind2=function (fFunc,object) {
	var __method=fFunc;
	return function () {
		return __method.apply(object,arguments)
	}
};Function.prototype.bind2=function (object) {
	var __method=this;
	return function () {
		return __method.apply(object,arguments)
	}
};
Core.Array.foreach=function (ar,insp) {
	if(ar==null&&ar.constructor !=Array) {
		return []
	}var i=0,len=ar.length,r=[];
	while(i<len) {
		var x=insp(ar[i],i);
		if(x!==null) {
			r[r.length]=x
		}i++
	}return r
};Utils.Template=function (tmpl) {
	this.tmpl=tmpl;
	this.pattern=/(#\{(.*?)\})/g
};Utils.Template.prototype={
	evaluate:function (data) {
		return this.tmpl.replace(this.pattern,function () {
			return data[arguments[2]]||""
		})
	},evaluateMulti:function (data,reverse) {
		var _buffer=[];
		Core.Array.foreach(data,Core.Function.bind2(function (v,i) {
			i=reverse?data.length-i:i;
			_buffer[i]=this.evaluate(v)
		},this));
		return _buffer.join("")
	}
};
Sina.pkg("Core.System");
Core.System.winSize=function (_target) {
	var w,h;
	if(_target) {
		target=_target.document
	}else {
		target=document
	}if(self.innerHeight) {
		if(_target) {
			target=_target.self
		}else {
			target=self
		}w=target.innerWidth;
		h=target.innerHeight
	}else {
		if(target.documentElement&&target.documentElement.clientHeight) {
			w=target.documentElement.clientWidth;
			h=target.documentElement.clientHeight
		}else {
			if(target.body) {
				w=target.body.clientWidth;
				h=target.body.clientHeight
			}
		}
	}return {
		width:w,height:h
	}
};
Core.System.pageSize=function (_target) {
	if(_target) {
		target=_target.document
	}else {
		target=document
	}var _rootEl=(target.compatMode=="CSS1Compat"?target.documentElement:target.body);
	var xScroll,yScroll;
	if(window.innerHeight&&window.scrollMaxY) {
		xScroll=_rootEl.scrollWidth;
		yScroll=window.innerHeight+window.scrollMaxY
	}else {
		if(_rootEl.scrollHeight>_rootEl.offsetHeight) {
			xScroll=_rootEl.scrollWidth;
			yScroll=_rootEl.scrollHeight
		}else {
			xScroll=_rootEl.offsetWidth;
			yScroll=_rootEl.offsetHeight
		}
	}var win_s=Core.System.winSize(_target);
	if(yScroll<win_s.height) {
		pageHeight=win_s.height
	}else {
		pageHeight=yScroll
	}if(xScroll<win_s.width) {
		pageWidth=win_s.width
	}else {
		pageWidth=xScroll
	}return [pageWidth,pageHeight,win_s.width,win_s.height]
};
Core.System.getScrollPos=function (oDocument) {
	oDocument=oDocument||document;
	var dd=oDocument.documentElement;
	var db=oDocument.body;
	return [Math.max(dd.scrollTop,db.scrollTop),Math.max(dd.scrollLeft,db.scrollLeft),Math.max(dd.scrollWidth,db.scrollWidth),Math.max(dd.scrollHeight,db.scrollHeight)]
};
App.Dialog={
};
App.Dialog.BasicDialog=function (title,content,cfg) {
	this._node=$C("div");
	document.getElementsByTagName("BODY")[0].appendChild(this._node);
	var tpl={
		title:title?title:"BasicDialog",content:content?content:"......"
	};
	var tt=this._node.style;
	tt["position"]="absolute";
	tt["visibility"]="hidden";
	if(!cfg) {
		cfg={
		}
	}if(cfg.zIndex) {
		tt["zIndex"]=cfg.zIndex
	}if(cfg.hidden) {
		tt["visibility"]="hidden"
	}var str='<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxTop"><div class="topCon"><strong>#{title}</strong><a href="javascript:;" class="close"></a><div class="clear"></div></div></div><div class="layerBoxCon">#{content}</div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    <tbody></table>';
	var tmp=new Utils.Template(str);
	this._node.innerHTML=tmp.evaluate(tpl);
	this._node_body=Core.Dom.getElementsByClass(this._node,"DIV","layerBoxCon")[0];
	this.setSize(cfg.width,cfg.height);
	this._btn_close=this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1];
	this._node_title=this._btn_close.previousSibling;
	this._btn_close.parent=this;
	this._btn_close.onclick=function () {
		Core.Events.stopEvent();
		if(cfg.hiddClose) {
			this.parent.hidd()
		}else {
			this.parent.close()
		}
	};
	this._btn_close.onmousedown=function () {
	};
	this._btn_move=this._btn_close.parentNode.parentNode;
	this._btn_move.parent=this;
	this._btn_move.onmousedown=function () {
		var evt=Core.Events.fixEvent(Core.Events.getEvent());
		this.parent._ondrag=true;
		this.offsetx=evt.layerX;
		this.offsety=evt.layerY
	};
	this._btn_move.style["cursor"]="pointer";
	var self=this;
	this._btn_move.mousemoveHandler=function () {
		self._mousemoveHandler()
	};
	this._btn_move.mouseupHandler=function () {
		self._mouserupHandler()
	};
	this._btn_move.resize=function () {
		self.resize()
	};
	this._btn_move.scroll=function () {
		self.scroll()
	};
	this.setMiddle();
	if(cfg.hidden) {
		tt["visibility"]="hidden";
		this.focusTarget=this._btn_close
	}else {
		tt["visibility"]="visible";
		this._btn_close.focus();
		this._btn_close.blur()
	}this.setMask(this._node.style["zIndex"],cfg.hidden);
	Core.Events.addEvent(document,this._btn_move.mousemoveHandler,"mousemove");
	Core.Events.addEvent(document,this._btn_move.mouseupHandler,"mouseup");
	Core.Events.addEvent(window,this._btn_move.resize,"resize");
	Core.Events.addEvent(window,this._btn_move.scroll,"scroll")
};App.Dialog.BasicDialog.prototype={
	onClose:function () {
	},gc:function () {
	},distory:function () {
		if(this._distory) {
			return
		}this.gc();
		Core.Events.removeEvent(document,this._btn_move.mousemoveHandler,"mousemove");
		Core.Events.removeEvent(document,this._btn_move.mouseupHandler,"mouseup");
		Core.Events.removeEvent(window,this._btn_move.resize,"resize");
		Core.Events.removeEvent(window,this._btn_move.scroll,"scroll");
		this._btn_close.onmousedown=null;
		this._btn_close.onclick=null;
		this._btn_close.parent=null;
		this._btn_close=null;
		this._node.parentNode.removeChild(this._node);
		this._mask.parentNode.removeChild(this._mask);
		this._mask1.parentNode.removeChild(this._mask1);
		if(scope.$IE) {
			this._node.outerHTML=null;
			this._mask.outerHTML=null;
			this._mask1.outerHTML=null
		}this._node=null;
		this._btn_move.mousemoveHandler=null;
		this._btn_move.mouseupHandler=null;
		this._btn_move.resize=null;
		this._btn_move.scroll=null;
		this._btn_move.onmousedown=null;
		this._btn_move.parent=null;
		this._btn_move=null;
		this._mask=null;
		this._distory=true
	},close:function () {
		if(this.onClose) {
			this.onClose()
		}this.distory()
	},show:function () {
		this._node.style.visibility="visible";
		this._mask.style.visibility="visible";
		this._mask1.style.visibility="visible";
		if(this.focusTarget) {
			this.focusTarget.focus()
		}this.resize();
		this.setMiddle()
	},hidd:function () {
		this._node.style.visibility="hidden";
		this._mask.style.visibility="hidden";
		this._mask1.style.visibility="hidden"
	},setMask:function (z,hidden) {
		this._mask=document.getElementsByTagName("BODY")[0].appendChild($C("iframe"));
		this._mask1=document.getElementsByTagName("BODY")[0].appendChild($C("div"));
		if(hidden) {
			this._mask.style["visibility"]=this._mask1.style["visibility"]="hidden"
		}with(this._mask.style) {
			position="absolute";
			width="100%";
			zIndex=parseInt(z)-2;
			top="0px";
			left="0px";
			border="0"
		}with(this._mask1.style) {
			position="absolute";
			backgroundColor="#000";
			width="100%";
			zIndex=parseInt(z)-1;
			top="0px";
			left="0px"
		}Core.Dom.opacity(this._mask,0);
		Core.Dom.opacity(this._mask1,15);
		this.resize()
	},setPosition:function (x,y) {
		this._node.style["left"]=x+"px";
		this._node.style["top"]=y+"px"
	},resize:function () {
		if(this._mask) {
			var scroll_pos=Core.System.getScrollPos();
			var win_s=Core.System.winSize();
			this._mask1.style["height"]=this._mask.style["height"]=(win_s.height+160)+"px";
			this._mask1.style["top"]=this._mask.style["top"]=(scroll_pos[0]-80)+"px";
			this.setMiddle()
		}
	},scroll:function () {
		var scroll_pos=Core.System.getScrollPos();
		var h=this._mask.offsetHeight;
		if((scroll_pos[0]+h)<=scroll_pos[3]) {
			this._mask.style["top"]=this._mask1.style["top"]=(scroll_pos[0]-80)+"px"
		}else {
			this._mask.style["top"]=this._mask1.style["top"]=(scroll_pos[3]-h)+"px"
		}
	},setTitle:function (str) {
		this._node_title.innerHTML=str
	},setMiddle:function () {
		var ow=this._node.offsetWidth;
		var oh=this._node.offsetHeight;
		var win_s=Core.System.winSize();
		var scroll_pos=Core.System.getScrollPos();
		var tx=(win_s.width-ow)/2;
		var ty=scroll_pos[0]+(win_s.height-oh)/2;
		this._node.style["left"]=tx+"px";
		this._node.style["top"]=(ty<20?20:ty)+"px"
	},setSize:function (w,h) {
		w=w?w+"px":"auto";
		h=h?h+"px":"auto";
		var ts=this._node_body.style;
		ts["width"]=w;
		ts["height"]=h
	},_mousemoveHandler:function () {
		if(this._ondrag) {
			var evt=Core.Events.fixEvent(Core.Events.getEvent());
			if(evt.target==this._btn_close) {
				return
			}if($IE) {
				var ss=Core.System.getScrollPos();
				this._node.style["left"]=evt.pageX-this._btn_move.offsetx+ss[1]+"px";
				this._node.style["top"]=evt.pageY-this._btn_move.offsety+ss[0]+"px"
			}else {
				this._node.style["left"]=evt.pageX-this._btn_move.offsetx+"px";
				this._node.style["top"]=evt.pageY-this._btn_move.offsety+"px"
			}
		}
	},_mouserupHandler:function () {
		this._ondrag=false;
		if(this._btn_move.offsetx) {
			this._btn_move.offsetx=null
		}if(this._btn_move.offsety) {
			this._btn_move.offsety=null
		}
	}
};
App.alert=function (msg,config) {
	config=config?config:{
	};
	var title=config.title?config.title:"提示";
	var ok_label=config.ok_label?config.ok_label:"确定";
	if(typeofmsg=="object") {
		msg=App.getMsg(msg.code,msg.replace)
	}var callback=config.ok?config.ok:null;
	var basic_conf={
	};
	basic_conf["width"]=config.width?config.width:360;
	basic_conf["height"]=config.height;
	basic_conf["zIndex"]=config.zIndex?config.zIndex:1000;
	basic_conf["hidden"]=config["hidden"];
	var tpl='<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="http://simg.sinajs.cn/miniblog/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					<strong>#{cnt}</strong>                                	<div class="MIB_btn">						<a href="javascript:;" id="#{btn_id}" class="btn_normal"><em>'+ok_label+'</em></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
	var tmp=new Utils.Template(tpl);
	var t="btn_"+(new Date()).getTime();
	var icon=config.icon?config.icon:1;
	msg=tmp.evaluate({
		cnt:msg,icon:icon,btn_id:t
	});
	var dialog=new App.Dialog.BasicDialog(title,msg,basic_conf);
	var btn_ok=$E(t);
	var okCallback=function () {
		if(callback) {
			try{
				callback()
			}catch(e) {
			}
		}callback=null;
		btn_ok.onclick=null;
		btn_ok=null;
		dialog.close();
		Core.Events.removeEvent(document,hotkey,"keyup");
		return false
	};
	var hotkey=function (e) {
		var ev=window.event||e;
		var element;
		if(ev.target) {
			element=e.target
		}else {
			if(ev.srcElement) {
				element=e.srcElement
			}
		}if(element.nodeType==3) {
			element=element.parentNode
		}if(element.tagName=="INPUT"||element.tagName=="TEXTAREA") {
			return
		}switch(ev.keyCode) {
			case 27:okCallback();
			break
		}
	};
	btn_ok.onclick=okCallback;
	Core.Events.addEvent(document,hotkey,"keyup");
	if(basic_conf["hidden"]) {
		this.focusTarget=btn_ok
	}else {
		btn_ok.focus()
	}return dialog
};
App.confirm=function (msg,config) {
	config=config?config:{
	};
	var title=config.title?config.title:"提示";
	var ok_label=config.ok_label?config.ok_label:"确定";
	var cancel_label=config.cancel_label?config.cancel_label:"取消";
	var des="";
	if(typeofmsg=="object") {
		des=msg.des;
		if(msg.code) {
			msg=App.getMsg(msg.code,msg.replace)
		}else {
			msg=msg.html
		}
	}if(msg) {
		msg="<strong>"+msg+"</strong>"
	}if(des) {
		des='<div class="txt">'+des+"</div>"
	}var callback_ok=config.ok?config.ok:null;
	var callback_cancel=config.cancel?config.cancel:null;
	var basic_conf={
	};
	basic_conf["width"]=config.width?config.width:390;
	basic_conf["height"]=config.height;
	basic_conf["zIndex"]=config.zIndex?config.zIndex:1000;
	basic_conf["hidden"]=config["hidden"];
	var tpl='<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="http://simg.sinajs.cn/miniblog/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					#{cnt}			        	#{des}                                	<div class="MIB_btn">						<a href="javascript:;" id="ok_#{t}" class="btn_normal"><em>'+ok_label+'</em></a>						<a href="javascrpt:;" id="cancel_#{t}" class="btn_notclick"><em>'+cancel_label+'</em></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
	var tmp=new Utils.Template(tpl);
	var t=(new Date()).getTime();
	var icon=config.icon?config.icon:4;
	msg=tmp.evaluate({
		cnt:msg,des:des,icon:icon,t:t
	});
	var dialog=new App.Dialog.BasicDialog(title,msg,basic_conf);
	var btn_ok=$E("ok_"+t);
	var btn_cancel=$E("cancel_"+t);
	var hotkey=function (e) {
		var ev=window.event||e;
		var element;
		if(ev.target) {
			element=e.target
		}else {
			if(ev.srcElement) {
				element=e.srcElement
			}
		}if(element.nodeType==3) {
			element=element.parentNode
		}if(element.tagName=="INPUT"||element.tagName=="TEXTAREA") {
			return
		}switch(ev.keyCode) {
			case 27:cancel_function();
			break
		}
	};
	var cancel_function=function () {
		if(callback_cancel) {
			try{
				callback_cancel()
			}catch(e) {
			}
		}callback_cancel=null;
		btn_ok.onclick=null;
		btn_cancel.onclick=null;
		btn_cancel=null;
		btn_ok=null;
		dialog.distory();
		dialog=null;
		Core.Events.removeEvent(document,hotkey,"keyup");
		return false
	};
	btn_ok.onclick=function () {
		if(callback_ok) {
			try{
				callback_ok()
			}catch(e) {
			}
		}callback_ok=null;
		btn_ok.onclick=null;
		btn_cancel.onclick=null;
		btn_cancel=null;
		btn_ok=null;
		dialog.distory();
		dialog=null;
		Core.Events.removeEvent(document,hotkey,"keyup");
		return false
	};
	btn_cancel.onclick=cancel_function;
	if(config.ok_focus) {
		if(config["hidden"]) {
			this.focusTarget=btn_ok
		}else {
			btn_ok.focus()
		}
	}else {
		if(config.cancel_focus) {
			if(config["hidden"]) {
				this.focusTarget=btn_cancel
			}else {
				btn_cancel.focus()
			}
		}
	}Core.Events.addEvent(document,hotkey,"keyup");
	return dialog
};
App.customDialog=function (content,config) {
	config=config?config:{
	};
	var title=config.title?config.title:"提示";
	var basic_conf={
	};
	basic_conf["width"]=config.width?config.width:360;
	basic_conf["height"]=config.height;
	basic_conf["zIndex"]=config.zIndex?config.zIndex:1000;
	basic_conf["hidden"]=config["hidden"];
	var tpl='#{cnt} <div class="layerBtn" id="btn_#{t}"></div>';
	var tmp=new Utils.Template(tpl);
	var t=(new Date()).getTime();
	var msg=tmp.evaluate({
		cnt:content,t:t
	});
	var dialog=new App.Dialog.BasicDialog(title,msg,basic_conf);
	var btn_node=$E("btn_"+t);
	var btns=config.btns;
	for(var i=0;i<btns.length;i++) {
		var btn=btn_node.appendChild($C("a"));
		btn.className="mBlogBtn";
		btn.href="javascript:;";
		if(btns[i].select) {
			if(config["hidden"]) {
				this.focusTarget=btn
			}else {
				btn.focus()
			}
		}btn.innerHTML="<em>"+btns[i].text+"</em>";
		btn.nohide=config.btns[i].nohide;
		btn.func=config.btns[i].func;
		btn.onclick=function () {
			var nohide=this.nohide;
			if(this.func) {
				try{
					this.func()
				}catch(e) {
				}
			}if(!nohide) {
				dialog.close()
			}return false
		}
	}function _distory() {
		var nodes=btn_node.getElementsByTagName("A");
		for(var i in nodes) {
			nodes[i].nohide=null;
			nodes[i].func=null;
			nodes[i].onclick=null
		}btn_node=null
	}dialog.close=function () {
		dialog.onClose();
		_distory();
		dialog.distory()
	};
	return dialog
};
if(!App.getMsg) {
	App.getMsg=function (code,replace) {
		alert("you should override this function! get more help from dialog.js ");
		return code
	}
}App.getMsg=function (msgCode,replace) {
	if(msgCode===undefined) {
		return ""
	}if(typeof(msgCode)=="object") {
		msgCode=msgCode.code
	}var msg=$SYSMSG[msgCode]||("Error["+msgCode+"]");
	if(replace) {
		var tmp=new Utils.Template(msg);
		return tmp.evaluate(replace)
	}else {
		return msg
	}
};
Sina.pkg("Core.String");
Core.String.byteLength=function (str) {
	if(typeofstr=="undefined") {
		return 0
	}var aMatch=str.match(/[^\x00-\x80]/g);
	return (str.length+(!aMatch?0:aMatch.length))
};
Core.String.trimHead=function (str) {
	return str.replace(/^(\u3000|\s|\t)/gi,"")
};
Core.String.trimTail=function (str) {
	return str.replace(/(\u3000|\s|\t)*$/gi,"")
};
Core.String.trim=function (str) {
	return Core.String.trimHead(Core.String.trimTail(str))
};
Sina.pkg("Utils.Sinput");
Core.Function.bind3=function (fFunc,object,args) {
	args=args==null?[]:args;
	var __method=fFunc;
	return function () {
		return __method.apply(object,args)
	}
};
Core.String.leftB=function (str,len) {
	var s=str.replace(/\*/g," ").replace(/[^\x00-\xff]/g,"**");
	str=str.slice(0,s.slice(0,len).replace(/\*\*/g," ").replace(/\*/g,"").length);
	if(Core.String.byteLength(str)>len) {
		str=str.slice(0,str.length-1)
	}return str
};
Utils.Sinput.limitMaxLen=function (oTextNode,nMaxLen) {
	var nValue;
	var keyup=function () {
		nValue=oTextNode.value;
		var strLen=Core.String.byteLength(nValue);
		if(strLen>nMaxLen) {
			oTextNode.value=Core.String.leftB(nValue,nMaxLen)
		}
	};
	Core.Events.addEvent(oTextNode,Core.Function.bind3(keyup,oTextNode),"keyup");
	Core.Events.addEvent(oTextNode,Core.Function.bind3(keyup,oTextNode),"blur");
	Core.Events.addEvent(oTextNode,Core.Function.bind3(keyup,oTextNode),"focus")
};
Core.String.j2o=function (str) {
	if(!str||str=="") {
		return null
	}try{
		var o=window.eval("("+str+")");
		return o
	}catch(e) {
		trace("j2o : 数据分析出错");
		traceError(e);
		return null
	}
};
Sina.pkg("Utils.Io");
Utils.Url=function (url) {
	url=url||"";
	this.url=url;
	this.query={
	};
	this.parse()
};
Utils.Url.prototype={
	parse:function (url) {
		if(url) {
			this.url=url
		}this.parseAnchor();
		this.parseParam()
	},parseAnchor:function () {
		var anchor=this.url.match(/\#(.*)/);
		anchor=anchor?anchor[1]:null;
		this._anchor=anchor;
		if(anchor!=null) {
			this.anchor=this.getNameValuePair(anchor);
			this.url=this.url.replace(/\#./,"")
		}
	},parseParam:function () {
		var query=this.url.match(/\?([^\?]*)/);
		query=query?query[1]:null;
		if(query!=null) {
			this.url=this.url.replace(/\?([^\?]*)/,"");
			this.query=this.getNameValuePair(query)
		}
	},getNameValuePair:function (str) {
		var o={
		};
		str.replace(/([^&=]*)(?:\=([^&]*))?/gim,function (w,n,v) {
			if(n=="") {
				return
			}o[n]=v||""
		});
		return o
	},getParam:function (sPara) {
		return this.query[sPara]||""
	},clearParam:function () {
		this.query={
		}
	},setParam:function (name,value) {
		if(name==null||name==""||typeof(name)!="string") {
			thrownew Error("no param name set")
		}this.query=this.query||{
		};
		this.query[name]=value
	},setParams:function (o) {
		this.query=o
	},serialize:function (o) {
		var ar=[];
		for(var i in o) {
			if(o[i]==null||o[i]=="") {
				ar.push(i+"=")
			}else {
				ar.push(i+"="+o[i])
			}
		}return ar.join("&")
	},toString :function () {
		var queryStr=this.serialize(this.query);
		return this.url+(queryStr.length>0?"?"+queryStr:"")+(this.anchor?"#"+this.serialize(this.anchor):"")
	},getHashStr:function (forceSharp) {
		return this.anchor?"#"+this.serialize(this.anchor):(forceSharp?"#":"")
	}
};
Core.String.encodeDoubleByte=function (str) {
	if(typeofstr!="string") {
		return str
	}return encodeURIComponent(str)
};
Utils.Io.Ajax={
	createRequest:function () {
		var request=null;
		try{
			request=new XMLHttpRequest()
		}catch(trymicrosoft) {
			try{
				request=new ActiveXObject("Msxml2.XMLHTTP")
			}catch(othermicrosoft) {
				try{
					request=ActiveXObject("Microsoft.XMLHTTP")
				}catch(failed) {
				}
			}
		}if(request==null) {
			trace("create request failed")
		}else {
			return request
		}
	},request:function (url,option) {
		option=option||{
		};
		option.onComplete=option.onComplete||function () {
		};
		option.onException=option.onException||function () {
		};
		option.returnType=option.returnType||"txt";
		option.method=option.method||"get";
		option.data=option.data||{
		};
		if(typeofoption.GET!="undefined"&&typeofoption.GET.url_random!="undefined"&&option.GET.url_random==0) {
			this.rand=false;
			option.GET.url_random=null
		}this.loadData(url,option)
	},loadData:function (url,option) {
		var request=this.createRequest(),tmpArr=[];
		var _url=new Utils.Url(url);
		if(option.POST) {
			for(var postkey in option.POST) {
				var postvalue=option.POST[postkey];
				if(postvalue!=null) {
					tmpArr.push(postkey+"="+Core.String.encodeDoubleByte(postvalue))
				}
			}
		}var sParameter=tmpArr.join("&")||"";
		if(option.GET) {
			for(var key in option.GET) {
				if(key!="url_random") {
					_url.setParam(key,Core.String.encodeDoubleByte(option.GET[key]))
				}
			}
		}if(this.rand!=false) {
			_url.setParam("rnd",Math.random())
		}request.onreadystatechange=function () {
			if(request.readyState==4) {
				var response,type=option.returnType;
				try{
					switch(type) {
						case "txt":response=request.responseText;
						break;
						case "xml":if(Core.Base.detect.$IE) {
							response=request.responseXML
						}else {
							var Dparser=new DOMParser();
							response=Dparser.parseFromString(request.responseText,"text/xml")
						}break;
						case "json":response=eval("("+request.responseText+")");
						break
					}option.onComplete(response)
				}catch(e) {
					option.onException(e.message,_url);
					return false
				}
			}
		};
		try{
			if(option.POST) {
				request.open("POST",_url,true);
				request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				trace(sParameter);
				request.send(sParameter)
			}else {
				request.open("GET",_url,true);
				request.send(null)
			}
		}catch(e) {
			option.onException(e.message,_url);
			return false
		}
	}
};
App.doRequest=function (oData,sUrl,fCb,fEcb,ptype,type) {
	var emptyFun=function () {
	};
	var param={
		onComplete:function (result) {
			try{
				if(typeofresult=="string") {
					result=result.replace(/;
					$/,"")
				}result=(typeofresult=="string"&&(/\s*{
					/.test(result)))?Core.String.j2o(result):result;
					if(result&&(result.code=="A00006"||result.code=="S00001")) {
						(fCb||emptyFun)(result.data,result)
					}else {
						(fEcb||emptyFun)(result)
					}
				}catch(e) {
					trace(e)
				}
			},onException:function (json) {
				(fEcb||emptyFun)(json)
			}
		};
		ptype=(ptype||"post").toUpperCase();
		param[ptype]=oData;
		param.returnType="json";
		type=type||"ajax";
		Utils.Io.Ajax.request(sUrl,param)
	};
	Core.Dom.replaceNode=function (oNewNode,oOriginal) {
		if(oNewNode==null||oOriginal==null) {
			return false
		}oNewNode=$E(oNewNode);
		oOriginal=$E(oOriginal);
		oOriginal.parentNode.replaceChild(oNewNode,oOriginal)
	};
	Sina.pkg("Core.Class");
	Core.Class.extend=function (destination,source) {
		for(var property in source) {
			destination[property]=source[property]
		}return destination
	};
	App.enterSubmit=function (options) {
		options=Core.Class.extend({
			parent:document
		},options);
		var _p=$E(options.parent);
		var _checkEnter=function () {
			var _e=Core.Events.getEvent();
			var _k=_e.keyCode;
			var _act=this.getAttribute("act")||options.action||null;
			if(_k=="13"&&_act) {
				try{
					if(typeof_act=="string") {
						eval("("+_act+")();")
					}else {
						if(typeof_act=="function") {
							_act()
						}
					}
				}catch(e) {
				}
			}
		};
		if(_p) {
			var els=_p.getElementsByTagName("input");
			for(var i=0,l=els.length;i<l;i++) {
				var cur=els[i];
				var _t=cur.getAttribute("type").toLowerCase();
				if(_t=="text"||_t=="password") {
					Core.Events.addEvent(cur,_checkEnter.bind2(cur),"keydown")
				}
			}
		}
	};
	Core.Dom.getStyle=function (el,property) {
		switch(property) {
			case "opacity":var val=100;
			try{
				val=el.filters["DXImageTransform.Microsoft.Alpha"].opacity
			}catch(e) {
				try{
					val=el.filters("alpha").opacity
				}catch(e) {
				}
			}return val/100;
			case "float":property="styleFloat";
			default:var value=el.currentStyle?el.currentStyle[property]:null;
			return (el.style[property]||value)
		}
	};
	if(!Core.Base.detect.$IE) {
		Core.Dom.getStyle=function (el,property) {
			if(property=="float") {
				property="cssFloat"
			}try{
				var computed=document.defaultView.getComputedStyle(el,"")
			}catch(e) {
				traceError(e)
			}return el.style[property]||computed?computed[property]:null
		}
	}Core.Dom.getXY=function (el) {
		if((el.parentNode==null||el.offsetParent==null||Core.Dom.getStyle(el,"display")=="none")&&el!=document.body) {
			return false
		}var parentNode=null;
		var pos=[];
		var box;
		var doc=el.ownerDocument;
		box=el.getBoundingClientRect();
		var scrollPos=Core.System.getScrollPos(el.ownerDocument);
		return [box.left+scrollPos[1],box.top+scrollPos[0]];
		parentNode=el.parentNode;
		while(parentNode.tagName&&!/^body|html$/i.test(parentNode.tagName)) {
			if(Core.Dom.getStyle(parentNode,"display").search(/^inline|table-row.*$/i)) {
				pos[0]-=parentNode.scrollLeft;
				pos[1]-=parentNode.scrollTop
			}parentNode=parentNode.parentNode
		}return pos
	};
	if(!$IE) {
		Core.Dom.getXY=function (el) {
			if((el.parentNode==null||el.offsetParent==null||Core.Dom.getStyle(el,"display")=="none")&&el!=document.body) {
				return false
			}var parentNode=null;
			var pos=[];
			var box;
			var doc=el.ownerDocument;
			pos=[el.offsetLeft,el.offsetTop];
			parentNode=el.offsetParent;
			var hasAbs=Core.Dom.getStyle(el,"position")=="absolute";
			if(parentNode!=el) {
				while(parentNode) {
					pos[0]+=parentNode.offsetLeft;
					pos[1]+=parentNode.offsetTop;
					if(scope.$SAFARI&&!hasAbs&&Core.Dom.getStyle(parentNode,"position")=="absolute") {
						hasAbs=true
					}parentNode=parentNode.offsetParent
				}
			}if(scope.$SAFARI&&hasAbs) {
				pos[0]-=el.ownerDocument.body.offsetLeft;
				pos[1]-=el.ownerDocument.body.offsetTop
			}parentNode=el.parentNode;
			while(parentNode.tagName&&!/^body|html$/i.test(parentNode.tagName)) {
				if(Core.Dom.getStyle(parentNode,"display").search(/^inline|table-row.*$/i)) {
					pos[0]-=parentNode.scrollLeft;
					pos[1]-=parentNode.scrollTop
				}parentNode=parentNode.parentNode
			}return pos
		}
	}Core.Dom.addHTML=function (oParentNode,sHTML) {
		oParentNode.insertAdjacentHTML("BeforeEnd",sHTML)
	};
	if(!$IE) {
		Core.Dom.addHTML=function (oParentNode,sHTML) {
			var oRange=oParentNode.ownerDocument.createRange();
			oRange.setStartBefore(oParentNode);
			var oFrag=oRange.createContextualFragment(sHTML);
			oParentNode.appendChild(oFrag)
		}
	}App.fixElement={
		init:function (wrap) {
			var el=$E("mod_login_tip");
			if(!el) {
				var errorHTML='<div class="errorLayer" id="mod_login_tip" style="visibility:hidden">				<div class="top"></div>			    <div class="mid">			    	<div class="close" onclick="App.fixElement.hidden()" id="mod_login_close">x</div>			        <div class="conn">			        		<p class="bigtxt" id="mod_login_title"></p>				            <span class="stxt" id="mod_login_content" style="padding:0px;"></span>			        </div>			    </div>			    <div class="bot"></div>			</div>			';
				if(wrap) {
					wrap.innerHTML=errorHTML
				}else {
					Core.Dom.addHTML((document.body),errorHTML)
				}
			}el=$E("mod_login_tip");
			this.element=el
		},setHTML:function (title,content,options) {
			this.init($E(options.wrap));
			$E("mod_login_title").innerHTML=title||"";
			if(content) {
				$E("mod_login_content").innerHTML=content;
				$E("mod_login_content").style.display=""
			}else {
				$E("mod_login_content").style.display="none"
			}this.fixPostion(options||{
			});
			this.show()
		},fixPostion:function (obj) {
			var offsetX=obj.offsetX||0;
			var offsetY=obj.offsetY||0;
			var ref=$E(obj.ref);
			var target=this.element;
			var aPos=Core.Dom.getXY(ref);
			target.style.position="absolute";
			if(!obj.wrap) {
				target.style.left=(aPos[0]+offsetX)+"px";
				target.style.top=(aPos[1]+offsetY-target.offsetHeight)+"px"
			}else {
				target.style.marginTop=(-target.offsetHeight+offsetY)+"px";
				target.style.marginLeft=(offsetX)+"px"
			}target.style.zIndex=obj.zIndex||10;
			return target
		},show:function () {
			this.element&&(this.element.style.visibility="visible")
		},hidden:function () {
			this.element=this.element||$E("mod_login_tip");
			this.element&&(this.element.style.visibility="hidden")
		}
	};
	Sina.pkg("Utils.Cookie");
	Utils.Cookie.getCookie=function (name) {
		name=name.replace(/([\.\[\]\$])/g,"\\$1");
		var rep=new RegExp(name+"=([^;]*)?;","i");
		var co=document.cookie+";";
		var res=co.match(rep);
		if(res) {
			return res[1]||""
		}else {
			return ""
		}
	};
	Utils.Cookie.setCookie=function (name,value,expire,path,domain,secure) {
		var cstr=[];
		cstr.push(name+"="+escape(value));
		if(expire) {
			var dd=new Date();
			var expires=dd.getTime()+expire*3600000;
			dd.setTime(expires);
			cstr.push("expires="+dd.toGMTString())
		}if(path) {
			cstr.push("path="+path)
		}if(domain) {
			cstr.push("domain="+domain)
		}if(secure) {
			cstr.push(secure)
		}document.cookie=cstr.join(";")
	};
	Utils.Cookie.deleteCookie=function (name) {
		document.cookie=name+"=;"+"expires=Fri, 31 Dec 1999 23:59:59 GMT;"
	};
	App.setUsername=function (id) {
		var _username_input=$E(id);
		var _username="";
		if(_username_input) {
			if(_username_input.value==$SYSMSG["R01008"]||_username_input.value==$SYSMSG["CR0001"]) {
				_username=Utils.Cookie.getCookie("un");
				if(_username) {
					_username_input.value=unescape(_username);
					return true
				}
			}
		}return false
	};
	(function () {
		var parseParam=function (oSource,oParams) {
			var key;
			try{
				if(typeofoParams!="undefined") {
					for(key in oSource) {
						if(oParams[key]!=null) {
							oSource[key]=oParams[key]
						}
					}
				}
			}finally{
				key=null;
				return oSource
			}
		};
		Core.Base.parseParam=parseParam
	})();
	Utils.Io.JsLoad={
	};
	(function () {
		function createScripts(oOpts,oCFG) {
			processUrl(oOpts,oCFG);
			var urls=oOpts.urls;
			var i,len=urls.length;
			for(i=0;i<len;i++) {
				var js=$C("script");
				js.src=urls[i].url;
				js.charset=urls[i].charset;
				js[Core.Base.detect.$IE?"onreadystatechange":"onload"]=function () {
					if(Core.Base.detect.$MOZ||this.readyState.toLowerCase()=="complete"||this.readyState.toLowerCase()=="loaded") {
						oCFG.script_loaded_num++
					}
				};
				document.getElementsByTagName("head")[0].appendChild(js)
			}
		}function processUrl(oOpts,oCFG) {
			var urls=oOpts.urls;
			var get_hash=oOpts.GET;
			var i,len=urls.length;
			var key,url_cls,varname,rnd;
			for(i=0;i<len;i++) {
				rnd=parseInt(Math.random()*100000000);
				url_cls=new Utils.Url(urls[i].url);
				for(key in get_hash) {
					if(oOpts.noencode==true) {
						url_cls.setParam(key,get_hash[key])
					}else {
						url_cls.setParam(key,Core.String.encodeDoubleByte(get_hash[key]))
					}
				}varname=url_cls.getParam("varname")||"requestId_"+rnd;
				if(oOpts.noreturn!=true) {
					url_cls.setParam("varname",varname)
				}oCFG.script_var_arr.push(varname);
				urls[i].url=url_cls.toString ();
				urls[i].charset=urls[i].charset||oOpts.charset
			}
		}function ancestor(aUrls,oOpts) {
			var _opts={
				urls:[],charset:"utf-8",noreturn:false,noencode:true,timeout:-1,POST:{
				},GET:{
				},onComplete:null,onException:null
			};
			var _cfg={
				script_loaded_num:0,is_timeout:false,is_loadcomplete:false,script_var_arr:[]
			};
			_opts.urls=typeofaUrls=="string"?[{
				url:aUrls
			}]:aUrls;
			Core.Base.parseParam(_opts,oOpts);
			createScripts(_opts,_cfg);
			(function () {
				if(_opts.noreturn==true&&_opts.onComplete==null) {
					return
				}var i,data=[];
				if(_cfg.script_loaded_num==_opts.urls.length) {
					_cfg.is_loadcomplete=true;
					if(_opts.onComplete!=null) {
						for(i=0;i<_cfg.script_var_arr.length;i++) {
							data.push(window[_cfg.script_var_arr[i]])
						}if(_cfg.script_var_arr.length<2) {
							_opts.onComplete(data[0])
						}else {
							_opts.onComplete(data)
						}
					}return
				}if(_cfg.is_timeout==true) {
					return
				}setTimeout(arguments.callee,50)
			})();
			if(_opts.timeout>0) {
				setTimeout(function () {
					if(_cfg.is_loadcomplete!=true) {
						if(_opts.onException!=null) {
							_opts.onException()
						}_cfg.is_timeout=true
					}
				},_opts.timeout)
			}
		}Utils.Io.JsLoad.request=function (aUrls,oOpts) {
			new ancestor(aUrls,oOpts)
		}
	})();
	window.sinaSSOConfig={
		"feedBackUrl":"http://t.sina.com.cn/ajaxlogin.php","service":"miniblog","domain":"sina.com.cn","framelogin":"1","pageCharset":"utf-8","isCheckLoginState":false,"customLoginCallBack":function () {
		},"customUpdateCookieCallBack":function () {
		},"entry":"miniblog"
	};
	App.initLoginInput=function (oUserInput,text) {
		if(oUserInput) {
			(function (sText,oInput,sValue) {
				oInput.style.color="#999999";
				oInput.alt=oInput.title=sText;
				if(!sValue) {
					oInput.value=sText
				}if(!oInput.binded) {
					Core.Events.addEvent(oInput,function () {
						oInput.style.color="#333333";
						if(oInput.value==sText) {
							oInput.value=""
						}
					},"focus");
					Core.Events.addEvent(oInput,function () {
						oInput.style.color="#999999";
						if(oInput.value=="") {
							oInput.value=sText
						}
					},"blur");
					oUserInput.binded=true
				}
			})($SYSMSG[text?text:"R01008"],oUserInput,oUserInput.value)
		}App.setUsername(oUserInput)
	};
	App.LoginAction=function (cfg) {
		var login_name=Core.String.trim(cfg.name);
		var login_pwd=Core.String.trim(cfg.pwd);
		var login_remb=cfg.remb?"7":"0";
		if(!login_name) {
			cfg.error("登录名不能为空");
			return
		}else {
			if(!login_pwd) {
				cfg.error("请输出密码");
				return
			}
		}var doLogin=function () {
			var Login=window.sinaSSOController;
			Login.customLoginCallBack=function (res) {
				if(res.result) {
					Login.customLoginCallBack=function () {
					};
					Utils.Cookie.setCookie("un",login_name,240);
					cfg.succ()
				}else {
					cfg.error(res.reason,res.errno);
					login_pwd.value=""
				}Login.customLoginCallBack=function () {
				};
				Login=null
			};
			Login.login(login_name,login_pwd,login_remb)
		};
		if(typeofwindow.sinaSSOController!="undefined") {
			doLogin()
		}else {
			Utils.Io.JsLoad.request("http://i.sso.sina.com.cn/js/ssologin.js",{
				onComplete:function () {
					doLogin()
				},onException:function () {
				},timeout:30000
			})
		}
	};
	App.ModLogin=function (callBackFunction,title) {
		var tit=title||"通行证登录";
		var regurl="/reg.php";
		var recoverurl="http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
		var rnd=(new Date()).getTime();
		var html='<div class="loginLayer" id="login_wrap'+rnd+'">            	<table>                  <tbody>				  <tr>			      	   <th scope="row"/>	                        <td id="login_tip'+rnd+'"></td>	                    </tr>				  <tr>                    <th scope="row">登录名&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="1" type="text" name="loginname" id="loginname'+rnd+'" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="'+regurl+'" target="_blank">注册</a></td>                  </tr>                  <tr>                    <th scope="row">密  码&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="2" type="password" name="password" id="password'+rnd+'" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="'+recoverurl+'" target="_blank">找回密码</a></td>                  </tr>                  <tr>                    <th scope="row"/>                    <td><input type="checkbox" id="isremember'+rnd+'"  checked="checked"/><label>记住登录状态</label><p class="adminTs">建议在网吧/公共电脑上取消该选项</p></td>                    <td/>                  </tr>                  <tr>                    <th scope="row"/>                    <td><a href="javascript:void(0);" id="login_submit'+rnd+'" class="btn_normal"><em>确定</em></a></td>                    <td/>                  </tr>                </tbody></table>            </div>';
		var cfg={
			width:390,zIndex:1000
		};
		var dialog=new App.Dialog.BasicDialog(tit,html,cfg);
		var disableClass="btn_notclick";
		var enableClass="btn_normal";
		var login_submit=$E("login_submit"+rnd);
		var login_tip=$E("login_tip"+rnd);
		var loginname=$E("loginname"+rnd);
		var password=$E("password"+rnd);
		var isremember=$E("isremember"+rnd);
		var options={
			zIndex:1010,ref:loginname,wrap:login_tip,offsetX:0,offsetY:1
		};
		if(!$IE) {
			options.offsetY=10
		}App.initLoginInput(loginname);
		if(callBackFunction&&callBackFunction.initErrorTip) {
			App.fixElement.setHTML(callBackFunction.initErrorTip,"",options)
		}function checkForm(el,errStr) {
			if(!Core.String.trim(el.value)||(el.value==el.title&&el.title)) {
				el.focus();
				App.fixElement.setHTML(errStr,"",options);
				return false
			}else {
				App.fixElement.hidden()
			}return true
		}login_submit.onclick=function () {
			if(login_submit.className==disableClass) {
				return false
			}login_submit.className=enableClass;
			if(!checkForm(loginname,App.getMsg({
				code:"M00901"
			}))) {
				return false
			}if(!checkForm(password,App.getMsg({
				code:"M00902"
			}))) {
				return false
			}App.LoginAction({
				name:loginname.value,pwd:password.value,remb:isremember.checked,error:function (reason,errno) {
					var msg="";
					if(errno=="4010") {
						reason=App.getMsg({
							code:"R01011"
						});
						msg=App.getMsg("R01010",{
							mail:loginname.value
						})
					}else {
						if(errno=="101"||errno=="5") {
							msg=App.getMsg({
								code:"R01007"
							})
						}
					}App.fixElement.setHTML(reason,msg,options)
				},succ:function () {
					dialog.close();
					if(callBackFunction) {
						scope.$uid="123456";
						callBackFunction.func(callBackFunction.param)
					}else {
						location.reload()
					}
				}
			})
		};
		App.enterSubmit({
			parent:password.parentNode,action:function () {
				login_submit.onclick()
			}
		});
		passcardOBJ.init(loginname,{
			overfcolor:"#999",overbgcolor:"#e8f4fc",outfcolor:"#000000",outbgcolor:""
		},password,window)
	};
	Core.Events.fireEvent=function (oElement,sEvent) {
		oElement=$E(oElement);
		if($IE) {
			oElement.fireEvent("on"+sEvent)
		}else {
			var evt=document.createEvent("HTMLEvents");
			evt.initEvent(sEvent,true,true);
			oElement.dispatchEvent(evt)
		}
	};
	App.timer=new function () {
		this.list={
		};
		this.refNum=0;
		this.clock=null;
		this.allpause=false;
		this.delay=25;
		this.add=function (fun) {
			if(typeoffun!="function") {
				throw("The timer needs add a function as a parameters")
			}var key=""+(new Date()).getTime()+(Math.random())*Math.pow(10,17);
			this.list[key]={
				"fun":fun,"pause":false
			};
			if(this.refNum<=0) {
				this.start()
			}this.refNum++;
			return key
		};
		this.remove=function (key) {
			if(this.list[key]) {
				delete this.list[key];
				this.refNum--
			}if(this.refNum<=0) {
				this.stop()
			}
		};
		this.pause=function (key) {
			if(this.list[key]) {
				this.list[key]["pause"]=true
			}
		};
		this.play=function (key) {
			if(this.list[key]) {
				this.list[key]["pause"]=false
			}
		};
		this.stop=function () {
			clearInterval(this.clock);
			this.clock=null
		};
		this.start=function () {
			var _this=this;
			this.clock=setInterval(function () {
				_this.loop.apply(_this)
			},this.delay)
		};
		this.loop=function () {
			for(var k in this.list) {
				if(!this.list[k]["pause"]) {
					this.list[k]["fun"]()
				}
			}
		}
	};
	App.animation={
		"vibrate":function (d,v,m,k,s,u) {
			var T=2*Math.PI*Math.sqrt(m/k);
			var A=v*Math.sqrt(m/k);
			var n=Math.ceil(T*100/d);
			var c=0;
			var orbit=[];
			while(A>s) {
				orbit.push(A*Math.sin((c/n)*2*Math.PI));
				c++;
				c=c%n;
				A=A-u
			}return orbit
		},"accelerate":function (d,h,g,v) {
			var orbit=[];
			var l=0;
			while(true) {
				var v1=v;
				v=v1+d*g/10;
				l=l+d*(v+v1)/20;
				if(l<h) {
					orbit.push(l)
				}else {
					break
				}
			}return orbit
		},"curtain":function (d,h,p) {
			var orbit=[h];
			var l=h;
			while(l>1) {
				l=l*p;
				orbit.unshift(l)
			}return orbit
		},"speed":function (d,h,v) {
			var t=Math.ceil(h/v);
			var n=Math.ceil(t*100/d);
			var orbit=[];
			for(var i=0;i<n;i++) {
				orbit.push((i+1)*h/n)
			}return orbit
		},"circle":function (d,l,v) {
			var t=2*Math.PI*l/v;
			var n=Math.ceil(t*100/d);
			var orbit=[];
			for(var i=0;i<n;i++) {
				orbit.push({
					"x":l*Math.sin(((i+1)/n)*2*Math.PI),"y":l*Math.cos(((i+1)/n)*2*Math.PI)
				})
			}return orbit
		},"taccelerate":function (d,h,t) {
			var n=Math.ceil(t*100/d);
			var orbit=[];
			for(var i=0;i<n;i++) {
				orbit.push(Math.pow((i+1)/n,2)*h)
			}return orbit
		}
	};
	(function (proxy) {
		var movingKey=false;
		proxy.doFlyOut=function (st,tg,config) {
			if(movingKey) {
				return false
			}movingKey=true;
			var getAbsolute=function (ele) {
				var aPoint=Core.Dom.getXY(ele);
				var res={
					"x":aPoint[0],"y":aPoint[1]
				};
				return res
			};
			var params_st={
				"w":st.offsetWidth,"h":st.offsetHeight,"l":(getAbsolute(st))["x"],"t":(getAbsolute(st))["y"]
			};
			var visible=tg.style.visibility;
			var display=tg.style.display;
			if(tg.style.display=="none") {
				tg.style.visibility="hidden";
				tg.style.display="block"
			}var params_tg={
				"w":tg.offsetWidth,"h":tg.offsetHeight,"l":(getAbsolute(tg))["x"],"t":(getAbsolute(tg))["y"]
			};
			var oo=document.createElement("DIV");
			oo.style.cssText=config["style"];
			oo.style.width=params_st["w"]+"px";
			oo.style.height=params_st["h"]+"px";
			oo.style.top=params_st["t"]+"px";
			oo.style.left=params_st["l"]+"px";
			oo.style.position="absolute";
			document.body.appendChild(oo);
			var ct={
				"w":proxy.animation.taccelerate(proxy.timer.delay,params_tg["w"]-params_st["w"],config["time"]),"h":proxy.animation.taccelerate(proxy.timer.delay,params_tg["h"]-params_st["h"],config["time"]),"l":proxy.animation.taccelerate(proxy.timer.delay,params_tg["l"]-params_st["l"],config["time"]),"t":proxy.animation.taccelerate(proxy.timer.delay,params_tg["t"]-params_st["t"],config["time"])
			};
			var c=0;
			var tk=proxy.timer.add(function () {
				if(c>=ct["w"].length) {
					proxy.timer.remove(tk);
					oo.style.display="none";
					config.resFun();
					movingKey=false;
					return false
				}oo.style.width=params_st["w"]+ct["w"][c]+"px";
				oo.style.height=params_st["h"]+ct["h"][c]+"px";
				oo.style.top=params_st["t"]+ct["t"][c]+"px";
				oo.style.left=params_st["l"]+ct["l"][c]+"px";
				c++
			});
			tg.style.visibility=visible;
			tg.style.display=display
		}
	})(App);
	App.flyDialog=function (sText,sDialogType,oFromTarget,oConfig) {
		var oAlert=App[sDialogType||"alert"](sText,oConfig);
		return oAlert
	};
	Core.String.encodeHTML=function (str) {
		var div=document.createElement("div");
		div.appendChild(document.createTextNode(str));
		return div.innerHTML.replace(/\s/g,"&nbsp;")
	};
	$registJob("initSearch",function () {
		App.search("m_keyword","m_submit","m_search",30,"搜索话题、朋友...")
	});
	App.search=function (input,subbtn,form,maxlen,txt,cindex) {
		var maxlen=maxlen||30;
		var textnode=$E(input);
		var subbtn=$E(subbtn);
		var form=$E(form);
		Utils.Sinput.limitMaxLen(textnode,maxlen);
		var auto=new App.autoSelect({
			input:textnode,id:textnode.id+"_tip_",subbtn:subbtn
		});
		var urls={
			0:"/k/",1:"/search/user.php?search="
		};
		if(cindex!==undefined) {
			auto.curIndex=cindex
		}function formget(event) {
			var value=Core.String.trim(textnode.value);
			value=Core.String.leftB(value,maxlen);
			if(value&&value!=txt) {
				location.href=urls[auto.curIndex]+encodeURIComponent(encodeURIComponent(value))
			}else {
				textnode.focus()
			}Core.Events.stopEvent(event)
		}Core.Events.addEvent(subbtn,formget,"click");
		App.enterSubmit({
			parent:form,action:function (event) {
				Core.Events.fireEvent(subbtn,"click")
			}
		})
	};
	App.autoSelect=function (options) {
		this.input=$E(options.input);
		this.maxLen=options.maxlen||4*2;
		this.initHTML(options.id);
		this.subbtn=options.subbtn;
		Core.Events.addEvent(this.input,this.keydown.bind2(this),"keydown");
		Core.Events.addEvent(this.input,this.fileElement.bind2(this),"keyup");
		Core.Events.addEvent(this.input,this.fileElement.bind2(this),"focus");
		Core.Events.addEvent(this.input,Core.Events.stopEvent,"click");
		Core.Events.addEvent(document.body,this.removeElement.bind2(this),"click")
	};
	App.autoSelect.prototype={
		initHTML:function (id) {
			var wrap=$E(id);
			if(!wrap) {
				var html='<span>请选择搜索范围</span>						<ul id="'+id+'_content">							<li class="cur" style="cursor:pointer">含<cite id="'+id+'_blog" ></cite>的微博</li>							<li style="cursor:pointer">名为<cite id="'+id+'_author" ></cite>的人</li>						</ul>					';
				var wrap=document.createElement("div");
				wrap.className="resultTip";
				wrap.id=id;
				wrap.style.width="120px";
				wrap.style.display="none";
				wrap.style.position="absolute";
				wrap.innerHTML=html;
				wrap.style.zIndex="300";
				document.body.appendChild(wrap)
			}var xy=Core.Dom.getXY(this.input);
			wrap.style.left=xy[0]+"px";
			wrap.style.top=(xy[1]+this.input.offsetHeight)+"px";
			this.wrap=wrap;
			this.searchBlog=$E(id+"_blog");
			this.searchAuthor=$E(id+"_author");
			this.curIndex=0;
			this.elements=$E(id+"_content").getElementsByTagName("li");
			var othis=this;
			for(var i=0,els=this.elements,el;i<els.length;i++) {
				var el=els[i];
				el.onclick=Core.Function.bind3(othis.setCurElement,othis,[i,el,"click"]);
				el.onmouseover=Core.Function.bind3(othis.setCurElement,othis,[i,el,"mouseover"]);
				el.onmouseout=Core.Function.bind3(othis.setCurElement,othis,[i,el,"mouseout"])
			}
		},setCurElement:function (index,el,type) {
			var event=Core.Events.getEvent();
			this.curIndex=index;
			this.curElement=el;
			this.complete();
			this.curElement=this.elements[this.curIndex];
			if(type=="mouseout") {
				var relatedTarget=event.relatedTarget||event.toElement;
				if(relatedTarget&&relatedTarget.nodeType==1) {
					if(relatedTarget.tagName.toLowerCase()=="li") {
						this.elements[this.curIndex].className=""
					}
				}
			}if(type=="mouseover") {
				this.setBackGroud(el)
			}if(type=="click") {
				Core.Events.fireEvent(this.subbtn,"click");
				Core.Events.stopEvent(event)
			}
		},setBackGroud:function (el) {
			for(var i=0,len=this.elements.length,els=this.elements;i<len;i++) {
				var cur=els[i];
				if(cur!=el) {
					cur.className=""
				}else {
					cur.className="cur"
				}
			}
		},fileElement:function (event) {
			var event=Core.Events.getEvent();
			var str=this.input.value;
			str=Core.String.trim(str);
			if(!str) {
				this.removeElement();
				return this
			}this.wrap.style.display="";
			if(Core.String.byteLength(str)>this.maxLen) {
				str=Core.String.leftB(str,this.maxLen-1)+"..."
			}this.searchBlog.innerHTML=Core.String.encodeHTML(str);
			this.searchAuthor.innerHTML=Core.String.encodeHTML(str);
			return this
		},keydown:function (event) {
			event=event||window.event;
			if(event.keyCode=="38"||event.keyCode=="37") {
				this.curIndex--
			}if(event.keyCode=="40"||event.keyCode=="39") {
				this.curIndex++
			}this.curIndex=this.complete();
			if(this.curElement==this.elements[this.curIndex]) {
				return true
			}if(this.curElement) {
				this.curElement.className="";
				this.curElement=null
			}this.curElement=this.elements[this.curIndex];
			this.curElement.className="cur";
			this.url=this.curElement.getAttribute("url")
		},complete:function () {
			if(this.curIndex<0) {
				this.curIndex=this.elements.length-1
			}if(this.curIndex>=this.elements.length) {
				this.curIndex=0
			}return this.curIndex
		},removeElement:function () {
			this.wrap.style.display="none"
		}
	};
	App.followOper=function (type,uid,el,param,name) {
		if(!scope.$uid) {
			location.replace("/login.php?url="+encodeURIComponent(location.href));
			return false
		}if(scope.$cuser_status==="nofull") {
			App.finishInformation();
			return false
		}if(scope.$uid=="123456") {
			var arg=arguments[0];
			type=arg[0];
			uid=arg[1];
			el=arg[2];
			param=arg[3];
			name=arg[4]
		}var delay=1;
		var url="";
		var p=$C("div");
		if(type=="add") {
			p.className="MIB_btn2 lf";
			url="/attention/aj_addfollow.php";
			p.innerHTML="已关注，<a onclick=\"App.removeFollow('"+uid+"',this,'"+name+'\')" href="javascript:void(0);"><em>取消</em></a>'
		}else {
			url="/attention/aj_delfollow.php";
			var imgURI="http://simg.sinajs.cn/"+scope.$PRODUCT_NAME+"style/images/common/transparent.gif";
			p.innerHTML='<a href="javascript:void(0);" onclick="App.followOne(\''+uid+"',this,'"+name+"')\""+' class="btn_add"><img class="SG_icon" '+'src="'+imgURI+'" title="加关注"><em>加关注</em></a>'
		}function cb(json) {
			if(scope.$uid=="123456") {
				location.reload()
			}else {
				setTimeout(function () {
					while(el.nodeName.toLowerCase(0)!="div") {
						el=el.parentNode
					}Core.Dom.replaceNode(p,el)
				},delay)
			}
		}function ecb(json) {
			App.flyDialog(json,null,null,{
				ok:function () {
					if(scope.$uid=="123456") {
						location.reload()
					}
				}
			})
		}App.doRequest(param,url,cb,ecb)
	};
	App.followOne=function (uid,el,name) {
		if(el.ask_following) {
			return false
		}App.followOper("add",uid,el,{
			uid:uid,fromuid:scope.$uid
		},name);
		el.ask_following=true
	};
	App.removeFollow=function (uid,el,name) {
		App.flyDialog("确定要取消关注"+name+"?","confirm",el,{
			ok:function () {
				App.followOper("remove",uid,el,{
					touid:uid,fromuid:scope.$uid
				},name)
			}
		})
	};
	App.focusblur=function (event,el,txt) {
		el=$E(el);
		txt=txt||"搜索其他话题...";
		event=event||window.event;
		if(event.type=="focus") {
			if(el.value==txt) {
				el.value=""
			}
		}if(event.type=="blur") {
			if(el.value=="") {
				el.value=txt
			}
		}
	};
	(function (proxy) {
		proxy.setOpacity=function (element,value) {
			element.style.filter="alpha(opacity="+value+")";
			element.style.opacity=value/100
		};
		proxy.opacity=function (element,cfg,callback) {
			var _first=cfg["first"];
			var _last=cfg["last"]||0;
			if(_last==_first) {
				proxy.setOpacity(element,_first);
				return false
			}var _time=Math.floor((cfg["time"]||5)*100/proxy.timer.delay);
			var _orbit=[];
			for(var i=0;i<_time;i++) {
				_orbit.push(_first+(_last-_first)*i/_time)
			}var _current=0;
			var _timerhook=proxy.timer.add(function () {
				if(_current>=_orbit.length) {
					proxy.timer.remove(_timerhook);
					proxy.setOpacity(element,_last);
					if(typeofcallback==="function") {
						callback(_first,_last)
					}return false
				}proxy.setOpacity(element,_orbit[_current]);
				_current++
			})
		}
	})(App);
	$registJob("refurbishNumber",function () {
		var getDoms=function () {
			var MAIN=$E("profile_following_follower_update");
			if(!MAIN) {
				return false
			}var ITEMS=MAIN.getElementsByTagName("LI");
			var following=ITEMS[0];
			var follower=ITEMS[1];
			var update=ITEMS[2];
			App.refurbishFollowing=upgrade(following);
			App.refurbishFollower=upgrade(follower);
			App.refurbishUpdate=upgrade(update)
		};
		var orbit=[[20,-1,80],[22,-2,70],[24,-3,60],[28,-5,40],[32,-7,30],[36,-9,20],[36,-9,0]];
		var upgrade=function (el) {
			var num=el.getElementsByTagName("DIV")[0];
			var that={
			};
			el.style.position="relative";
			that.animation=function (cfg) {
				var duplicate=num.cloneNode(true);
				duplicate.style.position="absolute";
				el.insertBefore(duplicate,num);
				var width=duplicate.offsetWidth;
				var current=1;
				var tk=App.timer.add(function () {
					if(cfg.beging) {
						cfg.beging(duplicate,num)
					}if(current>=orbit.length*2) {
						App.timer.remove(tk);
						App.setOpacity(num,100);
						el.removeChild(duplicate);
						duplicate.style.display="none";
						num.getElementsByTagName("A")[0].innerHTML=num.getElementsByTagName("A")[0].innerHTML;
						return false
					}if(current==orbit.length) {
						cfg.middle(duplicate,num)
					}var now=orbit.length-Math.abs(current-orbit.length)-1;
					duplicate.style.fontSize=orbit[now][0]+"px";
					duplicate.style.top=orbit[now][1]+"px";
					duplicate.style.left=0-(duplicate.offsetWidth-width)/2+"px";
					App.setOpacity(duplicate,orbit[now][2]);
					App.setOpacity(num,orbit[now][2]);
					current+=1;
					if(cfg.ending) {
						cfg.ending(duplicate,num)
					}
				})
			};
			that.add=function (num) {
				var doadd=function (du,or) {
					var numBox=or.getElementsByTagName("A")[0];
					numBox.innerHTML=parseInt(numBox.innerHTML)+num;
					du.getElementsByTagName("A")[0].innerHTML=numBox.innerHTML
				};
				this.animation({
					"middle":doadd
				})
			};
			return that
		};
		getDoms()
	});
	Core.Dom.insertHTML=function (el,html,where) {
		el=$E(el)||document.body;
		where=where.toLowerCase()||"beforeend";
		if(el.insertAdjacentHTML) {
			switch(where) {
				case "beforebegin":el.insertAdjacentHTML("BeforeBegin",html);
				return el.previousSibling;
				case "afterbegin":el.insertAdjacentHTML("AfterBegin",html);
				return el.firstChild;
				case "beforeend":el.insertAdjacentHTML("BeforeEnd",html);
				return el.lastChild;
				case "afterend":el.insertAdjacentHTML("AfterEnd",html);
				return el.nextSibling
			}throw'Illegal insertion point -> "'+where+'"'
		}var range=el.ownerDocument.createRange();
		var frag;
		switch(where) {
			case "beforebegin":range.setStartBefore(el);
			frag=range.createContextualFragment(html);
			el.parentNode.insertBefore(frag,el);
			return el.previousSibling;
			case "afterbegin":if(el.firstChild) {
				range.setStartBefore(el.firstChild);
				frag=range.createContextualFragment(html);
				el.insertBefore(frag,el.firstChild);
				return el.firstChild
			}else {
				el.innerHTML=html;
				return el.firstChild
			}break;
			case "beforeend":if(el.lastChild) {
				range.setStartAfter(el.lastChild);
				frag=range.createContextualFragment(html);
				el.appendChild(frag);
				return el.lastChild
			}else {
				el.innerHTML=html;
				return el.lastChild
			}break;
			case "afterend":range.setStartAfter(el);
			frag=range.createContextualFragment(html);
			el.parentNode.insertBefore(frag,el.nextSibling);
			return el.nextSibling
		}throw'Illegal insertion point -> "'+where+'"'
	};
	App.autoHeightTextArea=function (oNode,fInputListener,nMaxHeight) {
		oNode=$E(oNode);
		fInputListener=fInputListener||function () {
		};
		var listener=function (nMaxHeight) {
			if(fInputListener) {
				fInputListener()
			}var nViewHeight;
			var sScrollStyle;
			var nSnapHeight=App.getTextAreaHeight(this);
			nMaxHeight=nMaxHeight||nSnapHeight;
			if(nSnapHeight>nMaxHeight) {
				nViewHeight=nMaxHeight;
				if(this.style.overflowY==="hidden") {
					this.style.overflowY="auto"
				}
			}else {
				nViewHeight=nSnapHeight;
				if(this.style.overflowY==="auto") {
					this.style.overflowY="hidden"
				}
			}this.style.height=Math.min(nMaxHeight,nSnapHeight)+"px"
		};
		if(oNode.binded==null) {
			Core.Events.addEvent(oNode,Core.Function.bind3(listener,oNode,[nMaxHeight]),"keyup");
			Core.Events.addEvent(oNode,Core.Function.bind3(listener,oNode,[nMaxHeight]),"focus");
			Core.Events.addEvent(oNode,Core.Function.bind3(listener,oNode,[nMaxHeight]),"blur");
			oNode.binded=true;
			oNode.style.overflowY="hidden";
			oNode.style.overflowX="hidden"
		}
	};
	App.getTextAreaHeight=function (oNode) {
		oNode=$E(oNode);
		if(oNode.defaultHeight==null) {
			oNode.defaultHeight=window.parseInt(Core.Dom.getStyle(oNode,"height"))
		}var snapHeight;
		if($IE) {
			snapHeight=Math.max(oNode.scrollHeight,oNode.defaultHeight)
		}else {
			var textArea=$E("_____textarea_____");
			if(textArea==null) {
				textArea=document.createElement("textarea");
				textArea.id="_____textarea_____";
				document.getElementsByTagName("body")[0].appendChild(textArea)
			}if(textArea.currentTarget!=oNode) {
				textArea.style.top="-1000px";
				textArea.style.height="0px";
				textArea.style.position="absolute";
				textArea.style.overflow="hidden";
				textArea.style.width=Core.Dom.getStyle(oNode,"width");
				textArea.style.fontSize=Core.Dom.getStyle(oNode,"fontSize");
				textArea.style.fontFamily=Core.Dom.getStyle(oNode,"fontFamily");
				textArea.style.lineHeight=Core.Dom.getStyle(oNode,"lineHeight");
				textArea.style.paddingLeft=Core.Dom.getStyle(oNode,"paddingLeft");
				textArea.style.paddingRight=Core.Dom.getStyle(oNode,"paddingRight");
				textArea.style.paddingTop=Core.Dom.getStyle(oNode,"paddingTop");
				textArea.style.paddingBottom=Core.Dom.getStyle(oNode,"paddingBottom")
			}textArea.value=oNode.value;
			snapHeight=Math.max(textArea.scrollHeight,oNode.defaultHeight);
			textArea.currentTarget=oNode
		}return snapHeight
	};
	App.ModForward=function (fid,content,uid,el,exid,forwardName,forwardContent,uname,callback) {
		if(scope.$cuser_status==="nofull"&&scope.$uid!=="") {
			App.finishInformation();
			return false
		}if(uid===scope.$uid) {
			App.alert("你自己写的微博是不能转发的哦！");
			return false
		}var checkAT=function (content,name) {
			if((new RegExp("(@|＠)"+name+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
				return true
			}else {
				return false
			}
		};
		var defaultTxt="顺便说点什么吧...";
		var forwardContentFinal="";
		var testForwardName=decodeURIComponent(forwardName);
		var testForwardContent=decodeURIComponent(forwardContent);
		var testForwardUName=decodeURIComponent(uname);
		if(forwardContent==""||forwardContent===undefined) {
			forwardContentFinal=defaultTxt
		}else {
			forwardContentFinal=" //@"+testForwardName+":"+testForwardContent
		}var title="转发到我的微博";
		var loginStr='<div class="shareLogin">                    	<div id="loginerror_'+fid+'"></div>						<em>登录名 ： </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle_'+fid+'" class="inputType"  style="width: 100px;"/></span></span>                        <em>&nbsp&nbsp&nbsp&nbsp密码 ： </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd_'+fid+'" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clearit"></div>                    </div>';
		loginStr=scope.$uid?"":loginStr;
		if(el) {
			var lastForwarderName=el.getAttribute("lastforwardername");
			var initBlogerName=el.getAttribute("initblogername")
		}var aComment=[];
		aComment.push('<div class="selSend">');
		if(lastForwarderName) {
			aComment.push('<p><label for="lastForwarder"><input type="checkbox" class="labelbox" id="lastForwarder" />同时作为给'+lastForwarderName+"的评论发布</label></p>")
		}if(initBlogerName&&initBlogerName!=lastForwarderName) {
			aComment.push('<p><label for="initBloger"><input type="checkbox" class="labelbox" id="initBloger"/>同时作为给'+initBlogerName+"的评论发布</label></p>")
		}aComment.push(" </div>");
		var html='			   <div class="shareLayer" id="forwardcontent_'+fid+'">                    <div class="shareTxt" id="sharecontent_'+fid+'">转:'+decodeURIComponent(content)+'</div>					<div id="tipInfoBox'+fid+'" style="float:right;margin-right:13px;color:#008800"></div>                    <textarea class="PY_textarea" id="mdforwardtextarea_'+fid+'">'+forwardContentFinal+"</textarea>"+loginStr+aComment.join(" ")+'<div class="MIB_btn">                 		<a href="javascript:void(0);" id="mdforwardbtn_'+fid+'" class="btn_normal"><em>转发</em></a><a href="javascript:void(0)" id="mdforwardcancel_'+fid+'" class="btn_notclick"><em>取消</em></a>                 </div>                </div>';
		var cfg={
			width:390,zIndex:1000
		};
		var dialog=new App.Dialog.BasicDialog(title,html,cfg);
		var mdforwardtextarea=$E("mdforwardtextarea_"+fid);
		var tipStringOK="还可以输入<em>${num}</em>个汉字";
		var tipStringErr="已经超出<em>${num}</em>个汉字";
		var forwardInputLimit=function () {
			var num=Math.ceil(Core.String.byteLength(Core.String.trim(mdforwardtextarea.value))/2);
			if($E("tipInfoBox"+fid)) {
				if(num>140) {
					$E("tipInfoBox"+fid).innerHTML=tipStringErr.replace(/\$\{num\}/,(maxlen/2-num)*(-1));
					$E("tipInfoBox"+fid).style.color="#880000";
					return false
				}else {
					$E("tipInfoBox"+fid).innerHTML=tipStringOK.replace(/\$\{num\}/,(maxlen/2-num));
					$E("tipInfoBox"+fid).style.color="#008800";
					return true
				}
			}
		};
		if(el) {
			try{
				setTimeout(function () {
					$E("mdforwardtextarea_"+fid).focus();
					if($IE) {
					}else {
						$E("mdforwardtextarea_"+fid).setSelectionRange(0,0)
					}forwardInputLimit()
				},100)
			}catch(e) {
			}
		}else {
			dialog.show();
			$E("mdforwardtextarea_"+fid).focus();
			if($IE) {
			}else {
				$E("mdforwardtextarea_"+fid).setSelectionRange(0,0)
			}setTimeout(forwardInputLimit,1)
		}var url="/mblog/forward.php";
		var mdforwardbtn=$E("mdforwardbtn_"+fid);
		var maxlen=280;
		App.autoHeightTextArea(mdforwardtextarea,function () {
			setTimeout(forwardInputLimit,1)
		},145);
		var loginerror=$E("loginerror_"+fid);
		var disClass="btn_notclick";
		var enableClass="btn_normal";
		var name=$E("logintitle_"+fid);
		var pwd=$E("loginpwd_"+fid);
		var options={
			zIndex:1010,ref:name,wrap:loginerror,offsetY:-1,offsetX:30
		};
		mdforwardtextarea.onfocus=function () {
			if(mdforwardtextarea.value==defaultTxt) {
				mdforwardtextarea.value=""
			}
		};
		mdforwardtextarea.onblur=function () {
			if(mdforwardtextarea.value=="") {
				mdforwardtextarea.value=defaultTxt
			}
		};
		mdforwardtextarea.onkeydown=function (event) {
			event=event||window.event;
			if(event.keyCode==13&&event.ctrlKey) {
				mdforwardbtn.onclick()
			}
		};
		$E("mdforwardcancel_"+fid).onclick=function () {
			dialog.close();
			return false
		};
		function forwardSuccess() {
			var reason=mdforwardtextarea.value=Core.String.leftB(mdforwardtextarea.value,maxlen);
			if(reason==defaultTxt) {
				reason=""
			}var postdata={
				"reason":reason.replace(/\uff20/ig,"@"),"mid":fid,"styleid":scope["styleid"]
			};
			if(scope.$pageid=="search") {
				postdata.from="search"
			}if((scope.$pageid=="myprofile"||scope.$pageid=="search")&&scope.$feedtype!="isori") {
				postdata.isindex=1
			}var cb=function (data,json) {
				if(postdata.isLast) {
					var comments=$E("_comment_count_miniblog2_"+fid);
					if(comments&&comments.getElementsByTagName("strong").length<0) {
						comments.innerHTML=comments.innerHTML+"<strong>(1)</strong>"
					}else {
						var connter=$E("_comment_count_miniblog2_"+fid).getElementsByTagName("strong")[0];
						if(connter) {
							var count=parseInt(connter.innerHTML.replace(/\(|\)/g,""));
							count=isNaN(count)?1:count+1;
							connter.innerHTML="("+count+")"
						}
					}
				}dialog.close();
				var cbdia=App.alert("转发成功",{
					icon:3,ok:function () {
						if(!scope.$uid) {
							location.reload()
						}if(typeofcallback==="function") {
							callback(el)
						}
					}
				});
				var itv=setTimeout(function () {
					try{
						cbdia&&(cbdia.close());
						if(!scope.$uid) {
							location.reload()
						}
					}catch(e) {
					}
				},2000);
				var _setextinfo=function (extinfo) {
					if(extinfo&&extinfo.length>0) {
						if(!scope.extinfo) {
							scope.extinfo=new Array()
						}for(var i=0;i<extinfo.length;i++) {
							scope.extinfo[extinfo[i]["shorturl_id"]]={
								url:extinfo[i]["url"],title:extinfo[i]["title"],type:extinfo[i]["type"],ourl:extinfo[i]["ourl"]
							}
						}
					}else {
						return false
					}
				};
				if(scope.$uid==scope.$oid&&data&&data.html) {
					cbdia.onClose=function () {
						if(itv) {
							clearTimeout(itv);
							itv=null
						}var feedlist=$E("feed_list");
						if(feedlist) {
							var feedBox=document.createElement("UL");
							feedlist.parentNode.insertBefore(feedBox,feedlist);
							feedBox.innerHTML=data.html;
							if(App.refurbishUpdate) {
								App.refurbishUpdate.add(1)
							}_setextinfo(data.extinfo);
							App.bindmedia(feedBox);
							feedlist.insertBefore((feedBox.getElementsByTagName("LI"))[0],(feedlist.getElementsByTagName("LI"))[0]);
							feedBox.parentNode.removeChild(feedBox)
						}
					}
				}var num=$E(exid);
				if(num) {
					var count=num.innerHTML.match(/\d+/)||0;
					num.innerHTML="("+(parseInt(count)+1)+")";
					num.style.display=""
				}
			};
			var ecb=function (json) {
				mdforwardbtn.className=enableClass;
				App.alert(json,{
					ok:function () {
						if(!scope.$uid) {
							location.reload()
						}
					}
				})
			};
			var getPara=0;
			if($E("lastForwarder")&&$E("lastForwarder").checked) {
				postdata.isLast="1";
				getPara++
			}if($E("initBloger")&&$E("initBloger").checked) {
				postdata.isRoot="1";
				getPara++
			}if(getPara>0) {
				url+="?f="+getPara
			}App.doRequest(postdata,url,cb,ecb)
		}function errortTip(str,el) {
			el.focus();
			App.fixElement.setHTML(str,"",options);
			mdforwardbtn.className=enableClass;
			return false
		}if(!scope.$uid) {
			passcardOBJ.init(name,{
				overfcolor:"#999",overbgcolor:"#e8f4fc",outfcolor:"#000000",outbgcolor:""
			},pwd,window);
			App.initLoginInput(name)
		}mdforwardbtn.onclick=function () {
			if(!forwardInputLimit()) {
				var orbit=["#fff","#fee","#fdd","#fcc","#fdd","#fee","#fff","#fee","#fdd","#fcc","#fdd","#fee","#fff"];
				var index=0;
				var hook=App.timer.add(function () {
					if(index/2>=orbit.length) {
						App.timer.remove(hook);
						return false
					}mdforwardtextarea.style.backgroundColor=orbit[index/2];
					index+=1
				});
				return false
			}if(mdforwardbtn.className==disClass) {
				return false
			}mdforwardbtn.className=disClass;
			if(scope.$uid) {
				forwardSuccess()
			}else {
				var namestr=Core.String.trim(name.value);
				var pwdstr=Core.String.trim(pwd.value);
				if(!namestr||namestr==name.title) {
					errortTip("请输入登录名",name);
					return false
				}else {
					App.fixElement.hidden()
				}if(!pwdstr) {
					errortTip("请输入密码",pwd);
					return false
				}else {
					App.fixElement.hidden()
				}App.LoginAction({
					name:namestr,pwd:pwdstr,remb:7,error:function (reason,errno) {
						var msg="";
						if(errno=="4010") {
							reason=App.getMsg({
								code:"R01011"
							});
							msg=App.getMsg("R01010",{
								mail:loginname.value
							})
						}else {
							if(errno=="101"||errno=="5") {
								msg=App.getMsg({
									code:"R01007"
								})
							}
						}App.fixElement.setHTML(reason,msg,options);
						mdforwardbtn.className=enableClass
					},succ:function () {
						forwardSuccess()
					}
				})
			}return false
		};
		App.enterSubmit({
			parent:"forwardcontent",action:function () {
				mdforwardbtn.onclick()
			}
		})
	};
	Core.Dom.insertAfter=function (newElement,targetElement) {
		var parent=targetElement.parentNode;
		if(parent.lastChild==targetElement) {
			parent.appendChild(newElement)
		}else {
			parent.insertBefore(newElement,targetElement.nextSibling)
		}return newElement
	};
	Core.Dom.removeNode=function (node) {
		node=$E(node)||node;
		try{
			node.parentNode.removeChild(node)
		}catch(e) {
		}
	};
	App.copyText=function (text2copy) {
		var checkFlashVer=function () {
			var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"])?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0;
			if(plugin) {
				var words=navigator.plugins["Shockwave Flash"].description.split(" ");
				for(var i=0;i<words.length;++i) {
					if(isNaN(parseInt(words[i],10))) {
						continue
					}var MM_PluginVersion=words[i]
				}return MM_PluginVersion>=10
			}else {
				if($IE) {
					try{
						new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
						return true
					}catch(e) {
						return false
					}
				}
			}
		};
		if(window.clipboardData&&$IE6) {
			window.clipboardData.clearData();
			return window.clipboardData.setData("Text",text2copy)
		}else {
			if(checkFlashVer()) {
				if($IE) {
					try{
						window.clipboardData.clearData();
						return window.clipboardData.setData("Text",text2copy)
					}catch(e) {
						return false
					}
				}try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					var clip=Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
					if(!clip) {
						return
					}var trans=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
					if(!trans) {
						return
					}trans.addDataFlavor("text/unicode");
					var str={
					};
					var len={
					};
					str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
					var copytext=text2copy;
					str.data=copytext;
					trans.setTransferData("text/unicode",str,copytext.length*2);
					var clipid=Components.interfaces.nsIClipboard;
					if(!clip) {
						return false
					}clip.setData(trans,null,clipid.kGlobalClipboard);
					return true
				}catch(e) {
					return false
				}
			}else {
				var flashcopier="flashcopier";
				if(!$E(flashcopier)) {
					var divholder=$C("div");
					divholder.id=flashcopier;
					document.body.appendChild(divholder)
				}text2copy=text2copy.replace(/%/g,escape("%")).replace(/&/g,escape("&"));
				var divinfo='<embed src="/view/js/clipboard.swf" FlashVars="clipboard='+text2copy+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
				$E(flashcopier).innerHTML=divinfo;
				return true
			}
		}
	};
	(function (proxy) {
		var movingKey=false;
		var g=10;
		var m=20;
		var k=10;
		var s=0;
		var u=0;
		var l=0;
		var v=0;
		var p=0.4;
		proxy.curtain={
			"droop":function (element,isHorizontal) {
				if(movingKey) {
					return false
				}movingKey=true;
				var elementOverflow=element.style.overflow;
				element.style.visibility="hidden";
				element.style.display="block";
				element.style.overflow="hidden";
				var h=parseInt(element.offsetHeight);
				var dropOrbit=proxy.animation.curtain(proxy.timer.delay,h,p);
				var current=0;
				var tk=proxy.timer.add(function () {
					if(current>=dropOrbit.length) {
						proxy.timer.remove(tk);
						element.style.height=h+"px";
						element.style.overflow=elementOverflow;
						movingKey=false;
						return false
					}element.style.height=dropOrbit[current]+"px";
					element.scrollTop=(h-dropOrbit[current]);
					current++
				});
				element.style.height="0px";
				element.style.visibility="visible";
				return true
			},"raise":function (element,isHorizontal) {
				if(movingKey) {
					return false
				}movingKey=true;
				var elementOverflow=element.style.overflow;
				element.style.overflow="hidden";
				var h=parseInt(element.offsetHeight);
				var orbit=[];
				if(u!==0) {
					var lis=proxy.animation.speed(proxy.timer.delay,h*l,g/l);
					for(var i=0,len=lis.length;i<len;i++) {
						orbit.push(h+lis[i])
					}
				}var li2=proxy.animation.speed(proxy.timer.delay,h*(1+l),g*10);
				for(var i=0,len=li2.length;i<len;i++) {
					orbit.push(li2[len-i-1])
				}var current=0;
				var tk=proxy.timer.add(function () {
					if(current>=orbit.length) {
						proxy.timer.remove(tk);
						element.style.display="none";
						element.style.height=h+"px";
						element.style.overflow=elementOverflow;
						movingKey=false;
						return false
					}element.style.height=orbit[current]+"px";
					element.scrollTop=(h-orbit[current]);
					current++
				})
			},"setting":function (config) {
				g=config["g"]||g;
				m=config["m"]||m;
				k=config["k"]||k;
				s=config["s"]||s;
				u=config["u"]||u;
				l=config["l"]||l
			}
		}
	})(App);
	App.promptTip=function (msgCode,replace,id,type) {
		var icon={
			"ask":4,"wrong":1,"error":2,"ok":3
		};
		type=type?type:"ok";
		var promptText=(typeofmsgCode=="object")?App.getMsg(msgCode,replace):msgCode;
		var str='		<div class="PY_clew">	            <div class="PY_clewcon">	                <div class="icon"><img align="absmiddle" class="PY_ib PY_ib_'+icon[type]+'" src="http://simg.sinajs.cn/miniblog/images/common/PY_ib.gif" alt="" title=""/></div>	                <div class="txt bold">	                    '+promptText+'	                </div>	                <div class="clear"></div>	            </div>	    </div>';
		var errId=$E(id?id:"system_information");
		errId.innerHTML=str;
		errId.style["display"]="";
		App.curtain.droop(errId);
		window.scrollTo(0,0);
		App.promptTip.close=(function (allreadyId) {
			return function () {
				if(allreadyId) {
					App.curtain.raise(allreadyId)
				}
			}
		})(errId);
		setTimeout(function () {
			App.promptTip.close()
		},2000)
	};
	Core.Dom.contains=function (oParentNode,oNode) {
		return oParentNode.contains(oNode)
	};
	if(!$IE) {
		Core.Dom.contains=function (oParentNode,oNode) {
			do{
				if(oParentNode==oNode) {
					return true
				}
			}while(oNode=oNode.parentNode);
			return false
		}
	}App.changeBackColor=function (event,el) {
		event=event||window.event;
		var id=el.id;
		var cancel=$E("cancel_"+id);
		var message=$E("message_"+id);
		var remark=$E("remark_"+id);
		if(event.type=="mouseover") {
			var relatedTarget=event.relatedTarget||event.fromElement;
			if(el!=relatedTarget&&relatedTarget&&!Core.Dom.contains(el,relatedTarget)) {
				if(cancel) {
					cancel.style.display=""
				}if(message) {
					message.style.display=""
				}if(remark) {
					remark.style.display=""
				}
			}
		}if(event.type=="mouseout") {
			var relatedTarget=event.relatedTarget||event.toElement;
			if(el!=relatedTarget&&relatedTarget&&!Core.Dom.contains(el,relatedTarget)) {
				if(cancel) {
					cancel.style.display="none"
				}if(message) {
					message.style.display="none"
				}if(remark) {
					remark.style.display="none"
				}
			}
		}
	};
	App.admin_uid_list=["1257113795","1642909335","1658688240","1661523401"];
	Core.Array.findit=function (arr,v) {
		var k=-1;
		Core.Array.foreach(arr,function (value,index) {
			if(v==value) {
				k=index
			}
		});
		return k
	};
	App.followadd=function (uid,el,url) {
		url="/attention/aj_addfollow.php";
		while(el.nodeName.toLowerCase(0)!="p") {
			el=el.parentNode
		}function cb(json) {
			if(scope.$pageid=="follow"&&scope.$oid==scope.$uid) {
				var imgURI="http://simg.sinajs.cn/"+scope.$PRODUCT_NAME+"style/images/common/transparent.gif";
				el.innerHTML='<img class="small_icon sicon_atteo" title="互相关注中" src="'+imgURI+'">'
			}else {
				el.innerHTML='<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"></span>已关注</a>'
			}
		}if(el.ask_following) {
			return false
		}App.followOperation({
			uid:uid,fromuid:scope.$uid
		},url,cb);
		el.ask_following=true
	};
	App.followcancel=function (uid,el,act,name,sex) {
		sex=sex||"TA";
		var stxt="移除之后将取消"+sex+"对你的关注";
		if(Core.Array.findit(App.admin_uid_list,uid)===-1) {
			stxt+="<div style='margin-top:10px;font-size:14px;'>"+"<input style='vertical-align:-1px;margin-right:3px;' type='checkbox' id='block_user'>同时将此用户加入黑名单</div>"
		}var msg=act==1?{
			des:stxt,html:"确定要移除"+name+"?"
		}:("确定要取消关注"+name+"?");
		App.flyDialog(msg,"confirm",el,{
			ok:function () {
				var url="/attention/aj_delfollow.php";
				var param={
					touid:uid,fromuid:scope.$uid
				};
				if(act&&act==1) {
					param.action=1
				}if($E("block_user")&&$E("block_user").checked) {
					param.isblack="OK"
				}function cb(json) {
					if(act&&act==1) {
						var tmp=el;
						while(tmp.nodeName.toLowerCase()!="li") {
							tmp=tmp.parentNode
						}Core.Dom.removeNode(tmp)
					}else {
						while(el.nodeName.toLowerCase()!="li") {
							el=el.parentNode
						}Core.Dom.removeNode(el)
					}if($E("att_wrap")) {
						if(!$E("att_wrap").getElementsByTagName("LI").length) {
							window.location.reload(true)
						}
					}
				}App.followOperation(param,url,cb)
			}
		})
	};
	App.followOperation=function (data,url,cb) {
		if(!scope.$uid) {
			App.ModLogin({
				func:arguments.callee,param:[data,url,cb]
			});
			return false
		}if(scope.$cuser_status==="nofull") {
			App.finishInformation();
			return false
		}if(scope.$uid=="123456") {
			var arg=arguments[0];
			data=arg[0];
			url=arg[1];
			cb=arg[2]
		}function ecb(json) {
			if(json.code=="M00003") {
				App.ModLogin()
			}else {
				App.alert(json,{
					ok:function () {
						if(scope.$uid=="123456") {
							location.reload()
						}
					}
				})
			}
		}var sucss=function (json) {
			cb(json);
			if(scope.$uid=="123456") {
				location.reload(true)
			}
		};
		App.doRequest(data,url,sucss,ecb)
	};
	App.copyLink=function (event) {
		var copytext=$E("copytext");
		var sucStr="邀请链接复制成功！ 你可以利用快捷方式Ctrl+V键粘贴到UC、QQ或MSN等聊天工具中。";
		var options={
			icon:3
		};
		if(App.copyText(copytext.value)==false) {
			sucStr="你的浏览器不支持脚本复制或你拒绝了浏览器安全确认，请尝试手动[Ctrl+C]复制。";
			options={
				icon:1
			}
		}App.flyDialog(sucStr,null,$E("copylink"),options);
		Core.Events.stopEvent(event)
	};
	$registJob("initPage",function () {
		var copytext=$E("copytext");
		if(copytext) {
			copytext.onfocus=copytext.onclick=function () {
				copytext.select()
			};
			Core.Events.addEvent($E("copylink"),App.copyLink,"click")
		}
	});
	App.followAll=function (btn) {
		try{
			if(scope.$uid!=scope.$oid) {
				return
			}var els=$E("att_wrap").getElementsByTagName("li");
			var uids=[];
			for(var i=0,len=els.length;i<len;i++) {
				var el=els[i];
				if(el.className.search(/cur/i)!=-1) {
					continue
				}uids.push(el.id)
			}if(!uids.length) {
				return false
			}function changeBGcolor(uids) {
				for(var i=0,ilen=uids.length;i<ilen;i++) {
					var uid=uids[i];
					var add=$E("add_"+uid);
					if(add) {
						if(scope.$uid==scope.$oid&&scope.$pageid=="follow") {
							var imgURI="http://simg.sinajs.cn/"+scope.$PRODUCT_NAME+"style/images/common/transparent.gif";
							var _p=$C("p");
							_p.className="mutual";
							_p.innerHTML='<img class="small_icon sicon_atteo" title="互相关注中" src="'+imgURI+'">';
							Core.Dom.replaceNode(_p,add)
						}else {
							add.innerHTML='<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"/>已关注</a>'
						}
					}
				}
			}function cb() {
				changeBGcolor(uids);
				App.promptTip("已关注成功！",null,"system_information");
				if($IE) {
					location.hash="top"
				}else {
					document.body.scrollIntoView()
				}
			}function ecb(json) {
				App.promptTip(json,null,"system_information","error");
				if(json.code=="M05003") {
					changeBGcolor(json.data.uids)
				}if($IE) {
					location.hash="top"
				}else {
					document.body.scrollIntoView()
				}
			}App.doRequest({
				uid:uids.join(","),fromuid:scope.$uid
			},"/attention/aj_addfollow.php",cb,ecb)
		}catch(e) {
		}
	};
	App.followRemarkAdd=function (el,fid,oldMark) {
		var initErrorTip="超过8个字啦！为他起个常用名吧";
		var html='<div style="width: 390px;" class="layerBoxCon">	    <div class="inviteLayer">	        <p class="flName">	            设置备注名：	        </p>	        <div class="inviteLayerInput">	            <input type="text" class="PY_input" id="remark" value="">	            <a id="submit" href="javascript:void(0);" class="btn_normal"><em>保存</em></a>	        </div>	        <p class="errorTs yellow2" id="errorTip" style="display:none;">'+initErrorTip+"</p>	    </div>	</div>";
		var cfg={
			width:390,zIndex:1000,hidden:true
		};
		var dialog=new App.Dialog.BasicDialog("设置",html,cfg);
		dialog.show();
		var remark=$E("remark"),errorTip=$E("errorTip"),submit=$E("submit");
		var isChrome=(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1);
		if(isChrome) {
			submit.style.top="-3px"
		}remark.focus();
		remark.value=(App._remarks_&&App._remarks_[fid])||oldMark||remark.value;
		if(App._remarks_&&App._remarks_[fid]=="") {
			remark.value=""
		}var init=true;
		Core.Events.addEvent(remark,function () {
			if(init&&!oldMark&&!(App._remarks_&&App._remarks_[fid])) {
				remark.value="";
				init=false
			}
		},"focus");
		Core.Events.addEvent(remark,function () {
			var len=Core.String.byteLength(remark.value);
			if(len>16) {
				errorTip.innerHTML=initErrorTip;
				errorTip.style.display="block";
				setTimeout(function () {
					remark.focus()
				},100)
			}else {
				if(errorTip.innerHTML==initErrorTip) {
					errorTip.style.display="none"
				}
			}
		},"blur");
		Core.Events.addEvent(remark,function () {
			var len=Core.String.byteLength(remark.value);
			if(len>16) {
				remark.value=Core.String.leftB(remark.value,16)
			}else {
				if(errorTip.innerHTML==initErrorTip) {
					errorTip.style.display="none"
				}
			}
		},"keyup");
		function setRemark() {
			if(Core.String.byteLength(remark.value)>16) {
				errorTip.innerHTML=initErrorTip;
				errorTip.style.display="block";
				setTimeout(function () {
					remark.focus()
				},200);
				return
			}var name=remark.value;
			App.doRequest({
				fuid:fid,remarkname:name
			},"/attention/aj_remarkname.php",function () {
				App._remarks_=App._remarks_||{
				};
				App._remarks_[fid]=name;
				dialog.close();
				var remarkName=Core.Dom.getElementsByClass(el.parentNode.parentNode.parentNode,"span","remark")[0];
				if(remarkName&&Core.String.trim(name).length>0) {
					remarkName.innerHTML="&nbsp;("+Core.String.encodeHTML(Core.String.trim(name))+")"
				}if(remarkName&&Core.String.trim(name).length===0) {
					remarkName.innerHTML=""
				}
			},function () {
				if(arguments[0]&&arguments[0].code) {
					errorTip.innerHTML=$SYSMSG[arguments[0].code];
					errorTip.style.display="block"
				}else {
					App.alert("设置备注失败!",{
						icon:2,width:370,height:120
					})
				}
			})
		}Core.Events.addEvent(submit,setRemark,"click");
		App.enterSubmit({
			parent:submit.parentNode,action:function () {
				Core.Events.fireEvent(submit,"click")
			}
		})
	};
	App.rightSideFollow=function (uid,el,callback) {
		var url="/attention/aj_addfollow.php";
		function cb() {
			var newDom=document.createElement("SPAN");
			newDom.innerHTML="已关注";
			Core.Dom.insertAfter(newDom,el);
			Core.Dom.removeNode(el);
			if(typeof(callback)=="function") {
				callback()
			}
		}App.followOperation({
			uid:uid,fromuid:scope.$uid
		},url,cb)
	};
	App.delDialog=function (sText,sPostApi,oPost,fCallBack,fError,oFormTarget,sTitle) {
		var oDialog=App.flyDialog(sText,"confirm",oFormTarget||null,{
			ok:function () {
				if($E("block_user")&&$E("block_user").checked) {
					oPost.isblack="OK"
				}Utils.Io.Ajax.request(sPostApi,{
					"POST":oPost,"onComplete":fCallBack,"onException":fError,"returnType":"json"
				})
			},icon:4,title:sTitle
		});
		return oDialog
	};
	App.msgPublisher=function (oElement,oConfig,bRefresh,fCallBack) {
		oElement=oElement||{
		};
		oConfig=oConfig||{
			"limit":600,"postUrl":"/message/addmsg.php","normClass":"btn_normal","disabledClass":"btn_notclick"
		};
		var msgPublisher={
		};
		msgPublisher.limit=(function (e,c) {
			return function () {
				var snapText=e.editor.value;
				var snapLength=Core.String.byteLength(snapText);
				if(snapLength>c.limit) {
					e.editor.value=Core.String.leftB(snapText,c.limit)
				}
			}
		})(oElement,oConfig);
		App.autoHeightTextArea(oElement.editor,msgPublisher.limit,oConfig.maxHeight||null);
		msgPublisher.submit=(function (e,c) {
			return function () {
				try{
					if(!e.submit.lock) {
						e.submit.className=c.disabledClass||e.submit.className;
						e.submit.lock=true;
						var nick=Core.String.trim(e.nick.value);
						if(!nick||nick=="请输入对方昵称") {
							e.submit.className=c.normClass||e.submit.className;
							e.submit.lock=false;
							e.info.innerHTML=$SYSMSG["M01100"];
							e.info.style.display="";
							return
						}var content=Core.String.trim(e.editor.value);
						if(!content) {
							e.submit.className=c.normClass||e.submit.className;
							e.submit.lock=false;
							e.info.innerHTML=$SYSMSG["M07001"];
							e.info.style.display="";
							return
						}var oPost={
							"content":encodeURIComponent(content),"name":encodeURIComponent(nick)
						};
						Utils.Io.Ajax.request(c.postUrl,{
							"POST":oPost,"onComplete":function (oResult) {
								e.submit.className=c.normClass||e.submit.className;
								e.submit.lock=false;
								if(oResult.code=="A00006") {
									if(fCallBack) {
										fCallBack()
									}if(bRefresh) {
										window.location.reload(true)
									}else {
										var al=App.alert($SYSMSG["M09003"],{
											"icon":3
										});
										setTimeout(function () {
											al.close()
										},2000)
									}
								}else {
									if(oResult.code=="M00003") {
										App.ModLogin(function () {
											window.location.reload(true)
										})
									}else {
										e.info.innerHTML=$SYSMSG[oResult.code];
										e.info.style.display=""
									}
								}
							},"onException":function () {
								e.submit.className=c.normClass||e.submit.className;
								e.submit.lock=false
							},"returnType":"json"
						})
					}
				}catch(error) {
				}
			}
		})(oElement,oConfig);
		if(oElement.editor) {
			Core.Events.addEvent(oElement.editor,function (event) {
				if((event.ctrlKey==true&&event.keyCode=="13")||(event.altKey==true&&event.keyCode=="83")) {
					oElement.editor.blur();
					msgPublisher.submit()
				}
			},"keyup")
		}if(oElement.nick) {
			Core.Events.addEvent(oElement.nick,(function (n) {
				return function () {
					if(n.value=="请输入对方昵称") {
						n.value=""
					}n.style.color="#333333"
				}
			})(oElement.nick),"focus");
			Core.Events.addEvent(oElement.nick,(function (n) {
				return function () {
					if(Core.String.trim(n.value)=="") {
						n.value="请输入对方昵称"
					}n.style.color="#999999"
				}
			})(oElement.nick),"blur");
			oElement.nick.value=oElement.nick.value||"请输入对方昵称";
			oElement.nick.style.color="#999999"
		}if(oElement.submit) {
			Core.Events.addEvent(oElement.submit,msgPublisher.submit,"click")
		}return msgPublisher
	};
	(function (proxy) {
		$C=function (tagName) {
			return document.createElement(tagName)
		};
		var adEvent=Core.Events.addEvent;
		var spEvent=Core.Events.stopEvent;
		var rmEvent=Core.Events.removeEvent;
		var position=Core.Dom.getXY;
		var makeItem=function (spec) {
			if(spec===undefined) {
				throw"the dropDown item need parameters"
			}spec.text=spec.text||spec.value;
			spec.ele=spec.ele||$C("LI");
			spec.focus=spec.focus||function () {
			};
			spec.blur=spec.blur||function () {
			};
			spec.ok=spec.ok||function () {
			};
			spec.tnode=document.createTextNode("");
			spec.ele.appendChild(spec.tnode);
			spec.ele.setAttribute("unselectable","on");
			if(spec.itemStyle) {
				spec.ele.style.cssText=spec.itemStyle
			}adEvent(spec.ele,function () {
				spec.focus(that)
			},"mouseover");
			adEvent(spec.ele,function () {
				spec.blur(that)
			},"mouseout");
			adEvent(spec.ele,function () {
				spec.ok(that)
			},"click");
			adEvent(spec.ele,spEvent,"mousedown");
			var that={
			};
			that.set=function (key,value) {
				if((key=="focus"||key=="ok")&&typeofvalue!="function") {
					throw"dropDown item need function as parameters"
				}spec[key]=value;
				if(key=="text") {
					spec.ele.innerHTML=value
				}if(key=="HTML") {
					spec.ele.innerHTML=value
				}return that
			};
			that.get=function (key) {
				return spec[key]
			};
			return that
		};
		var dropDown=function (spec) {
			var that={
			};
			if(spec===undefined) {
				spec={
				}
			}spec.items=[];
			spec.count=0;
			spec.current=-1;
			spec.key={
				"ENTER":13,"ESC":27,"UP":38,"DOWN":40,"LEFT":37,"RIGHT":39,"BACK":8,"TABLE":9
			};
			spec.box=$C("DIV");
			spec.shell=$C("UL");
			spec.showing=false;
			spec.box.appendChild(spec.shell);
			document.body.appendChild(spec.box);
			var light=function (item) {
				item=item||spec.items[spec.current];
				spec.light(item.get("ele"))
			};
			var dark=function (item) {
				item=item||spec.items[spec.current];
				if(item) {
					spec.dark(item.get("ele"))
				}
			};
			spec.newItem=function () {
				var item=makeItem({
					"ok":spec.select,"focus":function (item) {
						if(spec.items[spec.current]) {
							dark()
						}spec.current=item.index;
						light()
					},"itemStyle":spec.itemStyle
				});
				spec.shell.appendChild(item.get("ele"));
				return item
			};
			spec.getItem=function (k) {
				if(!spec.items[k]) {
					spec.items[k]=spec.newItem();
					spec.items[k].index=k
				}return spec.items[k]
			};
			spec.up=function () {
				if(spec.current>=spec.count||spec.current<=0) {
					dark(spec.items[0]);
					spec.current=spec.count-1
				}else {
					dark();
					spec.current-=1
				}light()
			};
			spec.down=function () {
				if(spec.current>=spec.count-1||spec.current<0) {
					dark(spec.items[spec.count-1]);
					spec.current=0
				}else {
					dark();
					spec.current+=1
				}light()
			};
			spec.open=function () {
				spec.box.style.display="";
				adEvent(document.documentElement,spec.hotKey,"keydown");
				spec.showing=true
			};
			spec.close=function () {
				spec.box.style.display="none";
				rmEvent(document.documentElement,spec.hotKey,"keydown");
				spec.showing=false
			};
			spec.hotKey=function (e) {
				var ev=window.event||e;
				var code=ev.keyCode;
				if(code==spec.key["UP"]) {
					spec.up();
					spEvent();
					return false
				}else {
					if(code==spec.key["DOWN"]) {
						spec.down();
						spEvent();
						return false
					}else {
						if(code==spec.key["ESC"]) {
							spec.close();
							spEvent();
							return false
						}
					}
				}
			};
			that.show=function (el) {
				spec.open();
				return that
			};
			that.hidd=function (el) {
				spec.close();
				if(spec.current!==-1) {
					dark()
				}spec.current=-1;
				return that
			};
			that.light=function (index) {
				light(spec.items[index]);
				return that
			};
			that.dark=function (index) {
				dark(spec.items[index]);
				return that
			};
			that.data=function (param) {
				for(var i=0,len=param.length;i<len;i+=1) {
					spec.getItem(i).set("text",param[i]["text"]).set("value",param[i]["value"]).get("ele").style.display=""
				}for(var i=param.length,len=spec.items.length;i<len;i+=1) {
					spec.getItem(i).get("ele").style.display="none"
				}spec.count=param.length;
				dark();
				spec.current=-1;
				return that
			};
			that.pushData=function (param) {
				for(var i=0,len=param.length;i<len;i+=1) {
					spec.getItem(spec.count+i).set("text",param[i]["text"]).set("value",param[i]["value"])
				}spec.count+=param.length;
				return that
			};
			that.set=function (key,value) {
				if(key==="position") {
					spec.box.style.left=value[0]+"px";
					spec.box.style.top=value[1]+"px"
				}return that
			};
			that.get=function (key) {
				if(key==="current") {
					return spec.items[spec.current]
				}if(key==="index") {
					return spec.current
				}return spec[key]
			};
			return that
		};
		var infoTips=function (spec) {
			var that={
			};
			spec.box=document.createElement("DIV");
			spec.box.innerHTML=spec.info;
			if(spec.style) {
				spec.box.style.cssText=spec.style
			}if(spec.className) {
				spec.box.className=spec.className
			}spec.box.style.position="absolute";
			spec.box.style.display="none";
			document.body.appendChild(spec.box);
			that.show=function () {
				spec.box.style.display=""
			};
			that.hidd=function () {
				spec.box.style.display="none"
			};
			that.set=function (key,value) {
				if(key==="position") {
					spec.box.style.left=value[0]+"px";
					spec.box.style.top=value[1]+"px"
				}return that
			};
			that.get=function (key) {
				return spec[key]
			};
			return that
		};
		var searchInfo=function (spec) {
			var that={
			};
			var defaultSearch=function (key,cb) {
				if(spec.data.length===0||!key) {
					setTimeout(function () {
						cb([])
					},0)
				}else {
					var res=[];
					for(var i=0,len=spec.data.length;i<len;i+=1) {
						if(spec.data[i].value.indexOf(key)!=-1) {
							res[res.length]=spec.data[i]
						}
					}setTimeout(function () {
						cb(res)
					},0)
				}
			};
			ajax=function (key,cb) {
				Utils.Io.Ajax.request(spec.data,{
					"GET":{
						"key":key
					},"onComplete":function (json) {
						if(json.code==="A00006") {
							if(typeofspec.search==="function") {
								json.data=spec.search(json.data)
							}cb(json.data)
						}
					},"returnType":"json"
				})
			};
			jsonp=function () {
			};
			if(spec.type==="ajax") {
				defaultSearch=ajax
			}else {
				if(spec.type==="jsonp") {
					defaultSearch=jsonp
				}else {
					if(typeofspec.search==="function") {
						defaultSearch=spec.search
					}
				}
			}that.result=function (key,cb) {
				defaultSearch(key,cb)
			};
			that.set=function (key,value) {
				spec[key]=value;
				return that
			};
			return that
		};
		proxy.autoComplate=function (spec) {
			if(!spec.input) {
				throw"the autoComplate need an input as an parameter"
			}var timeHandle=null;
			var search=searchInfo({
				"type":spec.type,"data":spec.data,"search":spec.search
			});
			var dropper=dropDown({
				"select":function (item) {
					spec.ok(item.get("value"),item.get("text"));
					spec.input.blur()
				},"itemStyle":spec["itemStyle"],"light":spec.light,"dark":spec.dark
			});
			if(spec["emptyInfo"]) {
				var infobox=infoTips({
					"info":spec.emptyInfo,"style":spec.emptyStyle,"className":spec.emptyClass
				})
			}dropper.get("box").className=spec["class"];
			dropper.get("box").style.cssText=spec["style"];
			dropper.hidd();
			if("v"=="\v") {
				var frame=$C("IFRAME");
				frame.style.zIndex=50;
				frame.style.display="none";
				frame.style.position="absolute";
				document.body.appendChild(frame)
			}var cache={
			};
			spec.formatKey=spec.formatKey||function (v) {
				return v
			};
			var getData=function (key,cb) {
				key=spec.formatKey(key);
				if(!cache[key]) {
					search.result(key,function (data) {
						if(data.length===0) {
							if(key.indexOf(spec.emptkey)!==-1) {
								spec.emptykey=key
							}
						}cb(data);
						cache[key]=data
					})
				}else {
					setTimeout(function () {
						cb(cache[key])
					},0)
				}
			};
			adEvent(spec.input,function (e) {
				var ev=window.event||e;
				if(ev.keyCode===13) {
					if(dropper.get("current")) {
						spec.ok(dropper.get("current").get("value"),dropper.get("current").get("text"));
						spEvent(ev)
					}if(!spec.noBlur) {
						spec.input.blur()
					}
				}
			},"keypress");
			var start=function () {
				timeHandle=setInterval(loop,100*spec.timer);
				spec.searching="";
				spec.emptykey="";
				var dis=position(spec.input);
				dis[1]+=spec.input.offsetHeight;
				if(infobox) {
					infobox.set("position",dis).show()
				}
			};
			var end=function () {
				clearInterval(timeHandle);
				dropper.hidd();
				spec.searching="";
				spec.emptykey="";
				if("v"=="\v") {
					frame.style.display="none"
				}if(infobox) {
					infobox.hidd()
				}
			};
			var callback=function (data) {
				dropper.data(data);
				if(data.length) {
					if(!dropper.get("showing")) {
						dropper.show()
					}if("v"=="\v") {
						frame.style.width=dropper.get("box").offsetWidth+"px";
						frame.style.height=dropper.get("box").offsetHeight+"px";
						var dis=position(dropper.get("box"));
						frame.style.top=dis[1]+"px";
						frame.style.left=dis[0]+"px";
						frame.style.display=""
					}
				}else {
					dropper.hidd();
					if("v"=="\v") {
						frame.style.display="none"
					}
				}
			};
			var loop=function () {
				if(spec.input.value===spec.searching) {
					return false
				}if(spec.input.value.indexOf(spec.emptykey)!==-1&&spec.emptykey!=="") {
					return false
				}spec.searching=spec.input.value;
				var dis=position(spec.input);
				dis[1]+=spec.input.offsetHeight;
				dropper.set("position",dis);
				if(spec.input.value==="") {
					setTimeout(function () {
						callback([])
					},0);
					if(infobox) {
						infobox.set("position",dis).show()
					}
				}else {
					getData(spec.input.value,callback);
					if(infobox) {
						infobox.hidd()
					}
				}
			};
			adEvent(spec.input,start,"focus");
			adEvent(spec.input,end,"blur");
			spec.searching="";
			spec.emptykey="";
			var that={
			};
			that.get=function (key) {
				if(key==="index") {
					return dropper.get("index")
				}return spec[key]
			};
			that.set=function (key,value) {
				if(key==="data") {
					search.set("data",value);
					cache={
					}
				}
			};
			that.end=function () {
				end();
				return that
			};
			return that
		}
	})(App);
	App.fansfind=function (spec) {
		spec["ok"]=function (value,text) {
			text=text.replace(/\(.*\)/g,"");
			if(spec["input"].value&&/,|;
			|\uFF0C|\uFF1B|\u3001|\s/.test(spec["input"].value)) {
				var arr=spec["input"].value.split(/,|;
				|\uFF0C|\uFF1B|\u3001|\s/);
				var v=spec["input"].value.substring(0,spec["input"].value.length-arr[arr.length-1].length);
				spec["input"].value=v+text+" "
			}else {
				spec["input"].value=text
			}if(spec["select"]&&typeofspec["select"]=="function") {
				spec["select"](value,text)
			}
		};
		spec["timer"]=spec["timer"]||5;
		spec["style"]=spec["style"]||"width:"+spec["input"].clientWidth+"px;position:absolute;z-Index:1200;";
		spec["light"]=spec["light"]||function (el) {
			el.className="cur"
		};
		spec["dark"]=spec["dark"]||function (el) {
			el.className=""
		};
		spec["class"]=spec["class"]||"layerMedia_menu";
		spec["type"]=spec["type"]||"ajax";
		spec["data"]=spec["data"]||"/attention/aj_chooser.php?key="+spec["input"].value+"&type="+spec["searchtype"];
		spec["itemStyle"]="overflow:hidden;height:20px";
		return App.autoComplate(spec)
	};
	App.msgDialog=function (nick,bRefresh) {
		var getTarget=function () {
			var oEvent=Core.Events.getEvent();
			var oTarget=oEvent.srcElement||oEvent.target;
			while(oTarget.nodeType!=1) {
				oTarget=oTarget.parentNode
			}return oTarget
		};
		var oFormElement=getTarget();
		var html='<table class="noteTab2"><tbody>	<tr>	<th>发私信给：&nbsp;</th><td><input  id="popUpNick" type="text"  class="PY_input" value="'+(nick||"")+'"/>&nbsp;&nbsp;<!--<span class="gray9">只能发给粉丝</span>--></td></tr>	<tr><th>私信内容：&nbsp;</th><td><textarea id="popUpEditor" class="PY_input"></textarea></td>	</tr><tr><th/><td><a id="popUpSubmit" href="javascript:void(0);" class="btn_normal" ><em>发送</em></a>	<span id="popUpError" style="display:none" class="errorTs2 error_color">密码错误</span></td></tr>	<tr><td></td><td><p class="inviteLayer_tip gray9">说明：长度不能超过300字</p></td></tr> 	</tbody></table>';
		var c={
			width:430,zIndex:1000,hidden:true
		};
		var oDialog=new App.Dialog.BasicDialog("发私信",html,c);
		App.fansfind({
			input:$E("popUpNick"),searchtype:1
		});
		if(oFormElement) {
			App.doFlyOut(oFormElement,oDialog._node,{
				resFun:function () {
					try{
						oDialog.show()
					}catch(e) {
					}
				},"style":"border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",time:0.75
			})
		}else {
			oDialog.show()
		}var oElement={
			submit:$E("popUpSubmit"),editor:$E("popUpEditor"),info:$E("popUpError"),nick:$E("popUpNick")
		};
		App.msgPublisher(oElement,null,bRefresh,function () {
			oDialog.close()
		});
		return oDialog
	};
	App.queryToJson=function (QS,isDecode) {
		var _Qlist=(Core.String.trim(QS)).split("&");
		var _json={
		};
		var _fData=function (data) {
			if(isDecode) {
				return decodeURIComponent(data)
			}else {
				return data
			}
		};
		for(var i=0,len=_Qlist.length;i<len;i++) {
			if(_Qlist[i]) {
				var _hsh=_Qlist[i].split("=");
				if(_hsh[1]) {
					if(!_json[_hsh[0]]) {
						_json[_hsh[0]]=_fData(_hsh[1])
					}else {
						_json[_hsh[0]]=[_fData(_hsh[1])].concat(_json[_hsh[0]])
					}
				}else {
					if(!_json["$nullName"]) {
						_json["$nullName"]=_fData(_hsh[0])
					}else {
						_json["$nullName"]=[_fData(_hsh[0])].concat(_json["$nullName"])
					}
				}
			}
		}return _json
	};
	(function (proxy) {
		proxy.checkEml=function (eml) {
			if(!/^[\.\w]([(\/)(\-)(\+).\w])*@([(\-)\w]{
				1,64
			}\.) {
				1,7
			}[(\-)\w]{
				1,64
			}$/.test(eml)) {
				return false
			}else {
				if(eml&&eml!=""&&(eml.indexOf("@")!=-1)) {
					var indexOfA=eml.indexOf("@");
					var name=eml.substring(0,indexOfA);
					if(name.length>64||eml.length>256) {
						return false
					}else {
						return true
					}
				}
			}return false
		};
		proxy.checkEmpty=function (str) {
			if(!str) {
				return false
			}if(!(strinstanceofString)) {
				str=str.toString ()
			}if((Core.String.trim(str)).length) {
				return true
			}else {
				return false
			}
		};
		proxy.checkRealName=function (str) {
			if(new RegExp("^[\u4e00-\u9fa5]{2,6}$").test(str)) {
				return true
			}else {
				if(new RegExp("^[a-z]{2,20}$").test(str)) {
					return true
				}else {
					if(new RegExp("^[a-z\u4e00-\u9fa5]{2,6}$")) {
						return true
					}else {
						return false
					}
				}
			}
		};
		var checkBase=function (regStr) {
			return function (beRegStr) {
				if(new RegExp(regStr).test(beRegStr)) {
					return true
				}else {
					return false
				}
			}
		};
		proxy.checkQQNum=function (str) {
			if(new RegExp("^[1-9][0-9]{4,11}$").test(str)) {
				return true
			}else {
				if(proxy.checkEml(str)) {
					return true
				}else {
					return false
				}
			}
		};
		proxy.checkUCNum=function (str) {
			if(new RegExp("^[1-9][0-9]{4,9}$").test(str)) {
				return true
			}else {
				return false
			}
		};
		proxy.checkMobile=checkBase("^1(\\d{10})+$");
		proxy.checkTrName=checkBase("^[\u4e00-\u9fa5]{2,6}$");
		proxy.checkNickSp=checkBase("^[0-9a-zA-Z\u4e00-\u9fa5_]*$");
		proxy.checkTrueNm=checkBase("^[a-zA-Z·s.\u4e00-\u9fa5]*$");
		proxy.checkSkype1=checkBase("^[0-9a-zA-Z](-|w) {3}(-|w)*$");
		proxy.checkSkype2=checkBase("[!#@%&/'\"$^*()+=[]{}?;:<>|~`\x80-\xff\\]");
		proxy.checkImgURI=checkBase("(.jpg|.gif|.png|.JPG|.GIF|.PNG)$");
		proxy.checkURL=checkBase("^http:\\/\\/([\\w-]+(\\.[\\w-]+)+(\\/[\\w-   .\\/\\?%&+=\\u4e00-\\u9fa5]*)?)?$");
		proxy.checkURLoose=checkBase("^([^://])+\\:\\/\\/([^\\.]+)(\\.)(.+)([^\\.]+)$");
		proxy.checkMiniName=checkBase("^[a-zA-Z0-9\u4e00-\u9fa5_]*$");
		proxy.checkIdCard=checkBase("^(([0-9]{15})|([0-9]{18})|([0-9]{17}(x|X)))$");
		proxy.checkSchool=function (str) {
			if(new RegExp("'|\"|<|>|[|]","g").test(str)) {
				return false
			}else {
				return true
			}
		};
		proxy.checkCompany=function (str) {
			if(new RegExp("'|\"|<|>|[|]","g").test(str)) {
				return false
			}else {
				return true
			}
		};
		proxy.checkMobileCheckCode=checkBase("^[0-9a-z]{6}$");
		proxy.checkSepicalSymbol=function (str) {
			if(new RegExp("[,|;|<|>]","g").test(str)) {
				return true
			}else {
				return false
			}
		};
		proxy.checkPwdPower=function (pwd,minlen,maxlen) {
			var len_p=(pwd.length-minlen)/(maxlen-minlen);
			var complex_p=0;
			if(/[A-Z]/g.test(pwd)) {
				complex_p+=0.273
			}if(/[a-z]/g.test(pwd)) {
				complex_p+=0.273
			}if(/[0-9]/g.test(pwd)) {
				complex_p+=0.114
			}if(/[^0-9a-zA-Z]/g.test(pwd)) {
				complex_p+=0.34
			}return len_p/2+complex_p/2
		};
		proxy.checkPwdPowerNew=function (sPW) {
			function CharMode(iN) {
				if(iN>=65&&iN<=90) {
					return 2
				}if(iN>=97&&iN<=122) {
					return 4
				}else {
					return 1
				}
			}function bitTotal(num) {
				var modes=0;
				for(i=0;i<3;i++) {
					if(num&1) {
						modes++
					}num>>>=1
				}return modes
			}var Modes=0;
			for(i=0;i<sPW.length;i++) {
				Modes|=CharMode(sPW.charCodeAt(i))
			}var btotal=bitTotal(Modes);
			if(sPW.length>=10) {
				btotal++
			}switch(btotal) {
				case 1:return 1;
				case 2:return 2;
				case 3:return 3;
				default:return 1
			}
		}
	})(App);
	(function (proxy) {
		proxy.imgURL=function (id,size) {
			function hexdec(hex_string) {
				hex_string=(hex_string+"").replace(/[^a-f0-9]/gi,"");
				return parseInt(hex_string,16)
			}var domainNum=(hexdec(id.substr(19,2))%16+1);
			var size=size||"middle";
			var result="";
			switch(size) {
				case "middle":result="http://ss"+domainNum+".sinaimg.cn/middle/"+id+"&690";
				break;
				case "bmiddle":result="http://ss"+domainNum+".sinaimg.cn/"+id+"&690";
				break;
				case "small":result="http://ss"+domainNum+".sinaimg.cn/small/"+id+"&690";
				break;
				case "thumbnail":result="http://ss"+domainNum+".sinaimg.cn/thumbnail/"+id+"&690";
				break;
				case "square":result="http://ss"+domainNum+".sinaimg.cn/square/"+id+"&690";
				break;
				case "orignal":result="http://ss"+domainNum+".sinaimg.cn/orignal/"+id+"&690";
				break;
				default:result="http://ss"+domainNum+".sinaimg.cn/small/"+id+"&690";
				break
			}return result
		}
	})(App);
	App.getEventDom=function (o) {
		if(/msie/.test(navigator.userAgent.toLowerCase())) {
			return o.srcElement
		}else {
			var node=o.target;
			while(node.nodeType!=1) {
				node=node.parentNode
			}return node
		}
	};
	App.isChildNode=function (child,parent) {
		while(child) {
			if(child==parent) {
				return true
			}if(child==document.body) {
				return false
			}child=child.parentNode
		}
	};
	App.getImgSize=function (url,echo) {
		var imgOverLoad=false;
		function startLoad() {
			var timer;
			var imgLoader=$C("div");
			imgLoader.style["visibility"]="hidden";
			imgLoader.style["height"]="1px";
			imgLoader.style["overFlow"]="hidden";
			var imgId="imgLoad"+(new Date().getTime());
			imgLoader.innerHTML='<img id="'+imgId+'" src="'+url+'" />';
			document.body.appendChild(imgLoader);
			var startTime=(new Date()).getTime();
			Core.Events.addEvent($E(imgId),afterImgLoaded,"load");
			timer=setTimeout(function () {
				Core.Events.removeEvent($E(imgId),afterImgLoaded,"load");
				Core.Dom.removeNode(imgLoader);
				img=null;
				imgLoader=null;
				startLoad()
			},3000);
			function afterImgLoaded(e) {
				try{
					var load_delay=(new Date()).getTime()-startTime;
					var oScript=document.createElement("script");
					oScript.src="http://v.t.sina.com.cn/c.html?img_url="+encodeURIComponent(url)+"&img_load_delay="+load_delay;
					document.body.appendChild(oScript)
				}catch(e) {
				}clearTimeout(timer);
				imgOverLoad=true;
				echo([$E(imgId).width,$E(imgId).height]);
				Core.Dom.removeNode(imgLoader);
				img=null;
				imgLoader=null;
				return
			}
		}startLoad()
	};
	if(App.cartoon===undefined) {
		App.cartoon={
		}
	}(function (proxy) {
		proxy.noticeInput=function (el,config) {
			if(!el) {
				throw"noticeInput need an element"
			}if(!config) {
				config={
				}
			}var orbit=config.orbit||["#fee","#fdd","#fcc","#fdd","#fee","#fff"];
			var times=config.times||2;
			var delay=config.delay||2;
			var index=0;
			var hook=App.timer.add(function () {
				if(index/delay>=orbit.length) {
					times-=1;
					if(times>0) {
						index=0
					}else {
						App.timer.remove(hook);
						return false
					}
				}el.style.backgroundColor=orbit[index/delay];
				index+=1
			});
			return false
		}
	})(App.cartoon);
	App.setCursor=function (oElement,pos,len) {
		var range=oElement.createTextRange();
		range.collapse(true);
		range.moveStart("character",pos+1);
		range.moveEnd("character",len-2);
		range.select()
	};
	App.insertTextArea=function (oElement,sValue,fFocus) {
		try{
			var fFocus=fFocus||function () {
				oElement.focus()
			};
			var textIndex=oElement.value.indexOf(sValue);
			if(textIndex!=-1) {
				fFocus();
				if($IE) {
					App.setCursor(oElement,textIndex,sValue.length)
				}else {
					oElement.setSelectionRange(textIndex+1,textIndex+sValue.length-1)
				}return false
			}if($IE) {
				try{
					if(oElement.createTextRange&&oElement.caretPos) {
						var caretPos=oElement.caretPos;
						caretPos.text=caretPos.text.charAt(caretPos.text.length-1)==" "?sValue+" ":sValue
					}else {
						oElement.value+=sValue
					}fFocus();
					App.setCursor(oElement,oElement.value.indexOf(sValue),sValue.length)
				}catch(exp) {
				}
			}else {
				if(oElement.setSelectionRange) {
					var rangeStart=oElement.selectionStart;
					var rangeEnd=oElement.selectionEnd;
					var tempStr1=oElement.value.substring(0,rangeStart);
					var tempStr2=oElement.value.substring(rangeEnd);
					oElement.value=tempStr1+sValue+tempStr2;
					oElement.setSelectionRange(tempStr1.length+1,tempStr1.length+sValue.length-1)
				}else {
					oElement.value+=sValue
				}fFocus()
			}
		}catch(exp) {
			oElement.value+=sValue;
			fFocus()
		}
	};
	App.MediaDialog={
	};
	App.MediaDialog.BasicDialog=function (content,cfg,title) {
		this._node=$C("div");
		document.getElementsByTagName("BODY")[0].appendChild(this._node);
		var tpl={
			title:title?title:"",content:content?content:"......"
		};
		var tt=this._node.style;
		tt["position"]="absolute";
		tt["visibility"]="hidden";
		if(!cfg) {
			cfg={
			}
		}if(cfg.zIndex) {
			tt["zIndex"]=cfg.zIndex
		}if(cfg.beforeClose) {
			this._beforeClose=cfg.beforeClose
		}var str='<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxCon1"><div class="layerMedia"><div class="layerArrow"></div><div class="layerMedia_close"><strong>#{title}</strong><a class="close" href="#"></a></div>							#{content}</div></div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    </tbody></table>';
		var tmp=new Utils.Template(str);
		this._node.innerHTML=tmp.evaluate(tpl);
		this._node_body=Core.Dom.getElementsByClass(this._node,"DIV","layerBoxCon1")[0];
		this._layerarrow=Core.Dom.getElementsByClass(this._node,"DIV","layerArrow")[0];
		this.setSize(cfg.width,cfg.height);
		this._btn_close=this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes[1];
		this._node_title=this._btn_close.previousSibling;
		this._btn_close.parent=this;
		this._btn_close.onclick=function () {
			Core.Events.stopEvent();
			if(cfg.hiddClose) {
				this.parent.hidd()
			}else {
				this.parent.close()
			}
		};
		this._btn_close.onmousedown=function () {
		};
		this.initinput();
		this._flytimer=cfg["timer"]||0;
		this._flydistance=cfg["distance"]||0;
		if(cfg.hidden) {
			tt["visibility"]="hidden";
			this.focusTarget=this._btn_close
		}else {
			tt["visibility"]="visible";
			this._btn_close.focus();
			this._btn_close.blur()
		}
	};
	App.MediaDialog.BasicDialog.prototype={
		onClose:function () {
		},gc:function () {
		},distory:function () {
			if(this._distory) {
				return
			}this.gc();
			this._btn_close.onmousedown=null;
			this._btn_close.onclick=null;
			this._btn_close.parent=null;
			this._btn_close=null;
			this._node.parentNode.removeChild(this._node);
			if(scope.$IE) {
				this._node.outerHTML=null
			}this._node=null;
			this._distory=true
		},close:function () {
			if(this._beforeClose) {
				this._beforeClose()
			}if(this.onClose) {
				this.onClose()
			}this.distory()
		},show:function () {
			if(this._flytimer==0&&this._flydistance==0) {
				this._node.style.visibility="visible"
			}else {
				this._node.style.visibility="visible"
			}if(this.focusTarget) {
				this.focusTarget.focus()
			}
		},fly:function () {
			var v=Core.Base.detect.$IE?this._flydistance/3:this._flydistance/5;
			var dropOrbit=App.animation.speed(App.timer.delay,this._flydistance,v);
			var dialognode=this.node;
			var current=0;
			var tk=(function (flytimer,flydistance,node) {
				var starttop=(node.style.top)+"px";
				App.timer.add(function () {
					if(current>=dropOrbit.length) {
						App.timer.remove(tk);
						return false
					}node.style.top=(parseInt(starttop)-dropOrbit[current])+"px";
					current++
				})
			})(this._flytimer,this._flydistance,this._node)
		},hidd:function () {
			this._node.style.visibility="hidden"
		},setPosition:function (x,y) {
			this._node.style["left"]=(x-Core.Dom.getLeft(this._layerarrow))+"px";
			this._node.style["top"]=y+"px"
		},setTitle:function (str) {
			this._node_title.innerHTML=str
		},setMiddle:function () {
			var ow=this._node.offsetWidth;
			var oh=this._node.offsetHeight;
			var win_s=Core.System.winSize();
			var scroll_pos=Core.System.getScrollPos();
			var tx=(win_s.width-ow)/2;
			var ty=scroll_pos[0]+(win_s.height-oh)/2;
			this._node.style["left"]=tx+"px";
			this._node.style["top"]=(ty<20?20:ty)+"px"
		},setSize:function (w,h) {
			w=w?w+"px":"auto";
			h=h?h+"px":"auto";
			var ts=this._node_body.style;
			ts["width"]=w;
			ts["height"]=h
		},initinput:function () {
			var inputs=this._node.getElementsByTagName("input");
			var length=inputs.length;
			var i=0;
			for(i;i<length;i++) {
				var oInput=inputs[i];
				var sType=oInput.getAttribute("type");
				if(sType=="text"||sType=="password") {
					oInput.style.color="#999999";
					Core.Events.addEvent(oInput,(function (el) {
						return function () {
							el.style.color="#333333"
						}
					})(oInput),"focus");
					Core.Events.addEvent(oInput,(function (el) {
						return function () {
							el.style.color="#999999"
						}
					})(oInput),"blur")
				}
			}
		},_mousemoveHandler:function () {
			if(this._ondrag) {
				var evt=Core.Events.fixEvent(Core.Events.getEvent());
				if(evt.target==this._btn_close) {
					return
				}if($IE) {
					var ss=Core.System.getScrollPos();
					this._node.style["left"]=evt.pageX-this._btn_move.offsetx+ss[1]+"px";
					this._node.style["top"]=evt.pageY-this._btn_move.offsety+ss[0]+"px"
				}else {
					this._node.style["left"]=evt.pageX-this._btn_move.offsetx+"px";
					this._node.style["top"]=evt.pageY-this._btn_move.offsety+"px"
				}
			}
		}
	};
	App.addvideo=function (el,cb,ecb) {
		if(scope.$extdialog) {
			scope.$extdialog.close();
			scope.$extdialog=null
		}var videohtml='<div class="layerMedia_tip01">请输入<a href="http://video.sina.com.cn" target="_blank">新浪播客</a>、<a href="http://www.youku.com" target="_blank">优酷网</a>、<a href="http://www.tudou.com" target="_blank">土豆网</a>等视频网站的视频播放页链接</div>                    <div id="musicinput" class="layerMedia_input">                    	<input type="text" id="vinput" value="http://" class="layerMusic_txt"/>                        <a id="vsubmit" class="btn_normal" href="javascript:void(0)"><em>确定</em></a>                    </div>                    <p id="vredinfo" class="layerMedia_err error_color" style="display:none">你输入的链接地址无法识别:)</p>					<p id="normalact" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="vcancel">取消操作</a>或者<a href="javascript:void(0);" id="vback">作为普通的链接发布</a>。</p>';
		var beforeClose=function () {
			scope.$extdialog=null
		};
		var _hasrequest=false;
		scope.$extdialog=new App.MediaDialog.BasicDialog(videohtml,{
			width:368,zIndex:1000,hidden:true,timer:2,distance:5,beforeClose:function () {
				beforeClose()
			}
		});
		var _addEvent=Core.Events.addEvent;
		var position=Core.Dom.getXY(el);
		scope.$extdialog.setPosition(position[0],position[1]+parseInt(el.offsetHeight)+5);
		var _cb=typeofcb==="function"?cb:function () {
		};
		var _ecb=typeofecb==="function"?ecb:function () {
		};
		var videosubmit=function (nosuc) {
			if(_hasrequest) {
				return false
			}var params={
				url:$E("vinput").value
			};
			var redinfo=$E("vredinfo");
			var normalact=$E("normalact");
			_hasrequest=true;
			Utils.Io.Ajax.request("/video/publish.php",{
				"POST":params,"onComplete":function (json) {
					if(json) {
						if(json.code=="A00006") {
							redinfo.style.display="none";
							redinfo.innerHTML="";
							normalact.style.display="none";
							if(!nosuc) {
								_cb(json);
								scope.$extdialog.close()
							}
						}else {
							redinfo.style.display="";
							redinfo.innerHTML=App.getMsg({
								"code":json.code
							});
							normalact.style.display="";
							_ecb(json);
							_hasrequest=false
						}
					}else {
						redinfo.style.display="";
						redinfo.innerHTML="你输入的链接地址无法识别:)";
						normalact.style.display="";
						_ecb();
						_hasrequest=false
					}
				},"onException":function () {
					if(json) {
						redinfo.style.display="";
						redinfo.innerHTML=App.getMsg({
							"code":json.code
						});
						normalact.style.display="";
						_ecb(json)
					}else {
						redinfo.style.display="";
						redinfo.innerHTML=App.getMsg({
							"code":R01404
						});
						normalact.style.display="";
						_ecb()
					}_hasrequest=false
				},"returnType":"json"
			})
		};
		try{
			scope.$extdialog.show();
			_addEvent($E("vsubmit"),function () {
				videosubmit()
			},"click");
			_addEvent($E("vinput"),function () {
				if($E("vinput").value=="http://") {
					$E("vinput").value=""
				}
			},"focus");
			_addEvent($E("vinput"),function () {
				if($E("vinput").value=="") {
					$E("vinput").value="http://"
				}else {
					videosubmit(true);
					_hasrequest=false
				}
			},"blur");
			_addEvent($E("vcancel"),function () {
				if(scope.$extdialog) {
					scope.$extdialog.close()
				}
			},"click");
			_addEvent($E("vback"),function () {
				if($E("vinput")) {
					$E("publish_editor").value+=" "+$E("vinput").value+" ";
					$E("publish_editor").focus();
					$E("publish_editor").value=$E("publish_editor").value
				}if(scope.$extdialog) {
					scope.$extdialog.close()
				}
			},"click");
			App.enterSubmit({
				parent:"musicinput",action:function () {
					videosubmit()
				}
			})
		}catch(e) {
		}return true
	};
	Core.Dom.getElementsByAttr=function (node,attname,attvalue) {
		var nodes=[];
		for(var i=0,l=node.childNodes.length;i<l;i++) {
			if(node.childNodes[i].nodeType==1) {
				if(node.childNodes[i].getAttribute(attname)==attvalue) {
					nodes.push(node.childNodes[i])
				}if(node.childNodes[i].childNodes.length>0) {
					nodes=nodes.concat(arguments.callee.call(null,node.childNodes[i],attname,attvalue))
				}
			}
		}return nodes
	};
	var swfobject=function () {
		var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function () {
			var aa=typeofj.getElementById!=D&&typeofj.getElementsByTagName!=D&&typeofj.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;
			if(typeoft.plugins!=D&&typeoft.plugins[S]==r) {
				ab=t.plugins[S].description;
				if(ab&&!(typeoft.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)) {
					T=true;
					X=false;
					ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
					ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);
					ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);
					ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
				}
			}else {
				if(typeofO.ActiveXObject!=D) {
					try{
						var ad=new ActiveXObject(W);
						if(ad) {
							ab=ad.GetVariable("$version");
							if(ab) {
								X=true;
								ab=ab.split(" ")[1].split(",");
								ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]
							}
						}
					}catch(Z) {
					}
				}
			}return {
				w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac
			}
		}(),k=function () {
			if(!M.w3) {
				return
			}if((typeofj.readyState!=D&&j.readyState=="complete")||(typeofj.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))) {
				f()
			}if(!J) {
				if(typeofj.addEventListener!=D) {
					j.addEventListener("DOMContentLoaded",f,false)
				}if(M.ie&&M.win) {
					j.attachEvent(x,function () {
						if(j.readyState=="complete") {
							j.detachEvent(x,arguments.callee);
							f()
						}
					});
					if(O==top) {
						(function () {
							if(J) {
								return
							}try{
								j.documentElement.doScroll("left")
							}catch(X) {
								setTimeout(arguments.callee,0);
								return
							}f()
						})()
					}
				}if(M.wk) {
					(function () {
						if(J) {
							return
						}if(!/loaded|complete/.test(j.readyState)) {
							setTimeout(arguments.callee,0);
							return
						}f()
					})()
				}s(f)
			}
		}();
		function f() {
			if(J) {
				return
			}try{
				var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));
				Z.parentNode.removeChild(Z)
			}catch(aa) {
				return
			}J=true;
			var X=U.length;
			for(var Y=0;Y<X;Y++) {
				U[Y]()
			}
		}function K(X) {
			if(J) {
				X()
			}else {
				U[U.length]=X
			}
		}function s(Y) {
			if(typeofO.addEventListener!=D) {
				O.addEventListener("load",Y,false)
			}else {
				if(typeofj.addEventListener!=D) {
					j.addEventListener("load",Y,false)
				}else {
					if(typeofO.attachEvent!=D) {
						i(O,"onload",Y)
					}else {
						if(typeofO.onload=="function") {
							var X=O.onload;
							O.onload=function () {
								X();
								Y()
							}
						}else {
							O.onload=Y
						}
					}
				}
			}
		}function h() {
			if(T) {
				V()
			}else {
				H()
			}
		}function V() {
			var X=j.getElementsByTagName("body")[0];
			var aa=C(r);
			aa.setAttribute("type",q);
			var Z=X.appendChild(aa);
			if(Z) {
				var Y=0;
				(function () {
					if(typeofZ.GetVariable!=D) {
						var ab=Z.GetVariable("$version");
						if(ab) {
							ab=ab.split(" ")[1].split(",");
							M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]
						}
					}else {
						if(Y<10) {
							Y++;
							setTimeout(arguments.callee,10);
							return
						}
					}X.removeChild(aa);
					Z=null;
					H()
				})()
			}else {
				H()
			}
		}function H() {
			var ag=o.length;
			if(ag>0) {
				for(var af=0;af<ag;af++) {
					var Y=o[af].id;
					var ab=o[af].callbackFn;
					var aa={
						success:false,id:Y
					};
					if(M.pv[0]>0) {
						var ae=c(Y);
						if(ae) {
							if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)) {
								w(Y,true);
								if(ab) {
									aa.success=true;
									aa.ref=z(Y);
									ab(aa)
								}
							}else {
								if(o[af].expressInstall&&A()) {
									var ai={
									};
									ai.data=o[af].expressInstall;
									ai.width=ae.getAttribute("width")||"0";
									ai.height=ae.getAttribute("height")||"0";
									if(ae.getAttribute("class")) {
										ai.styleclass=ae.getAttribute("class")
									}if(ae.getAttribute("align")) {
										ai.align=ae.getAttribute("align")
									}var ah={
									};
									var X=ae.getElementsByTagName("param");
									var ac=X.length;
									for(var ad=0;ad<ac;ad++) {
										if(X[ad].getAttribute("name").toLowerCase()!="movie") {
											ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")
										}
									}P(ai,ah,Y,ab)
								}else {
									p(ae);
									if(ab) {
										ab(aa)
									}
								}
							}
						}
					}else {
						w(Y,true);
						if(ab) {
							var Z=z(Y);
							if(Z&&typeofZ.SetVariable!=D) {
								aa.success=true;
								aa.ref=Z
							}ab(aa)
						}
					}
				}
			}
		}function z(aa) {
			var X=null;
			var Y=c(aa);
			if(Y&&Y.nodeName=="OBJECT") {
				if(typeofY.SetVariable!=D) {
					X=Y
				}else {
					var Z=Y.getElementsByTagName(r)[0];
					if(Z) {
						X=Z
					}
				}
			}return X
		}function A() {
			return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)
		}function P(aa,ab,X,Z) {
			a=true;
			E=Z||null;
			B={
				success:false,id:X
			};
			var ae=c(X);
			if(ae) {
				if(ae.nodeName=="OBJECT") {
					l=g(ae);
					Q=null
				}else {
					l=ae;
					Q=X
				}aa.id=R;
				if(typeofaa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)) {
					aa.width="310"
				}if(typeofaa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)) {
					aa.height="137"
				}j.title=j.title.slice(0,47)+" - Flash Player Installation";
				var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString ().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;
				if(typeofab.flashvars!=D) {
					ab.flashvars+="&"+ac
				}else {
					ab.flashvars=ac
				}if(M.ie&&M.win&&ae.readyState!=4) {
					var Y=C("div");
					X+="SWFObjectNew";
					Y.setAttribute("id",X);
					ae.parentNode.insertBefore(Y,ae);
					ae.style.display="none";
					(function () {
						if(ae.readyState==4) {
							ae.parentNode.removeChild(ae)
						}else {
							setTimeout(arguments.callee,10)
						}
					})()
				}u(aa,ab,X)
			}
		}function p(Y) {
			if(M.ie&&M.win&&Y.readyState!=4) {
				var X=C("div");
				Y.parentNode.insertBefore(X,Y);
				X.parentNode.replaceChild(g(Y),X);
				Y.style.display="none";
				(function () {
					if(Y.readyState==4) {
						Y.parentNode.removeChild(Y)
					}else {
						setTimeout(arguments.callee,10)
					}
				})()
			}else {
				Y.parentNode.replaceChild(g(Y),Y)
			}
		}function g(ab) {
			var aa=C("div");
			if(M.win&&M.ie) {
				aa.innerHTML=ab.innerHTML
			}else {
				var Y=ab.getElementsByTagName(r)[0];
				if(Y) {
					var ad=Y.childNodes;
					if(ad) {
						var X=ad.length;
						for(var Z=0;Z<X;Z++) {
							if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)) {
								aa.appendChild(ad[Z].cloneNode(true))
							}
						}
					}
				}
			}return aa
		}function u(ai,ag,Y) {
			var X,aa=c(Y);
			if(M.wk&&M.wk<312) {
				return X
			}if(aa) {
				if(typeofai.id==D) {
					ai.id=Y
				}if(M.ie&&M.win) {
					var ah="";
					for(var ae in ai) {
						if(ai[ae]!=Object.prototype[ae]) {
							if(ae.toLowerCase()=="data") {
								ag.movie=ai[ae]
							}else {
								if(ae.toLowerCase()=="styleclass") {
									ah+=' class="'+ai[ae]+'"'
								}else {
									if(ae.toLowerCase()!="classid") {
										ah+=" "+ae+'="'+ai[ae]+'"'
									}
								}
							}
						}
					}var af="";
					for(var ad in ag) {
						if(ag[ad]!=Object.prototype[ad]) {
							af+='<param name="'+ad+'" value="'+ag[ad]+'" />'
						}
					}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";
					N[N.length]=ai.id;
					X=c(ai.id)
				}else {
					var Z=C(r);
					Z.setAttribute("type",q);
					for(var ac in ai) {
						if(ai[ac]!=Object.prototype[ac]) {
							if(ac.toLowerCase()=="styleclass") {
								Z.setAttribute("class",ai[ac])
							}else {
								if(ac.toLowerCase()!="classid") {
									Z.setAttribute(ac,ai[ac])
								}
							}
						}
					}for(var ab in ag) {
						if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie") {
							e(Z,ab,ag[ab])
						}
					}aa.parentNode.replaceChild(Z,aa);
					X=Z
				}
			}return X
		}function e(Z,X,Y) {
			var aa=C("param");
			aa.setAttribute("name",X);
			aa.setAttribute("value",Y);
			Z.appendChild(aa)
		}function y(Y) {
			var X=c(Y);
			if(X&&X.nodeName=="OBJECT") {
				if(M.ie&&M.win) {
					X.style.display="none";
					(function () {
						if(X.readyState==4) {
							b(Y)
						}else {
							setTimeout(arguments.callee,10)
						}
					})()
				}else {
					X.parentNode.removeChild(X)
				}
			}
		}function b(Z) {
			var Y=c(Z);
			if(Y) {
				for(var X in Y) {
					if(typeofY[X]=="function") {
						Y[X]=null
					}
				}Y.parentNode.removeChild(Y)
			}
		}function c(Z) {
			var X=null;
			try{
				X=j.getElementById(Z)
			}catch(Y) {
			}return X
		}function C(X) {
			return j.createElement(X)
		}function i(Z,X,Y) {
			Z.attachEvent(X,Y);
			I[I.length]=[Z,X,Y]
		}function F(Z) {
			var Y=M.pv,X=Z.split(".");
			X[0]=parseInt(X[0],10);
			X[1]=parseInt(X[1],10)||0;
			X[2]=parseInt(X[2],10)||0;
			return (Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false
		}function v(ac,Y,ad,ab) {
			if(M.ie&&M.mac) {
				return
			}var aa=j.getElementsByTagName("head")[0];
			if(!aa) {
				return
			}var X=(ad&&typeofad=="string")?ad:"screen";
			if(ab) {
				n=null;
				G=null
			}if(!n||G!=X) {
				var Z=C("style");
				Z.setAttribute("type","text/css");
				Z.setAttribute("media",X);
				n=aa.appendChild(Z);
				if(M.ie&&M.win&&typeofj.styleSheets!=D&&j.styleSheets.length>0) {
					n=j.styleSheets[j.styleSheets.length-1]
				}G=X
			}if(M.ie&&M.win) {
				if(n&&typeofn.addRule==r) {
					n.addRule(ac,Y)
				}
			}else {
				if(n&&typeofj.createTextNode!=D) {
					n.appendChild(j.createTextNode(ac+" {"+Y+"}"))
				}
			}
		}function w(Z,X) {
			if(!m) {
				return
			}var Y=X?"visible":"hidden";
			if(J&&c(Z)) {
				c(Z).style.visibility=Y
			}else {
				v("#"+Z,"visibility:"+Y)
			}
		}function L(Y) {
			var Z=/[\\\"<>\.;
			]/;
			var X=Z.exec(Y)!=null;
			return X&&typeofencodeURIComponent!=D?encodeURIComponent(Y):Y
		}var d=function () {
			if(M.ie&&M.win) {
				window.attachEvent("onunload",function () {
					var ac=I.length;
					for(var ab=0;ab<ac;ab++) {
						I[ab][0].detachEvent(I[ab][1],I[ab][2])
					}var Z=N.length;
					for(var aa=0;aa<Z;aa++) {
						y(N[aa])
					}for(var Y in M) {
						M[Y]=null
					}M=null;
					for(var X in swfobject) {
						swfobject[X]=null
					}swfobject=null
				})
			}
		}();
		return {
			registerObject:function (ab,X,aa,Z) {
				if(M.w3&&ab&&X) {
					var Y={
					};
					Y.id=ab;
					Y.swfVersion=X;
					Y.expressInstall=aa;
					Y.callbackFn=Z;
					o[o.length]=Y;
					w(ab,false)
				}else {
					if(Z) {
						Z({
							success:false,id:ab
						})
					}
				}
			},getObjectById:function (X) {
				if(M.w3) {
					return z(X)
				}
			},embedSWF:function (ab,ah,ae,ag,Y,aa,Z,ad,af,ac) {
				var X={
					success:false,id:ah
				};
				if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y) {
					w(ah,false);
					K(function () {
						ae+="";
						ag+="";
						var aj={
						};
						if(af&&typeofaf===r) {
							for(var al in af) {
								aj[al]=af[al]
							}
						}aj.data=ab;
						aj.width=ae;
						aj.height=ag;
						var am={
						};
						if(ad&&typeofad===r) {
							for(var ak in ad) {
								am[ak]=ad[ak]
							}
						}if(Z&&typeofZ===r) {
							for(var ai in Z) {
								if(typeofam.flashvars!=D) {
									am.flashvars+="&"+ai+"="+Z[ai]
								}else {
									am.flashvars=ai+"="+Z[ai]
								}
							}
						}if(F(Y)) {
							var an=u(aj,am,ah);
							if(aj.id==ah) {
								w(ah,true)
							}X.success=true;
							X.ref=an
						}else {
							if(aa&&A()) {
								aj.data=aa;
								P(aj,am,ah,ac);
								return
							}else {
								w(ah,true)
							}
						}if(ac) {
							ac(X)
						}
					})
				}else {
					if(ac) {
						ac(X)
					}
				}
			},switchOffAutoHideShow:function () {
				m=false
			},ua:M,getFlashPlayerVersion:function () {
				return {
					major:M.pv[0],minor:M.pv[1],release:M.pv[2]
				}
			},hasFlashPlayerVersion:F,createSWF:function (Z,Y,X) {
				if(M.w3) {
					return u(Z,Y,X)
				}else {
					return undefined
				}
			},showExpressInstall:function (Z,aa,X,Y) {
				if(M.w3&&A()) {
					P(Z,aa,X,Y)
				}
			},removeSWF:function (X) {
				if(M.w3) {
					y(X)
				}
			},createCSS:function (aa,Z,Y,X) {
				if(M.w3) {
					v(aa,Z,Y,X)
				}
			},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function (aa) {
				var Z=j.location.search||j.location.hash;
				if(Z) {
					if(/\?/.test(Z)) {
						Z=Z.split("?")[1]
					}if(aa==null) {
						return L(Z)
					}var Y=Z.split("&");
					for(var X=0;X<Y.length;X++) {
						if(Y[X].substring(0,Y[X].indexOf("="))==aa) {
							return L(Y[X].substring((Y[X].indexOf("=")+1)))
						}
					}
				}return ""
			},expressInstallCallback:function () {
				if(a) {
					var X=c(R);
					if(X&&l) {
						X.parentNode.replaceChild(l,X);
						if(Q) {
							w(Q,true);
							if(M.ie&&M.win) {
								l.style.display="block"
							}
						}if(E) {
							E(B)
						}
					}a=false
				}
			}
		}
	}();
	$registJob("init_input",function () {
		var inputs=document.getElementsByTagName("input");
		var length=inputs.length;
		var i=0;
		for(i;i<length;i++) {
			var oInput=inputs[i];
			var sType=oInput.getAttribute("type");
			if(sType=="text"||sType=="password") {
				oInput.style.color="#999999";
				Core.Events.addEvent(oInput,(function (el) {
					return function () {
						el.style.color="#333333"
					}
				})(oInput),"focus");
				Core.Events.addEvent(oInput,(function (el) {
					return function () {
						el.style.color="#999999"
					}
				})(oInput),"blur")
			}
		}
	});
	scope.jsReady=function () {
		return true
	};
	App.addmusic=function (el,cb,ecb) {
		if(scope.$extdialog) {
			scope.$extdialog.close();
			scope.$extdialog=null
		}scope.$playsong=null;
		var musichtml='<div class="layerTag">                    	<ul>                        <li id="findsong" class="cur"><a href="javascript:void(0)" onclick = "App.musicchangeli(\'1\');return false;">输入歌曲名</a><span class="tagR"></span></li>                        <li id="inputmusiclink"><a href="javascript:void(0);"  onclick = "App.musicchangeli(\'2\');return false;">输入歌曲链接</a><span class="tagR"></span></li>                        </ul>                     </div>					 <div id="findsongdiv">						 <div class="layerMedia_input">		                    <input id="mfindinput" type="text" value="请输入歌曲名称" class="layerMusic_txt"/>							<a id="mfindsubmit" class="btn_normal" href="javascript:void(0);"><em>搜索</em></a>						</div>						<p id="mfindredinfo" style="display:none;" class="layerMedia_err error_color">你输入的链接地址无法识别:)</p>					 	<div id="mfindmusictip" class="layerMedia_tip01" style="display:none"></div>						<div id="musicDetail" class="musicDetail" style="display:none">						<div><a id="mfindinfo" class="btn_normal" href="javascript:void(0)"><em>添加</em></a></div>						</div>					 </div>					 <div id="linksongdiv" style="display:none;">					 <div id="linksonginput" class="layerMedia_input">	                    <input id="mlinkinput" type="text" value="请输入MP3链接或新浪乐库单曲播放页链接" class="layerMusic_txt" style=""/>	                    <a id="mlinksubmit" class="btn_normal" href="javascript:void(0);" style=""><em>添加</em></a>	                 </div>					 <p id="mlinkredinfo" style="display:none;" class="layerMedia_err error_color">你输入的链接地址无法识别:)</p>					 <p id="mlinkre" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="mlinkback">作为普通的链接发布</a>或者<a href="javascript:void(0);" id="mlinkcancel">取消操作</a>。</p>					 <div id="mlinkmusictip" class="layerMedia_tip01" style="display:none"></div>					 <div id="musicInfo" class="musicInfo" style="display:none">                            <table>                            	<tbody><tr>                                	<th><em class="error_color">*</em>歌曲名</th>                                	<td><input id = "songname" type="text" value="" class="musicInfo_txt"/><span id="mlinkredtext" class="error_color" style="display:none">请输入歌曲名</span></td>                                </tr>                                <tr>                                	<th>演唱者</th>                                	<td><input id = "singer" type="text" value="" class="musicInfo_txt"/></td>                                </tr>                                <tr>                                	<th/>                                	<td><a class="btn_normal" id="mlinkinfo" href="javascript:void(0);"><em>确定</em></a></td>                                </tr>                            </tbody></table>                            </div>						</div>';
		var beforeClose=function () {
			scope.$playsong=null;
			if($E("musicflash")) {
				Core.Dom.removeNode($E("musicflash"))
			}scope.$extdialog=null
		};
		scope.$extdialog=new App.MediaDialog.BasicDialog(musichtml,{
			width:368,zIndex:1000,hidden:true,timer:2,distance:5,beforeClose:function () {
				beforeClose()
			}
		});
		var _musicfindtip=$E("mfindmusictip");
		var _mfindredinfo=$E("mfindredinfo");
		var _mlinkre=$E("mlinkre");
		var _mfindsubmit=$E("mfindsubmit");
		var _mfindinfo=$E("mfindinfo");
		var _musicDetail=$E("musicDetail");
		var _mlinksubmit=$E("mlinksubmit");
		var _mlinkinfo=$E("mlinkinfo");
		var _musicInfo=$E("musicInfo");
		var _mlinkredinfo=$E("mlinkredinfo");
		var _songname=$E("songname");
		var _singer=$E("singer");
		var _linkshorturl;
		var _mlinkredtext=$E("mlinkredtext");
		var _musiclinktip=$E("mlinkmusictip");
		var _flashobject;
		var _getElementsByAttr=Core.Dom.getElementsByAttr;
		var _addEvent=Core.Events.addEvent;
		var position=Core.Dom.getXY(el);
		scope.$extdialog.setPosition(position[0],position[1]+parseInt(el.offsetHeight)+5);
		var _cb=typeofcb==="function"?cb:function () {
		};
		var _ecb=typeofecb==="function"?ecb:function () {
		};
		var _mfindinput=$E("mfindinput");
		var _mlinkinput=$E("mlinkinput");
		var _dorequest=App.doRequest;
		var _show=function (el,txt) {
			if(txt) {
				el.innerHTML=txt
			}el.style.display=""
		};
		var _hidden=function (el) {
			el.innerHTML="";
			el.style.display="none"
		};
		var _addmusicflash=function () {
			if($E("musicflash")) {
				return
			}Core.Dom.insertHTML($E("publisher_music"),'<div id="musicflash"></div>',"AfterEnd");
			var flashParams={
				quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
			};
			var flashVars={
			};
			swfobject.embedSWF("http://sjs.sinajs.cn/miniblog2/static/swf/player/MiniPlayer.swf","musicflash","1","1","9.0.0",null,flashVars,flashParams)
		};
		var _getflash=function () {
			return Core.Base.detect.$IE?window["musicflash"]:document["musicflash"]
		};
		var _getLength=function (str) {
			var len=Core.String.trim(str).length;
			if(len>0) {
				return Math.ceil(Core.String.byteLength(Core.String.trim(str))/2)
			}else {
				return 0
			}
		};
		var _getmusicdom=function (elplay) {
			while(elplay.tagName.toLowerCase()!="tr") {
				elplay=elplay.parentNode
			}return elplay
		};
		var _testlimit=function () {
			var songlen=_getLength(_songname.value);
			var songrtn=true;
			var singerrtn=true;
			if(songlen>=0&&songlen<=15) {
				songrtn=true
			}else {
				songrtn=false
			}var singerlen=_getLength(_singer.value);
			if(singerlen>=0&&singerlen<=15) {
				singerrtn=true
			}else {
				singerrtn=false
			}if(singerrtn&&songrtn) {
				_hidden(_mlinkredinfo);
				return true
			}else {
				if(!singerrtn) {
					_show(_mlinkredinfo,"歌手名不能超过15个汉字");
					return false
				}if(!songrtn) {
					_show(_mlinkredinfo,"歌曲名不能超过15个汉字");
					return false
				}
			}
		};
		var _event_mfindsubmit=function () {
			if(Core.String.trim(_mfindinput.value)==""||Core.String.trim(_mfindinput.value)=="请输入歌曲名称") {
				return false
			}_flashobject.songStop();
			_mfindinput.value=Core.String.trim(_mfindinput.value);
			_dorequest({
				songname:_mfindinput.value
			},"/music/search.php",function (json,result) {
				if(result) {
					_hidden(_mfindredinfo);
					_hidden(_musicfindtip);
					if($E("music_list")) {
						Core.Dom.removeNode($E("music_list"))
					}var tempsongname=Core.String.encodeHTML(_getLength(_mfindinput.value)>25?(_mfindinput.value.substr(0,25)+"..."):_mfindinput.value);
					if(result.count>0) {
						_show(_musicfindtip,"新浪乐库搜索结果：");
						Core.Dom.insertHTML(_musicDetail,json,"AfterBegin");
						_show(_musicDetail);
						var li_play=Core.Dom.getElementsByClass($E("music_list"),"div","play");
						var li_label=$E("music_list").getElementsByTagName("label");
						for(var i=0;i<li_play.length;i++) {
							li_label[i].innerHTML=_getLength(li_label[i].innerHTML)>25?li_label[i].innerHTML.substr(0,47)+"...":li_label[i].innerHTML;
							_addEvent(li_play[i],(function (el,allel) {
								return function () {
									try{
										var cursong=_getmusicdom(el);
										var tmpclass=el.className=="play"||false;
										for(var j=0;j<allel.length;j++) {
											allel[j].className="play"
										}if(scope.$playsong===cursong) {
											if(tmpclass) {
												el.className="stop";
												_flashobject.songPlay();
												return false
											}else {
												_flashobject.songStop();
												return false
											}
										}else {
											el.className="stop";
											var cursongurl=encodeURIComponent(_getElementsByAttr(cursong,"name","url")[0].value);
											_flashobject.setUrl(cursongurl);
											scope.$playsong=cursong;
											return false
										}
									}catch(e) {
									}
								}
							})(li_play[i],li_play),"click")
						}var li_select=Core.Dom.getElementsByClass($E("music_list"),"p","mselect");
						for(var j=0;j<li_select.length;j++) {
							_addEvent(li_select[j],(function (el) {
								return function () {
									var cur=_getmusicdom(el);
									var radio=_getElementsByAttr(cur,"name","url")[0];
									radio.checked=true
								}
							})(li_select[j]),"click")
						}
					}else {
						_show(_mfindredinfo,"抱歉，没有找到和“"+tempsongname+"”有关的歌曲，换个词再试一下:)");
						_musicDetail.style.display="none"
					}
				}
			},function (json) {
				if(json) {
					var tempsongname=Core.String.encodeHTML(_getLength(_mfindinput.value)>25?(_mfindinput.value.substr(0,25)+"..."):_mfindinput.value);
					_show(_mfindredinfo,"抱歉，没有找到和“"+tempsongname+"”有关的歌曲，换个词再试一下:)")
				}_hidden(_musicfindtip);
				_musicDetail.style.display="none"
			})
		};
		var _event_mfindinfo=function () {
			var radiosong=Core.Dom.getElementsByAttr(_musicDetail,"name","url");
			var selectsong,songname,singer;
			for(var i=0;i<radiosong.length;i++) {
				if(radiosong[i].checked==true) {
					selectsong=radiosong[i];
					songname=Core.Dom.getElementsByAttr(selectsong.parentNode,"name","songname")[0].value;
					singer=Core.Dom.getElementsByAttr(selectsong.parentNode,"name","singer")[0].value;
					break
				}
			}if(!selectsong) {
				_show(_mfindredinfo,"请选择歌曲。");
				return
			}_dorequest({
				url:selectsong.value,name:songname,singer:singer
			},"/music/publish.php",function (json,result) {
				_cb(json);
				scope.$extdialog.close()
			},function (json) {
				if(json) {
					_show(_mfindredinfo,App.getMsg({
						"code":json.code
					}))
				}_hidden(_musicfindtip);
				_musicDetail.style.display="none"
			})
		};
		var _event_mlinksubmit=function () {
			_musicInfo.style.display="none";
			_mlinksubmit.style.display="";
			if(Core.String.trim(_mlinkinput.value)==""||Core.String.trim(_mlinkinput.value)=="请输入MP3链接或新浪乐库单曲播放页链接") {
				return false
			}_dorequest({
				url:_mlinkinput.value
			},"/music/input_check.php",function (json) {
				_show(_musiclinktip,"为了方便大家听歌，请花一点点时间完善歌曲资料...");
				_hidden(_mlinkredinfo);
				_mlinkre.style.display="none";
				_show(_musicInfo);
				if(json) {
					_singer.value=json.author||"";
					_songname.value=json.title||"";
					_linkshorturl=json.url
				}
			},function (json) {
				if(json) {
					if(json.code) {
						_show(_mlinkredinfo,App.getMsg({
							"code":json.code
						}));
						_show(_mlinkre)
					}else {
						_show(_mlinkredinfo,App.getMsg({
							"code":"M14002"
						}));
						_show(_mlinkre)
					}
				}_musicInfo.style.display="none";
				_singer.value="";
				_songname.value="";
				_linkshorturl="";
				_hidden(_musiclinktip)
			})
		};
		var _event_mlinkinfo=function () {
			_hidden(_mlinkredtext);
			if(!_testlimit()) {
				return false
			}if(_songname.value==""||Core.String.trim(_songname.value)=="") {
				_show(_mlinkredtext,"请输入歌曲名");
				return false
			}_dorequest({
				url:_linkshorturl,name:_songname.value,singer:_singer.value
			},"/music/publish_link.php",function (json) {
				_cb(json);
				scope.$extdialog.close()
			},function (json) {
				if(json) {
					_show(_mlinkredinfo,App.getMsg({
						"code":json.code
					}))
				}_ecb(json)
			})
		};
		try{
			_addmusicflash();
			_flashobject=_getflash();
			App.fansfind({
				"input":_mfindinput,"timer":7,"light":function (el) {
					el.className="cur"
				},"select":function (value,text) {
					_mfindinput.value=text;
					_event_mfindsubmit()
				},"class":"layerMedia_menu","data":"/music/recommend.php"
			});
			scope.$extdialog.show();
			_addEvent(_songname,function () {
				_hidden(_mlinkredtext);
				_testlimit()
			},"blur");
			_addEvent(_singer,function () {
				_hidden(_mlinkredtext);
				_testlimit()
			},"blur");
			_addEvent(_mfindinput,function () {
				if(_mfindinput.value=="请输入歌曲名称") {
					_mfindinput.value=""
				}
			},"focus");
			_addEvent(_mfindinput,function () {
				if(_mfindinput.value=="") {
					_mfindinput.value="请输入歌曲名称"
				}
			},"blur");
			_addEvent(_mlinkinput,function () {
				if(_mlinkinput.value=="请输入MP3链接或新浪乐库单曲播放页链接") {
					_mlinkinput.value=""
				}
			},"focus");
			_addEvent(_mlinkinput,function () {
				if(_mlinkinput.value=="") {
					_mlinkinput.value="请输入MP3链接或新浪乐库单曲播放页链接"
				}else {
					_event_mlinksubmit()
				}
			},"blur");
			_addEvent($E("mlinkcancel"),function () {
				if(scope.$extdialog) {
					scope.$extdialog.close()
				}
			});
			_addEvent($E("mlinkback"),function () {
				if(_mlinkinput) {
					$E("publish_editor").value+=" "+_mlinkinput.value+" ";
					$E("publish_editor").focus();
					$E("publish_editor").value=$E("publish_editor").value
				}if(scope.$extdialog) {
					scope.$extdialog.close()
				}
			});
			_addEvent(_mfindsubmit,function () {
				_event_mfindsubmit()
			},"click");
			_addEvent(_mfindinfo,function () {
				_event_mfindinfo()
			},"click");
			_addEvent(_mlinksubmit,function () {
				_event_mlinksubmit()
			},"click");
			_addEvent(_mlinkinfo,function () {
				_event_mlinkinfo()
			},"click");
			App.enterSubmit({
				parent:"findsongdiv",action:function () {
					_event_mfindsubmit()
				}
			});
			App.enterSubmit({
				parent:"linksonginput",action:function () {
					_event_mlinksubmit();
					_mlinkinput.blur()
				}
			})
		}catch(e) {
		}
	};
	App.musicchangeli=function (lid) {
		if(lid=="1") {
			$E("findsongdiv").style.display="";
			$E("linksongdiv").style.display="none";
			$E("findsong").className="cur";
			$E("inputmusiclink").className=""
		}if(lid=="2") {
			$E("findsongdiv").style.display="none";
			$E("linksongdiv").style.display="";
			$E("inputmusiclink").className="cur";
			$E("findsong").className=""
		}return false
	};
	scope.listener=function (SONG_PLAYING,b) {
		if(!scope.$playsong) {
			return false
		}var play=Core.Dom.getElementsByClass(scope.$playsong,"div","play")[0]||Core.Dom.getElementsByClass(scope.$playsong,"div","stop")[0];
		if(b) {
			play.className="stop"
		}else {
			play.className="play"
		}
	};
	Core.String.decodeHTML=function (str) {
		var div=document.createElement("div");
		div.innerHTML=str;
		return div.innerText==undefined?div.textContent:div.innerText
	};
	$registJob("publisher",function () {
		try{
			var _addEvent=Core.Events.addEvent;
			var _trim=Core.String.trim;
			var _bLength=Core.String.byteLength;
			var _imgURL=App.imgURL;
			var _insertAfter=Core.Dom.insertAfter;
			var _query2json=App.queryToJson;
			var _alert=App.alert;
			var _feedType=scope["$feedtype"];
			var _search=scope["$search"]?decodeURIComponent(scope["$search"]):false;
			var _leftB=Core.String.leftB;
			App.publisher=function (elements,config) {
				if(!elements) {
					throw("publisher need elements as parameters")
				}var _submitKey=true;
				var _newImageFile=function () {
					var file=document.createElement("INPUT");
					file.type="file";
					file.size="1";
					file.name="pic1";
					file.style.cssText="cursor:pointer !important;height:18px;left:0;margin:0;opacity:0;filter:alpha(opacity=0);overflow:hidden;padding:0;position:absolute;top:0;";
					elements["imgFile"].parentNode.insertBefore(file,elements["imgFile"]);
					elements["imgFile"].parentNode.removeChild(elements["imgFile"]);
					elements["imgFile"]=file;
					_addEvent(elements["imgFile"],_upImage,"change")
				};
				var _upImage=function () {
					var filename=elements["imgFile"].value;
					if(!/\.(gif|jpg|png|jpeg)$/i.test(filename)) {
						App.alert({
							"code":"M07004"
						});
						return false
					}else {
						elements["imgPre"].src=filename;
						if(elements["imgPre"].fileSize>0) {
							var file_size=elements["imgPre"].fileSize/(1024*1024);
							if(file_size>5) {
								App.alert({
									"code":"M07003"
								});
								return false
							}
						}
					}elements["imgLoading"].style.display="";
					elements["image"].style.display="none";
					scope.addImgSuccess=function (cfg) {
						if(cfg["ret"]==="1") {
							filename=filename.match(/[^\/|\\]*$/)[0];
							imgName=filename.slice(0,-4);
							if(imgName.length>10) {
								imgName=imgName.slice(0,10)+"..."
							}filename=imgName+filename.slice(-4);
							elements["imgName"].innerHTML=filename||"图片附件";
							elements["imgPerch"].style.display="";
							elements["imgPerch"].value=cfg["pid"];
							elements["imgPre"].innerHTML='<img src="'+_imgURL(cfg["pid"],"small")+'" />';
							if(!_trim(elements["editor"].value.replace("#请在这里输入自定义话题#","")).length) {
								elements["editor"].value="分享图片";
								_limit()
							}App.getImgSize(_imgURL(cfg["pid"],"bmiddle"),function () {
							});
							App.getImgSize(_imgURL(cfg["pid"],"thumbnail"),function () {
							})
						}else {
							elements["image"].style.display="";
							App.alert({
								"code":"M07002"
							})
						}_newImageFile();
						elements["imgLoading"].style.display="none"
					};
					elements["imgForm"].submit()
				};
				var _preview=function (begin,target) {
					App.doFlyOut(begin,target,{
						"resFun":function () {
							target.style.display="block";
							target.style.visibility="visible"
						},"style":"border:#000 2px solid;background:#bad;opacity:0.2","time":1
					})
				};
				var _getLength=function (str) {
					var len=_trim(str.replace(/(#请在这里输入自定义话题#)/g,"")).length;
					if(len>0) {
						return Math.ceil(_bLength(_trim(str))/2)
					}else {
						return 0
					}
				};
				var _testlimit=function (func) {
					var len=_getLength(elements["editor"].value);
					if(typeoffunc==="function") {
						func(len)
					}if(len>0&&len<=140) {
						return true
					}else {
						return false
					}
				};
				var _countInfo=function (len) {
					if(len>=0&&len<=140) {
						elements["info"].className="wordNumBg";
						elements["info"].innerHTML='你还可以输入<span class="bold">'+(140-len)+"</span>字"
					}else {
						elements["info"].className="wordNumBg";
						elements["info"].innerHTML='已超出<span class="bold">'+(140-len)*(-1)+"</span>字"
					}
				};
				var _limit=function (event) {
					if(event&&event.ctrlKey==true&&(event.keyCode=="13"||event.keyCode=="10")) {
						return
					}if(_testlimit(_countInfo)) {
						if(!_submitKey) {
							elements["submit"].parentNode.className="postBtnBg";
							_submitKey=true
						}
					}else {
						elements["submit"].parentNode.className="postBtnBg bgColorA_No";
						_submitKey=false
					}
				};
				var _upVideo=function (el) {
					var _suc=function (json) {
						if(json) {
							elements["editor"].value+=" "+json.data.shorturl+" ";
							elements["editor"].focus();
							elements["editor"].value=Core.String.decodeHTML(elements["editor"].value)
						}
					};
					App.addvideo(el,_suc,function () {
					})
				};
				var _upMusic=function (el) {
					var _suc=function (json) {
						if(json) {
							elements["editor"].value+="  "+(_trim(json.singer).length>0?json.singer+"-":"")+json.name+"-"+json.shorturl+"  ";
							elements["editor"].focus();
							elements["editor"].value=Core.String.decodeHTML(elements["editor"].value)
						}
					};
					App.addmusic(el,_suc,function () {
					})
				};
				var _setextinfo=function (extinfo) {
					if(extinfo&&extinfo.length>0) {
						if(!scope.extinfo) {
							scope.extinfo=new Array()
						}for(var i=0;i<extinfo.length;i++) {
							scope.extinfo[extinfo[i]["shorturl_id"]]={
								url:extinfo[i]["url"],title:extinfo[i]["title"],type:extinfo[i]["type"],ourl:extinfo[i]["ourl"]
							}
						}
					}else {
						return false
					}
				};
				var _addFeed=function (feedStr,extinfo) {
					if(config["feedList"]) {
						var feedBox=document.createElement("UL");
						config["feedList"].parentNode.insertBefore(feedBox,config["feedList"]);
						feedBox.innerHTML=feedStr;
						if(App.refurbishUpdate) {
							App.refurbishUpdate.add(1)
						}_setextinfo(extinfo);
						App.bindmedia(feedBox);
						config["feedList"].insertBefore((feedBox.getElementsByTagName("LI"))[0],(config["feedList"].getElementsByTagName("LI"))[0]);
						feedBox.parentNode.removeChild(feedBox)
					}
				};
				var _submit=function () {
					if(!_submitKey) {
						if(!_testlimit()) {
							App.cartoon.noticeInput(elements["editor"])
						}return false
					}_submitKey=false;
					elements["submit"].parentNode.className="postBtnBg bgColorA_No";
					var content=_trim(elements["editor"].value||"");
					var pic=[_trim(elements["imgPerch"].value||"")];
					var success=function (json,parameters) {
						_clear();
						elements["editor"].parentNode.className="inputsuccess";
						elements["editor"].style.display="none";
						setTimeout(function () {
							elements["editor"].parentNode.className="inputarea";
							elements["editor"].style.display=""
						},2000);
						if(_feedType==="ispic"&&!parameters.pic) {
							return false
						}if(_feedType==="islink"&&json.islink!=1) {
							return false
						}if(_feedType==="isrt") {
							return false
						}if(_feedType==="favorite") {
							return false
						}if(_feedType==="isat") {
							if(scope.$uname) {
								if(!(new RegExp("(@|＠)"+scope.$uname+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(parameters.content)) {
									return false
								}
							}
						}setTimeout(function () {
							_addFeed(json["html"],json["extinfo"])
						},1000)
					};
					var error=function (json) {
						_submitKey=true;
						if(json) {
							_alert({
								"code":json["code"]
							})
						}else {
							_alert({
								"code":"R01404"
							})
						}
					};
					App.publishRumor(content,pic,success,error);
					return false
				};
				var _ctrlSubmit=function (event) {
					if(event.ctrlKey==true&&event.keyCode=="13") {
						_submit()
					}return false
				};
				var _clear=function () {
					if(_search) {
						elements["editor"].value="#"+_search+"#"
					}else {
						elements["editor"].value=""
					}_limit();
					_delImg();
					if(scope.$extdialog) {
						scope.$playsong=null;
						if($E("musicflash")) {
							Core.Dom.removeNode($E("musicflash"))
						}scope.$extdialog.close();
						scope.$extdialog=null
					}
				};
				var _delImg=function () {
					elements["imgPerch"].value="";
					elements["imgPerch"].style.display="none";
					elements["imgLoading"].style.display="none";
					elements["image"].style.display="";
					scope.addImgSuccess=function () {
					}
				};
				var _getPos=function () {
					if(elements["editor"].createTextRange) {
						elements["editor"].caretPos=document.selection.createRange().duplicate()
					}
				};
				var _publishFocus=function () {
					_limit();
					elements["editor"].focus()
				};
				_addEvent(elements["imgFile"],_upImage,"change");
				_addEvent(elements["editor"],_limit,"keyup");
				_addEvent(elements["editor"],_limit,"keypress");
				_addEvent(elements["editor"],_limit,"input");
				_addEvent(elements["editor"],function () {
					setTimeout(_limit,0)
				},"paste");
				_addEvent(elements["editor"],function () {
					setTimeout(_limit,0)
				},"cut");
				_addEvent(elements["editor"],_limit,"focus");
				_addEvent(elements["submit"],_submit,"click");
				_addEvent(elements["editor"],_ctrlSubmit,"keyup");
				_addEvent(elements["imgDelete"],_delImg,"click");
				_addEvent(elements["editor"],_getPos,"keyup");
				_addEvent(elements["editor"],_getPos,"focus");
				_addEvent(elements["editor"],_getPos,"select");
				_addEvent(elements["editor"],_getPos,"click");
				_addEvent(elements["video"],function () {
					_upVideo(elements["video"])
				},"click");
				_addEvent(elements["music"],function () {
					_upMusic(elements["music"])
				},"click");
				var mouseinarea=false;
				_addEvent(elements["imgName"],function () {
					mouseinarea=true;
					setTimeout(function () {
						if(mouseinarea) {
							elements["preview"].style.display=""
						}
					},100)
				},"mouseover");
				_addEvent(elements["imgName"],function () {
					mouseinarea=false;
					setTimeout(function () {
						if(!mouseinarea) {
							elements["preview"].style.display="none"
						}
					},100)
				},"mouseout");
				_addEvent(elements["topic"],function () {
					App.insertTextArea(elements["editor"],"#"+"请在这里输入自定义话题"+"#",_publishFocus)
				},"click");
				_limit()
			};
			App.publishRumor=function (content,pic,success,error) {
				if(typeofcontent!="string") {
					throw("The publishRumor need a string as first parameter")
				}if(!(picinstanceofArray)) {
					throw("The publishRumor need an array as second parameter")
				}if(typeofsuccess!="function") {
					throw("The publishRumor need a function as thrid parameter")
				}if(typeoferror!="function") {
					throw("The publishRumor need a function as fourth parameter")
				}if(_search) {
					if(content.indexOf(_search)==-1) {
						content="#"+_search+"#"+content
					}
				}var parameters={
					"content":content.replace(/\uff20/ig,"@"),"pic":pic.join(","),"styleid":scope["styleid"]
				};
				Utils.Io.Ajax.request("/mblog/publish.php",{
					"POST":parameters,"onComplete":function (json) {
						if(json.code=="A00006") {
							success(json.data,parameters)
						}else {
							if(json.code=="M00008") {
								window.location.replace(json.data)
							}else {
								error(json)
							}
						}
					},"onException":function () {
						error()
					},"returnType":"json"
				})
			};
			if(!$E("publisher_submit")) {
				return false
			}App.publisher({
				"image":$E("publisher_image"),"topic":$E("publisher_topic"),"info":$E("publisher_info"),"editor":$E("publish_editor"),"submit":$E("publisher_submit"),"imgForm":$E("publisher_image_form"),"imgPerch":$E("publisher_perch"),"imgFile":$E("publisher_file"),"imgName":$E("publisher_perch_name"),"imgDelete":$E("publisher_perch_delete"),"imgLoading":$E("publisher_image_loading"),"imgPre":$E("publisher_preimage"),"preview":$E("publisher_imgpreview"),"music":$E("publisher_music"),"video":$E("publisher_video"),"at":$E("publisher_at")
			},{
				"feedTitle":$E("feed_title"),"feedList":$E("feed_list")
			})
		}catch(exp) {
		}
	});
	scope.addImgSuccess=function () {
	};
	$registJob("topic",function () {
		var _alert=App.alert;
		var generalError=function (json) {
			if(json) {
				_alert({
					"code":json["code"]
				},{
					"ok":function () {
						if(scope.$uid=="123456") {
							window.location.reload();
							return
						}
					}
				})
			}else {
				_alert({
					"code":"R01404"
				})
			}
		};
		var element={
			"addBox":$E("add_topic_box"),"lisBox":$E("list_topic_box"),"moreBox":$E("more_topic_box"),"lisTit":$E("topic_list_title"),"shell":$E("topic_list_shell")
		};
		var template={
			"botton":'<a href="javascript:void(0);" onclick="App.topic.add(\'${keyword}\',this);return false;">关注该话题</a>',"added":"已关注成功 (<a href=\"javascript:;\" onclick=\"App.topic.del('${keyid}','${keyword}',this);return false;\">取消关注</a>)","item":'<a href="/k/${keyword}">${keyword}</a><span href="javascript:void();" onclick="App.topic.del(\'${keyid}\',\'${keyword}\');return false;" title="删除">x</span>'
		};
		var req={
			"addTopic":{
				"mtd":"POST","url":"/dialog/adddialog.php"
			},"delTopic":{
				"mtd":"POST","url":"/dialog/deldialog.php"
			}
		};
		var doRequest=function (key,parameters,sucFun,errFun) {
			if(!req[key]) {
				throw("wrong key for request!")
			}if(!parameters) {
				throw("what is you want to update?")
			}sucFun=sucFun||function () {
			};
			errFun=errFun||generalError;
			var option={
			};
			option[req[key]["mtd"]]=parameters;
			option["onComplete"]=function (json) {
				if(json.code=="A00006") {
					sucFun(json["data"])
				}else {
					errFun(json)
				}
			};
			option["onException"]=errFun;
			option["returnType"]="json";
			Utils.Io.Ajax.request(req[key]["url"],option)
		};
		var isList=element["lisBox"]?true:false;
		var maxList=10;
		App.topic={
			"add":function (keyword,dom) {
				keyword=decodeURIComponent(keyword);
				if(!keyword) {
					return false
				}if(scope.$uid=="") {
					App.ModLogin({
						"func":App.topic.add,"param":keyword
					});
					return
				}var success=function (json) {
					if(scope.$uid=="123456") {
						window.location.reload();
						return
					}var keyid=json;
					var addedString=template["added"].replace(/\$\{keyword\}/g,encodeURIComponent(keyword)).replace(/\$\{keyid\}/g,keyid);
					if(dom) {
						dom.parentNode.innerHTML=addedString
					}if(element["addBox"]) {
						element["addBox"].innerHTML=addedString
					}if(isList) {
						var topicItem=document.createElement("LI");
						topicItem.id="topic_"+keyid;
						keyword=Core.String.encodeHTML(Core.String.trim(keyword));
						topicItem.innerHTML=template["item"].replace(/\$\{keyword\}/g,decodeURIComponent(keyword)).replace(/\$\{keyid\}/g,keyid);
						if(App.topic["list"].length==0) {
							element["lisBox"].parentNode.style.display="block"
						}var sHtml='<li id = "'+topicItem.id+'" onmouseover="this.className=\'list_hover\'" '+"onmouseout=\"this.className=''\">"+topicItem.innerHTML+"</li>";
						Core.Dom.insertHTML(element["lisBox"],sHtml,"AfterBegin");
						if(App.topic.list.length<10) {
							App.topic.more(1)
						}App.topic["list"].push(topicItem);
						element["lisTit"].innerHTML="关注的话题("+App.topic["list"].length+")";
						if(App.topic.list.length>10) {
							if(element["moreBox"]) {
								var lis=element["lisBox"].getElementsByTagName("LI");
								for(var i=len;i>=10;i--) {
									lis[i].style.display="none"
								}element["moreBox"].style.display="block"
							}
						}
					}
				};
				doRequest("addTopic",{
					"keyWords":keyword
				},success)
			},"del":function (keyid,keyword,dom) {
				if(!keyid) {
					return false
				}var success=function (json) {
					if(isList) {
						App.topic.more(1);
						try{
							Core.Dom.removeNode("topic_"+keyid);
							for(var i=0,len=App.topic["list"].length;i<len;i++) {
								if(App.topic["list"][i].id=="topic_"+keyid) {
									App.topic["list"].splice(i,1);
									break
								}
							}element["lisTit"].innerHTML="关注的话题("+App.topic["list"].length+")"
						}catch(exp) {
						}
					}if(element["addBox"]) {
						try{
							if(scope["$search"]==keyword) {
								element["addBox"].innerHTML=template["botton"].replace(/\$\{keyword\}/g,keyword)
							}
						}catch(exp) {
						}
					}if(dom) {
						try{
							dom.parentNode.innerHTML=template["botton"].replace(/\$\{keyword\}/g,keyword)
						}catch(exp) {
						}
					}if(element["shell"]) {
						if(!App.topic.list.length) {
							element["shell"].style.display="none"
						}
					}
				};
				doRequest("delTopic",{
					"id":keyid
				},success)
			},"more":function (mount) {
				if(typeofmount!="number") {
					throw("this function need a number as a parameter!")
				}var needShowList=[];
				for(var i=0,len=App.topic["list"].length;i<len;i++) {
					if(App.topic["list"][i]["style"]["display"]=="none") {
						needShowList.push(App.topic["list"][i]);
						if(needShowList.length>=mount) {
							break
						}
					}
				}var c=0;
				var tk=App.timer.add(function () {
					if(c>=needShowList.length) {
						App.timer.remove(tk);
						if(App.topic["list"].length>0&&App.topic["list"][App.topic["list"].length-1].style.display!="none") {
							if(element["moreBox"]) {
								element["moreBox"].style.display="none"
							}
						}return false
					}needShowList[c].style.display="";
					c++
				})
			},"list":[]
		};
		if(isList) {
			var itemList=element["lisBox"].getElementsByTagName("LI");
			for(var i=0,len=itemList.length;i<len;i++) {
				App.topic["list"].push(itemList[i])
			}
		}
	});
	App.Comment={
		"loadData":function (sUrl,oNode,oGet,fCallBack,fFail) {
			Core.Class.extend(oGet,scope.commentConfig.params);
			Utils.Io.Ajax.request(sUrl,{
				"onComplete":function (oResult) {
					if(oResult.code=="A00006"&&oNode!=null) {
						oNode.innerHTML=oResult.data;
						fCallBack(oResult)
					}else {
						if(oResult.code=="A00003") {
						}else {
							fFail(oResult)
						}
					}
				}.bind2(this),"onException":function (e) {
				},"returnType":"json","GET":oGet
			})
		},"post":function (sUrl,oPost,fCallBack,fFail) {
			Core.Class.extend(oPost,scope.commentConfig.params);
			oPost.content&&(oPost.content=oPost.content.replace(/\uff20/ig,"@"));
			Utils.Io.Ajax.request(sUrl,{
				"POST":oPost,"onComplete":function (oResult) {
					if(oResult.code=="A00006") {
						fCallBack(oResult)
					}else {
						if(oResult.code=="M00008") {
							window.location.href=oResult.data
						}else {
							fFail(oResult)
						}
					}
				}.bind2(this),"onException":function () {
				},returnType:"json"
			})
		},"addComment":function (sUrl,oNode,fCallBack,fFail) {
			var loginFlag=false;
			var postComment=function () {
				if(oNode.locked) {
					return
				}oNode.locked=true;
				oNode.className="btn_notclick";
				var oPost=oNode.oParam;
				if(oPost) {
					var sContent=$E("_comment_content_"+oPost.productId+"_"+oPost.resourceId+((oPost.cid&&oPost.listInDiv!=1)?"_"+oPost.cid:"")).value;
					var exContent=Core.String.trim(sContent);
					if(exContent==""||(/^\u56de\u590d[^:]*:/.test(exContent)&&(/^\u56de\u590d[^:]*:$/.test(exContent)))) {
						fFail.bind2(oNode)({
							"code":"SCM008"
						});
						return
					}oPost["content"]=sContent;
					if(oPost.forward) {
						sUrl+="?f=1"
					}
				}this.post(sUrl,oPost,(function (oNode,fCallBack) {
					return function (oResult) {
						if(oNode.$loginDiv&&oNode.$loginuser&&oNode.$loginpassword) {
							setTimeout(function () {
								window.location.reload()
							},10);
							return
						}oNode.locked=false;
						oNode.className="btn_normal";
						var countPanel=$E("_comment_count_"+oNode.oParam.productId+"_"+oNode.oParam.resourceId);
						try{
							App.Comment.count(countPanel,"+")
						}catch(e) {
						}fCallBack(oNode,oResult)
					}
				})(oNode,fCallBack),fFail||function () {
				})
			};
			if(oNode.$loginDiv&&oNode.$loginuser&&oNode.$loginpassword) {
				if(!oNode.$loginuser.value||oNode.$loginuser.value==$SYSMSG["R01008"]) {
					App.alert($SYSMSG["M00901"]);
					return
				}if(oNode.$loginpassword.value=="") {
					App.alert($SYSMSG["M00902"]);
					return
				}loginFlag=true;
				var cfg={
					name:oNode.$loginuser.value,pwd:oNode.$loginpassword.value,remb:true,succ:postComment.bind2(this),error:function (err,errno) {
						if(errno=="4010") {
							var msg=App.getMsg("R01010",{
								mail:oNode.$loginuser.value
							});
							App.alert(msg)
						}else {
							App.alert(err)
						}
					}
				};
				App.LoginAction(cfg)
			}else {
				postComment.bind2(this)()
			}
		},"deleteComment":function (sUrl,oPost,fCallBack,fFail) {
			this.post(sUrl,oPost,function (oResult) {
				var countPanel=$E("_comment_count_"+oPost.productId+"_"+oPost.resId);
				try{
					this.count(countPanel,"-")
				}catch(e) {
				}fCallBack()
			}.bind2(this),fFail||function () {
			})
		},"count":function (oNode,sMethod) {
			var sInnerHTML=oNode.innerHTML;
			var countNumber=sInnerHTML.match(/(\d+)/);
			var countValue=countNumber!=null?window.parseInt(countNumber[0]):0;
			var value=window.eval(countValue+sMethod+1);
			App.Comment.setCount(oNode,value)
		},"superCount":function (oNode,sMethod,fRef) {
			var countPanel=Core.Dom.getElementsByClass(oNode,"div","list_head");
			var len=countPanel.length;
			if(countPanel[0]) {
				var countSpan,count=0;
				countSpan=countPanel[0].getElementsByTagName("span")[0];
				if(countSpan) {
					count=window.parseInt(countSpan.innerHTML);
					count=window.eval(count+sMethod+1);
					countSpan.innerHTML=Math.max(count,0)
				}
			}var commentItems=oNode.getElementsByTagName("li");
			var commentLen=commentItems.length;
			if(commentLen==0) {
				if(countPanel[0]) {
					countPanel[0].parentNode.removeChild(countPanel[0])
				}if(countPanel[1]) {
					countPanel[1].parentNode.removeChild(countPanel[1])
				}if(fRef) {
					fRef()
				}
			}else {
				if(commentLen<10) {
					if(countPanel[1]) {
						countPanel[1].parentNode.removeChild(countPanel[1])
					}
				}
			}
		},"setCount":function (oNode,value) {
			if(value>0) {
				oNode.innerHTML="评论<strong>("+value+")</strong>"
			}else {
				oNode.innerHTML="评论"
			}
		},"login":function () {
		},"listenerUserInput":function (oNode,sLength) {
			oNode=$E(oNode);
			if(oNode==null) {
				return
			}var limit=function (sLength) {
				var snapLength=Core.String.byteLength(this.value);
				if(snapLength>sLength) {
					this.value=Core.String.leftB(this.value,sLength)
				}
			};
			App.autoHeightTextArea(oNode,Core.Function.bind3(limit,oNode,[sLength]))
		},"changeArrow":function (oNode,direction) {
			if(oNode!=null) {
				switch(direction) {
					case "up":oNode.className="off";
					break;
					case "down":oNode.className="on";
					break
				}
			}
		},"alert":function (oTarget,sText,iIcon,fCallBack,fCancel) {
			return App.flyDialog(sText,(!fCancel)?"alert":"confirm",oTarget,{
				icon:iIcon,ok:fCallBack
			})
		},"getTarget":function () {
			try{
				var oEvent=Core.Events.getEvent();
				var oTarget=oEvent?(oEvent.srcElement||oEvent.target):null
			}catch(e) {
				return null
			}return oTarget
		},"focus":function (oNode,step) {
			if(!oNode) {
				return
			}try{
				oNode.focus()
			}catch(e) {
			}if(step) {
				setTimeout(function () {
					document.documentElement.scrollTop=step
				},20)
			}if($IE) {
				var oSelector=oNode.createTextRange();
				oSelector.moveStart("character",oNode.value.length);
				oSelector.select()
			}
		}
	};
	$SYSMSG.extend({
		"SCM001":"确定要删除该回复吗？","SCM002":'<input id="shieldCommentUid" type="checkbox" onclick="scope.shieldCommentUidOrNot=this.checked;" /> 将#{sNick}加入我的黑名单，黑名单用户'+"将无法再跟你联络。你可以在隐私设置中查看、管理黑名单。","SCM003":"确定要删除该#{name}回复吗？","SCM004":"是否确定删除已选评论","SCM005":"由于对方进行了隐私设置，你没有权限发表#{action}","SCM006":"您还没有选择要删除的评论","SCM007":"回复成功","SCM008":"你还没有填写内容，请填写后提交。","A00003":"无权限操作。","A00004":"该条留言不存在。","A00005":"评论内容含有非法关键字。","A-7":"无权限删除","A00001":"系统繁忙，请稍候再试。","S00736":"添加到黑名单失败，可能此人已经在你的黑名单中。","S00015":"用户不存在","A00006":"成功"
	});
	Core.Dom.getTop=function (element) {
		var top=0;
		var el=$E(element);
		if(el.offsetParent) {
			while(el.offsetParent) {
				top+=el.offsetTop;
				el=el.offsetParent
			}
		}else {
			if(el.y) {
				top+=el.y
			}
		}return top
	};
	Core.Array.uniq=function (ar) {
		var result=[];
		for(var i=0;i<ar.length;i++) {
			var x=ar[i];
			if(Core.Array.findit(result,x)==-1) {
				result.push(x)
			}
		}return result
	};
	App.nameValue=function (item,isClear) {
		var _name=item.getAttribute("name");
		var _type=item.getAttribute("type");
		var _el=item.tagName;
		var _value={
			"name":_name,"value":""
		};
		var _setVl=function (vl) {
			if(vl===false) {
				_value=false;
				return false
			}if(!_value["value"]) {
				_value["value"]=Core.String.trim(vl||"")
			}else {
				_value["value"]=[Core.String.trim(vl||"")].concat(_value["value"])
			}
		};
		if(!item.disabled&&_name) {
			switch(_el) {
				case "INPUT":if(_type=="radio"||_type=="checkbox") {
					if(item.checked) {
						_setVl(item.value)
					}else {
						_setVl(false)
					}
				}else {
					if(_type=="reset"||_type=="submit"||_type=="image") {
						_setVl(false)
					}else {
						_setVl(isClear?(item.value||false):item.value)
					}
				}break;
				case "SELECT":if(item.multiple) {
					var _ops=item.options;
					for(var i=0,len=_ops.length;i<len;i++) {
						if(_ops[i].selected) {
							_setVl(_ops[i].value)
						}
					}
				}else {
					_setVl(item.value)
				}break;
				case "TEXTAREA":_setVl(item.value||item.getAttribute("value")||false);
				break;
				case "BUTTON":default:_setVl(item.value||item.getAttribute("value")||item.innerHTML||false)
			}
		}else {
			_setVl(false)
		}return _value
	};
	App.htmlToJson=function (mainBox,tagNameList,isClear) {
		var _retObj={
		};
		tagNameList=Core.Array.uniq(tagNameList||["INPUT","TEXTAREA","BUTTON","SELECT"]);
		if(!mainBox||!tagNameList) {
			return false
		}var _opInput=App.nameValue;
		for(var i=0,len=tagNameList.length;i<len;i++) {
			var _tags=mainBox.getElementsByTagName(tagNameList[i]);
			for(var j=0,lenTag=_tags.length;j<lenTag;j++) {
				var _info=_opInput(_tags[j],isClear);
				if(!_info) {
					continue
				}if(_retObj[_info.name]) {
					if(_retObj[_info.name]instanceofArray) {
						_retObj[_info.name]=_retObj[_info.name].concat(_info.value)
					}else {
						_retObj[_info.name]=[_retObj[_info.name]].concat(_info.value)
					}
				}else {
					_retObj[_info.name]=_info.value
				}
			}
		}return _retObj
	};
	(function () {
		var Group={
		};
		Group.prov0="城市/地区";
		Group.code0="0";
		Group.prov34="合肥,芜湖,蚌埠,淮南,马鞍山,淮北,铜陵,安庆,黄山,滁州,阜阳,宿州,巢湖,六安,亳州,池州,宣城";
		Group.code34="1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18";
		Group.prov11="东城区,西城区,崇文区,宣武区,朝阳区,丰台区,石景山区,海淀区,门头沟区,房山区,通州区,顺义区,昌平区,大兴区,怀柔区,平谷区,密云县,延庆县";
		Group.code11="1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,28,29";
		Group.prov50="万州区,涪陵区,渝中区,大渡口区,江北区,沙坪坝区,九龙坡区,南岸区,北碚区,万盛区,双桥区,渝北区,巴南区,黔江区,长寿区,綦江县,潼南县,铜梁县,大足县,荣昌县,璧山县,梁平县,城口县,丰都县,垫江县,武隆县,忠县,开县,云阳县,奉节县,巫山县,巫溪县,石柱土家族自治县,秀山土家族苗族自治县,酉阳土家族苗族自治县,彭水苗族土家族自治县,江津市,合川市,永川市,南川市";
		Group.code50="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,81,82,83,84";
		Group.prov35="福州,厦门,莆田,三明,泉州,漳州,南平,龙岩,宁德";
		Group.code35="1,2,3,4,5,6,7,8,9";
		Group.prov62="兰州,嘉峪关,金昌,白银,天水,武威,张掖,平凉,酒泉,庆阳,定西,陇南,临夏,甘南";
		Group.code62="1,2,3,4,5,6,7,8,9,10,24,26,29,30";
		Group.prov44="广州,韶关,深圳,珠海,汕头,佛山,江门,湛江,茂名,肇庆,惠州,梅州,汕尾,河源,阳江,清远,东莞,中山,潮州,揭阳,云浮";
		Group.code44="1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,51,52,53";
		Group.prov45="南宁,柳州,桂林,梧州,北海,防城港,钦州,贵港,玉林,百色,贺州,河池,南宁,柳州";
		Group.code45="1,2,3,4,5,6,7,8,9,10,11,12,21,22";
		Group.prov52="贵阳,六盘水,遵义,安顺,铜仁,黔西南,毕节,黔东南,黔南";
		Group.code52="1,2,3,4,22,23,24,26,27";
		Group.prov46="海口,三亚,其他";
		Group.code46="1,2,90";
		Group.prov13="石家庄,唐山,秦皇岛,邯郸,邢台,保定,张家口,承德,沧州,廊坊,衡水";
		Group.code13="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov23="哈尔滨,齐齐哈尔,鸡西,鹤岗,双鸭山,大庆,伊春,佳木斯,七台河,牡丹江,黑河,绥化,大兴安岭";
		Group.code23="1,2,3,4,5,6,7,8,9,10,11,12,27";
		Group.prov41="郑州,开封,洛阳,平顶山,安阳,鹤壁,新乡,焦作,濮阳,许昌,漯河,三门峡,南阳,商丘,信阳,周口,驻马店";
		Group.code41="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
		Group.prov42="武汉,黄石,十堰,宜昌,襄樊,鄂州,荆门,孝感,荆州,黄冈,咸宁,随州,恩施土家族苗族自治州";
		Group.code42="1,2,3,5,6,7,8,9,10,11,12,13,28";
		Group.prov43="长沙,株洲,湘潭,衡阳,邵阳,岳阳,常德,张家界,益阳,郴州,永州,怀化,娄底,湘西土家族苗族自治州";
		Group.code43="1,2,3,4,5,6,7,8,9,10,11,12,13,31";
		Group.prov15="呼和浩特,包头,乌海,赤峰,通辽,鄂尔多斯,呼伦贝尔,兴安盟,锡林郭勒盟,乌兰察布盟,巴彦淖尔盟,阿拉善盟";
		Group.code15="1,2,3,4,5,6,7,22,25,26,28,29";
		Group.prov32="南京,无锡,徐州,常州,苏州,南通,连云港,淮安,盐城,扬州,镇江,泰州,宿迁";
		Group.code32="1,2,3,4,5,6,7,8,9,10,11,12,13";
		Group.prov36="南昌,景德镇,萍乡,九江,新余,鹰潭,赣州,吉安,宜春,抚州,上饶";
		Group.code36="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov22="长春,吉林,四平,辽源,通化,白山,松原,白城,延边朝鲜族自治州";
		Group.code22="1,2,3,4,5,6,7,8,24";
		Group.prov21="沈阳,大连,鞍山,抚顺,本溪,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛";
		Group.code21="1,2,3,4,5,6,7,8,9,10,11,12,13,14";
		Group.prov64="银川,石嘴山,吴忠,固原";
		Group.code64="1,2,3,4";
		Group.prov63="西宁,海东,海北,黄南,海南,果洛,玉树,海西";
		Group.code63="1,21,22,23,25,26,27,28";
		Group.prov14="太原,大同,阳泉,长治,晋城,朔州,晋中,运城,忻州,临汾,吕梁";
		Group.code14="1,2,3,4,5,6,7,8,9,10,23";
		Group.prov37="济南,青岛,淄博,枣庄,东营,烟台,潍坊,济宁,泰安,威海,日照,莱芜,临沂,德州,聊城,滨州,菏泽";
		Group.code37="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
		Group.prov31="黄浦区,卢湾区,徐汇区,长宁区,静安区,普陀区,闸北区,虹口区,杨浦区,闵行区,宝山区,嘉定区,浦东新区,金山区,松江区,青浦区,南汇区,奉贤区,崇明县";
		Group.code31="1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,30";
		Group.prov51="成都,自贡,攀枝花,泸州,德阳,绵阳,广元,遂宁,内江,乐山,南充,眉山,宜宾,广安,达州,雅安,巴中,资阳,阿坝,甘孜,凉山";
		Group.code51="1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,32,33,34";
		Group.prov12="和平区,河东区,河西区,南开区,河北区,红桥区,塘沽区,汉沽区,大港区,东丽区,西青区,津南区,北辰区,武清区,宝坻区,宁河县,静海县,蓟县";
		Group.code12="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,23,25";
		Group.prov54="拉萨,昌都,山南,日喀则,那曲,阿里,林芝";
		Group.code54="1,21,22,23,24,25,26";
		Group.prov65="乌鲁木齐,克拉玛依,吐鲁番,哈密,昌吉,博尔塔拉,巴音郭楞,阿克苏,克孜勒苏,喀什,和田,伊犁,塔城,阿勒泰";
		Group.code65="1,2,21,22,23,27,28,29,30,31,32,40,42,43";
		Group.prov53="昆明,曲靖,玉溪,保山,昭通,楚雄,红河,文山,思茅,西双版纳,大理,德宏,丽江,怒江,迪庆,临沧";
		Group.code53="1,3,4,5,6,23,25,26,27,28,29,31,32,33,34,35";
		Group.prov33="杭州,宁波,温州,嘉兴,湖州,绍兴,金华,衢州,舟山,台州,丽水";
		Group.code33="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov61="西安,铜川,宝鸡,咸阳,渭南,延安,汉中,榆林,安康,商洛";
		Group.code61="1,2,3,4,5,6,7,8,9,10";
		Group.prov71="台北,高雄,其他";
		Group.code71="1,2,90";
		Group.prov81="香港";
		Group.code81="1";
		Group.prov82="澳门";
		Group.code82="1";
		Group.prov400="美国,英国,法国,俄罗斯,加拿大,巴西,澳大利亚,印尼,泰国,马来西亚,新加坡,菲律宾,越南,印度,日本,其他";
		Group.code400="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16";
		Group.prov100="";
		Group.code100="";
		Group.provinces="安徽,北京,重庆,福建,甘肃,广东,广西,贵州,海南,河北,黑龙江,河南,湖北,湖南,内蒙古,江苏,江西,吉林,辽宁,宁夏,青海,山西,山东,上海,四川,天津,西藏,新疆,云南,浙江,陕西,台湾,香港,澳门,海外,其他";
		Group.provcodes="34,11,50,35,62,44,45,52,46,13,23,41,42,43,15,32,36,22,21,64,63,14,37,31,51,12,54,65,53,33,61,71,81,82,400,100";
		App.ProvinceAndCity=function (provDom,cityDom,provCode,cityCode) {
			this.provDom=provDom;
			this.cityDom=cityDom;
			this.provCode=provCode;
			this.cityCode=cityCode;
			this.init()
		};
		(function (_p) {
			_p.init=function () {
				this.loadProv();
				this.loadCity();
				Core.Events.addEvent(this.provDom,(function (_this) {
					return function () {
						_this.cityCode=1000;
						_this.provCode=_this.provDom.value;
						_this.loadCity()
					}
				})(this),"change")
			};
			_p.disp=function () {
			};
			_p.loadProv=function () {
				var provOps=this.provDom.options;
				var provcodes=Group.provcodes.split(",");
				var provinces=Group.provinces.split(",");
				if(provOps.length<=1) {
					provOps[0]=new Option("省/直辖市",0);
					for(var i=0,len=provcodes.length;i<len;i++) {
						provOps[provOps.length]=new Option(provinces[i],provcodes[i])
					}
				}if(Core.Array.findit(provcodes,this.provCode)!=-1) {
					this.provDom.value=this.provCode
				}else {
					this.provDom.value=0
				}
			};
			_p.loadCity=function () {
				if(this.provCode=="1001") {
					this.cityDom.style.display="none";
					this.cityDom.disabled=true;
					return false
				}else {
					this.cityDom.disabled=false;
					this.cityDom.style.display=""
				}var cityOps=this.cityDom.options;
				while(cityOps.length) {
					this.cityDom.remove(0)
				}var cityCodes=Group["code"+this.provCode].split(",");
				var cityTexts=Group["prov"+this.provCode].split(",");
				cityOps[0]=new Option("不限",1000);
				for(var i=0,len=cityCodes.length;i<len;i++) {
					if(cityTexts[i]&&cityCodes[i]) {
						cityOps[cityOps.length]=new Option(cityTexts[i],cityCodes[i])
					}
				}if(Core.Array.findit(cityCodes,this.cityCode)!=-1) {
					this.cityDom.value=this.cityCode
				}else {
					this.cityDom.value=1000
				}
			};
			_p.loadNewData=function (provCode,cityCode) {
				this.provCode=provCode;
				this.cityCode=cityCode;
				this.loadProv();
				this.loadCity()
			}
		})(App.ProvinceAndCity.prototype)
	})();
	App.finishInformation=function () {
		window.location.href="/person/full_info.php"
	};
	scope.commentConfig={
		iInputLimitSize:280,defaultPage:"0",sPostUrl:"/comment/addcomment.php",sDeleteAPI:"/comment/delcomment.php",sDataUrl:"/comment/commentlist.php",params:{
		}
	};
	scope.initCommentLoginInput=function (oUserInput,oUserPassword) {
		if(oUserInput) {
			(function (sText,oInput,oPassword,sValue) {
				oInput.style.color="#999999";
				oInput.alt=oInput.title=sText;
				if(sValue=="") {
					oInput.value=sText
				}if(!oInput.binded) {
					Core.Events.addEvent(oInput,function () {
						passcardOBJ.init(oInput,{
							overfcolor:"#999",overbgcolor:"#e8f4fc",outfcolor:"#000000",outbgcolor:""
						},oPassword,parent);
						oInput.style.color="#333333";
						if(oInput.value==sText) {
							oInput.value=""
						}
					},"focus");
					Core.Events.addEvent(oInput,function () {
						oInput.style.color="#999999";
						if(oInput.value=="") {
							oInput.value=sText
						}
					},"blur");
					oUserInput.binded=true
				}
			})("电子邮箱/UC号/会员帐号/手机号",oUserInput,oUserPassword,oUserInput.value)
		}
	};
	scope.closeCommentByRid=function (sProductId,iResourceId) {
		var oListNode=$E("_comment_list_"+sProductId+"_"+iResourceId);
		oListNode.innerHTML="";
		oListNode.loaded=false
	};
	scope.loadCommentByRid=function (iOwnerUid,sProductId,sProductName,iResourceId,sResTitle,sResInfo,sNodeId,bListInDiv,bRefresh,iFocus,callback) {
		if(scope.$cuser_status==="nofull"&&scope.$uid!==""&&bListInDiv==1) {
			App.finishInformation();
			return false
		}var oTarget=App.Comment.getTarget();
		var oListNode=$E("_comment_list_"+sProductId+"_"+iResourceId);
		if(oListNode!=null) {
			if(!oListNode.loaded||bRefresh==1) {
				if(!oListNode.loaded) {
					oListNode.innerHTML='<div style="padding:30px 0;text-align:center"><img src="http://simg.sinajs.cn/miniblog/images/common/loading.gif"/></div>';
					oListNode.style["diplay"]="block"
				}oListNode.loaded=false
			}else {
				oListNode.innerHTML="";
				oListNode.loaded=false;
				return
			}App.Comment.loadData(scope.commentConfig.sDataUrl,oListNode,{
				"act":bListInDiv,"from":scope.currentCommentPage||scope.commentConfig.defaultPage,"ownerUid":iOwnerUid,"productId":sProductId,"resId":iResourceId,"resInfo":sResInfo,"type":bListInDiv
			},function (oResult) {
				oListNode.loaded=true;
				var oContentNode=$E("_comment_content_"+sProductId+"_"+iResourceId);
				App.Comment.listenerUserInput(oContentNode,scope.commentConfig.iInputLimitSize);
				var oPostNode=$E("_comment_post_"+sProductId+"_"+iResourceId);
				var oLoginDiv=$E("_comment_logindiv_"+sProductId+"_"+iResourceId);
				var oLoginuser=$E("_comment_loginuser_"+sProductId+"_"+iResourceId);
				var oLoginpassword=$E("_comment_loginpassword_"+sProductId+"_"+iResourceId);
				scope.initCommentLoginInput(oLoginuser,oLoginpassword);
				oPostNode.oParam={
					"uid":scope.$uid,"ownerUid":iOwnerUid,"resourceId":iResourceId,"productId":sProductId,"productName":sProductName,"resTitle":sResTitle,"resInfo":sResInfo,"listInDiv":bListInDiv
				};
				if(!oPostNode.binded) {
					Core.Events.addEvent(oPostNode,function () {
						var inputs=oContentNode.parentNode.parentNode.getElementsByTagName("input");
						var len=inputs.length;
						for(var i=0;i<len;i++) {
							if(inputs[i].id==="agree"&&inputs[i].checked) {
								oPostNode.oParam.forward="1"
							}
						}var func=Core.Function.bind3(App.Comment.addComment,App.Comment,[scope.commentConfig.sPostUrl,oPostNode,function (oResult,oData) {
							var callback=null;
							if(scope.commentConfig.params.role!==undefined&&scope.commentConfig.params.role!=-1) {
								callback=function () {
									App.alert({
										code:"M02007"
									},{
										icon:3
									})
								}
							}if(oData.data) {
								var oInnerNode=Core.Dom.getElementsByClass(oListNode,"ul","PL_list")[0];
								Core.Dom.insertHTML(oInnerNode,oData.data,"beforeend");
								try{
									App.Comment.superCount(oListNode,"+")
								}catch(e) {
								}oContentNode.value="";
								App.Comment.focus(oContentNode)
							}else {
								scope.loadCommentByPage.bind2(oPostNode)(0,1,callback)
							}
						},function (oResult) {
							if(oResult.code=="A00003") {
								oPostNode.$loginDiv=oLoginDiv;
								oPostNode.$loginuser=oLoginuser;
								oPostNode.$loginpassword=oLoginpassword;
								oLoginDiv.style["display"]="block";
								oPostNode.className="btn_normal";
								oPostNode.locked=false
							}else {
								oPostNode.className="btn_normal";
								oPostNode.locked=false;
								App.Comment.alert(oPostNode,App.getMsg(oResult.code),1,function () {
								})
							}
						}]);
						func()
					},"click");
					Core.Events.addEvent(oContentNode,function (event) {
						if((event.ctrlKey==true&&event.keyCode=="13")||(event.altKey==true&&event.keyCode=="83")) {
							oContentNode.blur();
							Core.Events.fireEvent(oPostNode,"click")
						}
					},"keyup");
					oPostNode.binded=true
				}if(iFocus==1) {
					if(bListInDiv==2) {
						var ul=oListNode.getElementsByTagName("ul")[0];
						var li=ul.getElementsByTagName("li");
						var fixHeight=Core.Dom.getTop(li[li.length-1]);
						App.Comment.focus(oContentNode,fixHeight)
					}else {
						App.Comment.focus(oContentNode)
					}
				}if(scope.$uid=="") {
					oPostNode.$loginDiv=oLoginDiv;
					oPostNode.$loginuser=oLoginuser;
					oPostNode.$loginpassword=oLoginpassword;
					oLoginDiv.style["display"]="block"
				}if(typeof(callback)=="function") {
					setTimeout(callback,200)
				}
			},function (oResult) {
				App.Comment.alert(oTarget,App.getMsg(oResult.code))
			}.bind2(this))
		}
	};
	scope.deleteCommentByRid=function (iCommentUid,iOwnerId,iResourceId,iCid,sProductId,bListInDiv,bRefresh) {
		var oTarget=App.Comment.getTarget();
		var oPostNode=$E("_comment_post_"+sProductId+"_"+iResourceId);
		var oLoginDiv=$E("_comment_logindiv_"+sProductId+"_"+iResourceId);
		var oLoginuser=$E("_comment_loginuser_"+sProductId+"_"+iResourceId);
		var oLoginpassword=$E("_comment_loginpassword_"+sProductId+"_"+iResourceId);
		var deleteAction=function (oIsLogin) {
			var sText=App.getMsg("SCM001");
			if(iCommentUid!=iOwnerId&&iCommentUid!=scope.$uid&&(Core.Array.findit(App.admin_uid_list,iCommentUid)===-1)) {
				sText+="<div style='margin-top:10px;font-size:14px;'>"+"<input style='vertical-align:-1px;margin-right:3px;' type='checkbox' "+"id='block_user'>同时将此用户加入黑名单</div>"
			}App.Comment.alert(oTarget,sText,4,function () {
				var oPost={
					"act":"delComment","resUid":iOwnerId,"resId":iResourceId,"id":iCid,"productId":sProductId,"commentId":iCommentUid
				};
				if($E("block_user")&&$E("block_user").checked) {
					oPost.isblack="OK"
				}App.Comment.deleteComment(scope.commentConfig.sDeleteAPI,oPost,function (oResult) {
					if(oIsLogin) {
						setTimeout(function () {
							window.location.reload(true)
						},10);
						return
					}if(bRefresh==1) {
						if(!scope.$resourceId&&bListInDiv==2) {
							setTimeout(function () {
								window.location.reload(true)
							},10)
						}else {
							var oWaper=oTarget.parentNode.parentNode;
							var oParentNode=oWaper.parentNode;
							oParentNode.removeChild(oWaper);
							try{
								App.Comment.superCount(oParentNode.parentNode,"-",function () {
									scope.loadCommentByPage.bind2(oPostNode)(scope.currentCommentPage)
								})
							}catch(e) {
							}
						}
					}
				},function (oResult) {
					if(!oResult.code) {
						return
					}if(oResult.code=="A00003") {
						App.ModLogin(function () {
						})
					}else {
						App.Comment.alert(oTarget,App.getMsg(oResult.code))
					}
				})
			},function () {
			})
		};
		if(scope.$uid=="") {
			App.ModLogin({
				"func":function () {
					deleteAction(true)
				}
			})
		}else {
			deleteAction()
		}
	};
	scope.loadCommentByPage=function (nPage,iFocus,callback) {
		iFocus=iFocus||0;
		scope.currentCommentPage=nPage||scope.commentConfig.defaultPage;
		if(this.oParam) {
			var oParam=this.oParam;
			scope.loadCommentByRid(oParam.ownerUid,oParam.productId,oParam.productName,oParam.resourceId,oParam.resTitle,oParam.resInfo,"",oParam.listInDiv,1,iFocus,callback)
		}else {
			scope.loadCommentByRid(scope.$oid||"",scope.$PRODUCT_NAME||"",scope.$appName||"",scope.$resourceId||"",scope.$resTitle||"",scope.$resInfo||"","","2",1,iFocus,callback)
		}
	};
	scope.replyByCid=function (iCommentUid,iOwnerUId,iResourceId,iCid,sCname,sReplyContent,sProductId,bListInDiv,bRefresh,sResTitle) {
		bListInDiv=bListInDiv==1?1:2;
		var oContentNode;
		var sCurrentValue;
		var oPostNode=$E("_comment_post_"+sProductId+"_"+iResourceId);
		var oLoginDiv=$E("_comment_logindiv_"+sProductId+"_"+iResourceId+(bListInDiv==2?"_"+iCid:""));
		var oLoginuser=$E("_comment_loginuser_"+sProductId+"_"+iResourceId+(bListInDiv==2?"_"+iCid:""));
		var oLoginpassword=$E("_comment_loginpassword_"+sProductId+"_"+iResourceId+(bListInDiv==2?"_"+iCid:""));
		scope.initCommentLoginInput(oLoginuser,oLoginpassword);
		if(bListInDiv==1) {
			oContentNode=$E("_comment_content_"+sProductId+"_"+iResourceId);
			if(oPostNode&&oPostNode.oParam) {
				oPostNode.oParam["replyUid"]=iCommentUid;
				oPostNode.oParam["ccontent"]=sReplyContent;
				oPostNode.oParam["cid"]=iCid
			}
		}else {
			oContentNode=$E("_comment_content_"+sProductId+"_"+iResourceId+"_"+iCid);
			var oReplyPanel=$E("_comment_reply_"+sProductId+"_"+iResourceId+"_"+iCid);
			if(oReplyPanel.isOpen) {
				oReplyPanel.style["display"]="none";
				oReplyPanel.isOpen=false;
				return
			}else {
				oReplyPanel.style["display"]="block";
				oReplyPanel.isOpen=true
			}var inputs=oReplyPanel.getElementsByTagName("input");
			var len=inputs.length;
			var oForward;
			for(var i=0;i<len;i++) {
				if(inputs[i].id==="agree") {
					oForward=inputs[i]
				}
			}if(oForward&&oForward.parentNode) {
				oForward.parentNode.style.display="block"
			}var oReplyButton=$E("_comment_post_"+sProductId+"_"+iResourceId+"_"+iCid);
			oReplyButton.oParam=(!oPostNode)?{
				"uid":scope.$uid,"ownerUid":iOwnerUId,"resourceId":iResourceId,"productId":sProductId,"resTitle":sResTitle,"listInDiv":bListInDiv
			}:(function () {
				var obj={
				};
				for(var p in oPostNode.oParam) {
					obj[p]=oPostNode.oParam[p]
				}return obj
			})();
			oReplyButton.oParam["replyUid"]=iCommentUid;
			oReplyButton.oParam["ccontent"]=sReplyContent;
			oReplyButton.oParam["cid"]=iCid;
			if(!oReplyButton.binded) {
				Core.Events.addEvent(oReplyButton,function () {
					if(oForward.checked) {
						oReplyButton.oParam.forward="1"
					}var func=Core.Function.bind3(App.Comment.addComment,App.Comment,[scope.commentConfig.sPostUrl,oReplyButton,function (oResult) {
						if(bRefresh==1) {
							var cb;
							if(scope.commentConfig.params.role!==undefined&&scope.commentConfig.params.role!=-1) {
								cb=function () {
									return App.alert({
										code:"M02008"
									},{
										icon:3
									})
								}
							}scope.loadCommentByPage.bind2(oReplyButton)(0,1,cb)
						}else {
							var oParam=oReplyButton.oParam;
							var oReplyPanel=$E("_comment_reply_"+oParam.productId+"_"+oParam.resourceId+"_"+oParam.cid);
							oContentNode.value="";
							oReplyButton.isOpen=false;
							oReplyButton.className="btn_normal";
							if(scope.$pageid=="commentHandler") {
								var oReplayTip=$E("_comment_paneltip_"+oParam.productId+"_"+oParam.resourceId+"_"+oParam.cid);
								if(oReplyPanel&&oReplayTip) {
									var _successDialog=App.Comment.alert(oReplyButton,App.getMsg("SCM007"),3,function () {
									});
									_successDialog.onClose=function () {
										window.clearTimeout(_successDialog["clock"]);
										oReplayTip.style.display="none";
										oReplyPanel.style.display="none"
									};
									_successDialog["clock"]=window.setTimeout(function () {
										_successDialog.close()
									},3000)
								}
							}else {
								App.Comment.alert(oReplyButton,App.getMsg("SCM007"),3,function () {
								});
								oReplyPanel.style.display="none"
							}oReplyPanel.isOpen=false
						}
					},function (oResult) {
						if(oResult.code=="A00003") {
							oReplyButton.$loginDiv=oLoginDiv;
							oReplyButton.$loginuser=oLoginuser;
							oReplyButton.$loginpassword=oLoginpassword;
							oLoginDiv.style["display"]="block";
							oReplyButton.className="btn_normal";
							oReplyButton.locked=false
						}else {
							oReplyButton.className="btn_normal";
							oReplyButton.locked=false;
							App.Comment.alert(oReplyButton,App.getMsg(oResult.code),1,function () {
							})
						}
					}]);
					func()
				},"click");
				Core.Events.addEvent(oContentNode,function (event) {
					if((event.ctrlKey==true&&event.keyCode=="13")||(event.altKey==true&&event.keyCode=="83")) {
						oContentNode.blur();
						Core.Events.fireEvent(oReplyButton,"click")
					}
				},"keyup");
				oReplyButton.binded=true
			}if(scope.$uid=="") {
				oReplyButton.$loginDiv=oLoginDiv;
				oReplyButton.$loginuser=oLoginuser;
				oReplyButton.$loginpassword=oLoginpassword;
				oLoginDiv.style.display="block"
			}
		}App.Comment.listenerUserInput(oContentNode,scope.commentConfig.iInputLimitSize);
		sCurrentValue=Core.String.trim(oContentNode.value);
		var reg=/^\u56de\u590d[^:]*:/;
		if(reg.test(sCurrentValue)) {
			oContentNode.value=sCurrentValue.replace(reg,"回复"+sCname+":")
		}else {
			oContentNode.value="回复@"+sCname+":"+sCurrentValue
		}App.Comment.focus(oContentNode)
	};
	scope.getCommentCount=function (oData) {
		var oGet=oData||scope.$commentdata;
		var aProductIds=[];
		var aOwnerUids=[];
		var aResourceIds=[];
		if(oGet&&oGet.length>0) {
			var i=0;
			for(i;i<oGet.length;i++) {
				aProductIds.push(oGet[i].pid);
				aOwnerUids.push(oGet[i].oid);
				aResourceIds.push(oGet[i].rid)
			}Utils.Io.Ajax.request("/comment/commentnum.php",{
				"POST":{
					"resourceids":aResourceIds.join(","),"productids":aProductIds.join(","),"ownerUids":aOwnerUids.join(",")
				},"onComplete":function (oResult) {
					if(oResult.code=="A00006") {
						var oData=oResult.data;
						if(oData) {
							var i;
							var hashList={
							};
							for(i in oData) {
								hashList[oData[i]["resourceid"]]=oData[i].count;
								var oCountNode=$E("_comment_count_"+oData[i].productid+"_"+oData[i].resourceid);
								if(oCountNode) {
									App.Comment.setCount(oCountNode,oData[i].count||0)
								}
							}var fwList=document.getElementsByName("_comment_count_"+oData[i].productid);
							var len=fwList.length;
							if(len>0) {
								var i=0;
								for(i;i<len;i++) {
									var fwA=fwList[i];
									if(!fwA.changed) {
										var value=fwA.getAttribute("resid");
										var snapValue=hashList[value];
										if(hashList[value]) {
											fwA.innerHTML="原文评论<string>("+(hashList[value]||0)+")</string>"
										}else {
											fwA.innerHTML="原文评论<string>(0)</string>"
										}fwA.changed=true
									}
								}
							}
						}
					}
				},returnType:"json"
			})
		}
	};
	scope.focusCommentContent=function (sProductId,iResourceId) {
		var oContentNode=$E("_comment_content_"+sProductId+"_"+iResourceId);
		App.Comment.focus(oContentNode)
	};
	scope.loadComment=function (role) {
		if(role!==undefined) {
			Core.Class.extend(scope.commentConfig.params,{
				role:role.toString ()
			})
		}if(scope.$resourceId) {
			scope.loadCommentByPage(scope.currentCommentPage||scope.commentConfig.defaultPage)
		}
	};
	$registJob("loadComment",function () {
		scope.loadComment(scope.$pageid=="mblog"?"-1":undefined)
	});
	$registJob("ratateImage",function () {
		if(!$E("imgContainer")) {
			return false
		}var defaultWidth=500;
		var imgID="imgContainer";
		Core.Events.addEvent("rotateLeft",function () {
			App.rotate.rotateLeft(imgID,90,function (canvas) {
			},defaultWidth)
		},"click");
		Core.Events.addEvent("rotateRight",function () {
			App.rotate.rotateRight(imgID,90,function (canvas) {
			},defaultWidth)
		},"click")
	});
	App.rotate={
		rotateRight:function (imgID,angle,callback,maxWidth) {
			this._img[imgID]=this._img[imgID]||{
			};
			this._img[imgID]._right=this._img[imgID]._right||0;
			this._img[imgID]._right++;
			this._rotate(imgID,angle==undefined?90:angle,callback,maxWidth)
		},rotateLeft:function (imgID,angle,callback,maxWidth) {
			this._img[imgID]=this._img[imgID]||{
			};
			this._img[imgID]._left=this._img[imgID]._left||0;
			this._img[imgID]._left++;
			this._rotate(imgID,angle==undefined?-90:-angle,callback,maxWidth)
		},_img:{
		},_rotate:function (imgID,angle,callback,maxWidth) {
			var p=$E(imgID);
			p.angle=((p.angle==undefined?0:p.angle)+angle)%360;
			if(p.angle>=0) {
				var rotation=Math.PI*p.angle/180
			}else {
				var rotation=Math.PI*(360+p.angle)/180
			}var costheta=Math.cos(rotation);
			var sintheta=Math.sin(rotation);
			if(document.all&&!window.opera) {
				var canvas=document.createElement("img");
				canvas.src=p.src;
				canvas.height=p.height;
				canvas.width=p.width;
				if(!this._img[imgID]._initWidth) {
					this._img[imgID]._initWidth=canvas.width;
					this._img[imgID]._initHeight=canvas.height
				}if(canvas.height>maxWidth+8) {
					canvas._w1=canvas.width;
					canvas._h1=canvas.height;
					canvas.height=maxWidth-4;
					canvas.width=(canvas._w1*canvas.height)/canvas._h1
				}canvas.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
				var me=this;
				setTimeout(function () {
					var left=me._img[imgID]._left,right=me._img[imgID]._right;
					if(right%2==0||left%2==0||Math.abs(right-left)%2==0) {
						canvas.width=me._img[imgID]._initWidth-4;
						canvas.height=me._img[imgID]._initHeight-4
					}if((left===1&&!right)||(!left&&right===1)) {
						me._img[imgID]._width=canvas.width;
						me._img[imgID]._height=canvas.height
					}if(right>0&&left>0&&Math.abs(right-left)%2!=0) {
						canvas.width=me._img[imgID]._width-4;
						canvas.height=me._img[imgID]._height-4
					}
				},0)
			}else {
				var canvas=document.createElement("canvas");
				if(!p.oImage) {
					canvas.oImage=p
				}else {
					canvas.oImage=p.oImage
				}canvas.style.width=canvas.width=Math.abs(costheta*canvas.oImage.width)+Math.abs(sintheta*canvas.oImage.height);
				canvas.style.height=canvas.height=Math.abs(costheta*canvas.oImage.height)+Math.abs(sintheta*canvas.oImage.width);
				if(canvas.width>maxWidth) {
					canvas.style.width=maxWidth+"px"
				}var context=canvas.getContext("2d");
				context.save();
				if(rotation<=Math.PI/2) {
					context.translate(sintheta*canvas.oImage.height,0)
				}else {
					if(rotation<=Math.PI) {
						context.translate(canvas.width,-costheta*canvas.oImage.height)
					}else {
						if(rotation<=1.5*Math.PI) {
							context.translate(-costheta*canvas.oImage.width,canvas.height)
						}else {
							context.translate(0,-sintheta*canvas.oImage.width)
						}
					}
				}context.rotate(rotation);
				try{
					context.drawImage(canvas.oImage,0,0,canvas.oImage.width,canvas.oImage.height)
				}catch(e) {
				}context.restore()
			}canvas.id=p.id;
			canvas.angle=p.angle;
			p.parentNode.replaceChild(canvas,p);
			if(callback&&typeofcallback==="function") {
				callback(canvas)
			}
		}
	};
	App.scaleImg=function (dom,pid,bForward) {
		var baseURI="http://simg.sinajs.cn/"+scope.$PRODUCT_NAME+"style/images/";
		if(dom._imgLoaded&&dom._bigImgContainer) {
			dom.parentNode.style.display="none";
			dom._bigImgContainer.style.display="";
			var feeds=Core.Dom.getElementsByClass(dom.parentNode.parentNode,"div","feed_img");
			if(feeds.length>1) {
				feeds[0].style.display="none"
			}if(bForward) {
				dom.parentNode.nextSibling.style.display=""
			}return
		}else {
			var smallImg=dom.firstChild;
			dom._initW=smallImg.width;
			dom._initH=smallImg.height;
			App.getImgSize(App.imgURL(pid,"bmiddle"),getImgSize)
		}var defaultWidth=440;
		if(bForward&&Core.Base.detect.$IE6) {
			defaultWidth-=8
		}if(!dom.loading) {
			var loading=dom.loading=$C("img");
			loading.src=baseURI+"toolbar/loading.gif";
			Core.Dom.insertAfter(loading,dom);
			with(loading.style) {
				position="absolute";
				backgroundColor="transparent";
				border="0px";
				top=dom._initH/2-10+"px";
				left=dom._initW/2-10+"px";
				width="16px";
				height="16px";
				zIndex=1001
			}if(Core.Dom.getElementsByClass(dom.parentNode,"div","videoPlay").length>0) {
				var videoIMG=dom.parentNode.getElementsByTagName("img")[0];
				if(videoIMG) {
					with(loading.style) {
						position="absolute";
						backgroundColor="transparent";
						border="0px";
						top=dom._initH/2+10+"px";
						left=videoIMG.width+dom._initW/2+10+"px";
						width="16px";
						height="16px";
						zIndex=1001
					}
				}
			}
		}else {
			dom.loading.style.display="block"
		}function getImgSize(size) {
			var newImgSize={
			};
			if(size[0]>defaultWidth) {
				newImgSize.width=defaultWidth;
				newImgSize.height=Math.round(size[1]*(defaultWidth/size[0]))
			}else {
				newImgSize.width=size[0];
				newImgSize.height=size[1]
			}slideShowImg(newImgSize)
		}function slideShowImg(newImgSize) {
			var preView=$C("div");
			preView.className="blogPicOri";
			var imgId="loaded"+(new Date().getTime());
			var rotateLeft="left"+(new Date().getTime())+Math.round(Math.random(100)*100000);
			var rotateRight="right"+(new Date().getTime())+Math.round(Math.random(100)*100000);
			var iconURI=baseURI+"/common/transparent.gif";
			preView_innerHTML='		    <p>		        <cite>		            <a href="javascript:;" onclick="App.shrinkImg(this, \'tag\','+(bForward?1:0)+');">		            	<img title="收起" class="small_icon cls" src="'+iconURI+'">收起</a>		            <cite class="MIB_line_l">|</cite>		        </cite>		        <cite>		            <a href="'+App.imgURL(pid,"orignal")+'" target="_blank">		            	<img  title="查看原图" class="small_icon original" src="'+iconURI+'">查看原图</a>		        </cite>		        <cite class="MIB_line_l">|</cite>		        <cite>		            <a id="'+rotateLeft+'" href="javascript:;"><img  title="向左转" class="small_icon turn_l" 		            	src="'+iconURI+'">向左转</a>		        </cite>		        <cite>		            <a id="'+rotateRight+'" href="javascript:;" class="last_turn_r">		            	<img title="向右转" class="small_icon turn_r" src="'+iconURI+'">向右转</a>		        </cite>		    </p>		    <img id="'+imgId+'" class="imgSmall" 		    	src="'+App.imgURL(pid,"bmiddle")+'" 		    	width="'+newImgSize.width+'" height="'+newImgSize.height+'" >		';
			if(bForward) {
				preView.innerHTML=preView_innerHTML
			}else {
				preView.innerHTML='<div class="MIB_assign_t"></div><div class="MIB_assign_c MIB_txtbl"><div class="blogPicOri">'+preView_innerHTML+'</div></div><div class="MIB_assign_b"></div>';
				preView.className="MIB_assign"
			}if(!dom._bigImgContainer) {
				if(bForward) {
					var lineDot=$C("div");
					lineDot.className="MIB_linedot_l1";
					Core.Dom.insertAfter(lineDot,dom.parentNode);
					Core.Dom.insertAfter(preView,lineDot)
				}else {
					Core.Dom.insertAfter(preView,dom.parentNode)
				}preView.parentNode.style.cssText="text-align:center;width:100%;";
				dom._bigImgContainer=preView;
				if(bForward) {
					preView.setAttribute("bForward","true")
				}dom._imgLoaded=true;
				dom.loading.style.display="none";
				dom.parentNode.style.display="none";
				var feeds=Core.Dom.getElementsByClass(dom.parentNode.parentNode,"div","feed_img");
				if(feeds.length>1) {
					feeds[0].style.display="none"
				}
			}Core.Events.addEvent($E(imgId),function () {
				App.shrinkImg($E(imgId),"img",bForward)
			},"click");
			Core.Events.addEvent($E(rotateLeft),function () {
				App.rotate.rotateLeft(imgId,90,rotateCallback,defaultWidth)
			},"click");
			Core.Events.addEvent($E(rotateRight),function () {
				App.rotate.rotateRight(imgId,90,rotateCallback,defaultWidth)
			},"click");
			function rotateCallback(canvas) {
				canvas.className="imgSmall";
				Core.Events.addEvent(canvas,function () {
					App.shrinkImg(canvas,"img",bForward)
				},"click");
				preView.parentNode.style.cssText="text-align:center;width:100%;"
			}
		}
	};
	App.shrinkImg=function (domBig,type,bForward) {
		if(typeofbForward==="undefined") {
			if(domBig.parentNode.getAttribute("bForward")==="true") {
				bForward=true
			}else {
				var node=domBig.parentNode;
				while(node.tagName.toUpperCase()!="LI") {
					node=node.parentNode;
					if(node.tagName.toUpperCase()=="LI") {
						bForward=(node.getAttribute("type")==="2"?true:false);
						break
					}
				}
			}
		}var preView;
		if(bForward) {
			if(type=="tag") {
				preView=domBig.parentNode.parentNode.parentNode
			}else {
				preView=domBig.parentNode
			}
		}else {
			if(type=="tag") {
				preView=domBig.parentNode.parentNode.parentNode.parentNode.parentNode
			}else {
				preView=domBig.parentNode.parentNode.parentNode
			}
		}var feeds=Core.Dom.getElementsByClass(preView.parentNode.parentNode,"div","feed_img");
		if(feeds.length>1) {
			feeds[0].style.display=""
		}preView.parentNode.style.cssText="text-align:center;";
		var imgs=preView.parentNode.getElementsByTagName("img"),smallImg;
		for(var i=0,len=imgs.length;i<len;i++) {
			if(imgs[i].className&&imgs[i].className.indexOf("imgicon")!==-1) {
				smallImg=imgs[i];
				break
			}
		}smallImg.style.display="";
		smallImg.parentNode.parentNode.style.display="";
		preView.style.display="none";
		if(preView.getAttribute("bForward")==="true") {
			preView.previousSibling.style.display="none"
		}
	};
	App.closeIntroduction=function (n,d) {
		if(n==101) {
			Utils.Cookie.setCookie("mnick","1",24,false,"t.sina.com.cn",false);
			return false
		}if(n==103) {
			Utils.Cookie.setCookie("message","1",24*7,false,"t.sina.com.cn",false);
			return false
		}var num=parseInt(n);
		if(n>10) {
			var oldNum=parseInt(Utils.Cookie.getCookie("weekguide"))||0;
			var kList=[1,2,4,8,16];
			var newNum=(kList[n-11])|oldNum;
			Utils.Cookie.setCookie("weekguide",newNum,((24-(new Date()).getHours())-((new Date()).getMinutes())/60+24*(7-(new Date()).getDay())),false,"t.sina.com.cn",false)
		}else {
			var oldNum=parseInt(Utils.Cookie.getCookie("guide"))||0;
			var kList=[16,8,4,2,1];
			var newNum=(kList[n-1])|oldNum;
			Utils.Cookie.setCookie("guide",newNum,((24-(new Date()).getHours())-((new Date()).getMinutes())/60),false,"t.sina.com.cn",false)
		}
	};
	(function () {
		var _ua=navigator.userAgent.toLowerCase();
		var $IE=/msie/.test(_ua);
		var $moz=/gecko/.test(_ua);
		var $Safari=/safari/.test(_ua);
		function $E(id) {
			return typeof(id)=="string"?_viewWindow.document.getElementById(id):id
		}var getScrollPos=function (oDocument) {
			oDocument=oDocument||document;
			return [Math.max(oDocument.documentElement.scrollTop,oDocument.body.scrollTop),Math.max(oDocument.documentElement.scrollLeft,oDocument.body.scrollLeft),Math.max(oDocument.documentElement.scrollWidth,oDocument.body.scrollWidth),Math.max(oDocument.documentElement.scrollHeight,oDocument.body.scrollHeight)]
		};
		var getStyle=function (el,property) {
			switch(property) {
				case "opacity":var val=100;
				try{
					val=el.filters["DXImageTransform.Microsoft.Alpha"].opacity
				}catch(e) {
					try{
						val=el.filters("alpha").opacity
					}catch(e) {
					}
				}return val;
				case "float":property="styleFloat";
				default:var value=el.currentStyle?el.currentStyle[property]:null;
				return (el.style[property]||value)
			}
		};
		if($moz) {
			getStyle=function (el,property) {
				if(property=="float") {
					property="cssFloat"
				}try{
					var computed=document.defaultView.getComputedStyle(el,"")
				}catch(e) {
					traceError(e)
				}return el.style[property]||computed?computed[property]:null
			}
		}var getXY=function (el) {
			if((el.parentNode==null||el.offsetParent==null||getStyle(el,"display")=="none")&&el!=document.body) {
				return false
			}var parentNode=null;
			var pos=[];
			var box;
			var doc=el.ownerDocument;
			box=el.getBoundingClientRect();
			var scrollPos=getScrollPos(el.ownerDocument);
			return [box.left+scrollPos[1],box.top+scrollPos[0]];
			parentNode=el.parentNode;
			while(parentNode.tagName&&!/^body|html$/i.test(parentNode.tagName)) {
				if(getStyle(parentNode,"display").search(/^inline|table-row.*$/i)) {
					pos[0]-=parentNode.scrollLeft;
					pos[1]-=parentNode.scrollTop
				}parentNode=parentNode.parentNode
			}return pos
		};
		if($moz) {
			getXY=function (el) {
				if((el.parentNode==null||el.offsetParent==null||getStyle(el,"display")=="none")&&el!=document.body) {
					return false
				}var parentNode=null;
				var pos=[];
				var box;
				var doc=el.ownerDocument;
				pos=[el.offsetLeft,el.offsetTop];
				parentNode=el.offsetParent;
				var hasAbs=getStyle(el,"position")=="absolute";
				if(parentNode!=el) {
					while(parentNode) {
						pos[0]+=parentNode.offsetLeft;
						pos[1]+=parentNode.offsetTop;
						if($Safari&&!hasAbs&&getStyle(parentNode,"position")=="absolute") {
							hasAbs=true
						}parentNode=parentNode.offsetParent
					}
				}if($Safari&&hasAbs) {
					pos[0]-=el.ownerDocument.body.offsetLeft;
					pos[1]-=el.ownerDocument.body.offsetTop
				}parentNode=el.parentNode;
				while(parentNode.tagName&&!/^body|html$/i.test(parentNode.tagName)) {
					if(getStyle(parentNode,"display").search(/^inline|table-row.*$/i)) {
						pos[0]-=parentNode.scrollLeft;
						pos[1]-=parentNode.scrollTop
					}parentNode=parentNode.parentNode
				}return pos
			}
		}var getEvent=function () {
			return window.event
		};
		if($moz) {
			getEvent=function () {
				var o=arguments.callee.caller;
				var e;
				var n=0;
				while(o!=null&&n<40) {
					e=o.arguments[0];
					if(e&&(e.constructor ==Event||e.constructor ==MouseEvent)) {
						return e
					}n++;
					o=o.caller
				}return e
			}
		}var stopEvent=function () {
			var ev=getEvent();
			ev.cancelBubble=true;
			ev.returnValue=false
		};
		if($moz) {
			stopEvent=function () {
				var ev=getEvent();
				ev.preventDefault();
				ev.stopPropagation()
			}
		}Function.prototype.bind3=function (object,args) {
			args=args==null?[]:args;
			var __method=this;
			return function () {
				__method.apply(object,args)
			}
		};
		function addEvent2(elm,func,evType,useCapture) {
			var elm=$E(elm);
			if(typeofuseCapture=="undefined") {
				useCapture=false
			}if(typeofevType=="undefined") {
				evType="click"
			}if(elm.addEventListener) {
				elm.addEventListener(evType,func,useCapture);
				return true
			}else {
				if(elm.attachEvent) {
					var r=elm.attachEvent("on"+evType,func);
					return true
				}else {
					elm["on"+evType]=func
				}
			}
		}var _inputNode;
		var _rndID=parseInt(Math.random()*100);
		var _showMenuItems=[];
		var _selectMenuIndex=-1;
		var _selectMenuText="";
		var _viewWindow=window;
		var passcardOBJ={
			overfcolor:"#999",overbgcolor:"#e8f4fc",outfcolor:"#000000",outbgcolor:"",menuStatus:{
				"sina.com":true,"vip.sina.com":true,"163.com":true,"qq.com":true,"126.com":true,"hotmail.com":true,"gmail.com":true,"sohu.com":true
			}
		};
		passcardOBJ.createNode=function () {
			var d=_viewWindow.document;
			var div=d.createElement("div");
			div.innerHTML='<ul class="passCard" id="sinaNote" style="display:none;"></ul>';
			d.body.appendChild(div)
		};
		passcardOBJ.arrowKey=function (keyCodeNum) {
			if(keyCodeNum==38) {
				if(_selectMenuIndex<=0) {
					_selectMenuIndex=_showMenuItems.length
				}_selectMenuIndex--;
				passcardOBJ.selectLi(_selectMenuIndex)
			}if(keyCodeNum==40) {
				if(_selectMenuIndex>=_showMenuItems.length-1) {
					_selectMenuIndex=-1
				}_selectMenuIndex++;
				passcardOBJ.selectLi(_selectMenuIndex)
			}
		};
		passcardOBJ.showList=function (e) {
			_selectMenuText="";
			var keyCodeNum=getEvent().keyCode;
			if(keyCodeNum==38||keyCodeNum==40) {
				passcardOBJ.arrowKey(keyCodeNum);
				return false
			}if(!$E("sinaNote")) {
				passcardOBJ.createNode()
			}var username=$E(e).value;
			var menuList={
			};
			var atIndex=username.indexOf("@");
			var InputCase="";
			var InputStr="";
			if(atIndex>-1) {
				InputCase=username.substr(atIndex+1);
				InputStr=username.substr(0,atIndex)
			}_showMenuItems=[];
			_selectMenuIndex=0;
			_showMenuItems[_showMenuItems.length]="sinaNote_MenuItem_Title_"+_rndID;
			for(var key in this.menuStatus) {
				this.menuStatus[key]=true;
				if(InputCase!=""&&InputCase!=key.substr(0,InputCase.length)) {
					this.menuStatus[key]=false
				}else {
					_showMenuItems[_showMenuItems.length]="sinaNote_MenuItem_"+key+"_"+_rndID
				}
			}var listcontent='<li class="note">请选择登录类型</li>';
			listcontent+='<li id="sinaNote_MenuItem_Title_'+_rndID+'">'+username+"</li>";
			var itemLabel;
			for(var key in this.menuStatus) {
				if(this.menuStatus[key]==true) {
					if(InputStr=="") {
						itemLabel=username+"@"+key
					}else {
						itemLabel=InputStr+"@"+key
					}listcontent+='<li id="sinaNote_MenuItem_'+key+"_"+_rndID+'" title="'+itemLabel+'">'+itemLabel+"</li>"
				}
			}$E("sinaNote").innerHTML=listcontent;
			for(var i=0;i<username.length;i++) {
				if(username.charCodeAt(i)<160) {
					$E("sinaNote").style.display="";
					this.selectList(e)
				}else {
					this.hideList()
				}
			}var el=$E(e);
			var note=$E("sinaNote");
			var frameLeft=0;
			var frameTop=0;
			var framePos;
			if(_viewWindow!=window) {
				framePos=getXY(window.frameElement);
				frameLeft=framePos[0];
				frameTop=framePos[1]
			}var inputWidth=el.offsetWidth;
			if(inputWidth<200) {
				inputWidth=200
			}note.style.width=inputWidth-2+"px";
			var inputXY=getXY(el);
			note.style.left=(inputXY[0]-($IE?2:-1)+frameLeft)+"px";
			note.style.top=(inputXY[1]+el.offsetHeight-($IE?2:-1)+frameTop)+"px"
		};
		passcardOBJ.selectList=function (e) {
			var unames=$E("sinaNote").getElementsByTagName("li");
			for(var i=1;i<unames.length;i++) {
				unames[1].style.backgroundColor=passcardOBJ.overbgcolor;
				unames[1].style.color=passcardOBJ.outfcolor;
				unames[i].onmousedown=function () {
					var temp=this.innerHTML;
					if(temp.indexOf("非新浪邮箱")>-1) {
						var pos=temp.split("@");
						$E(e).value=pos[0]
					}else {
						$E(e).value=this.innerHTML
					}stopEvent()
				};
				unames[i].onmouseover=function () {
					if(i!=1) {
						unames[1].style.backgroundColor=passcardOBJ.outbgcolor;
						unames[1].style.color=passcardOBJ.overfcolor
					}this.style.backgroundColor=passcardOBJ.overbgcolor;
					this.style.color=passcardOBJ.outfcolor
				};
				unames[i].onmouseout=function () {
					this.style.backgroundColor=passcardOBJ.outbgcolor;
					this.style.color=passcardOBJ.overfcolor;
					unames[1].style.backgroundColor=passcardOBJ.overbgcolor;
					unames[1].style.color=passcardOBJ.outfcolor
				}
			}
		};
		passcardOBJ.selectLi=function (nIndex) {
			var menuNode;
			if($E("sinaNote_MenuItem_Title_"+_rndID)) {
				$E("sinaNote_MenuItem_Title_"+_rndID).style.backgroundColor=passcardOBJ.outbgcolor;
				$E("sinaNote_MenuItem_Title_"+_rndID).style.color=passcardOBJ.overfcolor;
				for(var i=0;i<_showMenuItems.length;i++) {
					menuNode=$E(_showMenuItems[i]);
					menuNode.style.backgroundColor=passcardOBJ.outbgcolor;
					menuNode.style.color=passcardOBJ.overfcolor
				}$E(_showMenuItems[nIndex]).style.backgroundColor=passcardOBJ.overbgcolor;
				$E(_showMenuItems[nIndex]).style.color=passcardOBJ.outfcolor;
				_selectMenuText=$E(_showMenuItems[nIndex]).innerHTML
			}
		};
		passcardOBJ.hideList=function () {
			if(!$E("sinaNote")) {
				passcardOBJ.createNode()
			}$E("sinaNote").style.display="none"
		};
		passcardOBJ.init=function (oNode,oColors,oFocusNode,oWindowTarget) {
			for(var key in oColors) {
				this[key]=oColors[key]
			}addEvent2(document,passcardOBJ.hideList,"click");
			addEvent2(oNode,passcardOBJ.hideList,"blur");
			addEvent2(oNode,passcardOBJ.showList.bind3(this,[oNode]),"keyup");
			addEvent2(oNode,function (e) {
				var keyCodeNum=getEvent().keyCode;
				if(keyCodeNum==13||keyCodeNum==9) {
					if(_selectMenuText!="") {
						var temp=_selectMenuText;
						if(temp.indexOf("非新浪邮箱")>-1) {
							var pos=temp.split("@");
							oNode.value=pos[0]
						}else {
							oNode.value=_selectMenuText
						}
					}if(oFocusNode!=null) {
						oFocusNode.focus()
					}stopEvent()
				}
			},"keydown");
			if(oWindowTarget) {
				_viewWindow=oWindowTarget
			}
		};
		window.passcardOBJ=passcardOBJ
	})();
	App.rollOut=function (dom,callback) {
		if(dom.style["display"]=="") {
			return
		}dom.style["display"]="";
		var _height=dom.offsetHeight;
		var interval;
		var _start=0;
		dom.style["height"]=_start+"px";
		dom.style["overflow"]="hidden";
		var interval=setInterval(function () {
			_start+=4;
			dom.style["height"]=_start+"px";
			if(_start>_height) {
				clearInterval(interval);
				dom.style["height"]=_height;
				dom.style["overflow"]="";
				if(callback) {
					callback()
				}
			}
		},5)
	};
	scope.seting=function () {
		var sp;
		if(sp=$E("top_tray_seting_panel")) {
			var sps=sp.style;
			sps["display"]=(sps["display"]=="none")?"block":"none";
			Core.Events.stopEvent();
			if(!sp.bind2body) {
				Core.Events.addEvent(document.body,function () {
					var sp;
					if(sp=$E("top_tray_seting_panel")) {
						sp.style["display"]="none"
					}
				},"click");
				sp.bind2body=true
			}
		}
	};
	scope.setSkin=function (value) {
		var st;
		if(st=$E("skin_transformers")) {
			var url=st.href+"";
			var path=url.substring(0,url.lastIndexOf("n/")+2);
			st.href=path+value+"/skin.css";
			scope.postSkinId=value;
			var selectedLi=Core.Dom.getElementsByClass($E("skin_ul"),"li","selected")[0];
			if(selectedLi!=null) {
				selectedLi.className=""
			}var selectLi=$E("li_"+value);
			if(selectLi) {
				selectLi.className="selected"
			}
		}
	};
	scope.postSkin=function () {
		if(scope.postSkinId) {
			Utils.Io.Ajax.request("/person/skin_post.php",{
				"onComplete":function (oResult) {
					App.promptTip(oResult,null,"system_information",(oResult.code=="A00006")?"ok":"wrong");
					setTimeout(function () {
						window.location.href="/"+scope.$uid
					},1000)
				},"onException":function (e) {
				},"returnType":"json","POST":{
					skin:scope.postSkinId
				}
			})
		}
	};
	scope.msgClose=function () {
		var mp;
		if(mp=$E("top_tray_msg_panel")) {
			mp.style["display"]="none";
			Utils.Io.Ajax.request("/public/del_unread.php",{
				"onComplete":function (oResult) {
					if(oResult.code!="A00006") {
						App.alert(App.getMsg(oResult.code))
					}
				},"onException":function (e) {
				},"returnType":"json","POST":{
				}
			})
		}
	};
	App.addfavorite=function (url,text) {
		if(document.all) {
			window.external.addFavorite(url,text)
		}else {
			if(window.sidebar) {
				window.sidebar.addPanel(text,url,"")
			}
		}return false
	};
	(function () {
		var _titleInterval;
		var _flag=true;
		var _tenMinute=false;
		var _oldTitle=document.title+"";
		var _requestTimes=0;
		Core.Events.addEvent(window,function () {
			setInterval(function () {
				_tenMinute=true
			},600000);
			var _yelloTip=$E("toptray_yellow_tip");
			if(!_yelloTip) {
				return
			}function shakeTitle(_res) {
				var _shakeBefore=0;
				var _titleContent=[];
				function shakeTitleRound() {
					if(_flag) {
						document.title=_oldTitle;
						return
					}if(document.title!="◆　　　　◆") {
						document.title="◆　　　　◆";
						return
					}if(_shakeBefore==_titleContent.length) {
						_shakeBefore=0
					}document.title=_titleContent[_shakeBefore];
					_shakeBefore++
				}function stopShake() {
					clearInterval(_titleInterval);
					document.title=_oldTitle
				}if(_res.comment>0) {
					_titleContent.push("◆有新评论◆")
				}if(_res.attention.num>0) {
					_titleContent.push("◆有新粉丝◆")
				}if(_res.msg>0) {
					_titleContent.push("◆有新私信◆")
				}if(_res.atme>0) {
					_titleContent.push("◆有新@我◆")
				}if(_titleContent.length>0) {
					setTimeout(stopShake,10100);
					clearInterval(_titleInterval);
					_titleInterval=setInterval(shakeTitleRound,500)
				}else {
					stopShake()
				}
			}function setTips(result) {
				_requestTimes++;
				var _str=[];
				if(result.data.comment>0) {
					_str.push('<div class="l_1">'+result.data.comment+'条新评论，<a href="/comments">查看评论</a></div>')
				}if(result.data.attention.num>0) {
					_str.push('<div class="l_1">'+result.data.attention.num+'位新粉丝，<a href="http://t.sina.com.cn/'+scope.$uid+'/fans">查看我的粉丝</a></div>')
				}if(result.data.msg>0) {
					_str.push('<div class="l_1">'+result.data.msg+'条新私信，<a href="/messages">查看私信</a></div>')
				}if(result.data.atme>0) {
					if(_requestTimes==1) {
						_tenMinute=true;
						_str.push('<div class="l_1">'+result.data.atme+'条微博提到我，<a href="/atme">查看@我</a></div>')
					}else {
						if(_tenMinute) {
							_str.push('<div class="l_1">'+result.data.atme+'条微博提到我，<a href="/atme">查看@我</a></div>')
						}
					}
				}var feedPanel;
				if(feedPanel=$E("feed_msg_new")) {
					if(result.data.feed>0) {
						feedPanel.innerHTML="有新微博，刷新看看";
						feedPanel.onclick=function () {
							if(scope.$uid) {
								window.location.href="/"+scope.$uid
							}return false
						};
						App.rollOut(feedPanel)
					}else {
						feedPanel.style["display"]="none"
					}
				}if(_str.length>0) {
					_yelloTip.innerHTML=_str.join(" ");
					$E("top_tray_msg_panel").style["display"]=""
				}else {
					$E("top_tray_msg_panel").style["display"]="none"
				}
			}Utils.Io.Ajax.request("/public/aj_count.php",{
				"onComplete":setTips,"onException":function (e) {
				},"returnType":"json","GET":{
					"uid":scope.$uid,"firstmid":scope.$firstid
				}
			});
			setTimeout(arguments.callee,scope.$devMode==0?30000:30000);
			window.onfocus=function () {
				_flag=true
			};
			window.onblur=function () {
				_flag=false
			}
		},"load")
	})();
	App.reportOpenWin=function (url) {
		if(!scope.$uid) {
			var initErrorTip="请先登录，再进行举报";
			App.ModLogin({
				"func":function () {
					window.open(url,"举报不良信息","height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
				},"initErrorTip":initErrorTip
			});
			return
		}window.open(url,"举报不良信息","height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
	};
	App.hotSearch=function (input,subbtn,form,maxlen,txt,cindex) {
		var maxlen=maxlen||30;
		var textnode=$E(input);
		var subbtn=$E(subbtn);
		Utils.Sinput.limitMaxLen(textnode,maxlen);
		function formget(event) {
			var value=Core.String.trim(textnode.value);
			value=Core.String.leftB(value,maxlen);
			if(value&&value!=txt) {
				location.href="/k/"+encodeURIComponent(encodeURIComponent(value))
			}else {
				textnode.focus()
			}Core.Events.stopEvent(event)
		}Core.Events.addEvent(subbtn,formget,"click");
		Core.Events.addEvent(textnode,function (e) {
			if(e.keyCode==13) {
				formget()
			}
		},"keyup")
	};
	$registJob("hotsearch",function () {
		try{
			App.hotSearch("hot_keyword","hot_submit","hot_search",null,"搜索其他话题...")
		}catch(exp) {
		}
	});
	$registJob("hotsearchtop",function () {
		try{
			App.hotSearch("hot_keyword_top","hot_submit_top","hot_search_top",null,"搜索其他话题...")
		}catch(exp) {
		}
	});
	$registJob("bind_mobile_info",function () {
		var panel=$E("bind_mobile_info");
		if(panel) {
			Utils.Io.Ajax.request("/mobile/aj_showbind.php",{
				"GET":{
					"ouid":scope.$oid
				},"onComplete":function (oResult) {
					if(oResult.code=="A00006") {
						panel.innerHTML=oResult.data
					}
				},returnType:"json"
			})
		}
	});
	App.miniblogDel=function (id,single,el) {
		single=(scope.$pageid=="mblog")?true:false;
		var requestURL;
		var sText;
		if(scope.$feedtype=="isat") {
			requestURL="/myat/delete.php";
			sText="确定删除这条@我吗"
		}else {
			requestURL="/mblog/delete.php";
			sText="确定删除这条微博吗"
		}var cb=function () {
			setTimeout(function () {
				location.reload()
			},10)
		};
		single&&(cb=function () {
			setTimeout(function () {
				location.href="/mymblog.php"
			},10)
		});
		var oData={
			mid:id
		};
		var ecb=function (json) {
			App.flyDialog(json,null,el)
		};
		App.flyDialog(sText,"confirm",el,{
			ok:function () {
				App.doRequest(oData,requestURL,cb,ecb,"get")
			}
		})
	};
	App.attention=function (uid,el) {
		App.rightSideFollow(uid,el,function () {
			location.reload()
		});
		return false
	};
	App.attentionAll=function (uids,btn) {
		url="/attention/aj_addfollow.php";
		uids=scope.recommendId||uids;
		function cb() {
			for(var i=0,len=uids.length,uid;uid=uids[i];i++) {
				var el=$E("recomm_"+uid);
				if(el) {
					var a=el.getElementsByTagName("a")[0];
					if(a) {
						var newDom=document.createElement("SPAN");
						newDom.innerHTML="已关注";
						el.replaceChild(newDom,a)
					}
				}
			}$E("attAllBtn").style.visibility="hidden";
			location.reload()
		}App.followOperation({
			uid:uids.join(","),fromuid:scope.$uid
		},url,cb);
		return false
	};
	$registJob("recommuser",function () {
		var uids=scope.recommendId;
		if(uids) {
			var url="attention/aj_checkattention.php";
			var param={
				uid:uids.join(",")
			};
			var cb=function (data,josn) {
				var data=josn.uid;
				for(var i=0,len=data.length;i<len;i++) {
					var el=$E("recomm_"+data[i]);
					if(el) {
						var a=el.getElementsByTagName("a")[0];
						if(a) {
							var newDom=document.createElement("SPAN");
							newDom.innerHTML="已关注";
							el.replaceChild(newDom,a)
						}
					}
				}
			};
			App.doRequest(param,url,cb)
		}
	});
	App.focusEditor=function () {
		location.hash="fbq";
		$E("publish_editor").focus();
		return false
	};
	Core.Dom.getLeft=function (element) {
		var left=0;
		var el=$E(element);
		if(el.offsetParent) {
			while(el.offsetParent) {
				left+=el.offsetLeft;
				el=el.offsetParent
			}
		}else {
			if(el.x) {
				left+=el.x
			}
		}return left
	};
	(function (proxy) {
		proxy.hover=function (el,hoverFun,outerFun) {
			var cls=el.className;
			var css=el.style.cssText;
			Core.Events.addEvent(el,function () {
				hoverFun(el)
			},"mouseover");
			if(!outerFun||typeofouterFun!="function") {
				Core.Events.addEvent(el,function () {
					el.className=cls;
					el.style.cssText=css
				},"mouseout")
			}else {
				Core.Events.addEvent(el,function () {
					outerFun(el)
				},"mouseout")
			}
		}
	})(App);
	Core.String.toInt=function (str,i) {
		return parseInt(str,i)
	};
	Core.Dom.next=function (elm,_className) {
		var o=$E(elm);
		var next=o.nextSibling;
		if(!next) {
			return null
		}else {
			if(next.nodeType!=1) {
				return Core.Dom.next(next,_className)
			}else {
				if(next.nodeType==8) {
					next.parentNode.removeChild(next);
					return Core.Dom.next(o,_className)
				}
			}
		}if(next.className.indexOf(_className)!=-1) {
			return next
		}else {
			return Core.Dom.next(next,_className)
		}
	};
	App.addfavorite_miniblog=function (s_mid) {
		if(s_mid==""||s_mid==null) {
			return false
		}if(!scope.$uid) {
			App.ModLogin({
				func:function () {
					App.addfavorite_miniblog(s_mid)
				}
			});
			return
		}if(scope.$cuser_status==="nofull") {
			App.finishInformation();
			return false
		}Utils.Io.Ajax.request("/favorite/aj_add.php",{
			"POST":{
				"mid":s_mid
			},"onComplete":function (json) {
				var _alert;
				if(json) {
					if(json.code=="A00006") {
						_alert=App.alert("收藏成功！",{
							icon:3
						})
					}else {
						_alert=App.alert(App.getMsg(json.code))
					}
				}else {
					_alert=App.alert("收藏微博失败，请重试！",{
						icon:2
					})
				}setTimeout(function () {
					_alert.close()
				},2000)
			},"onException":function (json) {
				if(json) {
					App.alert(App.getMsg(json.code),{
						icon:2
					})
				}else {
					App.alert("收藏微博失败，请重试！")
				}
			},returnType:"json"
		})
	};
	App.deletefavorite_miniblog=function (s_mid) {
		if(s_mid==""||s_mid==null) {
			return false
		}if(!scope.$uid) {
			App.ModLogin({
				func:function () {
					App.deletefavorite_miniblog(s_mid)
				}
			})
		}var getTarget=function () {
			var oEvent=Core.Events.getEvent();
			var oTarget=oEvent.srcElement||oEvent.target;
			while(oTarget.nodeType!=1) {
				oTarget=oTarget.parentNode
			}return oTarget
		};
		var element_li=getTarget();
		while(element_li.tagName.toLowerCase()!="li") {
			element_li=element_li.parentNode
		}App.confirm("确定要删除该收藏？",{
			ok:function () {
				deletefav(element_li)
			},cancel:function () {
			}
		});
		var deletefav=function (el) {
			var o_displaynone,o_dotline;
			var o_emcount=$E("feed_title").getElementsByTagName("em").length>0?$E("feed_title").getElementsByTagName("em")[0]:null;
			var s_url="/favorite/aj_delete.php";
			Utils.Io.Ajax.request(s_url,{
				"POST":{
					"mid":s_mid
				},"onComplete":function (json) {
					if(json) {
						if(json.code=="A00006") {
							Core.Dom.removeNode(el);
							o_emcount.innerHTML=(Core.String.toInt(o_emcount.innerHTML)-1).toString ();
							if($E("feed_list").getElementsByTagName("li").length==0) {
								window.location.reload(true)
							}
						}else {
							App.alert(App.getMsg(json.code))
						}
					}else {
						App.alert("操作失败！")
					}
				},"onException":function (json) {
					if(json) {
						App.alert(App.getMsg(json.code))
					}else {
						App.alert("操作失败！")
					}
				},returnType:"json"
			})
		}
	};
	App.modrecommended=function (forwardName,recommendedurl,fid,content,uid,el,exid,forwardContent,uname) {
		if(!scope.$uid) {
			location.replace("/login.php?url="+encodeURIComponent(location.href));
			return false
		}if(scope.$cuser_status==="nofull"&&scope.$uid!=="") {
			App.finishInformation();
			return false
		}var appendurl;
		if(recommendedurl) {
			appendurl=recommendedurl
		}else {
			appendurl=window.location.href
		}var checkAT=function (content,name) {
			if((new RegExp("(@|＠)"+name+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
				return true
			}else {
				return false
			}
		};
		var forwardContentFinal="";
		var testForwardName=decodeURIComponent(forwardName);
		var testForwardContent=decodeURIComponent(forwardContent);
		var defaultTxt="快来看看  @"+testForwardName+"  的微博";
		if(forwardContent==""||forwardContent===undefined) {
			forwardContentFinal=defaultTxt
		}else {
			forwardContentFinal=" //@"+testForwardName+":"+testForwardContent
		}var title="把"+testForwardName+"推荐给朋友";
		var loginStr='<div class="shareLogin">                    	<div id="loginerror"></div>						<em>登录名 </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle" class="inputType"  style="width: 100px;"/></span></span>                        <em>密码 </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clear"></div>                    </div>';
		loginStr=scope.$uid?"":loginStr;
		var html='			   <div class="shareLayer" id="recommendedcontent">                    <div class="shareTxt" id="recommendedcontent">说说推荐理由吧:</div>					<div id="recommendedInfoBox" style="float:right;margin-right:13px;color:#008800"></div>                    <textarea class="PY_textarea" id="mdrecommendedtextarea" >'+forwardContentFinal+"</textarea>"+loginStr+'<div class="layerBtn">                 		<a href="javascript:void(0);" id="mdrecommendedbtn" class="btn_normal"><em>发布</em></a><a href="javascript:void(0)" id="mdrecommendedcancel" class="btn_normal"><em>取消</em></a>                 </div>                </div>';
		var cfg={
			width:390,zIndex:1000,hidden:true
		};
		var dialog=new App.Dialog.BasicDialog(title,html,cfg);
		var mdforwardtextarea=$E("mdrecommendedtextarea");
		var tipStringOK="还可以输入<em>${num}</em>个汉字";
		var tipStringErr="已经超出<em>${num}</em>个汉字";
		var forwardInputLimit=function () {
			var num=Math.ceil(Core.String.byteLength(Core.String.trim(mdforwardtextarea.value))/2);
			if(num>100) {
				$E("recommendedInfoBox").innerHTML=tipStringErr.replace(/\$\{num\}/,(maxlen/2-num)*(-1));
				$E("recommendedInfoBox").style.color="#880000";
				return false
			}else {
				$E("recommendedInfoBox").innerHTML=tipStringOK.replace(/\$\{num\}/,(maxlen/2-num));
				$E("recommendedInfoBox").style.color="#008800";
				return true
			}
		};
		if(el) {
			App.doFlyOut(el,dialog._node,{
				resFun:function () {
					try{
						dialog.show();
						$E("mdrecommendedtextarea").focus();
						if($IE) {
						}else {
							$E("mdrecommendedtextarea").setSelectionRange(0,0)
						}forwardInputLimit()
					}catch(e) {
					}
				},"style":"border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",time:0.5
			})
		}else {
			dialog.show();
			$E("mdrecommendedtextarea").focus();
			setTimeout(forwardInputLimit,1)
		}var url="/mblog/publish.php";
		var mdforwardbtn=$E("mdrecommendedbtn");
		var maxlen=200;
		App.autoHeightTextArea(mdforwardtextarea,function () {
			setTimeout(forwardInputLimit,1)
		},145);
		var loginerror=$E("loginerror");
		var disClass="btn_notclick";
		var enableClass="btn_normal";
		var name=$E("logintitle");
		var pwd=$E("loginpwd");
		var options={
			zIndex:1010,ref:name,wrap:loginerror,offsetY:-1,offsetX:30
		};
		var mdforwardtextareaonfocus=function () {
		};
		mdforwardtextarea.onblur=function () {
			if(mdforwardtextarea.value=="") {
				mdforwardtextarea.value=defaultTxt
			}
		};
		mdforwardtextarea.onkeydown=function (event) {
			event=event||window.event;
			if(event.keyCode==13&&event.ctrlKey) {
				mdforwardbtn.onclick()
			}
		};
		$E("mdrecommendedcancel").onclick=function () {
			dialog.close();
			return false
		};
		function forwardSuccess() {
			var reason=mdforwardtextarea.value=Core.String.leftB(mdforwardtextarea.value,maxlen);
			var postdata={
				content:reason.indexOf("@"+testForwardName)!=-1?reason.replace(/'@'+testForwardName/gi,"@"+testForwardName+" ").replace(/\uff20/ig,"@")+" "+appendurl:(reason+" @"+testForwardName).replace(/\uff20/ig,"@")+" "+appendurl,"from":scope["$pageid"],"styleid":1
			};
			if(scope.$pageid=="search") {
				postdata.from="search"
			}if((scope.$pageid=="myprofile"||scope.$pageid=="search")&&scope.$feedtype!="isori") {
				postdata.isindex=1
			}var cb=function (data,json) {
				dialog.close();
				var cbdia=App.alert("推荐成功",{
					icon:3,ok:function () {
						if(!scope.$uid) {
							location.reload()
						}
					}
				});
				var itv=setTimeout(function () {
					try{
						cbdia&&(cbdia.close());
						if(!scope.$uid) {
							location.reload()
						}
					}catch(e) {
					}
				},2000);
				if(scope.$uid==scope.$oid&&data&&data.html) {
					cbdia.onClose=function () {
						if(itv) {
							clearTimeout(itv);
							itv=null
						}var feedlist=$E("feedlistwrap");
						if(App.refurbishUpdate) {
							App.refurbishUpdate.add(1)
						}if(feedlist) {
							if(scope.$feedtype=="isat") {
								if(uname) {
									if(!checkAT(postdata.reason,uname)) {
										return false
									}
								}
							}Core.Dom.insertHTML(feedlist,data.html,"AfterBegin")
						}
					}
				}var num=$E(exid);
				if(num) {
					var count=num.innerHTML.match(/\d+/)||0;
					num.innerHTML="("+(parseInt(count)+1)+")";
					num.style.display=""
				}
			};
			var ecb=function (json) {
				mdforwardbtn.className=enableClass;
				App.alert(json,{
					ok:function () {
						if(!scope.$uid) {
							location.reload()
						}
					}
				})
			};
			App.doRequest(postdata,url,cb,ecb)
		}function errortTip(str,el) {
			el.focus();
			App.fixElement.setHTML(str,"",options);
			mdforwardbtn.className=enableClass;
			return false
		}if(!scope.$uid) {
			passcardOBJ.init(name,{
				overfcolor:"#999",overbgcolor:"#e8f4fc",outfcolor:"#000000",outbgcolor:""
			},pwd,window);
			App.initLoginInput(name)
		}mdforwardbtn.onclick=function () {
			if(!forwardInputLimit()) {
				var orbit=["#fff","#fee","#fdd","#fcc","#fdd","#fee","#fff","#fee","#fdd","#fcc","#fdd","#fee","#fff"];
				var index=0;
				var hook=App.timer.add(function () {
					if(index/2>=orbit.length) {
						App.timer.remove(hook);
						return false
					}mdforwardtextarea.style.backgroundColor=orbit[index/2];
					index+=1
				});
				return false
			}if(mdforwardbtn.className==disClass) {
				return false
			}mdforwardbtn.className=disClass;
			if(scope.$uid) {
				forwardSuccess()
			}else {
				var namestr=Core.String.trim(name.value);
				var pwdstr=Core.String.trim(pwd.value);
				if(!namestr||namestr==name.title) {
					errortTip("请输入登录名",name);
					return false
				}else {
					App.fixElement.hidden()
				}if(!pwdstr) {
					errortTip("请输入密码",pwd);
					return false
				}else {
					App.fixElement.hidden()
				}App.LoginAction({
					name:namestr,pwd:pwdstr,remb:7,error:function (reason,errno) {
						var msg="";
						if(errno=="4010") {
							reason=App.getMsg({
								code:"R01011"
							});
							msg=App.getMsg("R01010",{
								mail:loginname.value
							})
						}else {
							if(errno=="101"||errno=="5") {
								msg=App.getMsg({
									code:"R01007"
								})
							}
						}App.fixElement.setHTML(reason,msg,options);
						mdforwardbtn.className=enableClass
					},succ:function () {
						forwardSuccess()
					}
				})
			}return false
		};
		App.enterSubmit({
			parent:"forwardcontent",action:function () {
				mdforwardbtn.onclick()
			}
		})
	};
	Core.Dom.getChildrenByClass=function (el,clz) {
		var rs=[];
		var cldr=el.childNodes||el.children;
		var clz=" "+clz+" ";
		var len=cldr.length;
		for(var i=0;i<len;++i) {
			var o=cldr[i];
			var ecl=" "+o.className+" ";
			if(ecl.indexOf(clz)!=-1) {
				rs[rs.length]=o
			}
		}return rs
	};
	function intval(v) {
		v=parseInt(v);
		return isNaN(v)?0:v
	}function getPos(e) {
		var l=0;
		var t=0;
		var w=intval(e.style.width);
		var h=intval(e.style.height);
		var wb=e.offsetWidth;
		var hb=e.offsetHeight;
		while(e.offsetParent) {
			l+=e.offsetLeft+(e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
			t+=e.offsetTop+(e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
			e=e.offsetParent
		}l+=e.offsetLeft+(e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
		t+=e.offsetTop+(e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
		return {
			x:l,y:t,w:w,h:h,wb:wb,hb:hb
		}
	}function getScroll() {
		var t,l,w,h;
		if(document.documentElement&&document.documentElement.scrollTop) {
			t=document.documentElement.scrollTop;
			l=document.documentElement.scrollLeft;
			w=document.documentElement.scrollWidth;
			h=document.documentElement.scrollHeight
		}else {
			if(document.body) {
				t=document.body.scrollTop;
				l=document.body.scrollLeft;
				w=document.body.scrollWidth;
				h=document.body.scrollHeight
			}
		}return {
			t:t,l:l,w:w,h:h
		}
	}function scroller(el,duration,offsetY,offsetX) {
		if(typeofel!="object") {
			el=document.getElementById(el)
		}if(!el) {
			return
		}var z=this;
		z.el=el;
		z.p=getPos(el);
		z.s=getScroll();
		z.clear=function () {
			window.clearInterval(z.timer);
			z.timer=null
		};
		z.offsetX=offsetX||0;
		z.offsetY=offsetY||0;
		z.p.x+=z.offsetX;
		z.p.y+=z.offsetY;
		z.t=(new Date).getTime();
		z.step=function () {
			var t=(new Date).getTime();
			var p=(t-z.t)/duration;
			if(t>=duration+z.t) {
				z.clear();
				window.setTimeout(function () {
					z.scroll(z.p.y,z.p.x)
				},13)
			}else {
				st=((-Math.cos(p*Math.PI)/2)+0.5)*(z.p.y-z.s.t)+z.s.t;
				sl=((-Math.cos(p*Math.PI)/2)+0.5)*(z.p.x-z.s.l)+z.s.l;
				z.scroll(st,sl)
			}
		};
		z.scroll=function (t,l) {
			window.scrollTo(l,t)
		};
		z.timer=window.setInterval(function () {
			z.step()
		},13)
	}$registJob("seevideo",function () {
		App.bindmedia()
	});
	App.bindmedia=function (elementRoot) {
		if(!elementRoot) {
			elementRoot=document
		}var args={
			name:"extinfo",type:"type",videolink:"videolink"
		};
		var mblogvideofirst;
		var _getElementsByAttr=Core.Dom.getElementsByAttr;
		var _htmlToJson=App.htmlToJson;
		var _addevent=Core.Events.addEvent;
		var _seevideo=App.seevideo;
		var _listenmusic=App.listenmusic;
		var _mblogtype;
		var _videolink=function () {
			return _getElementsByAttr(elementRoot,"name",args["name"])
		};
		var _varray=_videolink();
		if(!_varray||_varray.length==0) {
			return false
		}for(var i=0;i<_varray.length;i++) {
			_varray[i].href="javascript:void(0);";
			_varray[i].target="";
			switch(_varray[i].getAttribute("type")) {
				case "1":if(!mblogvideofirst) {
					mblogvideofirst=_varray[i]
				}_addevent(_varray[i],(function (el) {
					return function () {
						_seevideo(el)
					}
				})(_varray[i]),"click");
				break;
				case "2":_addevent(_varray[i],(function (el) {
					return function () {
						_listenmusic(el)
					}
				})(_varray[i]),"click");
				break
			}
		}if(scope.$pageid=="mblog"&&mblogvideofirst) {
			var _vinfo=App.getextinfo(mblogvideofirst);
			if(!_vinfo) {
				return false
			}var mid=mblogvideofirst.parentNode.getAttribute("mid");
			var mtype=mblogvideofirst.parentNode.getAttribute("type");
			if(mtype!="1") {
				return false
			}var shorturl=mblogvideofirst.getAttribute("shorturl_id");
			var _showvdiv=$E("video_"+mid);
			var video={
				mid:decodeURIComponent(mid),url:decodeURIComponent(_vinfo["url"]),title:decodeURIComponent(_vinfo["title"]),shorturl:decodeURIComponent(shorturl),ourl:decodeURIComponent(_vinfo["ourl"]),mtype:mtype
			};
			var setswfobject=function (url,mid) {
				var flashParams={
					quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
				};
				var flashVars={
					playMovie:"true"
				};
				swfobject.embedSWF(url,mid,"440","360","9.0.0",null,flashVars,flashParams)
			};
			var html='<p><cite><a href="http://sinaurl.cn/'+video["shorturl"]+'" target = "_blank" class="lose" title="'+video["ourl"]+'"><img alt="" title="" class="small_icon original" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>'+video["title"]+'</a></cite></p><div id="'+video["mid"]+'">您还未安装flash播放器！</div>';
			_showvdiv.innerHTML=html;
			setswfobject(video["url"],video["mid"])
		}
	};
	App.getextinfo=function (el) {
		var shorturl_id=el.getAttribute("shorturl_id");
		if(scope.extinfo&&scope.extinfo[shorturl_id]) {
			return scope.extinfo[shorturl_id]
		}else {
			return false
		}
	};
	App.seevideo=function (el) {
		if(scope.$pageid=="yunying_index") {
			return true
		}var modlist=false;
		var _vinfo=App.getextinfo(el);
		if(!_vinfo) {
			return false
		}el=el.tagName=="A"?el:el.parentNode;
		var mid=el.parentNode.getAttribute("mid");
		var mtype=el.parentNode.getAttribute("type");
		var shorturl=el.getAttribute("shorturl_id");
		var video={
			mid:decodeURIComponent(mid),url:decodeURIComponent(_vinfo["url"]),title:decodeURIComponent(_vinfo["title"]),shorturl:decodeURIComponent(shorturl),ourl:decodeURIComponent(_vinfo["ourl"]),mtype:mtype
		};
		var _showvdiv=$E("video_"+mid);
		var _imagediv=$E("image_"+mid);
		var checksame=function (vdiv,shorturl) {
			if("http://sinaurl.cn/"+shorturl==Core.Dom.getElementsByClass(vdiv,"A","lose")[0].href) {
				return true
			}else {
				return false
			}
		};
		var setswfobject=function (url,mid) {
			var flashParams={
				quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
			};
			var flashVars={
				playMovie:"true"
			};
			swfobject.embedSWF(url,mid,"440","360","9.0.0",null,flashVars,flashParams)
		};
		var getvideoHTML=function (videocfg) {
			if(videocfg) {
				if(scope.$pageid=="mblog"&&videocfg["mtype"]=="1") {
					return '<p><cite><a href="http://sinaurl.cn/'+videocfg["shorturl"]+'" target = "_blank" class="lose" title="'+videocfg["ourl"]+'"><img alt="" title="" class="small_icon original" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>'+videocfg["title"]+'</a></cite></p><div id="'+videocfg["mid"]+'">您还未安装flash播放器！</div>'
				}else {
					if(videocfg["mtype"]=="1") {
						return '<div class="MIB_assign_t"></div>					<div class="MIB_assign_c MIB_txtbl">					<div class="blogPicOri">		                <p>						<cite><a href="javascript:;" onclick="App.closevideo(\''+videocfg["mid"]+'\');"><img alt="" title="" class="small_icon cls" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>收起</a>							<cite class="MIB_line_l">|</cite></cite>							<cite><a href="http://sinaurl.cn/'+videocfg["shorturl"]+'" target = "_blank" class="lose" title="'+videocfg["ourl"]+'"><img alt="" title="" class="small_icon original" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>'+videocfg["title"]+'</a></cite>											</p>											 <div id="'+videocfg["mid"]+'">									  	您还未安装flash播放器！									  </div>											 </div>										</div>										<div class="MIB_assign_b"></div>'
					}else {
						return '<div class="MIB_linedot_l1" style="display: block;"></div>					<div class="blogPicOri">		                <p>						<cite><a href="javascript:;" onclick="App.closevideo(\''+videocfg["mid"]+'\');"><img alt="" title="" class="small_icon cls" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>收起</a>							<cite class="MIB_line_l">|</cite></cite>							<cite><a href="http://sinaurl.cn/'+videocfg["shorturl"]+'" target = "_blank" class="lose" title="'+videocfg["ourl"]+'"><img alt="" title="" class="small_icon original" src="http://simg.sinajs.cn/miniblog2style/images/common/transparent.gif"/>'+videocfg["title"]+'</a></cite>											</p>											 <div id="'+videocfg["mid"]+'">									  	您还未安装flash播放器！									  </div>											 </div>'
					}
				}
			}
		};
		if(_showvdiv&&_showvdiv.style.display!="none") {
			if(!checksame(_showvdiv,video["shorturl"])) {
				_showvdiv.innerHTML=getvideoHTML(video);
				setswfobject(video["url"],video["mid"]);
				scroller(_showvdiv,1000,-30,0)
			}
		}else {
			_imagediv.style.display="none";
			_showvdiv.innerHTML=getvideoHTML(video);
			setswfobject(video["url"],video["mid"]);
			_showvdiv.style.display="";
			scroller(_showvdiv,1000,-30,0)
		}var oScript=document.createElement("script");
		oScript.src="http://v.t.sina.com.cn/c.html?video_url="+encodeURIComponent("http://sinaurl.cn/"+video["shorturl"])+"&title="+encodeURIComponent(video["title"]);
		document.body.appendChild(oScript);
		return false
	};
	App.closevideo=function (mid) {
		var _showvdiv=$E("video_"+mid);
		var _imagediv=$E("image_"+mid);
		var _img;
		if(Core.Dom.getElementsByAttr(_imagediv,"class","imgSmall").length>0) {
			_img=Core.Dom.getElementsByAttr(_imagediv,"class","imgSmall")
		}else {
			_img=Core.Dom.getElementsByAttr(_imagediv,"className","imgSmall")
		}if(_img.length>0) {
			var _bigimg=_img[0];
			App.shrinkImg(_bigimg)
		}_imagediv.style.display="";
		_showvdiv.style.display="none";
		_showvdiv.innerHTML="";
		return false
	};
	App.listenmusic=function (el) {
		el=el.tagName=="A"?el:el.parentNode;
		var mid=el.parentNode.getAttribute("mid");
		var shorturl=el.getAttribute("shorturl_id");
		var music={
			mid:decodeURIComponent(mid),url:decodeURIComponent(shorturl)
		};
		scope.musicshow=window.open("/music/player.php?mid="+music["mid"]+"&url="+encodeURIComponent("http://sinaurl.cn/"+music["url"]),"音乐播放","width=730,height=567,top="+(window.screen.height-567)/2+", left="+(window.screen.width-730)/2+", toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no");
		scope.musicshow.focus();
		return false
	};
	Core.Array.isArray=function (o) {
		return Object.prototype.toString .call(o)==="[object Array]"
	};
	$registJob("group_option",function () {
		if(!scope.groupList||scope.groupList.length==0) {
			return
		}var _li_myprofile=$E("li_myprofile");
		var _addevent=Core.Events.addEvent;
		var _showgroups=$E("showgroups");
		var _addEvent=Core.Events.addEvent
	});
	App.groupshow_index=function (el) {
		var ul_group=$E("ul_group");
		if(el.innerHTML.indexOf("&gt;")>=0||el.innerHTML.indexOf(">")>=0) {
			el.innerHTML="&lt;";
			ul_group.style.display="none"
		}else {
			el.innerHTML="&gt;";
			ul_group.style.display=""
		}
	};
	App.group_option=function () {
		if(!scope.groupList||scope.groupList.length==0) {
			return false
		}var _glist=scope.groupList;
		var _html=function () {
			var _head='<div id="group_options" class = "shareLayer"><div class="shareTxt">设置哪些分组显示在我的首页</div>';
			var _middle="";
			if(_glist.length>0) {
				_middle='<ul class="group_list">'
			}for(var i=0;i<_glist.length;i++) {
				_middle+='<li><input type="checkbox" value="'+_glist[i].gid+'" name="groupoption" class="labelbox" id="input'+i+'"'+(_glist[i].display=="1"?"checked":"")+'/><label for="input'+i+'">'+_glist[i].name+"</label></p>"
			}if(_glist.length>0) {
				_middle+="</ul>"
			}var _tail='<div class="MIB_btn"><a id="group_submit" href="javascript:void(0)" class="btn_normal"><em>保存</em></a><a id="group_cancel" href="javascript:void(0)" class="btn_normal"><em>取消</em></a></div></div>';
			return _head+_middle+_tail
		};
		var _dialog=new App.Dialog.BasicDialog("设置分组显示",_html(),{
			zIndex:1200,hidden:true
		});
		var _addEvent=Core.Events.addEvent;
		var _gsubmit=$E("group_submit");
		var _gcancel=$E("group_cancel");
		var _group_options=$E("group_options");
		var _getparams=function () {
			return App.htmlToJson(_group_options)
		};
		var url="/attention/aj_group_setdisplay.php";
		var cb=function () {
			_dialog.close();
			window.location.reload()
		};
		var ecb=function (json) {
			_dialog.close();
			if(json) {
				App.alert({
					code:json.code
				})
			}else {
				App.alert({
					code:"R01404"
				})
			}
		};
		_dialog.show();
		var _submitevent=function () {
			var group=_getparams();
			var params={
				gids:Core.Array.isArray(group["groupoption"])?group["groupoption"].join(","):group["groupoption"]
			};
			App.doRequest(params,url,cb,ecb)
		};
		_addEvent(_gsubmit,function () {
			_submitevent()
		},"click");
		_addEvent(_gcancel,function () {
			_dialog.close()
		},"click")
	};
	$registJob("set_tag",function () {
		scope.arrTags=[];
		for(var t in scope.$tags) {
			if(!(t in {
			})) {
				scope.arrTags.push(scope.$tags[t].tag)
			}
		}if($E("tag_input")) {
			var initValue=$E("tag_input").value
		}function addTag(oButton,oInput,oError) {
			scope._submit_tag_btn=oButton;
			scope._error=oError;
			var ac=scope.autoSuggestTags({
				"input":oInput
			},"http://t.sina.com.cn/person/aj_tagchooser.php");
			var initHtml=oError.innerHTML;
			var initBtnCalss=(scope.$pageid==="set_tag")?"btn_normal":"btn_normal btnxs";
			var valid=false;
			var validateTag=function () {
				if(oInput.value===initValue) {
					return false
				}if(scope.arrTags.length>=20) {
					oError.innerHTML='<span style="color:red;font:bold;">最多可添加20个标签</span>';
					valid=false;
					return valid
				}else {
					oError.innerHTML=initHtml;
					valid=true
				}var valid=false;
				if(!(/^(,|;
				|\uFF0C|\uFF1B|\u3001|\s|\w|[\u4E00-\u9FA5\uFF00-\uFFFF])*$/.test(Core.String.trim(scope._dbc2sbc(oInput.value))))) {
					oError.innerHTML='<span style="color:red;font:bold;">含有非法字符，请修改</span>';
					valid=false;
					return valid
				}else {
					oError.innerHTML=initHtml;
					valid=true
				}var len=Core.String.byteLength(oInput.value);
				if(len>14) {
					oInput.value=Core.String.leftB(oInput.value,14);
					valid=true
				}var v=Core.String.trim(oInput.value.replace(/,|;
				|\uFF0C|\uFF1B|\u3001|\s/g,""));
				var len=Core.String.trim(oInput.value).length;
				if(!v&&len!==0) {
					oError.innerHTML='<span style="color:red;font:bold;">请输入标签</span>';
					valid=false;
					return valid
				}return valid
			};
			Core.Events.addEvent(oInput,validateTag,"blur");
			function submit() {
				if(scope.arrTags.length<20) {
					oError.innerHTML=initHtml;
					var tagName=Core.String.trim(oInput.value);
					var len=Core.String.byteLength(oInput.value);
					if(validateTag()&&len<=14) {
						var v=Core.String.trim(scope._dbc2sbc(oInput.value.replace(/,|;
						|\uFF0C|\uFF1B|\u3001|\s/g,"")));
						var len=Core.String.trim(oInput.value).length;
						if((!v&&len!==0)||len===0) {
							oError.innerHTML='<span style="color:red;font:bold;">请输入标签</span>';
							return
						}scope.addTag(tagName,function () {
							if(oInput) {
								oInput.value=""
							}
						})
					}else {
						oInput.focus()
					}
				}else {
					oError.innerHTML='<span style="color:red;font:bold;">最多可添加20个标签</span>'
				}
			}Core.Events.addEvent(oButton,submit,"click",false);
			App.enterSubmit({
				parent:oButton.parentNode,action:function () {
					var index=ac.get("index");
					setTimeout(function () {
						if(index===ac.get("index")) {
							submit()
						}else {
							oInput.focus()
						}
					},200)
				}
			})
		}if(scope.$pageid==="set_tag") {
			$E("tip_or_error").style.display="block";
			var input=$E("tag_input");
			if(scope.arrTags.length!=20) {
				setTimeout(function () {
					input.focus()
				},0)
			}Core.Events.addEvent(input,function () {
				if(input.value===initValue) {
					input.value=""
				}
			},"focus",false);
			Core.Events.addEvent(input,function () {
				if(!Core.String.trim(input.value)) {
					input.value=initValue
				}
			},"blur",false);
			addTag($E("add_tag"),$E("tag_input"),$E("tip_or_error"))
		}if(scope.$pageid==="mymblog"||scope.$pageid==="profile"||scope.$pageid==="myprofile"||scope.$pageid==="mblog") {
			scope.showTag();
			Core.Events.addEvent($E("addUserTag"),function (e) {
				if(scope.arrTags.length>=20) {
					return
				}scope.showTagEditor(e);
				if(!scope._binded) {
					addTag($E("add_tag"),$E("tag_input"),$E("tag_error"));
					scope._binded=true
				}
			},"click",false)
		}if(scope.$pageid==="square_tag") {
			Core.Events.addEvent($E("insert_tag"),function (e) {
				if(scope.arrTags.length>=20) {
					return App.alert("最多可添加20个标签!",{
						icon:2,width:380,height:120
					})
				}scope.showTagEditor(e);
				if(!scope._binded) {
					addTag($E("add_tag"),$E("tag_input"),$E("tag_error"));
					scope._binded=true
				}
			},"click",false);
			Core.Events.addEvent($E("add_tag_btn"),function (e) {
				if(scope.arrTags.length>=20) {
					return App.alert("最多可添加20个标签!",{
						icon:2,width:380,height:120
					})
				}scope.showTagEditor(e);
				if(!scope._binded2) {
					addTag($E("add_tag"),$E("tag_input"),$E("tag_error"));
					scope._binded2=true
				}
			},"click",false)
		}
	});
	Core.Class.extend(scope,{
		_dbc2sbc:function (str) {
			return str.replace(/[\uff01-\uff5e]/g,function (a) {
				return String.fromCharCode(a.charCodeAt(0)-65248)
			}).replace(/\u3000/g," ")
		},_beforeAddTag:function (rawValue) {
			rawValue=Core.String.trim(this._dbc2sbc(rawValue));
			var tags=rawValue.split(/,|;
			|\uFF0C|\uFF1B|\u3001|\s/);
			var arrTag=[];
			for(var i=0,len=tags.length;i<len;i++) {
				if(tags[i]!==""&&Core.Array.findit(arrTag,tags[i])===-1) {
					arrTag.push(tags[i])
				}
			}return arrTag.join(";")
		},addTag:function (tagName,callback) {
			if(scope._on_submiting) {
				return
			}tagName=this._beforeAddTag(tagName);
			if(scope.$oid===scope.$uid&&scope.arrTags.length>=20) {
				return App.alert("最多可添加20个标签!",{
					icon:2,width:380,height:120
				})
			}var sUrl="http://t.sina.com.cn/person/aj_addusertag.php";
			var oData={
				"tag":tagName
			};
			if(scope.$pageid==="profile"&&!$E("addUserTag")) {
				if($E("tag_layer")) {
					document.body.removeChild($E("tag_layer"))
				}if(scope._submit_tag_btn) {
					scope._submit_tag_btn.disabled=true
				}scope._on_submiting=true;
				App.doRequest(oData,sUrl,function (data,result) {
					if(result&&result.code&&result.code==="A00006") {
						var dialog=App.alert('<em id="tag_added" style="font-size:17px">添加标签成功!</em>'+'&nbsp;<a href="http://t.sina.com.cn/person/tag.php">查看我的标签</a>',{
							icon:3,width:370,height:120,focus:true
						});
						setTimeout(function () {
							if($E("tag_added")) {
								dialog.close()
							}
						},3000);
						if(scope._submit_tag_btn) {
							scope._submit_tag_btn.disabled=false
						}scope._on_submiting=false
					}
				},function (result) {
					if(result&&result.code) {
						App.alert($SYSMSG[result.code],{
							icon:2,width:370,height:120
						})
					}else {
						App.alert("错误!",{
							icon:2,width:370,height:120
						})
					}if(scope._submit_tag_btn) {
						scope._submit_tag_btn.disabled=false
					}scope._on_submiting=false
				});
				return
			}var tags=tagName.split(";"),newTags=[];
			for(var i=0,len=tags.length;i<len;i++) {
				if(Core.Array.findit(scope.arrTags,tags[i])!=-1) {
					var cssText="background-color:yellow;font-size:20px;font-weight:bold;";
					if(scope.$pageid==="set_tag") {
						var a_list=$E("tag_list").getElementsByTagName("A");
						for(var k=0,length=a_list.length;k<length;k++) {
							if(a_list[k].getAttribute("tagid")) {
								if(a_list[k].previousSibling.innerHTML==tags[i]) {
									(function (index) {
										var a_tag=a_list[index];
										var li=a_tag.parentNode;
										a_tag.style.display="none";
										li.style.cssText=cssText;
										setTimeout(function () {
											li.style.cssText="";
											a_tag.style.display=""
										},666)
									})(k)
								}
							}
						}
					}else {
						var a_list=$E("module_tags").getElementsByTagName("A");
						for(var m=0,length=a_list.length;m<length;m++) {
							if(a_list[m].innerHTML==tags[i]) {
								(function (index) {
									var a_tag=a_list[m];
									a_tag.style.cssText=cssText;
									setTimeout(function () {
										a_tag.style.cssText=""
									},666)
								})(m)
							}
						}
					}
				}else {
					newTags.push(tags[i])
				}
			}if(newTags.length===0) {
				return
			}oData={
				tag:newTags.join(";")
			};
			if($E("pub")&&$E("pub").checked) {
				oData["publish"]="1"
			}if(scope._submit_tag_btn) {
				scope._submit_tag_btn.disabled=true
			}scope._on_submiting=true;
			App.doRequest(oData,sUrl,function (data,result) {
				if(result.data) {
					var tagid,tag;
					for(var j=0,length=result.data.length;j<length;j++) {
						tagid=result.data[j].tagid;
						tag=result.data[j].tag;
						var imgURL="http://simg.sinajs.cn/"+scope.$PRODUCT_NAME+"style/images/common/transparent.gif";
						var newTagURL="/pub/tags/"+encodeURIComponent(tag);
						if(scope.$pageid==="set_tag") {
							var html="<li onmouseover=\"this.className='bg';\" onmouseout=\"this.className='';\">"+'<a class="a1" href="'+newTagURL+'">'+tag+"</a>"+'<a class="a2" tagid="'+tagid+'" '+'href="javascript:;" onclick="scope.deleteTag(this)">'+'<img title="删除标签" src="'+imgURL+'"></a></li>';
							Core.Dom.insertHTML($E("tag_list"),html,"AfterBegin");
							if(scope.arrTags.length==0) {
								$E("mytagshow1").style.display="block";
								$E("mytagshow2").style.display="block"
							}if(typeofcallback==="function") {
								callback(data,result)
							}
						}else {
							if($E("no_tag_tip")) {
								$E("no_tag_tip").style.display="none"
							}var html='<a class="font_12 fb" tagid="'+tagid+'" href="'+newTagURL+'">'+tag+"</a>&nbsp;";
							Core.Dom.insertHTML($E("module_tags"),html,"AfterBegin");
							if(scope._tag_region) {
								scope._tag_region.style.display="none"
							}
						}scope.arrTags.push(tag);
						if(scope._submit_tag_btn) {
							scope._submit_tag_btn.disabled=false;
							if(scope.arrTags.length>=20) {
								var oAddBtn=$E("addUserTag");
								if(oAddBtn) {
									oAddBtn.style.display="none";
									oAddBtn.nextSibling.style.display="none"
								}
							}
						}scope._on_submiting=false
					}
				}
			},function (result) {
				if(result&&result.code) {
					scope._error.innerHTML='<span style="color:red;font:bold;">'+$SYSMSG[result.code]+"</span>"
				}else {
					scope._error.innerHTML='<span style="color:red;font:bold;">设置标签失败</span>'
				}if(scope._submit_tag_btn) {
					scope._submit_tag_btn.disabled=false
				}scope._on_submiting=false
			})
		},deleteTag:function (el) {
			var sUrl="http://t.sina.com.cn/person/aj_delusertag.php";
			var oData={
				"tagid":el.getAttribute("tagid")
			};
			var lock=false;
			if(lock) {
				return
			}lock=true;
			App.doRequest(oData,sUrl,function (data,result) {
				try{
					lock=false;
					if(scope.$pageid==="square_tag") {
						var previousSibling=el.parentNode.previousSibling;
						while(previousSibling&&previousSibling.nodeType==3) {
							previousSibling=previousSibling.previousSibling
						}var tagName=previousSibling.getElementsByTagName("A")[0].innerHTML;
						scope.arrTags.splice(Core.Array.findit(scope.arrTags,tagName),1);
						var pp=el.parentNode.parentNode;
						pp.parentNode.removeChild(pp);
						if($E("tag_list").getElementsByTagName("DIV").length===0) {
							$E("mytags")&&($E("mytags").style.display="none");
							$E("tag_list")&&($E("tag_list").style.display="none")
						}if($E("insert_tag")) {
							$E("insert_tag").style.display="";
							$E("insert_tag").nextSibling.style.display=""
						}if($E("add_tag_btn")) {
							$E("add_tag_btn").parentNode.style.display=""
						}
					}else {
						var tagName=el.previousSibling.innerHTML;
						scope.arrTags.splice(Core.Array.findit(scope.arrTags,tagName),1);
						var ul=$E("tag_list");
						ul.removeChild(el.parentNode);
						if(ul.getElementsByTagName("li").length===0) {
							$E("mytagshow1").style.display="none";
							$E("mytagshow2").style.display="none"
						}
					}
				}catch(e) {
					lock=false
				}
			},function (result) {
				lock=false;
				if(result&&result.code) {
					App.alert($SYSMSG[result.code],{
						icon:2,width:370,height:120
					})
				}else {
					App.alert("删除标签失败!",{
						icon:2,width:370,height:120
					})
				}
			})
		},addRecommendedTag:function (el) {
			var tagName=el.innerHTML.substring(10);
			this.addTag(tagName,function () {
				el.parentNode.removeChild(el);
				if($E("rec_tags").getElementsByTagName("A").length===0) {
					location.reload()
				}
			})
		},showTag:function () {
			var container=$E("module_tags");
			var weights=[],tags=[];
			for(var t in scope.$tags) {
				if(!(t in {
				})) {
					var a=$C("A");
					a.innerHTML=scope.$tags[t]["tag"];
					a.setAttribute("tagid",scope.$tags[t]["tagid"]);
					a.setAttribute("weight",scope.$tags[t]["weight"]);
					weights.push(parseFloat(scope.$tags[t]["weight"]));
					tags.push(a);
					if(scope.$uid===scope.$oid) {
						var url="/pub/tags/"+encodeURIComponent(scope.$tags[t]["tag"]);
						a.setAttribute("href",url)
					}else {
						a.setAttribute("href","javascript:;");
						a.onclick=function (e) {
							scope.showTagLayer(e)
						}
					}container.appendChild(a);
					container.appendChild(document.createTextNode(" "))
				}
			}weights.sort();
			var w;
			for(var i=0,len=tags.length;i<len;i++) {
				w=parseFloat(tags[i].getAttribute("weight"));
				if(w>weights[Math.round(len/2)]) {
					if(w>weights[Math.round(len*3/4)]) {
						tags[i].className=Math.round(Math.random()*100)%2?"font_18 fb":"font_18"
					}else {
						tags[i].className=Math.round(Math.random()*100)%2?"font_16 fb":"font_16"
					}
				}else {
					if(w>weights[Math.round(len/4)]) {
						tags[i].className=Math.round(Math.random()*100)%2?"font_14 fb":"font_14"
					}else {
						tags[i].className=Math.round(Math.random()*100)%2?"font_12 fb":"font_12"
					}
				}
			}
		},showTagEditor:function (e) {
			if(!scope._tag_region) {
				var region=$C("DIV");
				region.id="tag_editor";
				region.style.display="none";
				region.className="small_Yellow";
				region.innerHTML='<table style="width: 200px;" class="CP_w">		        <thead>		            <tr>		                <th class="tLeft">		                    <span></span>		                </th>		                <th class="tMid">		                    <span></span>		                </th>		                <th class="tRight">		                    <span></span>		                </th>		            </tr>		        </thead>		        <tfoot>		            <tr>		                <td class="tLeft">		                    <span></span>		                </td>		                <td class="tMid">		                    <span></span>		                </td>		                <td class="tRight">		                    <span></span>		                </td>		            </tr>		        </tfoot>		        <tbody>		            <tr>		                <td class="tLeft">		                    <span></span>		                </td>		                <td class="tMid">		                    <div class="tagslayer">		                        <p>		                            <input type="text" class="PY_input" id="tag_input">		                            <a class="btn_normal btnxs" href="javascript:;" id="add_tag" >		                            <em>保存</em></a>		                        </p>		                        <p class="txt" id="tag_error">		                            哪些词语最能够描述你？  		                        </p>		                    </div>		                </td>		                <td class="tRight">		                    <span></span>		                </td>		            </tr>		        </tbody>		    </table>		    <div class="close">		        <a href="javascript:;" id="close_tag"></a>		    </div>';
				document.body.appendChild(region);
				scope._tag_region=region
			}setTimeout(function () {
				if(scope._tag_region.style.display!=="none") {
					$E("tag_input").focus()
				}
			},100);
			$E("tag_input").value="";
			$E("tag_error").innerHTML=" 哪些词语最能够描述你？";
			var e=e||window.event;
			var target=e.srcElement||e.target;
			target.parentNode&&(target.parentNode.style.position="relative");
			scope._srcElement=target;
			var pos=Core.Dom.getXY(target);
			var editor=scope._tag_region;
			var style=editor.style;
			if(style.display=="none") {
				style.display="block"
			}else {
				style.display="none";
				return
			}with(style) {
				position="absolute";
				left=pos[0]-editor.offsetWidth+85+"px";
				top=pos[1]+20+"px";
				if(scope.$pageid==="square_tag") {
					left=pos[0]-editor.offsetWidth+150+"px";
					top=pos[1]+25+"px";
					if(target.id==="insert_tag") {
						top=pos[1]+15+"px";
						left=pos[0]-editor.offsetWidth+145+"px"
					}
				}
			}Core.Events.addEvent($E("close_tag"),function (e) {
				style.display="none"
			},"click",false)
		},autoSuggestTags:function (spec,url) {
			spec["ok"]=function (value,text) {
				spec["input"].value=text;
				if(spec["select"]&&typeofspec["select"]=="function") {
					spec["select"](value,text)
				}
			};
			spec["timer"]=spec["timer"]||5;
			spec["style"]=spec["style"]||"width:"+spec["input"].clientWidth+"px;position:absolute;z-Index:1200;";
			spec["light"]=spec["light"]||function (el) {
				el.className="cur"
			};
			spec["dark"]=spec["dark"]||function (el) {
				el.className=""
			};
			spec["class"]=spec["class"]||"layerMedia_menu";
			spec["type"]=spec["type"]||"ajax";
			spec["data"]=spec["data"]||url+"?key="+spec["input"].value;
			spec["itemStyle"]="overflow:hidden;height:20px";
			return App.autoComplate(spec)
		},showTagLayer:function (e) {
			if($E("tag_layer")) {
				document.body.removeChild($E("tag_layer"))
			}var e=e||window.event;
			var target=e.srcElement||e.target;
			var oData={
				tagid:target.getAttribute("tagid"),uid:scope.$oid
			};
			sUrl="http://t.sina.com.cn/person/aj_getusertaglayer.php";
			App.doRequest(oData,sUrl,function (data,result) {
				if(result.code==="A00006") {
					var pos=Core.Dom.getXY(target);
					var layer=$C("DIV");
					layer.id="tag_layer";
					layer.innerHTML=result.data;
					document.body.appendChild(layer);
					$E("close_tag_layer").onclick=function () {
						layer.style.display="none";
						setTimeout(function () {
							document.body.removeChild(layer)
						},200)
					};
					with(layer.style) {
						position="absolute";
						zIndex=1001
					}var ow=layer.offsetWidth;
					var oh=layer.offsetHeight;
					var win_s=Core.System.winSize();
					var scroll_pos=Core.System.getScrollPos();
					var tx=(win_s.width-ow)/2;
					var ty=scroll_pos[0]+(win_s.height-oh)/2;
					layer.style["left"]=tx+"px";
					layer.style["top"]=(ty<20?20:ty)+"px"
				}
			},function (result) {
				if(result&&result.code) {
					App.alert($SYSMSG[result.code],{
						icon:2,width:370,height:120
					})
				}else {
					App.alert("获取标签信息失败!",{
						icon:2,width:370,height:120
					})
				}
			})
		}
	});
	Boot.addDOMLoadEvent(function () {
		var _an="dynamic-src";
		var _pl=2;
		var _w=window;
		var _d=_w["document"];
		var _b=_d["body"];
		var _e=_d["documentElement"]||{
		};
		var _a=Core.Events.addEvent;
		var _r=Core.Events.removeEvent;
		var $sh,$il,$ins,$st,$clock;
		$clock=(function () {
			var c,$_,ms;
			$_={
			};
			$_.stop=function () {
				_w.clearInterval(c)
			};
			$_.start=function (val) {
				$_.stop();
				if(val&&ms!=val) {
					ms=Math.max(val,500)
				}c=_w.setInterval(function () {
					try{
						if(!$ins.flush()) {
							$_.stop()
						}
					}finally{
						t=null
					}
				},ms)
			};
			return $_
		})();
		$st=function () {
			return Math.max(_e.scrollTop,_b.scrollTop)
		};
		$y=(function () {
			var st,et,e;
			return function (el) {
				try{
					if("getBoundingClientRect" in el) {
						et=el.getBoundingClientRect().top;
						return et+$st()
					}e=el.offsetParent;
					et=e.offsetTop;
					while(e&&e!=_b) {
						et+=e.offsetTop;
						e=e.offsetParent
					}return et||0
				}finally{
					st=et=e=null
				}
			}
		})();
		$ins=(function () {
			var $_={
			};
			$_.flush=(function () {
				var snap,len,i=0,mg,iy,sv;
				return function () {
					try{
						len=($il||[]).length;
						if(!len||$sh===null) {
							return false
						}snap=$st()+$sh;
						for(;i<len;i++) {
							try{
								mg=$il[i];
								iy=$y(mg);
								sv=mg.getAttribute(_an);
								if(!sv||_w.parseInt(iy)>snap) {
									continue
								}mg.removeAttribute(_an);
								mg.src=sv;
								$il.splice(i,1);
								i--;
								len--
							}finally{
								mg=iy=sv=null
							}
						}return true
					}finally{
						len=snap=null;
						i=0
					}
				}
			})();
			$_.scroll=(function () {
				var c;
				return function () {
					_w.clearTimeout(c);
					c=setTimeout(function () {
						if(!$ins.flush()) {
							$_.unbind();
							$clock.stop()
						}else {
							"scope" in _w&&scope.splitScreenLoop&&$clock.start(scope.splitScreenLoop)
						}
					},100)
				}
			})();
			$_.resize=function () {
				$sh=(_w["innerHeight"]||(_e&&_e["clientHeight"])?_e["clientHeight"]:_b["clientHeight"])*_pl;
				$_.scroll()
			};
			$_.filter=function () {
				var imgs=document.getElementsByTagName("img");
				var len=imgs.length;
				if(!len) {
					return
				}var i=0,l=[],av,mg,sv;
				for(;i<len;i++) {
					try{
						mg=imgs[i];
						av=mg.getAttribute(_an);
						if(!mg||!av) {
							continue
						}l.push(mg)
					}finally{
						mg=av=sv=null
					}
				}$il=l
			};
			$_.bind=function () {
				_a(_w,$_.scroll,"scroll");
				_a(_w,$_.resize,"resize")
			};
			$_.unbind=function () {
				_r(_w,$_.scroll,"scroll");
				_r(_w,$_.resize,"resize")
			};
			$_.init=function () {
				$_.filter();
				$_.resize();
				$_.unbind();
				$_.bind()
			};
			return $_
		})();
		$ins.init()
	});
	function main() {
		var jobs=new Jobs();
		jobs.add("initSearch");
		if(scope.$uid==scope.$oid) {
			jobs.add("publisher");
			jobs.add("recommuser")
		}jobs.add("hotsearch");
		jobs.add("topic");
		jobs.add("loadComment");
		jobs.add("init_input");
		jobs.add("bind_mobile_info");
		jobs.add("refurbishNumber");
		jobs.add("seevideo");
		jobs.add("group_option");
		jobs.add("set_tag");
		jobs.start()
	};
