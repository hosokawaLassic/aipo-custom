if(!dojo._hasResource["dojox.gfx3d.matrix"]){dojo._hasResource["dojox.gfx3d.matrix"]=true;
dojo.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(B){return Math.PI*B/180
};
dojox.gfx3d.matrix._radToDeg=function(B){return B/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(J){if(J){if(typeof J=="number"){this.xx=this.yy=this.zz=J
}else{if(J instanceof Array){if(J.length>0){var F=dojox.gfx3d.matrix.normalize(J[0]);
for(var H=1;
H<J.length;
++H){var I=F;
var G=dojox.gfx3d.matrix.normalize(J[H]);
F=new dojox.gfx3d.matrix.Matrix3D();
F.xx=I.xx*G.xx+I.xy*G.yx+I.xz*G.zx;
F.xy=I.xx*G.xy+I.xy*G.yy+I.xz*G.zy;
F.xz=I.xx*G.xz+I.xy*G.yz+I.xz*G.zz;
F.yx=I.yx*G.xx+I.yy*G.yx+I.yz*G.zx;
F.yy=I.yx*G.xy+I.yy*G.yy+I.yz*G.zy;
F.yz=I.yx*G.xz+I.yy*G.yz+I.yz*G.zz;
F.zx=I.zx*G.xx+I.zy*G.yx+I.zz*G.zx;
F.zy=I.zx*G.xy+I.zy*G.yy+I.zz*G.zy;
F.zz=I.zx*G.xz+I.zy*G.yz+I.zz*G.zz;
F.dx=I.xx*G.dx+I.xy*G.dy+I.xz*G.dz+I.dx;
F.dy=I.yx*G.dx+I.yy*G.dy+I.yz*G.dz+I.dy;
F.dz=I.zx*G.dx+I.zy*G.dy+I.zz*G.dz+I.dz
}dojo.mixin(this,F)
}}else{dojo.mixin(this,J)
}}}};
dojo.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
dojo.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(F,D,E){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:F,dy:D,dz:E})
}return new dojox.gfx3d.matrix.Matrix3D({dx:F.x,dy:F.y,dz:F.z})
},scale:function(F,D,E){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:F,yy:D,zz:E})
}if(typeof F=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:F,yy:F,zz:F})
}return new dojox.gfx3d.matrix.Matrix3D({xx:F.x,yy:F.y,zz:F.z})
},rotateX:function(F){var E=Math.cos(F);
var D=Math.sin(F);
return new dojox.gfx3d.matrix.Matrix3D({yy:E,yz:-D,zy:D,zz:E})
},rotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},rotateY:function(F){var E=Math.cos(F);
var D=Math.sin(F);
return new dojox.gfx3d.matrix.Matrix3D({xx:E,xz:D,zx:-D,zz:E})
},rotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},rotateZ:function(F){var E=Math.cos(F);
var D=Math.sin(F);
return new dojox.gfx3d.matrix.Matrix3D({xx:E,xy:-D,yx:D,yy:E})
},rotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},cameraTranslate:function(F,D,E){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-F,dy:-D,dz:-E})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-F.x,dy:-F.y,dz:-F.z})
},cameraRotateX:function(F){var E=Math.cos(-F);
var D=Math.sin(-F);
return new dojox.gfx3d.matrix.Matrix3D({yy:E,yz:-D,zy:D,zz:E})
},cameraRotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateY:function(F){var E=Math.cos(-F);
var D=Math.sin(-F);
return new dojox.gfx3d.matrix.Matrix3D({xx:E,xz:D,zx:-D,zz:E})
},cameraRotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateZ:function(F){var E=Math.cos(-F);
var D=Math.sin(-F);
return new dojox.gfx3d.matrix.Matrix3D({xx:E,xy:-D,yx:D,yy:E})
},cameraRotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},normalize:function(B){return(B instanceof dojox.gfx3d.matrix.Matrix3D)?B:new dojox.gfx3d.matrix.Matrix3D(B)
},clone:function(D){var E=new dojox.gfx3d.matrix.Matrix3D();
for(var F in D){if(typeof (D[F])=="number"&&typeof (E[F])=="number"&&E[F]!=D[F]){E[F]=D[F]
}}return E
},invert:function(H){var D=dojox.gfx3d.matrix.normalize(H);
var G=D.xx*D.yy*D.zz+D.xy*D.yz*D.zx+D.xz*D.yx*D.zy-D.xx*D.yz*D.zy-D.xy*D.yx*D.zz-D.xz*D.yy*D.zx;
var F=new dojox.gfx3d.matrix.Matrix3D({xx:(D.yy*D.zz-D.yz*D.zy)/G,xy:(D.xz*D.zy-D.xy*D.zz)/G,xz:(D.xy*D.yz-D.xz*D.yy)/G,yx:(D.yz*D.zx-D.yx*D.zz)/G,yy:(D.xx*D.zz-D.xz*D.zx)/G,yz:(D.xz*D.yx-D.xx*D.yz)/G,zx:(D.yx*D.zy-D.yy*D.zx)/G,zy:(D.xy*D.zx-D.xx*D.zy)/G,zz:(D.xx*D.yy-D.xy*D.yx)/G,dx:-1*(D.xy*D.yz*D.dz+D.xz*D.dy*D.zy+D.dx*D.yy*D.zz-D.xy*D.dy*D.zz-D.xz*D.yy*D.dz-D.dx*D.yz*D.zy)/G,dy:(D.xx*D.yz*D.dz+D.xz*D.dy*D.zx+D.dx*D.yx*D.zz-D.xx*D.dy*D.zz-D.xz*D.yx*D.dz-D.dx*D.yz*D.zx)/G,dz:-1*(D.xx*D.yy*D.dz+D.xy*D.dy*D.zx+D.dx*D.yx*D.zy-D.xx*D.dy*D.zy-D.xy*D.yx*D.dz-D.dx*D.yy*D.zx)/G});
return F
},_multiplyPoint:function(H,E,F,G){return{x:H.xx*E+H.xy*F+H.xz*G+H.dx,y:H.yx*E+H.yy*F+H.yz*G+H.dy,z:H.zx*E+H.zy*F+H.zz*G+H.dz}
},multiplyPoint:function(H,I,J,G){var F=dojox.gfx3d.matrix.normalize(H);
if(typeof I=="number"&&typeof J=="number"&&typeof G=="number"){return dojox.gfx3d.matrix._multiplyPoint(F,I,J,G)
}return dojox.gfx3d.matrix._multiplyPoint(F,I.x,I.y,I.z)
},multiply:function(I){var F=dojox.gfx3d.matrix.normalize(I);
for(var H=1;
H<arguments.length;
++H){var J=F;
var G=dojox.gfx3d.matrix.normalize(arguments[H]);
F=new dojox.gfx3d.matrix.Matrix3D();
F.xx=J.xx*G.xx+J.xy*G.yx+J.xz*G.zx;
F.xy=J.xx*G.xy+J.xy*G.yy+J.xz*G.zy;
F.xz=J.xx*G.xz+J.xy*G.yz+J.xz*G.zz;
F.yx=J.yx*G.xx+J.yy*G.yx+J.yz*G.zx;
F.yy=J.yx*G.xy+J.yy*G.yy+J.yz*G.zy;
F.yz=J.yx*G.xz+J.yy*G.yz+J.yz*G.zz;
F.zx=J.zx*G.xx+J.zy*G.yx+J.zz*G.zx;
F.zy=J.zx*G.xy+J.zy*G.yy+J.zz*G.zy;
F.zz=J.zx*G.xz+J.zy*G.yz+J.zz*G.zz;
F.dx=J.xx*G.dx+J.xy*G.dy+J.xz*G.dz+J.dx;
F.dy=J.yx*G.dx+J.yy*G.dy+J.yz*G.dz+J.dy;
F.dz=J.zx*G.dx+J.zy*G.dy+J.zz*G.dz+J.dz
}return F
},_project:function(H,E,F,G){return{x:H.xx*E+H.xy*F+H.xz*G+H.dx,y:H.yx*E+H.yy*F+H.yz*G+H.dy,z:H.zx*E+H.zy*F+H.zz*G+H.dz}
},project:function(H,I,J,G){var F=dojox.gfx3d.matrix.normalize(H);
if(typeof I=="number"&&typeof J=="number"&&typeof G=="number"){return dojox.gfx3d.matrix._project(F,I,J,G)
}return dojox.gfx3d.matrix._project(F,I.x,I.y,I.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
};