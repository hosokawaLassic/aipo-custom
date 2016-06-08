if(!dojo._hasResource["dojox.gfx.silverlight"]){dojo._hasResource["dojox.gfx.silverlight"]=true;
dojo.provide("dojox.gfx.silverlight");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.experimental("dojox.gfx.silverlight");
dojox.gfx.silverlight.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojox.gfx.silverlight.fontweight={normal:400,bold:700};
dojox.gfx.silverlight.caps={butt:"Flat",round:"Round",square:"Square"};
dojox.gfx.silverlight.joins={bevel:"Bevel",round:"Round"};
dojox.gfx.silverlight.fonts={serif:"Times New Roman",times:"Times New Roman","sans-serif":"Arial",helvetica:"Arial",monotone:"Courier New",courier:"Courier New"};
dojox.gfx.silverlight.hexColor=function(H){var F=dojox.gfx.normalizeColor(H),G=F.toHex(),E=Math.round(F.a*255);
E=(E<0?0:E>255?255:E).toString(16);
return"#"+(E.length<2?"0"+E:E)+G.slice(1)
};
dojo.extend(dojox.gfx.Shape,{setFill:function(P){var N=this.rawNode.getHost().content,O=this.rawNode,T;
if(!P){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (P)=="object"&&"type" in P){switch(P.type){case"linear":this.fillStyle=T=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,P);
var V=N.createFromXaml("<LinearGradientBrush/>");
V.mappingMode="Absolute";
V.startPoint=T.x1+","+T.y1;
V.endPoint=T.x2+","+T.y2;
dojo.forEach(T.colors,function(B){var A=N.createFromXaml("<GradientStop/>");
A.offset=B.offset;
A.color=dojox.gfx.silverlight.hexColor(B.color);
V.gradientStops.add(A)
});
this._setFillAttr(V);
break;
case"radial":this.fillStyle=T=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,P);
var S=N.createFromXaml("<RadialGradientBrush/>"),R=O.width,U=O.height,L=this.rawNode["Canvas.Left"],Q=this.rawNode["Canvas.Top"];
S.center=(T.cx-L)/R+","+(T.cy-Q)/U;
S.radiusX=T.r/R;
S.radiusY=T.r/U;
dojo.forEach(T.colors,function(B){var A=N.createFromXaml("<GradientStop/>");
A.offset=B.offset;
A.color=dojox.gfx.silverlight.hexColor(B.color);
S.gradientStops.add(A)
});
this._setFillAttr(S);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=T=dojox.gfx.normalizeColor(P);
var M=N.createFromXaml("<SolidColorBrush/>");
M.color=T.toHex();
M.opacity=T.a;
this._setFillAttr(M);
return this
},_setFillAttr:function(B){this.rawNode.fill=B
},setStroke:function(I){var J=this.rawNode.getHost().content,K=this.rawNode;
if(!I){this.strokeStyle=null;
K.stroke=null;
return this
}if(typeof I=="string"){I={color:I}
}var L=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,I);
L.color=dojox.gfx.normalizeColor(L.color);
if(L){var H=J.createFromXaml("<SolidColorBrush/>");
H.color=L.color.toHex();
H.opacity=L.color.a;
K.stroke=H;
K.strokeThickness=L.width;
K.strokeStartLineCap=K.strokeEndLineCap=K.strokeDashCap=dojox.gfx.silverlight.caps[L.cap];
if(typeof L.join=="number"){K.strokeLineJoin="Miter";
K.strokeMiterLimit=L.join
}else{K.strokeLineJoin=dojox.gfx.silverlight.joins[L.join]
}var N=L.style.toLowerCase();
if(N in dojox.gfx.silverlight.dasharray){N=dojox.gfx.silverlight.dasharray[N]
}if(N instanceof Array){N=dojo.clone(N);
if(L.cap!="butt"){for(var M=0;
M<N.length;
M+=2){--N[M];
if(N[M]<1){N[M]=1
}}for(var M=1;
M<N.length;
M+=2){++N[M]
}}K.strokeDashArray=N.join(",")
}else{K.strokeDashArray=null
}}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_applyTransform:function(){var J=this.matrix,I=this.rawNode;
if(J){var H=this.rawNode.getHost().content,F=H.createFromXaml("<MatrixTransform/>"),G=H.createFromXaml("<Matrix/>");
G.m11=J.xx;
G.m21=J.xy;
G.m12=J.yx;
G.m22=J.yy;
G.offsetX=J.dx;
G.offsetY=J.dy;
F.matrix=G;
I.renderTransform=F
}else{I.renderTransform=null
}return this
},setRawNode:function(B){B.fill=null;
B.stroke=null;
this.rawNode=B
},_moveToFront:function(){var D=this.parent.rawNode.children,C=this.rawNode;
D.remove(C);
D.add(C);
return this
},_moveToBack:function(){var D=this.parent.rawNode.children,C=this.rawNode;
D.remove(C);
D.insert(0,C);
return this
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Group.nodeType="Canvas";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var F=this.rawNode,E=this.shape;
F["Canvas.Left"]=E.x;
F["Canvas.Top"]=E.y;
F.width=E.width;
F.height=E.height;
F.radiusX=F.radiusY=E.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var F=this.rawNode,E=this.shape;
F["Canvas.Left"]=E.cx-E.rx;
F["Canvas.Top"]=E.cy-E.ry;
F.width=2*E.rx;
F.height=2*E.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var F=this.rawNode,E=this.shape;
F["Canvas.Left"]=E.cx-E.r;
F["Canvas.Top"]=E.cy-E.r;
F.width=F.height=2*E.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var F=this.rawNode,E=this.shape;
F.x1=E.x1;
F.y1=E.y1;
F.x2=E.x2;
F.y2=E.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(H,F){if(H&&H instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:H});
if(F&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,H)
}this.box=null;
var G=this.shape.points,I=[];
for(var J=0;
J<G.length;
++J){if(typeof G[J]=="number"){I.push(G[J],G[++J])
}else{I.push(G[J].x,G[J].y)
}}this.rawNode.points=I.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var F=this.rawNode,E=this.shape;
F["Canvas.Left"]=E.x;
F["Canvas.Top"]=E.y;
F.width=E.width;
F.height=E.height;
F.source=E.src;
return this
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Image.nodeType="Image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var E=this.rawNode,F=this.shape;
E.text=F.text;
E.textDecorations=F.decoration=="underline"?"Underline":"None";
E["Canvas.Left"]=-10000;
E["Canvas.Top"]=-10000;
window.setTimeout(dojo.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var J=this.rawNode,K=this.shape,M=J.actualWidth,L=J.actualHeight,H=K.x,I=K.y-L*0.75;
switch(K.align){case"middle":H-=M/2;
break;
case"end":H-=M;
break
}var N=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,H,I):{x:H,y:I};
J["Canvas.Left"]=N.x;
J["Canvas.Top"]=N.y
},setStroke:function(){return this
},_setFillAttr:function(B){this.rawNode.foreground=B
},setRawNode:function(B){this.rawNode=B
},_applyTransform:function(){var J=this.matrix,I=this.rawNode;
if(J){J=dojox.gfx.matrix.normalize([1/100,J,100]);
var H=this.rawNode.getHost().content,F=H.createFromXaml("<MatrixTransform/>"),G=H.createFromXaml("<Matrix/>");
G.m11=J.xx;
G.m21=J.xy;
G.m12=J.yx;
G.m22=J.yy;
G.offsetX=J.dx;
G.offsetY=J.dy;
F.matrix=G;
I.renderTransform=F
}else{I.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(C){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var D=this.shape.path;
if(typeof (D)=="string"){this.rawNode.data=D?D:null
}},setShape:function(C){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var D=this.shape.path;
this.rawNode.data=D?D:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(B){},setShape:function(B){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(F,D){this.width=dojox.gfx.normalizedLength(F);
this.height=dojox.gfx.normalizedLength(D);
var E=this.rawNode&&this.rawNode.getHost();
if(E){E.width=F;
E.height=D
}return this
},getDimensions:function(){var D=this.rawNode&&this.rawNode.getHost();
var C=D?{width:D.content.actualWidth,height:D.content.actualHeight}:null;
if(C.width<=0){C.width=this.width
}if(C.height<=0){C.height=this.height
}return C
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(L,I,G){var J=new dojox.gfx.Surface();
L=dojo.byId(L);
var K=L.ownerDocument.createElement("script");
K.type="text/xaml";
K.id=dojox.gfx._base._getUniqueId();
K.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(K);
var H=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+K.id,L,H,{width:String(I),height:String(G),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
J.rawNode=dojo.byId(H).content.root;
dojox.gfx.silverlight.surfaces[J.rawNode.name]=L;
J.width=dojox.gfx.normalizedLength(I);
J.height=dojox.gfx.normalizedLength(G);
return J
};
dojox.gfx.silverlight.Font={_setFont:function(){var G=this.fontStyle,I=this.rawNode,H=dojox.gfx.silverlight.fontweight,J=dojox.gfx.silverlight.fonts,F=G.family.toLowerCase();
I.fontStyle=G.style=="italic"?"Italic":"Normal";
I.fontWeight=G.weight in H?H[G.weight]:G.weight;
I.fontSize=dojox.gfx.normalizedLength(G.size);
I.fontFamily=F in J?J[F]:G.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(B.rawNode)
}return this
},remove:function(D,E){if(this==D.getParent()){var F=D.rawNode.getParent();
if(F){F.children.remove(D.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(F,H){if(!this.rawNode){return null
}var E=new F();
var G=this.rawNode.getHost().content.createFromXaml("<"+F.nodeType+"/>");
E.setRawNode(G);
E.setShape(H);
this.add(E);
return E
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var F=dojox.gfx.silverlight.surfaces;
var J=function(C,L){var B={target:C,currentTarget:C,preventDefault:function(){},stopPropagation:function(){}};
if(L){B.ctrlKey=L.ctrl;
B.shiftKey=L.shift;
var A=L.getPosition(null);
B.x=B.offsetX=B.layerX=A.x;
B.y=B.offsetY=B.layerY=A.y;
var D=F[C.getHost().content.root.name];
var E=dojo._abs(D);
B.clientX=E.x+A.x;
B.clientY=E.y+A.y
}return B
};
var H=function(B,C){var A={keyCode:C.platformKeyCode,ctrlKey:C.ctrl,shiftKey:C.shift};
return A
};
var G={onclick:{name:"MouseLeftButtonUp",fix:J},onmouseenter:{name:"MouseEnter",fix:J},onmouseleave:{name:"MouseLeave",fix:J},onmousedown:{name:"MouseLeftButtonDown",fix:J},onmouseup:{name:"MouseLeftButtonUp",fix:J},onmousemove:{name:"MouseMove",fix:J},onkeydown:{name:"KeyDown",fix:H},onkeyup:{name:"KeyUp",fix:H}};
var I={connect:function(D,E,A){var C,B=D in G?G[D]:{name:D,fix:function(){return{}
}};
if(arguments.length>2){C=this.getEventSource().addEventListener(B.name,function(M,N){dojo.hitch(E,A)(B.fix(M,N))
})
}else{C=this.getEventSource().addEventListener(B.name,function(M,N){E(B.fix(M,N))
})
}return{name:B.name,token:C}
},disconnect:function(A){this.getEventSource().removeEventListener(A.name,A.token)
}};
dojo.extend(dojox.gfx.Shape,I);
dojo.extend(dojox.gfx.Surface,I);
dojox.gfx.equalSources=function(A,B){return A&&B&&A.equals(B)
}
})()
};