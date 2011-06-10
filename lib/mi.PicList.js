/*jslint browser: true, regexp: true, indent:2, onevar: true */
/*jslint eqeqeq: true, devel: true */
/*jslint regexp: true, white: true, undef: true, newcap: true*/
/*global UI, MI, NodeFilter, _*/
// vim: tabstop=2 shiftwidth=2 expandtab

/**
 * 图片模式tweets列表
 * @author <a href="mailto:staurenliu@tencent.com">staurenliu</a>
 * @namespace MI.PicList 图片消息列表
 * @constructor
 * @param {String} id the list container id or dom reference
 * @param {Object} config detail config parameter object
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
 * @config {boolean} autoScroll the window will scroll vertically to show
 *                              the whole popup, default true
 * @config {boolean} isGuest is this module load in guest page,
 *                           default false
 *            @example
 *            MI.picList = new MI.PicList('container-id');
 */

MI.PicList = function (id, config) { //Pic List
  var that = this,
    ctn = UI.G(id);

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
  this.oriBodyZindex = UI.GC(UI.G('mainWrapper'), '.main')[0].style.zIndex;

  if (this.config.doMore) {
    this._more = UI.GC(UI.G('moreList'), 'a')[0];
    if (this._more) {
      this._more.onmouseover = MI.hideFocus;
      this._more.onclick = function (e) {
        that.more();
        UI.E(e).prevent();
      };
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

  if (MI.PicList.IE_VER === 6) {
    try {
      document.execCommand('BackgroundImageCache', false, true);
    } catch (e) {}
  }

  //do not merge lazy loaded pictures
  if (!this.config.merge) {
    MI.user.fun.mergePic = 0;
  }
};

//MI.PicList.CRS_REG = /class="crs" crs="([^"]+)"/g;
MI.PicList.CLICK_REG = /clk-([a-z0-9\-]+)(?:\s+|$)/;
MI.PicList.MO_REG = /clk-mo-([a-z0-9]+)(?:\s+|$)/;
MI.PicList.MAX_UNEXPD_HEIGHT = 350;
MI.PicList.MIN_WIDTH = 350;
MI.PicList.IE_VER = UI.B.ie &&
  parseInt(navigator.userAgent.match(/MSIE (\d+)/)[1], 10);

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
  if (!dEl || dEl.nodeType !== 1) {
    return false;
  } else if (dEl.currentStyle &&
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
        NodeFilter.SHOW_TEXT, null, false),
        node, s, c = String.fromCharCode('8203');
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

/**
 * php中消息type含义： 1:原创发表, 2:转载, 3:私信, 4:回复, 5:空回, 6:提及, 7:评论
 * //Value: null(Talk)  1(Relay)  2(Reply)  3(Message)  4(Timeline Comment)  5(Comment)  6(Note)
 */
MI.PicList.getTpJsFromPhp = function (phpType) {
  var map = {
    1 : null,
    2 : 1,
    3 : 3,
    4 : 2,
    5 : 2,
    6 : null,
    7 : 4
  };

  return map[phpType];
};

MI.PicList.prototype._mapClick = {
  1 : function () {
    MI.Bos('btnPicListClk1');
    return true;
  },
  2 : function () {
    MI.Bos('btnPicListClk2');
    return true;
  },
  3 : function () {
    MI.Bos('btnPicListTopMore');
    return true;
  },
  'mo-more' : function (el) {
    this._mapMo.more.call(this, el);
  },
  report : function (el) {
    MI.report(this.activeTweet);
    this._hide();
  },
  detail : function () {
    MI.Bos('btnPicFunDet');
    this._hide();
    return true;
  },
  reply : function (el) {
    //this._showBox(4);
    var ctn = UI.G(this.content),
      userNamea = UI.GC(ctn, 'strong a')[0];

    MI.App.reply(this.activeTweet, MI.string.account(userNamea.title ||
      UI.A(userNamea, 'rel')));

    MI.Bos('btnPicReply');
    this._hide();
  },
  relay : function (el) {
    //this._showBox(2);
    MI.App.relay(this.activeTweet, UI.G(this.content));
    MI.Bos('btnPicRelay');
    this._hide();
  },
  comment : function (el) {
    //this._showBox(7);
    MI.App.comment(this.activeTweet, UI.G(this.content));
    MI.Bos('btnPicComment');
    this._hide();
  },
  share : function (el) {
  	var that = this;
  	MI.app({
		TalkListShare : function(){
    		MI.TalkList.shareCollection.show(that.activeTweet);
		}
	});
    MI.Bos('btnPicShare');
    this._hide();
  },
  qq : function () {
    MI.PicList.shareQQ(this.activeTweet);
    MI.Bos('btnPicShare');
    this._hide();
  },
  expd : function () {
    this.expand();
    MI.Bos('btnPicListExpd');
    return true;
  },
  fav : function (el) {
    this._fav(UI.hasClass(el, 'light') ? 2 : 1);
    MI.Bos('btnPicFav');
  }
};

MI.PicList.prototype._mapMo = {
  more : function (el) {
    var that = this;
    clearTimeout(this._hideMoreId);
    this._showMoreId = setTimeout(function () {
      that._showMoreOp(el.parentNode);
      //MI.Bos('btnMoreFun',null,0.01);
    }, 150);
  },
  morectn : function (el) {
    clearTimeout(this._hideMoreId);
  }
};

MI.PicList.prototype._mapMout = {
  more : function (el, e, rel) {
    var that = this;
    clearTimeout(this._showMoreId);
    if (!MI.PicList.contains(rel, el.parentNode)) {
      that._hideMoreOp(el.parentNode);
    }
  },
  morectn : function (el, e, rel) {
    var that = this;

    el = el.parentNode;
    if (!MI.PicList.contains(rel, el)) {
      this._hideMoreId = setTimeout(function () {
        clearTimeout(that._showMoreId);
        that._hideMoreOp(el);
      }, 100);
    }
  }
};

MI.PicList.prototype._showMoreOp = function (el) {
  UI.addClass(el, 'mFunDis');
  this._enableExpand(false);
};

MI.PicList.prototype._hideMoreOp = function (el) {
  el = el || UI.GC(this._container, '.mFun')[0];
  UI.removeClass(el, 'mFunDis');
  this._enableExpand(true);
};

MI.PicList.prototype._preprocCfg = function (cfg) {
  var tmp, obj = {};

  UI.each('offsetX offsetY direction arrPos'.split(' '), function (o) {
    tmp = cfg[o];
    obj[o] = parseInt(tmp, 10) === tmp ? tmp : 0;
  });

  obj.doMore = cfg.doMore === false ? false : true;
  obj.merge = cfg.merge === true ? true : false;
  obj.autoScroll = cfg.autoScroll === false ? false : true;
  obj.owner = cfg.owner || '';
  obj.isGuest = cfg.isGuest === true ? true : false;

  return obj;
};

MI.PicList.prototype._addEvents = function () {
  var wholeList = UI.G(this.id);
  UI.EA(wholeList, 'mouseover', MI.PicList.bind(this._hlMouseOver, this));
  UI.EA(wholeList, 'mouseout', MI.PicList.bind(this._hlMouseOut, this));
  UI.EA(wholeList, 'click', MI.PicList.bind(this._hlClick, this));
};

MI.PicList.prototype._hlMouseOver = function (e) {
  var tar, i, matches, map;

  e = UI.E(e);
  tar = e.target;
  i = 3;
  map = this._mapMo;

  while (i-- > 0 && tar && tar.tagName) {
    if (tar.className) {
      matches = tar.className.match(MI.PicList.MO_REG);
      matches = matches && matches[1];
    }

    if (matches) {
      if (map[matches]) {
        map[matches].apply(this, [tar, e]);
      }
      break;
    } else if (tar.className === 'imgView' && tar.id) {
      this._delayShowTip(tar.id);
      break;
    }
    tar = tar.parentNode;
  }

  e.stop();
};

MI.PicList.prototype._hlMouseOut = function (ev) {
  var tar, i, e, rel, doHide, map, matches;

  e = UI.E(ev);
  tar = e.target;
  i = 3;
  rel = ev.relatedTarget || ev.toElement;
  map = this._mapMout;

  if (rel === this._container ||
      MI.PicList.contains(rel, this._container)) {
    while (i-- > 0 && tar && tar.tagName) {
      if (tar.className) {
        matches = tar.className.match(MI.PicList.MO_REG);
        matches = matches && matches[1];
      }
      if (matches) {
        if (map[matches]) {
          map[matches].apply(this, [tar, e, rel]);
        }
        break;
      }
      tar = tar.parentNode;
    }
  } else {
    if (tar === this._container ||
        MI.PicList.contains(tar, this._container)) {//mouse out from the tip
      if (!MI.PicList.contains(rel, this._container) &&
          !MI.PicList.contains(rel, UI.G(this.id))) {
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
  }
};

MI.PicList.prototype._hlClick = function (e) {
  var el, time, matches, i = 3, reg, oHl, eo;

  eo = UI.E(e);
  el = eo.target;

  reg = MI.PicList.CLICK_REG;
  oHl = this._mapClick;

  while (i-- > 0 && el) {

    matches = el.className && el.className.match(reg);
    matches = matches && matches[1];
    if (oHl[matches]) {
      if (oHl[matches].apply(this, [el, e]) !== true) {
        eo.stop();
        eo.prevent();
      }
      break;
    }
    el = el.parentNode;
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
  var more, img, url, that, item, mainWrap, tmp, isGuest;

  if (this.active === id) {
    return;
  }

  that = this;
  isGuest = that.config.isGuest;
  setTimeout(function () {
    MI.Bos(isGuest ? 'btnPicShow' : 'btnPicShowHome',
      MI.PicList.getWindowXY()[1]);
  }, 10);

  mainWrap = UI.GC(UI.G('mainWrapper'), '.main')[0];
  if (this.oriBodyZindex === mainWrap.style.zIndex) {
    this.oriBodyZindex = mainWrap.style.zIndex;
    mainWrap.style.zIndex = 10;
  }
  //college is 9999
  UI.G('mainWrapper').style.zIndex = MI.user.college ? 10000 : 3;

  if (this.content === id) {
    this._hideMoreOp();
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
  item = UI.G(id);

  this._showLoadId = setTimeout(function () {
    that._show(true, item);
  }, 500);

  more = UI.GC(item, '.imgModMore')[0];
  img = UI.GC(more, 'img');
  img = img[0];
  url = img.src || UI.A(img, 'srs');
  img = new Image();
  img.onload = function () {
    var imgs, tid;
    if (that._showLoadId) {
      clearTimeout(that._showLoadId);
      that._showLoadId = null;
    }
    //onload may be called multiple times for gif
    if (that && that.active === id) {
      that.content = id;
      tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
      that.activeTweet = tid;
      if (UI.B.ie === 6) {
        that._container.firstChild.cssText = '';
      }
      that._container.firstChild.innerHTML = more.innerHTML;
      UI.GC(that._container.firstChild, '.pubInfo')[0].appendChild(
        that._getFunbox(tid)
      );
      UI.each(that._container.firstChild.getElementsByTagName('img'),
        function (o) {
          if (o.className === 'srs' || o.className === 'crs') {
            o.src = UI.A(o, o.className);
            o.className = '';
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

  UI.G('mainWrapper').style.zIndex = 1;
  mainWrap = UI.GC(UI.G('mainWrapper'), '.main')[0];
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
    outOfViewPortY, maxh, cls = 'loading';

  picSize = picSize || {};
  listImg = item.getElementsByTagName('img')[0];
  headH = UI.height(UI.G('headWrap'));
  maxh = MI.PicList.MAX_UNEXPD_HEIGHT;

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
    MI.PicList.breakWord(UI.GC(this._container, '.msgCnt')[0]);
    tipImg = tipImg[0];
    h = Math.max(parseInt(tipImg.height, 10), picSize.h);
    w = Math.max(parseInt(tipImg.width, 10), picSize.w);
    this._imgH = h;
    if (h > maxh) {
      h = maxh;
      picDiv.style.height = maxh + 'px';
      picDiv.style.overflow = 'hidden';
      this._expanded = false;
    } else {
      picDiv.style.height = 'auto';
    }
    this._enableExpand(true);

    if (w < MI.PicList.MIN_WIDTH) {
      w = MI.PicList.MIN_WIDTH;
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
        imgY + icoOffset + h - scrollY - winY <= 0 ||
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

  scrollX = UI.scrollX();

  if (dir === 1) {
    this.arrTop();
    y = imgY + icoOffset - headH;
    outOfViewPortY = imgY + icoOffset + h - scrollY - winY;
    if (outOfViewPortY > 0) {
//pop down, if part of pop will go out of the window,
//scroll to show whole pop
      this._scroll2(scrollY + outOfViewPortY + 30);
    } else if (imgY + listImg.offsetHeight / 2 < scrollY) {
//the small image only show half at top, the arrow is not displayed
//scroll up to show the arrow
      this._scroll2(imgY + listImg.offsetHeight / 2 - 10);
    }
//y = listImg.offsetHeight;
//y = imgY - headH + Math.min(y, 50);
  } else if (dir === 2) {
    this.arrBottom();
    y = imgY - h - headH + icoOffset;
    outOfViewPortY = imgY + icoOffset - h - scrollY;
    if (outOfViewPortY < 0) {
//pop up, if the pop will go out of the window, scroll to show pop
      this._scroll2(scrollY + outOfViewPortY);
    } else if (imgY + listImg.offsetHeight / 2 > scrollY + winY) {
//the small image only show half at bottom, the arrow is not displayed
//scroll down to show the arrow
      this._scroll2(imgY + listImg.offsetHeight / 2 - winY + 10);
    }
//y = listImg.offsetHeight;
//y = imgY - h - headH + y - Math.min(y, 50);
  }

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

MI.PicList.prototype._scroll2 = function (to) {
  if (!this.config.autoScroll) {
    return;
  }

  var that = this,
    scrollY = UI.scrollY(),
    scrollX = UI.scrollX(),
    delta = to > scrollY ? 20 : -20,
    animCount = Math.ceil(Math.abs((to - scrollY) / delta)),
    animTime = animCount * 20,
    currentCount = 0,
    runner;

  runner = function () {
    if (currentCount++ < animCount) {
      scrollY = currentCount === animCount ? to : scrollY + delta;
      window.scrollTo(scrollX, scrollY);
      that._scrollId = setTimeout(runner, animTime / animCount);
    }
  };

  if (this._scrollId) {
    clearTimeout(this._scrollId);
  }

  if (Math.abs(delta) < 0.1) {
    return;
  }

  this._scrollId = setTimeout(runner, animTime / animCount);
};

MI.PicList.prototype.more = function (auto) {
  if (!MI.Base) {//depends on MIIcon
    return;
  }

  var Time, Time_1, Time_2, Time_3,
    Self = this,
    url = {
      r : MI.random(),
      time : Self.last.time,
      id : Self.last.id
    },
    rel = UI.A(Self._more, 'rel');

  if (this.config.owner) {
    url.u = this.config.owner;
  }

  if (!Self._more.sending) {
    UI.addClass(Self._more, 'loading');
    if (rel) {
      Time = +new Date();
      UI.ajax({
        url : rel,
        type : 'get',
        data : url,
        timeout : 30000,
        fail : function () {
          UI.removeClass(Self._more, 'loading');
          Self._more.sending = 0;
        },
        success : function (json) {
          Time_1 = +new Date() - Time;
          Self.addMore(json);

          //Speed
          Time_2 = +new Date() - Time;
          setTimeout(function () {
            Time_3 = +new Date() - Time;
            MI.Speed('t_asyn_more_pic', 0.005, Time_1, Time_2, Time_3);
          }, 0);
        }
      });
      MI.Bos(auto ? 'btnPicMoreAuto' : 'btnPicMore');
    }
  }
  Self._more.sending = 1;
};

MI.PicList.prototype.addMore = function (json) {
  var data, cache, o, i, num,
    Self = this,
    _new = Self._new,
    ajax = UI.isString(json),
    children = UI.children(UI.G(this.id)),
    last = children[children.length - 1];

  data = ajax ? MI.json(json) : json;

  if (data && data.result === 0) {
    if (!Self.config.owner && data.info.user !== MI.user.account) {
      //Kill Change Account Bug
      document.location.reload();
      return;
    }

    data.info.guest = Self.guest;
    data.info.fav = Self.last.fav ? 1 : 0; //Fav List Tmpl
    data.info.iconPic = Self.iconPic;

    cache = document.createDocumentFragment();
    o = UI.html(new UI.tmplString(Self.tmpl)(data.info));

    if (data.info.talk.length) {
      for (i = 0, num = o.length; i < num; i++) {
        UI.append(o[i], cache);
      }
      UI.append(cache, UI.G(this.id));
      if (!UI.B.ie) {
        MI.GoTop.position();
      }

      //Resize Dialog's Bg
      if (MI.dialog && MI.dialog.display) {
        MI.dialog.resizeBg();
      }

      MI.PV('more');

      //For Ajax Back Forward
      if (ajax && UI.isNumber(MI.ajaxTimes)) {
        MI.ajaxTimes++;
        //MI.talkMore.push(json);
      }
    }

    //More
    if (data.info.hasNext === 0 || !data.info.talk.length) {
      UI.addClass(Self._more.parentNode, 'hide');
      Self.more = function () {};
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
  UI.removeClass(Self._more, 'loading');
  Self._more.sending = 0;
};

MI.PicList.prototype.autoMore = function () {
  var moreDelay, getMore, more,
    maxTimes = 3,
    that = this;

  getMore = function () {
    clearTimeout(moreDelay);
    setTimeout(more, 200);
  };

  more = function () {
    if (that.moreTimes < maxTimes &&
        UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 700) {
      that.more(1);
    }
    if (that.moreTimes >= maxTimes) {
      UI.ER(window, 'scroll', getMore);
    }
  };

  this.moreTimes = 0;
  UI.EA(window, 'scroll', getMore);
};

MI.PicList.prototype.cacheLast = function () { //Cache Last Id For More
  var children = UI.children(UI.G(this.id)),
    last = children[children.length - 1],
    time,
    fav;

  if (last) {
    //fav = UI.A(last,'fav');
    time = UI.A(last, 'rel');
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
  var lists, list, main, wrap, y,
    id = this.id;

  if (UI.G(id)) {
    lists = UI.GC('.main .imgMod');
    main = UI.parents(UI.G(id), 'main')[0];
    y = 0;
    if (main) {
      wrap = main.parentNode;
    }
    if (!lists.length) {
      lists = UI.GC('.imgMod');
    }
    list = lists[lists.length - 1];
    if (list && UI.height(UI.G(id))) {
      UI.C(list, 'marginBottom', 0);
      if (main) {
        y = UI.height(main) - UI.height(wrap);
      } else {
        wrap = UI.G('mainWrapper');
        UI.each(wrap.childNodes, function (o) {
          if (o.nodeType === 1) {
            y += UI.height(o);
          }
        });
        y -= UI.height(wrap);
      }
      UI.C(list, 'marginBottom', y < -1 ? -y + 'px' : '');
    }
  }
};

MI.PicList.prototype.expand = function () {
  var picDiv = this._container.firstChild.getElementsByTagName('div')[0], 
    that = this,
    delta = MI.PicList.IE_VER === 6 || MI.PicList.IE_VER === 7 ? 80 : 20,
    to = this._imgH,
    newH = MI.PicList.MAX_UNEXPD_HEIGHT,
    animCount = Math.ceil(Math.abs((to - newH) / delta)),
    animTime = animCount * 15,
    currentCount = 0,
    runner;

  runner = function () {
    if (currentCount++ < animCount) {
      newH = currentCount === animCount ? to : newH + delta;
      UI.C(picDiv, 'height', newH + 'px');
      that._expaId = setTimeout(runner, animTime / animCount);
    }
  };

  if (this._expaId) {
    clearTimeout(this._expaId);
  }

  if (Math.abs(delta) < 0.1) {
    return;
  }

  this._enableExpand(false);
  this._expanded = true;

  this._expaId = setTimeout(runner, animTime / animCount);
};

/*
MI.PicList.prototype._getRelayOld = function (o, content) {
  var cont = UI.GC(o, content)[0],
    contClone,
    relayCite = UI.GC(o, 'strong a')[0],
    relayCiteAccount = MI.string.account(relayCite.title ||
      UI.A(relayCite, 'rel')),
    noRelayOld,
    result = '';

  if (cont) {
    if (UI.GC(o, '.replyBox').length === 0) {
      noRelayOld = 1;
    }
  }
  contClone = cont.cloneNode(1);
  if (!noRelayOld) {
    UI.each(UI.GC(contClone, 'em'), function (o) {
      var account = UI.A(o, 'rel');
      if (account) {
        o.innerHTML = account;
      }
    });
    UI.each(UI.GC(contClone, 'img'), function (o) {
      var face = o.title;
      if (face) {
        UI.after(UI.html('<b>/' + face + '</b>')[0], o);
      }
    });
    UI.each(UI.GC(contClone, '.btn_trans'), function (o) {
      UI.remove(o);
    });
    result = ' || @' + relayCiteAccount + ': ' +
      UI.text(contClone);
  }

  return result;
};
*/

MI.PicList.prototype._enableExpand = function (bShow) {
  var btn = this._container.childNodes[1],
    mh = MI.PicList.MAX_UNEXPD_HEIGHT;

  bShow = bShow && this._imgH > mh + 40 && !this._expanded;

  if (bShow) {
    UI.C(btn, 'top', mh - 36 + 'px');
    UI.C(btn, 'visibility', 'visible');
  } else {
    UI.C(btn, 'visibility', 'hidden');
  }
};

MI.PicList.prototype._fav = function (type) {
  var that = this,
    talk = UI.G(this.content),
    id = this.activeTweet,
    url = MI.TalkList.prototype.favorUrl,
    data = {id : id, r : MI.random()},
    favBtn;

  data.op = type < 2 ? 1 : 2;

  if (!talk.sending) {
    UI.ajax({
      url : url,
      data : data,
      success : function (data) {
        talk.sending = 0;
        data = MI.json(data);
        if (data.result === 0) {
          favBtn = UI.GC(that._container, '.clk-fav')[0];
          if (type === 1) {
            UI.addClass(favBtn, 'light');
            favBtn.innerHTML = _('取消收藏');
          } else {
            if (type === 2) {
              UI.removeClass(favBtn, 'light');
              favBtn.innerHTML = _('收藏');
            }
          }
        } else if (MI.code.check(data.result)) {
          MI.code.show({
            msg : data.msg,
            code : data.info,
            call : function (code) {
              that._fav(type, code);
            }
          });
        }
      }
    });

    talk.sending = 1;
  }
};

/**
 * php中消息type含义： 1:原创发表, 2:转载, 3:私信, 4:回复, 5:空回, 6:提及, 7:评论
 */
/*
MI.PicList.prototype._showBox = function (type) {
  var title, content,
    box = new MI.Reply(),
    talkBox = box.talkBox,
    ctn = UI.G(this.content),
    userNamea,
    h;

  switch (type) {
  case 2:
    title = '转播原文，顺便说两句：';
    if (UI.GC(ctn, '.replyBox').length) {
      content = this._getRelayOld(ctn, '.msgCnt');
      h = 80;
    }
    break;
  case 4:
    userNamea = UI.GC(ctn, 'strong a')[0];
    talkBox.talkTo = MI.string.account(userNamea.title ||
      UI.A(userNamea, 'rel'));
    break;
  case 7:
    title = '评论原文：';
    if (UI.GC(ctn, '.replyBox').length) {
      content = this._getRelayOld(ctn, '.msgCnt');
      h = 80;
    }
    break;
  default:
    return;
  }

  type = MI.PicList.getTpJsFromPhp(type);

  box.show({
    title : title,
    cont : content,
    height : h,
    type : type,
    talkId : this.activeTweet,
    doFocus : false
  });

  setTimeout(function () {
    try {
      talkBox._txt.focus();
      MI.selectTxt(talkBox._txt, 0, 0, 0);
      talkBox.countTxt();
    } catch (e) {}
  }, 200);
};
*/

MI.PicList.prototype._showEmpty = function () {
  var ctn = UI.G(this.id),
    that = this,
    i = 10,
    id;

  ctn.innerHTML = '<div class="noPubs">' + _('暂时没有图片可以看哦') +
    '</div>';

  id = setInterval(function () {
    that.bottom();
    if (i-- < 1) {
      clearInterval(id);
    }
  }, 1000);
  UI.hide('moreList');
};

MI.PicList.prototype._getFunbox = (function () {
  var t1, t2, t3, t4, t_reply, t_cmt_a, t_cmt_b;

  t1 = '<div class="funBox"><a href="#" class="clk-relay">' + _('转播') +
    '</a><span>|</span>';

  t2 = '<span>|</span><div class="mFun"><a href="#" class="clk-mo-more">' +
    _('更多') + '<em class="btn_ldrop"></em></a><div class="mFunDrop clk-mo-morectn"><b></b><b class="mask"></b><p>';

  t3 = '</p><p><a href="#" class="clk-fav">' + _('收藏') +
    '</a></p><div class="shareBtn"><p><a href="#" class="clk-share">' +
    _('分享') + '</a></p></div><p><a href="/p/t/';

  t4 = '" class="clk-detail" target="_blank">' + _('详情') +
    '</a></p><p><a href="#" class="clk-report">' + _('举报') +
    '</a></p></div></div></div></div>';

  t_reply = '<a href="#" class="clk-reply">' + _('对话') + '</a>';
  t_cmt_a = '<a href="/p/t/';
  t_cmt_b = '" class="clk-comment">评论</a>';

  return function (tid) {
    var t_cmt = t_cmt_a + tid + t_cmt_b;
    return UI.html(MI.user.fun.btnStyle === 0 ?
      t1 + t_cmt + t2 + t_reply + t3 + tid + t4 :
      t1 + t_reply + t2 + t_cmt + t3 + tid + t4)[0];
  };
}());

MI.PicList.prototype._prepareTip = function () {
  var ctn;
  if (!this._container) {
    this._container = UI.html('<div class="imgModTips cardT loading" style="display:none;z-index:1000;"><div></div><div class="imgExpd clk-expd">' +
    //_('展开') +
    '</div><div class="uloadBox"><em class="loading"></em>' +
    _('加载中') +
    '</div><div class="SA"><em>◆</em><span>◆</span><b>◆</b></div></div>')[0];
    ctn = $(this.id);
    ctn.insertBefore(this._container, ctn.firstChild);
    this._arrow = $$(this._container, '.SA')[0];
    this.direction = 'T';
  }
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
      <div class="imgView"><a href="p/t/<%=imgo.id%>" target="_blank" class="clk-2"><img alt="" class="srs" srs="<%=imgo.image[0]%>/460" width="100%"></a></div>\
      <div class="msgWrap clear"><div class="userPic"><a title="" href="/<%=o.name%>" rel="<%=nick%>(@<%=o.name%>)"><img src="<%=o.pic%>" card="1" ctype="1" title=""></a></div>\
        <div class="msgBox"><div rel="<%=o.name%>" class="userName"><strong><a title="<%=nick%>(@<%=o.name%>)" href="/<%=o.name%>" card="1" ctype="2" rel="<%=nick%>(@<%=o.name%>"><%=nick%></a>'+MIIcon('o.flag')+':</strong></div><div class="msgCnt"><%=o.content%></div><% if(o.type===2) {%>\
    <div class="replyBox" style="clear:both"><div class="msgBox" rel="<%=o.source.name%>"><div class="msgCnt"><strong><em>['+_('原文')+']</em>\n<a rel="<%=o.source.name%>" ctype="2" card="1" href="/<%=o.source.name%>" title="<%=o.source.bkname||o.source.nick%>(@<%=o.source.name%>)"><%=o.source.bkname||o.source.nick%></a>'+MIIcon('o.source.flag')+':</strong><%=o.source.content%></div></div></div><% } %>\
        <div class="pubInfo"><span class="left"><a from="3" href="/p/t/<%=o.id%>" target="_blank" class="time" rel="<%=o.timestamp%>" title="<%=dt%>"><%=o.time%></a> </span></div></div>\
      </div>\
    </div>\
    </div>\
    <% }} %>';
  }
});

if (!window.mb_quick_reg) {
  window.mb_quick_reg = function() {};
}
