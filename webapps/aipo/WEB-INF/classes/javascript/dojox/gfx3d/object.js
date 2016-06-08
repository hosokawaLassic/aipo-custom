if(!dojo._hasResource["dojox.gfx3d.object"]){dojo._hasResource["dojox.gfx3d.object"]=true;
dojo.provide("dojox.gfx3d.object");
dojo.require("dojox.gfx");
dojo.require("dojox.gfx3d.lighting");
dojo.require("dojox.gfx3d.scheduler");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.gradient");
var out=function(F,E){if(arguments.length>1){F=E
}var G={};
for(var H in F){if(H in G){continue
}}};
dojo.declare("dojox.gfx3d.Object",null,{constructor:function(){this.object=null;
this.matrix=null;
this.cache=null;
this.renderer=null;
this.parent=null;
this.strokeStyle=null;
this.fillStyle=null;
this.shape=null
},setObject:function(B){this.object=dojox.gfx.makeParameters(this.object,B);
return this
},setTransform:function(B){this.matrix=dojox.gfx3d.matrix.clone(B?dojox.gfx3d.matrix.normalize(B):dojox.gfx3d.identity,true);
return this
},applyRightTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},applyLeftTransform:function(B){return B?this.setTransform([B,this.matrix]):this
},applyTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},setFill:function(B){this.fillStyle=B;
return this
},setStroke:function(B){this.strokeStyle=B;
return this
},toStdFill:function(C,D){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?C[this.fillStyle.type](D,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
},invalidate:function(){this.renderer.addTodo(this)
},destroy:function(){if(this.shape){var B=this.shape.getParent();
if(B){B.remove(this.shape)
}this.shape=null
}},render:function(B){throw"Pure virtual function, not implemented"
},draw:function(B){throw"Pure virtual function, not implemented"
},getZOrder:function(){return 0
},getOutline:function(){return null
}});
dojo.declare("dojox.gfx3d.Scene",dojox.gfx3d.Object,{constructor:function(){this.objects=[];
this.todos=[];
this.schedule=dojox.gfx3d.scheduler.zOrder;
this._draw=dojox.gfx3d.drawer.conservative
},setFill:function(B){this.fillStyle=B;
dojo.forEach(this.objects,function(A){A.setFill(B)
});
return this
},setStroke:function(B){this.strokeStyle=B;
dojo.forEach(this.objects,function(A){A.setStroke(B)
});
return this
},render:function(E,F){var D=dojox.gfx3d.matrix.multiply(E,this.matrix);
if(F){this.todos=this.objects
}dojo.forEach(this.todos,function(A){A.render(D,F)
})
},draw:function(B){this.objects=this.schedule(this.objects);
this._draw(this.todos,this.objects,this.renderer)
},addTodo:function(B){if(dojo.every(this.todos,function(A){return A!=B
})){this.todos.push(B);
this.invalidate()
}},invalidate:function(){this.parent.addTodo(this)
},getZOrder:function(){var B=0;
dojo.forEach(this.objects,function(A){B+=A.getZOrder()
});
return(this.objects.length>1)?B/this.objects.length:0
}});
dojo.declare("dojox.gfx3d.Edges",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultEdges)
},setObject:function(C,D){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{points:C,style:D}:C);
return this
},getZOrder:function(){var B=0;
dojo.forEach(this.cache,function(A){B+=A.z
});
return(this.cache.length>1)?B/this.cache.length:0
},render:function(D){var C=dojox.gfx3d.matrix.multiply(D,this.matrix);
this.cache=dojo.map(this.object.points,function(A){return dojox.gfx3d.matrix.multiplyPoint(C,A)
})
},draw:function(){var E=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var F=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){F.moveTo(E[0].x,E[0].y);
dojo.forEach(E.slice(1),function(A){F.lineTo(A.x,A.y)
});
if(this.object.style=="loop"){F.closePath()
}}else{for(var D=0;
D<this.cache.length;
){F.moveTo(E[D].x,E[D].y);
D++;
F.lineTo(E[D].x,E[D].y);
D++
}}F.setStroke(this.strokeStyle)
}});
dojo.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultOrbit)
},render:function(a){var c=dojox.gfx3d.matrix.multiply(a,this.matrix);
var W=[0,Math.PI/4,Math.PI/3];
var S=dojox.gfx3d.matrix.multiplyPoint(c,this.object.center);
var T=dojo.map(W,function(B){return{x:this.center.x+this.radius*Math.cos(B),y:this.center.y+this.radius*Math.sin(B),z:this.center.z}
},this.object);
T=dojo.map(T,function(B){return dojox.gfx3d.matrix.multiplyPoint(c,B)
});
var b=dojox.gfx3d.vector.normalize(T);
T=dojo.map(T,function(B){return dojox.gfx3d.vector.substract(B,S)
});
var d={xx:T[0].x*T[0].y,xy:T[0].y*T[0].y,xz:1,yx:T[1].x*T[1].y,yy:T[1].y*T[1].y,yz:1,zx:T[2].x*T[2].y,zy:T[2].y*T[2].y,zz:1,dx:0,dy:0,dz:0};
var V=dojo.map(T,function(B){return -Math.pow(B.x,2)
});
var e=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(d),V[0],V[1],V[2]);
var f=Math.atan2(e.x,1-e.y)/2;
var Y=dojo.map(T,function(B){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-f),B.x,B.y)
});
var U=Math.pow(Y[0].x,2);
var V=Math.pow(Y[0].y,2);
var X=Math.pow(Y[1].x,2);
var Z=Math.pow(Y[1].y,2);
var A=Math.sqrt((U*Z-V*X)/(Z-V));
var R=Math.sqrt((U*Z-V*X)/(U-X));
this.cache={cx:S.x,cy:S.y,rx:A,ry:R,theta:f,normal:b}
},draw:function(B){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(B,this.cache.normal))
}});
dojo.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(F,E){for(var G=0;
G<E.length;
++G){var H=E[G];
if(typeof (H)=="boolean"){F.push(H?1:0)
}else{if(typeof (H)=="number"){F.push(H)
}else{if(H instanceof Array){this._collectArgs(F,H)
}else{if("x" in H&&"y" in H){F.push(H.x);
F.push(H.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(G,E){var F=this._validSegments[G.toLowerCase()];
if(typeof (F)=="number"){if(F){if(E.length>=F){var H={action:G,args:E.slice(0,E.length-E.length%F)};
this.segments.push(H)
}}else{var H={action:G,args:[]};
this.segments.push(H)
}}},moveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"M":"m",B);
return this
},lineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"L":"l",B);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},render:function(G){var H=dojox.gfx3d.matrix.multiply(G,this.matrix);
var F="";
var E=this._validSegments;
dojo.forEach(this.segments,function(B){F+=B.action;
for(var C=0;
C<B.args.length;
C+=E[B.action.toLowerCase()]){var A=dojox.gfx3d.matrix.multiplyPoint(H,B.args[C],B.args[C+1],B.args[C+2]);
F+=" "+A.x+" "+A.y
}});
this.cache=F
},_draw:function(){return this.parent.createPath(this.cache)
}});
dojo.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(C,D){if(C instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:C,style:D})
}else{this.object=dojox.gfx.makeParameters(this.object,C)
}return this
},render:function(I){var L=dojox.gfx3d.matrix.multiply(I,this.matrix);
var H=dojo.map(this.object.points,function(A){return dojox.gfx3d.matrix.multiplyPoint(L,A)
});
this.cache=[];
var J=H.slice(0,2);
var G=H[0];
if(this.object.style=="strip"){dojo.forEach(H.slice(2),function(A){J.push(A);
J.push(J[0]);
this.cache.push(J);
J=J.slice(1,3)
},this)
}else{if(this.object.style=="fan"){dojo.forEach(H.slice(2),function(A){J.push(A);
J.push(G);
this.cache.push(J);
J=[G,A]
},this)
}else{for(var K=0;
K<H.length;
){this.cache.push([H[K],H[K+1],H[K+2],H[K]]);
K+=3
}}}},draw:function(B){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(A){return A
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}dojo.forEach(this.cache,function(A){this.shape.createPolyline(A).setStroke(this.strokeStyle).setFill(this.toStdFill(B,dojox.gfx3d.vector.normalize(A)))
},this)
},getZOrder:function(){var B=0;
dojo.forEach(this.cache,function(A){B+=(A[0].z+A[1].z+A[2].z)/3
});
return(this.cache.length>1)?B/this.cache.length:0
}});
dojo.declare("dojox.gfx3d.Quads",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultQuads)
},setObject:function(C,D){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{points:C,style:D}:C);
return this
},render:function(H){var F=dojox.gfx3d.matrix.multiply(H,this.matrix);
var G=dojo.map(this.object.points,function(A){return dojox.gfx3d.matrix.multiplyPoint(F,A)
});
this.cache=[];
if(this.object.style=="strip"){var I=G.slice(0,2);
for(var J=2;
J<G.length;
){I=I.concat([G[J],G[J+1],I[0]]);
this.cache.push(I);
I=I.slice(2,4);
J+=2
}}else{for(var J=0;
J<G.length;
){this.cache.push([G[J],G[J+1],G[J+2],G[J+3],G[J]]);
J+=4
}}},draw:function(D){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(A){return A
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var C=0;
C<this.cache.length;
C++){this.shape.createPolyline(this.cache[C]).setStroke(this.strokeStyle).setFill(this.toStdFill(D,dojox.gfx3d.vector.normalize(this.cache[C])))
}},getZOrder:function(){var E=0;
for(var D=0;
D<this.cache.length;
D++){var F=this.cache[D];
E+=(F[0].z+F[1].z+F[2].z+F[3].z)/4
}return(this.cache.length>1)?E/this.cache.length:0
}});
dojo.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(B){this.object=dojox.gfx.makeParameters(this.object,(B instanceof Array)?{path:B}:B);
return this
},render:function(D){var C=dojox.gfx3d.matrix.multiply(D,this.matrix);
this.cache=dojo.map(this.object.path,function(A){return dojox.gfx3d.matrix.multiplyPoint(C,A)
});
this.cache.push(this.cache[0])
},draw:function(B){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(B,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var D=0;
for(var C=0;
C<this.cache.length;
C++){D+=this.cache[C].z
}return(this.cache.length>1)?D/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
dojo.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCube);
this.polygons=[]
},setObject:function(B){this.object=dojox.gfx.makeParameters(this.object,B)
},render:function(V){var Q=this.object.top;
var M=this.object.bottom;
var S={x:M.x,y:Q.y,z:Q.z};
var T={x:M.x,y:M.y,z:Q.z};
var U={x:Q.x,y:M.y,z:Q.z};
var W={x:Q.x,y:Q.y,z:M.z};
var X={x:M.x,y:Q.y,z:M.z};
var N={x:Q.x,y:M.y,z:M.z};
var R=[Q,S,T,U,W,X,M,N];
var O=dojox.gfx3d.matrix.multiply(V,this.matrix);
var P=dojo.map(R,function(A){return dojox.gfx3d.matrix.multiplyPoint(O,A)
});
Q=P[0];
S=P[1];
T=P[2];
U=P[3];
W=P[4];
X=P[5];
M=P[6];
N=P[7];
this.cache=[[Q,S,T,U,Q],[W,X,M,N,W],[Q,U,N,W,Q],[U,T,M,N,U],[T,S,X,M,T],[S,Q,W,X,S]]
},draw:function(E){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(A){return A
});
var F=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var D=0;
D<F.length;
D++){this.shape.createPolyline(F[D]).setStroke(this.strokeStyle).setFill(this.toStdFill(E,dojox.gfx3d.vector.normalize(F[D])))
}},getZOrder:function(){var D=this.cache[0][0];
var C=this.cache[1][2];
return(D.z+C.z)/2
}});
dojo.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCylinder)
},render:function(X){var b=dojox.gfx3d.matrix.multiply(X,this.matrix);
var a=[0,Math.PI/4,Math.PI/3];
var T=dojox.gfx3d.matrix.multiplyPoint(b,this.object.center);
var Z=dojo.map(a,function(B){return{x:this.center.x+this.radius*Math.cos(B),y:this.center.y+this.radius*Math.sin(B),z:this.center.z}
},this.object);
Z=dojo.map(Z,function(B){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(b,B),T)
});
var c={xx:Z[0].x*Z[0].y,xy:Z[0].y*Z[0].y,xz:1,yx:Z[1].x*Z[1].y,yy:Z[1].y*Z[1].y,yz:1,zx:Z[2].x*Z[2].y,zy:Z[2].y*Z[2].y,zz:1,dx:0,dy:0,dz:0};
var U=dojo.map(Z,function(B){return -Math.pow(B.x,2)
});
var i=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(c),U[0],U[1],U[2]);
var f=Math.atan2(i.x,1-i.y)/2;
var Y=dojo.map(Z,function(B){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-f),B.x,B.y)
});
var A=Math.pow(Y[0].x,2);
var U=Math.pow(Y[0].y,2);
var V=Math.pow(Y[1].x,2);
var W=Math.pow(Y[1].y,2);
var g=Math.sqrt((A*W-U*V)/(W-U));
var h=Math.sqrt((A*W-U*V)/(A-V));
if(g<h){var e=g;
g=h;
h=e;
f-=Math.PI/2
}var d=dojox.gfx3d.matrix.multiplyPoint(b,dojox.gfx3d.vector.sum(this.object.center,{x:0,y:0,z:this.object.height}));
var j=this.fillStyle.type=="constant"?this.fillStyle.color:dojox.gfx3d.gradient(this.renderer.lighting,this.fillStyle,this.object.center,this.object.radius,Math.PI,2*Math.PI,b);
if(isNaN(g)||isNaN(h)||isNaN(f)){g=this.object.radius,h=0,f=0
}this.cache={center:T,top:d,rx:g,ry:h,theta:f,gradient:j}
},draw:function(){var I=this.cache,M=dojox.gfx3d.vector,H=dojox.gfx.matrix,L=[I.center,I.top],K=M.substract(I.top,I.center);
if(M.dotProduct(K,this.renderer.lighting.incident)>0){L=[I.top,I.center];
K=M.substract(I.center,I.top)
}var N=this.renderer.lighting[this.fillStyle.type](K,this.fillStyle.finish,this.fillStyle.color),J=Math.sqrt(Math.pow(I.center.x-I.top.x,2)+Math.pow(I.center.y-I.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-I.rx).lineTo(J,-I.rx).lineTo(J,I.rx).lineTo(0,I.rx).arcTo(I.ry,I.rx,0,true,true,0,-I.rx).setFill(I.gradient).setStroke(this.strokeStyle).setTransform([H.translate(L[0]),H.rotate(Math.atan2(L[1].y-L[0].y,L[1].x-L[0].x))]);
if(I.rx>0&&I.ry>0){this.shape.createEllipse({cx:L[1].x,cy:L[1].y,rx:I.rx,ry:I.ry}).setFill(N).setStroke(this.strokeStyle).applyTransform(H.rotateAt(I.theta,L[1]))
}}});
dojo.declare("dojox.gfx3d.Viewport",dojox.gfx.Group,{constructor:function(){this.dimension=null;
this.objects=[];
this.todos=[];
this.renderer=this;
this.schedule=dojox.gfx3d.scheduler.zOrder;
this.draw=dojox.gfx3d.drawer.conservative;
this.deep=false;
this.lights=[];
this.lighting=null
},setCameraTransform:function(B){this.camera=dojox.gfx3d.matrix.clone(B?dojox.gfx3d.matrix.normalize(B):dojox.gfx3d.identity,true);
this.invalidate();
return this
},applyCameraRightTransform:function(B){return B?this.setCameraTransform([this.camera,B]):this
},applyCameraLeftTransform:function(B){return B?this.setCameraTransform([B,this.camera]):this
},applyCameraTransform:function(B){return this.applyCameraRightTransform(B)
},setLights:function(H,G,F){this.lights=(H instanceof Array)?{sources:H,ambient:G,specular:F}:H;
var E={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(E,this.lights.sources,this.lights.ambient,this.lights.specular);
this.invalidate();
return this
},addLights:function(B){return this.setLights(this.lights.sources.concat(B))
},addTodo:function(B){if(dojo.every(this.todos,function(A){return A!=B
})){this.todos.push(B)
}},invalidate:function(){this.deep=true;
this.todos=this.objects
},setDimensions:function(B){if(B){this.dimension={width:typeof B.width=="string"?parseInt(B.width):B.width,height:typeof B.height=="string"?parseInt(B.height):B.height}
}else{this.dimension=null
}},render:function(){if(this.todos.length==0){return 
}var D=dojox.gfx3d.matrix;
for(var C=0;
C<this.todos.length;
C++){this.todos[C].render(dojox.gfx3d.matrix.normalize([D.cameraRotateXg(180),D.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(C,D){return this.create3DObject(dojox.gfx3d.Edges,C,D)
},createTriangles:function(D,C){return this.create3DObject(dojox.gfx3d.Triangles,D,C)
},createQuads:function(C,D){return this.create3DObject(dojox.gfx3d.Quads,C,D)
},createPolygon:function(B){return this.create3DObject(dojox.gfx3d.Polygon,B)
},createOrbit:function(B){return this.create3DObject(dojox.gfx3d.Orbit,B)
},createCube:function(B){return this.create3DObject(dojox.gfx3d.Cube,B)
},createCylinder:function(B){return this.create3DObject(dojox.gfx3d.Cylinder,B)
},createPath3d:function(B){return this.create3DObject(dojox.gfx3d.Path3d,B)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(E,H,G){var F=new E();
this.adopt(F);
if(H){F.setObject(H,G)
}return F
},adopt:function(B){B.renderer=this.renderer;
B.parent=this;
this.objects.push(B);
this.addTodo(B);
return this
},abandon:function(F,E){for(var D=0;
D<this.objects.length;
++D){if(this.objects[D]==F){this.objects.splice(D,1)
}}F.parent=null;
return this
},setScheduler:function(B){this.schedule=B
},setDrawer:function(B){this.draw=B
}};
dojo.extend(dojox.gfx3d.Viewport,dojox.gfx3d._creators);
dojo.extend(dojox.gfx3d.Scene,dojox.gfx3d._creators);
delete dojox.gfx3d._creators;
dojo.extend(dojox.gfx.Surface,{createViewport:function(){var B=this.createObject(dojox.gfx3d.Viewport,null,true);
B.setDimensions(this.getDimensions());
return B
}})
};