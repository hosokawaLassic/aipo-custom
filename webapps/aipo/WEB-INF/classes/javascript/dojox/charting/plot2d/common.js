if(!dojo._hasResource["dojox.charting.plot2d.common"]){dojo._hasResource["dojox.charting.plot2d.common"]=true;
dojo.provide("dojox.charting.plot2d.common");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,C=dojox.charting.plot2d.common;
dojo.mixin(dojox.charting.plot2d.common,{makeStroke:function(A){if(!A){return A
}if(typeof A=="string"||A instanceof dojo.Color){A={color:A}
}return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A)
},augmentColor:function(B,H){var G=new dojo.Color(B),A=new dojo.Color(H);
A.a=G.a;
return A
},augmentStroke:function(A,F){var B=C.makeStroke(A);
if(B){B.color=C.augmentColor(B.color,F)
}return B
},augmentFill:function(B,H){var G,A=new dojo.Color(H);
if(typeof B=="string"||B instanceof dojo.Color){return C.augmentColor(B,H)
}return B
},defaultStats:{hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY,vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(M){var N=dojo.clone(C.defaultStats);
for(var O=0;
O<M.length;
++O){var B=M[O];
if(!B.data.length){continue
}if(typeof B.data[0]=="number"){var P=N.vmin,K=N.vmax;
if(!("ymin" in B)||!("ymax" in B)){dojo.forEach(B.data,function(H,E){var F=E+1,G=H;
if(isNaN(G)){G=0
}N.hmin=Math.min(N.hmin,F);
N.hmax=Math.max(N.hmax,F);
N.vmin=Math.min(N.vmin,G);
N.vmax=Math.max(N.vmax,G)
})
}if("ymin" in B){N.vmin=Math.min(P,B.ymin)
}if("ymax" in B){N.vmax=Math.max(K,B.ymax)
}}else{var A=N.hmin,L=N.hmax,P=N.vmin,K=N.vmax;
if(!("xmin" in B)||!("xmax" in B)||!("ymin" in B)||!("ymax" in B)){dojo.forEach(B.data,function(H,E){var F=H.x,G=H.y;
if(isNaN(F)){F=0
}if(isNaN(G)){G=0
}N.hmin=Math.min(N.hmin,F);
N.hmax=Math.max(N.hmax,F);
N.vmin=Math.min(N.vmin,G);
N.vmax=Math.max(N.vmax,G)
})
}if("xmin" in B){N.hmin=Math.min(A,B.xmin)
}if("xmax" in B){N.hmax=Math.max(L,B.xmax)
}if("ymin" in B){N.vmin=Math.min(P,B.ymin)
}if("ymax" in B){N.vmax=Math.max(K,B.ymax)
}}}return N
},collectStackedStats:function(A){var B=dojo.clone(C.defaultStats);
if(A.length){B.hmin=Math.min(B.hmin,1);
B.hmax=D.foldl(A,"seed, run -> Math.max(seed, run.data.length)",B.hmax);
for(var I=0;
I<B.hmax;
++I){var L=A[0].data[I];
if(isNaN(L)){L=0
}B.vmin=Math.min(B.vmin,L);
for(var K=1;
K<A.length;
++K){var J=A[K].data[I];
if(isNaN(J)){J=0
}L+=J
}B.vmax=Math.max(B.vmax,L)
}}return B
}})
})()
};