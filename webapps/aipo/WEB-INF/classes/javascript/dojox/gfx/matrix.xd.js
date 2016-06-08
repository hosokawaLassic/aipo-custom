dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.matrix"]){B._hasResource["dojox.gfx.matrix"]=true;
B.provide("dojox.gfx.matrix");
(function(){var A=dojox.gfx.matrix;
A._degToRad=function(D){return Math.PI*D/180
};
A._radToDeg=function(D){return D/Math.PI*180
};
A.Matrix2D=function(L){if(L){if(typeof L=="number"){this.xx=this.yy=L
}else{if(L instanceof Array){if(L.length>0){var J=A.normalize(L[0]);
for(var I=1;
I<L.length;
++I){var K=J,H=dojox.gfx.matrix.normalize(L[I]);
J=new A.Matrix2D();
J.xx=K.xx*H.xx+K.xy*H.yx;
J.xy=K.xx*H.xy+K.xy*H.yy;
J.yx=K.yx*H.xx+K.yy*H.yx;
J.yy=K.yx*H.xy+K.yy*H.yy;
J.dx=K.xx*H.dx+K.xy*H.dy+K.dx;
J.dy=K.yx*H.dx+K.yy*H.dy+K.dy
}B.mixin(this,J)
}}else{B.mixin(this,L)
}}}};
B.extend(A.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
B.mixin(A,{identity:new A.Matrix2D(),flipX:new A.Matrix2D({xx:-1}),flipY:new A.Matrix2D({yy:-1}),flipXY:new A.Matrix2D({xx:-1,yy:-1}),translate:function(E,F){if(arguments.length>1){return new A.Matrix2D({dx:E,dy:F})
}return new A.Matrix2D({dx:E.x,dy:E.y})
},scale:function(E,F){if(arguments.length>1){return new A.Matrix2D({xx:E,yy:F})
}if(typeof E=="number"){return new A.Matrix2D({xx:E,yy:E})
}return new A.Matrix2D({xx:E.x,yy:E.y})
},rotate:function(G){var F=Math.cos(G);
var H=Math.sin(G);
return new A.Matrix2D({xx:F,xy:-H,yx:H,yy:F})
},rotateg:function(D){return A.rotate(A._degToRad(D))
},skewX:function(D){return new A.Matrix2D({xy:-Math.tan(D)})
},skewXg:function(D){return A.skewX(A._degToRad(D))
},skewY:function(D){return new A.Matrix2D({yx:Math.tan(D)})
},skewYg:function(D){return A.skewY(A._degToRad(D))
},reflect:function(L,M){if(arguments.length==1){M=L.y;
L=L.x
}var N=L*L,K=M*M,J=N+K,I=2*L*M/J;
return new A.Matrix2D({xx:2*N/J-1,xy:I,yx:I,yy:2*K/J-1})
},project:function(L,M){if(arguments.length==1){M=L.y;
L=L.x
}var N=L*L,K=M*M,J=N+K,I=L*M/J;
return new A.Matrix2D({xx:N/J,xy:I,yx:I,yy:K/J})
},normalize:function(D){return(D instanceof A.Matrix2D)?D:new A.Matrix2D(D)
},clone:function(H){var F=new A.Matrix2D();
for(var G in H){if(typeof (H[G])=="number"&&typeof (F[G])=="number"&&F[G]!=H[G]){F[G]=H[G]
}}return F
},invert:function(H){var D=A.normalize(H),G=D.xx*D.yy-D.xy*D.yx,D=new A.Matrix2D({xx:D.yy/G,xy:-D.xy/G,yx:-D.yx/G,yy:D.xx/G,dx:(D.xy*D.dy-D.yy*D.dx)/G,dy:(D.yx*D.dx-D.xx*D.dy)/G});
return D
},_multiplyPoint:function(G,H,F){return{x:G.xx*H+G.xy*F+G.dx,y:G.yx*H+G.yy*F+G.dy}
},multiplyPoint:function(H,I,J){var G=A.normalize(H);
if(typeof I=="number"&&typeof J=="number"){return A._multiplyPoint(G,I,J)
}return A._multiplyPoint(G,I.x,I.y)
},multiply:function(K){var H=A.normalize(K);
for(var J=1;
J<arguments.length;
++J){var L=H,I=A.normalize(arguments[J]);
H=new A.Matrix2D();
H.xx=L.xx*I.xx+L.xy*I.yx;
H.xy=L.xx*I.xy+L.xy*I.yy;
H.yx=L.yx*I.xx+L.yy*I.yx;
H.yy=L.yx*I.xy+L.yy*I.yy;
H.dx=L.xx*I.dx+L.xy*I.dy+L.dx;
H.dy=L.yx*I.dx+L.yy*I.dy+L.dy
}return H
},_sandwich:function(G,H,F){return A.multiply(A.translate(H,F),G,A.translate(-H,-F))
},scaleAt:function(I,J,G,H){switch(arguments.length){case 4:return A._sandwich(A.scale(I,J),G,H);
case 3:if(typeof G=="number"){return A._sandwich(A.scale(I),J,G)
}return A._sandwich(A.scale(I,J),G.x,G.y)
}return A._sandwich(A.scale(I),J.x,J.y)
},rotateAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.rotate(F),G,H)
}return A._sandwich(A.rotate(F),G.x,G.y)
},rotategAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.rotateg(F),G,H)
}return A._sandwich(A.rotateg(F),G.x,G.y)
},skewXAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.skewX(F),G,H)
}return A._sandwich(A.skewX(F),G.x,G.y)
},skewXgAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.skewXg(F),G,H)
}return A._sandwich(A.skewXg(F),G.x,G.y)
},skewYAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.skewY(F),G,H)
}return A._sandwich(A.skewY(F),G.x,G.y)
},skewYgAt:function(F,G,H){if(arguments.length>2){return A._sandwich(A.skewYg(F),G,H)
}return A._sandwich(A.skewYg(F),G.x,G.y)
}})
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D
}}});