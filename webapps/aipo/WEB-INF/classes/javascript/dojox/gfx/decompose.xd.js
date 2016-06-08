dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.decompose"],["require","dojox.gfx.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.decompose"]){B._hasResource["dojox.gfx.decompose"]=true;
B.provide("dojox.gfx.decompose");
B.require("dojox.gfx.matrix");
(function(){var O=dojox.gfx.matrix;
var P=function(C,D){return Math.abs(C-D)<=0.000001*(Math.abs(C)+Math.abs(D))
};
var A=function(C,F,E,D){if(!isFinite(C)){return E
}else{if(!isFinite(E)){return C
}}F=Math.abs(F),D=Math.abs(D);
return(F*C+D*E)/(F+D)
};
var N=function(D){var C=new O.Matrix2D(D);
return B.mixin(C,{dx:0,dy:0,xy:C.yx,yx:C.xy})
};
var K=function(C){return(C.xx*C.yy<0||C.xy*C.yx>0)?-1:1
};
var L=function(C){var I=O.normalize(C),E=-I.xx-I.yy,G=I.xx*I.yy-I.xy*I.yx,H=Math.sqrt(E*E-4*G),Z=-(E+(E<0?-H:H))/2,a=G/Z,D=I.xy/(Z-I.xx),X=1,F=I.xy/(a-I.xx),Y=1;
if(P(Z,a)){D=1,X=0,F=0,Y=1
}if(!isFinite(D)){D=1,X=(Z-I.xx)/I.xy;
if(!isFinite(X)){D=(Z-I.yy)/I.yx,X=1;
if(!isFinite(D)){D=1,X=I.yx/(Z-I.yy)
}}}if(!isFinite(F)){F=1,Y=(a-I.xx)/I.xy;
if(!isFinite(Y)){F=(a-I.yy)/I.yx,Y=1;
if(!isFinite(F)){F=1,Y=I.yx/(a-I.yy)
}}}var b=Math.sqrt(D*D+X*X),c=Math.sqrt(F*F+Y*Y);
if(!isFinite(D/=b)){D=0
}if(!isFinite(X/=b)){X=0
}if(!isFinite(F/=c)){F=0
}if(!isFinite(Y/=c)){Y=0
}return{value1:Z,value2:a,vector1:{x:D,y:X},vector2:{x:F,y:Y}}
};
var J=function(F,E){var C=K(F),D=E.angle1=(Math.atan2(F.yx,F.yy)+Math.atan2(-C*F.xy,C*F.xx))/2,G=Math.cos(D),H=Math.sin(D);
E.sx=A(F.xx/G,G,-F.xy/H,H);
E.sy=A(F.yy/G,G,F.yx/H,H);
return E
};
var M=function(F,E){var C=K(F),D=E.angle2=(Math.atan2(C*F.yx,C*F.xx)+Math.atan2(-F.xy,F.yy))/2,G=Math.cos(D),H=Math.sin(D);
E.sx=A(F.xx/G,G,F.yx/H,H);
E.sy=A(F.yy/G,G,-F.xy/H,H);
return E
};
dojox.gfx.decompose=function(F){var G=O.normalize(F),C={dx:G.dx,dy:G.dy,sx:1,sy:1,angle1:0,angle2:0};
if(P(G.xy,0)&&P(G.yx,0)){return B.mixin(C,{sx:G.xx,sy:G.yy})
}if(P(G.xx*G.yx,-G.xy*G.yy)){return J(G,C)
}if(P(G.xx*G.xy,-G.yx*G.yy)){return M(G,C)
}var H=N(G),D=L([G,H]),E=L([H,G]),U=new O.Matrix2D({xx:D.vector1.x,xy:D.vector2.x,yx:D.vector1.y,yy:D.vector2.y}),I=new O.Matrix2D({xx:E.vector1.x,xy:E.vector1.y,yx:E.vector2.x,yy:E.vector2.y}),S=new O.Matrix2D([O.invert(U),G,O.invert(I)]);
J(I,C);
S.xx*=C.sx;
S.yy*=C.sy;
M(U,C);
S.xx*=C.sx;
S.yy*=C.sy;
return B.mixin(C,{sx:S.xx,sy:S.yy})
}
})()
}}});