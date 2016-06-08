dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.common"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.common"]){B._hasResource["dojox.charting.plot2d.common"]=true;
B.provide("dojox.charting.plot2d.common");
B.require("dojo.colors");
B.require("dojox.gfx");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,D=dojox.charting.plot2d.common;
B.mixin(dojox.charting.plot2d.common,{makeStroke:function(C){if(!C){return C
}if(typeof C=="string"||C instanceof B.Color){C={color:C}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C)
},augmentColor:function(H,J){var I=new B.Color(H),C=new B.Color(J);
C.a=I.a;
return C
},augmentStroke:function(C,H){var G=D.makeStroke(C);
if(G){G.color=D.augmentColor(G.color,H)
}return G
},augmentFill:function(H,J){var I,C=new B.Color(J);
if(typeof H=="string"||H instanceof B.Color){return D.augmentColor(H,J)
}return H
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(O){var P=B.clone(D.defaultStats);
for(var Q=0;
Q<O.length;
++Q){var L=O[Q];
if(!L.data.length){continue
}if(typeof L.data[0]=="number"){var R=P.vmin,M=P.vmax;
if(!("ymin" in L)||!("ymax" in L)){B.forEach(L.data,function(G,H){var E=H+1,F=G;
if(isNaN(F)){F=0
}P.hmin=Math.min(P.hmin,E);
P.hmax=Math.max(P.hmax,E);
P.vmin=Math.min(P.vmin,F);
P.vmax=Math.max(P.vmax,F)
})
}if("ymin" in L){P.vmin=Math.min(R,L.ymin)
}if("ymax" in L){P.vmax=Math.max(M,L.ymax)
}}else{var C=P.hmin,N=P.hmax,R=P.vmin,M=P.vmax;
if(!("xmin" in L)||!("xmax" in L)||!("ymin" in L)||!("ymax" in L)){B.forEach(L.data,function(G,H){var E=G.x,F=G.y;
if(isNaN(E)){E=0
}if(isNaN(F)){F=0
}P.hmin=Math.min(P.hmin,E);
P.hmax=Math.max(P.hmax,E);
P.vmin=Math.min(P.vmin,F);
P.vmax=Math.max(P.vmax,F)
})
}if("xmin" in L){P.hmin=Math.min(C,L.xmin)
}if("xmax" in L){P.hmax=Math.max(N,L.xmax)
}if("ymin" in L){P.vmin=Math.min(R,L.ymin)
}if("ymax" in L){P.vmax=Math.max(M,L.ymax)
}}}return P
},collectStackedStats:function(C){var J=B.clone(D.defaultStats);
if(C.length){J.hmin=Math.min(J.hmin,1);
J.hmax=A.foldl(C,"seed, run -> Math.max(seed, run.data.length)",J.hmax);
for(var K=0;
K<J.hmax;
++K){var N=C[0].data[K];
if(isNaN(N)){N=0
}J.vmin=Math.min(J.vmin,N);
for(var M=1;
M<C.length;
++M){var L=C[M].data[K];
if(isNaN(L)){L=0
}N+=L
}J.vmax=Math.max(J.vmax,N)
}}return J
}})
})()
}}});