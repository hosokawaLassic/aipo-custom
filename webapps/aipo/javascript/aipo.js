if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var B=A.getMonth();
var C=[31,28,31,30,31,30,31,31,30,31,30,31];
if(B==1&&dojo.date.isLeapYear(A)){return 29
}return C[B]
};
dojo.date.isLeapYear=function(B){var A=B.getFullYear();
return !(A%400)||(!(A%4)&&!!(A%100))
};
dojo.date.getTimezoneName=function(C){var D=C.toString();
var F="";
var B;
var E=D.indexOf("(");
if(E>-1){F=D.substring(++E,D.indexOf(")"))
}else{var A=/([A-Z\/]+) \d{4}$/;
if((B=D.match(A))){F=B[1]
}else{D=C.toLocaleString();
A=/ ([A-Z\/]+)$/;
if((B=D.match(A))){F=B[1]
}}}return(F=="AM"||F=="PM")?"":F
};
dojo.date.compare=function(C,B,A){C=new Date(Number(C));
B=new Date(Number(B||new Date()));
if(typeof A!=="undefined"){if(A=="date"){C.setHours(0,0,0,0);
B.setHours(0,0,0,0)
}else{if(A=="time"){C.setFullYear(0,0,0);
B.setFullYear(0,0,0)
}}}if(C>B){return 1
}if(C<B){return -1
}return 0
};
dojo.date.add=function(D,C,E){var G=new Date(Number(D));
var B=false;
var K="Date";
switch(C){case"day":break;
case"weekday":var L,A;
var I=0;
var J=E%5;
if(!J){L=(E>0)?5:-5;
A=(E>0)?((E-5)/5):((E+5)/5)
}else{L=J;
A=parseInt(E/5)
}var F=D.getDay();
if(F==6&&E>0){I=1
}else{if(F==0&&E<0){I=-1
}}var H=F+L;
if(H==0||H==6){I=(E>0)?2:-2
}E=7*A+L+I;
break;
case"year":K="FullYear";
B=true;
break;
case"week":E*=7;
break;
case"quarter":E*=3;
case"month":B=true;
K="Month";
break;
case"hour":case"minute":case"second":case"millisecond":K="UTC"+C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(K){G["set"+K](G["get"+K]()+E)
}if(B&&(G.getDate()<D.getDate())){G.setDate(0)
}return G
};
dojo.date.difference=function(P,N,D){N=N||new Date();
D=D||"day";
var C=N.getFullYear()-P.getFullYear();
var L=1;
switch(D){case"quarter":var Q=P.getMonth();
var O=N.getMonth();
var I=Math.floor(Q/3)+1;
var H=Math.floor(O/3)+1;
H+=(C*4);
L=H-I;
break;
case"weekday":var M=Math.round(dojo.date.difference(P,N,"day"));
var A=parseInt(dojo.date.difference(P,N,"week"));
var K=M%7;
if(K==0){M=A*5
}else{var J=0;
var G=P.getDay();
var E=N.getDay();
A=parseInt(M/7);
K=M%7;
var F=new Date(P);
F.setDate(F.getDate()+(A*7));
var B=F.getDay();
if(M>0){switch(true){case G==6:J=-1;
break;
case G==0:J=0;
break;
case E==6:J=-1;
break;
case E==0:J=-2;
break;
case (B+K)>5:J=-2
}}else{if(M<0){switch(true){case G==6:J=0;
break;
case G==0:J=1;
break;
case E==6:J=2;
break;
case E==0:J=1;
break;
case (B+K)<0:J=2
}}}M+=J;
M-=(A*2)
}L=M;
break;
case"year":L=C;
break;
case"month":L=(N.getMonth()-P.getMonth())+(C*12);
break;
case"week":L=parseInt(dojo.date.difference(P,N,"day")/7);
break;
case"day":L/=24;
case"hour":L/=60;
case"minute":L/=60;
case"second":L/=1000;
case"millisecond":L*=N.getTime()-P.getTime()
}return Math.round(L)
}
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(C){var B=C.shift();
var A=B;
dojo.forEach(C,function(D){dojo.connect(A,"onEnd",D,"play");
A=D
});
return B
};
dojo.fx.combine=function(B){var A=new dojo._Animation({curve:[0,1]});
if(!B.length){return A
}A.duration=B[0].duration;
dojo.forEach(B,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(A,D,C,D)
}})
});
return A
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(A){var B=this;
dojo.mixin(B,A);
B.node=A.node;
B._showArgs=dojo.mixin({},A);
B._showArgs.node=B.node;
B._showArgs.duration=B.showDuration;
B.showAnim=B.showFunc(B._showArgs);
B._hideArgs=dojo.mixin({},A);
B._hideArgs.node=B.node;
B._hideArgs.duration=B.hideDuration;
B.hideAnim=B.hideFunc(B._hideArgs);
dojo.connect(B.showAnim,"beforeBegin",dojo.hitch(B.hideAnim,"stop",true));
dojo.connect(B.hideAnim,"beforeBegin",dojo.hitch(B.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(A){A.node=dojo.byId(A.node);
var C=A.node,B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){B.overflow="hidden";
if(B.visibility=="hidden"||B.display=="none"){B.height="1px";
B.display="";
B.visibility="";
return 1
}else{var E=dojo.style(C,"height");
return Math.max(E,1)
}},end:function(){return C.scrollHeight
}}}},A));
dojo.connect(D,"onEnd",function(){B.height="auto"
});
return D
};
dojo.fx.wipeOut=function(A){var C=A.node=dojo.byId(A.node);
var B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},A));
dojo.connect(D,"beforeBegin",function(){B.overflow="hidden";
B.display=""
});
dojo.connect(D,"onEnd",function(){B.height="auto";
B.display="none"
});
return D
};
dojo.fx.slideTo=function(A){var B=(A.node=dojo.byId(A.node));
var E=null;
var D=null;
var F=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
E=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
D=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
E=H.y;
D=H.x;
G.style.position="absolute";
G.style.top=E+"px";
G.style.left=D+"px"
}}
})(B);
F();
var C=dojo.animateProperty(dojo.mixin({properties:{top:{end:A.top||0},left:{end:A.left||0}}},A));
dojo.connect(C,"beforeBegin",C,F);
return C
}
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(B,C,H){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var D=[B,"nls",C].join(".");
var J=dojo._loadedModules[D];
if(J){var I;
for(var E=A.length;
E>0;
E--){var G=A.slice(0,E).join("_");
if(J[G]){I=J[G];
break
}}if(!I){I=J.ROOT
}if(I){var F=function(){};
F.prototype=I;
return new F()
}}throw new Error("Bundle not found: "+C+" in "+B+" , locale="+H)
};
dojo.i18n.normalizeLocale=function(B){var A=B?B.toLowerCase():dojo.locale;
if(A=="root"){A="ROOT"
}return A
};
dojo.i18n._requireLocalization=function(A,B,O,K){var H=dojo.i18n.normalizeLocale(O);
var E=[A,"nls",B].join(".");
var D="";
if(K){var N=K.split(",");
for(var I=0;
I<N.length;
I++){if(H.indexOf(N[I])==0){if(N[I].length>D.length){D=N[I]
}}}if(!D){D="ROOT"
}}var L=K?D:H;
var Q=dojo._loadedModules[E];
var C=null;
if(Q){if(djConfig.localizationComplete&&Q._built){return 
}var G=L.replace(/-/g,"_");
var M=E+"."+G;
C=dojo._loadedModules[M]
}if(!C){Q=dojo.provide(E);
var F=dojo._getModuleSymbols(A);
var J=F.concat("nls").join("/");
var P;
dojo.i18n._searchLocalePath(L,K,function(V){var W=V.replace(/-/g,"_");
var U=E+"."+W;
var S=false;
if(!dojo._loadedModules[U]){dojo.provide(U);
var T=[J];
if(V!="ROOT"){T.push(V)
}T.push(B);
var R=T.join("/")+".js";
S=dojo._loadPath(R,null,function(Z){var Y=function(){};
Y.prototype=P;
Q[W]=new Y();
for(var X in Z){Q[W][X]=Z[X]
}})
}else{S=true
}if(S&&Q[W]){P=Q[W]
}else{Q[W]=P
}if(K){return true
}})
}if(K&&H!=D){Q[H.replace(/-/g,"_")]=Q[D.replace(/-/g,"_")]
}};
(function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}var B=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(E,D,C,G){B(E,D,C,G);
if(C){return 
}for(var F=0;
F<A.length;
F++){B(E,D,A[F],G)
}}
}})();
dojo.i18n._searchLocalePath=function(H,I,C){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var B=[];
for(var E=A.length;
E>0;
E--){B.push(A.slice(0,E).join("-"))
}B.push(false);
if(I){B.reverse()
}for(var D=B.length-1;
D>=0;
D--){var F=B[D]||"ROOT";
var G=C(F);
if(G){break
}}};
dojo.i18n._preloadLocalizations=function(E,B){function C(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<B.length;
G++){if(B[G]==H){dojo.require(E+"_"+H);
return true
}}return false
})
}C();
var A=djConfig.extraLocale||[];
for(var D=0;
D<A.length;
D++){C(A[D])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(A){var B={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var C=dojo.cldr.supplemental._region(A);
var D=B[C];
return(typeof D=="undefined")?1:D
};
dojo.cldr.supplemental._region=function(A){A=dojo.i18n.normalizeLocale(A);
var B=A.split("-");
var C=B[1];
if(!C){C={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[B[0]]
}else{if(C.length==4){C=B[2]
}}return C
};
dojo.cldr.supplemental.getWeekend=function(B){var D={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var A={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var E=dojo.cldr.supplemental._region(B);
var F=D[E];
var C=A[E];
if(typeof F=="undefined"){F=6
}if(typeof C=="undefined"){C=0
}return{start:F,end:C}
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(B,A){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(A&&A.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(B,E,D){if(!(B instanceof Array)){return E(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(E(B[C]))
}return dojo.regexp.group(A.join("|"),D)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(E,C,D,A){var B=String(E);
if(!D){D="0"
}while(B.length<C){if(A){B+=D
}else{B=D+B
}}return B
};
dojo.string.substitute=function(C,D,B,A){return C.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(E,F,H){var G=dojo.getObject(F,false,D);
if(H){G=dojo.getObject(H,false,A)(G)
}if(B){G=B(G,F)
}return G.toString()
})
};
dojo.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var A=B.length-1;
A>0;
A--){if(/\S/.test(B.charAt(A))){B=B.substring(0,A+1);
break
}}return B
}
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(E,B){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var C=dojo.date.stamp._isoRegExp.exec(E);
var A=null;
if(C){C.shift();
C[1]&&C[1]--;
C[6]&&(C[6]*=1000);
if(B){B=new Date(B);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return B["get"+G]()
}).forEach(function(H,G){if(C[G]===undefined){C[G]=H
}})
}A=new Date(C[0]||1970,C[1]||0,C[2]||0,C[3]||0,C[4]||0,C[5]||0,C[6]||0);
var F=0;
var D=C[7]&&C[7].charAt(0);
if(D!="Z"){F=((C[8]||0)*60)+(Number(C[9])||0);
if(D!="-"){F*=-1
}}if(D){F-=A.getTimezoneOffset()
}if(F){A.setTime(A.getTime()+F*60000)
}}return A
};
dojo.date.stamp.toISOString=function(F,J){var I=function(K){return(K<10)?"0"+K:K
};
J=J||{};
var E=[];
var G=J.zulu?"getUTC":"get";
var C="";
if(J.selector!="time"){C=[F[G+"FullYear"](),I(F[G+"Month"]()+1),I(F[G+"Date"]())].join("-")
}E.push(C);
if(J.selector!="date"){var B=[I(F[G+"Hours"]()),I(F[G+"Minutes"]()),I(F[G+"Seconds"]())].join(":");
var A=F[G+"Milliseconds"]();
if(J.milliseconds){B+="."+(A<100?"0":"")+I(A)
}if(J.zulu){B+="Z"
}else{if(J.selector!="time"){var H=F.getTimezoneOffset();
var D=Math.abs(H);
B+=(H>0?"-":"+")+I(Math.floor(D/60))+":"+I(D%60)
}}E.push(B)
}return E.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var E=dojo;
function A(F){if(E.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(E.isFunction(F)){return"function"
}if(E.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof E._Url){return"url"
}return"object"
}function B(G,F){switch(F){case"string":return G;
case"number":return G.length?Number(G):NaN;
case"boolean":return typeof G=="boolean"?G:!(G.toLowerCase()=="false");
case"function":if(E.isFunction(G)){G=G.toString();
G=E.trim(G.substring(G.indexOf("{")+1,G.length-1))
}try{if(G.search(/[^\w\.]+/i)!=-1){G=E.parser._nameAnonFunc(new Function(G),this)
}return E.getObject(G,false)
}catch(H){return new Function()
}case"array":return G.split(/\s*,\s*/);
case"date":switch(G){case"":return new Date("");
case"now":return new Date();
default:return E.date.stamp.fromISOString(G)
}case"url":return E.baseUrl+G;
default:return E.fromJson(G)
}}var D={};
function C(H){if(!D[H]){var F=E.getObject(H);
if(!E.isFunction(F)){throw new Error("Could not load class '"+H+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var I=F.prototype;
var K={};
for(var G in I){if(G.charAt(0)=="_"){continue
}var J=I[G];
K[G]=A(J)
}D[H]={cls:F,params:K}
}return D[H]
}this._functionFromScript=function(G){var H="";
var J="";
var F=G.getAttribute("args");
if(F){E.forEach(F.split(/\s*,\s*/),function(L,K){H+="var "+L+" = arguments["+K+"]; "
})
}var I=G.getAttribute("with");
if(I&&I.length){E.forEach(I.split(/\s*,\s*/),function(K){H+="with("+K+"){";
J+="}"
})
}return new Function(H+G.innerHTML+J)
};
this.instantiate=function(F){var G=[];
E.forEach(F,function(J){if(!J){return 
}var R=J.getAttribute("dojoType");
if((!R)||(!R.length)){return 
}var O=C(R);
var P=O.cls;
var H=P._noScript||P.prototype._noScript;
var K={};
var M=J.attributes;
for(var I in O.params){var V=M.getNamedItem(I);
if(!V||(!V.specified&&(!dojo.isIE||I.toLowerCase()!="value"))){continue
}var T=V.value;
switch(I){case"class":T=J.className;
break;
case"style":T=J.style&&J.style.cssText
}var N=O.params[I];
K[I]=B(T,N)
}if(!H){var L=[],W=[];
E.query("> script[type^='dojo/']",J).orphan().forEach(function(X){var Z=X.getAttribute("event"),Y=X.getAttribute("type"),a=E.parser._functionFromScript(X);
if(Z){if(Y=="dojo/connect"){L.push({event:Z,func:a})
}else{K[Z]=a
}}else{W.push(a)
}})
}var S=P.markupFactory;
if(!S&&P.prototype){S=P.prototype.markupFactory
}var U=S?S(K,J,P):new P(K,J);
G.push(U);
var Q=J.getAttribute("jsId");
if(Q){E.setObject(Q,U)
}if(!H){dojo.forEach(L,function(X){dojo.connect(U,X.event,null,X.func)
});
dojo.forEach(W,function(X){X.call(U)
})
}});
E.forEach(G,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return G
};
this.parse=function(F){var G=E.query("[dojoType]",F);
var H=this.instantiate(G);
return H
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(A,E){var D="$joinpoint";
var C=(E||dojo.parser._anon);
if(dojo.isIE){var F=A.__dojoNameCache;
if(F&&C[F]===A){return A.__dojoNameCache
}}var B="__"+dojo.parser._anonCtr++;
while(typeof C[B]!="undefined"){B="__"+dojo.parser._anonCtr++
}C[B]=A;
return B
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.requireLocalization("dojo.cldr","gregorian",null,"ko,zh-cn,zh,ja,en,it-it,en-ca,en-au,it,en-gb,es-es,fr,pt,ROOT,ko-kr,es,de,pt-br");
(function(){function B(E,D,F){return F.replace(/([a-z])\1*/ig,function(S){var W;
var V=S.charAt(0);
var N=S.length;
var K;
var L=["abbr","wide","narrow"];
switch(V){case"G":W=D[(N<4)?"eraAbbr":"eraNames"][E.getFullYear()<0?0:1];
break;
case"y":W=E.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:K=true
}break;
case"Q":case"q":W=Math.ceil((E.getMonth()+1)/3);
K=true;
break;
case"M":case"L":var M=E.getMonth();
var I;
switch(N){case 1:case 2:W=M+1;
K=true;
break;
case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="L")?"standalone":"format";
var H=["months",U,I].join("-");
W=D[H][M]
}break;
case"w":var G=0;
W=dojo.date.locale._getWeekOfYear(E,G);
K=true;
break;
case"d":W=E.getDate();
K=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(E);
K=true;
break;
case"E":case"e":case"c":var T=E.getDay();
var I;
switch(N){case 1:case 2:if(V=="e"){var R=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-R+7)%7
}if(V!="c"){W=T+1;
K=true;
break
}case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="c")?"standalone":"format";
var H=["days",U,I].join("-");
W=D[H][T]
}break;
case"a":var J=(E.getHours()<12)?"am":"pm";
W=D[J];
break;
case"h":case"H":case"K":case"k":var Q=E.getHours();
switch(V){case"h":W=(Q%12)||12;
break;
case"H":W=Q;
break;
case"K":W=(Q%12);
break;
case"k":W=Q||24;
break
}K=true;
break;
case"m":W=E.getMinutes();
K=true;
break;
case"s":W=E.getSeconds();
K=true;
break;
case"S":W=Math.round(E.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(E);
if(W){break
}N=4;
case"Z":var P=E.getTimezoneOffset();
var O=[(P<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(P)/60),2),dojo.string.pad(Math.abs(P)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+F)
}if(K){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(F,L){L=L||{};
var I=dojo.i18n.normalizeLocale(L.locale);
var M=L.formatLength||"short";
var N=dojo.date.locale._getGregorianBundle(I);
var G=[];
var E=dojo.hitch(this,B,F,N);
if(L.selector=="year"){var H=F.getFullYear();
if(I.match(/^zh|^ja/)){H+="\u5E74"
}return H
}if(L.selector!="time"){var D=L.datePattern||N["dateFormat-"+M];
if(D){G.push(C(D,E))
}}if(L.selector!="date"){var K=L.timePattern||N["timeFormat-"+M];
if(K){G.push(C(K,E))
}}var J=G.join(" ");
return J
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var G=dojo.i18n.normalizeLocale(I.locale);
var K=dojo.date.locale._getGregorianBundle(G);
var J=I.formatLength||"short";
var D=I.datePattern||K["dateFormat-"+J];
var L=I.timePattern||K["timeFormat-"+J];
var E;
if(I.selector=="date"){E=D
}else{if(I.selector=="time"){E=L
}else{E=D+" "+L
}}var F=[];
var H=C(E,dojo.hitch(this,A,F,K,I));
return{regexp:H,tokens:F,bundle:K}
};
dojo.date.locale.parse=function(K,N){var D=dojo.date.locale._parseInfo(N);
var H=D.tokens,O=D.bundle;
var L=new RegExp("^"+D.regexp+"$");
var F=L.exec(K);
if(!F){return null
}var E=["abbr","wide","narrow"];
var M=new Date(1972,0);
var G={};
var J="";
dojo.forEach(F,function(b,V){if(!V){return 
}var S=H[V-1];
var T=S.length;
switch(S.charAt(0)){case"y":if(T!=2){M.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var a=""+new Date().getFullYear();
var U=a.substring(0,2)*100;
var X=Number(a.substring(2,4));
var Q=Math.min(X+20,99);
var W=(b<Q)?U+b:U-100+b;
M.setFullYear(W);
G.year=W
}else{if(N.strict){return null
}M.setFullYear(b);
G.year=b
}}break;
case"M":if(T>2){var P=O["months-format-"+E[T-3]].concat();
if(!N.strict){b=b.replace(".","").toLowerCase();
P=dojo.map(P,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(P,b);
if(b==-1){return null
}}else{b--
}M.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=O["days-format-"+E[T-3]].concat();
if(!N.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":M.setDate(b);
G.date=b;
break;
case"D":M.setMonth(0);
M.setDate(b);
break;
case"a":var Y=N.am||O.am;
var R=N.pm||O.pm;
if(!N.strict){var Z=/\./g;
b=b.replace(Z,"").toLowerCase();
Y=Y.replace(Z,"").toLowerCase();
R=R.replace(Z,"").toLowerCase()
}if(N.strict&&b!=Y&&b!=R){return null
}J=(b==R)?"p":(b==Y)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}M.setHours(b);
break;
case"m":M.setMinutes(b);
break;
case"s":M.setSeconds(b);
break;
case"S":M.setMilliseconds(b)
}});
var I=M.getHours();
if(J==="p"&&I<12){M.setHours(I+12)
}else{if(J==="a"&&I==12){M.setHours(0)
}}if(G.year&&M.getFullYear()!=G.year){return null
}if(G.month&&M.getMonth()!=G.month){return null
}if(G.date&&M.getDate()!=G.date){return null
}return M
};
function C(H,D,J,G){var E=function(K){return K
};
D=D||E;
J=J||E;
G=G||E;
var I=H.match(/(''|[^'])+/g);
var F=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(F?J:D)(K);
F=!F
}});
return G(I.join(""))
}function A(G,D,E,F){F=dojo.regexp.escapeString(F);
if(!E.strict){F=F.replace(" a"," ?a")
}return F.replace(/([a-z])\1*/ig,function(I){var K;
var O=I.charAt(0);
var H=I.length;
var N="",M="";
if(E.strict){if(H>1){N="0{"+(H-1)+"}"
}if(H>2){M="0{"+(H-2)+"}"
}}else{N="0?";
M="0{0,2}"
}switch(O){case"y":K="\\d{2,4}";
break;
case"M":K=(H>2)?"\\S+":N+"[1-9]|1[0-2]";
break;
case"D":K=N+"[1-9]|"+M+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":K=N+"[1-9]|[12]\\d|3[01]";
break;
case"w":K=N+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":K="\\S+";
break;
case"h":K=N+"[1-9]|1[0-2]";
break;
case"k":K=N+"\\d|1[01]";
break;
case"H":K=N+"\\d|1\\d|2[0-3]";
break;
case"K":K=N+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":K="[0-5]\\d";
break;
case"S":K="\\d{"+H+"}";
break;
case"a":var L=E.am||D.am||"AM";
var J=E.pm||D.pm||"PM";
if(E.strict){K=L+"|"+J
}else{K=L+"|"+J;
if(L!=L.toLowerCase()){K+="|"+L.toLowerCase()
}if(J!=J.toLowerCase()){K+="|"+J.toLowerCase()
}}break;
default:K=".*"
}if(G){G.push(I)
}return"("+K+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(B){var C={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,B);
C=dojo.mixin(C,D)
},this);
return C
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(F,E,B,A){var C;
var G=dojo.date.locale._getGregorianBundle(A);
var D=[F,B,E];
if(B=="standAlone"){C=G[D.join("-")]
}D[1]="format";
return(C||G[D.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(D,A){var C=dojo.cldr.supplemental.getWeekend(A);
var B=(D||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,B){if(arguments.length==1){B=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-B+7)%7;
var D=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==B){D++
}return D
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var D=dojo.doc,B=D.documentElement,C=window,A=dojo.body();
if(dojo.isMozilla){return{w:B.clientWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&C.innerWidth){return{w:C.innerWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&B&&B.clientWidth){return{w:B.clientWidth,h:B.clientHeight}
}else{if(A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(D){var C=dojo.dnd.getViewport(),B=0,A=0;
if(D.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){B=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(D.clientX>C.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){B=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(D.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){A=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(D.clientY>C.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){A=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(B,A)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(G){for(var C=G.target;
C;
){if(C.nodeType==1&&(C.tagName.toLowerCase() in dojo.dnd._validNodes)){var N=dojo.getComputedStyle(C);
if(N.overflow.toLowerCase() in dojo.dnd._validOverflow){var H=dojo._getContentBox(C,N),L=dojo._abs(C,true);
H.l+=L.x+C.scrollLeft;
H.t+=L.y+C.scrollTop;
var J=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,H.w/2),F=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,H.h/2),B=G.pageX-H.l,A=G.pageY-H.t,M=0,K=0;
if(B>0&&B<H.w){if(B<J){M=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(B>H.w-J){M=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(A>0&&A<H.h){if(A<F){K=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(A>H.h-F){K=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var D=C.scrollLeft,E=C.scrollTop;
C.scrollLeft=C.scrollLeft+M;
C.scrollTop=C.scrollTop+K;
if(D!=C.scrollLeft||E!=C.scrollTop){return 
}}}try{C=C.parentNode
}catch(I){C=null
}}dojo.dnd.autoScroll(G)
}
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(A){return A[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(A));
return A
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(B){var A=B.target;
if(A.nodeType==3){A=A.parentNode
}return" button textarea input select option ".indexOf(" "+A.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(A,B){this.node=dojo.byId(A);
if(!B){B={}
}this.creator=B.creator||null;
this.skipForm=B.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(B&&B._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(A){return this.map[A]
},setItem:function(A,B){this.map[A]=B
},delItem:function(A){delete this.map[A]
},forInItems:function(C,E){E=E||dojo.global;
var A=this.map,D=dojo.dnd._empty;
for(var B in this.map){if(B in D){continue
}C.call(E,A[B],B,A)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(E,D,A){if(!this.parent.firstChild){A=null
}else{if(D){if(!A){A=this.parent.firstChild
}}else{if(A){A=A.nextSibling
}}}if(A){for(var C=0;
C<E.length;
++C){var B=this._normalizedCreator(E[C]);
this.setItem(B.node.id,{data:B.data,type:B.type});
this.parent.insertBefore(B.node,A)
}}else{for(var C=0;
C<E.length;
++C){var B=this._normalizedCreator(E[C]);
this.setItem(B.node.id,{data:B.data,type:B.type});
this.parent.appendChild(B.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Container(A,B)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var A=this.parent.getElementsByTagName("tbody");
if(A&&A.length){this.parent=A[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(C){if(!C.id){C.id=dojo.dnd.getUniqueId()
}var B=C.getAttribute("dndType"),D=C.getAttribute("dndData");
this.setItem(C.id,{data:D?D:C.innerHTML,type:B?B.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(B){var C=B.relatedTarget;
while(C){if(C==this.node){break
}try{C=C.parentNode
}catch(A){C=null
}}if(!C){this._changeState("Container","Over");
this.onOverEvent()
}C=this._getChildByEvent(B);
if(this.current==C){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(C){this._addItemClass(C,"Over")
}this.current=C
},onMouseOut:function(B){for(var C=B.relatedTarget;
C;
){if(C==this.node){return 
}try{C=C.parentNode
}catch(A){C=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(A){if(!this.skipForm||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(A,D){var C="dojoDnd"+A;
var B=A.toLowerCase()+"State";
dojo.removeClass(this.node,C+this[B]);
dojo.addClass(this.node,C+D);
this[B]=D
},_addItemClass:function(B,A){dojo.addClass(B,"dojoDndItem"+A)
},_removeItemClass:function(B,A){dojo.removeClass(B,"dojoDndItem"+A)
},_getChildByEvent:function(C){var B=C.target;
if(B){for(var A=B.parentNode;
A;
B=A,A=B.parentNode){if(A==this.parent&&dojo.hasClass(B,"dojoDndItem")){return B
}}}return null
},_normalizedCreator:function(B,C){var A=(this.creator?this.creator:this.defaultCreator)(B,C);
if(!dojo.isArray(A.type)){A.type=["text"]
}if(!A.node.id){A.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(A.node,"dojoDndItem");
return A
}});
dojo.dnd._createNode=function(A){if(!A){return dojo.dnd._createSpan
}return function(B){var C=dojo.doc.createElement(A);
C.innerHTML=B;
return C
}
};
dojo.dnd._createTrTd=function(B){var A=dojo.doc.createElement("tr");
var C=dojo.doc.createElement("td");
C.innerHTML=B;
A.appendChild(C);
return A
};
dojo.dnd._createSpan=function(A){var B=dojo.doc.createElement("span");
B.innerHTML=A;
return B
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(B){var A=B.tagName.toLowerCase();
var C=A=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[A]);
return function(G,I){var D=dojo.isObject(G)&&G;
var H=(D&&G.data)?G.data:G;
var F=(D&&G.type)?G.type:["text"];
var E=String(H),J=(I=="avatar"?dojo.dnd._createSpan:C)(E);
J.id=dojo.dnd.getUniqueId();
return{node:J,data:H,type:F}
}
}
}if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(A,B){if(!B){B={}
}this.singular=B.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var B=new dojo.NodeList();
var C=dojo.dnd._empty;
for(var A in this.selection){if(A in C){continue
}B.push(dojo.byId(A))
}return B
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(A,B){this._addItemClass(dojo.byId(B),"Selected");
this.selection[B]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var B=dojo.dnd._empty;
for(var A in this.selection){if(A in B){continue
}var C=dojo.byId(A);
this.delItem(A);
dojo._destroyElement(C)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(A,E,D,B){var C=this._normalizedCreator;
this._normalizedCreator=function(G,H){var F=C.call(this,G,H);
if(A){if(!this.anchor){this.anchor=F.node;
this._removeItemClass(F.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=F.node){this._removeItemClass(F.node,"Anchor");
this._addItemClass(F.node,"Selected")
}}this.selection[F.node.id]=1
}else{this._removeItemClass(F.node,"Selected");
this._removeItemClass(F.node,"Anchor")
}return F
};
dojo.dnd.Selector.superclass.insertNodes.call(this,E,D,B);
this._normalizedCreator=C;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Selector(A,B)
},onMouseDown:function(C){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(C)&&!C.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(C);
return 
}if(!this.singular&&C.shiftKey){if(!dojo.dnd.getCopyKeyState(C)){this._removeSelection()
}var D=dojo.query("> .dojoDndItem",this.parent);
if(D.length){if(!this.anchor){this.anchor=D[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var A=0;
for(;
A<D.length;
++A){var B=D[A];
if(B==this.anchor||B==this.current){break
}}for(++A;
A<D.length;
++A){var B=D[A];
if(B==this.anchor||B==this.current){break
}this._addItemClass(B,"Selected");
this.selection[B.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(C)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(C)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
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
}}}}dojo.stopEvent(C)
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(A){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var C=dojo.dnd._empty;
for(var A in this.selection){if(A in C){continue
}var B=dojo.byId(A);
if(B){this._removeItemClass(B,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.dnd.Avatar=function(A){this.manager=A;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var B=dojo.doc.createElement("table");
B.className="dojoDndAvatar";
B.style.position="absolute";
B.style.zIndex=1999;
B.style.margin="0px";
var A=dojo.doc.createElement("tbody");
var G=dojo.doc.createElement("tr");
G.className="dojoDndAvatarHeader";
var H=dojo.doc.createElement("td");
H.innerHTML=this._generateText();
G.appendChild(H);
dojo.style(G,"opacity",0.9);
A.appendChild(G);
var C=Math.min(5,this.manager.nodes.length);
var F=this.manager.source;
for(var D=0;
D<C;
++D){G=dojo.doc.createElement("tr");
G.className="dojoDndAvatarItem";
H=dojo.doc.createElement("td");
var E=F.creator?E=F._normalizedCreator(F.getItem(this.manager.nodes[D].id).data,"avatar").node:E=this.manager.nodes[D].cloneNode(true);
E.id="";
E.style.width=(this.manager.nodes[D].clientWidth||this.manager.nodes[D].offsetWidth)+"px";
E.style.height=(this.manager.nodes[D].clientHeight||this.manager.nodes[D].offsetHeight)+"px";
H.appendChild(E);
G.appendChild(H);
dojo.style(G,"opacity",(9-D)/10);
A.appendChild(G)
}B.appendChild(A);
this.node=B
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var B=this.node.getElementsByTagName("td");
for(var A=0;
A<B.length;
++A){var C=B[A];
if(dojo.hasClass(C.parentNode,"dojoDndAvatarHeader")){C.innerHTML=this._generateText();
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
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(A){if(this.avatar){this.target=(A&&A.targetState!="Disabled")?A:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[A])
},outSource:function(A){if(this.avatar){if(this.target==A){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(B,A,D){this.source=B;
this.nodes=A;
this.copy=Boolean(D);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[B,A,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var C="dojoDnd"+(D?"Copy":"Move");
dojo.addClass(dojo.body(),C)
},canDrop:function(A){var B=this.target&&A;
if(this.canDropFlag!=B){this.canDropFlag=B;
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
},onMouseMove:function(B){var A=this.avatar;
if(A){dojo.dnd.autoScroll(B);
dojo.marginBox(A.node,{l:B.pageX+this.OFFSET_X,t:B.pageY+this.OFFSET_Y});
var C=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(B)));
if(this.copy!=C){this._setCopyStatus(C)
}}},onMouseUp:function(A){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==A.button)){if(this.target&&this.canDropFlag){var B=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(A))),this.target];
dojo.publish("/dnd/drop/before",B);
dojo.publish("/dnd/drop",B)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(A){if(this.avatar){switch(A.keyCode){case dojo.keys.CTRL:var B=Boolean(this.source.copyState(true));
if(this.copy!=B){this._setCopyStatus(B)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(A){if(this.avatar&&A.keyCode==dojo.keys.CTRL){var B=Boolean(this.source.copyState(false));
if(this.copy!=B){this._setCopyStatus(B)
}}},_setCopyStatus:function(A){this.copy=A;
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
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(C,D){if(!D){D={}
}this.isSource=typeof D.isSource=="undefined"?true:D.isSource;
var B=D.accept instanceof Array?D.accept:["text"];
this.accept=null;
if(B.length){this.accept={};
for(var A=0;
A<B.length;
++A){this.accept[B[A]]=1
}}this.horizontal=D.horizontal;
this.copyOnly=D.copyOnly;
this.withHandles=D.withHandles;
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
},checkAcceptance:function(F,B){if(this==F){return true
}for(var D=0;
D<B.length;
++D){var E=F.getItem(B[D].id).type;
var A=false;
for(var C=0;
C<E.length;
++C){if(E[C] in this.accept){A=true;
break
}}if(!A){return false
}}return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Source(A,B)
},onMouseMove:function(D){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,D);
var A=dojo.dnd.manager();
if(this.isDragging){var C=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){C=(D.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{C=(D.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||C!=this.before){this._markTargetAnchor(C);
A.canDrop(!this.current||A.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var B=this.getSelectedNodes();
if(B.length){A.startDrag(this,B,this.copyState(dojo.dnd.getCopyKeyState(D)))
}}}},onMouseDown:function(A){if(this._legalMouseDown(A)&&(!this.skipForm||!dojo.dnd.isFormElement(A))){this.mouseDown=true;
this.mouseButton=A.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,A)
}},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,A)
}},onDndSourceOver:function(B){if(this!=B){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var A=dojo.dnd.manager();
A.canDrop(this.targetState!="Disabled"&&(!this.current||A.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(B,A,D){if(this.isSource){this._changeState("Source",this==B?(D?"Copied":"Moved"):"")
}var C=this.accept&&this.checkAcceptance(B,A);
this._changeState("Target",C?"":"Disabled");
if(C&&this==B){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(C,A,D){do{if(this.containerState!="Over"){break
}var B=this._normalizedCreator;
if(this!=C){if(this.creator){this._normalizedCreator=function(E,F){return B.call(this,C.getItem(E.id).data,F)
}
}else{if(D){this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
var H=F.cloneNode(true);
H.id=dojo.dnd.getUniqueId();
return{node:H,data:E.data,type:E.type}
}
}else{this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
C.delItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(D){this._normalizedCreator=function(E,F){return B.call(this,C.getItem(E.id).data,F)
}
}else{if(!this.current){break
}this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}else{if(D){this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
var H=F.cloneNode(true);
H.id=dojo.dnd.getUniqueId();
return{node:H,data:E.data,type:E.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(F,G){var E=C.getItem(F.id);
return{node:F,data:E.data,type:E.type}
}
}}}this._removeSelection();
if(this!=C){this._removeAnchor()
}if(this!=C&&!D&&!this.creator){C.selectNone()
}this.insertNodes(true,A,this.before,this.current);
if(this!=C&&!D&&this.creator){C.deleteSelectedNodes()
}this._normalizedCreator=B
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
},_markTargetAnchor:function(A){if(this.current==this.targetAnchor&&this.before==A){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=A;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(A){this._changeState("Source",A?"Copied":"Moved")
},_legalMouseDown:function(D){if(!this.withHandles){return true
}for(var C=D.target;
C&&!dojo.hasClass(C,"dojoDndItem");
C=C.parentNode){if(dojo.hasClass(C,"dojoDndHandle")){var B=D;
if(!B){B=window.event
}var E={x:B.clientX,y:B.clientY};
var A=false;
dojo.query("a",C).forEach(function(G){if(!A){var F=G.getBoundingClientRect();
A=(F.left<=E.x&&E.x<=F.right&&F.top<=E.y&&E.y<=F.bottom)
}});
if(A){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(A,B){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(B,A){B._skipStartup=true;
return new dojo.dnd.Target(A,B)
}})
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(D,E,C){this.node=dojo.byId(D);
this.marginBox={l:E.pageX,t:E.pageY};
this.mouseButton=E.button;
var B=this.host=C,F=D.ownerDocument,A=dojo.connect(F,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(F,"onmousemove",this,"onMouseMove"),dojo.connect(F,"onmouseup",this,"onMouseUp"),dojo.connect(F,"ondragstart",dojo,"stopEvent"),dojo.connect(F,"onselectstart",dojo,"stopEvent"),A];
if(B&&B.onMoveStart){B.onMoveStart(this)
}},onMouseMove:function(B){dojo.dnd.autoScroll(B);
var A=this.marginBox;
this.host.onMove(this,{l:A.l+B.pageX,t:A.t+B.pageY})
},onMouseUp:function(A){if(this.mouseButton==A.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var A=dojo.marginBox(this.node);
A.l-=this.marginBox.l;
A.t-=this.marginBox.t;
this.marginBox=A;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var A=this.host;
if(A&&A.onMoveStop){A.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(A,B){this.node=dojo.byId(A);
if(!B){B={}
}this.handle=B.handle?dojo.byId(B.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=B.delay>0?B.delay:0;
this.skip=B.skip;
this.mover=B.mover?B.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(B,A){return new dojo.dnd.Moveable(A,B)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=A.pageX;
this._lastY=A.pageY
}else{new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.pageX-this._lastX)>this.delay||Math.abs(A.pageY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseUp:function(A){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(A){if(!this.skip||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onMoveStart:function(A){dojo.publish("/dnd/move/start",[A]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(A){dojo.publish("/dnd/move/stop",[A]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(A){},onMove:function(B,A){this.onMoving(B,A);
dojo.marginBox(B.node,A);
this.onMoved(B,A)
},onMoving:function(B,A){},onMoved:function(B,A){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(B,A){return new dojo.dnd.move.constrainedMoveable(A,B)
},constructor:function(A,B){if(!B){B={}
}this.constraints=B.constraints;
this.within=B.within
},onFirstMove:function(B){var C=this.constraintBox=this.constraints.call(this,B),A=B.marginBox;
C.r=C.l+C.w-(this.within?A.w:0);
C.b=C.t+C.h-(this.within?A.h:0)
},onMove:function(B,A){var C=this.constraintBox;
A.l=A.l<C.l?C.l:C.r<A.l?C.r:A.l;
A.t=A.t<C.t?C.t:C.b<A.t?C.b:A.t;
dojo.marginBox(B.node,A)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(B,A){return new dojo.dnd.move.boxConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.box;
this.constraints=function(){return A
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(B,A){return new dojo.dnd.move.parentConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.area;
this.constraints=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(A=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
}
}});
dojo.dnd.move.constrainedMover=function(A,C){var B=function(E,F,D){dojo.dnd.Mover.call(this,E,F,D)
};
dojo.extend(B,dojo.dnd.Mover.prototype);
dojo.extend(B,{onMouseMove:function(G){dojo.dnd.autoScroll(G);
var D=this.marginBox,H=this.constraintBox,E=D.l+G.pageX,F=D.t+G.pageY;
E=E<H.l?H.l:H.r<E?H.r:E;
F=F<H.t?H.t:H.b<F?H.b:F;
this.host.onMove(this,{l:E,t:F})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var E=this.constraintBox=A.call(this),D=this.marginBox;
E.r=E.l+E.w-(C?D.w:0);
E.b=E.t+E.h-(C?D.h:0)
}});
return B
};
dojo.dnd.move.boxConstrainedMover=function(B,A){return dojo.dnd.move.constrainedMover(function(){return B
},A)
};
dojo.dnd.move.parentConstrainedMover=function(C,B){var A=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(C=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
};
return dojo.dnd.move.constrainedMover(A,B)
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
},setSrc:function(C,E,B){try{if(!B){if(dojo.isSafari){C.location=E
}else{frames[C.name].location=E
}}else{var A;
if(dojo.isIE||dojo.isSafari>2){A=C.contentWindow.document
}else{if(dojo.isSafari){A=C.document
}else{A=C.contentWindow
}}if(!A){C.location=E;
return 
}else{A.location.replace(E)
}}}catch(D){console.debug("dojo.io.iframe.setSrc: ",D)
}},doc:function(A){var B=A.contentDocument||((A.contentWindow)&&(A.contentWindow.document))||((A.name)&&(document.frames[A.name])&&(document.frames[A.name].document))||null;
return B
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
}var J=this._currentDfd=this._dfdQueue.shift();
var C=J.ioArgs;
var F=C.args;
C._contentToClean=[];
var G=F.form;
var E=F.content||{};
if(G){if(E){for(var H in E){if(!G[H]){var I;
if(dojo.isIE){I=dojo.doc.createElement("<input type='hidden' name='"+H+"'>")
}else{I=dojo.doc.createElement("input");
I.type="hidden";
I.name=H
}I.value=E[H];
G.appendChild(I);
C._contentToClean.push(H)
}else{G[H].value=E[H]
}}}var L=G.getAttributeNode("action");
var B=G.getAttributeNode("method");
var A=G.getAttributeNode("target");
if(F.url){C._originalAction=L?L.value:null;
if(L){L.value=F.url
}else{G.setAttribute("action",F.url)
}}if(!B||!B.value){if(B){B.value=(F.method)?F.method:"post"
}else{G.setAttribute("method",(F.method)?F.method:"post")
}}C._originalTarget=A?A.value:null;
if(A){A.value=this._iframeName
}else{G.setAttribute("target",this._iframeName)
}G.target=this._iframeName;
G.submit()
}else{var K=F.url+(F.url.indexOf("?")>-1?"&":"?")+C.query;
this.setSrc(this._frame,K,true)
}}catch(D){J.errback(D)
}},_iframeOnload:function(){var H=this._currentDfd;
if(!H){this._fireNextRequest();
return 
}var D=H.ioArgs;
var E=D.args;
var F=E.form;
if(F){var B=D._contentToClean;
for(var C=0;
C<B.length;
C++){var G=B[C];
if(dojo.isSafari<3){for(var A=0;
A<F.childNodes.length;
A++){var I=F.childNodes[A];
if(I.name==G){dojo._destroyElement(I);
break
}}}else{dojo._destroyElement(F[G]);
F[G]=null
}}if(D._originalAction){F.setAttribute("action",D._originalAction)
}if(D._originalTarget){F.setAttribute("target",D._originalTarget);
F.target=D._originalTarget
}}D._finished=true
}}
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(D,B){var A="^";
var E=null;
for(var C=0;
C<D.length;
C++){E=D.charAt(C);
switch(E){case"\\":A+=E;
C++;
A+=D.charAt(C);
break;
case"*":A+=".*";
break;
case"?":A+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":A+="\\";
default:A+=E
}}A+="$";
if(B){return new RegExp(A,"i")
}else{return new RegExp(A)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(B,A){var C=0;
if(B>A||typeof B==="undefined"||B===null){C=1
}else{if(B<A||typeof A==="undefined"||A===null){C=-1
}}return C
};
dojo.data.util.sorter.createSortFunction=function(D,B){var F=[];
function A(G,H){return function(M,L){var K=B.getValue(M,G);
var I=B.getValue(L,G);
var J=null;
if(B.comparatorMap){if(typeof G!=="string"){G=B.getIdentity(G)
}J=B.comparatorMap[G]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return H*J(K,I)
}
}for(var C=0;
C<D.length;
C++){sortAttribute=D[C];
if(sortAttribute.attribute){var E=(sortAttribute.descending)?-1:1;
F.push(A(sortAttribute.attribute,E))
}}return function(H,G){var J=0;
while(J<F.length){var I=F[J++](H,G);
if(I!==0){return I
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(D){D=D||{};
if(!D.store){D.store=this
}var B=this;
var C=function(G,E){if(E.onError){var F=E.scope||dojo.global;
E.onError.call(F,G,E)
}};
var A=function(I,J){var M=J.abort||null;
var E=false;
var K=J.start?J.start:0;
var H=J.count?(K+J.count):I.length;
J.abort=function(){E=true;
if(M){M.call(J)
}};
var N=J.scope||dojo.global;
if(!J.store){J.store=B
}if(J.onBegin){J.onBegin.call(N,I.length,J)
}if(J.sort){I.sort(dojo.data.util.sorter.createSortFunction(J.sort,B))
}if(J.onItem){for(var G=K;
(G<I.length)&&(G<H);
++G){var L=I[G];
if(!E){J.onItem.call(N,L,J)
}}}if(J.onComplete&&!E){var F=null;
if(!J.onItem){F=I.slice(K,H)
}J.onComplete.call(N,F,J)
}};
this._fetchItems(D,A,C);
return D
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(A){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=A.url;
this._jsonData=A.data;
this._datatypeMap=A.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(B){return dojo.date.stamp.fromISOString(B)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(D,C,A){var B=this.getValues(D,C);
return(B.length>0)?B[0]:A
},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
return B[A]||[]
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
for(var B in C){if((B!==this._storeRefPropName)&&(B!==this._itemNumPropName)&&(B!==this._rootItemPropName)){A.push(B)
}}return A
},hasAttribute:function(B,A){return this.getValues(B,A).length>0
},containsValue:function(B,A,D){var C=undefined;
if(typeof D==="string"){C=dojo.data.util.filter.patternToRegExp(D,false)
}return this._containsValue(B,A,D,C)
},_containsValue:function(B,A,D,C){return dojo.some(this.getValues(B,A),function(E){if(E!==null&&!dojo.isObject(E)&&C){if(E.toString().match(C)){return true
}}else{if(D===E){return true
}}})
},isItem:function(A){if(A&&A[this._storeRefPropName]===this){if(this._arrayOfAllItems[A[this._itemNumPropName]]===A){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},getFeatures:function(){return this._features
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){return this.getValue(A,this._labelAttr)
}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(C,H,B){var A=this;
var D=function(L,O){var N=[];
if(L.query){var M=L.queryOptions?L.queryOptions.ignoreCase:false;
var Q={};
for(var R in L.query){var P=L.query[R];
if(typeof P==="string"){Q[R]=dojo.data.util.filter.patternToRegExp(P,M)
}}for(var J=0;
J<O.length;
++J){var K=true;
var I=O[J];
if(I===null){K=false
}else{for(var R in L.query){var P=L.query[R];
if(!A._containsValue(I,R,P,Q[R])){K=false
}}}if(K){N.push(I)
}}H(N,L)
}else{for(var J=0;
J<O.length;
++J){var S=O[J];
if(S!==null){N.push(S)
}}H(N,L)
}};
if(this._loadFinished){D(C,this._getItemsArray(C.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(I){try{A._getItemsFromLoadedData(I);
A._loadFinished=true;
A._loadInProgress=false;
D(C,A._getItemsArray(C.queryOptions));
A._handleQueuedFetches()
}catch(J){A._loadFinished=true;
A._loadInProgress=false;
B(J,C)
}});
E.addErrback(function(I){A._loadInProgress=false;
B(I,C)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
D(C,this._getItemsArray(C.queryOptions))
}catch(G){B(G,C)
}}else{B(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),C)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var C=0;
C<this._queuedFetches.length;
C++){var A=this._queuedFetches[C];
var B=A.args;
var D=A.filter;
if(D){D(B,this._getItemsArray(B.queryOptions))
}else{this.fetchItemByIdentity(B)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(E){function B(U){var V=((U!=null)&&(typeof U=="object")&&(!dojo.isArray(U))&&(!dojo.isFunction(U))&&(U.constructor==Object)&&(typeof U._reference=="undefined")&&(typeof U._type=="undefined")&&(typeof U._value=="undefined"));
return V
}var J=this;
function R(Z){J._arrayOfAllItems.push(Z);
for(var Y in Z){var X=Z[Y];
if(X){if(dojo.isArray(X)){var W=X;
for(var V=0;
V<W.length;
++V){var U=W[V];
if(B(U)){R(U)
}}}else{if(B(X)){R(X)
}}}}}this._labelAttr=E.label;
var O;
var Q;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=E.items;
for(O=0;
O<this._arrayOfTopLevelItems.length;
++O){Q=this._arrayOfTopLevelItems[O];
R(Q);
Q[this._rootItemPropName]=true
}var L={};
var S;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){if(S!==this._rootItemPropName){var K=Q[S];
if(K!==null){if(!dojo.isArray(K)){Q[S]=[K]
}}else{Q[S]=[null]
}}L[S]=S
}}while(L[this._storeRefPropName]){this._storeRefPropName+="_"
}while(L[this._itemNumPropName]){this._itemNumPropName+="_"
}var H;
var D=E.identifier;
if(D){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=D;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
H=Q[D];
var T=H[0];
if(!this._itemsByIdentity[T]){this._itemsByIdentity[T]=Q
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
Q[this._storeRefPropName]=this;
Q[this._itemNumPropName]=O
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){H=Q[S];
for(var N=0;
N<H.length;
++N){K=H[N];
if(K!==null&&typeof K=="object"){if(K._type&&K._value){var F=K._type;
var G=this._datatypeMap[F];
if(!G){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+F+"'")
}else{if(dojo.isFunction(G)){H[N]=new G(K._value)
}else{if(dojo.isFunction(G.deserialize)){H[N]=G.deserialize(K._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(K._reference){var A=K._reference;
if(dojo.isString(A)){H[N]=this._itemsByIdentity[A]
}else{for(var M=0;
M<this._arrayOfAllItems.length;
++M){var C=this._arrayOfAllItems[M];
var I=true;
for(var P in A){if(C[P]!=A[P]){I=false
}}if(I){H[N]=C
}}}}}}}}},getIdentity:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return B[this._itemNumPropName]
}else{var C=B[A];
if(C){return C[0]
}}return null
},fetchItemByIdentity:function(B){if(!this._loadFinished){var A=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:B})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(J){var H=B.scope?B.scope:dojo.global;
try{A._getItemsFromLoadedData(J);
A._loadFinished=true;
A._loadInProgress=false;
var I=A._getItemByIdentity(B.identity);
if(B.onItem){B.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){A._loadInProgress=false;
if(B.onError){B.onError.call(H,G)
}}});
E.addErrback(function(G){A._loadInProgress=false;
if(B.onError){var H=B.scope?B.scope:dojo.global;
B.onError.call(H,G)
}})
}}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true;
var D=A._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}}}else{var D=this._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}},_getItemByIdentity:function(A){var B=null;
if(this._itemsByIdentity){B=this._itemsByIdentity[A]
}else{B=this._arrayOfAllItems[A]
}if(B===undefined){B=null
}return B
},getIdentityAttributes:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return null
}else{return[A]
}},_forceLoad:function(){var A=this;
if(this._jsonFileUrl){var C={url:A._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var B=dojo.xhrGet(C);
B.addCallback(function(D){try{if(A._loadInProgress!==true&&!A._loadFinished){A._getItemsFromLoadedData(D);
A._loadFinished=true
}}catch(E){console.log(E);
throw E
}});
B.addErrback(function(D){throw D
})
}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(A){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(B){return dojo.date.stamp.toISOString(B,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(A){if(!A){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var A=this.getFeatures()["dojo.data.api.Identity"];
return A
},newItem:function(J,A){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof J!="object"&&typeof J!="undefined"){throw new Error("newItem() was passed something other than an object")
}var E=null;
var B=this._getIdentifierAttribute();
if(B===Number){E=this._arrayOfAllItems.length
}else{E=J[B];
if(typeof E==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(E)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[E]==="undefined")
}this._assert(typeof this._pending._newItems[E]==="undefined");
this._assert(typeof this._pending._deletedItems[E]==="undefined");
var C={};
C[this._storeRefPropName]=this;
C[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[E]=C
}this._arrayOfAllItems.push(C);
var G=null;
if(A&&A.parent&&A.attribute){G={item:A.parent,attribute:A.attribute,oldValue:undefined};
var I=this.getValues(A.parent,A.attribute);
if(I&&I.length>0){var D=I.slice(0,I.length);
if(I.length===1){G.oldValue=I[0]
}else{G.oldValue=I.slice(0,I.length)
}D.push(C);
this._setValueOrValues(A.parent,A.attribute,D,false);
G.newValue=this.getValues(A.parent,A.attribute)
}else{this._setValueOrValues(A.parent,A.attribute,C,false);
G.newValue=C
}}else{C[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(C)
}this._pending._newItems[E]=C;
for(var H in J){if(H===this._storeRefPropName||H===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var F=J[H];
if(!dojo.isArray(F)){F=[F]
}C[H]=F
}this.onNew(C,G);
return C
},_removeArrayElement:function(C,B){var A=dojo.indexOf(C,B);
if(A!=-1){C.splice(A,1);
return true
}return false
},deleteItem:function(B){this._assert(!this._saveInProgress);
this._assertIsItem(B);
var C=B[this._itemNumPropName];
this._arrayOfAllItems[C]=null;
var A=this.getIdentity(B);
B[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[A]
}this._pending._deletedItems[A]=B;
if(B[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,B)
}this.onDelete(B);
return true
},setValue:function(B,A,C){return this._setValueOrValues(B,A,C,true)
},setValues:function(C,B,A){return this._setValueOrValues(C,B,A,true)
},unsetAttribute:function(B,A){return this._setValueOrValues(B,A,[],true)
},_setValueOrValues:function(P,C,J,F){this._assert(!this._saveInProgress);
this._assertIsItem(P);
this._assert(dojo.isString(C));
this._assert(typeof J!=="undefined");
var H=this._getIdentifierAttribute();
if(C==H){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var G=this._getValueOrValues(P,C);
var K=this.getIdentity(P);
if(!this._pending._modifiedItems[K]){var A={};
for(var N in P){if((N===this._storeRefPropName)||(N===this._itemNumPropName)||(N===this._rootItemPropName)){A[N]=P[N]
}else{var M=P[N];
var I=[];
for(var E=0;
E<M.length;
++E){I.push(M[E])
}A[N]=I
}}this._pending._modifiedItems[K]=A
}var O=false;
if(dojo.isArray(J)&&J.length===0){O=delete P[C];
J=undefined
}else{var L=[];
if(dojo.isArray(J)){var Q=J;
for(var D=0;
D<Q.length;
++D){L.push(Q[D])
}}else{var B=J;
L.push(B)
}P[C]=L;
O=true
}if(F){this.onSet(P,C,G,J)
}return O
},_getValueOrValues:function(D,C){var A=undefined;
if(this.hasAttribute(D,C)){var B=this.getValues(D,C);
if(B.length==1){A=B[0]
}else{A=B
}}return A
},_flatten:function(D){if(this.isItem(D)){var C=D;
var A=this.getIdentity(C);
var B={_reference:A};
return B
}else{if(typeof D==="object"){for(type in this._datatypeMap){var E=this._datatypeMap[type];
if(dojo.isObject(E)&&!dojo.isFunction(E)){if(D instanceof E.type){if(!E.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:E.serialize(D)}
}}else{if(D instanceof E){return{_type:type,_value:D.toString()}
}}}}return D
}},_getNewFileContentString:function(){var J={};
var E=this._getIdentifierAttribute();
if(E!==Number){J.identifier=E
}if(this._labelAttr){J.label=this._labelAttr
}J.items=[];
for(var D=0;
D<this._arrayOfAllItems.length;
++D){var I=this._arrayOfAllItems[D];
if(I!==null){serializableItem={};
for(var H in I){if(H!==this._storeRefPropName&&H!==this._itemNumPropName){var A=H;
var G=this.getValues(I,A);
if(G.length==1){serializableItem[A]=this._flatten(G[0])
}else{var F=[];
for(var C=0;
C<G.length;
++C){F.push(this._flatten(G[C]));
serializableItem[A]=F
}}}}J.items.push(serializableItem)
}}var B=true;
return dojo.toJson(J,B)
},save:function(B){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var A=this;
var D=function(){A._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
A._saveInProgress=false;
if(B&&B.onComplete){var F=B.scope||dojo.global;
B.onComplete.call(F)
}};
var E=function(){A._saveInProgress=false;
if(B&&B.onError){var F=B.scope||dojo.global;
B.onError.call(F)
}};
if(this._saveEverything){var C=this._getNewFileContentString();
this._saveEverything(D,E,C)
}if(this._saveCustom){this._saveCustom(D,E)
}if(!this._saveEverything&&!this._saveCustom){D()
}},revert:function(){this._assert(!this._saveInProgress);
var C;
for(C in this._pending._newItems){var E=this._pending._newItems[C];
E[this._storeRefPropName]=null;
this._arrayOfAllItems[E[this._itemNumPropName]]=null;
if(E[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,E)
}if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}}for(C in this._pending._modifiedItems){var G=this._pending._modifiedItems[C];
var F=null;
if(this._itemsByIdentity){F=this._itemsByIdentity[C]
}else{F=this._arrayOfAllItems[C]
}G[this._storeRefPropName]=this;
F[this._storeRefPropName]=null;
var B=F[this._itemNumPropName];
this._arrayOfAllItems[B]=G;
if(F[this._rootItemPropName]){B=F[this._itemNumPropName];
this._arrayOfTopLevelItems[B]=G
}if(this._itemsByIdentity){this._itemsByIdentity[C]=G
}}for(C in this._pending._deletedItems){var A=this._pending._deletedItems[C];
A[this._storeRefPropName]=this;
var D=A[this._itemNumPropName];
this._arrayOfAllItems[D]=A;
if(this._itemsByIdentity){this._itemsByIdentity[C]=A
}if(A[this._rootItemPropName]){this._arrayOfTopLevelItems.push(A)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(C){if(C){var A=this.getIdentity(C);
return new Boolean(this._pending._newItems[A]||this._pending._modifiedItems[A]||this._pending._deletedItems[A])
}else{var B;
for(B in this._pending._newItems){return true
}for(B in this._pending._modifiedItems){return true
}for(B in this._pending._deletedItems){return true
}return false
}},onSet:function(C,B,A,D){},onNew:function(B,A){},onDelete:function(A){}})
};
if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var C=dojo.global;
var A=dojo.doc;
if(A.selection){return !A.selection.createRange().text
}else{if(C.getSelection){var B=C.getSelection();
if(dojo.isString(B)){return !B
}else{return B.isCollapsed||!B.toString()
}}}},getBookmark:function(){var C,B=dojo.doc.selection;
if(B){var A=B.createRange();
if(B.type.toUpperCase()=="CONTROL"){C=A.length?dojo._toArray(A):null
}else{C=A.getBookmark()
}}else{if(dojo.global.getSelection){B=dojo.global.getSelection();
if(B){var A=B.getRangeAt(0);
C=A.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return C
},moveToBookmark:function(D){var A=dojo.doc;
if(A.selection){var B;
if(dojo.isArray(D)){B=A.body.createControlRange();
dojo.forEach(D,B.addElement)
}else{B=A.selection.createRange();
B.moveToBookmark(D)
}B.select()
}else{var C=dojo.global.getSelection&&dojo.global.getSelection();
if(C&&C.removeAllRanges){C.removeAllRanges();
C.addRange(D)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,A){return{node:B&&dojo.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(A||dojo.global,dijit.isCollapsed)?dojo.withGlobal(A||dojo.global,dijit.getBookmark):null,openedForWindow:A}
},focus:function(D){if(!D){return 
}var C="node" in D?D.node:D,B=D.bookmark,A=D.openedForWindow;
if(C){var F=(C.tagName.toLowerCase()=="iframe")?C.contentWindow:C;
if(F&&F.focus){try{F.focus()
}catch(E){}}dijit._onFocusNode(C)
}if(B&&dojo.withGlobal(A||dojo.global,dijit.isCollapsed)){if(A){A.focus()
}try{dojo.withGlobal(A||dojo.global,moveToBookmark,null,[B])
}catch(E){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
}dojo.connect(B.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var A=B.document.body||B.document.getElementsByTagName("body")[0];
if(A){if(dojo.isIE){A.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
A.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{A.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
A.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}A=null
},_onBlurNode:function(B){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=false;
A._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(B){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var A=[];
try{while(B){if(B.dijitPopupParent){B=dijit.byId(B.dijitPopupParent).domNode
}else{if(B.tagName&&B.tagName.toLowerCase()=="body"){if(B===dojo.body()){break
}B=dojo.query("iframe").filter(function(E){return E.contentDocument.body===B
})[0]
}else{var D=B.getAttribute&&B.getAttribute("widgetId");
if(D){A.unshift(D)
}B=B.parentNode
}}}}catch(C){}dijit._setStack(A)
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
dojo.publish("focusNode",[B]);
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=true;
A._setStateClass()
}},_setStack:function(A){var E=dijit._activeStack;
dijit._activeStack=A;
for(var C=0;
C<Math.min(E.length,A.length);
C++){if(E[C]!=A[C]){break
}}for(var B=E.length-1;
B>=C;
B--){var D=dijit.byId(E[B]);
if(D){dojo.publish("widgetBlur",[D]);
if(D._onBlur){D._onBlur()
}}}for(var B=C;
B<A.length;
B++){var D=dijit.byId(A[B]);
if(D){dojo.publish("widgetFocus",[D]);
if(D._onFocus){D._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(A){if(this._hash[A.id]){throw new Error("Tried to register widget with id=="+A.id+" but that id is already registered")
}this._hash[A.id]=A
},remove:function(A){delete this._hash[A]
},forEach:function(A){for(var B in this._hash){A(this._hash[B])
}},filter:function(B){var A=new dijit.WidgetSet();
this.forEach(function(C){if(B(C)){A.add(C)
}});
return A
},byId:function(A){return this._hash[A]
},byClass:function(A){return this.filter(function(B){return B.declaredClass==A
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(A){var B;
do{B=A+"_"+(dijit._widgetTypeCtr[A]!==undefined?++dijit._widgetTypeCtr[A]:dijit._widgetTypeCtr[A]=0)
}while(dijit.byId(B));
return B
};
if(dojo.isIE){dojo.addOnUnload(function(){dijit.registry.forEach(function(A){A.destroy()
})
})
}dijit.byId=function(A){return(dojo.isString(A))?dijit.registry.byId(A):A
};
dijit.byNode=function(A){return dijit.registry.byId(A.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(A){while(A){if(A.getAttribute&&A.getAttribute("widgetId")){return dijit.registry.byId(A.getAttribute("widgetId"))
}A=A.parentNode
}return null
}
}if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var A=dojo.global;
var G=dojo.doc;
var H=0,C=0;
if(dojo.isMozilla){var I,D,E,B;
if(G.body.clientWidth>G.documentElement.clientWidth){I=G.documentElement.clientWidth;
E=G.body.clientWidth
}else{E=G.documentElement.clientWidth;
I=G.body.clientWidth
}if(G.body.clientHeight>G.documentElement.clientHeight){D=G.documentElement.clientHeight;
B=G.body.clientHeight
}else{B=G.documentElement.clientHeight;
D=G.body.clientHeight
}H=(E>A.innerWidth)?I:E;
C=(B>A.innerHeight)?D:B
}else{if(!dojo.isOpera&&A.innerWidth){H=A.innerWidth;
C=A.innerHeight
}else{if(dojo.isIE&&G.documentElement&&G.documentElement.clientHeight){H=G.documentElement.clientWidth;
C=G.documentElement.clientHeight
}else{if(dojo.body().clientWidth){H=dojo.body().clientWidth;
C=dojo.body().clientHeight
}}}}var F=dojo._docScroll();
return{w:H,h:C,l:F.x,t:F.y}
};
dijit.placeOnScreen=function(B,E,A,C){var D=dojo.map(A,function(F){return{corner:F,pos:E}
});
return dijit._place(B,D)
};
dijit._place=function(O,L,H){var I=dijit.getViewport();
if(!O.parentNode||String(O.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(O)
}var E=null;
for(var P=0;
P<L.length;
P++){var G=L[P].corner;
var F=L[P].pos;
if(H){H(G)
}var K=O.style.display;
var B=O.style.visibility;
O.style.visibility="hidden";
O.style.display="";
var A=dojo.marginBox(O);
O.style.display=K;
O.style.visibility=B;
var R=(G.charAt(1)=="L"?F.x:Math.max(I.l,F.x-A.w)),Q=(G.charAt(0)=="T"?F.y:Math.max(I.t,F.y-A.h)),D=(G.charAt(1)=="L"?Math.min(I.l+I.w,R+A.w):F.x),C=(G.charAt(0)=="T"?Math.min(I.t+I.h,Q+A.h):F.y),M=D-R,J=C-Q,N=(A.w-M)+(A.h-J);
if(E==null||N<E.overflow){E={corner:G,aroundCorner:L[P].aroundCorner,x:R,y:Q,w:M,h:J,overflow:N}
}if(N==0){break
}}O.style.left=E.x+"px";
O.style.top=E.y+"px";
return E
};
dijit.placeOnScreenAroundElement=function(B,E,F,C){E=dojo.byId(E);
var H=E.style.display;
E.style.display="";
var I=E.offsetWidth;
var D=E.offsetHeight;
var G=dojo.coords(E,true);
E.style.display=H;
var J=[];
for(var A in F){J.push({aroundCorner:A,corner:F[A],pos:{x:G.x+(A.charAt(1)=="L"?0:I),y:G.y+(A.charAt(0)=="T"?0:D)}})
}return dijit._place(B,J,C)
}
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(C){if(dojo.isSafari&&!C._parentWindow){var A=function(E){E.document._parentWindow=E;
for(var D=0;
D<E.frames.length;
D++){A(E.frames[D])
}};
A(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!C._parentWindow){C.parentWindow.execScript("document._parentWindow = window;","Javascript");
var B=C._parentWindow;
C._parentWindow=null;
return B
}return C._parentWindow||C.parentWindow||C.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var A=[],B=1000,C=1;
this.open=function(L){var K=L.popup,J=L.orient||{BL:"TL",TL:"BL"},M=L.around,F=(L.around&&L.around.id)?(L.around.id+"_dropdown"):("popup_"+C++);
var E=dojo.doc.createElement("div");
E.id=F;
E.className="dijitPopup";
E.style.zIndex=B+A.length;
E.style.visibility="hidden";
if(L.parent){E.dijitPopupParent=L.parent.id
}dojo.body().appendChild(E);
K.domNode.style.display="";
E.appendChild(K.domNode);
var I=new dijit.BackgroundIframe(E);
var H=M?dijit.placeOnScreenAroundElement(E,M,J,K.orient?dojo.hitch(K,"orient"):null):dijit.placeOnScreen(E,L,J=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
E.style.visibility="visible";
var G=[];
function D(){for(var N=A.length-1;
N>0&&A[N].parent===A[N-1].widget;
N--){}return A[N]
}G.push(dojo.connect(E,"onkeypress",this,function(N){if(N.keyCode==dojo.keys.ESCAPE&&L.onCancel){L.onCancel()
}else{if(N.keyCode==dojo.keys.TAB){dojo.stopEvent(N);
var O=D();
if(O&&O.onCancel){O.onCancel()
}}}}));
if(K.onCancel){G.push(dojo.connect(K,"onCancel",null,L.onCancel))
}G.push(dojo.connect(K,K.onExecute?"onExecute":"onChange",null,function(){var N=D();
if(N&&N.onExecute){N.onExecute()
}}));
A.push({wrapper:E,iframe:I,widget:K,parent:L.parent,onExecute:L.onExecute,onCancel:L.onCancel,onClose:L.onClose,handlers:G});
if(K.onOpen){K.onOpen(H)
}return H
};
this.close=function(E){while(dojo.some(A,function(J){return J.widget==E
})){var H=A.pop(),I=H.wrapper,F=H.iframe,G=H.widget,D=H.onClose;
if(G.onClose){G.onClose()
}dojo.forEach(H.handlers,dojo.disconnect);
if(!G||!G.domNode){return 
}dojo.style(G.domNode,"display","none");
dojo.body().appendChild(G.domNode);
F.destroy();
dojo._destroyElement(I);
if(D){D()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var C;
if(A.length){C=A.pop();
C.style.display=""
}else{if(dojo.isIE){var B="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
C=dojo.doc.createElement(B)
}else{var C=dojo.doc.createElement("iframe");
C.src='javascript:""';
C.className="dijitBackgroundIframe"
}C.tabIndex=-1;
dojo.body().appendChild(C)
}return C
};
this.push=function(B){B.style.display="";
if(dojo.isIE){B.style.removeExpression("width");
B.style.removeExpression("height")
}A.push(B)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var A=dijit._frames;
dojo.forEach([A.pop()],A.push)
})
}dijit.BackgroundIframe=function(B){if(!B.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var A=dijit._frames.pop();
B.appendChild(A);
if(dojo.isIE){A.style.setExpression("width","document.getElementById('"+B.id+"').offsetWidth");
A.style.setExpression("height","document.getElementById('"+B.id+"').offsetHeight")
}this.iframe=A
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(C){if(dojo.isIE){if(dojo.marginBox(C.parentNode).h<=C.parentNode.scrollHeight){C.scrollIntoView(false)
}}else{if(dojo.isMozilla){C.scrollIntoView(false)
}else{var A=C.parentNode;
var B=A.scrollTop+dojo.marginBox(A).h;
var D=C.offsetTop+dojo.marginBox(C).h;
if(B<D){A.scrollTop+=(D-B)
}else{if(A.scrollTop>C.offsetTop){A.scrollTop-=(A.scrollTop-C.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var G=dojo;
var F=G.isIE;
var A=G.isOpera;
var B=Math.floor;
var D={dj_ie:F,dj_ie6:B(F)==6,dj_ie7:B(F)==7,dj_iequirks:F&&G.isQuirks,dj_opera:A,dj_opera8:B(A)==8,dj_opera9:B(A)==9,dj_khtml:G.isKhtml,dj_safari:G.isSafari,dj_gecko:G.isMozilla};
for(var E in D){if(D[E]){var C=dojo.doc.documentElement;
if(C.className){C.className+=" "+E
}else{C.className=E
}}}})()
}if(!dojo._hasResource["dijit._base.bidi"]){dojo._hasResource["dijit._base.bidi"]=true;
dojo.provide("dijit._base.bidi");
dojo.addOnLoad(function(){if(!dojo._isBodyLtr()){dojo.addClass(dojo.body(),"dijitRtl")
}})
}if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(A,G,C,F,E,B,D){if(E!=this._obj){this.stop();
this._initialDelay=D||500;
this._subsequentDelay=B||0.9;
this._obj=E;
this._evt=A;
this._node=C;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(G,F);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(C,A,F,E,B,D){return[dojo.connect(C,"onkeypress",this,function(G){if(G.keyCode==A.keyCode&&(!A.charCode||A.charCode==G.charCode)&&(A.ctrlKey===undefined||A.ctrlKey==G.ctrlKey)&&(A.altKey===undefined||A.altKey==G.ctrlKey)&&(A.shiftKey===undefined||A.shiftKey==G.ctrlKey)){dojo.stopEvent(G);
dijit.typematic.trigger(A,F,C,E,A,B,D)
}else{if(dijit.typematic._obj==A){dijit.typematic.stop()
}}}),dojo.connect(C,"onkeyup",this,function(G){if(dijit.typematic._obj==A){dijit.typematic.stop()
}})]
},addMouseListener:function(C,F,E,B,D){var A=dojo.connect;
return[A(C,"mousedown",this,function(G){dojo.stopEvent(G);
dijit.typematic.trigger(G,F,C,E,C,B,D)
}),A(C,"mouseup",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(C,"mouseout",this,function(G){dojo.stopEvent(G);
dijit.typematic.stop()
}),A(C,"mousemove",this,function(G){dojo.stopEvent(G)
}),A(C,"dblclick",this,function(G){dojo.stopEvent(G);
if(dojo.isIE){dijit.typematic.trigger(G,F,C,E,C,B,D);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(D,E,A,G,F,B,C){return this.addKeyListener(E,A,G,F,B,C).concat(this.addMouseListener(D,G,F,B,C))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var B=document.createElement("div");
B.id="a11yTestNode";
B.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(B);
function A(){var D=dojo.getComputedStyle(B);
if(D){var C=D.backgroundImage;
var E=(D.borderTopColor==D.borderRightColor)||(C!=null&&(C=="none"||C=="url(invalid-url:)"));
dojo[E?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}A();
if(dojo.isIE){setInterval(A,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(B){var C=B.getAttribute("role");
if(C){var A=C.indexOf(":");
return A==-1?C:C.substring(A+1)
}else{return""
}},setWaiRole:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.setAttribute("role","wairole:"+B)
}else{A.setAttribute("role",B)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){return A.hasAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{if(A.hasAttribute){return A.hasAttribute("aria-"+B)
}else{return A.getAttribute("aria-"+B)?true:false
}}},getWaiState:function(A,C){if(dojo.isFF&&dojo.isFF<3){return A.getAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{var B=A.getAttribute("aria-"+C);
return B?B:""
}},setWaiState:function(A,C,B){if(dojo.isFF&&dojo.isFF<3){A.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+C,B)
}else{A.setAttribute("aria-"+C,B)
}},removeWaiState:function(A,B){if(dojo.isFF&&dojo.isFF<3){A.removeAttributeNS("http://www.w3.org/2005/07/aaa",B)
}else{A.removeAttribute("aria-"+B)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(E,B){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var C=dojo.date.stamp._isoRegExp.exec(E);
var A=null;
if(C){C.shift();
C[1]&&C[1]--;
C[6]&&(C[6]*=1000);
if(B){B=new Date(B);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return B["get"+G]()
}).forEach(function(H,G){if(C[G]===undefined){C[G]=H
}})
}A=new Date(C[0]||1970,C[1]||0,C[2]||0,C[3]||0,C[4]||0,C[5]||0,C[6]||0);
var F=0;
var D=C[7]&&C[7].charAt(0);
if(D!="Z"){F=((C[8]||0)*60)+(Number(C[9])||0);
if(D!="-"){F*=-1
}}if(D){F-=A.getTimezoneOffset()
}if(F){A.setTime(A.getTime()+F*60000)
}}return A
};
dojo.date.stamp.toISOString=function(F,J){var I=function(K){return(K<10)?"0"+K:K
};
J=J||{};
var E=[];
var G=J.zulu?"getUTC":"get";
var C="";
if(J.selector!="time"){C=[F[G+"FullYear"](),I(F[G+"Month"]()+1),I(F[G+"Date"]())].join("-")
}E.push(C);
if(J.selector!="date"){var B=[I(F[G+"Hours"]()),I(F[G+"Minutes"]()),I(F[G+"Seconds"]())].join(":");
var A=F[G+"Milliseconds"]();
if(J.milliseconds){B+="."+(A<100?"0":"")+I(A)
}if(J.zulu){B+="Z"
}else{if(J.selector!="time"){var H=F.getTimezoneOffset();
var D=Math.abs(H);
B+=(H>0?"-":"+")+I(Math.floor(D/60))+":"+I(D%60)
}}E.push(B)
}return E.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var E=dojo;
function A(F){if(E.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(E.isFunction(F)){return"function"
}if(E.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof E._Url){return"url"
}return"object"
}function B(G,F){switch(F){case"string":return G;
case"number":return G.length?Number(G):NaN;
case"boolean":return typeof G=="boolean"?G:!(G.toLowerCase()=="false");
case"function":if(E.isFunction(G)){G=G.toString();
G=E.trim(G.substring(G.indexOf("{")+1,G.length-1))
}try{if(G.search(/[^\w\.]+/i)!=-1){G=E.parser._nameAnonFunc(new Function(G),this)
}return E.getObject(G,false)
}catch(H){return new Function()
}case"array":return G.split(/\s*,\s*/);
case"date":switch(G){case"":return new Date("");
case"now":return new Date();
default:return E.date.stamp.fromISOString(G)
}case"url":return E.baseUrl+G;
default:return E.fromJson(G)
}}var D={};
function C(H){if(!D[H]){var F=E.getObject(H);
if(!E.isFunction(F)){throw new Error("Could not load class '"+H+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var I=F.prototype;
var K={};
for(var G in I){if(G.charAt(0)=="_"){continue
}var J=I[G];
K[G]=A(J)
}D[H]={cls:F,params:K}
}return D[H]
}this._functionFromScript=function(G){var H="";
var J="";
var F=G.getAttribute("args");
if(F){E.forEach(F.split(/\s*,\s*/),function(L,K){H+="var "+L+" = arguments["+K+"]; "
})
}var I=G.getAttribute("with");
if(I&&I.length){E.forEach(I.split(/\s*,\s*/),function(K){H+="with("+K+"){";
J+="}"
})
}return new Function(H+G.innerHTML+J)
};
this.instantiate=function(F){var G=[];
E.forEach(F,function(J){if(!J){return 
}var R=J.getAttribute("dojoType");
if((!R)||(!R.length)){return 
}var O=C(R);
var P=O.cls;
var H=P._noScript||P.prototype._noScript;
var K={};
var M=J.attributes;
for(var I in O.params){var V=M.getNamedItem(I);
if(!V||(!V.specified&&(!dojo.isIE||I.toLowerCase()!="value"))){continue
}var T=V.value;
switch(I){case"class":T=J.className;
break;
case"style":T=J.style&&J.style.cssText
}var N=O.params[I];
K[I]=B(T,N)
}if(!H){var L=[],W=[];
E.query("> script[type^='dojo/']",J).orphan().forEach(function(X){var Z=X.getAttribute("event"),Y=X.getAttribute("type"),a=E.parser._functionFromScript(X);
if(Z){if(Y=="dojo/connect"){L.push({event:Z,func:a})
}else{K[Z]=a
}}else{W.push(a)
}})
}var S=P.markupFactory;
if(!S&&P.prototype){S=P.prototype.markupFactory
}var U=S?S(K,J,P):new P(K,J);
G.push(U);
var Q=J.getAttribute("jsId");
if(Q){E.setObject(Q,U)
}if(!H){dojo.forEach(L,function(X){dojo.connect(U,X.event,null,X.func)
});
dojo.forEach(W,function(X){X.call(U)
})
}});
E.forEach(G,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return G
};
this.parse=function(F){var G=E.query("[dojoType]",F);
var H=this.instantiate(G);
return H
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(A,E){var D="$joinpoint";
var C=(E||dojo.parser._anon);
if(dojo.isIE){var F=A.__dojoNameCache;
if(F&&C[F]===A){return A.__dojoNameCache
}}var B="__"+dojo.parser._anonCtr++;
while(typeof C[B]!="undefined"){B="__"+dojo.parser._anonCtr++
}C[B]=A;
return B
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(B,A){this.create(B,A)
},create:function(E,B){this.srcNodeRef=dojo.byId(B);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(E){dojo.mixin(this,E)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var A in this.attributeMap){var D=this[this.attributeMap[A]||"domNode"];
var C=this[A];
if(typeof C!="object"&&(C!==""||(E&&E[A]))){switch(A){case"class":dojo.addClass(D,C);
break;
case"style":if(D.style.cssText){D.style.cssText+="; "+C
}else{D.style.cssText=C
}break;
default:D.setAttribute(A,C)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(A){this.destroyDescendants();
this.destroy()
},destroy:function(A){this.uninitialize();
dojo.forEach(this._connects,function(B){dojo.forEach(B,dojo.disconnect)
});
this.destroyRendering(A);
dijit.registry.remove(this.id)
},destroyRendering:function(A){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(A){A.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var A=dojo.query("[widgetId]",this.domNode);
return A.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(D,C,E){var B=[];
if(C=="ondijitclick"){var A=this;
if(!this.nodesWithKeyClick[D.nodeName]){B.push(dojo.connect(D,"onkeydown",this,function(F){if(F.keyCode==dojo.keys.ENTER){return(dojo.isString(E))?A[E](F):E.call(A,F)
}else{if(F.keyCode==dojo.keys.SPACE){dojo.stopEvent(F)
}}}));
B.push(dojo.connect(D,"onkeyup",this,function(F){if(F.keyCode==dojo.keys.SPACE){return dojo.isString(E)?A[E](F):E.call(A,F)
}}))
}C="onclick"
}B.push(dojo.connect(D,C,this,E));
this._connects.push(B);
return B
},disconnect:function(B){for(var A=0;
A<this._connects.length;
A++){if(this._connects[A]==B){dojo.forEach(B,dojo.disconnect);
this._connects.splice(A,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(E,C,D,A){var B=String(E);
if(!D){D="0"
}while(B.length<C){if(A){B+=D
}else{B=D+B
}}return B
};
dojo.string.substitute=function(C,D,B,A){return C.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(E,F,H){var G=dojo.getObject(F,false,D);
if(H){G=dojo.getObject(H,false,A)(G)
}if(B){G=B(G,F)
}return G.toString()
})
};
dojo.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var A=B.length-1;
A>0;
A--){if(/\S/.test(B.charAt(A))){B=B.substring(0,A+1);
break
}}return B
}
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var E;
if(dojo.isString(D)){var C=this.declaredClass,G=this;
var A=dojo.string.substitute(D,this,function(I,H){if(H.charAt(0)=="!"){I=G[H.substr(1)]
}if(typeof I=="undefined"){throw new Error(C+" template:"+H)
}if(!I){return""
}return H.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
E=dijit._Templated._createNodesFromText(A)[0]
}else{E=D.cloneNode(true)
}this._attachTemplateNodes(E);
var F=this.srcNodeRef;
if(F&&F.parentNode){F.parentNode.replaceChild(E,F)
}this.domNode=E;
if(this.widgetsInTemplate){var B=dojo.parser.parse(E);
this._attachTemplateNodes(B,function(I,H){return I[H]
})
}this._fillContent(F)
},_fillContent:function(B){var A=this.containerNode;
if(B&&A){while(B.hasChildNodes()){A.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(D,G){G=G||function(R,Q){return R.getAttribute(Q)
};
var B=dojo.isArray(D)?D:(D.all||D.getElementsByTagName("*"));
var K=dojo.isArray(D)?0:-1;
for(;
K<B.length;
K++){var C=(K==-1)?D:B[K];
if(this.widgetsInTemplate&&G(C,"dojoType")){continue
}var E=G(C,"dojoAttachPoint");
if(E){var L,N=E.split(/\s*,\s*/);
while(L=N.shift()){if(dojo.isArray(this[L])){this[L].push(C)
}else{this[L]=C
}}}var J=G(C,"dojoAttachEvent");
if(J){var A,O=J.split(/\s*,\s*/);
var F=dojo.trim;
while(A=O.shift()){if(A){var H=null;
if(A.indexOf(":")!=-1){var P=A.split(":");
A=F(P[0]);
H=F(P[1])
}else{A=F(A)
}if(!H){H=A
}this.connect(C,A,H)
}}}var I=G(C,"waiRole");
if(I){dijit.setWaiRole(C,I)
}var M=G(C,"waiState");
if(M){dojo.forEach(M.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var Q=R.split("-");
dijit.setWaiState(C,Q[0],Q[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(C,D,F){var E=dijit._Templated._templateCache;
var A=D||C;
var B=E[A];
if(B){return B
}if(!D){D=dijit._Templated._sanitizeTemplateString(dojo._getText(C))
}D=dojo.string.trim(D);
if(D.match(/\$\{([^\}]+)\}/g)||F){return(E[A]=D)
}else{return(E[A]=dijit._Templated._createNodesFromText(D)[0])
}};
dijit._Templated._sanitizeTemplateString=function(A){if(A){A=A.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){A=B[1]
}}else{A=""
}return A
};
if(dojo.isIE){dojo.addOnUnload(function(){var A=dijit._Templated._templateCache;
for(var B in A){var C=A[B];
if(!isNaN(C.nodeType)){dojo._destroyElement(C)
}delete A[B]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var A;
dijit._Templated._createNodesFromText=function(J){if(!A){A=dojo.doc.createElement("div");
A.style.display="none";
dojo.body().appendChild(A)
}var F="none";
var D=J.replace(/^\s+/,"");
for(var G in B){var H=B[G];
if(H.re.test(D)){F=G;
J=H.pre+J+H.post;
break
}}A.innerHTML=J;
if(A.normalize){A.normalize()
}var C={cell:"tr",row:"tbody",section:"table"}[F];
var I=(typeof C!="undefined")?A.getElementsByTagName(C)[0]:A;
var E=[];
while(I.firstChild){E.push(I.removeChild(I.firstChild))
}A.innerHTML="";
return E
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var B=this.domNode.parentNode;
B;
B=B.parentNode){var C=B.getAttribute&&B.getAttribute("widgetId");
if(C){var A=dijit.byId(C);
return A.isContainer?A:null
}}return null
},_getSibling:function(B){var A=this.domNode;
do{A=A[B+"Sibling"]
}while(A&&A.nodeType!=1);
if(!A){return null
}var C=A.getAttribute("widgetId");
return dijit.byId(C)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(D,A){if(A===undefined){A="last"
}var B=this.containerNode||this.domNode;
if(A&&typeof A=="number"){var C=dojo.query("> [widgetid]",B);
if(C&&C.length>=A){B=C[A-1];
A="after"
}}dojo.place(D.domNode,B,A);
if(this._started&&!D._started){D.startup()
}},removeChild:function(B){var A=B.domNode;
A.parentNode.removeChild(A)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(D,A){var B=D.domNode;
var C=(A>0?"nextSibling":"previousSibling");
do{B=B[C]
}while(B&&(B.nodeType!=1||!dijit.byNode(B)));
return B?dijit.byNode(B):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(A,E){var B=this._keyNavCodes={};
var D=dojo.hitch(this,this.focusPrev);
var C=dojo.hitch(this,this.focusNext);
dojo.forEach(A,function(F){B[F]=D
});
dojo.forEach(E,function(F){B[F]=C
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(B,A){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(B)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var B=this._getNextFocusableChild(this.focusedChild,-1);
if(B.getFocalNodes){var A=B.getFocalNodes();
this.focusChild(B,A[A.length-1])
}else{this.focusChild(B)
}},focusChild:function(B,A){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(A&&B.focusFocalNode){B.focusFocalNode(A)
}else{B.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){dojo.forEach(A.getFocalNodes(),function(B){B.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(A){this.domNode.setAttribute("tabIndex",-1);
if(A.target===this.domNode){this.focusFirstChild()
}else{var B=dijit.getEnclosingWidget(A.target);
if(B&&B.isFocusable()){this.focusedChild=B
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(A){if(A.ctrlKey||A.altKey){return 
}var B=this._keyNavCodes[A.keyCode];
if(B){B();
dojo.stopEvent(A)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(D,A){if(D){D=this._getSiblingOfChild(D,A)
}var C=this.getChildren();
for(var B=0;
B<C.length;
B++){if(!D){D=C[(A>0)?0:(C.length-1)]
}if(D.isFocusable()){return D
}D=this._getSiblingOfChild(D,A)
}}})
}if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(A){A.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(A){var B=this.domNode;
if(A){dojo.marginBox(B,A);
if(A.t){B.style.top=A.t+"px"
}if(A.l){B.style.left=A.l+"px"
}}var C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(D,E){var B=dojo.getComputedStyle(D);
var C=dojo._getMarginExtents(D,B);
var A=dojo._getPadBorderExtents(D,B);
return{l:dojo._toPixelValue(D,B.paddingLeft),t:dojo._toPixelValue(D,B.paddingTop),w:E.w-(C.w+A.w),h:E.h-(C.h+A.h)}
};
(function(){var B=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var A=function(C,D){C.resize?C.resize(D):dojo.marginBox(C.domNode,D);
dojo.mixin(C,dojo.marginBox(C.domNode));
dojo.mixin(C,D)
};
dijit.layout.layoutChildren=function(C,E,D){E=dojo.mixin({},E);
dojo.addClass(C,"dijitLayoutContainer");
D=dojo.filter(D,function(F){return F.layoutAlign!="client"
}).concat(dojo.filter(D,function(F){return F.layoutAlign=="client"
}));
dojo.forEach(D,function(I){var H=I.domNode,G=I.layoutAlign;
var F=H.style;
F.left=E.l+"px";
F.top=E.t+"px";
F.bottom=F.right="auto";
dojo.addClass(H,"dijitAlign"+B(G));
if(G=="top"||G=="bottom"){A(I,{w:E.w});
E.h-=I.h;
if(G=="top"){E.t+=I.h
}else{F.top=E.t+E.h+"px"
}}else{if(G=="left"||G=="right"){A(I,{h:E.h});
E.w-=I.w;
if(G=="left"){E.l+=I.w
}else{F.left=E.l+E.w+"px"
}}else{if(G=="client"){A(I,E)
}}}})
}
})()
}if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(A){this.domNode.disabled=this.disabled=A;
if(this.focusNode){this.focusNode.disabled=A
}if(A){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",A);
this._setStateClass()
},_onMouse:function(C){var D=C.target;
if(D&&D.getAttribute){this.stateModifier=D.getAttribute("stateModifier")||""
}if(!this.disabled){switch(C.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var A=this;
var B=this.connect(dojo.body(),"onmouseup",function(){A._active=false;
A._setStateClass();
A.disconnect(B)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var B=[this.baseClass];
function A(C){B=B.concat(dojo.map(B,function(D){return D+C
}))
}if(this.checked){A("Checked")
}if(this.state){A(this.state)
}if(this.selected){A("Selected")
}if(this.disabled){A("Disabled")
}else{if(this._active){A(this.stateModifier+"Active")
}else{if(this._focused){A("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){A(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+B.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(B,A){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(A===undefined){A=true
}if(this._lastValueReported==undefined&&A===null){this._lastValueReported=B
}if((this.intermediateChanges||A)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(B){if(B.keyCode==dojo.keys.ESCAPE&&!B.shiftKey&&!B.ctrlKey&&!B.altKey){var A=this.getValue();
var C=this._lastValueReported;
if((typeof C!="undefined")&&((A!==null&&A.toString)?A.toString():null)!==C.toString()){this.undo();
dojo.stopEvent(B);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(B,C,H){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var D=[B,"nls",C].join(".");
var J=dojo._loadedModules[D];
if(J){var I;
for(var E=A.length;
E>0;
E--){var G=A.slice(0,E).join("_");
if(J[G]){I=J[G];
break
}}if(!I){I=J.ROOT
}if(I){var F=function(){};
F.prototype=I;
return new F()
}}throw new Error("Bundle not found: "+C+" in "+B+" , locale="+H)
};
dojo.i18n.normalizeLocale=function(B){var A=B?B.toLowerCase():dojo.locale;
if(A=="root"){A="ROOT"
}return A
};
dojo.i18n._requireLocalization=function(A,B,O,K){var H=dojo.i18n.normalizeLocale(O);
var E=[A,"nls",B].join(".");
var D="";
if(K){var N=K.split(",");
for(var I=0;
I<N.length;
I++){if(H.indexOf(N[I])==0){if(N[I].length>D.length){D=N[I]
}}}if(!D){D="ROOT"
}}var L=K?D:H;
var Q=dojo._loadedModules[E];
var C=null;
if(Q){if(djConfig.localizationComplete&&Q._built){return 
}var G=L.replace(/-/g,"_");
var M=E+"."+G;
C=dojo._loadedModules[M]
}if(!C){Q=dojo.provide(E);
var F=dojo._getModuleSymbols(A);
var J=F.concat("nls").join("/");
var P;
dojo.i18n._searchLocalePath(L,K,function(V){var W=V.replace(/-/g,"_");
var U=E+"."+W;
var S=false;
if(!dojo._loadedModules[U]){dojo.provide(U);
var T=[J];
if(V!="ROOT"){T.push(V)
}T.push(B);
var R=T.join("/")+".js";
S=dojo._loadPath(R,null,function(Z){var Y=function(){};
Y.prototype=P;
Q[W]=new Y();
for(var X in Z){Q[W][X]=Z[X]
}})
}else{S=true
}if(S&&Q[W]){P=Q[W]
}else{Q[W]=P
}if(K){return true
}})
}if(K&&H!=D){Q[H.replace(/-/g,"_")]=Q[D.replace(/-/g,"_")]
}};
(function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}var B=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(E,D,C,G){B(E,D,C,G);
if(C){return 
}for(var F=0;
F<A.length;
F++){B(E,D,A[F],G)
}}
}})();
dojo.i18n._searchLocalePath=function(H,I,C){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var B=[];
for(var E=A.length;
E>0;
E--){B.push(A.slice(0,E).join("-"))
}B.push(false);
if(I){B.reverse()
}for(var D=B.length-1;
D>=0;
D--){var F=B[D]||"ROOT";
var G=C(F);
if(G){break
}}};
dojo.i18n._preloadLocalizations=function(E,B){function C(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<B.length;
G++){if(B[G]==H){dojo.require(E+"_"+H);
return true
}}return false
})
}C();
var A=djConfig.extraLocale||[];
for(var D=0;
D<A.length;
D++){C(A[D])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(A){var B={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var C=dojo.cldr.supplemental._region(A);
var D=B[C];
return(typeof D=="undefined")?1:D
};
dojo.cldr.supplemental._region=function(A){A=dojo.i18n.normalizeLocale(A);
var B=A.split("-");
var C=B[1];
if(!C){C={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[B[0]]
}else{if(C.length==4){C=B[2]
}}return C
};
dojo.cldr.supplemental.getWeekend=function(B){var D={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var A={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var E=dojo.cldr.supplemental._region(B);
var F=D[E];
var C=A[E];
if(typeof F=="undefined"){F=6
}if(typeof C=="undefined"){C=0
}return{start:F,end:C}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var B=A.getMonth();
var C=[31,28,31,30,31,30,31,31,30,31,30,31];
if(B==1&&dojo.date.isLeapYear(A)){return 29
}return C[B]
};
dojo.date.isLeapYear=function(B){var A=B.getFullYear();
return !(A%400)||(!(A%4)&&!!(A%100))
};
dojo.date.getTimezoneName=function(C){var D=C.toString();
var F="";
var B;
var E=D.indexOf("(");
if(E>-1){F=D.substring(++E,D.indexOf(")"))
}else{var A=/([A-Z\/]+) \d{4}$/;
if((B=D.match(A))){F=B[1]
}else{D=C.toLocaleString();
A=/ ([A-Z\/]+)$/;
if((B=D.match(A))){F=B[1]
}}}return(F=="AM"||F=="PM")?"":F
};
dojo.date.compare=function(C,B,A){C=new Date(Number(C));
B=new Date(Number(B||new Date()));
if(typeof A!=="undefined"){if(A=="date"){C.setHours(0,0,0,0);
B.setHours(0,0,0,0)
}else{if(A=="time"){C.setFullYear(0,0,0);
B.setFullYear(0,0,0)
}}}if(C>B){return 1
}if(C<B){return -1
}return 0
};
dojo.date.add=function(D,C,E){var G=new Date(Number(D));
var B=false;
var K="Date";
switch(C){case"day":break;
case"weekday":var L,A;
var I=0;
var J=E%5;
if(!J){L=(E>0)?5:-5;
A=(E>0)?((E-5)/5):((E+5)/5)
}else{L=J;
A=parseInt(E/5)
}var F=D.getDay();
if(F==6&&E>0){I=1
}else{if(F==0&&E<0){I=-1
}}var H=F+L;
if(H==0||H==6){I=(E>0)?2:-2
}E=7*A+L+I;
break;
case"year":K="FullYear";
B=true;
break;
case"week":E*=7;
break;
case"quarter":E*=3;
case"month":B=true;
K="Month";
break;
case"hour":case"minute":case"second":case"millisecond":K=C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(K){G["setUTC"+K](G["getUTC"+K]()+E)
}if(B&&(G.getDate()<D.getDate())){G.setDate(0)
}return G
};
dojo.date.difference=function(P,N,D){N=N||new Date();
D=D||"day";
var C=N.getFullYear()-P.getFullYear();
var L=1;
switch(D){case"quarter":var Q=P.getMonth();
var O=N.getMonth();
var I=Math.floor(Q/3)+1;
var H=Math.floor(O/3)+1;
H+=(C*4);
L=H-I;
break;
case"weekday":var M=Math.round(dojo.date.difference(P,N,"day"));
var A=parseInt(dojo.date.difference(P,N,"week"));
var K=M%7;
if(K==0){M=A*5
}else{var J=0;
var G=P.getDay();
var E=N.getDay();
A=parseInt(M/7);
K=M%7;
var F=new Date(P);
F.setDate(F.getDate()+(A*7));
var B=F.getDay();
if(M>0){switch(true){case G==6:J=-1;
break;
case G==0:J=0;
break;
case E==6:J=-1;
break;
case E==0:J=-2;
break;
case (B+K)>5:J=-2
}}else{if(M<0){switch(true){case G==6:J=0;
break;
case G==0:J=1;
break;
case E==6:J=2;
break;
case E==0:J=1;
break;
case (B+K)<0:J=2
}}}M+=J;
M-=(A*2)
}L=M;
break;
case"year":L=C;
break;
case"month":L=(N.getMonth()-P.getMonth())+(C*12);
break;
case"week":L=parseInt(dojo.date.difference(P,N,"day")/7);
break;
case"day":L/=24;
case"hour":L/=60;
case"minute":L/=60;
case"second":L/=1000;
case"millisecond":L*=N.getTime()-P.getTime()
}return Math.round(L)
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(B,A){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(A&&A.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(B,E,D){if(!(B instanceof Array)){return E(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(E(B[C]))
}return dojo.regexp.group(A.join("|"),D)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function B(E,D,F){return F.replace(/([a-z])\1*/ig,function(S){var W;
var V=S.charAt(0);
var N=S.length;
var K;
var L=["abbr","wide","narrow"];
switch(V){case"G":W=D[(N<4)?"eraAbbr":"eraNames"][E.getFullYear()<0?0:1];
break;
case"y":W=E.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:K=true
}break;
case"Q":case"q":W=Math.ceil((E.getMonth()+1)/3);
K=true;
break;
case"M":case"L":var M=E.getMonth();
var I;
switch(N){case 1:case 2:W=M+1;
K=true;
break;
case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="L")?"standalone":"format";
var H=["months",U,I].join("-");
W=D[H][M]
}break;
case"w":var G=0;
W=dojo.date.locale._getWeekOfYear(E,G);
K=true;
break;
case"d":W=E.getDate();
K=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(E);
K=true;
break;
case"E":case"e":case"c":var T=E.getDay();
var I;
switch(N){case 1:case 2:if(V=="e"){var R=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-R+7)%7
}if(V!="c"){W=T+1;
K=true;
break
}case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="c")?"standalone":"format";
var H=["days",U,I].join("-");
W=D[H][T]
}break;
case"a":var J=(E.getHours()<12)?"am":"pm";
W=D[J];
break;
case"h":case"H":case"K":case"k":var Q=E.getHours();
switch(V){case"h":W=(Q%12)||12;
break;
case"H":W=Q;
break;
case"K":W=(Q%12);
break;
case"k":W=Q||24;
break
}K=true;
break;
case"m":W=E.getMinutes();
K=true;
break;
case"s":W=E.getSeconds();
K=true;
break;
case"S":W=Math.round(E.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(E);
if(W){break
}N=4;
case"Z":var P=E.getTimezoneOffset();
var O=[(P<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(P)/60),2),dojo.string.pad(Math.abs(P)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+F)
}if(K){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(F,L){L=L||{};
var I=dojo.i18n.normalizeLocale(L.locale);
var M=L.formatLength||"short";
var N=dojo.date.locale._getGregorianBundle(I);
var G=[];
var E=dojo.hitch(this,B,F,N);
if(L.selector=="year"){var H=F.getFullYear();
if(I.match(/^zh|^ja/)){H+="\u5E74"
}return H
}if(L.selector!="time"){var D=L.datePattern||N["dateFormat-"+M];
if(D){G.push(C(D,E))
}}if(L.selector!="date"){var K=L.timePattern||N["timeFormat-"+M];
if(K){G.push(C(K,E))
}}var J=G.join(" ");
return J
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var G=dojo.i18n.normalizeLocale(I.locale);
var K=dojo.date.locale._getGregorianBundle(G);
var J=I.formatLength||"short";
var D=I.datePattern||K["dateFormat-"+J];
var L=I.timePattern||K["timeFormat-"+J];
var E;
if(I.selector=="date"){E=D
}else{if(I.selector=="time"){E=L
}else{E=D+" "+L
}}var F=[];
var H=C(E,dojo.hitch(this,A,F,K,I));
return{regexp:H,tokens:F,bundle:K}
};
dojo.date.locale.parse=function(K,N){var D=dojo.date.locale._parseInfo(N);
var H=D.tokens,O=D.bundle;
var L=new RegExp("^"+D.regexp+"$");
var F=L.exec(K);
if(!F){return null
}var E=["abbr","wide","narrow"];
var M=new Date(1972,0);
var G={};
var J="";
dojo.forEach(F,function(b,V){if(!V){return 
}var S=H[V-1];
var T=S.length;
switch(S.charAt(0)){case"y":if(T!=2){M.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var a=""+new Date().getFullYear();
var U=a.substring(0,2)*100;
var X=Number(a.substring(2,4));
var Q=Math.min(X+20,99);
var W=(b<Q)?U+b:U-100+b;
M.setFullYear(W);
G.year=W
}else{if(N.strict){return null
}M.setFullYear(b);
G.year=b
}}break;
case"M":if(T>2){var P=O["months-format-"+E[T-3]].concat();
if(!N.strict){b=b.replace(".","").toLowerCase();
P=dojo.map(P,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(P,b);
if(b==-1){return null
}}else{b--
}M.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=O["days-format-"+E[T-3]].concat();
if(!N.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":M.setDate(b);
G.date=b;
break;
case"D":M.setMonth(0);
M.setDate(b);
break;
case"a":var Y=N.am||O.am;
var R=N.pm||O.pm;
if(!N.strict){var Z=/\./g;
b=b.replace(Z,"").toLowerCase();
Y=Y.replace(Z,"").toLowerCase();
R=R.replace(Z,"").toLowerCase()
}if(N.strict&&b!=Y&&b!=R){return null
}J=(b==R)?"p":(b==Y)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}M.setHours(b);
break;
case"m":M.setMinutes(b);
break;
case"s":M.setSeconds(b);
break;
case"S":M.setMilliseconds(b)
}});
var I=M.getHours();
if(J==="p"&&I<12){M.setHours(I+12)
}else{if(J==="a"&&I==12){M.setHours(0)
}}if(G.year&&M.getFullYear()!=G.year){return null
}if(G.month&&M.getMonth()!=G.month){return null
}if(G.date&&M.getDate()!=G.date){return null
}return M
};
function C(H,D,J,G){var E=function(K){return K
};
D=D||E;
J=J||E;
G=G||E;
var I=H.match(/(''|[^'])+/g);
var F=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(F?J:D)(K);
F=!F
}});
return G(I.join(""))
}function A(G,D,E,F){F=dojo.regexp.escapeString(F);
if(!E.strict){F=F.replace(" a"," ?a")
}return F.replace(/([a-z])\1*/ig,function(I){var K;
var O=I.charAt(0);
var H=I.length;
var N="",M="";
if(E.strict){if(H>1){N="0{"+(H-1)+"}"
}if(H>2){M="0{"+(H-2)+"}"
}}else{N="0?";
M="0{0,2}"
}switch(O){case"y":K="\\d{2,4}";
break;
case"M":K=(H>2)?"\\S+":N+"[1-9]|1[0-2]";
break;
case"D":K=N+"[1-9]|"+M+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":K=N+"[1-9]|[12]\\d|3[01]";
break;
case"w":K=N+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":K="\\S+";
break;
case"h":K=N+"[1-9]|1[0-2]";
break;
case"k":K=N+"\\d|1[01]";
break;
case"H":K=N+"\\d|1\\d|2[0-3]";
break;
case"K":K=N+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":K="[0-5]\\d";
break;
case"S":K="\\d{"+H+"}";
break;
case"a":var L=E.am||D.am||"AM";
var J=E.pm||D.pm||"PM";
if(E.strict){K=L+"|"+J
}else{K=L+"|"+J;
if(L!=L.toLowerCase()){K+="|"+L.toLowerCase()
}if(J!=J.toLowerCase()){K+="|"+J.toLowerCase()
}}break;
default:K=".*"
}if(G){G.push(I)
}return"("+K+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(B){var C={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,B);
C=dojo.mixin(C,D)
},this);
return C
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(F,E,B,A){var C;
var G=dojo.date.locale._getGregorianBundle(A);
var D=[F,B,E];
if(B=="standAlone"){C=G[D.join("-")]
}D[1]="format";
return(C||G[D.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(D,A){var C=dojo.cldr.supplemental.getWeekend(A);
var B=(D||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,B){if(arguments.length==1){B=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-B+7)%7;
var D=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==B){D++
}return D
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templatePath:dojo.moduleUrl("dijit","templates/Calendar.html"),value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(A,B){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
},_populateGrid:function(){var F=this.displayMonth;
F.setDate(1);
var A=F.getDay();
var B=dojo.date.getDaysInMonth(F);
var I=dojo.date.getDaysInMonth(dojo.date.add(F,"month",-1));
var G=new Date();
var C=this.value;
var K=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(K>A){K-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=K;
var O=new Date(F);
var R,N="dijitCalendar",L=0;
if(P<A){R=I-A+P+1;
L=-1;
N+="Previous"
}else{if(P>=(A+B)){R=P-A-B+1;
L=1;
N+="Next"
}else{R=P-A+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,G,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,C,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var D=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,D[F.getMonth()]);
var H=F.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(H++,0),{selector:"year",locale:this.lang}))
},this);
var E=this;
var J=function(M,N,L){dijit.typematic.addMouseListener(E[M],E,function(O){if(O>=0){E._adjustDisplay(N,L)
}},0.8,500)
};
J("incrementMonth","month",1);
J("decrementMonth","month",-1);
J("nextYearLabelNode","year",1);
J("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var B=dojo.hitch(this,function(E,H){var G=dojo.query(E,this.domNode)[0];
for(var F=0;
F<H;
F++){G.parentNode.appendChild(G.cloneNode(true))
}});
B(".dijitCalendarDayLabelTemplate",6);
B(".dijitCalendarDateTemplate",6);
B(".dijitCalendarWeekTemplate",5);
var D=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var A=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(E,F){this._setText(E,D[(F+A)%7])
},this);
var C=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(C,function(F){var E=dojo.doc.createElement("div");
this._setText(E,F);
this.monthLabelSpacer.appendChild(E)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(A,B){this.displayMonth=dojo.date.add(this.displayMonth,A,B);
this._populateGrid()
},_onDayClick:function(A){var B=A.target;
dojo.stopEvent(A);
while(!B.dijitDateValue){B=B.parentNode
}if(!dojo.hasClass(B,"dijitCalendarDisabledDate")){this.setValue(B.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(B,A){return false
}})
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var A=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,A);
this.errorMessage=dojo.string.substitute(this.errorMessage,A);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var B=dojo.query(">",this.containerNode||this.domNode),A=B.filter("[widgetId]");
if(B.length==1&&A.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(A[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(A){this.href=A;
return this._prepareLoad()
},setContent:function(A){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(A||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(A){dojo.marginBox(this.domNode,A);
var B=this.containerNode||this.domNode,C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(B){var A=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(B||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&A&&!this._xhrDfd)||(!this.isLoaded&&A&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(C);
A.addCallback(function(D){try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(A){this.destroyDescendants();
try{var B=this.containerNode||this.domNode;
while(B.firstChild){dojo._destroyElement(B.firstChild)
}if(typeof A=="string"){if(this.extractContent){match=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){A=match[1]
}}B.innerHTML=A
}else{if(A.nodeType){B.appendChild(A)
}else{dojo.forEach(A,function(E){B.appendChild(E.cloneNode(true))
})
}}}catch(D){var C=this.onContentError(D);
try{B.innerHTML=C
}catch(D){console.error("Fatal "+this.id+" could not change content due to "+D.message,D)
}}},_onError:function(B,D,A){var C=this["on"+B+"Error"].call(this,D);
if(A){console.error(A,D)
}else{if(C){this._setContent.call(this,C)
}}},_createSubWidgets:function(){var A=this.containerNode||this.domNode;
try{dojo.parser.parse(A,true)
}catch(B){this._onError("Content",B,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(E){var D={};
dojo.forEach(this.getDescendants(),function(G){if(!G.name){return 
}var F=D[G.name]||(D[G.name]=[]);
F.push(G)
});
for(var B in D){var C=D[B],A=dojo.getObject(B,false,E);
if(!dojo.isArray(A)){A=[A]
}if(C[0].setChecked){dojo.forEach(C,function(F,G){F.setChecked(dojo.indexOf(A,F.value)!=-1)
})
}else{dojo.forEach(C,function(F,G){F.setValue(A[G])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(E){var D=E.getValue?E.getValue():E.value;
var B=E.name;
if(!B){return 
}if(E.setChecked){if(/Radio/.test(E.declaredClass)){if(E.checked){dojo.setObject(B,D,A)
}}else{var C=dojo.getObject(B,false,A);
if(!C){C=[];
dojo.setObject(B,C,A)
}if(E.checked){C.push(D)
}}}else{dojo.setObject(B,D,A)
}});
return A
},isValid:function(){return dojo.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var A=dijit.getViewport();
var C=this.node.style,D=this.domNode.style;
D.top=A.t+"px";
D.left=A.l+"px";
C.width=A.w+"px";
C.height=A.h+"px";
var B=dijit.getViewport();
if(A.w!=B.w){C.width=B.w+"px"
}if(A.h!=B.h){C.height=B.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templatePath:dojo.moduleUrl("dijit","templates/Dialog.html"),open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var A=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var B=this.domNode.style;
B.left=Math.floor((A.l+(A.w-C.w)/2))+"px";
B.top=Math.floor((A.t+(A.h-C.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(A){if(A.keyCode){var B=A.target;
if(B==this.titleBar&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{while(B){if(B==this.domNode){if(A.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}B=B.parentNode
}if(A.keyCode!=dojo.keys.TAB){dojo.stopEvent(A)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(C){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,A,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templatePath:dojo.moduleUrl("dijit.layout","templates/TooltipDialog.html"),postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,A,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(A){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(A.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(A.charAt(0)=="T"?"Below":"Above")
},onOpen:function(A){this.orient(A.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(A){if(A.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(A.target==this.containerNode&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.TAB){A.stopPropagation()
}}}},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\n\t><div class=\'dijitRight\'\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \n\t\t\t></span\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\n\t\t></button\n\t></div\n></div>\n',_onClick:function(A){if(this.disabled){return false
}this._clicked();
return this.onClick(A)
},_onButtonClick:function(D){dojo.stopEvent(D);
var C=this._onClick(D)!==false;
if(this.type=="submit"&&C){for(var A=this.domNode;
A;
A=A.parentNode){var B=dijit.byNode(A);
if(B&&B._onSubmit){B._onSubmit(D);
break
}if(A.tagName.toLowerCase()=="form"){if(!A.onsubmit||A.onsubmit()){A.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(A){this.containerNode.innerHTML=this.label=A;
if(dojo.isMozilla){var B=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var C=this;
setTimeout(function(){C.domNode.style.display=B
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n',_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(A);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(A){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(B){var A=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!A||B.detail!=0||this._seenKeydown){this._onArrowClick(B)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var C=this.dropDown;
if(!C){return false
}if(!C.isShowingNow){if(C.href&&!C.isLoaded){var A=this;
var B=dojo.connect(C,"onLoad",function(){dojo.disconnect(B);
A._openDropDown()
});
C._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var E=this.dropDown;
var B=E.domNode.style.width;
var C=this;
dijit.popup.open({parent:this,popup:E,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){C._closeDropDown(true)
},onCancel:function(){C._closeDropDown(true)
},onClose:function(){E.domNode.style.width=B;
C.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>E.domNode.offsetWidth){var D=null;
if(!this.isLeftToRight()){D=E.domNode.parentNode;
var A=D.offsetLeft+D.offsetWidth
}dojo.marginBox(E.domNode,{w:this.domNode.offsetWidth});
if(D){D.style.left=A-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(E.focus){E.focus()
}},_closeDropDown:function(A){if(this._opened){dijit.popup.close(this.dropDown);
if(A){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(A){if(dojo.isIE){this.connect(A,"onactivate",this._onNodeFocus)
}else{this.connect(A,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(A){this._focusedNode=A;
dijit.focus(A)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(A){this._focusedNode=A.currentTarget
},_onBlur:function(A){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(A){this.setChecked(!this.checked)
},setChecked:function(A){this.checked=A;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(A)
}})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(A){A.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(A){},_moveToPopup:function(A){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(A)
}},_onKeyPress:function(A){if(A.ctrlKey||A.altKey){return 
}switch(A.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(A);
dojo.stopEvent(A);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(A)
}break
}},onItemHover:function(A){this.focusChild(A);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(A){dijit.popup.close(A.popup);
A._blur();
this._stopPopupTimer()
},onItemUnhover:function(A){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var A=this;
A.parentMenu;
A=A.parentMenu){}return A
},onItemClick:function(A){if(A.disabled){return false
}if(A.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
A.onClick()
}},_iframeContentWindow:function(A){var B=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(A))||dijit.Menu._iframeContentDocument(A)["__parent__"]||(A.name&&document.frames[A.name])||null;
return B
},_iframeContentDocument:function(A){var B=A.contentDocument||(A.contentWindow&&A.contentWindow.document)||(A.name&&document.frames[A.name]&&document.frames[A.name].document)||null;
return B
},bindDomNode:function(A){A=dojo.byId(A);
var B=dijit.getDocumentWindow(A.ownerDocument);
if(A.tagName.toLowerCase()=="iframe"){B=this._iframeContentWindow(A);
A=dojo.withGlobal(B,dojo.body)
}var C=(A==dojo.body()?dojo.doc:A);
A[this.id]=this._bindings.push([dojo.connect(C,"oncontextmenu",this,"_openMyself"),dojo.connect(C,"onkeydown",this,"_contextKey"),dojo.connect(C,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(D){var C=dojo.byId(D);
var B=C[this.id]-1,A=this._bindings[B];
dojo.forEach(A,dojo.disconnect);
delete this._bindings[B]
},_contextKey:function(B){this._contextMenuWithMouse=false;
if(B.keyCode==dojo.keys.F10){dojo.stopEvent(B);
if(B.shiftKey&&B.type=="keydown"){var A={target:B.target,pageX:B.pageX,pageY:B.pageY};
A.preventDefault=A.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(A)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(F){dojo.stopEvent(F);
var A,G;
if(dojo.isSafari||this._contextMenuWithMouse){A=F.pageX;
G=F.pageY
}else{var E=dojo.coords(F.target,true);
A=E.x+10;
G=E.y+10
}var C=this;
var B=dijit.getFocus(this);
function D(){dijit.focus(B);
dijit.popup.close(C)
}dijit.popup.open({popup:this,x:A,y:G,onExecute:D,onCancel:D,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(A){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var A=this.focusedChild;
var B=A.popup;
if(B.isShowingNow){return 
}B.parentMenu=this;
var C=this;
dijit.popup.open({parent:this,popup:B,around:A.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(B);
A.focus();
C.currentPopup=null
}});
this.currentPopup=B;
if(B.focus){B.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(A){this.getParent().onItemClick(this);
dojo.stopEvent(A)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(A){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(A){this.disabled=A;
dojo[A?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",A?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(A)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\n\t<div class="dijitTooltipConnector"></div>\n</div>\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(D,A){if(this.aroundNode&&this.aroundNode===A){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=D;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var C=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var B=dijit.placeOnScreenAroundElement(this.domNode,A,C);
this.domNode.className="dijitTooltip dijitTooltip"+(B.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=A
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(A){if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(B,A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(B,A)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(B){var A=dojo.byId(B);
if(A){this._connectNodes.push(A);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(A,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){A.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(dojo.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(B){if(!this._showTimer){var A=B.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(A)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,A);
this._connectNode=A
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\n\tautocomplete="off" type="${type}"\n\t/>\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(D,C,B){var A=this.filter(D);
if((typeof A==typeof D)&&(B==null||B==undefined)){B=this.format(A,this.constraints)
}if(B!=null&&B!=undefined){this.textbox.value=B
}dijit.form.TextBox.superclass.setValue.call(this,A,C)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(A,B){return((A==null||A==undefined)?"":(A.toString?A.toString():A))
},parse:function(A,B){return A
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var B=this.domNode;
var A=B.style.opacity;
B.style.opacity="0.999";
setTimeout(function(){B.style.opacity=A
},0)
}},filter:function(A){if(A==undefined||A==null){return""
}else{if(typeof A!="string"){return A
}}if(this.trim){A=dojo.trim(A)
}if(this.uppercase){A=A.toUpperCase()
}if(this.lowercase){A=A.toLowerCase()
}if(this.propercase){A=A.replace(/[^\s]+/g,function(B){return B.substring(0,1).toUpperCase()+B.substring(1)
})
}return A
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","validate",null,"ko,zh-cn,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class="dijitReset dijitInputField" width="100%"\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\n\t\t\ttype=\'${type}\' name=\'${name}\'\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t></tr\n></table>\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(A){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(A,B){return(new RegExp("^("+this.regExpGen(B)+")"+(this.required?"":"?")+"$")).test(A)&&(!this.required||!this._isEmpty(A))&&(this._isEmpty(A)||this.parse(A,B)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(A){var B="";
var C=this.isValid(A);
var D=this._isEmpty(this.textbox.value);
this.state=(C||(!this._hasBeenBlurred&&D))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(C?"false":"true"));
if(A){if(D){B=this.getPromptMessage(true)
}if(!B&&!C){B=this.getErrorMessage(true)
}}this._displayMessage(B)
},_message:"",_displayMessage:function(A){if(this._message==A){return 
}this._message=A;
this.displayMessage(A)
},displayMessage:function(A){if(A){dijit.showTooltip(A,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(A){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(A){this.validate(true);
this._onMouse(A)
},onkeyup:function(A){this.onfocus(A)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var A=this.regExpGen(this.constraints);
this.regExp=A
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(B,A){return(B.toString?B.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var B=this.textbox;
var A=(this.valueNode=document.createElement("input"));
A.setAttribute("type",B.type);
A.setAttribute("value",this.toString());
dojo.style(A,"display","none");
A.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(A,B,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(B,A){return B-A
},rangeCheck:function(A,D){var C=(typeof D.min!="undefined");
var B=(typeof D.max!="undefined");
if(C||B){return(!C||this.compare(A,D.min)>=0)&&(!B||this.compare(A,D.max)<=0)
}else{return true
}},isInRange:function(A){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(A){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(A))
},getErrorMessage:function(A){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(A)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ko,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\n\t\t\t><input type="text" autocomplete="off" name="${name}"\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\n\t\t\tdojoAttachPoint="downArrowNode"\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\n\t\t\t></div\n\t\t></td\t\n\t></tr\n></table>\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(A){this._lastDisplayedValue=A;
this.setValue(A,true)
},_getCaretPos:function(A){if(typeof (A.selectionStart)=="number"){return A.selectionStart
}else{if(dojo.isIE){var C=document.selection.createRange().duplicate();
var B=A.createTextRange();
C.move("character",0);
B.move("character",0);
try{B.setEndPoint("EndToEnd",C);
return String(B.text).replace(/\r/g,"").length
}catch(D){return 0
}}}},_setCaretPos:function(B,A){A=parseInt(A);
this._setSelectedRange(B,A,A)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(A){if(A.altKey||(A.ctrlKey&&A.charCode!=118)){return 
}var C=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(A)
}switch(A.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
C=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var D;
if(this._isShowingNow&&(D=this._popupWidget.getHighlightedOption())){if(D==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(A);
break
}else{if(D==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(A);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}A.preventDefault();
case dojo.keys.TAB:var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(A);
this._selectOption();
this._hideResultList()
}else{C=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(A)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
C=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||A.charCode!=0){C=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(C){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(A){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(A))){var B=this._getCaretPos(this.focusNode);
if((B+1)>this.focusNode.value.length){this.focusNode.value=A;
this._setSelectedRange(this.focusNode,B,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}}else{this.focusNode.value=A;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}},_openResultList:function(A,B){if(this.disabled||B.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!A.length){this._hideResultList();
return 
}var C=new String(this.store.getValue(A[0],this.searchAttr));
if(C&&this.autoComplete&&!this._prev_key_backspace&&(B.query[this.searchAttr]!="*")){this._autoCompleteText(C);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",C)
}this._popupWidget.createOptions(A,B,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(B.direction){if(B.direction==1){this._popupWidget.highlightFirstOption()
}else{if(B.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(A)
}},onfocus:function(A){this._hasFocus=true;
this._onMouse(A)
},_announceOption:function(A){if(A==null){return 
}var B;
if(A==this._popupWidget.nextButton||A==this._popupWidget.previousButton){B=A.innerHTML
}else{B=this.store.getValue(A.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(B)
},_selectOption:function(A){var B=null;
if(!A){A={target:this._popupWidget.getHighlightedOption()}
}if(!A.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{B=A.target
}if(!A.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(B.item,this.searchAttr).length)
}this._doSelect(B)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(A){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var C=this.query;
this._lastQuery=C[this.searchAttr]=A+"*";
var B=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:C,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function D(E,F){E.start+=E.count*F;
E.direction=F;
E.store.fetch(E)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,D,B)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(A){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var A=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(B){B.style.display="none";
return{value:B.getAttribute("value"),name:String(B.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:A}});
if(A&&A.length&&!this.value){this.value=A[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(A){return{html:false,label:this.store.getValue(A,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(A){this.value=A;
this.onChange(A)
},onChange:function(A){},onPage:function(A){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(C,B){var A=B(C);
var D=document.createElement("div");
if(A.html){D.innerHTML=A.label
}else{D.appendChild(document.createTextNode(A.label))
}if(D.innerHTML==""){D.innerHTML="&nbsp;"
}D.item=C;
return D
},createOptions:function(B,C,A){this.previousButton.style.display=C.start==0?"none":"";
var D=this;
dojo.forEach(B,function(E){var F=D._createOption(E,A);
F.className="dijitMenuItem";
D.domNode.insertBefore(F,D.nextButton)
});
this.nextButton.style.display=C.count==B.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(A){if(A.target===this.domNode){return 
}else{if(A.target==this.previousButton){this.onPage(-1)
}else{if(A.target==this.nextButton){this.onPage(1)
}else{var B=A.target;
while(!B.item){B=B.parentNode
}this.setValue({target:B},true)
}}}},onmouseover:function(A){if(A.target===this.domNode){return 
}var B=A.target;
if(!(B==this.previousButton||B==this.nextButton)){while(!B.item){B=B.parentNode
}}this._focusOptionNode(B)
},onmouseout:function(A){if(A.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(A){if(this._highlighted_option!=A){this._blurOptionNode();
this._highlighted_option=A;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(B){var E=0;
var C=this.domNode.scrollTop;
var A=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(E<A){if(B){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var D=this.domNode.scrollTop;
E+=(D-C)*(B?-1:1);
C=D
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(A){switch(A.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}dojo.i18n._preloadLocalizations("dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]);
window.aimluck=window.aimluck||{};
aimluck.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aimluck;
for(var A=(D[0]=="aimluck")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
};
function getObjectById(A){if(document.getElementById){return document.getElementById(A)
}else{if(document.all){return document.all(A)
}else{if(document.layers){return document.layers[A]
}}}}function ew(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dw(A){if(confirm("\u3053\u306e"+A.form.name+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function ews(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dws(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form.name+"\u3092\u3059\u3079\u3066\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function setHiddenValue(A){if(A.name){var B=document.createElement("input");
B.type="hidden";
B.name=A.name;
B.value=A.value;
A.form.appendChild(B)
}}function disableSubmit(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="submit"){C[A].disabled=true
}}}function disableButton(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="button"){C[A].disabled=true
}}}function check_new_mail(A,B){A.form.action=A.form.action+"?confirmlasttime=true&start="+B;
A.form.submit()
}function createAction(A){A.form.action=A.form.action+"?"+A.name+"=1"
}function verifyCheckBox(D,E,C){var B=0;
var A;
for(A=0;
A<D.elements.length;
A++){if(D.elements[A].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(C)
}}function submit_member(A){var B=A.options;
for(i=0;
i<B.length;
i++){B[i].selected=true
}}function add_option(A,C,D,E){if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}}function add_member(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,F[F.length])
}}}function remove_member(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}}function doUpOptions10(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,10)
}}function doUpOptions(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,1)
}}function doDownOptions10(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,10)
}}function doDownOptions(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,1)
}}function up_option(A,C,D){var B=A.options;
var E=0;
if(C-D>=0){E=C-D
}else{for(i=0;
i<B.length;
i++){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function down_option(A,C,D){var B=A.options;
var E=0;
if(B.length-1-C-D>=0){E=C+D
}else{for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function change_turn_option(A,C,E){var B=A.options;
if(document.all){var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.remove(C);
B.add(D,E);
B[E].selected=true
}else{var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.removeChild(B[C]);
A.insertBefore(D,B[E]);
B[E].selected=true
}};
aimluck.namespace("utils");
aimluck.utils.createCSS=function(url){if(document.createStyleSheet){document.createStyleSheet(url)
}else{var head=document.getElementsByTagName("head")[0];
var stylesheet=document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}};
aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(B,H,C,D,F,E,G,A){dojo.xhrGet({url:C,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(K,I){var J="";
if(typeof A=="undefined"){J+='<select name="'+B+'">'
}else{J+='<select name="'+B+'" '+A+"/>"
}if(typeof G=="undefined"){J+=""
}else{J+=G
}dojo.forEach(K,function(L){if(typeof L[D]=="undefined"||typeof L[F]=="undefined"){}else{if(L[D]==E){J+="<option value='"+L[D]+"' selected='selected'>"+L[F]+"</option>"
}else{J+="<option value='"+L[D]+"'>"+L[F]+"</option>"
}}});
J+="</select>";
dojo.byId(H).innerHTML=J
}})
};
aimluck.utils.form.switchDisplay=function(A,B){dojo.html.setDisplay(dojo.byId(B),"none");
dojo.html.setDisplay(dojo.byId(A),"")
};
aimluck.namespace("aimluck.io");
dojo.provide("aimluck.io");
aimluck.io.submit=function(C,A,B,G){aimluck.io.disableForm(C,true);
var F=dojo.byId(A+B);
if(F){dojo.style(F,"display","")
}try{dojo.xhrPost({url:C.action,timeout:30000,form:C,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(H,E){var I="";
if(dojo.isArray(H)&&H.length>0){if(H[0]=="PermissionError"){I+="<ul>";
I+="<li><span class='caution'>"+H[1]+"</span></li>";
I+="</ul>"
}else{I+="<ul>";
dojo.forEach(H,function(J){I+="<li><span class='caution'>"+J+"</span></li>"
});
I+="</ul>"
}}G.call(G,I);
F=dojo.byId(A+B);
if(F){dojo.style(F,"display","none")
}if(I!=""){aimluck.io.disableForm(C,false)
}},error:function(E){}})
}catch(D){}return false
};
aimluck.io.sendData=function(A,C,D){var B=new Array();
B.callback=D;
aimluck.io.sendRawData(A,C,sendErrorData,B);
return false
};
aimluck.io.sendErrorData=function(C,A){var B="";
if(dojo.isArray(A.data)&&A.data.length>0){B+="<ul>";
dojo.forEach(A.data,function(D){B+="<li>"+D+"</li>"
});
B+="</ul>"
}C.callback.call(C.callback,B);
return false
};
aimluck.io.sendRawData=function(B,F,G,D){var A=new Array;
try{dojo.xhrGet({url:B,method:"POST",encoding:"utf-8",content:F,mimetype:"text/json",sync:true,load:function(H,J,I,E){A.type=H;
A.data=J;
A.event=I;
A.args=E;
A.bool=true;
G.call(G,D,A);
return A
}})
}catch(C){alert("error")
}};
aimluck.io.escapeText=function(A){var B;
if(typeof (dojo.byId(A).innerText)!="undefined"){B=dojo.byId(A).innerText
}else{if(typeof (dojo.byId(A).value)!="undefined"){B=dojo.byId(A).value
}else{if(typeof (dojo.byId(A).textContent)!="undefined"){B=dojo.byId(A).textContent
}}}return B
};
aimluck.io.disableForm=function(C,A){var D=C.elements;
for(var B=0;
B<D.length;
B++){if(D[B].type=="submit"||D[B].type=="button"){D[B].disabled=A
}}};
aimluck.io.actionSubmit=function(A){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
};
aimluck.io.ajaxActionSubmit=function(B,A,C,D,E){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
};
aimluck.io.actionSubmitReturn=function(A,B){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1&action="+B;
A.form.submit()
};
aimluck.io.deleteSubmit=function(A){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxEnableSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxDisableSubmit=function(B,A,C,D,E){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.deleteSubmitReturn=function(A,B){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1&action="+B;
A.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxMultiEnableSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.ajaxMultiDisableSubmit=function(B,A,C,D,E){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aimluck.io.setHiddenValue=function(A){if(A.name){var B=document.createElement("input");
B.type="hidden";
B.name=A.name;
B.value=A.value;
A.form.appendChild(B)
}};
aimluck.io.openDialog=function(B,A,C,D){aimluck.io.disableForm(B.form,true);
aipo.common.showDialog(A,C,D)
};
aimluck.io.checkboxActionSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.actionSubmit,A)
};
aimluck.io.ajaxCheckboxActionSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxActionSubmit,B,A,C,D,E)
};
aimluck.io.checkboxDeleteSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.multiDeleteSubmit,A)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiEnableSubmit,B,A,C,D,E)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aimluck.io.ajaxMultiDisableSubmit,B,A,C,D,E)
};
aimluck.io.verifyCheckbox=function(D,E,C){var B=0;
var A;
for(A=0;
A<D.elements.length;
A++){if(D.elements[A].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(C)
}};
aimluck.io.ajaxVerifyCheckbox=function(B,E,I,A,H,G,D){var C=0;
var F;
for(F=0;
F<B.elements.length;
F++){if(B.elements[F].checked){C++
}}if(C==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(I,A,H,G,D)
}};
aimluck.io.createOptions=function(B,F){var C,E,I,H,A,D,K,J;
if(F.url){A=F.url
}if(F.key){I=F.key
}if(F.value){H=F.value
}if(typeof F.selectedId=="undefined"){}else{C=F.selectedId
}if(typeof F.preOptions=="undefined"){}else{E=F.preOptions
}if(typeof F.indicator=="undefined"){}else{D=F.indicator;
var G=dojo.byId(D);
if(G){dojo.style(G,"display","none")
}}if(typeof F.callback=="undefined"){}else{K=F.callback;
if(typeof F.callbackTarget=="undefined"){}else{J=F.callbackTarget
}}dojo.xhrGet({url:A,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(N,M){var L=dojo.byId(B);
L.options.length=0;
if(typeof E=="undefined"){}else{aimluck.io.addOption(L,E.key,E.value,false)
}dojo.forEach(N,function(O){if(typeof O[I]=="undefined"||typeof O[H]=="undefined"){}else{if(O[I]==C){aimluck.io.addOption(L,O[I],O[H],true)
}else{aimluck.io.addOption(L,O[I],O[H],false)
}}});
if(G){dojo.style(G,"display","none")
}if(K){K.call(J?J:K,N)
}}})
};
aimluck.io.addFileToList=function(C,D,B){if(C.parentNode.style.display=="none"){C.parentNode.style.display=""
}if(document.all){var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return C.appendChild(A)
}else{var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return C.appendChild(A)
}};
aimluck.io.replaceFileToList=function(C,D,B){if(document.all){var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
C.innerHTML="";
return C.appendChild(A)
}else{var A=document.createElement("li");
A.setAttribute("data-fileid",D);
A.setAttribute("data-filename",B);
A.innerHTML="<span>"+B+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
C.innerHTML="";
return C.appendChild(A)
}};
aimluck.io.removeFileFromList=function(B,A){return B.removeChild(A)
};
aimluck.io.createSelectFromFileList=function(G,B){var E=dojo.byId("attachments_"+B);
var A=document.createElement("select");
A.style.display="none";
A.id="attachments_select";
A.multiple="multiple";
A.name="attachments";
var C=E.children;
for(var D=0;
D<C.length;
D++){var F=document.createElement("option");
F.value=C[D].getAttribute("data-fileid");
F.text=C[D].getAttribute("data-filename");
F.selected=true;
A.appendChild(F)
}G.appendChild(A)
};
aimluck.io.addOption=function(A,C,D,E){if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}};
aimluck.io.removeOptions=function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(A){if(A.options.length==0){return 
}aimluck.io.selectAllOptions(A);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(A){var B=A.options;
if(B.length==0){return 
}for(i=0;
i<B.length;
i++){B[i].selected=true
}};
aimluck.io.switchCheckbox=function(B){var A;
if(B.checked){for(i=0;
i<B.form.elements.length;
i++){A=B.form.elements[i];
if(!A.disabled&&A.type=="checkbox"){A.checked=true
}}}else{for(i=0;
i<B.form.elements.length;
i++){A=B.form.elements[i];
if(!A.disabled&&A.type=="checkbox"){A.checked=false
}}}};
aimluck.io.postViewPage=function(C,B,A){aimluck.io.disableForm(C,true);
var D=dojo.byId(A+B);
if(D){dojo.style(D,"display","")
}dojo.xhrPost({url:C.action,timeout:30000,form:C,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(F,E){var G=F;
D=dojo.byId(A+B);
if(D){dojo.style(D,"display","none")
}if(G!=""){aimluck.io.disableForm(C,false);
var H=dijit.byId("portlet_"+B);
if(!H){H=new aimluck.widget.Contentpane({},"portlet_"+B)
}if(H){ptConfig[B].reloadUrl=ptConfig[B].initUrl;
H._isDownloaded=true;
H.setContent(G)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(E){}})
};
window.aipo=window.aipo||{};
aipo.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aipo;
for(var A=(D[0]=="aipo")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
};
var ptConfig=[];
aipo.onReceiveMessage=function(C,B){if(!C){var A=dijit.byId("modalDialog");
A.hide();
aipo.portletReload(B)
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.getCookie=function(D){var C="";
var F=0;
var E=0;
var A=D+"=";
var B="";
while(F<document.cookie.length){E=F+A.length;
if(document.cookie.substring(F,E)==A){B=document.cookie.indexOf(";",E);
if(B==-1){C=document.cookie.substring(E,document.cookie.length)
}else{C=document.cookie.substring(E,B)
}break
}F=document.cookie.indexOf(" ",F)+1;
if(F==0){break
}}return C
};
aipo.setCookie=function(B,E,D,C){var A=new Date();
A.setTime(A.getTime()+(typeof C!="number"?10*24*60*60*1000:C));
if(typeof D=="undefined"||D==null){document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path="+D
}};
aipo.removeCookie=function remove_cookie(B,C){var D;
var A=new Date();
A.setTime(A.getTime()-1);
D=get_cookie(B);
if(typeof C=="undefined"){document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path="+C
}};
aipo.portletReload=function(C,B){for(var A in ptConfig){if(A!=B){if(ptConfig[A].group==C){ptConfig[A].reloadFunction.call(ptConfig[A].reloadFunction,A)
}}}};
aipo.reloadPage=function(A){if(typeof ptConfig[A].reloadUrl=="undefined"){aipo.viewPage(ptConfig[A].initUrl,A)
}else{aipo.viewPage(ptConfig[A].reloadUrl,A)
}};
var setMouseListener=function(){aipo.customize.positionInitialize();
dojo.query(".customizeMenuIcon,.menubarOpenButton").forEach(function(B){dojo.connect(B,"onmouseenter",null,function(){dojo.addClass(this,"customizeMenuIconMouseenter")
});
dojo.connect(B,"onmouseleave",null,function(){dojo.removeClass(this,"customizeMenuIconMouseenter")
})
});
var A=dojo.connect(dojo.query("body")[0],"onclick",null,function(){if(dojo.query(".customizeMenuIconMouseenter").length==0){dojo.query("div.menubar").style("display","none")
}});
if(aipo.onloadSmartPhone!=null){aipo.onloadSmartPhone()
}};
aipo.viewPage=function(A,B,D){var C=dijit.byId("portlet_"+B);
if(!C){C=new aimluck.widget.Contentpane({},"portlet_"+B)
}if(C){ptConfig[B].reloadUrl=A;
if(D){for(i=0;
i<D.length;
i++){C.setParam(D[i][0],D[i][1])
}}C.onLoad=dojo.hitch(C.onLoad,setMouseListener);
C.viewPage(A)
}};
aipo.errorTreatment=function(B,A){if(B.error){if(B.error==1){window.location.href=A
}else{return true
}return false
}else{return true
}};
var favicon={change:function(A){this.addLink(A,"icon");
this.addLink(A,"shortcut icon")
},addLink:function(C,B){var A=document.createElement("link");
A.type="image/x-icon";
A.rel=B;
A.href=C;
this.removeLinkIfExists(B);
this.docHead.appendChild(A)
},removeLinkIfExists:function(D){var A=this.docHead.getElementsByTagName("link");
for(var B=0;
B<A.length;
B++){var C=A[B];
if(C.type=="image/x-icon"&&C.rel==D){this.docHead.removeChild(C);
return 
}}},docHead:document.getElementsByTagName("head")[0]};
function CronTask(B,A,C){this.task=B;
this.isDecay=C;
this.interval=A;
this.decayRate=1;
this.decayMultiplier=1.5;
this.maxDecayTime=5*60*1000
}CronTask.prototype={start:function(){this.stop().run();
return this
},stop:function(){if(this.worker){window.clearTimeout(this.worker)
}return this
},run:function(){var A=this;
this.task(function(){A.decayRate=A.isDecay?Math.max(1,A.decayRate/A.decayMultiplier):A.decayRate*A.decayMultiplier;
var B=A.interval*A.decayRate;
if(!A.isDecay){B=(B>=A.maxDecayTime)?A.maxDecayTime:B
}B=Math.floor(B);
A.worker=window.setTimeout(function(){A.run.call(A)
},B)
})
},reset:function(){this.destroy().run();
return this
},destroy:function(){this.stop();
this.decayRate=1;
return this
}};
aipo.userAgent={__userAgent:window.navigator.userAgent.toLowerCase(),isAndroid:function(){return this.__userAgent.indexOf("android")>-1
},isIphone:function(){return this.__userAgent.indexOf("iphone")>-1
},isSmartPhone:function(){return this.isAndroid()||this.isIphone()
}};
aipo.escapeHTML=function(B){var A=function(C){switch(C){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(B).replace(/[<>&"']/g,A)
};
dojo.provide("aipo.common");
aipo.common.showDialog=function(A,C,D){var B=dijit.byId("modalDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#modalDialog").addClass("mb_dialog");
if(!B){B=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:C,_callback:D},"modalDialog")
}else{B.setCallback(C,D)
}if(B){B.setHref(A);
B.show()
}};
aipo.common.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}};
aipo.common.showDialogSub=function(B,C,E){var A=dijit.byId("modalDialog");
var D=window.navigator.userAgent.toLowerCase();
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
if(!A){A=new aimluck.widget.DialogSub({widgetId:"modalDialog",_portlet_id:C,_callback:E,templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"},"modalDialog")
}else{A.setCallback(C,E)
}if(A){A.setHref(B);
A.show()
}};
aipo.common.hideDialogSub=function(){dijit.byId("modalDialog").hide()
};
aipo.common.customizeDialog=function(){if(dojo.byId("data-activecustomizeurl")!=undefined&&dojo.byId("data-activecustomizeurl")!=""){var A=dojo.byId("data-activecustomizeurl").value;
aipo.common.showDialog(A)
}};
dojo.provide("aipo.io");
aipo.io.loadHtml=function(A,C,B){dojo.xhrGet({url:A,transport:"ScriptSrcTransport",jsonParamName:"callback",content:C,method:"get",mimetype:"application/json",encoding:"utf-8",load:function(E,G,F,D){dojo.byId("content-"+B).innerHTML=G.body;
dojo.html.setVisibility(dojo.byId("content-"+B),true);
dojo.html.setDisplay(dojo.byId("indicator-"+B),false)
},error:function(E,G,F,D){dojo.byId("content-"+B).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u8aad\u307f\u8fbc\u307f\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
dojo.html.setVisibility(dojo.byId("content-"+B),true);
dojo.html.setDisplay(dojo.byId("indicator-"+B),false)
},timeout:function(E,G,F,D){dojo.byId("content-"+B).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002";
dojo.html.setVisibility(dojo.byId("content-"+B),true);
dojo.html.setDisplay(dojo.byId("indicator-"+B),false)
},timeoutSeconds:10})
};
if(!dojo._hasResource["aimluck.dnd.DragMoveObject"]){dojo._hasResource["aimluck.dnd.DragMoveObject"]=true;
dojo.provide("aimluck.dnd.DragMoveObject");
dojo.provide("aimluck.dnd.Draggable");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.require("dojo.parser");
dojo.require("dojo.dnd.Source");
dojo.declare("aimluck.dnd.DragMoveObject",[dojo.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(A){dojo.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(A){dojo.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(B){var A=this.marginBox;
this.leftTop={l:A.l+B.pageX,t:A.t+B.pageY};
dojo.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(B){this._pageX=B.pageX;
this._pageY=B.pageY;
dojo.dnd.autoScroll(B);
var A=this.marginBox;
this.leftTop={l:A.l+B.pageX,t:A.t+B.pageY}
}});
dojo.declare("aimluck.dnd.Draggable",dojo.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(A,B){this.portletId=B.pid
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,A,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=A.pageX;
dragObj._pageY=A.pageY;
this._lastX=A.pageX;
this._lastY=A.pageY;
dojo.stopEvent(A)
}})
};
if(!dojo._hasResource["aimluck.widget.Contentpane"]){dojo._hasResource["aimluck.widget.Contentpane"]=true;
dojo.provide("aimluck.widget.Contentpane");
dojo.require("dijit.layout.ContentPane");
dojo.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(A){this.href=A;
return this._prepareLoad(true)
},setParam:function(A,B){this.params[A]=B
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(C);
A.addCallback(function(D){B.clearParams();
B.clearReloadIds();
try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
}})
};
if(!dojo._hasResource["aimluck.widget.Dialog"]){dojo._hasResource["aimluck.widget.Dialog"]=true;
dojo.provide("aimluck.widget.Dialog");
dojo.provide("aimluck.widget.DialogSub");
dojo.provide("aimluck.widget.DialogUnderlay");
dojo.provide("aimluck.widget.Timeout");
dojo.require("dijit.Dialog");
dojo.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var A="";
var C="";
os="";
os.top="";
os.left="";
C.width="";
C.height="";
var B=""
}});
dojo.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
dojo.declare("aimluck.widget.DialogSub",[aimluck.widget.Dialog,dijit.Dialog],{templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"});
dojo.declare("aimluck.widget.Dialog",[dijit.Dialog],{loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar});
var A=this.domNode;
dojo.connect(this._moveable,"onMoving",function(G,F){var D=dijit.getViewport();
var E=parseInt(dojo.getComputedStyle(A).width);
var C=parseInt(D.w);
if(F.l<0){F.l=0
}if(F.l+E>C){F.l=C-E
}if(F.t<0){F.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,dialog:this,duration:this.duration,onEnd:function(){B.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var A=dojo.byId("weeklyScrollPane_"+this._portlet_id);
if(A){if(typeof aipo.schedule.tmpScroll=="undefined"){dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var A=window.navigator.userAgent.toLowerCase();
if(A.indexOf("iphone")>-1||A.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var B=dojo.byId(this.widgetId);
if(B){B.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(A,B){this._portlet_id=A;
this._callback=B
},setParam:function(A,B){this.params[A]=B
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(A){this.href=A;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var A=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var B=this.domNode.style;
B.left=Math.floor((A.l+(A.w-C.w)/2))+"px";
if(Math.floor((A.t+(A.h-C.h)/2))>0){B.top=Math.floor((A.t+(A.h-C.h)/2))+"px"
}else{B.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(C);
A.addCallback(function(D){B.clearParams();
B.clearReloadIds();
try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
dojo.query(".mb_dialoghide").removeClass("mb_dialoghide");
dojo.query("#modalDialog").removeClass("mb_dialog")
}})
};
if(!dojo._hasResource["aimluck.widget.Dropdown"]){dojo._hasResource["aimluck.widget.Dropdown"]=true;
dojo.provide("aimluck.widget.Dropdown");
dojo.require("dijit.form.Button");
dojo.declare("aimluck.widget.Dropdown",[dijit.form.DropDownButton],{inputWidth:"250px",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",iconURL:"",iconAlt:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',_openDropDown:function(){this.inherited(arguments);
var B=window.navigator.userAgent.toLowerCase();
if(B.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){var A=this.dropDown.domNode.parentNode;
var C=A.style.top.replace("px","");
top_new=parseInt(C)+window.scrollY;
A.style.top=top_new+"px"
}},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var C=this.dropDown;
if(!C){return false
}if(!this._opened){if(C.href&&!C.isLoaded){var A=this;
var B=dojo.connect(C,"onLoad",function(){dojo.disconnect(B);
A._openDropDown()
});
C._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}}})
};
if(!dojo._hasResource["aimluck.widget.Menu"]){dojo._hasResource["aimluck.widget.Menu"]=true;
dojo.provide("aimluck.widget.Menu");
dojo.provide("aimluck.widget.Menuitem");
dojo.provide("aimluck.widget.Menuseparator");
dojo.provide("aimluck.widget.Menubar");
dojo.provide("aimluck.widget.DropDownButton");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Menu");
dojo.require("dijit.Toolbar");
dojo.require("dijit.form.Button");
dojo.declare("aimluck.widget.Menuitem",[dijit.MenuItem],{label:"",iconSrc:"",iconClass:"",url:"",templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem" nowrap="nowrap"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline moz-inline-box dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.MenuButton",[dijit.form.Button],{label:"",iconSrc:"",iconClass:"",url:"",itemClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"><div class=\'dijitRight\'><button class="dijitStretch dijitButtonNode dijitButtonContents  ${itemClass}" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"><div class="dijitInline ${iconClass} menuItemIcon " dojoAttachPoint="iconNode"></div><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span></button></div></div>\n',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.Menu",[dijit.Menu],{templateString:'<table class="popupMenu dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>'});
dojo.declare("aimluck.widget.Menuseparator",[dijit.MenuSeparator],{templateString:'<tr class="menuSeparator"><td colspan=4><div class="menuSeparatorTop"></div><div class="menuSeparatorBottom"></div></td></tr>'});
dojo.declare("aimluck.widget.ToolbarSeparator",[dijit.ToolbarSeparator],{templateString:'<div class="dijitInline moz-inline-box">&nbsp;｜&nbsp;</div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}});
dojo.declare("aimluck.widget.DropDownButton",[dijit.form.DropDownButton],{label:"",iconSrc:"",iconClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n'});
dojo.declare("aimluck.widget.ComboButton",[dijit.form.ComboButton],{url:"",itemClass:"",templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft moz-inline-box ${itemClass} \'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.Menubar",[dijit.Toolbar],{selectedIndex:-1,templateString:'<div class="tundra"><div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div></div>',postCreate:function(){dijit.Toolbar.superclass.postCreate.apply(this,arguments);
this.makeMenu(this.items);
this.isShowingNow=true
},makeMenu:function(B){var C=this;
var A=0;
dojo.forEach(B,function(E){if(E.submenu){var G=new aimluck.widget.Menu({id:E.caption,style:"display: none;"});
dojo.forEach(E.submenu,function(H){if(H!=null){if(H.caption){G.addChild(new aimluck.widget.Menuitem({label:H.caption,url:H.url,iconClass:H.iconClass}))
}else{G.addChild(new aimluck.widget.Menuseparator())
}}});
var D="";
if(C.selectedIndex==parseInt(A)){D+="menuBarItemSelected"
}var F=new aimluck.widget.ComboButton({label:E.caption,iconClass:E.iconClass,dropDown:G,url:E.url,itemClass:D});
F.addChild(G);
C.addChild(F)
}else{if(E.url){var D="";
if(C.selectedIndex==A){D+="menuBarItemSelected"
}var F=new aimluck.widget.MenuButton({id:E.caption+"_Button"+A,label:E.caption,url:E.url,iconClass:E.iconClass,itemClass:D});
C.addChild(F)
}else{C.addChild(new aimluck.widget.ToolbarSeparator())
}}A++
})
}})
};
if(!dojo._hasResource["aipo.widget.ActivityList"]){dojo._hasResource["aipo.widget.ActivityList"]=true;
dojo.provide("aipo.widget.ActivityList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("aimluck.widget.Contentpane");
dojo.declare("aipo.widget.ActivityList",[dijit._Widget,dijit._Templated],{widgetId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}" style="width: 420px;"><div class="activityPopup"><div class="clearfix"><div id="activityListPane" widgetId="activityListPane"></div></div></div></div>\n',postCreate:function(){},reload:function(){var A=dijit.byId("activityListPane");
if(!A){A=new aimluck.widget.Contentpane({},"activityListPane")
}if(window.webkitNotifications){A.viewPage("?template=ActivityListScreen&s=1&p="+window.webkitNotifications.checkPermission())
}else{A.viewPage("?template=ActivityListScreen&s=0")
}}})
};
if(!dojo._hasResource["aipo.widget.GroupSelectList"]){dojo._hasResource["aipo.widget.GroupSelectList"]=true;
dojo.provide("aipo.widget.GroupSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.GroupSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",memberLimit:0,groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",widgetId:"",selectId:"",inputId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0);
A.options.remove(0)
}B.add(D,B.options.length);
A.add(C,A.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0]);
A.removeChild(B.options[0])
}B.insertBefore(D,B.options[B.options.length]);
A.insertBefore(C,A.options[A.options.length])
}this.inputMemberSync()
},addMember:function(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}B.insertBefore(C,F[F.length])
}}},removeAllMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
var B=dojo.byId(this.selectId);
if(document.all){var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
A.remove(i);
i-=1
}}}else{var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
B.removeChild(A[i]);
i-=1
}}}},inputMemberSync:function(){var A=dojo.byId(this.selectId);
var B=dojo.byId(this.inputId);
var C="";
var D=A.options;
for(i=0;
i<D.length;
i++){if(i!=0){C+=", "
}C+=D[i].text
}B.innerHTML=C
},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(A){this.removeMemberSync();
this.inputMemberSync()
}})
};
if(!dojo._hasResource["aipo.widget.GroupNormalSelectList"]){dojo._hasResource["aipo.widget.GroupNormalSelectList"]=true;
dojo.provide("aipo.widget.GroupNormalSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.GroupNormalSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",memberLimit:0,changeGroupUrl:"",widgetId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup" style="width:335px"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c \u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(C,D,E){var A=dojo.byId(this.memberToId);
if(this.memberLimit!=0&&A.options.length>=this.memberLimit){return 
}if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}},addMember:function(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}B.insertBefore(C,F[F.length])
}}},removeAllMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var A=dojo.byId(this.memberToId);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMemberSync()
}})
};
if(!dojo._hasResource["aipo.widget.MemberSelectList"]){dojo._hasResource["aipo.widget.MemberSelectList"]=true;
dojo.provide("aipo.widget.MemberSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0);
A.options.remove(0)
}B.add(D,B.options.length);
A.add(C,A.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0]);
A.removeChild(B.options[0])
}B.insertBefore(D,B.options[B.options.length]);
A.insertBefore(C,A.options[A.options.length])
}this.inputMemberSync()
},addMember:function(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}B.insertBefore(C,F[F.length])
}}},removeAllMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
var B=dojo.byId(this.selectId);
if(document.all){var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
A.remove(i);
i-=1
}}}else{var D=C.options;
var A=B.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
B.removeChild(A[i]);
i-=1
}}}},inputMemberSync:function(){var A=dojo.byId(this.selectId);
var B=dojo.byId(this.inputId);
var C="";
var D=A.options;
for(i=0;
i<D.length;
i++){if(i!=0){C+=", "
}C+=D[i].text
}B.innerHTML=C
},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(A){this.removeMemberSync();
this.inputMemberSync()
}})
};
if(!dojo._hasResource["aipo.widget.MemberNormalSelectList"]){dojo._hasResource["aipo.widget.MemberNormalSelectList"]=true;
dojo.provide("aipo.widget.MemberNormalSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberNormalSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div style="display: none;" id="${widgetId}-memberlist-indicator" class="indicator alignleft">読み込み中</div><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(A,B,C,D){aimluck.io.addOption(A,B,C,D)
},addOptionSync:function(C,D,E){var A=dojo.byId(this.memberToId);
if(this.memberLimit!=0&&A.options.length>=this.memberLimit){return 
}if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}},addMember:function(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}B.insertBefore(C,F[F.length])
}}},removeAllMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMember:function(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},removeMemberSync:function(){var A=dojo.byId(this.memberToId);
if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}},changeGroup:function(A){var D=A.target.options[A.target.selectedIndex].value;
var B=this.changeGroupUrl+"&groupname="+D;
var C={url:B,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,C)
},onMemberAddClick:function(A){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(A){this.removeMemberSync()
}})
};
dojo.provide("aipo.workflow.MemberNormalSelectList");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(J,N){if(document.all){var H=J.options;
var I=N.options;
if(H.length==1&&H[0].value==""){return 
}for(i=0;
i<H.length;
i++){if(!H[i].selected){continue
}var K=false;
for(j=0;
j<I.length;
j++){if(I[j].value==H[i].value){K=true;
break
}}if(K){continue
}var M=document.createElement("OPTION");
M.value=H[i].value;
M.text=H[i].text;
M.selected=true;
if(I.length==1&&I[0].value==""){I.remove(0)
}if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}var L=document.createElement("OPTION");
L.value=H[i].value;
L.text=(j+1)+". "+H[i].text;
L.selected=true;
I.add(L,I.length)
}}else{var H=J.options;
var I=N.options;
if(H.length==1&&H[0].value==""){return 
}for(i=0;
i<H.length;
i++){if(!H[i].selected){continue
}var K=false;
for(j=0;
j<I.length;
j++){if(I[j].value==H[i].value){K=true;
break
}}if(K){continue
}var M=document.createElement("OPTION");
M.value=H[i].value;
M.text=H[i].text;
M.selected=true;
if(N.options.length==1&&N.options[0].value==""){N.removeChild(N.options[0])
}if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}var L=document.createElement("OPTION");
L.value=H[i].value;
L.text=(j+1)+". "+H[i].text;
L.selected=true;
N.insertBefore(L,I[I.length])
}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1;
if(i+1<D.length){for(j=i+1;
j<D.length;
j++){if(j<9){D[j].text=D[j].text.slice(3)
}else{D[j].text=D[j].text.slice(4)
}D[j].text=(j+1)+". "+D[j].text
}}}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1;
if(i+1<D.length){for(j=i+1;
j<D.length;
j++){if(j<9){D[j].text=D[j].text.slice(3)
}else{D[j].text=D[j].text.slice(4)
}D[j].text=(j+1)+". "+D[j].text
}}}}}}});
if(!dojo._hasResource["aipo.widget.DateCalendar"]){dojo._hasResource["aipo.widget.DateCalendar"]=true;
dojo.provide("aipo.widget.DateCalendar");
dojo.require("dijit._Calendar");
dojo.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(A){this.onChangeNoCallback(A);
this.callback(A)
},onValueSelected:function(A){this.onChange(A)
},onChangeNoCallback:function(D){var J=D.getFullYear();
var C=1+D.getMonth();
var B=D.getDate();
var A=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var I=A[D.getDay()];
var F=dojo.byId(this.dateId+"_view");
F.innerHTML=J+"\u5e74"+C+"\u6708"+B+"\u65e5\uff08"+I+"\uff09";
var K=dojo.byId(this.dateId);
K.value=J+"/"+C+"/"+B;
var H=dojo.byId(this.dateId+"_year");
H.value=J;
var G=dojo.byId(this.dateId+"_month");
G.value=C;
var E=dojo.byId(this.dateId+"_day");
E.value=B;
dojo.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(C){if(C){var E=dojo.byId(this.dateId+"_view");
E.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var H=dojo.byId(this.dateId+"_year");
H.value="";
var F=dojo.byId(this.dateId+"_month");
F.value="";
var D=dojo.byId(this.dateId+"_day");
D.value="";
this.value="";
if(!dojo.byId(this.dateId+"_flag").checked){dojo.byId(this.dateId+"_flag").checked=true
}}else{var K=dojo.byId(this.dateId);
if((!K.value)||(K.value=="")){this.setValue(new Date())
}else{var J=K.value.split("/");
if(J.length==3){var I=J[0];
var B=J[1]-1;
var G=J[2];
var A=new Date(I,B,G);
this.setValue(A)
}}}},clearDate:function(){this.value=null
}})
};
if(!dojo._hasResource["aipo.widget.DropdownActivityChecker"]){dojo._hasResource["aipo.widget.DropdownActivityChecker"]=true;
dojo.provide("aipo.widget.DropdownActivityChecker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.ActivityList");
dojo.declare("aipo.widget.DropdownActivityChecker",[aimluck.widget.Dropdown],{initValue:"",displayCheck:"",iconURL:"",iconAlt:"",iconWidth:"",iconHeight:"",callback:function(){},templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div style="outline:0" class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><div id="activitychecker" class="zero counter"></div><span class="mb_hide">お知らせ</span></div></div></div>\n',postCreate:function(){this.inherited(arguments);
this.dropDown=new aipo.widget.ActivityList({},"activityLiteList")
},_openDropDown:function(){this.inherited(arguments);
this.dropDown.reload()
},onCheckActivity:function(B){var A=dojo.byId("activitychecker");
if(B>99){A.innerHTML="99+";
dojo.removeClass("activitychecker","zero")
}else{if(B==0){A.innerHTML=B;
dojo.addClass("activitychecker","zero")
}else{A.innerHTML=B;
dojo.removeClass("activitychecker","zero")
}}},onCheckBlank:function(A){}})
};
if(!dojo._hasResource["aipo.widget.DropdownDatepicker"]){dojo._hasResource["aipo.widget.DropdownDatepicker"]=true;
dojo.provide("aipo.widget.DropdownDatepicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.DateCalendar");
dojo.require("dojo.date.locale");
dojo.declare("aipo.widget.DropdownDatepicker",[aimluck.widget.Dropdown],{dateId:"",dateValue:"",initValue:"",displayCheck:"",iconURL:"",iconAlt:"",callback:function(){},listWidgetId:"datewidget",templateString:'<div class="dijit dijitLeft dijitInline"><div dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t style="float:left;"><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span></div></div><div class="alignleft"><span name="${dateId}_view" id="${dateId}_view" dojoAttachPoint="inputNode" style="vertical-align:middle;background:#ffffff ;border:0px;" autocomplete="off" readonly="readonly"></span><span style="display:${displayCheck}"><input name="${dateId}_check" type="checkbox" value="TRUE" id="${dateId}_flag" dojoAttachEvent="onclick:onCheckBlank" /><label for="${dateId}_flag">\u0020\u6307\u5b9a\u3057\u306a\u3044</label></span><input type="hidden" id="${dateId}" name="${dateId}" value="${dateValue}" dojoAttachPoint="valueNode" /><input type="hidden" id="${dateId}_year" name="${dateId}_year" value="" dojoAttachPoint="valueYearNode" /><input type="hidden" id="${dateId}_month" name="${dateId}_month" value="" dojoAttachPoint="valueMonthNode" /><input type="hidden" id="${dateId}_day" name="${dateId}_day" value="" dojoAttachPoint="valueDayNode" /></div></div>\n',_openDropDown:function(){aimluck.widget.Dropdown.prototype._openDropDown.apply(this);
if(aipo.userAgent.isAndroid()){dojo.query("input,select,button").forEach(function(B,A){B.disabled=true
})
}},_closeDropDown:function(){aimluck.widget.Dropdown.prototype._closeDropDown.apply(this);
if(aipo.userAgent.isAndroid()){dojo.query("input,select,button:not(.disabled)").forEach(function(B,A){B.disabled=false
})
}},postCreate:function(){this.inherited(arguments);
var F={widgetId:this.listWidgetId,dateId:this.dateId,callback:this.callback};
this.dropDown=new aipo.widget.DateCalendar(F,this.listWidgetId);
if(this.initValue!=""){var B=this.initValue.split("/");
if(B.length==3){var D=B[0];
var A=B[1]-1;
var C=B[2];
var E=dojo.byId(this.dateId);
E.value=this.initValue;
this.dropDown.clearDate();
this.dropDown.setValue(new Date(D,A,C))
}}else{this.dropDown.disabledCalendar(true)
}},onCheckBlank:function(A){this.dropDown.disabledCalendar(dojo.byId(this.dateId+"_flag").checked)
}})
};
if(!dojo._hasResource["aipo.widget.DropdownGrouppicker"]){dojo._hasResource["aipo.widget.DropdownGrouppicker"]=true;
dojo.provide("aipo.widget.DropdownGrouppicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.GroupSelectList");
dojo.declare("aipo.widget.DropdownGrouppicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var B={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromTitle:this.memberFromTitle,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue};
var C=dijit.byId(this.listWidgetId);
if(C){this.dropDown=C;
var A=dojo.byId(C.selectId);
this.removeAllOptions(A);
A=dojo.byId(C.memberToId);
this.removeAllOptions(A)
}else{this.dropDown=new aipo.widget.GroupSelectList(B,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(A){var B;
if(document.all){var C=A.options;
for(B=0;
B<C.length;
B++){C.remove(B);
B-=1
}}else{var C=A.options;
for(B=0;
B<C.length;
B++){A.removeChild(C[B]);
B-=1
}}},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0);
A.options.remove(0)
}B.add(D,B.options.length);
A.add(C,A.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0]);
A.removeChild(B.options[0])
}B.insertBefore(D,B.options[B.options.length]);
A.insertBefore(C,A.options[A.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var B=dojo.byId(this.selectId);
var C=dojo.byId(this.inputId);
var E="";
var F=B.options;
var D=0;
var A=F.length;
if(A<=0){return 
}for(D=0;
D<A;
D++){if(D!=0){E+=", "
}E+=F[D].text
}C.innerHTML=E
}})
};
if(!dojo._hasResource["aipo.widget.DropdownMemberpicker"]){dojo._hasResource["aipo.widget.DropdownMemberpicker"]=true;
dojo.provide("aipo.widget.DropdownMemberpicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.MemberSelectList");
dojo.declare("aipo.widget.DropdownMemberpicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"memberlistwidget",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var B={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectPreOptionKey:this.groupSelectPreOptionKey,groupSelectPreOptionValue:this.groupSelectPreOptionValue,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl};
var C=dijit.byId(this.listWidgetId);
if(C){this.dropDown=C;
var A=dojo.byId(C.selectId);
this.removeAllOptions(A);
A=dojo.byId(C.memberToId);
this.removeAllOptions(A)
}else{this.dropDown=new aipo.widget.MemberSelectList(B,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(A){var B;
if(document.all){var C=A.options;
for(B=0;
B<C.length;
B++){C.remove(B);
B-=1
}}else{var C=A.options;
for(B=0;
B<C.length;
B++){A.removeChild(C[B]);
B-=1
}}},addOptionSync:function(E,F,G){var B=dojo.byId(this.memberToId);
var A=dojo.byId(this.selectId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0);
A.options.remove(0)
}B.add(D,B.options.length);
A.add(C,A.options.length)
}else{var D=document.createElement("OPTION");
D.value=E;
D.text=F;
D.selected=G;
var C=document.createElement("OPTION");
C.value=E;
C.text=F;
C.selected=G;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0]);
A.removeChild(B.options[0])
}B.insertBefore(D,B.options[B.options.length]);
A.insertBefore(C,A.options[A.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var B=dojo.byId(this.selectId);
var C=dojo.byId(this.inputId);
var E="";
var F=B.options;
var D=0;
var A=F.length;
if(A<=0){return 
}for(D=0;
D<A;
D++){if(D!=0){E+=", "
}E+=F[D].text
}C.innerHTML=E
}})
};
if(!dojo._hasResource["aipo.widget.ToolTip"]){dojo._hasResource["aipo.widget.ToolTip"]=true;
dojo.provide("aipo.widget.ToolTip");
dojo.require("dijit.Tooltip");
dojo.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(H,A,G,C){if(this.aroundNode&&this.aroundNode===A){return 
}if(A==null||A=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=H;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var F=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var E=dijit.placeOnScreenAroundElement(this.domNode,A,F);
this.domNode.className="dijitTooltip dijitTooltip"+(E.corner=="BL"?"Right":"Left")
}catch(B){this.hide(A);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var D=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=D+"px"
}dojo.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=A;
if(G){G(this.containerNode,C)
}},hide:function(A){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
dojo.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(D,A,C,B){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(D,A,C,B)
};
aipo.widget.hideTooltip=function(A){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(A)
};
dojo.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(B,A,C){this._portletId=A;
this._callback=C
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,A,this._callback,this._connectNodes[0]);
this._connectNode=A
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(B){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var A=B.target;
aipo.widget.tmpX=B.pageX;
aipo.widget.tmpY=B.pageY;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(A)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
};
dojo.provide("aipo.fileupload.widget.FileuploadDialog");
dojo.provide("aipo.fileupload.widget.FileuploadDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.fileupload.widget.FileuploadDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=fileuploadDialogUnderlayWrapper id='${id}_underlay'><div class=fileuploadDialogUnderlay dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.fileupload.widget.FileuploadDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"fileuploadDialog",templateString:"<div id='fileuploadDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadDialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
}});
if(!dojo._hasResource["aipo.widget.FileuploadViewDialog"]){dojo._hasResource["aipo.widget.FileuploadViewDialog"]=true;
dojo.provide("aipo.fileupload.widget.FileuploadViewDialog");
dojo.provide("aipo.fileupload.widget.FileuploadViewDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.fileupload.widget.FileuploadViewDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class='fileuploadViewDialogUnderlayWrapper modalDialogUnderlayWrapper' id='${id}_underlay'><div class='fileuploadViewDialogUnderlay modalDialogUnderlay' dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.fileupload.widget.FileuploadViewDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"auiPopup imgPopup fileuploadViewDialog",templateString:"<div id='fileuploadViewDialog' class='${templateCssString}' dojoattachpoint='wrapper' onclick='aipo.fileupload.hideImageDialog()'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadViewDialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},onLoad:function(){this._position();
aimluck.widget.Dialog.superclass.onLoad.call(this)
}})
};
var gadgets=gadgets||{};
var shindig=shindig||{};
var osapi=osapi||{};
gadgets.config=function(){var C={};
var D;
return{register:function(B,G,H){var A=C[B];
if(!A){A=[];
C[B]=A
}A.push({validators:G||{},callback:H})
},get:function(A){if(A){return D[A]||{}
}return D
},init:function(T,M){D=T;
for(var B in C){if(C.hasOwnProperty(B)){var A=C[B],P=T[B];
for(var Q=0,R=A.length;
Q<R;
++Q){var O=A[Q];
if(P&&!M){var S=O.validators;
for(var N in S){if(S.hasOwnProperty(N)){if(!S[N](P[N])){throw new Error('Invalid config value "'+P[N]+'" for parameter "'+N+'" in component "'+B+'"')
}}}}if(O.callback){O.callback(T)
}}}}},EnumValidator:function(A){var B=[];
if(arguments.length>1){for(var G=0,H;
(H=arguments[G]);
++G){B.push(H)
}}else{B=A
}return function(F){for(var J=0,E;
(E=B[J]);
++J){if(F===B[J]){return true
}}return false
}
},RegExValidator:function(A){return function(B){return A.test(B)
}
},ExistsValidator:function(A){return typeof A!=="undefined"
},NonEmptyStringValidator:function(A){return typeof A==="string"&&A.length>0
},BooleanValidator:function(A){return typeof A==="boolean"
},LikeValidator:function(A){return function(G){for(var B in A){if(A.hasOwnProperty(B)){var H=A[B];
if(!H(G[B])){return false
}}}return true
}
}}
}();
gadgets.config.isGadget=false;
gadgets.config.isContainer=true;
gadgets.util=function(){function K(B){var A;
var D=B.indexOf("?");
var C=B.indexOf("#");
if(C===-1){A=B.substr(D+1)
}else{A=[B.substr(D+1,C-D-1),"&",B.substr(C+1)].join("")
}return A.split("&")
}var M=null;
var N={};
var O={};
var L=[];
var I={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function P(B,A){return String.fromCharCode(A)
}function J(A){N=A["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,J)
}return{getUrlParameters:function(A){var S=typeof A==="undefined";
if(M!==null&&S){return M
}var E={};
var H=K(A||document.location.href);
var C=window.decodeURIComponent?decodeURIComponent:unescape;
for(var F=0,G=H.length;
F<G;
++F){var D=H[F].indexOf("=");
if(D===-1){continue
}var T=H[F].substring(0,D);
var B=H[F].substring(D+1);
B=B.replace(/\+/g," ");
E[T]=C(B)
}if(S){M=E
}return E
},makeClosure:function(A,E,F){var B=[];
for(var C=2,D=arguments.length;
C<D;
++C){B.push(arguments[C])
}return function(){var R=B.slice();
for(var G=0,H=arguments.length;
G<H;
++G){R.push(arguments[G])
}return E.apply(A,R)
}
},makeEnum:function(C){var B,D,A={};
for(B=0;
(D=C[B]);
++B){A[D]=D
}return A
},getFeatureParameters:function(A){return typeof N[A]==="undefined"?null:N[A]
},hasFeature:function(A){return typeof N[A]!=="undefined"
},getServices:function(){return O
},registerOnLoadHandler:function(A){L.push(A)
},runOnLoadHandlers:function(){for(var A=0,B=L.length;
A<B;
++A){L[A]()
}},escape:function(D,F){if(!D){return D
}else{if(typeof D==="string"){return gadgets.util.escapeString(D)
}else{if(typeof D==="array"){for(var A=0,C=D.length;
A<C;
++A){D[A]=gadgets.util.escape(D[A])
}}else{if(typeof D==="object"&&F){var B={};
for(var E in D){if(D.hasOwnProperty(E)){B[gadgets.util.escapeString(E)]=gadgets.util.escape(D[E],true)
}}return B
}}}}return D
},escapeString:function(F){if(!F){return F
}var C=[],A,E;
for(var B=0,D=F.length;
B<D;
++B){A=F.charCodeAt(B);
E=I[A];
if(E===true){C.push("&#",A,";")
}else{if(E!==false){C.push(F.charAt(B))
}}}return C.join("")
},unescapeString:function(A){if(!A){return A
}return A.replace(/&#([0-9]+);/g,P)
},attachBrowserEvent:function(B,C,A,D){if(typeof B.addEventListener!="undefined"){B.addEventListener(C,A,D)
}else{if(typeof B.attachEvent!="undefined"){B.attachEvent("on"+C,A)
}else{gadgets.warn("cannot attachBrowserEvent: "+C)
}}},removeBrowserEvent:function(B,C,A,D){if(B.removeEventListener){B.removeEventListener(C,A,D)
}else{if(B.detachEvent){B.detachEvent("on"+C,A)
}else{gadgets.warn("cannot removeBrowserEvent: "+C)
}}}}
}();
gadgets.util.getUrlParameters();
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var B=/___$/;
return{parse:function(A){try{return window.JSON.parse(A)
}catch(D){return false
}},stringify:function(A){try{return window.JSON.stringify(A,function(C,F){return !B.test(C)?F:null
})
}catch(D){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(G){var F={};
if(G===null||G===undefined){return F
}for(var E in G){if(G.hasOwnProperty(E)){var H=G[E];
if(null===H||undefined===H){continue
}F[E]=(typeof H==="string")?H:gadgets.json.stringify(H)
}}return F
};
var tamings___=tamings___||[];
tamings___.push(function(B){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};
shindig.auth=new shindig.Auth();
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var H,I;
function J(B,A,C){if(typeof window.addEventListener!="undefined"){window.addEventListener(B,A,C)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+B,A)
}}}function F(B,A,C){if(window.removeEventListener){window.removeEventListener(B,A,C)
}else{if(window.detachEvent){window.detachEvent("on"+B,A)
}}}function G(B){var A=gadgets.json.parse(B.data);
if(!A||!A.f){return 
}var C=gadgets.rpc.getTargetOrigin(A.f);
if(typeof B.origin!=="undefined"?B.origin!==C:B.domain!==/^.+:\/\/([^:]+).*/.exec(C)[1]){return 
}H(A,B.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(B,A){H=B;
I=A;
J("message",G,false);
I("..",true);
return true
},setup:function(A,B){I(A,true);
return true
},call:function(D,A,B){var E=gadgets.rpc.getTargetOrigin(D);
var C=gadgets.rpc._getTargetWin(D);
if(E){window.setTimeout(function(){C.postMessage(gadgets.json.stringify(B),E)
},0)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.flash){gadgets.rpctx.flash=function(){var k="___xpcswf";
var t=null;
var AA=false;
var z=null;
var AN=null;
var p=null;
var AM=100;
var s=50;
var AT=[];
var AL=null;
var AJ=0;
var o="_scr";
var AE="_pnt";
var AB=100;
var u=50;
var x=0;
var AF=null;
var l={};
var AR=window.location.protocol+"//"+window.location.host;
var w="___jsl";
var AG="_fm";
var AC;
function q(){window[w]=window[w]||{};
var B=window[w];
var A=B[AG]={};
AC=w+"."+AG;
return A
}var y=q();
function AK(A,C){var B=function(){A.apply({},arguments)
};
y[C]=y[C]||B;
return AC+"."+C
}function v(A){return A===".."?gadgets.rpc.RPC_ID:A
}function AQ(A){return A===".."?"INNER":"OUTER"
}function AO(A){if(AA){t=A.rpc.commSwf||"/xpc.swf"
}}gadgets.config.register("rpc",null,AO);
function n(){if(p===null&&document.body&&t){var A=t+"?cb="+Math.random()+"&origin="+AR+"&jsl=1";
var B=document.createElement("div");
B.style.height="1px";
B.style.width="1px";
var C='<object height="1" width="1" id="'+k+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+A+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+A+'" height="1" width="1"></embed></object>';
document.body.appendChild(B);
B.innerHTML=C;
p=B.firstChild
}++AJ;
if(AL!==null&&(p!==null||AJ>=s)){window.clearTimeout(AL)
}else{AL=window.setTimeout(n,AM)
}}function AS(){if(l[".."]){return 
}m("..");
x++;
if(x>=u&&AF!==null){window.clearTimeout(AF);
AF=null
}else{AF=window.setTimeout(AS,AB)
}}function AP(){if(p!==null){while(AT.length>0){var A=AT.shift();
var B=A.targetId;
p.setup(A.token,v(B),AQ(B))
}}}function AD(){AP();
if(AL!==null){window.clearTimeout(AL)
}AL=null
}AK(AD,"ready");
function AI(){if(!l[".."]&&AF===null){AF=window.setTimeout(AS,AB)
}}AK(AI,"setupDone");
function AH(A,D,F){var B=gadgets.rpc.getTargetOrigin(A);
var E=gadgets.rpc.getAuthToken(A);
var C="sendMessage_"+v(A)+"_"+E+"_"+AQ(A);
var G=p[C];
G.call(p,gadgets.json.stringify(F),B);
return true
}function r(A,D,E){var C=gadgets.json.parse(A);
var B=C[o];
if(B){AN(B,true);
l[B]=true;
if(B!==".."){m(B,true)
}return 
}window.setTimeout(function(){z(C,D)
},0)
}AK(r,"receiveMessage");
function m(D,A){var C=gadgets.rpc.RPC_ID;
var B={};
B[o]=A?"..":C;
B[AE]=C;
AH(D,C,B)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(A,B){z=A;
AN=B;
AA=true;
return true
},setup:function(A,B){AT.push({token:B,targetId:A});
if(p===null&&AL===null){AL=window.setTimeout(n,AM)
}AP();
return true
},call:AH,_receiveMessage:r,_ready:AD,_setupDone:AI}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var G="__g2c_rpc";
var J="__c2g_rpc";
var H;
var I;
function F(E,A,B){try{if(A!==".."){var L=window.frameElement;
if(typeof L[G]==="function"){if(typeof L[G][J]!=="function"){L[G][J]=function(K){H(gadgets.json.parse(K))
}
}L[G](gadgets.json.stringify(B));
return true
}}else{var C=document.getElementById(E);
if(typeof C[G]==="function"&&typeof C[G][J]==="function"){C[G][J](gadgets.json.stringify(B));
return true
}}}catch(D){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(B,A){H=B;
I=A;
return true
},setup:function(A,E){if(A!==".."){try{var B=document.getElementById(A);
B[G]=function(L){H(gadgets.json.parse(L))
}
}catch(C){return false
}}if(A===".."){I("..",true);
var D=function(){window.setTimeout(function(){gadgets.rpc.call(A,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(D)
}return true
},call:function(C,A,B){return F(C,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var L="GRPC____NIXVBS_wrapper";
var K="GRPC____NIXVBS_get_wrapper";
var S="GRPC____NIXVBS_handle_message";
var M="GRPC____NIXVBS_create_channel";
var N=10;
var O=500;
var P={};
var Q;
var R=0;
function T(){var A=P[".."];
if(A){return 
}if(++R>N){gadgets.warn("Nix transport setup failed, falling back...");
Q("..",false);
return 
}if(!A&&window.opener&&"GetAuthToken" in window.opener){A=window.opener;
if(A.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var B=gadgets.rpc.getAuthToken("..");
A.CreateChannel(window[K]("..",B),B);
P[".."]=A;
window.opener=null;
Q("..",true);
return 
}}window.setTimeout(function(){T()
},O)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(A,D){Q=D;
if(typeof window[K]!=="unknown"){window[S]=function(E){window.setTimeout(function(){A(gadgets.json.parse(E))
},0)
};
window[M]=function(G,E,F){if(gadgets.rpc.getAuthToken(G)===F){P[G]=E;
Q(G,true)
}};
var B="Class "+L+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+S+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+M+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+K+"(name, auth)\nDim wrap\nSet wrap = New "+L+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+K+" = wrap\nEnd Function";
try{window.execScript(B,"vbscript")
}catch(C){return false
}}return true
},setup:function(C,B){if(C===".."){T();
return true
}try{var E=document.getElementById(C);
var D=window[K](C,B);
E.contentWindow.opener=D
}catch(A){return false
}return true
},call:function(B,C,D){try{if(P[B]){P[B].SendMessage(gadgets.json.stringify(D))
}}catch(A){return false
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var W=500;
var Y=10;
var V={};
var Q=gadgets.util.getUrlParameters()["parent"];
var O;
var U;
function S(B,D,C,E){var A=function(){document.body.appendChild(B);
B.src="about:blank";
if(E){B.onload=function(){R(E)
}
}B.src=D+"#"+C
};
if(document.body){A()
}else{gadgets.util.registerOnLoadHandler(function(){A()
})
}}function N(B){if(typeof V[B]==="object"){return 
}var A=document.createElement("iframe");
var D=A.style;
D.position="absolute";
D.top="0px";
D.border="0";
D.opacity="0";
D.width="10px";
D.height="1px";
A.id="rmrtransport-"+B;
A.name=A.id;
var C=gadgets.rpc.getRelayUrl(B);
var E=gadgets.rpc.getOrigin(Q);
if(!C){C=E+"/robots.txt"
}V[B]={frame:A,receiveWindow:null,relayUri:C,relayOrigin:E,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(B!==".."){S(A,C,P(B))
}Z(B)
}function Z(C){var A=null;
V[C].searchCounter++;
try{var D=gadgets.rpc._getTargetWin(C);
if(C===".."){A=D.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{A=D.frames["rmrtransport-.."]
}}catch(B){}var E=false;
if(A){E=X(C,A)
}if(!E){if(V[C].searchCounter>Y){return 
}window.setTimeout(function(){Z(C)
},W)
}}function T(G,E,A,B){var F=null;
if(A!==".."){F=V[".."]
}else{F=V[G]
}if(F){if(E!==gadgets.rpc.ACK){F.queue.push(B)
}if(F.waiting||(F.queue.length===0&&!(E===gadgets.rpc.ACK&&B&&B.ackAlone===true))){return true
}if(F.queue.length>0){F.waiting=true
}var H=F.relayUri+"#"+P(G);
try{F.frame.contentWindow.location=H;
var D=F.width==10?20:10;
F.frame.style.width=D+"px";
F.width=D
}catch(C){return false
}}return true
}function P(C){var B=V[C];
var D={id:B.sendId};
if(B){D.d=Array.prototype.slice.call(B.queue,0);
var A={s:gadgets.rpc.ACK,id:B.recvId};
if(!B.originVerified){A.sendToken=B.verifySendToken
}if(B.verifyRecvToken){A.recvToken=B.verifyRecvToken
}D.d.push(A)
}return gadgets.json.stringify(D)
}function R(B){var E=V[B];
var I=E.receiveWindow.location.hash.substring(1);
var A=gadgets.json.parse(decodeURIComponent(I))||{};
var L=A.d||[];
var K=false;
var F=false;
var D=0;
var M=(E.recvId-A.id);
for(var J=0;
J<L.length;
++J){var G=L[J];
if(G.s===gadgets.rpc.ACK){U(B,true);
E.verifyRecvToken=G.sendToken;
if(!E.originVerified&&G.recvToken&&String(G.recvToken)==String(E.verifySendToken)){E.originVerified=true
}if(E.waiting){F=true
}E.waiting=false;
var H=Math.max(0,G.id-E.sendId);
E.queue.splice(0,H);
E.sendId=Math.max(E.sendId,G.id||0);
continue
}K=true;
if(++D<=M){continue
}++E.recvId;
O(G,E.originVerified?E.relayOrigin:undefined)
}if(K||(F&&E.queue.length>0)){var C=(B==="..")?gadgets.rpc.RPC_ID:"..";
T(B,gadgets.rpc.ACK,C,{ackAlone:K})
}}function X(D,A){var E=V[D];
try{var F=false;
F="document" in A;
if(!F){return false
}F=typeof A.document=="object";
if(!F){return false
}var B=A.location.href;
if(B==="about:blank"){return false
}}catch(G){return false
}E.receiveWindow=A;
function C(){R(D)
}if(typeof A.attachEvent==="undefined"){A.onresize=C
}else{A.attachEvent("onresize",C)
}if(D===".."){S(E.frame,E.relayUri,P(D),D)
}else{R(D)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(B,A){O=B;
U=A;
return true
},setup:function(A,C){try{N(A)
}catch(B){gadgets.warn("Caught exception setting up RMR: "+B);
return false
}return true
},call:function(C,A,B){return T(C,B.s,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var J=[];
var M=0;
var N;
var I=2000;
var K={};
function O(B){var D=[];
for(var A=0,C=B.length;
A<C;
++A){D.push(encodeURIComponent(gadgets.json.stringify(B[A])))
}return D.join("&")
}function P(A){var C;
for(var D=J.length-1;
D>=0;
--D){var E=J[D];
try{if(E&&(E.recyclable||E.readyState==="complete")){E.parentNode.removeChild(E);
if(window.ActiveXObject){J[D]=E=null;
J.splice(D,1)
}else{E.recyclable=false;
C=E;
break
}}}catch(B){}}if(!C){C=document.createElement("iframe");
C.style.border=C.style.width=C.style.height="0px";
C.style.visibility="hidden";
C.style.position="absolute";
C.onload=function(){this.recyclable=true
};
J.push(C)
}C.src=A;
window.setTimeout(function(){document.body.appendChild(C)
},0)
}function L(C,A){for(var B=A-1;
B>=0;
--B){if(typeof C[B]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(B,A){N=A;
N("..",true);
return true
},setup:function(A,B){N(A,true);
return true
},call:function(B,C,D){var U=gadgets.rpc.getRelayUrl(B);
++M;
if(!U){gadgets.warn("No relay file assigned for IFPC");
return false
}var X=null,W=[];
if(D.l){var F=D.a;
X=[U,"#",O([C,M,1,0,O([C,D.s,"","",C].concat(F))])].join("");
W.push(X)
}else{X=[U,"#",B,"&",C,"@",M,"&"].join("");
var A=encodeURIComponent(gadgets.json.stringify(D)),G=I-X.length,E=Math.ceil(A.length/G),H=0,V;
while(A.length>0){V=A.substring(0,G);
A=A.substring(G);
W.push([X,E,"&",H,"&",V].join(""));
H+=1
}}do{P(W.shift())
}while(W.length>0);
return true
},_receiveMessage:function(D,F){var E=D[1],G=parseInt(D[2],10),B=parseInt(D[3],10),A=D[D.length-1],C=G===1;
if(G>1){if(!K[E]){K[E]=[]
}K[E][B]=A;
if(L(K[E],G)){A=K[E].join("");
delete K[E];
C=true
}}if(C){F(gadgets.json.parse(decodeURIComponent(A)))
}}}
}()
}if(!window.gadgets.rpc){gadgets.rpc=function(){var Au="__cb";
var An="";
var Am="__ack";
var Aa=500;
var A0=10;
var Ae="|";
var AM="callback";
var AZ="origin";
var AO="referer";
var AP={};
var Aj={};
var A3={};
var A5={};
var AE=0;
var AU={};
var AT={};
var Ap={};
var Ac={};
var AS={};
var A2={};
var Ab=null;
var AQ=null;
var AD=(window.top!==window.self);
var AL=window.name;
var Ax=function(){};
var Aq=0;
var Ah=1;
var Af=2;
var AH=window.console;
var Ak=AH&&AH.log&&function(A){AH.log(A)
}||function(){};
var Ao=(function(){function A(B){return function(){Ak(B+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:A("init"),setup:A("setup"),call:A("call")}
})();
if(gadgets.util){Ac=gadgets.util.getUrlParameters()
}function Aw(){if(Ac.rpctx=="flash"){return gadgets.rpctx.flash
}if(Ac.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function AV(A,C){if(AS[A]){return 
}var E=Az;
if(!C){E=Ao
}AS[A]=E;
var F=A2[A]||[];
for(var D=0;
D<F.length;
++D){var B=F[D];
B.t=A1(A);
E.call(A,B.f,B)
}A2[A]=[]
}var Ay=false,Al=false;
function As(){if(Al){return 
}function A(){Ay=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",A,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",A)
}}Al=true
}function AW(E,A,D,B,C){if(!A5[A]||A5[A]!==D){gadgets.error("Invalid auth token. "+A5[A]+" vs "+D);
Ax(A,Af)
}C.onunload=function(){if(AT[A]&&!Ay){Ax(A,Ah);
gadgets.rpc.removeReceiver(A)
}};
As();
B=gadgets.json.parse(decodeURIComponent(B))
}function Ag(A,D){if(A&&typeof A.s==="string"&&typeof A.f==="string"&&A.a instanceof Array){if(A5[A.f]){if(A5[A.f]!==A.t){gadgets.error("Invalid auth token. "+A5[A.f]+" vs "+A.t);
Ax(A.f,Af)
}}if(A.s===Am){window.setTimeout(function(){AV(A.f,true)
},0);
return 
}if(A.c){A[AM]=function(F){gadgets.rpc.call(A.f,Au,null,A.c,F)
}
}if(D){var C=AN(D);
A[AZ]=D;
var B=A.r;
if(!B||AN(B)!=C){B=D
}A[AO]=B
}var E=(AP[A.s]||AP[An]).apply(A,A.a);
if(A.c&&typeof E!=="undefined"){gadgets.rpc.call(A.f,Au,null,A.c,E)
}}}function AN(E){if(!E){return""
}E=E.toLowerCase();
if(E.indexOf("//")==0){E=window.location.protocol+E
}if(E.indexOf("://")==-1){E=window.location.protocol+"//"+E
}var D=E.substring(E.indexOf("://")+3);
var G=D.indexOf("/");
if(G!=-1){D=D.substring(0,G)
}var B=E.substring(0,E.indexOf("://"));
var C="";
var A=D.indexOf(":");
if(A!=-1){var F=D.substring(A+1);
D=D.substring(0,A);
if((B==="http"&&F!=="80")||(B==="https"&&F!=="443")){C=":"+F
}}return B+"://"+D+C
}function A4(A,B){return"/"+A+(B?Ae+B:"")
}function AF(A){if(A.charAt(0)=="/"){var C=A.indexOf(Ae);
var B=C>0?A.substring(1,C):A.substring(1);
var D=C>0?A.substring(C+1):null;
return{id:B,origin:D}
}else{return null
}}function AG(A){if(typeof A==="undefined"||A===".."){return window.parent
}var B=AF(A);
if(B){return window.top.frames[B.id]
}A=String(A);
var C=window.frames[A];
if(C){return C
}C=document.getElementById(A);
if(C&&C.contentWindow){return C.contentWindow
}return null
}function Av(A){var B=null;
var D=Ar(A);
if(D){B=D
}else{var C=AF(A);
if(C){B=C.origin
}else{if(A==".."){B=Ac.parent
}else{B=document.getElementById(A).src
}}}return AN(B)
}var Az=Aw();
AP[An]=function(){Ak("Unknown RPC service: "+this.s)
};
AP[Au]=function(B,C){var A=AU[B];
if(A){delete AU[B];
A.call(this,C)
}};
function Ai(A,C){if(AT[A]===true){return 
}if(typeof AT[A]==="undefined"){AT[A]=0
}var B=AG(A);
if(A===".."||B!=null){if(Az.setup(A,C)===true){AT[A]=true;
return 
}}if(AT[A]!==true&&AT[A]++<A0){window.setTimeout(function(){Ai(A,C)
},Aa)
}else{AS[A]=Ao;
AT[A]=true
}}function At(E,B){if(typeof Ap[E]==="undefined"){Ap[E]=false;
var C=Ar(E);
if(AN(C)!==AN(window.location.href)){return false
}var D=AG(E);
try{var A=D.gadgets;
Ap[E]=A.rpc.receiveSameDomain
}catch(F){}}if(typeof Ap[E]==="function"){Ap[E](B);
return true
}return false
}function Ar(A){var B=Aj[A];
if(B&&B.substring(0,1)==="/"){if(B.substring(1,2)==="/"){B=document.location.protocol+B
}else{B=document.location.protocol+"//"+document.location.host+B
}}return B
}function AJ(B,C,A){if(!/http(s)?:\/\/.+/.test(C)){if(C.indexOf("//")==0){C=window.location.protocol+C
}else{if(C.charAt(0)=="/"){C=window.location.protocol+"//"+window.location.host+C
}else{if(C.indexOf("://")==-1){C=window.location.protocol+"//"+C
}}}}Aj[B]=C;
A3[B]=!!A
}function A1(A){return A5[A]
}function Ad(B,A){A=A||"";
A5[B]=String(A);
Ai(B,A)
}function AK(B){var C=B.passReferrer||"";
var A=C.split(":",2);
Ab=A[0]||"none";
AQ=A[1]||"origin"
}function AY(B,C){function A(E){var F=E?E.rpc:{};
var D=String(F.useLegacyProtocol)==="true";
AK(F);
var G=F.parentRelayUrl||"";
G=AN(Ac.parent||C)+G;
AJ("..",G,D);
if(D){Az=gadgets.rpctx.ifpc;
Az.init(Ag,AV)
}Ad("..",B)
}if(!Ac.parent&&C){A({});
return 
}gadgets.config.register("rpc",null,A)
}function AR(F,B,H){if(F.charAt(0)!="/"){if(!gadgets.util){return 
}var C=document.getElementById(F);
if(!C){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+F+", element not found.")
}}var G=C&&C.src;
var E=B||gadgets.rpc.getOrigin(G);
AJ(F,E);
var A=gadgets.util.getUrlParameters(G);
var D=H||A.rpctoken;
Ad(F,D)
}function AX(D,B,A){if(D===".."){var C=A||Ac.rpctoken||Ac.ifpctok||"";
AY(C,B)
}else{AR(D,B,A)
}}function AI(B){if(Ab==="bidir"||(Ab==="c2p"&&B==="..")||(Ab==="p2c"&&B!=="..")){var C=window.location.href;
var A="?";
if(AQ==="query"){A="#"
}else{if(AQ==="hash"){return C
}}var D=C.lastIndexOf(A);
D=D===-1?C.length:D;
return C.substring(0,D)
}return null
}return{config:function(A){if(typeof A.securityCallback==="function"){Ax=A.securityCallback
}},register:function(A,B){if(A===Au||A===Am){throw new Error("Cannot overwrite callback/ack service")
}if(A===An){throw new Error("Cannot overwrite default service: use registerDefault")
}AP[A]=B
},unregister:function(A){if(A===Au||A===Am){throw new Error("Cannot delete callback/ack service")
}if(A===An){throw new Error("Cannot delete default service: use unregisterDefault")
}delete AP[A]
},registerDefault:function(A){AP[An]=A
},unregisterDefault:function(){delete AP[An]
},forceParentVerifiable:function(){if(!Az.isParentVerifiable()){Az=gadgets.rpctx.ifpc
}},call:function(G,E,H,B){G=G||"..";
var A="..";
if(G===".."){A=AL
}else{if(G.charAt(0)=="/"){A=A4(AL,gadgets.rpc.getOrigin(window.location.href))
}}++AE;
if(H){AU[AE]=H
}var C={s:E,f:A,c:H?AE:0,a:Array.prototype.slice.call(arguments,3),t:A5[G],l:A3[G]};
var F=AI(G);
if(F){C.r=F
}if(G!==".."&&AF(G)==null&&!document.getElementById(G)){return 
}if(At(G,C)){return 
}var D=AS[G];
if(!D&&AF(G)!==null){D=Az
}if(!D){if(!A2[G]){A2[G]=[C]
}else{A2[G].push(C)
}return 
}if(A3[G]){D=gadgets.rpctx.ifpc
}if(D.call(G,A,C)===false){AS[G]=Ao;
Az.call(G,A,C)
}},getRelayUrl:Ar,setRelayUrl:AJ,setAuthToken:Ad,setupReceiver:AX,getAuthToken:A1,removeReceiver:function(A){delete Aj[A];
delete A3[A];
delete A5[A];
delete AT[A];
delete Ap[A];
delete AS[A]
},getRelayChannel:function(){return Az.getCode()
},receive:function(A,B){if(A.length>4){Az._receiveMessage(A,Ag)
}else{AW.apply(null,A.concat(B))
}},receiveSameDomain:function(A){A.a=Array.prototype.slice.call(A.a);
window.setTimeout(function(){Ag(A)
},0)
},getOrigin:AN,getTargetOrigin:Av,init:function(){if(Az.init(Ag,AV)===false){Az=Ao
}if(AD){AX("..")
}else{gadgets.config.register("rpc",null,function(A){AK(A.rpc||{})
})
}},_getTargetWin:AG,_parseSiblingId:AF,ACK:Am,RPC_ID:AL||"..",SEC_ERROR_LOAD_TIMEOUT:Aq,SEC_ERROR_FRAME_PHISH:Ah,SEC_ERROR_FORGED_MSG:Af}
}();
gadgets.rpc.init()
}gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return 
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){return url
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});
gadgets.log=(function(){var M=1;
var I=2;
var L=3;
var O=4;
var N=function(A){P(M,A)
};
gadgets.warn=function(A){P(I,A)
};
gadgets.error=function(A){P(L,A)
};
gadgets.setLogLevel=function(A){J=A
};
function P(A,B){if(A<J||!K){return 
}if(A===I&&K.warn){K.warn(B)
}else{if(A===L&&K.error){K.error(B)
}else{if(K.log){K.log(B)
}}}}N.INFO=M;
N.WARNING=I;
N.NONE=O;
var J=M;
var K=window.console?window.console:window.opera?window.opera.postError:undefined;
return N
})();
var tamings___=tamings___||[];
tamings___.push(function(B){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});
shindig.uri=(function(){var B=new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");
return function(a){var h="";
var l="";
var w="";
var r="";
var v=null;
var q="";
var p=null;
var n=window.decodeURIComponent?decodeURIComponent:unescape;
var b=window.encodeURIComponent?encodeURIComponent:escape;
var o=null;
function e(C){if(C.match(B)===null){throw"Malformed URL: "+C
}h=RegExp.$1;
l=RegExp.$2;
w=RegExp.$3;
r=RegExp.$4;
q=RegExp.$5
}function f(E){var F=[];
for(var H=0,D=E.length;
H<D;
++H){var C=E[H][0];
var G=E[H][1];
if(G===undefined){continue
}F.push(b(C)+(G!==null?"="+b(G):""))
}return F.join("&")
}function i(){if(v){r=f(v);
v=null
}return r
}function A(){if(p){q=f(p);
p=null
}return q
}function k(C){v=v||t(r);
return g(v,C)
}function c(C){p=p||t(q);
return g(p,C)
}function x(C,D){v=m(v||t(r),C,D);
return o
}function s(C,D){p=m(p||t(q),C,D);
return o
}function d(){return[h,h!==""?":":"",l!==""?"//":"",l].join("")
}function j(){var C=i();
var D=A();
return[d(),w,C!==""?"?":"",C,D!==""?"#":"",D].join("")
}function t(E){var F=[];
var G=E.split("&");
for(var J=0,D=G.length;
J<D;
++J){var H=G[J].split("=");
var C=H.shift();
var I=null;
if(H.length>0){I=H.join("").replace(/\+/g," ")
}F.push([C,I!=null?n(I):null])
}return F
}function g(D,E){for(var F=0,C=D.length;
F<C;
++F){if(D[F][0]==E){return D[F][1]
}}return undefined
}function m(H,G,I){var E=G;
if(typeof G==="string"){E={};
E[G]=I
}for(var J in E){var F=false;
for(var C=0,D=H.length;
!F&&C<D;
++C){if(H[C][0]==J){H[C][1]=E[J];
F=true
}}if(!F){H.push([J,E[J]])
}}return H
}function u(C,D){C=C||"";
if(C[0]===D){C=C.substr(D.length)
}return C
}if(typeof a==="object"&&typeof a.toString==="function"){e(a.toString())
}else{if(a){e(a)
}}o={getSchema:function(){return h
},getAuthority:function(){return l
},getOrigin:d,getPath:function(){return w
},getQuery:i,getFragment:A,getQP:k,getFP:c,setSchema:function(C){h=C;
return o
},setAuthority:function(C){l=C;
return o
},setPath:function(C){w=(C[0]==="/"?"":"/")+C;
return o
},setQuery:function(C){v=null;
r=u(C,"?");
return o
},setFragment:function(C){p=null;
q=u(C,"#");
return o
},setQP:x,setFP:s,setExistingP:function(D,C){if(k(D,C)!==undefined){x(D,C)
}if(c(D,C)!==undefined){s(D,C)
}return o
},toString:j};
return o
}
})();
(function(){osapi._registerMethod=function(I,J){var H=typeof ___!=="undefined";
if(I=="newBatch"){return 
}var L=I.split(".");
var M=osapi;
for(var N=0;
N<L.length-1;
N++){M[L[N]]=M[L[N]]||{};
M=M[L[N]]
}var K=function(A){var B=osapi.newBatch();
var C={};
C.execute=function(F){var E=H?___.untame(F):F;
var D=H?___.USELESS:this;
B.add(I,this);
B.execute(function(G){if(G.error){E.call(D,G.error)
}else{E.call(D,G[I])
}})
};
if(H){___.markInnocent(C.execute,"execute")
}A=A||{};
A.userId=A.userId||"@viewer";
A.groupId=A.groupId||"@self";
C.method=I;
C.transport=J;
C.rpc=A;
return C
};
if(H&&typeof ___.markInnocent!=="undefined"){___.markInnocent(K,I)
}if(M[L[L.length-1]]){}else{M[L[L.length-1]]=K
}}
})();
(function(){var B=function(){var I={};
var J=[];
var A=function(D,C){if(C&&D){J.push({key:D,request:C})
}return I
};
var G=function(C){var D={method:C.request.method,id:C.key};
if(C.request.rpc){D.params=C.request.rpc
}return D
};
var H=function(T){var S={};
var C={};
var Q=0;
var P=[];
for(var E=0;
E<J.length;
E++){var R=J[E].request.transport;
if(!C[R.name]){P.push(R);
Q++
}C[R.name]=C[R.name]||[];
C[R.name].push(G(J[E]))
}var D=function(K){if(K.error){S.error=K.error
}for(var L=0;
L<J.length;
L++){var M=J[L].key;
var N=K[M];
if(N){if(N.error){S[M]=N
}else{S[M]=N.data||N.result
}}}Q--;
if(Q===0){T(S)
}};
for(var F=0;
F<P.length;
F++){P[F].execute(C[P[F].name],D)
}if(Q==0){window.setTimeout(function(){T(S)
},0)
}};
I.execute=H;
I.add=A;
return I
};
osapi.newBatch=B
})();
(function(){function C(A,B){function I(G){if(G.errors[0]){B({error:{code:G.rc,message:G.text}})
}else{var F=G.result||G.data;
if(F.error){B(F)
}else{var H={};
for(var E=0;
E<F.length;
E++){H[F[E].id]=F[E]
}B(H)
}}}var J={POST_DATA:gadgets.json.stringify(A),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var L=this.name;
var K=shindig.auth.getSecurityToken();
if(K){L+="?st=";
L+=encodeURIComponent(K)
}gadgets.io.makeNonProxiedRequest(L,I,J,"application/json")
}function D(K){var B=K["osapi.services"];
if(B){for(var L in B){if(B.hasOwnProperty(L)){if(L.indexOf("http")==0||L.indexOf("//")==0){var N=L.replace("%host%",document.location.host);
var A={name:N,execute:C};
var M=B[L];
for(var J=0;
J<M.length;
J++){osapi._registerMethod(M[J],A)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,D)
}})();
if(gadgets&&gadgets.rpc){(function(){function C(A,B){var F=function(I){if(!I){B({code:500,message:"Container refused the request"})
}else{if(I.error){B(I)
}else{var J={};
for(var E=0;
E<I.length;
E++){J[I[E].id]=I[E]
}B(J)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",F,A)
}function D(B){var Q={name:"gadgets.rpc",execute:C};
var L=B["osapi.services"];
if(L){for(var A in L){if(L.hasOwnProperty(A)){if(A==="gadgets.rpc"){var R=L[A];
for(var O=0;
O<R.length;
O++){osapi._registerMethod(R[O],Q)
}}}}}if(osapi.container&&osapi.container.listMethods){var P=gadgets.util.runOnLoadHandlers;
var N=2;
var M=function(){N--;
if(N==0){P()
}};
gadgets.util.runOnLoadHandlers=M;
osapi.container.listMethods({}).execute(function(E){if(!E.error){for(var F=0;
F<E.length;
F++){if(E[F]!="container.listMethods"){osapi._registerMethod(E[F],Q)
}}}M()
});
window.setTimeout(M,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,D)
}})()
}gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getViewerFriends=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@friends";
return osapi.people.get(B)
};
osapi.people.getOwner=function(B){B=B||{};
B.userId="@owner";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getOwnerFriends=function(B){B=B||{};
B.userId="@owner";
B.groupId="@friends";
return osapi.people.get(B)
}
}});
var tamings___=tamings___||[];
tamings___.push(function(C){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var A=osapi.newBatch();
___.markInnocent(A.add,"add");
___.markInnocent(A.execute,"execute");
return ___.tame(A)
}));
C.outers.osapi=___.tame(osapi);
___.grantRead(C.outers,"osapi");
var D=C;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
D.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
D.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
D.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
D.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});
shindig._uri=shindig.uri;
shindig.uri=(function(){var E=shindig._uri;
shindig._uri=null;
function D(A,B){return A.getOrigin()==B.getOrigin()
}function F(I,B){if(I.getSchema()==""){I.setSchema(B.getSchema())
}if(I.getAuthority()==""){I.setAuthority(B.getAuthority())
}var C=I.getPath();
if(C==""||C.charAt(0)!="/"){var A=B.getPath();
var J=A.lastIndexOf("/");
if(J!=-1){A=A.substring(0,J+1)
}I.setPath(B.getPath()+C)
}}return function(B){var A=E(B);
A.hasSameOrigin=function(C){return D(A,C)
};
A.resolve=function(C){return F(A,C)
};
return A
}
})();
Function.prototype.inherits=function(C){function D(){}D.prototype=C.prototype;
this.superClass_=C.prototype;
this.prototype=new D();
this.prototype.constructor=this
};
shindig.cookies={};
shindig.cookies.JsType_={UNDEFINED:"undefined"};
shindig.cookies.isDef=function(B){return typeof B!=shindig.cookies.JsType_.UNDEFINED
};
shindig.cookies.set=function(L,P,Q,M,K){if(/;=/g.test(L)){throw new Error('Invalid cookie name "'+L+'"')
}if(/;/g.test(P)){throw new Error('Invalid cookie value "'+P+'"')
}if(!shindig.cookies.isDef(Q)){Q=-1
}var S=K?";domain="+K:"";
var O=M?";path="+M:"";
var T;
if(Q<0){T=""
}else{if(Q===0){var R=new Date(1970,1,1);
T=";expires="+R.toUTCString()
}else{var N=new Date((new Date).getTime()+Q*1000);
T=";expires="+N.toUTCString()
}}document.cookie=L+"="+P+S+O+T
};
shindig.cookies.get=function(P,K){var L=P+"=";
var N=String(document.cookie);
for(var J=-1;
(J=N.indexOf(L,J+1))>=0;
){var O=J;
while(--O>=0){var M=N.charAt(O);
if(M==";"){O=-1;
break
}}if(O==-1){var I=N.indexOf(";",J);
if(I<0){I=N.length
}return N.substring(J+L.length,I)
}}return K
};
shindig.cookies.remove=function(H,E,G){var F=shindig.cookies.containsKey(H);
shindig.cookies.set(H,"",0,E,G);
return F
};
shindig.cookies.getKeyValues_=function(){var K=String(document.cookie);
var I=K.split(/\s*;\s*/);
var J=[],H=[],M,N;
for(var L=0;
N=I[L];
L++){M=N.indexOf("=");
if(M==-1){J.push("");
H.push(N)
}else{J.push(N.substring(0,M));
H.push(N.substring(M+1))
}}return{keys:J,values:H}
};
shindig.cookies.getKeys=function(){return shindig.cookies.getKeyValues_().keys
};
shindig.cookies.getValues=function(){return shindig.cookies.getKeyValues_().values
};
shindig.cookies.isEmpty=function(){return document.cookie===""
};
shindig.cookies.getCount=function(){var C=String(document.cookie);
if(C===""){return 0
}var D=C.split(/\s*;\s*/);
return D.length
};
shindig.cookies.containsKey=function(D){var C={};
return shindig.cookies.get(D,C)!==C
};
shindig.cookies.containsValue=function(E){var D=shindig.cookies.getKeyValues_().values;
for(var F=0;
F<D.length;
F++){if(D[F]==E){return true
}}return false
};
shindig.cookies.clear=function(){var D=shindig.cookies.getKeyValues_().keys;
for(var C=D.length-1;
C>=0;
C--){shindig.cookies.remove(D[C])
}};
shindig.cookies.MAX_COOKIE_LENGTH=3950;
shindig.errors={};
shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";
shindig.errors.TO_BE_DONE="to be done";
shindig.callAsyncAndJoin=function(K,H,L){var J=K.length;
var M=[];
for(var N=0;
N<K.length;
N++){var I=function(B){var A=K[B];
if(typeof A==="string"){A=L[A]
}A.call(L,function(C){M[B]=C;
if(--J===0){H(M)
}})
};
I(N)
}};
shindig.Extensible=function(){};
shindig.Extensible.prototype.setDependencies=function(C){for(var D in C){this[D]=C[D]
}};
shindig.Extensible.prototype.getDependencies=function(B){return this[B]
};
shindig.UserPrefStore=function(){};
shindig.UserPrefStore.prototype.getPrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.UserPrefStore.prototype.savePrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.DefaultUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);
shindig.DefaultUserPrefStore.prototype.getPrefs=function(B){};
shindig.DefaultUserPrefStore.prototype.savePrefs=function(B){};
shindig.GadgetService=function(){};
shindig.GadgetService.prototype.setHeight=function(D,C){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setTitle=function(C,D){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setUserPref=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.IfrGadgetService=function(){shindig.GadgetService.call(this);
gadgets.rpc.register("resize_iframe",this.setHeight);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestSendMessage",this.requestSendMessage)
};
shindig.IfrGadgetService.inherits(shindig.GadgetService);
shindig.IfrGadgetService.prototype.setHeight=function(C){if(C>shindig.container.maxheight_){C=shindig.container.maxheight_
}var D=document.getElementById(this.f);
if(D){D.style.height=C+"px"
}};
shindig.IfrGadgetService.prototype.setTitle=function(D){var C=document.getElementById(this.f+"_title");
if(C){C.innerHTML=D.replace(/&/g,"&amp;").replace(/</g,"&lt;")
}};
shindig.IfrGadgetService.prototype.setUserPref=function(I,N,L){var J=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var K=shindig.container.getGadget(J);
for(var M=1,H=arguments.length;
M<H;
M+=2){this.userPrefs[arguments[M]].value=arguments[M+1]
}K.saveUserPrefs()
};
shindig.IfrGadgetService.prototype.requestSendMessage=function(E,F,H,G){if(H){window.setTimeout(function(){H(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(F,H){var G=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var J=shindig.container.gadgetService.getUrlForView(F);
if(H){var I=gadgets.json.stringify(H);
if(I.length>0){J+="&appParams="+encodeURIComponent(I)
}}if(J&&document.location.href.indexOf(J)==-1){document.location.href=J
}};
shindig.IfrGadgetService.prototype.getUrlForView=function(B){if(B==="canvas"){return"/canvas"
}else{if(B==="profile"){return"/profile"
}else{return null
}}};
shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId=function(B){return parseInt(B.match(/_([0-9]+)$/)[1],10)
};
shindig.LayoutManager=function(){};
shindig.LayoutManager.prototype.getGadgetChrome=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.StaticLayoutManager=function(){shindig.LayoutManager.call(this)
};
shindig.StaticLayoutManager.inherits(shindig.LayoutManager);
shindig.StaticLayoutManager.prototype.setGadgetChromeIds=function(B){this.gadgetChromeIds_=B
};
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(D){var C=this.gadgetChromeIds_[D.id];
return C?document.getElementById(C):null
};
shindig.FloatLeftLayoutManager=function(B){shindig.LayoutManager.call(this);
this.layoutRootId_=B
};
shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(E){var F=document.getElementById(this.layoutRootId_);
if(F){var D=document.createElement("div");
D.className="gadgets-gadget-chrome";
D.style.cssFloat="left";
F.appendChild(D);
return D
}else{return null
}};
shindig.Gadget=function(D){this.userPrefs={};
if(D){for(var C in D){if(D.hasOwnProperty(C)){this[C]=D[C]
}}}if(!this.secureToken){this.secureToken="john.doe:john.doe:appid:cont:url:0:default"
}};
shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs
};
shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)
};
shindig.Gadget.prototype.getUserPrefValue=function(D){var C=this.userPrefs[D];
return typeof (C.value)!="undefined"&&C.value!=null?C.value:C["default"]
};
shindig.Gadget.prototype.render=function(C){if(C){var D=this;
this.getContent(function(A){C.innerHTML=A;
D.finishRender(C)
})
}};
shindig.Gadget.prototype.getContent=function(B){shindig.callAsyncAndJoin(["getTitleBarContent","getUserPrefsDialogContent","getMainContent"],function(A){B(A.join(""))
},this)
};
shindig.Gadget.prototype.getTitleBarContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getUserPrefsDialogContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getMainContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.finishRender=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getAdditionalParams=function(){return""
};
shindig.BaseIfrGadget=function(B){shindig.Gadget.call(this,B);
this.serverBase_="/gadgets/";
this.queryIfrGadgetType_()
};
shindig.BaseIfrGadget.inherits(shindig.Gadget);
shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_="remote_iframe_";
shindig.BaseIfrGadget.prototype.CONTAINER="default";
shindig.BaseIfrGadget.prototype.cssClassGadget="gadgets-gadget";
shindig.BaseIfrGadget.prototype.cssClassTitleBar="gadgets-gadget-title-bar";
shindig.BaseIfrGadget.prototype.cssClassTitle="gadgets-gadget-title";
shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar="gadgets-gadget-title-button-bar";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog="gadgets-gadget-user-prefs-dialog";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar="gadgets-gadget-user-prefs-dialog-action-bar";
shindig.BaseIfrGadget.prototype.cssClassTitleButton="gadgets-gadget-title-button";
shindig.BaseIfrGadget.prototype.cssClassGadgetContent="gadgets-gadget-content";
shindig.BaseIfrGadget.prototype.rpcToken=(2147483647*Math.random())|0;
shindig.BaseIfrGadget.prototype.rpcRelay="../container/rpc_relay.html";
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(C){var D=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";
C('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+D+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(B){B('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')
};
shindig.BaseIfrGadget.prototype.setServerBase=function(B){this.serverBase_=B
};
shindig.BaseIfrGadget.prototype.getServerBase=function(){return this.serverBase_
};
shindig.BaseIfrGadget.prototype.getMainContent=function(C){var D=this;
window.setTimeout(function(){D.getMainContent(C)
},0)
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"
};
shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var D="";
for(var C in this.getUserPrefs()){D+="&up_"+encodeURIComponent(C)+"="+encodeURIComponent(this.getUserPrefValue(C))
}return D
};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var F=document.getElementById(this.getIframeId());
if(F){var D=F.parentNode;
var E=D.style.display;
D.style.display=E?"":"none"
}};
shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var D in this.getUserPrefs()){var C=this.userPrefs[D];
if(C.type!="hidden"){return true
}}return false
};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded){this.showUserPrefsDialog()
}else{var E=this;
var F="ig_callback_"+this.id;
window[F]=function(A){E.userPrefsDialogContentLoaded=true;
E.buildUserPrefsDialog(A);
E.showUserPrefsDialog()
};
var D=document.createElement("script");
D.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;
document.body.appendChild(D)
}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.innerHTML=C+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';
D.childNodes[0].style.display=""
};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.style.display=(C||C===undefined)?"":"none"
};
shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)
};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();
var G=document.getElementById("m_"+this.id+"_numfields").value;
for(var J=0;
J<G;
J++){var L=document.getElementById("m_"+this.id+"_"+J);
var H="m_"+this.id+"_up_";
var K=L.name.substring(H.length);
var I=L.value;
this.userPrefs[K].value=I
}this.saveUserPrefs();
this.refresh()
};
shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()
};
shindig.BaseIfrGadget.prototype.refresh=function(){var B=this.getIframeId();
document.getElementById(B).src=this.getIframeUrl()
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var I={context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]};
var J={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(I)};
var F=this.serverBase_+"metadata?st="+this.secureToken;
gadgets.io.makeNonProxiedRequest(F,H,J,"application/javascript");
var G=this;
function H(B){var A=false;
var L=B.data.gadgets[0].features;
for(var D=0;
D<L.length;
D++){if(L[D]==="pubsub-2"){A=true;
break
}}var C=A?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var E in C){if(C.hasOwnProperty(E)){G[E]=C[E]
}}}};
shindig.IfrGadget={getMainContent:function(C){var D=this.getIframeId();
gadgets.rpc.setRelayUrl(D,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(D,this.rpcToken);
C('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+D+'" name="'+D+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(B){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
shindig.OAAIfrGadget={getMainContent:function(B){B('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')
},finishRender:function(C){var D={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};
if(this.height){D.height=this.height
}if(this.width){D.width=this.width
}new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(A,B){gadgets.error("Security error for container "+A.getClientID()+" : "+B);
A.getIframe().src="about:blank"
}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:D}})
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"#"+this.hashData:"")
}};
shindig.Container=function(){this.gadgets_={};
this.parentUrl_=document.location.href+"://"+document.location.host;
this.country_="ALL";
this.language_="ALL";
this.view_="default";
this.nocache_=1;
this.maxheight_=2147483647
};
shindig.Container.inherits(shindig.Extensible);
shindig.Container.prototype.gadgetClass=shindig.Gadget;
shindig.Container.prototype.userPrefStore=new shindig.DefaultUserPrefStore();
shindig.Container.prototype.gadgetService=new shindig.GadgetService();
shindig.Container.prototype.layoutManager=new shindig.StaticLayoutManager();
shindig.Container.prototype.setParentUrl=function(B){this.parentUrl_=B
};
shindig.Container.prototype.setCountry=function(B){this.country_=B
};
shindig.Container.prototype.setNoCache=function(B){this.nocache_=B
};
shindig.Container.prototype.setLanguage=function(B){this.language_=B
};
shindig.Container.prototype.setView=function(B){this.view_=B
};
shindig.Container.prototype.setMaxHeight=function(B){this.maxheight_=B
};
shindig.Container.prototype.getGadgetKey_=function(B){return"gadget_"+B
};
shindig.Container.prototype.getGadget=function(B){return this.gadgets_[this.getGadgetKey_(B)]
};
shindig.Container.prototype.createGadget=function(B){return new this.gadgetClass(B)
};
shindig.Container.prototype.addGadget=function(B){B.id=this.getNextGadgetInstanceId();
this.gadgets_[this.getGadgetKey_(B.id)]=B
};
shindig.Container.prototype.addGadgets=function(C){for(var D=0;
D<C.length;
D++){this.addGadget(C[D])
}};
shindig.Container.prototype.renderGadgets=function(){for(var B in this.gadgets_){this.renderGadget(this.gadgets_[B])
}};
shindig.Container.prototype.renderGadget=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Container.prototype.nextGadgetInstanceId_=0;
shindig.Container.prototype.getNextGadgetInstanceId=function(){return this.nextGadgetInstanceId_++
};
shindig.Container.prototype.refreshGadgets=function(){for(var B in this.gadgets_){this.gadgets_[B].refresh()
}};
shindig.IfrContainer=function(){shindig.Container.call(this)
};
shindig.IfrContainer.inherits(shindig.Container);
shindig.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
shindig.IfrContainer.prototype.gadgetService=new shindig.IfrGadgetService();
shindig.IfrContainer.prototype.setParentUrl=function(B){if(!B.match(/^http[s]?:\/\//)){B=document.location.href.match(/^[^?#]+\//)[0]+B
}this.parentUrl_=B
};
shindig.IfrContainer.prototype.renderGadget=function(D){var C=this.layoutManager.getGadgetChrome(D);
D.render(C)
};
shindig.container=new shindig.IfrContainer();
if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(M){var Q=new Array(M.length);
var R=0;
var O=this.callback;
var L=function(A,B){B({})
};
for(var J=0;
J<M.length;
J++){var P=osapi;
if(M[J].method.indexOf("_")==-1){var N=M[J].method.split(".");
for(var K=0;
K<N.length;
K++){if(P.hasOwnProperty(N[K])){P=P[N[K]]
}else{P=L;
break
}}}else{P=L
}P(M[J].params,function(A){return function(B){Q[A]={id:M[A].id,data:B};
R++;
if(R==M.length){O(Q)
}}
}(J))
}};
osapi.container={};
osapi.container.listMethods=function(D,E){var F=[];
recurseNames(osapi,"",5,F);
E(F)
};
function recurseNames(K,J,I,L){if(I==0){return 
}for(var H in K){if(K.hasOwnProperty(H)){if(H.indexOf("_")==-1){var G=typeof (K[H]);
if(G=="function"){L.push(J+H)
}else{if(G=="object"){recurseNames(K[H],J+H+".",I-1,L)
}}}}}}gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)
}gadgets.config.init({"shindig.auth":{},osapi:{endPoints:["https://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"https://%host%/rpc":["activities.supportedFields","activities.update","gadgets.metadata","activities.delete","activities.get","appdata.update","http.put","http.post","gadgets.tokenSupportedFields","appdata.get","activities.create","system.listMethods","cache.invalidate","groups.get","people.supportedFields","http.get","http.head","appdata.delete","http.delete","aipo.version","gadgets.token","appdata.create","people.get","gadgets.supportedFields"]},rpc:{parentRelayUrl:"/gadgets/files/container/rpc_relay.html",useLegacyProtocol:false},"core.io":{proxyUrl:"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",jsonProxyUrl:"//%host%/gadgets/makeRequest"}});
aipo.PortletLayoutManager=function(){shindig.LayoutManager.call(this)
};
aipo.PortletLayoutManager.inherits(shindig.LayoutManager);
aipo.PortletLayoutManager.prototype.getGadgetChrome=function(B){var A="gadget-chrome-"+B.portletId;
return A?document.getElementById(A):null
};
aipo.PsmlUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
aipo.PsmlUserPrefStore.inherits(shindig.UserPrefStore);
aipo.PsmlUserPrefStore.prototype.getPrefs=function(A){};
aipo.PsmlUserPrefStore.prototype.savePrefs=function(A){};
aipo.IfrGadget={getMainContent:function(A){var B=this.getIframeId();
gadgets.rpc.setRelayUrl(B,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(B,this.rpcToken);
A('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+B+'" name="'+B+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no"'+(this.scrolling?' scrolling="'+this.scrolling+'"':"no")+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(A){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+aipo.container.nocache_+"&country="+aipo.container.country_+"&lang="+aipo.container.language_+"&view="+aipo.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
aipo.IfrGadgetService=function(){shindig.IfrGadgetService.call(this);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestCheckActivity",this.requestCheckActivity);
gadgets.rpc.register("requestCheckTimeline",this.requestCheckTimeline)
};
aipo.IfrGadgetService.inherits(shindig.IfrGadgetService);
aipo.IfrGadgetService.prototype.setUserPref=function(H,B,L){var J=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var K=null;
for(key in aipo.container.gadgets_){var C=aipo.container.gadgets_[key];
if(J==C.portletId){K=key;
break
}}var E={};
for(var G=1,D=arguments.length;
G<D;
G+=2){E[arguments[G]]=arguments[G+1];
if(K){aipo.container.gadgets_[K].userPrefs[arguments[G]]={};
aipo.container.gadgets_[K].userPrefs[arguments[G]]["value"]=arguments[G+1]
}}var F={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(E)};
var A="?template=UserPrefUpdateJSONScreen&js_peid="+encodeURIComponent(J);
gadgets.io.makeNonProxiedRequest(A,I,F,"application/javascript");
function I(M){if(M.rc==200){}}};
aipo.IfrGadgetService.prototype.setTitle=function(A){};
aipo.IfrGadgetService.prototype.requestNavigateTo=function(A,E){var C=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var B="?js_peid="+encodeURIComponent(C);
if(A=="canvas"){B+="&action=controls.Maximize"
}else{if(A=="home"){B+="&action=controls.Restore"
}}if(E){var D=gadgets.json.stringify(E);
if(D.length>0){B+="&appParams="+encodeURIComponent(D)
}}document.location.href=B
};
aipo.activityDesktopNotifyEnable=null;
aipo.IfrGadgetService.prototype.requestDesktopNotifyEnable=function(B){function E(G){if(G.rc==200){var F=G.data;
if(F){aipo.activityDesktopNotifyEnable=F.enable
}}}var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var A="?template=ActivityNotifyEnableJSONScreen";
if(aipo.activityDesktopNotifyEnable!=null){if(!aipo.activityDesktopNotifyEnable||window.webkitNotifications.checkPermission()!=0){window.webkitNotifications.requestPermission(function(){if(window.webkitNotifications.checkPermission()==0){A+="&enable=T";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}})
}else{A+="&enable=F";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}}else{gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}};
aipo.activityMax=null;
aipo.IfrGadgetService.prototype.requestCheckActivity=function(A){var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var B="?template=CheckActivityJSONScreen&isRead="+A;
if(aipo.activityMax){B+="&max="+aipo.activityMax
}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
function E(J){if(J.rc==200){var K=J.data;
var I=K.unreadCount;
var H={Workflow:"workflow",todo:"todo",Report:"report",Note:"note"};
aipo.activityMax=K.max;
var Q=dijit.byId("activitycheckerContainer");
var L;
if(dojo.byId("messagechecker")!=undefined){L=parseInt(I)+parseInt(dojo.byId("messagechecker").innerHTML)
}else{L=parseInt(I)
}if(!L){document.title=djConfig.siteTitle
}else{if(L>99){document.title="(99+) "+djConfig.siteTitle
}else{document.title="("+L+") "+djConfig.siteTitle
}}if(Q){Q.onCheckActivity(I);
for(key in K.activities){var N=K.activities[key];
var P=N.appId;
var M=H[P];
if(M=="workflow"||M=="todo"||M=="report"||M=="note"){aipo.portletReload(M)
}}}if(aipo.activityDesktopNotifyEnable&&window.webkitNotifications&&window.webkitNotifications.checkPermission()==0){var O=new Array();
for(key in K.activities){var G=K.activities[key];
var F=window.webkitNotifications.createNotification("images/favicon48.png",G.displayName,G.text);
F.show();
F.ondisplay=function(R){setTimeout(function(){R.currentTarget.cancel()
},7*1000)
};
O.push(F)
}}}}};
aipo.IfrGadgetService.prototype.requestCheckTimeline=function(){var A=0;
var B=dojo.byId("getTimelineOnClick").innerHTML;
if(B!="true"){dojo.query("#timelineOuter .elastic").forEach(function(C){if(C.value!=C.defaultValue){A++
}});
if(dojo.byId("modalDialog")!=undefined&&dojo.byId("modalDialog").style.display!="none"){A++
}}if(A==0){aipo.portletReload("timeline")
}else{dojo.query(".newMessage").style("display","")
}};
aipo.IfrContainer=function(){shindig.Container.call(this);
this.context=new Array()
};
aipo.IfrContainer.inherits(shindig.Container);
aipo.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
aipo.IfrContainer.prototype.gadgetService=new aipo.IfrGadgetService();
aipo.IfrContainer.prototype.setParentUrl=function(A){if(!A.match(/^http[s]?:\/\//)){A=document.location.href.match(/^[^?#]+\//)[0]+A
}this.parentUrl_=A
};
aipo.IfrContainer.prototype.assign=function(A){this.context.push(A)
};
aipo.IfrContainer.prototype.getContext=function(){return this.context
};
aipo.IfrContainer.prototype.addGadget=function(A){this.gadgets_[this.getGadgetKey_(A.id)]=A
};
aipo.IfrContainer.prototype.renderGadget=function(B){var A=this.layoutManager.getGadgetChrome(B);
if(!B.count){B.count=0
}B.count++;
B.render(A)
};
aipo.IfrContainer.prototype.renderGadgets=function(){var B=this.context;
for(var A=0;
A<B.length;
A++){var D=B[A];
var C=this.createGadget(D);
C.setServerBase(D.serverBase);
this.addGadget(C)
}aipo.cron.start()
};
var tmpGadget;
aipo.IfrContainer.prototype.renderGadgetFromContext=function(C){var D=this.createGadget(C);
D.setServerBase(C.serverBase);
D.id=this.getNextGadgetInstanceId();
D.portletId+="-popup";
var B="gadget-chrome-"+D.portletId;
var A=B?document.getElementById(B):null;
if(!D.count){D.count=0
}D.count++;
D.render(A);
tmpGadget=D
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.portletId+"_NN_"+this.count
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var C=this;
var B=aipo.IfrGadget;
for(var A in B){if(B.hasOwnProperty(A)){C[A]=B[A]
}}};
shindig.Gadget.prototype.getContent=function(A){shindig.callAsyncAndJoin(["getMainContent"],function(B){A(B.join(""))
},this)
};
aipo.container=new aipo.IfrContainer();
aipo.container.layoutManager=new aipo.PortletLayoutManager();
aipo.container.userPrefStore=new aipo.PsmlUserPrefStore();
aipo.cron=new CronTask(function(D){var A=aipo.container.context;
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(aipo.container.context)};
var B="?template=GadgetsSecurityTokenUpdateJSONScreen&view="+aipo.container.view_;
if(!aipo.cron.isFirst){B+="&update=1"
}function E(I){if(I.rc==200){var J=I.data;
for(var K=0;
K<J.length;
K++){var G=J[K];
var H=aipo.container.gadgets_["gadget_"+G.id];
if(!aipo.cron.isFirst){gadgets.rpc.call("remote_iframe_"+G.portletId+"_NN_"+H.count,"update_security_token",null,G.secureToken);
H.secureToken=G.secureToken
}var N=G.height;
var M=null;
if(G.views){M=G.views[aipo.container.view_];
var F=0;
if(M){F=M.preferredHeight
}else{var L=G.views["default"];
if(L){F=L.preferredHeight
}}}if(N>0){H.height=N
}if(F>0){H.height=F
}H.scrolling=G.scrolling?"true":"no";
if(aipo.cron.isFirst){aipo.container.renderGadget(H)
}}aipo.cron.isFirst=false
}}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
D()
},30*60*1000,true);
aipo.cron.isFirst=true;
aipo.container.onPopupGadgets=function(){var A=document.getElementById("gadgets-popup-action");
if(A){location.href=A.href
}};
