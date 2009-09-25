(function(){
	if(typeof XN != 'undefined')return;
	XN = {};
	XN.Browser = XN.BORWSER = {};
	XN.Browser.addHomePage = function(url){
		if(!!(window.attachEvent && !window.opera)){
				document.body.style.behavior = 'url(#default#homepage)';
				document.body.setHomePage(url);
			}else{
			  if(window.clipboardData && clipboardData.setData){
		    clipboardData.setData("text", url);
		  }else{
		    div = document.createElement('div');
		    document.body.appendChild(div);
		    div.innerHTML = '<embed src="http://static.xiaonei.com/swf/clipboard.swf" FlashVars="clipboard='+encodeURIComponent(url)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
		  }
		  alert('网址已经拷贝到剪切板,请您打开浏览器的选项,\n把地址粘到主页选项中即可~');
		}
		return true;		
	};
	XN.Browser.addBookMark = function(url,title){
		var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';					
		try{
				window.external.addFavorite(url,title || '校内-因为真实,所以精彩');
		}catch(e){
			try{
				window.sidebar.addPanel(url,title || '校内-因为真实,所以精彩');
			}catch(e){
				alert('您可以尝试通过快捷键' + ctrl + ' + D 添加书签~');
			}
		}		
	};
})();

function $(s){
	return document.getElementById(s);
}


function isCapsLockOn(e){
	var c = e.keyCode || e.which;
	var s = e.shiftKey;
	if(((c >= 65 && c <= 90) && !s) || ((c >=97 && c <= 122) && s)){
		return true;
	}
	return false;
}

function showMsg(s){
	var el = $('errorMessage');
	el.style.display =  'block';
	el.innerHTML = s;
}

function hideMsg(){
	$('errorMessage').style.display = 'none';
}

$('loginForm').onsubmit = function(){
	function isEmail(str){
		var tmp = '';
		str = str.replace(/^\s+|\s+$/g,"");
		for(var i = 0,j = str.length;i < j;i++){
			var code = str.charCodeAt(i);
			if(code >= 65281 && code <= 65373){
				tmp += String.fromCharCode(code - 65248);
			}else{
				tmp += String.fromCharCode(code);
			}
		}
		tmp = tmp.replace(/·/,'@');
		$('email').value = tmp = tmp.replace(/[。|,|，|、]/g,'.');
		return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(tmp);
	}
	if(/^\s*$/.test($('password').value)){
		showMsg('您还没有填写密码');
		$('password').focus();
		return false;
	}

	if(/@/.test($('email').value)){
		if(!isEmail($('email').value)){
			showMsg('E-mail格式错误');
			$('email').focus();
			return false;
		}
	}else{
		if(!/^[\w@_.-]{3,50}$/.test($('email').value)){
			showMsg('帐号格式错误');
			$('email').focus();
			return false;
		}
	}
	return true;
}

$('password').onkeypress = function(e){
	if(isCapsLockOn(e || window.event)){
		showMsg('大写锁定开启');
	}else{
		hideMsg();
	}
}

$('email').focus();
$('email').select();
