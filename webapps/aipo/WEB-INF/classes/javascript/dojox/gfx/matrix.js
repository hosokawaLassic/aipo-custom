if(!dojo._hasResource["dojox.gfx.matrix"]){dojo._hasResource["dojox.gfx.matrix"]=true;
dojo.provide("dojox.gfx.matrix");
(function(){var B=dojox.gfx.matrix;
B._degToRad=function(A){return Math.PI*A/180
};
B._radToDeg=function(A){return A/Math.PI*180
};
B.Matrix2D=function(J){if(J){if(typeof J=="number"){this.xx=this.yy=J
}else{if(J instanceof Array){if(J.length>0){var H=B.normalize(J[0]);
for(var G=1;
G<J.length;
++G){var I=H,A=dojox.gfx.matrix.normalize(J[G]);
H=new B.Matrix2D();
H.xx=I.xx*A.xx+I.xy*A.yx;
H.xy=I.xx*A.xy+I.xy*A.yy;
H.yx=I.yx*A.xx+I.yy*A.yx;
H.yy=I.yx*A.xy+I.yy*A.yy;
H.dx=I.xx*A.dx+I.xy*A.dy+I.dx;
H.dy=I.yx*A.dx+I.yy*A.dy+I.dy
}dojo.mixin(this,H)
}}else{dojo.mixin(this,J)
}}}};
dojo.extend(B.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
dojo.mixin(B,{identity:new B.Matrix2D(),flipX:new B.Matrix2D({xx:-1}),flipY:new B.Matrix2D({yy:-1}),flipXY:new B.Matrix2D({xx:-1,yy:-1}),translate:function(A,D){if(arguments.length>1){return new B.Matrix2D({dx:A,dy:D})
}return new B.Matrix2D({dx:A.x,dy:A.y})
},scale:function(A,D){if(arguments.length>1){return new B.Matrix2D({xx:A,yy:D})
}if(typeof A=="number"){return new B.Matrix2D({xx:A,yy:A})
}return new B.Matrix2D({xx:A.x,yy:A.y})
},rotate:function(E){var A=Math.cos(E);
var F=Math.sin(E);
return new B.Matrix2D({xx:A,xy:-F,yx:F,yy:A})
},rotateg:function(A){return B.rotate(B._degToRad(A))
},skewX:function(A){return new B.Matrix2D({xy:-Math.tan(A)})
},skewXg:function(A){return B.skewX(B._degToRad(A))
},skewY:function(A){return new B.Matrix2D({yx:Math.tan(A)})
},skewYg:function(A){return B.skewY(B._degToRad(A))
},reflect:function(J,K){if(arguments.length==1){K=J.y;
J=J.x
}var L=J*J,I=K*K,H=L+I,A=2*J*K/H;
return new B.Matrix2D({xx:2*L/H-1,xy:A,yx:A,yy:2*I/H-1})
},project:function(J,K){if(arguments.length==1){K=J.y;
J=J.x
}var L=J*J,I=K*K,H=L+I,A=J*K/H;
return new B.Matrix2D({xx:L/H,xy:A,yx:A,yy:I/H})
},normalize:function(A){return(A instanceof B.Matrix2D)?A:new B.Matrix2D(A)
},clone:function(F){var A=new B.Matrix2D();
for(var E in F){if(typeof (F[E])=="number"&&typeof (A[E])=="number"&&A[E]!=F[E]){A[E]=F[E]
}}return A
},invert:function(F){var A=B.normalize(F),D=A.xx*A.yy-A.xy*A.yx,A=new B.Matrix2D({xx:A.yy/D,xy:-A.xy/D,yx:-A.yx/D,yy:A.xx/D,dx:(A.xy*A.dy-A.yy*A.dx)/D,dy:(A.yx*A.dx-A.xx*A.dy)/D});
return A
},_multiplyPoint:function(E,F,A){return{x:E.xx*F+E.xy*A+E.dx,y:E.yx*F+E.yy*A+E.dy}
},multiplyPoint:function(F,G,H){var A=B.normalize(F);
if(typeof G=="number"&&typeof H=="number"){return B._multiplyPoint(A,G,H)
}return B._multiplyPoint(A,G.x,G.y)
},multiply:function(I){var A=B.normalize(I);
for(var H=1;
H<arguments.length;
++H){var J=A,G=B.normalize(arguments[H]);
A=new B.Matrix2D();
A.xx=J.xx*G.xx+J.xy*G.yx;
A.xy=J.xx*G.xy+J.xy*G.yy;
A.yx=J.yx*G.xx+J.yy*G.yx;
A.yy=J.yx*G.xy+J.yy*G.yy;
A.dx=J.xx*G.dx+J.xy*G.dy+J.dx;
A.dy=J.yx*G.dx+J.yy*G.dy+J.dy
}return A
},_sandwich:function(E,F,A){return B.multiply(B.translate(F,A),E,B.translate(-F,-A))
},scaleAt:function(G,H,A,F){switch(arguments.length){case 4:return B._sandwich(B.scale(G,H),A,F);
case 3:if(typeof A=="number"){return B._sandwich(B.scale(G),H,A)
}return B._sandwich(B.scale(G,H),A.x,A.y)
}return B._sandwich(B.scale(G),H.x,H.y)
},rotateAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.rotate(A),E,F)
}return B._sandwich(B.rotate(A),E.x,E.y)
},rotategAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.rotateg(A),E,F)
}return B._sandwich(B.rotateg(A),E.x,E.y)
},skewXAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.skewX(A),E,F)
}return B._sandwich(B.skewX(A),E.x,E.y)
},skewXgAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.skewXg(A),E,F)
}return B._sandwich(B.skewXg(A),E.x,E.y)
},skewYAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.skewY(A),E,F)
}return B._sandwich(B.skewY(A),E.x,E.y)
},skewYgAt:function(A,E,F){if(arguments.length>2){return B._sandwich(B.skewYg(A),E,F)
}return B._sandwich(B.skewYg(A),E.x,E.y)
}})
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D
};