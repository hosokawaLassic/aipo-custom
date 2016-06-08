if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(D){var F=D.getMonth();
var E=[31,28,31,30,31,30,31,31,30,31,30,31];
if(F==1&&dojo.date.isLeapYear(D)){return 29
}return E[F]
};
dojo.date.isLeapYear=function(D){var C=D.getFullYear();
return !(C%400)||(!(C%4)&&!!(C%100))
};
dojo.date.getTimezoneName=function(K){var J=K.toString();
var H="";
var L;
var I=J.indexOf("(");
if(I>-1){H=J.substring(++I,J.indexOf(")"))
}else{var G=/([A-Z\/]+) \d{4}$/;
if((L=J.match(G))){H=L[1]
}else{J=K.toLocaleString();
G=/ ([A-Z\/]+)$/;
if((L=J.match(G))){H=L[1]
}}}return(H=="AM"||H=="PM")?"":H
};
dojo.date.compare=function(E,F,D){E=new Date(Number(E));
F=new Date(Number(F||new Date()));
if(typeof D!=="undefined"){if(D=="date"){E.setHours(0,0,0,0);
F.setHours(0,0,0,0)
}else{if(D=="time"){E.setFullYear(0,0,0);
F.setFullYear(0,0,0)
}}}if(E>F){return 1
}if(E<F){return -1
}return 0
};
dojo.date.add=function(M,N,X){var V=new Date(Number(M));
var O=false;
var R="Date";
switch(N){case"day":break;
case"weekday":var Q,P;
var T=0;
var S=X%5;
if(!S){Q=(X>0)?5:-5;
P=(X>0)?((X-5)/5):((X+5)/5)
}else{Q=S;
P=parseInt(X/5)
}var W=M.getDay();
if(W==6&&X>0){T=1
}else{if(W==0&&X<0){T=-1
}}var U=W+Q;
if(U==0||U==6){T=(X>0)?2:-2
}X=7*P+Q+T;
break;
case"year":R="FullYear";
O=true;
break;
case"week":X*=7;
break;
case"quarter":X*=3;
case"month":O=true;
R="Month";
break;
case"hour":case"minute":case"second":case"millisecond":R="UTC"+N.charAt(0).toUpperCase()+N.substring(1)+"s"
}if(R){V["set"+R](V["get"+R]()+X)
}if(O&&(V.getDate()<M.getDate())){V.setDate(0)
}return V
};
dojo.date.difference=function(W,Y,R){Y=Y||new Date();
R=R||"day";
var S=Y.getFullYear()-W.getFullYear();
var a=1;
switch(R){case"quarter":var V=W.getMonth();
var X=Y.getMonth();
var d=Math.floor(V/3)+1;
var e=Math.floor(X/3)+1;
e+=(S*4);
a=e-d;
break;
case"weekday":var Z=Math.round(dojo.date.difference(W,Y,"day"));
var U=parseInt(dojo.date.difference(W,Y,"week"));
var b=Z%7;
if(b==0){Z=U*5
}else{var c=0;
var f=W.getDay();
var h=Y.getDay();
U=parseInt(Z/7);
b=Z%7;
var g=new Date(W);
g.setDate(g.getDate()+(U*7));
var T=g.getDay();
if(Z>0){switch(true){case f==6:c=-1;
break;
case f==0:c=0;
break;
case h==6:c=-1;
break;
case h==0:c=-2;
break;
case (T+b)>5:c=-2
}}else{if(Z<0){switch(true){case f==6:c=0;
break;
case f==0:c=1;
break;
case h==6:c=2;
break;
case h==0:c=1;
break;
case (T+b)<0:c=2
}}}Z+=c;
Z-=(U*2)
}a=Z;
break;
case"year":a=S;
break;
case"month":a=(Y.getMonth()-W.getMonth())+(S*12);
break;
case"week":a=parseInt(dojo.date.difference(W,Y,"day")/7);
break;
case"day":a/=24;
case"hour":a/=60;
case"minute":a/=60;
case"second":a/=1000;
case"millisecond":a*=Y.getTime()-W.getTime()
}return Math.round(a)
}
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(E){var F=E.shift();
var D=F;
dojo.forEach(E,function(A){dojo.connect(D,"onEnd",A,"play");
D=A
});
return F
};
dojo.fx.combine=function(D){var C=new dojo._Animation({curve:[0,1]});
if(!D.length){return C
}C.duration=D[0].duration;
dojo.forEach(D,function(A){dojo.forEach(["play","pause","stop"],function(B){if(A[B]){dojo.connect(C,B,A,B)
}})
});
return C
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(C){var D=this;
dojo.mixin(D,C);
D.node=C.node;
D._showArgs=dojo.mixin({},C);
D._showArgs.node=D.node;
D._showArgs.duration=D.showDuration;
D.showAnim=D.showFunc(D._showArgs);
D._hideArgs=dojo.mixin({},C);
D._hideArgs.node=D.node;
D._hideArgs.duration=D.hideDuration;
D.hideAnim=D.hideFunc(D._hideArgs);
dojo.connect(D.showAnim,"beforeBegin",dojo.hitch(D.hideAnim,"stop",true));
dojo.connect(D.hideAnim,"beforeBegin",dojo.hitch(D.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(B){return this.showAnim.play(B||0)
},hide:function(B){return this.hideAnim.play(B||0)
}});
dojo.fx.wipeIn=function(E){E.node=dojo.byId(E.node);
var G=E.node,H=G.style;
var F=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){H.overflow="hidden";
if(H.visibility=="hidden"||H.display=="none"){H.height="1px";
H.display="";
H.visibility="";
return 1
}else{var A=dojo.style(G,"height");
return Math.max(A,1)
}},end:function(){return G.scrollHeight
}}}},E));
dojo.connect(F,"onEnd",function(){H.height="auto"
});
return F
};
dojo.fx.wipeOut=function(E){var G=E.node=dojo.byId(E.node);
var H=G.style;
var F=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},E));
dojo.connect(F,"beforeBegin",function(){H.overflow="hidden";
H.display=""
});
dojo.connect(F,"onEnd",function(){H.height="auto";
H.display="none"
});
return F
};
dojo.fx.slideTo=function(G){var L=(G.node=dojo.byId(G.node));
var I=null;
var J=null;
var H=(function(A){return function(){var C=dojo.getComputedStyle(A);
var B=C.position;
I=(B=="absolute"?A.offsetTop:parseInt(C.top)||0);
J=(B=="absolute"?A.offsetLeft:parseInt(C.left)||0);
if(B!="absolute"&&B!="relative"){var D=dojo.coords(A,true);
I=D.y;
J=D.x;
A.style.position="absolute";
A.style.top=I+"px";
A.style.left=J+"px"
}}
})(L);
H();
var K=dojo.animateProperty(dojo.mixin({properties:{top:{end:G.top||0},left:{end:G.left||0}}},G));
dojo.connect(K,"beforeBegin",K,H);
return K
}
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(M,L,Q){Q=dojo.i18n.normalizeLocale(Q);
var N=Q.split("-");
var K=[M,"nls",L].join(".");
var O=dojo._loadedModules[K];
if(O){var P;
for(var T=N.length;
T>0;
T--){var R=N.slice(0,T).join("_");
if(O[R]){P=O[R];
break
}}if(!P){P=O.ROOT
}if(P){var S=function(){};
S.prototype=P;
return new S()
}}throw new Error("Bundle not found: "+L+" in "+M+" , locale="+Q)
};
dojo.i18n.normalizeLocale=function(D){var C=D?D.toLowerCase():dojo.locale;
if(C=="root"){C="ROOT"
}return C
};
dojo.i18n._requireLocalization=function(U,T,X,b){var e=dojo.i18n.normalizeLocale(X);
var h=[U,"nls",T].join(".");
var R="";
if(b){var Y=b.split(",");
for(var d=0;
d<Y.length;
d++){if(e.indexOf(Y[d])==0){if(Y[d].length>R.length){R=Y[d]
}}}if(!R){R="ROOT"
}}var a=b?R:e;
var V=dojo._loadedModules[h];
var S=null;
if(V){if(djConfig.localizationComplete&&V._built){return 
}var f=a.replace(/-/g,"_");
var Z=h+"."+f;
S=dojo._loadedModules[Z]
}if(!S){V=dojo.provide(h);
var g=dojo._getModuleSymbols(U);
var c=g.concat("nls").join("/");
var W;
dojo.i18n._searchLocalePath(a,b,function(B){var A=B.replace(/-/g,"_");
var C=h+"."+A;
var E=false;
if(!dojo._loadedModules[C]){dojo.provide(C);
var D=[c];
if(B!="ROOT"){D.push(B)
}D.push(T);
var F=D.join("/")+".js";
E=dojo._loadPath(F,null,function(G){var H=function(){};
H.prototype=W;
V[A]=new H();
for(var I in G){V[A][I]=G[I]
}})
}else{E=true
}if(E&&V[A]){W=V[A]
}else{V[A]=W
}if(b){return true
}})
}if(b&&e!=R){V[e.replace(/-/g,"_")]=V[R.replace(/-/g,"_")]
}};
(function(){var C=djConfig.extraLocale;
if(C){if(!C instanceof Array){C=[C]
}var D=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(H,I,J,A){D(H,I,J,A);
if(J){return 
}for(var B=0;
B<C.length;
B++){D(H,I,C[B],A)
}}
}})();
dojo.i18n._searchLocalePath=function(O,N,K){O=dojo.i18n.normalizeLocale(O);
var M=O.split("-");
var L=[];
for(var R=M.length;
R>0;
R--){L.push(M.slice(0,R).join("-"))
}L.push(false);
if(N){L.reverse()
}for(var J=L.length-1;
J>=0;
J--){var Q=L[J]||"ROOT";
var P=K(Q);
if(P){break
}}};
dojo.i18n._preloadLocalizations=function(G,J){function I(A){A=dojo.i18n.normalizeLocale(A);
dojo.i18n._searchLocalePath(A,true,function(B){for(var C=0;
C<J.length;
C++){if(J[C]==B){dojo.require(G+"_"+B);
return true
}}return false
})
}I();
var F=djConfig.extraLocale||[];
for(var H=0;
H<F.length;
H++){I(F[H])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(E){var H={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var G=dojo.cldr.supplemental._region(E);
var F=H[G];
return(typeof F=="undefined")?1:F
};
dojo.cldr.supplemental._region=function(D){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var E=F[1];
if(!E){E={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[F[0]]
}else{if(E.length==4){E=F[2]
}}return E
};
dojo.cldr.supplemental.getWeekend=function(L){var J={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var G={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var I=dojo.cldr.supplemental._region(L);
var H=J[I];
var K=G[I];
if(typeof H=="undefined"){H=6
}if(typeof K=="undefined"){K=0
}return{start:H,end:K}
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(D,C){return D.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(A){if(C&&C.indexOf(A)!=-1){return A
}return"\\"+A
})
};
dojo.regexp.buildGroupRE=function(J,G,H){if(!(J instanceof Array)){return G(J)
}var F=[];
for(var I=0;
I<J.length;
I++){F.push(G(J[I]))
}return dojo.regexp.group(F.join("|"),H)
};
dojo.regexp.group=function(D,C){return"("+(C?"?:":"")+D+")"
}
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(G,I,H,F){var J=String(G);
if(!H){H="0"
}while(J.length<I){if(F){J+=H
}else{J=H+J
}}return J
};
dojo.string.substitute=function(G,F,H,E){return G.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(D,C,A){var B=dojo.getObject(C,false,F);
if(A){B=dojo.getObject(A,false,E)(B)
}if(H){B=H(B,C)
}return B.toString()
})
};
dojo.string.trim=function(D){D=D.replace(/^\s+/,"");
for(var C=D.length-1;
C>0;
C--){if(/\S/.test(D.charAt(C))){D=D.substring(0,C+1);
break
}}return D
}
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(I,L){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var K=dojo.date.stamp._isoRegExp.exec(I);
var G=null;
if(K){K.shift();
K[1]&&K[1]--;
K[6]&&(K[6]*=1000);
if(L){L=new Date(L);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(A){return L["get"+A]()
}).forEach(function(A,B){if(K[B]===undefined){K[B]=A
}})
}G=new Date(K[0]||1970,K[1]||0,K[2]||0,K[3]||0,K[4]||0,K[5]||0,K[6]||0);
var H=0;
var J=K[7]&&K[7].charAt(0);
if(J!="Z"){H=((K[8]||0)*60)+(Number(K[9])||0);
if(J!="-"){H*=-1
}}if(J){H-=G.getTimezoneOffset()
}if(H){G.setTime(G.getTime()+H*60000)
}}return G
};
dojo.date.stamp.toISOString=function(S,O){var P=function(A){return(A<10)?"0"+A:A
};
O=O||{};
var T=[];
var R=O.zulu?"getUTC":"get";
var L="";
if(O.selector!="time"){L=[S[R+"FullYear"](),P(S[R+"Month"]()+1),P(S[R+"Date"]())].join("-")
}T.push(L);
if(O.selector!="date"){var M=[P(S[R+"Hours"]()),P(S[R+"Minutes"]()),P(S[R+"Seconds"]())].join(":");
var N=S[R+"Milliseconds"]();
if(O.milliseconds){M+="."+(N<100?"0":"")+P(N)
}if(O.zulu){M+="Z"
}else{if(O.selector!="time"){var Q=S.getTimezoneOffset();
var K=Math.abs(Q);
M+=(Q>0?"-":"+")+P(Math.floor(K/60))+":"+P(K%60)
}}T.push(M)
}return T.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var G=dojo;
function F(A){if(G.isString(A)){return"string"
}if(typeof A=="number"){return"number"
}if(typeof A=="boolean"){return"boolean"
}if(G.isFunction(A)){return"function"
}if(G.isArray(A)){return"array"
}if(A instanceof Date){return"date"
}if(A instanceof G._Url){return"url"
}return"object"
}function J(B,C){switch(C){case"string":return B;
case"number":return B.length?Number(B):NaN;
case"boolean":return typeof B=="boolean"?B:!(B.toLowerCase()=="false");
case"function":if(G.isFunction(B)){B=B.toString();
B=G.trim(B.substring(B.indexOf("{")+1,B.length-1))
}try{if(B.search(/[^\w\.]+/i)!=-1){B=G.parser._nameAnonFunc(new Function(B),this)
}return G.getObject(B,false)
}catch(A){return new Function()
}case"array":return B.split(/\s*,\s*/);
case"date":switch(B){case"":return new Date("");
case"now":return new Date();
default:return G.date.stamp.fromISOString(B)
}case"url":return G.baseUrl+B;
default:return G.fromJson(B)
}}var H={};
function I(D){if(!H[D]){var L=G.getObject(D);
if(!G.isFunction(L)){throw new Error("Could not load class '"+D+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var C=L.prototype;
var A={};
for(var E in C){if(E.charAt(0)=="_"){continue
}var B=C[E];
A[E]=F(B)
}H[D]={cls:L,params:A}
}return H[D]
}this._functionFromScript=function(D){var C="";
var A="";
var E=D.getAttribute("args");
if(E){G.forEach(E.split(/\s*,\s*/),function(M,N){C+="var "+M+" = arguments["+N+"]; "
})
}var B=D.getAttribute("with");
if(B&&B.length){G.forEach(B.split(/\s*,\s*/),function(L){C+="with("+L+"){";
A+="}"
})
}return new Function(C+D.innerHTML+A)
};
this.instantiate=function(B){var A=[];
G.forEach(B,function(h){if(!h){return 
}var Z=h.getAttribute("dojoType");
if((!Z)||(!Z.length)){return 
}var c=I(Z);
var b=c.cls;
var j=b._noScript||b.prototype._noScript;
var g={};
var e=h.attributes;
for(var i in c.params){var D=e.getNamedItem(i);
if(!D||(!D.specified&&(!dojo.isIE||i.toLowerCase()!="value"))){continue
}var X=D.value;
switch(i){case"class":X=h.className;
break;
case"style":X=h.style&&h.style.cssText
}var d=c.params[i];
g[i]=J(X,d)
}if(!j){var f=[],C=[];
G.query("> script[type^='dojo/']",h).orphan().forEach(function(N){var L=N.getAttribute("event"),M=N.getAttribute("type"),K=G.parser._functionFromScript(N);
if(L){if(M=="dojo/connect"){f.push({event:L,func:K})
}else{g[L]=K
}}else{C.push(K)
}})
}var Y=b.markupFactory;
if(!Y&&b.prototype){Y=b.prototype.markupFactory
}var E=Y?Y(g,h,b):new b(g,h);
A.push(E);
var a=h.getAttribute("jsId");
if(a){G.setObject(a,E)
}if(!j){dojo.forEach(f,function(K){dojo.connect(E,K.event,null,K.func)
});
dojo.forEach(C,function(K){K.call(E)
})
}});
G.forEach(A,function(C){if(C&&(C.startup)&&((!C.getParent)||(!C.getParent()))){C.startup()
}});
return A
};
this.parse=function(C){var B=G.query("[dojoType]",C);
var A=this.instantiate(B);
return A
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,B)
}else{dojo._loaders.unshift(B)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(G,I){var J="$joinpoint";
var K=(I||dojo.parser._anon);
if(dojo.isIE){var H=G.__dojoNameCache;
if(H&&K[H]===G){return G.__dojoNameCache
}}var L="__"+dojo.parser._anonCtr++;
while(typeof K[L]!="undefined"){L="__"+dojo.parser._anonCtr++
}K[L]=G;
return L
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.requireLocalization("dojo.cldr","gregorian",null,"ko,zh-cn,zh,ja,en,it-it,en-ca,en-au,it,en-gb,es-es,fr,pt,ROOT,ko-kr,es,de,pt-br");
(function(){function F(B,C,A){return A.replace(/([a-z])\1*/ig,function(b){var X;
var Y=b.charAt(0);
var g=b.length;
var j;
var i=["abbr","wide","narrow"];
switch(Y){case"G":X=C[(g<4)?"eraAbbr":"eraNames"][B.getFullYear()<0?0:1];
break;
case"y":X=B.getFullYear();
switch(g){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:j=true
}break;
case"Q":case"q":X=Math.ceil((B.getMonth()+1)/3);
j=true;
break;
case"M":case"L":var h=B.getMonth();
var l;
switch(g){case 1:case 2:X=h+1;
j=true;
break;
case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="L")?"standalone":"format";
var m=["months",Z,l].join("-");
X=C[m][h]
}break;
case"w":var n=0;
X=dojo.date.locale._getWeekOfYear(B,n);
j=true;
break;
case"d":X=B.getDate();
j=true;
break;
case"D":X=dojo.date.locale._getDayOfYear(B);
j=true;
break;
case"E":case"e":case"c":var a=B.getDay();
var l;
switch(g){case 1:case 2:if(Y=="e"){var c=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
a=(a-c+7)%7
}if(Y!="c"){X=a+1;
j=true;
break
}case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="c")?"standalone":"format";
var m=["days",Z,l].join("-");
X=C[m][a]
}break;
case"a":var k=(B.getHours()<12)?"am":"pm";
X=C[k];
break;
case"h":case"H":case"K":case"k":var d=B.getHours();
switch(Y){case"h":X=(d%12)||12;
break;
case"H":X=d;
break;
case"K":X=(d%12);
break;
case"k":X=d||24;
break
}j=true;
break;
case"m":X=B.getMinutes();
j=true;
break;
case"s":X=B.getSeconds();
j=true;
break;
case"S":X=Math.round(B.getMilliseconds()*Math.pow(10,g-3));
break;
case"v":case"z":X=dojo.date.getTimezoneName(B);
if(X){break
}g=4;
case"Z":var e=B.getTimezoneOffset();
var f=[(e<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(e)/60),2),dojo.string.pad(Math.abs(e)%60,2)];
if(g==4){f.splice(0,0,"GMT");
f.splice(3,0,":")
}X=f.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+A)
}if(j){X=dojo.string.pad(X,g)
}return X
})
}dojo.date.locale.format=function(U,O){O=O||{};
var R=dojo.i18n.normalizeLocale(O.locale);
var C=O.formatLength||"short";
var B=dojo.date.locale._getGregorianBundle(R);
var T=[];
var V=dojo.hitch(this,F,U,B);
if(O.selector=="year"){var S=U.getFullYear();
if(R.match(/^zh|^ja/)){S+="\u5E74"
}return S
}if(O.selector!="time"){var A=O.datePattern||B["dateFormat-"+C];
if(A){T.push(E(A,V))
}}if(O.selector!="date"){var P=O.timePattern||B["timeFormat-"+C];
if(P){T.push(E(P,V))
}}var Q=T.join(" ");
return Q
};
dojo.date.locale.regexp=function(A){return dojo.date.locale._parseInfo(A).regexp
};
dojo.date.locale._parseInfo=function(N){N=N||{};
var P=dojo.i18n.normalizeLocale(N.locale);
var C=dojo.date.locale._getGregorianBundle(P);
var M=N.formatLength||"short";
var A=N.datePattern||C["dateFormat-"+M];
var B=N.timePattern||C["timeFormat-"+M];
var R;
if(N.selector=="date"){R=A
}else{if(N.selector=="time"){R=B
}else{R=A+" "+B
}}var Q=[];
var O=E(R,dojo.hitch(this,D,Q,C,N));
return{regexp:O,tokens:Q,bundle:C}
};
dojo.date.locale.parse=function(R,C){var A=dojo.date.locale._parseInfo(C);
var U=A.tokens,B=A.bundle;
var Q=new RegExp("^"+A.regexp+"$");
var W=Q.exec(R);
if(!W){return null
}var X=["abbr","wide","narrow"];
var P=new Date(1972,0);
var V={};
var S="";
dojo.forEach(W,function(g,K){if(!K){return 
}var N=U[K-1];
var M=N.length;
switch(N.charAt(0)){case"y":if(M!=2){P.setFullYear(g);
V.year=g
}else{if(g<100){g=Number(g);
var h=""+new Date().getFullYear();
var L=h.substring(0,2)*100;
var I=Number(h.substring(2,4));
var d=Math.min(I+20,99);
var J=(g<d)?L+g:L-100+g;
P.setFullYear(J);
V.year=J
}else{if(C.strict){return null
}P.setFullYear(g);
V.year=g
}}break;
case"M":if(M>2){var e=B["months-format-"+X[M-3]].concat();
if(!C.strict){g=g.replace(".","").toLowerCase();
e=dojo.map(e,function(Y){return Y.replace(".","").toLowerCase()
})
}g=dojo.indexOf(e,g);
if(g==-1){return null
}}else{g--
}P.setMonth(g);
V.month=g;
break;
case"E":case"e":var f=B["days-format-"+X[M-3]].concat();
if(!C.strict){g=g.toLowerCase();
f=dojo.map(f,"".toLowerCase)
}g=dojo.indexOf(f,g);
if(g==-1){return null
}break;
case"d":P.setDate(g);
V.date=g;
break;
case"D":P.setMonth(0);
P.setDate(g);
break;
case"a":var H=C.am||B.am;
var O=C.pm||B.pm;
if(!C.strict){var G=/\./g;
g=g.replace(G,"").toLowerCase();
H=H.replace(G,"").toLowerCase();
O=O.replace(G,"").toLowerCase()
}if(C.strict&&g!=H&&g!=O){return null
}S=(g==O)?"p":(g==H)?"a":"";
break;
case"K":if(g==24){g=0
}case"h":case"H":case"k":if(g>23){return null
}P.setHours(g);
break;
case"m":P.setMinutes(g);
break;
case"s":P.setSeconds(g);
break;
case"S":P.setMilliseconds(g)
}});
var T=P.getHours();
if(S==="p"&&T<12){P.setHours(T+12)
}else{if(S==="a"&&T==12){P.setHours(0)
}}if(V.year&&P.getFullYear()!=V.year){return null
}if(V.month&&P.getMonth()!=V.month){return null
}if(V.date&&P.getDate()!=V.date){return null
}return P
};
function E(C,N,A,K){var M=function(G){return G
};
N=N||M;
A=A||M;
K=K||M;
var B=C.match(/(''|[^'])+/g);
var L=false;
dojo.forEach(B,function(H,G){if(!H){B[G]=""
}else{B[G]=(L?A:N)(H);
L=!L
}});
return K(B.join(""))
}function D(A,H,C,B){B=dojo.regexp.escapeString(B);
if(!C.strict){B=B.replace(" a"," ?a")
}return B.replace(/([a-z])\1*/ig,function(R){var P;
var T=R.charAt(0);
var S=R.length;
var U="",V="";
if(C.strict){if(S>1){U="0{"+(S-1)+"}"
}if(S>2){V="0{"+(S-2)+"}"
}}else{U="0?";
V="0{0,2}"
}switch(T){case"y":P="\\d{2,4}";
break;
case"M":P=(S>2)?"\\S+":U+"[1-9]|1[0-2]";
break;
case"D":P=U+"[1-9]|"+V+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":P=U+"[1-9]|[12]\\d|3[01]";
break;
case"w":P=U+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":P="\\S+";
break;
case"h":P=U+"[1-9]|1[0-2]";
break;
case"k":P=U+"\\d|1[01]";
break;
case"H":P=U+"\\d|1\\d|2[0-3]";
break;
case"K":P=U+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":P="[0-5]\\d";
break;
case"S":P="\\d{"+S+"}";
break;
case"a":var G=C.am||H.am||"AM";
var Q=C.pm||H.pm||"PM";
if(C.strict){P=G+"|"+Q
}else{P=G+"|"+Q;
if(G!=G.toLowerCase()){P+="|"+G.toLowerCase()
}if(Q!=Q.toLowerCase()){P+="|"+Q.toLowerCase()
}}break;
default:P=".*"
}if(A){A.push(R)
}return"("+P+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var B=[];
dojo.date.locale.addCustomFormats=function(D,A){B.push({pkg:D,name:A})
};
dojo.date.locale._getGregorianBundle=function(D){var A={};
dojo.forEach(B,function(C){var F=dojo.i18n.getLocalization(C.pkg,C.name,D);
A=dojo.mixin(A,F)
},this);
return A
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(J,K,N,H){var M;
var I=dojo.date.locale._getGregorianBundle(H);
var L=[J,N,K];
if(N=="standAlone"){M=I[L.join("-")]
}L[1]="format";
return(M||I[L.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(F,E){var G=dojo.cldr.supplemental.getWeekend(E);
var H=(F||new Date()).getDay();
if(G.end<G.start){G.end+=7;
if(H<G.start){H+=7
}}return H>=G.start&&H<=G.end
};
dojo.date.locale._getDayOfYear=function(B){return dojo.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
dojo.date.locale._getWeekOfYear=function(G,J){if(arguments.length==1){J=0
}var I=new Date(G.getFullYear(),0,1).getDay();
var F=(I-J+7)%7;
var H=Math.floor((dojo.date.locale._getDayOfYear(G)+F-1)/7);
if(I==J){H++
}return H
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var F=dojo.doc,H=F.documentElement,G=window,E=dojo.body();
if(dojo.isMozilla){return{w:H.clientWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&G.innerWidth){return{w:G.innerWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&H&&H.clientWidth){return{w:H.clientWidth,h:H.clientHeight}
}else{if(E.clientWidth){return{w:E.clientWidth,h:E.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(F){var G=dojo.dnd.getViewport(),H=0,E=0;
if(F.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){H=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(F.clientX>G.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){H=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(F.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(F.clientY>G.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(H,E)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(Z){for(var P=Z.target;
P;
){if(P.nodeType==1&&(P.tagName.toLowerCase() in dojo.dnd._validNodes)){var S=dojo.getComputedStyle(P);
if(S.overflow.toLowerCase() in dojo.dnd._validOverflow){var Y=dojo._getContentBox(P,S),U=dojo._abs(P,true);
Y.l+=U.x+P.scrollLeft;
Y.t+=U.y+P.scrollTop;
var W=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,Y.w/2),a=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,Y.h/2),Q=Z.pageX-Y.l,R=Z.pageY-Y.t,T=0,V=0;
if(Q>0&&Q<Y.w){if(Q<W){T=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(Q>Y.w-W){T=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(R>0&&R<Y.h){if(R<a){V=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(R>Y.h-a){V=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var O=P.scrollLeft,b=P.scrollTop;
P.scrollLeft=P.scrollLeft+T;
P.scrollTop=P.scrollTop+V;
if(O!=P.scrollLeft||b!=P.scrollTop){return 
}}}try{P=P.parentNode
}catch(X){P=null
}}dojo.dnd.autoScroll(Z)
}
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(B){return B[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var B;
do{B="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(B));
return B
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(D){var C=D.target;
if(C.nodeType==3){C=C.parentNode
}return" button textarea input select option ".indexOf(" "+C.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(C,D){this.node=dojo.byId(C);
if(!D){D={}
}this.creator=D.creator||null;
this.skipForm=D.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(D&&D._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(B){return this.map[B]
},setItem:function(C,D){this.map[C]=D
},delItem:function(B){delete this.map[B]
},forInItems:function(I,G){G=G||dojo.global;
var F=this.map,H=dojo.dnd._empty;
for(var J in this.map){if(J in H){continue
}I.call(G,F[J],J,F)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(G,H,F){if(!this.parent.firstChild){F=null
}else{if(H){if(!F){F=this.parent.firstChild
}}else{if(F){F=F.nextSibling
}}}if(F){for(var I=0;
I<G.length;
++I){var J=this._normalizedCreator(G[I]);
this.setItem(J.node.id,{data:J.data,type:J.type});
this.parent.insertBefore(J.node,F)
}}else{for(var I=0;
I<G.length;
++I){var J=this._normalizedCreator(G[I]);
this.setItem(J.node.id,{data:J.data,type:J.type});
this.parent.appendChild(J.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Container(C,D)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var B=this.parent.getElementsByTagName("tbody");
if(B&&B.length){this.parent=B[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(E){if(!E.id){E.id=dojo.dnd.getUniqueId()
}var F=E.getAttribute("dndType"),A=E.getAttribute("dndData");
this.setItem(E.id,{data:A?A:E.innerHTML,type:F?F.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(F){var E=F.relatedTarget;
while(E){if(E==this.node){break
}try{E=E.parentNode
}catch(D){E=null
}}if(!E){this._changeState("Container","Over");
this.onOverEvent()
}E=this._getChildByEvent(F);
if(this.current==E){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(E){this._addItemClass(E,"Over")
}this.current=E
},onMouseOut:function(F){for(var E=F.relatedTarget;
E;
){if(E==this.node){return 
}try{E=E.parentNode
}catch(D){E=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(B){if(!this.skipForm||!dojo.dnd.isFormElement(B)){dojo.stopEvent(B)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(E,F){var G="dojoDnd"+E;
var H=E.toLowerCase()+"State";
dojo.removeClass(this.node,G+this[H]);
dojo.addClass(this.node,G+F);
this[H]=F
},_addItemClass:function(D,C){dojo.addClass(D,"dojoDndItem"+C)
},_removeItemClass:function(D,C){dojo.removeClass(D,"dojoDndItem"+C)
},_getChildByEvent:function(E){var F=E.target;
if(F){for(var D=F.parentNode;
D;
F=D,D=F.parentNode){if(D==this.parent&&dojo.hasClass(F,"dojoDndItem")){return F
}}}return null
},_normalizedCreator:function(F,E){var D=(this.creator?this.creator:this.defaultCreator)(F,E);
if(!dojo.isArray(D.type)){D.type=["text"]
}if(!D.node.id){D.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(D.node,"dojoDndItem");
return D
}});
dojo.dnd._createNode=function(B){if(!B){return dojo.dnd._createSpan
}return function(D){var A=dojo.doc.createElement(B);
A.innerHTML=D;
return A
}
};
dojo.dnd._createTrTd=function(F){var D=dojo.doc.createElement("tr");
var E=dojo.doc.createElement("td");
E.innerHTML=F;
D.appendChild(E);
return D
};
dojo.dnd._createSpan=function(C){var D=dojo.doc.createElement("span");
D.innerHTML=C;
return D
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(F){var D=F.tagName.toLowerCase();
var E=D=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[D]);
return function(K,B){var N=dojo.isObject(K)&&K;
var C=(N&&K.data)?K.data:K;
var L=(N&&K.type)?K.type:["text"];
var M=String(C),A=(B=="avatar"?dojo.dnd._createSpan:E)(M);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:C,type:L}
}
}
}if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(C,D){if(!D){D={}
}this.singular=D.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var F=new dojo.NodeList();
var E=dojo.dnd._empty;
for(var D in this.selection){if(D in E){continue
}F.push(dojo.byId(D))
}return F
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(C,D){this._addItemClass(dojo.byId(D),"Selected");
this.selection[D]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var F=dojo.dnd._empty;
for(var D in this.selection){if(D in F){continue
}var E=dojo.byId(D);
this.delItem(D);
dojo._destroyElement(E)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(F,G,H,J){var I=this._normalizedCreator;
this._normalizedCreator=function(B,A){var C=I.call(this,B,A);
if(F){if(!this.anchor){this.anchor=C.node;
this._removeItemClass(C.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=C.node){this._removeItemClass(C.node,"Anchor");
this._addItemClass(C.node,"Selected")
}}this.selection[C.node.id]=1
}else{this._removeItemClass(C.node,"Selected");
this._removeItemClass(C.node,"Anchor")
}return C
};
dojo.dnd.Selector.superclass.insertNodes.call(this,G,H,J);
this._normalizedCreator=I;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Selector(C,D)
},onMouseDown:function(G){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(G)&&!G.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(G);
return 
}if(!this.singular&&G.shiftKey){if(!dojo.dnd.getCopyKeyState(G)){this._removeSelection()
}var F=dojo.query("> .dojoDndItem",this.parent);
if(F.length){if(!this.anchor){this.anchor=F[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var E=0;
for(;
E<F.length;
++E){var H=F[E];
if(H==this.anchor||H==this.current){break
}}for(++E;
E<F.length;
++E){var H=F[E];
if(H==this.anchor||H==this.current){break
}this._addItemClass(H,"Selected");
this.selection[H.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(G)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(G)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}else{if(!(this.current.id in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}}dojo.stopEvent(G)
},onMouseUp:function(B){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(B){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var E=dojo.dnd._empty;
for(var D in this.selection){if(D in E){continue
}var F=dojo.byId(D);
if(F){this._removeItemClass(F,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.dnd.Avatar=function(B){this.manager=B;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var P=dojo.doc.createElement("table");
P.className="dojoDndAvatar";
P.style.position="absolute";
P.style.zIndex=1999;
P.style.margin="0px";
var I=dojo.doc.createElement("tbody");
var K=dojo.doc.createElement("tr");
K.className="dojoDndAvatarHeader";
var J=dojo.doc.createElement("td");
J.innerHTML=this._generateText();
K.appendChild(J);
dojo.style(K,"opacity",0.9);
I.appendChild(K);
var O=Math.min(5,this.manager.nodes.length);
var L=this.manager.source;
for(var N=0;
N<O;
++N){K=dojo.doc.createElement("tr");
K.className="dojoDndAvatarItem";
J=dojo.doc.createElement("td");
var M=L.creator?M=L._normalizedCreator(L.getItem(this.manager.nodes[N].id).data,"avatar").node:M=this.manager.nodes[N].cloneNode(true);
M.id="";
M.style.width=(this.manager.nodes[N].clientWidth||this.manager.nodes[N].offsetWidth)+"px";
M.style.height=(this.manager.nodes[N].clientHeight||this.manager.nodes[N].offsetHeight)+"px";
J.appendChild(M);
K.appendChild(J);
dojo.style(K,"opacity",(9-N)/10);
I.appendChild(K)
}P.appendChild(I);
this.node=P
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var F=this.node.getElementsByTagName("td");
for(var D=0;
D<F.length;
++D){var E=F[D];
if(dojo.hasClass(E.parentNode,"dojoDndAvatarHeader")){E.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}if(!dojo._hasResource["dojo.dnd.Manager"]){dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(B){if(this.avatar){this.target=(B&&B.targetState!="Disabled")?B:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[B])
},outSource:function(B){if(this.avatar){if(this.target==B){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(H,E,F){this.source=H;
this.nodes=E;
this.copy=Boolean(F);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[H,E,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var G="dojoDnd"+(F?"Copy":"Move");
dojo.addClass(dojo.body(),G)
},canDrop:function(C){var D=this.target&&C;
if(this.canDropFlag!=D){this.canDropFlag=D;
this.avatar.update()
}},stopDrag:function(){dojo.removeClass(dojo.body(),"dojoDndCopy");
dojo.removeClass(dojo.body(),"dojoDndMove");
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new dojo.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(F){var D=this.avatar;
if(D){dojo.dnd.autoScroll(F);
dojo.marginBox(D.node,{l:F.pageX+this.OFFSET_X,t:F.pageY+this.OFFSET_Y});
var E=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(F)));
if(this.copy!=E){this._setCopyStatus(E)
}}},onMouseUp:function(C){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==C.button)){if(this.target&&this.canDropFlag){var D=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(C))),this.target];
dojo.publish("/dnd/drop/before",D);
dojo.publish("/dnd/drop",D)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(C){if(this.avatar){switch(C.keyCode){case dojo.keys.CTRL:var D=Boolean(this.source.copyState(true));
if(this.copy!=D){this._setCopyStatus(D)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(C){if(this.avatar&&C.keyCode==dojo.keys.CTRL){var D=Boolean(this.source.copyState(false));
if(this.copy!=D){this._setCopyStatus(D)
}}},_setCopyStatus:function(B){this.copy=B;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.removeClass(dojo.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
dojo.addClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){if(!dojo.dnd._manager){dojo.dnd._manager=new dojo.dnd.Manager()
}return dojo.dnd._manager
}
}if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(G,F){if(!F){F={}
}this.isSource=typeof F.isSource=="undefined"?true:F.isSource;
var H=F.accept instanceof Array?F.accept:["text"];
this.accept=null;
if(H.length){this.accept={};
for(var E=0;
E<H.length;
++E){this.accept[H[E]]=1
}}this.horizontal=F.horizontal;
this.copyOnly=F.copyOnly;
this.withHandles=F.withHandles;
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){dojo.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){dojo.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){dojo.addClass(this.node,"dojoDndHorizontal")
}this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")]
},checkAcceptance:function(H,L){if(this==H){return true
}for(var J=0;
J<L.length;
++J){var I=H.getItem(L[J].id).type;
var G=false;
for(var K=0;
K<I.length;
++K){if(I[K] in this.accept){G=true;
break
}}if(!G){return false
}}return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Source(C,D)
},onMouseMove:function(F){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,F);
var E=dojo.dnd.manager();
if(this.isDragging){var G=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){G=(F.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{G=(F.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||G!=this.before){this._markTargetAnchor(G);
E.canDrop(!this.current||E.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var H=this.getSelectedNodes();
if(H.length){E.startDrag(this,H,this.copyState(dojo.dnd.getCopyKeyState(F)))
}}}},onMouseDown:function(B){if(this._legalMouseDown(B)&&(!this.skipForm||!dojo.dnd.isFormElement(B))){this.mouseDown=true;
this.mouseButton=B.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,B)
}},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,B)
}},onDndSourceOver:function(D){if(this!=D){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var C=dojo.dnd.manager();
C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(H,E,F){if(this.isSource){this._changeState("Source",this==H?(F?"Copied":"Moved"):"")
}var G=this.accept&&this.checkAcceptance(H,E);
this._changeState("Target",G?"":"Disabled");
if(G&&this==H){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(G,E,F){do{if(this.containerState!="Over"){break
}var H=this._normalizedCreator;
if(this!=G){if(this.creator){this._normalizedCreator=function(B,A){return H.call(this,G.getItem(B.id).data,A)
}
}else{if(F){this._normalizedCreator=function(C,B){var D=G.getItem(C.id);
var A=C.cloneNode(true);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:D.data,type:D.type}
}
}else{this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
G.delItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(F){this._normalizedCreator=function(B,A){return H.call(this,G.getItem(B.id).data,A)
}
}else{if(!this.current){break
}this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}else{if(F){this._normalizedCreator=function(C,B){var D=G.getItem(C.id);
var A=C.cloneNode(true);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:D.data,type:D.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}}this._removeSelection();
if(this!=G){this._removeAnchor()
}if(this!=G&&!F&&!this.creator){G.selectNone()
}this.insertNodes(true,E,this.before,this.current);
if(this!=G&&!F&&this.creator){G.deleteSelectedNodes()
}this._normalizedCreator=H
}while(false);
this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this)
},_markTargetAnchor:function(B){if(this.current==this.targetAnchor&&this.before==B){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=B;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(B){this._changeState("Source",B?"Copied":"Moved")
},_legalMouseDown:function(H){if(!this.withHandles){return true
}for(var I=H.target;
I&&!dojo.hasClass(I,"dojoDndItem");
I=I.parentNode){if(dojo.hasClass(I,"dojoDndHandle")){var J=H;
if(!J){J=window.event
}var G={x:J.clientX,y:J.clientY};
var F=false;
dojo.query("a",I).forEach(function(A){if(!F){var B=A.getBoundingClientRect();
F=(B.left<=G.x&&G.x<=B.right&&B.top<=G.y&&G.y<=B.bottom)
}});
if(F){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(C,D){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Target(C,D)
}})
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(J,I,K){this.node=dojo.byId(J);
this.marginBox={l:I.pageX,t:I.pageY};
this.mouseButton=I.button;
var L=this.host=K,H=J.ownerDocument,G=dojo.connect(H,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(H,"onmousemove",this,"onMouseMove"),dojo.connect(H,"onmouseup",this,"onMouseUp"),dojo.connect(H,"ondragstart",dojo,"stopEvent"),dojo.connect(H,"onselectstart",dojo,"stopEvent"),G];
if(L&&L.onMoveStart){L.onMoveStart(this)
}},onMouseMove:function(D){dojo.dnd.autoScroll(D);
var C=this.marginBox;
this.host.onMove(this,{l:C.l+D.pageX,t:C.t+D.pageY})
},onMouseUp:function(B){if(this.mouseButton==B.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var B=dojo.marginBox(this.node);
B.l-=this.marginBox.l;
B.t-=this.marginBox.t;
this.marginBox=B;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var B=this.host;
if(B&&B.onMoveStop){B.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(C,D){this.node=dojo.byId(C);
if(!D){D={}
}this.handle=D.handle?dojo.byId(D.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=D.delay>0?D.delay:0;
this.skip=D.skip;
this.mover=D.mover?D.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(D,C){return new dojo.dnd.Moveable(C,D)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(B){if(this.skip&&dojo.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=B.pageX;
this._lastY=B.pageY
}else{new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.pageX-this._lastX)>this.delay||Math.abs(B.pageY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseUp:function(B){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(B){if(!this.skip||!dojo.dnd.isFormElement(B)){dojo.stopEvent(B)
}},onMoveStart:function(B){dojo.publish("/dnd/move/start",[B]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(B){dojo.publish("/dnd/move/stop",[B]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(B){},onMove:function(D,C){this.onMoving(D,C);
dojo.marginBox(D.node,C);
this.onMoved(D,C)
},onMoving:function(D,C){},onMoved:function(D,C){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(D,C){return new dojo.dnd.move.constrainedMoveable(C,D)
},constructor:function(C,D){if(!D){D={}
}this.constraints=D.constraints;
this.within=D.within
},onFirstMove:function(F){var E=this.constraintBox=this.constraints.call(this,F),D=F.marginBox;
E.r=E.l+E.w-(this.within?D.w:0);
E.b=E.t+E.h-(this.within?D.h:0)
},onMove:function(F,D){var E=this.constraintBox;
D.l=D.l<E.l?E.l:E.r<D.l?E.r:D.l;
D.t=D.t<E.t?E.t:E.b<D.t?E.b:D.t;
dojo.marginBox(F.node,D)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(D,C){return new dojo.dnd.move.boxConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.box;
this.constraints=function(){return D
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(D,C){return new dojo.dnd.move.parentConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.area;
this.constraints=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(D=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
}
}});
dojo.dnd.move.constrainedMover=function(D,E){var F=function(B,A,C){dojo.dnd.Mover.call(this,B,A,C)
};
dojo.extend(F,dojo.dnd.Mover.prototype);
dojo.extend(F,{onMouseMove:function(B){dojo.dnd.autoScroll(B);
var J=this.marginBox,A=this.constraintBox,I=J.l+B.pageX,C=J.t+B.pageY;
I=I<A.l?A.l:A.r<I?A.r:I;
C=C<A.t?A.t:A.b<C?A.b:C;
this.host.onMove(this,{l:I,t:C})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var A=this.constraintBox=D.call(this),B=this.marginBox;
A.r=A.l+A.w-(E?B.w:0);
A.b=A.t+A.h-(E?B.h:0)
}});
return F
};
dojo.dnd.move.boxConstrainedMover=function(D,C){return dojo.dnd.move.constrainedMover(function(){return D
},C)
};
dojo.dnd.move.parentConstrainedMover=function(E,F){var D=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(E=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
};
return dojo.dnd.move.constrainedMover(D,F)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname]
}if(window.frames[fname]){return window.frames[fname]
}var cframe=null;
var turi=uri;
if(!turi){if(djConfig.useXDomain&&!djConfig.dojoBlankHtmlUrl){console.debug("dojo.io.iframe.create: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html")
}turi=(djConfig.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html"))
}var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':"iframe";
cframe=dojo.doc.createElement(ifrstr);
with(cframe){name=fname;
setAttribute("name",fname);
id=fname
}dojo.body().appendChild(cframe);
window[fname]=cframe;
with(cframe.style){if(dojo.isSafari<3){position="absolute"
}left=top="1px";
height=width="1px";
visibility="hidden"
}if(!dojo.isIE){this.setSrc(cframe,turi,true);
cframe.onload=new Function(onloadstr)
}return cframe
},setSrc:function(I,G,J){try{if(!J){if(dojo.isSafari){I.location=G
}else{frames[I.name].location=G
}}else{var F;
if(dojo.isIE||dojo.isSafari>2){F=I.contentWindow.document
}else{if(dojo.isSafari){F=I.document
}else{F=I.contentWindow
}}if(!F){I.location=G;
return 
}else{F.location.replace(G)
}}}catch(H){console.debug("dojo.io.iframe.setSrc: ",H)
}},doc:function(C){var D=C.contentDocument||((C.contentWindow)&&(C.contentWindow.document))||((C.name)&&(document.frames[C.name])&&(document.frames[C.name].document))||null;
return D
},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,"dojo.io.iframe._iframeOnload();")
}var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;
dfd.ioArgs._callNext()
},function(dfd){var value=null;
try{var ioArgs=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var handleAs=ioArgs.handleAs;
value=ifd;
if(handleAs!="html"){value=ifd.getElementsByTagName("textarea")[0].value;
if(handleAs=="json"){value=dojo.fromJson(value)
}else{if(handleAs=="javascript"){value=dojo.eval(value)
}}}}catch(e){value=e
}finally{ioArgs._callNext()
}return value
},function(error,dfd){dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error
});
dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest()
}};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){return !dfd.ioArgs._hasError
},function(dfd){return(!!dfd.ioArgs._finished)
},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd)
}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"))
}});
return dfd
},_currentDfd:null,_dfdQueue:[],_iframeName:"dojoIoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return 
}var S=this._currentDfd=this._dfdQueue.shift();
var N=S.ioArgs;
var W=N.args;
N._contentToClean=[];
var V=W.form;
var X=W.content||{};
if(V){if(X){for(var U in X){if(!V[U]){var T;
if(dojo.isIE){T=dojo.doc.createElement("<input type='hidden' name='"+U+"'>")
}else{T=dojo.doc.createElement("input");
T.type="hidden";
T.name=U
}T.value=X[U];
V.appendChild(T);
N._contentToClean.push(U)
}else{V[U].value=X[U]
}}}var Q=V.getAttributeNode("action");
var O=V.getAttributeNode("method");
var P=V.getAttributeNode("target");
if(W.url){N._originalAction=Q?Q.value:null;
if(Q){Q.value=W.url
}else{V.setAttribute("action",W.url)
}}if(!O||!O.value){if(O){O.value=(W.method)?W.method:"post"
}else{V.setAttribute("method",(W.method)?W.method:"post")
}}N._originalTarget=P?P.value:null;
if(P){P.value=this._iframeName
}else{V.setAttribute("target",this._iframeName)
}V.target=this._iframeName;
V.submit()
}else{var R=W.url+(W.url.indexOf("?")>-1?"&":"?")+N.query;
this.setSrc(this._frame,R,true)
}}catch(M){S.errback(M)
}},_iframeOnload:function(){var O=this._currentDfd;
if(!O){this._fireNextRequest();
return 
}var J=O.ioArgs;
var R=J.args;
var Q=R.form;
if(Q){var L=J._contentToClean;
for(var K=0;
K<L.length;
K++){var P=L[K];
if(dojo.isSafari<3){for(var M=0;
M<Q.childNodes.length;
M++){var N=Q.childNodes[M];
if(N.name==P){dojo._destroyElement(N);
break
}}}else{dojo._destroyElement(Q[P]);
Q[P]=null
}}if(J._originalAction){Q.setAttribute("action",J._originalAction)
}if(J._originalTarget){Q.setAttribute("target",J._originalTarget);
Q.target=J._originalTarget
}}J._finished=true
}}
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(H,J){var F="^";
var G=null;
for(var I=0;
I<H.length;
I++){G=H.charAt(I);
switch(G){case"\\":F+=G;
I++;
F+=H.charAt(I);
break;
case"*":F+=".*";
break;
case"?":F+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":F+="\\";
default:F+=G
}}F+="$";
if(J){return new RegExp(F,"i")
}else{return new RegExp(F)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(F,D){var E=0;
if(F>D||typeof F==="undefined"||F===null){E=1
}else{if(F<D||typeof D==="undefined"||D===null){E=-1
}}return E
};
dojo.data.util.sorter.createSortFunction=function(J,L){var H=[];
function G(B,A){return function(N,C){var D=L.getValue(N,B);
var F=L.getValue(C,B);
var E=null;
if(L.comparatorMap){if(typeof B!=="string"){B=L.getIdentity(B)
}E=L.comparatorMap[B]||dojo.data.util.sorter.basicComparator
}E=E||dojo.data.util.sorter.basicComparator;
return A*E(D,F)
}
}for(var K=0;
K<J.length;
K++){sortAttribute=J[K];
if(sortAttribute.attribute){var I=(sortAttribute.descending)?-1:1;
H.push(G(sortAttribute.attribute,I))
}}return function(C,D){var A=0;
while(A<H.length){var B=H[A++](C,D);
if(B!==0){return B
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(F){F=F||{};
if(!F.store){F.store=this
}var H=this;
var G=function(A,C){if(C.onError){var B=C.scope||dojo.global;
C.onError.call(B,A,C)
}};
var E=function(P,O){var B=O.abort||null;
var T=false;
var D=O.start?O.start:0;
var Q=O.count?(D+O.count):P.length;
O.abort=function(){T=true;
if(B){B.call(O)
}};
var A=O.scope||dojo.global;
if(!O.store){O.store=H
}if(O.onBegin){O.onBegin.call(A,P.length,O)
}if(O.sort){P.sort(dojo.data.util.sorter.createSortFunction(O.sort,H))
}if(O.onItem){for(var R=D;
(R<P.length)&&(R<Q);
++R){var C=P[R];
if(!T){O.onItem.call(A,C,O)
}}}if(O.onComplete&&!T){var S=null;
if(!O.onItem){S=P.slice(D,Q)
}O.onComplete.call(A,S,O)
}};
this._fetchItems(F,E,G);
return F
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(B){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=B.url;
this._jsonData=B.data;
this._datatypeMap=B.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(A){return dojo.date.stamp.fromISOString(A)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(F,G,E){var H=this.getValues(F,G);
return(H.length>0)?H[0]:E
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
return D[C]||[]
},getAttributes:function(E){this._assertIsItem(E);
var D=[];
for(var F in E){if((F!==this._storeRefPropName)&&(F!==this._itemNumPropName)&&(F!==this._rootItemPropName)){D.push(F)
}}return D
},hasAttribute:function(D,C){return this.getValues(D,C).length>0
},containsValue:function(H,E,F){var G=undefined;
if(typeof F==="string"){G=dojo.data.util.filter.patternToRegExp(F,false)
}return this._containsValue(H,E,F,G)
},_containsValue:function(H,E,F,G){return dojo.some(this.getValues(H,E),function(A){if(A!==null&&!dojo.isObject(A)&&G){if(A.toString().match(G)){return true
}}else{if(F===A){return true
}}})
},isItem:function(B){if(B&&B[this._storeRefPropName]===this){if(this._arrayOfAllItems[B[this._itemNumPropName]]===B){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},getFeatures:function(){return this._features
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){return this.getValue(B,this._labelAttr)
}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(O,J,P){var I=this;
var N=function(H,E){var F=[];
if(H.query){var G=H.queryOptions?H.queryOptions.ignoreCase:false;
var C={};
for(var B in H.query){var D=H.query[B];
if(typeof D==="string"){C[B]=dojo.data.util.filter.patternToRegExp(D,G)
}}for(var U=0;
U<E.length;
++U){var T=true;
var V=E[U];
if(V===null){T=false
}else{for(var B in H.query){var D=H.query[B];
if(!I._containsValue(V,B,D,C[B])){T=false
}}}if(T){F.push(V)
}}J(F,H)
}else{for(var U=0;
U<E.length;
++U){var A=E[U];
if(A!==null){F.push(A)
}}J(F,H)
}};
if(this._loadFinished){N(O,this._getItemsArray(O.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:O,filter:N})
}else{this._loadInProgress=true;
var L={url:I._jsonFileUrl,handleAs:"json-comment-optional"};
var M=dojo.xhrGet(L);
M.addCallback(function(B){try{I._getItemsFromLoadedData(B);
I._loadFinished=true;
I._loadInProgress=false;
N(O,I._getItemsArray(O.queryOptions));
I._handleQueuedFetches()
}catch(A){I._loadFinished=true;
I._loadInProgress=false;
P(A,O)
}});
M.addErrback(function(A){I._loadInProgress=false;
P(A,O)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
N(O,this._getItemsArray(O.queryOptions))
}catch(K){P(K,O)
}}else{P(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),O)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var G=0;
G<this._queuedFetches.length;
G++){var E=this._queuedFetches[G];
var H=E.args;
var F=E.filter;
if(F){F(H,this._getItemsArray(H.queryOptions))
}else{this.fetchItemByIdentity(H)
}}this._queuedFetches=[]
}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(B){},_getItemsFromLoadedData:function(j){function m(B){var A=((B!=null)&&(typeof B=="object")&&(!dojo.isArray(B))&&(!dojo.isFunction(B))&&(B.constructor==Object)&&(typeof B._reference=="undefined")&&(typeof B._type=="undefined")&&(typeof B._value=="undefined"));
return A
}var e=this;
function W(D){e._arrayOfAllItems.push(D);
for(var E in D){var F=D[E];
if(F){if(dojo.isArray(F)){var A=F;
for(var B=0;
B<A.length;
++B){var C=A[B];
if(m(C)){W(C)
}}}else{if(m(F)){W(F)
}}}}}this._labelAttr=j.label;
var Z;
var X;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=j.items;
for(Z=0;
Z<this._arrayOfTopLevelItems.length;
++Z){X=this._arrayOfTopLevelItems[Z];
W(X);
X[this._rootItemPropName]=true
}var c={};
var V;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){if(V!==this._rootItemPropName){var d=X[V];
if(d!==null){if(!dojo.isArray(d)){X[V]=[d]
}}else{X[V]=[null]
}}c[V]=V
}}while(c[this._storeRefPropName]){this._storeRefPropName+="_"
}while(c[this._itemNumPropName]){this._itemNumPropName+="_"
}var g;
var k=j.identifier;
if(k){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=k;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
g=X[k];
var U=g[0];
if(!this._itemsByIdentity[U]){this._itemsByIdentity[U]=X
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+U+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+k+"].  Value collided: ["+U+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
X[this._storeRefPropName]=this;
X[this._itemNumPropName]=Z
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){g=X[V];
for(var a=0;
a<g.length;
++a){d=g[a];
if(d!==null&&typeof d=="object"){if(d._type&&d._value){var i=d._type;
var h=this._datatypeMap[i];
if(!h){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+i+"'")
}else{if(dojo.isFunction(h)){g[a]=new h(d._value)
}else{if(dojo.isFunction(h.deserialize)){g[a]=h.deserialize(d._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(d._reference){var n=d._reference;
if(dojo.isString(n)){g[a]=this._itemsByIdentity[n]
}else{for(var b=0;
b<this._arrayOfAllItems.length;
++b){var l=this._arrayOfAllItems[b];
var f=true;
for(var Y in n){if(l[Y]!=n[Y]){f=false
}}if(f){g[a]=l
}}}}}}}}},getIdentity:function(F){var D=this._features["dojo.data.api.Identity"];
if(D===Number){return F[this._itemNumPropName]
}else{var E=F[D];
if(E){return E[0]
}}return null
},fetchItemByIdentity:function(L){if(!this._loadFinished){var G=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:L})
}else{this._loadInProgress=true;
var H={url:G._jsonFileUrl,handleAs:"json-comment-optional"};
var I=dojo.xhrGet(H);
I.addCallback(function(A){var C=L.scope?L.scope:dojo.global;
try{G._getItemsFromLoadedData(A);
G._loadFinished=true;
G._loadInProgress=false;
var B=G._getItemByIdentity(L.identity);
if(L.onItem){L.onItem.call(C,B)
}G._handleQueuedFetches()
}catch(D){G._loadInProgress=false;
if(L.onError){L.onError.call(C,D)
}}});
I.addErrback(function(B){G._loadInProgress=false;
if(L.onError){var A=L.scope?L.scope:dojo.global;
L.onError.call(A,B)
}})
}}else{if(this._jsonData){G._getItemsFromLoadedData(G._jsonData);
G._jsonData=null;
G._loadFinished=true;
var J=G._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}}}else{var J=this._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}},_getItemByIdentity:function(C){var D=null;
if(this._itemsByIdentity){D=this._itemsByIdentity[C]
}else{D=this._arrayOfAllItems[C]
}if(D===undefined){D=null
}return D
},getIdentityAttributes:function(D){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return null
}else{return[C]
}},_forceLoad:function(){var D=this;
if(this._jsonFileUrl){var E={url:D._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var F=dojo.xhrGet(E);
F.addCallback(function(B){try{if(D._loadInProgress!==true&&!D._loadFinished){D._getItemsFromLoadedData(B);
D._loadFinished=true
}}catch(A){console.log(A);
throw A
}});
F.addErrback(function(A){throw A
})
}else{if(this._jsonData){D._getItemsFromLoadedData(D._jsonData);
D._jsonData=null;
D._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(B){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(A){return dojo.date.stamp.toISOString(A,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(B){if(!B){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var B=this.getFeatures()["dojo.data.api.Identity"];
return B
},newItem:function(O,N){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof O!="object"&&typeof O!="undefined"){throw new Error("newItem() was passed something other than an object")
}var T=null;
var M=this._getIdentifierAttribute();
if(M===Number){T=this._arrayOfAllItems.length
}else{T=O[M];
if(typeof T==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(T)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[T]==="undefined")
}this._assert(typeof this._pending._newItems[T]==="undefined");
this._assert(typeof this._pending._deletedItems[T]==="undefined");
var L={};
L[this._storeRefPropName]=this;
L[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[T]=L
}this._arrayOfAllItems.push(L);
var R=null;
if(N&&N.parent&&N.attribute){R={item:N.parent,attribute:N.attribute,oldValue:undefined};
var P=this.getValues(N.parent,N.attribute);
if(P&&P.length>0){var K=P.slice(0,P.length);
if(P.length===1){R.oldValue=P[0]
}else{R.oldValue=P.slice(0,P.length)
}K.push(L);
this._setValueOrValues(N.parent,N.attribute,K,false);
R.newValue=this.getValues(N.parent,N.attribute)
}else{this._setValueOrValues(N.parent,N.attribute,L,false);
R.newValue=L
}}else{L[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(L)
}this._pending._newItems[T]=L;
for(var Q in O){if(Q===this._storeRefPropName||Q===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var S=O[Q];
if(!dojo.isArray(S)){S=[S]
}L[Q]=S
}this.onNew(L,R);
return L
},_removeArrayElement:function(E,F){var D=dojo.indexOf(E,F);
if(D!=-1){E.splice(D,1);
return true
}return false
},deleteItem:function(F){this._assert(!this._saveInProgress);
this._assertIsItem(F);
var E=F[this._itemNumPropName];
this._arrayOfAllItems[E]=null;
var D=this.getIdentity(F);
F[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[D]
}this._pending._deletedItems[D]=F;
if(F[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,F)
}this.onDelete(F);
return true
},setValue:function(F,D,E){return this._setValueOrValues(F,D,E,true)
},setValues:function(E,F,D){return this._setValueOrValues(E,F,D,true)
},unsetAttribute:function(D,C){return this._setValueOrValues(D,C,[],true)
},_setValueOrValues:function(W,S,c,g){this._assert(!this._saveInProgress);
this._assertIsItem(W);
this._assert(dojo.isString(S));
this._assert(typeof c!=="undefined");
var e=this._getIdentifierAttribute();
if(S==e){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var f=this._getValueOrValues(W,S);
var b=this.getIdentity(W);
if(!this._pending._modifiedItems[b]){var U={};
for(var Y in W){if((Y===this._storeRefPropName)||(Y===this._itemNumPropName)||(Y===this._rootItemPropName)){U[Y]=W[Y]
}else{var Z=W[Y];
var d=[];
for(var h=0;
h<Z.length;
++h){d.push(Z[h])
}U[Y]=d
}}this._pending._modifiedItems[b]=U
}var X=false;
if(dojo.isArray(c)&&c.length===0){X=delete W[S];
c=undefined
}else{var a=[];
if(dojo.isArray(c)){var V=c;
for(var R=0;
R<V.length;
++R){a.push(V[R])
}}else{var T=c;
a.push(T)
}W[S]=a;
X=true
}if(g){this.onSet(W,S,f,c)
}return X
},_getValueOrValues:function(F,G){var E=undefined;
if(this.hasAttribute(F,G)){var H=this.getValues(F,G);
if(H.length==1){E=H[0]
}else{E=H
}}return E
},_flatten:function(H){if(this.isItem(H)){var I=H;
var F=this.getIdentity(I);
var J={_reference:F};
return J
}else{if(typeof H==="object"){for(type in this._datatypeMap){var G=this._datatypeMap[type];
if(dojo.isObject(G)&&!dojo.isFunction(G)){if(H instanceof G.type){if(!G.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:G.serialize(H)}
}}else{if(H instanceof G){return{_type:type,_value:H.toString()}
}}}}return H
}},_getNewFileContentString:function(){var O={};
var T=this._getIdentifierAttribute();
if(T!==Number){O.identifier=T
}if(this._labelAttr){O.label=this._labelAttr
}O.items=[];
for(var K=0;
K<this._arrayOfAllItems.length;
++K){var P=this._arrayOfAllItems[K];
if(P!==null){serializableItem={};
for(var Q in P){if(Q!==this._storeRefPropName&&Q!==this._itemNumPropName){var N=Q;
var R=this.getValues(P,N);
if(R.length==1){serializableItem[N]=this._flatten(R[0])
}else{var S=[];
for(var L=0;
L<R.length;
++L){S.push(this._flatten(R[L]));
serializableItem[N]=S
}}}}O.items.push(serializableItem)
}}var M=true;
return dojo.toJson(O,M)
},save:function(J){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var F=this;
var H=function(){F._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
F._saveInProgress=false;
if(J&&J.onComplete){var A=J.scope||dojo.global;
J.onComplete.call(A)
}};
var G=function(){F._saveInProgress=false;
if(J&&J.onError){var A=J.scope||dojo.global;
J.onError.call(A)
}};
if(this._saveEverything){var I=this._getNewFileContentString();
this._saveEverything(H,G,I)
}if(this._saveCustom){this._saveCustom(H,G)
}if(!this._saveEverything&&!this._saveCustom){H()
}},revert:function(){this._assert(!this._saveInProgress);
var M;
for(M in this._pending._newItems){var K=this._pending._newItems[M];
K[this._storeRefPropName]=null;
this._arrayOfAllItems[K[this._itemNumPropName]]=null;
if(K[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,K)
}if(this._itemsByIdentity){delete this._itemsByIdentity[M]
}}for(M in this._pending._modifiedItems){var I=this._pending._modifiedItems[M];
var J=null;
if(this._itemsByIdentity){J=this._itemsByIdentity[M]
}else{J=this._arrayOfAllItems[M]
}I[this._storeRefPropName]=this;
J[this._storeRefPropName]=null;
var N=J[this._itemNumPropName];
this._arrayOfAllItems[N]=I;
if(J[this._rootItemPropName]){N=J[this._itemNumPropName];
this._arrayOfTopLevelItems[N]=I
}if(this._itemsByIdentity){this._itemsByIdentity[M]=I
}}for(M in this._pending._deletedItems){var H=this._pending._deletedItems[M];
H[this._storeRefPropName]=this;
var L=H[this._itemNumPropName];
this._arrayOfAllItems[L]=H;
if(this._itemsByIdentity){this._itemsByIdentity[M]=H
}if(H[this._rootItemPropName]){this._arrayOfTopLevelItems.push(H)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(E){if(E){var D=this.getIdentity(E);
return new Boolean(this._pending._newItems[D]||this._pending._modifiedItems[D]||this._pending._deletedItems[D])
}else{var F;
for(F in this._pending._newItems){return true
}for(F in this._pending._modifiedItems){return true
}for(F in this._pending._deletedItems){return true
}return false
}},onSet:function(G,H,E,F){},onNew:function(D,C){},onDelete:function(B){}})
};