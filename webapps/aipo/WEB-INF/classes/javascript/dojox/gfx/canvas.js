if(!dojo._hasResource["dojox.gfx.canvas"]){dojo._hasResource["dojox.gfx.canvas"]=true;
dojo.provide("dojox.gfx.canvas");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.require("dojox.gfx.arc");
dojo.require("dojox.gfx.decompose");
dojo.experimental("dojox.gfx.canvas");
(function(){var S=dojox.gfx,M=S.shape,P=S.arc,T=S.matrix,V=T.multiplyPoint,O=2*Math.PI;
dojo.extend(S.Shape,{render:function(A){A.save();
this._renderTransform(A);
this._renderShape(A);
this._renderFill(A,true);
this._renderStroke(A,true);
A.restore()
},_renderTransform:function(A){if("canvasTransform" in this){var B=this.canvasTransform;
A.translate(B.dx,B.dy);
A.rotate(B.angle2);
A.scale(B.sx,B.sy);
A.rotate(B.angle1)
}},_renderShape:function(A){},_renderFill:function(A,B){if("canvasFill" in this){if("canvasFillImage" in this){this.canvasFill=A.createPattern(this.canvasFillImage,"repeat");
delete this.canvasFillImage
}A.fillStyle=this.canvasFill;
if(B){A.fill()
}}else{A.fillStyle="rgba(0,0,0,0.0)"
}},_renderStroke:function(B,D){var A=this.strokeStyle;
if(A){B.strokeStyle=A.color.toString();
B.lineWidth=A.width;
B.lineCap=A.cap;
if(typeof A.join=="number"){B.lineJoin="miter";
B.miterLimit=A.join
}else{B.lineJoin=A.join
}if(D){B.stroke()
}}else{if(!D){B.strokeStyle="rgba(0,0,0,0.0)"
}}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
var R=function(D,A,B){var E=D.prototype[A];
D.prototype[A]=B?function(){this.surface.makeDirty();
E.apply(this,arguments);
B.call(this);
return this
}:function(){this.surface.makeDirty();
return E.apply(this,arguments)
}
};
R(S.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=S.decompose(this.matrix)
}else{delete this.canvasTransform
}});
R(S.Shape,"setFill",function(){var D=this.fillStyle,A;
if(D){if(typeof (D)=="object"&&"type" in D){var E=this.surface.rawNode.getContext("2d");
switch(D.type){case"linear":case"radial":A=D.type=="linear"?E.createLinearGradient(D.x1,D.y1,D.x2,D.y2):E.createRadialGradient(D.cx,D.cy,0,D.cx,D.cy,D.r);
dojo.forEach(D.colors,function(F){A.addColorStop(F.offset,S.normalizeColor(F.color).toString())
});
break;
case"pattern":var B=new Image(D.width,D.height);
this.surface.downloadImage(B,D.src);
this.canvasFillImage=B
}}else{A=D.toString()
}this.canvasFill=A
}else{delete this.canvasFill
}});
R(S.Shape,"setStroke");
R(S.Shape,"setShape");
dojo.declare("dojox.gfx.Group",S.Shape,{constructor:function(){M.Container._init.call(this)
},render:function(A){A.save();
this._renderTransform(A);
this._renderFill(A);
this._renderStroke(A);
for(var B=0;
B<this.children.length;
++B){this.children[B].render(A)
}A.restore()
}});
dojo.declare("dojox.gfx.Rect",M.Rect,{_renderShape:function(D){var B=this.shape,L=Math.min(B.r,B.height/2,B.width/2),H=B.x,J=H+B.width,E=B.y,G=E+B.height,I=H+L,K=J-L,F=E+L,A=G-L;
D.beginPath();
D.moveTo(I,E);
D.lineTo(K,E);
if(L){D.arcTo(J,E,J,F,L)
}D.lineTo(J,A);
if(L){D.arcTo(J,G,K,G,L)
}D.lineTo(I,G);
if(L){D.arcTo(H,G,H,A,L)
}D.lineTo(H,F);
if(L){D.arcTo(H,E,I,E,L)
}D.closePath()
}});
var Q=[];
(function(){var D=P.curvePI4;
Q.push(D.s,D.c1,D.c2,D.e);
for(var B=45;
B<360;
B+=45){var A=T.rotateg(B);
Q.push(V(A,D.c1),V(A,D.c2),V(A,D.e))
}})();
dojo.declare("dojox.gfx.Ellipse",M.Ellipse,{setShape:function(){S.Ellipse.superclass.setShape.apply(this,arguments);
var D=this.shape,F,E,H,B=[],A=T.normalize([T.translate(D.cx,D.cy),T.scale(D.rx,D.ry)]);
F=V(A,Q[0]);
B.push([F.x,F.y]);
for(var G=1;
G<Q.length;
G+=3){E=V(A,Q[G]);
H=V(A,Q[G+1]);
F=V(A,Q[G+2]);
B.push([E.x,E.y,H.x,H.y,F.x,F.y])
}this.canvasEllipse=B;
return this
},_renderShape:function(B){var A=this.canvasEllipse;
B.beginPath();
B.moveTo.apply(B,A[0]);
for(var D=1;
D<A.length;
++D){B.bezierCurveTo.apply(B,A[D])
}B.closePath()
}});
dojo.declare("dojox.gfx.Circle",M.Circle,{_renderShape:function(A){var B=this.shape;
A.beginPath();
A.arc(B.cx,B.cy,B.r,0,O,1)
}});
dojo.declare("dojox.gfx.Line",M.Line,{_renderShape:function(A){var B=this.shape;
A.beginPath();
A.moveTo(B.x1,B.y1);
A.lineTo(B.x2,B.y2)
}});
dojo.declare("dojox.gfx.Polyline",M.Polyline,{setShape:function(){S.Polyline.superclass.setShape.apply(this,arguments);
var B=this.shape.points,E=B[0],F=[],A,D;
if(B.length){if(typeof E=="number"){F.push(E,B[1]);
D=2
}else{F.push(E.x,E.y);
D=1
}for(;
D<B.length;
++D){A=B[D];
if(typeof A=="number"){F.push(A,B[++D])
}else{F.push(A.x,A.y)
}}}this.canvasPolyline=F;
return this
},_renderShape:function(B){var A=this.canvasPolyline;
if(A.length){B.beginPath();
B.moveTo(A[0],A[1]);
for(var D=2;
D<A.length;
D+=2){B.lineTo(A[D],A[D+1])
}}}});
dojo.declare("dojox.gfx.Image",M.Image,{setShape:function(){S.Image.superclass.setShape.apply(this,arguments);
var A=new Image();
this.surface.downloadImage(A,this.shape.src);
this.canvasImage=A;
return this
},_renderShape:function(A){var B=this.shape;
A.drawImage(this.canvasImage,B.x,B.y,B.width,B.height)
}});
dojo.declare("dojox.gfx.Text",M.Text,{_renderShape:function(A){var B=this.shape
}});
R(S.Text,"setFont");
var C={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};
dojo.declare("dojox.gfx.Path",S.path.Path,{constructor:function(){this.last={};
this.lastControl={}
},setShape:function(){this.canvasPath=[];
return S.Path.superclass.setShape.apply(this,arguments)
},_updateWithSegment:function(B){var A=dojo.clone(this.last);
this[C[B.action]](this.canvasPath,B.action,B.args);
this.last=A;
S.Path.superclass._updateWithSegment.apply(this,arguments)
},_renderShape:function(B){var A=this.canvasPath;
B.beginPath();
for(var D=0;
D<A.length;
D+=2){B[A[D]].apply(B,A[D+1])
}},_moveToA:function(D,A,E){D.push("moveTo",[E[0],E[1]]);
for(var B=2;
B<E.length;
B+=2){D.push("lineTo",[E[B],E[B+1]])
}this.last.x=E[E.length-2];
this.last.y=E[E.length-1];
this.lastControl={}
},_moveToR:function(D,A,E){if("x" in this.last){D.push("moveTo",[this.last.x+=E[0],this.last.y+=E[1]])
}else{D.push("moveTo",[this.last.x=E[0],this.last.y=E[1]])
}for(var B=2;
B<E.length;
B+=2){D.push("lineTo",[this.last.x+=E[B],this.last.y+=E[B+1]])
}this.lastControl={}
},_lineToA:function(D,A,E){for(var B=0;
B<E.length;
B+=2){D.push("lineTo",[E[B],E[B+1]])
}this.last.x=E[E.length-2];
this.last.y=E[E.length-1];
this.lastControl={}
},_lineToR:function(D,A,E){for(var B=0;
B<E.length;
B+=2){D.push("lineTo",[this.last.x+=E[B],this.last.y+=E[B+1]])
}this.lastControl={}
},_hLineToA:function(D,A,E){for(var B=0;
B<E.length;
++B){D.push("lineTo",[E[B],this.last.y])
}this.last.x=E[E.length-1];
this.lastControl={}
},_hLineToR:function(D,A,E){for(var B=0;
B<E.length;
++B){D.push("lineTo",[this.last.x+=E[B],this.last.y])
}this.lastControl={}
},_vLineToA:function(D,A,E){for(var B=0;
B<E.length;
++B){D.push("lineTo",[this.last.x,E[B]])
}this.last.y=E[E.length-1];
this.lastControl={}
},_vLineToR:function(D,A,E){for(var B=0;
B<E.length;
++B){D.push("lineTo",[this.last.x,this.last.y+=E[B]])
}this.lastControl={}
},_curveToA:function(D,A,E){for(var B=0;
B<E.length;
B+=6){D.push("bezierCurveTo",E.slice(B,B+6))
}this.last.x=E[E.length-2];
this.last.y=E[E.length-1];
this.lastControl.x=E[E.length-4];
this.lastControl.y=E[E.length-3];
this.lastControl.type="C"
},_curveToR:function(D,A,E){for(var B=0;
B<E.length;
B+=6){D.push("bezierCurveTo",[this.last.x+E[B],this.last.y+E[B+1],this.lastControl.x=this.last.x+E[B+2],this.lastControl.y=this.last.y+E[B+3],this.last.x+E[B+4],this.last.y+E[B+5]]);
this.last.x+=E[B+4];
this.last.y+=E[B+5]
}this.lastControl.type="C"
},_smoothCurveToA:function(E,A,F){for(var D=0;
D<F.length;
D+=4){var B=this.lastControl.type=="C";
E.push("bezierCurveTo",[B?2*this.last.x-this.lastControl.x:this.last.x,B?2*this.last.y-this.lastControl.y:this.last.y,F[D],F[D+1],F[D+2],F[D+3]]);
this.lastControl.x=F[D];
this.lastControl.y=F[D+1];
this.lastControl.type="C"
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1]
},_smoothCurveToR:function(E,A,F){for(var D=0;
D<F.length;
D+=4){var B=this.lastControl.type=="C";
E.push("bezierCurveTo",[B?2*this.last.x-this.lastControl.x:this.last.x,B?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+F[D],this.last.y+F[D+1],this.last.x+F[D+2],this.last.y+F[D+3]]);
this.lastControl.x=this.last.x+F[D];
this.lastControl.y=this.last.y+F[D+1];
this.lastControl.type="C";
this.last.x+=F[D+2];
this.last.y+=F[D+3]
}},_qCurveToA:function(D,A,E){for(var B=0;
B<E.length;
B+=4){D.push("quadraticCurveTo",E.slice(B,B+4))
}this.last.x=E[E.length-2];
this.last.y=E[E.length-1];
this.lastControl.x=E[E.length-4];
this.lastControl.y=E[E.length-3];
this.lastControl.type="Q"
},_qCurveToR:function(D,A,E){for(var B=0;
B<E.length;
B+=4){D.push("quadraticCurveTo",[this.lastControl.x=this.last.x+E[B],this.lastControl.y=this.last.y+E[B+1],this.last.x+E[B+2],this.last.y+E[B+3]]);
this.last.x+=E[B+2];
this.last.y+=E[B+3]
}this.lastControl.type="Q"
},_qSmoothCurveToA:function(E,A,F){for(var D=0;
D<F.length;
D+=2){var B=this.lastControl.type=="Q";
E.push("quadraticCurveTo",[this.lastControl.x=B?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=B?2*this.last.y-this.lastControl.y:this.last.y,F[D],F[D+1]]);
this.lastControl.type="Q"
}this.last.x=F[F.length-2];
this.last.y=F[F.length-1]
},_qSmoothCurveToR:function(E,A,F){for(var D=0;
D<F.length;
D+=2){var B=this.lastControl.type=="Q";
E.push("quadraticCurveTo",[this.lastControl.x=B?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=B?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+F[D],this.last.y+F[D+1]]);
this.lastControl.type="Q";
this.last.x+=F[D];
this.last.y+=F[D+1]
}},_arcTo:function(H,A,G){var B=A=="a";
for(var F=0;
F<G.length;
F+=7){var I=G[F+5],E=G[F+6];
if(B){I+=this.last.x;
E+=this.last.y
}var D=P.arcAsBezier(this.last,G[F],G[F+1],G[F+2],G[F+3]?1:0,G[F+4]?1:0,I,E);
dojo.forEach(D,function(J){H.push("bezierCurveTo",J)
});
this.last.x=I;
this.last.y=E
}this.lastControl={}
},_closePath:function(B,A,D){B.push("closePath",[]);
this.lastControl={}
}});
dojo.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(A){R(S.Path,A)
});
dojo.declare("dojox.gfx.TextPath",S.path.TextPath,{_renderShape:function(A){var B=this.shape
}});
dojo.declare("dojox.gfx.Surface",M.Surface,{constructor:function(){M.Container._init.call(this);
this.pendingImageCount=0;
this.makeDirty()
},setDimensions:function(B,A){this.width=S.normalizedLength(B);
this.height=S.normalizedLength(A);
if(!this.rawNode){return this
}this.rawNode.width=B;
this.rawNode.height=A;
this.makeDirty();
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null
},render:function(){if(this.pendingImageCount){return 
}var A=this.rawNode.getContext("2d");
A.save();
A.clearRect(0,0,this.rawNode.width,this.rawNode.height);
for(var B=0;
B<this.children.length;
++B){this.children[B].render(A)
}A.restore();
if("pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender" in this)){this.pendingRender=setTimeout(dojo.hitch(this,this.render),0)
}},downloadImage:function(B,D){var A=dojo.hitch(this,this.onImageLoad);
if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}B.onload=A;
B.onerror=A;
B.onabort=A;
B.src=D
},onImageLoad:function(){if(!--this.pendingImageCount){this.render()
}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
S.createSurface=function(G,D,F){if(!D){D="100%"
}if(!F){F="100%"
}var E=new S.Surface(),B=dojo.byId(G),A=B.ownerDocument.createElement("canvas");
A.width=D;
A.height=F;
B.appendChild(A);
E.rawNode=A;
E.surface=E;
return E
};
var N=M.Container,U={add:function(A){this.surface.makeDirty();
return N.add.apply(this,arguments)
},remove:function(A,B){this.surface.makeDirty();
return N.remove.apply(this,arguments)
},clear:function(){this.surface.makeDirty();
return N.clear.apply(this,arguments)
},_moveChildToFront:function(A){this.surface.makeDirty();
return N._moveChildToFront.apply(this,arguments)
},_moveChildToBack:function(A){this.surface.makeDirty();
return N._moveChildToBack.apply(this,arguments)
}};
dojo.mixin(M.Creator,{createObject:function(B,D){var A=new B();
A.surface=this.surface;
A.setShape(D);
this.add(A);
return A
}});
dojo.extend(S.Group,U);
dojo.extend(S.Group,M.Creator);
dojo.extend(S.Surface,U);
dojo.extend(S.Surface,M.Creator)
})()
};