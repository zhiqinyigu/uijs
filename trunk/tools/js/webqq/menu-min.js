﻿/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.0
*/
(function() {
    var B = YAHOO.util.Dom,
    A = YAHOO.util.Event;
    YAHOO.widget.MenuManager = function() {
        var N = false,
        F = {},
        Q = {},
        J = {},
        E = {
            "click": "clickEvent",
            "mousedown": "mouseDownEvent",
            "mouseup": "mouseUpEvent",
            "mouseover": "mouseOverEvent",
            "mouseout": "mouseOutEvent",
            "keydown": "keyDownEvent",
            "keyup": "keyUpEvent",
            "keypress": "keyPressEvent"
        },
        K = null;
        function D(S) {
            var R;
            if (S && S.tagName) {
                switch (S.tagName.toUpperCase()) {
                case "DIV":
                    R = S.parentNode;
                    if ((B.hasClass(S, "hd") || B.hasClass(S, "bd") || B.hasClass(S, "ft")) && R && R.tagName && R.tagName.toUpperCase() == "DIV") {
                        return R;
                    } else {
                        return S;
                    }
                    break;
                case "LI":
                    return S;
                default:
                    R = S.parentNode;
                    if (R) {
                        return D(R);
                    }
                    break;
                }
            }
        }
        function G(V) {
            var R = A.getTarget(V),
            S = D(R),
            X,
            T,
            U,
            Z,
            Y;
            if (S) {
                T = S.tagName.toUpperCase();
                if (T == "LI") {
                    U = S.id;
                    if (U && J[U]) {
                        Z = J[U];
                        Y = Z.parent;
                    }
                } else {
                    if (T == "DIV") {
                        if (S.id) {
                            Y = F[S.id];
                        }
                    }
                }
            }
            if (Y) {
                X = E[V.type];
                if (Z && !Z.cfg.getProperty("disabled")) {
                    Z[X].fire(V);
                    if (V.type == "keyup" || V.type == "mousedown") {
                        if (K != Z) {
                            if (K) {
                                K.blurEvent.fire();
                            }
                            Z.focusEvent.fire();
                        }
                    }
                }
                Y[X].fire(V, Z);
            } else {
                if (V.type == "mousedown") {
                    if (K) {
                        K.blurEvent.fire();
                        K = null;
                    }
                    for (var W in Q) {
                        if (YAHOO.lang.hasOwnProperty(Q, W)) {
                            Y = Q[W];
                            if (Y.cfg.getProperty("clicktohide") && !(Y instanceof YAHOO.widget.MenuBar) && Y.cfg.getProperty("position") == "dynamic") {
                                Y.hide();
                            } else {
                                Y.clearActiveItem(true);
                            }
                        }
                    }
                } else {
                    if (V.type == "keyup") {
                        if (K) {
                            K.blurEvent.fire();
                            K = null;
                        }
                    }
                }
            }
        }
        function P(S, R, T) {
            if (F[T.id]) {
                this.removeMenu(T);
            }
        }
        function M(S, R) {
            var T = R[0];
            if (T) {
                K = T;
            }
        }
        function H(S, R) {
            K = null;
        }
        function C(T, S) {
            var R = S[0],
            U = this.id;
            if (R) {
                Q[U] = this;
            } else {
                if (Q[U]) {
                    delete Q[U];
                }
            }
        }
        function L(S, R) {
            O(this);
        }
        function O(S) {
            var R = S.id;
            if (R && J[R]) {
                if (K == S) {
                    K = null;
                }
                delete J[R];
                S.destroyEvent.unsubscribe(L);
            }
        }
        function I(S, R) {
            var U = R[0],
            T;
            if (U instanceof YAHOO.widget.MenuItem) {
                T = U.id;
                if (!J[T]) {
                    J[T] = U;
                    U.destroyEvent.subscribe(L);
                }
            }
        }
        return {
            addMenu: function(S) {
                var R;
                if (S instanceof YAHOO.widget.Menu && S.id && !F[S.id]) {
                    F[S.id] = S;
                    if (!N) {
                        R = document;
                        A.on(R, "mouseover", G, this, true);
                        A.on(R, "mouseout", G, this, true);
                        A.on(R, "mousedown", G, this, true);
                        A.on(R, "mouseup", G, this, true);
                        A.on(R, "click", G, this, true);
                        A.on(R, "keydown", G, this, true);
                        A.on(R, "keyup", G, this, true);
                        A.on(R, "keypress", G, this, true);
                        N = true;
                    }
                    S.cfg.subscribeToConfigEvent("visible", C);
                    S.destroyEvent.subscribe(P, S, this);
                    S.itemAddedEvent.subscribe(I);
                    S.focusEvent.subscribe(M);
                    S.blurEvent.subscribe(H);
                }
            },
            removeMenu: function(U) {
                var S, R, T;
                if (U) {
                    S = U.id;
                    if (F[S] == U) {
                        R = U.getItems();
                        if (R && R.length > 0) {
                            T = R.length - 1;
                            do {
                                O(R[T]);
                            } while ( T --);
                        }
                        delete F[S];
                        if (Q[S] == U) {
                            delete Q[S];
                        }
                        if (U.cfg) {
                            U.cfg.unsubscribeFromConfigEvent("visible", C);
                        }
                        U.destroyEvent.unsubscribe(P, U);
                        U.itemAddedEvent.unsubscribe(I);
                        U.focusEvent.unsubscribe(M);
                        U.blurEvent.unsubscribe(H);
                    }
                }
            },
            hideVisible: function() {
                var R;
                for (var S in Q) {
                    if (YAHOO.lang.hasOwnProperty(Q, S)) {
                        R = Q[S];
                        if (! (R instanceof YAHOO.widget.MenuBar) && R.cfg.getProperty("position") == "dynamic") {
                            R.hide();
                        }
                    }
                }
            },
            getVisible: function() {
                return Q;
            },
            getMenus: function() {
                return F;
            },
            getMenu: function(S) {
                var R = F[S];
                if (R) {
                    return R;
                }
            },
            getMenuItem: function(R) {
                var S = J[R];
                if (S) {
                    return S;
                }
            },
            getMenuItemGroup: function(U) {
                var S = B.get(U),
                R,
                W,
                V,
                T;
                if (S && S.tagName && S.tagName.toUpperCase() == "UL") {
                    W = S.firstChild;
                    if (W) {
                        R = [];
                        do {
                            T = W.id;
                            if (T) {
                                V = this.getMenuItem(T);
                                if (V) {
                                    R[R.length] = V;
                                }
                            }
                        } while (( W = W . nextSibling ));
                        if (R.length > 0) {
                            return R;
                        }
                    }
                }
            },
            getFocusedMenuItem: function() {
                return K;
            },
            getFocusedMenu: function() {
                if (K) {
                    return (K.parent.getRoot());
                }
            },
            toString: function() {
                return "MenuManager";
            }
        };
    } ();
})(); (function() {
    YAHOO.widget.Menu = function(O, N) {
        if (N) {
            this.parent = N.parent;
            this.lazyLoad = N.lazyLoad || N.lazyload;
            this.itemData = N.itemData || N.itemdata;
        }
        YAHOO.widget.Menu.superclass.constructor.call(this, O, N);
    };
    function I(N) {
        if (typeof N == "string") {
            return ("dynamic,static".indexOf((N.toLowerCase())) != -1);
        }
    }
    var C = YAHOO.util.Dom,
    M = YAHOO.util.Event,
    D = YAHOO.widget.Module,
    B = YAHOO.widget.Overlay,
    F = YAHOO.widget.Menu,
    K = YAHOO.widget.MenuManager,
    L = YAHOO.util.CustomEvent,
    E = YAHOO.lang,
    H = YAHOO.env.ua,
    G, A = {
        "MOUSE_OVER": "mouseover",
        "MOUSE_OUT": "mouseout",
        "MOUSE_DOWN": "mousedown",
        "MOUSE_UP": "mouseup",
        "CLICK": "click",
        "KEY_PRESS": "keypress",
        "KEY_DOWN": "keydown",
        "KEY_UP": "keyup",
        "FOCUS": "focus",
        "BLUR": "blur",
        "ITEM_ADDED": "itemAdded",
        "ITEM_REMOVED": "itemRemoved"
    },
    J = {
        "VISIBLE": {
            key: "visible",
            value: false,
            validator: E.isBoolean
        },
        "CONSTRAIN_TO_VIEWPORT": {
            key: "constraintoviewport",
            value: true,
            validator: E.isBoolean,
            supercedes: ["iframe", "x", "y", "xy"]
        },
        "POSITION": {
            key: "position",
            value: "dynamic",
            validator: I,
            supercedes: ["visible", "iframe"]
        },
        "SUBMENU_ALIGNMENT": {
            key: "submenualignment",
            value: ["tl", "tr"],
            suppressEvent: true
        },
        "AUTO_SUBMENU_DISPLAY": {
            key: "autosubmenudisplay",
            value: true,
            validator: E.isBoolean,
            suppressEvent: true
        },
        "SHOW_DELAY": {
            key: "showdelay",
            value: 250,
            validator: E.isNumber,
            suppressEvent: true
        },
        "HIDE_DELAY": {
            key: "hidedelay",
            value: 0,
            validator: E.isNumber,
            suppressEvent: true
        },
        "SUBMENU_HIDE_DELAY": {
            key: "submenuhidedelay",
            value: 250,
            validator: E.isNumber,
            suppressEvent: true
        },
        "CLICK_TO_HIDE": {
            key: "clicktohide",
            value: true,
            validator: E.isBoolean,
            suppressEvent: true
        },
        "CONTAINER": {
            key: "container",
            suppressEvent: true
        },
        "SCROLL_INCREMENT": {
            key: "scrollincrement",
            value: 1,
            validator: E.isNumber,
            supercedes: ["maxheight"],
            suppressEvent: true
        },
        "MIN_SCROLL_HEIGHT": {
            key: "minscrollheight",
            value: 90,
            validator: E.isNumber,
            supercedes: ["maxheight"],
            suppressEvent: true
        },
        "MAX_HEIGHT": {
            key: "maxheight",
            value: 0,
            validator: E.isNumber,
            supercedes: ["iframe"],
            suppressEvent: true
        },
        "CLASS_NAME": {
            key: "classname",
            value: null,
            validator: E.isString,
            suppressEvent: true
        },
        "DISABLED": {
            key: "disabled",
            value: false,
            validator: E.isBoolean,
            suppressEvent: true
        }
    };
    YAHOO.lang.extend(F, B, {
        CSS_CLASS_NAME: "yuimenu",
        ITEM_TYPE: null,
        GROUP_TITLE_TAG_NAME: "h6",
        OFF_SCREEN_POSITION: [ - 10000, -10000],
        _nHideDelayId: null,
        _nShowDelayId: null,
        _nSubmenuHideDelayId: null,
        _nBodyScrollId: null,
        _bHideDelayEventHandlersAssigned: false,
        _bHandledMouseOverEvent: false,
        _bHandledMouseOutEvent: false,
        _aGroupTitleElements: null,
        _aItemGroups: null,
        _aListElements: null,
        _nCurrentMouseX: 0,
        _bStopMouseEventHandlers: false,
        _sClassName: null,
        lazyLoad: false,
        itemData: null,
        activeItem: null,
        parent: null,
        srcElement: null,
        mouseOverEvent: null,
        mouseOutEvent: null,
        mouseDownEvent: null,
        mouseUpEvent: null,
        clickEvent: null,
        keyPressEvent: null,
        keyDownEvent: null,
        keyUpEvent: null,
        itemAddedEvent: null,
        itemRemovedEvent: null,
        init: function(P, O) {
            this._aItemGroups = [];
            this._aListElements = [];
            this._aGroupTitleElements = [];
            if (!this.ITEM_TYPE) {
                this.ITEM_TYPE = YAHOO.widget.MenuItem;
            }
            var N;
            if (typeof P == "string") {
                N = document.getElementById(P);
            } else {
                if (P.tagName) {
                    N = P;
                }
            }
            if (N && N.tagName) {
                switch (N.tagName.toUpperCase()) {
                case "DIV":
                    this.srcElement = N;
                    if (!N.id) {
                        N.setAttribute("id", C.generateId());
                    }
                    F.superclass.init.call(this, N);
                    this.beforeInitEvent.fire(F);
                    break;
                case "SELECT":
                    this.srcElement = N;
                    F.superclass.init.call(this, C.generateId());
                    this.beforeInitEvent.fire(F);
                    break;
                }
            } else {
                F.superclass.init.call(this, P);
                this.beforeInitEvent.fire(F);
            }
            if (this.element) {
                C.addClass(this.element, this.CSS_CLASS_NAME);
                this.initEvent.subscribe(this._onInit);
                this.beforeRenderEvent.subscribe(this._onBeforeRender);
                this.renderEvent.subscribe(this._onRender);
                this.renderEvent.subscribe(this.onRender);
                this.beforeShowEvent.subscribe(this._onBeforeShow);
                this.hideEvent.subscribe(this.positionOffScreen);
                this.showEvent.subscribe(this._onShow);
                this.beforeHideEvent.subscribe(this._onBeforeHide);
                this.mouseOverEvent.subscribe(this._onMouseOver);
                this.mouseOutEvent.subscribe(this._onMouseOut);
                this.clickEvent.subscribe(this._onClick);
                this.keyDownEvent.subscribe(this._onKeyDown);
                this.keyPressEvent.subscribe(this._onKeyPress);
                if (H.gecko || H.webkit) {
                    this.cfg.subscribeToConfigEvent("y", this._onYChange);
                }
                if (O) {
                    this.cfg.applyConfig(O, true);
                }
                K.addMenu(this);
                this.initEvent.fire(F);
            }
        },
        _initSubTree: function() {
            var O = this.srcElement,
            N, Q, T, U, S, R, P;
            if (O) {
                N = (O.tagName && O.tagName.toUpperCase());
                if (N == "DIV") {
                    U = this.body.firstChild;
                    if (U) {
                        Q = 0;
                        T = this.GROUP_TITLE_TAG_NAME.toUpperCase();
                        do {
                            if (U && U.tagName) {
                                switch (U.tagName.toUpperCase()) {
                                case T:
                                    this._aGroupTitleElements[Q] = U;
                                    break;
                                case "UL":
                                    this._aListElements[Q] = U;
                                    this._aItemGroups[Q] = [];
                                    Q++;
                                    break;
                                }
                            }
                        } while (( U = U . nextSibling ));
                        if (this._aListElements[0]) {
                            C.addClass(this._aListElements[0], "first-of-type");
                        }
                    }
                }
                U = null;
                if (N) {
                    switch (N) {
                    case "DIV":
                        S = this._aListElements;
                        R = S.length;
                        if (R > 0) {
                            P = R - 1;
                            do {
                                U = S[P].firstChild;
                                if (U) {
                                    do {
                                        if (U && U.tagName && U.tagName.toUpperCase() == "LI") {
                                            this.addItem(new this.ITEM_TYPE(U, {
                                                parent: this
                                            }), P);
                                        }
                                    } while (( U = U . nextSibling ));
                                }
                            } while ( P --);
                        }
                        break;
                    case "SELECT":
                        U = O.firstChild;
                        do {
                            if (U && U.tagName) {
                                switch (U.tagName.toUpperCase()) {
                                case "OPTGROUP":
                                case "OPTION":
                                    this.addItem(new this.ITEM_TYPE(U, {
                                        parent: this
                                    }));
                                    break;
                                }
                            }
                        } while (( U = U . nextSibling ));
                        break;
                    }
                }
            }
        },
        _getFirstEnabledItem: function() {
            var N = this.getItems(),
            Q = N.length,
            P;
            for (var O = 0; O < Q; O++) {
                P = N[O];
                if (P && !P.cfg.getProperty("disabled") && P.element.style.display != "none") {
                    return P;
                }
            }
        },
        _addItemToGroup: function(S, T, W) {
            var U, X, Q, V, R, O, P;
            function N(Y, Z) {
                return (Y[Z] || N(Y, (Z + 1)));
            }
            if (T instanceof this.ITEM_TYPE) {
                U = T;
                U.parent = this;
            } else {
                if (typeof T == "string") {
                    U = new this.ITEM_TYPE(T, {
                        parent: this
                    });
                } else {
                    if (typeof T == "object") {
                        T.parent = this;
                        U = new this.ITEM_TYPE(T.text, T);
                    }
                }
            }
            if (U) {
                if (U.cfg.getProperty("selected")) {
                    this.activeItem = U;
                }
                X = typeof S == "number" ? S: 0;
                Q = this._getItemGroup(X);
                if (!Q) {
                    Q = this._createItemGroup(X);
                }
                if (typeof W == "number") {
                    R = (W >= Q.length);
                    if (Q[W]) {
                        Q.splice(W, 0, U);
                    } else {
                        Q[W] = U;
                    }
                    V = Q[W];
                    if (V) {
                        if (R && (!V.element.parentNode || V.element.parentNode.nodeType == 11)) {
                            this._aListElements[X].appendChild(V.element);
                        } else {
                            O = N(Q, (W + 1));
                            if (O && (!V.element.parentNode || V.element.parentNode.nodeType == 11)) {
                                this._aListElements[X].insertBefore(V.element, O.element);
                            }
                        }
                        V.parent = this;
                        this._subscribeToItemEvents(V);
                        this._configureSubmenu(V);
                        this._updateItemProperties(X);
                        this.itemAddedEvent.fire(V);
                        this.changeContentEvent.fire();
                        return V;
                    }
                } else {
                    P = Q.length;
                    Q[P] = U;
                    V = Q[P];
                    if (V) {
                        if (!C.isAncestor(this._aListElements[X], V.element)) {
                            this._aListElements[X].appendChild(V.element);
                        }
                        V.element.setAttribute("groupindex", X);
                        V.element.setAttribute("index", P);
                        V.parent = this;
                        V.index = P;
                        V.groupIndex = X;
                        this._subscribeToItemEvents(V);
                        this._configureSubmenu(V);
                        if (P === 0) {
                            C.addClass(V.element, "first-of-type");
                        }
                        this.itemAddedEvent.fire(V);
                        this.changeContentEvent.fire();
                        return V;
                    }
                }
            }
        },
        _removeItemFromGroupByIndex: function(Q, O) {
            var P = typeof Q == "number" ? Q: 0,
            R = this._getItemGroup(P),
            T,
            S,
            N;
            if (R) {
                T = R.splice(O, 1);
                S = T[0];
                if (S) {
                    this._updateItemProperties(P);
                    if (R.length === 0) {
                        N = this._aListElements[P];
                        if (this.body && N) {
                            this.body.removeChild(N);
                        }
                        this._aItemGroups.splice(P, 1);
                        this._aListElements.splice(P, 1);
                        N = this._aListElements[0];
                        if (N) {
                            C.addClass(N, "first-of-type");
                        }
                    }
                    this.itemRemovedEvent.fire(S);
                    this.changeContentEvent.fire();
                    return S;
                }
            }
        },
        _removeItemFromGroupByValue: function(P, N) {
            var R = this._getItemGroup(P),
            S,
            Q,
            O;
            if (R) {
                S = R.length;
                Q = -1;
                if (S > 0) {
                    O = S - 1;
                    do {
                        if (R[O] == N) {
                            Q = O;
                            break;
                        }
                    } while ( O --);
                    if (Q > -1) {
                        return (this._removeItemFromGroupByIndex(P, Q));
                    }
                }
            }
        },
        _updateItemProperties: function(O) {
            var P = this._getItemGroup(O),
            S = P.length,
            R,
            Q,
            N;
            if (S > 0) {
                N = S - 1;
                do {
                    R = P[N];
                    if (R) {
                        Q = R.element;
                        R.index = N;
                        R.groupIndex = O;
                        Q.setAttribute("groupindex", O);
                        Q.setAttribute("index", N);
                        C.removeClass(Q, "first-of-type");
                    }
                } while ( N --);
                if (Q) {
                    C.addClass(Q, "first-of-type");
                }
            }
        },
        _createItemGroup: function(O) {
            var N;
            if (!this._aItemGroups[O]) {
                this._aItemGroups[O] = [];
                N = document.createElement("ul");
                this._aListElements[O] = N;
                return this._aItemGroups[O];
            }
        },
        _getItemGroup: function(O) {
            var N = ((typeof O == "number") ? O: 0);
            return this._aItemGroups[N];
        },
        _configureSubmenu: function(N) {
            var O = N.cfg.getProperty("submenu");
            if (O) {
                this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange, O, true);
                this.renderEvent.subscribe(this._onParentMenuRender, O, true);
                O.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);
            }
        },
        _subscribeToItemEvents: function(N) {
            N.focusEvent.subscribe(this._onMenuItemFocus);
            N.blurEvent.subscribe(this._onMenuItemBlur);
            N.destroyEvent.subscribe(this._onMenuItemDestroy, N, this);
            N.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange, N, this);
        },
        _onVisibleChange: function(P, O) {
            var N = O[0];
            if (N) {
                C.addClass(this.element, "visible");
            } else {
                C.removeClass(this.element, "visible");
            }
        },
        _cancelHideDelay: function() {
            var N = this.getRoot();
            if (N._nHideDelayId) {
                window.clearTimeout(N._nHideDelayId);
            }
        },
        _execHideDelay: function() {
            this._cancelHideDelay();
            var O = this.getRoot(),
            P = this;
            function N() {
                if (O.activeItem) {
                    O.clearActiveItem();
                }
                if (O == P && !(P instanceof YAHOO.widget.MenuBar) && P.cfg.getProperty("position") == "dynamic") {
                    P.hide();
                }
            }
            O._nHideDelayId = window.setTimeout(N, O.cfg.getProperty("hidedelay"));
        },
        _cancelShowDelay: function() {
            var N = this.getRoot();
            if (N._nShowDelayId) {
                window.clearTimeout(N._nShowDelayId);
            }
        },
        _execShowDelay: function(P) {
            var O = this.getRoot();
            function N() {
                if (P.parent.cfg.getProperty("selected")) {
                    P.show();
                }
            }
            O._nShowDelayId = window.setTimeout(N, O.cfg.getProperty("showdelay"));
        },
        _execSubmenuHideDelay: function(Q, O, N) {
            var P = this;
            Q._nSubmenuHideDelayId = window.setTimeout(function() {
                if (P._nCurrentMouseX > (O + 10)) {
                    Q._nSubmenuHideDelayId = window.setTimeout(function() {
                        Q.hide();
                    },
                    N);
                } else {
                    Q.hide();
                }
            },
            50);
        },
        _disableScrollHeader: function() {
            if (!this._bHeaderDisabled) {
                C.addClass(this.header, "topscrollbar_disabled");
                this._bHeaderDisabled = true;
            }
        },
        _disableScrollFooter: function() {
            if (!this._bFooterDisabled) {
                C.addClass(this.footer, "bottomscrollbar_disabled");
                this._bFooterDisabled = true;
            }
        },
        _enableScrollHeader: function() {
            if (this._bHeaderDisabled) {
                C.removeClass(this.header, "topscrollbar_disabled");
                this._bHeaderDisabled = false;
            }
        },
        _enableScrollFooter: function() {
            if (this._bFooterDisabled) {
                C.removeClass(this.footer, "bottomscrollbar_disabled");
                this._bFooterDisabled = false;
            }
        },
        _onMouseOver: function(W, R) {
            if (this._bStopMouseEventHandlers) {
                return false;
            }
            var X = R[0],
            V = R[1],
            N = M.getTarget(X),
            O,
            Q,
            U,
            P,
            T,
            S;
            if (!this._bHandledMouseOverEvent && (N == this.element || C.isAncestor(this.element, N))) {
                this._nCurrentMouseX = 0;
                M.on(this.element, "mousemove", this._onMouseMove, this, true);
                if (!C.isAncestor(V.element, M.getRelatedTarget(X))) {
                    this.clearActiveItem();
                }
                if (this.parent && this._nSubmenuHideDelayId) {
                    window.clearTimeout(this._nSubmenuHideDelayId);
                    this.parent.cfg.setProperty("selected", true);
                    O = this.parent.parent;
                    O._bHandledMouseOutEvent = true;
                    O._bHandledMouseOverEvent = false;
                }
                this._bHandledMouseOverEvent = true;
                this._bHandledMouseOutEvent = false;
            }
            if (V && !V.handledMouseOverEvent && !V.cfg.getProperty("disabled") && (N == V.element || C.isAncestor(V.element, N))) {
                Q = this.cfg.getProperty("showdelay");
                U = (Q > 0);
                if (U) {
                    this._cancelShowDelay();
                }
                P = this.activeItem;
                if (P) {
                    P.cfg.setProperty("selected", false);
                }
                T = V.cfg;
                T.setProperty("selected", true);
                if (this.hasFocus()) {
                    V.focus();
                }
                if (this.cfg.getProperty("autosubmenudisplay")) {
                    S = T.getProperty("submenu");
                    if (S) {
                        if (U) {
                            this._execShowDelay(S);
                        } else {
                            S.show();
                        }
                    }
                }
                V.handledMouseOverEvent = true;
                V.handledMouseOutEvent = false;
            }
        },
        _onMouseOut: function(V, P) {
            if (this._bStopMouseEventHandlers) {
                return false;
            }
            var W = P[0],
            T = P[1],
            Q = M.getRelatedTarget(W),
            U = false,
            S,
            R,
            N,
            O;
            if (T && !T.cfg.getProperty("disabled")) {
                S = T.cfg;
                R = S.getProperty("submenu");
                if (R && (Q == R.element || C.isAncestor(R.element, Q))) {
                    U = true;
                }
                if (!T.handledMouseOutEvent && ((Q != T.element && !C.isAncestor(T.element, Q)) || U)) {
                    if (!U) {
                        T.cfg.setProperty("selected", false);
                        if (R) {
                            N = this.cfg.getProperty("submenuhidedelay");
                            O = this.cfg.getProperty("showdelay");
                            if (! (this instanceof YAHOO.widget.MenuBar) && N > 0 && O >= N) {
                                this._execSubmenuHideDelay(R, M.getPageX(W), N);
                            } else {
                                R.hide();
                            }
                        }
                    }
                    T.handledMouseOutEvent = true;
                    T.handledMouseOverEvent = false;
                }
            }
            if (!this._bHandledMouseOutEvent && ((Q != this.element && !C.isAncestor(this.element, Q)) || U)) {
                M.removeListener(this.element, "mousemove", this._onMouseMove);
                this._nCurrentMouseX = M.getPageX(W);
                this._bHandledMouseOutEvent = true;
                this._bHandledMouseOverEvent = false;
            }
        },
        _onMouseMove: function(O, N) {
            if (this._bStopMouseEventHandlers) {
                return false;
            }
            this._nCurrentMouseX = M.getPageX(O);
        },
        _onClick: function(Y, Q) {
            var W = YAHOO.util.Event,
            P = YAHOO.util.Dom,
            Z = Q[0],
            T = Q[1],
            R,
            V = false,
            O,
            N,
            S,
            U,
            X;
            if (T) {
                if (T.cfg.getProperty("disabled")) {
                    W.preventDefault(Z);
                } else {
                    R = T.cfg.getProperty("submenu");
                    S = T.cfg.getProperty("url");
                    if (S) {
                        U = S.indexOf("#");
                        X = S.length;
                        if (U != -1) {
                            S = S.substr(U, X);
                            X = S.length;
                            if (X > 1) {
                                N = S.substr(1, X);
                                V = P.isAncestor(this.element, N);
                            } else {
                                if (X === 1) {
                                    V = true;
                                }
                            }
                        }
                    }
                    if (V && !T.cfg.getProperty("target")) {
                        W.preventDefault(Z);
                        T.focus();
                    }
                    if (!R) {
                        O = this.getRoot();
                        if (O instanceof YAHOO.widget.MenuBar || O.cfg.getProperty("position") == "static") {
                            O.clearActiveItem();
                        } else {
                            O.hide();
                        }
                    }
                }
            }
        },
        _onKeyDown: function(b, V) {
            var Y = V[0],
            X = V[1],
            f = this,
            U,
            Z,
            O,
            S,
            c,
            N,
            e,
            R,
            a,
            Q,
            W,
            d,
            T;
            function P() {
                f._bStopMouseEventHandlers = true;
                window.setTimeout(function() {
                    f._bStopMouseEventHandlers = false;
                },
                10);
            }
            if (X && !X.cfg.getProperty("disabled")) {
                Z = X.cfg;
                O = this.parent;
                switch (Y.keyCode) {
                case 38:
                case 40:
                    c = (Y.keyCode == 38) ? X.getPreviousEnabledSibling() : X.getNextEnabledSibling();
                    if (c) {
                        this.clearActiveItem();
                        c.cfg.setProperty("selected", true);
                        c.focus();
                        if (this.cfg.getProperty("maxheight") > 0) {
                            N = this.body;
                            e = N.scrollTop;
                            R = N.offsetHeight;
                            a = this.getItems();
                            Q = a.length - 1;
                            W = c.element.offsetTop;
                            if (Y.keyCode == 40) {
                                if (W >= (R + e)) {
                                    N.scrollTop = W - R;
                                } else {
                                    if (W <= e) {
                                        N.scrollTop = 0;
                                    }
                                }
                                if (c == a[Q]) {
                                    N.scrollTop = c.element.offsetTop;
                                }
                            } else {
                                if (W <= e) {
                                    N.scrollTop = W - c.element.offsetHeight;
                                } else {
                                    if (W >= (e + R)) {
                                        N.scrollTop = W;
                                    }
                                }
                                if (c == a[0]) {
                                    N.scrollTop = 0;
                                }
                            }
                            e = N.scrollTop;
                            d = N.scrollHeight - N.offsetHeight;
                            if (e === 0) {
                                this._disableScrollHeader();
                                this._enableScrollFooter();
                            } else {
                                if (e == d) {
                                    this._enableScrollHeader();
                                    this._disableScrollFooter();
                                } else {
                                    this._enableScrollHeader();
                                    this._enableScrollFooter();
                                }
                            }
                        }
                    }
                    M.preventDefault(Y);
                    P();
                    break;
                case 39:
                    U = Z.getProperty("submenu");
                    if (U) {
                        if (!Z.getProperty("selected")) {
                            Z.setProperty("selected", true);
                        }
                        U.show();
                        U.setInitialFocus();
                        U.setInitialSelection();
                    } else {
                        S = this.getRoot();
                        if (S instanceof YAHOO.widget.MenuBar) {
                            c = S.activeItem.getNextEnabledSibling();
                            if (c) {
                                S.clearActiveItem();
                                c.cfg.setProperty("selected", true);
                                U = c.cfg.getProperty("submenu");
                                if (U) {
                                    U.show();
                                }
                                c.focus();
                            }
                        }
                    }
                    M.preventDefault(Y);
                    P();
                    break;
                case 37:
                    if (O) {
                        T = O.parent;
                        if (T instanceof YAHOO.widget.MenuBar) {
                            c = T.activeItem.getPreviousEnabledSibling();
                            if (c) {
                                T.clearActiveItem();
                                c.cfg.setProperty("selected", true);
                                U = c.cfg.getProperty("submenu");
                                if (U) {
                                    U.show();
                                }
                                c.focus();
                            }
                        } else {
                            this.hide();
                            O.focus();
                        }
                    }
                    M.preventDefault(Y);
                    P();
                    break;
                }
            }
            if (Y.keyCode == 27) {
                if (this.cfg.getProperty("position") == "dynamic") {
                    this.hide();
                    if (this.parent) {
                        this.parent.focus();
                    }
                } else {
                    if (this.activeItem) {
                        U = this.activeItem.cfg.getProperty("submenu");
                        if (U && U.cfg.getProperty("visible")) {
                            U.hide();
                            this.activeItem.focus();
                        } else {
                            this.activeItem.blur();
                            this.activeItem.cfg.setProperty("selected", false);
                        }
                    }
                }
                M.preventDefault(Y);
            }
        },
        _onKeyPress: function(P, O) {
            var N = O[0];
            if (N.keyCode == 40 || N.keyCode == 38) {
                M.preventDefault(N);
            }
        },
        _onYChange: function(O, N) {
            var Q = this.parent,
            S, P, R;
            if (Q) {
                S = Q.parent.body.scrollTop;
                if (S > 0) {
                    R = (this.cfg.getProperty("y") - S);
                    C.setY(this.element, R);
                    P = this.iframe;
                    if (P) {
                        C.setY(P, R);
                    }
                    this.cfg.setProperty("y", R, true);
                }
            }
        },
        _onScrollTargetMouseOver: function(T, W) {
            this._cancelHideDelay();
            var P = M.getTarget(T),
            R = this.body,
            V = this,
            Q = this.cfg.getProperty("scrollincrement"),
            N,
            O;
            function U() {
                var X = R.scrollTop;
                if (X < N) {
                    R.scrollTop = (X + Q);
                    V._enableScrollHeader();
                } else {
                    R.scrollTop = N;
                    window.clearInterval(V._nBodyScrollId);
                    V._disableScrollFooter();
                }
            }
            function S() {
                var X = R.scrollTop;
                if (X > 0) {
                    R.scrollTop = (X - Q);
                    V._enableScrollFooter();
                } else {
                    R.scrollTop = 0;
                    window.clearInterval(V._nBodyScrollId);
                    V._disableScrollHeader();
                }
            }
            if (C.hasClass(P, "hd")) {
                O = S;
            } else {
                N = R.scrollHeight - R.offsetHeight;
                O = U;
            }
            this._nBodyScrollId = window.setInterval(O, 10);
        },
        _onScrollTargetMouseOut: function(O, N) {
            window.clearInterval(this._nBodyScrollId);
            this._cancelHideDelay();
        },
        _onInit: function(O, N) {
            this.cfg.subscribeToConfigEvent("visible", this._onVisibleChange);
            var P = !this.parent,
            Q = this.lazyLoad;
            if (((P && !Q) || (P && (this.cfg.getProperty("visible") || this.cfg.getProperty("position") == "static")) || (!P && !Q)) && this.getItemGroups().length === 0) {
                if (this.srcElement) {
                    this._initSubTree();
                }
                if (this.itemData) {
                    this.addItems(this.itemData);
                }
            } else {
                if (Q) {
                    this.cfg.fireQueue();
                }
            }
        },
        _onBeforeRender: function(Q, P) {
            var R = this.element,
            U = this._aListElements.length,
            O = true,
            T = 0,
            N, S;
            if (U > 0) {
                do {
                    N = this._aListElements[T];
                    if (N) {
                        if (O) {
                            C.addClass(N, "first-of-type");
                            O = false;
                        }
                        if (!C.isAncestor(R, N)) {
                            this.appendToBody(N);
                        }
                        S = this._aGroupTitleElements[T];
                        if (S) {
                            if (!C.isAncestor(R, S)) {
                                N.parentNode.insertBefore(S, N);
                            }
                            C.addClass(N, "hastitle");
                        }
                    }
                    T++;
                } while ( T < U );
            }
        },
        _onRender: function(O, N) {
            if (this.cfg.getProperty("position") == "dynamic") {
                if (!this.cfg.getProperty("visible")) {
                    this.positionOffScreen();
                }
            }
        },
        _onBeforeShow: function(W, R) {
            var V, O, S, Q, T;
            if (this.lazyLoad && this.getItemGroups().length === 0) {
                if (this.srcElement) {
                    this._initSubTree();
                }
                if (this.itemData) {
                    if (this.parent && this.parent.parent && this.parent.parent.srcElement && this.parent.parent.srcElement.tagName.toUpperCase() == "SELECT") {
                        V = this.itemData.length;
                        for (O = 0; O < V; O++) {
                            if (this.itemData[O].tagName) {
                                this.addItem((new this.ITEM_TYPE(this.itemData[O])));
                            }
                        }
                    } else {
                        this.addItems(this.itemData);
                    }
                }
                T = this.srcElement;
                if (T) {
                    if (T.tagName.toUpperCase() == "SELECT") {
                        if (C.inDocument(T)) {
                            this.render(T.parentNode);
                        } else {
                            this.render(this.cfg.getProperty("container"));
                        }
                    } else {
                        this.render();
                    }
                } else {
                    if (this.parent) {
                        this.render(this.parent.element);
                    } else {
                        this.render(this.cfg.getProperty("container"));
                    }
                }
            }
            var P = this.cfg.getProperty("maxheight"),
            N = this.cfg.getProperty("minscrollheight"),
            U = this.cfg.getProperty("position") == "dynamic";
            if (!this.parent && U) {
                this.cfg.refireEvent("xy");
            }
            function X() {
                this.cfg.setProperty("maxheight", 0);
                this.hideEvent.unsubscribe(X);
            }
            if (! (this instanceof YAHOO.widget.MenuBar) && U) {
                if (P === 0) {
                    S = C.getViewportHeight();
                    if (this.parent && this.parent.parent instanceof YAHOO.widget.MenuBar) {
                        Q = YAHOO.util.Region.getRegion(this.parent.element);
                        S = (S - Q.bottom);
                    }
                    if (this.element.offsetHeight >= S) {
                        P = (S - (B.VIEWPORT_OFFSET * 2));
                        if (P < N) {
                            P = N;
                        }
                        this.cfg.setProperty("maxheight", P);
                        this.hideEvent.subscribe(X);
                    }
                }
            }
        },
        _onShow: function(Q, P) {
            var T = this.parent,
            S, N, O;
            function R(V) {
                var U;
                if (V.type == "mousedown" || (V.type == "keydown" && V.keyCode == 27)) {
                    U = M.getTarget(V);
                    if (U != S.element || !C.isAncestor(S.element, U)) {
                        S.cfg.setProperty("autosubmenudisplay", false);
                        M.removeListener(document, "mousedown", R);
                        M.removeListener(document, "keydown", R);
                    }
                }
            }
            if (T) {
                S = T.parent;
                N = S.cfg.getProperty("submenualignment");
                O = this.cfg.getProperty("submenualignment");
                if ((N[0] != O[0]) && (N[1] != O[1])) {
                    this.cfg.setProperty("submenualignment", [N[0], N[1]]);
                }
                if (!S.cfg.getProperty("autosubmenudisplay") && (S instanceof YAHOO.widget.MenuBar || S.cfg.getProperty("position") == "static")) {
                    S.cfg.setProperty("autosubmenudisplay", true);
                    M.on(document, "mousedown", R);
                    M.on(document, "keydown", R);
                }
            }
        },
        _onBeforeHide: function(P, O) {
            var N = this.activeItem,
            R, Q;
            if (N) {
                R = N.cfg;
                R.setProperty("selected", false);
                Q = R.getProperty("submenu");
                if (Q) {
                    Q.hide();
                }
            }
            if (this.getRoot() == this) {
                this.blur();
            }
        },
        _onParentMenuConfigChange: function(O, N, R) {
            var P = N[0][0],
            Q = N[0][1];
            switch (P) {
            case "iframe":
            case "constraintoviewport":
            case "hidedelay":
            case "showdelay":
            case "submenuhidedelay":
            case "clicktohide":
            case "effect":
            case "classname":
            case "scrollincrement":
            case "minscrollheight":
                R.cfg.setProperty(P, Q);
                break;
            }
        },
        _onParentMenuRender: function(O, N, S) {
            var P = S.parent.parent.cfg,
            Q = {
                constraintoviewport: P.getProperty("constraintoviewport"),
                xy: [0, 0],
                clicktohide: P.getProperty("clicktohide"),
                effect: P.getProperty("effect"),
                showdelay: P.getProperty("showdelay"),
                hidedelay: P.getProperty("hidedelay"),
                submenuhidedelay: P.getProperty("submenuhidedelay"),
                classname: P.getProperty("classname"),
                scrollincrement: P.getProperty("scrollincrement"),
                minscrollheight: P.getProperty("minscrollheight"),
                iframe: P.getProperty("iframe")
            },
            R;
            S.cfg.applyConfig(Q);
            if (!this.lazyLoad) {
                R = this.parent.element;
                if (this.element.parentNode == R) {
                    this.render();
                } else {
                    this.render(R);
                }
            }
        },
        _onSubmenuBeforeShow: function(P, O) {
            var Q = this.parent,
            N = Q.parent.cfg.getProperty("submenualignment");
            if (!this.cfg.getProperty("context")) {
                this.cfg.setProperty("context", [Q.element, N[0], N[1]]);
            } else {
                this.align();
            }
        },
        _onMenuItemFocus: function(O, N) {
            this.parent.focusEvent.fire(this);
        },
        _onMenuItemBlur: function(O, N) {
            this.parent.blurEvent.fire(this);
        },
        _onMenuItemDestroy: function(P, O, N) {
            this._removeItemFromGroupByValue(N.groupIndex, N);
        },
        _onMenuItemConfigChange: function(P, O, N) {
            var R = O[0][0],
            S = O[0][1],
            Q;
            switch (R) {
            case "selected":
                if (S === true) {
                    this.activeItem = N;
                }
                break;
            case "submenu":
                Q = O[0][1];
                if (Q) {
                    this._configureSubmenu(N);
                }
                break;
            }
        },
        enforceConstraints: function(Q, P, W) {
            var j = this.parent,
            f = B.VIEWPORT_OFFSET,
            b = this.element,
            S = this.cfg,
            T = P[0],
            R = b.offsetHeight,
            c = b.offsetWidth,
            i = C.getViewportWidth(),
            a = C.getViewportHeight(),
            Z = (j && j.parent instanceof YAHOO.widget.MenuBar) ? 0 : f,
            d = S.getProperty("context"),
            X = d ? d[0] : null,
            Y,
            h,
            O,
            N,
            g,
            e,
            V,
            U;
            if (c < i) {
                V = T[0];
                g = C.getDocumentScrollLeft();
                h = g + Z;
                N = g + i - c - Z;
                if (V < f) {
                    V = h;
                } else {
                    if ((V + c) > i) {
                        if (X && ((V - X.offsetWidth) > c)) {
                            if (j && j.parent instanceof YAHOO.widget.MenuBar) {
                                V = (V - (c - X.offsetWidth));
                            } else {
                                V = (V - (X.offsetWidth + c));
                            }
                        } else {
                            V = N;
                        }
                    }
                }
            }
            if (R < a) {
                U = T[1];
                e = C.getDocumentScrollTop();
                Y = e + Z;
                O = e + a - R - Z;
                if (U < f) {
                    U = Y;
                } else {
                    if (U > O) {
                        if (X && (U > R)) {
                            U = ((U + X.offsetHeight) - R);
                        } else {
                            U = O;
                        }
                    }
                }
            }
            S.setProperty("x", V, true);
            S.setProperty("y", U, true);
            S.setProperty("xy", [V, U], true);
        },
        configVisible: function(P, O, Q) {
            var N, R;
            if (this.cfg.getProperty("position") == "dynamic") {
                F.superclass.configVisible.call(this, P, O, Q);
            } else {
                N = O[0];
                R = C.getStyle(this.element, "display");
                C.setStyle(this.element, "visibility", "visible");
                if (N) {
                    if (R != "block") {
                        this.beforeShowEvent.fire();
                        C.setStyle(this.element, "display", "block");
                        this.showEvent.fire();
                    }
                } else {
                    if (R == "block") {
                        this.beforeHideEvent.fire();
                        C.setStyle(this.element, "display", "none");
                        this.hideEvent.fire();
                    }
                }
            }
        },
        configPosition: function(P, O, S) {
            var R = this.element,
            Q = O[0] == "static" ? "static": "absolute",
            T = this.cfg,
            N;
            C.setStyle(R, "position", Q);
            if (Q == "static") {
                C.setStyle(R, "display", "block");
                T.setProperty("visible", true);
            } else {
                C.setStyle(R, "visibility", "hidden");
            }
            if (Q == "absolute") {
                N = T.getProperty("zindex");
                if (!N || N === 0) {
                    N = this.parent ? (this.parent.parent.cfg.getProperty("zindex") + 1) : 1;
                    T.setProperty("zindex", N);
                }
            }
        },
        configIframe: function(O, N, P) {
            if (this.cfg.getProperty("position") == "dynamic") {
                F.superclass.configIframe.call(this, O, N, P);
            }
        },
        configHideDelay: function(O, N, R) {
            var T = N[0],
            S = this.mouseOutEvent,
            P = this.mouseOverEvent,
            Q = this.keyDownEvent;
            if (T > 0) {
                if (!this._bHideDelayEventHandlersAssigned) {
                    S.subscribe(this._execHideDelay);
                    P.subscribe(this._cancelHideDelay);
                    Q.subscribe(this._cancelHideDelay);
                    this._bHideDelayEventHandlersAssigned = true;
                }
            } else {
                S.unsubscribe(this._execHideDelay);
                P.unsubscribe(this._cancelHideDelay);
                Q.unsubscribe(this._cancelHideDelay);
                this._bHideDelayEventHandlersAssigned = false;
            }
        },
        configContainer: function(O, N, Q) {
            var P = N[0];
            if (typeof P == "string") {
                this.cfg.setProperty("container", document.getElementById(P), true);
            }
        },
        _setMaxHeight: function(O, N, P) {
            this.cfg.setProperty("maxheight", P);
            this.renderEvent.unsubscribe(this._setMaxHeight);
        },
        configMaxHeight: function(a, U, X) {
            var T = U[0],
            Q = this.element,
            R = this.body,
            Y = this.header,
            O = this.footer,
            W = this._onScrollTargetMouseOver,
            b = this._onScrollTargetMouseOut,
            N = this.cfg.getProperty("minscrollheight"),
            V,
            S,
            P;
            if (T !== 0 && T < N) {
                T = N;
            }
            if (this.lazyLoad && !R) {
                this.renderEvent.unsubscribe(this._setMaxHeight);
                if (T > 0) {
                    this.renderEvent.subscribe(this._setMaxHeight, T, this);
                }
                return;
            }
            C.setStyle(R, "height", "");
            C.removeClass(R, "yui-menu-body-scrolled");
            var Z = ((H.gecko && this.parent && this.parent.parent && this.parent.parent.cfg.getProperty("position") == "dynamic") || H.ie);
            if (Z) {
                if (!this.cfg.getProperty("width")) {
                    S = Q.offsetWidth;
                    Q.style.width = S + "px";
                    P = (S - (Q.offsetWidth - S)) + "px";
                    this.cfg.setProperty("width", P);
                }
            }
            if (!Y && !O) {
                this.setHeader("&#32;");
                this.setFooter("&#32;");
                Y = this.header;
                O = this.footer;
                C.addClass(Y, "topscrollbar");
                C.addClass(O, "bottomscrollbar");
                Q.insertBefore(Y, R);
                Q.appendChild(O);
            }
            V = (T - (Y.offsetHeight + Y.offsetHeight));
            if (V > 0 && (R.offsetHeight > T)) {
                C.addClass(R, "yui-menu-body-scrolled");
                C.setStyle(R, "height", (V + "px"));
                M.on(Y, "mouseover", W, this, true);
                M.on(Y, "mouseout", b, this, true);
                M.on(O, "mouseover", W, this, true);
                M.on(O, "mouseout", b, this, true);
                this._disableScrollHeader();
                this._enableScrollFooter();
            } else {
                if (Y && O) {
                    if (Z) {
                        this.cfg.setProperty("width", "");
                    }
                    this._enableScrollHeader();
                    this._enableScrollFooter();
                    M.removeListener(Y, "mouseover", W);
                    M.removeListener(Y, "mouseout", b);
                    M.removeListener(O, "mouseover", W);
                    M.removeListener(O, "mouseout", b);
                    Q.removeChild(Y);
                    Q.removeChild(O);
                    this.header = null;
                    this.footer = null;
                }
            }
            this.cfg.refireEvent("iframe");
        },
        configClassName: function(P, O, Q) {
            var N = O[0];
            if (this._sClassName) {
                C.removeClass(this.element, this._sClassName);
            }
            C.addClass(this.element, N);
            this._sClassName = N;
        },
        _onItemAdded: function(O, N) {
            var P = N[0];
            if (P) {
                P.cfg.setProperty("disabled", true);
            }
        },
        configDisabled: function(P, O, S) {
            var R = O[0],
            N = this.getItems(),
            T,
            Q;
            if (E.isArray(N)) {
                T = N.length;
                if (T > 0) {
                    Q = T - 1;
                    do {
                        N[Q].cfg.setProperty("disabled", R);
                    } while ( Q --);
                }
                if (R) {
                    this.clearActiveItem(true);
                    C.addClass(this.element, "disabled");
                    this.itemAddedEvent.subscribe(this._onItemAdded);
                } else {
                    C.removeClass(this.element, "disabled");
                    this.itemAddedEvent.unsubscribe(this._onItemAdded);
                }
            }
        },
        onRender: function(R, Q) {
            function S() {
                var W = this.element,
                V = this._shadow;
                if (V && W) {
                    V.style.width = (W.offsetWidth + 6) + "px";
                    V.style.height = (W.offsetHeight + 1) + "px";
                }
            }
            function U() {
                this.element.appendChild(this._shadow);
            }
            function O() {
                C.addClass(this._shadow, "yui-menu-shadow-visible");
            }
            function N() {
                C.removeClass(this._shadow, "yui-menu-shadow-visible");
            }
            function T() {
                var W = this._shadow,
                V, X;
                if (!W) {
                    V = this.element;
                    X = this;
                    if (!G) {
                        G = document.createElement("div");
                        G.className = "yui-menu-shadow yui-menu-shadow-visible";
                    }
                    W = G.cloneNode(false);
                    V.appendChild(W);
                    this._shadow = W;
                    this.beforeShowEvent.subscribe(O);
                    this.beforeHideEvent.subscribe(N);
                    if (H.ie) {
                        window.setTimeout(function() {
                            S.call(X);
                            X.syncIframe();
                        },
                        0);
                        this.cfg.subscribeToConfigEvent("width", S);
                        this.cfg.subscribeToConfigEvent("height", S);
                        this.cfg.subscribeToConfigEvent("maxheight", S);
                        this.changeContentEvent.subscribe(S);
                        D.textResizeEvent.subscribe(S, X, true);
                        this.destroyEvent.subscribe(function() {
                            D.textResizeEvent.unsubscribe(S, X);
                        });
                    }
                    this.cfg.subscribeToConfigEvent("maxheight", U);
                }
            }
            function P() {
                T.call(this);
                this.beforeShowEvent.unsubscribe(P);
            }
            if (this.cfg.getProperty("position") == "dynamic") {
                if (this.cfg.getProperty("visible")) {
                    T.call(this);
                } else {
                    this.beforeShowEvent.subscribe(P);
                }
            }
        },
        initEvents: function() {
            F.superclass.initEvents.call(this);
            var N = L.LIST;
            this.mouseOverEvent = this.createEvent(A.MOUSE_OVER);
            this.mouseOverEvent.signature = N;
            this.mouseOutEvent = this.createEvent(A.MOUSE_OUT);
            this.mouseOutEvent.signature = N;
            this.mouseDownEvent = this.createEvent(A.MOUSE_DOWN);
            this.mouseDownEvent.signature = N;
            this.mouseUpEvent = this.createEvent(A.MOUSE_UP);
            this.mouseUpEvent.signature = N;
            this.clickEvent = this.createEvent(A.CLICK);
            this.clickEvent.signature = N;
            this.keyPressEvent = this.createEvent(A.KEY_PRESS);
            this.keyPressEvent.signature = N;
            this.keyDownEvent = this.createEvent(A.KEY_DOWN);
            this.keyDownEvent.signature = N;
            this.keyUpEvent = this.createEvent(A.KEY_UP);
            this.keyUpEvent.signature = N;
            this.focusEvent = this.createEvent(A.FOCUS);
            this.focusEvent.signature = N;
            this.blurEvent = this.createEvent(A.BLUR);
            this.blurEvent.signature = N;
            this.itemAddedEvent = this.createEvent(A.ITEM_ADDED);
            this.itemAddedEvent.signature = N;
            this.itemRemovedEvent = this.createEvent(A.ITEM_REMOVED);
            this.itemRemovedEvent.signature = N;
        },
        positionOffScreen: function() {
            var O = this.iframe,
            N = this.OFF_SCREEN_POSITION;
            C.setXY(this.element, N);
            if (O) {
                C.setXY(O, N);
            }
        },
        getRoot: function() {
            var O = this.parent,
            N;
            if (O) {
                N = O.parent;
                return N ? N.getRoot() : this;
            } else {
                return this;
            }
        },
        toString: function() {
            var O = "Menu",
            N = this.id;
            if (N) {
                O += (" " + N);
            }
            return O;
        },
        setItemGroupTitle: function(S, R) {
            var Q, P, O, N;
            if (typeof S == "string" && S.length > 0) {
                Q = typeof R == "number" ? R: 0;
                P = this._aGroupTitleElements[Q];
                if (P) {
                    P.innerHTML = S;
                } else {
                    P = document.createElement(this.GROUP_TITLE_TAG_NAME);
                    P.innerHTML = S;
                    this._aGroupTitleElements[Q] = P;
                }
                O = this._aGroupTitleElements.length - 1;
                do {
                    if (this._aGroupTitleElements[O]) {
                        C.removeClass(this._aGroupTitleElements[O], "first-of-type");
                        N = O;
                    }
                } while ( O --);
                if (N !== null) {
                    C.addClass(this._aGroupTitleElements[N], "first-of-type");
                }
                this.changeContentEvent.fire();
            }
        },
        addItem: function(N, O) {
            if (N) {
                return this._addItemToGroup(O, N);
            }
        },
        addItems: function(Q, P) {
            var S, N, R, O;
            if (E.isArray(Q)) {
                S = Q.length;
                N = [];
                for (O = 0; O < S; O++) {
                    R = Q[O];
                    if (R) {
                        if (E.isArray(R)) {
                            N[N.length] = this.addItems(R, O);
                        } else {
                            N[N.length] = this._addItemToGroup(P, R);
                        }
                    }
                }
                if (N.length) {
                    return N;
                }
            }
        },
        insertItem: function(N, O, P) {
            if (N) {
                return this._addItemToGroup(P, N, O);
            }
        },
        removeItem: function(N, O) {
            var P;
            if (typeof N != "undefined") {
                if (N instanceof YAHOO.widget.MenuItem) {
                    P = this._removeItemFromGroupByValue(O, N);
                } else {
                    if (typeof N == "number") {
                        P = this._removeItemFromGroupByIndex(O, N);
                    }
                }
                if (P) {
                    P.destroy();
                    return P;
                }
            }
        },
        getItems: function() {
            var P = this._aItemGroups,
            O, N = [];
            if (E.isArray(P)) {
                O = P.length;
                return ((O == 1) ? P[0] : (Array.prototype.concat.apply(N, P)));
            }
        },
        getItemGroups: function() {
            return this._aItemGroups;
        },
        getItem: function(N, O) {
            var P;
            if (typeof N == "number") {
                P = this._getItemGroup(O);
                if (P) {
                    return P[N];
                }
            }
        },
        getSubmenus: function() {
            var O = this.getItems(),
            S = O.length,
            N,
            P,
            R,
            Q;
            if (S > 0) {
                N = [];
                for (Q = 0; Q < S; Q++) {
                    R = O[Q];
                    if (R) {
                        P = R.cfg.getProperty("submenu");
                        if (P) {
                            N[N.length] = P;
                        }
                    }
                }
            }
            return N;
        },
        clearContent: function() {
            var R = this.getItems(),
            O = R.length,
            P = this.element,
            Q = this.body,
            V = this.header,
            N = this.footer,
            U,
            T,
            S;
            if (O > 0) {
                S = O - 1;
                do {
                    U = R[S];
                    if (U) {
                        T = U.cfg.getProperty("submenu");
                        if (T) {
                            this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange, T);
                            this.renderEvent.unsubscribe(this._onParentMenuRender, T);
                        }
                        this.removeItem(U);
                    }
                } while ( S --);
            }
            if (V) {
                M.purgeElement(V);
                P.removeChild(V);
            }
            if (N) {
                M.purgeElement(N);
                P.removeChild(N);
            }
            if (Q) {
                M.purgeElement(Q);
                Q.innerHTML = "";
            }
            this.activeItem = null;
            this._aItemGroups = [];
            this._aListElements = [];
            this._aGroupTitleElements = [];
            this.cfg.setProperty("width", null);
        },
        destroy: function() {
            this.clearContent();
            this._aItemGroups = null;
            this._aListElements = null;
            this._aGroupTitleElements = null;
            F.superclass.destroy.call(this);
        },
        setInitialFocus: function() {
            var N = this._getFirstEnabledItem();
            if (N) {
                N.focus();
            }
        },
        setInitialSelection: function() {
            var N = this._getFirstEnabledItem();
            if (N) {
                N.cfg.setProperty("selected", true);
            }
        },
        clearActiveItem: function(P) {
            if (this.cfg.getProperty("showdelay") > 0) {
                this._cancelShowDelay();
            }
            var N = this.activeItem,
            Q, O;
            if (N) {
                Q = N.cfg;
                if (P) {
                    N.blur();
                }
                Q.setProperty("selected", false);
                O = Q.getProperty("submenu");
                if (O) {
                    O.hide();
                }
                this.activeItem = null;
            }
        },
        focus: function() {
            if (!this.hasFocus()) {
                this.setInitialFocus();
            }
        },
        blur: function() {
            var N;
            if (this.hasFocus()) {
                N = K.getFocusedMenuItem();
                if (N) {
                    N.blur();
                }
            }
        },
        hasFocus: function() {
            return (K.getFocusedMenu() == this.getRoot());
        },
        subscribe: function() {
            function Q(V, U, X) {
                var Y = U[0],
                W = Y.cfg.getProperty("submenu");
                if (W) {
                    W.subscribe.apply(W, X);
                }
            }
            function T(V, U, X) {
                var W = this.cfg.getProperty("submenu");
                if (W) {
                    W.subscribe.apply(W, X);
                }
            }
            F.superclass.subscribe.apply(this, arguments);
            F.superclass.subscribe.call(this, "itemAdded", Q, arguments);
            var N = this.getItems(),
            S,
            R,
            O,
            P;
            if (N) {
                S = N.length;
                if (S > 0) {
                    P = S - 1;
                    do {
                        R = N[P];
                        O = R.cfg.getProperty("submenu");
                        if (O) {
                            O.subscribe.apply(O, arguments);
                        } else {
                            R.cfg.subscribeToConfigEvent("submenu", T, arguments);
                        }
                    } while ( P --);
                }
            }
        },
        initDefaultConfig: function() {
            F.superclass.initDefaultConfig.call(this);
            var N = this.cfg;
            N.addProperty(J.VISIBLE.key, {
                handler: this.configVisible,
                value: J.VISIBLE.value,
                validator: J.VISIBLE.validator
            });
            N.addProperty(J.CONSTRAIN_TO_VIEWPORT.key, {
                handler: this.configConstrainToViewport,
                value: J.CONSTRAIN_TO_VIEWPORT.value,
                validator: J.CONSTRAIN_TO_VIEWPORT.validator,
                supercedes: J.CONSTRAIN_TO_VIEWPORT.supercedes
            });
            N.addProperty(J.POSITION.key, {
                handler: this.configPosition,
                value: J.POSITION.value,
                validator: J.POSITION.validator,
                supercedes: J.POSITION.supercedes
            });
            N.addProperty(J.SUBMENU_ALIGNMENT.key, {
                value: J.SUBMENU_ALIGNMENT.value,
                suppressEvent: J.SUBMENU_ALIGNMENT.suppressEvent
            });
            N.addProperty(J.AUTO_SUBMENU_DISPLAY.key, {
                value: J.AUTO_SUBMENU_DISPLAY.value,
                validator: J.AUTO_SUBMENU_DISPLAY.validator,
                suppressEvent: J.AUTO_SUBMENU_DISPLAY.suppressEvent
            });
            N.addProperty(J.SHOW_DELAY.key, {
                value: J.SHOW_DELAY.value,
                validator: J.SHOW_DELAY.validator,
                suppressEvent: J.SHOW_DELAY.suppressEvent
            });
            N.addProperty(J.HIDE_DELAY.key, {
                handler: this.configHideDelay,
                value: J.HIDE_DELAY.value,
                validator: J.HIDE_DELAY.validator,
                suppressEvent: J.HIDE_DELAY.suppressEvent
            });
            N.addProperty(J.SUBMENU_HIDE_DELAY.key, {
                value: J.SUBMENU_HIDE_DELAY.value,
                validator: J.SUBMENU_HIDE_DELAY.validator,
                suppressEvent: J.SUBMENU_HIDE_DELAY.suppressEvent
            });
            N.addProperty(J.CLICK_TO_HIDE.key, {
                value: J.CLICK_TO_HIDE.value,
                validator: J.CLICK_TO_HIDE.validator,
                suppressEvent: J.CLICK_TO_HIDE.suppressEvent
            });
            N.addProperty(J.CONTAINER.key, {
                handler: this.configContainer,
                value: document.body,
                suppressEvent: J.CONTAINER.suppressEvent
            });
            N.addProperty(J.SCROLL_INCREMENT.key, {
                value: J.SCROLL_INCREMENT.value,
                validator: J.SCROLL_INCREMENT.validator,
                supercedes: J.SCROLL_INCREMENT.supercedes,
                suppressEvent: J.SCROLL_INCREMENT.suppressEvent
            });
            N.addProperty(J.MIN_SCROLL_HEIGHT.key, {
                value: J.MIN_SCROLL_HEIGHT.value,
                validator: J.MIN_SCROLL_HEIGHT.validator,
                supercedes: J.MIN_SCROLL_HEIGHT.supercedes,
                suppressEvent: J.MIN_SCROLL_HEIGHT.suppressEvent
            });
            N.addProperty(J.MAX_HEIGHT.key, {
                handler: this.configMaxHeight,
                value: J.MAX_HEIGHT.value,
                validator: J.MAX_HEIGHT.validator,
                suppressEvent: J.MAX_HEIGHT.suppressEvent,
                supercedes: J.MAX_HEIGHT.supercedes
            });
            N.addProperty(J.CLASS_NAME.key, {
                handler: this.configClassName,
                value: J.CLASS_NAME.value,
                validator: J.CLASS_NAME.validator,
                supercedes: J.CLASS_NAME.supercedes
            });
            N.addProperty(J.DISABLED.key, {
                handler: this.configDisabled,
                value: J.DISABLED.value,
                validator: J.DISABLED.validator,
                suppressEvent: J.DISABLED.suppressEvent
            });
        }
    });
})(); (function() {
    YAHOO.widget.MenuItem = function(K, J) {
        if (K) {
            if (J) {
                this.parent = J.parent;
                this.value = J.value;
                this.id = J.id;
            }
            this.init(K, J);
        }
    };
    var B = YAHOO.util.Dom,
    C = YAHOO.widget.Module,
    E = YAHOO.widget.Menu,
    H = YAHOO.widget.MenuItem,
    I = YAHOO.util.CustomEvent,
    F = YAHOO.lang,
    D, A = {
        "MOUSE_OVER": "mouseover",
        "MOUSE_OUT": "mouseout",
        "MOUSE_DOWN": "mousedown",
        "MOUSE_UP": "mouseup",
        "CLICK": "click",
        "KEY_PRESS": "keypress",
        "KEY_DOWN": "keydown",
        "KEY_UP": "keyup",
        "ITEM_ADDED": "itemAdded",
        "ITEM_REMOVED": "itemRemoved",
        "FOCUS": "focus",
        "BLUR": "blur",
        "DESTROY": "destroy"
    },
    G = {
        "TEXT": {
            key: "text",
            value: "",
            validator: F.isString,
            suppressEvent: true
        },
        "HELP_TEXT": {
            key: "helptext",
            supercedes: ["text"],
            suppressEvent: true
        },
        "URL": {
            key: "url",
            value: "#",
            suppressEvent: true
        },
        "TARGET": {
            key: "target",
            suppressEvent: true
        },
        "EMPHASIS": {
            key: "emphasis",
            value: false,
            validator: F.isBoolean,
            suppressEvent: true,
            supercedes: ["text"]
        },
        "STRONG_EMPHASIS": {
            key: "strongemphasis",
            value: false,
            validator: F.isBoolean,
            suppressEvent: true,
            supercedes: ["text"]
        },
        "CHECKED": {
            key: "checked",
            value: false,
            validator: F.isBoolean,
            suppressEvent: true,
            supercedes: ["disabled", "selected"]
        },
        "SUBMENU": {
            key: "submenu",
            suppressEvent: true,
            supercedes: ["disabled", "selected"]
        },
        "DISABLED": {
            key: "disabled",
            value: false,
            validator: F.isBoolean,
            suppressEvent: true,
            supercedes: ["text", "selected"]
        },
        "SELECTED": {
            key: "selected",
            value: false,
            validator: F.isBoolean,
            suppressEvent: true
        },
        "ONCLICK": {
            key: "onclick",
            suppressEvent: true
        },
        "CLASS_NAME": {
            key: "classname",
            value: null,
            validator: F.isString,
            suppressEvent: true
        }
    };
    H.prototype = {
        CSS_CLASS_NAME: "yuimenuitem",
        CSS_LABEL_CLASS_NAME: "yuimenuitemlabel",
        SUBMENU_TYPE: null,
        _oAnchor: null,
        _oHelpTextEM: null,
        _oSubmenu: null,
        _oOnclickAttributeValue: null,
        _sClassName: null,
        constructor: H,
        index: null,
        groupIndex: null,
        parent: null,
        element: null,
        srcElement: null,
        value: null,
        browser: C.prototype.browser,
        id: null,
        destroyEvent: null,
        mouseOverEvent: null,
        mouseOutEvent: null,
        mouseDownEvent: null,
        mouseUpEvent: null,
        clickEvent: null,
        keyPressEvent: null,
        keyDownEvent: null,
        keyUpEvent: null,
        focusEvent: null,
        blurEvent: null,
        init: function(J, R) {
            if (!this.SUBMENU_TYPE) {
                this.SUBMENU_TYPE = E;
            }
            this.cfg = new YAHOO.util.Config(this);
            this.initDefaultConfig();
            var O = I.LIST,
            N = this.cfg,
            P = "#",
            Q, K, M, L;
            if (F.isString(J)) {
                this._createRootNodeStructure();
                N.queueProperty("text", J);
            } else {
                if (J && J.tagName) {
                    switch (J.tagName.toUpperCase()) {
                    case "OPTION":
                        this._createRootNodeStructure();
                        N.queueProperty("text", J.text);
                        N.queueProperty("disabled", J.disabled);
                        this.value = J.value;
                        this.srcElement = J;
                        break;
                    case "OPTGROUP":
                        this._createRootNodeStructure();
                        N.queueProperty("text", J.label);
                        N.queueProperty("disabled", J.disabled);
                        this.srcElement = J;
                        this._initSubTree();
                        break;
                    case "LI":
                        Q = B.getFirstChild(J);
                        if (Q) {
                            P = Q.getAttribute("href");
                            K = Q.getAttribute("target");
                            M = Q.innerHTML;
                        }
                        this.srcElement = J;
                        this.element = J;
                        this._oAnchor = Q;
                        N.setProperty("text", M, true);
                        N.setProperty("url", P, true);
                        N.setProperty("target", K, true);
                        this._initSubTree();
                        break;
                    }
                }
            }
            if (this.element) {
                L = (this.srcElement || this.element).id;
                if (!L) {
                    L = this.id || B.generateId();
                    this.element.id = L;
                }
                this.id = L;
                B.addClass(this.element, this.CSS_CLASS_NAME);
                B.addClass(this._oAnchor, this.CSS_LABEL_CLASS_NAME);
                this.mouseOverEvent = this.createEvent(A.MOUSE_OVER);
                this.mouseOverEvent.signature = O;
                this.mouseOutEvent = this.createEvent(A.MOUSE_OUT);
                this.mouseOutEvent.signature = O;
                this.mouseDownEvent = this.createEvent(A.MOUSE_DOWN);
                this.mouseDownEvent.signature = O;
                this.mouseUpEvent = this.createEvent(A.MOUSE_UP);
                this.mouseUpEvent.signature = O;
                this.clickEvent = this.createEvent(A.CLICK);
                this.clickEvent.signature = O;
                this.keyPressEvent = this.createEvent(A.KEY_PRESS);
                this.keyPressEvent.signature = O;
                this.keyDownEvent = this.createEvent(A.KEY_DOWN);
                this.keyDownEvent.signature = O;
                this.keyUpEvent = this.createEvent(A.KEY_UP);
                this.keyUpEvent.signature = O;
                this.focusEvent = this.createEvent(A.FOCUS);
                this.focusEvent.signature = O;
                this.blurEvent = this.createEvent(A.BLUR);
                this.blurEvent.signature = O;
                this.destroyEvent = this.createEvent(A.DESTROY);
                this.destroyEvent.signature = O;
                if (R) {
                    N.applyConfig(R);
                }
                N.fireQueue();
            }
        },
        _createRootNodeStructure: function() {
            var J, K;
            if (!D) {
                D = document.createElement("li");
                D.innerHTML = "<a href=\"#\"></a>";
            }
            J = D.cloneNode(true);
            J.className = this.CSS_CLASS_NAME;
            K = J.firstChild;
            K.className = this.CSS_LABEL_CLASS_NAME;
            this.element = J;
            this._oAnchor = K;
        },
        _initSubTree: function() {
            var P = this.srcElement,
            L = this.cfg,
            N, M, K, J, O;
            if (P.childNodes.length > 0) {
                if (this.parent.lazyLoad && this.parent.srcElement && this.parent.srcElement.tagName.toUpperCase() == "SELECT") {
                    L.setProperty("submenu", {
                        id: B.generateId(),
                        itemdata: P.childNodes
                    });
                } else {
                    N = P.firstChild;
                    M = [];
                    do {
                        if (N && N.tagName) {
                            switch (N.tagName.toUpperCase()) {
                            case "DIV":
                                L.setProperty("submenu", N);
                                break;
                            case "OPTION":
                                M[M.length] = N;
                                break;
                            }
                        }
                    } while (( N = N . nextSibling ));
                    K = M.length;
                    if (K > 0) {
                        J = new this.SUBMENU_TYPE(B.generateId());
                        L.setProperty("submenu", J);
                        for (O = 0; O < K; O++) {
                            J.addItem((new J.ITEM_TYPE(M[O])));
                        }
                    }
                }
            }
        },
        configText: function(S, L, N) {
            var K = L[0],
            M = this.cfg,
            Q = this._oAnchor,
            J = M.getProperty("helptext"),
            R = "",
            O = "",
            P = "";
            if (K) {
                if (J) {
                    R = "<em class=\"helptext\">" + J + "</em>";
                }
                if (M.getProperty("emphasis")) {
                    O = "<em>";
                    P = "</em>";
                }
                if (M.getProperty("strongemphasis")) {
                    O = "<strong>";
                    P = "</strong>";
                }
                Q.innerHTML = (O + K + P + R);
            }
        },
        configHelpText: function(L, K, J) {
            this.cfg.refireEvent("text");
        },
        configURL: function(L, K, J) {
            var N = K[0];
            if (!N) {
                N = "#";
            }
            var M = this._oAnchor;
            if (YAHOO.env.ua.opera) {
                M.removeAttribute("href");
            }
            M.setAttribute("href", N);
        },
        configTarget: function(M, L, K) {
            var J = L[0],
            N = this._oAnchor;
            if (J && J.length > 0) {
                N.setAttribute("target", J);
            } else {
                N.removeAttribute("target");
            }
        },
        configEmphasis: function(L, K, J) {
            var N = K[0],
            M = this.cfg;
            if (N && M.getProperty("strongemphasis")) {
                M.setProperty("strongemphasis", false);
            }
            M.refireEvent("text");
        },
        configStrongEmphasis: function(M, L, K) {
            var J = L[0],
            N = this.cfg;
            if (J && N.getProperty("emphasis")) {
                N.setProperty("emphasis", false);
            }
            N.refireEvent("text");
        },
        configChecked: function(S, M, O) {
            var R = M[0],
            K = this.element,
            Q = this._oAnchor,
            N = this.cfg,
            J = "-checked",
            L = this.CSS_CLASS_NAME + J,
            P = this.CSS_LABEL_CLASS_NAME + J;
            if (R) {
                B.addClass(K, L);
                B.addClass(Q, P);
            } else {
                B.removeClass(K, L);
                B.removeClass(Q, P);
            }
            N.refireEvent("text");
            if (N.getProperty("disabled")) {
                N.refireEvent("disabled");
            }
            if (N.getProperty("selected")) {
                N.refireEvent("selected");
            }
        },
        configDisabled: function(X, R, a) {
            var Z = R[0],
            L = this.cfg,
            P = L.getProperty("submenu"),
            O = L.getProperty("checked"),
            S = this.element,
            V = this._oAnchor,
            U = "-disabled",
            W = "-checked" + U,
            Y = "-hassubmenu" + U,
            M = this.CSS_CLASS_NAME + U,
            N = this.CSS_LABEL_CLASS_NAME + U,
            T = this.CSS_CLASS_NAME + W,
            Q = this.CSS_LABEL_CLASS_NAME + W,
            K = this.CSS_CLASS_NAME + Y,
            J = this.CSS_LABEL_CLASS_NAME + Y;
            if (Z) {
                if (L.getProperty("selected")) {
                    L.setProperty("selected", false);
                }
                B.addClass(S, M);
                B.addClass(V, N);
                if (P) {
                    B.addClass(S, K);
                    B.addClass(V, J);
                }
                if (O) {
                    B.addClass(S, T);
                    B.addClass(V, Q);
                }
            } else {
                B.removeClass(S, M);
                B.removeClass(V, N);
                if (P) {
                    B.removeClass(S, K);
                    B.removeClass(V, J);
                }
                if (O) {
                    B.removeClass(S, T);
                    B.removeClass(V, Q);
                }
            }
        },
        configSelected: function(X, R, a) {
            var L = this.cfg,
            Y = R[0],
            S = this.element,
            V = this._oAnchor,
            O = L.getProperty("checked"),
            P = L.getProperty("submenu"),
            U = "-selected",
            W = "-checked" + U,
            Z = "-hassubmenu" + U,
            M = this.CSS_CLASS_NAME + U,
            N = this.CSS_LABEL_CLASS_NAME + U,
            T = this.CSS_CLASS_NAME + W,
            Q = this.CSS_LABEL_CLASS_NAME + W,
            K = this.CSS_CLASS_NAME + Z,
            J = this.CSS_LABEL_CLASS_NAME + Z;
            if (YAHOO.env.ua.opera) {
                V.blur();
            }
            if (Y && !L.getProperty("disabled")) {
                B.addClass(S, M);
                B.addClass(V, N);
                if (P) {
                    B.addClass(S, K);
                    B.addClass(V, J);
                }
                if (O) {
                    B.addClass(S, T);
                    B.addClass(V, Q);
                }
            } else {
                B.removeClass(S, M);
                B.removeClass(V, N);
                if (P) {
                    B.removeClass(S, K);
                    B.removeClass(V, J);
                }
                if (O) {
                    B.removeClass(S, T);
                    B.removeClass(V, Q);
                }
            }
            if (this.hasFocus() && YAHOO.env.ua.opera) {
                V.focus();
            }
        },
        _onSubmenuBeforeHide: function(M, L) {
            var N = this.parent,
            J;
            function K() {
                N._oAnchor.blur();
                J.beforeHideEvent.unsubscribe(K);
            }
            if (N.hasFocus()) {
                J = N.parent;
                J.beforeHideEvent.subscribe(K);
            }
        },
        configSubmenu: function(V, O, R) {
            var Q = O[0],
            P = this.cfg,
            K = this.element,
            T = this._oAnchor,
            N = this.parent && this.parent.lazyLoad,
            J = "-hassubmenu",
            L = this.CSS_CLASS_NAME + J,
            S = this.CSS_LABEL_CLASS_NAME + J,
            U,
            W,
            M;
            if (Q) {
                if (Q instanceof E) {
                    U = Q;
                    U.parent = this;
                    U.lazyLoad = N;
                } else {
                    if (typeof Q == "object" && Q.id && !Q.nodeType) {
                        W = Q.id;
                        M = Q;
                        M.lazyload = N;
                        M.parent = this;
                        U = new this.SUBMENU_TYPE(W, M);
                        P.setProperty("submenu", U, true);
                    } else {
                        U = new this.SUBMENU_TYPE(Q, {
                            lazyload: N,
                            parent: this
                        });
                        P.setProperty("submenu", U, true);
                    }
                }
                if (U) {
                    B.addClass(K, L);
                    B.addClass(T, S);
                    this._oSubmenu = U;
                    if (YAHOO.env.ua.opera) {
                        U.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);
                    }
                }
            } else {
                B.removeClass(K, L);
                B.removeClass(T, S);
                if (this._oSubmenu) {
                    this._oSubmenu.destroy();
                }
            }
            if (P.getProperty("disabled")) {
                P.refireEvent("disabled");
            }
            if (P.getProperty("selected")) {
                P.refireEvent("selected");
            }
        },
        configOnClick: function(L, K, J) {
            var M = K[0];
            if (this._oOnclickAttributeValue && (this._oOnclickAttributeValue != M)) {
                this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn, this._oOnclickAttributeValue.obj);
                this._oOnclickAttributeValue = null;
            }
            if (!this._oOnclickAttributeValue && typeof M == "object" && typeof M.fn == "function") {
                this.clickEvent.subscribe(M.fn, ((!YAHOO.lang.isUndefined(M.obj)) ? M.obj: this), M.scope);
                this._oOnclickAttributeValue = M;
            }
        },
        configClassName: function(M, L, K) {
            var J = L[0];
            if (this._sClassName) {
                B.removeClass(this.element, this._sClassName);
            }
            B.addClass(this.element, J);
            this._sClassName = J;
        },
        initDefaultConfig: function() {
            var J = this.cfg;
            J.addProperty(G.TEXT.key, {
                handler: this.configText,
                value: G.TEXT.value,
                validator: G.TEXT.validator,
                suppressEvent: G.TEXT.suppressEvent
            });
            J.addProperty(G.HELP_TEXT.key, {
                handler: this.configHelpText,
                supercedes: G.HELP_TEXT.supercedes,
                suppressEvent: G.HELP_TEXT.suppressEvent
            });
            J.addProperty(G.URL.key, {
                handler: this.configURL,
                value: G.URL.value,
                suppressEvent: G.URL.suppressEvent
            });
            J.addProperty(G.TARGET.key, {
                handler: this.configTarget,
                suppressEvent: G.TARGET.suppressEvent
            });
            J.addProperty(G.EMPHASIS.key, {
                handler: this.configEmphasis,
                value: G.EMPHASIS.value,
                validator: G.EMPHASIS.validator,
                suppressEvent: G.EMPHASIS.suppressEvent,
                supercedes: G.EMPHASIS.supercedes
            });
            J.addProperty(G.STRONG_EMPHASIS.key, {
                handler: this.configStrongEmphasis,
                value: G.STRONG_EMPHASIS.value,
                validator: G.STRONG_EMPHASIS.validator,
                suppressEvent: G.STRONG_EMPHASIS.suppressEvent,
                supercedes: G.STRONG_EMPHASIS.supercedes
            });
            J.addProperty(G.CHECKED.key, {
                handler: this.configChecked,
                value: G.CHECKED.value,
                validator: G.CHECKED.validator,
                suppressEvent: G.CHECKED.suppressEvent,
                supercedes: G.CHECKED.supercedes
            });
            J.addProperty(G.DISABLED.key, {
                handler: this.configDisabled,
                value: G.DISABLED.value,
                validator: G.DISABLED.validator,
                suppressEvent: G.DISABLED.suppressEvent
            });
            J.addProperty(G.SELECTED.key, {
                handler: this.configSelected,
                value: G.SELECTED.value,
                validator: G.SELECTED.validator,
                suppressEvent: G.SELECTED.suppressEvent
            });
            J.addProperty(G.SUBMENU.key, {
                handler: this.configSubmenu,
                supercedes: G.SUBMENU.supercedes,
                suppressEvent: G.SUBMENU.suppressEvent
            });
            J.addProperty(G.ONCLICK.key, {
                handler: this.configOnClick,
                suppressEvent: G.ONCLICK.suppressEvent
            });
            J.addProperty(G.CLASS_NAME.key, {
                handler: this.configClassName,
                value: G.CLASS_NAME.value,
                validator: G.CLASS_NAME.validator,
                suppressEvent: G.CLASS_NAME.suppressEvent
            });
        },
        getNextEnabledSibling: function() {
            var L, O, J, N, M;
            function K(P, Q) {
                return P[Q] || K(P, (Q + 1));
            }
            if (this.parent instanceof E) {
                L = this.groupIndex;
                O = this.parent.getItemGroups();
                if (this.index < (O[L].length - 1)) {
                    J = K(O[L], (this.index + 1));
                } else {
                    if (L < (O.length - 1)) {
                        N = L + 1;
                    } else {
                        N = 0;
                    }
                    M = K(O, N);
                    J = K(M, 0);
                }
                return (J.cfg.getProperty("disabled") || J.element.style.display == "none") ? J.getNextEnabledSibling() : J;
            }
        },
        getPreviousEnabledSibling: function() {
            var N, P, K, J, M;
            function O(Q, R) {
                return Q[R] || O(Q, (R - 1));
            }
            function L(Q, R) {
                return Q[R] ? R: L(Q, (R + 1));
            }
            if (this.parent instanceof E) {
                N = this.groupIndex;
                P = this.parent.getItemGroups();
                if (this.index > L(P[N], 0)) {
                    K = O(P[N], (this.index - 1));
                } else {
                    if (N > L(P, 0)) {
                        J = N - 1;
                    } else {
                        J = P.length - 1;
                    }
                    M = O(P, J);
                    K = O(M, (M.length - 1));
                }
                return (K.cfg.getProperty("disabled") || K.element.style.display == "none") ? K.getPreviousEnabledSibling() : K;
            }
        },
        focus: function() {
            var N = this.parent,
            M = this._oAnchor,
            J = N.activeItem,
            L = this;
            function K() {
                try {
                    if (YAHOO.env.ua.ie && !document.hasFocus()) {
                        return;
                    }
                    if (J) {
                        J.blurEvent.fire();
                    }
                    M.focus();
                    L.focusEvent.fire();
                } catch(O) {}
            }
            if (!this.cfg.getProperty("disabled") && N && N.cfg.getProperty("visible") && this.element.style.display != "none") {
                window.setTimeout(K, 0);
            }
        },
        blur: function() {
            var K = this.parent;
            if (!this.cfg.getProperty("disabled") && K && K.cfg.getProperty("visible")) {
                var J = this;
                window.setTimeout(function() {
                    try {
                        J._oAnchor.blur();
                        J.blurEvent.fire();
                    } catch(L) {}
                },
                0);
            }
        },
        hasFocus: function() {
            return (YAHOO.widget.MenuManager.getFocusedMenuItem() == this);
        },
        destroy: function() {
            var L = this.element,
            K, J;
            if (L) {
                K = this.cfg.getProperty("submenu");
                if (K) {
                    K.destroy();
                }
                this.mouseOverEvent.unsubscribeAll();
                this.mouseOutEvent.unsubscribeAll();
                this.mouseDownEvent.unsubscribeAll();
                this.mouseUpEvent.unsubscribeAll();
                this.clickEvent.unsubscribeAll();
                this.keyPressEvent.unsubscribeAll();
                this.keyDownEvent.unsubscribeAll();
                this.keyUpEvent.unsubscribeAll();
                this.focusEvent.unsubscribeAll();
                this.blurEvent.unsubscribeAll();
                this.cfg.configChangedEvent.unsubscribeAll();
                J = L.parentNode;
                if (J) {
                    J.removeChild(L);
                    this.destroyEvent.fire();
                }
                this.destroyEvent.unsubscribeAll();
            }
        },
        toString: function() {
            var K = "MenuItem",
            J = this.id;
            if (J) {
                K += (" " + J);
            }
            return K;
        }
    };
    F.augmentProto(H, YAHOO.util.EventProvider);
})(); (function() {
    YAHOO.widget.ContextMenu = function(G, F) {
        YAHOO.widget.ContextMenu.superclass.constructor.call(this, G, F);
    };
    var B = YAHOO.util.Event,
    E = YAHOO.widget.ContextMenu,
    D = {
        "TRIGGER_CONTEXT_MENU": "triggerContextMenu",
        "CONTEXT_MENU": (YAHOO.env.ua.opera ? "mousedown": "contextmenu"),
        "CLICK": "click"
    },
    C = {
        "TRIGGER": {
            key: "trigger",
            suppressEvent: true
        }
    };
    function A(G, F, H) {
        this.cfg.setProperty("xy", H);
        this.beforeShowEvent.unsubscribe(A, H);
    }
    YAHOO.lang.extend(E, YAHOO.widget.Menu, {
        _oTrigger: null,
        _bCancelled: false,
        contextEventTarget: null,
        triggerContextMenuEvent: null,
        init: function(G, F) {
            E.superclass.init.call(this, G);
            this.beforeInitEvent.fire(E);
            if (F) {
                this.cfg.applyConfig(F, true);
            }
            this.initEvent.fire(E);
        },
        initEvents: function() {
            E.superclass.initEvents.call(this);
            this.triggerContextMenuEvent = this.createEvent(D.TRIGGER_CONTEXT_MENU);
            this.triggerContextMenuEvent.signature = YAHOO.util.CustomEvent.LIST;
        },
        cancel: function() {
            this._bCancelled = true;
        },
        _removeEventHandlers: function() {
            var F = this._oTrigger;
            if (F) {
                B.removeListener(F, D.CONTEXT_MENU, this._onTriggerContextMenu);
                if (YAHOO.env.ua.opera) {
                    B.removeListener(F, D.CLICK, this._onTriggerClick);
                }
            }
        },
        _onTriggerClick: function(G, F) {
            if (G.ctrlKey) {
                B.stopEvent(G);
            }
        },
        _onTriggerContextMenu: function(H, F) {
            if (H.type == "mousedown" && !H.ctrlKey) {
                return;
            }
            var G;
            B.stopEvent(H);
            this.contextEventTarget = B.getTarget(H);
            this.triggerContextMenuEvent.fire(H);
            YAHOO.widget.MenuManager.hideVisible();
            if (!this._bCancelled) {
                G = B.getXY(H);
                if (!YAHOO.util.Dom.inDocument(this.element)) {
                    this.beforeShowEvent.subscribe(A, G);
                } else {
                    this.cfg.setProperty("xy", G);
                }
                this.show();
            }
            this._bCancelled = false;
        },
        toString: function() {
            var G = "ContextMenu",
            F = this.id;
            if (F) {
                G += (" " + F);
            }
            return G;
        },
        initDefaultConfig: function() {
            E.superclass.initDefaultConfig.call(this);
            this.cfg.addProperty(C.TRIGGER.key, {
                handler: this.configTrigger,
                suppressEvent: C.TRIGGER.suppressEvent
            });
        },
        destroy: function() {
            this._removeEventHandlers();
            E.superclass.destroy.call(this);
        },
        configTrigger: function(G, F, I) {
            var H = F[0];
            if (H) {
                if (this._oTrigger) {
                    this._removeEventHandlers();
                }
                this._oTrigger = H;
                B.on(H, D.CONTEXT_MENU, this._onTriggerContextMenu, this, true);
                if (YAHOO.env.ua.opera) {
                    B.on(H, D.CLICK, this._onTriggerClick, this, true);
                }
            } else {
                this._removeEventHandlers();
            }
        }
    });
} ());
YAHOO.widget.ContextMenuItem = YAHOO.widget.MenuItem; (function() {
    YAHOO.widget.MenuBar = function(F, E) {
        YAHOO.widget.MenuBar.superclass.constructor.call(this, F, E);
    };
    function D(E) {
        if (typeof E == "string") {
            return ("dynamic,static".indexOf((E.toLowerCase())) != -1);
        }
    }
    var B = YAHOO.util.Event,
    A = YAHOO.widget.MenuBar,
    C = {
        "POSITION": {
            key: "position",
            value: "static",
            validator: D,
            supercedes: ["visible"]
        },
        "SUBMENU_ALIGNMENT": {
            key: "submenualignment",
            value: ["tl", "bl"],
            suppressEvent: true
        },
        "AUTO_SUBMENU_DISPLAY": {
            key: "autosubmenudisplay",
            value: false,
            validator: YAHOO.lang.isBoolean,
            suppressEvent: true
        }
    };
    YAHOO.lang.extend(A, YAHOO.widget.Menu, {
        init: function(F, E) {
            if (!this.ITEM_TYPE) {
                this.ITEM_TYPE = YAHOO.widget.MenuBarItem;
            }
            A.superclass.init.call(this, F);
            this.beforeInitEvent.fire(A);
            if (E) {
                this.cfg.applyConfig(E, true);
            }
            this.initEvent.fire(A);
        },
        CSS_CLASS_NAME: "yuimenubar",
        _onKeyDown: function(G, F, K) {
            var E = F[0],
            L = F[1],
            I,
            J,
            H;
            if (L && !L.cfg.getProperty("disabled")) {
                J = L.cfg;
                switch (E.keyCode) {
                case 37:
                case 39:
                    if (L == this.activeItem && !J.getProperty("selected")) {
                        J.setProperty("selected", true);
                    } else {
                        H = (E.keyCode == 37) ? L.getPreviousEnabledSibling() : L.getNextEnabledSibling();
                        if (H) {
                            this.clearActiveItem();
                            H.cfg.setProperty("selected", true);
                            if (this.cfg.getProperty("autosubmenudisplay")) {
                                I = H.cfg.getProperty("submenu");
                                if (I) {
                                    I.show();
                                }
                            }
                            H.focus();
                        }
                    }
                    B.preventDefault(E);
                    break;
                case 40:
                    if (this.activeItem != L) {
                        this.clearActiveItem();
                        J.setProperty("selected", true);
                        L.focus();
                    }
                    I = J.getProperty("submenu");
                    if (I) {
                        if (I.cfg.getProperty("visible")) {
                            I.setInitialSelection();
                            I.setInitialFocus();
                        } else {
                            I.show();
                        }
                    }
                    B.preventDefault(E);
                    break;
                }
            }
            if (E.keyCode == 27 && this.activeItem) {
                I = this.activeItem.cfg.getProperty("submenu");
                if (I && I.cfg.getProperty("visible")) {
                    I.hide();
                    this.activeItem.focus();
                } else {
                    this.activeItem.cfg.setProperty("selected", false);
                    this.activeItem.blur();
                }
                B.preventDefault(E);
            }
        },
        _onClick: function(L, G, J) {
            A.superclass._onClick.call(this, L, G, J);
            var K = G[1],
            M,
            E,
            F,
            H,
            I;
            if (K && !K.cfg.getProperty("disabled")) {
                M = G[0];
                E = B.getTarget(M);
                F = this.activeItem;
                H = this.cfg;
                if (F && F != K) {
                    this.clearActiveItem();
                }
                K.cfg.setProperty("selected", true);
                I = K.cfg.getProperty("submenu");
                if (I) {
                    if (I.cfg.getProperty("visible")) {
                        I.hide();
                    } else {
                        I.show();
                    }
                }
            }
        },
        toString: function() {
            var F = "MenuBar",
            E = this.id;
            if (E) {
                F += (" " + E);
            }
            return F;
        },
        initDefaultConfig: function() {
            A.superclass.initDefaultConfig.call(this);
            var E = this.cfg;
            E.addProperty(C.POSITION.key, {
                handler: this.configPosition,
                value: C.POSITION.value,
                validator: C.POSITION.validator,
                supercedes: C.POSITION.supercedes
            });
            E.addProperty(C.SUBMENU_ALIGNMENT.key, {
                value: C.SUBMENU_ALIGNMENT.value,
                suppressEvent: C.SUBMENU_ALIGNMENT.suppressEvent
            });
            E.addProperty(C.AUTO_SUBMENU_DISPLAY.key, {
                value: C.AUTO_SUBMENU_DISPLAY.value,
                validator: C.AUTO_SUBMENU_DISPLAY.validator,
                suppressEvent: C.AUTO_SUBMENU_DISPLAY.suppressEvent
            });
        }
    });
} ());
YAHOO.widget.MenuBarItem = function(B, A) {
    YAHOO.widget.MenuBarItem.superclass.constructor.call(this, B, A);
};
YAHOO.lang.extend(YAHOO.widget.MenuBarItem, YAHOO.widget.MenuItem, {
    init: function(B, A) {
        if (!this.SUBMENU_TYPE) {
            this.SUBMENU_TYPE = YAHOO.widget.Menu;
        }
        YAHOO.widget.MenuBarItem.superclass.init.call(this, B);
        var C = this.cfg;
        if (A) {
            C.applyConfig(A, true);
        }
        C.fireQueue();
    },
    CSS_CLASS_NAME: "yuimenubaritem",
    CSS_LABEL_CLASS_NAME: "yuimenubaritemlabel",
    toString: function() {
        var A = "MenuBarItem";
        if (this.cfg && this.cfg.getProperty("text")) {
            A += (": " + this.cfg.getProperty("text"));
        }
        return A;
    }
});
YAHOO.register("menu", YAHOO.widget.Menu, {
    version: "2.5.0",
    build: "895"
});