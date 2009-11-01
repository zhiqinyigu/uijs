/*
 * Compressed by JSA(www.xidea.org)
 */
var $JSI={},$import=function(M,Q){
  if(this.document){
    var Z="<script src='data:text/javascript,$import()'></script>",$=this.XMLHttpRequest;
    function U($){
    }
    if(this.ActiveXObject){
      if(!$){
        var T=["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
        $=function(){
          while(true){
            try{
              return new ActiveXObject(T[0]);
            }
            catch($){
              if(!T.shift()){
                throw $;
              }
            }
          }
        };
      }
      Z=Z.replace(/'.*'/,W+"lazy-trigger.js");
    }
  }
  var A={},W=$JSI.scriptBase,P=[];
  function S(C,$,_,F){
    $.initialize&&$.initialize();
    var K=$.name.replace(/\.|$/g,"/")+_,H=C[K],I=$.loaderMap[_];
    if(H){
      if(H[0]){
        return ;
      }else {
        if(F){
          if(H[F]){
            return ;
          }else {
            H[F]=1;
          }
        }else {
          H[0]=1;
        }
      }
    }else {
      C[K]=H={},H[F||0]=1,H[1]=!I&&D($.name,_)==null;
    }
    if(I){
      if(B=I.dependenceMap){
        if(F){
          var B=B[F],G=B&&B.length;
          while(G--){
            var J=B[G];
            S(C,J[0],J[1],J[2]);
          }
        }
        for(F in B){
          var A=B[F],G=A.length;
          while(G--){
            J=A[G];
            S(C,J[0],J[1],J[2]);
          }
        }
      }else {
        H[0]=1;
      }
    }else {
      B=$.dependenceMap[_],G=B&&B.length;
      while(G--){
        var J=B[G],E=J[3];
        if(!F||!E||F==E){
          S(C,J[0],J[1],J[2]);
        }
      }
    }
  }
  function D(_,$){
    return (_=Q[_])&&_[$];
  }
  $JSI.preload=function(_,A,$){
    if(Q[_]){
      _=Q[_];
      if($==null){
        for(var B in A){
          _[B]=A[B];
        }
      }else {
        _[A]=$;
      }
    }else {
      if($==null){
        Q[_]=A;
      }else {
        (Q[_]={})[A]=$;
      }
    }
  };
  function C(_,$){
    A[this.name=_]=this;
    this.scriptBase=W+(_.replace(/\./g,"/"))+"/";
    this.dependenceMap=[];
    this.loaderMap={};
    this.scriptObjectMap={};
    this.objectScriptMap={};
    this.objectMap={};
    try{
      if($ instanceof Function){
        $.call(this);
      }else {
        M.call(this,$);
      }
    }
    catch(B){
      throw B;
    }
  }
  C.prototype={initialize:function(){
      this.initialize=0;
      var J=this.objectScriptMap,K=this.scriptObjectMap,$=this.dependenceMap,R={},L=$.length;
      while(L--){
        var Q=$[L],G=Q[0],B=Q[1],H=Q[2],A=this,M=0,F=0,D=0,S="*"==G,I=B.indexOf("*")+1;
        if(S||I){
          var C;
          if(S){
            var _=K;
          }else {
            var P=J[G];
            if(P){
              M=G;
            }else {
              P=G;
            }
            (_={})[P]=0;
          }
          if(I){
            if(I>1){
              A=O(E(B));
              D=1;
            }
            C=A.scriptObjectMap;
          }else {
            var N=J[B];
            if(N){
              F=B;
            }else {
              if(K[B]){
                N=B;
              }else {
                D=1;
                A=E(B);
                B=B.substring(A.name.length+1);
                A=O(A);
                N=A.objectScriptMap[B];
                if(N){
                  F=B;
                }else {
                  N=B;
                }
              }
            }
            (C={})[N]=0;
          }
          for(N in C){
            Q=[A,N,F,M,H,F?[F.replace(/\..*$/,"")]:A.scriptObjectMap[N]];
            for(P in _){
              if(D||P!=N){
                (R[P]||(R[P]=[])).push(Q);
              }
            }
          }
        }else {
          P=J[G],N=J[B];
          if(P){
            M=G;
          }else {
            P=G;
          }
          if(N){
            F=B;
          }else {
            if(K[B]){
              N=B;
            }else {
              A=E(B);
              B=B.substr(A.name.length+1);
              A=O(A);
              N=A.objectScriptMap[B];
              if(N){
                F=B;
              }else {
                N=B;
              }
            }
          }
          (R[P]||(R[P]=[])).push([A,N,F,M,H,F?[F.replace(/\..*$/,"")]:A.scriptObjectMap[N]]);
        }
      }
      this.dependenceMap=R;
    },addScript:function(D,F,C,B){
      var E=this.scriptObjectMap[D];
      if(E){
        var G=E[E.length-1];
      }else {
        E=(this.scriptObjectMap[D]=[]);
      }
      if(F){
        if(F instanceof Array){
          for(var A=0,$=F.length;A<$;A++){
            var _=F[A];
            this.objectScriptMap[_]=D;
            _=_.replace(/\..*$/,"");
            if(G!=_){
              E.push(G=_);
            }
          }
        }else {
          this.objectScriptMap[F]=D;
          F=F.replace(/\..*$/,"");
          if(G!=F){
            E.push(F);
          }
        }
      }
      C&&this.addDependence(D,C);
      B&&this.addDependence(D,B,1);
    },addDependence:function(A,_,B){
      if(_ instanceof Array){
        var $=_.length;
        while($--){
          this.addDependence(A,_[$],B);
        }
      }else {
        this.dependenceMap.push([A,_,B]);
      }
    },setImplementation:function($){
      if($.charAt(0)=="."){
        $=this.name+$;
        while($!=($=$.replace(/\w+\.\.\//,""))){
        }
      }
      this.implementation=$;
    }};
  function J(A,_,$){
    var B=A.loaderMap[_];
    if(!B){
      if(A.scriptObjectMap[_]){
        if(A.initialize){
          A.initialize();
        }
        B=new I(A,_);
      }
    }
    if(B.initialize){
      B.initialize($);
    }
  }
  function G(_,B){
    J(_[0],_[1],_[2]);
    var C=_[0].objectMap,A=_[5],$=A.length;
    while($--){
      var D=A[$];
      B.push(D);
      B[D]=C[D];
    }
  }
  function O($){
    while($&&$.implementation){
      $=R($.implementation,true);
    }
    return $;
  }
  function R(B,$){
    do {
      if(A[B]){
        return A[B];
      }
      if(A[B]===undefined){
        var _=D(B,"")||Q[B]===undefined&&U(W+B.replace(/\.|$/g,"/")+"__package__.js");
        if(_){
          return A[B]||new C(B,_);
        }
        A[B]=0;
      }
      if($){
        break ;
      }
    }while(B=B.replace(/\.?[^\.]+$/,""));
  }
  function E(_){
    var $=_.lastIndexOf("/");
    if($>0){
      return R(_.substr(0,$).replace(/\//g,"."),true);
    }else {
      if(($=_.indexOf(":"))>0){
        return R(_.substr(0,$),true);
      }else {
        return R(_.replace(/\.?[^\.]+$/,""));
      }
    }
  }
  function I(_,$){
    this.name=$;
    this.scriptBase=_.scriptBase;
    var A=F(_,this);
    if(A){
      return A;
    }
    X(_,this);
  }
  function F(B,D){
    var J=D.name,I=B.dependenceMap[J],A="this.hook=function(n){return eval(n)}",C=[],_=I&&I.length;
    while(_--){
      var E=I[_],$=E[3]||0;
      if(E[4]){
        C.push.apply(C,E[5]);
        if(F){
          if(F[$]){
            F[$].push(E);
          }else {
            F[$]=[E];
          }
        }else {
          var F=D.dependenceMap={};
          D.initialize=H;
          F[$]=[E];
        }
      }else {
        G(E,C);
        if(E=B.loaderMap[J]){
          return E;
        }
      }
    }
    if(C.length){
      D.varMap=C;
      A+=";var "+C.join(",").replace(/([^,]+)/g,"$1 = this.varMap.$1");
    }
    D.varText=A;
  }
  function X(A,F){
    var B=F.name,_=A.name,H=D(_,B);
    A.loaderMap[B]=F;
    try{
      if(H instanceof Function){
        Q[_][B]="";
        return H.call(F);
      }else {
        return M.call(F,"eval(this.varText);"+(H||U(A.scriptBase+B)));
      }
    }
    catch(I){
      throw I;
    }
    finally{
      delete F.varMap;
      delete F.varText;
      var E=A.scriptObjectMap[B],$=E.length,G=A.objectMap;
      if($==1){
        G[E=E[0]]=F.hook(E);
      }else {
        var C=F.hook("["+E.join(",")+"]");
        while($--){
          G[E[$]]=C[$];
        }
      }
    }
  }
  function H(_){
    var D=this.dependenceMap,C=[],B=this.name,A=D[0];
    if(A){
      delete D[0];
      var $=A.length;
      while($--){
        G(A[$],C);
      }
    }
    if(_){
      if(A=D[_]){
        delete D[_];
        $=A.length;
        while($--){
          G(A[$],C);
        }
      }
      for($ in D){
        break ;
      }
      if(!$){
        this.dependenceMap=this.initialize=0;
      }
    }else {
      for(_ in D){
        A=D[_];
        delete D[_];
        $=A.length;
        while($--){
          G(A[$],C);
        }
      }
      this.dependenceMap=this.initialize=0;
    }
    if(C.length){
      this.varMap=C;
      C=C.join(",");
      try{
        this.hook(C.replace(/([^,]+)/g,"$1 = this.varMap.$1"));
      }
      catch(E){
        throw E;
      }
      delete this.varMap;
    }
  }
  function K(_,$,A){
    J(_,_.objectScriptMap[$],$,true);
    var B=$.indexOf(".");
    if(B>0){
      $=$.substr(0,B);
    }
    B=_.objectMap[$];
    return A!=null?A[$]=B:B;
  }
  function _(A,_,C){
    J(A,_);
    var B=A.scriptObjectMap[_];
    if(C!=null){
      for(var $=0;$<B.length;$++){
        C[B[$]]=A.objectMap[B[$]];
      }
    }
  }
  var N,B={};
  function L(B,$){
    var _=document.createElement("script");
    N.appendChild(_);
    function A(){
      if($&&/complete|loaded|undefined/.test(this.readyState)){
        $();
        $=null;
      }
    }
    _.onload=A;
    _.onreadystatechange=A;
    _.src=W+B.replace(/\.js$/,"__preload__.js");
    _=null;
  }
  function Y(B,A,C,_){
    (function $(){
      if(_.length){
        while(D.apply(0,_[0])!=null){
          if(_.length>1){
            _[0]=_.pop();
          }else {
            C($import(B,A));
            return ;
          }
        }
        setTimeout($,15);
      }else {
        C($import(B,A));
      }
    })();
  }
  function V(H,C,I){
    N=N||document.body||document.documentElement;
    var A=E(H),_=H.substr(A.name.length+1),$=[],J=[];
    A=O(A);
    if(_=="*"){
      for(_ in A.scriptObjectMap){
        S(J,A,_);
      }
    }else {
      if(H.indexOf("/")+1){
        S(J,A,_);
      }else {
        S(J,A,A.objectScriptMap[_],_);
      }
    }
    if(I instanceof Function){
      for(var G in J){
        if(J[G][1]){
          $.push(G);
        }
      }
      J=[];
      function F(){
        if(G=$.pop()){
          var _=G.replace(/\/[^\/]+$/,"").replace(/\//g,"."),A=G.substr(_.length+1);
          if(D(_,A)==null){
            L(G,F);
            J.push([_,A]);
          }else {
            F();
          }
        }else {
          Y(H,C,I,J);
        }
      }
      F();
    }else {
      if(N.tagName<"a"){
        for(G in J){
          if(J[G][1]&&!B[G]){
            B[G]=true;
            $.push(G);
          }
        }
        document.write($.join("\n").replace(/.js$/gm,"__preload__.js").replace(/.+/g,"<script src='"+W+"$&'></script>"));
        P.push(function(){
          while(G=$.pop()){
            delete B[G];
          }
          $import(H,C);
        });
        document.write(Z);
      }else {
        $import(H,C);
      }
    }
  }
  return function(C,B,D){
    if(/\:$/.test(C)){
      return O(E(C));
    }
    $=arguments.length;
    if($==1){
      B=this;
    }else {
      if($==2){
        if(/boolean|function/.test(typeof B)){
          D=B,B=this;
        }
      }else {
        if($==0){
          D=P.shift();
          return D&&D();
        }
      }
    }
    if(D){
      return V(C,B,D);
    }
    var F=E(C),$=C.substr(F.name.length+1);
    if(C.indexOf("/")+1){
      _(O(F),$,F=B);
    }else {
      F=O(F);
      if($){
        if($=="*"){
          for(var A in F.scriptObjectMap){
            _(F,A,B);
          }
          F=B;
        }else {
          F=K(F,$,B);
        }
      }
    }
    return F;
  };
}(function(){
  return eval(arguments[0]);
},{});
$JSI.preload("org.jside","",function(){
  this.setImplementation("com.baidu.my");
});
$JSI.preload("com.baidu.my.ui","",function(){
  this.setImplementation("com.baidu.my");
});
$JSI.preload("com.baidu.my.util","",function(){
  this.setImplementation("com.baidu.my");
});
$JSI.preload("com.baidu.my","",function(){
  this.addScript("1.js",["setupDateGrid","startUp","Dialog","login","addStatistics","showTooltip"]);
});
$JSI.preload("com.baidu.my","1.js",function(){
  eval(this.varText);
  /*
   * Compressed by JSA(www.xidea.org)
   */
  _=window.XMLHttpRequest;
  if(typeof ActiveXObject!="undefined"){
    if(location.protocol=="file:"||!_){
      var $=["MSXML2.XMLHTTP","Microsoft.XMLHTTP"],_=function(){
        while(true){
          try{
            return new ActiveXObject($[0]);
          }
          catch(_){
            if(!$.shift()){
              throw _;
            }
          }
        }
      };
    }
  }
  function F(){
    var D=0,C=[];
    if(this==F){
      var B=arguments[D++];
      C.push(arguments[D++],":\n\n");
    }
    while(D<arguments.length){
      var $=arguments[D++];
      if($ instanceof Object){
        C.push($,"{");
        for(var _ in $){
          C.push(_,":",$[_],";");
        }
        C.push("}\n");
      }else {
        C.push($,"\n");
      }
    }
    if(B>=0){
      C.push("\n\n继续弹出 ",C[0]," 日志?\r\n");
      if(!confirm(C.join(""))){
        A=B+1;
      }
    }else {
      confirm(C.join(""));
    }
  }
  F.setLevel=function($){
    if(D[$]){
      A=$;
    }else {
      var _=D.length;
      $=$.toLowerCase();
      while(_--){
        if(D[_]==$){
          A=_;
          return ;
        }
      }
      F("unknow logLevel:"+$);
    }
  };
  function C(_,$){
    if(!this.confirm){
      this.confirm=print;
    }
    return function(){
      if(_>=A){
        var B=[_,$];
        B.push.apply(B,arguments);
        F.apply(F,B);
      }
    };
  }
  var D="trace,debug,info,warn,error,fatal".split(","),A=1,G=D.length;
  while(G--){
    var B=D[G];
    F[B]=C(G,B);
  }
  function I(A,B,$,C){
    this.xhr=new _();
    this.onComplete=$;
    this.onStep=C;
    this.options=B=new H(A,B);
    this.headers={Accept:"'text/javascript, text/html, application/xml, text/xml, */*'","Content-Type":B.contentType};
    var D=this;
    this.onreadystatechange=function(){
      var $=D.xhr.readyState;
      D.onStep&&D.onStep($);
      if($==4){
        var _=D.isSuccess();
        D.onComplete&&D.onComplete(_);
        if(_){
          D.onSuccess&&D.onSuccess();
        }else {
          D.onFailure&&D.onFailure();
        }
        D.free=true;
        D.xhr.onreadystatechange=Function.prototype;
      }
    };
    this.free=true;
  }
  I.prototype={send:function(C,A){
      this.free=false;
      var _=this.headers,E=this.options,$=E.method.toUpperCase(),D=E.url;
      if(!/POST|GET/.test($)){
        D+=";method="+$;
        $="POST";
      }
      if(arguments.length<2){
        A=E.sync;
      }
      if("POST"==$){
        if(this.xhr.overrideMimeType&&/Gecko\/200[0-4]/.test(navigator.userAgent)){
          _.Connection="close";
        }
      }
      this.xhr.open($,D,!A);
      this.xhr.onreadystatechange=this.onreadystatechange;
      for(var B in _){
        this.xhr.setRequestHeader(B,_[B]);
      }
      this.xhr.send(C);
    },isSuccess:function(){
      var $=this.getStatus();
      return $?$>=200&&$<300:null;
    },getStatus:function(){
      var $=this.xhr;
      return $.readyState==4&&(($.responseText!=null||$.responseXML)&&$.status);
    },putHeader:function($,_){
      this.headers[$]=_;
      return this;
    },getHeader:function($){
      if(this.xhr.readyState>=3){
        return this.xhr.getResponseHeader($);
      }
    },evalResult:function(){
      if(this.xhr.readyState==4){
        return window.eval(this.xhr.responseText);
      }
    },getResult:function(){
      if(/\/xml/.test(this.getHeader("Content-Type"))){
        if(this.xhr.readyState==4){
          return this.xhr.responseXML;
        }
      }else {
        if(this.xhr.readyState>=3){
          return this.xhr.responseText;
        }
      }
    },getXML:function(){
      if(this.xhr.readyState==4){
        return this.xhr.responseXML;
      }
    },getText:function(){
      if(this.xhr.readyState>=3){
        return this.xhr.responseText;
      }
    }};
  function H($,_){
    this.url=$;
    if(_.constructor==String){
      this.method=_;
    }else {
      for(var A in _){
        this[A]=_[A];
      }
    }
  }
  H.prototype={method:"POST",contentType:"application/x-www-form-urlencoded",encoding:"UTF-8"};
  function startUp(){
    addStatistics("k1=load&k2=resource&k3="+(new Date-window._ST));
    P.initialize(W);
  }
  function login(){
    O.popup(null,{});
  }
  function W($){
    V($,T.hotWidgets=[]);
    new I("/widget/recommend.action","GET",function(){
      var _=this.getStatus();
      if(_<400&&_>=200){
        var A=R.decode(this.getText()),$=[];
        $.push.apply($,A.hotest);
        $.push.apply($,A.newest);
        T.hotWidgets=$;
      }
    }).send();
  }
  function V($){
    try{
      X($);
      U();
    }
    catch(_){
    }
  }
  function X(C){
    J.setTheme(C.theme||0,true);
    var B=document.createElement("div");
    document.body.appendChild(B);
    B.innerHTML=L.render({frameHTML:C.layout.render(C,T.hotWidgets),headHTML:N.render()});
    setTimeout(function(){
      document.body.style.zoom=1;
      document.body.style.zoom="";
    },0);
    var U=0,A=0,O=M(),V=false;
    function H(){
      if(!this[O]){
        A++;
        this[O]=true;
        if(V){
          if(A==U){
            addStatistics("k1=load&k2=widget-loaded&k3="+(new Date-window._ST));
          }else {
            if(A==U/2){
              addStatistics("k1=load&k2=widget-half-loaded&k3="+(new Date-window._ST));
            }
          }
        }
      }
    }
    for(var P=0;P<C.pages.length;P++){
      var $=C.pages[P];
      for(var _=0;_<$.columns.length;_++){
        var D=$.columns[_];
        for(var F=0;F<D.widgets.length;F++){
          var I=D.widgets[F];
          U++;
          I.inject("repaint",null,H);
          I.initialize();
        }
      }
    }
    V=true;
    var S="baidu_my_pg",Q=window.location.search.slice(1).split("&");
    for(var P=0,G=Q.length;P<G;P++){
      var R=Q[P].split("=");
      if(R[0]=="tn"){
        S=R[1].length>0?R[1]:S;
      }
      if(R[0]=="my"){
        (new K("J_MY","/",new Date(2046,1,1),".baidu.com")).set("1");
      }
    }
    E("tnInput").value=S;
    Suggest.initialize("searchInput","searchSuggest");
  }
  function U(){
    U=Function.prototype;
    setInterval(function(){
      var $=Q.getCommand();
      if($){
        try{
          if($.name=="addWidget"){
            P.isTypeExist($.type,$.config,function(B,A){
              var _=true;
              if(A[0]){
                var C=B.pages[A[1]];
                if(C.select){
                  _=confirm("您已经添加了该模块，要继续添加吗?");
                }else {
                  _=confirm("您已经在“"+S(C.title)+"”添加了该模块，要继续添加吗?");
                }
              }
              _&&P.addWidgets([{type:$.type,config:$.config}],function(_,$){
                $.layout.repaint(function(){
                  for(var $=0;$<_.length;$++){
                    _[$].initialize();
                  }
                });
              });
            });
          }else {
            if($.name=="setTheme"){
              J.setTheme($.id);
            }
          }
        }
        catch(_){
        }
      }
    },300);
  }
  function E($){
    if($.constructor==String){
      $=document.getElementById($);
    }
    if($){
      var A=b;
      if($.wrapVersion==A.wrapVersion){
        return $;
      }
      for(var _ in A){
        $[_]=A[_];
      }
    }
    return $;
  }
  var d=function($){
    if($.constructor==String){
      $=document.createElement($);
    }
    return E($);
  },Z=0,g={uid:function($){
      var _=$.id||($.id=$.uniqueID);
      if(!_){
        $.id=_="__$puid"+Z++;
      }
      return _;
    },attach:function(A,$,_){
      if(A.attachEvent){
        A.attachEvent("on"+$,_);
      }else {
        A.addEventListener($,_,false);
      }
      return A;
    },detach:function(A,$,_){
      if(A.detachEvent){
        A.detachEvent("on"+$,_);
      }else {
        A.removeEventListener($,_,false);
      }
      return A;
    },show:function(_,$){
      _.style.display=$||"";
      return _;
    },hide:function($){
      $.style.display="none";
      return $;
    },remove:function($){
      $.parentNode.removeChild($);
    },setStyle:function(A,_,$){
      if(arguments.length==2){
        if(_.constructor==String){
          A.style.cssText=_;
          A.setAttribute("style",_);
        }else {
          for($ in _){
            A.style[$]=_[$];
          }
        }
      }else {
        A.style[_]=$;
      }
      return A;
    },addClass:function($,_){
      return this.replaceClass($,_,_);
    },removeClass:function($,_){
      return this.replaceClass($,_,null);
    },replaceClass:function(A,D,$){
      var B=A.className;
      if(B){
        B=B.split(/\s+/);
        var C=B.length;
        while(C--){
          var _=B[C];
          if(_==D||_==$){
            B.splice(C,1);
          }
        }
        $&&B.push($);
        A.className=B.join(" ");
      }else {
        A.className=$||A.className;
      }
      return A;
    },switchClass:function(D,A,$){
      var E=D.className;
      if(E){
        E=E.split(/\s+/);
        var C=E.length,B=true;
        while(C--){
          var _=E[C];
          if(_==A){
            E.splice(C,1);
            if(B){
              E.push($);
              B=false;
            }
          }else {
            if(_==$){
              E.splice(C,1);
              if(B){
                E.push(A);
                B=false;
              }
            }
          }
        }
        if(B){
          E.push(A);
        }
        D.className=E.join(" ");
      }else {
        D.className=A;
      }
      return D;
    },setOpacity:function(_,$){
      if(!_.currentStyle||!_.currentStyle.hasLayout){
        _.style.zoom=1;
      }
      if(window.ActiveXObject){
        _.style.filter=($==1)?"":"alpha(opacity="+$*100+")";
      }
      _.style.opacity=$;
      return _;
    },getRuntimeStyle:function($){
      return $.runtimeStyle||document.defaultView.getComputedStyle($,null);
    },getPosition:function(B){
      var _=0,A=0;
      do {
        _+=B.offsetLeft||0;
        A+=B.offsetTop||0;
        var $=this.getRuntimeStyle(B);
        _-=a($.marginLeft);
        A-=a($.marginTop);
      }while(B=B.offsetParent);
      return {left:Math.floor(_),top:Math.floor(A)};
    },getRegion:function(B){
      if(B.getBoundingClientRect){
        var E=B.getBoundingClientRect(),D=Y.scrollLeft,A=Y.scrollTop,$={left:E.left+D,right:E.right+D,top:E.top+A,bottom:E.bottom+A};
      }else {
        var $=this.getPosition(B),C=this.getRuntimeStyle(B),_=$.top+=a(C.marginTop);
        $.bottom=_+B.offsetHeight;
        _=$.left+=a(C.marginLeft);
        $.right=_+B.offsetWidth;
      }
      return $;
    }},Y=document.documentElement,b=d.prototype={wrapVersion:0},f={};
  function c(_,$){
    d[_]=$;
    b[_]=function(){
      var _=[this];
      _.push.apply(_,arguments);
      return $.apply(d,_);
    };
  }
  function a(B,A){
    if(A&&A.charAt(0)!="0"){
      var $=A.replace(/(\d*).*/,"$1"),_=A.substr($.length).toLowerCase();
      switch(_){
      case "%":
        $=B.offsetParent.clientWidth*100/$;
        break ;
      case "px":
        $=$*1;
        break ;
      default:
        return $*e(_);
      }
      return parseInt($,10)||0;
    }
    return 0;
  }
  function e(A){
    var _=f[A];
    if(!_){
      var $=new d("div");
      document.body.appendChild($);
      $.style.width=128+A;
      _=f[A]=$.clientWidth/128;
      document.body.removeChild($);
    }
    return _;
  }
  d.extend=function(_){
    for(var $ in _){
      c($,_[$]);
    }
    b.wrapVersion++;
  };
  d.extend(g);
  var m=function($){
    this.data=$;
  };
  m.prototype.render=function($){
    return this.data.call(null,l($));
  };
  function l($){
    var A={__select_tab__:h,__province_render__:k,__date_render__:i,__contains_string__:j};
    for(var _ in $){
      A[_]=$[_];
    }
    return A;
  }
  var p=0;
  function q($){
    if($&&$.stopPropagation){
      $.stopPropagation();
    }else {
      ($||window.event).cancelBubble=true;
    }
  }
  function M(){
    return (new Date()*1+p++).toString(36);
  }
  function o($){
    return $.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;");
  }
  function S($){
    return $.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&nbsp;/g," ");
  }
  function n($){
    function _(){
    }
    _.prototype=$;
    return new _();
  }
  if(typeof document.recalc!="undefined"&&/MSIE [678]/.test(navigator.appVersion)){
    var r=function($){
      if($){
        t();
      }else {
        setTimeout(t,100);
      }
    };
  }else {
    r=Function.prototype;
  }
  function t(){
    document.recalc();
    s();
    setTimeout(s,100);
    document.recalc();
  }
  function s(){
    document.body.style.display="none";
    document.body.style.display="";
  }
  function w(_,A){
    var $={};
    for(var B in _){
      $[B]=u(_[B],A);
    }
    return $;
  }
  function $0(_,$){
    return u(_,$);
  }
  function y($){
    for(var _ in $){
      this.removeAction($[_]);
    }
  }
  function v(_){
    var $=_0.length;
    while($--){
      if(_0[$]==_){
        _0[$]=null;
      }
    }
  }
  var _0=[],x="$"+M();
  function u(_,$){
    _=z(_,$);
    _=[x+"("+_+",this"];
    return function(){
      var A=_.slice(0);
      for(var $=0;$<arguments.length;$++){
        A.push(",");
        A.push(R.encode(arguments[$]));
      }
      A.push(",event)");
      return A.join("");
    };
  }
  function z(_,A){
    var $=_0.length;
    _0[$]=A?function(){
      return _.apply(A,arguments);
    }:_;
    return $;
  }
  window[x]=function($,A){
    var _=_0[$];
    return _.apply(A,Array.prototype.slice.call(arguments,2));
  };
  var R={decode:function($){
      return window.eval("("+$+")");
    },encode:B0,clone:D0},A0=/["\\\x00-\x1f\x7f-\x9f]/g,C0={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
  function E0($){
    var _=C0[$];
    if(_){
      return _;
    }
    _=$.charCodeAt().toString(16);
    return "\\u00"+(_.length>1?_:"0"+_);
  }
  function B0(_){
    switch(typeof _){
    case "undefined":
      return "null";
    case "string":
      A0.lastIndex=0;
      return '"'+(A0.test(_)?_.replace(A0,E0):_)+'"';
    case "object":
      if(!_){
        return "null";
      }
      var C=[];
      if(_ instanceof Array){
        var $=_.length;
        while($--){
          C[$]=B0(_[$])||"null";
        }
        return "["+C.join(",")+"]";
      }
      for(var B in _){
        var A=B0(_[B]);
        if(A){
          C.push(B0(B)+":"+A);
        }
      }
      return "{"+C.join(",")+"}";
    case "number":
      if(!isFinite(_)){
        _="null";
      }
    default:
      return String(_);
    }
  }
  function D0(_){
    if(_ instanceof Array){
      var B=[],$=_.length;
      while($--){
        B[$]=D0(_[$]);
      }
      return B;
    }else {
      if(_ instanceof Function){
        return _;
      }else {
        if(_ instanceof Object){
          B={};
          for(var A in _){
            B[String(A)]=D0(_[A]);
          }
          return B;
        }else {
          return _;
        }
      }
    }
  }
  function j(_,A){
    if(A==_){
      return true;
    }
    var $=_&&_.length;
    while($--){
      if(A==_[$]){
        return true;
      }
    }
  }
  var h=$0(function(_,D,F){
    var H=this.parentNode,C=H.childNodes,J;
    for(var $=0;$<C.length;$++){
      var K=E(C[$]);
      if(K==this){
        J=$;
        K.addClass("tab-selected");
      }else {
        K.removeClass("tab-selected");
      }
    }
    C=H.nextSibling.childNodes;
    for($=0;$<C.length;$++){
      K=E(C[$]);
      if($==J){
        K.style.display="block";
      }else {
        K.style.display="none";
      }
    }
    r();
    if(F!=null){
      var I=H;
      while(I=I.parentNode){
        if(I.getAttribute("name")=="widget"){
          var A=I.id,B=G0.getWidget(A);
          if(D=="config"){
            var G=B.config;
            if(G[F]!=J){
              G[F]=J;
              P.updateWidgetConfig(A,G,null);
            }
          }else {
            if(D=="this"){
              B[F]=J;
            }
          }
          break ;
        }
      }
    }
    return J;
  }),J0=$0(function(A){
    var B=this.options[this.selectedIndex],C=F0[B.value||B.text];
    if(!C){
      return ;
    }
    var E=L0(this);
    while(E.options.length){
      E.removeChild(E.options[0]);
    }
    C=C.city;
    for(var _=0,$=C.length;_<$;_++){
      var D=new d("option");
      D.innerHTML=C[_];
      E.appendChild(D);
    }
  });
  function K0(B){
    for(var _ in F0){
      var A=F0[_].city,$=A.length;
      while($--){
        if(A[$]==B){
          return _;
        }
      }
    }
  }
  function k(C,B,D){
    var A=['<select onchange="',J0(D),'">'],$=K0(C),E="北京",F=(F0[$]||F0[E]).city;
    for(var H in F0){
      A.push("<option value='",H,"'");
      if(H==$){
        A.push(" selected='selected'");
      }
      A.push(">",F0[H].name,"</option>");
    }
    A.push("</select><select");
    A.push(" name='",B,"'>");
    for(var _=0;_<F.length;_++){
      var G=F[_];
      A.push("<option value='",G,"'");
      if(C==G){
        A.push(" selected='selected'");
      }
      A.push(">",G,"</option>");
    }
    A.push("</select>");
    return A.join("");
  }
  var I0=$0(function(){
    var $=L0(this);
    N0.call($);
  })();
  function N0(){
    var F=L0(this),A=O0(this),E=A.options[A.selectedIndex].value,_=this.options[this.selectedIndex].value,B=(F.selectedIndex||0)+1;
    while(F.options.length){
      var $=F.options[0];
      F.removeChild($);
    }
    var C=M0(E,_);
    for(var D=1;D<=C;D++){
      $=new d("option");
      $.innerHTML=D;
      $.value=[E,_,D].join("-");
      if(D==B){
        $.selected=true;
      }
      F.appendChild($);
    }
  }
  var H0=$0(N0)();
  function i($,E){
    var $=$.split("-"),D=$[0]*1,_=$[1]*1,$=$[2]*1,A=['<select onchange="',I0,'">'];
    for(var C=-1;C<2;C++){
      A.push("<option value='",D+C,"'");
      if(!C){
        A.push(" selected='selected'");
      }
      A.push(">",D+C,"</option>");
    }
    A.push('</select>年<select onchange="',H0,'">');
    for(C=1;C<=12;C++){
      A.push("<option value='",C,"'");
      if(C==_){
        A.push("selected='selected'");
      }
      A.push(">",C,"</option>");
    }
    A.push("</select>月<select");
    A.push(" name='",E,"'>");
    var B=M0(D,_);
    for(C=1;C<=B;C++){
      A.push("<option value='",D,"-",_,"-",C,"'");
      if(C==$){
        A.push("selected='selected'");
      }
      A.push(">",C,"</option>");
    }
    A.push("</select>日");
    return A.join("");
  }
  function M0(A,$){
    var _=new Date(A,$-1,5);
    _.setDate(31);
    _=_.getDate();
    if(_<30){
      _=31-_;
    }
    return _;
  }
  function L0(_){
    var $=_.nextSibling;
    while($&&$.nodeType!=1){
      $=$.nextSibling;
    }
    if($==null){
      $=_.parentNode;
      while(!$.nextSibling){
        $=$.parentNode;
      }
      $=$.nextSibling;
    }
    if($.tagName=="SELECT"){
      return $;
    }
    L0($);
  }
  function O0(_){
    var $=_.previousSibling;
    while($&&$.nodeType!=1){
      $=$.previousSibling;
    }
    if($==null){
      $=_.parentNode;
      while(!$.previousSibling){
        $=$.parentNode;
      }
      $=$.previousSibling;
    }
    if($.tagName=="SELECT"){
      return $;
    }
    O0($);
  }
  function K(A,_,C,B,$){
    this.name=A;
    this.expires=C;
    this.domain=B;
    this.path=_;
    this.secure=$;
  }
  function P0(_,B,A,$){
    return (_?"; path="+_:"")+(B?"; expires="+B.toGMTString():"")+(A?"; domain="+A:"")+($?"; secure":"");
  }
  K.prototype.set=function($){
    document.cookie=this.name+"="+encodeURIComponent($)+P0(this.path,this.expires,this.domain,this.secure);
  };
  K.prototype.remove=function(){
    document.cookie=this.name+"="+P0(this.path,new Date(0),this.domain,this.secure);
  };
  K.prototype.get=function(){
    var $=new RegExp("^(?:.*"+this.name+"=([^;]*))?.*");
    return (this.get=function(){
      var _=document.cookie.replace($,"$1");
      return _&&decodeURIComponent(_);
    })();
  };
  function addStatistics($){
    new I("/da/f.gif?"+$,"get",function(){
    }).send();
  }
  var U0="ibaidu2.0",Z0="widgetconfig",R0=false,Y0={isDefaultConfig:function(){
      return R0;
    },getGlobalConfig:function(A){
      if(A){
        return g0;
      }
      try{
        var $=X0.get(U0);
        if($){
          $=R.decode($);
          if($.username==null&&$.appVersion!=2){
            $.appVersion=2;
            $.pages.splice(1,0,e0);
            this.saveGlobalConfig($);
          }
          return $;
        }
        R0=true;
        return g0;
      }
      catch(_){
        R0=true;
        return g0;
      }
    },getWidgetConfigMap:function(A){
      if(A){
        return V0;
      }
      try{
        var $=X0.get(Z0);
        return $?R.decode($):V0;
      }
      catch(_){
        return V0;
      }
    },saveGlobalConfig:function($){
      X0.set(U0,R.encode($));
    },saveWidgetConfigMap:function($){
      X0.set(Z0,R.encode($));
    },clear:function(){
      try{
        X0.remove(U0);
        X0.remove(Z0);
      }
      catch($){
      }
    }},b0=navigator.userAgent.toLowerCase().indexOf("opera")!=-1,c0=!b0&&navigator.userAgent.toLowerCase().indexOf("msie")!=-1,a0=navigator.userAgent.toLowerCase().indexOf("khtml")!=-1,W0=!b0&&!a0&&(navigator.userAgent.toLowerCase().indexOf("gecko")!=-1&&navigator.productSub>=20030210),h0={title:"百度推荐",columns:[{width:"33%",widgets:[{id:"w2",type:"4",lastModfied:-1},{id:"w9",type:"3",lastModfied:-1}]},{width:"33%",widgets:[{id:"w3",type:"5",lastModfied:-1},{id:"w4",type:"10",lastModfied:-1},{id:"w5",type:"7",lastModfied:-1}]},{width:"33%",widgets:[{id:"w6",type:"1",lastModfied:-1},{id:"w7",type:"9",lastModfied:-1},{id:"w8",type:"8",lastModfied:-1}]}]},e0={title:"我在百度",systemId:"mybaidu",columns:[{width:"66%",widgets:[{id:"w21",type:"20",lastModfied:-1},{id:"w22",type:"23",lastModfied:-1},{id:"w23",type:"22",lastModfied:-1},{id:"w24",type:"19",lastModfied:-1}]},{width:"34%",widgets:[{id:"w25",type:"21",lastModfied:-1}]}]},g0={appVersion:2,lastModified:-1,theme:0,pages:[h0,e0]},V0={w2:{channel:"civilnews&tn=rss&sub=0",count:5,showFirstDetail:true},w8:{channel:"1",count:10},w9:{type:1,count:10},w7:{},w5:{sites:["天气预报","地图搜索","火车车次","航班班次","酒店查询","电视预告","食品价格","常用电话","文档搜索","手机号码","股票信息","计算器","度量转换","英语辞典","IP地址","地区区号","邮政编码","政府机构","交通处罚","消费者维权","万年历","历史上的今天","成语词典","汉语字典","百科词典","货币兑换"]}};
  if(c0){
    g0.pages[0].columns[0].widgets.unshift({id:"1",type:"2",lastModfied:-1});
  }
  if(window.globalStorage){
    try{
      var d0=window.globalStorage[location.hostname],X0={set:function($,_){
          d0[$]=_;
          return ;
        },get:function($){
          var _=d0[$];
          if(_!=null){
            return _.value;
          }
        },remove:function($){
          d0.removeItem($);
        }};
    }
    catch(i0){
      d0={};
      X0={set:function($,_){
          d0[$]=_;
          return ;
        },get:function($){
          return d0[$];
        },remove:function($){
          delete d0[$];
        }};
      addStatistics("k1=error&k2=exception&k3=localstore");
    }
  }else {
    if(window.ActiveXObject){
      document.documentElement.addBehavior("#default#userdata");
      try{
        document.documentElement.load("mybaidu");
      }
      catch(i0){
        document.documentElement.load("void");
        var i0=window[M()]=new Image();
        i0.src="/da/f.gif?k1=tc&k2=js&k3=loadfail";
      }
      X0={set:function($,_){
          document.documentElement.setAttribute($,_);
          document.documentElement.save("mybaidu");
        },get:function($){
          var _=document.documentElement.getAttribute($);
          if(_){
            return _;
          }
        },remove:function($){
          document.documentElement.removeAttribute($);
          document.documentElement.save("mybaidu");
        }};
    }else {
      var Q0="$_"+new Date().getTime().toString(36),T0="/images/storager.swf",f0={},X0={set:function($,A){
          try{
            S0().setItem($,A);
          }
          catch(_){
            f0[$]=A;
          }
        },get:function($){
          try{
            return S0().getItem($);
          }
          catch(_){
            return f0[$];
          }
        },remove:function($){
          try{
            S0().removeItem($);
          }
          catch(_){
            return f0[$];
          }
          delete f0[$];
        }};
      document.write('<div style="width:1;height:0px"><embed src="'+T0+'"  name="'+Q0+'" height="1" width="1" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/></div>');
      function S0(){
        return document[Q0];
      }
    }
  }
  var D1="ibaidu2.0",O1,F1,p0,P1={},L1="http://passport.baidu.com",B1=false,w0=new K("IBD_SELECTED_TAB"),v0=new K("NOTICE_KEY","/",new Date(2500,1,1)),K1,P={initialize:function($){
      var B=Y0.getGlobalConfig();
      F1=Y0.getWidgetConfigMap();
      if(B.lastModified==-1){
        this.REGISTIED=false;
      }else {
        this.REGISTIED=true;
      }
      function _($,C,D,_){
        B=$;
        p0=_;
        F1=C||F1;
        P1=D;
        y0(P1,A);
      }
      q0(B,_);
      function A(){
        O1=E1(B,F1);
        var _=w0.get(),A=O1.pages;
        if(_&&parseInt(_)<A.length){
          O1.selectedIndex=_;
        }else {
          O1.selectedIndex=0;
          if(B.username){
            var C=A.length;
            while(C--){
              if(A[C].systemId=="mybaidu"){
                O1.selectedIndex=C;
                break ;
              }
            }
          }
        }
        O1.passport=L1;
        G0.initialize(O1);
        $&&$(O1);
      }
    },addWidgets:function(A,C){
      var D=O1.getCurrentPage(),B="?";
      z0();
      for(var _=0;_<A.length;_++){
        B+="type="+(A[_].type||0)+"&";
        A[_].id=z0(true);
      }
      var $=[];
      B=B.substring(0,B.length-1);
      new I("/config/widget/"+B,"get",function(){
        var B=this.getStatus();
        if(B<400&&B>=200){
          var E=R.decode(this.getText())||{};
          for(var _ in E.resourceMap){
            P1[""+_]=E.resourceMap[_];
          }
          y0(E.resourceMap,function(){
            for(var B=0;B<A.length;B++){
              var I=A[B],F=E.resourceMap[I.type],H=I.config||F.config||{},G=P1[I.type];
              G.type=I.type;
              var _=G0.createWidget(G,I.id,H);
              D.addWidget(_,B%D.columns.length);
              $.push(_);
              P.updateWidgetConfig(I.id,H,null,true);
            }
            x0(function(){
              C&&C($,O1);
            });
          });
        }
      }).send();
    },clear:function(){
      Y0.clear();
    },removeWidgetByType:function($,A){
      for(var B=$.length;B--;){
        var _=$[B];
        O1.walkWidget(function(C,A,$,D){
          if(C.equals(_)){
            O1.pages[A].removeWidget($,D);
            B++;
            return true;
          }
        });
      }
      x0(A);
    },addWidget:function(C,$,B){
      var A=O1.getCurrentPage(),_={type:C,id:"w"+M()};
      new I("/config/widget/?type="+C,"get",function(){
        var C=this.getStatus();
        if(C<400&&C>=200){
          var E=R.decode(this.getText())||{};
          for(var D in E.resourceMap){
            P1[""+D]=E.resourceMap[D];
          }
          y0(E.resourceMap,function(){
            var D=P1[_.type];
            D.type=_.type;
            var E=$||D.config,C=G0.createWidget(D,_.id,E);
            A.addWidget(C);
            P.updateWidgetConfig(_.id,E,function(){
              B&&B(O1,C);
            },false);
          });
        }else {
          F("error");
        }
      }).send();
    },updateWidgetConfig:function(B,_,A,$){
      F1[B]=_;
      if(!this.REGISTIED){
        A&&A();
        Y0.saveWidgetConfigMap(F1);
        return ;
      }
      new I(this.base+"config/widget/","POST",function(){
        var _=this.getStatus();
        if(_==200){
          A&&A();
          p0[B]=this.getText();
          if(!$){
            Y0.saveWidgetConfigMap(F1);
            x0();
          }
        }
      }).send("content="+encodeURIComponent(R.encode(_))+(B?"&id="+B:""));
    },moveWidget:function(A,B,$,F,_){
      var H=B==null?O1.getCurrentPage():O1.pages[B],E=O1.getWidgetById(A),C=H.getWidgets(),I;
      if(H!=O1.getCurrentPage()){
        for(var D=0;D<C.length;D++){
          var J=C[D];
          J.type==E.type&&(I=true);
          if(I){
            J.equals({type:E.type,config:E.config})&&(I=true)||(I=false);
          }
          if(I){
            break ;
          }
        }
      }
      var G=true;
      if(I){
        G=confirm("您已经在“"+S(H.title)+"”添加了该模块，要继续添加吗?");
      }
      if(G){
        J=O1.removeWidgetById(A);
        H.addWidget(J,$,F);
        x0(_);
      }else {
        _(O1,false);
      }
    },removeWidget:function(_,$){
      O1.removeWidgetById(_);
      x0($);
    },checkNoticeId:function(_,$){
      if(K1!=_){
        K1=_;
        v0.set(K1);
        return true;
      }else {
        $&&$();
      }
    },addTab:function($){
      if(O1.pages.length>=20){
        alert("标签页数量过多");
        return ;
      }
      var _=new k0(new m0());
      _.columns.push(new n0(),new n0(),new n0());
      _.title="新标签页";
      O1.selectedIndex=O1.pages.length;
      O1.addTab(_);
      $(O1);
    },editTab:function($,_,A){
      O1.pages[$].title=_;
      x0(A);
    },removeTab:function(_,A){
      for(var $=0,B=O1.pages.length;$<B;$++){
        if(O1.pages[$].id==_){
          O1.removeTab($);
          break ;
        }
      }
      O1.selectedIndex=Math.min(O1.selectedIndex,O1.pages.length-1);
      w0.set(O1.selectedIndex);
      x0(A);
    },selectTab:function(_,A){
      for(var $=0,B=O1.pages.length;$<B;$++){
        if(O1.pages[$].id==_){
          O1.selectedIndex=$;
        }
      }
      w0.set(O1.selectedIndex);
      A(O1);
    },getWidgetConfig:function($){
      return F1[$];
    },getWidgetResource:function($){
      return P1[$];
    },setColumnStyle:function(A,C,F){
      var D=O1.getCurrentPage(),H=D.columns;
      D.colStyle=C;
      var _=A.length-D.columns.length;
      if(_>0){
        for(var E=0;E<_;E++){
          H.push(new n0());
        }
      }else {
        if(_<0){
          for(E=0;E<-_;E++){
            var G=H.pop();
            for(var $=0;$<G.widgets.length;$++){
              H[$%H.length].widgets.push(G.widgets[$]);
            }
          }
        }
      }
      for(var E=0,B=H.length;E<B;E++){
        H[E].width=A[E].width;
      }
      x0(F);
    },setTheme:function($,_){
      if(O1.theme!=$){
        O1.theme=$;
        x0(_);
      }
    },setPageTitle:function(B,$,_){
      var A=O1.getPageById(B);
      if(A.title==$){
        return ;
      }
      A.title=$;
      x0(_);
    },getTheme:function(){
      return O1.theme;
    },getCurrentPage:function(){
      return O1.getCurrentPage();
    },getPagesId:function(){
      var _=[];
      for(var $=0;$<O1.pages.length;$++){
        _.push("tab"+O1.pages[$].id);
      }
      return _;
    },getUserName:function(){
      return O1.username;
    },getPassport:function(){
      return O1.passport;
    },getSpace:function(){
      return O1.space;
    },isLoginSuggestShow:function(){
      return N1;
    },loginSuggestHide:function(){
      E("loginSuggest").style.display="none";
      N1=false;
    },isDefault:function(){
      return B1||!P.REGISTIED&&Y0.isDefaultConfig();
    },getPageCode:function(B){
      var D=C1(),E=O1.pages,_;
      for(var J=0;J<E.length;J++){
        var F=E[J];
        if(F.id==B){
          _=J;
        }
      }
      var $=D.pages[_];
      for(J=0;J<$.columns.length;J++){
        var G=$.columns[J];
        for(var I=0;I<G.widgets.length;I++){
          var A=G.widgets[I];
          A.title=O1.pages[_].columns[J].widgets[I].title;
        }
      }
      var H={};
      H.pageConfig=$;
      H.widgetConfigMap=F1;
      var C=R.encode(H);
      return C;
    },addPage:function(D,A){
      var G=C1(),C=D.pageConfig;
      z0();
      for(var H=0;H<C.columns.length;H++){
        var F=C.columns[H].widgets;
        for(var _=0;_<F.length;_++){
          var $=F[_].id,B=z0(true);
          F[_].id=B;
          var E=D.widgetConfigMap[$];
          if(E){
            F1[B]=E;
            this.updateWidgetConfig(B,E);
          }
        }
      }
      G.pages.push(D.pageConfig);
      x0(A,G);
    },isTypeExist:function(A,$,B){
      var _=O1.isTypeExist(A,$);
      B&&B(O1,_);
      return _[0];
    },base:""};
  function y0(_,A){
    var $=[];
    for(var B in _){
      B=_[B].imports;
      if(B){
        $.push.apply($,B);
      }
    }
    if($.length){
      l0($,A);
    }else {
      A();
    }
  }
  function q0(E,_){
    var C={},B=E.lastModified||1,$=E;
    new I("/config/main/"+"?lastModified="+B,"GET",A).send(""+-new Date());
    function A(B){
      var A=this.getStatus();
      if(A==401||A==403){
        if(P.REGISTIED){
          C=Y0.getGlobalConfig(true);
          F1=Y0.getWidgetConfigMap(true);
          G1(C,function(){
            _.apply(null,arguments);
            setTimeout(function(){
              P.REGISTIED=false;
            },1000);
          });
        }else {
          if($.username){
            $.username=null;
          }
          D();
        }
      }else {
        if(A==404){
          B1=true;
          if(P.REGISTIED==true){
            Y0.clear();
            var C=Y0.getGlobalConfig();
            F1=Y0.getWidgetConfigMap();
            var H=R.decode(this.getText()).username;
            C.username=H;
            D(C);
          }else {
            C=Y0.getGlobalConfig(),H=R.decode(this.getText()).username;
            C.username=H;
            D(C);
            P.REGISTIED=true;
          }
          for(var G in F1){
            new I("/config/widget/","POST",function(){
              var $=this.getStatus();
              if($==200){
              }
            }).send("content="+encodeURIComponent(R.encode(F1[G]))+(G?"&id="+G:""));
          }
          x0(null,C);
          Y0.saveWidgetConfigMap(F1);
        }else {
          if(A==400){
            alert("服务器出错");
          }else {
            var F=this.getText();
            if(F.replace(/\s+/,"")){
              P.REGISTIED=true;
              var E=R.decode(this.getText());
              Y0.saveGlobalConfig(E);
              D(R.decode(F));
            }else {
              P.REGISTIED=true;
              D();
            }
          }
        }
      }
    }
    function D($){
      if($&&$!=E){
        E=$;
      }
      G1(E,_);
    }
  }
  function t0(F){
    var D=F,B={};
    for(var _=0;_<D.pages.length;_++){
      var G=D.pages[_];
      for(var $=0;$<G.columns.length;$++){
        var C=G.columns[$];
        for(var A=0;A<C.widgets.length;A++){
          var E=C.widgets[A];
          B[E.id]=E.lastModified;
        }
      }
    }
    return B;
  }
  function G1(B,_){
    var $=t0(B),A=J1(B,$);
    new I("/config/widget/?"+A,"GET",function(){
      var C=this.getStatus();
      if(C<400&&C>=200){
        var E=R.decode(this.getText())||{},A=E.configMap||{},D;
        for(D in F1){
          if(!A[D]){
            A[D]=F1[D];
          }
        }
        D&&(F1=E.configMap);
        P1=E.resourceMap;
        _(B,A,P1,$);
      }else {
        _();
      }
    }).send("");
  }
  function J1($,_){
    var I="",H=$;
    for(var E=0;E<H.pages.length;E++){
      var B=H.pages[E];
      for(var F=0;F<B.columns.length;F++){
        var D=B.columns[F];
        for(var C=0;C<D.widgets.length;C++){
          var A=D.widgets[C],G=A.type;
          G=parseInt(G)||0;
          if(I.indexOf("="+G+"&")==-1){
            I+="type="+G+"&";
          }
        }
      }
    }
    for(var J in _){
      I+="id="+J+"&";
    }
    I+="id=moreSearch&";
    if(I.length>0){
      return I.substring(0,I.length-1);
    }else {
      return "";
    }
  }
  var N1;
  function x0($,_){
    var B=_||C1();
    Y0.saveGlobalConfig(B);
    if(P.REGISTIED){
      new I("/config/main/","POST",function(){
        var _=this.getStatus();
        if(_==200){
          O1.lastModified=this.getText()*1;
          B.lastModified=O1.lastModified;
          Y0.saveGlobalConfig(B);
          $&&$(O1);
        }else {
          if(_==405){
            if(confirm("远端配置已更新，点击确定将刷新。本次操作将忽略。")){
              window.location.reload();
            }
            $&&$(O1,false);
          }else {
            if(_==401){
              O.popup();
              $&&$(O1,true);
            }else {
              if(confirm("配置更新失败，点击确定将刷新。本次操作将忽略。")){
                window.location.reload();
              }
            }
          }
        }
      }).send(function(){
        return "content="+encodeURIComponent(R.encode(B));
      });
    }else {
      if(N1==null){
        var A=E("loginSuggest");
        A&&A.show("block");
      }
      $&&$(O1);
    }
  }
  function C1(){
    var G={};
    G.pages=[];
    G.theme=O1.theme||0;
    G.layout=O1.layout.type;
    G.username=O1.username;
    G.noticeId=K1;
    G.space=O1.space;
    G.appVersion=2;
    G.lastModified=O1.lastModified||0;
    G.widgetLastModifiedMap={};
    for(var _=0;_<O1.pages.length;_++){
      var B=O1.pages[_],C=s0(B);
      G.pages.push(C);
      C.columns=[];
      var D=B.columns;
      for(var H=0;H<D.length;H++){
        var $=D[H],F=r0($);
        C.columns.push(F);
        var A=$.widgets;
        F.widgets=[];
        for(var E=0;E<A.length;E++){
          F.widgets.push(_1(A[E]));
        }
      }
    }
    return G;
  }
  function E1(K,C){
    var A=K,I=I1(A);
    K1=v0.get();
    for(var F=0;F<A.pages.length;F++){
      var H=A.pages[F],$=u0(H);
      I.addTab($);
      for(var G=0;G<H.columns.length;G++){
        var D=H.columns[G],E=Q1(D);
        $.columns.push(E);
        for(var _=0;_<D.widgets.length;_++){
          var J=P1[D.widgets[_].type];
          if(J==null){
          }else {
            J.id=D.widgets[_].id;
            J.type=D.widgets[_].type;
            var B=C[J.id]||J.config;
            if(B){
              C[J.id]=B;
              E.widgets.push(G0.createWidget(J,J.id,B));
            }
          }
        }
      }
    }
    return I;
  }
  function s0($){
    var _={};
    _.layout=$.layout.type;
    _.title=$.title;
    if($.systemId){
      _.systemId=$.systemId;
    }
    _.columns=[];
    return _;
  }
  function r0($){
    var _={};
    _.widgets=[];
    _.width=$.width||"";
    return _;
  }
  function _1($){
    var _={},A=F1[$.id];
    _.lastModified=p0[$.id]||0;
    _.id=$.id;
    _.type=""+$.type;
    return _;
  }
  function I1(_){
    var $=new o0();
    $.layout=new j0();
    $.theme=_.theme;
    $.username=_.username;
    $.space=_.space;
    $.lastModified=_.lastModified;
    return $;
  }
  function u0(_){
    var $=new k0();
    $.layout=new m0();
    $.title=_.title;
    $.systemId=_.systemId;
    return $;
  }
  function Q1(_){
    var $=new n0();
    $.width=_.width;
    return $;
  }
  function H1(){
    var $=[];
    O1.walkWidget(function(_){
      $.push(_.id);
    });
    return $;
  }
  var M1;
  function z0($){
    $||(M1=H1().join("|"));
    M1||(M1=H1().join("|"));
    var _="w"+M();
    while(M1.indexOf(_)!=-1){
      _="w"+M();
    }
    return _;
  }
  var $1=[],A1=I.prototype.send;
  I.prototype.send=function($){
    this.arg=$;
    if(this.options.method.toUpperCase()=="GET"){
      if(this.options.url.indexOf("?")>=0){
        this.options.url+="&time="+(new Date()*1).toString(36);
      }else {
        this.options.url+="?time="+(new Date()*1).toString(36);
      }
      A1.call(this,$);
      return ;
    }
    $1.push(this);
    this._onComplete=this.onComplete;
    this.onComplete=function(){
      this._onComplete&&this._onComplete.apply(this,arguments);
      $1.shift();
      if($1.length>0){
        var _=$1[0];
        if(typeof _.arg=="function"){
          var $=_.arg();
        }else {
          $=_.arg;
        }
        A1.call(_,$);
      }
    };
    if($1.length==1){
      var _=$1[0];
      if(typeof _.arg=="function"){
        $=_.arg();
      }else {
        $=_.arg;
      }
      A1.call(_,$);
    }
  };
  var U1=[{title:"百度有啊",href:"http://youa.baidu.com"},{title:"空间",href:"http://hi.baidu.com"},{title:"百科",href:"http://baike.baidu.com"},{title:"地图",href:"http://map.baidu.com"},{title:"词典",href:"http://dict.baidu.com"},{title:"安全中心",href:"http://an.baidu.com"},{title:"财经",href:"http://finance.baidu.com"},{title:"搜藏",href:"http://cang.baidu.com"},{title:"玩吧",href:"http://wanba.baidu.com"},{title:"音乐盒",href:"http://box.baidu.com"},{title:"音乐掌门人",href:"http://zhangmen.baidu.com"},{title:"风云榜",href:"http://top.baidu.com"},{title:"博客搜索",href:"http://blogsearch.baidu.com"},{title:"大学搜索",href:"http://daxue.baidu.com"},{title:"地区搜索",href:"http://diqu.baidu.com"},{title:"法律搜索",href:"http://law.baidu.com"}],X1="moreSearch",W1="head",V1=[true,true,true,true,true],N={render:function(){
      var A=P.getWidgetConfig(X1)||V1,_=U1;
      for(var $=0;$<_.length;$++){
        _[$].select=A[$]||false;
      }
      return T1.render({username:P.getUserName(),passport:P.getPassport(),space:P.getSpace(),moreList:_,action:w(S1)});
    },repaint:function(){
      var A=P.getWidgetConfig(X1)||V1,_=U1;
      for(var $=0;$<_.length;$++){
        _[$].select=A[$]||false;
      }
      E("searchNaviExpandMenu").innerHTML=R1.render({moreList:_,action:w(S1)});
    }};
  var c1=(navigator.userAgent.toLowerCase().indexOf("msie")!=-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1),g1=c1?1:0;
  function f1($,A,_){
    this.targetList=[];
    this.onStart=$;
    this.onStep=A;
    this.onFinish=_;
    var B=this;
    this.doStart=function($){
      $=$||this.event;
      if($.button!=g1){
        return ;
      }
      if(!B.onStart||!B.onStart($)){
        e1(B,$);
      }
    };
  }
  f1.prototype.connect=function($,_){
    if(this.handleId){
      this.disconnect();
    }
    this.targetId=E(_||$).uid();
    this.handleId=E($).uid();
    $.attach("mousedown",this.doStart);
    $=_=null;
    return this;
  };
  f1.prototype.disconnect=function(){
    var $=E(this.handleId);
    if($){
      $.detach("mousedown",this.doStart);
    }
  };
  function e1($,N){
    var D=E($.targetId),K=D.style,O=Y1();
    window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
    var F={position:K.position,left:K.left,top:K.top};
    document.body.setCapture&&document.body.setCapture(true);
    var L=D.getPosition(),M=L.left,G=L.top,B=a1(N),_,A=function(){
      if(B){
        var N=B.pageX,H=B.pageY,P=N-M,A=H-G,D=$.targetList,L=D.length;
        if(!$.onStep||$.onStep(N,H,P,A)!=false){
          I(P,A);
        }
        while(L--){
          try{
            var F=D[L],C=F.id,J=E(C),O=J.getRegion(),Q=i1(O,N,H)&&F.accept($,N,H);
            if(Q){
              if(_!=F){
                if(_){
                  F.onLeave($,B);
                }
                F.onEnter($,B);
              }
              _=F;
              break ;
            }else {
              if(_==F){
                F.onLeave($,B);
                _=null;
              }
            }
          }
          catch(K){
            alert(K.message);
          }
        }
        B=null;
      }
    };
    function I(_,$){
      K.position="absolute";
      K.left=_+"px";
      K.top=$+"px";
    }
    function C(){
      K.position=F.position;
      K.left=F.left;
      K.top=F.top;
    }
    I(M,G);
    L=D.getPosition();
    M=B.pageX+L.left-2*M;
    G=B.pageY+L.top-2*G;
    B=C();
    function H($){
      B=a1($||window.event);
      if($.clientY<=0||$.clientX>=document.documentElement.clientWidth){
        return ;
      }
      A();
      var _=$.clientY;
      if(_<30){
        h1(D,1);
      }else {
        if(_>document.documentElement.clientHeight-30){
          h1(D,2);
        }else {
          clearTimeout(b1);
        }
      }
    }
    function J(E){
      try{
        clearTimeout(b1);
        E=E||window.event;
        var A=a1(E||window.event);
        document.body.releaseCapture&&document.body.releaseCapture();
        document.detach("mousemove",H);
        document.detach("mouseup",J);
        var F=A.pageX,L=A.pageY;
        j1(O);
        if(!($.onFinish&&$.onFinish(F,L,F-M,L-G))){
          C();
        }
      }
      catch(I){
      }
      finally{
        D=K=null;
        if(_){
          _.onDrop($,B);
          B=null;
        }
      }
    }
    E(document).attach("mousemove",H);
    document.attach("mouseup",J);
  }
  function a1(A){
    var $=document.documentElement.scrollLeft,_=document.documentElement.scrollTop;
    return {clientX:A.clientX,clientY:A.clientY,pageX:A.pageX==null?A.clientX+$:A.pageX,pageY:A.pageY==null?A.clientY+_:A.pageY};
  }
  function Y1(){
    var _=document.body.style;
    if(_.MozUserSelect!=undefined){
      var $=_.MozUserSelect;
      _.MozUserSelect="none";
    }else {
      if(_.KhtmlUserSelect!=undefined){
        $=_.KhtmlUserSelect;
        _.KhtmlUserSelect="none";
      }else {
        $=document.body.onselectstart;
        document.body.onselectstart="return false";
      }
    }
    return $;
  }
  function j1($){
    setTimeout(function(){
      var _=document.body.style;
      if(_.MozUserSelect!=undefined){
        _.MozUserSelect=$;
      }else {
        if(_.KhtmlUserSelect!=undefined){
          _.KhtmlUserSelect=$;
        }else {
          document.body.onselectstart=$;
        }
      }
    },100);
  }
  function d1($,B,_,A){
    this.id=E($).uid();
    this.onEnter=B;
    this.onDrop=_;
    this.onLeave=A;
  }
  d1.prototype={accept:function(_,$,A){
      return true;
    }};
  function i1(A,$,_){
    return $>=A.left&&$<=A.right&&_>=A.top&&_<=A.bottom;
  }
  var Z1,b1;
  function h1(A,_,B){
    if(!B){
      Z1=document.documentElement.scrollHeight;
    }
    var $=document.documentElement.scrollTop,C=document.documentElement.clientHeight;
    if(_==1&&$-5>=0){
      document.documentElement.scrollTop=$-5;
      A.style.top=parseInt(A.style.top)-5+"px";
    }else {
      if(_==2&&parseInt(A.style.top)+5<=Z1){
        document.documentElement.scrollTop=$+5;
        A.style.top=parseInt(A.style.top)+5+"px";
      }else {
        return ;
      }
    }
    clearTimeout(b1);
    b1=setTimeout(function(){
      h1(A,_,true);
    },50);
  }
  function Dialog(A,_,$){
    this.title=A;
    this.template=_;
    this.action=$;
  }
  var o1=[],l1=$0(function(){
    var $=o1[o1.length-1];
    $.cancle&&$.cancle();
    $.dispose();
  }),n1=new f1(0,0,function(){
    return true;
  }),p1=$0(function($){
    n1.connect(this,"dialog").doStart($);
  });
  function m1(){
    var _=E("cover"),$=E("main");
    _.style.height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,$.scrollHeight)+"px";
    _.style.width="100%";
  }
  Dialog.prototype={popup:function(A,_){
      var $=document.documentElement.scrollTop;
      E("dialog").show();
      E("popup").style.top=$+"px";
      E("cover").style.marginTop=-$+"px";
      E("popup").style.display="block";
      var B=this.index=o1.length;
      E(window).attach("resize",m1);
      o1.push(this);
      m1();
      E("cover").style.display="block";
      this.reset(A,_);
    },reset:function($,_){
      if(typeof _!="string"){
        _=this.template.render({data:_,action:this.action});
      }
      E("dialog").innerHTML=k1.render({title:$||this.title,content:_,_drag:p1,_cancel:l1});
      E("dialog").style.top="";
      E("dialog").style.left="";
    },dispose:function(B){
      E(window).detach("resize",m1);
      delete o1[this.index];
      var _=E("popup"),A=E("dialog"),$;
      _.hide();
      E("cover").hide();
      A.hide();
      while($=A.firstChild){
        A.removeChild($);
      }
    }};
  try{
    var u1=new m(function(){
      function A(_){
        return _ in $?$[_]:this[_];
      }
      var $=arguments[0],_=[];
      _.push('<iframe frameborder="0" style="border: 0pt none ; margin-left: 16px; width: 342px; height: 300px;" src="https://passport.baidu.com/?login&amp;psp_tt=2&amp;tpl=my&amp;fu=http%3A//my.baidu.com/reload.html%3Ftype%3D0&amp;u=http%3A//my.baidu.com/" scrolling="no"> </iframe>');
      return _.join("");
    }),T1=new m(function(){
      function L($){
        return $ in G?G[$]:this[$];
      }
      var G=arguments[0],C=[],F=L("username"),K=L("passport"),J=L("action"),$=L("ActiveXObject"),M=L("window"),_=L("item"),H=L("headHTML"),E=L("moreList");
      function N(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:N(_,1);
      }
      L=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function I($){
        return String($).replace(/[<>&"]/g,L);
      }
      C.push(H);
      C.push('<div class="head-inner" style="z-index:1000"> ');
      if(F){
        C.push(' <div xml:space="preserve" class="user-bar"> <a href="');
        C.push(I(K));
        C.push('?center&amp;tpl=my&amp;aid=7&amp;default_tab=4" target="_blank"');
        var B=J.addStatistics("k1=click&k2=bar&k3=2");
        if(B!=null){
          C.push(' onclick="',I(B),'"');
        }
        C.push('><b style="FONT-FAMILY:arial">');
        C.push(I(F));
        C.push('</b></a>|<span id="BaiduMsg"><a href="http://msg.baidu.com/" target="_blank">我的消息(0/0)</a></span>|<a href="http://www.baidu.com"');
        B=J.classicpage();
        if(B!=null){
          C.push(' onmousedown="',I(B),'"');
        }
        C.push(' id="BaiduLink">经典首页</a>|<a href="javascript:void(0)"');
        B=J.setHome();
        if(B!=null){
          C.push(' onclick="',I(B),'"');
        }
        C.push('>设为首页</a>|<a href="');
        C.push(I(K));
        C.push("?logout&amp;tpl=my&amp;aid=7&amp;u=");
        C.push(I(M.location.href));
        C.push('"');
        B=J.logout();
        if(B!=null){
          C.push(' onclick="',I(B),'"');
        }
        C.push(">退出</a>    </div> ");
      }else {
        C.push(' <div class="user-bar"> <a href="#"');
        B=J.login();
        if(B!=null){
          C.push(' onclick="',I(B),'"');
        }
        C.push('>登录</a>|<a href="http://www.baidu.com"');
        B=J.classicpage();
        if(B!=null){
          C.push(' onmousedown="',I(B),'"');
        }
        C.push(' id="BaiduLink">经典首页</a>|<a href="javascript:void(0)"');
        B=J.setHome();
        if(B!=null){
          C.push(' onclick="',I(B),'"');
        }
        C.push(">设为首页</a> </div> ");
      }
      C.push(' <div class="top-spacer" style="width:100%"></div> <div class="search-content" style="z-index:1000;width:650px;margin:auto;"> <div style="position:relative;width:650px;height:59px;z-index:1000;"> <div class="search-bg"></div> <table class="search-inner" align="center" style="z-index:1000;" border="0"> <tbody> <tr> <td width="144" valign="bottom" style="padding:0;"> <a href="http://www.baidu.com/"><div class="search-logo" style="cursor:pointer"></div></a> </td> <td width="500" align="left" valign="top"> <div xml:space="preserve" class="search-navi"> <form style="display:none;" id="searchNaviForm"> <input type="text" name="word" id="searchWord"></input> <input type="text" name="kw" id="searchKW"></input> <div id="searchQ"></div> </form> <a href="http://news.baidu.com/" target="_blank"');
      B=J.search("news");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>新\xa0闻</a> <b>网\xa0页</b> <a href="http://tieba.baidu.com/" target="_blank"');
      B=J.search("tieba");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>贴\xa0吧</a> <a href="http://zhidao.baidu.com/" target="_blank"');
      B=J.search("zhidao");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>知\xa0道</a> <a href="http://mp3.baidu.com/" target="_blank"');
      B=J.search("mp3");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>MP3</a> <a href="http://image.baidu.com/" target="_blank"');
      B=J.search("image");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>图\xa0片</a> <a href="http://video.baidu.com/" target="_blank"');
      B=J.search("video");
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>视\xa0频</a> <div style="display:inline;position:relative;z-index:1000;cursor:pointer"> <div');
      B=J.dblclickMore();
      if(B!=null){
        C.push(' ondblclick="',I(B),'"');
      }
      C.push(' class="search-navi-expand" style="display:inline"');
      B=J.clickMore();
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      B=J.outMore();
      if(B!=null){
        C.push(' onmouseout="',I(B),'"');
      }
      B=J.overMore();
      if(B!=null){
        C.push(' onmouseover="',I(B),'"');
      }
      C.push('> <span style="text-decoration: underline;padding-right:4px">更多</span><span style="font-size:11px;">▼</span><div id="searchNaviExpandMenu"> ');
      var A=E,B=0;
      A=N(A);
      for(;B<A.length;B++){
        _=A[B];
        C.push(" ");
        if(_.select){
          C.push(" <a");
          var D=_.href;
          if(D!=null){
            C.push(' href="',I(D),'"');
          }
          C.push(' target="_blank" class="search-navi-expand-menu-item">');
          C.push(I(_.title));
          C.push("</a> ");
        }
        C.push(" ");
      }
      C.push(' <div class="search-navi-expand-menu-sep" style="font-size:0;margin:4px"></div> <a href="http://www.baidu.com/more" target="_blank" class="search-navi-expand-menu-all">更多产品</a> <a href="http://www.baidu.com" class="search-navi-expand-menu-edit"');
      B=J.editMenu();
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>编辑下拉框</a> </div> </div> </div> </div> <div class="search-box"> <form action="http://www.baidu.com/s" target="_blank" style="position:relative;margin:0;padding:0"');
      B=J.addStatistics("k1=click&k2=search&k3=web");
      if(B!=null){
        C.push(' onsubmit="',I(B),'"');
      }
      C.push(' name="f" method="get"> <input');
      B=J.updateSuggest();
      if(B!=null){
        C.push(' onkeyup="',I(B),'"');
      }
      C.push(' maxlength="256" type="text" size="42" name="wd" id="searchInput"></input><input value="百度一下" type="submit" id="searchSubmit"></input><span style="position:absolute;margin-left:5px;"> <a href="javascript:void(0)"');
      B=J.setSuggestStatus();
      if(B!=null){
        C.push(' onclick="',I(B),'"');
      }
      C.push('>设置</a> <br/> <a href="http://www.baidu.com/search/jiqiao.html" target="_blank">帮助</a> </span> <div style="display:none;" id="searchSuggest"> ');
      if($){
        C.push(' <iframe style="position:absolute;z-index:1;top:0;left:0;height:500px;width:361px;filter:alpha(opacity=0);opacity:0" id="ieIframe"></iframe> ');
      }else {
        C.push(" <div></div> ");
      }
      C.push(' </div> <input value="3" type="hidden" name="cl"></input> <input value="" type="hidden" name="tn" id="tnInput"></input> <input value="17" type="hidden" name="bar"></input> </form> </div> </td> </tr> </tbody> </table> </div> </div> </div>');
      return C.join("");
    }),R1=new m(function(){
      function _($){
        return $ in B?B[$]:this[$];
      }
      var B=arguments[0],H=[],E=_("action"),A=_("item"),I=_("moreList");
      function $(A,B){
        if(B){
          var _=[];
          for(B in A){
            _.push({key:B,value:A[B]});
          }
          return _;
        }
        B=typeof A;
        return B=="number"?new Array(A):B=="string"?A.split(""):A instanceof Array?A:$(A,1);
      }
      _=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function D($){
        return String($).replace(/[<>&"]/g,_);
      }
      var C=I,F=0;
      C=$(C);
      for(;F<C.length;F++){
        A=C[F];
        H.push(" ");
        if(A.select){
          H.push(" <a");
          var G=A.href;
          if(G!=null){
            H.push(' href="',D(G),'"');
          }
          H.push(' target="_blank" class="search-navi-expand-menu-item">');
          H.push(D(A.title));
          H.push("</a> ");
        }
        H.push(" ");
      }
      H.push('<div class="search-navi-expand-menu-sep" style="font-size:0;margin:4px"></div><a href="http://www.baidu.com/more" target="_blank" class="search-navi-expand-menu-all">更多产品</a><a href="http://www.baidu.com" class="search-navi-expand-menu-edit"');
      F=E.editMenu();
      if(F!=null){
        H.push(' onclick="',D(F),'"');
      }
      H.push(">编辑下拉框</a>");
      return H.join("");
    }),v1=new m(function(){
      function B($){
        return $ in N?N[$]:this[$];
      }
      var N=arguments[0],$=[],A=B("item"),O=B("page"),E=B("index"),I=B("loginShow"),C=B("hotWidgets"),G=B("action"),F=B("tabContentStyle"),D=B("selectedIndex"),P=B("themeLabel"),H=B("pages");
      function M(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:M(_,1);
      }
      B=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function _($){
        return String($).replace(/[<>&"]/g,B);
      }
      $.push('<div class="frame-tab-folder"> <div class="frame-tab-folder-head"');
      var J=F;
      if(J!=null){
        $.push(' style="',_(J),'"');
      }
      $.push(' id="frameTabFolderHead"> <table cellpadding="0" style="width:100%;border-collapse:collapse;border:0" cellspacing="0"> <tr> <td> ');
      var K=H,J=0;
      K=M(K);
      N={lastIndex:K.length-1};
      for(;J<K.length;J++){
        N.index=J;
        O=K[J];
        $.push(' <div class="frame-tab ');
        $.push(_(N.index==D?"frame-tab-select":""));
        $.push('" style="z-index:');
        $.push(_(80-N.index));
        $.push(';"');
        var L=G.selectTab(O.id);
        if(L!=null){
          $.push(' onclick="',_(L),'"');
        }
        L=G.overTab();
        if(L!=null){
          $.push(' onmouseover="',_(L),'"');
        }
        $.push(' id="tab');
        $.push(_(O.id));
        $.push('"> <div class="frame-tab-right" style="float:left;"> <div class="frame-tab-content" style="float:left;"> <div class="frame-tab-editor"> <input');
        L=O.title;
        if(L!=null){
          $.push(' value="',_(L),'"');
        }
        $.push(' maxLength="30" type="text" size="8" id="tabInput');
        $.push(_(O.id));
        $.push('"></input> </div> ');
        if(N.index&&O.systemId!="mybaidu"){
          $.push(" <div");
          L=G.dblclickTabMenu();
          if(L!=null){
            $.push(' ondblClick="',_(L),'"');
          }
          $.push(' class="frame-tab-menu"');
          L=G.clickTabMenu();
          if(L!=null){
            $.push(' onclick="',_(L),'"');
          }
          L=G.outTabMenu();
          if(L!=null){
            $.push(' onmouseout="',_(L),'"');
          }
          L=G.overTabMenu();
          if(L!=null){
            $.push(' onmouseover="',_(L),'"');
          }
          $.push('> <div class="frame-tab-menu-outer"> <div class="frame-tab-menu-inner"> <a href="javascript:void(0)"');
          L=H.length==1?"color:#aca899;background:white":"";
          if(L!=null){
            $.push(' style="',_(L),'"');
          }
          L=G.removeTab(O.id);
          if(L!=null){
            $.push(' onclick="',_(L),'"');
          }
          $.push('> 删除 </a> <a href="javascript:void(0)"');
          L=H.length==1?"color:#aca899;background:white":"";
          if(L!=null){
            $.push(' style="',_(L),'"');
          }
          L=G.editPageTitle(O.id);
          if(L!=null){
            $.push(' onclick="',_(L),'"');
          }
          $.push("> 重命名 </a> </div> </div> </div> ");
        }
        $.push(" <div");
        L=G.editPageTitle(O.id);
        if(L!=null){
          $.push(' ondblClick="',_(L),'"');
        }
        $.push(' title="双击可命名标签页" class="frame-tab-label" style="margin-left:-15px;"> <div style="padding:0 20px 0 10px;margin-left:15px" id="tabTitle');
        $.push(_(O.id));
        $.push('"> ');
        $.push(O.title);
        $.push(" </div> </div> </div> </div> </div> ");
      }
      $.push(' <a href="javascript:void(0)" title="添加标签页" class="frame-tab-add"');
      J=G.addTab();
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('> </a> </td> <td style="width:250px;vertical-align:bottom;"> <div class="frame-button-container" id="frameButtonContainer"> <div class="frame-button" style="float:left"');
      J=G.showPanel("widgetLib");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push(' id="widgetLibButton"> <div class="frame-button-bg"> <div> <div');
      J=G.addStatistics("k1=click&k2=share&k3=1");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('>添加模块</div>  </div> </div> </div> <div class="frame-button-sep-line"></div> <div class="frame-button"');
      J=G.showPanel("theme");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push(' id="themeButton"> <div class="frame-button-bg"> <div> <div');
      J=G.addStatistics("k1=click&k2=share&k3=2");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('>更换主题</div>  </div> </div> </div>  <div class="frame-button-sep-line"></div> <div class="frame-button"');
      J=G.showPanel("userfeed");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('> <div class="frame-button-bg"> <div> <div>用户反馈</div> </div> </div> </div> </div> </td> </tr> </table> </div> <div class="frame-tab-folder-bottom"></div> </div><div class="notice-folder"> <div class="widget-panel" style="display:none" id="widgetLib"> <div class="clear" style="clear:both;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
      J=G.showPanel("widgetLib");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('>关闭</a> </div><div class="recommend"> ');
      K=C.slice(0,6),J=0;
      K=M(K);
      for(;J<K.length;J++){
        A=K[J];
        $.push(' <div class="cell"> <div class="widget-icon"> <img width="75" height="50" style="border:1px solid #FFF;display:block" src="/images/widget/icon/');
        $.push(_(A.id));
        $.push('.jpg"/> </div> <div style="text-align:left;width:135px"> <div class="cell-title"> <input');
        L=A.value;
        if(L!=null){
          $.push(' value="',_(L),'"');
        }
        $.push(' type="checkbox"');
        L=G.onWidgetChecked(A.value);
        if(L!=null){
          $.push(' onclick="',_(L),'"');
        }
        $.push("></input> ");
        $.push(_(A.title));
        $.push(" </div> ");
        if(A.description.length>28){
          $.push(" <div");
          L=A.description;
          if(L!=null){
            $.push(' title="',_(L),'"');
          }
          $.push(' style="padding-right:5px;"> ');
          $.push(_(A.description.substring(0,26)));
          $.push("... </div> ");
        }else {
          $.push(' <div style="padding-right:5px;"> ');
          $.push(_(A.description));
          $.push(" </div> ");
        }
        $.push(" </div> </div> ");
      }
      $.push(' <div class="clear"></div> </div>');
      K=C.slice(6,24),J=0;
      K=M(K);
      for(;J<K.length;J++){
        A=K[J];
        $.push(' <div style="float: left;text-align:left;width: 16%;"> ');
        if(A.select){
          $.push(" <input");
          L=A.value;
          if(L!=null){
            $.push(' value="',_(L),'"');
          }
          $.push(' type="checkbox"');
          L=G.onWidgetChecked(A.value);
          if(L!=null){
            $.push(' onclick="',_(L),'"');
          }
          $.push(' checked="true"></input> ');
        }else {
          $.push(" <input");
          L=A.value;
          if(L!=null){
            $.push(' value="',_(L),'"');
          }
          $.push(' type="checkbox"');
          L=G.onWidgetChecked(A.value);
          if(L!=null){
            $.push(' onclick="',_(L),'"');
          }
          $.push("></input> ");
        }
        $.push(" <label>");
        $.push(_(A.title));
        $.push("</label> </div> ");
      }
      $.push('<div style="clear:both;border-bottom:1px dashed #B2B2B2;margin:0 0 15px 2px;width:100%;height:15px;line-height:15px;"></div><div style="clear:both;text-align:center;padding-top:10px"> <input value="添加选中的模块" type="button" style="height:28px;line-height:20px;width:115px;margin-right:5px;;padding:0;"');
      J=G.widgetLibSubmit();
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('></input> <input value="取消设置" type="button" style="height:28px;line-height:20px;width:75px;margin-right:80px;padding:0"');
      J=G.showPanel("widgetLib");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('></input> </div><div class="add-rss"> <a href="widget/widget-list.action" target="_blank"><div style="background:url(images/more-button.gif) left center;float:right;width:83px;height:25px;"></div></a> <a href="javascript:void(0);"');
      J=G.addRss();
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('><div style="background:url(images/more-button.gif) left top;float:right;margin-right:5px;width:88px;height:25px;"></div></a> </div> </div> <div class="widget-panel" style="display:none" id="notice"> <div class="clear" style="clear:both;text-align:right"> <a href="javascript:void(0)" class="top-collapse"');
      J=G.showPanel("notice");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('>关闭</a> </div> <div id="noticeContent"></div> </div> <div class="widget-panel" style="display:none" id="theme"> <div style="clear:both;padding:0;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
      J=G.showPanel("theme");
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('>关闭</a> </div><div align="left" style="margin-bottom:25px;" id="themeStyle"> <div style="line-height:44px;float:left;font-weight:bold;margin-right:6px"> 更换主题： </div> ');
      P=["默认样式","蔚蓝天空","简单生活","地球1小时","夏日光影","红墙夕照","香醇咖啡","激情牛仔","童心大发"];
      $.push(" ");
      K=[0,6,12,23,17,19,10,7,13],J=0;
      K=M(K);
      N={lastIndex:K.length-1};
      for(;J<K.length;J++){
        N.index=J;
        E=K[J];
        $.push(' <div class="theme-img theme');
        $.push(_(E));
        $.push('"> <div class="theme-border"> <div');
        L=G.setTheme(E);
        if(L!=null){
          $.push(' onclick="',_(L),'"');
        }
        $.push('></div> </div> <div class="theme-title">');
        $.push(_(P[N.index]));
        $.push("</div> </div> ");
      }
      $.push(' <div style="clear:both"></div> </div><div align="left" style="width:100%;height:50px;" id="themeLayout"> <div style="line-height:44px;float:left;font-weight:bold;margin-right:6px"> 修改框架： </div> ');
      K=6,J=0;
      K=M(K);
      N={lastIndex:K.length-1};
      for(;J<K.length;J++){
        N.index=J;
        E=K[J];
        $.push(' <div class="theme-img"> <div class="theme-border"> <div class="col');
        $.push(_(N.index));
        $.push('"');
        L=G.setColumn(N.index);
        if(L!=null){
          $.push(' onclick="',_(L),'"');
        }
        $.push("></div> </div> </div> ");
      }
      $.push(' </div><div style="width:100%;text-align:right;padding-top:5px"><a href="widget/skin-list.action" target="_self"><div style="width:83px;height:25px;background:url(images/more-button.gif) left bottom;float:right"></div></a></div> </div> </div><div class="login-suggest" style="display:');
      $.push(_(I?"":"none"));
      $.push('" id="loginSuggest"> <span>主题已修改，请登录来保存已修改效果!</span> <input value="登录" type="button" style="margin:0 5px 0 5px"');
      J=G.login();
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('></input> <input value="关闭提示" type="button"');
      J=G.cancelLogin();
      if(J!=null){
        $.push(' onclick="',_(J),'"');
      }
      $.push('></input> </div><div class="frame-widget-content-top" style="overflow:hidden"></div><div class="frame-widget-content"');
      J=F;
      if(J!=null){
        $.push(' style="',_(J),'"');
      }
      $.push(' id="frameWidgetContent"> <div id="contentCover"></div> ');
      K=H,J=0;
      K=M(K);
      N={lastIndex:K.length-1};
      for(;J<K.length;J++){
        N.index=J;
        O=K[J];
        $.push(' <div class="frame-widget-pane" style="display:');
        $.push(_(N.index==D?"block":"none"));
        $.push('" id="page');
        $.push(_(O.id));
        $.push('"> ');
        $.push(O.html);
        $.push(" </div> ");
      }
      $.push(' <div class="clear" style="clear:both"></div> </div>');
      return $.join("");
    }),B2=new m(function(){
      function I($){
        return $ in H?H[$]:this[$];
      }
      var H=arguments[0],F=[],G=I("page"),B=I("widget"),K=I("column"),O=I("columns"),A=I("widgetAction");
      function L(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:L(_,1);
      }
      I=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function _($){
        return String($).replace(/[<>&"]/g,I);
      }
      F.push('<div class="no-widget-hint" align="center" style="display:');
      F.push(_(G.getWidgets().length==0?"block":"none"));
      F.push(';font-size:14px;" id="hint');
      F.push(_(G.id));
      F.push('"> 本页还没有添加任何模块呢，快根据你的需求，在“添加模块”窗口选择推荐模块，或者在 <a href="/widget/widget-list.action" target="_blank">模块分享库</a> 进行添加吧！ </div>');
      var J=O,C=0;
      J=L(J);
      H={lastIndex:J.length-1};
      for(;C<J.length;C++){
        H.index=C;
        K=J[C];
        F.push('  <div class="widget-column" style="width:');
        F.push(_(K.width));
        F.push(";z-index:");
        F.push(_(10-H.index));
        F.push('"');
        var E=K.id;
        if(E!=null){
          F.push(' id="',_(E),'"');
        }
        F.push("> ");
        var N=K.widgets,E=0;
        N=L(N);
        var M=H;
        H={lastIndex:N.length-1};
        for(;E<N.length;E++){
          H.index=E;
          B=N[E];
          F.push("  ");
          if(B.content){
            F.push(" ");
            var $=B.content;
            F.push(" ");
          }else {
            F.push(" ");
            var D=F;
            F=[];
            F.push(' <img src="images/loadin.gif"/> ');
            $=F.join("");
            F=D;
            F.push(" ");
          }
          F.push(' <div class="widget-outer wt');
          F.push(_(B.type));
          F.push('" style="z-index:');
          F.push(_(100-H.index));
          F.push(';position:relative;top:0;left:0;" name="widget"');
          D=B.id;
          if(D!=null){
            F.push(' id="',_(D),'"');
          }
          F.push('> <div class="widget-inner ');
          F.push(_(B.config.closed?" widget-collapsed":""));
          F.push('"> <div class="widget-head"');
          D=A.out(B.id);
          if(D!=null){
            F.push(' onmouseout="',_(D),'"');
          }
          D=A.over(B.id);
          if(D!=null){
            F.push(' onmouseover="',_(D),'"');
          }
          F.push('> <div class="widget-title"');
          D=A.startDrag(B.id);
          if(D!=null){
            F.push(' onmousedown="',_(D),'"');
          }
          F.push("> ");
          F.push(_(B.title||"无标题"));
          F.push(' </div> <div class="widget-menu close-"> <div title="选项" style="width:90%;height:90%;top:0px;left:0px;"');
          D=A.menu(B.id);
          if(D!=null){
            F.push(' onclick="',_(D),'"');
          }
          F.push('></div> <div class="widget-menu-outer" style="z-index:1000"> <div class="widget-menu-inner"> <a href="#"');
          D=A.edit(B.id)+";return false";
          if(D!=null){
            F.push(' onclick="',_(D),'"');
          }
          F.push('> 设置 </a> <a href="/widget/widget-list.action" target="_blank"> 更多模块... </a>  <a href="javascript:void(0)"');
          D=A.moveToOtherPage(B.id);
          if(D!=null){
            F.push(' onclick="',_(D),'"');
          }
          F.push("> 移动到其他标签页 </a>  ");
          if(B.template&&B.template.menu){
            F.push(" ");
            F.push(B.template.menu.render(B));
            F.push(" ");
          }
          F.push(' </div> </div> </div> <div title="最');
          F.push(_(B.config.closed?"大":"小"));
          F.push('化" class="widget-menu-minmax"');
          D=A.minmax(B.id);
          if(D!=null){
            F.push(' onclick="',_(D),'"');
          }
          F.push('></div> <div title="关闭" class="widget-menu-close"');
          D=A.close(B.id);
          if(D!=null){
            F.push(' onclick="',_(D),'"');
          }
          F.push('></div> <div style="clear:both;width:0;height:0;border:0;"></div> </div> <div class="widget-body"> ');
          F.push($);
          F.push(' </div> <div class="widget-foot"></div> </div> </div> ');
        }
        H=M;
        F.push(" </div> ");
      }
      return F.join("");
    }),x1=new m(function(){
      function E($){
        return $ in A?A[$]:this[$];
      }
      var A=arguments[0],$=[],C=E("widget"),D=E("widgetAction"),F=E("content");
      E=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function B($){
        return String($).replace(/[<>&"]/g,E);
      }
      $.push('<div class="widget-inner ');
      $.push(B(C.config.closed?" widget-collapsed":""));
      $.push('"> <div class="widget-head"');
      var _=D.out(C.id);
      if(_!=null){
        $.push(' onmouseout="',B(_),'"');
      }
      _=D.over(C.id);
      if(_!=null){
        $.push(' onmouseover="',B(_),'"');
      }
      $.push('> <div class="widget-title"');
      _=D.startDrag(C.id);
      if(_!=null){
        $.push(' onmousedown="',B(_),'"');
      }
      $.push("> ");
      $.push(B(C.title||"无标题"));
      $.push(' </div> <div class="widget-menu close-"> <div title="选项" style="width:90%;height:90%;top:0px;left:0px;"');
      _=D.menu(C.id);
      if(_!=null){
        $.push(' onclick="',B(_),'"');
      }
      $.push('></div> <div class="widget-menu-outer" style="z-index:1000"> <div class="widget-menu-inner"> <a href="#"');
      _=D.edit(C.id)+";return false";
      if(_!=null){
        $.push(' onclick="',B(_),'"');
      }
      $.push('> 设置 </a> <a href="/widget/widget-list.action" target="_blank"> 更多模块... </a>  <a href="javascript:void(0)"');
      _=D.moveToOtherPage(C.id);
      if(_!=null){
        $.push(' onclick="',B(_),'"');
      }
      $.push("> 移动到其他标签页 </a>  ");
      if(C.template&&C.template.menu){
        $.push(" ");
        $.push(C.template.menu.render(C));
        $.push(" ");
      }
      $.push(' </div> </div> </div> <div title="最');
      $.push(B(C.config.closed?"大":"小"));
      $.push('化" class="widget-menu-minmax"');
      _=D.minmax(C.id);
      if(_!=null){
        $.push(' onclick="',B(_),'"');
      }
      $.push('></div> <div title="关闭" class="widget-menu-close"');
      _=D.close(C.id);
      if(_!=null){
        $.push(' onclick="',B(_),'"');
      }
      $.push('></div> <div style="clear:both;width:0;height:0;border:0;"></div> </div> <div class="widget-body"> ');
      $.push(F);
      $.push(' </div> <div class="widget-foot"></div> </div>');
      return $.join("");
    }),$2=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],B=D("data"),A=D("action");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,D);
      }
      $.push('<form style="margin:0" onsubmit="return false"> ');
      $.push(B.config);
      $.push(' <div class="dialog-foot"> <input value="确定" type="button"');
      var _=A.save(B.wid);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push('></input> <input value="取消" type="button"');
      _=A.cancel(B.wid);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push('></input> <input value="恢复默认设置" type="button"');
      _=A.reset(B.wid);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push("></input> </div> </form>");
      return $.join("");
    }),q1=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],A=D("action"),B=D("data");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,D);
      }
      $.push('<form onsubmit="return false"> <div> <h4>您希望分享的朋友email列表</h4> <textarea');
      var _=A.checkEmail();
      if(_!=null){
        $.push(' onchanged="',E(_),'"');
      }
      _=A.checkEmail();
      if(_!=null){
        $.push(' onkeyup="',E(_),'"');
      }
      $.push(' type="text" style="width:400px;" name="mailAddress"> </textarea> </div> <p>换行隔开多个邮件</p> <div class="dialog-foot"> <button');
      _=A.sendEmail(B.wid);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(">确定</button><button");
      _=A.cancel(B.wid);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(">取消</button> </div> </form>");
      return $.join("");
    }),A2=new m(function(){
      function I($){
        return $ in G?G[$]:this[$];
      }
      var G=arguments[0],H=[],_=I("action"),F=I("hotWidgets"),A=I("item");
      function $(A,B){
        if(B){
          var _=[];
          for(B in A){
            _.push({key:B,value:A[B]});
          }
          return _;
        }
        B=typeof A;
        return B=="number"?new Array(A):B=="string"?A.split(""):A instanceof Array?A:$(A,1);
      }
      I=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function D($){
        return String($).replace(/[<>&"]/g,I);
      }
      H.push('<div class="clear" style="clear:both;text-align:right;"> <a href="javascript:void(0)" class="top-collapse"');
      var B=_.showPanel("widgetLib");
      if(B!=null){
        H.push(' onclick="',D(B),'"');
      }
      H.push('>关闭</a> </div><div class="recommend"> ');
      var C=F.slice(0,6),B=0;
      C=$(C);
      for(;B<C.length;B++){
        A=C[B];
        H.push(' <div class="cell"> <div class="widget-icon"> <img width="75" height="50" style="border:1px solid #FFF;display:block" src="/images/widget/icon/');
        H.push(D(A.id));
        H.push('.jpg"/> </div> <div style="text-align:left;width:135px"> <div class="cell-title"> <input');
        var E=A.value;
        if(E!=null){
          H.push(' value="',D(E),'"');
        }
        H.push(' type="checkbox"');
        E=_.onWidgetChecked(A.value);
        if(E!=null){
          H.push(' onclick="',D(E),'"');
        }
        H.push("></input> ");
        H.push(D(A.title));
        H.push(" </div> ");
        if(A.description.length>28){
          H.push(" <div");
          E=A.description;
          if(E!=null){
            H.push(' title="',D(E),'"');
          }
          H.push(' style="padding-right:5px;"> ');
          H.push(D(A.description.substring(0,26)));
          H.push("... </div> ");
        }else {
          H.push(' <div style="padding-right:5px;"> ');
          H.push(D(A.description));
          H.push(" </div> ");
        }
        H.push(" </div> </div> ");
      }
      H.push(' <div class="clear"></div> </div>');
      C=F.slice(6,24),B=0;
      C=$(C);
      for(;B<C.length;B++){
        A=C[B];
        H.push(' <div style="float: left;text-align:left;width: 16%;"> ');
        if(A.select){
          H.push(" <input");
          E=A.value;
          if(E!=null){
            H.push(' value="',D(E),'"');
          }
          H.push(' type="checkbox"');
          E=_.onWidgetChecked(A.value);
          if(E!=null){
            H.push(' onclick="',D(E),'"');
          }
          H.push(' checked="true"></input> ');
        }else {
          H.push(" <input");
          E=A.value;
          if(E!=null){
            H.push(' value="',D(E),'"');
          }
          H.push(' type="checkbox"');
          E=_.onWidgetChecked(A.value);
          if(E!=null){
            H.push(' onclick="',D(E),'"');
          }
          H.push("></input> ");
        }
        H.push(" <label>");
        H.push(D(A.title));
        H.push("</label> </div> ");
      }
      H.push('<div style="clear:both;border-bottom:1px dashed #B2B2B2;margin:0 0 15px 2px;width:100%;height:15px;line-height:15px;"></div><div style="clear:both;text-align:center;padding-top:10px"> <input value="添加选中的模块" type="button" style="height:28px;line-height:20px;width:115px;margin-right:5px;;padding:0;"');
      B=_.widgetLibSubmit();
      if(B!=null){
        H.push(' onclick="',D(B),'"');
      }
      H.push('></input> <input value="取消设置" type="button" style="height:28px;line-height:20px;width:75px;margin-right:80px;padding:0"');
      B=_.showPanel("widgetLib");
      if(B!=null){
        H.push(' onclick="',D(B),'"');
      }
      H.push('></input> </div><div class="add-rss"> <a href="widget/widget-list.action" target="_blank"><div style="background:url(images/more-button.gif) left center;float:right;width:83px;height:25px;"></div></a> <a href="javascript:void(0);"');
      B=_.addRss();
      if(B!=null){
        H.push(' onclick="',D(B),'"');
      }
      H.push('><div style="background:url(images/more-button.gif) left top;float:right;margin-right:5px;width:88px;height:25px;"></div></a> </div>');
      return H.join("");
    }),L=new m(function(){
      function A($){
        return $ in _?_[$]:this[$];
      }
      var _=arguments[0],$=[],B=A("ActiveXObject"),C=A("headHTML"),D=A("frameHTML");
      $.push('<div id="main"> <div id="head"> ');
      $.push(C);
      $.push(' </div> <div style="z-index:100" id="frame"> ');
      $.push(D);
      $.push(' </div> <div id="foot"> <div class="foot-inner" style="z-index:1000;"> <div class="foot-spacer" style="width:100%;"> <p style="height:14px"> <a href="http://e.baidu.com">加入百度推广</a> | <a href="http://top.baidu.com">搜索风云榜</a> | <a href="http://www.baidu.com/home.html">关于百度</a> | <a href="http://ir.baidu.com">About Baidu</a> </p> <p> <div class="copyright">\xa92009 Baidu</div> </p> </div> </div> </div> </div><div id="popup"> <div style="z-index: 1;" id="cover"> ');
      if(B){
        $.push(' <iframe width="100%" height="100%" style="filter:alpha(opacity=0);opacity:0"></iframe> ');
      }
      $.push(' </div> <div style="z-index: 2;" id="dialog"></div> </div><div style="z-index: 1000;" id="tooltip"></div>');
      return $.join("");
    }),C2=new m(function(){
      function D($){
        return $ in A?A[$]:this[$];
      }
      var A=arguments[0],B=[],H=D("data"),F=D("action"),_=D("item");
      function C(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:C(_,1);
      }
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function G($){
        return String($).replace(/[<>&"]/g,D);
      }
      B.push('<div id="configContent"> ');
      var $=H.moreItems,E=0;
      $=C($);
      for(;E<$.length;E++){
        _=$[E];
        B.push(' <div style="float:left;word-break:keep-all;width:90px;"> <label style="display:inline-block"> ');
        if(_.checked){
          B.push(' <input type="checkbox" checked="true"></input> ');
        }else {
          B.push(' <input type="checkbox"></input> ');
        }
        B.push(" ");
        B.push(G(_.title));
        B.push(" </label> </div> ");
      }
      B.push(' <div class="clear"></div> </div><div class="dialog-foot"> <button');
      E=F.ok();
      if(E!=null){
        B.push(' onclick="',G(E),'"');
      }
      B.push(">确定</button> <button");
      E=F.cancel();
      if(E!=null){
        B.push(' onclick="',G(E),'"');
      }
      B.push(">取消</button> <button");
      E=F.reset();
      if(E!=null){
        B.push(' onclick="',G(E),'"');
      }
      B.push(">恢复默认设置</button> </div>");
      return B.join("");
    }),_2=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],B=D("data"),A=D("action");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,D);
      }
      $.push('<p> <h6 style="font-size:12px;font-weight:700;display:inline;padding-right:15px;">是否在搜索时显示搜索框提示</h6> <a href="http://www.baidu.com/search/faq_mp3.html#08" target="_blank">什么是搜索框提示？</a> </p><p id="suggestRadio"> ');
      if(B.isShowSuggest){
        $.push(' <input type="radio" checked="checked" name="showSuggest" id="doShowSuggest"></input><label for="doShowSuggest">显示</label> <input type="radio" name="showSuggest" id="noShowSuggest"></input><label for="noShowSuggest">不显示</label> ');
      }else {
        $.push(' <input type="radio" name="showSuggest" id="doShowSuggest"></input><label for="doShowSuggest">显示</label> <input type="radio" checked="checked" name="showSuggest" id="noShowSuggest"></input><label for="noShowSuggest">不显示</label> ');
      }
      $.push(' </p><div class="dialog-foot"> <button');
      var _=A.ok();
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(">确定</button> <button");
      _=A.cancel();
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(">取消</button> <button");
      _=A.reset();
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(">恢复默认设置</button> </div>");
      return $.join("");
    }),z1=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],B=[],A=D("action");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function $($){
        return String($).replace(/[<>&"]/g,D);
      }
      B.push("<div> <h4>您希望分享的朋友email列表</h4> <textarea");
      var _=A.checkEmail();
      if(_!=null){
        B.push(' onchanged="',$(_),'"');
      }
      _=A.checkEmail();
      if(_!=null){
        B.push(' onkeyup="',$(_),'"');
      }
      B.push(' type="text" style="width:400px;" id="mailAddress"> </textarea> </div><div class="dialog-foot"> <button');
      _=A.ok();
      if(_!=null){
        B.push(' onclick="',$(_),'"');
      }
      B.push(">确定</button> <button");
      _=A.cancel();
      if(_!=null){
        B.push(' onclick="',$(_),'"');
      }
      B.push(">取消</button> </div>");
      return B.join("");
    }),D2=new m(function(){
      function L($){
        return $ in G?G[$]:this[$];
      }
      var G=arguments[0],E=[],K=L("widgetsInfo"),_=L("cols"),B=L("info"),A=L("widget"),D=L("action"),$=L("col");
      function N(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:N(_,1);
      }
      L=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function M($){
        return String($).replace(/[<>&"]/g,L);
      }
      var F=_,H=0;
      F=N(F);
      for(;H<F.length;H++){
        $=F[H];
        E.push(' <div style="float:left;width:');
        E.push(M($.width));
        E.push('"> ');
        var I=$.widgets,J=0;
        I=N(I);
        for(;J<I.length;J++){
          A=I[J];
          E.push(" ");
          B=K[A.type];
          E.push(' <div class="widget-head"> <div class="widget-title"> ');
          E.push(M(A.title));
          E.push(" ");
          if(A.isRepeat){
            E.push(" <input");
            var C=A.id;
            if(C!=null){
              E.push(' value="',M(C),'"');
            }
            E.push(' type="checkbox"');
            C=D.onWidgetChecked(A.type);
            if(C!=null){
              E.push(' onclick="',M(C),'"');
            }
            E.push("></input> ");
          }else {
            E.push(" <input");
            C=A.id;
            if(C!=null){
              E.push(' value="',M(C),'"');
            }
            E.push(' type="checkbox"');
            C=D.onWidgetChecked(A.type);
            if(C!=null){
              E.push(' onclick="',M(C),'"');
            }
            E.push(' checked="true"></input> ');
          }
          E.push(' </div> </div> <div class="widget-body" style="text-align:left;padding:10px;"> <div>简介: ');
          E.push(M(B.description));
          E.push("</div> <div> 提供者： <font>");
          E.push(M(B.authorName));
          E.push("</font> 使用人数： <font>");
          E.push(M(B.refCount));
          E.push('</font> </div> </div> <div class="widget-foot"></div> ');
        }
        if(!J){
          E.push(' <div style="font-size:0;height:1px;width:100%"></div> ');
        }
        E.push(" </div> ");
      }
      E.push('<div style="clear:both"></div>');
      return E.join("");
    }),w1=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],A=D("action"),B=D("widget");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,D);
      }
      $.push('<div class="widget-head"> <div class="widget-title">');
      $.push(E(B.title));
      $.push('</div> </div><div class="widget-body" style="text-align:left;padding:10px;"> <div>简介: ');
      $.push(E(B.description));
      $.push("</div> <div> 提供者： <font>");
      $.push(E(B.authorName));
      $.push("</font> 使用人数： <font>");
      $.push(E(B.refCount));
      $.push("</font> </div> <center> <input");
      var _=B.id;
      if(_!=null){
        $.push(' value="',E(_),'"');
      }
      $.push(' type="checkbox"');
      _=A.onWidgetChecked(B.type);
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(' checked="true"></input> ');
      if(B.isRepeat){
        $.push(' <input value="已使用, 再添加一次" type="button" onclick="addPage()"> </input> ');
      }else {
        $.push(' <input value="添加到ibaidu" type="button" onclick="addPage()"> </input> ');
      }
      $.push(' </center> </div><div class="widget-foot"></div>');
      return $.join("");
    }),s1=new m(function(){
      function D($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],A=D("action"),B=D("data");
      D=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,D);
      }
      $.push('<form onsubmit="');
      $.push(E(A.ok()));
      $.push(';return false;"> <div id="configContent"> <div style="margin-bottom:8px;"> RSS名称： <input');
      var _=B.title;
      if(_!=null){
        $.push(' value="',E(_),'"');
      }
      $.push(' type="text" size="10" id="rssTitle"></input> </div> <div> RSS地址： <input');
      _=B.url;
      if(_!=null){
        $.push(' value="',E(_),'"');
      }
      $.push(' type="text" size="40" id="rssURL"></input> </div> </div> <div class="dialog-foot"> <input value="确定" type="submit" name="b1"></input> <input value="取消" type="button"');
      _=A.cancel();
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push(' name="b2"></input> </div> </form>');
      return $.join("");
    }),k1=new m(function(){
      function E($){
        return $ in A?A[$]:this[$];
      }
      var A=arguments[0],$=[],B=E("_cancel"),C=E("title"),G=E("content"),D=E("_drag");
      E=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function F($){
        return String($).replace(/[<>&"]/g,E);
      }
      $.push('<div class="dialog-inner"> <table width="100%" cellpadding="0" class="dialog-border" cellspacing="1" border="0"> <tbody> <tr class="edit-header"> <td style="background:font-size: 14px; line-height: 24px; color: #CDCDCD; text-indent: 10px; font-weight: bold; text-align: left; cursor: move;"');
      var _=D();
      if(_!=null){
        $.push(' onmousedown="',F(_),'"');
      }
      $.push("> ");
      $.push(F(C));
      $.push(' <div style="position: absolute; right: 10px; top: 5px;"> <div class="dialog-close-img" style="cursor: pointer;"');
      _=B();
      if(_!=null){
        $.push(' onclick="',F(_),'"');
      }
      $.push('></div> </div> </td> </tr> <tr> <td style="padding: 8px; background: white none repeat; text-align: left; font-size: 12px;"> ');
      $.push(G);
      $.push(" </td> </tr> </tbody> </table> </div>");
      return $.join("");
    }),t1=new m(function(){
      function _($){
        return $ in B?B[$]:this[$];
      }
      var B=arguments[0],H=[],C=_("data"),E=_("action");
      function $(A,B){
        if(B){
          var _=[];
          for(B in A){
            _.push({key:B,value:A[B]});
          }
          return _;
        }
        B=typeof A;
        return B=="number"?new Array(A):B=="string"?A.split(""):A instanceof Array?A:$(A,1);
      }
      _=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function D($){
        return String($).replace(/[<>&"]/g,_);
      }
      H.push('<div id="moveDialog');
      H.push(D(C.wid));
      H.push('"> <div style="padding-bottom:10px">您希望该模块移动到哪个页签当中去？</div> ');
      var I=C.pages,F=0;
      I=$(I);
      B={lastIndex:I.length-1};
      for(;F<I.length;F++){
        B.index=F;
        var A=I[F];
        H.push(' <div style="float:left;word-break:keep-all;width:25%"> <input');
        var G=B.index;
        if(G!=null){
          H.push(' value="',D(G),'"');
        }
        H.push(' type="radio"');
        G=B.index==C.selectedIndex?"true":null;
        if(G!=null){
          H.push(' checked="',D(G),'"');
        }
        H.push(' name="_pages"></input> ');
        H.push(D(C.titles[B.index]));
        H.push(" </div> ");
      }
      H.push(' <div class="clear"></div> </div><div class="dialog-foot"> <button');
      F=E.move(C.wid);
      if(F!=null){
        H.push(' onclick="',D(F),'"');
      }
      H.push(">确定</button><button");
      F=E.cancel(C.wid);
      if(F!=null){
        H.push(' onclick="',D(F),'"');
      }
      H.push(">取消</button> </div>");
      return H.join("");
    }),r1=new m(function(){
      function A($){
        return $ in H?H[$]:this[$];
      }
      var H=arguments[0],$=[],G=A("action"),_=A("item"),B=A("suggests"),C=A("index");
      function J(_,A){
        if(A){
          var $=[];
          for(A in _){
            $.push({key:A,value:_[A]});
          }
          return $;
        }
        A=typeof _;
        return A=="number"?new Array(_):A=="string"?_.split(""):_ instanceof Array?_:J(_,1);
      }
      A=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function I($){
        return String($).replace(/[<>&"]/g,A);
      }
      $.push('<div class="suggest-div"> ');
      var F=B,E=0;
      F=J(F);
      H={lastIndex:F.length-1};
      for(;E<F.length;E++){
        H.index=E;
        _=F[E];
        $.push(' <div style="cursor:default;border:0;zoom:1;padding:2px;font:14px verdana;');
        $.push(I(H.index==C?"background-color:#36c;color:#fff":""));
        $.push('"');
        var D=G.itemClick(H.index);
        if(D!=null){
          $.push(' onmouseup="',I(D),'"');
        }
        D=G.update(H.index,false);
        if(D!=null){
          $.push(' onmousemove="',I(D),'"');
        }
        D=G.itemKeydown(H.index);
        if(D!=null){
          $.push(' onkeydown="',I(D),'"');
        }
        $.push("> ");
        $.push(I(_));
        $.push(" </div> ");
      }
      $.push(' <p class="close-suggest"><a href="javascript:void(0);"');
      E=G.closeTooltips();
      if(E!=null){
        $.push(' onclick="',I(E),'"');
      }
      $.push(">关闭</a></p> </div>");
      return $.join("");
    }),y1=new m(function(){
      function A($){
        return $ in C?C[$]:this[$];
      }
      var C=arguments[0],$=[],B=A("title"),D=A("close");
      A=function($){
        return "&#"+$.charCodeAt()+";";
      };
      function E($){
        return String($).replace(/[<>&"]/g,A);
      }
      $.push('<table cellpadding="0" cellspacing="0" border="0"> <tr> <td class="bubble-left"></td> <td class="bubble-body">');
      $.push(E(B));
      $.push('</td> <td class="bubble-right"></td> </tr> </table><div class="bubble-bottom"></div><a href="javascript:void(0)" class="bubble-close"');
      var _=D();
      if(_!=null){
        $.push(' onclick="',E(_),'"');
      }
      $.push("> </a>");
      return $.join("");
    });
  }
  catch(E2){
  }
  function F2(_,$,A){
    if(_){
      this.time=parseInt(_*1000);
    }
    if($){
      this.transform=$;
    }
    if(A){
      this.interval=A;
    }
  }
  function G2($){
    return $.constructor==String?document.getElementById($):$;
  }
  F2.prototype={interval:40,transform:function($){
      return 1-Math.pow(1-$,3);
    },time:2000,start:function(E,A,D){
      D=D||this.transform;
      function _(){
        G+=F;
        var _=G/C;
        if(_>=1){
          E(1);
          A();
          clearInterval(B);
        }else {
          E(D(_)/$);
        }
      }
      var F=this.interval,C=this.time,$=D(1),G=0,B=setInterval(_,F);
      return B;
    },moveBy:function(A,B,E,C){
      A=G2(A);
      var F=A.offsetLeft,G=A.offsetTop,$=A.style;
      $.position="absolute";
      function D(_){
        $.left=parseInt(F+_*B)+"px";
        $.top=parseInt(G+_*E)+"px";
      }
      function _(){
        A=$=null;
        C&&C();
      }
      return this.start(D,_);
    },opacity:function(A,B,E,C){
      A=G2(A);
      var F=E-B,$=true;
      function D(_){
        _=B+F*_;
        if(A.style.filter!=null){
          A.style.filter=(_>0.999)?"":"alpha(opacity="+_*100+")";
        }else {
          A.style.opacity=_;
        }
        if($){
          $=false;
          A.style.display="block";
        }
      }
      function _(){
        if(E==0){
          A.style.display="none";
        }
        A=null;
        C&&C();
      }
      return this.start(D,_);
    }};
  var I2=new K("sugg","/",new Date(2500,1,1)),Q2,M2,H2,L2,O2,R2,N2,P2=false,Suggest={data:{suggests:[]},setEnable:function(_,$){
      P2=_;
      _?I2.remove():I2.set("1");
      Suggest.setAutocomplete($!=null?$:!_);
    },isEnable:function(){
      return !I2.get();
    },displaySuggestContent:function($){
      E(O2).show($?"block":"none");
      P2=$;
    },setAutocomplete:function(_,$){
      var A=E(L2);
      A.blur();
      A.setAttribute("autocomplete",_?"on":"off");
      !$&&A.focus();
    },updateKeyword:function($,_){
      if(window.event&&window.event.keyCode==27){
        return ;
      }
      P2=true;
      $=$||E(L2).value;
      Q2=$;
      $||Suggest.displaySuggestContent(false);
      if(_){
        H2=M2=$;
      }
    },itemKeydown:function($,A){
      var _=A.keyCode;
      (_==13)&&Suggest.submit($);
    },initialize:function(A,$){
      var _=E($);
      O2=_.id;
      L2=E(A).id;
      _.insertBefore((new d("div")).addClass("suggest-container"),_.firstChild);
      R2=setInterval(J2,300);
      Suggest.setAutocomplete(!Suggest.isEnable());
      E(O2).style.width=E(L2).offsetWidth+"px";
      E(O2).firstChild.style.width=E(L2).offsetWidth-2+"px";
    },itemClick:function($){
      E(L2).value=Suggest.data.suggests[$];
      Suggest.updateKeyword(null,true);
      E(L2).form.submit();
      setTimeout(function(){
        Suggest.displaySuggestContent(false);
      },300);
      addStatistics("k1=click&k2=search&k3=web");
    },update:function($,B){
      var A=Suggest.data;
      if($!=A.index){
        var _=A.suggests.length;
        A.index=$=$>=_?-1:$<-1?_-1:$%10;
        A.action=suggestAction;
        if(B){
          E(L2).value=H2=M2=Q2=A.suggests[$]||"";
        }
        A=r1.render(A);
        setTimeout(function(){
          E(O2).firstChild.innerHTML=A;
          Suggest.displaySuggestContent(_);
        },0);
      }
    },closeTooltips:function($){
      q($);
      E(O2).firstChild.firstChild.innerHTML="<div style='background:#FF0;width:100%;'>提示功能已关闭，您可以在设置中再次启用。</div>";
      Suggest.setEnable(false,false);
      P2=true;
      N2=setTimeout(function(){
        var $=E(O2).firstChild;
        $&&new F2().opacity($,1,0,function(){
          $.style.filter="alpha(opacity=100)";
          $.style.opacity=1;
          $.style.display="block";
          Suggest.setAutocomplete(true);
          E(O2).firstChild.firstChild&&(E(O2).firstChild.firstChild.innerHTML="");
          Suggest.displaySuggestContent(false);
        });
      },3000);
    },callback:function($){
      H2=Q2;
      Suggest.data=$;
      P2&&Suggest.update(-1);
    }},suggestAction=w(Suggest),K2=M();
  (window.baidu||(window.baidu={})).sug=function($){
    $.s[-1]=$.q;
    Suggest.callback({suggests:$.s});
  };
  function J2(){
    if(Suggest.isEnable()&&Q2&&Q2!=M2){
      var $=E(K2);
      $&&$.remove();
      $=document.createElement("script");
      $.id=K2;
      $.src="http://suggestion.baidu.com/su?wd="+encodeURIComponent(Q2)+"&p=3&t="+(new Date()).getTime();
      $.charset="gb2312";
      M2=Q2;
      document.body.appendChild($);
    }
  }
  E(document).attach("keydown",function($){
    switch($.keyCode){
    case 38:
    case 40:
      if(E(O2).style.display!="none"){
        Suggest.update(Suggest.data.index-39+$.keyCode,true);
      }else {
        M2="";
        Suggest.updateKeyword();
      }
      break ;
    case 27:
      if($.preventDefault){
        $.preventDefault();
      }else {
        $.returnValue=false;
      }
    case 9:
      Suggest.displaySuggestContent(false);
      break ;
    }
  }).attach("click",function(){
    if(P2){
      if(N2){
        clearTimeout(N2);
        Suggest.setAutocomplete(!Suggest.isEnable(),true);
      }
      E(O2).firstChild.firstChild&&(E(O2).firstChild.firstChild.innerHTML="");
      Suggest.displaySuggestContent(false);
      P2=false;
    }
  });
  var U2={tieba:"http://tieba.baidu.com/f",news:"http://news.baidu.com/ns?cl=2&rn=20&tn=news",zhidao:"http://zhidao.baidu.com/q?&ct=17&pn=0&tn=ikaslist&rn=10&lm=0&fr=search",mp3:"http://mp3.baidu.com/m?tn=baidump3&ct=134217728&lm=-1",video:"http://video.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=25",image:"http://image.baidu.com/i?tn=baiduimage&ct=201326592&lm=-1&cl=2&t=3"},S1={overMore:function(){
    },outMore:function(){
    },login:function(){
      O.popup(null,{});
    },addStatistics:addStatistics,classicpage:function(){
      (new K("J_MY","/",new Date(2046,1,1),".baidu.com")).set("0");
      addStatistics("k1=click&k2=bar&k3=1");
    },search:function(C,_){
      var $=E("searchInput");
      if($.value.length>0){
        if(_.preventDefault){
          _.preventDefault();
        }else {
          _.returnValue=false;
        }
        var A=$.value,B=E("searchNaviForm");
        E("searchQ").innerHTML="";
        E("searchWord").value=A;
        E("searchKW").value=A;
        B.method="get";
        B.target="_blank";
        B.action=U2[C];
        if(C=="zhidao"){
          E("searchQ").innerHTML='<input name="ct" value="17" /><input name="tn" value="ikaslist" />';
        }
        if(C=="image"){
          E("searchQ").innerHTML='<input name="ct" value="201326592" /><input name="lm" value="-1" />';
        }
        B.submit();
      }
      addStatistics("k1=click&k2=search&k3="+C);
      return false;
    },logout:function(){
      P.clear();
    },setHome:function(){
      addStatistics("k1=click&k2=homepage&k3=1");
      var $=this,A=window.location;
      try{
        $.style.behavior="url(#default#homepage)";
        $.setHomePage(A);
      }
      catch(B){
        if(window.netscape){
          try{
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
          }
          catch(B){
            return false;
          }
          var _=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
          _.setCharPref("browser.startup.homepage",A);
        }
      }
      return false;
    },editMenu:function(B){
      if(B.preventDefault){
        B.preventDefault();
      }else {
        B.cancelBubble=true;
        B.returnValue=false;
      }
      var _={};
      _.moreItems=U1;
      var A=P.getWidgetConfig(X1)||V1;
      for(var $=0;$<_.moreItems.length;$++){
        _.moreItems[$].checked=A[$]||false;
      }
      a2.popup(null,_);
      setTimeout(c2,20);
      setTimeout(c2,50);
    },clickMore:function(_){
      var $=E(this.getElementsByTagName("div")[0]);
      if($.style.display=="inline"){
        return ;
      }
      j2=$.uid();
      setTimeout(l2,0);
    },dblclickMore:function(){
      window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
      return false;
    },updateSuggest:function(){
      Suggest.updateKeyword(null,false);
    },setSuggestStatus:function(_){
      if(_.preventDefault){
        _.preventDefault();
      }else {
        _.cancelBubble=true;
        _.returnValue=false;
      }
      if(_.stopPropagation){
        _.stopPropagation();
      }else {
        _.cancelBubble=true;
      }
      var $={};
      $.isShowSuggest=Suggest.isEnable();
      T2.popup(null,$);
    }},a2=new Dialog("更多菜单设置",C2,w({ok:function(){
      var A=E("configContent"),C=A.getElementsByTagName("input"),B=[];
      for(var $=0;$<C.length;$++){
        var _=C[$];
        B.push(_.checked);
      }
      P.updateWidgetConfig(X1,B,function(){
        N.repaint();
      });
      a2.dispose();
    },reset:function(){
      var _={};
      _.moreItems=U1;
      var A=V1;
      for(var $=0;$<_.moreItems.length;$++){
        _.moreItems[$].checked=A[$]||false;
      }
      a2.reset(null,_);
    },cancel:function(){
      a2.dispose();
    }})),T2=new Dialog("设置搜索",_2,w({ok:function(){
      var _=E("suggestRadio"),$=_.getElementsByTagName("input");
      Suggest.setEnable($[0].checked);
      T2.dispose();
    },reset:function(){
      var $={isShowSuggest:true};
      T2.reset(null,$);
    },cancel:function(){
      T2.dispose();
    }})),k2,o2,Z2=[[{width:"33%"},{width:"34%"},{width:"33%"}],[{width:"66%"},{width:"34%"}],[{width:"34%"},{width:"66%"}],[{width:"25%"},{width:"42%"},{width:"33%"}],[{width:"39%"},{width:"39%"},{width:"22%"}],[{width:"50%"},{width:"50%"}]],e2,h2=["widgetLib","notice","theme"],f2,J={addStatistics:addStatistics,showPanel:function(M,N){
      if(M=="userfeed"){
        var I=E("searchNaviForm");
        E("searchWord").value="";
        E("searchKW").value="百度工具栏个性化首页";
        E("searchQ").innerHTML="";
        I.method="get";
        I.target="_blank";
        I.action="http://tieba.baidu.com/f";
        I.submit();
        return ;
      }
      var M=M?(f2=M):f2,R=E(M+"Button"),L=E("frameButtonContainer"),F=L.firstChild;
      n2();
      g2();
      while(F){
        if(F.className&&F.className.indexOf("frame-button")!=-1){
          if(F==R){
            E(F).addClass("select");
          }else {
            E(F).removeClass("select");
          }
        }
        F=F.nextSibling;
      }
      var C=false,A,J;
      for(var S=0;S<h2.length;S++){
        if(h2[S]==M){
          var K=E(M),G=(E(M).getRuntimeStyle().display||E(M).currentStyle.display);
          if(G!="none"){
            J=K;
            var _=K.clientHeight||K.offsetHeight;
          }else {
            K.show("block");
            _=K.clientHeight||K.offsetHeight;
            K.style.height="0px";
            var B=K.getRuntimeStyle().paddingTop||K.currentStyle.paddingTop;
            K.style.paddingTop="0px";
            C=true;
          }
        }else {
          E(h2[S]).style.display="none";
        }
      }
      if(e2){
        e2.finish();
      }
      e2=new S2(0.4,function($){
        return $;
      },60);
      if(C){
        K.style.overflow="hidden";
        var Q=true;
        function H($){
          if(K.style.height=="auto"){
            return ;
          }
          K.style.height=parseInt(_*$)+"px";
          if(_*$>parseInt(B)&&Q){
            K.style.paddingTop=B;
            K.style.height="0px";
            Q=false;
          }
        }
        function $(){
          if(K.style.height=="auto"){
            return ;
          }
          K.style.height="auto";
          e2=null;
          setTimeout(function(){
            document.body.style.display="none";
            document.body.style.display="";
            if(N===true){
              X2.editPageTitle(P.getCurrentPage().id,{});
            }
          },0);
        }
        if(M=="notice"){
          E("noticeContent").innerHTML=P.noticeText;
        }
        if(M=="notice"&&N=="initNotice"){
          H(0.4);
          $();
          r();
          return ;
        }
        e2.start(H,$);
        r();
      }else {
        J.style.height=parseInt(_)+"px";
        J.style.overflow="hidden";
        function O($){
          if(J.style.height=="auto"){
            return ;
          }
          J.style.height=parseInt(_*(1-$))+"px";
        }
        function D(){
          if(J.style.height=="auto"){
            return ;
          }
          J.style.height="auto";
          J.hide();
          R.removeClass("select");
          e2=null;
          r();
        }
        e2.start(O,D);
      }
    },setColumn:function($){
      P.setColumnStyle(Z2[$],$,function($){
        $.getCurrentPage().layout.repaint();
        n2();
      });
    },setTheme:function(B,A){
      var C=document.createElement("link");
      C.rel="stylesheet";
      C.type="text/css";
      function $(){
        var A=document.getElementsByTagName("head")[0],E=A.getElementsByTagName("link"),$=E[0].href;
        $=$.substring($.lastIndexOf("?"));
        C.href="/styles/skin"+B+"/skin.css?"+$;
        for(var _=0,D;D=E[_];_++){
          if(D.href.indexOf("skin")>-1){
            D.parentNode.removeChild(D);
          }
        }
        document.getElementsByTagName("head")[0].appendChild(C);
      }
      function _(_){
        var B=(_==A),$=document.getElementById("quickThemeChange");
        if(!$){
          return ;
        }
        $.style.display=B?"none":"";
        while($.className!="frame-button-sep-line"){
          $=$.nextSibling;
        }
        $.style.display=B?"none":"";
      }
      $();
      P.setTheme(B);
      _(B);
    },onWidgetChecked:function(A,C){
      var $=T.hotWidgets[parseInt(A)],_=$.id;
      if(this.isSelect!=null){
        this.isSelect=null;
        return ;
      }
      var B=$.config;
      if(this.checked){
        this.isSelect=true;
      }else {
        this.isSelect=false;
      }
    },widgetLibSubmit:function(){
      var $=E("widgetLib").getElementsByTagName("input"),D=[],B=[];
      for(var F=0,H=$.length;F<H;F++){
        var C=$[F];
        if(C.type!="checkbox"){
          continue ;
        }
        var _=T.hotWidgets[parseInt(C.value)],A=_.id,G=_.config;
        if(C.checked==false&&C.isSelect==false){
          B.push({type:A,config:G});
        }else {
          if(C.isSelect){
            D.push({type:A,config:G});
          }
        }
      }
      P.addWidgets(D,function(_,$){
        $.layout.repaint(function(){
          for(var $=0;$<_.length;$++){
            _[$].initialize();
          }
        });
      });
    },addRss:function(){
      i2.popup(null,{});
    },login:function(){
      O.popup(null,{});
    },cancelLogin:function(){
      P.loginSuggestHide();
    }},O=new Dialog("您尚未登录",u1,{}),i2=new Dialog("添加RSS",s1,w({ok:function(){
      var _=E("rssURL").value,A=E("rssTitle").value;
      if(A.length==0){
        alert("名称不能为空!");
        return true;
      }
      if(_.length==0){
        alert("地址不能为空!");
        return true;
      }
      var $={count:10,url:_,title:A};
      _="data/rsschannel/?path="+encodeURIComponent(_);
      this.b1.disabled=this.b2.disabled=true;
      new I(_,"GET",function(_){
        if(_){
          P.isTypeExist("6",$,function(B,A){
            var _=true;
            if(A[0]){
              var C=B.pages[A[1]];
              if(C.select){
                _=confirm("您已经添加了该模块，要继续添加吗?");
              }else {
                _=confirm("您已经在“"+S(C.title)+"”添加了该模块，要继续添加吗?");
              }
            }
            _&&P.addWidget("6",$,function($,_){
              $.layout.repaint(function(){
                _.initialize();
              });
            });
          });
          i2.dispose();
        }else {
          alert("rss地址不正确，请重新输入");
          i2.reset(null,{title:A,url:$.url});
        }
      }).send();
    },cancel:function(){
      i2.dispose();
    }})),X2={selectTab:function(A){
      function $(B){
        var _=B.pages;
        for(var $=0;$<_.length;$++){
          var C=_[$];
          if(A==C.id){
            E("tab"+C.id).addClass("frame-tab-select");
            E("page"+C.id).style.display="block";
          }else {
            E("tab"+C.id).removeClass("frame-tab-select");
            E("page"+C.id).style.display="none";
          }
        }
      }
      var C=E("tab"+A).className;
      P.selectTab(A,$);
      n2();
      if(C.indexOf("frame-tab-select")>-1){
        return ;
      }
      var B=E("tabTitle"+A),_=encodeURIComponent(S(B.innerHTML.replace(/(^\s+|\s+$)/g,"")));
      addStatistics("k1=click&k2=tab&k3="+_);
    },overTab:function(){
    },addTab:function($){
      if($.stopPropagation){
        $.stopPropagation();
      }else {
        $.cancelBubble=true;
      }
      P.addTab(function($,_){
        if(!_){
          $.layout.repaint();
          J.showPanel("widgetLib",true);
        }
      });
    },clickTabMenu:function(_){
      var $=this.getElementsByTagName("div")[0];
      if($.style.display=="inline"){
        $.style.display="none";
      }else {
        d2=E($).uid();
        setTimeout(Y2,0);
      }
    },overTabMenu:function(){
      E(this).addClass("frame-tab-menu-hover");
    },outTabMenu:function(){
      E(this).removeClass("frame-tab-menu-hover");
    },dblclickTabMenu:function($){
      if($.stopPropagation){
        $.stopPropagation();
      }else {
        $.cancelBubble=true;
      }
    },removeTab:function(_,$){
      if($.stopPropagation){
        $.stopPropagation();
      }else {
        $.cancelBubble=true;
      }
      if(confirm("你确定删除该标签页以及标签页的所有内容么？")){
        P.removeTab(_,function($){
          $.layout.repaint();
          g2();
        });
      }
    },editPageTitle:function(A,C){
      if(C.stopPropagation){
        C.stopPropagation();
      }else {
        C.cancelBubble=true;
      }
      o2=A;
      var B=E("tabInput"+A),$=E("tabTitle"+A);
      B.value=S($.innerHTML.replace(/(^\s+|\s+$)/g,""));
      var _=Math.max($.offsetWidth-15,40);
      B.style.width=_+"px";
      E(document).attach("mouseup",m2);
      E("tab"+A).addClass("frame-tab-edit");
      B.select();
      B.focus();
      T.pageTitleEdit=true;
      B.onkeydown=function($){
        var _;
        if(window.event){
          _=event.keyCode;
        }else {
          if($.which){
            _=$.which;
          }
        }
        if(_==13){
          V2();
        }
      };
      B=null;
    }};
  function V2(){
    E("tab"+o2).removeClass("frame-tab-edit");
    var $=E("tabInput"+o2),_=$.value.substring(0,30).replace(/^\s+|\s+$/g,"");
    if(_){
      _=o(_);
      T.pageTitleEdit=false;
      E(document).detach("mouseup",m2);
      P.setPageTitle(o2,_,function(){
        E("tabTitle"+o2).innerHTML=_;
      });
    }else {
      alert("标题不能为空！");
      X2.editPageTitle(o2,{});
    }
  }
  function m2(_){
    if(o2==null){
      return ;
    }
    var $=_.srcElement||_.target;
    if($&&$.id!="tabInput"+o2){
      V2();
    }
  }
  var b2={};
  for(var p2 in J){
    b2[p2]=J[p2];
  }
  for(p2 in X2){
    b2[p2]=X2[p2];
  }
  var j2,d2;
  function l2(){
    j2&&(E(j2).style.display="block");
  }
  function Y2(){
    d2&&(E(d2).style.display="inline");
  }
  function c2(){
    var $=j2&&E(j2);
    if($){
      $.style.display="none";
    }else {
      j2=null;
    }
  }
  E(document).attach("mouseup",c2);
  E(document).attach("mouseup",function(){
    var $=d2&&E(d2);
    if($){
      $.style.display="none";
    }else {
      d2=null;
    }
  });
  function g2(){
    var $=T.hotWidgets,B=[];
    for(var A=0;A<$.length;A++){
      var _=$[A].id;
      $[A].value=A;
      $[A].select=P.isTypeExist(_,$[A].config);
      if(!$[A].select){
        B.push($[A]);
      }
    }
    E("widgetLib").innerHTML=A2.render({action:w(J),hotWidgets:B});
  }
  function W2(_,A){
    if(_.length==A.length){
      var B=0;
      for(var $=0;$<_.length;$++){
        B+=Math.abs(_[$]-parseInt(A[$].width));
      }
      return B;
    }
    return 10000;
  }
  function n2(){
    var A=E("themeLayout"),D=P.getCurrentPage().columns,F=A.firstChild,C=[],$=10000,G=null;
    for(var _=0;_<D.length;_++){
      C.push(parseInt(D[_].width));
    }
    for(_=0;_<Z2.length;_++){
      var B=W2(C,Z2[_]);
      if(B<$){
        $=B;
        G=_;
      }
    }
    _=0;
    while(F){
      if(F.className&&F.className.indexOf("theme-img")!=-1){
        if(_==G){
          E(F).addClass("theme-select");
        }else {
          E(F).removeClass("theme-select");
        }
        _++;
      }
      F=F.nextSibling;
    }
  }
  var T={loginSuggest:false,hotWidgets:null,pageTitleEdit:false,alive:function(){
      return !this.pageTitleEdit&&E("popup").style.display!="block";
    }};
  function S2(_,$,A){
    if(_){
      this.time=parseInt(_*1000);
    }
    if($){
      this.transform=$;
    }
    if(A){
      this.interval=A;
    }
  }
  function q2($){
    return $ instanceof String?document.getElementById($):$;
  }
  S2.prototype={interval:40,transform:function($){
      return 1-Math.pow(1-$,3);
    },time:2000,task:null,start:function(E,A,D){
      this.onStep=E;
      this.onComplete=A;
      D=D||this.transform;
      function _(){
        G+=F;
        var _=G/C;
        if(_>=1){
          E(1);
          A();
          clearInterval(B);
        }else {
          E(D(_)/$);
        }
      }
      var F=this.interval,C=this.time,$=D(1),G=0;
      this.task=setInterval(_,F);
      var B=this.task;
      return B;
    },finish:function(){
      clearInterval(this.task);
      this.onStep(1);
      this.onComplete();
    },moveBy:function(A,B,E,C){
      A=q2(A);
      var F=A.offsetLeft,G=A.offsetTop,$=A.style;
      $.position="absolute";
      function D(_){
        $.left=parseInt(F+_*B)+"px";
        $.top=parseInt(G+_*E)+"px";
      }
      function _(){
        A=$=null;
        C&&C();
      }
      return this.start(D,_);
    },opacity:function(A,B,E,C){
      A=q2(A);
      var F=E-B,$=true;
      function D(_){
        _=B+F*_;
        if(A.style.filter!=null){
          A.style.filter=(_>0.999)?"":"alpha(opacity="+_*100+")";
        }else {
          A.style.opacity=_;
        }
        if($){
          $=false;
          A.style.display="block";
        }
      }
      function _(){
        if(E==0){
          A.style.display="none";
        }
        A=null;
        C&&C();
      }
      return this.start(D,_);
    }};
  var t2,G0={initialize:function(){
      t2=arguments[0];
    },removeWidget:function(_){
      var $=this.getWidget(_);
      if($){
        $.dispose();
      }
      P.removeWidget(_,function(){
        E(_).remove();
      });
    },createWidget:u2,getWidget:function(B){
      var _=t2.pages,$=_.length;
      while($--){
        var A=_[$].getWidget(B);
        if(A){
          return A;
        }
      }
    },getPages:function(){
      return t2.pages;
    },getSelectedPageIndex:function(){
      return t2.selectedIndex;
    },getWidgets:function($,B){
      var _=t2.pages,A=_.length;
      B=B||[];
      while(A--){
        _[A].getWidgets($,B);
      }
      return B;
    },moveWidget:function(_,$){
      var A=t2.pages[$];
      if(A==P.getCurrentPage()){
        return ;
      }
      P.moveWidget(_,$,0,0,function(_,$){
        if($===false){
          return ;
        }
        _.layout.repaint();
      });
    }},v2={};
  function s2(_){
    var $=v2[_.type];
    if(!$){
      $=function(A,$){
        w2(this,A,$||R.clone(_.config));
      };
      $.prototype=new r2(_);
      v2[_.type]=$;
    }
    return $;
  }
  function w2(A,_,$){
    A.config=$;
    A.id=_;
  }
  function u2(_,B,$){
    var A=new (s2(_))(B,$);
    return A;
  }
  function r2(G){
    this.data=G.data;
    this.title=G.title;
    this.type=G.type;
    this.templateMap={};
    for(var D in G.template){
      var I=G.template[D];
      if(!(I instanceof Function)){
        try{
          I=new Function("try{"+I+"\n}catch(e){return e.message}");
        }
        catch($){
          try{
            I=new Function(I);
          }
          catch($){
            I=new Function("return "+R.encode($.message));
          }
        }
      }
      this.templateMap[D]=new m(I);
    }
    this.defaultConfig=R.clone(G.config);
    var _=G.script,C=["WidgetManager"],F=[G0];
    this.action={getWidget:$3};
    if(_){
      if(G.imports){
        var A=G.imports,H={},B=A&&A.length;
        while(B--){
          $import(A[B],H);
        }
        for(D in H){
          C.push(D);
          F.push(H[D]);
        }
      }
      C.push(_);
      try{
        var E=Function.apply(null,C);
        this.initialize=function(){
          try{
            E.apply(this,F);
          }
          catch($){
          }
          finally{
            r2.prototype.initialize.apply(this,arguments);
          }
        };
      }
      catch($){
      }
    }
  }
  r2.prototype={initialize:function(){
      try{
        this.initialize=Function.prototype;
        this.action=w(this.action);
        this.refresher=new z2(this,this.data);
        delete this.title;
        this.title=A3(this,this.title);
      }
      catch($){
      }
      this.reload(true);
    },getDefaultConfig:function(){
      return this.defaultConfig;
    },reload:function($){
      if($){
        E(this.id).innerHTML="<img src='/images/loadin.gif'/>";
      }
      this.refresher&&this.refresher.restart();
    },resize:function(){
    },repaint:function(){
      delete this.title;
      this.title=A3(this,this.title);
      if(this.refresher.loaded){
        try{
          var $=this.templateMap.body.render(this);
        }
        catch(_){
          $="Widget初始化异常："+_.message;
        }
        E(this.id).innerHTML=x1.render({widget:this,widgetAction:x2,content:$});
      }else {
        E(this.id).innerHTML=x1.render({widget:this,widgetAction:x2,content:"<div style='padding:8px'>数据加载中...</div>"});
      }
      setTimeout(function(){
        document.body.style.display="none";
        document.body.style.display="";
      },0);
    },equals:function($){
      if(this.type==$.type){
        return true;
      }
      return false;
    },inject:function(C,$,A){
      var _=this[C];
      if(_ instanceof Function){
        this[C]=function(){
          var B=true;
          $&&(B=$.apply(this,arguments)===false?false:true);
          B&&_.apply(this,arguments);
          A&&A.apply(this,arguments);
        };
      }else {
        for(var B in $){
          _[B]=$[B];
        }
      }
    },save:function($){
      var _=this.config;
      P.updateWidgetConfig(this.id,_,$||function(){
      });
    },dispose:function(){
      this.refresher.dispose();
      this.repaint=Function.prototype;
    }};
  function _3(_){
    var $=_.firstChild,A=_.nextSibling;
    if($){
      _3($);
    }
    if(A){
      _3(A);
    }
    _.parentNode.removeChild(_);
    for(var B in _){
      if(/^on/i.test(B)){
        _[B]=Function.prototype;
      }
    }
  }
  r2.prototype.reset=r2.prototype.reload;
  function $3($){
    return G0.getWidget($);
  }
  function A3(A,$){
    if(/\$\{(.+)\}/.test($)){
      function _($,_){
        try{
          return C3(A,_);
        }
        catch(B){
          return B.message;
        }
      }
      return $.replace(/\$\{([^\}]+)\}/g,_);
    }else {
      return $;
    }
  }
  var C3=new Function("w","e","with(w){return eval(e)}");
  function B3($,_){
    if(_&&_.length){
      y2($,_,function(_,A){
        $.refresher.loaded=!A;
        $.data=_;
        $.repaint();
      });
    }else {
      $.refresher.loaded=true;
      $.repaint();
    }
  }
  function z2(E,$){
    try{
      var B={},G={},A=$.length;
      while(A--){
        var D=$[A];
        if(D.refresh){
          var _=B[D.refresh];
          if(!_){
            _=B[D.refresh]=[];
          }
          _.push(D);
        }
      }
      this.widget=E;
      this.data=$;
      for(var C in B){
        G[C]=setInterval(D3(this.widget,B[C]),Math.max(1,C)*1000*60);
      }
      this.intervalMap=G;
    }
    catch(F){
    }
  }
  z2.prototype={restart:function(){
      B3(this.widget,this.data);
    },dispose:function(){
      for(var $ in this.intervalMap){
        clearInterval(this.intervalMap[$]);
      }
    }};
  function D3($,_){
    return function(){
      B3($,_);
    };
  }
  function y2(B,C,K){
    var G,H={},M=C.length,J=M,F=false;
    function D(){
      J--;
      if(!J){
        K(H,F);
      }
    }
    while(M--){
      var _=C[M],E=_.type,L=A3(B,_.url),$=L.replace(/^data:text\/json,/,"");
      if($!=L){
        H[_.name]=R.decode($);
        D();
      }else {
        if(E=="jscallback"){
          F3(L,D);
        }else {
          if(L.charAt()!="/"){
            L=encodeURIComponent(L);
            switch(E){
            case "rss":
              L="/data/rsschannel/?path="+L;
              break ;
            case "xml":
              L="/data/xml2json/?path="+L;
              break ;
            case "json":
              L="/data/json/?path="+L;
              break ;
            default:
              L="/data/xml2json/?path="+L;
            }
          }
          var A=new I(L,"GET",function($){
            try{
              var _=this.getStatus();
              if($){
                H[this.name]=R.decode(this.getText());
              }else {
                F=true;
              }
            }
            catch(A){
              F=true;
            }
            D();
          });
          A.name=_.name;
          A.send();
        }
      }
    }
  }
  var G3={};
  function E3(_){
    var A=this,$=_.split(".");
    while($.length>1){
      A=A[$.shift()];
    }
    A[$[0]]=A[$[0]]||function($){
      var A=G3[_];
      A[0]($);
      A.shift();
    };
    A=null;
  }
  function F3(_,$){
    var B=_.indexOf("#");
    if(B>0){
      B=_.substring(B+1);
    }else {
      B="callback";
    }
    E3(B);
    if(G3[B]==null){
      G3=[$];
    }else {
      G3[B].push($);
    }
    var A=document.createElement("script");
    A.src=_;
    document.body.appendChild(A);
  }
  function O3(){
  }
  var I3=false,P3=(navigator.userAgent.toLowerCase().indexOf("msie")!=-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1),L3,M3,U3=[],K3=0,J3=0;
  O3.prototype={start:function(C){
      this.status="start";
      this.page=P.getCurrentPage();
      for(var _=0;_<this.page.columns.length;_++){
        var B=this.page.columns[_];
        for(var $=0;$<B.widgets.length;$++){
          if(C==B.widgets[$].id){
            this.index={x:_,y:$};
            this.widget=B.widgets[$];
          }
        }
      }
      T3(this);
      this.initIndex=this.index;
      var D=E(this.widget.id);
      K3=D.offsetWidth;
      U3=D.getElementsByTagName("select");
      if(U3.length){
        for(_=0,$=U3.length;_<$;_++){
          U3[_].style.display="none";
        }
      }
      var A=D.getRegion();
      D.style.width=A.right-A.left+"px";
      if(P3){
        D.style.left=A.left-8+"px";
        D.style.top=A.top-12+"px";
      }else {
        D.style.left=A.left-6+"px";
        D.style.top=A.top-10+"px";
      }
      E("cover").style.display="block";
      E("cover").setOpacity(0);
      D.style.position="absolute";
      D.zIndex=D.style.zIndex;
      D.style.zIndex="10000";
      document.body.appendChild(D);
      L3=P.getCurrentPage().id;
      S3(this);
    },move:function(G,C){
      if(!I3){
        E(this.widget.id).setOpacity(0.4);
        I3=true;
      }
      var A={};
      A.x=G;
      A.y=C;
      var $=N3(A,this.pagesPos),_=H3(A,this.colsPos,this);
      if(!(this.tabIndex===false)&&this.tabIndex!=null){
        E(this.pagesId[this.tabIndex]).removeClass("tab-drag-in");
      }
      if(!($===false)&&$!=null&&"tab"+L3!=this.pagesId[$]){
        var B=E(this.pagesId[$]);
        B.addClass("tab-drag-in");
        this.placeHolder.style.display="none";
        this.tabIndex=$;
        return ;
      }else {
        this.placeHolder.style.display="block";
        delete this.tabIndex;
      }
      if(_&&(this.index==null||this.index.x!=_.x||this.index.y!=_.y)){
        this.index=_;
        var F=E(this.widget.id),D=F.offsetWidth;
        F.style.width=this.colsPos[_.x].right-this.colsPos[_.x].left+"px";
        S3(this);
        F.style.width=D+"px";
      }
      if(A.x>=document.documentElement.clientWidth){
        return false;
      }
    },end:function(){
      if(!this.widget){
        return ;
      }
      var _=E(this.widget.id),B=this;
      if(!(this.tabIndex===false)&&this.tabIndex!=null){
        E(B.pagesId[B.tabIndex]).removeClass("tab-drag-in");
        P.moveWidget(this.widget.id,this.tabIndex,0,0,function(D,C){
          if(C===false){
            B.index=B.initIndex;
            S3(B);
            B.placeHolder.parentNode.insertBefore(_,B.placeHolder);
          }else {
            var $=E(D.pages[B.tabIndex].columns[0].id);
            $.insertBefore(_,$.firstChild);
            E("hint"+D.pages[B.tabIndex].id).style.display="none";
          }
          A();
        });
      }else {
        if(this.initIndex.x==this.index.x&&this.initIndex.y==this.index.y){
          B.placeHolder.parentNode.insertBefore(_,B.placeHolder);
          A();
        }else {
          var $=this.index;
          B.placeHolder.parentNode.insertBefore(_,B.placeHolder);
          P.moveWidget(this.widget.id,null,this.index.x,this.index.y,function($){
          });
          A();
        }
      }
      function A(){
        E("cover").setOpacity(0.3);
        E("cover").style.display="none";
        _.setOpacity(1);
        _.removeClass("widget-focus");
        I3=false;
        B.placeHolder.parentNode.removeChild(B.placeHolder);
        _.style.position="relative";
        _.style.zIndex=_.zIndex;
        Q3(_);
        _.style.left="0px";
        _.style.top="0px";
        _.style.width="";
        J3=_.offsetWidth;
        if(J3!=K3){
          B.widget.resize(K3);
        }
        J3=K3=0;
        B.widget=B.initIndex=B.index=B.tabIndex=B.placeHolder=B.page=null;
        U3=_.getElementsByTagName("select");
        if(U3.length){
          for(var $=0,A=U3.length;$<A;$++){
            U3[$].style.display="";
          }
          U3=[];
        }
        setTimeout(function(){
          document.body.style.zoom=1;
          document.body.style.zoom="";
        },0);
      }
    }};
  function Q3($){
    var $=$.parentNode.firstChild,_=1000;
    while($){
      if($.attributes&&$.getAttribute("name")=="widget"){
        $.style.zIndex=_--;
      }
      $=$.nextSibling;
    }
  }
  function T3(G){
    var B=[];
    for(var _=0;_<G.page.columns.length;_++){
      var F=G.page.columns[_],C=R3(F);
      C.widgets=[];
      B.push(C);
      var D=C.widgets;
      for(var $=0;$<F.widgets.length;$++){
        var A=F.widgets[$];
        D.push(R3(A));
      }
    }
    G.pagesPos=[];
    G.pagesId=P.getPagesId();
    for(_=0;_<G.pagesId.length;_++){
      G.pagesPos.push(E(G.pagesId[_]).getRegion());
    }
    G.colsPos=B;
  }
  function S3(D){
    var A=D.index,_=D.colsPos;
    if(!D.placeHolder){
      D.placeHolder=document.createElement("div");
      D.placeHolder.style.border="green 2px dashed";
      D.placeHolder.style.margin="10px 6px 10px 6px";
      D.placeHolder.style.top="-4px";
      D.placeHolder.style.left="-4px";
      D.placeHolder.style.position="relative";
    }
    var B=_[A.x].right-_[A.x].left-12,I=E(D.widget.id),C=E(D.page.columns[A.x].id);
    I.style.width=B+"px";
    var H=I.offsetHeight;
    D.placeHolder.style.height=H+"px";
    var $=C.firstChild,G=0,F;
    while($){
      if($.attributes&&$.getAttribute("name")=="widget"){
        if(G==A.y){
          break ;
          return ;
        }
        G++;
      }
      $=$.nextSibling;
    }
    C.insertBefore(D.placeHolder,$);
    document.body.style.zoom=1;
    document.body.style.zoom="";
  }
  function N3(A,_){
    for(var $=0;$<_.length;$++){
      if(A.x>=_[$].left&&A.x<=_[$].right&&A.y>=_[$].top&&A.y<=_[$].bottom){
        return $;
      }
    }
    return false;
  }
  function H3(E,G,B){
    var C,H;
    for(var _=0;_<G.length;_++){
      var $=G[_];
      if(E.x>$.left&&E.x<$.right){
        C=_;
        continue ;
      }
    }
    if(C==null){
      return {x:B.initIndex.x,y:B.initIndex.y};
    }
    for(_=0;_<G[C].widgets.length;_++){
      var F=G[C].widgets[_],D=G[C].widgets[_+1]?G[C].widgets[_+1].top:G[C].widgets[_].bottom;
      if(E.y>F.top&&E.y<D){
        H=_;
        continue ;
      }
    }
    if(H==null){
      if(G[C].widgets.length>0){
        H=(E.y<G[C].widgets[0].top)?0:null;
      }else {
        H=null;
      }
      if(H==null){
        var A=B.placeHolder;
        if(A){
          H=-1;
          do {
            if(A.nodeType==1){
              H++;
            }
            A=A.previousSibling;
          }while(A);
        }
      }
    }
    return {x:C,y:H};
  }
  function R3($){
    var _=E($.id);
    return _.getRegion();
  }
  function d3(){
    c3=true;
    b3.start(X3);
  }
  function Z3(_,B,A,$){
    return b3.move(_,B);
  }
  function g3(_,B,A,$){
    if(c3){
      c3=false;
      b3.end();
    }
    return true;
  }
  var c3,W3=new F2(0.3,function($){
    return $*$*$;
  },50),b3=new O3(),e3=new f1(d3,Z3,g3),X3,l3,x2=w({startDrag:function(_,$){
      X3=_;
      a3();
      e3.connect(this,E(_)).doStart($);
    },over:function($){
      E($).addClass("widget-focus");
    },out:function(_,$){
      E(_).removeClass("widget-focus");
    },menu:function(A,$){
      document.onclick&&document.onclick();
      var _=a3();
      window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
      var B=E(this.parentNode).uid();
      if(_!=B){
        f3(B);
      }
    },minmax:function($){
      var D=G0.getWidget($),C=D.config.closed,B=i3($);
      D.config.closed=!C;
      D.save();
      var _=this;
      function A($){
        if(!C){
          $=1-$;
        }
        B.parentNode.setOpacity($);
      }
      function E(){
        if(C){
          _.title="最小化";
          B.removeClass("widget-collapsed");
        }else {
          _.title="最大化";
          B.addClass("widget-collapsed");
        }
        r(true);
        r(false);
        B.parentNode.setOpacity(1);
        _=null;
      }
      W3.start(A,E);
    },close:function($){
      this.onclick="";
      function _(){
        G0.removeWidget($);
        r(true);
        r(false);
      }
      W3.opacity($,1,0,_);
    },edit:function(_){
      var A=G0.getWidget(_),$=A.templateMap.config;
      $=$.render(A);
      a3();
      k3.popup("设置"+A.title,{config:$,wid:_});
    },share:function(_){
      var $=G0.getWidget(_);
      a3();
      m3.popup({wid:_});
    },moveToOtherPage:function(B){
      var D=G0.getPages(),C=[];
      for(var _=0;_<D.length;_++){
        var F=S(D[_].title);
        for(var $=0,E=0;$<F.length&&E<8;$++){
          E++;
          if(F.charCodeAt($)>128){
            E++;
          }
        }
        C.push(F.substr(0,$)+(F.length>E?"...":""));
      }
      var A=G0.getSelectedPageIndex();
      Y3.popup(null,{selectedIndex:A,titles:C,pages:G0.getPages(),wid:B});
    }}),m3=new Dialog("分享Widget",q1,w({sendEmail:function(C){
      var _=G0.getWidget(C),B=this.form.mailAddress.value.match(/[\w\.\-\_]+@[\w\.\-\_]+/g),$=R.encode({type:_.type,config:_.condig}),A=j3(this.value);
      if(A){
        alert(A);
      }else {
        new I("share-widget.action","POST",function(){
          var $=this.getStatus();
          if($==200){
            k3.dispose();
          }else {
            prompt("邮件发送失败");
            k3.dispose();
          }
        }).send("to="+B.join("&to=")+"&jsonData="+encodeURIComponent($));
      }
    },checkEmail:function(){
      var $=j3(this.value)||"";
      if($){
        this.style.border="1px solid red";
        this.title=$;
      }else {
        this.style.border="";
      }
    },cancel:function($){
      k3.dispose();
    }}));
  function j3(A){
    var B=/^[\w\.\-\_]+@[\w\.\-\_]+$/,_=A.split(/[;,\r\n]+/),$=_.length;
    while($--){
      if(_[$]&&!B.test(_[$])){
        return _[$]+"不是合法邮件!!!!";
      }
    }
  }
  function i3(_){
    var $=E(_).lastChild;
    if($.nodeType!=1){
      $=$.priviousSibling;
    }
    return E($);
  }
  var k3=new Dialog("设置模块",$2,w({save:function(_){
      var $=V3(this.form),A=G0.getWidget(_),B=true;
      A.verify&&(B=A.verify($));
      if(typeof B!="string"){
        A.config=$;
        A.save();
        A.reload();
        k3.dispose();
      }else {
        alert(B);
      }
    },reset:function(B){
      var A=G0.getWidget(B),_=A.templateMap.config;
      A=n(A);
      A.config=A.getDefaultConfig();
      var $=_.render(A);
      k3.reset("设置"+A.title,{config:$,wid:B});
    },cancel:function($){
      k3.dispose();
    }})),Y3=new Dialog("移动到其他标签页",t1,w({move:function(D){
      var A=G0.getWidget(D),$=this.parentNode.parentNode.getElementsByTagName("input");
      for(var _=0,B=$.length;_<B;_++){
        if($[_].checked){
          var C=$[_].value;
          G0.moveWidget(D,C);
        }
      }
      Y3.dispose();
    },cancel:function($){
      Y3.dispose();
    }})),h3;
  function a3(){
    var _=h3&&E(h3);
    if(_){
      _.replaceClass("open-","close-");
      var $=h3,A=E($).parentNode.parentNode.style;
      A.zIndex=A.zIndex&(16777215);
      h3=null;
      return $;
    }
  }
  function f3($){
    setTimeout(function(){
      var _=E($),A=_.switchClass("open-","close-");
      if(_.className.indexOf("open-")>-1){
        h3=$;
      }else {
        h3=null;
      }
    },0);
  }
  E(document).attach("mouseup",a3);
  function V3($){
    var _={};
    o3($,_);
    return _;
  }
  function o3(_,A){
    var $=_.firstChild,B=_.tagName&&_.tagName.toLowerCase();
    switch(B){
    case "input":
    case "textarea":
      s3(_,A);
      break ;
    case "select":
      n3(_,A);
      break ;
    default:
      while($){
        o3($,A);
        $=$.nextSibling;
      }
    }
  }
  function s3(_,A){
    var $=_.type.toLowerCase();
    switch($){
    case "button":
    case "submit":
      break ;
    case "":
    case "text":
    case "hidden":
    case "password":
      q3(A,_.name,_.value,r3(_)||"string");
      break ;
    case "radio":
      if(_.checked){
        q3(A,_.name,_.value,r3(_)||"string");
      }
      break ;
    case "checkbox":
      if(_.checked){
        q3(A,_.name,_.value,r3(_)||"string[]");
      }
      break ;
    }
  }
  function n3($,C){
    var A=$.multiple,F=$.name,B=$.options,D=r3($)||(A?"string[]":"string");
    for(var _=0;_<B.length;_++){
      var E=B[_];
      if(E.selected){
        if(A){
          q3(C,F,E.value||E.text,r3($)||"string");
        }else {
          q3(C,F,E.value||E.text,r3($)||"string");
        }
      }
    }
  }
  function r3($){
    return $.getAttribute("d:data-type");
  }
  function q3(A,B,_,C){
    if(B){
      if(C.indexOf("[]")>0){
        C=C.replace(/[^\w]/g,"");
        var $=A[B];
        if($){
          $.push(p3(_,C));
        }else {
          A[B]=[p3(_,C)];
        }
      }else {
        A[B]=p3(_,C);
      }
    }
  }
  function p3($,_){
    switch(_){
    case "float":
      return parseFloat($);
    case "int":
      return parseInt($);
    case "bool":
    case "boolean":
      return $&&($!="false");
    default:
      return $;
    }
  }
  function m0(){
    this.type="PageLayout";
  }
  m0.prototype={render:function($){
      this.page=$;
      var _=this;
      x2.page=$;
      return B2.render({widgetAction:x2,columns:$.columns,page:$});
    },repaint:function(){
      var _=this.page;
      E("page"+_.id).innerHTML=this.render(_);
      var A=_.getWidgets(),$=A.length;
      while($--){
        A[$].repaint();
        A[$].resize();
      }
    }};
  function l0(A,B){
    var $=A.length,C={};
    (function _(){
      if($--){
        try{
          $import(A[$],_);
        }
        catch(D){
        }
      }else {
        B(C);
      }
    })();
  }
  function n0(){
    this.width="33%";
    this.id="col"+M();
    this.widgets=[];
  }
  function k0($){
    this.columns=[];
    this.layout=$;
    this.id=M();
  }
  k0.prototype={addWidget:function(A,B,$){
      var _=this.columns[B||0];
      if(_==null){
        _=this.columns[B||0]=new n0();
      }
      $=Math.min(Math.max(0,$),_.widgets.length);
      _.widgets.splice($,0,A);
    },removeWidget:function($,_){
      this.columns[$].widgets.splice(_,1);
    },getWidget:function(B){
      var $=this.columns,_=$.length;
      while(_--){
        var A=$[_].widgets,D=A.length;
        while(D--){
          var C=A[D];
          if(C.id==B){
            return C;
          }
        }
      }
    },getWidgets:function(_,B){
      var E=this.columns,C=E.length;
      B=B||[];
      while(C--){
        if(_){
          var A=E[C].widgets,$=A.length;
          while($--){
            var D=A[$];
            if(_(D)){
              B.push(D);
            }
          }
        }else {
          B.push.apply(B,E[C].widgets);
        }
      }
      return B;
    }};
  function j0(){
    this.type="FrameLayout";
  }
  j0.prototype.render=function(E){
    u3=E;
    v3=E.pages;
    var D=null;
    for(var A=0,$;$=v3[A];A++){
      var _=$.select;
      if(_){
        D=true;
      }
      $.html=$.layout.render($);
    }
    if(!D){
      v3[0].select=true;
    }
    var C=document.documentElement.clientWidth||document.body.offsetWidth,B;
    if(C<=1152){
      if(C<=960){
        document.body.style.width="960px";
      }
      var F=Math.round((C-960)/2);
      F=(F>0?F:0)+"px";
      B=";margin:0;"+"padding:"+"0 "+F+" 0 "+F+";width:960px;";
    }else {
      F=Math.round(C/12)+"px";
      B=";margin:0;"+"padding:"+"0 "+F+" 0 "+F+";width:auto;";
    }
    return v1.render({action:w(b2),pages:v3,selectedIndex:E.selectedIndex,tabContentStyle:B,loginShow:P.isLoginSuggestShow(),hotWidgets:T.hotWidgets,currentTheme:P.getTheme()});
  };
  j0.prototype.repaint=function($){
    E(x3).innerHTML=this.render(u3);
    $&&$();
    var D=u3;
    for(var _=0;_<D.pages.length;_++){
      var G=D.pages[_];
      for(var B=0;B<G.columns.length;B++){
        var C=G.columns[B];
        for(var A=0;A<C.widgets.length;A++){
          var F=C.widgets[A];
          F.repaint();
        }
      }
    }
    setTimeout(function(){
      document.body.style.zoom="1";
      document.body.style.zoom="";
    },0);
  };
  var x3="frame",v3,w3,u3;
  function t3(){
    document.body.style.width="auto";
    var $=document.documentElement.clientWidth||document.body.offsetWidth;
    try{
      if($<=1152){
        if($<=960){
          document.body.style.width="960px";
        }
        var A=Math.round(($-960)/2);
        A=(A>0?A:0)+"px";
        E("frameTabFolderHead").style.margin="0";
        E("frameTabFolderHead").style.padding="0 "+A+" 0 "+A;
        E("frameTabFolderHead").style.width="960px";
        E("frameWidgetContent").style.margin="0";
        E("frameWidgetContent").style.padding="0 "+A+" 0 "+A;
        E("frameWidgetContent").style.width="960px";
      }else {
        A=Math.round($/12)+"px";
        E("frameTabFolderHead").style.margin="0";
        E("frameTabFolderHead").style.padding="0 "+A+" 0 "+A;
        E("frameTabFolderHead").style.width="auto";
        E("frameWidgetContent").style.margin="0";
        E("frameWidgetContent").style.padding="0 "+A+" 0 "+A;
        E("frameWidgetContent").style.width="auto";
      }
    }
    catch(_){
    }
  }
  E(window).attach("resize",t3);
  function o0($){
    this.layout=$;
    this.pages=[];
    this.selectedIndex=0;
  }
  o0.prototype.addTab=function($){
    this.pages.push($);
  };
  o0.prototype.removeTab=function($){
    var C=this.pages[$],_=C.getWidgets();
    for(var B=0,A=_.length;B<A;B++){
      _[B].dispose();
    }
    this.pages.splice($,1);
  };
  o0.prototype.walkWidget=function(G){
    var C=this.pages;
    for(var D=0;D<C.length;D++){
      var $=C[D],_=$.columns;
      for(var B=0;B<_.length;B++){
        var F=_[B],E=F.widgets;
        for(var A=0;A<E.length;A++){
          if(G(E[A],D,B,A)){
            return ;
          }
        }
      }
    }
  };
  o0.prototype.isTypeExist=function(_,A){
    var B,$;
    this.walkWidget(function(F,E,D,C){
      F.type==_&&(B=true);
      if(B){
        F.equals({type:_,config:A})&&(B=true)||(B=false);
        $=E;
        return B;
      }
    });
    return [B,$];
  };
  o0.prototype.getPageById=function(B){
    var A=this.pages;
    for(var $=0;$<A.length;$++){
      var _=A[$];
      if(_.id==B){
        return _;
      }
    }
  };
  o0.prototype.getWidgetById=function(B){
    var _=this.pages,$=_.length;
    while($--){
      var A=_[$].getWidget(B);
      if(A){
        return A;
      }
    }
  };
  o0.prototype.removeWidgetById=function(_){
    var A,$=this;
    this.walkWidget(function(B,D,E,C){
      if(B.id==_){
        $.pages[D].removeWidget(E,C);
        A=B;
        return true;
      }
    });
    return A;
  };
  o0.prototype.getCurrentPage=function(){
    var $=this.pages,_=$[this.selectedIndex];
    return _||$[0];
  };
  var F0={"北京":{name:"北京市",city:["北京"]},"天津":{name:"天津市",city:["天津"]},"重庆":{name:"重庆市",city:["重庆"]},"河北":{name:"河北省",city:["石家庄","唐山","秦皇岛","张家口","承德","廊坊","邯郸","邢台","保定","沧州","衡水"]},"山西":{name:"山西省",city:["太原","大同","阳泉","晋城","朔州","忻州","离石","榆次","临汾","运城","长治"]},"内蒙古":{name:"内蒙古自治区",city:["呼和浩特","包头","乌海","集宁","巴彦浩特","临河","鄂尔多斯","赤峰","通辽","锡林浩特","海拉尔","乌兰浩特"]},"辽宁":{name:"辽宁省",city:["沈阳","大连","鞍山","抚顺","本溪","锦州","营口","阜新","盘锦","铁岭","朝阳","葫芦岛","丹东"]},"吉林":{name:"吉林省",city:["长春","吉林","四平","辽源","松原","白城","延边","通化"]},"黑龙江":{name:"黑龙江省",city:["哈尔滨","鸡西","鹤岗","双鸭山","伊春","佳木斯","七台河","牡丹江","绥化","齐齐哈尔","大庆","黑河","大兴安岭"]},"上海":{name:"上海市",city:["上海"]},"江苏":{name:"江苏省",city:["南京","无锡","徐州","常州","苏州","南通","连云港","淮阴","盐城","扬州","镇江","泰州","宿迁"]},"浙江":{name:"浙江省",city:["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","丽水","台州"]},"安徽":{name:"安徽省",city:["合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山市","阜阳","宿州","滁州","六安","宣城","巢湖","池州"]},"福建":{name:"福建省",city:["福州","厦门","莆田","三明","泉州","漳州","南平","宁德","龙岩","陇南","庆阳"]},"江西":{name:"江西省",city:["南昌","景德镇","赣州","萍乡","九江","新余","鹰潭","宜春","上饶","吉安"]},"山东":{name:"山东省",city:["济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","滨州","德州","聊城","临沂","菏泽","莱芜"]},"河南":{name:"河南省",city:["郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","商丘","周口","驻马店","南阳","信阳"]},"湖北":{name:"湖北省",city:["武汉","黄石","十堰","随州","宜昌","襄樊","鄂州","荆门","黄冈","孝感","咸宁","荆州","恩施"]},"湖南":{name:"湖南省",city:["长沙","衡阳","邵阳","郴州","永州","韶山","张家界","怀化","吉首","株洲","湘潭","岳阳","常德","益阳","娄底"]},"广东":{name:"广东省",city:["广州","佛山","深圳","汕尾","惠州","河源","清远","东莞","珠海","江门","肇庆","中山","湛江","茂名","韶关","汕头","梅州","阳江","潮州","顺德","揭阳","云浮"]},"广西":{name:"广西壮族自治区",city:["南宁","梧州","玉林","桂林","百色","河池","钦州","柳州","北海","防城港","贵港","贺州"]},"海南":{name:"海南省",city:["海口","三亚","西沙群岛"]},"四川":{name:"四川省",city:["成都","眉山","雅安","峨嵋山","自贡","重庆","万州","涪陵","南充","泸州","德阳","绵阳","遂宁","内江","乐山","宜宾","广元","达州","资阳","攀枝花","阿坝","甘孜","凉山","广安","巴中"]},"贵州":{name:"贵州省",city:["贵阳","六盘水","铜仁","安顺","凯里","都匀","兴义","毕节","遵义"]},"云南":{name:"云南省",city:["昆明","德宏","曲靖","楚雄","玉溪","红河","文山","思茅","昭通","西双版纳","大理","保山","怒江","丽江","迪庆","临沧"]},"西藏":{name:"西藏自治区",city:["拉萨","昌都","山南","日喀则","那曲","阿里","林芝"]},"陕西":{name:"陕西省",city:["西安","铜川","宝鸡","咸阳","渭南","汉中","安康","商洛","延安","榆林"]},"甘肃":{name:"甘肃省",city:["兰州","白银","金昌","天水","张掖","武威","定西","平凉","临夏","嘉峪关","酒泉"]},"青海":{name:"青海省",city:["西宁","果洛","海西","格尔木","海东","海北","玉树","黄南"]},"宁夏":{name:"宁夏回族自治区",city:["银川","石嘴山","吴忠","固原"]},"新疆":{name:"新疆维吾尔自治区",city:["乌鲁木齐","克拉玛依","吐鲁番","哈密","昌吉","博乐","库尔勒","阿克苏","克州","喀什","伊犁","石河子","塔城","阿勒泰","和田"]},"台湾":{name:"台湾省",city:["台北"]},"香港":{name:"香港特别行政区",city:["香港"]},"澳门":{name:"澳门特别行政区",city:["澳门"]}};
  var y3=new K("cmd","/",new Date(2046,1,1)),z3=new K("run","/",new Date(2046,1,1)),Q={command:function($){
      y3.set(R.encode($));
    },getCommand:function(){
      var $=y3.get();
      z3.set(new Date()*1);
      if($){
        y3.set("");
        return R.decode($);
      }else {
        return false;
      }
    },isIbaiduRun:function(_){
      var $=z3.get();
      if($&&(new Date()*1-$<(_||1500))){
        return true;
      }else {
        return false;
      }
    }};
  function Bubble($){
    this.wid=$;
  }
  var $4=new F2(),_4=new F2();
  Bubble.prototype.popup=function(C,$){
    function G(){
      if(I){
        clearInterval(F);
        $4.opacity(H,1,0,function(){
          E(H).remove();
        });
        clearTimeout(I);
        I=null;
        E(document).detach("mouseup",G);
        E(window).detach("resize",B);
      }
    }
    var J=this;
    function K(){
      var _=E(H),A=E($).getRegion(),B=E(D).getPosition();
      _.style.top=A.top-B.top-39+"px";
      _.style.left=A.right-_.offsetWidth+"px";
    }
    function B(){
      setTimeout(K,100);
    }
    E(document).attach("mouseup",G);
    E(window).attach("resize",B);
    var A=this.wid,D=document.body,I=setTimeout(G,1000*60*5),_=new d("div"),H=_.uid();
    _.className="bubble";
    _.setOpacity(0.1);
    D.appendChild(_);
    _.innerHTML=y1.render({title:C,close:$0(G)});
    var F=_4.opacity(H,0,1,function(){
      r();
    });
    K();
    _=null;
    r();
  };
  function setupDateGrid(X){
    function A($){
      return (($.getMonth()+1)*100+$.getDate());
    }
    function _(E){
      var _=[],B=new Date(E.getFullYear(),E.getMonth(),E.getDate()),$=E.getTime(),D=new Date((E=new Date()).getFullYear(),E.getMonth(),E.getDate()).getTime(),C;
      B.setDate(1);
      B.setDate(2-(B.getDay()||7));
      for(var A=0;A<42;A++){
        if(B.getTime()==$){
          _.selectedIndex=A;
        }
        if(B.getTime()==D){
          _.todayIndex=A;
        }
        _.push(H(B));
        B.setDate(B.getDate()+1);
        if(A==34&&B.getDate()<10){
          break ;
        }
      }
      return _;
    }
    function H($){
      $={year:$.getFullYear(),month:$.getMonth()+1,date:$.getDate(),day:$.getDay()};
      $.key=[$.year,$.month,$.date].join("-");
      return $;
    }
    function J($){
      X.config.eventMap=$;
    }
    var L=X.config.eventMap||(X.config.eventMap={}),C={},M;
    X.selectedTab=0;
    X.eventMap=L;
    var B=L[H(new Date()).key];
    if(B){
      B=B[0];
      var G=new K("date-grid-notified");
      if(!G.get()){
        var $=new Date();
        G.expires=new Date($.getFullYear(),$.getMonth(),$.getDate()+1);
        G.set(true);
      }
      setTimeout(function(){
        if(E(X.id).offsetWidth==0){
          var $=E(X.id).parentNode.parentNode.id.replace(/page/,"tab");
          if($!=Bubble.tabId){
            Bubble.tabId=$;
            var _=new Bubble();
            _.popup("您今天的日程有："+B.title,$);
          }
        }else {
          _=new Bubble(X.id);
          _.popup("您今天的日程有："+B.title,X.id);
        }
      },2000);
    }
    var O="wt"+X.type+"-",V=O+"date-over",Q=new Dialog("添加事件",X.templateMap.event);
    X.inject("action",{overDate:function(){
        E(this).addClass(V);
      },outDate:function(){
        E(this).removeClass(V);
      },selectDate:function(A,$,B,_){
        X.selectedDate=new Date(A,$-1,B);
        if(typeof _=="boolean"){
          X.selectedTab=_?1:0;
        }
        X.repaint();
      },collapseHistory:function(){
        if(X.config.historyMode=="expand"){
          this.title="展开";
          var $=X.config.historyMode="scroll";
          I();
        }else {
          this.title="折叠";
          $=X.config.historyMode="expand";
          F();
        }
        X.save();
      },inputEvent:function(){
        var $=H(X.selectedDate),B=L[$.key],_={date:$.key};
        B=B&&B[0];
        for(var A in B){
          _[A]=B[A];
        }
        Q.action=X.action;
        Q.popup("添加日程",_);
      },removeEvent:function(){
        var _=H(X.selectedDate),$=_.key;
        delete L[$];
        X.save(function(){
          X.reset();
        });
      },checkDate:function(){
        if(!N(this.value)){
          this.style.background="red";
        }else {
          this.style.background="#FFF";
        }
      },saveEvent:function(){
        var B=this.form,_=B.title.value,C=B.description.value,$=B.date;
        $=N($.options[$.selectedIndex].value);
        if(!_){
          alert("日程标题不能为空");
          B.title.focus();
          return false;
        }else {
          if(!$){
            alert("日程日期无效");
            B.date.focus();
            return false;
          }else {
            if(!C){
              alert("日程内容不能为空");
              B.description.focus();
              return false;
            }else {
              var A={title:_,description:C};
              S($,A);
              Q.dispose();
            }
          }
        }
      },cancelEvent:function(){
        Q.dispose();
      },overHandle:function(){
        if(X.config.historyMode=="scroll"){
          this.style.backgroundPosition="right top";
        }else {
          this.style.backgroundPosition="right center";
        }
      },outHandle:function(){
        if(X.config.historyMode=="scroll"){
          this.style.backgroundPosition="left top";
        }else {
          this.style.backgroundPosition="center top";
        }
      }});
    X.inject("repaint",function(){
      var $=this.selectedDate;
      if(!$){
        $=new Date();
        this.selectedDate=$=new Date($.getFullYear(),$.getMonth(),$.getDate());
      }
      this.dateList=_($);
      this.chineseDate=new A4($);
      if(X.config.historyMode!="scroll"){
        try{
          F();
        }
        catch(A){
        }
      }
    },function(){
      if(X.config.historyMode=="scroll"){
        setTimeout(I,0);
      }
    });
    X.inject("save",function(){
      this.config.eventMap=this.eventMap;
    });
    function I(){
      if(M){
        F();
      }
      var $=0,_=X.id+"-history";
      M=[];
      E(_).parentNode.className=O+"scroll";
      function A(B){
        var C=E(_);
        if(C&&M){
          var A=C.getElementsByTagName("li"),G=A.length,F=A[$],D=A[$=($+1)%G];
          M[1]=new F2(0.4,null,100).opacity(F,0.5,0,function(){
            F.style.display="none";
            F.style.position="relative";
          });
          F.style.position="absolute";
          D.style.display="block";
          M[2]=new F2(0.4,null,100).opacity(D,0,1);
        }
        if(T.alive()){
        }
      }
      M[0]=setInterval(A,8000);
      E(_).getElementsByTagName("li")[0].style.display="block";
      r();
    }
    function F(){
      if(M){
        while(M.length){
          window.clearInterval(M.pop());
        }
        M=null;
        var C=X.id+"-history",B=E(C);
        B.parentNode.className=O+"expand";
        var _=B.getElementsByTagName("li"),A=_.length;
        while(A--){
          var $=E(_[A]);
          $.setOpacity(1);
          $.style.position="";
          $.show();
        }
        r();
      }
    }
    function N(C){
      C=C.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if(C!=null){
        var _=parseInt(C[1],10),B=parseInt(C[2],10)-1,A=parseInt(C[3],10),$=new Date(_,B,A);
        if($.getDate()==A&&B==$.getMonth()){
          return $;
        }
      }
    }
    function P($){
    }
    function S(B,C){
      var A=new Date().getTime();
      if(A-B>W){
        alert("当前版本只允许记录一个月以内的日程");
        return ;
      }
      var $={};
      for(var _ in L){
        if(Math.abs(A-N(_))<W){
          $[_]=L[_];
        }else {
          delete L[_];
        }
      }
      _=H(B).key;
      $[_]=[C];
      if(R.encode($).length<D){
        L[_]=[C];
        X.save();
        X.reset();
      }else {
        alert(U);
      }
    }
    var D=1000,U="日程数据量超过限制，我们只能存储800字符以内的数据",W=1000*60*60*24*31;
  }
  var D4=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],B4=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],F4=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],C4=["一","二","三","四","五","六","七","八","九","十"],H4=["正","二","三","四","五","六","七","八","九","十","冬","腊"],I4=24*3600*1000,G4=[2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877],J4=new Date(1921,1,7)*1;
  function A4($){
    this.date=$;
  }
  A4.prototype={getData:function(){
      var $=this.date;
      if(this.time!=$.getTime()){
        this.time=$.getTime();
        this.data=E4($.getFullYear(),$.getMonth(),$.getDate());
      }
      return this.data;
    },getYear:function(){
      return this.getData().year;
    },getMonth:function(){
      return this.getData().month;
    },getDate:function(){
      return this.getData().date;
    },toString:function(){
      var _=this.getYear(),$=this.getMonth(),B=this.getDate(),A=[D4[(_-4)%10]];
      A.push(B4[(_-4)%12]);
      A.push("["+F4[(_-4)%12]+"] 年\n");
      if($<1){
        A.push("[闰]");
        A.push(H4[-$-1]);
      }else {
        A.push(H4[$-1]);
      }
      A.push("月 ");
      A.push(B<11?"初":B<20?"十":B<30?"廿":"三十");
      if(B!=20&&B!=30){
        A.push(C4[(B-1)%10]);
      }
      return A.join("");
    }};
  function E4(A,_,F){
    var B=(new Date(A,_,F)-J4)/I4,D=0,$,E,C;
    if(B<1){
      throw new Error("越界日期"+new Date(A,_,F));
    }
    $:
    while(true){
      E=G4[D];
      C=E>>16;
      $=C?13:12;
      while($--){
        if(B<=29+(E>>$&1)){
          break $;
        }
        B-=(29+(E>>$&1));
      }
      D++;
    }
    D+=1921;
    $=12-$;
    if(C){
      if($==C){
        $=-$;
      }else {
        if($<C){
          $++;
        }
      }
    }
    return {year:D,month:$,date:B};
  }
  var M4=[],Q4=false;
  function showTooltip(A,$){
    M4=[0,1];
    Q4=true;
    var _=E("tooltip");
    _.innerHTML=$;
    _.style.display="block";
    N4(A);
    _.onmouseout=O4;
    A.onmouseout=K4;
    A.onmouseover=_.onmouseover=L4;
  }
  function N4($){
    var _=E("tooltip"),A=E($).getPosition();
    _.style.left=A.left+$.offsetWidth+"px";
    _.style.top=A.top+"px";
  }
  function L4(){
    Q4=true;
  }
  function K4($){
    M4[0]=1;
    Q4=false;
    P4();
  }
  function O4($){
    Q4=false;
    M4[1]=1;
    P4();
  }
  function P4(){
    setTimeout(function(){
      if(!Q4){
        E("tooltip").style.display="none";
      }
    },100);
  }
});