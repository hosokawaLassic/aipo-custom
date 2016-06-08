dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.canvas"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"],["require","dojox.gfx.arc"],["require","dojox.gfx.decompose"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.canvas"]){B._hasResource["dojox.gfx.canvas"]=true;
B.provide("dojox.gfx.canvas");
B.require("dojox.gfx._base");
B.require("dojox.gfx.shape");
B.require("dojox.gfx.path");
B.require("dojox.gfx.arc");
B.require("dojox.gfx.decompose");
B.experimental("dojox.gfx.canvas");
(function(){var R=dojox.gfx,A=R.shape,O=R.arc,S=R.matrix,U=S.multiplyPoint,N=2*Math.PI;
B.extend(R.Shape,{render:function(D){D.save();
this._renderTransform(D);
this._renderShape(D);
this._renderFill(D,true);
this._renderStroke(D,true);
D.restore()
},_renderTransform:function(E){if("canvasTransform" in this){var D=this.canvasTransform;
E.translate(D.dx,D.dy);
E.rotate(D.angle2);
E.scale(D.sx,D.sy);
E.rotate(D.angle1)
}},_renderShape:function(D){},_renderFill:function(E,D){if("canvasFill" in this){if("canvasFillImage" in this){this.canvasFill=E.createPattern(this.canvasFillImage,"repeat");
delete this.canvasFillImage
}E.fillStyle=this.canvasFill;
if(D){E.fill()
}}else{E.fillStyle="rgba(0,0,0,0.0)"
}},_renderStroke:function(F,E){var D=this.strokeStyle;
if(D){F.strokeStyle=D.color.toString();
F.lineWidth=D.width;
F.lineCap=D.cap;
if(typeof D.join=="number"){F.lineJoin="miter";
F.miterLimit=D.join
}else{F.lineJoin=D.join
}if(E){F.stroke()
}}else{if(!E){F.strokeStyle="rgba(0,0,0,0.0)"
}}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
var Q=function(E,D,G){var F=E.prototype[D];
E.prototype[D]=G?function(){this.surface.makeDirty();
F.apply(this,arguments);
G.call(this);
return this
}:function(){this.surface.makeDirty();
return F.apply(this,arguments)
}
};
Q(R.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=R.decompose(this.matrix)
}else{delete this.canvasTransform
}});
Q(R.Shape,"setFill",function(){var G=this.fillStyle,D;
if(G){if(typeof (G)=="object"&&"type" in G){var F=this.surface.rawNode.getContext("2d");
switch(G.type){case"linear":case"radial":D=G.type=="linear"?F.createLinearGradient(G.x1,G.y1,G.x2,G.y2):F.createRadialGradient(G.cx,G.cy,0,G.cx,G.cy,G.r);
B.forEach(G.colors,function(H){D.addColorStop(H.offset,R.normalizeColor(H.color).toString())
});
break;
case"pattern":var E=new Image(G.width,G.height);
this.surface.downloadImage(E,G.src);
this.canvasFillImage=E
}}else{D=G.toString()
}this.canvasFill=D
}else{delete this.canvasFill
}});
Q(R.Shape,"setStroke");
Q(R.Shape,"setShape");
B.declare("dojox.gfx.Group",R.Shape,{constructor:function(){A.Container._init.call(this)
},render:function(E){E.save();
this._renderTransform(E);
this._renderFill(E);
this._renderStroke(E);
for(var D=0;
D<this.children.length;
++D){this.children[D].render(E)
}E.restore()
}});
B.declare("dojox.gfx.Rect",A.Rect,{_renderShape:function(F){var E=this.shape,X=Math.min(E.r,E.height/2,E.width/2),J=E.x,L=J+E.width,G=E.y,I=G+E.height,K=J+X,M=L-X,H=G+X,D=I-X;
F.beginPath();
F.moveTo(K,G);
F.lineTo(M,G);
if(X){F.arcTo(L,G,L,H,X)
}F.lineTo(L,D);
if(X){F.arcTo(L,I,M,I,X)
}F.lineTo(K,I);
if(X){F.arcTo(J,I,J,D,X)
}F.lineTo(J,H);
if(X){F.arcTo(J,G,K,G,X)
}F.closePath()
}});
var P=[];
(function(){var F=O.curvePI4;
P.push(F.s,F.c1,F.c2,F.e);
for(var E=45;
E<360;
E+=45){var D=S.rotateg(E);
P.push(U(D,F.c1),U(D,F.c2),U(D,F.e))
}})();
B.declare("dojox.gfx.Ellipse",A.Ellipse,{setShape:function(){R.Ellipse.superclass.setShape.apply(this,arguments);
var F=this.shape,H,G,J,E=[],D=S.normalize([S.translate(F.cx,F.cy),S.scale(F.rx,F.ry)]);
H=U(D,P[0]);
E.push([H.x,H.y]);
for(var I=1;
I<P.length;
I+=3){G=U(D,P[I]);
J=U(D,P[I+1]);
H=U(D,P[I+2]);
E.push([G.x,G.y,J.x,J.y,H.x,H.y])
}this.canvasEllipse=E;
return this
},_renderShape:function(F){var D=this.canvasEllipse;
F.beginPath();
F.moveTo.apply(F,D[0]);
for(var E=1;
E<D.length;
++E){F.bezierCurveTo.apply(F,D[E])
}F.closePath()
}});
B.declare("dojox.gfx.Circle",A.Circle,{_renderShape:function(E){var D=this.shape;
E.beginPath();
E.arc(D.cx,D.cy,D.r,0,N,1)
}});
B.declare("dojox.gfx.Line",A.Line,{_renderShape:function(E){var D=this.shape;
E.beginPath();
E.moveTo(D.x1,D.y1);
E.lineTo(D.x2,D.y2)
}});
B.declare("dojox.gfx.Polyline",A.Polyline,{setShape:function(){R.Polyline.superclass.setShape.apply(this,arguments);
var E=this.shape.points,F=E[0],H=[],D,G;
if(E.length){if(typeof F=="number"){H.push(F,E[1]);
G=2
}else{H.push(F.x,F.y);
G=1
}for(;
G<E.length;
++G){D=E[G];
if(typeof D=="number"){H.push(D,E[++G])
}else{H.push(D.x,D.y)
}}}this.canvasPolyline=H;
return this
},_renderShape:function(F){var D=this.canvasPolyline;
if(D.length){F.beginPath();
F.moveTo(D[0],D[1]);
for(var E=2;
E<D.length;
E+=2){F.lineTo(D[E],D[E+1])
}}}});
B.declare("dojox.gfx.Image",A.Image,{setShape:function(){R.Image.superclass.setShape.apply(this,arguments);
var D=new Image();
this.surface.downloadImage(D,this.shape.src);
this.canvasImage=D;
return this
},_renderShape:function(E){var D=this.shape;
E.drawImage(this.canvasImage,D.x,D.y,D.width,D.height)
}});
B.declare("dojox.gfx.Text",A.Text,{_renderShape:function(E){var D=this.shape
}});
Q(R.Text,"setFont");
var V={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};
B.declare("dojox.gfx.Path",R.path.Path,{constructor:function(){this.last={};
this.lastControl={}
},setShape:function(){this.canvasPath=[];
return R.Path.superclass.setShape.apply(this,arguments)
},_updateWithSegment:function(E){var D=B.clone(this.last);
this[V[E.action]](this.canvasPath,E.action,E.args);
this.last=D;
R.Path.superclass._updateWithSegment.apply(this,arguments)
},_renderShape:function(F){var D=this.canvasPath;
F.beginPath();
for(var E=0;
E<D.length;
E+=2){F[D[E]].apply(F,D[E+1])
}},_moveToA:function(G,D,F){G.push("moveTo",[F[0],F[1]]);
for(var E=2;
E<F.length;
E+=2){G.push("lineTo",[F[E],F[E+1]])
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1];
this.lastControl={}
},_moveToR:function(G,D,F){if("x" in this.last){G.push("moveTo",[this.last.x+=F[0],this.last.y+=F[1]])
}else{G.push("moveTo",[this.last.x=F[0],this.last.y=F[1]])
}for(var E=2;
E<F.length;
E+=2){G.push("lineTo",[this.last.x+=F[E],this.last.y+=F[E+1]])
}this.lastControl={}
},_lineToA:function(G,D,F){for(var E=0;
E<F.length;
E+=2){G.push("lineTo",[F[E],F[E+1]])
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1];
this.lastControl={}
},_lineToR:function(G,D,F){for(var E=0;
E<F.length;
E+=2){G.push("lineTo",[this.last.x+=F[E],this.last.y+=F[E+1]])
}this.lastControl={}
},_hLineToA:function(G,D,F){for(var E=0;
E<F.length;
++E){G.push("lineTo",[F[E],this.last.y])
}this.last.x=F[F.length-1];
this.lastControl={}
},_hLineToR:function(G,D,F){for(var E=0;
E<F.length;
++E){G.push("lineTo",[this.last.x+=F[E],this.last.y])
}this.lastControl={}
},_vLineToA:function(G,D,F){for(var E=0;
E<F.length;
++E){G.push("lineTo",[this.last.x,F[E]])
}this.last.y=F[F.length-1];
this.lastControl={}
},_vLineToR:function(G,D,F){for(var E=0;
E<F.length;
++E){G.push("lineTo",[this.last.x,this.last.y+=F[E]])
}this.lastControl={}
},_curveToA:function(G,D,F){for(var E=0;
E<F.length;
E+=6){G.push("bezierCurveTo",F.slice(E,E+6))
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1];
this.lastControl.x=F[F.length-4];
this.lastControl.y=F[F.length-3];
this.lastControl.type="C"
},_curveToR:function(G,D,F){for(var E=0;
E<F.length;
E+=6){G.push("bezierCurveTo",[this.last.x+F[E],this.last.y+F[E+1],this.lastControl.x=this.last.x+F[E+2],this.lastControl.y=this.last.y+F[E+3],this.last.x+F[E+4],this.last.y+F[E+5]]);
this.last.x+=F[E+4];
this.last.y+=F[E+5]
}this.lastControl.type="C"
},_smoothCurveToA:function(H,D,G){for(var F=0;
F<G.length;
F+=4){var E=this.lastControl.type=="C";
H.push("bezierCurveTo",[E?2*this.last.x-this.lastControl.x:this.last.x,E?2*this.last.y-this.lastControl.y:this.last.y,G[F],G[F+1],G[F+2],G[F+3]]);
this.lastControl.x=G[F];
this.lastControl.y=G[F+1];
this.lastControl.type="C"
}this.last.x=G[G.length-2];
this.last.y=G[G.length-1]
},_smoothCurveToR:function(H,D,G){for(var F=0;
F<G.length;
F+=4){var E=this.lastControl.type=="C";
H.push("bezierCurveTo",[E?2*this.last.x-this.lastControl.x:this.last.x,E?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+G[F],this.last.y+G[F+1],this.last.x+G[F+2],this.last.y+G[F+3]]);
this.lastControl.x=this.last.x+G[F];
this.lastControl.y=this.last.y+G[F+1];
this.lastControl.type="C";
this.last.x+=G[F+2];
this.last.y+=G[F+3]
}},_qCurveToA:function(G,D,F){for(var E=0;
E<F.length;
E+=4){G.push("quadraticCurveTo",F.slice(E,E+4))
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1];
this.lastControl.x=F[F.length-4];
this.lastControl.y=F[F.length-3];
this.lastControl.type="Q"
},_qCurveToR:function(G,D,F){for(var E=0;
E<F.length;
E+=4){G.push("quadraticCurveTo",[this.lastControl.x=this.last.x+F[E],this.lastControl.y=this.last.y+F[E+1],this.last.x+F[E+2],this.last.y+F[E+3]]);
this.last.x+=F[E+2];
this.last.y+=F[E+3]
}this.lastControl.type="Q"
},_qSmoothCurveToA:function(H,D,G){for(var F=0;
F<G.length;
F+=2){var E=this.lastControl.type=="Q";
H.push("quadraticCurveTo",[this.lastControl.x=E?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=E?2*this.last.y-this.lastControl.y:this.last.y,G[F],G[F+1]]);
this.lastControl.type="Q"
}this.last.x=G[G.length-2];
this.last.y=G[G.length-1]
},_qSmoothCurveToR:function(H,D,G){for(var F=0;
F<G.length;
F+=2){var E=this.lastControl.type=="Q";
H.push("quadraticCurveTo",[this.lastControl.x=E?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=E?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+G[F],this.last.y+G[F+1]]);
this.lastControl.type="Q";
this.last.x+=G[F];
this.last.y+=G[F+1]
}},_arcTo:function(K,D,I){var E=D=="a";
for(var H=0;
H<I.length;
H+=7){var J=I[H+5],G=I[H+6];
if(E){J+=this.last.x;
G+=this.last.y
}var F=O.arcAsBezier(this.last,I[H],I[H+1],I[H+2],I[H+3]?1:0,I[H+4]?1:0,J,G);
B.forEach(F,function(L){K.push("bezierCurveTo",L)
});
this.last.x=J;
this.last.y=G
}this.lastControl={}
},_closePath:function(F,D,E){F.push("closePath",[]);
this.lastControl={}
}});
B.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(D){Q(R.Path,D)
});
B.declare("dojox.gfx.TextPath",R.path.TextPath,{_renderShape:function(E){var D=this.shape
}});
B.declare("dojox.gfx.Surface",A.Surface,{constructor:function(){A.Container._init.call(this);
this.pendingImageCount=0;
this.makeDirty()
},setDimensions:function(E,D){this.width=R.normalizedLength(E);
this.height=R.normalizedLength(D);
if(!this.rawNode){return this
}this.rawNode.width=E;
this.rawNode.height=D;
this.makeDirty();
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null
},render:function(){if(this.pendingImageCount){return 
}var E=this.rawNode.getContext("2d");
E.save();
E.clearRect(0,0,this.rawNode.width,this.rawNode.height);
for(var D=0;
D<this.children.length;
++D){this.children[D].render(E)
}E.restore();
if("pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender" in this)){this.pendingRender=setTimeout(B.hitch(this,this.render),0)
}},downloadImage:function(F,E){var D=B.hitch(this,this.onImageLoad);
if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}F.onload=D;
F.onerror=D;
F.onabort=D;
F.src=E
},onImageLoad:function(){if(!--this.pendingImageCount){this.render()
}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
R.createSurface=function(I,F,H){if(!F){F="100%"
}if(!H){H="100%"
}var G=new R.Surface(),E=B.byId(I),D=E.ownerDocument.createElement("canvas");
D.width=F;
D.height=H;
E.appendChild(D);
G.rawNode=D;
G.surface=G;
return G
};
var C=A.Container,T={add:function(D){this.surface.makeDirty();
return C.add.apply(this,arguments)
},remove:function(E,D){this.surface.makeDirty();
return C.remove.apply(this,arguments)
},clear:function(){this.surface.makeDirty();
return C.clear.apply(this,arguments)
},_moveChildToFront:function(D){this.surface.makeDirty();
return C._moveChildToFront.apply(this,arguments)
},_moveChildToBack:function(D){this.surface.makeDirty();
return C._moveChildToBack.apply(this,arguments)
}};
B.mixin(A.Creator,{createObject:function(D,F){var E=new D();
E.surface=this.surface;
E.setShape(F);
this.add(E);
return E
}});
B.extend(R.Group,T);
B.extend(R.Group,A.Creator);
B.extend(R.Surface,T);
B.extend(R.Surface,A.Creator)
})()
}}});