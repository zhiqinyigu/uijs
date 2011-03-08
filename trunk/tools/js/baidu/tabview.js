function TabViewGroup(A){if(!A.tabNode){throw new Error(["TabViewGroup","constructor","tabNode must be a HTMLElement"]);}this.tabNode=A.tabNode;this.disabled=A.disabled||false;this.contentNode=A.contentNode;return this;}TabViewGroup.castGroup=function(A){try{if(A.constructor!=TabViewGroup){A=new TabViewGroup(A);}return A;}catch(B){throw new Error(["TabViewGroup","cast","Cast arguments to TabViewGroup error, check your arguments before cast"]);}};var TABVIEW_EVENT={DEACTIVE:"deactive",ACTIVE:"active",BEFORE_ADD:"beforeadd",AFTER_ADD:"afteradd",BEFORE_REMOVE:"beforeremove",AFTER_REMOVE:"afterremove"};var TABVIEW_SELECTOR={};TABVIEW_SELECTOR.DEFAULT=TABVIEW_SELECTOR.VERTICAL={tab:"*:first-child > *",content:"*:first-child+* > *"};TABVIEW_SELECTOR.HORIZONTAL={};function TabView(){return this._constructor.apply(this,arguments);}TabView.prototype=(function(){var A=CustEvent;return{aGroups:[],container:null,length:0,eventDelayType:["mouseout","keydown"],eventDelay:0,selector:TABVIEW_SELECTOR.DEFAULT,TAB_ACTIVE_CN:"selected",TAB_DEACTIVE_CN:"unselected",CONTENT_ACTIVE_CN:"selected",CONTENT_DEACTIVE_CN:"unselected",events:["click"],current:{oGroup:null,n:null},maxTabLength:10,preventDefault:true,stopPropagation:true,_timer:null,_constructor:function(C,B){if(Dom.isElement(C)){this.container=C;Object.extendJson(this,B||{});this.renderTabView();}else{Object.extendJson(this,C||{});}return this;},_setActive:function(B){var G=this.aGroups;var D=G.length;if(G[B].disabled){return false;}var F=G[B].tabNode;var E=G[B].contentNode;for(var C=0;C<D;C++){F=G[C].tabNode;E=G[C].contentNode;if(C==B){if(this.current.oGroup!=G[C]){if(this.current.oGroup){this._dispatchEvent(TABVIEW_EVENT.DEACTIVE,this.current.oGroup,this.current.n);}this._dispatchEvent(TABVIEW_EVENT.ACTIVE,G[C],C);}this.current={};this.current.oGroup=G[C];this.current.n=B;Dom.replaceClassName(F,this.TAB_DEACTIVE_CN,this.TAB_ACTIVE_CN);Dom.replaceClassName(E,this.CONTENT_DEACTIVE_CN,this.CONTENT_ACTIVE_CN);}else{Dom.replaceClassName(F,this.TAB_ACTIVE_CN,this.TAB_DEACTIVE_CN);Dom.replaceClassName(E,this.CONTENT_ACTIVE_CN,this.CONTENT_DEACTIVE_CN);}}},_dispatchEvent:function(D,C,B){A.fireEvent(this,D,C,B);},_insertGroup:function(C,B){var D=this.aGroups;if(C<=0){return[B].concat(D);}return D.slice(0,C+1).concat(B,D.slice(C+1));},addTabNodeListener:function(E){if(this.events.constructor==String){this.events=[this.events];}var D=this.events;var B=this;var C=D.length;var G=E.tabNode;for(var F=0;F<C;F++){BBEvent.observe(G,D[F],function(H){clearTimeout(B._timer);B._timer=setTimeout(function(){var I=B.queryTabNodeIndex(G);if(null!=I){B.setActiveTab(I);}},B.eventDelay);if(B.preventDefault){BBEvent.preventDefault(H);}if(B.stopPropagation){BBEvent.stopPropagation(H);}});if(0!=this.eventDelay){for(var F=0;F<this.eventDelayType.length;F++){BBEvent.observe(G,this.eventDelayType[F],function(H){clearTimeout(B._timer);});}}}},queryTabNodeIndex:function(D){if(!D){return null;}var E=this.aGroups;var C=E.length;for(var B=0;B<C;B++){if(E[B].tabNode==D){return B;}}return null;},renderTabView:function(){var F=Dom.getFirstChild(this.container).childNodes;var C=Dom.nextSibling(Dom.getFirstChild(this.container)).childNodes;var G=0;var D=null;F=Dom.pluckWhiteNode(F);C=Dom.pluckWhiteNode(C);var B=F.length;for(var E=0;E<B;E++){D={tabNode:F[E],contentNode:C[E]};if(Dom.hasClassName(F[E],this.TAB_ACTIVE_CN)){G=E;}this.addTab(D);}this.setActiveTab(G);return this;},insertTab:function(C,B){C=parseInt(C)||0;if(this.length>=this.maxTabLength){return false;}B=TabViewGroup.castGroup(B);this._dispatchEvent(TABVIEW_EVENT.BEFORE_ADD,B,C);this.aGroups=this._insertGroup(C,B);this.addTabNodeListener(B);this.length++;this._dispatchEvent(TABVIEW_EVENT.AFTER_ADD,B,C);return this;},removeTab:function(C){if(!this.aGroups[C]){return null;}var B=this.aGroups[C];this._dispatchEvent(TABVIEW_EVENT.BEFORE_REMOVE,B,C);Dom.removeNode(B.tabNode);Dom.removeNode(B.contentNode);B.tabNode=B.contentNode=null;this.aGroups.splice(C,1);this.length--;this._dispatchEvent(TABVIEW_EVENT.AFTER_REMOVE,B,C);if(this.current.n==C){this.setActiveTab(C-1<0?0:C-1);}return this;},addTab:function(B){this.insertTab(this.length,B);return this;},addTabList:function(){},setActiveTab:function(B){if(B>this.length-1){return false;}this._setActive(B);return this;},disabledTab:function(B){if(this.aGroups&&this.aGroups[B]){this.aGroups[B].disabled=true;}},dispose:function(){clearTimeout(this._timer);}};})();