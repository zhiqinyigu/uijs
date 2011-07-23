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
  this._lists = UI.G(this.id);

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
  } else {
    this.noMore = true;
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
MI.PicList.MIN_WIDTH = 420;
MI.PicList.MODAL_WIDTH = 607;
MI.PicList.IE_VER = UI.B.ie &&
  parseInt(navigator.userAgent.match(/MSIE (\d+)/)[1], 10);
MI.PicList.UA = (function () {
  var b = UI.B, result, ua = navigator.userAgent;
  if (b.chrome) {
    result = ua.match(/Chrome\/\d+/)[0];
  } else if (b.firefox) {
    result = ua.match(/Firefox\/\d+/)[0];
  } else if (b.ie) {
    result = 'MSIE/' + MI.PicList.IE_VER;
  } else if (b.ipad) {
    result = 'iPad/' + ua.match(/Version\/(\d+)/)[1];
  } else if (b.opera) {
    result = 'Opera/' + ua.match(/Version\/(\d+)/)[1];
  } else if (b.safari) {
    result = 'Safari/' + ua.match(/Version\/(\d+)/)[1];
  } else {
    result = ua;
  }

  return encodeURIComponent(result);
}());

MI.PicList.bind = function (fn, scope) { //Pic List
  return function () {
    fn.apply(scope, Array.prototype.slice.call(arguments));
  };
};

/**
 * function to test whether the dom needle is in haystack
 * @param {object} needle
 * @param {object} haystack
 * @param {boolean} allowEqual
 */
MI.PicList.contains = (function () {
  if (document.documentElement.compareDocumentPosition) {
    return function (needle, haystack, allowEqual) {
      if (!needle || !haystack || !haystack.tagName) {
        return false;
      }
      return (allowEqual && needle === haystack) ||
        !!(haystack.compareDocumentPosition(needle) & 16);
    };
  } else if (document.documentElement.contains) {
    return function (needle, haystack, allowEqual) {
      if (!needle || !haystack || !haystack.tagName) {
        return false;
      }

//contains method does NOT support TEXT_NODE param
      if (needle.nodeType === 3) {
        needle = needle.parentNode;
        allowEqual = true;
      }

      return (allowEqual && needle === haystack) ||
        haystack.contains(needle);
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

MI.PicList.genRelayList = function (id) {
  id = id || '';
  var that = this,
    relayList = '_relayList' + id,
    relayListLoad = '_relayListLoad' + id,
    relayListCont = '_relayListCont' + id,
    _relayListCont;

  /*that[relayList] = UI.html('<div class="relayList"><div class="top"><span class="left"><a href="#" class="vClose"><em></em>' + _('收起') +
  '</a></span><a class="w_close" href="#" title="' + _('点击关闭') +
  '"><b class="close"></b></a></div><div class="loading">' +
  _('正在加载') + '...</div><div class="cont"></div></div>')[0];*/
  that[relayList] = UI.html('<div class="relayList"><div style="height:5px;line-height:5px;font-size:0;"></div><div class="loading">' +
    _('正在加载') + '...</div><div class="cont"></div></div>')[0];

  that[relayListLoad] = UI.GC(that[relayList], '.loading')[0];
  that[relayListCont] = UI.GC(that[relayList], '.cont')[0];

  /*
  UI.GC(that[relayList], '.w_close')[0].onclick = function () {
    var T = this;
    if (UI.B.ie) { //Kill ":hover" Bug In IE
      UI.C(T, 'left', '9999px');
    }
    setTimeout(function () {
      that.relayListHide(id);
      UI.C(T, 'left', '');
    }, 0);
    //MI.Bos('btnRelayListClose');
    return false;
  };
  */

  _relayListCont = that[relayListCont];

/*
  UI.GC(that[relayList], '.left a')[0].onclick = function () {
    that.relayListHide(id);
    //MI.Bos('btnRelayListUp');
    return false;
  };
*/

/*
  _relayListCont.ondblclick = function () {
    //Auto Go Next Page When Double Click
    var hasNext = 0;
    UI.each(UI.GC(that[relayListCont], '.pages a'), function (o) {
      if (o.innerHTML.hasString(_('下一页'))) {//'))) {
        hasNext = o;
      }
    });
    if (hasNext) {
      hasNext.onclick();
    } else {
      that.relayListPosition();
      that.relayListHide(id);
    }
    MI.S('tips_relayList_' + MI.user.account, -1);
  };
  */

  if (UI.B.ie) { //Kill Select Txt Bug In IE
    _relayListCont.onmousedown = function () {
      _relayListCont.onselectstart = null;
    };
    _relayListCont.onmouseup = function () {
      _relayListCont.onselectstart = function () {
        return false;
      };
    };
  }
};

MI.PicList.hideRelayList = function (id) {
  var relayList = this['_relayList' + id] || this._relayList;

  if (relayList && relayList.display) {
    UI.remove(relayList);
    relayList.display = 0;
    //UI.removeClass($(this.cur),'cur');
    //UI.removeClass($(this.cur),'hover');
    //this.focus();
  }
};

MI.PicList.prototype._mapClick = {
  1 : function (el) {
    var id = el.parentNode.id;
    MI.Bos('btnPicListClk1');

    if (this.activeDlg !== id) {
      this.showModalDlg(id);
    } else {
      //return true;
    }
  },
  2 : function (el) {
    if (this.active && this.activeDlg !== this.active) {
      this.showModalDlg(this.active);
      MI.Bos('btnPicListClk2');
    } else {
      this.showNextDlg();
      MI.Bos('btnPicNextPic');
      //return true;
    }
  },
  3 : function () {
    MI.Bos('btnPicListTopMore');
    return true;
  },
  'mo-more' : function (el) {
    this._mapMo.more.call(this, el);
  },
  report : function (el) {
    var ids = this._get2IdAHide();
    MI.report(ids[1]);
  },
  detail : function () {
    MI.Bos('btnPicFunDet');
    this._get2IdAHide();
    return true;
  },
  reply : function (el) {
    //this._showBox(4);
    var ctn, userName,
      ids = this._get2IdAHide();

    ctn = UI.G(ids[0]);
    userName = UI.GC(ctn, 'strong a')[0];
    userName = MI.string.account(userName.title ||
      UI.A(userName, 'rel'));

    MI.App.reply(ids[1], userName);

    MI.Bos('btnPicReply');
  },
  relay : function (el) {
    //this._showBox(2);
    var ids = this._get2IdAHide();
    MI.App.relay(ids[1], UI.G(ids[0]));
    MI.Bos('btnPicRelay');
  },
  comment : function (el) {
    //this._showBox(7);
    var ids = this._get2IdAHide();
    MI.App.comment(ids[1], UI.G(ids[0]));
    MI.Bos('btnPicComment');
  },
  share : function (el) {
    var ids = this._get2IdAHide();
    MI.app({
      TalkListShare : function () {
        MI.TalkList.shareCollection.show(ids[1]);
      }
    });
    MI.Bos('btnPicShare');
  },
  qq : function () {
    var ids = this._get2IdAHide();
    MI.PicList.shareQQ(ids[1]);
    MI.Bos('btnPicShare');
  },
  expd : function () {
    this.expand();
    MI.Bos('btnPicListExpd');
    return true;
  },
  fav : function (el) {
    this._fav(UI.hasClass(el, 'light') ? 2 : 1);
    MI.Bos('btnPicFav');
  },
  rc : function () {
    this.showModalDlg(this.content);
  },
  arrl : function () {
    this.showPrevDlg();
    MI.Bos('btnPicPrevArr');
  },
  arrr : function () {
    this.showNextDlg();
    MI.Bos('btnPicNextArr');
  },
  pptcls : function () {
    this.hideModalDlg();
  },
  rotateimg : function(el) {
    var pic = UI.GC(el.parentNode.parentNode.parentNode,
        '.imgView img')[0];

    MI.TalkList.rotateImg(false, pic);
    el.blur();
    MI.Bos('btnPicRotateAnti');
  },
  rotateimgcke : function(el) {
    var pic = UI.GC(el.parentNode.parentNode.parentNode,
        '.imgView img')[0];

    MI.TalkList.rotateImg(true, pic);
    el.blur();
    MI.Bos('btnPicRotateClock');
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

MI.PicList.prototype._get2IdAHide = function () {
  var id, tid;
  if (this.activeDlg) {
    id = this.activeDlg;
    tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
    this._hideMoreOp(UI.GC(this._modalDlg._cont, '.mFun')[0]);
  } else {
    id = this.content;
    tid = this.activeTweet;
    this._hide();
  }

  return [id, tid];
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
  var bd = document.body,
    wholeList = this._lists;

  UI.EA(wholeList, 'mouseover', MI.PicList.bind(this._hlMouseOver, this));
  UI.EA(wholeList, 'mouseout', MI.PicList.bind(this._hlMouseOut, this));
  UI.EA(bd, 'click', MI.PicList.bind(this._hlClick, this));
  UI.EA(document, 'keydown', MI.PicList.bind(this._hlKeyDown, this));
  UI.EA(window, 'resize', MI.PicList.bind(this._hlScrResize, this));
  if (UI.B.ie6) {
    UI.EA(window, 'scroll', MI.PicList.bind(this._hlScrResize, this));
  }

  UI.EA(document, 'mousewheel',  MI.PicList.bind(this._hlMw, this));
};

MI.PicList.prototype._addModalEvents = function () {
  var ct = this._modalDlg._cont;

  UI.EA(ct, 'mouseover', MI.PicList.bind(this._hlMouseOver, this));
  UI.EA(ct, 'mouseout', MI.PicList.bind(this._hlMdMout, this));
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
      if (!UI.B.ipad) { // ipad click == mouseover, ignore mouseover tip
        this._delayShowTip(tar.id);
      }
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
          !MI.PicList.contains(rel, this._lists)) {
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

MI.PicList.prototype._hlMdMout = function (ev) {
  var tar, i, e, rel, map, matches, cont;

  e = UI.E(ev);
  tar = e.target;
  i = 3;
  rel = ev.relatedTarget || ev.toElement;
  map = this._mapMout;
  cont = this._modalDlg._cont;

  if (rel === cont || MI.PicList.contains(rel, cont)) {
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
  }
};

MI.PicList.prototype._hlClick = function (e) {
  var el, time, matches, i = 3, reg, oHl, eo;

  eo = UI.E(e);
  el = eo.target;

  reg = MI.PicList.CLICK_REG;
  oHl = this._mapClick;

  if (this._modalDlg && el === this._modalDlg._bg) {
    this.hideModalDlg();
  } else if (MI.PicList.contains(el, this._lists) ||
      MI.PicList.modalInstance === this &&
      (MI.PicList.contains(el, this._modalDlg._body))) {

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
  }
};

MI.PicList.prototype._hlKeyDown = function (e) {
  var eo = UI.E(e),
    tag = eo.target.tagName;

  if (this.activeDlg && tag !== 'TEXTAREA' && tag !== 'INPUT') {
    switch (eo.key) {
    case 37 : //left
      this.showPrevDlg();
      MI.Bos('btnPicPrevKey');
      break;
    case 39 : //right
      this.showNextDlg();
      MI.Bos('btnPicNextKey');
      break;
    case 27 : //esc
      this.hideModalDlg();
      break;
    }
  }
};

MI.PicList.prototype._hlScrResize = function (e) {
  if (this.activeDlg) {
    this.rePosDlg();
  }
};

MI.PicList.prototype._hlMw = function (e) {
  var eo, ctn, st, diff,
    doPrevent = false;

  if (this.activeDlg) {
    eo = UI.E(e);
    ctn = this._modalDlg._cont.firstChild;
    st = ctn.scrollTop;
    diff = ctn.scrollHeight - st - ctn.offsetHeight;
    if (
//if scrolling out side the modal dialog container
        (!MI.PicList.contains(eo.target, ctn) && eo.target !== ctn) ||

//if the ctn scroll to the bottom and trying to scroll down further
        (diff === 0 && eo.wheel < 0) ||

//if the ctn scroll to the top and trying to scroll up further
        (st ===  0 && eo.wheel > 0)) {
      doPrevent = true;

//苦逼的IE，如果滚的太猛，会把容器先滚完再滚窗口
//这个解决办法可以解决80px以内的猛烈滚动
    } else if (UI.B.ie) {
      if (diff < 80 && eo.wheel < 0) {
        doPrevent = true;
        ctn.scrollTop = ctn.scrollHeight - ctn.offsetHeight;
      } else if (st < 80 && eo.wheel > 0) {
        doPrevent = true;
        ctn.scrollTop = 0;
      }
    }

    if (doPrevent) {
      eo.prevent();
    }
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
  var more, img, url, that, item, mainWrap, tmp, isGuest, imgs, tid,
    theMainImg;

  if (this.active === id) {
    return;
  }

  that = this;
  isGuest = that.config.isGuest;
  setTimeout(function () {
    MI.Bos(isGuest ? 'btnPicShow' : 'btnPicShowHome',
      MI.PicList.getWindowXY()[1] + MI.PicList.UA)
  }, 10);

  mainWrap = UI.GC(UI.G('mainWrapper'), '.main')[0];
  if (this.oriBodyZindex === mainWrap.style.zIndex) {
    //this.oriBodyZindex = mainWrap.style.zIndex;
    mainWrap.style.zIndex = 10;
  }
  //college is 9999
  UI.G('mainWrapper').style.zIndex = MI.user.college ? 10000 : 3;

  if (this.content === id) {
    this._hideMoreOp();
    this.active = id;
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
    this.active = id;
  }

  item = UI.G(id);

  this._showLoadId = setTimeout(function () {
    that._show(false, item, {
      w : 16,
      h : 16
    });
  }, 500);

  //onload may be called multiple times for gif
  this.content = id;
  tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
  this.activeTweet = tid;
  if (UI.B.ie === 6) {
    this._container.firstChild.cssText = '';
  }
  more = UI.GC(item, '.imgModMore')[0];
  this._container.firstChild.innerHTML = more.innerHTML;
  UI.GC(this._container.firstChild, '.pubInfo')[0].appendChild(
    this._getFunbox(tid)
  );
  UI.each(this._container.firstChild.getElementsByTagName('img'),
    function (o) {
      if (o.className === 'srs') {
        o.src = 'http://mat1.gtimg.com/www/mb/images/loading.gif';
        url = UI.A(o, o.className);
        o.title = '进入幻灯模式查看';
        o.style.width = '16px';
        o.style.padding = '20px 0';
        theMainImg = o;
      } else if (o.className === 'crs') {
        o.src = UI.A(o, o.className);
        o.className = '';
      }
    });

  img = new Image();
  img.onload = function () {
    if (that._showLoadId) {
      clearTimeout(that._showLoadId);
      that._showLoadId = null;
    }
    //onload may be called multiple times for gif
    if (that && that.active === id) {
      theMainImg.src = url;
      theMainImg.style.width = 'auto';
      theMainImg.style.padding = '0';
      that._show(false, item, {
        w : img.width,
        h : img.height
      });
    }
    theMainImg = item = more = that = img = img.onload =
      img.onerror = null;
  };

  img.onerror = function () {
    theMainImg.src = url;
    MI.picError(theMainImg);
    theMainImg = item = more = that = img = img.onload =
      img.onerror = null;
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

MI.PicList.prototype.more = function (auto, checkArrStatus) {
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
          if (checkArrStatus) {
            Self._showArrow();
          }

          //Speed
          Time_2 = +new Date() - Time;
          setTimeout(function () {
            Time_3 = +new Date() - Time;
            MI.Speed('t_asyn_more', 0.005, Time_1, Time_2, Time_3);
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
    children = UI.children(this._lists),
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
      UI.append(cache, this._lists);
      if (!UI.B.ie) {
        MI.GoTop.position();
      }

      //Resize Dialog's Bg
      if (MI.dialog && MI.dialog.display) {
        MI.dialog.resizeBg();
      }
      if (this.activeDlg) {
        this._modalDlg.resizeBg();
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
      Self.noMore = true;
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
    maxTimes = 8,
    that = this;

  getMore = function () {
    clearTimeout(moreDelay);
    setTimeout(more, 200);
  };

  more = function () {
    if (that.moreTimes < maxTimes &&
        UI.pageHeight() - UI.scrollY() - UI.windowHeight() < 900) {
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
  var children = UI.children(this._lists),
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
    ctn = this._lists;

  if (ctn) {
    lists = UI.GC('.main .imgMod');
    main = UI.parents(ctn, 'main')[0];
    y = 0;
    if (main) {
      wrap = main.parentNode;
    }
    if (!lists.length) {
      lists = UI.GC('.imgMod');
    }
    list = lists[lists.length - 1];
    if (list && UI.height(ctn)) {
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
  var talk, id, tid, data, favBtn,
    that = this,
    url = MI.TalkList.prototype.favorUrl;

  if (this.activeDlg) {
    id = this.activeDlg;
    tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
    favBtn = this._modalDlg._cont;
  } else {
    id = this.content;
    tid = this.activeTweet;
    favBtn = this._container;
  }
  data = {id : tid, r : MI.random()};
  talk = UI.G(id);
  favBtn = UI.GC(favBtn, '.clk-fav')[0];

  data.op = type < 2 ? 1 : 2;

  if (!talk.sending) {
    MI.ajax({
      url : url,
      data : data,
      success : function (data) {
        talk.sending = 0;
        data = MI.json(data);
        if (data.result === 0) {
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

MI.PicList.prototype._showArrow = function () {
  var larr, rarr, item, prev, next, v,
    visi = 'visibility';
    dlg = this._modalDlg;

  if (!dlg.arrAdded) {
    this._addArrowCls();
  }

  item = UI.G(this.activeDlg);
  prev = item && UI.prev(item);
  if (!prev || !prev.id || !UI.hasClass(prev, 'imgView')) {
    v = 'hidden';
  } else {
    v = '';
  }
  larr = this.arrLeft;
  UI.C(larr, visi, v);

  next = item && UI.next(item);
  if (!next || !next.id || !UI.hasClass(next, 'imgView')) {
    if (!this.noMore) {
      this.more(true, true);
    }
    v = 'hidden';
  } else {
    v = '';
  }
  rarr = this.arrRight;
  this.rePosDlg();
  UI.C(rarr, visi, v);
};

MI.PicList.prototype._addArrowCls = function () {
  var el, arrl, arrr, el2,
    dlg = this._modalDlg;

  el = UI.DC('div');
  el.className = 'imgModArr';
  el.innerHTML = '<a class="clk-arrl" href="javascript:void(0)" title="上一张(用键盘←键也可翻页)" hideFocus><b></b></a><a class="clk-arrr" href="javascript:void(0)" title="下一张(用键盘→键也可翻页)" hideFocus><b></b></a>';

  this.arrLeft = arrl = el.firstChild;
  this.arrRight = arrr = arrl.nextSibling;

  UI.after(el, dlg._wrap);

  el2 = UI.DC('a');
  el2.className = 'imgModPptCls clk-pptcls';
  el2.href = 'javascript:void(0)';
  UI.after(el2, el);

  this._elClose = el2;

  dlg.arrAdded = true;
};

MI.PicList.prototype.rePosDlg = function (wrap) {
  var toppx, tips, arrl, arrr, wrap, hint, cls, arrt, arrPadding,
    winxy = MI.PicList.getWindowXY(),
    settop = function (el, y) {
      el.style.top = y + 'px';
    };

  wrap = this._modalDlg._wrap;
  arrl = UI.GC(wrap.parentNode, '.clk-arrl')[0];
  arrr = arrl.nextSibling;
  hint = UI.GC(wrap.parentNode, '.imgModHint')[0];
  arrPadding = (winxy[1] - 47) / 2;

  arrl.style.paddingTop = arrr.style.paddingTop = arrPadding + 'px';
  arrl.style.paddingBottom = arrr.style.paddingBottom = arrPadding + 'px';

  if (UI.B.ie6 || UI.B.ipad) { //ipad do NOT support fixed position
    cls = UI.GC(wrap.parentNode, '.imgModPptCls')[0];
    toppx = (winxy[1] - wrap.offsetHeight) / 2;
    toppx = toppx > 0 ? toppx : 0;
    toppx = UI.scrollY() + toppx + 2;
    arrt = toppx + (winxy[1] - 47 - arrPadding * 2) / 2 - 20;
    settop(wrap, toppx);
    settop(cls, toppx);
    settop(hint, toppx);
  } else {
    arrt = (winxy[1] - 47 - arrPadding * 2) / 2 - 20;
    settop(wrap, 2);
    wrap.style.position = 'fixed';
  }
  arrt = arrt < 0 ? 0 : arrt;
  settop(arrl, arrt);
  settop(arrr, arrt);
  wrap.style.left = (winxy[0] - MI.PicList.MODAL_WIDTH) / 2 + 'px';
  arrl.style.left = (winxy[0] - MI.PicList.MODAL_WIDTH) / 2 - 107 + 'px';
  arrr.style.left = (winxy[0] + MI.PicList.MODAL_WIDTH) / 2 + 'px';
  hint.style.left = (winxy[0] + MI.PicList.MODAL_WIDTH) / 2 +
    (UI.B.ie ? 8 : 0) + 'px';
  this._elClose.style.right = (winxy[0] - MI.PicList.MODAL_WIDTH) / 2 -
    31 + 'px';

  tips = UI.GC(wrap, '.imgModTips')[0];
  tips.style.height = winxy[1] - 44 + 'px';
  tips.scrollTop = 0;
  this._modalDlg.resizeBg();
  wrap = null;
};

MI.PicList.prototype._genRelayCombo = function (id, container) {
  var relayList,
    relayListLoad,
    relayListCont,
    relayListId = '',
    relayListNum, //Cache View Relay List's Button
    relayTip,
    relayBox,
    delay,
    that = this,
    sourceTweetId,
    messageUrl,
    container = this._modalDlg._cont.firstChild,
    pageLinkClick = function () {
      /*
      Self.msgMode = 0;
      var data = '&r=' + MI.random();
      if (MI.api.type){
        data += '&apiType=' + MI.api.type;
      }
      MI.ajax({
        url : this.href,
        type : 'get',
        data : data,
        success : function(data){
          pageLink(data);
        }
      });
      Self.relayListPosition();
      return false;
      */
    },
    pageLink = function (data) {
      data = MI.json(data);
      if (data.result !== 0) {
        if (data.msg) {
          MI.alert(data.msg);
        }
        MI.PicList.relayListHide();
        return;
      }
      UI.hide(relayListLoad);
      relayListCont.innerHTML = data.info;
      UI.show(relayListCont);

      //Eval Javascript
      UI.evalScript(data.info);

      //Tips
      //if (UI.B.ipad || MI.S('tips_relayList_' + MI.user.account) == -1) {
      UI.hide(UI.GC(relayListCont, '.nfunTips')[0]);
      //}

      //Page Control
      var pages = UI.GC(relayListCont, '.pages a,.tabStyle1 a'), li;
      UI.each(pages, function (o) {
        if (!UI.A(o, 'target')) {
          o.onclick = pageLinkClick;
        }
      });

      li = UI.GC(relayListCont, 'ul.clear li');
      if (li.length) {
        if (MI.PicList.type !== 1 && MI.PicList.type !== 2) {
          UI.addClass(li[li.length - 1], 'nobor');
        }
        /*
        UI.each(li, function (o) {
          o.onmouseover = function () {
            UI.addClass(this, 'subHover');
          };
          o.onmouseout = function () {
            UI.removeClass(this, 'subHover');
          };
          try {
            var _relayCite = UI.GC(o, '.relayCite')[0],
              _replyCite = UI.GC(o, '.replyCite')[0],
              _report = UI.GC(o, '.alarm')[0];
            if (_relayCite) {
              _relayCite.onclick = function () {
                UI.show(relayBox._body);
                UI.addClass(relayBox._body, 'zfWrap');
                if (UI.hasClass(relayBox._body, 'comtWrap')) {
                  UI.removeClass(relayBox._body, 'comtWrap');
                }
                that.getRelayOld(relayBox, o, '.content');
                relayBox.txtTipSend = _('转播中');//');

                //Auto Select CheckBox Of Relay
                relayBox._relayCheck.checked = true;
                relayBox._relayCheck.onclick();
                return false;
              };
            }
            if (_replyCite) {
              _replyCite.onclick = function () {
                UI.show(relayBox._body);
                UI.addClass(relayBox._body, 'zfWrap');
//                 if (that.type !== 2 && that.type !== 1) {
//                   UI.addClass(relayBox._body,'comtWrap');
//                 }
                UI.addClass(relayBox._body, 'comtWrap');
//                 if (that.type === 1 || that.type === 2) {
//                   if (UI.hasClass(relayBox._body, 'zfWrap')) {
//                     UI.removeClass(relayBox._body,'zfWrap');
//                     UI.addClass(relayBox._body,'talkWrap');
//                   }
//                 }
                that.getRelayOld(relayBox, o, '.content');
                relayBox.txtTipSend = _('评论中');//');

                //Auto Select CheckBox Of Relay
                relayBox._relayCheck.checked = false;
                relayBox._relayCheck.onclick();
                return false;
              };
            }
            if (_report) {
              _report.onclick = function () {
                if (MI.user.fun.btnStyle === 5 ||
                    MI.user.fun.btnStyle === 6) {
                  that.reportQun(o.id, MI.Group.qid, 1);
                } else {
                  that.report(o.id, this);
                }
                return false;
              };
            }
          } catch (e) {}
        });
        */
      }

      //Relay Number
      try {
        var relayNum = UI.GC(relayList, '.num')[0],
          relayNumValue,
          relayListNumValue = $$(relayListNum,'.relayNum')[0],
          relay2Num = $$(relayList,'.num2')[0],
          relay2NumValue,
          relay2ListNumValue = $$(container,'.relayNum')[1];
        if (relayNum) {
          relayNumValue = relayNum.innerHTML;
          //relayListNumValue.innerHTML = relayNumValue != 0 ? relayNumValue : '';
          //if (relayNumValue != 0) {
          //  UI.addClass(viewRelay,'zfNumShow');
          //}
          //else {
          //  UI.removeClass(viewRelay,'zfNumShow');
          //}
          if (relayNumValue == 0 && $$(relayList,'ul li').length == 0) {
            UI.hide($$(relayList,'ul')[0]);
            UI.hide($$(relayList,'.pages')[0]);
          }
          if (relayNumValue > parseInt(relayListNumValue.innerHTML)){
            relayListNumValue.innerHTML = relayNumValue;
          }
        }
        /*
        if (relay2Num && relay2ListNumValue) { //二次转播
          relay2NumValue = relay2Num.innerHTML;
          if (relay2NumValue > parseInt(relay2ListNumValue.innerHTML)){
            relay2ListNumValue.innerHTML = relay2NumValue;
          }
        }*/
      }catch(e){}

      //Relay Box
      /*
      var relayBoxTip = $$(relayListCont,'.relayThumb')[0];
      if (relayBoxTip) {
        relayBoxTip.onclick = createRelayBox;
        relayBoxTip.onclick();
      }
      */

      //Disabled dblclick select
      relayListCont.onclick = function(){
        MI.DisableDblClickSelect(this);
      }

      //Build Tips
      //Self.buildTips(relayList);
      MI.Card.build(relayList,
        '.msgCnt strong a,.msgCnt em a,.cNote2 a,.more a',2);

      MI.PV('relay');
    };
    /*
    createRelayBox = function(){
      UI.hide(this);
      var relay,isRelay = 1;//MI.S('option_relayListCheck_' + MI.user.account) != -1
      if (!this.appended) {
        relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
        if(Self.type==2)    //群内私聊没有转播
        {
          isRelay = 0;
          relay = UI.html(MI.tmpl.reply.replace('talkWrap','zfWrap comtWrap').replace('<div class="left"></div>','<div class="left" style="display:none"><label for="replayListCheckbox"><input id="replayListCheckbox" type="checkbox"' + (isRelay ? ' checked' : '') + ' class="check1">' + _('同时转播给你的听众') + '</label></div>').replace('talkSuc',''))[0];
        }
        relayTip = $$(relayListCont,'.relayThumb')[0];
        relayBox = new MI.TalkBox(relay);
        if(Self.isQun==1)
        {
          var wqid=parseInt(UI.A(el,"wqid"));
          relayBox.data.wqid=wqid;
        }
        relayBox.countTxt();
        relayBox.txtTipSend = _('转播中');
        relayBox.addList = Self.relayBox.addList;
        relayBox.talkId = UI.A(viewRelay,'rel');
        relayBox.type = 1;
        relayBox.iconPic = Self.iconPic;
        relayBox.autoHeight = 30;
        relayBox._relayCheck = $$(relayBox._body,'.check1')[0];
        relayBox.successStart = function(){
          var refresh = $$(relayListCont,'.refreshBth')[0];
          if (refresh) {
            refresh.onclick();
          }
          MI.tip(relayBox.type == 1 ? _('转播成功！') : _('评论成功！'));
          Self.updateRelayNum(relayBox.type);
        }
        relayBox.start = function(){
          clearTimeout(delay);
        }
        if (!isRelay) {
          relayBox.type = 4;
          relayBox.addList = 0;
        }
//        UI.EA(relayBox._txt,'blur',function(){
//          if (!relayBox._txt.value) {
//            delay = setTimeout(function(){
//              UI.hide(relayBox._body);
//              UI.show(relayTip); 
//            },300);
//          }
//        });
        UI.after(relay,this);
//        if(Self.type==1 && Self.msgMode == 1) {
//          UI.hide(relay);
//          //Self.msgMode = 0;
//          relay.blur();
//        } else {
//          UI.show(relay);
//        }
        relayBox._body.ondblclick = function(e){
          UI.E(e).stop();
        }
        if (!UI.B.ie) {
          relayBox._body.onmousedown = function(e){
            UI.E(e).stop();
          }
        }
        setTimeout(function(){
          Self.getRelayOld(relayBox,el,'.msgBox .msgCnt');
        },100);

        //同时转播给你的听众
        relayBox._relayCheck.onclick = function(){
          var checked = this.checked;
          relayBox.type = checked ? 1 : 4;
          relayBox._tip.innerHTML = '';
          relayBox.countTxt();
          relayBox.addList = checked ? Self.relayBox.addList : 0;
          //MI.S('option_relayListCheck_' + MI.user.account,checked ? 1 : -1);
          MI.Bos('btnRelayistCheckbox');
        }
        this.appended = 1;
        if (!Self.relayListMulti){
          Self.talkBox = relayBox;
        }
      }
      else {
        UI.show(this.nextSibling);
      }
    };
    */

  if (!relayList) { //设置转播列表DOM
    //if (!Self['_relayList' + relayListId]) {
    MI.PicList.genRelayList(relayListId);
    //}
    relayList = MI.PicList['_relayList' + relayListId];
    relayListLoad = MI.PicList['_relayListLoad' + relayListId];
    relayListCont = MI.PicList['_relayListCont' + relayListId];
  }

  if (MI.PicList.xhrRelay) {
    MI.PicList.xhrRelay.abort();
  }

  UI.hide(relayListCont);
  UI.show(relayListLoad);

  UI.append(relayList, UI.GC(container,'.msgBox')[0]);

  sourceTweetId = UI.GC(container, '.imgView a')[0].href;
  sourceTweetId = sourceTweetId.match(/p\/t\/(\d+)/)[1];
  messageUrl = 'id=' + sourceTweetId + '&viewModel=' +
    MI.user.fun.iconPic + '&r=' + MI.random();

  if (MI.api.type){
    messageUrl += '&apiType=' + MI.api.type;
  }

//0-普通列表 1-群微博列表对外， 2-群微博列表对内
//   if(Self.type==2){
//     messageUrl += '&zone=2';
//   }

  MI.PicList.xhrRelay = MI.ajax({
    url : MI.url.relayList,
    type : 'get',
    data : messageUrl,
    success : function(data){
      var i;
      pageLink(data);
      that.rePosDlg();
    }
  });
};


MI.PicList.prototype.hideModalDlg = function () {
  this._modalDlg.hide();
};

MI.PicList.prototype.showModalDlg = function (id, justChangeContent) {
  var dlg, url, more, img, bigImg, tid,
    that = this,
    item = UI.G(id);

  if (MI.PicList.modalInstance && MI.PicList.modalInstance !== this) {
    return;
  }

  if (this.active) {
    this._hide();
  }

  MI.PicList.modalInstance = this;

  this.activeDlg = id;
  more = UI.GC(item, '.imgModMore')[0];
  if (!this._modalDlg) {
    this._modalDlg = new MI.Dialog();
    this._addModalEvents();
    UI.C(this._modalDlg._bg, 'opacity', 0.8);
  }
  this._showModalHint();

  dlg = this._modalDlg;

  if (justChangeContent) {
    dlg._cont.firstChild.innerHTML = more.innerHTML;
    this._showArrow();
  } else {
    dlg.show({
      html : '<div class="imgModTips LC" style="position:relative;border:0;overflow-y:scroll;overflow-x:hidden;width:575px;">' + more.innerHTML + '</div>',
      width : MI.PicList.MODAL_WIDTH,
      start : function () {
        var tit = that._modalDlg._title;
        that._showArrow();

        tit.style.cssText = 'height:auto;padding:10px 0 5px 15px;';
        tit.innerHTML = '<div class="imgModTool"><a href="#" class="clk-rotateimg"><em></em>' + _('向左转') + '</a><span>|</span><a href="#" class="clk-rotateimgcke"><em></em>' + _('向右转') + '</a><a target="_blank" class="imgModOrig" href="javascript:void(0)">查看原图</a></div>';
      },
      end : function () {
        that = that.activeDlg = null;
        MI.PicList.modalInstance = null;
      },
      top : UI.scrollY(),
      noReserve : true,
      close : false
    });
  }

  //load head logos
  UI.each(dlg._cont.firstChild.getElementsByTagName('img'),
    function (o) {
      if (o.className === 'crs') {
        o.src = UI.A(o, o.className);
        o.className = '';
      } else if (o.className === 'srs') {
        url = o.src || UI.A(o, 'srs');
        o.src = 'http://mat1.gtimg.com/www/mb/images/loading.gif';
        o.style.cssText = 'width:16px;padding:10px 0;';
        bigImg = o;
      }
    });

  UI.GC(dlg._wrap, '.DClose')[0].style.right = '15px';
  UI.GC(dlg._wrap, '.imgModOrig')[0].href = url.substr(0,
    url.length - 3) + '2000';


  //hide show all link
  UI.hide(UI.GC(dlg._cont, '.zfNum')[0]);

  //the focus makes the firefox scroll
  dlg._cont.firstChild.focus();


  img = new Image();
  img.onload = function () {
    var tid;

    //onload may be called multiple times for gif
    if (that && that.activeDlg === id) {
      tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
      bigImg.src = url;
      bigImg.style.cssText = 'height:' + img.height + 'px;width:' +
        img.width + 'px;padding-top:10px;';
      UI.GC(dlg._cont.firstChild, '.pubInfo')[0].appendChild(
        that._getFunbox(tid)
        );

      bigImg.r = 0;
      canvasid = tid + 'C';
      canvas = UI.html('<canvas style="display:none" id="' + canvasid + '"></canvas>')[0];
      UI.after(canvas, bigImg);
      MI.canvas[canvasid] = canvas.getContext('2d');
      UI.A(canvas, 'width', bigImg.width);
      UI.A(canvas, 'height', bigImg.height);

      //delay exec because the wrap.offsetHeight might be wrong
      setTimeout(function () {
        that.rePosDlg();
      }, 0);
    }
    item = more = img = bigImg = dlg = img.onload =
      img.onerror = null;
  };

  img.onerror = function () {
    item = more = img = bigImg = dlg = img.onload =
      img.onerror = null;
  };

  img.src = url;

  tid = id.indexOf('-') > 0 ? id.split('-')[1] : id;
  this._genRelayCombo(tid);
};

MI.PicList.prototype.showNextDlg = function () {
  var item, next;

  if (this.activeDlg) {
    item = UI.G(this.activeDlg);
    if (item) {
      next = UI.next(item);
      if (UI.hasClass(next, 'imgView') && next.id) {
        this.showModalDlg(next.id, true);
      }
    }
  }
};

MI.PicList.prototype.showPrevDlg = function () {
  var item, prev;

  if (this.activeDlg) {
    item = UI.G(this.activeDlg);
    if (item) {
      prev = UI.prev(item);
      if (UI.hasClass(prev, 'imgView') && prev.id) {
        this.showModalDlg(prev.id, true);
      }
    }
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

MI.PicList.prototype._showModalHint = function () {
  var el, arrl, arrr, item,
    dlg = this._modalDlg;

  if (!this._modalHintShowed) {
    this._modalHintShowed = true;

    el = UI.DC('div');
    el.className = 'imgModHint';
    el.innerHTML = '<img src="http://mat1.gtimg.com/www/mb/images/pic-ppt-hint.gif"/>';

    UI.after(el, dlg._wrap);
    setTimeout(function () {
      UI.hide(el);
    }, 5000);
  }
};

MI.PicList.prototype._showEmpty = function () {
  var ctn = this._lists,
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
    ctn = this._lists;
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
    <a href="/p/t/<%=o.id%>" target="_blank" class="clk-1"><img src="<%=imgo.image[0]%>/160" alt="" target="_blank" onclick=""></a>\
    <div class="imgModMore" style="display:none;">\
      <div class="imgView"><a href="/p/t/<%=imgo.id%>" target="_blank" class="clk-2"><img alt="" class="srs" srs="<%=imgo.image[0]%>/460" width="100%"></a></div>\
      <div class="msgWrap clear"><div class="userPic"><a title="" href="/<%=o.name%>" rel="<%=nick%>(@<%=o.name%>)"><img src="<%=o.pic%>" card="1" ctype="1" title=""></a></div>\
        <div class="msgBox"><div rel="<%=o.name%>" class="userName"><strong><a title="<%=nick%>(@<%=o.name%>)" href="/<%=o.name%>" card="1" ctype="2" rel="<%=nick%>(@<%=o.name%>"><%=nick%></a>'+MIIcon('o.flag')+':</strong></div><div class="msgCnt"><%=o.content%></div><% if(o.type===2) {%>\
    <div class="replyBox" style="clear:both"><div class="msgBox" rel="<%=o.source.name%>"><div class="msgCnt"><strong><em>['+_('原文')+']</em>\n<a rel="<%=o.source.name%>" ctype="2" card="1" href="/<%=o.source.name%>" title="<%=o.source.bkname||o.source.nick%>(@<%=o.source.name%>)"><%=o.source.bkname||o.source.nick%></a>'+MIIcon('o.source.flag')+':</strong><%=o.source.content%></div></div></div><% } %>\
        <div class="pubInfo"><span class="left"><a from="3" href="/p/t/<%=o.id%>" target="_blank" class="time" rel="<%=o.timestamp%>" title="<%=dt%>"><%=o.time%></a><% if (imgo.count>0) { %><a class="zfNum clk-rc" target="_blank" href="/p/t/<%=imgo.id%>">查看全部转播和评论(<b class="relayNum"><%=imgo.count%></b>)</a><% } %> </span></div></div>\
      </div>\
    </div>\
    </div>\
    <% }} %>';
  }
});

if (!window.mb_quick_reg) {
  window.mb_quick_reg = function() {};
}
