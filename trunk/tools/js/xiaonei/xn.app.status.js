(function( ns )
{
	var STRING = XN.STRING;
	var EMstaticRoot = XN.ENV.staticRoot;
	
	var ubbs = [];
	var ubbResults = [];
	
	var DEBUG = false;
	
	function log( str )
	{
		if ( DEBUG ) XN.log( str );
	}
	
	function buildUbbImage( pic , title )
	{
		return '<img src="' + EMstaticRoot + pic + '" alt="' + title + '" class="status-em" style="width: 12px; height: 12px;"/>';
	}
	
	function addUBB( code , pic , title )
	{
		ubbs.push( new RegExp( '\\(' + code + '\\)' , 'img' ) );
		ubbResults.push( buildUbbImage( pic , title ) );
	}
	
	addUBB( 'L' , 'img/ems/love.gif' , '爱' );
	addUBB( 'P' , 'img/ems/bulb.gif' , '绿色环保大使' );
	addUBB( 'C' , 'img/ems/candle.gif' , '为震区祈福' );
	addUBB( 'B' , 'img/ems/gsilk.gif' , '绿丝带' );
	addUBB( 'F' , 'img/ems/fist.gif' , '捍卫开心' );
	addUBB( 'T' , 'img/ems/torch.gif' , '点燃百年奥运的火炬' );
	addUBB( 'Y' , 'img/ems/yeah.gif' , '中国必胜' );
	addUBB( 'G' , 'img/ems/good.gif' , '中国金牌第一' );
	addUBB( 'D' , 'imgpro/icons/doritos_log.jpg' , '多力多滋' );
	addUBB( 'R' , 'imgpro/icons/ico_rocket.gif' , '神七问天' );
	addUBB( 'W' , 'imgpro/icons/ico_spacewalker.gif' , '我是宇航员' );
	addUBB( '3' , 'imgpro/icons/3years.gif' , '校内三周年' );
	addUBB( 'h' , 'imgpro/icons/philips.jpg' , '飞利浦乐享健康好生活' );

	ns.statusAction = function( param )
	{
		$extend( this , param );
	};
	
	ns.statusAction.decodeUBB = function( str )
	{
		XN.ARRAY.each( ubbs , function( i , v )
		{
			str = str.replace( v , ubbResults[ i ] );
		});
		
		log( 'decodeUBB result:' );
		log( str );
		
		return str;
	};
	
	
	ns.statusAction.prototype = {
		//params
		maxLength : 70,
		reqeustURI : '/doing.do',
		getTscURI : '/newrandcode.do',
		
		//private
		_tscCode : null,
		_postRequest : null,
		
		//public
		abort : function()
		{
			try
			{
				this._postRequest.abort();
			}catch( e ){}
		},
		
		//更新状态
		update : function( sstr )
		{
			var This = this;
			if ( !this._tscCode ) return;
			sstr = STRING.trim( sstr );
			
			if ( sstr.length > this.maxLength )
			{
				this.fireEvent( 'postError' , '您最多能够输入' + this.maxLength + '个字符' , sstr );
				return;
			}
			
			this.fireEvent( 'beforePost' );
			
			this._postRequest = new XN.NET.xmlhttp( {
				
				url : this.reqeustURI,
				
				data : 'c=' + encodeURIComponent( sstr ) + '&tsc=' + this._tscCode,
				
				onComplete : function()
				{
					This.clearTscCode();
					This.fireEvent( 'postComplete' );
				},
				
				onSuccess : function( r )
				{
					This.fireEvent( 'postSuccess' , r.responseText , sstr );
				},
				
				onError : function()
				{
					This.fireEvent( 'postError' );
				}
			} );
		},
		clearTscCode : function()
		{
			this._tscCode = null;
		},
		getTscCode : function()
		{
			if ( this._tscCode ) return;
			
			var This = this;
			
			new XN.NET.xmlhttp( {
	
				url : this.getTscURI,
				data : 'type=status',
				onSuccess : function( r )
				{
					This._tscCode = r.responseText
				}
				
			} );
		}
	};
	XN.EVENT.enableCustomEvent( ns.statusAction.prototype );
})( XN.APP );



/*
 * old status editor
 */

XN.APP.oldStatus = {};

(function( ns )
{
	var STRING = XN.STRING;
	var addEvent = XN.EVENT.addEvent;
	var currentStatusEditor;
	
	getCurrentStatusEditor = function()
	{
		return currentStatusEditor;
	};
	
	ns.status = ns.statusEditor = function( params )
	{
		$extend( this , params );
		this.init();
	};
	ns.status.prototype = ns.statusEditor.prototype = {
		//elements id
		IDshowEditor : 'showStatusEditor',
		IDoriginalStatus : 'currentStatus_bak',
		IDcurrentStatus : 'currentStatus',
		IDstatusInput : 'statusContent',
		IDstatusCount : 'statusCount',
		IDeditor : 'statusEdit',
		IDsubmitBar : 'statusSubmit',
		IDcancelBar : 'statusCancel',
		IDupdateTime : 'statusUpdateTime',
		IDstatusEditSeperator : 'statusEditSeperator',
		
		TIPonNoStatus : '你可以<a href=\"javascript:void(0)\" onclick=\"getCurrentStatusEditor().show();\">更新状态</a\>，让朋友们知道你在做什么...',
		TIPonBeforePost : '发送中,请稍候~',
		
		maxLength : 70,
		
		_action : null,
		_lastStatus : null,
		
		init : function()
		{
			var This = this;
			
			if ( $( this.IDcurrentStatus ).getAttribute( 'statusInit' ) ) return;
			$( this.IDcurrentStatus ).setAttribute( 'statusInit' , '1' );
			
			currentStatusEditor = this;
			
			//状态为空的情况
			if( STRING.isBlank( $( this.IDcurrentStatus ).innerHTML ) )
			{
				$( this.IDupdateTime ).innerHTML = '';
				$( this.IDcurrentStatus ).innerHTML = '你可以更新状态，让朋友们知道你在做什么...';
			}			
			
			//attach event
			
			addEvent( this.IDstatusInput , 'focus' , function( e )
			{
				currentStatusEditor = This;
			});
			
			addEvent( this.IDstatusInput , 'keyup' , function( e )
			{
				e = e || window.event;
				if( e.keyCode == 27 )
				{
					This.hide();
				}
			} , false );
			
			addEvent( this.IDstatusInput , 'keydown' , function( e )
			{
				e = e || window.event;
				if( e.keyCode == 13 )
				{
					This.update();
				}
			} , false );
			
			if ( $( this.IDshowEditor ) )
			{
				$( this.IDshowEditor ).onclick = function()
				{
					This.show();
					return false;
				};
			}
			
			if ( $( this.IDcancelBar ) )
			{
				$( this.IDcancelBar ).onclick =  function()
				{
					This.hide();
					return false;
				};
			}
			
			if ( $( this.IDstatusCount ) )
			{
				new XN.FORM.textAreaHelper( this.IDstatusInput ).countSize( this.IDstatusCount , this.maxLength );
			}
			
			if ( $( this.IDsubmitBar ) )
			{
				$( this.IDsubmitBar ).onclick = function()
				{
					This.update();
				};
			}
			
			if ( $( this.IDcancelBar ) )
			{
				$( this.IDcancelBar ).onclick = function()
				{
					This.hide();
				};
			}
			
			this._action = new XN.APP.statusAction();
			
			this._action.addEvent( 'beforePost' , function()
			{
				This._updateUIbeforePost();
				This.onBeforePost();
			});
			
			this._action.addEvent( 'postSuccess' , function( r )
			{
				This._updateUIonPost( r );
				This.onPostSuccess();
			});
			
			this._action.addEvent( 'postError' , function( message )
			{
				XN.DO.showError( message || '状态更新失败请重试' );
				This.onPostError( message );
			});
			
		},
		update : function()
		{
			this._action.update( $( this.IDstatusInput ).value );
		},
		show : function()
		{
			this.beforeShowEditor();
			this.fireEvent( 'beforeShow' );
			
			this._action.getTscCode();
			
			if ( $( this.IDshowEditor ) ) $( this.IDshowEditor ).hide();
			
			this._lastStatus = STRING.trim( STRING.unescapeHTML( $( this.IDoriginalStatus ).innerHTML ) );
			$( this.IDstatusInput ).value = this._lastStatus;
			
			if( this.IDstatusCount ){
				this.IDstatusCount.innerHTML = this._lastStatus.length + '/' + this.maxLength;
			}
			
			$( this.IDeditor ).style.display = 'block';
			$( this.IDstatusInput ).focus();
			$( this.IDstatusInput ).select();	
		},
		
		hide : function()
		{
			this.beforeHideEditor();
			this.fireEvent( 'beforeHide' );
			if ( $( this.IDshowEditor ) ) $( this.IDshowEditor ).show();
			$( this.IDeditor ).hide();		
		},
		_updateUIbeforePost : function()
		{
			$( this.IDcurrentStatus ).innerHTML = this.TIPonBeforePost;
		},
		
		_updateUIonPost : function( r )
		{
			
			$( this.IDoriginalStatus ).innerHTML = r;
			
			var html = XN.APP.statusAction.decodeUBB( r );
			

			if ( $( this.IDupdateTime ) )
			{
				$( this.IDupdateTime ).innerHTML = STRING.isBlank( html ) ? '' : '刚刚更新';
			}
	
			$( this.IDcurrentStatus ).innerHTML = html || this.TIPonNoStatus;
			
			this.hide();
		},

		beforeShowEditor:XN.FUNC.empty,
		beforeHideEditor:XN.FUNC.empty,
	/**
	 *  发送之前执行,根据需要重写
	 */
		onBeforePost:XN.FUNC.empty,
	/**
	 *  发送成功执行,参数为服务器返回的字符串,根据需要重写
	 */
		onPostSuccess:XN.FUNC.empty,
	/**
	 *  检查和发送过程中出错时执行,参数为出错信息,根据需要重写
	 */
		onPostError:XN.FUNC.empty
	};
	
	XN.EVENT.enableCustomEvent( ns.status.prototype );
})( XN.APP.oldStatus );


/*
 * new status editor
 */

//XN.DEBUG.On();

(function( ns )
{
	var STRING = XN.STRING;
	var addEvent = XN.EVENT.addEvent;
	var currentStatusEditor;	
	var DEBUG = false;

	function log( s )
	{
		if ( DEBUG ) XN.log( s );
	}

	ns.status = ns.statusEditor = function( params )
	{
		$extend( this , params );
		this.init();
	};

	ns.statusEditor.prototype = {
		
		IDsubmit : 'publisher_statusSubmit',
		IDinput : 'publisher_statusInput',
		IDcounter : 'statusCount',
		IDcurrentStatus : 'currentStatus',
		IDoriginalStatus : 'currentStatus_bak',
		IDupdateTime : 'statusUpdateTime',

		TIPinputDefault : '更新状态，让好友们知道你在做什么...',
		TIPonPostError : '状态更新失败,请重试',
		TIPupdateTime : '刚刚更新',
		TIPnewUser : '你可以更新状态，让朋友们知道你在做什么...',
		TIPloading : '更新中，请稍候...',

		CFGshowError : true,
		CFGmaxLength : 70,

		_action : null,

		_counterEl : null,
		getConfig : function( key )
		{
			return this[ 'CFG' + key ];
		},
		
		getEl : function( id )
		{
			if ( id == 'counter' ) return this._counterEl;
			return $( this[ 'ID' + id ] );
		},
		
		getTip : function( key )
		{
			return this[ 'TIP' + key ];
		},

		init : function()
		{
			var This = this,
			ac;
			
			if ( !this.getEl( 'input' ) ) return;
			
			this._patchForNewUser();

			this._action = ac = new XN.APP.statusAction( {
				maxLength : this.getConfig( 'maxLength' )
			} );

			ac.addEvent( 'beforePost' , function()
			{
				This._beforePost();
				This.fireEvent( 'beforeUpdate' );
			} );

			ac.addEvent( 'postSuccess' , function( r )
			{
				This._onPostSuccess( r );
				This.fireEvent( 'updateSuccess' );
			} );
			
			ac.addEvent( 'postError' , function( r )
			{
				This._onPostError( r );
				This.fireEvent( 'updateError' , r );
			} );
			
			//attach element event
			var input = this.getEl( 'input' );

			input.addEvent( 'focus' , function( e )
			{
				This._onInputFocus( e );
			} , false );

			input.addEvent( 'click' , function( e )
			{
				XN.EVENT.stop( e || window.event );
			} , false );

			addEvent( document , 'click' , function( e )
			{
				This._onInputClick( e );
			} , false );
			
			
			/*
			*	status editor in home page has no counter
			*/

			this._counterEl = $element( 'div' );

			new XN.FORM.inputHelper( this.getEl( 'input' ) )
			.countSize( this.getEl( 'counter' ) , this.getConfig( 'maxLength' ) )
			.setDefaultValue( this.getTip( 'inputDefault' ) )
			.onEnter( function()
			{
				This.update();
			} );

			this._enableSubmit();

		},

		_patchForNewUser : function()
		{
			if ( STRING.isBlank( this.getEl( 'currentStatus' ).innerHTML ) )
			{
				this.getEl( 'currentStatus' ).innerHTML = this.getTip( 'newUser' );
				this.getEl( 'updateTime' ).innerHTML = '';
			}
		},
		
		update : function()
		{
			var status = this.getEl( 'input' ).value;
			if ( this.getTip( 'inputDefault' ) == status ) return;
			this._action.update( status );
		},

		_disableSubmit : function()
		{
			var submit = this.getEl( 'submit' );
			submit.onclick = null;
			submit.addClass( 'gray' );
			this.getEl( 'input' ).disalbe = true;
		},
		
		_enableSubmit : function()
		{
			var This = this;
			var submit = this.getEl( 'submit' )
			submit.onclick = function( e )
			{
				XN.EVENT.stop( e || window.event );
				This.update();
			};
			submit.delClass( 'gray' );

			this.getEl( 'input' ).disabled = false;
		},

		_resetInput : function()
		{
			var input = this.getEl( 'input' );
			input.value = this.getTip( 'inputDefault' );
			input.style.color = '#888';
			input.blur();
		},
		
		advancedMode : function()
		{
			this.getEl( 'submit' ).show();
			this.getEl( 'counter' ).show();
			this.fireEvent( 'advancedMode' );
		},

		simpleMode : function()
		{
			this.getEl( 'submit' ).hide();
			this.getEl( 'counter' ).hide();
			this.fireEvent( 'simpleMode' );
		},
		
		_resetInputCounter : function()
		{
			var counter = this.getEl( 'counter' )
			counter.innerHTML = '0/' + this.getConfig( 'maxLength' );
			counter.delClass( 'full' );
			counter.hide();
			this.fireEvent( 'resetCounter' );
		},
		
		_onInputClick : function()
		{
			if ( this.getEl( 'input' ).value != this.getTip( 'inputDefault' ) ) return;
			this.simpleMode();
		},

		_onInputFocus : function()
		{
			this.advancedMode();
			this.getEl( 'input' ).style.color = '#333';
			this._action.getTscCode();
			this.fireEvent( 'inputFocus' );
		},

		_beforePost : function()
		{
			this._disableSubmit();
			this.getEl( 'currentStatus' ).innerHTML = '<img class="loading-img" src="' + XN.ENV.staticRoot + 'img/upload_progress.gif"/>' + this.getTip( 'loading' );
		},

		_onPostSuccess : function( r )
		{
			this._enableSubmit();
			this._resetInputCounter();
			this._resetInput();
			this.simpleMode();

			this.getEl( 'originalStatus' ).innerHTML = r;
			this.getEl( 'updateTime' ).innerHTML = this.getTip( 'updateTime' );

			var currentStatus = this.getEl( 'currentStatus' );
			currentStatus.innerHTML = XN.APP.statusAction.decodeUBB( r );
			currentStatus.style.backgroundColor = 'rgb(255,255,150)';
			setTimeout( function(){
				XN.Effect.gradient( currentStatus , 255 , 255 , 150 );
			} , 50 );
		},

		_onPostError : function( r )
		{
			this._enableSubmit();
			this._resetInputCounter();
			this._resetInput();
			this.simpleMode();

			if ( this.getConfig( 'showError' ) ) XN.DO.showError( r || this.getTip( 'onPostError' ) );
		}
	};

	XN.EVENT.enableCustomEvent( ns.statusEditor.prototype );

})( XN.APP );


XN.DOM.readyDo( function()
{
	//home 页状态编辑器
	if ( !/^(home|dashboardPage)$/.test( document.body.id ) ) return;
	var statusEditor = new XN.APP.statusEditor();
	
	//校内三周年
	if ( !$( 'three_year_status_link' ) ) return;
	$( 'three_year_status_link' ).onclick = function( e )
	{
		XN.EVENT.stop( e || window.event );
		
		statusEditor.advancedMode();
		
		var input = statusEditor.getEl( 'input' );
		
		input.focus();

		if ( statusEditor.getTip( 'inputDefault' ) == input.value )
		{
			input.value = '';
		}

		input.value += '(3)';
	}
});

XN.DOM.readyDo( function()
{
	//profile 页状态编辑器
	if ( !/^(profile|userInfo)$/.test( document.body.id ) ) return;
	var statusEditor = new XN.APP.oldStatus.statusEditor();
});

XN.DOM.readyDo( function()
{
	//状态页编辑器
	if ( 'pageStatus' !== document.body.id ) return;
	var statusEditor = new XN.APP.oldStatus.statusEditor();
	statusEditor.beforeShowEditor = function()
	{
		$( 'statusTitle' ).hide();
	};

	statusEditor.beforeHideEditor = function()
	{
		$( 'statusTitle' ).show();
	};

	statusEditor.onPostSuccess = function()
	{
		$( 'pipe' ).show();
	};
});

//Diag
//function closeDiag(){
//    var oP = document.getElementById('comfirm_diag');
//    oP.parentNode.removeChild(oP);
//}
function diagErr(m){
	if (ge('err_msg')) {
		err_div = ge('err_msg');
	}
	else{
		err_div = document.createElement("h4");
		err_div.setAttribute("id", "err_msg");
		err_div.className = "err-msg";
	}
	var par = ge('statusReply');
	par.parentNode.insertBefore(err_div, par);
	err_div.innerHTML = '';
	err_div.appendChild(document.createTextNode(m));
	ge('dialog_confirm').className ="input-button";
	ge('dialog_confirm').value ="重新发送";
}

function diagMsg(m,e){
	XN.DO.alert({
		msg:m,
		type:(e == 'err' ? 'error' : 'normal'),
		noFooter:true,
		autoHide:1
	})
}

//20080616
function getReplyOfTheDoing(idx,fid,fname,doingId,hostId,delFlg){
	//如果是新鲜事
	if (delFlg == 'f') {
		$("feedbody"+idx).style.display="";
		if (!ge("replyfordoing"+idx)) {
			var oDiv=document.createElement("DIV");
			oDiv.id="replyfordoing"+idx;
			ge("feedbody"+idx).appendChild(oDiv);
		}
		if (!ge("tsc"+idx)) {
			var input_tsc=document.createElement("input");
			input_tsc.id="tsc"+idx;
			input_tsc.type="hidden";
			//input_tsc.value=text;
			ge("feedbody"+idx).appendChild(input_tsc);
		}
	}
	var replyKey_idx = "replyKey"+idx;
	if ($(replyKey_idx).innerHTML == "收起回复") {
		closeReplyOfTheDoing(idx);
		return;
	}
	
	var pars="doingId="+doingId;
	if(!addASOnTop(idx))
		return;

	new XN.NET.xmlhttp({
		'url':'getReplyOfDoing.do',
		'data':pars,
		onComplete:getReplyOfTheDoingOK(idx,fid,fname,doingId,hostId,delFlg),
		onError: function(){
			var msg='读取失败，请稍后重试!';
			diagMsg(msg,'err');
		}
	})

}


function getReplyOfTheDoingOK(idx,fid,fname,doingId,hostId,delFlg){
	return function(req){
		var replyfordoing_idx = "replyfordoing"+idx;
		var replyKey_idx = "replyKey"+idx;
		var rpCommentCount_idx = "rpCommentCount"+idx;
//		var contentHTML = "";
		var tmp =[];
		if (delFlg=='d' || delFlg=='o') {
			tmp.push('<div class="mini-cmtbox w565">');
		} else {
			tmp.push('<div class="mini-cmtbox">');
		}
		
		tmp.push('<div class="mini-cbody">');
//		contentHTML += "<ul id='ulItem"+ idx +"' class='commentlist'>";
		tmp.push('<div id="replyList' + idx + '">');
		if (req.responseText != null && req.responseText != "") {
			var text=eval('(' + req.responseText + ')');
			
			XN.ARRAY.each(text,function(i,v){
				tmp.push('<div class="mini-cmt" id="' + v.id + '">');
				tmp.push('<a href="http://xiaonei.com/profile.do?id=' + v.ubid + '">' + v.ubname + '</a>');
				if(v.reply_layer == 1){
					//如果是二级回复
					tmp.push(' ');
				}else{
					tmp.push('：');
				}
				tmp.push('<span>');
				tmp.push(v.replyContent);
				tmp.push('</span>');
				tmp.push('<span class="time small">');
				tmp.push(v.replyTime);
				tmp.push('</span>');
				//二次回复
				if(hostId != v.ubid){
					tmp.push('<a href="#void" onclick="sendSecondaryReply(' + idx + ',' + fid + ',\'' + fname + '\',' + doingId + ',' + hostId + ',' + v.ubid + ',' + v.id + ',\'' + v.ubname + '\',\'' + (delFlg == 'd' ? 'd' : '')+ '\')">回复</a>');
				}
				
				if(delFlg == 'd'){
					tmp.push('<a href="#void" class="x-to-hide"  onclick="confirmBoxForRpDoing(this,\'删除该评论\',\'你确定删除吗？\',\'' + doingId + '\',\'' + fid + '\',\'' + v.id + '\',\'' + idx + '\');"></a>');
				}else if(hostId == v.ubid){
					tmp.push('<a href="#void" class="x-to-hide"  onclick="confirmBoxForRpDoing(this,\'删除该评论\',\'你确定删除吗？\',\'' + doingId + '\',\'' + v.ubid + '\',\'' + v.id + '\',\'' + idx + '\');"></a>');
				}
				tmp.push('</div>');
			});

			if(!(rpCommentCount_idx))$(rpCommentCount_idx).innerHTML = "(" + text.length + ")";
		} else {
			if ($(rpCommentCount_idx))$(rpCommentCount_idx).innerHTML = "";
		}
//		contentHTML += "</ul>";
		tmp.push('</div>');
		tmp.push('<div class="cmt-adding">');
		tmp.push('<div>');
		tmp.push('<textarea id="rp_content_ta' + idx + '"></textarea>');
		tmp.push('</div>');
		tmp.push('<div class="mini-cfooter clearfix">');
		tmp.push('<div class="float-right">');
		tmp.push('<input id="doingreply_cfm' + idx + '" class="input-submit" type="button" value="回复" onclick="this.disabled=true; this.className=\'input-submit gray\'; this.value=\'请稍候\';sendRpl(\'' + idx + '\',\'' + fid + '\',\'' + fname + '\',\'' + doingId + '\',\'' + hostId + '\',\'\',\'\',\'\',\'0\',\'' + (delFlg == 'd' ? 'd' : '')+ '\');" />');
		tmp.push('<input class="input-button gray" type="button" value="取消" onclick="closeReplyOfTheDoing(\'' + idx + '\');" />');
		tmp.push('</div>');
		tmp.push('<span class="status-count" id="chNum' + idx + '">0/70</span>');
		tmp.push('</div>');
		tmp.push('</div>');
		$(replyfordoing_idx).style.display="";
		$(replyKey_idx).innerHTML = "收起回复";

		$(replyfordoing_idx).innerHTML = tmp.join('');
		if(text.length > 0){
			$('replyList' + idx).className = 'cmts-list';
		}
		$('rp_content_ta'+idx).focus();
		(new XN.FORM.inputHelper('rp_content_ta' + idx)).countSize('chNum' + idx,70).onEnter(function(){
			$('doingreply_cfm' + idx).click();
		});
	}
}

function closeReplyOfTheDoing(idx){
	var replyKey_idx = "replyKey"+idx;
	var replyfordoing_idx = "replyfordoing"+idx;
	if (ge(replyKey_idx)) {
		$(replyKey_idx).innerHTML = "回复";
	}
	$(replyfordoing_idx).innerHTML = "";
	$(replyfordoing_idx).style.display="none";
	if ($("feedbody"+idx)) {
		$("feedbody"+idx).style.display="none";
	}
	return;
}



function sendSecondaryReply(idx,fid,fname,doingId,hostId,sToId,secondaryRpId,sToName,flg) {
	$("rp_content_ta"+idx).value="回复"+sToName+"： ";
	var xn_focus = new XN.FORM.textAreaHelper("rp_content_ta"+idx);
	xn_focus.focus();
	$("rp_content_ta"+idx).focus();
	$("doingreply_cfm"+idx).onclick=function(){
			sendRpl(idx,fid,fname,doingId,hostId,sToId,sToName,secondaryRpId,'1',flg);
		}
}

//rpLayer=0是一级回复，rpLayer=1是二级回复
function sendRpl(idx,fid,fname,doingId,hostId,sToId,sToName,secondaryRpId,rpLayer,flg){
	var tmp=ge('rp_content_ta'+idx).value;
	if (tmp == '' || tmp =='@'+fname+' '){
		diagErrOnTop('请输入要回复的内容：',idx);
		ge('doingreply_cfm'+idx).disabled="";
		$('rp_content_ta'+idx).focus();
		return false;
	}	
	var url = "/doing.do";
	var tsc_idx = "tsc"+idx;
	var pars = "c="+ encodeURIComponent( $("rp_content_ta"+idx).value ) +"&tsc="+$(tsc_idx).value+"&ObjRpId="+fid+"&ObjRpNm=" + encodeURIComponent( fname ) +"&doingId="+doingId+"&idx="+idx+"&rpLayer="+rpLayer+"&sToId="+sToId+"&sToName="+sToName;
	if (rpLayer == '1') {
		//二级回复
		pars = "c="+ encodeURIComponent( $("rp_content_ta"+idx).value ) + "&tsc="+$(tsc_idx).value+"&ObjRpId="+fid+"&ObjRpNm="+ encodeURIComponent( fname ) +"&doingId="+doingId+"&idx="+idx+"&rpLayer="+rpLayer+"&sToId="+sToId+"&sToName="+sToName+"&secondaryReplyId="+secondaryRpId;
	}
	new XN.NET.xmlhttp({
		url:url,
		data:pars,
		onComplete:sendRplOK(idx,fid,fname,doingId,hostId,sToId,sToName,secondaryRpId,rpLayer,flg),
		onError: function(){
//			closeReplyOfTheDoing(idx);
			diagErrOnTop('提交失败，请稍后重试。',idx);
		}
	});
}
function sendRplOK(idx,fid,fname,doingId,hostId,sToId,sToName,secondaryRpId,rpLayer,flg) {
	return function(r){
		if (r.responseText == "不当操作更新失败") {
		   closeReplyOfTheDoing(idx);
		   alert("您短时间内提交了重复的内容或者提内容中有非法字符！"); 
		   return;
		}
		if (r.responseText == "DOING_NOT_EXIST") {
		   closeReplyOfTheDoing(idx);
		   alert("该状态不存在或已被删除！"); 
		   return;
		}
		if (r.responseText != null 
			&& r.responseText != ""
			&& r.responseText != "更新失败") {
			$("chNum"+idx).innerHTML = "0/70";
			var rpCommentCount_idx = "rpCommentCount"+idx;
			var rpCount = "";
			if (ge(rpCommentCount_idx)) {
					rpCount = $(rpCommentCount_idx).innerHTML;
			}
			if (rpCount != null && rpCount != "") {
					rpCount = rpCount.replace(/\(/, "");
					rpCount = rpCount.replace(/\)/, "");
					rpCount = parseInt(rpCount) + 1;
			} else {
					rpCount = 1;
			}
			if (ge(rpCommentCount_idx)) {
				$(rpCommentCount_idx).innerHTML = "(" + rpCount + ")";
			}
			var v = text = eval('(' + r.responseText + ')');
			var newLi = $element("div");
			newLi.className = 'mini-cmt';
			newLi.id = v.id;
			var tmp = [];
			tmp.push('<a href="http://xiaonei.com/profile.do?id=' + v.replyerId + '">' + v.replyerName + '</a>');
			if(v.reply_layer == 1){
				//如果是二级回复
				tmp.push(' ');
			}else{
				tmp.push('：');
			}
			tmp.push('<span>');
			tmp.push(v.replyContent);
			tmp.push('</span>');
			tmp.push('<span class="time small">');
			tmp.push(v.replyTime);
			tmp.push('</span>');
			
			if(flg == 'd'){
				tmp.push('<a href="#void" class="x-to-hide"  onclick="confirmBoxForRpDoing(this,\'删除该评论\',\'你确定删除吗？\',\'' + doingId + '\',\'' + fid + '\',\'' + v.id + '\',\'' + idx + '\');"></a>');
			}else{
				tmp.push('<a href="#void" class="x-to-hide"  onclick="confirmBoxForRpDoing(this,\'删除该评论\',\'你确定删除吗？\',\'' + doingId + '\',\'' + v.replyerId + '\',\'' + v.id + '\',\'' + idx + '\');"></a>');
			}
			
			newLi.innerHTML= tmp.join('');
			$('replyList' + idx).className = 'cmts-list';
			$("replyList"+idx).appendChild(newLi);
//			divs = $('replyList' + idx).childNodes;
//			$('replyList' + idx).insertBefore(newLi,divs[]);
			var tsc_idx = "tsc"+idx;

			$(tsc_idx).value=text.tsc;
			$('doingreply_cfm'+idx).className ="input-button";
			$('doingreply_cfm'+idx).disabled="";
			$('doingreply_cfm'+idx).value ="回复";
			$('rp_content_ta'+idx).value="";
			$('rp_content_ta'+idx).focus();
		} else {
			closeReplyOfTheDoing(idx);
			XN.DO.showError('提交失败');
		}
		
		$("doingreply_cfm"+idx).onclick=function(){
			sendRpl(idx,fid,fname,doingId,hostId,"","","",'0',flg);
		}
	}
}


function showStatusEditOnTop(){
	if(!addAS())
		return;
	//$("havedoingdiv").style.display="none";
	//$("nodoingdiv").style.display="none";
	$("doingdiv").style.display="none";
	$("statusEdit").style.display="";
	if($("doing0")){
		$("mySta").value=$("doing0").innerHTML;
		$("mySta").select();
		checkTextLeft($("mySta"));
	}
	$("mySta").focus();
}

function displayStatusEditOnTop(){
	$("doingdiv").style.display="";
	//$("havedoingdiv").style.display="none";
	//$("nodoingdiv").style.display="";
	$("statusEdit").style.display="none";
}

function newSaveDoingOnTop(){
	if($("mySta").value == $("doing1").innerHTML){
		displayStatusEditOnTop();
		return;
	}
		$("statusEdit").style.display="none";
		//$("doingdiv").style.display="";
		$("updatedoing").style.display="";
		
		var myAjax=new Ajax.Request("doing.do",
				{method:"post",
					parameters:"c="+$("mySta").value+"&tsc="+$('tsc').value,
					onComplete:newSaveDoingOKOnTop,
					onFailure:newSaveDoingErrorOnTop
		});
}

function newSaveDoingOKOnTop(r){
	if($("mySta").value.length>0){
		displayStatusEditOnTop();
		$("havedoingdiv").style.display="";
		$("nodoingdiv").style.display="none";
		$("updatedoing").style.display="none";
		$("doing0").innerHTML=r.responseText;
		var aa = r.responseText.replace(new RegExp("\\(L\\)", "gmi"), "<img src='http://xnimg.cn/img/ems/love.gif' alt='爱' class='status-em' />");
		aa = aa.replace(new RegExp("\\(P\\)", "gmi"), "<img src='http://xnimg.cn/img/ems/bulb.gif' alt='绿色环保大使' class='status-em' />");
		aa = aa.replace(new RegExp("\\(C\\)", "gmi"), "<img src='http://xnimg.cn/img/ems/candle.gif' alt='为震区祈福' class='status-em' />");
		aa = aa.replace(new RegExp("\\(B\\)", "gmi"), "<img src='http://xnimg.cn/img/ems/gsilk.gif' alt='绿丝带' class='status-em' />");
		aa = aa.replace(new RegExp("\\(F\\)", "gmi"), "<img src='http://xnimg.cn/img/ems/fist.gif' alt='捍卫校内' class='status-em' />");
		$("doing1").innerHTML=aa;
		$("doing2").innerHTML="刚刚更新";
		$("mySta").value="";
		if($("mcpage")&&$("mcpage").value==0){
			location.reload();
		}
	}else{
		displayStatusEditOnTop();
		$("havedoingdiv").style.display="none";
		$("nodoingdiv").style.display="";
		$("updatedoing").style.display="none";
		$("doing1").innerHTML="";
		$("doing2").innerHTML="";
	}
}
function newSaveDoingErrorOnTop(t){
	alert(t.status+" -- "+t.statusText);
}

function diagErrOnTop(m,idx){
	if (ge('err_msg')) {
		err_div = ge('err_msg');
	}
	else{
		err_div = $element("h4");
		err_div.setAttribute("id", "err_msg");
		err_div.className = "err-msg";
	}
	var par = ge("rp_content_ta"+idx);
	par.parentNode.insertBefore(err_div, par);
	err_div.innerHTML = '';
	err_div.appendChild(document.createTextNode(m));
	$('doingreply_cfm'+idx).className ="input-button";
	$('doingreply_cfm'+idx).value ="重新发送";
}

function addASOnTop(idx){
	var pars = "idx="+idx;
	var as=new Ajax.Request("doing.do",{method:"get",parameters:pars,onComplete:addASOnTopOk(idx),onFailure:addASOnTopOk});
	return as;
}

function addASOnTopOk(idx){
	return function(r) {
		var text=r.responseText;
		text = text.replace( /(\n|\t|\r)/g , '' );
		if(text!=''){
			var tsc_idx = "tsc"+idx;
			$(tsc_idx).value=text;
		}
	}
}


function delMyReplyDoingOk(idx,rpId){
	return function(r) {
		var text=r.responseText;
		if(text=='' || text=='删除失败' || text=='你没有删除的权限'){
			XN.DO.showError('删除失败');
		} else {
			var rpCommentCount_idx = "rpCommentCount"+idx;
			var rpCount="";
			if (ge(rpCommentCount_idx)) {
				rpCount = $(rpCommentCount_idx).innerHTML;
			}
			if (rpCount != null && rpCount != "") {
					rpCount = rpCount.replace(/\(/, "");
					rpCount = rpCount.replace(/\)/, "");
					rpCount = parseInt(rpCount) - 1;
					if (rpCount == 0) {
						if (ge(rpCommentCount_idx)) {
							$(rpCommentCount_idx).innerHTML = "";
						}
					} else {
						if (ge(rpCommentCount_idx)) {
							$(rpCommentCount_idx).innerHTML = "(" + rpCount + ")";
						}
					}
			} else {
				if (ge(rpCommentCount_idx)) {
					$(rpCommentCount_idx).innerHTML = "";
				}
			}
			if ($(rpId)) {
				var delLi = ge(rpId);
				$("replyList" + idx).removeChild(delLi);
			}
			//closeReplyOfTheDoing(idx);
		}
	}
}
function delMyReplyDoingErr(idx){
	return function(r) {
		XN.DO.showError('删除失败');
	}
}


function confirmBoxForRpDoing(obj,head,msg,doingId,userId,rpId,idx){
	XN.DO.confirm({
		title:head,
		msg:msg,
		callBack:function(r){
			if(r){
				var url = "delMyReplyDoing.do";
				var pars = "replyId="+rpId+"&userId="+userId+"&doingId="+doingId;
				new Ajax.Request(url, {
					method: 'post',
					parameters: pars,
					onComplete:delMyReplyDoingOk(idx,rpId),
					onFailure: delMyReplyDoingErr(idx)
				});
			}
		}
	});
}

function delMyRpDoing(obj,doingId,userId,rpId,curpage){
	XN.DO.confirm({
		title:'删除评论',
		msg:'确定删除该评论吗?',
		callBack:function(r){
			if(r){
				window.location.href="/delMyReplyDoingEx.do?replyId="+rpId+"&userid="+userId+"&curpage="+curpage+"&doingId="+doingId;
			}
		}
	});
}

function delMyDoing(obj,doingId,userId,curpage){
	XN.DO.confirm({
		title:'删除状态',
		msg:'确定删除此状态吗?',
		callBack:function(r){
			if(r){
				window.location.href="/delmydoing.do?id="+doingId+"&userid="+userId+"&curpage="+curpage;
			}
		}
	});
}
