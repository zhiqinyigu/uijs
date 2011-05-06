/**
 * 图片模式tweets列表
 * @author <a href="mailto:staurenliu@tencent.com">staurenliu</a>
 * @namespace MI.PicList 图片消息列表
 * @constructor
 * @param {String} id 图片列表容器id或dom对象
 * @param {Object} config 不同模式下微调的参数对象
 * @config {boolean} doMore support asyn loading or not, default true
 * @config {String} owner thie list owner's id in guest mode
 * @config {integer} offsetX x-axis offset in px of the tip, default 0
 * @config {integer} offsetY y-axis offset in px of the tip, default 0
 * @config {integer} direction pop out direction of the tip. 0:auto,
 *                             1:up, 2:down, default 0
 * @config {mixed} arrPos arrow position of the tip. 0:middle of icon img.
 *                        other value is used as ico height. default 0
 * @config {boolean} merge lazy loaded pictures will be auto merged,
 *                            defaul false
 *            @example
 *            MI.picList = new MI.PicList('container-id');
 */

/*
 * 消息type含义： 1:原创发表, 2:转载, 3:私信, 4:回复, 5:空回, 6:提及, 7:评论
 * TODO : '加载中'
 */
MI.PicList = function (id, config) { //Pic List
  var that = this,
    ctn = $(id);

  if (!ctn) {
    return;
  }

  this.config = this._preprocCfg(config || {});

  this.id = id;

  if (!UI.children(ctn).length) {
    this._showEmpty();
    return;
  }

  this.active = null;
  this.content = null;
  this._prepareTip();
  this._addEvents();
  this.oriBodyZindex = $$($('mainWrapper'), '.main')[0].style.zIndex;

  if (this.config.doMore) {
    this._more = $$($('moreList'),'a')[0];
    if (this._more) {
      this._more.onmouseover = MI.hideFocus;
      this._more.onclick = function (e) {
        that.more();
        UI.E(e).prevent();
      }
      //Self._more.onfocus = MI.blur;
    }
    setTimeout(function () {
      //Cache Last
      that.cacheLast();
      //Cache First
      //Self.cacheFirst();
    }, 0);
    this.autoMore();
  }

  if (UI.B.ie === 6) {
    try {
      document.execCommand('BackgroundImageCache', false, true);
    } catch (e) {}
  }

  //do not merge lazy loaded pictures
  if (!this.config.merge) {
    MI.user.fun.mergePic = 0;
  }
};

MI.PicList.CRS_REG = /class="crs" crs="([^"]+)"/g;
MI.PicList.CLICK_REG = /clk-([0-9]+)(?:\s+|$)/;

MI.PicList.bind = function (fn, scope) { //Pic List
  return function () {
    fn.apply(scope, Array.prototype.slice.call(arguments));
  };
};

/**
 * function to test whether the dom needle is in haystack
 * @param {object} needle
 * @param {object} haystack
 */
MI.PicList.contains = (function () {
  if (document.documentElement.contains) {
    return function (needle, haystack) {
      if (!needle || !haystack || !needle.tagName || !haystack.tagName) {
        return false;
      }
      return haystack.contains(needle);
    };
  } else if (document.documentElement.compareDocumentPosition) {
    return function (needle, haystack) {
      if (!needle || !haystack || !needle.tagName || !haystack.tagName) {
        return false;
      }
      return !!(haystack.compareDocumentPosition(needle) & 16);
    };
  } else {
    return function () {};
  }
}());

/**
 * function to break long string in an element
 * @param {object} dEl the dom element contains the long string
 */
MI.PicList.breakWord = function (dEl) {
  if(!dEl || dEl.nodeType !== 1){
    return false;
  } else if(dEl.currentStyle &&
      typeof dEl.currentStyle.wordBreak === 'string') {
    //Lazy Function Definition Pattern
    MI.PicList.breakWord = function (dEl) {
      //For Internet Explorer
      dEl.runtimeStyle.wordBreak = 'break-all';
      return true;
    };
    return MI.PicList.breakWord(dEl);
  } else if (document.createTreeWalker) {
    MI.PicList.breakWord = function (dEl) {
      //For Opera, Safari, and Firefox
      var dWalker = document.createTreeWalker(dEl,
        NodeFilter.SHOW_TEXT, null, false);
      var node,s,c = String.fromCharCode('8203');
      while (dWalker.nextNode()) {
        node = dWalker.currentNode;
        //we need to trim String otherwise Firefox will display 
        //incorect text-indent with space characters
        s = node.nodeValue.replace(/^\s\s*|\s*\s$/g, '').split('').join(c);
        node.nodeValue = s;
      }
      return true;
    };
    return MI.PicList.breakWord(dEl);
  } else {
    return false;
  }
};

MI.PicList.getWindowXY = function () {
  var height = window.innerHeight, // Safari, (Opera)
    width = window.innerWidth,
    mode = document.compatMode;

  if ((mode || UI.B.ie)) { // IE, Gecko, (Opera)
    if (mode === 'CSS1Compat') { // Standards
      height = UI.B.opera ? height : document.documentElement.clientHeight;
      width = document.documentElement.clientWidth;
    } else { // Quirks
      height = UI.B.opera ? height : document.body.clientHeight;
      width = document.body.clientWidth;
    }
  }
  return [width, height];
};

MI.PicList.getDocumentXY = function () {
  var scrollWidth, scrollHeight, wxy;

  if (document.compatMode !== 'CSS1Compat' || UI.B.webkit) {
    scrollWidth = document.body.scrollWidth;
    scrollHeight = document.body.scrollHeight;
  } else {
    scrollWidth = document.documentElement.scrollWidth;
    scrollHeight = document.documentElement.scrollHeight;
  }

  wxy = MI.PicList.getWindowXY();

  return [Math.max(scrollWidth, wxy[0]), Math.max(scrollHeight, wxy[1])];
};


MI.PicList.prototype._clickMap = {
  1 : function () {
    MI.Bos('btnPicListClk1');
    return true;
  },
  2 : function () {
    MI.Bos('btnPicListClk2');
    return true;
  }
};

MI.PicList.prototype._preprocCfg = function (cfg) {
  var tmp, obj = {};

  UI.each('offsetX offsetY direction arrPos'.split(' '), function (o) {
    tmp = cfg[o];
    obj[o] = parseInt(tmp) === tmp ? tmp : 0;
  });

  obj.doMore = cfg.doMore === false ? false : true;
  obj.merge = cfg.merge === true ? true : false;
  obj.owner = cfg.owner || '';

  return obj;
};

MI.PicList.prototype._addEvents = function () {
  var wholeList = $(this.id);
  UI.EA(wholeList, 'mouseover', MI.PicList.bind(this._hlMouseOver, this));
  UI.EA(wholeList, 'mouseout', MI.PicList.bind(this._hlMouseOut, this));
  UI.EA(wholeList, 'click', MI.PicList.bind(this._hlClick, this));
};

MI.PicList.prototype._hlMouseOver = function (e) {
  var tar, i;

  e = UI.E(e);
  tar = e.target;
  i = 3;

  while (i-- > 0 && tar && tar.tagName) {
    if (tar.className === 'imgView' && tar.id) {
      this._delayShowTip(tar.id);
      break;
    } else if (MI.PicList.contains(tar, this._container)) {
      break;
    }
    tar = tar.parentNode;
  }

  e.stop();
};

MI.PicList.prototype._hlMouseOut = function (ev) {
  var tar, i, e, rel, doHide;

  e = UI.E(ev);
  tar = e.target;
  i = 3;
  rel = ev.relatedTarget || ev.toElement;

  if (rel === this._container ||
      MI.PicList.contains(rel, this._container)) {
    return;
  }

  if (tar === this._container ||
      MI.PicList.contains(tar, this._container)) {//mouse out from the tip
    if (!MI.PicList.contains(rel, this._container) &&
        !MI.PicList.contains(rel, $(this.id))) {
      doHide = true;
    }
  } else {//mouse out from the img list
    while (i-- > 0 && tar && tar.tagName) {
      if (tar.className === 'imgView' && tar.id) {
        if (rel !== tar && !MI.PicList.contains(rel, tar)) {
          doHide = true;
        }
        break;
      }
      tar = tar.parentNode;
    }
  }

  if (doHide) {
    this._hide();
  }
};

MI.PicList.prototype._hlClick = function (e) {
  var el, time, matches, i = 3, reg, oHl, eo;

  el = e.target;
  eo = UI.E(e);

  reg = MI.PicList.CLICK_REG;
  oHl = this._clickMap;

  while (i-->0 && el) {

    matches = el.className && el.className.match(reg);
    matches = matches && matches[1];
    if (matches in oHl) {
      if (oHl[matches](el, e) !== true) {
        eo.stop();
        eo.prevent();
      }
      break;
    }
    el = el.parentNode;
  }
};

MI.PicList.prototype._prepareTip = function () {
  var ctn;
  if (!this._container) {
    this._container = UI.html('<div class="imgModTips cardT loading" style="display:none;z-index:1000;"><div></div><div class="uloadBox"><em class="loading"></em>' + _('加载中') + '</div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>')[0];
    ctn = $(this.id);
    ctn.insertBefore(this._container, ctn.firstChild);
    this._arrow = $$(this._container, '.SA')[0];
    this.direction = 'T';
  }
};

MI.PicList.prototype._changeDir = function () {
  var newDir = this.direction === 'T' ? 'B' : 'T';

  UI.removeClass(this._container, 'card' + this.direction);
  this.direction = newDir;
  UI.addClass(this._container, 'card' + newDir);
};

MI.PicList.prototype._delayShowTip = function (id) {
  var that = this;
  if (this.active !== id) {
    if (this._showTipId) {
      clearTimeout(this._showTipId);
      this._showTipId = null;
    }
    this._showTipId = setTimeout(function () {
      that._showTip(id);
    }, 200);
  }
};

MI.PicList.prototype.arrTop = function () {
  if (this.direction === 'B') {
    this._changeDir();
  }
};

MI.PicList.prototype.arrBottom = function () {
  if (this.direction === 'T') {
    this._changeDir();
  }
};

MI.PicList.prototype._showTip = function (id) {
  var more, img, url, that, item, mainWrap, tmp;

  if (this.active === id) {
    return;
  }

  mainWrap = $$($('mainWrapper'), '.main')[0]
  if (this.oriBodyZindex === mainWrap.style.zIndex) {
    this.oriBodyZindex = mainWrap.style.zIndex;
    mainWrap.style.zIndex = 10;
  }
  $('mainWrapper').style.zIndex = MI.user.college ? 10000 : 3;//college is 9999

  if (this.content === id) {
    UI.show(this._container);
    return;
  } else {
    UI.hide(this._container);
    tmp = this._container.firstChild;
    this.content = null;
    tmp.innerHTML = '';
    if (UI.B.ie === 6) {
      tmp.style.cssText = '_font-size:0';
    }
  }

  this.active = id;
  item = $(id);
  that = this;

  this._showLoadId = setTimeout(function () {
    that._show(true, item);
  }, 500);

  more = $$(item, '.imgModMore')[0];
  img = $$(more, 'img');
  img = img[0];
  url = img.src || UI.A(img, 'crs');
  img = new Image();
  img.onload = function () {
    var imgs;
    if (that._showLoadId) {
      clearTimeout(that._showLoadId);
      that._showLoadId = null;
    }
    //onload may be called multiple times for gif
    if (that && that.active === id) {
      that.content = id;
      if (UI.B.ie === 6) {
        that._container.firstChild.cssText = '';
      }
      that._container.firstChild.innerHTML = more.innerHTML;
      UI.each(that._container.firstChild.getElementsByTagName('img'),
        function(o) {
          if (UI.hasClass(o, 'crs')) {
            UI.removeClass(o, 'crs');
            o.src = UI.A(o, 'crs');
          }
        });
      that._show(false, item, {
        w : img.width,
        h : img.height
      });
    }
    item = more = that = img = img.onload = img.onerror = null;
  };

  img.onerror = function () {
    that._hide();
    item = more = that = img = img.onload = img.onerror = null;
  };

  img.src = url;
  MI.Bos('btnPicShow');
};

MI.PicList.prototype._hide = function () {
  var mainWrap;

  if (this._showLoadId) {
    clearTimeout(this._showLoadId);
    this._showLoadId = null;
  }

  if (this._showTipId) {
    clearTimeout(this._showTipId);
    this._showTipId = null;
  }

  this.active = null;
  UI.hide(this._container);

  $('mainWrapper').style.zIndex = 1;
  mainWrap = $$($('mainWrapper'), '.main')[0]
  if (this.oriBodyZindex !== mainWrap.style.zIndex) {
    mainWrap.style.zIndex = this.oriBodyZindex;
  }
};

MI.PicList.prototype._setPos = function (left, top, arrowx) {
  if (arrowx < 12) {
    arrowx = 12;
  }

  left = this.config.offsetX + left;
  top = this.config.offsetY + top;
  this._container.style.left = left + 'px';
  this._container.style.top = top + 'px';

  this._arrow.style.left = arrowx + 'px';
};

MI.PicList.prototype._show = function (isLoading, item, picSize) {
  var x, y, h, w, listImg, imgY, scrollY, winY, picDiv, tipImg,
    winX, scrollX, isFirstLine, docH, headH, dir, icoOffset, arrowX,
    cls = 'loading';

  picSize = picSize || {};
  listImg = item.getElementsByTagName('img')[0];
  headH = UI.height($('headWrap'));

  if (isLoading) {
    h = 96;
    w = 246;
    UI.addClass(this._container, 'loading');
    this._container.style.width = '246px';
  } else {
    picDiv = this._container.firstChild.getElementsByTagName('div');
    if (!picDiv || !picDiv[0]) {
      this._hide();
      return;
    }
    picDiv = picDiv[0];
    tipImg = picDiv.getElementsByTagName('img');
    if (!tipImg || !tipImg[0]) {
      this._hide();
      return;
    }
    MI.PicList.breakWord($$(this._container, '.msgCnt')[0]);
    tipImg = tipImg[0];
    h = Math.max(parseInt(tipImg.height, 10), picSize.h);
    w = Math.max(parseInt(tipImg.width, 10), picSize.w);
    if (h > 300) {
      h = 300;
      picDiv.style.height = '300px';
      picDiv.style.overflow = 'hidden';
    } else {
      picDiv.style.height = 'auto';
    }
    if (w < 300) {
      w = 300;
      tipImg.style.width = 'auto';
    }
    picDiv.style.width = w + 'px';
    UI.removeClass(this._container, 'loading');
    this._container.style.width = w + 12 + 'px';
    UI.show(this._container);
    h = this._container.offsetHeight;
  }

  imgY = UI.getY(listImg);
  scrollY = UI.scrollY();
  winY = MI.PicList.getWindowXY();
  winX = winY[0];
  winY = winY[1];
  docH = MI.PicList.getDocumentXY()[1];

  dir = this.config.direction;

  if (this.config.arrPos === 0) {
    icoOffset = listImg.offsetHeight / 2;
  } else {
    icoOffset = Math.min(listImg.offsetHeight, this.config.arrPos);
  }

  if (dir === 0) {
    isFirstLine = item.offsetTop <= 350;
    if (isFirstLine ||
        scrollY + winY - imgY - icoOffset - h >= 0 ||
//there is enough space at the bottom of the pic
        (imgY - h < scrollY &&
        imgY + icoOffset + h + headH < docH)
//or the is not enough space at the top and
//the there enough space in document (do not resize document)
        ) {
      dir = 1;//pop down
    } else {
      dir = 2;
    }
  }

  if (dir === 1) {
    this.arrTop();
    y = imgY + icoOffset - headH;
    //y = listImg.offsetHeight;
    //y = imgY - headH + Math.min(y, 50);
  } else if (dir === 2) {
    this.arrBottom();
    y = imgY - h - headH + icoOffset;
    //y = listImg.offsetHeight;
    //y = imgY - h - headH + y - Math.min(y, 50);
  }

  scrollX = UI.scrollX();
  x = item.offsetLeft + (item.offsetWidth - w) / 2;
  arrowX = (800 < winX ? 800 - winX : 0) / 2 + 12;
  if (x < arrowX) {
//do not point out of the window
    arrowX = (w + 12) / 2 - arrowX + x;
    x = (800 < winX ? 800 - winX : 0) / 2 + 12;
  } else {
    arrowX = (w + 12) / 2;
  }
  this._setPos(x, y, arrowX);

  if (isLoading) {
    UI.show(this._container);
  }
};

MI.PicList.prototype.more = function (auto) {
  if (!MI.Base) {//depends on MIIcon
    return;
  }

  var Self = this,
    url = {
      r : MI.random(),
      time : Self.last.time,
      id : Self.last.id
    },
    rel = UI.A(Self._more,'rel'),
    Time,Time_1,Time_2,Time_3;

    if (this.config.owner){
      url.u = this.config.owner;
    }

    if (!Self._more.sending) {
      UI.addClass(Self._more,'loading');
      if (rel) {
        Time = + new Date();
        UI.ajax({
          url : rel,
          type : 'get',
          data : url,
          timeout : 30000,
          fail : function(){
            UI.removeClass(Self._more,'loading');
            Self._more.sending = 0;
          },
          success : function(json){
            Time_1 = + new Date() - Time;
            Self.addMore(json);

            //Speed
            Time_2 = + new Date() - Time;
            setTimeout(function(){
              Time_3 = + new Date() - Time;
              MI.Speed('t_asyn_more_pic',0.005,Time_1,Time_2,Time_3);
            },0);
          }
        });
        MI.Bos(auto ? 'btnPicMoreAuto' : 'btnPicMore');
      }
    }
    Self._more.sending = 1;
};

MI.PicList.prototype.addMore = function (json) {
  var Self = this,
    _new = Self._new,
    ajax = UI.isString(json),
    children = UI.children($(this.id)),
    last = children[children.length - 1];

  data = ajax ? MI.json(json) : json;

  if (data && data.result == 0) {
    if (!Self.config.owner && data.info.user != MI.user.account) { //Kill Change Account Bug
      document.location.reload();
      return;
    }

    data.info.guest = Self.guest;
    data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
    data.info.iconPic = Self.iconPic;

    var cache = document.createDocumentFragment(),
      o = UI.html(new UI.tmplString(Self.tmpl)(data.info));

    if (data.info.talk.length) {
      for (var i = 0,num = o.length;i < num;i++) {
        UI.append(o[i],cache);
      }
      /*
      setTimeout(function(){ //渲染完再添加事件，比较耗时间
        for (var i = 0,num = o.length;i < num;i++) {
          Self.addEvent(o[i]);
        }
        Self.card();
        Self.buildTips();
        MI.Crs(1);
      },0);
      */
      UI.append(cache, $(this.id));
      if (!UI.B.ie) {
        MI.GoTop.position();
      }

      //Resize Dialog's Bg
      if (MI.dialog && MI.dialog.display) {
        MI.dialog.resizeBg();
      }

      MI.PV('more');

      //For Ajax Back Forward
      if (ajax) {
        MI.ajax++;
        //MI.talkMore.push(json);
      }
    }

    //More
    if (data.info.hasNext == 0 || !data.info.talk.length) {
      UI.addClass(Self._more.parentNode,'hide');
      Self.more = function(){};
    } else {
      /*
      if (last) {
        //UI.addClass(last,'pageLine');
      }
      */
      Self.cacheLast();
    }

    //Self.updateTime(data.info.time);
    Self.moreTimes++;
   //{} else if (data.msg){}
    //MI.alert(data.msg);
  }
  Self.bottom();
  UI.removeClass(Self._more,'loading');
  Self._more.sending = 0;
};

MI.PicList.prototype.autoMore = function () {
  var maxTimes = 2,
    moreDelay,
    that = this,
    getMore = function() {
      clearTimeout(moreDelay);
      setTimeout(more,200);
    }, more = function () {
      if (that.moreTimes < maxTimes &&
          UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 700) {
        that.more(1);
      }
      if (that.moreTimes >= maxTimes) {
        UI.ER(window, 'scroll', getMore);
      }
    }

  this.moreTimes = 0;
  UI.EA(window, 'scroll', getMore);
};

MI.PicList.prototype.cacheLast = function () { //Cache Last Id For More
  var children = UI.children($(this.id)),
    last = children[children.length - 1],
    time,
    fav;

  if (last) {
    //fav = UI.A(last,'fav');
    time = UI.A(last,'rel');
    this.last = {
      id : last.id,
      time : time
      //fav : fav ? fav : 0
    };

    /*
    if (this.date) {
      MI.TalkList.date = UI.formatDate(UI.zoneDate(time + '000',8),'yyyy-MM-d');
    }
    */
  }
};

MI.PicList.prototype.bottom = function () {
  id = this.id;
  if ($(id)) {
    var lists = $$('.main .imgMod'),list,main = UI.parents($(id),'main')[0],wrap,y = 0;
    if (main) {
      wrap = main.parentNode;
    }
    if (!lists.length) {
      lists = $$('.imgMod');
    }
    list = lists[lists.length - 1];
    if (list && UI.height($(id))) {
      UI.C(list,'marginBottom',0);
      if (main) {
        y = UI.height(main) - UI.height(wrap);
      }
      else {
        wrap = $('mainWrapper');
        UI.each(wrap.childNodes,function(o){
          if (o.nodeType == 1) {
            y += UI.height(o);
          }
        });
        y -= UI.height(wrap);
      }
      UI.C(list,'marginBottom',y < -1 ? - y + 'px' : '');
    }
  }
};

MI.PicList.prototype._showEmpty = function () {
  var ctn = $(this.id),
    that = this,
    i = 10,
    id;

  ctn.innerHTML = '<div class="noPubs">暂时没有图片可以看哦</div>';

  id = setInterval(function () {
    that.bottom();
    if (i-- < 1) {
      clearInterval(id);
    }
  }, 1000);
  UI.hide('moreList');
};

MI.app({
  Base : function () {
    MI.PicList.prototype.tmpl = '<% var o,i,n,dt,imgo,nick; for(i=0,n=talk.length;i<n;i++){\
    o=talk[i];nick=o.bkname||o.nick;\
    imgo= o.image && o.image.length ? o : (o.source && o.source.image && o.source.image.length ? o.source : 0);\
    if (o && imgo) {\
      dt=UI.formatDate(UI.zoneDate(o.timestamp+"000",8),"' +
      _('yyyy年M月d日 hh:mm') +
      '");%><div class="imgView" id="<%=o.id%>" rel="<%=o.timestamp%>">\
    <a href="p/t/<%=o.id%>" target="_blank" class="clk-1"><img src="<%=imgo.image[0]%>/160" alt="" target="_blank" onclick=""></a>\
    <div class="imgModMore" style="display:none;">\
      <div class="imgView"><a href="p/t/<%=imgo.id%>" target="_blank" class="clk-2"><img alt="" src="<%=imgo.image[0]%>/460" width="100%"></a></div>\
      <div class="msgWrap clear"><div class="userPic"><a title="" href="/<%=o.name%>" rel="<%=nick%>(@<%=o.name%>)"><img src="<%=o.pic%>" card="1" ctype="1" title=""></a></div>\
        <div class="msgBox"><div rel="<%=o.name%>" class="userName"><strong><a title="<%=nick%>(@<%=o.name%>)" href="/<%=o.name%>" card="1" ctype="2" rel="<%=nick%>(@<%=o.name%>"><%=nick%></a>'+MIIcon('o.flag')+'<% if(o.type===2) {%>'+_('转播')+'<%}%>:</strong></div><div class="msgCnt"><%=o.content%></div><% if(o.type===2) {%>\
    <div style="clear:both"><div class="userName" rel="<%=o.source.name%>">'+_('转自')+':<strong><a rel="<%=o.source.name%>" ctype="2" card="1" href="/<%=o.source.name%>" title="<%=o.source.bkname||o.source.nick%>(@<%=o.source.name%>)"><%=o.source.bkname||o.source.nick%></a>'+MIIcon('o.source.flag')+':</strong></div>\
      <div class="msgCnt"><%=o.source.content%></div></div><% } %>\
        <div class="pubInfo"><span class="left"><a from="3" href="/p/t/<%=o.id%>" target="_blank" class="time" rel="<%=o.timestamp%>" title="<%=dt%>"><%=o.time%></a> <%=o.from%></span></div></div>\
      </div>\
    </div>\
    </div>\
    <% }} %>';
  }
});
window.mb_quick_reg = function() {};
