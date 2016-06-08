dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.matrix"]){B._hasResource["dojox.gfx3d.matrix"]=true;
B.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(A){return Math.PI*A/180
};
dojox.gfx3d.matrix._radToDeg=function(A){return A/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(I){if(I){if(typeof I=="number"){this.xx=this.yy=this.zz=I
}else{if(I instanceof Array){if(I.length>0){var J=dojox.gfx3d.matrix.normalize(I[0]);
for(var G=1;
G<I.length;
++G){var H=J;
var A=dojox.gfx3d.matrix.normalize(I[G]);
J=new dojox.gfx3d.matrix.Matrix3D();
J.xx=H.xx*A.xx+H.xy*A.yx+H.xz*A.zx;
J.xy=H.xx*A.xy+H.xy*A.yy+H.xz*A.zy;
J.xz=H.xx*A.xz+H.xy*A.yz+H.xz*A.zz;
J.yx=H.yx*A.xx+H.yy*A.yx+H.yz*A.zx;
J.yy=H.yx*A.xy+H.yy*A.yy+H.yz*A.zy;
J.yz=H.yx*A.xz+H.yy*A.yz+H.yz*A.zz;
J.zx=H.zx*A.xx+H.zy*A.yx+H.zz*A.zx;
J.zy=H.zx*A.xy+H.zy*A.yy+H.zz*A.zy;
J.zz=H.zx*A.xz+H.zy*A.yz+H.zz*A.zz;
J.dx=H.xx*A.dx+H.xy*A.dy+H.xz*A.dz+H.dx;
J.dy=H.yx*A.dx+H.yy*A.dy+H.yz*A.dz+H.dy;
J.dz=H.zx*A.dx+H.zy*A.dy+H.zz*A.dz+H.dz
}B.mixin(this,J)
}}else{B.mixin(this,I)
}}}};
B.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
B.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(E,F,A){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:E,dy:F,dz:A})
}return new dojox.gfx3d.matrix.Matrix3D({dx:E.x,dy:E.y,dz:E.z})
},scale:function(E,F,A){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:E,yy:F,zz:A})
}if(typeof E=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:E,yy:E,zz:E})
}return new dojox.gfx3d.matrix.Matrix3D({xx:E.x,yy:E.y,zz:E.z})
},rotateX:function(E){var A=Math.cos(E);
var F=Math.sin(E);
return new dojox.gfx3d.matrix.Matrix3D({yy:A,yz:-F,zy:F,zz:A})
},rotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},rotateY:function(E){var A=Math.cos(E);
var F=Math.sin(E);
return new dojox.gfx3d.matrix.Matrix3D({xx:A,xz:F,zx:-F,zz:A})
},rotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},rotateZ:function(E){var A=Math.cos(E);
var F=Math.sin(E);
return new dojox.gfx3d.matrix.Matrix3D({xx:A,xy:-F,yx:F,yy:A})
},rotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},cameraTranslate:function(E,F,A){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-E,dy:-F,dz:-A})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-E.x,dy:-E.y,dz:-E.z})
},cameraRotateX:function(E){var A=Math.cos(-E);
var F=Math.sin(-E);
return new dojox.gfx3d.matrix.Matrix3D({yy:A,yz:-F,zy:F,zz:A})
},cameraRotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateY:function(E){var A=Math.cos(-E);
var F=Math.sin(-E);
return new dojox.gfx3d.matrix.Matrix3D({xx:A,xz:F,zx:-F,zz:A})
},cameraRotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateZ:function(E){var A=Math.cos(-E);
var F=Math.sin(-E);
return new dojox.gfx3d.matrix.Matrix3D({xx:A,xy:-F,yx:F,yy:A})
},cameraRotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},normalize:function(A){return(A instanceof dojox.gfx3d.matrix.Matrix3D)?A:new dojox.gfx3d.matrix.Matrix3D(A)
},clone:function(F){var A=new dojox.gfx3d.matrix.Matrix3D();
for(var E in F){if(typeof (F[E])=="number"&&typeof (A[E])=="number"&&A[E]!=F[E]){A[E]=F[E]
}}return A
},invert:function(G){var H=dojox.gfx3d.matrix.normalize(G);
var D=H.xx*H.yy*H.zz+H.xy*H.yz*H.zx+H.xz*H.yx*H.zy-H.xx*H.yz*H.zy-H.xy*H.yx*H.zz-H.xz*H.yy*H.zx;
var A=new dojox.gfx3d.matrix.Matrix3D({xx:(H.yy*H.zz-H.yz*H.zy)/D,xy:(H.xz*H.zy-H.xy*H.zz)/D,xz:(H.xy*H.yz-H.xz*H.yy)/D,yx:(H.yz*H.zx-H.yx*H.zz)/D,yy:(H.xx*H.zz-H.xz*H.zx)/D,yz:(H.xz*H.yx-H.xx*H.yz)/D,zx:(H.yx*H.zy-H.yy*H.zx)/D,zy:(H.xy*H.zx-H.xx*H.zy)/D,zz:(H.xx*H.yy-H.xy*H.yx)/D,dx:-1*(H.xy*H.yz*H.dz+H.xz*H.dy*H.zy+H.dx*H.yy*H.zz-H.xy*H.dy*H.zz-H.xz*H.yy*H.dz-H.dx*H.yz*H.zy)/D,dy:(H.xx*H.yz*H.dz+H.xz*H.dy*H.zx+H.dx*H.yx*H.zz-H.xx*H.dy*H.zz-H.xz*H.yx*H.dz-H.dx*H.yz*H.zx)/D,dz:-1*(H.xx*H.yy*H.dz+H.xy*H.dy*H.zx+H.dx*H.yx*H.zy-H.xx*H.dy*H.zy-H.xy*H.yx*H.dz-H.dx*H.yy*H.zx)/D});
return A
},_multiplyPoint:function(G,H,A,F){return{x:G.xx*H+G.xy*A+G.xz*F+G.dx,y:G.yx*H+G.yy*A+G.yz*F+G.dy,z:G.zx*H+G.zy*A+G.zz*F+G.dz}
},multiplyPoint:function(G,H,I,A){var J=dojox.gfx3d.matrix.normalize(G);
if(typeof H=="number"&&typeof I=="number"&&typeof A=="number"){return dojox.gfx3d.matrix._multiplyPoint(J,H,I,A)
}return dojox.gfx3d.matrix._multiplyPoint(J,H.x,H.y,H.z)
},multiply:function(H){var J=dojox.gfx3d.matrix.normalize(H);
for(var G=1;
G<arguments.length;
++G){var I=J;
var A=dojox.gfx3d.matrix.normalize(arguments[G]);
J=new dojox.gfx3d.matrix.Matrix3D();
J.xx=I.xx*A.xx+I.xy*A.yx+I.xz*A.zx;
J.xy=I.xx*A.xy+I.xy*A.yy+I.xz*A.zy;
J.xz=I.xx*A.xz+I.xy*A.yz+I.xz*A.zz;
J.yx=I.yx*A.xx+I.yy*A.yx+I.yz*A.zx;
J.yy=I.yx*A.xy+I.yy*A.yy+I.yz*A.zy;
J.yz=I.yx*A.xz+I.yy*A.yz+I.yz*A.zz;
J.zx=I.zx*A.xx+I.zy*A.yx+I.zz*A.zx;
J.zy=I.zx*A.xy+I.zy*A.yy+I.zz*A.zy;
J.zz=I.zx*A.xz+I.zy*A.yz+I.zz*A.zz;
J.dx=I.xx*A.dx+I.xy*A.dy+I.xz*A.dz+I.dx;
J.dy=I.yx*A.dx+I.yy*A.dy+I.yz*A.dz+I.dy;
J.dz=I.zx*A.dx+I.zy*A.dy+I.zz*A.dz+I.dz
}return J
},_project:function(G,H,A,F){return{x:G.xx*H+G.xy*A+G.xz*F+G.dx,y:G.yx*H+G.yy*A+G.yz*F+G.dy,z:G.zx*H+G.zy*A+G.zz*F+G.dz}
},project:function(G,H,I,A){var J=dojox.gfx3d.matrix.normalize(G);
if(typeof H=="number"&&typeof I=="number"&&typeof A=="number"){return dojox.gfx3d.matrix._project(J,H,I,A)
}return dojox.gfx3d.matrix._project(J,H.x,H.y,H.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
}}});