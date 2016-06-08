if(!dojo._hasResource["dojox.gfx.decompose"]){dojo._hasResource["dojox.gfx.decompose"]=true;
dojo.provide("dojox.gfx.decompose");
dojo.require("dojox.gfx.matrix");
(function(){var P=dojox.gfx.matrix;
var I=function(A,B){return Math.abs(A-B)<=0.000001*(Math.abs(A)+Math.abs(B))
};
var J=function(B,A,D,C){if(!isFinite(B)){return D
}else{if(!isFinite(D)){return B
}}A=Math.abs(A),C=Math.abs(C);
return(A*B+C*D)/(A+C)
};
var O=function(B){var A=new P.Matrix2D(B);
return dojo.mixin(A,{dx:0,dy:0,xy:A.yx,yx:A.xy})
};
var L=function(A){return(A.xx*A.yy<0||A.xy*A.yx>0)?-1:1
};
var M=function(A){var G=P.normalize(A),C=-G.xx-G.yy,E=G.xx*G.yy-G.xy*G.yx,F=Math.sqrt(C*C-4*E),X=-(C+(C<0?-F:F))/2,Y=E/X,B=G.xy/(X-G.xx),H=1,D=G.xy/(Y-G.xx),W=1;
if(I(X,Y)){B=1,H=0,D=0,W=1
}if(!isFinite(B)){B=1,H=(X-G.xx)/G.xy;
if(!isFinite(H)){B=(X-G.yy)/G.yx,H=1;
if(!isFinite(B)){B=1,H=G.yx/(X-G.yy)
}}}if(!isFinite(D)){D=1,W=(Y-G.xx)/G.xy;
if(!isFinite(W)){D=(Y-G.yy)/G.yx,W=1;
if(!isFinite(D)){D=1,W=G.yx/(Y-G.yy)
}}}var Z=Math.sqrt(B*B+H*H),a=Math.sqrt(D*D+W*W);
if(!isFinite(B/=Z)){B=0
}if(!isFinite(H/=Z)){H=0
}if(!isFinite(D/=a)){D=0
}if(!isFinite(W/=a)){W=0
}return{value1:X,value2:Y,vector1:{x:B,y:H},vector2:{x:D,y:W}}
};
var K=function(E,D){var B=L(E),C=D.angle1=(Math.atan2(E.yx,E.yy)+Math.atan2(-B*E.xy,B*E.xx))/2,F=Math.cos(C),A=Math.sin(C);
D.sx=J(E.xx/F,F,-E.xy/A,A);
D.sy=J(E.yy/F,F,E.yx/A,A);
return D
};
var N=function(E,D){var B=L(E),C=D.angle2=(Math.atan2(B*E.yx,B*E.xx)+Math.atan2(-E.xy,E.yy))/2,F=Math.cos(C),A=Math.sin(C);
D.sx=J(E.xx/F,F,E.yx/A,A);
D.sy=J(E.yy/F,F,-E.xy/A,A);
return D
};
dojox.gfx.decompose=function(D){var E=P.normalize(D),A={dx:E.dx,dy:E.dy,sx:1,sy:1,angle1:0,angle2:0};
if(I(E.xy,0)&&I(E.yx,0)){return dojo.mixin(A,{sx:E.xx,sy:E.yy})
}if(I(E.xx*E.yx,-E.xy*E.yy)){return K(E,A)
}if(I(E.xx*E.xy,-E.yx*E.yy)){return N(E,A)
}var F=O(E),B=M([E,F]),C=M([F,E]),S=new P.Matrix2D({xx:B.vector1.x,xy:B.vector2.x,yx:B.vector1.y,yy:B.vector2.y}),G=new P.Matrix2D({xx:C.vector1.x,xy:C.vector1.y,yx:C.vector2.x,yy:C.vector2.y}),H=new P.Matrix2D([P.invert(S),E,P.invert(G)]);
K(G,A);
H.xx*=A.sx;
H.yy*=A.sy;
N(S,A);
H.xx*=A.sx;
H.yy*=A.sy;
return dojo.mixin(A,{sx:H.xx,sy:H.yy})
}
})()
};