if(!dojo._hasResource["dojox.gfx.svg"]){dojo._hasResource["dojox.gfx.svg"]=true;
dojo.provide("dojox.gfx.svg");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojox.gfx.svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};
dojox.gfx.svg.getRef=function(B){if(!B||B=="none"){return null
}if(B.match(/^url\(#.+\)$/)){return dojo.byId(B.slice(5,-1))
}if(B.match(/^#dojoUnique\d+$/)){return dojo.byId(B.slice(1))
}return null
};
dojox.gfx.svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojo.extend(dojox.gfx.Shape,{setFill:function(H){if(!H){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var J;
var G=function(A){this.setAttribute(A,J[A].toFixed(8))
};
if(typeof (H)=="object"&&"type" in H){switch(H.type){case"linear":J=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,H);
var I=this._setFillObject(J,"linearGradient");
dojo.forEach(["x1","y1","x2","y2"],G,I);
break;
case"radial":J=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,H);
var I=this._setFillObject(J,"radialGradient");
dojo.forEach(["cx","cy","r"],G,I);
break;
case"pattern":J=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,H);
var F=this._setFillObject(J,"pattern");
dojo.forEach(["x","y","width","height"],G,F);
break
}this.fillStyle=J;
return this
}var J=dojox.gfx.normalizeColor(H);
this.fillStyle=J;
this.rawNode.setAttribute("fill",J.toCss());
this.rawNode.setAttribute("fill-opacity",J.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(G){if(!G){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof G=="string"){G={color:G}
}var I=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,G);
I.color=dojox.gfx.normalizeColor(I.color);
var H=this.rawNode;
if(I){H.setAttribute("stroke",I.color.toCss());
H.setAttribute("stroke-opacity",I.color.a);
H.setAttribute("stroke-width",I.width);
H.setAttribute("stroke-linecap",I.cap);
if(typeof I.join=="number"){H.setAttribute("stroke-linejoin","miter");
H.setAttribute("stroke-miterlimit",I.join)
}else{H.setAttribute("stroke-linejoin",I.join)
}var F=I.style.toLowerCase();
if(F in dojox.gfx.svg.dasharray){F=dojox.gfx.svg.dasharray[F]
}if(F instanceof Array){F=dojo.clone(F);
for(var J=0;
J<F.length;
++J){F[J]*=I.width
}if(I.cap!="butt"){for(var J=0;
J<F.length;
J+=2){F[J]-=I.width;
if(F[J]<1){F[J]=1
}}for(var J=1;
J<F.length;
J+=2){F[J]+=I.width
}}F=F.join(",")
}H.setAttribute("stroke-dasharray",F);
H.setAttribute("dojoGfxStrokeStyle",I.style)
}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_setFillObject:function(U,Y){var Z=dojox.gfx.svg.xmlns.svg;
this.fillStyle=U;
var P=this._getParentSurface();
var X=P.defNode;
var R=this.rawNode.getAttribute("fill");
var O=dojox.gfx.svg.getRef(R);
if(O){R=O;
if(R.tagName.toLowerCase()!=Y.toLowerCase()){var Q=R.id;
R.parentNode.removeChild(R);
R=document.createElementNS(Z,Y);
R.setAttribute("id",Q);
X.appendChild(R)
}else{while(R.childNodes.length){R.removeChild(R.lastChild)
}}}else{R=document.createElementNS(Z,Y);
R.setAttribute("id",dojox.gfx._base._getUniqueId());
X.appendChild(R)
}if(Y=="pattern"){if(dojo.isSafari){R.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{R.setAttribute("patternUnits","userSpaceOnUse")
}var V=document.createElementNS(Z,"image");
V.setAttribute("x",0);
V.setAttribute("y",0);
V.setAttribute("width",U.width.toFixed(8));
V.setAttribute("height",U.height.toFixed(8));
V.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",U.src);
R.appendChild(V)
}else{if(dojo.isSafari){R.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{R.setAttribute("gradientUnits","userSpaceOnUse")
}for(var W=0;
W<U.colors.length;
++W){var T=U.colors[W],S=document.createElementNS(Z,"stop"),N=T.color=dojox.gfx.normalizeColor(T.color);
S.setAttribute("offset",T.offset.toFixed(8));
S.setAttribute("stop-color",N.toCss());
S.setAttribute("stop-opacity",N.a);
R.appendChild(S)
}}this.rawNode.setAttribute("fill","url(#"+R.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return R
},_applyTransform:function(){var D=this.matrix;
if(D){var C=this.matrix;
this.rawNode.setAttribute("transform","matrix("+C.xx.toFixed(8)+","+C.yx.toFixed(8)+","+C.xy.toFixed(8)+","+C.yy.toFixed(8)+","+C.dx.toFixed(8)+","+C.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(D){var C=this.rawNode=D;
C.setAttribute("fill","none");
C.setAttribute("fill-opacity",0);
C.setAttribute("stroke","none");
C.setAttribute("stroke-opacity",0);
C.setAttribute("stroke-width",1);
C.setAttribute("stroke-linecap","butt");
C.setAttribute("stroke-linejoin","miter");
C.setAttribute("stroke-miterlimit",4)
},setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
for(var D in this.shape){if(D!="type"){this.rawNode.setAttribute(D,this.shape[D])
}}return this
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);
return this
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Group.nodeType="g";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
for(var D in this.shape){if(D!="type"&&D!="r"){this.rawNode.setAttribute(D,this.shape[D])
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
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(H,J){if(H&&H instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:H});
if(J&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,H)
}this.box=null;
var F=[];
var G=this.shape.points;
for(var I=0;
I<G.length;
++I){if(typeof G[I]=="number"){F.push(G[I].toFixed(8))
}else{F.push(G[I].x.toFixed(8));
F.push(G[I].y.toFixed(8))
}}this.rawNode.setAttribute("points",F.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var E=this.rawNode;
for(var F in this.shape){if(F!="type"&&F!="src"){E.setAttribute(F,this.shape[F])
}}E.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var E=this.rawNode;
var F=this.shape;
E.setAttribute("x",F.x);
E.setAttribute("y",F.y);
E.setAttribute("text-anchor",F.align);
E.setAttribute("text-decoration",F.decoration);
E.setAttribute("rotate",F.rotated?90:0);
E.setAttribute("kerning",F.kerning?"auto":0);
E.setAttribute("text-rendering","optimizeLegibility");
E.textContent=F.text;
return this
},getTextWidth:function(){var G=this.rawNode;
var I=G.parentNode;
var J=G.cloneNode(true);
J.style.visibility="hidden";
var F=0;
var H=J.firstChild.nodeValue;
I.appendChild(J);
if(H!=""){while(!F){F=parseInt(J.getBBox().width)
}}I.removeChild(J);
return F
}});
dojox.gfx.Text.nodeType="text";
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path)
}},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.rawNode.setAttribute("d",this.shape.path);
return this
}});
dojox.gfx.Path.nodeType="path";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
this._setTextPath()
},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this._setTextPath();
return this
},_setTextPath:function(){if(typeof this.shape.path!="string"){return 
}var M=this.rawNode;
if(!M.firstChild){var K=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var O=document.createTextNode("");
K.appendChild(O);
M.appendChild(K)
}var N=M.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var L=N&&dojox.gfx.svg.getRef(N);
if(!L){var P=this._getParentSurface();
if(P){var I=P.defNode;
L=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var J=dojox.gfx._base._getUniqueId();
L.setAttribute("id",J);
I.appendChild(L);
M.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+J)
}}if(L){L.setAttribute("d",this.shape.path)
}},_setText:function(){var G=this.rawNode;
if(!G.firstChild){var F=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var E=document.createTextNode("");
F.appendChild(E);
G.appendChild(F)
}G=G.firstChild;
var H=this.text;
G.setAttribute("alignment-baseline","middle");
switch(H.align){case"middle":G.setAttribute("text-anchor","middle");
G.setAttribute("startOffset","50%");
break;
case"end":G.setAttribute("text-anchor","end");
G.setAttribute("startOffset","100%");
break;
default:G.setAttribute("text-anchor","start");
G.setAttribute("startOffset","0%");
break
}G.setAttribute("baseline-shift","0.5ex");
G.setAttribute("text-decoration",H.decoration);
G.setAttribute("rotate",H.rotated?90:0);
G.setAttribute("kerning",H.kerning?"auto":0);
G.firstChild.data=H.text
}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(D,C){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",D);
this.rawNode.setAttribute("height",C);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(J,H,F){var I=new dojox.gfx.Surface();
I.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
I.rawNode.setAttribute("width",H);
I.rawNode.setAttribute("height",F);
var G=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
I.rawNode.appendChild(G);
I.defNode=G;
dojo.byId(J).appendChild(I.rawNode);
return I
};
dojox.gfx.svg.Font={_setFont:function(){var B=this.fontStyle;
this.rawNode.setAttribute("font-style",B.style);
this.rawNode.setAttribute("font-variant",B.variant);
this.rawNode.setAttribute("font-weight",B.weight);
this.rawNode.setAttribute("font-size",B.size);
this.rawNode.setAttribute("font-family",B.family)
}};
dojox.gfx.svg.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){this.rawNode.appendChild(B.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(C,D){if(this==C.getParent()){if(this.rawNode==C.rawNode.parentNode){this.rawNode.removeChild(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.lastChild){B.removeChild(B.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(F,H){if(!this.rawNode){return null
}var E=new F();
var G=document.createElementNS(dojox.gfx.svg.xmlns.svg,F.nodeType);
E.setRawNode(G);
this.rawNode.appendChild(G);
E.setShape(H);
this.add(E);
return E
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};