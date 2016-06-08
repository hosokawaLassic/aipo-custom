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