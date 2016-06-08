dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.lighting"],["require","dojox.gfx._base"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.lighting"]){B._hasResource["dojox.gfx3d.lighting"]=true;
B.provide("dojox.gfx3d.lighting");
B.require("dojox.gfx._base");
(function(){var A=dojox.gfx3d.lighting;
B.mixin(dojox.gfx3d.lighting,{black:function(){return{r:0,g:0,b:0,a:1}
},white:function(){return{r:1,g:1,b:1,a:1}
},toStdColor:function(D){D=dojox.gfx.normalizeColor(D);
return{r:D.r/255,g:D.g/255,b:D.b/255,a:D.a}
},fromStdColor:function(D){return new B.Color([Math.round(255*D.r),Math.round(255*D.g),Math.round(255*D.b),D.a])
},scaleColor:function(F,E){return{r:F*E.r,g:F*E.g,b:F*E.b,a:F*E.a}
},addColor:function(E,F){return{r:E.r+F.r,g:E.g+F.g,b:E.b+F.b,a:E.a+F.a}
},multiplyColor:function(E,F){return{r:E.r*F.r,g:E.g*F.g,b:E.b*F.b,a:E.a*F.a}
},saturateColor:function(D){return{r:D.r<0?0:D.r>1?1:D.r,g:D.g<0?0:D.g>1?1:D.g,b:D.b<0?0:D.b>1?1:D.b,a:D.a<0?0:D.a>1?1:D.a}
},mixColor:function(F,H,G){return A.addColor(A.scaleColor(G,F),A.scaleColor(1-G,H))
},diff2Color:function(K,L){var I=K.r-L.r;
var J=K.g-L.g;
var N=K.b-L.b;
var M=K.a-L.a;
return I*I+J*J+N*N+M*M
},length2Color:function(D){return D.r*D.r+D.g*D.g+D.b*D.b+D.a*D.a
},dot:function(E,F){return E.x*F.x+E.y*F.y+E.z*F.z
},scale:function(E,F){return{x:E*F.x,y:E*F.y,z:E*F.z}
},add:function(E,F){return{x:E.x+F.x,y:E.y+F.y,z:E.z+F.z}
},saturate:function(D){return Math.min(Math.max(D,0),1)
},length:function(D){return Math.sqrt(dojox.gfx3d.lighting.dot(D,D))
},normalize:function(D){return A.scale(1/A.length(D),D)
},faceforward:function(G,J){var H=dojox.gfx3d.lighting;
var I=H.dot(J,G)<0?1:-1;
return H.scale(I,G)
},reflect:function(H,F){var G=dojox.gfx3d.lighting;
return G.add(H,G.scale(-2*G.dot(H,F),F))
},diffuse:function(K,M){var I=A.black();
for(var L=0;
L<M.length;
++L){var N=M[L],J=A.dot(A.normalize(N.direction),K);
I=A.addColor(I,A.scaleColor(J,N.color))
}return A.saturateColor(I)
},specular:function(Q,O,R,L){var P=A.black();
for(var T=0;
T<L.length;
++T){var M=L[T],S=A.normalize(A.add(A.normalize(M.direction),O)),N=Math.pow(Math.max(0,A.dot(Q,S)),1/R);
P=A.addColor(P,A.scaleColor(N,M.color))
}return A.saturateColor(P)
},phong:function(R,P,N,T){R=A.normalize(R);
var Q=A.black();
for(var S=0;
S<T.length;
++S){var L=T[S],M=A.reflect(A.scale(-1,A.normalize(P)),R),O=Math.pow(Math.max(0,A.dot(M,A.normalize(L.direction))),N);
Q=A.addColor(Q,A.scaleColor(O,L.color))
}return A.saturateColor(Q)
}});
B.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(K,M,J,I){this.incident=A.normalize(K);
this.lights=[];
for(var L=0;
L<M.length;
++L){var N=M[L];
this.lights.push({direction:A.normalize(N.direction),color:A.toStdColor(N.color)})
}this.ambient=A.toStdColor(J.color?J.color:"white");
this.ambient=A.scaleColor(J.intensity,this.ambient);
this.ambient=A.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=A.toStdColor(I?I:"white");
this.specular=A.scaleColor(this.specular.a,this.specular);
this.specular.a=1;
this.npr_cool={r:0,g:0,b:0.4,a:1};
this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};
this.npr_alpha=0.2;
this.npr_beta=0.6;
this.npr_scale=0.6
},constant:function(H,K,J){J=A.toStdColor(J);
var I=J.a,L=A.scaleColor(I,J);
L.a=I;
return A.fromStdColor(A.saturateColor(L))
},matte:function(K,N,M){if(typeof N=="string"){N=A.finish[N]
}M=A.toStdColor(M);
K=A.faceforward(A.normalize(K),this.incident);
var L=A.scaleColor(N.Ka,this.ambient),J=A.saturate(-4*A.dot(K,this.incident)),O=A.scaleColor(J*N.Kd,A.diffuse(K,this.lights)),P=A.scaleColor(M.a,A.multiplyColor(M,A.addColor(L,O)));
P.a=M.a;
return A.fromStdColor(A.saturateColor(P))
},metal:function(M,P,O){if(typeof P=="string"){P=A.finish[P]
}O=A.toStdColor(O);
M=A.faceforward(A.normalize(M),this.incident);
var Q=A.scale(-1,this.incident),K,R,N=A.scaleColor(P.Ka,this.ambient),L=A.saturate(-4*A.dot(M,this.incident));
if("phong" in P){K=A.scaleColor(L*P.Ks*P.phong,A.phong(M,Q,P.phong_size,this.lights))
}else{K=A.scaleColor(L*P.Ks,A.specular(M,Q,P.roughness,this.lights))
}R=A.scaleColor(O.a,A.addColor(A.multiplyColor(O,N),A.multiplyColor(this.specular,K)));
R.a=O.a;
return A.fromStdColor(A.saturateColor(R))
},plastic:function(T,R,M){if(typeof R=="string"){R=A.finish[R]
}M=A.toStdColor(M);
T=A.faceforward(A.normalize(T),this.incident);
var O=A.scale(-1,this.incident),Q,L,S=A.scaleColor(R.Ka,this.ambient),P=A.saturate(-4*A.dot(T,this.incident)),N=A.scaleColor(P*R.Kd,A.diffuse(T,this.lights));
if("phong" in R){Q=A.scaleColor(P*R.Ks*R.phong,A.phong(T,O,R.phong_size,this.lights))
}else{Q=A.scaleColor(P*R.Ks,A.specular(T,O,R.roughness,this.lights))
}L=A.scaleColor(M.a,A.addColor(A.multiplyColor(M,A.addColor(S,N)),A.multiplyColor(this.specular,Q)));
L.a=M.a;
return A.fromStdColor(A.saturateColor(L))
},npr:function(V,R,N){if(typeof R=="string"){R=A.finish[R]
}N=A.toStdColor(N);
V=A.faceforward(A.normalize(V),this.incident);
var S=A.scaleColor(R.Ka,this.ambient),Q=A.saturate(-4*A.dot(V,this.incident)),P=A.scaleColor(Q*R.Kd,A.diffuse(V,this.lights)),M=A.scaleColor(N.a,A.multiplyColor(N,A.addColor(S,P))),O=A.addColor(this.npr_cool,A.scaleColor(this.npr_alpha,M)),T=A.addColor(this.npr_warm,A.scaleColor(this.npr_beta,M)),U=(1+A.dot(this.incident,V))/2,M=A.scaleColor(this.npr_scale,A.addColor(M,A.mixColor(O,T,U)));
M.a=N.a;
return A.fromStdColor(A.saturateColor(M))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
}}});