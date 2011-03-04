MI.NonTx = {
	build : function(){
		setTimeout(checkNonTxDomain, 2500);
		
		function checkNonTxDomain4Dom(dom, hacks)
		{
			var scripts = dom.getElementsByTagName("SCRIPT");
			var iframes = dom.getElementsByTagName("IFRAME");
			var frames = dom.getElementsByTagName("FRAME");
			var forms = dom.getElementsByTagName("FORM");
			var regIp = /https?:\/\/\d+\.\d+\.\d+\.\d+.*?[\s\"\']/g;
			var regUrl = /https?:\/\/[^\']+?[\s\"\']/g;
			for(var i = 0; i < scripts.length; i++) {
				var result;
				while(result=regIp.exec(scripts[i].innerHTML)) {
					hacks.script = hacks.script.concat(result);
				}
				while(result=regUrl.exec(scripts[i].innerHTML)){
					for (var idx = 0; idx < result.length; ++idx) {
						if (isAntiTxDomain(result[idx])) {
							hacks.script.push(result[idx]);
						}
					}
				}
			}
			for(var i = 0; i < scripts.length; i++){
				if(isAntiTxDomain(scripts[i].src)){
					hacks.script.push(scripts[i].src);
				}
			}
		
			for(var i = 0; i < iframes.length; i++){
				if(isAntiTxDomain(iframes[i].src)){
					hacks.iframe.push(iframes[i].src);
				}
			}
			for(var i = 0; i < frames.length; i++){
				if(isAntiTxDomain(frames[i].src)){
					hacks.frame.push(frames[i].src);
				}
			}
		
			for(var i = 0; i < forms.length; i++){
				if(isAntiTxDomain(forms[i].action)){
					hacks.form.push(forms[i].action);
				}
			}
		
			for (var idx = 0; idx < hacks.script.length; ++idx) {
				hacks.da.push("script::" + encodeURIComponent(hacks.script[idx]));
			}
			for (var idx = 0; idx < hacks.iframe.length;  ++idx) {
				hacks.da.push("iframe::" + encodeURIComponent(hacks.iframe[idx]));
			}
			for (var idx = 0; idx < hacks.frame.length; ++idx) {
				hacks.da.push("frame::" + encodeURIComponent(hacks.frame[idx]));
			}
			for (var idx = 0; idx < hacks.form.length; ++idx) {
				hacks.da.push("form::" + encodeURIComponent(hacks.form[idx]));
			}
		}
		
		function checkNonTxDomain() {
			/*if (Math.random() <= 0.1) {
				return; 	//»Ò¶È10%
			}*/
			try {
				var hacks = {script: [], form: [], iframe: [], frame: [], da: []};
				var phacks = {script: [], form: [], iframe: [], frame: [], da:[]};
				checkNonTxDomain4Dom(document, hacks);
				if (hacks.da.length > 0) {
					var image = new Image();
					hacks.da.push(encodeURIComponent(window.location.href));
					image.src = "http://cr.sec.qq.com/cr?id=10&d=datapt=v1.2|" + hacks.da.join('|');
				}
				try {
					if (parent.window != window) {
						checkNonTxDomain4Dom(parent.document, phacks);
						if (phacks.da.length > 0) {
							var image = new Image();
							phacks.da.push(encodeURIComponent(parent.window.location.href));
							image.src = "http://cr.sec.qq.com/cr?id=10&d=datapp=v1.2|" + phacks.da.join('|');
						}
					}
				}
				catch(e) {
				}
			}
			catch(e) {
			}
		}
		
		function isAntiTxDomain(sUrl) {
			var regUrl = /https?:\/\/.+?/;
			if (/^(https?:\/\/)[\w\-.]+\.(qq|paipai|soso|taotao|wenwen|tenpay|gtimg|qstatic)\.com($|\/|\\)/i.test(sUrl) || /^(https?:\/\/)[\w\-.]+\.(qlogo|gtimg)\.cn($|\/|\\)/i.test(sUrl) || !regUrl.test(sUrl)) {
				return false;
			}
			return true;
		}
	}
};
