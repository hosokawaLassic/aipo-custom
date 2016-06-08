if(!dojo._hasResource["dojox.gfx3d.lighting"]){dojo._hasResource["dojox.gfx3d.lighting"]=true;
dojo.provide("dojox.gfx3d.lighting");
dojo.require("dojox.gfx._base");
(function(){var B=dojox.gfx3d.lighting;
dojo.mixin(dojox.gfx3d.lighting,{black:function(){return{r:0,g:0,b:0,a:1}
},white:function(){return{r:1,g:1,b:1,a:1}
},toStdColor:function(A){A=dojox.gfx.normalizeColor(A);
return{r:A.r/255,g:A.g/255,b:A.b/255,a:A.a}
},fromStdColor:function(A){return new dojo.Color([Math.round(255*A.r),Math.round(255*A.g),Math.round(255*A.b),A.a])
},scaleColor:function(D,A){return{r:D*A.r,g:D*A.g,b:D*A.b,a:D*A.a}
},addColor:function(A,D){return{r:A.r+D.r,g:A.g+D.g,b:A.b+D.b,a:A.a+D.a}
},multiplyColor:function(A,D){return{r:A.r*D.r,g:A.g*D.g,b:A.b*D.b,a:A.a*D.a}
},saturateColor:function(A){return{r:A.r<0?0:A.r>1?1:A.r,g:A.g<0?0:A.g>1?1:A.g,b:A.b<0?0:A.b>1?1:A.b,a:A.a<0?0:A.a>1?1:A.a}
},mixColor:function(A,F,E){return B.addColor(B.scaleColor(E,A),B.scaleColor(1-E,F))
},diff2Color:function(I,J){var A=I.r-J.r;
var H=I.g-J.g;
var L=I.b-J.b;
var K=I.a-J.a;
return A*A+H*H+L*L+K*K
},length2Color:function(A){return A.r*A.r+A.g*A.g+A.b*A.b+A.a*A.a
},dot:function(A,D){return A.x*D.x+A.y*D.y+A.z*D.z
},scale:function(A,D){return{x:A*D.x,y:A*D.y,z:A*D.z}
},add:function(A,D){return{x:A.x+D.x,y:A.y+D.y,z:A.z+D.z}
},saturate:function(A){return Math.min(Math.max(A,0),1)
},length:function(A){return Math.sqrt(dojox.gfx3d.lighting.dot(A,A))
},normalize:function(A){return B.scale(1/B.length(A),A)
},faceforward:function(A,H){var F=dojox.gfx3d.lighting;
var G=F.dot(H,A)<0?1:-1;
return F.scale(G,A)
},reflect:function(F,A){var E=dojox.gfx3d.lighting;
return E.add(F,E.scale(-2*E.dot(F,A),A))
},diffuse:function(I,K){var A=B.black();
for(var J=0;
J<K.length;
++J){var L=K[J],H=B.dot(B.normalize(L.direction),I);
A=B.addColor(A,B.scaleColor(H,L.color))
}return B.saturateColor(A)
},specular:function(P,N,Q,K){var O=B.black();
for(var A=0;
A<K.length;
++A){var L=K[A],R=B.normalize(B.add(B.normalize(L.direction),N)),M=Math.pow(Math.max(0,B.dot(P,R)),1/Q);
O=B.addColor(O,B.scaleColor(M,L.color))
}return B.saturateColor(O)
},phong:function(Q,O,M,A){Q=B.normalize(Q);
var P=B.black();
for(var R=0;
R<A.length;
++R){var K=A[R],L=B.reflect(B.scale(-1,B.normalize(O)),Q),N=Math.pow(Math.max(0,B.dot(L,B.normalize(K.direction))),M);
P=B.addColor(P,B.scaleColor(N,K.color))
}return B.saturateColor(P)
}});
dojo.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(I,K,H,A){this.incident=B.normalize(I);
this.lights=[];
for(var J=0;
J<K.length;
++J){var L=K[J];
this.lights.push({direction:B.normalize(L.direction),color:B.toStdColor(L.color)})
}this.ambient=B.toStdColor(H.color?H.color:"white");
this.ambient=B.scaleColor(H.intensity,this.ambient);
this.ambient=B.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=B.toStdColor(A?A:"white");
this.specular=B.scaleColor(this.specular.a,this.specular);
this.specular.a=1;
this.npr_cool={r:0,g:0,b:0.4,a:1};
this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};
this.npr_alpha=0.2;
this.npr_beta=0.6;
this.npr_scale=0.6
},constant:function(A,I,H){H=B.toStdColor(H);
var G=H.a,J=B.scaleColor(G,H);
J.a=G;
return B.fromStdColor(B.saturateColor(J))
},matte:function(I,L,K){if(typeof L=="string"){L=B.finish[L]
}K=B.toStdColor(K);
I=B.faceforward(B.normalize(I),this.incident);
var J=B.scaleColor(L.Ka,this.ambient),A=B.saturate(-4*B.dot(I,this.incident)),M=B.scaleColor(A*L.Kd,B.diffuse(I,this.lights)),N=B.scaleColor(K.a,B.multiplyColor(K,B.addColor(J,M)));
N.a=K.a;
return B.fromStdColor(B.saturateColor(N))
},metal:function(K,N,M){if(typeof N=="string"){N=B.finish[N]
}M=B.toStdColor(M);
K=B.faceforward(B.normalize(K),this.incident);
var O=B.scale(-1,this.incident),A,P,L=B.scaleColor(N.Ka,this.ambient),J=B.saturate(-4*B.dot(K,this.incident));
if("phong" in N){A=B.scaleColor(J*N.Ks*N.phong,B.phong(K,O,N.phong_size,this.lights))
}else{A=B.scaleColor(J*N.Ks,B.specular(K,O,N.roughness,this.lights))
}P=B.scaleColor(M.a,B.addColor(B.multiplyColor(M,L),B.multiplyColor(this.specular,A)));
P.a=M.a;
return B.fromStdColor(B.saturateColor(P))
},plastic:function(A,Q,L){if(typeof Q=="string"){Q=B.finish[Q]
}L=B.toStdColor(L);
A=B.faceforward(B.normalize(A),this.incident);
var N=B.scale(-1,this.incident),P,K,R=B.scaleColor(Q.Ka,this.ambient),O=B.saturate(-4*B.dot(A,this.incident)),M=B.scaleColor(O*Q.Kd,B.diffuse(A,this.lights));
if("phong" in Q){P=B.scaleColor(O*Q.Ks*Q.phong,B.phong(A,N,Q.phong_size,this.lights))
}else{P=B.scaleColor(O*Q.Ks,B.specular(A,N,Q.roughness,this.lights))
}K=B.scaleColor(L.a,B.addColor(B.multiplyColor(L,B.addColor(R,M)),B.multiplyColor(this.specular,P)));
K.a=L.a;
return B.fromStdColor(B.saturateColor(K))
},npr:function(A,Q,M){if(typeof Q=="string"){Q=B.finish[Q]
}M=B.toStdColor(M);
A=B.faceforward(B.normalize(A),this.incident);
var R=B.scaleColor(Q.Ka,this.ambient),P=B.saturate(-4*B.dot(A,this.incident)),O=B.scaleColor(P*Q.Kd,B.diffuse(A,this.lights)),L=B.scaleColor(M.a,B.multiplyColor(M,B.addColor(R,O))),N=B.addColor(this.npr_cool,B.scaleColor(this.npr_alpha,L)),S=B.addColor(this.npr_warm,B.scaleColor(this.npr_beta,L)),T=(1+B.dot(this.incident,A))/2,L=B.scaleColor(this.npr_scale,B.addColor(L,B.mixColor(N,S,T)));
L.a=M.a;
return B.fromStdColor(B.saturateColor(L))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
};