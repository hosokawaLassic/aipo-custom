dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.silverlight"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.silverlight"]){B._hasResource["dojox.gfx.silverlight"]=true;
B.provide("dojox.gfx.silverlight");
B.require("dojox.gfx._base");
B.require("dojox.gfx.shape");
B.require("dojox.gfx.path");
B.experimental("dojox.gfx.silverlight");
dojox.gfx.silverlight.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojox.gfx.silverlight.fontweight={normal:400,bold:700};
dojox.gfx.silverlight.caps={butt:"Flat",round:"Round",square:"Square"};
dojox.gfx.silverlight.joins={bevel:"Bevel",round:"Round"};
dojox.gfx.silverlight.fonts={serif:"Times New Roman",times:"Times New Roman","sans-serif":"Arial",helvetica:"Arial",monotone:"Courier New",courier:"Courier New"};
dojox.gfx.silverlight.hexColor=function(G){var A=dojox.gfx.normalizeColor(G),F=A.toHex(),H=Math.round(A.a*255);
H=(H<0?0:H>255?255:H).toString(16);
return"#"+(H.length<2?"0"+H:H)+F.slice(1)
};
B.extend(dojox.gfx.Shape,{setFill:function(O){var M=this.rawNode.getHost().content,N=this.rawNode,S;
if(!O){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (O)=="object"&&"type" in O){switch(O.type){case"linear":this.fillStyle=S=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,O);
var U=M.createFromXaml("<LinearGradientBrush/>");
U.mappingMode="Absolute";
U.startPoint=S.x1+","+S.y1;
U.endPoint=S.x2+","+S.y2;
B.forEach(S.colors,function(C){var D=M.createFromXaml("<GradientStop/>");
D.offset=C.offset;
D.color=dojox.gfx.silverlight.hexColor(C.color);
U.gradientStops.add(D)
});
this._setFillAttr(U);
break;
case"radial":this.fillStyle=S=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,O);
var R=M.createFromXaml("<RadialGradientBrush/>"),Q=N.width,T=N.height,V=this.rawNode["Canvas.Left"],P=this.rawNode["Canvas.Top"];
R.center=(S.cx-V)/Q+","+(S.cy-P)/T;
R.radiusX=S.r/Q;
R.radiusY=S.r/T;
B.forEach(S.colors,function(C){var D=M.createFromXaml("<GradientStop/>");
D.offset=C.offset;
D.color=dojox.gfx.silverlight.hexColor(C.color);
R.gradientStops.add(D)
});
this._setFillAttr(R);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=S=dojox.gfx.normalizeColor(O);
var A=M.createFromXaml("<SolidColorBrush/>");
A.color=S.toHex();
A.opacity=S.a;
this._setFillAttr(A);
return this
},_setFillAttr:function(A){this.rawNode.fill=A
},setStroke:function(A){var I=this.rawNode.getHost().content,J=this.rawNode;
if(!A){this.strokeStyle=null;
J.stroke=null;
return this
}if(typeof A=="string"){A={color:A}
}var K=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A);
K.color=dojox.gfx.normalizeColor(K.color);
if(K){var N=I.createFromXaml("<SolidColorBrush/>");
N.color=K.color.toHex();
N.opacity=K.color.a;
J.stroke=N;
J.strokeThickness=K.width;
J.strokeStartLineCap=J.strokeEndLineCap=J.strokeDashCap=dojox.gfx.silverlight.caps[K.cap];
if(typeof K.join=="number"){J.strokeLineJoin="Miter";
J.strokeMiterLimit=K.join
}else{J.strokeLineJoin=dojox.gfx.silverlight.joins[K.join]
}var M=K.style.toLowerCase();
if(M in dojox.gfx.silverlight.dasharray){M=dojox.gfx.silverlight.dasharray[M]
}if(M instanceof Array){M=B.clone(M);
if(K.cap!="butt"){for(var L=0;
L<M.length;
L+=2){--M[L];
if(M[L]<1){M[L]=1
}}for(var L=1;
L<M.length;
L+=2){++M[L]
}}J.strokeDashArray=M.join(",")
}else{J.strokeDashArray=null
}}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_applyTransform:function(){var I=this.matrix,H=this.rawNode;
if(I){var G=this.rawNode.getHost().content,J=G.createFromXaml("<MatrixTransform/>"),A=G.createFromXaml("<Matrix/>");
A.m11=I.xx;
A.m21=I.xy;
A.m12=I.yx;
A.m22=I.yy;
A.offsetX=I.dx;
A.offsetY=I.dy;
J.matrix=A;
H.renderTransform=J
}else{H.renderTransform=null
}return this
},setRawNode:function(A){A.fill=null;
A.stroke=null;
this.rawNode=A
},_moveToFront:function(){var A=this.parent.rawNode.children,D=this.rawNode;
A.remove(D);
A.add(D);
return this
},_moveToBack:function(){var A=this.parent.rawNode.children,D=this.rawNode;
A.remove(D);
A.insert(0,D);
return this
}});
B.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Group.nodeType="Canvas";
B.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode,A=this.shape;
E["Canvas.Left"]=A.x;
E["Canvas.Top"]=A.y;
E.width=A.width;
E.height=A.height;
E.radiusX=E.radiusY=A.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
B.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode,A=this.shape;
E["Canvas.Left"]=A.cx-A.rx;
E["Canvas.Top"]=A.cy-A.ry;
E.width=2*A.rx;
E.height=2*A.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
B.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode,A=this.shape;
E["Canvas.Left"]=A.cx-A.r;
E["Canvas.Top"]=A.cy-A.r;
E.width=E.height=2*A.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
B.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode,A=this.shape;
E.x1=A.x1;
E.y1=A.y1;
E.x2=A.x2;
E.y2=A.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
B.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(G,J){if(G&&G instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:G});
if(J&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,G)
}this.box=null;
var A=this.shape.points,H=[];
for(var I=0;
I<A.length;
++I){if(typeof A[I]=="number"){H.push(A[I],A[++I])
}else{H.push(A[I].x,A[I].y)
}}this.rawNode.points=H.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
B.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode,A=this.shape;
E["Canvas.Left"]=A.x;
E["Canvas.Top"]=A.y;
E.width=A.width;
E.height=A.height;
E.source=A.src;
return this
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Image.nodeType="Image";
B.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var A=this.rawNode,E=this.shape;
A.text=E.text;
A.textDecorations=E.decoration=="underline"?"Underline":"None";
A["Canvas.Left"]=-10000;
A["Canvas.Top"]=-10000;
window.setTimeout(B.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var I=this.rawNode,J=this.shape,L=I.actualWidth,K=I.actualHeight,N=J.x,A=J.y-K*0.75;
switch(J.align){case"middle":N-=L/2;
break;
case"end":N-=L;
break
}var M=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,N,A):{x:N,y:A};
I["Canvas.Left"]=M.x;
I["Canvas.Top"]=M.y
},setStroke:function(){return this
},_setFillAttr:function(A){this.rawNode.foreground=A
},setRawNode:function(A){this.rawNode=A
},_applyTransform:function(){var I=this.matrix,H=this.rawNode;
if(I){I=dojox.gfx.matrix.normalize([1/100,I,100]);
var G=this.rawNode.getHost().content,J=G.createFromXaml("<MatrixTransform/>"),A=G.createFromXaml("<Matrix/>");
A.m11=I.xx;
A.m21=I.xy;
A.m12=I.yx;
A.m22=I.yy;
A.offsetX=I.dx;
A.offsetY=I.dy;
J.matrix=A;
H.renderTransform=J
}else{H.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
B.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(D){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var A=this.shape.path;
if(typeof (A)=="string"){this.rawNode.data=A?A:null
}},setShape:function(D){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var A=this.shape.path;
this.rawNode.data=A?A:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
B.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(A){},setShape:function(A){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
B.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(E,F){this.width=dojox.gfx.normalizedLength(E);
this.height=dojox.gfx.normalizedLength(F);
var A=this.rawNode&&this.rawNode.getHost();
if(A){A.width=E;
A.height=F
}return this
},getDimensions:function(){var A=this.rawNode&&this.rawNode.getHost();
var D=A?{width:A.content.actualWidth,height:A.content.actualHeight}:null;
if(D.width<=0){D.width=this.width
}if(D.height<=0){D.height=this.height
}return D
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(K,H,L){var I=new dojox.gfx.Surface();
K=B.byId(K);
var J=K.ownerDocument.createElement("script");
J.type="text/xaml";
J.id=dojox.gfx._base._getUniqueId();
J.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(J);
var A=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+J.id,K,A,{width:String(H),height:String(L),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
I.rawNode=B.byId(A).content.root;
dojox.gfx.silverlight.surfaces[I.rawNode.name]=K;
I.width=dojox.gfx.normalizedLength(H);
I.height=dojox.gfx.normalizedLength(L);
return I
};
dojox.gfx.silverlight.Font={_setFont:function(){var A=this.fontStyle,H=this.rawNode,G=dojox.gfx.silverlight.fontweight,I=dojox.gfx.silverlight.fonts,J=A.family.toLowerCase();
H.fontStyle=A.style=="italic"?"Italic":"Normal";
H.fontWeight=A.weight in G?G[A.weight]:A.weight;
H.fontSize=dojox.gfx.normalizedLength(A.size);
H.fontFamily=J in I?I[J]:A.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(A.rawNode)
}return this
},remove:function(F,A){if(this==F.getParent()){var E=F.rawNode.getParent();
if(E){E.children.remove(F.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
B.mixin(dojox.gfx.shape.Creator,{createObject:function(A,G){if(!this.rawNode){return null
}var H=new A();
var F=this.rawNode.getHost().content.createFromXaml("<"+A.nodeType+"/>");
H.setRawNode(F);
H.setShape(G);
this.add(H);
return H
}});
B.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
B.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
B.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
B.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
B.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var J=dojox.gfx.silverlight.surfaces;
var I=function(E,N){var D={target:E,currentTarget:E,preventDefault:function(){},stopPropagation:function(){}};
if(N){D.ctrlKey=N.ctrl;
D.shiftKey=N.shift;
var C=N.getPosition(null);
D.x=D.offsetX=D.layerX=C.x;
D.y=D.offsetY=D.layerY=C.y;
var F=J[E.getHost().content.root.name];
var M=B._abs(F);
D.clientX=M.x+C.x;
D.clientY=M.y+C.y
}return D
};
var G=function(D,E){var C={keyCode:E.platformKeyCode,ctrlKey:E.ctrl,shiftKey:E.shift};
return C
};
var A={onclick:{name:"MouseLeftButtonUp",fix:I},onmouseenter:{name:"MouseEnter",fix:I},onmouseleave:{name:"MouseLeave",fix:I},onmousedown:{name:"MouseLeftButtonDown",fix:I},onmouseup:{name:"MouseLeftButtonUp",fix:I},onmousemove:{name:"MouseMove",fix:I},onkeydown:{name:"KeyDown",fix:G},onkeyup:{name:"KeyUp",fix:G}};
var H={connect:function(F,L,C){var E,D=F in A?A[F]:{name:F,fix:function(){return{}
}};
if(arguments.length>2){E=this.getEventSource().addEventListener(D.name,function(N,K){B.hitch(L,C)(D.fix(N,K))
})
}else{E=this.getEventSource().addEventListener(D.name,function(N,K){L(D.fix(N,K))
})
}return{name:D.name,token:E}
},disconnect:function(C){this.getEventSource().removeEventListener(C.name,C.token)
}};
B.extend(dojox.gfx.Shape,H);
B.extend(dojox.gfx.Surface,H);
dojox.gfx.equalSources=function(C,D){return C&&D&&C.equals(D)
}
})()
}}});