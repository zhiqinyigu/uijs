if(typeofSina=="undefined") {
	Sina={
	}
}Sina.pkg=function (ns) {
	if(!ns||!ns.length) {
		return null
	}var levels=ns.split(".");
	var nsobj=Sina;
	for(var i=(levels[0]=="Sina")?1:0;i<levels.length;++i) {
		nsobj[levels[i]]=nsobj[levels[i]]||{
		};
		nsobj=nsobj[levels[i]]
	}return nsobj
};
function $E(oID) {
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
		return "Trace�����ѹر�"
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
};
function Jobs() {
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
	"A00005":"test1","A00006":"�����ɹ�.","M00001":"���ύ�����ݸ�ʽ����ȷ.","M00002":"ϵͳ��æ�����Ժ����ԡ�","M00003":"����δ��¼���¼�ѹ��ڣ������µ�¼��","M00004":"ϵͳ��æ�����Ժ����ԡ�","M00005":"�������ݱ���ʱ������ͨ����˺󽫱�������ʾ���ɴ˴����Ĳ��㣬������б�Ǹ��","M00006":"�벻Ҫ����Υ���Ͳ�����Ϣ��","M00007":"IP�������ޡ�","M00008":"��ʹ�õ��ʺŻ���IP����΢������Ƶ�����ѱ��������������������΢����","M00009":"��������","M00901":"�������¼��","M00902":"����������","M00903":"������ĵ�¼�������벻ƥ�䡣","M00904":"�㵼�����ϵ��Ϊ�ա�","M00905":"�㵼�����ϵ��Ϊ�ա�","M00906":"�������˲��ͻ�û�к��Ѻ͹�ע�ˡ�","M00907":"û���ҵ����˲��͵ĺ��ѡ�","M00908":"��ӹ�עʧ�ܡ�","M00909":"���ź����㵼���MSN��ϵ����ʱû�˼�������΢����","M00910":"���ź����㵼���������ϵ����ʱû�˼�������΢����","M00911":"�㵼���������ϵ�˻�û�˼�������΢�����Ͽ�ȥ�������ǰɡ�","M00912":"��ע�ɹ�","M00913":"��������ѷ��ͳɹ���","M00914":"������˲��ͺ��ѻ�û���˼�������΢����","M00915":"���ڲ��͹�ע���˻�û���˼�������΢��","M00916":"������˲��ͺ��Ѷ��Ѿ������ע�ˣ�","M00917":"�������˲��͹�ע���˶��Ѿ�������΢����ע�ˣ�","M00918":"û���ҵ��������˲��͹�ע���ˡ�","M00919":"û���ҵ��������˲��͵ĺ���","M00920":"���û��Ѿ�ע��������΢��","M00921":"�Ѿ��������䷢��������","M00922":"�ʼ�����ʧ��","M00923":"�����������������","M01001":"��û�п�ʼ΢���أ������ڴ���","M01002":"����д�ĸ������ϻ���ȫ��","M01003":"��û�о������ǵ��򵼡�","M01004":"��Ա��Ų���ȷ��","M01005":"��������ǳƸ�ʽ����ȷ��","M01006":"��ѡ��","M01007":"��ѡ��ʡ��","M01008":"���������ڵء�","M01100":"�������ǳ�","M01101":"������4����ĸ���ϵ��ǳ�","M01102":"�ǳƲ��ܳ���20����ĸ��10������","M01103":"���зǷ��ַ������޸�","M01104":"�������Ա�","M01105":"�������Ա�","M01106":"��������ȷ�������ַ��","M01107":"���ϴ�jpg��gif��png��ʽ��ͼƬ��","M01108":"���ϴ��ļ���С������5M��ͼƬ��","M01109":"����ʧ�ܣ������ԡ�","M01110":"���볤�Ȳ���ȷ��ӦΪ6��16���ַ���","M01111":"�����ʽ����ȷ��","M01112":"�������","M01113":"�����к��з���ĸ�����ֵ��ַ�������������","M01114":"������������벻һ�£����������롣","M01115":"���Ի��������벻��ȷ����ʹ�ó���Ϊ4��20���ַ������ֻ�����ĸ��","M01116":"���Ի��������벻��ȷ����ʹ�ó���Ϊ4��20���ַ������ֻ�����ĸ��","M01117":"������ĸ��Ի����������޸ġ�","M01118":"���������������Ѿ����ڣ��������","M01119":"������ĸ��˼�鲻�ܳ���70���֡�","M01120":"���зǷ��ַ������޸�","M01121":"������ĸ��Ի�������ʽ����ȷ��","M01122":"�ܱ�Ǹ��������Ĳ��͵�ַ�޷��������������","M01123":"��������ȷ��QQ��","M01124":"�������QQ���볤�Ȳ��ܳ���64���ַ���","M01125":"�������MSN�˺ų��Ȳ��ܳ���64���ַ���","M01126":"��������ȷ��MSN��ַ","M01127":"��������ȷ�Ĳ��͵�ַ��","M01128":"�ǳƲ���ȫ������","M01129":"�ǳ��Ѿ����ڣ������һ����","M01130":"�����벻��ȷ","M01131":"������������","M01132":"�ܱ�Ǹ����Ŀǰ���������˲���7.0�û����޷���Ӵ�ģ�顣","M01133":"��������ȷ�����֤����","M01134":"��������ȷ�����֤����","M01135":"��������ʵ����","M01136":"��������ʵ����","M01137":"�޸��ǳ���Ҫ��������������֤��","M01138":"һ���޸��ǳƣ���Ҫ��������������֤����ȷ���Ƿ��޸ģ�","M01139":"��������ȷ��ѧУ��������25������","M01140":"��������ȷ��ѧУ","M01141":"����������70�����ڵı�ע","M01142":"��������ȷ�ĵ�λ���ƣ�������25������","M01143":"��������ȷ�ĵ�λ����","M01144":"��������ȷ�ı�ҵ���","M01145":"��������ȷ����ְ���","M01146":"���ֻ�����15��ѧУ","M01147":"���ֻ�����15��ְҵ��Ϣ","M02001":"����΢�������ڻ����ء�","M02002":"����΢�������ڻ����ء�","M02003":"����Ϣ���ʱ��̫�̣����Ժ����ԡ�","M02004":"��ĵȼ�����3������ҪˣС������û�õģ�","M02005":"�㷢��������Ѿ��ύ�������ĵȴ�����Ա��ˣ��벻Ҫ�ظ��ύ��лл��","M02006":"�㷢��������Ѿ��ύ�������ĵȴ�����Ա��ˣ��벻Ҫ�ظ��ύ��лл��","M02007":"���۳ɹ�","M02008":"�ظ��ɹ�","M02009":"��Ǹ������ʱ�޷�����΢�����¡� �������⣬�����µ����˿ͷ���ѯ���绰95105670��лл��","M02010":"��Ǹ�����޷��Դ���΢���������ۡ��������⣬�����µ����˿ͷ���ѯ���绰95105670��лл��","M02011":"��΢��ת���ѹرա�","M02012":"��΢�������ѹرա�","M02013":"��Ǹ������ʱ�����ܹ�ע���û����������⣬�����µ����˿ͷ���ѯ���绰95105670��лл��","M02014":"���ѳ�����߷���Ƶ�ʣ��ӳ���Ƶ�ʿ�ʼ��2Сʱ�ڲ����ύ������","M02015":"���ѳ�����߷���Ƶ�ʣ��ӳ���Ƶ�ʿ�ʼ��24Сʱ�ڲ����ύ������","M02016":"��ʹ�õ��ʺŻ���IP��������Ƶ�����ѱ���������Сʱ������������벦��绰95105670��","M04001":"���Ѿ��ղ�100������������ȡ��������","M04002":"�ؼ��ʲ���Ϊ��","M04003":"�ղػ���ʧ��","M05001":"�㲻�ܹ�ע�Լ���","M05002":"��Ĺ�ע�����Ѵﵽ���ޡ�","M05003":"����������ӵ��������������ޣ�ֻ��ע�˲����û���","M05004":"���ȹ�ע�����ñ�ע���ƣ�","M05005":"�����뱸ע","M05006":"��ע���Ȳ���ȷ��ӦΪ0��16���ַ���","M05007":"��ע���ܳ���16����ĸ��8�����֡�","M05008":"���зǷ��ַ������޸�","M06000":"�㻹û�а��ֻ���","M06001":"����ֻ���","M06002":"���ѳɹ����ֻ���","M06003":"��������ֻ��Ų���ȷ��","M06004":"���ѳɹ����ֻ���","M06005":"���ֻ����ѱ����˰󶨣���������Ƿ���ȷ��","M06006":"��������ȷ��","M07001":"�㻹û����д���ݣ�����д���ύ��","M07002":"ͼƬ�ϴ�ʧ�ܣ�","M07003":"���ϴ��ļ���С������5M��ͼƬ��","M07004":"���ϴ�jpg��gif��png��ʽ��ͼƬ��","M07005":"�����û����ã����޷��������ۡ�","M08001":"ȷ��Ҫɾ����#{name}֮������жԻ���","M08002":"ȷ��Ҫɾ�������Ի���","M08003":"ȷ��ɾ��֪ͨ��","M08004":"��û��ѡ��Ҫɾ����֪ͨ","M09001":"�ռ��˲�����","M09002":"�벻Ҫ���Լ�����˽��","M09003":"˽�ŷ��ͳɹ�","M09004":"����û�й�ע�㣬��ʱ���ܷ�˽�Ÿ���Ŷ��","M09005":"����û�й�ע�㣬��ʱ���ܷ�˽�Ÿ���Ŷ��","M10001":"���ղع���΢����","M11001":"΢��ģ����ӳɹ�","M11002":"���ʧ�ܣ������ԣ�","M11003":"����΢��ȱ�ٲ���styleid","M12001":"δ��MSN��","M12002":"�Ѱ�MSN��","M12003":"��MSN�ʺ��ѱ�����΢���ʺŰ󶨡�","M12101":"����20���ַ���~����������ɣ�","M12102":"���зǷ��ַ������޸�","M13001":"���ݶԷ������ã��㲻�ܽ��д˲�����","M13002":"���û�����ĺ�������뵽��΢����ҳ������ټӹ�ע��","M13003":"���ܽ�ϵͳ�û������������","M13004":"����ӵĺ������û��Ѵ����ޣ������Ҫ������ӣ����Ƚ����еĺ������û������","M14001":"�������Ӳ���Ϊ�գ�","M14002":"��������ļ���ʽ����ȷ:)","M14003":"���������ֲ���Ϊ�գ�","MR0001":'�����볣�����䣬<a href="/reg_sinamail.php">û�����䣿</a>',"MR0002":"��������ȷ�������ַ��","MR0003":"��������ĳ������䣬�磺example@example.com<br />������Ϊ��δ���ĵ�¼�˺�","MR0004":'������ô�����<a href="#" onclick="App.ModLogin();return false;">��¼</a>Ŷ��',"MR0005":'�������ַ�ѱ�ע�ᣬ����<a href="#" onclick="App.ModLogin();return false;">��¼��</a>',"MR0006":'�������ַ�ѱ�ע�ᣬ����<a href="#" onclick="App.ModLogin();return false;">��¼��</a>',"MR0010":"���в�����ĸ�����ֵ��ַ������޸ġ�","MR0011":"ֻ��6-16λ���룬���޸ġ�","MR0012":"������6-16λ����ĸ�����֡���ǡ�.������-������?�����»������","MR0020":"������������벻һ�£����޸ġ�","MR0021":"���ٴ���������","MR0030":"������4-20λ������Ӣ�ġ����ֺ�����","MR0031":"�������ǳơ�","MR0032":"������4����ĸ���ϵ��ǳơ�","MR0033":"�ǳƲ��ܳ���20����ĸ��10�����֡�","MR0034":"���зǷ��ַ������޸ġ�","MR0035":"�ǳƲ���ȫ�����֣����޸ġ�","MR0036":"�ǳ��ѱ�����ʹ�ã����޸ġ�","MR0040":"��ѡ��ʡ��","MR0050":"��������֤��","MR0060":"������ע��������","MR0061":"������ע��������","MR0062":"�����벻��ȷ","MR0063":"�������ѹ���","MR0070":"�������ѹ���","MR0071":"��Ҫͬ�⡶�����������ʹ��Э�顷","MR0100":"������������","MR0101":"��������ȷ���û���","MR0102":"ֻ������4-16λ�����޸�","MR0103":"���������ѱ�ע���ˣ���һ����","MR0104":"��ѡ�������ѯ����","MR0105":"4-16λ֮�䣬����Ӣ��Сд�����֡��»���","MR0106":"4-32����ĸ��֧�ִ�Сд�������ֻ�2-16������","MR0107":"�����������ѯ����","MR0108":"ֻ������4-32���ַ������޸�","MR0109":"���ܰ��������ַ������޸�","MR0110":"������6-80�����֡���ĸ��3-40������","MR0111":"������6-80�����֡���ĸ��3-40������","MR0112":"","MR0113":"������6-80λ�ַ������޸�","MR0114":"ֻ���������ĺ���ĸ�����޸�","MR0115":"�����һش𰸲��ܺ�������ͬ","MR0116":"�����������һش�","MR0117":"����������ȫΪ���֣����޸�","MR0118":"��ȥ����������β���»���","MR0119":"���������ܰ����ո�","R00041":"��ǰ������δ����.�޸�������Ŀ�����µ�ǰ���ڱ༭�����϶�ʧ���Ƿ������","R00042":"ȷ���Ƿ�ɾ����ѧУ��Ϣ","R00043":"ȷ���Ƿ�ɾ���˹�����Ϣ ","R00044":"���������ƣ�25������","R00045":"������дѧԺ���༶��ϵ�����Ϣ��70������","R00046":"������д���š����ְλ����Ϣ��70������","R01001":"�ǳ���ʹ��4��20���ַ������Ļ���ĸ����Ҫ���пո�","R01002":"����demo@sina.com.cn","R01003":"����17006666","R01004":"����demo@hotmail.com","R01005":"�벻Ҫ����70���֡�","R01006":"��ĸ�д�Сд֮�֣�6��16λ������Ӣ��(A-Z,a-z)������(0-9)����ǡ�.������-������?�����»��ߡ� ","R01007":"������֤������","R01008":"�������Ѿ�ע��","R01101":"������֤�����룬����󲻿��޸�","R01102":"����д��ʵ����������������ϵ�㡣������ϲ���͸¶���κ��ˡ�","R01404":"ͨ��ʧ��","R01405":"��������ȷ���ʼ���ַ","R01406":"���û��Ѽ����δ��¼","R01407":"�ʼ��ط�ʧ��","R01408":"��������������벻һ��ѽ��","R01409":"���������֤���д���","R01410":"����ӦΪ5��64λ","R01411":"ȱʧ����@","R01412":"����ӦΪ����������","R01413":"�����ʽ���Ϸ�","R01414":"�����е��»��߲��������","R01415":"��ʵ����ӦΪ4��16λ","R01416":"��ʵ����ֻ���ɺ��֣����Ӣ����ĸ���","R01417":"֤�����Ͳ���ȷ","R01418":"֤����ӦΪ3��20λ","R01419":"���֤���벻��ȷ","R01420":"֤�����벻�ܺ��й��ַ�","R01421":"���зǷ��ַ������޸�","R01422":"����20���ַ���~����������ɣ�","R01423":"����������Ϊ��","R01424":"�������Ѿ�����","R01425":"ֻ������4-16λ�����޸�","R01426":"������������Ӣ��Сд�����֡��»������","R01427":"�������������»��߿�ʼ�����","R01428":"����������ȫΪ���֣����޸�","R01429":"��ʾ�������","R01430":"����𰸲�����������ͬ","R01431":"�����ֻ������6-80���ַ������޸� ","R01432":"�����ֻ���������ĺ���ĸ�����޸�","R01433":"���ⳤ��Ӧ��4-32���ֽ�֮��","R01434":"���ⲻ�ܰ��������ַ�","R01435":"������ʾ�𰸲����Կո��»��߿�ʼ�����","R01436":"������ʾ���ⲻ���Կո��»��߿�ʼ�����","R01437":"���������Ϸ�"
});
$SYSMSG.extend({
	"R01007":"<p class=stxt2>1�������¼���������ַ��</p><p class=stxt>������ȫ�ƣ�����yourname@sina.com.cn</p><p class=stxt2>2�������¼����Сд�Ƿ���ȷ��</p><p class=stxt2>3�����������Сд�Ƿ���ȷ��</p>","R01008":"����/UC��/��Ա�ʺ�/�ֻ���","CR0001":"�������ֻ���","R01009":"������ע��������","M04002":"�ؼ��ʲ���Ϊ��","R01010":"<p class=stxt2>�뵽ע��ȷ���ʼ��м����˻���</p><p class=stxt2>���ߣ�<a target=_blank href=/reg/resend.php?user=#{mail}  >�ط�ȷ���ʼ�</a>��</p>","R01011":"���˻���δ����"
});
Sina.pkg("Core.Events");
Core.Events.addEvent=function (elm,func,evType,useCapture) {
	var _el=$E(elm);
	if(_el==null) {
		trace("addEvent �Ҳ�������"+elm);
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
};
Core.Events.removeEvent=function (oElement,fHandler,sName) {
	var _el=$E(oElement);
	if(_el==null) {
		trace("removeEvent �Ҳ�������"+oElement);
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
};
Function.prototype.bind2=function (object) {
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
};
Utils.Template=function (tmpl) {
	this.tmpl=tmpl;
	this.pattern=/(#\{(.*?)\})/g
};
Utils.Template.prototype={
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
};
App.Dialog.BasicDialog.prototype={
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
	var title=config.title?config.title:"��ʾ";
	var ok_label=config.ok_label?config.ok_label:"ȷ��";
	if(typeofmsg=="object") {
		msg=App.getMsg(msg.code,msg.replace)
	}var callback=config.ok?config.ok:null;
	var basic_conf={
	};
	basic_conf["width"]=config.width?config.width:360;
	basic_conf["height"]=config.height;
	basic_conf["zIndex"]=config.zIndex?config.zIndex:1000;
	basic_conf["hidden"]=config["hidden"];
	var tpl='<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="http://simg.sinajs.cn/miniblog/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					<strong>#{cnt}</strong>                                	<div class="btn">						<a href="javascript:;" id="#{btn_id}" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">'+ok_label+'</cite></span></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
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
	var title=config.title?config.title:"��ʾ";
	var ok_label=config.ok_label?config.ok_label:"ȷ��";
	var cancel_label=config.cancel_label?config.cancel_label:"ȡ��";
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
	basic_conf["width"]=config.width?config.width:360;
	basic_conf["height"]=config.height;
	basic_conf["zIndex"]=config.zIndex?config.zIndex:1000;
	basic_conf["hidden"]=config["hidden"];
	var tpl='<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="http://simg.sinajs.cn/miniblog/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					#{cnt}			        	#{des}                                	<div class="btn">						<a href="javascript:;" id="ok_#{t}" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">'+ok_label+'</cite></span></a>						<a href="javascrpt:;" id="cancel_#{t}" class="mBlogBtn2"><span class="mbtnR"><cite class="btnTxt">'+cancel_label+'</cite></span></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
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
	var title=config.title?config.title:"��ʾ";
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
		}btn.innerHTML='<span class="mbtnR"><cite class="btnTxt">'+btns[i].text+"</cite></span>";
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
		trace("j2o : ���ݷ�������");
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
				var errorHTML='<div class="errorLayer" id="mod_login_tip" style="visibility:hidden">				<div class="top"></div>			    <div class="mid">			    	<div class="close"><a href="javascript:void(0)" onclick="App.fixElement.hidden()" id="mod_login_close"><img src="http://simg.sinajs.cn/miniblog/images/index/fbqimgclose.gif" /></a></div>			        <div class="conn">			        		<p class="bigtxt" id="mod_login_title"></p>				            <span class="stxt" id="mod_login_content" style="padding:0px;"></span>			        </div>			    </div>			    <div class="bot"></div>			</div>			';
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
	var sinaSSOConfig={
		"feedBackUrl":"http://t.sina.com.cn/ajaxlogin.php","service":"miniblog","domain":"sina.com.cn","framelogin":"1","pageCharset":"utf-8","isCheckLoginState":false,"customLoginCallBack":function () {
		},"customUpdateCookieCallBack":function () {
		}
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
			cfg.error("��¼������Ϊ��");
			return
		}else {
			if(!login_pwd) {
				cfg.error("���������");
				return
			}
		}if(!sinaSSOController) {
			alert("SSO Login script is required!!!\n This page must include this script:http://i.sso.sina.com.cn/js/ssologin.js");
			return false
		}var Login=sinaSSOController;
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
	App.ModLogin=function (callBackFunction,title) {
		var tit=title||"ͨ��֤��¼";
		var regurl="/reg.php";
		var recoverurl="http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
		var rnd=(new Date()).getTime();
		var html='<div class="loginLayer" id="login_wrap'+rnd+'">            	<table>                  <tbody>				  <tr>			      	   <th scope="row"/>	                        <td id="login_tip'+rnd+'"></td>	                    </tr>				  <tr>                    <th scope="row">��¼��&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="1" type="text" name="loginname" id="loginname'+rnd+'" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="'+regurl+'" target="_blank">ע��</a></td>                  </tr>                  <tr>                    <th scope="row">��  ��&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="2" type="password" name="password" id="password'+rnd+'" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="'+recoverurl+'" target="_blank">�һ�����</a></td>                  </tr>                  <tr>                    <th scope="row"/>                    <td><input type="checkbox" id="isremember'+rnd+'"  checked="checked"/><label>��ס��¼״̬</label><p class="adminTs">����������/����������ȡ����ѡ��</p></td>                    <td/>                  </tr>                  <tr>                    <th scope="row"/>                    <td><a href="javascript:void(0);" id="login_submit'+rnd+'" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">ȷ��</cite></span></a></td>                    <td/>                  </tr>                </tbody></table>            </div>';
		var cfg={
			width:390,zIndex:1000
		};
		var dialog=new App.Dialog.BasicDialog(tit,html,cfg);
		var disableClass="mBlogBtn2";
		var enableClass="mBlogBtn";
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
		(oConfig=oConfig||{
		})["hidden"]=true;
		var oAlert=App[sDialogType||"alert"](sText,oConfig);
		if(oFromTarget) {
			App.doFlyOut(oFromTarget,oAlert._node,{
				resFun:function () {
					try{
						oAlert.show()
					}catch(e) {
					}
				},"style":"border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",time:0.75
			})
		}else {
			oAlert.show()
		}return oAlert
	};
	$registJob("initSearch",function () {
		App.search("m_keyword","m_submit","m_search",30,"�������⡢����...")
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
				var html='<span>��ѡ��������Χ</span>						<ul id="'+id+'_content">							<li class="cur" style="cursor:pointer">��<cite id="'+id+'_blog" ></cite>��΢��</li>							<li style="cursor:pointer">��Ϊ<cite id="'+id+'_author" ></cite>����</li>						</ul>					';
				var wrap=document.createElement("div");
				wrap.className="resultTip";
				wrap.id=id;
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
			if(Core.String.byteLength(str)>=this.maxLen) {
				str=Core.String.leftB(str,this.maxLen)+"..."
			}this.searchBlog.innerHTML=str;
			this.searchAuthor.innerHTML=str;
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
			p.className="addBtn2";
			url="/attention/aj_addfollow.php";
			p.innerHTML="<span>�ѹ�ע��<a onclick=\"App.removeFollow('"+uid+"',this,'"+name+'\')" href="javascript:void(0);">ȡ��</a></span>'
		}else {
			p.className="addBtn";
			url="/attention/aj_delfollow.php";
			p.innerHTML='<a class="SG_aBtn SG_aBtnB SG_aBtn_ico" onclick="App.followOne(\''+uid+"',this,'"+name+'\')" href="javascript:void(0);"><cite><img height="8" align="absmiddle" width="8" title="�ӹ�ע" src="http://simg.sinajs.cn/miniblog/images/common/sg_trans.gif" class="SG_icon"/>�ӹ�ע</cite></a>'
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
		App.followOper("add",uid,el,{
			uid:uid,fromuid:scope.$uid
		},name)
	};
	App.removeFollow=function (uid,el,name) {
		App.flyDialog("ȷ��Ҫȡ����ע"+name+"?","confirm",el,{
			ok:function () {
				App.followOper("remove",uid,el,{
					touid:uid,fromuid:scope.$uid
				},name)
			}
		})
	};
	App.focusblur=function (event,el,txt) {
		el=$E(el);
		txt=txt||"������������...";
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
	App.rankDialog=function (rank,point) {
		function transforms(r) {
			var str=[];
			for(var i=0,r=r.split("");i<r.length;i++) {
				str.push('<img src="http://simg.sinajs.cn/miniblog/images/common/'+r[i]+'.gif" />')
			}return str.join("")
		}var conf={
			title:"΢���ȼ�",width:550,height:700,zIndex:1000,btns:[{
				text:"ȷ��",func:function () {
				}
			}]
		};
		var content='					<div class="gradeLayer">						<div class="title"><strong>��ǰ�ȼ���'+transforms(rank)+" ��</strong>����һ������<span>"+point+'</span>��</div>						<div class="gradeSm">΢���ȼ��Ƕ��û��������ֵĹ����������û�����Ϊ�Ƿֻ�����ɡ�</div>							<div>Ŀǰ��������ΪӰ��΢�����֣�</div>								<table class="gradeTab">								<tr><th class="th_1">��Ϊ</th><th>����</th></tr>								<tr><td class="td_1">���ֻ�</td><td class="td_2"><span class="red">+100</span><em>(ÿ���ʺ�ֻ����һ��)</em></td></tr>								<tr><td class="td_1">��¼</td><td class="td_2"><span class="red">+20</span><em>(һ��ֻ����һ��)</em></td></td></tr>								<tr><td class="td_1">����΢��<em>(ͨ���κ���������)</em></td><td class="td_2"><span class="red">+20</span></td></tr>								<tr><td class="td_1">����΢��</td><td class="td_2"><span class="red">+10</span></td></tr>								<tr><td class="td_1">ת��΢��</td><td class="td_2"><span class="red">+20</span></td></tr>								<tr><td class="td_1">�ղػ���</td><td class="td_2"><span class="red">+20</span></td></tr>								<tr><td class="td_1">���˽�������������ע��</td><td class="td_2"><span class="red">+50</span></td></tr>								<tr><td class="td_1">΢��������ת��</td><td class="td_2"><span class="red">+10</span></td></tr>								<tr><td class="td_1">΢������������</td><td class="td_2"><span class="red">+10</span></td></tr>								<tr><td class="td_1">�Լ�ɾ��΢��</td><td class="td_2"><span class="blue">-20</span></td></tr>								<tr><td class="td_1">�Լ�ɾ������</td><td class="td_2"><span class="blue">-10</span></td></tr>								<tr><td class="td_1">�Լ�ɾ���ղػ���</td><td class="td_2"><span class="blue">-20</span></td></tr>								</table>						<div class="ts">						<p class="color1">ע�⣺</p>						<p>1.ÿ�ջ�������߷������ƣ��ȼ�Խ�ߣ�ÿ�տɻ�����Խ�ߡ�</p>						<p>2.���΢��������Ϊ�����ϵ��ط��ɡ��������ɾ������ô���ۻ��ֻ�ܸ�Ŷ</p>						</div>					</div>					';
		App.customDialog(content,conf)
	};
	Core.Array.findit=function (arr,v) {
		var k=-1;
		Core.Array.foreach(arr,function (value,index) {
			if(v==value) {
				k=index
			}
		});
		return k
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
		Group.prov0="����/����";
		Group.code0="0";
		Group.prov34="�Ϸ�,�ߺ�,����,����,��ɽ,����,ͭ��,����,��ɽ,����,����,����,����,����,����,����,����";
		Group.code34="1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18";
		Group.prov11="������,������,������,������,������,��̨��,ʯ��ɽ��,������,��ͷ����,��ɽ��,ͨ����,˳����,��ƽ��,������,������,ƽ����,������,������";
		Group.code11="1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,28,29";
		Group.prov50="������,������,������,��ɿ���,������,ɳƺ����,��������,�ϰ���,������,��ʢ��,˫����,�山��,������,ǭ����,������,�뽭��,������,ͭ����,������,�ٲ���,�ɽ��,��ƽ��,�ǿ���,�ᶼ��,�潭��,��¡��,����,����,������,�����,��ɽ��,��Ϫ��,ʯ��������������,��ɽ����������������,��������������������,��ˮ����������������,������,�ϴ���,������,�ϴ���";
		Group.code50="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,81,82,83,84";
		Group.prov35="����,����,����,����,Ȫ��,����,��ƽ,����,����";
		Group.code35="1,2,3,4,5,6,7,8,9";
		Group.prov62="����,������,���,����,��ˮ,����,��Ҵ,ƽ��,��Ȫ,����,����,¤��,����,����";
		Group.code62="1,2,3,4,5,6,7,8,9,10,24,26,29,30";
		Group.prov44="����,�ع�,����,�麣,��ͷ,��ɽ,����,տ��,ï��,����,����,÷��,��β,��Դ,����,��Զ,��ݸ,��ɽ,����,����,�Ƹ�";
		Group.code44="1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,51,52,53";
		Group.prov45="����,����,����,����,����,���Ǹ�,����,���,����,��ɫ,����,�ӳ�,����,����";
		Group.code45="1,2,3,4,5,6,7,8,9,10,11,12,21,22";
		Group.prov52="����,����ˮ,����,��˳,ͭ��,ǭ����,�Ͻ�,ǭ����,ǭ��";
		Group.code52="1,2,3,4,22,23,24,26,27";
		Group.prov46="����,����,����";
		Group.code46="1,2,90";
		Group.prov13="ʯ��ׯ,��ɽ,�ػʵ�,����,��̨,����,�żҿ�,�е�,����,�ȷ�,��ˮ";
		Group.code13="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov23="������,�������,����,�׸�,˫Ѽɽ,����,����,��ľ˹,��̨��,ĵ����,�ں�,�绯,���˰���";
		Group.code23="1,2,3,4,5,6,7,8,9,10,11,12,27";
		Group.prov41="֣��,����,����,ƽ��ɽ,����,�ױ�,����,����,���,���,���,����Ͽ,����,����,����,�ܿ�,פ���";
		Group.code41="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
		Group.prov42="�人,��ʯ,ʮ��,�˲�,�差,����,����,Т��,����,�Ƹ�,����,����,��ʩ����������������";
		Group.code42="1,2,3,5,6,7,8,9,10,11,12,13,28";
		Group.prov43="��ɳ,����,��̶,����,����,����,����,�żҽ�,����,����,����,����,¦��,��������������������";
		Group.code43="1,2,3,4,5,6,7,8,9,10,11,12,13,31";
		Group.prov15="���ͺ���,��ͷ,�ں�,���,ͨ��,������˹,���ױ���,�˰���,���ֹ�����,�����첼��,�����׶���,��������";
		Group.code15="1,2,3,4,5,6,7,22,25,26,28,29";
		Group.prov32="�Ͼ�,����,����,����,����,��ͨ,���Ƹ�,����,�γ�,����,��,̩��,��Ǩ";
		Group.code32="1,2,3,4,5,6,7,8,9,10,11,12,13";
		Group.prov36="�ϲ�,������,Ƽ��,�Ž�,����,ӥ̶,����,����,�˴�,����,����";
		Group.code36="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov22="����,����,��ƽ,��Դ,ͨ��,��ɽ,��ԭ,�׳�,�ӱ߳�����������";
		Group.code22="1,2,3,4,5,6,7,8,24";
		Group.prov21="����,����,��ɽ,��˳,��Ϫ,����,����,Ӫ��,����,����,�̽�,����,����,��«��";
		Group.code21="1,2,3,4,5,6,7,8,9,10,11,12,13,14";
		Group.prov64="����,ʯ��ɽ,����,��ԭ";
		Group.code64="1,2,3,4";
		Group.prov63="����,����,����,����,����,����,����,����";
		Group.code63="1,21,22,23,25,26,27,28";
		Group.prov14="̫ԭ,��ͬ,��Ȫ,����,����,˷��,����,�˳�,����,�ٷ�,����";
		Group.code14="1,2,3,4,5,6,7,8,9,10,23";
		Group.prov37="����,�ൺ,�Ͳ�,��ׯ,��Ӫ,��̨,Ϋ��,����,̩��,����,����,����,����,����,�ĳ�,����,����";
		Group.code37="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
		Group.prov31="������,¬����,�����,������,������,������,բ����,�����,������,������,��ɽ��,�ζ���,�ֶ�����,��ɽ��,�ɽ���,������,�ϻ���,������,������";
		Group.code31="1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,30";
		Group.prov51="�ɶ�,�Թ�,��֦��,����,����,����,��Ԫ,����,�ڽ�,��ɽ,�ϳ�,üɽ,�˱�,�㰲,����,�Ű�,����,����,����,����,��ɽ";
		Group.code51="1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,32,33,34";
		Group.prov12="��ƽ��,�Ӷ���,������,�Ͽ���,�ӱ���,������,������,������,�����,������,������,������,������,������,������,������,������,����";
		Group.code12="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,23,25";
		Group.prov54="����,����,ɽ��,�տ���,����,����,��֥";
		Group.code54="1,21,22,23,24,25,26";
		Group.prov65="��³ľ��,��������,��³��,����,����,��������,��������,������,��������,��ʲ,����,����,����,����̩";
		Group.code65="1,2,21,22,23,27,28,29,30,31,32,40,42,43";
		Group.prov53="����,����,��Ϫ,��ɽ,��ͨ,����,���,��ɽ,˼é,��˫����,����,�º�,����,ŭ��,����,�ٲ�";
		Group.code53="1,3,4,5,6,23,25,26,27,28,29,31,32,33,34,35";
		Group.prov33="����,����,����,����,����,����,��,����,��ɽ,̨��,��ˮ";
		Group.code33="1,2,3,4,5,6,7,8,9,10,11";
		Group.prov61="����,ͭ��,����,����,μ��,�Ӱ�,����,����,����,����";
		Group.code61="1,2,3,4,5,6,7,8,9,10";
		Group.prov71="̨��,����,����";
		Group.code71="1,2,90";
		Group.prov81="���";
		Group.code81="1";
		Group.prov82="����";
		Group.code82="1";
		Group.prov400="����,Ӣ��,����,����˹,���ô�,����,�Ĵ�����,ӡ��,̩��,��������,�¼���,���ɱ�,Խ��,ӡ��,�ձ�,����";
		Group.code400="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16";
		Group.prov100="";
		Group.code100="";
		Group.provinces="����,����,����,����,����,�㶫,����,����,����,�ӱ�,������,����,����,����,���ɹ�,����,����,����,����,����,�ຣ,ɽ��,ɽ��,�Ϻ�,�Ĵ�,���,����,�½�,����,�㽭,����,̨��,���,����,����,����";
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
					provOps[0]=new Option("ʡ/ֱϽ��",0);
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
				cityOps[0]=new Option("����",1000);
				for(var i=0,len=cityCodes.length;i<len;i++) {
					cityOps[cityOps.length]=new Option(cityTexts[i],cityCodes[i])
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
		proxy.checkTrueNm=checkBase("^[a-zA-Z��s.\u4e00-\u9fa5]*$");
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
	App.finishInformation=function () {
		window.location.href="/person/full_info.php"
	};
	(function (proxy) {
		proxy.setOpacity=function (element,value) {
			element.style.filter="alpha(opacity="+value+")";
			element.style.opacity=value/100
		};
		proxy.opacity=function (element,cfg) {
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
					return false
				}proxy.setOpacity(element,_orbit[_current]);
				_current++
			})
		}
	})(App);
	$registJob("refurbishNumber",function () {
		var getDoms=function () {
			var DIVS=document.getElementsByTagName("DIV");
			var MAIN=null;
			for(var i=0,len=DIVS.length;i<len;i+=1) {
				if(DIVS[i].className=="person_atten") {
					MAIN=DIVS[i];
					break
				}
			}if(!MAIN) {
				return false
			}var ITEMS=MAIN.getElementsByTagName("DIV");
			var following=ITEMS[0];
			var follower=ITEMS[1];
			var update=ITEMS[2];
			App.refurbishFollowing=upgrade(following);
			App.refurbishFollower=upgrade(follower);
			App.refurbishUpdate=upgrade(update)
		};
		var orbit=[[20,-1,80],[22,-2,70],[24,-3,60],[28,-5,40],[32,-7,30],[36,-9,20],[36,-9,0]];
		var upgrade=function (el) {
			var num=el.getElementsByTagName("P")[0];
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
					duplicate.style.left=10-(duplicate.offsetWidth-width)/2+"px";
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
	App.ModForward=function (fid,content,uid,el,exid,forwardName,forwardContent,uname) {
		var _countTime=0;
		if(scope.$cuser_status==="nofull"&&scope.$uid!=="") {
			App.finishInformation();
			return false
		}if(uid===scope.$uid) {
			App.alert("���Լ�д��΢���ǲ���ת����Ŷ��");
			return false
		}var checkAT=function (content,name) {
			if((new RegExp("(@|��)"+name+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
				return true
			}else {
				return false
			}
		};
		var defaultTxt="˳��˵��ʲô��...";
		var forwardContentFinal="";
		var testForwardName=decodeURIComponent(forwardName);
		var testForwardContent=decodeURIComponent(forwardContent);
		var testForwardUName=decodeURIComponent(uname);
		if(forwardContent==""||forwardContent===undefined) {
			forwardContentFinal=defaultTxt
		}else {
			forwardContentFinal=" //@"+testForwardName+":"+testForwardContent
		}var title="ת�����ҵ�΢��";
		var loginStr='<div class="shareLogin">                    	<div id="loginerror_'+fid+'"></div>						<em>��¼�� </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle_'+fid+'" class="inputType"  style="width: 100px;"/></span></span>                        <em>���� </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd_'+fid+'" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clear"></div>                    </div>';
		loginStr=scope.$uid?"":loginStr;
		if(el) {
			var lastForwarderName=el.getAttribute("lastforwardername");
			var initBlogerName=el.getAttribute("initblogername")
		}var aComment=[];
		aComment.push('<div class="selSend">');
		if(lastForwarderName) {
			aComment.push('<p><input type="checkbox" id="lastForwarder" />ͬʱ��Ϊ��'+lastForwarderName+"�����۷���</p>")
		}if(initBlogerName&&initBlogerName!=lastForwarderName) {
			aComment.push('<p><input type="checkbox" id="initBloger"/>ͬʱ��Ϊ��'+initBlogerName+"�����۷���</p>")
		}aComment.push(" </div>");
		var html='			   <div class="shareLayer" id="forwardcontent_'+fid+'">                    <div class="shareTxt" id="sharecontent_'+fid+'">ת:'+decodeURIComponent(content)+'</div>					<div id="tipInfoBox'+fid+'" style="float:right;margin-right:13px;color:#008800"></div>                    <textarea class="PY_textarea" id="mdforwardtextarea_'+fid+'">'+forwardContentFinal+"</textarea>"+loginStr+aComment.join(" ")+'<div class="layerBtn">                 		<a href="javascript:void(0);" id="mdforwardbtn_'+fid+'" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">ת��</cite></span></a><a href="javascript:void(0)" id="mdforwardcancel_'+fid+'" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">ȡ��</cite></span></a>                 </div>                </div>';
		var cfg={
			width:390,zIndex:1000,hidden:true
		};
		var dialog=new App.Dialog.BasicDialog(title,html,cfg);
		var mdforwardtextarea=$E("mdforwardtextarea_"+fid);
		var tipStringOK="����������<em>${num}</em>������";
		var tipStringErr="�Ѿ�����<em>${num}</em>������";
		var forwardInputLimit=function () {
			var num=Math.ceil(Core.String.byteLength(Core.String.trim(mdforwardtextarea.value))/2);
			if(num>140) {
				$E("tipInfoBox"+fid).innerHTML=tipStringErr.replace(/\$\{num\}/,(maxlen/2-num)*(-1));
				$E("tipInfoBox"+fid).style.color="#880000";
				return false
			}else {
				$E("tipInfoBox"+fid).innerHTML=tipStringOK.replace(/\$\{num\}/,(maxlen/2-num));
				$E("tipInfoBox"+fid).style.color="#008800";
				return true
			}
		};
		if(el) {
			App.doFlyOut(el,dialog._node,{
				resFun:function () {
					try{
						dialog.show();
						$E("mdforwardtextarea_"+fid).focus();
						if($IE) {
						}else {
							$E("mdforwardtextarea_"+fid).setSelectionRange(0,0)
						}forwardInputLimit()
					}catch(e) {
					}
				},"style":"border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",time:0.5
			})
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
		var disClass="mBlogBtn2";
		var enableClass="mBlogBtn";
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
				reason:reason.replace(/\uff20/ig,"@"),mid:fid
			};
			if(scope.$pageid=="search") {
				postdata.from="search"
			}if((scope.$pageid=="myprofile"||scope.$pageid=="search")&&scope.$feedtype!="isori") {
				postdata.isindex=1
			}var cb=function (data,json) {
				var _times=(new Date()).getTime()-_countTime;
				var _scriptDom=document.createElement("SCRIPT");
				_scriptDom.src="http://v.t.sina.com.cn/c.html?type=forward&load_delay="+_times;
				document.body.appendChild(_scriptDom);
				if(postdata.isLast) {
					var comments=$E("_comment_count_miniblog_"+fid);
					if(comments&&comments.getElementsByTagName("strong").length<0) {
						comments.innerHTML=comments.innerHTML+"<strong>(1)</strong>"
					}else {
						var connter=$E("_comment_count_miniblog_"+fid).getElementsByTagName("strong")[0];
						if(connter) {
							var count=parseInt(connter.innerHTML.replace(/\(|\)/g,""));
							count++;
							connter.innerHTML="("+count+")"
						}
					}
				}dialog.close();
				var cbdia=App.alert("ת���ɹ�",{
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
							}Core.Dom.insertHTML(feedlist,data.html,"AfterBegin");
							if(data.isvideo=="1") {
								App.bindvideo(feedlist)
							}
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
			}_countTime=(new Date()).getTime();
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
					errortTip("�������¼��",name);
					return false
				}else {
					App.fixElement.hidden()
				}if(!pwdstr) {
					errortTip("����������",pwd);
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
				el.className="mBlog_linedot1 cur";
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
				el.className="mBlog_linedot1";
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
	Core.String.encodeHTML=function (str) {
		var div=document.createElement("div");
		div.appendChild(document.createTextNode(str));
		return div.innerHTML.replace(/\s/g,"&nbsp;")
	};
	App.admin_uid_list=["1257113795","1642909335","1658688240","1661523401"];
	App.followadd=function (uid,el,url) {
		url="/attention/aj_addfollow.php";
		while(el.nodeName.toLowerCase(0)!="p") {
			el=el.parentNode
		}function cb(json) {
			if(scope.$pageid=="follow"&&scope.$oid==scope.$uid) {
				el.innerHTML='<img class="sicon_3" src="http://simg.sinajs.cn/miniblog/images/common/transparent.gif"/>';
				el.className="mutual"
			}else {
				el.innerHTML='<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"></span>�ѹ�ע</a>'
			}
		}App.followOperation({
			uid:uid,fromuid:scope.$uid
		},url,cb)
	};
	App.followcancel=function (uid,el,act,name,sex) {
		sex=sex||"TA";
		var stxt="�Ƴ�֮��ȡ��"+sex+"����Ĺ�ע";
		if(Core.Array.findit(App.admin_uid_list,uid)===-1) {
			stxt+="<div style='margin-top:10px;font-size:14px;'>"+"<input style='vertical-align:-1px;margin-right:3px;' type='checkbox' id='block_user'>ͬʱ�����û����������</div>"
		}var msg=act==1?{
			des:stxt,html:"ȷ��Ҫ�Ƴ�"+name+"?"
		}:("ȷ��Ҫȡ����ע"+name+"?");
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
		var sucStr="�������Ӹ��Ƴɹ��� ��������ÿ�ݷ�ʽCtrl+V��ճ����UC��QQ��MSN�����칤���С�";
		var options={
			icon:3
		};
		if(App.copyText(copytext.value)==false) {
			sucStr="����������֧�ֽű����ƻ���ܾ����������ȫȷ�ϣ��볢���ֶ�[Ctrl+C]���ơ�";
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
						add.innerHTML='<img class="sicon_3" src="http://simg.sinajs.cn/miniblog/images/common/transparent.gif"/>';
						add.className="mutual"
					}else {
						add.innerHTML='<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"/>�ѹ�ע</a>'
					}
				}
			}
		}function cb() {
			changeBGcolor(uids);
			App.promptTip("�ѹ�ע�ɹ���",null,"system_information");
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
	};
	App.followRemarkAdd=function (el,fid,oldMark) {
		var initErrorTip="����8��������Ϊ�������������";
		var html='<div style="width:390px;" class="layerBoxCon">'+'<div class="inviteLayer"><p class="flName">���ñ�ע����</p><div class="inviteLayerInput">'+'<input type="text" class="PY_input" id="remark" value="" >'+'<a id="submit" href="javascript:;" class="mBlogBtn" style="position:relative;">'+'<span class="mbtnR"><cite class="btnTxt">����</cite></span></a></div>'+'<p class="errorTs" id="errorTip" style="display:none;">'+initErrorTip+"</p>"+"</div></div></div>";
		var cfg={
			width:390,zIndex:1000,hidden:true
		};
		var dialog=new App.Dialog.BasicDialog("����",html,cfg);
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
				if(remarkName&&name) {
					remarkName.innerHTML="&nbsp;��"+Core.String.encodeHTML(name)+"��"
				}if(remarkName&&name=="") {
					remarkName.innerHTML=""
				}
			},function () {
				if(arguments[0]&&arguments[0].code) {
					errorTip.innerHTML=$SYSMSG[arguments[0].code];
					errorTip.style.display="block"
				}else {
					App.alert("���ñ�עʧ��!",{
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
			newDom.innerHTML="�ѹ�ע";
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
			"limit":600,"postUrl":"/message/addmsg.php","normClass":"mBlogBtn","disabledClass":"mBlogBtn2"
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
						if(!nick||nick=="������Է��ǳ�") {
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
					if(n.value=="������Է��ǳ�") {
						n.value=""
					}n.style.color="#333333"
				}
			})(oElement.nick),"focus");
			Core.Events.addEvent(oElement.nick,(function (n) {
				return function () {
					if(Core.String.trim(n.value)=="") {
						n.value="������Է��ǳ�"
					}n.style.color="#999999"
				}
			})(oElement.nick),"blur");
			oElement.nick.value=oElement.nick.value||"������Է��ǳ�";
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
				}return spec[key]
			};
			return that
		};
		var infoTips=function (spec) {
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
			dropper.get("box").className=spec["class"];
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
			var getData=function (key,cb) {
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
						spec.ok(dropper.get("current").get("value"),dropper.get("current").get("text"))
					}spec.input.blur()
				}
			},"keypress");
			var start=function () {
				timeHandle=setInterval(loop,100*spec.timer);
				spec.searching="";
				spec.emptykey=""
			};
			var end=function () {
				clearInterval(timeHandle);
				dropper.hidd();
				spec.searching="";
				spec.emptykey="";
				if("v"=="\v") {
					frame.style.display="none"
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
					},0)
				}else {
					getData(spec.input.value,callback)
				}
			};
			adEvent(spec.input,start,"focus");
			adEvent(spec.input,end,"blur");
			spec.searching="";
			spec.emptykey="";
			var that={
			};
			that.get=function () {
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
			spec["input"].value=text;
			if(spec["select"]&&typeofspec["select"]=="function") {
				spec["select"](value,text)
			}
		};
		spec["timer"]=spec["timer"]||5;
		spec["style"]=spec["style"]||"width:"+spec["input"].clientWidth+"px;position:absolute;z-Index:1200;";
		spec["light"]=spec["light"]||function (el) {
			el.className="bg"
		};
		spec["dark"]=spec["dark"]||function (el) {
			el.className=""
		};
		spec["class"]=spec["class"]||"co_sl_2";
		spec["type"]=spec["type"]||"ajax";
		spec["data"]=spec["data"]||"/attention/aj_chooser.php?key="+spec["input"].value+"&type="+spec["searchtype"];
		spec["itemStyle"]="overflow:hidden;height:20px";
		App.autoComplate(spec)
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
		var html='<table class="noteTab2">                    <tr>                    	<th>����&nbsp;</th><td><textarea id="popUpEditor" class="PY_input"></textarea></td>                    </tr><tr>                    	<th>����&nbsp;</th><td><input id="popUpNick" type="text" style="width:222px" class="PY_input" value="'+(nick||"")+'"/>&nbsp;&nbsp;<a id="popUpSubmit" href="javascript:void(0);" class="mBlogBtn" style="margin-left:10px"><span class="mbtnR"><cite class="btnTxt">����</cite></span></a></td>                    </tr>                    <tr>                    	<th></th><td> <p id="popUpError" style="display:none" class="errorTs2">�������</p><p class="ms">˵����˽��ֻ�ܷ�����˿�����Ȳ��ܳ���300�֡�</p></td>                    </tr>                </table>';
		var c={
			width:430,zIndex:1000,hidden:true
		};
		var oDialog=new App.Dialog.BasicDialog("��˽��",html,c);
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
				case "bmiddle":result="http://ss"+domainNum+".sinaimg.cn/bmiddle/"+id+"&690";
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
							elements["imgName"].innerHTML=filename||"ͼƬ����";
							elements["imgPerch"].style.display="";
							elements["imgPerch"].value=cfg["pid"];
							elements["imgPre"].innerHTML='<img src="'+_imgURL(cfg["pid"],"small")+'" /></td>';
							if(!_trim(elements["editor"].value.replace("#�������������Զ��廰��#","")).length) {
								elements["editor"].value="����ͼƬ";
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
					var len=_trim(str.replace(/(#�������������Զ��廰��#)/g,"")).length;
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
						elements["info"].className="fbqCount";
						elements["info"].innerHTML='�㻹��������<em class="bold">'+(140-len)+"</em>��"
					}else {
						elements["info"].className="fbqCount2";
						elements["info"].innerHTML='�ѳ���<em class="bold">'+(140-len)*(-1)+"</em>��"
					}
				};
				var _limit=function (event) {
					if(event&&event.ctrlKey==true&&(event.keyCode=="13"||event.keyCode=="10")) {
						return
					}if(_testlimit(_countInfo)) {
						if(!_submitKey) {
							elements["submit"].className="btn";
							_submitKey=true
						}
					}else {
						elements["submit"].className="btn2";
						_submitKey=false
					}
				};
				var _addFeed=function (feedStr,isvideo) {
					if(config["feedTitle"]) {
						var feedBox=document.createElement("DIV");
						if(scope["$pageid"]=="mymblog") {
							feedBox.className="feedList noAvatar"
						}else {
							feedBox.className="feedList"
						}feedBox.innerHTML=feedStr;
						if($E("feed_msg_panel")) {
							_insertAfter(feedBox,$E("feed_msg_panel"))
						}else {
							_insertAfter(feedBox,config["feedTitle"])
						}if(App.refurbishUpdate) {
							App.refurbishUpdate.add(1)
						}if(isvideo=="1") {
							App.bindvideo(feedBox)
						}
					}
				};
				var _submit=function () {
					if(!_submitKey) {
						if(!_testlimit()) {
							App.cartoon.noticeInput(elements["editor"])
						}return false
					}_submitKey=false;
					elements["submit"].className="btn2";
					var content=_trim(elements["editor"].value||"");
					var pic=[_trim(elements["imgPerch"].value||"")];
					var success=function (json,parameters) {
						_clear();
						elements["editor"].parentNode.className="box_4";
						elements["editor"].style.display="none";
						setTimeout(function () {
							elements["editor"].parentNode.className="box_2";
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
								if(!(new RegExp("(@|��)"+scope.$uname+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(parameters.content)) {
									return false
								}
							}
						}setTimeout(function () {
							_addFeed(json["html"],json.isvideo)
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
					_delImg()
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
					App.insertTextArea(elements["editor"],"#"+"�������������Զ��廰��"+"#",_publishFocus)
				},"click");
				if(elements["hotopic"]) {
					_addEvent(elements["image"],function () {
						elements["hotopic"].style.display=""
					},"mouseover");
					_addEvent(elements["image"],function () {
						elements["hotopic"].style.display="none"
					},"mouseout")
				}_limit()
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
					"content":content.replace(/\uff20/ig,"@"),"pic":pic.join(","),"from":scope["$pageid"]
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
				"image":$E("publisher_image"),"topic":$E("publisher_topic"),"info":$E("publisher_info"),"editor":$E("publish_editor"),"submit":$E("publisher_submit"),"imgForm":$E("publisher_image_form"),"imgPerch":$E("publisher_perch"),"imgFile":$E("publisher_file"),"imgName":$E("publisher_perch_name"),"imgDelete":$E("publisher_perch_delete"),"imgLoading":$E("publisher_image_loading"),"imgPre":$E("publisher_preimage"),"preview":$E("publisher_imgpreview"),"hotopic":$E("publisher_tpcpreview"),"shadow":$E("publisher_shadow"),"modal":$E("publisher_modal"),"close":$E("publisher_close_shadow"),"at":$E("publisher_at")
			},{
				"feedTitle":$E("feed_title")
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
			"botton":'<a href="javascript:void(0);" onclick="App.topic.add(\'${keyword}\');return false;">��ע�û���</a>',"added":"�ѹ�ע�ɹ� (<a href=\"javascript:;\" onclick=\"App.topic.del('${keyid}','${keyword}');return false;\">ȡ����ע</a>)","item":'<span class="topic_tit"><a href="#">${keyword}</a></span><span class="topic_set"><a title="ɾ��" href="javascript:;" onclick="App.topic.del(\'${keyid}\',\'${keyword}\');return false;" class="del"/></span><div class="clear"></div>'
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
			"add":function (keyword) {
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
					var addedString=template["added"].replace(/\$\{keyword\}/g,keyword).replace(/\$\{keyid\}/g,keyid);
					element["addBox"].innerHTML=addedString;
					if(isList) {
						var topicItem=document.createElement("LI");
						topicItem.style.display="none";
						topicItem.id="topic_"+keyid;
						element["lisBox"].appendChild(topicItem);
						topicItem.innerHTML=template["item"].replace(/\$\{keyword\}/g,decodeURIComponent(keyword)).replace(/\$\{keyid\}/g,keyid);
						App.topic.list.push(topicItem);
						if(App.topic.list.length<10) {
							App.topic.more(1)
						}App.topic["list"].push(topicItem);
						element["lisTit"].innerHTML="��ע�Ļ���("+App.topic["list"].length+")"
					}
				};
				doRequest("addTopic",{
					"keyWords":keyword
				},success)
			},"del":function (keyid,keyword) {
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
							}element["lisTit"].innerHTML="��ע�Ļ���("+App.topic["list"].length+")"
						}catch(exp) {
							console.log(exp)
						}
					}if(element["addBox"]) {
						try{
							if(scope["$search"]==keyword) {
								element["addBox"].innerHTML=template["botton"].replace(/\$\{keyword\}/g,keyword)
							}
						}catch(exp) {
							console.log(exp)
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
				oNode.className="mBlogBtn2";
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
				}this.post(sUrl,oPost,Core.Function.bind3(function (oNode) {
					if(oNode.$loginDiv&&oNode.$loginuser&&oNode.$loginpassword) {
						setTimeout(function () {
							window.location.reload()
						},10);
						return
					}oNode.locked=false;
					oNode.className="mBlogBtn";
					var countPanel=$E("_comment_count_"+oNode.oParam.productId+"_"+oNode.oParam.resourceId);
					try{
						this.count(countPanel,"+")
					}catch(e) {
					}fCallBack()
				},App.Comment,[oNode]),fFail||function () {
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
		},"setCount":function (oNode,value) {
			if(value>0) {
				oNode.innerHTML="����<strong>("+value+")</strong>"
			}else {
				oNode.innerHTML="����"
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
			App.flyDialog(sText,(!fCancel)?"alert":"confirm",oTarget,{
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
				if(window.console) {
					console.log(e)
				}
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
		"SCM001":"ȷ��Ҫɾ���ûظ���","SCM002":'<input id="shieldCommentUid" type="checkbox" onclick="scope.shieldCommentUidOrNot=this.checked;" /> ��#{sNick}�����ҵĺ��������������û�'+"���޷��ٸ������硣���������˽�����в鿴�������������","SCM003":"ȷ��Ҫɾ����#{name}�ظ���","SCM004":"�Ƿ�ȷ��ɾ����ѡ����","SCM005":"���ڶԷ���������˽���ã���û��Ȩ�޷���#{action}","SCM006":"����û��ѡ��Ҫɾ��������","SCM007":"�ظ��ɹ�","SCM008":"�㻹û����д���ݣ�����д���ύ��","A00003":"��Ȩ�޲�����","A00004":"�������Բ����ڡ�","A00005":"�������ݺ��зǷ��ؼ��֡�","A-7":"��Ȩ��ɾ��","A00001":"ϵͳ��æ�����Ժ����ԡ�","S00736":"��ӵ�������ʧ�ܣ����ܴ����Ѿ�����ĺ������С�","S00015":"�û�������","A00006":"�ɹ�"
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
			})("��������/UC��/��Ա�ʺ�/�ֻ���",oUserInput,oUserPassword,oUserInput.value)
		}
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
							if(inputs[i].className==="forward"&&inputs[i].checked) {
								oPostNode.oParam.forward="1"
							}
						}var func=Core.Function.bind3(App.Comment.addComment,App.Comment,[scope.commentConfig.sPostUrl,oPostNode,function (oResult) {
							var callback=null;
							if(scope.commentConfig.params.role!==undefined&&scope.commentConfig.params.role!=-1) {
								callback=function () {
									App.alert({
										code:"M02007"
									},{
										icon:3
									})
								}
							}scope.loadCommentByPage.bind2(oPostNode)(0,1,callback)
						},function (oResult) {
							if(oResult.code=="A00003") {
								oPostNode.$loginDiv=oLoginDiv;
								oPostNode.$loginuser=oLoginuser;
								oPostNode.$loginpassword=oLoginpassword;
								oLoginDiv.style["display"]="block";
								oPostNode.className="mBlogBtn";
								oPostNode.locked=false
							}else {
								oPostNode.className="mBlogBtn";
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
				sText+="<div style='margin-top:10px;font-size:14px;'>"+"<input style='vertical-align:-1px;margin-right:3px;' type='checkbox' "+"id='block_user'>ͬʱ�����û����������</div>"
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
							scope.loadCommentByPage.bind2(oPostNode)(scope.currentCommentPage)
						}
					}
				},function (oResult) {
					if(oResult.code=="A00003") {
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
				if(inputs[i].className==="forward") {
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
							oReplyButton.className="mBlogBtn";
							if(scope.$pageid=="commentHandler") {
								var oReplayContent=$E("_comment_panel_"+oParam.productId+"_"+oParam.resourceId+"_"+oParam.cid);
								var oReplayTip=$E("_comment_paneltip_"+oParam.productId+"_"+oParam.resourceId+"_"+oParam.cid);
								if(oReplayContent&&oReplayTip) {
									oReplayTip.style.display="";
									oReplayContent.style.display="none";
									if(oForward&&oForward.parentNode) {
										oForward.parentNode.style.display="none"
									}setTimeout(function () {
										oReplayTip.style.display="none";
										oReplayContent.style.display="";
										oReplyPanel.style.display="none"
									},1000)
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
							oReplyButton.className="mBlogBtn";
							oReplyButton.locked=false
						}else {
							oReplyButton.className="mBlogBtn";
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
			oContentNode.value=sCurrentValue.replace(reg,"�ظ�"+sCname+":")
		}else {
			oContentNode.value="�ظ�@"+sCname+":"+sCurrentValue
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
											fwA.innerHTML="ԭ������<string>("+(hashList[value]||0)+")</string>"
										}else {
											fwA.innerHTML="ԭ������<string>(0)</string>"
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
		}scope.getCommentCount()
	};
	$registJob("loadComment",function () {
		scope.loadComment(scope.$pageid=="mblog"?"-1":undefined)
	});
	$registJob("more",function () {
		var _feedBox=$E("feed_box");
		var _more=$E("feed_more");
		var _last=scope["$lastid"];
		var _addEvent=Core.Events.addEvent;
		var _alert=App.alert;
		var success=function (json) {
			try{
				var _box=document.createElement("DIV");
				_box.innerHTML=json["html"];
				_box.className="feedList";
				_last=json["lastid"];
				_feedBox.appendChild(_box);
				if(scope.getCommentCount&&json["commentdata"]) {
					scope.getCommentCount(json["commentdata"])
				}if(_last=="0") {
					_more.parentNode.style.display="none"
				}_more.innerHTML="�鿴����";
				_key=false
			}catch(exp) {
				console.log(exp)
			}
		};
		var error=function (json) {
			_alert({
				"code":"����ʧ�ܣ����Ժ����ԣ�"
			});
			_key=false
		};
		var _key=false;
		App.moreFeed=function () {
			if(_key) {
				return false
			}_key=true;
			_more.innerHTML="��ȡ�С���";
			Utils.Io.Ajax.request("/mblog/aj_att_mbloglist.php",{
				"GET":{
					"mid":_last,"feedtype":scope["$feedtype"]||""
				},"onComplete":function (json) {
					if(json.code=="A00006") {
						success(json.data)
					}else {
						error(json)
					}
				},"onException":function () {
					error()
				},"returnType":"json"
			});
			return false
		};
		_addEvent(_more,App.moreFeed,"click")
	});
	$registJob("ratateImage",function () {
		if(!$E("imgContainer")) {
			return false
		}var container=$E("imgContainer");
		var bForward=container.className==="forward"?true:false;
		var defaultWidth=bForward?440:500;
		var oImg=container.firstChild;
		var imgID="img_"+(new Date().getTime());
		oImg.id=imgID;
		Core.Events.addEvent("rotateLeft",function () {
			App.rotate.rotateLeft(imgID,90,function (canvas) {
				if(bForward) {
					if(container.offsetWidth>canvas.width) {
						container.style.marginLeft=(container.offsetWidth-canvas.width)/2+"px"
					}else {
						container.style.marginLeft="0px"
					}
				}
			},defaultWidth)
		},"click");
		Core.Events.addEvent("rotateRight",function () {
			App.rotate.rotateRight(imgID,90,function (canvas) {
				if(bForward) {
					if(container.offsetWidth>canvas.width) {
						container.style.marginLeft=(container.offsetWidth-canvas.width)/2+"px"
					}else {
						container.style.marginLeft="0px"
					}
				}
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
		if(dom._imgLoaded&&dom._bigImgContainer) {
			dom.style.display="none";
			dom._bigImgContainer.style.display="block";
			var children=dom.parentNode.childNodes;
			for(var i=0,len=children.length;i<len;i++) {
				if(children[i].className.indexOf("blogPicOri")==-1) {
					children[i].style.display="none"
				}
			}return
		}else {
			var smallImg=dom.firstChild;
			dom._initW=smallImg.width;
			dom._initH=smallImg.height;
			App.getImgSize(App.imgURL(pid,"bmiddle"),getImgSize)
		}var defaultWidth=bForward?440:460;
		if(bForward&&Core.Base.detect.$IE6) {
			defaultWidth-=8
		}if(!dom.loading) {
			var loading=dom.loading=$C("img");
			loading.src="http://simg.sinajs.cn/miniblog/images/common/loading.gif";
			Core.Dom.insertAfter(loading,dom);
			with(loading.style) {
				position="absolute";
				backgroundColor="transparent";
				border="0px";
				top=dom._initH/2-10+"px";
				left=dom._initW/2-10+"px";
				width="16px";
				height="16px";
				zIndex=1
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
						zIndex=1
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
			preView.innerHTML='				<p class="oriPicOption">				  	<cite class="cls">						<a href="javascript:;" onclick="App.shrinkImg(this, \'tag\');">����</a>					</cite>					<cite class="line">|</cite>					<cite class="preview">						<a href="'+App.imgURL(pid,"orignal")+'" target="_blank">�鿴ԭͼ</a>					</cite>					<cite class="line">|</cite>					<cite class="imgL">						<a id="'+rotateLeft+'" href="javascript:;">����ת</a>					</cite>					<cite class="imgR">						<a id="'+rotateRight+'" href="javascript:;">����ת</a>					</cite>			  </p>			  <img id="'+imgId+'" class="imgSmall" src="'+App.imgURL(pid,"bmiddle")+'" width="'+newImgSize.width+'" height="'+newImgSize.height+'" />		';
			if(bForward) {
				preView.className="blogPicOri mBlog_linedot1"
			}if(!dom._bigImgContainer) {
				Core.Dom.insertAfter(preView,dom);
				dom._bigImgContainer=preView;
				if(bForward) {
					preView.style.paddingTop="10px"
				}dom._imgLoaded=true;
				dom.style.display="none";
				dom.loading.style.display="none";
				var children=dom.parentNode.childNodes;
				for(var i=0,len=children.length;i<len;i++) {
					if(children[i].className.indexOf("blogPicOri")==-1) {
						children[i].style.display="none"
					}
				}
			}if(bForward) {
				with($E(imgId).style) {
					border="0px";
					margin="0px"
				}if($E(imgId).width>defaultWidth) {
					if(Core.Base.detect.$MOZ) {
						$E(imgId).style.marginLeft="-14px"
					}if(Core.Base.detect.$IE) {
						$E(imgId).style.marginLeft="0px"
					}
				}if(Core.Base.detect.$IE&&$E(imgId).width==defaultWidth) {
					$E(imgId).style.marginLeft="-2px"
				}var widden=$E(imgId).parentNode.offsetWidth-$E(imgId).width;
				if(widden>0&&scope.$pageid==="mblog") {
					$E(imgId).style.marginLeft=widden/2+"px"
				}
			}Core.Events.addEvent($E(imgId),function () {
				App.shrinkImg($E(imgId),"img")
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
					App.shrinkImg(canvas,"img")
				},"click");
				if(bForward&&scope.$pageid==="mblog") {
					var wid=$E(imgId).parentNode.offsetWidth-$E(imgId).width;
					if(wid>0) {
						$E(imgId).style.marginLeft=wid/2+"px"
					}
				}if(Core.Base.detect.$IE) {
					var height=parseInt(preView.style.height)-canvas.width;
					if(height>25) {
						preView.style.height=canvas.width+25+"px"
					}if(bForward) {
						with(canvas.style) {
							border="0px"
						}
					}
				}else {
					preView.style.height=canvas.clientHeight+25+"px"
				}
			}
		}
	};
	App.shrinkImg=function (domBig,type) {
		var preView;
		if(type=="tag") {
			preView=domBig.parentNode.parentNode.parentNode
		}else {
			preView=domBig.parentNode
		}if(Core.Dom.getElementsByClass(preView.parentNode,"div","videoPlay").length>0) {
			var nodes=preView.parentNode.childNodes;
			nodes[0].style.display="";
			nodes[1].style.display="block";
			preView.previousSibling.style.display="";
			preView.style.display="none";
			var smallImg=preView.previousSibling.firstChild;
			smallImg.className="imgBig";
			smallImg.style.display="";
			return
		}var smallImg=preView.parentNode.getElementsByTagName("img")[0];
		smallImg.className="imgBig";
		smallImg.style.display="";
		preView.previousSibling.style.display="";
		preView.style.display="none"
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
			}var listcontent='<li class="note">��ѡ���¼����</li>';
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
					if(temp.indexOf("����������")>-1) {
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
						if(temp.indexOf("����������")>-1) {
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
					}if(document.title!="������������") {
						document.title="������������";
						return
					}if(_shakeBefore==_titleContent.length) {
						_shakeBefore=0
					}document.title=_titleContent[_shakeBefore];
					_shakeBefore++
				}function stopShake() {
					clearInterval(_titleInterval);
					document.title=_oldTitle
				}if(_res.comment>0) {
					_titleContent.push("���������ۡ�")
				}if(_res.attention.num>0) {
					_titleContent.push("�����·�˿��")
				}if(_res.msg>0) {
					_titleContent.push("������˽�š�")
				}if(_res.atme>0) {
					_titleContent.push("������@�ҡ�")
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
					_str.push('<div class="l_1">'+result.data.comment+'�������ۣ�<a href="/comments">�鿴����</a></div>')
				}if(result.data.attention.num>0) {
					_str.push('<div class="l_1">'+result.data.attention.num+'λ�·�˿��<a href="http://t.sina.com.cn/'+scope.$uid+'/fans">�鿴�ҵķ�˿</a></div>')
				}if(result.data.msg>0) {
					_str.push('<div class="l_1">'+result.data.msg+'����˽�ţ�<a href="/messages">�鿴˽��</a></div>')
				}if(result.data.atme>0) {
					if(_requestTimes==1) {
						_tenMinute=true;
						_str.push('<div class="l_1">'+result.data.atme+'��΢���ᵽ�ң�<a href="/atme">�鿴@��</a></div>')
					}else {
						if(_tenMinute) {
							_str.push('<div class="l_1">'+result.data.atme+'��΢���ᵽ�ң�<a href="/atme">�鿴@��</a></div>')
						}
					}
				}var feedPanel;
				if(feedPanel=$E("feed_msg_new")) {
					if(result.data.feed>0) {
						var getMsgButton=feedPanel.getElementsByTagName("a")[0];
						if(getMsgButton) {
							getMsgButton.onclick=function () {
								if(scope.$uid) {
									var url=window.location;
									url.href="/"+scope.$uid
								}return false
							}
						}feedPanel.style["display"]=""
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
			var initErrorTip="���ȵ�¼���ٽ��оٱ�";
			App.ModLogin({
				"func":function () {
					window.open(url,"�ٱ�������Ϣ","height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
				},"initErrorTip":initErrorTip
			});
			return
		}window.open(url,"�ٱ�������Ϣ","height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
	};
	$registJob("hotsearch",function () {
		App.search("hot_keyword","hot_submit","hot_search",null,"������������...")
	});
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
	$registJob("bind_mobile_info",function () {
	});
	App.miniblogDel=function (id,single,el) {
		var requestURL;
		var sText;
		if(scope.$feedtype=="isat") {
			requestURL="/myat/delete.php";
			sText="ȷ��ɾ������@����"
		}else {
			requestURL="/mblog/delete.php";
			sText="ȷ��ɾ������΢����"
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
						newDom.innerHTML="�ѹ�ע";
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
							newDom.innerHTML="�ѹ�ע";
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
				if(json) {
					if(json.code=="A00006") {
						App.alert("�ղسɹ���",{
							icon:3
						})
					}else {
						App.alert(App.getMsg(json.code))
					}
				}else {
					App.alert("�ղ�΢��ʧ�ܣ������ԣ�",{
						icon:2
					})
				}
			},"onException":function (json) {
				if(json) {
					App.alert(App.getMsg(json.code),{
						icon:2
					})
				}else {
					App.alert("�ղ�΢��ʧ�ܣ������ԣ�")
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
		}App.confirm("ȷ��Ҫɾ�����ղأ�",{
			ok:function () {
				deletefav()
			},cancel:function () {
			}
		});
		var deletefav=function () {
			var o_displaynone,o_dotline;
			var o_emcount=$E("feed_title").getElementsByTagName("em").length>0?$E("feed_title").getElementsByTagName("em")[0]:null;
			var s_url="/favorite/aj_delete.php";
			if($E("mid_"+s_mid)) {
				o_displaynone=Core.Dom.next("mid_"+s_mid,"");
				if(o_displaynone) {
					o_dotline=Core.Dom.next(o_displaynone,"mBlog_linedot")
				}else {
					o_dotline=Core.Dom.next("mid_"+s_mid,"mBlog_linedot")
				}
			}Utils.Io.Ajax.request(s_url,{
				"POST":{
					"mid":s_mid
				},"onComplete":function (json) {
					if(json) {
						if(json.code=="A00006") {
							Core.Dom.removeNode(o_dotline);
							Core.Dom.removeNode($E("mid_"+s_mid));
							o_emcount.innerHTML=(Core.String.toInt(o_emcount.innerHTML)-1).toString ();
							if(Core.Dom.getElementsByClass($E("feed_box"),"div","feedCell").length==0) {
								window.location.reload(true)
							}
						}else {
							App.alert(App.getMsg(json.code))
						}
					}else {
						App.alert("����ʧ�ܣ�")
					}
				},"onException":function (json) {
					if(json) {
						App.alert(App.getMsg(json.code))
					}else {
						App.alert("����ʧ�ܣ�")
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
			if((new RegExp("(@|��)"+name+"([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(content)) {
				return true
			}else {
				return false
			}
		};
		var forwardContentFinal="";
		var testForwardName=decodeURIComponent(forwardName);
		var testForwardContent=decodeURIComponent(forwardContent);
		var defaultTxt="��������  @"+testForwardName+"  ��΢��";
		if(forwardContent==""||forwardContent===undefined) {
			forwardContentFinal=defaultTxt
		}else {
			forwardContentFinal=" //@"+testForwardName+":"+testForwardContent
		}var title="��"+testForwardName+"�Ƽ�������";
		var loginStr='<div class="shareLogin">                    	<div id="loginerror"></div>						<em>��¼�� </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle" class="inputType"  style="width: 100px;"/></span></span>                        <em>���� </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clear"></div>                    </div>';
		loginStr=scope.$uid?"":loginStr;
		var html='			   <div class="shareLayer" id="recommendedcontent">                    <div class="shareTxt" id="recommendedcontent">˵˵�Ƽ����ɰ�:</div>					<div id="recommendedInfoBox" style="float:right;margin-right:13px;color:#008800"></div>                    <textarea class="PY_textarea" id="mdrecommendedtextarea" >'+forwardContentFinal+"</textarea>"+loginStr+'<div class="layerBtn">                 		<a href="javascript:void(0);" id="mdrecommendedbtn" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">����</cite></span></a><a href="javascript:void(0)" id="mdrecommendedcancel" class="mBlogBtn"><span class="mbtnR"><cite class="btnTxt">ȡ��</cite></span></a>                 </div>                </div>';
		var cfg={
			width:390,zIndex:1000,hidden:true
		};
		var dialog=new App.Dialog.BasicDialog(title,html,cfg);
		var mdforwardtextarea=$E("mdrecommendedtextarea");
		var tipStringOK="����������<em>${num}</em>������";
		var tipStringErr="�Ѿ�����<em>${num}</em>������";
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
		var disClass="mBlogBtn2";
		var enableClass="mBlogBtn";
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
				content:reason.indexOf("@"+testForwardName)!=-1?reason.replace(/'@'+testForwardName/gi,"@"+testForwardName+" ").replace(/\uff20/ig,"@")+" "+appendurl:(reason+" @"+testForwardName).replace(/\uff20/ig,"@")+" "+appendurl,"from":scope["$pageid"]
			};
			if(scope.$pageid=="search") {
				postdata.from="search"
			}if((scope.$pageid=="myprofile"||scope.$pageid=="search")&&scope.$feedtype!="isori") {
				postdata.isindex=1
			}var cb=function (data,json) {
				dialog.close();
				var cbdia=App.alert("�Ƽ��ɹ�",{
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
					errortTip("�������¼��",name);
					return false
				}else {
					App.fixElement.hidden()
				}if(!pwdstr) {
					errortTip("����������",pwd);
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
	var swfobject=function () {
		var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;
		var h=function () {
			var v=typeofK.getElementById!=b&&typeofK.getElementsByTagName!=b&&typeofK.createElement!=b,AC=[0,0,0],x=null;
			if(typeofT.plugins!=b&&typeofT.plugins[n]==Q) {
				x=T.plugins[n].description;
				if(x&&!(typeofT.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)) {
					x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
					AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);
					AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);
					AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0
				}
			}else {
				if(typeofj.ActiveXObject!=b) {
					var y=null,AB=false;
					try{
						y=new ActiveXObject(p+".7")
					}catch(t) {
						try{
							y=new ActiveXObject(p+".6");
							AC=[6,0,21];
							y.AllowScriptAccess="always"
						}catch(t) {
							if(AC[0]==6) {
								AB=true
							}
						}if(!AB) {
							try{
								y=new ActiveXObject(p)
							}catch(t) {
							}
						}
					}if(!AB&&y) {
						try{
							x=y.GetVariable("$version");
							if(x) {
								x=x.split(" ")[1].split(",");
								AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]
							}
						}catch(t) {
						}
					}
				}
			}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);			/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return {
				w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w
			}
		}();
		var L=function () {
			if(!h.w3cdom) {
				return
			}f(H);
			if(h.ie&&h.win) {
				try{
					K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");
					J=C("__ie_ondomload");
					if(J) {
						I(J,"onreadystatechange",S)
					}
				}catch(q) {
				}
			}if(h.webkit&&typeofK.readyState!=b) {
				Z=setInterval(function () {
					if(/loaded|complete/.test(K.readyState)) {
						E()
					}
				},10)
			}if(typeofK.addEventListener!=b) {
				K.addEventListener("DOMContentLoaded",E,null)
			}R(E)
		}();
		function S() {
			if(J.readyState=="complete") {
				J.parentNode.removeChild(J);
				E()
			}
		}function E() {
			if(e) {
				return
			}if(h.ie&&h.win) {
				var v=a("span");
				try{
					var u=K.getElementsByTagName("body")[0].appendChild(v);
					u.parentNode.removeChild(u)
				}catch(w) {
					return
				}
			}e=true;
			if(Z) {
				clearInterval(Z);
				Z=null
			}var q=o.length;
			for(var r=0;r<q;r++) {
				o[r]()
			}
		}function f(q) {
			if(e) {
				q()
			}else {
				o[o.length]=q
			}
		}function R(r) {
			if(typeofj.addEventListener!=b) {
				j.addEventListener("load",r,false)
			}else {
				if(typeofK.addEventListener!=b) {
					K.addEventListener("load",r,false)
				}else {
					if(typeofj.attachEvent!=b) {
						I(j,"onload",r)
					}else {
						if(typeofj.onload=="function") {
							var q=j.onload;
							j.onload=function () {
								q();
								r()
							}
						}else {
							j.onload=r
						}
					}
				}
			}
		}function H() {
			var t=N.length;
			for(var q=0;q<t;q++) {
				var u=N[q].id;
				if(h.pv[0]>0) {
					var r=C(u);
					if(r) {
						N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";
						N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";
						if(c(N[q].swfVersion)) {
							if(h.webkit&&h.webkit<312) {
								Y(r)
							}W(u,true)
						}else {
							if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)) {
								k(N[q])
							}else {
								O(r)
							}
						}
					}
				}else {
					W(u,true)
				}
			}
		}function Y(t) {
			var q=t.getElementsByTagName(Q)[0];
			if(q) {
				var w=a("embed"),y=q.attributes;
				if(y) {
					var v=y.length;
					for(var u=0;u<v;u++) {
						if(y[u].nodeName=="DATA") {
							w.setAttribute("src",y[u].nodeValue)
						}else {
							w.setAttribute(y[u].nodeName,y[u].nodeValue)
						}
					}
				}var x=q.childNodes;
				if(x) {
					var z=x.length;
					for(var r=0;r<z;r++) {
						if(x[r].nodeType==1&&x[r].nodeName=="PARAM") {
							w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))
						}
					}
				}t.parentNode.replaceChild(w,t)
			}
		}function k(w) {
			A=true;
			var u=C(w.id);
			if(u) {
				if(w.altContentId) {
					var y=C(w.altContentId);
					if(y) {
						M=y;
						l=w.altContentId
					}
				}else {
					M=G(u)
				}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310) {
					w.width="310"
				}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137) {
					w.height="137"
				}K.title=K.title.slice(0,47)+" - Flash Player Installation";
				var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;
				if(h.ie&&h.win&&u.readyState!=4) {
					var t=a("div");
					x+="SWFObjectNew";
					t.setAttribute("id",x);
					u.parentNode.insertBefore(t,u);
					u.style.display="none";
					var v=function () {
						u.parentNode.removeChild(u)
					};
					I(j,"onload",v)
				}U({
					data:w.expressInstall,id:m,width:w.width,height:w.height
				},{
					flashvars:r
				},x)
			}
		}function O(t) {
			if(h.ie&&h.win&&t.readyState!=4) {
				var r=a("div");
				t.parentNode.insertBefore(r,t);
				r.parentNode.replaceChild(G(t),r);
				t.style.display="none";
				var q=function () {
					t.parentNode.removeChild(t)
				};
				I(j,"onload",q)
			}else {
				t.parentNode.replaceChild(G(t),t)
			}
		}function G(v) {
			var u=a("div");
			if(h.win&&h.ie) {
				u.innerHTML=v.innerHTML
			}else {
				var r=v.getElementsByTagName(Q)[0];
				if(r) {
					var w=r.childNodes;
					if(w) {
						var q=w.length;
						for(var t=0;t<q;t++) {
							if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)) {
								u.appendChild(w[t].cloneNode(true))
							}
						}
					}
				}
			}return u
		}function U(AG,AE,t) {
			var q,v=C(t);
			if(v) {
				if(typeofAG.id==b) {
					AG.id=t
				}if(h.ie&&h.win) {
					var AF="";
					for(var AB in AG) {
						if(AG[AB]!=Object.prototype[AB]) {
							if(AB.toLowerCase()=="data") {
								AE.movie=AG[AB]
							}else {
								if(AB.toLowerCase()=="styleclass") {
									AF+=' class="'+AG[AB]+'"'
								}else {
									if(AB.toLowerCase()!="classid") {
										AF+=" "+AB+'="'+AG[AB]+'"'
									}
								}
							}
						}
					}var AD="";
					for(var AA in AE) {
						if(AE[AA]!=Object.prototype[AA]) {
							AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'
						}
					}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";
					i[i.length]=AG.id;
					q=C(AG.id)
				}else {
					if(h.webkit&&h.webkit<312) {
						var AC=a("embed");
						AC.setAttribute("type",P);
						for(var z in AG) {
							if(AG[z]!=Object.prototype[z]) {
								if(z.toLowerCase()=="data") {
									AC.setAttribute("src",AG[z])
								}else {
									if(z.toLowerCase()=="styleclass") {
										AC.setAttribute("class",AG[z])
									}else {
										if(z.toLowerCase()!="classid") {
											AC.setAttribute(z,AG[z])
										}
									}
								}
							}
						}for(var y in AE) {
							if(AE[y]!=Object.prototype[y]) {
								if(y.toLowerCase()!="movie") {
									AC.setAttribute(y,AE[y])
								}
							}
						}v.parentNode.replaceChild(AC,v);
						q=AC
					}else {
						var u=a(Q);
						u.setAttribute("type",P);
						for(var x in AG) {
							if(AG[x]!=Object.prototype[x]) {
								if(x.toLowerCase()=="styleclass") {
									u.setAttribute("class",AG[x])
								}else {
									if(x.toLowerCase()!="classid") {
										u.setAttribute(x,AG[x])
									}
								}
							}
						}for(var w in AE) {
							if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie") {
								F(u,w,AE[w])
							}
						}v.parentNode.replaceChild(u,v);
						q=u
					}
				}
			}return q
		}function F(t,q,r) {
			var u=a("param");
			u.setAttribute("name",q);
			u.setAttribute("value",r);
			t.appendChild(u)
		}function X(r) {
			var q=C(r);
			if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")) {
				if(h.ie&&h.win) {
					if(q.readyState==4) {
						B(r)
					}else {
						j.attachEvent("onload",function () {
							B(r)
						})
					}
				}else {
					q.parentNode.removeChild(q)
				}
			}
		}function B(t) {
			var r=C(t);
			if(r) {
				for(var q in r) {
					if(typeofr[q]=="function") {
						r[q]=null
					}
				}r.parentNode.removeChild(r)
			}
		}function C(t) {
			var q=null;
			try{
				q=K.getElementById(t)
			}catch(r) {
			}return q
		}function a(q) {
			return K.createElement(q)
		}function I(t,q,r) {
			t.attachEvent(q,r);
			d[d.length]=[t,q,r]
		}function c(t) {
			var r=h.pv,q=t.split(".");
			q[0]=parseInt(q[0],10);
			q[1]=parseInt(q[1],10)||0;
			q[2]=parseInt(q[2],10)||0;
			return (r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false
		}function V(v,r) {
			if(h.ie&&h.mac) {
				return
			}var u=K.getElementsByTagName("head")[0],t=a("style");
			t.setAttribute("type","text/css");
			t.setAttribute("media","screen");
			if(!(h.ie&&h.win)&&typeofK.createTextNode!=b) {
				t.appendChild(K.createTextNode(v+" {"+r+"}"))
			}u.appendChild(t);
			if(h.ie&&h.win&&typeofK.styleSheets!=b&&K.styleSheets.length>0) {
				var q=K.styleSheets[K.styleSheets.length-1];
				if(typeofq.addRule==Q) {
					q.addRule(v,r)
				}
			}
		}function W(t,q) {
			var r=q?"visible":"hidden";
			if(e&&C(t)) {
				C(t).style.visibility=r
			}else {
				V("#"+t,"visibility:"+r)
			}
		}function g(s) {
			var r=/[\\\"<>\.;
			]/;
			var q=r.exec(s)!=null;
			return q?encodeURIComponent(s):s
		}var D=function () {
			if(h.ie&&h.win) {
				window.attachEvent("onunload",function () {
					var w=d.length;
					for(var v=0;v<w;v++) {
						d[v][0].detachEvent(d[v][1],d[v][2])
					}var t=i.length;
					for(var u=0;u<t;u++) {
						X(i[u])
					}for(var r in h) {
						h[r]=null
					}h=null;
					for(var q in swfobject) {
						swfobject[q]=null
					}swfobject=null
				})
			}
		}();
		return {
			registerObject:function (u,q,t) {
				if(!h.w3cdom||!u||!q) {
					return
				}var r={
				};
				r.id=u;
				r.swfVersion=q;
				r.expressInstall=t?t:false;
				N[N.length]=r;
				W(u,false)
			},getObjectById:function (v) {
				var q=null;
				if(h.w3cdom) {
					var t=C(v);
					if(t) {
						var u=t.getElementsByTagName(Q)[0];
						if(!u||(u&&typeoft.SetVariable!=b)) {
							q=t
						}else {
							if(typeofu.SetVariable!=b) {
								q=u
							}
						}
					}
				}return q
			},embedSWF:function (x,AE,AB,AD,q,w,r,z,AC) {
				if(!h.w3cdom||!x||!AE||!AB||!AD||!q) {
					return
				}AB+="";
				AD+="";
				if(c(q)) {
					W(AE,false);
					var AA={
					};
					if(AC&&typeofAC===Q) {
						for(var v in AC) {
							if(AC[v]!=Object.prototype[v]) {
								AA[v]=AC[v]
							}
						}
					}AA.data=x;
					AA.width=AB;
					AA.height=AD;
					var y={
					};
					if(z&&typeofz===Q) {
						for(var u in z) {
							if(z[u]!=Object.prototype[u]) {
								y[u]=z[u]
							}
						}
					}if(r&&typeofr===Q) {
						for(var t in r) {
							if(r[t]!=Object.prototype[t]) {
								if(typeofy.flashvars!=b) {
									y.flashvars+="&"+t+"="+r[t]
								}else {
									y.flashvars=t+"="+r[t]
								}
							}
						}
					}f(function () {
						U(AA,y,AE);
						if(AA.id==AE) {
							W(AE,true)
						}
					})
				}else {
					if(w&&!A&&c("6.0.65")&&(h.win||h.mac)) {
						A=true;
						W(AE,false);
						f(function () {
							var AF={
							};
							AF.id=AF.altContentId=AE;
							AF.width=AB;
							AF.height=AD;
							AF.expressInstall=w;
							k(AF)
						})
					}
				}
			},getFlashPlayerVersion:function () {
				return {
					major:h.pv[0],minor:h.pv[1],release:h.pv[2]
				}
			},hasFlashPlayerVersion:c,createSWF:function (t,r,q) {
				if(h.w3cdom) {
					return U(t,r,q)
				}else {
					return undefined
				}
			},removeSWF:function (q) {
				if(h.w3cdom) {
					X(q)
				}
			},createCSS:function (r,q) {
				if(h.w3cdom) {
					V(r,q)
				}
			},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function (v) {
				var u=K.location.search||K.location.hash;
				if(v==null) {
					return g(u)
				}if(u) {
					var t=u.substring(1).split("&");
					for(var r=0;r<t.length;r++) {
						if(t[r].substring(0,t[r].indexOf("="))==v) {
							return g(t[r].substring((t[r].indexOf("=")+1)))
						}
					}
				}return ""
			},expressInstallCallback:function () {
				if(A&&M) {
					var q=C(m);
					if(q) {
						q.parentNode.replaceChild(M,q);
						if(l) {
							W(l,true);
							if(h.ie&&h.win) {
								M.style.display="block"
							}
						}M=null;
						l=null;
						A=false
					}
				}
			}
		}
	}();
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
		App.bindvideo=function (elementRoot) {
			if(!elementRoot) {
				elementRoot=document
			}var vHidden=Core.Dom.getElementsByAttr(elementRoot,"name","videohidden");
			var _insertHTML=Core.Dom.insertHTML;
			var videoAttribute={
			};
			var _addevent=Core.Events.addEvent;
			var firstvideourl,firsttitle,firstourl,firsttype;
			var previousVname="";
			var same=false;
			if(vHidden.length>0) {
				var videoHidden=new Array();
				videoHidden.push(vHidden[0]);
				if(videoHidden.length>0) {
					for(var q=0;q<vHidden.length;q++) {
						same=false;
						for(var m=0;m<videoHidden.length;m++) {
							if(vHidden[q].getAttribute("vname")==videoHidden[m].getAttribute("vname")) {
								same=true;
								break
							}
						}if(same==false) {
							videoHidden.push(vHidden[q])
						}
					}
				}
			}else {
				return false
			}var modsingle=false;
			var originalsingle=false;
			if(videoHidden.length>0) {
				firstvideourl=decodeURIComponent(videoHidden[0].getAttribute("url"));
				firsttitle=decodeURIComponent(videoHidden[0].getAttribute("title"));
				firstourl=decodeURIComponent(videoHidden[0].getAttribute("ourl"))||"";
				firstshorturl=videoHidden[0].getAttribute("vname");
				firsttype=videoHidden[0].getAttribute("type");
				for(var i=0;i<videoHidden.length;i++) {
					videoAttribute["url"]=decodeURIComponent(videoHidden[i].getAttribute("url"));
					videoAttribute["title"]=decodeURIComponent(videoHidden[i].getAttribute("title"));
					videoAttribute["type"]=videoHidden[i].getAttribute("type");
					videoAttribute["vname"]=videoHidden[i].getAttribute("vname");
					videoAttribute["mid"]=videoHidden[i].getAttribute("mid");
					videoAttribute["ourl"]=decodeURIComponent(videoHidden[i].getAttribute("ourl"))||"";
					var arrayvname=Core.Dom.getElementsByAttr(elementRoot,"name",videoAttribute["vname"]);
					for(var k=0;k<arrayvname.length;k++) {
						if(arrayvname[k].tagName=="A") {
							arrayvname[k].href="javascript:void(0);";
							arrayvname[k].target="";
							if(scope.$pageid=="mblog"&&$E("videobox")) {
								var cldr=arrayvname[k].parentNode.parentNode.childNodes||arrayvname[k].parentNode.parentNode.children;
								if(cldr[0].tagName=="A") {
									if(cldr[0].innerHTML.charAt(0)=="@"||cldr[0].innerHTML.charAt(0)=="��") {
										modsingle=true;
										originalsingle=false
									}
								}else {
									originalsingle=true;
									modsingle=false
								}
							}_addevent(arrayvname[k],(function (mid,url,type,title,shorturl,ourl) {
								return function () {
									App.seevideo(mid,url,type,title,shorturl,ourl)
								}
							})(videoAttribute["mid"],videoAttribute["url"],videoAttribute["type"],videoAttribute["title"],videoAttribute["vname"],videoAttribute["ourl"]),"click")
						}else {
							if(arrayvname[k].tagName=="IMG") {
								_addevent(arrayvname[k].nextSibling.getElementsByTagName("A")[0],(function (mid,url,type,title,shorturl,ourl) {
									return function () {
										App.seevideo(mid,url,type,title,shorturl,ourl)
									}
								})(videoAttribute["mid"],videoAttribute["url"],videoAttribute["type"],videoAttribute["title"],videoAttribute["vname"],videoAttribute["ourl"]),"click")
							}
						}
					}
				}if(originalsingle) {
					$E("videobox").innerHTML='					<div id="v_00000" class="blogPicOri" style="display: block;">				  <p>				  <cite class="preview">				  <a class="lose" target = "_blank" title="'+firstourl+'"  href="http://sinaurl.cn/'+firstshorturl+'">'+firsttitle+'</a></cite></p>				  <div id="00000">				  	����δ��װflash��������				  </div>					</div><br/><div class="mBlog_linedot"></div>';
					var flashParams={
						quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
					};
					var flashVars={
						playMovie:"true"
					};
					swfobject.embedSWF(firstvideourl,"00000","440","360","9.0.0",null,flashVars,flashParams)
				}if(scope.$pageid=="mblog"&&!originalsingle) {
					if($E("videobox")) {
						$E("videobox").className=""
					}
				}
			}
		};
		App.bindvideo()
	});
	App.seevideo=function (vid,url,type,title,shorturl,ourl) {
		if(scope.$pageid=="yunying_index") {
			return true
		}var modlist=false;
		var video={
			vid:vid,url:url,type:type,title:title,shorturl:shorturl,ourl:ourl
		};
		var _getEvent=Core.Events.getEvent();
		var _srcElement=_getEvent.srcElement||_getEvent.target;
		var videodiv;
		var _insertHTML=Core.Dom.insertHTML;
		var mid_div;
		if(_srcElement.tagName=="A") {
			videodiv=_srcElement.parentNode.parentNode;
			if(videodiv.tagName=="P") {
				if(videodiv.parentNode.className=="oriTxt") {
					if(scope.$pageid=="mblog"&&$E("videobox")) {
						videodiv=null;
						scroller("videobox",1000,-20,0);
						var flashParams={
							quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
						};
						var flashVars={
							playMovie:"true"
						};
						swfobject.embedSWF(video["url"],"videobox","440","360","9.0.0",null,flashVars,flashParams);
						return false
					}videodiv=videodiv.parentNode.nextSibling;
					mid_div=videodiv.parentNode.parentNode;
					video["vid"]=(mid_div.id).slice(5)
				}else {
					if(videodiv.nextSibling) {
						videodiv=videodiv.nextSibling
					}mid_div=videodiv.parentNode.parentNode.parentNode.parentNode.parentNode;
					if(mid_div.id) {
						modlist=true;
						video["vid"]=(mid_div.id).slice(5)
					}else {
						video["vid"]="00000"
					}
				}
			}
		}else {
			if(_srcElement.tagName=="IMG"&&_srcElement.className!="smailIcon videoIcon") {
				videodiv=_srcElement.parentNode.parentNode.parentNode;
				if(videodiv.tagName=="DIV"&&videodiv.className=="feedUserImg") {
					mid_div=videodiv.parentNode.parentNode;
					if(mid_div.id.indexOf("mid_")!=-1) {
						video["vid"]=(mid_div.id).slice(5)
					}else {
						if(mid_div.parentNode.parentNode.parentNode.id.indexOf("mid_")!=-1) {
							mid_div=mid_div.parentNode.parentNode.parentNode;
							video["vid"]=(mid_div.id).slice(5);
							modlist=true
						}
					}
				}else {
					mid_div=videodiv.parentNode.parentNode.parentNode.parentNode.parentNode;
					modlist=true;
					video["vid"]=(mid_div.id).slice(5)
				}
			}else {
				if(_srcElement.tagName=="IMG"&&_srcElement.className=="smailIcon videoIcon") {
					videodiv=_srcElement.parentNode.parentNode.parentNode;
					if(videodiv.tagName=="P") {
						if(videodiv.parentNode.className=="oriTxt") {
							videodiv=videodiv.parentNode.nextSibling;
							mid_div=videodiv.parentNode.parentNode;
							video["vid"]=(mid_div.id).slice(5)
						}else {
							videodiv=videodiv.nextSibling;
							mid_div=videodiv.parentNode.parentNode.parentNode.parentNode.parentNode;
							if(mid_div.id) {
								video["vid"]=(mid_div.id).slice(5);
								modlist=true
							}else {
								video["vid"]="00000"
							}
						}
					}
				}
			}
		}var videohtml="<div id = v_"+video["vid"]+' class="blogPicOri" style="display: block;"> 	<div class="videoBox"></div>	<p class="oriPicOption">				  	<cite class="cls">						<a href="javascript:;" onclick="App.closevideo(\''+video["vid"]+'\');">����</a>					<cite class="line">|</cite></cite>					<cite class="preview">						<a class="lose" href="http://sinaurl.cn/'+video["shorturl"]+'" target = "_blank" title="'+video["ourl"]+'">'+video["title"]+'</a>					</cite>			  <div id="'+video["vid"]+'">			  	����δ��װflash��������			  </div>		<br/>		<br/>		</div>		';
		var singlehtml='<div id="v_00000" class="blogPicOri" style="display: block;">				  <p><cite class="preview"><a class="lose" target = "_blank" title="'+video["ourl"]+'"  href="http://sinaurl.cn/'+video["shorturl"]+'">'+video["title"]+'</a></cite></p>				  <div id="00000">				  	����δ��װflash��������				  </div>	</div><br/><div class="mBlog_linedot"></div>';
		var checkVideoExist=function () {
			if(videodiv.style.display=="none"&&scope.$pageid!="mblog") {
				return vlistchange(videodiv)
			}return true
		};
		var showvideo=function () {
			var originalbool=false;
			var showbox=$E("videobox")||$E("v_00000");
			if(videodiv) {
				if(scope.$pageid=="mblog"&&showbox) {
					if(videodiv.previousSibling) {
						var content=videodiv.previousSibling.childNodes||videodiv.previousSibling.children;
						if(content[0].innerHTML.charAt(0)!="@"&&content[0].innerHTML.charAt(0)!="��") {
							originalbool=true
						}else {
							videodiv.style.display="none"
						}
					}
				}videodiv.style.display="none"
			}if(originalbool) {
				videodiv.style.display=""
			}if(scope.$pageid=="mblog"&&showbox) {
				if(showbox.innerHTML!="") {
					if("http://sinaurl.cn/"+video["shorturl"]==Core.Dom.getElementsByClass(showbox,"A","lose")[0].href) {
						return false
					}
				}showbox.innerHTML="";
				if(!originalbool) {
					showbox.innerHTML=videohtml;
					$E("videobox").className=""
				}else {
					$E("videobox").className="videoBox";
					showbox.innerHTML=singlehtml
				}var flashParams={
					quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
				};
				var flashVars={
					playMovie:"true"
				};
				scroller(showbox,1000,-20,0);
				swfobject.embedSWF(video["url"],video["vid"],"440","360","9.0.0",null,flashVars,flashParams);
				return false
			}var el;
			if(videodiv) {
				_insertHTML(videodiv,videohtml,"afterend");
				if(!modlist) {
					el=Core.Dom.getElementsByClass(videodiv.nextSibling,"div","videoBox")[0];
					el.className=""
				}
			}scroller("v_"+video["vid"],1000,-20,0);
			var flashParams={
				quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
			};
			var flashVars={
				playMovie:"true"
			};
			swfobject.embedSWF(video["url"],video["vid"],"440","360","9.0.0",null,flashVars,flashParams)
		};
		var vlistchange=function (vdivinsert) {
			var vdiv=$E("v_"+video["vid"]);
			if("http://sinaurl.cn/"+video["shorturl"]==Core.Dom.getElementsByClass(vdiv,"A","lose")[0].href) {
				return false
			}if(vdiv) {
				vdiv.innerHTML="";
				Core.Dom.removeNode(vdiv);
				var el;
				_insertHTML(vdivinsert,videohtml,"afterend");
				if(!modlist) {
					el=Core.Dom.getElementsByClass(videodiv.nextSibling,"div","videoBox")[0];
					el.className=""
				}var flashParams={
					quality:"high",allowScriptAccess:"always",wmode:"transparent",allowFullscreen:true
				};
				var flashVars={
					playMovie:"true"
				};
				if($E("v_"+video["vid"])) {
					scroller("v_"+video["vid"],1000,-20,0)
				}else {
					if($E("videobox")) {
						scroller("videobox",1000,-20,0)
					}
				}swfobject.embedSWF(video["url"],video["vid"],"440","360","9.0.0",null,flashVars,flashParams);
				return false
			}else {
				return true
			}
		};
		if(checkVideoExist()) {
			showvideo()
		}var oScript=document.createElement("script");
		oScript.src="http://v.t.sina.com.cn/c.html?video_url="+encodeURIComponent("http://sinaurl.cn/"+shorturl);
		document.body.appendChild(oScript)
	};
	App.closevideo=function (vid) {
		var _getEvent=Core.Events.getEvent();
		var _srcElement=_getEvent.srcElement||_getEvent.target;
		var _div;
		var showbox=$E("videobox")||$E("v_00000");
		if(scope.$pageid=="mblog"&&showbox) {
			_div=_srcElement.parentNode.parentNode.parentNode.parentNode
		}else {
			_div=_srcElement.parentNode.parentNode.parentNode
		}var videodiv=_div.previousSibling;
		var bigimgdiv,bigimg;
		if(Core.Dom.getElementsByClass(videodiv,"DIV","blogPicOri").length>0) {
			bigimgdiv=Core.Dom.getElementsByClass(videodiv,"DIV","blogPicOri")[0];
			bigimg=bigimgdiv.childNodes[1]||bigimgdiv.children[1];
			App.shrinkImg(bigimg)
		}if(Core.Dom.getElementsByClass(videodiv,"DIV","blogPicOri mBlog_linedot1").length>0) {
			bigimgdiv=Core.Dom.getElementsByClass(videodiv,"DIV","blogPicOri mBlog_linedot1")[0];
			bigimg=bigimgdiv.childNodes[1]||bigimgdiv.children[1];
			App.shrinkImg(bigimg)
		}videodiv.style.display="";
		_div.innerHTML="";
		if(scope.$pageid!="mblog") {
			Core.Dom.removeNode(_div)
		}return false
	};
	function main() {
		var jobs=new Jobs();
		jobs.add("initSearch");
		if(scope.$uid==scope.$oid) {
			jobs.add("publisher");
			jobs.add("recommuser")
		}jobs.add("hotsearch");
		jobs.add("topic");
		jobs.add("loadComment");
		jobs.add("more");
		jobs.add("init_input");
		jobs.add("bind_mobile_info");
		jobs.add("refurbishNumber");
		jobs.add("seevideo");
		jobs.start()
	};