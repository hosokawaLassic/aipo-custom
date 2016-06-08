if(!dojo._hasResource["dojox.gfx.arc"]){dojo._hasResource["dojox.gfx.arc"]=true;
dojo.provide("dojox.gfx.arc");
dojo.require("dojox.gfx.matrix");
(function(){var H=dojox.gfx.matrix,J=function(A){var C=Math.cos(A),D=Math.sin(A),B={x:C+(4/3)*(1-C),y:D-(4/3)*C*(1-C)/D};
return{s:{x:C,y:-D},c1:{x:B.x,y:-B.y},c2:B,e:{x:C,y:D}}
},M=2*Math.PI,K=Math.PI/4,N=Math.PI/8,L=K+N,I=J(N);
dojo.mixin(dojox.gfx.arc,{unitArcAsBezier:J,curvePI4:I,arcAsBezier:function(G,r,s,AB,y,B,E,F){y=Boolean(y);
B=Boolean(B);
var A=H._degToRad(AB),AD=r*r,v=s*s,x=H.multiplyPoint(H.rotate(-A),{x:(G.x-E)/2,y:(G.y-F)/2}),w=x.x*x.x,C=x.y*x.y,AI=Math.sqrt((AD*v-AD*C-v*w)/(AD*C+v*w));
if(isNaN(AI)){AI=0
}var AK={x:AI*r*x.y/s,y:-AI*s*x.x/r};
if(y==B){AK={x:-AK.x,y:-AK.y}
}var AC=H.multiplyPoint([H.translate((G.x+E)/2,(G.y+F)/2),H.rotate(A)],AK);
var t=H.normalize([H.translate(AC.x,AC.y),H.rotate(A),H.scale(r,s)]);
var z=H.invert(t),AG=H.multiplyPoint(z,G),AA=H.multiplyPoint(z,E,F),AH=Math.atan2(AG.y,AG.x),AJ=Math.atan2(AA.y,AA.x),c=AH-AJ;
if(B){c=-c
}if(c<0){c+=M
}else{if(c>M){c-=M
}}var u=N,AM=I,q=B?u:-u,D=[];
for(var AF=c;
AF>0;
AF-=K){if(AF<L){u=AF/2;
AM=J(u);
q=B?u:-u;
AF=0
}var AI,AL,AE,e=H.normalize([t,H.rotate(AH+q)]);
if(B){AI=H.multiplyPoint(e,AM.c1);
AL=H.multiplyPoint(e,AM.c2);
AE=H.multiplyPoint(e,AM.e)
}else{AI=H.multiplyPoint(e,AM.c2);
AL=H.multiplyPoint(e,AM.c1);
AE=H.multiplyPoint(e,AM.s)
}D.push([AI.x,AI.y,AL.x,AL.y,AE.x,AE.y]);
AH+=2*q
}return D
}})
})()
};