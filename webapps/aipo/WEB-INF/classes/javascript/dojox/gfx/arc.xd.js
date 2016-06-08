dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.arc"],["require","dojox.gfx.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.arc"]){B._hasResource["dojox.gfx.arc"]=true;
B.provide("dojox.gfx.arc");
B.require("dojox.gfx.matrix");
(function(){var N=dojox.gfx.matrix,I=function(C){var E=Math.cos(C),F=Math.sin(C),D={x:E+(4/3)*(1-E),y:F-(4/3)*E*(1-E)/F};
return{s:{x:E,y:-F},c1:{x:D.x,y:-D.y},c2:D,e:{x:E,y:F}}
},L=2*Math.PI,J=Math.PI/4,M=Math.PI/8,K=J+M,A=I(M);
B.mixin(dojox.gfx.arc,{unitArcAsBezier:I,curvePI4:A,arcAsBezier:function(H,s,t,AC,z,C,F,G){z=Boolean(z);
C=Boolean(C);
var AO=N._degToRad(AC),AE=s*s,w=t*t,y=N.multiplyPoint(N.rotate(-AO),{x:(H.x-F)/2,y:(H.y-G)/2}),x=y.x*y.x,D=y.y*y.y,AJ=Math.sqrt((AE*w-AE*D-w*x)/(AE*D+w*x));
if(isNaN(AJ)){AJ=0
}var AL={x:AJ*s*y.y/t,y:-AJ*t*y.x/s};
if(z==C){AL={x:-AL.x,y:-AL.y}
}var AD=N.multiplyPoint([N.translate((H.x+F)/2,(H.y+G)/2),N.rotate(AO)],AL);
var u=N.normalize([N.translate(AD.x,AD.y),N.rotate(AO),N.scale(s,t)]);
var AA=N.invert(u),AH=N.multiplyPoint(AA,H),AB=N.multiplyPoint(AA,F,G),AI=Math.atan2(AH.y,AH.x),AK=Math.atan2(AB.y,AB.x),c=AI-AK;
if(C){c=-c
}if(c<0){c+=L
}else{if(c>L){c-=L
}}var v=M,AN=A,r=C?v:-v,E=[];
for(var AG=c;
AG>0;
AG-=J){if(AG<K){v=AG/2;
AN=I(v);
r=C?v:-v;
AG=0
}var AJ,AM,AF,e=N.normalize([u,N.rotate(AI+r)]);
if(C){AJ=N.multiplyPoint(e,AN.c1);
AM=N.multiplyPoint(e,AN.c2);
AF=N.multiplyPoint(e,AN.e)
}else{AJ=N.multiplyPoint(e,AN.c2);
AM=N.multiplyPoint(e,AN.c1);
AF=N.multiplyPoint(e,AN.s)
}E.push([AJ.x,AJ.y,AM.x,AM.y,AF.x,AF.y]);
AI+=2*r
}return E
}})
})()
}}});