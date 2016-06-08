if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
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
};