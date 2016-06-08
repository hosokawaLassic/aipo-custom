if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
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
};