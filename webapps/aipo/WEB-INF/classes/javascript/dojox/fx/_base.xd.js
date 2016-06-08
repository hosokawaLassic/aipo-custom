dojo._xdResourceLoaded({depends:[["provide","dojox.fx._base"],["require","dojo.fx"]],defineResource:function(B){if(!B._hasResource["dojox.fx._base"]){B._hasResource["dojox.fx._base"]=true;
B.provide("dojox.fx._base");
B.require("dojo.fx");
dojox.fx.chain=B.fx.chain;
dojox.fx.combine=B.fx.combine;
dojox.fx.wipeIn=B.fx.wipeIn;
dojox.fx.wipeOut=B.fx.wipeOut;
dojox.fx.slideTo=B.fx.slideTo;
dojox.fx.sizeTo=function(X){var b=(X.node=B.byId(X.node));
var U=B.getComputedStyle;
var Q=X.method||"chain";
if(Q=="chain"){X.duration=Math.floor(X.duration/2)
}var V,W,A,T,P,S=null;
var R=(function(){var C=b;
return function(){var D=U(C).position;
V=(D=="absolute"?b.offsetTop:parseInt(U(b).top)||0);
A=(D=="absolute"?b.offsetLeft:parseInt(U(b).left)||0);
P=parseInt(B.style(b,"width"));
S=parseInt(B.style(b,"height"));
T=A-Math.floor((X.width-P)/2);
W=V-Math.floor((X.height-S)/2);
if(D!="absolute"&&D!="relative"){var E=B.coords(C,true);
V=E.y;
A=E.x;
C.style.position="absolute";
C.style.top=V+"px";
C.style.left=A+"px"
}}
})();
R();
var Y=B.animateProperty(B.mixin({properties:{height:{start:S,end:X.height||0,unit:"px"},top:{start:V,end:W}}},X));
var Z=B.animateProperty(B.mixin({properties:{width:{start:P,end:X.width||0,unit:"px"},left:{start:A,end:T}}},X));
var a=B.fx[((X.method=="combine")?"combine":"chain")]([Y,Z]);
B.connect(a,"beforeBegin",a,R);
return a
};
dojox.fx.slideBy=function(N){var L=(N.node=B.byId(N.node));
var I=B.getComputedStyle;
var J=null;
var K=null;
var A=(function(){var C=L;
return function(){var D=I(C,"position");
J=(D=="absolute"?L.offsetTop:parseInt(I(L,"top"))||0);
K=(D=="absolute"?L.offsetLeft:parseInt(I(L,"left"))||0);
if(D!="absolute"&&D!="relative"){var E=B.coords(C,true);
J=E.y;
K=E.x;
C.style.position="absolute";
C.style.top=J+"px";
C.style.left=K+"px"
}}
})();
A();
var M=B.animateProperty(B.mixin({properties:{top:{end:J+(N.top||0)},left:{end:K+(N.left||0)}}},N));
B.connect(M,"beforeBegin",M,A);
return M
};
dojox.fx.crossFade=function(J){if(B.isArray(J.nodes)){var K=J.nodes[0]=B.byId(J.nodes[0]);
var A=B.style(K,"opacity");
var L=J.nodes[1]=B.byId(J.nodes[1]);
var I=B.style(L,"opacity");
var H=B.fx.combine([B[((A==0)?"fadeIn":"fadeOut")](B.mixin({node:K},J)),B[((A==0)?"fadeOut":"fadeIn")](B.mixin({node:L},J))]);
return H
}else{return false
}};
dojox.fx.highlight=function(L){var I=(L.node=B.byId(L.node));
L.duration=L.duration||400;
var A=L.color||"#ffff99";
var J=B.style(I,"backgroundColor");
var K=(J=="transparent"||J=="rgba(0, 0, 0, 0)");
var H=B.animateProperty(B.mixin({properties:{backgroundColor:{start:A,end:J}}},L));
B.connect(H,"onEnd",H,function(){if(K){I.style.backgroundColor="transparent"
}});
return H
}
}}});