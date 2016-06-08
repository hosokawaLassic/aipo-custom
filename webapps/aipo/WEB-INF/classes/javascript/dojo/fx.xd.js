dojo._xdResourceLoaded({depends:[["provide","dojo.fx"],["provide","dojo.fx.Toggler"]],defineResource:function(B){if(!B._hasResource["dojo.fx"]){B._hasResource["dojo.fx"]=true;
B.provide("dojo.fx");
B.provide("dojo.fx.Toggler");
B.fx.chain=function(A){var E=A.shift();
var F=E;
B.forEach(A,function(C){B.connect(F,"onEnd",C,"play");
F=C
});
return E
};
B.fx.combine=function(A){var D=new B._Animation({curve:[0,1]});
if(!A.length){return D
}D.duration=A[0].duration;
B.forEach(A,function(C){B.forEach(["play","pause","stop"],function(F){if(C[F]){B.connect(D,F,C,F)
}})
});
return D
};
B.declare("dojo.fx.Toggler",null,{constructor:function(D){var A=this;
B.mixin(A,D);
A.node=D.node;
A._showArgs=B.mixin({},D);
A._showArgs.node=A.node;
A._showArgs.duration=A.showDuration;
A.showAnim=A.showFunc(A._showArgs);
A._hideArgs=B.mixin({},D);
A._hideArgs.node=A.node;
A._hideArgs.duration=A.hideDuration;
A.hideAnim=A.hideFunc(A._hideArgs);
B.connect(A.showAnim,"beforeBegin",B.hitch(A.hideAnim,"stop",true));
B.connect(A.hideAnim,"beforeBegin",B.hitch(A.showAnim,"stop",true))
},node:null,showFunc:B.fadeIn,hideFunc:B.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
B.fx.wipeIn=function(H){H.node=B.byId(H.node);
var F=H.node,G=F.style;
var A=B.animateProperty(B.mixin({properties:{height:{start:function(){G.overflow="hidden";
if(G.visibility=="hidden"||G.display=="none"){G.height="1px";
G.display="";
G.visibility="";
return 1
}else{var C=B.style(F,"height");
return Math.max(C,1)
}},end:function(){return F.scrollHeight
}}}},H));
B.connect(A,"onEnd",function(){G.height="auto"
});
return A
};
B.fx.wipeOut=function(H){var F=H.node=B.byId(H.node);
var G=F.style;
var A=B.animateProperty(B.mixin({properties:{height:{end:1}}},H));
B.connect(A,"beforeBegin",function(){G.overflow="hidden";
G.display=""
});
B.connect(A,"onEnd",function(){G.height="auto";
G.display="none"
});
return A
};
B.fx.slideTo=function(L){var K=(L.node=B.byId(L.node));
var H=null;
var I=null;
var A=(function(C){return function(){var E=B.getComputedStyle(C);
var D=E.position;
H=(D=="absolute"?C.offsetTop:parseInt(E.top)||0);
I=(D=="absolute"?C.offsetLeft:parseInt(E.left)||0);
if(D!="absolute"&&D!="relative"){var F=B.coords(C,true);
H=F.y;
I=F.x;
C.style.position="absolute";
C.style.top=H+"px";
C.style.left=I+"px"
}}
})(K);
A();
var J=B.animateProperty(B.mixin({properties:{top:{end:L.top||0},left:{end:L.left||0}}},L));
B.connect(J,"beforeBegin",J,A);
return J
}
}}});