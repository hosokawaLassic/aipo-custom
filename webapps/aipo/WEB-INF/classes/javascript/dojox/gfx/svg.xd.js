dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.svg"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.svg"]){B._hasResource["dojox.gfx.svg"]=true;
B.provide("dojox.gfx.svg");
B.require("dojox.gfx._base");
B.require("dojox.gfx.shape");
B.require("dojox.gfx.path");
dojox.gfx.svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};
dojox.gfx.svg.getRef=function(A){if(!A||A=="none"){return null
}if(A.match(/^url\(#.+\)$/)){return B.byId(A.slice(5,-1))
}if(A.match(/^#dojoUnique\d+$/)){return B.byId(A.slice(1))
}return null
};
dojox.gfx.svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
B.extend(dojox.gfx.Shape,{setFill:function(G){if(!G){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var I;
var A=function(C){this.setAttribute(C,I[C].toFixed(8))
};
if(typeof (G)=="object"&&"type" in G){switch(G.type){case"linear":I=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,G);
var H=this._setFillObject(I,"linearGradient");
B.forEach(["x1","y1","x2","y2"],A,H);
break;
case"radial":I=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,G);
var H=this._setFillObject(I,"radialGradient");
B.forEach(["cx","cy","r"],A,H);
break;
case"pattern":I=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,G);
var J=this._setFillObject(I,"pattern");
B.forEach(["x","y","width","height"],A,J);
break
}this.fillStyle=I;
return this
}var I=dojox.gfx.normalizeColor(G);
this.fillStyle=I;
this.rawNode.setAttribute("fill",I.toCss());
this.rawNode.setAttribute("fill-opacity",I.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(A){if(!A){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof A=="string"){A={color:A}
}var H=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A);
H.color=dojox.gfx.normalizeColor(H.color);
var G=this.rawNode;
if(H){G.setAttribute("stroke",H.color.toCss());
G.setAttribute("stroke-opacity",H.color.a);
G.setAttribute("stroke-width",H.width);
G.setAttribute("stroke-linecap",H.cap);
if(typeof H.join=="number"){G.setAttribute("stroke-linejoin","miter");
G.setAttribute("stroke-miterlimit",H.join)
}else{G.setAttribute("stroke-linejoin",H.join)
}var J=H.style.toLowerCase();
if(J in dojox.gfx.svg.dasharray){J=dojox.gfx.svg.dasharray[J]
}if(J instanceof Array){J=B.clone(J);
for(var I=0;
I<J.length;
++I){J[I]*=H.width
}if(H.cap!="butt"){for(var I=0;
I<J.length;
I+=2){J[I]-=H.width;
if(J[I]<1){J[I]=1
}}for(var I=1;
I<J.length;
I+=2){J[I]+=H.width
}}J=J.join(",")
}G.setAttribute("stroke-dasharray",J);
G.setAttribute("dojoGfxStrokeStyle",H.style)
}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_setFillObject:function(T,X){var Y=dojox.gfx.svg.xmlns.svg;
this.fillStyle=T;
var O=this._getParentSurface();
var W=O.defNode;
var Q=this.rawNode.getAttribute("fill");
var A=dojox.gfx.svg.getRef(Q);
if(A){Q=A;
if(Q.tagName.toLowerCase()!=X.toLowerCase()){var P=Q.id;
Q.parentNode.removeChild(Q);
Q=document.createElementNS(Y,X);
Q.setAttribute("id",P);
W.appendChild(Q)
}else{while(Q.childNodes.length){Q.removeChild(Q.lastChild)
}}}else{Q=document.createElementNS(Y,X);
Q.setAttribute("id",dojox.gfx._base._getUniqueId());
W.appendChild(Q)
}if(X=="pattern"){if(B.isSafari){Q.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{Q.setAttribute("patternUnits","userSpaceOnUse")
}var U=document.createElementNS(Y,"image");
U.setAttribute("x",0);
U.setAttribute("y",0);
U.setAttribute("width",T.width.toFixed(8));
U.setAttribute("height",T.height.toFixed(8));
U.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",T.src);
Q.appendChild(U)
}else{if(B.isSafari){Q.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{Q.setAttribute("gradientUnits","userSpaceOnUse")
}for(var V=0;
V<T.colors.length;
++V){var S=T.colors[V],R=document.createElementNS(Y,"stop"),Z=S.color=dojox.gfx.normalizeColor(S.color);
R.setAttribute("offset",S.offset.toFixed(8));
R.setAttribute("stop-color",Z.toCss());
R.setAttribute("stop-opacity",Z.a);
Q.appendChild(R)
}}this.rawNode.setAttribute("fill","url(#"+Q.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return Q
},_applyTransform:function(){var A=this.matrix;
if(A){var D=this.matrix;
this.rawNode.setAttribute("transform","matrix("+D.xx.toFixed(8)+","+D.yx.toFixed(8)+","+D.xy.toFixed(8)+","+D.yy.toFixed(8)+","+D.dx.toFixed(8)+","+D.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(A){var D=this.rawNode=A;
D.setAttribute("fill","none");
D.setAttribute("fill-opacity",0);
D.setAttribute("stroke","none");
D.setAttribute("stroke-opacity",0);
D.setAttribute("stroke-width",1);
D.setAttribute("stroke-linecap","butt");
D.setAttribute("stroke-linejoin","miter");
D.setAttribute("stroke-miterlimit",4)
},setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
for(var A in this.shape){if(A!="type"){this.rawNode.setAttribute(A,this.shape[A])
}}return this
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);
return this
}});
B.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Group.nodeType="g";
B.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
for(var A in this.shape){if(A!="type"&&A!="r"){this.rawNode.setAttribute(A,this.shape[A])
}}if(this.shape.r){this.rawNode.setAttribute("ry",this.shape.r);
this.rawNode.setAttribute("rx",this.shape.r)
}return this
}});
dojox.gfx.Rect.nodeType="rect";
dojox.gfx.Ellipse=dojox.gfx.shape.Ellipse;
dojox.gfx.Ellipse.nodeType="ellipse";
dojox.gfx.Circle=dojox.gfx.shape.Circle;
dojox.gfx.Circle.nodeType="circle";
dojox.gfx.Line=dojox.gfx.shape.Line;
dojox.gfx.Line.nodeType="line";
B.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(G,I){if(G&&G instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:G});
if(I&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,G)
}this.box=null;
var J=[];
var A=this.shape.points;
for(var H=0;
H<A.length;
++H){if(typeof A[H]=="number"){J.push(A[H].toFixed(8))
}else{J.push(A[H].x.toFixed(8));
J.push(A[H].y.toFixed(8))
}}this.rawNode.setAttribute("points",J.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
B.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var A=this.rawNode;
for(var E in this.shape){if(E!="type"&&E!="src"){A.setAttribute(E,this.shape[E])
}}A.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
B.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(F){this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var A=this.rawNode;
var E=this.shape;
A.setAttribute("x",E.x);
A.setAttribute("y",E.y);
A.setAttribute("text-anchor",E.align);
A.setAttribute("text-decoration",E.decoration);
A.setAttribute("rotate",E.rotated?90:0);
A.setAttribute("kerning",E.kerning?"auto":0);
A.setAttribute("text-rendering","optimizeLegibility");
A.textContent=E.text;
return this
},getTextWidth:function(){var A=this.rawNode;
var H=A.parentNode;
var I=A.cloneNode(true);
I.style.visibility="hidden";
var J=0;
var G=I.firstChild.nodeValue;
H.appendChild(I);
if(G!=""){while(!J){J=parseInt(I.getBBox().width)
}}H.removeChild(I);
return J
}});
dojox.gfx.Text.nodeType="text";
B.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(A){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path)
}},setShape:function(A){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.rawNode.setAttribute("d",this.shape.path);
return this
}});
dojox.gfx.Path.nodeType="path";
B.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(A){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
this._setTextPath()
},setShape:function(A){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this._setTextPath();
return this
},_setTextPath:function(){if(typeof this.shape.path!="string"){return 
}var L=this.rawNode;
if(!L.firstChild){var J=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var N=document.createTextNode("");
J.appendChild(N);
L.appendChild(J)
}var M=L.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var K=M&&dojox.gfx.svg.getRef(M);
if(!K){var O=this._getParentSurface();
if(O){var P=O.defNode;
K=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var A=dojox.gfx._base._getUniqueId();
K.setAttribute("id",A);
P.appendChild(K);
L.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+A)
}}if(K){K.setAttribute("d",this.shape.path)
}},_setText:function(){var F=this.rawNode;
if(!F.firstChild){var A=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var H=document.createTextNode("");
A.appendChild(H);
F.appendChild(A)
}F=F.firstChild;
var G=this.text;
F.setAttribute("alignment-baseline","middle");
switch(G.align){case"middle":F.setAttribute("text-anchor","middle");
F.setAttribute("startOffset","50%");
break;
case"end":F.setAttribute("text-anchor","end");
F.setAttribute("startOffset","100%");
break;
default:F.setAttribute("text-anchor","start");
F.setAttribute("startOffset","0%");
break
}F.setAttribute("baseline-shift","0.5ex");
F.setAttribute("text-decoration",G.decoration);
F.setAttribute("rotate",G.rotated?90:0);
F.setAttribute("kerning",G.kerning?"auto":0);
F.firstChild.data=G.text
}});
dojox.gfx.TextPath.nodeType="text";
B.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(A,D){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",A);
this.rawNode.setAttribute("height",D);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(I,G,J){var H=new dojox.gfx.Surface();
H.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
H.rawNode.setAttribute("width",G);
H.rawNode.setAttribute("height",J);
var A=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
H.rawNode.appendChild(A);
H.defNode=A;
B.byId(I).appendChild(H.rawNode);
return H
};
dojox.gfx.svg.Font={_setFont:function(){var A=this.fontStyle;
this.rawNode.setAttribute("font-style",A.style);
this.rawNode.setAttribute("font-variant",A.variant);
this.rawNode.setAttribute("font-weight",A.weight);
this.rawNode.setAttribute("font-size",A.size);
this.rawNode.setAttribute("font-family",A.family)
}};
dojox.gfx.svg.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){this.rawNode.appendChild(A.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(D,A){if(this==D.getParent()){if(this.rawNode==D.rawNode.parentNode){this.rawNode.removeChild(D.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.lastChild){A.removeChild(A.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
B.mixin(dojox.gfx.shape.Creator,{createObject:function(A,G){if(!this.rawNode){return null
}var H=new A();
var F=document.createElementNS(dojox.gfx.svg.xmlns.svg,A.nodeType);
H.setRawNode(F);
this.rawNode.appendChild(F);
H.setShape(G);
this.add(H);
return H
}});
B.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
B.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
B.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
B.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
B.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
B.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});