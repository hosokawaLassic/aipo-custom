dojo._xdResourceLoaded({depends:[["provide","dojo.i18n"]],defineResource:function(B){if(!B._hasResource["dojo.i18n"]){B._hasResource["dojo.i18n"]=true;
B.provide("dojo.i18n");
B.i18n.getLocalization=function(L,A,P){P=B.i18n.normalizeLocale(P);
var M=P.split("-");
var T=[L,"nls",A].join(".");
var N=B._loadedModules[T];
if(N){var O;
for(var S=M.length;
S>0;
S--){var Q=M.slice(0,S).join("_");
if(N[Q]){O=N[Q];
break
}}if(!O){O=N.ROOT
}if(O){var R=function(){};
R.prototype=O;
return new R()
}}throw new Error("Bundle not found: "+A+" in "+L+" , locale="+P)
};
B.i18n.normalizeLocale=function(A){var D=A?A.toLowerCase():B.locale;
if(D=="root"){D="ROOT"
}return D
};
B.i18n._requireLocalization=function(T,S,W,a){var d=B.i18n.normalizeLocale(W);
var g=[T,"nls",S].join(".");
var h="";
if(a){var X=a.split(",");
for(var c=0;
c<X.length;
c++){if(d.indexOf(X[c])==0){if(X[c].length>h.length){h=X[c]
}}}if(!h){h="ROOT"
}}var Z=a?h:d;
var U=B._loadedModules[g];
var A=null;
if(U){if(djConfig.localizationComplete&&U._built){return 
}var e=Z.replace(/-/g,"_");
var Y=g+"."+e;
A=B._loadedModules[Y]
}if(!A){U=B.provide(g);
var f=B._getModuleSymbols(T);
var b=f.concat("nls").join("/");
var V;
B.i18n._searchLocalePath(Z,a,function(C){var H=C.replace(/-/g,"_");
var D=g+"."+H;
var F=false;
if(!B._loadedModules[D]){B.provide(D);
var E=[b];
if(C!="ROOT"){E.push(C)
}E.push(S);
var G=E.join("/")+".js";
F=B._loadPath(G,null,function(I){var J=function(){};
J.prototype=V;
U[H]=new J();
for(var K in I){U[H][K]=I[K]
}})
}else{F=true
}if(F&&U[H]){V=U[H]
}else{U[H]=V
}if(a){return true
}})
}if(a&&d!=h){U[d.replace(/-/g,"_")]=U[h.replace(/-/g,"_")]
}};
(function(){var D=djConfig.extraLocale;
if(D){if(!D instanceof Array){D=[D]
}var A=B.i18n._requireLocalization;
B.i18n._requireLocalization=function(J,K,L,C){A(J,K,L,C);
if(L){return 
}for(var I=0;
I<D.length;
I++){A(J,K,D[I],C)
}}
}})();
B.i18n._searchLocalePath=function(N,M,A){N=B.i18n.normalizeLocale(N);
var L=N.split("-");
var K=[];
for(var Q=L.length;
Q>0;
Q--){K.push(L.slice(0,Q).join("-"))
}K.push(false);
if(M){K.reverse()
}for(var R=K.length-1;
R>=0;
R--){var P=K[R]||"ROOT";
var O=A(P);
if(O){break
}}};
B.i18n._preloadLocalizations=function(A,I){function H(C){C=B.i18n.normalizeLocale(C);
B.i18n._searchLocalePath(C,true,function(D){for(var E=0;
E<I.length;
E++){if(I[E]==D){B.require(A+"_"+D);
return true
}}return false
})
}H();
var J=djConfig.extraLocale||[];
for(var G=0;
G<J.length;
G++){H(J[G])
}}
}}});