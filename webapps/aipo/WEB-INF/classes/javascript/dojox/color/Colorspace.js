if(!dojo._hasResource["dojox.color.Colorspace"]){dojo._hasResource["dojox.color.Colorspace"]=true;
dojo.provide("dojox.color.Colorspace");
dojo.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var N=dojox.color;
var M=dojox.math.matrix;
var O=this;
var K={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var P={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var I={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var L={XYZ:{xyY:function(C,A){A=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},A||{});
var B=O.whitepoint(A.whitepoint,A.observer);
var F=C.X+C.Y+C.Z;
if(F==0){var D=B.x,E=B.y
}else{var D=C.X/F,E=C.Y/F
}return{x:D,y:E,Y:C.Y}
},Lab:function(F,Y){Y=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},Y||{});
var X=O.kappa(Y.useApproximation),B=O.epsilon(Y.useApproximation);
var D=O.whitepoint(Y.whitepoint,Y.observer);
var Z=F.X/D.x,A=F.Y/D.y,H=F.z/D.z;
var a=(Z>B)?Math.pow(Z,1/3):(X*Z+16)/116;
var b=(A>B)?Math.pow(A,1/3):(X*A+16)/116;
var c=(H>B)?Math.pow(H,1/3):(X*H+16)/116;
var G=116*b-16,C=500*(a-b),E=200*(b-c);
return{L:G,a:C,b:E}
},Luv:function(W,a){a=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},a||{});
var Z=O.kappa(a.useApproximation),C=O.epsilon(a.useApproximation);
var G=O.whitepoint(a.whitepoint,a.observer);
var A=(4*W.X)/(W.X+15*W.Y+3*W.Z);
var Y=(9*W.Y)/(W.X+15*W.Y+3*W.Z);
var H=(4*G.x)/(G.x+15*G.y+3*G.z);
var D=(9*G.y)/(G.x+15*G.y+3*G.z);
var B=W.Y/G.y;
var X=(B>C)?116*Math.pow(B,1/3)-16:Z*B;
var E=13*X*(A-H);
var F=13*X*(Y-D);
return{L:X,u:E,v:F}
}},xyY:{XYZ:function(D){if(D.y==0){var A=0,B=0,C=0
}else{var A=(D.x*D.Y)/D.y;
var B=D.Y;
var C=((1-D.x-D.y)*D.Y)/D.y
}return{X:A,Y:B,Z:C}
}},Lab:{XYZ:function(X,W){W=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},W||{});
var E=W.useApproximation,H=O.kappa(E),C=O.epsilon(E);
var F=O.whitepoint(W.whitepoint,W.observer);
var B=(X.L>(H*C))?Math.pow((X.L+16)/116,3):X.L/H;
var a=(B>C)?(X.L+16)/116:(H*B+16)/116;
var Y=(X.a/500)+a;
var b=a-(X.b/200);
var A=Math.pow(Y,3),D=Math.pow(b,3);
var Z=(A>C)?A:(116*Y-16)/H;
var G=(D>C)?D:(116*b-16)/H;
return{X:Z*F.x,Y:B*F.y,Z:G*F.z}
},LCHab:function(A){var C=A.L,D=Math.pow(A.a*A.a+A.b*A.b,0.5),B=Math.atan(A.b,A.a)*(180/Math.PI);
if(B<0){B+=360
}if(B<360){B-=360
}return{L:C,C:D,H:B}
}},LCHab:{Lab:function(E){var D=E.H*(Math.PI/180),B=E.L,A=E.C/Math.pow(Math.pow(Math.tan(D),2)+1,0.5);
if(90<lchH&&E.H<270){A=-A
}var C=Math.pow(Math.pow(E.C,2)-Math.pow(A,2),0.5);
if(E.H>180){C=-C
}return{L:B,a:A,b:C}
}},Luv:{XYZ:function(F,Y){Y=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},Y||{});
var D=Y.useApproximation,X=O.kappa(D),B=O.epsilon(D);
var E=O.whitepoint(Y.whitepoint,Y.observer);
var A=(4*E.x)/(E.x+15*E.y+3*E.z);
var H=(9*E.y)/(E.x+15*E.y+3*E.z);
var a=(F.L>X*B)?Math.pow((F.L+16)/116,3):F.L/X;
var C=(1/3)*(((52*F.L)/(F.u+13*F.L*A))-1);
var D=-5*a,G=-(1/3),W=a*(((39*F.L)/(F.v+13*F.L*H))-5);
var Z=(W-D)/(C-G),b=Z*C+D;
return{X:Z,Y:a,Z:b}
},LCHuv:function(D){var C=D.L,A=Math.pow(D.u*D.u+D.v*D*v,0.5),B=Math.atan(D.v,D.u)*(180/Math.PI);
if(B<0){B+=360
}if(B>360){B-=360
}return{L:C,C:A,H:B}
}},LCHuv:{Luv:function(D){var E=D.H*(Math.PI/180);
var C=D.L,A=D.C/Math.pow(Math.pow(Math.tan(E),2)+1,0.5);
var B=Math.pow(D.C*D.C-A*A,0.5);
if(90<D.H&&D.H>270){A*=-1
}if(D.H>180){B*=-1
}return{L:C,u:A,v:B}
}}};
var J={CMY:{CMYK:function(A,B){return N.fromCmy(A).toCmyk()
},HSL:function(A,B){return N.fromCmy(A).toHsl()
},HSV:function(A,B){return N.fromCmy(A).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(N.fromCmy(A).toXYZ(B))
},LCHab:function(A,B){return L.Lab.LCHab(J.CMY.Lab(A))
},LCHuv:function(A,B){return L.LCHuv.Luv(L.Luv.XYZ(N.fromCmy(A).toXYZ(B)))
},Luv:function(A,B){return L.Luv.XYZ(N.fromCmy(A).toXYZ(B))
},RGB:function(A,B){return N.fromCmy(A)
},XYZ:function(A,B){return N.fromCmy(A).toXYZ(B)
},xyY:function(A,B){return L.XYZ.xyY(N.fromCmy(A).toXYZ(B))
}},CMYK:{CMY:function(A,B){return N.fromCmyk(A).toCmy()
},HSL:function(A,B){return N.fromCmyk(A).toHsl()
},HSV:function(A,B){return N.fromCmyk(A).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(N.fromCmyk(A).toXYZ(B))
},LCHab:function(A,B){return L.Lab.LCHab(J.CMYK.Lab(A))
},LCHuv:function(A,B){return L.LCHuv.Luv(L.Luv.XYZ(N.fromCmyk(A).toXYZ(B)))
},Luv:function(A,B){return L.Luv.XYZ(N.fromCmyk(A).toXYZ(B))
},RGB:function(A,B){return N.fromCmyk(A)
},XYZ:function(A,B){return N.fromCmyk(A).toXYZ(B)
},xyY:function(A,B){return L.XYZ.xyY(N.fromCmyk(A).toXYZ(B))
}},HSL:{CMY:function(A,B){return N.fromHsl(A).toCmy()
},CMYK:function(A,B){return N.fromHsl(A).toCmyk()
},HSV:function(A,B){return N.fromHsl(A).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(N.fromHsl(A).toXYZ(B))
},LCHab:function(A,B){return L.Lab.LCHab(J.CMYK.Lab(A))
},LCHuv:function(A,B){return L.LCHuv.Luv(L.Luv.XYZ(N.fromHsl(A).toXYZ(B)))
},Luv:function(A,B){return L.Luv.XYZ(N.fromHsl(A).toXYZ(B))
},RGB:function(A,B){return N.fromHsl(A)
},XYZ:function(A,B){return N.fromHsl(A).toXYZ(B)
},xyY:function(A,B){return L.XYZ.xyY(N.fromHsl(A).toXYZ(B))
}},HSV:{CMY:function(A,B){return N.fromHsv(A).toCmy()
},CMYK:function(A,B){return N.fromHsv(A).toCmyk()
},HSL:function(A,B){return N.fromHsv(A).toHsl()
},Lab:function(A,B){return L.XYZ.Lab(N.fromHsv(A).toXYZ(B))
},LCHab:function(A,B){return L.Lab.LCHab(J.CMYK.Lab(A))
},LCHuv:function(A,B){return L.LCHuv.Luv(L.Luv.XYZ(N.fromHsv(A).toXYZ(B)))
},Luv:function(A,B){return L.Luv.XYZ(N.fromHsv(A).toXYZ(B))
},RGB:function(A,B){return N.fromHsv(A)
},XYZ:function(A,B){return N.fromHsv(A).toXYZ(B)
},xyY:function(A,B){return L.XYZ.xyY(N.fromHsv(A).toXYZ(B))
}},Lab:{CMY:function(A,B){return N.fromXYZ(L.Lab.XYZ(A,B)).toCmy()
},CMYK:function(A,B){return N.fromXYZ(L.Lab.XYZ(A,B)).toCmyk()
},HSL:function(A,B){return N.fromXYZ(L.Lab.XYZ(A,B)).toHsl()
},HSV:function(A,B){return N.fromXYZ(L.Lab.XYZ(A,B)).toHsv()
},LCHab:function(A,B){return L.Lab.LCHab(A,B)
},LCHuv:function(A,B){return L.Luv.LCHuv(L.Lab.XYZ(A,B),B)
},Luv:function(A,B){return L.XYZ.Luv(L.Lab.XYZ(A,B),B)
},RGB:function(A,B){return N.fromXYZ(L.Lab.XYZ(A,B))
},XYZ:function(A,B){return L.Lab.XYZ(A,B)
},xyY:function(A,B){return L.XYZ.xyY(L.Lab.XYZ(A,B),B)
}},LCHab:{CMY:function(A,B){return N.fromXYZ(L.Lab.XYZ(L.LCHab.Lab(A),B),B).toCmy()
},CMYK:function(A,B){return N.fromXYZ(L.Lab.XYZ(L.LCHab.Lab(A),B),B).toCmyk()
},HSL:function(A,B){return N.fromXYZ(L.Lab.XYZ(L.LCHab.Lab(A),B),B).toHsl()
},HSV:function(A,B){return N.fromXYZ(L.Lab.XYZ(L.LCHab.Lab(A),B),B).toHsv()
},Lab:function(A,B){return L.Lab.LCHab(A,B)
},LCHuv:function(A,B){return L.Luv.LCHuv(L.XYZ.Luv(L.Lab.XYZ(L.LCHab.Lab(A),B),B),B)
},Luv:function(A,B){return L.XYZ.Luv(L.Lab.XYZ(L.LCHab.Lab(A),B),B)
},RGB:function(A,B){return N.fromXYZ(L.Lab.XYZ(L.LCHab.Lab(A),B),B)
},XYZ:function(A,B){return L.Lab.XYZ(L.LCHab.Lab(A,B),B)
},xyY:function(A,B){return L.XYZ.xyY(L.Lab.XYZ(L.LCHab.Lab(A),B),B)
}},LCHuv:{CMY:function(A,B){return N.fromXYZ(L.Luv.XYZ(L.LCHuv.Luv(A),B),B).toCmy()
},CMYK:function(A,B){return N.fromXYZ(L.Luv.XYZ(L.LCHuv.Luv(A),B),B).toCmyk()
},HSL:function(A,B){return N.fromXYZ(L.Luv.XYZ(L.LCHuv.Luv(A),B),B).toHsl()
},HSV:function(A,B){return N.fromXYZ(L.Luv.XYZ(L.LCHuv.Luv(A),B),B).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(L.Luv.XYZ(L.LCHuv.Luv(A),B),B)
},LCHab:function(A,B){return L.Lab.LCHab(L.XYZ.Lab(L.Luv.XYZ(L.LCHuv.Luv(A),B),B),B)
},Luv:function(A,B){return L.LCHuv.Luv(A,B)
},RGB:function(A,B){return N.fromXYZ(L.Luv.XYZ(L.LCHuv.Luv(A),B),B)
},XYZ:function(A,B){return L.Luv.XYZ(L.LCHuv.Luv(A),B)
},xyY:function(A,B){return L.XYZ.xyY(L.Luv.XYZ(L.LCHuv.Luv(A),B),B)
},},Luv:{CMY:function(A,B){return N.fromXYZ(L.Luv.XYZ(A,B),B).toCmy()
},CMYK:function(A,B){return N.fromXYZ(L.Luv.XYZ(A,B),B).toCmyk()
},HSL:function(A,B){return N.fromXYZ(L.Luv.XYZ(A,B),B).toHsl()
},HSV:function(A,B){return N.fromXYZ(L.Luv.XYZ(A,B),B).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(L.Luv.XYZ(A,B),B)
},LCHab:function(A,B){return L.Lab.LCHab(L.XYZ.Lab(L.Luv.XYZ(A,B),B),B)
},LCHuv:function(A,B){return L.Luv.LCHuv(A,B)
},RGB:function(A,B){return N.fromXYZ(L.Luv.XYZ(A,B),B)
},XYZ:function(A,B){return L.Luv.XYZ(A,B)
},xyY:function(A,B){return L.XYZ.xyY(L.Luv.XYZ(A,B),B)
},},RGB:{CMY:function(A,B){return A.toCmy()
},CMYK:function(A,B){return A.toCmyk()
},HSL:function(A,B){return A.toHsl()
},HSV:function(A,B){return A.toHsv()
},Lab:function(A,B){return L.XYZ.Lab(A.toXYZ(B),B)
},LCHab:function(A,B){return L.LCHab.Lab(L.XYZ.Lab(A.toXYZ(B),B),B)
},LCHuv:function(A,B){return L.LCHuv.Luv(L.XYZ.Luv(A.toXYZ(B),B),B)
},Luv:function(A,B){return L.XYZ.Luv(A.toXYZ(B),B)
},XYZ:function(A,B){return A.toXYZ(B)
},xyY:function(A,B){return L.XYZ.xyY(A.toXYZ(B),B)
}},XYZ:{CMY:function(A,B){return N.fromXYZ(A,B).toCmy()
},CMYK:function(A,B){return N.fromXYZ(A,B).toCmyk()
},HSL:function(A,B){return N.fromXYZ(A,B).toHsl()
},HSV:function(A,B){return N.fromXYZ(A,B).toHsv()
},Lab:function(A,B){return L.XYZ.Lab(A,B)
},LCHab:function(A,B){return L.Lab.LCHab(L.XYZ.Lab(A,B),B)
},LCHuv:function(A,B){return L.Luv.LCHuv(L.XYZ.Luv(A,B),B)
},Luv:function(A,B){return L.XYZ.Luv(A,B)
},RGB:function(A,B){return N.fromXYZ(A,B)
},xyY:function(A,B){return L.XYZ.xyY(N.fromXYZ(A,B),B)
}},xyY:{CMY:function(A,B){return N.fromXYZ(L.xyY.XYZ(A,B),B).toCmy()
},CMYK:function(A,B){return N.fromXYZ(L.xyY.XYZ(A,B),B).toCmyk()
},HSL:function(A,B){return N.fromXYZ(L.xyY.XYZ(A,B),B).toHsl()
},HSV:function(A,B){return N.fromXYZ(L.xyY.XYZ(A,B),B).toHsv()
},Lab:function(A,B){return L.Lab.XYZ(L.xyY.XYZ(A,B),B)
},LCHab:function(A,B){return L.LCHab.Lab(L.Lab.XYZ(L.xyY.XYZ(A,B),B),B)
},LCHuv:function(A,B){return L.LCHuv.Luv(L.Luv.XYZ(L.xyY.XYZ(A,B),B),B)
},Luv:function(A,B){return L.Luv.XYZ(L.xyY.XYZ(A,B),B)
},RGB:function(A,B){return N.fromXYZ(L.xyY.XYZ(A,B),B)
},XYZ:function(A,B){return L.xyY.XYZ(A,B)
}}};
this.whitepoint=function(F,C){C=C||"10";
var D=0,E=0,A=0;
if(K[C]&&K[C][F]){D=K[C][F].x;
E=K[C][F].y;
A=K[C][F].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",C,F)
}var B={x:D,y:E,z:(1-D-E),t:A,Y:1};
return this.convert(B,"xyY","XYZ")
};
this.tempToWhitepoint=function(B){if(B<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",B,").");
return{x:0,y:0}
}if(B>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",B,").");
return{x:0,y:0}
}var E=B,F=B*B,G=F*B;
var A=Math.pow(10,9),R=Math.pow(10,6),H=Math.pow(10,3);
if(B<=7000){var C=(-4.607*A/G)+(2.9678*R/F)+(0.09911*H/B)+0.2444063
}else{var C=(-2.0064*A/G)+(1.9018*R/F)+(0.24748*H/B)+0.23704
}var D=-3*C*C+2.87*C-0.275;
return{x:C,y:D}
};
this.primaries=function(B){B=dojo.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},B||{});
var C=[];
if(P[B.profile]){C=P[B.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",P,".  The profile passed was ",B.profile)
}var A={name:B.profile,gamma:C[0],whitepoint:C[1],xr:C[2],yr:C[3],Yr:C[4],xg:C[5],yg:C[6],Yg:C[7],xb:C[8],yb:C[9],Yb:C[10]};
if(B.whitepoint!=A.whitepoint){var E=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:B.adaptor,source:A.whitepoint,destination:B.whitepoint}),"XYZ","xyY");
var F=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:B.adaptor,source:A.whitepoint,destination:B.whitepoint}),"XYZ","xyY");
var D=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:B.adaptor,source:A.whitepoint,destination:B.whitepoint}),"XYZ","xyY");
A=dojo.mixin(A,{xr:E.x,yr:E.y,Yr:E.Y,xg:F.x,yg:F.y,Yg:F.Y,xb:D.x,yb:D.y,Yb:D.Y,whitepoint:B.whitepoint})
}return dojo.mixin(A,{zr:1-A.xr-A.yr,zg:1-A.xg-A.yg,zb:1-A.xb-A.yb})
};
this.adapt=function(E){if(!E.color||!E.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",E)
}E=dojo.mixin({adaptor:"Bradford",destination:"D65"},E);
var C=this.whitepoint(E.source);
var D=this.whitepoint(E.destination);
if(I[E.adaptor]){var B=I[E.adaptor].ma;
var G=I[E.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",E.adaptor,"' was not found.")
}var A=M.multiply([[C.x,C.y,C.z]],B);
var F=M.multiply([[D.x,D.y,D.z]],B);
var S=[[F[0][0]/A[0][0],0,0],[0,F[0][1]/A[0][1],0],[0,0,F[0][2]/A[0][2]]];
var H=M.multiply(M.multiply(B,S),G);
var T=M.multiply([[E.color.X,E.color.Y,E.color.Z]],H)[0];
return{X:T[0],Y:T[1],Z:T[2]}
};
this.matrix=function(f,F){var e=this.whitepoint(F.whitepoint);
var G=p.xr/p.yr,A=1,b=(1-p.xr-p.yr)/p.yr;
var E=p.xg/p.yg,g=1,a=(1-p.xg-p.yg)/p.yg;
var B=p.xb/p.yb,c=1,b=(1-p.xb-p.yb)/p.yb;
var i=[[G,A,b],[E,g,a],[B,c,Zb]];
var j=[[e.X,e.Y,e.Z]];
var D=dojox.math.matrix.multiply(j,dojox.math.matrix.inverse(i));
var C=D[0][0],h=D[0][1],d=D[0][2];
var H=[[C*G,C*A,C*b],[h*E,h*g,h*a],[d*B,d*c,d*Zb]];
if(f=="RGB"){return dojox.math.inverse(H)
}return H
};
this.epsilon=function(A){return(A||typeof (A)=="undefined")?0.008856:216/24289
};
this.kappa=function(A){return(A||typeof (A)=="undefined")?903.3:24389/27
};
this.convert=function(D,A,B,C){if(J[A]&&J[A][B]){return J[A][B](obj,C)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",D," from ",A," to ",B,".")
}
})();
dojo.mixin(dojox.color,{fromXYZ:function(Q,T){T=T||{};
var B=dojox.color.Colorspace.primaries(T);
var V=dojox.color.Colorspace.matrix("RGB",B);
var R=dojox.math.matrix.mutliply([[Q.X,Q.Y,Q.Z]],V);
var N=R[0][0],S=R[0][1],P=R[0][2];
if(B.profile=="sRGB"){var U=(N>0.0031308)?(1.055*Math.pow(N,1/2.4))-0.055:12.92*N;
var O=(S>0.0031308)?(1.055*Math.pow(S,1/2.4))-0.055:12.92*S;
var G=(P>0.0031308)?(1.055*Math.pow(P,1/2.4))-0.055:12.92*P
}else{var U=Math.pow(N,1/B.gamma),O=Math.pow(S,1/B.gamma),G=Math.pow(P,1/B.gamma)
}return new dojox.color.Color({r:Math.floor(U*255),g:Math.floor(O*255),b:Math.floor(G*255)})
}});
dojo.extend(dojox.color.Color,{toXYZ:function(T){T=T||{};
var M=dojox.color.Colorspace.primaries(T);
var L=dojox.color.Colorspace.matrix("XYZ",M);
var O=this.r/255,K=this.g/255,Q=this.b/255;
if(M.profile=="sRGB"){var N=(O>0.04045)?Math.pow(((O+0.055)/1.055),2.4):O/12.92;
var S=(K>0.04045)?Math.pow(((K+0.055)/1.055),2.4):K/12.92;
var P=(Q>0.04045)?Math.pow(((Q+0.055)/1.055),2.4):Q/12.92
}else{var N=Math.pow(O,M.gamma),S=Math.pow(K,M.gamma),P=Math.pow(Q,M.gamma)
}var R=dojox.math.matrix([[N,S,P]],L);
return{X:R[0][0],Y:R[0][1],Z:R[0][2]}
}})
};