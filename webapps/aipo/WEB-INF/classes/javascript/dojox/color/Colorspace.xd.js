dojo._xdResourceLoaded({depends:[["provide","dojox.color.Colorspace"],["require","dojox.math.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.color.Colorspace"]){B._hasResource["dojox.color.Colorspace"]=true;
B.provide("dojox.color.Colorspace");
B.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var M=dojox.color;
var L=dojox.math.matrix;
var N=this;
var J={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var O={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var P={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var K={XYZ:{xyY:function(D,H){H=B.mixin({whitepoint:"D65",observer:"10",useApproximation:true},H||{});
var C=N.whitepoint(H.whitepoint,H.observer);
var G=D.X+D.Y+D.Z;
if(G==0){var E=C.x,F=C.y
}else{var E=D.X/G,F=D.Y/G
}return{x:E,y:F,Y:D.Y}
},Lab:function(H,a){a=B.mixin({whitepoint:"D65",observer:"10",useApproximation:true},a||{});
var Z=N.kappa(a.useApproximation),D=N.epsilon(a.useApproximation);
var F=N.whitepoint(a.whitepoint,a.observer);
var b=H.X/F.x,C=H.Y/F.y,Y=H.z/F.z;
var c=(b>D)?Math.pow(b,1/3):(Z*b+16)/116;
var d=(C>D)?Math.pow(C,1/3):(Z*C+16)/116;
var e=(Y>D)?Math.pow(Y,1/3):(Z*Y+16)/116;
var I=116*d-16,E=500*(c-d),G=200*(d-e);
return{L:I,a:E,b:G}
},Luv:function(Y,c){c=B.mixin({whitepoint:"D65",observer:"10",useApproximation:true},c||{});
var b=N.kappa(c.useApproximation),E=N.epsilon(c.useApproximation);
var I=N.whitepoint(c.whitepoint,c.observer);
var C=(4*Y.X)/(Y.X+15*Y.Y+3*Y.Z);
var a=(9*Y.Y)/(Y.X+15*Y.Y+3*Y.Z);
var X=(4*I.x)/(I.x+15*I.y+3*I.z);
var F=(9*I.y)/(I.x+15*I.y+3*I.z);
var D=Y.Y/I.y;
var Z=(D>E)?116*Math.pow(D,1/3)-16:b*D;
var G=13*Z*(C-X);
var H=13*Z*(a-F);
return{L:Z,u:G,v:H}
}},xyY:{XYZ:function(E){if(E.y==0){var F=0,C=0,D=0
}else{var F=(E.x*E.Y)/E.y;
var C=E.Y;
var D=((1-E.x-E.y)*E.Y)/E.y
}return{X:F,Y:C,Z:D}
}},Lab:{XYZ:function(Z,Y){Y=B.mixin({whitepoint:"D65",observer:"10",useApproximation:true},Y||{});
var G=Y.useApproximation,X=N.kappa(G),E=N.epsilon(G);
var H=N.whitepoint(Y.whitepoint,Y.observer);
var D=(Z.L>(X*E))?Math.pow((Z.L+16)/116,3):Z.L/X;
var c=(D>E)?(Z.L+16)/116:(X*D+16)/116;
var a=(Z.a/500)+c;
var d=c-(Z.b/200);
var C=Math.pow(a,3),F=Math.pow(d,3);
var b=(C>E)?C:(116*a-16)/X;
var I=(F>E)?F:(116*d-16)/X;
return{X:b*H.x,Y:D*H.y,Z:I*H.z}
},LCHab:function(F){var D=F.L,E=Math.pow(F.a*F.a+F.b*F.b,0.5),C=Math.atan(F.b,F.a)*(180/Math.PI);
if(C<0){C+=360
}if(C<360){C-=360
}return{L:D,C:E,H:C}
}},LCHab:{Lab:function(F){var E=F.H*(Math.PI/180),C=F.L,G=F.C/Math.pow(Math.pow(Math.tan(E),2)+1,0.5);
if(90<lchH&&F.H<270){G=-G
}var D=Math.pow(Math.pow(F.C,2)-Math.pow(G,2),0.5);
if(F.H>180){D=-D
}return{L:C,a:G,b:D}
}},Luv:{XYZ:function(H,a){a=B.mixin({whitepoint:"D65",observer:"10",useApproximation:true},a||{});
var F=a.useApproximation,Z=N.kappa(F),D=N.epsilon(F);
var G=N.whitepoint(a.whitepoint,a.observer);
var C=(4*G.x)/(G.x+15*G.y+3*G.z);
var X=(9*G.y)/(G.x+15*G.y+3*G.z);
var c=(H.L>Z*D)?Math.pow((H.L+16)/116,3):H.L/Z;
var E=(1/3)*(((52*H.L)/(H.u+13*H.L*C))-1);
var F=-5*c,I=-(1/3),Y=c*(((39*H.L)/(H.v+13*H.L*X))-5);
var b=(Y-F)/(E-I),d=b*E+F;
return{X:b,Y:c,Z:d}
},LCHuv:function(E){var D=E.L,F=Math.pow(E.u*E.u+E.v*E*v,0.5),C=Math.atan(E.v,E.u)*(180/Math.PI);
if(C<0){C+=360
}if(C>360){C-=360
}return{L:D,C:F,H:C}
}},LCHuv:{Luv:function(E){var F=E.H*(Math.PI/180);
var D=E.L,G=E.C/Math.pow(Math.pow(Math.tan(F),2)+1,0.5);
var C=Math.pow(E.C*E.C-G*G,0.5);
if(90<E.H&&E.H>270){G*=-1
}if(E.H>180){C*=-1
}return{L:D,u:G,v:C}
}}};
var A={CMY:{CMYK:function(C,D){return M.fromCmy(C).toCmyk()
},HSL:function(C,D){return M.fromCmy(C).toHsl()
},HSV:function(C,D){return M.fromCmy(C).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(M.fromCmy(C).toXYZ(D))
},LCHab:function(C,D){return K.Lab.LCHab(A.CMY.Lab(C))
},LCHuv:function(C,D){return K.LCHuv.Luv(K.Luv.XYZ(M.fromCmy(C).toXYZ(D)))
},Luv:function(C,D){return K.Luv.XYZ(M.fromCmy(C).toXYZ(D))
},RGB:function(C,D){return M.fromCmy(C)
},XYZ:function(C,D){return M.fromCmy(C).toXYZ(D)
},xyY:function(C,D){return K.XYZ.xyY(M.fromCmy(C).toXYZ(D))
}},CMYK:{CMY:function(C,D){return M.fromCmyk(C).toCmy()
},HSL:function(C,D){return M.fromCmyk(C).toHsl()
},HSV:function(C,D){return M.fromCmyk(C).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(M.fromCmyk(C).toXYZ(D))
},LCHab:function(C,D){return K.Lab.LCHab(A.CMYK.Lab(C))
},LCHuv:function(C,D){return K.LCHuv.Luv(K.Luv.XYZ(M.fromCmyk(C).toXYZ(D)))
},Luv:function(C,D){return K.Luv.XYZ(M.fromCmyk(C).toXYZ(D))
},RGB:function(C,D){return M.fromCmyk(C)
},XYZ:function(C,D){return M.fromCmyk(C).toXYZ(D)
},xyY:function(C,D){return K.XYZ.xyY(M.fromCmyk(C).toXYZ(D))
}},HSL:{CMY:function(C,D){return M.fromHsl(C).toCmy()
},CMYK:function(C,D){return M.fromHsl(C).toCmyk()
},HSV:function(C,D){return M.fromHsl(C).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(M.fromHsl(C).toXYZ(D))
},LCHab:function(C,D){return K.Lab.LCHab(A.CMYK.Lab(C))
},LCHuv:function(C,D){return K.LCHuv.Luv(K.Luv.XYZ(M.fromHsl(C).toXYZ(D)))
},Luv:function(C,D){return K.Luv.XYZ(M.fromHsl(C).toXYZ(D))
},RGB:function(C,D){return M.fromHsl(C)
},XYZ:function(C,D){return M.fromHsl(C).toXYZ(D)
},xyY:function(C,D){return K.XYZ.xyY(M.fromHsl(C).toXYZ(D))
}},HSV:{CMY:function(C,D){return M.fromHsv(C).toCmy()
},CMYK:function(C,D){return M.fromHsv(C).toCmyk()
},HSL:function(C,D){return M.fromHsv(C).toHsl()
},Lab:function(C,D){return K.XYZ.Lab(M.fromHsv(C).toXYZ(D))
},LCHab:function(C,D){return K.Lab.LCHab(A.CMYK.Lab(C))
},LCHuv:function(C,D){return K.LCHuv.Luv(K.Luv.XYZ(M.fromHsv(C).toXYZ(D)))
},Luv:function(C,D){return K.Luv.XYZ(M.fromHsv(C).toXYZ(D))
},RGB:function(C,D){return M.fromHsv(C)
},XYZ:function(C,D){return M.fromHsv(C).toXYZ(D)
},xyY:function(C,D){return K.XYZ.xyY(M.fromHsv(C).toXYZ(D))
}},Lab:{CMY:function(C,D){return M.fromXYZ(K.Lab.XYZ(C,D)).toCmy()
},CMYK:function(C,D){return M.fromXYZ(K.Lab.XYZ(C,D)).toCmyk()
},HSL:function(C,D){return M.fromXYZ(K.Lab.XYZ(C,D)).toHsl()
},HSV:function(C,D){return M.fromXYZ(K.Lab.XYZ(C,D)).toHsv()
},LCHab:function(C,D){return K.Lab.LCHab(C,D)
},LCHuv:function(C,D){return K.Luv.LCHuv(K.Lab.XYZ(C,D),D)
},Luv:function(C,D){return K.XYZ.Luv(K.Lab.XYZ(C,D),D)
},RGB:function(C,D){return M.fromXYZ(K.Lab.XYZ(C,D))
},XYZ:function(C,D){return K.Lab.XYZ(C,D)
},xyY:function(C,D){return K.XYZ.xyY(K.Lab.XYZ(C,D),D)
}},LCHab:{CMY:function(C,D){return M.fromXYZ(K.Lab.XYZ(K.LCHab.Lab(C),D),D).toCmy()
},CMYK:function(C,D){return M.fromXYZ(K.Lab.XYZ(K.LCHab.Lab(C),D),D).toCmyk()
},HSL:function(C,D){return M.fromXYZ(K.Lab.XYZ(K.LCHab.Lab(C),D),D).toHsl()
},HSV:function(C,D){return M.fromXYZ(K.Lab.XYZ(K.LCHab.Lab(C),D),D).toHsv()
},Lab:function(C,D){return K.Lab.LCHab(C,D)
},LCHuv:function(C,D){return K.Luv.LCHuv(K.XYZ.Luv(K.Lab.XYZ(K.LCHab.Lab(C),D),D),D)
},Luv:function(C,D){return K.XYZ.Luv(K.Lab.XYZ(K.LCHab.Lab(C),D),D)
},RGB:function(C,D){return M.fromXYZ(K.Lab.XYZ(K.LCHab.Lab(C),D),D)
},XYZ:function(C,D){return K.Lab.XYZ(K.LCHab.Lab(C,D),D)
},xyY:function(C,D){return K.XYZ.xyY(K.Lab.XYZ(K.LCHab.Lab(C),D),D)
}},LCHuv:{CMY:function(C,D){return M.fromXYZ(K.Luv.XYZ(K.LCHuv.Luv(C),D),D).toCmy()
},CMYK:function(C,D){return M.fromXYZ(K.Luv.XYZ(K.LCHuv.Luv(C),D),D).toCmyk()
},HSL:function(C,D){return M.fromXYZ(K.Luv.XYZ(K.LCHuv.Luv(C),D),D).toHsl()
},HSV:function(C,D){return M.fromXYZ(K.Luv.XYZ(K.LCHuv.Luv(C),D),D).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(K.Luv.XYZ(K.LCHuv.Luv(C),D),D)
},LCHab:function(C,D){return K.Lab.LCHab(K.XYZ.Lab(K.Luv.XYZ(K.LCHuv.Luv(C),D),D),D)
},Luv:function(C,D){return K.LCHuv.Luv(C,D)
},RGB:function(C,D){return M.fromXYZ(K.Luv.XYZ(K.LCHuv.Luv(C),D),D)
},XYZ:function(C,D){return K.Luv.XYZ(K.LCHuv.Luv(C),D)
},xyY:function(C,D){return K.XYZ.xyY(K.Luv.XYZ(K.LCHuv.Luv(C),D),D)
},},Luv:{CMY:function(C,D){return M.fromXYZ(K.Luv.XYZ(C,D),D).toCmy()
},CMYK:function(C,D){return M.fromXYZ(K.Luv.XYZ(C,D),D).toCmyk()
},HSL:function(C,D){return M.fromXYZ(K.Luv.XYZ(C,D),D).toHsl()
},HSV:function(C,D){return M.fromXYZ(K.Luv.XYZ(C,D),D).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(K.Luv.XYZ(C,D),D)
},LCHab:function(C,D){return K.Lab.LCHab(K.XYZ.Lab(K.Luv.XYZ(C,D),D),D)
},LCHuv:function(C,D){return K.Luv.LCHuv(C,D)
},RGB:function(C,D){return M.fromXYZ(K.Luv.XYZ(C,D),D)
},XYZ:function(C,D){return K.Luv.XYZ(C,D)
},xyY:function(C,D){return K.XYZ.xyY(K.Luv.XYZ(C,D),D)
},},RGB:{CMY:function(C,D){return C.toCmy()
},CMYK:function(C,D){return C.toCmyk()
},HSL:function(C,D){return C.toHsl()
},HSV:function(C,D){return C.toHsv()
},Lab:function(C,D){return K.XYZ.Lab(C.toXYZ(D),D)
},LCHab:function(C,D){return K.LCHab.Lab(K.XYZ.Lab(C.toXYZ(D),D),D)
},LCHuv:function(C,D){return K.LCHuv.Luv(K.XYZ.Luv(C.toXYZ(D),D),D)
},Luv:function(C,D){return K.XYZ.Luv(C.toXYZ(D),D)
},XYZ:function(C,D){return C.toXYZ(D)
},xyY:function(C,D){return K.XYZ.xyY(C.toXYZ(D),D)
}},XYZ:{CMY:function(C,D){return M.fromXYZ(C,D).toCmy()
},CMYK:function(C,D){return M.fromXYZ(C,D).toCmyk()
},HSL:function(C,D){return M.fromXYZ(C,D).toHsl()
},HSV:function(C,D){return M.fromXYZ(C,D).toHsv()
},Lab:function(C,D){return K.XYZ.Lab(C,D)
},LCHab:function(C,D){return K.Lab.LCHab(K.XYZ.Lab(C,D),D)
},LCHuv:function(C,D){return K.Luv.LCHuv(K.XYZ.Luv(C,D),D)
},Luv:function(C,D){return K.XYZ.Luv(C,D)
},RGB:function(C,D){return M.fromXYZ(C,D)
},xyY:function(C,D){return K.XYZ.xyY(M.fromXYZ(C,D),D)
}},xyY:{CMY:function(C,D){return M.fromXYZ(K.xyY.XYZ(C,D),D).toCmy()
},CMYK:function(C,D){return M.fromXYZ(K.xyY.XYZ(C,D),D).toCmyk()
},HSL:function(C,D){return M.fromXYZ(K.xyY.XYZ(C,D),D).toHsl()
},HSV:function(C,D){return M.fromXYZ(K.xyY.XYZ(C,D),D).toHsv()
},Lab:function(C,D){return K.Lab.XYZ(K.xyY.XYZ(C,D),D)
},LCHab:function(C,D){return K.LCHab.Lab(K.Lab.XYZ(K.xyY.XYZ(C,D),D),D)
},LCHuv:function(C,D){return K.LCHuv.Luv(K.Luv.XYZ(K.xyY.XYZ(C,D),D),D)
},Luv:function(C,D){return K.Luv.XYZ(K.xyY.XYZ(C,D),D)
},RGB:function(C,D){return M.fromXYZ(K.xyY.XYZ(C,D),D)
},XYZ:function(C,D){return K.xyY.XYZ(C,D)
}}};
this.whitepoint=function(G,D){D=D||"10";
var E=0,F=0,H=0;
if(J[D]&&J[D][G]){E=J[D][G].x;
F=J[D][G].y;
H=J[D][G].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",D,G)
}var C={x:E,y:F,z:(1-E-F),t:H,Y:1};
return this.convert(C,"xyY","XYZ")
};
this.tempToWhitepoint=function(D){if(D<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",D,").");
return{x:0,y:0}
}if(D>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",D,").");
return{x:0,y:0}
}var G=D,H=D*D,I=H*D;
var C=Math.pow(10,9),T=Math.pow(10,6),S=Math.pow(10,3);
if(D<=7000){var E=(-4.607*C/I)+(2.9678*T/H)+(0.09911*S/D)+0.2444063
}else{var E=(-2.0064*C/I)+(1.9018*T/H)+(0.24748*S/D)+0.23704
}var F=-3*E*E+2.87*E-0.275;
return{x:E,y:F}
};
this.primaries=function(C){C=B.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},C||{});
var D=[];
if(O[C.profile]){D=O[C.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",O,".  The profile passed was ",C.profile)
}var H={name:C.profile,gamma:D[0],whitepoint:D[1],xr:D[2],yr:D[3],Yr:D[4],xg:D[5],yg:D[6],Yg:D[7],xb:D[8],yb:D[9],Yb:D[10]};
if(C.whitepoint!=H.whitepoint){var F=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:C.adaptor,source:H.whitepoint,destination:C.whitepoint}),"XYZ","xyY");
var G=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:C.adaptor,source:H.whitepoint,destination:C.whitepoint}),"XYZ","xyY");
var E=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:C.adaptor,source:H.whitepoint,destination:C.whitepoint}),"XYZ","xyY");
H=B.mixin(H,{xr:F.x,yr:F.y,Yr:F.Y,xg:G.x,yg:G.y,Yg:G.Y,xb:E.x,yb:E.y,Yb:E.Y,whitepoint:C.whitepoint})
}return B.mixin(H,{zr:1-H.xr-H.yr,zg:1-H.xg-H.yg,zb:1-H.xb-H.yb})
};
this.adapt=function(G){if(!G.color||!G.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",G)
}G=B.mixin({adaptor:"Bradford",destination:"D65"},G);
var E=this.whitepoint(G.source);
var F=this.whitepoint(G.destination);
if(P[G.adaptor]){var D=P[G.adaptor].ma;
var I=P[G.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",G.adaptor,"' was not found.")
}var C=L.multiply([[E.x,E.y,E.z]],D);
var H=L.multiply([[F.x,F.y,F.z]],D);
var U=[[H[0][0]/C[0][0],0,0],[0,H[0][1]/C[0][1],0],[0,0,H[0][2]/C[0][2]]];
var T=L.multiply(L.multiply(D,U),I);
var V=L.multiply([[G.color.X,G.color.Y,G.color.Z]],T)[0];
return{X:V[0],Y:V[1],Z:V[2]}
};
this.matrix=function(g,G){var f=this.whitepoint(G.whitepoint);
var H=p.xr/p.yr,l=1,c=(1-p.xr-p.yr)/p.yr;
var F=p.xg/p.yg,h=1,b=(1-p.xg-p.yg)/p.yg;
var C=p.xb/p.yb,d=1,c=(1-p.xb-p.yb)/p.yb;
var j=[[H,l,c],[F,h,b],[C,d,Zb]];
var k=[[f.X,f.Y,f.Z]];
var E=dojox.math.matrix.multiply(k,dojox.math.matrix.inverse(j));
var D=E[0][0],i=E[0][1],e=E[0][2];
var I=[[D*H,D*l,D*c],[i*F,i*h,i*b],[e*C,e*d,e*Zb]];
if(g=="RGB"){return dojox.math.inverse(I)
}return I
};
this.epsilon=function(C){return(C||typeof (C)=="undefined")?0.008856:216/24289
};
this.kappa=function(C){return(C||typeof (C)=="undefined")?903.3:24389/27
};
this.convert=function(E,F,C,D){if(A[F]&&A[F][C]){return A[F][C](obj,D)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",E," from ",F," to ",C,".")
}
})();
B.mixin(dojox.color,{fromXYZ:function(Q,T){T=T||{};
var W=dojox.color.Colorspace.primaries(T);
var V=dojox.color.Colorspace.matrix("RGB",W);
var R=dojox.math.matrix.mutliply([[Q.X,Q.Y,Q.Z]],V);
var G=R[0][0],S=R[0][1],P=R[0][2];
if(W.profile=="sRGB"){var U=(G>0.0031308)?(1.055*Math.pow(G,1/2.4))-0.055:12.92*G;
var O=(S>0.0031308)?(1.055*Math.pow(S,1/2.4))-0.055:12.92*S;
var A=(P>0.0031308)?(1.055*Math.pow(P,1/2.4))-0.055:12.92*P
}else{var U=Math.pow(G,1/W.gamma),O=Math.pow(S,1/W.gamma),A=Math.pow(P,1/W.gamma)
}return new dojox.color.Color({r:Math.floor(U*255),g:Math.floor(O*255),b:Math.floor(A*255)})
}});
B.extend(dojox.color.Color,{toXYZ:function(S){S=S||{};
var L=dojox.color.Colorspace.primaries(S);
var A=dojox.color.Colorspace.matrix("XYZ",L);
var N=this.r/255,T=this.g/255,P=this.b/255;
if(L.profile=="sRGB"){var M=(N>0.04045)?Math.pow(((N+0.055)/1.055),2.4):N/12.92;
var R=(T>0.04045)?Math.pow(((T+0.055)/1.055),2.4):T/12.92;
var O=(P>0.04045)?Math.pow(((P+0.055)/1.055),2.4):P/12.92
}else{var M=Math.pow(N,L.gamma),R=Math.pow(T,L.gamma),O=Math.pow(P,L.gamma)
}var Q=dojox.math.matrix([[M,R,O]],A);
return{X:Q[0][0],Y:Q[0][1],Z:Q[0][2]}
}})
}}});