MI.Mood = {
    dataString:{},		//缓存收听的心情String数据，传给flash
    curveData:{},		//缓存收听的心情数据
    place:(MI.boss && {'11':1,'13':2,'7':3}[MI.boss]) || 0,  //所在页面位置1：主页，2：我的广播，3客人页
    flashCount:0,  //递增计数，避免页面多个曲线flash，混淆
    published:0,   //今天是否发表过
    isFloat:function(){   //返回当前是否是浮层状态
        return MI.dialog.display;  
    },
    getCurveData:function(account,callBack){
        var Self = this;
        MI.ajax({
            url:'/asyn/signList.php',
            //url:MI.url.signList,
            data:{u:account},
            success:function(sourceData){
                var data = MI.json(sourceData);
                if(data.result==0){
                	Self.dataString[account] = sourceData;
                    Self.curveData[account] = data.info;
                    if(callBack) callBack(sourceData); //传入字符串
                } 
            }
        });       
    },
    insertFlash:function(account,target){  //加载flash曲线数据
        var Self = this,flashId = 'MoodCurve';
        if(!Self.curveData[account]) Self.getCurveData(account,buildFlash);
        else buildFlash();
        
        function buildFlash(){
        	var o = Self.curveData[account];
                if(!target || !o.total || !o.talk.length) return; 
            	Self.flashCount++;
            	flashId += Self.flashCount;
                var htmlStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + flashId + '" width="100%" height="100%" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="http://mat1.gtimg.com/www/mb/swf/Mood_110720.swf" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="align" value="middle" /><param name="allowScriptAccess" value="always" /> <embed src="http://mat1.gtimg.com/www/mb/swf/Mood_110720.swf" quality="high" width="100%" height="100%" name="' + flashId + '" align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>';
                target.innerHTML = htmlStr; 
                UI.show(target.parentNode)
                drawCurve();
            
        }
        
        function drawCurve(){
        	clearTimeout(Self.delayDraw);
        	if(document[flashId] && document[flashId]._drawCurve) {
                document[flashId]._drawCurve(Self.dataString[account]);
                Self.Bos('CurveShow');
			} else {
				Self.delayDraw = setTimeout(drawCurve,200);
			}
        }
    },
    Bos:function(eventType,moodType){  //曲线上的点，统计
        if(!eventType) return;
    	var Self = this;
        var place = Self.isFloat()? 'Box' : ['','Home','Home','Guest'][Self.place];
    	MI.Bos('btnMood' + place + eventType,moodType); 
    },
    showDetail:function(account,type,timestamp){     //日历筛选模式
    	var Self = this,
            isMe = account == MI.user.account,
            user = isMe ? (account + '/mine') : account,
            t =  new Date(timestamp*1000),
            y = t.getFullYear(),
            m = t.getMonth(),
            d = t.getDate();

    	var url = 'http://' + MI.host + '/' +  user + '?filter=9&date=' + y + Self.ft(m + 1) + Self.ft(d);
    	//if(!Self.place || Self.place==1 || (Self.place==3 && Self.isFloat())){  
        //    window.open(url);
    	//} else {
            //自己的广播页，和客人页的客人日历，才当前页跳转  
            location.href = url;
    	//}
    	return false;
    },
    ft:function(t){ //formatTime
        return ((t + '').length == 1 ? '0' : '') + t;
    }
};

window['_flash_Mood_Bos'] = function(e,t){
	MI.Mood.Bos(e,t);
}	
window['_flash_Mood_calendar'] = function(u,t,d){
	MI.Mood.showDetail(u,t,d);
}
/**
 * 打开签到浮层
 *
 * @param {Number} type 要显示的浮层选项卡，0表示签到，1表示收听的心情
 *
 *  @example
 *		MI.Mood.floatBox.show(0);
 *
 */
MI.Mood.floatBox = (function(){
        var ico_50 = 'http://mat1.gtimg.com/www/mb/images/tFace/';
        var ico_20 = 'http://mat1.gtimg.com/www/mb/images/tFace/';
        var html = '<div class="DshareWrap">\
                            	<div class="tabStyle1 shareTitle">\
                                	<ul>\
                                    	<li class="select"><a href="#">' + _('我的心情') + '</a></li>\
                                        <li><a href="#">' + _('大家的心情') + '</a></li>\
                                    </ul>\
                                </div>\
                                <div class="temper wMood">\
                                	<div style="display:none;"><p class="guide"></p></div>\
                                	<dl class="clear">\
                                    	<dt>' + _('选择心情：') + '</dt>\
                                        <dd class="temperList">\
                                        	<a title="' + _('狂喜') + '" href=""><img src="' + ico_50 + '01_50.gif"><em></em></a>\
                                            <a title="' + _('偷乐') + '" href=""><img src="' + ico_50 + '02_50.gif"><em></em></a>\
                                            <a title="' + _('无感') + '" href=""><img src="' + ico_50 + '03_50.gif"><em></em></a>\
                                            <a title="' + _('伤心') + '" href=""><img src="' + ico_50 + '04_50.gif"><em></em></a>\
                                            <a title="' + _('咆哮') + '" href=""><img src="' + ico_50 + '05_50.gif"><em></em></a>\
                                        </dd>\
                                    	<dt>' + _('抒发情绪：') + '</dt>\
                                        <dd style="position:relative;_zoom:1"><textarea id="tempertext" class="tempertext inputArea textarea" style="border-color: rgb(206, 206, 206);"></textarea></dd>\
                                        <dt></dt>\
                                        <dd><p class="btnBox" style="float:none;"><button class="tsendBtn inputBtn sendBtn" style="float:right;">' + _('广播') + '</button>\
                                        <span class="countTxt" style="height:33px;">' + _('还能输入<em>140</em>字') + '</span></p></dd>\
                                        <dt class="lastMLabel" style="display:none;">' + _('最近心情：') + '</dt>\
                                        <dd class="lastMCont" style="display:none;"></dd>\
                                        </dl>\
                                </div>\
                        <div class="temper rMood" style="display:none;">\
                                	<div class="recent">\
                                    	<span class="recentTitle">' + _('今天大家的心情：') + '</span>\
                                        <a class="select" href="">' + _('全部') + '<em></em></a>\
                                        <a title="' + _('狂喜') + '" href=""><img src="' + ico_20 + '01_20.gif"><em></em></a>\
                                        <a title="' + _('偷乐') + '" href=""><img src="' + ico_20 + '02_20.gif"><em></em></a>\
                                        <a title="' + _('无感') + '" href=""><img src="' + ico_20 + '03_20.gif"><em></em></a>\
                                        <a title="' + _('伤心') + '" href=""><img src="' + ico_20 + '04_20.gif"><em></em></a>\
                                        <a title="' + _('咆哮') + '" href=""><img src="' + ico_20 + '05_20.gif"><em></em></a>\
                                    </div>\
                                    <div class="temperConList">\
                                        <ul>\
                                        </ul>\
                                    </div>\
                                    <div class="pages">\
                                    </div>\
                                </div>\
                     <div class="temper success" style="display:none;">\
                                    <div class="talkSuc" style="">\
                                    	<span class="tstip"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg">' + _('广播成功！') + '</span></span>\
                                    	<p><a href="#" class="lookOther">' + _('看看大家的心情') + '</a></p>\
                                    </div>\
                                    <div class="temperFlash" style="display:none">\
                                    	<p><a href="http://t.qq.com/' + MI.user.account + '/mine?filter=9" target="_blank" onclick="MI.Bos(\'btnMoodBoxCurveLink\')"><span>' + _('心情曲线：') + '</span></a>' + _('记录每天心情，绘制我的专属心情曲线！') + '</p>\
                                    	<div class="flashWrap" style="height:100px;"></div>\
                                    </div>\
                                </div>\
                     </div>';           
            
            var _body,_wTab,_rTab,_wMood,_rMood,_sMood,_guide,_mList,_talkBox,_lastMLabel,_lastCont,_lookOther,
            	_send,_count,_flashWrap,_rTitle,_rList,_tstip,_rMoodList,_page;
            	
            var wType=0;
            var typeArr = [1,2,4,8,16];
            var rType=0;
            var currData;       //当前心情数据
            var userType = 'undefined';   //是收听的人还是随机
            var _published = 0;
            var moodCache = {};  //心情数据缓存
            var SHOW_NUM = 6;  //一页显示的心情数目
            var typeArr2 = [0,1,2,4,8,16];
            //var strObj = {'1':'05','2':'04','4':'03','8':'02','16':'01'} //表情图片序号
            var u = MI.user.account;
            var today = new Date();
            var talkBox;
            	

            	
            function buildBody(){
            	if(!_body) {
		             _body = UI.html(html)[0];
		             _wTab = $$(_body,'.shareTitle a')[0];
		             _rTab = $$(_body,'.shareTitle a')[1];
		             _wMood = $$(_body,'.wMood')[0];            
		             _rMood = $$(_body,'.rMood')[0];
		             _sMood = $$(_body,'.success')[0];
		             _guide = $$(_wMood,'.guide')[0];
		             _mList = $$(_body,'.temperList a'); //心情种类
		             _talkBox = $$(_body,'.tempertext')[0];
		             _lastMLabel = $$(_body,'.lastMLabel')[0];
		             _lastMCont = $$(_body,'.lastMCont')[0];
		             _lookOther = $$(_body,'.lookOther')[0];
		             _send = $$(_body,'.tsendBtn')[0];
		             _count = $$(_body,'.countTxt')[0];
                     _flashWrap = $$(_body,'.flashWrap')[0];
					 _tstip = $$(_body,'.tstip')[0];	
		   	         _rTitle = $$(_body,'.recentTitle')[0];
		             _rList = $$(_body,'.recent a');  //心情种类
		             _rMoodList = $$(_body,'.temperConList')[0];
		             _page = $$(_body,'.pages')[0];
                     
                     //talkBox
                     talkBox = new MI.TalkBox(_wMood);
                     talkBox.boxType = 'mood';
                     talkBox.addList = 1;
                     talkBox.successStart=function(data){
                            MI.dialog.hideLoad();
                            MI.Mood.curveData[u] = null;  //清除之前的数据，重新拉取
                            switchBox(2);
                            _published = 1;  //今日已发表过
                            talkBox.emotion = '';
                            setTimeout(function(){
                                if(UI.B.ie) MI.Mood.insertFlash(u,_flashWrap);
                            },100);
                     }
                     talkBox.failStart = function(data){
                         MI.dialog.hideLoad();
                         setTip(data.msg);
                     }

                     bindEvent();
                } 
                return _body;
            }    
            

            function selectCurr(list,curr){
                UI.each(list,function(o,i){
                    UI.removeClass(o,'select');
                    if(i==curr) UI.addClass(o,'select');
                })
            }
            
            //选择wording
            function showWording(){
                if(!MI.Mood.curveData[u]) {
                    MI.Mood.getCurveData(u,toggleWording);
                } else {
                    toggleWording();
                };
                showWording = function(){};
            }

            function toggleWording(){
                var oldMoods = MI.Mood.curveData[u].talk;
                var total = MI.Mood.curveData[u].total;
                var P = _guide.parentNode;
                if(total<=3){
                    _guide.innerHTML = _('选择表情，抒发心情');
                    UI.addClass(P,'relayList');    
                } else {
                    UI.addClass(P,'guide02');
                    _guide.innerHTML = [
                        _('今天，你开心么？'),
                        _('今天遇上什么事了？'),
                        _('每日心情调频，今天的你在哪个波段？'),
                        _('记录每日微心情'),
                        _('抓拍下你的心情吧'),
                        _('Mark 一下今天的心情吧'),
                        _('为每天的心情留个爪~')
                        ][today.getDay()];
                }
                UI.show(P);

                if(total>0) {
                    var o = oldMoods[0];
                    _lastMCont.innerHTML = '<a href="#">' + MI.string.cut(o.content,90 + 50) + '</a>'; //90是图片长度
                    UI.show(_lastMLabel);
                    UI.show(_lastMCont);
                    _lastMCont.onclick = function(){
                        MI.Mood.showDetail(u,o.sign,o.timestamp);
                        MI.Bos('btnMoodBoxCurrent');
                        return false;
                    }
                }
            };
            
			//输入框引导wording部分...............................
			
            var _selectWord= '';
            var _wordList = [
            	[_('人逢喜事需留爪，记一笔~'),
            	_('今天诸事给力，得瑟一下~'),
            	_('黄瓜必须拍，人生必须嗨！'),
            	_('淫生苦短，必须性感。'),
            	_('我签的不是心情，是骄傲！')
            	],
            	[_('如果感到开心，你就写心情~'),
            	_('今天很欢乐，好心情要保鲜'),
            	_('心满意足享受每一点快乐，是走向幸福的唯一途径。')
            	],
            	[_('今日无悲喜，平平淡淡才是真'),
            	_('无感的一天，明天求进步')
            	],
            	[_('今日遭遇小黑叉，记一笔转个运！'),
            	_('麦兜说：大难不死，必有锅粥。所以，要开心哦！'),
            	_('只要活着一定会遇上好事的。'),
            	_('不准不开心，微笑面对，勇敢体会。'),
				_('开心了就笑，不开心了就过会儿再笑。'),
            	_('人生留下的不过是深浅不一的印记，付之一笑的回忆。'),
            	_('要笑得灿烂,令世界黯然;即使忧伤,也要无比鲜艳。')
            	],
            	[_('怒了，刨个洞，大喊三千声！'),
            	_('怒火中烧一声吼啊~地球都要抖一抖哇~'),
            	_('表生气了，就算被狗咬了，也不要去咬它。'),
            	_('生活的一半是倒霉，另一半是如何处理倒霉。'),
            	_('与其生别人的气，不如睡自己的觉。'),
            	_('快乐是一天，不快乐也是一天，为什么不天天快乐呢？'),
            	_('什么叫快乐？就是按捺住内心咆哮的冲动对每个人微笑。'),
            	_('成熟不是心变老，而是怒火在燃烧还保持微笑。')
            	]
            	];
			
			//返回0和给定数之间随机数
			function getRnd(n){
				return Math.floor(Math.random()*n);
			}
			//选择心情时的wording，用户没有输入时出现
			function selectWording(i){
				var wording = _wordList[i][getRnd(_wordList[i].length)];
				clearWording();
				if(_talkBox.value == ''){
					_talkBox.value = _selectWord = wording;
					_talkBox.focus();
					UI.addClass(_talkBox,'gray');
					//MI.selectTxt(_talkBox,0,wording.length);
				}
			}

			//清除wording
			function clearWording(){
				if(_selectWord && _talkBox.value.hasString(_selectWord)) {
					_talkBox.value = _talkBox.value.replace(_selectWord,'');
					_selectWord = '';
					UI.removeClass(_talkBox,'gray');
					talkBox.countTxt();
				}	
			}
			


			//输入框引导wording部分结束....................

			//显示错误提示
			function setTip(str){
				_count.innerHTML = '<span class="error">' + str + '</span>';
			};
			
            //发布前检查
            function checkPublish(){   
                if(!wType) {
                    setTip(_('请选择一个心情'));
                    MI.Bos('btnMoodWriteNoType');
                    return false;
                }
                if(!UI.trim(_talkBox.value) || _talkBox.value == _selectWord) {
                	clearWording();
                    setTip(_('为心情写点话吧'));
                    MI.Bos('btnMoodWriteNoCont');
                    _talkBox.focus();
                    return false;
                }  
                return true;
            }
            //切换选项卡
            function switchBox(n){
                if((_published || MI.Mood.published) && n==0) {
                	n = 2;
					_tstip.innerHTML = _('今天已经写过心情');
					_tstip.style.width = '200px';
					_tstip.style.display = 'inline-block';
				}	
                UI.each([_wMood,_rMood,_sMood],function(o,i){
                    UI.hide(o);
                    if(n==i) UI.show(o);
                });
                if(n==0) showWording();
                if(n==1) showMoodList(rType);
                if(n==2) {
                	if(!UI.B.ie || (UI.B.ie && !_published)) {
                		MI.Mood.insertFlash(u,_flashWrap);
                		_published = 1;
					}	
				}	
            }
            //切换选项卡样式
            function switchTab(n) {
                UI.each([_wTab,_rTab],function(o,i){
                    if(n==i) UI.addClass(o.parentNode,'select');
                    else UI.removeClass(o.parentNode,'select');
                });
            }
            //发布心情
            function publish(){
                if(!checkPublish()) return;
                MI.dialog.showLoad();
                talkBox.emotion = wType;
                talkBox.send();
            };
            
            //显示收听的心情列表100条
            function showMoodList(type){
                if(moodCache[type + '_' + userType]) {          
                    buildList(moodCache[type + '_' + userType]);
                    return;
                }
                if(userType === 'undefined') _rTitle.parentNode.style.visibility = 'hidden';
                MI.dialog.showLoad();
                MI.ajax({
                    url:'/asyn/friendSigns.php',
                    //url:MI.url.friendSigns,
                    /*
                    {result:0,msg:'','info':{'user':'haierer','hasNext':1,'time':1309352680,'talk':[{"id":"55017111981143","content":"dsfsdfds","image":[],"time":"6\u670824\u65e5 17:17","type":1,"sign":16,"status":0,"from":"\u6765\u81ea\u7f51\u9875<\/span>","tran":0,"name":"bullnba","nick":"\u8def\u4eba","bkname":"","icon":"","flag":[],"pic":"http:\/\/t2.qlogo.cn\/mbloghead\/8aafbfdf6bef9c145a0e\/50","count":0,"counts":[0,0,0],"timestamp":1308907067}]}}
                     */
                    data:{t:rType,ut:userType,index:0,num:100},
                    success:function(data){
                        MI.dialog.hideLoad();
                        _rTitle.parentNode.style.visibility = 'visible';
                        data = MI.json(data);
                        if(data.result==0){
                            userType = data.info.ut;
                            moodCache[type + '_' + userType] = data.info;
                            buildList(moodCache[type + '_' + userType]);
                        }
                    }
                })
            }
            

            //初始化列表
            function buildList(o){
                currData = o;
                if(!o.talk || !o.talk.length) {
                    _rMoodList.innerHTML = '<p class="empty" style="zoom:1;height:21px;">' + (rType!= 0 ? _('今天还没有人写过此类心情签到') : _('今天还没有人写过心情签到')) + '</p>';
                    return;
                }   
                createPage(o.talk.length,0);
                createList(0,SHOW_NUM);
            }
            

            //创建列表
            function createList(start,end){
                var str = '<ul>',o,src,len,date,y,m,d,time,ft = MI.Mood.ft;
                for(i=start;i<end;i++){
                    o = currData.talk[i];
                    if(!o) continue;
                    //src = strObj[o.sign];

                    date = new Date(o.timestamp*1000);
                    y = date.getFullYear();
                    m = date.getMonth();
                    d = date.getDate();
                    if(m == today.getMonth() && d == today.getDate()){
                        time = ft(date.getHours()) + ':' +  ft(date.getMinutes());  //是今天则显示时间
                    } else {
                        time = (m + 1) + _('月') + d + _('日');  //不是今天 显示日期
                    }            

                    len = 90 + 48 - MI.string.length((o.bkName || o.nick) + time);  //90是心情图片img标签的html字段长
                    var url = 'http://' + MI.host + '/' + o.name + '?filter=9';
                    str += '<li><a style="cursor:pointer" href="' + url + '">';
                    str += '<img class="userPic" src="' + o.pic.replace(/\/50$/,'/20') + '" />';
                    str += '<p class="temperCon" title="' + o.content.substring(90) + '">' + (o.bkName || o.nick) + '： ';
                    str +=  MI.string.cut(o.content,len) + '</p>';
                    str += '<span class="time" rel="' + o.timestamp +'" title="' + '' + '">' + time + '</span>';
                    str += '</a></li>';
                }
                str += '</ul>';
                _rMoodList.innerHTML = str;
            }
            
            //翻页
            function createPage(num,pn){
                //都从0计算
                var p = Math.ceil(num/SHOW_NUM);
                var str = '';
                if(p<=1) {
                    _page.innerHTML = ' ';   //只有1页不显示翻页
                    return;
                }
                str += pn==0 ? '<span class="gray">' + _('上一页') + '</span>' : '<a href="#" p="' + (pn-1) + '">' + _('上一页') + '</a>';
                for(i=0;i<p;i++){
                    str +=(pn == i) ? ('<strong style="margin-left:5px;">' + (i+1) + '</strong>') :('<a href="#" p="' + i + '">' + (i+1) +  '</a>');
                };
                str += pn==p-1 ? '<span class="gray">' + _('下一页') + '</span>' : '<a href="#" p="' + (pn+1) + '">' + _('下一页') + '</a>';
                _page.innerHTML = str;

                UI.each(UI.GT(_page,'a'),function(o,j){
                    o.onclick = function(){
                        var n = parseInt(UI.A(this,'p'));
                        createList(n*SHOW_NUM,(n+1)*SHOW_NUM);
                        createPage(num,n);
                        return false;
                    }
                })
            }
                    
            function bindEvent(){
                UI.each(_mList,function(o,i){
                    o.onclick = function(){
                        selectCurr(_mList,i);
                        wType = typeArr[i];
                        if(_talkBox.value != _selectWord) {
                        	_talkBox.focus();
                        	talkBox.countTxt();
						}
                        selectWording(i)
                        return false;
                    };
                })

                UI.each([_wTab,_rTab],function(o,i){
                    o.onclick = function(){
                        if(!UI.hasClass(o,'select')) {
                            switchTab(i);
                            switchBox(i);
                            MI.Bos(i==0 ? 'btnMoodBoxWriteTab':'btnMoodBoxLookTab');
                        }
                        return false;
                    }
                });
                
                UI.each(_rList,function(o,i){
                    o.onclick = function(){
                        selectCurr(_rList,i);
                        rType = typeArr2[i];
                        showMoodList(rType);
                        MI.Bos('btnMoodBoxLookFilter_' + rType);
                        return false;
                    };
                })
                
                _lookOther.onclick = function(){
                    switchTab(1);
                    switchBox(1);
                    MI.Bos('btnMoodBoxLookOther');
                    return false;
                }

                UI.EA(_talkBox,'keydown',clearWording);
                //UI.EA(_talkBox,'keyup',clearWording);
                UI.EA(_talkBox,'mouseup',clearWording);
                _talkBox.onblur = _talkBox.onbeforeeditfocus = null;
                _send.onclick = publish;
            }    

            function show(type){
                MI.dialog.show({
                    title:'<h1 class="DmainTit"></h1>',
                    html:buildBody(),
                    width:460,
                    start:function(){
                        //根据type，显示对应的tab
                        type = type || 0;
                        if(type==0 && _published) type=1; //如果今天签过到，签到层改收听层 
                        MI.Mood.published = type;
                        switchTab(type);
                        switchBox(type);
                        //bindEvent(); 
                    }
                });
            };
            
            return {
                show:show
            }           
})();
