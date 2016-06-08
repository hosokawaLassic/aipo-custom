if(!dojo._hasResource["dojox.fx._base"]){dojo._hasResource["dojox.fx._base"]=true;
dojo.provide("dojox.fx._base");
dojo.require("dojo.fx");
dojox.fx.chain=dojo.fx.chain;
dojox.fx.combine=dojo.fx.combine;
dojox.fx.wipeIn=dojo.fx.wipeIn;
dojox.fx.wipeOut=dojo.fx.wipeOut;
dojox.fx.slideTo=dojo.fx.slideTo;
dojox.fx.sizeTo=function(Y){var O=(Y.node=dojo.byId(Y.node));
var V=dojo.getComputedStyle;
var R=Y.method||"chain";
if(R=="chain"){Y.duration=Math.floor(Y.duration/2)
}var W,X,P,U,Q,T=null;
var S=(function(){var A=O;
return function(){var B=V(A).position;
W=(B=="absolute"?O.offsetTop:parseInt(V(O).top)||0);
P=(B=="absolute"?O.offsetLeft:parseInt(V(O).left)||0);
Q=parseInt(dojo.style(O,"width"));
T=parseInt(dojo.style(O,"height"));
U=P-Math.floor((Y.width-Q)/2);
X=W-Math.floor((Y.height-T)/2);
if(B!="absolute"&&B!="relative"){var C=dojo.coords(A,true);
W=C.y;
P=C.x;
A.style.position="absolute";
A.style.top=W+"px";
A.style.left=P+"px"
}}
})();
S();
var Z=dojo.animateProperty(dojo.mixin({properties:{height:{start:T,end:Y.height||0,unit:"px"},top:{start:W,end:X}}},Y));
var a=dojo.animateProperty(dojo.mixin({properties:{width:{start:Q,end:Y.width||0,unit:"px"},left:{start:P,end:U}}},Y));
var b=dojo.fx[((Y.method=="combine")?"combine":"chain")]([Z,a]);
dojo.connect(b,"beforeBegin",b,S);
return b
};
dojox.fx.slideBy=function(H){var M=(H.node=dojo.byId(H.node));
var J=dojo.getComputedStyle;
var K=null;
var L=null;
var I=(function(){var A=M;
return function(){var B=J(A,"position");
K=(B=="absolute"?M.offsetTop:parseInt(J(M,"top"))||0);
L=(B=="absolute"?M.offsetLeft:parseInt(J(M,"left"))||0);
if(B!="absolute"&&B!="relative"){var C=dojo.coords(A,true);
K=C.y;
L=C.x;
A.style.position="absolute";
A.style.top=K+"px";
A.style.left=L+"px"
}}
})();
I();
var N=dojo.animateProperty(dojo.mixin({properties:{top:{end:K+(H.top||0)},left:{end:L+(H.left||0)}}},H));
dojo.connect(N,"beforeBegin",N,I);
return N
};
dojox.fx.crossFade=function(K){if(dojo.isArray(K.nodes)){var L=K.nodes[0]=dojo.byId(K.nodes[0]);
var H=dojo.style(L,"opacity");
var G=K.nodes[1]=dojo.byId(K.nodes[1]);
var J=dojo.style(G,"opacity");
var I=dojo.fx.combine([dojo[((H==0)?"fadeIn":"fadeOut")](dojo.mixin({node:L},K)),dojo[((H==0)?"fadeOut":"fadeIn")](dojo.mixin({node:G},K))]);
return I
}else{return false
}};
dojox.fx.highlight=function(G){var J=(G.node=dojo.byId(G.node));
G.duration=G.duration||400;
var H=G.color||"#ffff99";
var K=dojo.style(J,"backgroundColor");
var L=(K=="transparent"||K=="rgba(0, 0, 0, 0)");
var I=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:H,end:K}}},G));
dojo.connect(I,"onEnd",I,function(){if(L){J.style.backgroundColor="transparent"
}});
return I
}
};