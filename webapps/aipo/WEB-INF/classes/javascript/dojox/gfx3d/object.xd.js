dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.object"],["require","dojox.gfx"],["require","dojox.gfx3d.lighting"],["require","dojox.gfx3d.scheduler"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.gradient"]],defineResource:function(D){if(!D._hasResource["dojox.gfx3d.object"]){D._hasResource["dojox.gfx3d.object"]=true;
D.provide("dojox.gfx3d.object");
D.require("dojox.gfx");
D.require("dojox.gfx3d.lighting");
D.require("dojox.gfx3d.scheduler");
D.require("dojox.gfx3d.vector");
D.require("dojox.gfx3d.gradient");
var C=function(A,H){if(arguments.length>1){A=H
}var B={};
for(var G in A){if(G in B){continue
}}};
D.declare("dojox.gfx3d.Object",null,{constructor:function(){this.object=null;
this.matrix=null;
this.cache=null;
this.renderer=null;
this.parent=null;
this.strokeStyle=null;
this.fillStyle=null;
this.shape=null
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,A);
return this
},setTransform:function(A){this.matrix=dojox.gfx3d.matrix.clone(A?dojox.gfx3d.matrix.normalize(A):dojox.gfx3d.identity,true);
return this
},applyRightTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},applyLeftTransform:function(A){return A?this.setTransform([A,this.matrix]):this
},applyTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},setFill:function(A){this.fillStyle=A;
return this
},setStroke:function(A){this.strokeStyle=A;
return this
},toStdFill:function(B,A){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?B[this.fillStyle.type](A,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
},invalidate:function(){this.renderer.addTodo(this)
},destroy:function(){if(this.shape){var A=this.shape.getParent();
if(A){A.remove(this.shape)
}this.shape=null
}},render:function(A){throw"Pure virtual function, not implemented"
},draw:function(A){throw"Pure virtual function, not implemented"
},getZOrder:function(){return 0
},getOutline:function(){return null
}});
D.declare("dojox.gfx3d.Scene",dojox.gfx3d.Object,{constructor:function(){this.objects=[];
this.todos=[];
this.schedule=dojox.gfx3d.scheduler.zOrder;
this._draw=dojox.gfx3d.drawer.conservative
},setFill:function(A){this.fillStyle=A;
D.forEach(this.objects,function(B){B.setFill(A)
});
return this
},setStroke:function(A){this.strokeStyle=A;
D.forEach(this.objects,function(B){B.setStroke(A)
});
return this
},render:function(A,B){var F=dojox.gfx3d.matrix.multiply(A,this.matrix);
if(B){this.todos=this.objects
}D.forEach(this.todos,function(E){E.render(F,B)
})
},draw:function(A){this.objects=this.schedule(this.objects);
this._draw(this.todos,this.objects,this.renderer)
},addTodo:function(A){if(D.every(this.todos,function(B){return B!=A
})){this.todos.push(A);
this.invalidate()
}},invalidate:function(){this.parent.addTodo(this)
},getZOrder:function(){var A=0;
D.forEach(this.objects,function(B){A+=B.getZOrder()
});
return(this.objects.length>1)?A/this.objects.length:0
}});
D.declare("dojox.gfx3d.Edges",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultEdges)
},setObject:function(B,A){this.object=dojox.gfx.makeParameters(this.object,(B instanceof Array)?{points:B,style:A}:B);
return this
},getZOrder:function(){var A=0;
D.forEach(this.cache,function(B){A+=B.z
});
return(this.cache.length>1)?A/this.cache.length:0
},render:function(A){var B=dojox.gfx3d.matrix.multiply(A,this.matrix);
this.cache=D.map(this.object.points,function(F){return dojox.gfx3d.matrix.multiplyPoint(B,F)
})
},draw:function(){var A=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var B=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){B.moveTo(A[0].x,A[0].y);
D.forEach(A.slice(1),function(E){B.lineTo(E.x,E.y)
});
if(this.object.style=="loop"){B.closePath()
}}else{for(var F=0;
F<this.cache.length;
){B.moveTo(A[F].x,A[F].y);
F++;
B.lineTo(A[F].x,A[F].y);
F++
}}B.setStroke(this.strokeStyle)
}});
D.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultOrbit)
},render:function(Z){var b=dojox.gfx3d.matrix.multiply(Z,this.matrix);
var V=[0,Math.PI/4,Math.PI/3];
var B=dojox.gfx3d.matrix.multiplyPoint(b,this.object.center);
var S=D.map(V,function(E){return{x:this.center.x+this.radius*Math.cos(E),y:this.center.y+this.radius*Math.sin(E),z:this.center.z}
},this.object);
S=D.map(S,function(E){return dojox.gfx3d.matrix.multiplyPoint(b,E)
});
var a=dojox.gfx3d.vector.normalize(S);
S=D.map(S,function(E){return dojox.gfx3d.vector.substract(E,B)
});
var c={xx:S[0].x*S[0].y,xy:S[0].y*S[0].y,xz:1,yx:S[1].x*S[1].y,yy:S[1].y*S[1].y,yz:1,zx:S[2].x*S[2].y,zy:S[2].y*S[2].y,zz:1,dx:0,dy:0,dz:0};
var U=D.map(S,function(E){return -Math.pow(E.x,2)
});
var d=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(c),U[0],U[1],U[2]);
var e=Math.atan2(d.x,1-d.y)/2;
var X=D.map(S,function(E){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-e),E.x,E.y)
});
var T=Math.pow(X[0].x,2);
var U=Math.pow(X[0].y,2);
var W=Math.pow(X[1].x,2);
var Y=Math.pow(X[1].y,2);
var f=Math.sqrt((T*Y-U*W)/(Y-U));
var A=Math.sqrt((T*Y-U*W)/(T-W));
this.cache={cx:B.x,cy:B.y,rx:f,ry:A,theta:e,normal:a}
},draw:function(A){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(A,this.cache.normal))
}});
D.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(A,H){for(var B=0;
B<H.length;
++B){var G=H[B];
if(typeof (G)=="boolean"){A.push(G?1:0)
}else{if(typeof (G)=="number"){A.push(G)
}else{if(G instanceof Array){this._collectArgs(A,G)
}else{if("x" in G&&"y" in G){A.push(G.x);
A.push(G.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(B,H){var A=this._validSegments[B.toLowerCase()];
if(typeof (A)=="number"){if(A){if(H.length>=A){var G={action:B,args:H.slice(0,H.length-H.length%A)};
this.segments.push(G)
}}else{var G={action:B,args:[]};
this.segments.push(G)
}}},moveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"M":"m",A);
return this
},lineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"L":"l",A);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},render:function(B){var G=dojox.gfx3d.matrix.multiply(B,this.matrix);
var A="";
var H=this._validSegments;
D.forEach(this.segments,function(F){A+=F.action;
for(var J=0;
J<F.args.length;
J+=H[F.action.toLowerCase()]){var E=dojox.gfx3d.matrix.multiplyPoint(G,F.args[J],F.args[J+1],F.args[J+2]);
A+=" "+E.x+" "+E.y
}});
this.cache=A
},_draw:function(){return this.parent.createPath(this.cache)
}});
D.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(B,A){if(B instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:B,style:A})
}else{this.object=dojox.gfx.makeParameters(this.object,B)
}return this
},render:function(B){var K=dojox.gfx3d.matrix.multiply(B,this.matrix);
var A=D.map(this.object.points,function(E){return dojox.gfx3d.matrix.multiplyPoint(K,E)
});
this.cache=[];
var I=A.slice(0,2);
var L=A[0];
if(this.object.style=="strip"){D.forEach(A.slice(2),function(E){I.push(E);
I.push(I[0]);
this.cache.push(I);
I=I.slice(1,3)
},this)
}else{if(this.object.style=="fan"){D.forEach(A.slice(2),function(E){I.push(E);
I.push(L);
this.cache.push(I);
I=[L,E]
},this)
}else{for(var J=0;
J<A.length;
){this.cache.push([A[J],A[J+1],A[J+2],A[J]]);
J+=3
}}}},draw:function(A){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(B){return B
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}D.forEach(this.cache,function(B){this.shape.createPolyline(B).setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.vector.normalize(B)))
},this)
},getZOrder:function(){var A=0;
D.forEach(this.cache,function(B){A+=(B[0].z+B[1].z+B[2].z)/3
});
return(this.cache.length>1)?A/this.cache.length:0
}});
D.declare("dojox.gfx3d.Quads",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultQuads)
},setObject:function(B,A){this.object=dojox.gfx.makeParameters(this.object,(B instanceof Array)?{points:B,style:A}:B);
return this
},render:function(B){var J=dojox.gfx3d.matrix.multiply(B,this.matrix);
var A=D.map(this.object.points,function(E){return dojox.gfx3d.matrix.multiplyPoint(J,E)
});
this.cache=[];
if(this.object.style=="strip"){var H=A.slice(0,2);
for(var I=2;
I<A.length;
){H=H.concat([A[I],A[I+1],H[0]]);
this.cache.push(H);
H=H.slice(2,4);
I+=2
}}else{for(var I=0;
I<A.length;
){this.cache.push([A[I],A[I+1],A[I+2],A[I+3],A[I]]);
I+=4
}}},draw:function(A){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(F){return F
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var B=0;
B<this.cache.length;
B++){this.shape.createPolyline(this.cache[B]).setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.vector.normalize(this.cache[B])))
}},getZOrder:function(){var A=0;
for(var F=0;
F<this.cache.length;
F++){var B=this.cache[F];
A+=(B[0].z+B[1].z+B[2].z+B[3].z)/4
}return(this.cache.length>1)?A/this.cache.length:0
}});
D.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,(A instanceof Array)?{path:A}:A);
return this
},render:function(A){var B=dojox.gfx3d.matrix.multiply(A,this.matrix);
this.cache=D.map(this.object.path,function(F){return dojox.gfx3d.matrix.multiplyPoint(B,F)
});
this.cache.push(this.cache[0])
},draw:function(A){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var A=0;
for(var B=0;
B<this.cache.length;
B++){A+=this.cache[B].z
}return(this.cache.length>1)?A/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
D.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultCube);
this.polygons=[]
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,A)
},render:function(T){var O=this.object.top;
var W=this.object.bottom;
var Q={x:W.x,y:O.y,z:O.z};
var R={x:W.x,y:W.y,z:O.z};
var S={x:O.x,y:W.y,z:O.z};
var U={x:O.x,y:O.y,z:W.z};
var V={x:W.x,y:O.y,z:W.z};
var X={x:O.x,y:W.y,z:W.z};
var P=[O,Q,R,S,U,V,W,X];
var A=dojox.gfx3d.matrix.multiply(T,this.matrix);
var B=D.map(P,function(E){return dojox.gfx3d.matrix.multiplyPoint(A,E)
});
O=B[0];
Q=B[1];
R=B[2];
S=B[3];
U=B[4];
V=B[5];
W=B[6];
X=B[7];
this.cache=[[O,Q,R,S,O],[U,V,W,X,U],[O,S,X,U,O],[S,R,W,X,S],[R,Q,V,W,R],[Q,O,U,V,Q]]
},draw:function(A){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(E){return E
});
var B=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var F=0;
F<B.length;
F++){this.shape.createPolyline(B[F]).setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.vector.normalize(B[F])))
}},getZOrder:function(){var A=this.cache[0][0];
var B=this.cache[1][2];
return(A.z+B.z)/2
}});
D.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=D.clone(dojox.gfx3d.defaultCylinder)
},render:function(X){var b=dojox.gfx3d.matrix.multiply(X,this.matrix);
var a=[0,Math.PI/4,Math.PI/3];
var B=dojox.gfx3d.matrix.multiplyPoint(b,this.object.center);
var Z=D.map(a,function(E){return{x:this.center.x+this.radius*Math.cos(E),y:this.center.y+this.radius*Math.sin(E),z:this.center.z}
},this.object);
Z=D.map(Z,function(E){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(b,E),B)
});
var c={xx:Z[0].x*Z[0].y,xy:Z[0].y*Z[0].y,xz:1,yx:Z[1].x*Z[1].y,yy:Z[1].y*Z[1].y,yz:1,zx:Z[2].x*Z[2].y,zy:Z[2].y*Z[2].y,zz:1,dx:0,dy:0,dz:0};
var U=D.map(Z,function(E){return -Math.pow(E.x,2)
});
var i=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(c),U[0],U[1],U[2]);
var f=Math.atan2(i.x,1-i.y)/2;
var Y=D.map(Z,function(E){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-f),E.x,E.y)
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
}this.cache={center:B,top:d,rx:g,ry:h,theta:f,gradient:j}
},draw:function(){var A=this.cache,L=dojox.gfx3d.vector,N=dojox.gfx.matrix,K=[A.center,A.top],J=L.substract(A.top,A.center);
if(L.dotProduct(J,this.renderer.lighting.incident)>0){K=[A.top,A.center];
J=L.substract(A.center,A.top)
}var M=this.renderer.lighting[this.fillStyle.type](J,this.fillStyle.finish,this.fillStyle.color),B=Math.sqrt(Math.pow(A.center.x-A.top.x,2)+Math.pow(A.center.y-A.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-A.rx).lineTo(B,-A.rx).lineTo(B,A.rx).lineTo(0,A.rx).arcTo(A.ry,A.rx,0,true,true,0,-A.rx).setFill(A.gradient).setStroke(this.strokeStyle).setTransform([N.translate(K[0]),N.rotate(Math.atan2(K[1].y-K[0].y,K[1].x-K[0].x))]);
if(A.rx>0&&A.ry>0){this.shape.createEllipse({cx:K[1].x,cy:K[1].y,rx:A.rx,ry:A.ry}).setFill(M).setStroke(this.strokeStyle).applyTransform(N.rotateAt(A.theta,K[1]))
}}});
D.declare("dojox.gfx3d.Viewport",dojox.gfx.Group,{constructor:function(){this.dimension=null;
this.objects=[];
this.todos=[];
this.renderer=this;
this.schedule=dojox.gfx3d.scheduler.zOrder;
this.draw=dojox.gfx3d.drawer.conservative;
this.deep=false;
this.lights=[];
this.lighting=null
},setCameraTransform:function(A){this.camera=dojox.gfx3d.matrix.clone(A?dojox.gfx3d.matrix.normalize(A):dojox.gfx3d.identity,true);
this.invalidate();
return this
},applyCameraRightTransform:function(A){return A?this.setCameraTransform([this.camera,A]):this
},applyCameraLeftTransform:function(A){return A?this.setCameraTransform([A,this.camera]):this
},applyCameraTransform:function(A){return this.applyCameraRightTransform(A)
},setLights:function(G,B,A){this.lights=(G instanceof Array)?{sources:G,ambient:B,specular:A}:G;
var H={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(H,this.lights.sources,this.lights.ambient,this.lights.specular);
this.invalidate();
return this
},addLights:function(A){return this.setLights(this.lights.sources.concat(A))
},addTodo:function(A){if(D.every(this.todos,function(B){return B!=A
})){this.todos.push(A)
}},invalidate:function(){this.deep=true;
this.todos=this.objects
},setDimensions:function(A){if(A){this.dimension={width:typeof A.width=="string"?parseInt(A.width):A.width,height:typeof A.height=="string"?parseInt(A.height):A.height}
}else{this.dimension=null
}},render:function(){if(this.todos.length==0){return 
}var A=dojox.gfx3d.matrix;
for(var B=0;
B<this.todos.length;
B++){this.todos[B].render(dojox.gfx3d.matrix.normalize([A.cameraRotateXg(180),A.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(B,A){return this.create3DObject(dojox.gfx3d.Edges,B,A)
},createTriangles:function(A,B){return this.create3DObject(dojox.gfx3d.Triangles,A,B)
},createQuads:function(B,A){return this.create3DObject(dojox.gfx3d.Quads,B,A)
},createPolygon:function(A){return this.create3DObject(dojox.gfx3d.Polygon,A)
},createOrbit:function(A){return this.create3DObject(dojox.gfx3d.Orbit,A)
},createCube:function(A){return this.create3DObject(dojox.gfx3d.Cube,A)
},createCylinder:function(A){return this.create3DObject(dojox.gfx3d.Cylinder,A)
},createPath3d:function(A){return this.create3DObject(dojox.gfx3d.Path3d,A)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(H,G,B){var A=new H();
this.adopt(A);
if(G){A.setObject(G,B)
}return A
},adopt:function(A){A.renderer=this.renderer;
A.parent=this;
this.objects.push(A);
this.addTodo(A);
return this
},abandon:function(B,A){for(var F=0;
F<this.objects.length;
++F){if(this.objects[F]==B){this.objects.splice(F,1)
}}B.parent=null;
return this
},setScheduler:function(A){this.schedule=A
},setDrawer:function(A){this.draw=A
}};
D.extend(dojox.gfx3d.Viewport,dojox.gfx3d._creators);
D.extend(dojox.gfx3d.Scene,dojox.gfx3d._creators);
delete dojox.gfx3d._creators;
D.extend(dojox.gfx.Surface,{createViewport:function(){var A=this.createObject(dojox.gfx3d.Viewport,null,true);
A.setDimensions(this.getDimensions());
return A
}})
}}});