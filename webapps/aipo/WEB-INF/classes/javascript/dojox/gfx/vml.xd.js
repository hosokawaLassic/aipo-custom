dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.vml"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"],["require","dojox.gfx.arc"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.vml"]){B._hasResource["dojox.gfx.vml"]=true;
B.provide("dojox.gfx.vml");
B.require("dojox.gfx._base");
B.require("dojox.gfx.shape");
B.require("dojox.gfx.path");
B.require("dojox.gfx.arc");
dojox.gfx.vml.xmlns="urn:schemas-microsoft-com:vml";
dojox.gfx.vml.text_alignment={start:"left",middle:"center",end:"right"};
dojox.gfx.vml._parseFloat=function(A){return A.match(/^\d+f$/i)?parseInt(A)/65536:parseFloat(A)
};
dojox.gfx.vml._bool={t:1,"true":1};
B.extend(dojox.gfx.Shape,{setFill:function(V){if(!V){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof V=="object"&&"type" in V){switch(V.type){case"linear":var d=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,V),U=[],Y=d.colors,Z=this._getRealMatrix(),A=dojox.gfx.matrix;
this.fillStyle=d;
B.forEach(Y,function(D,C,E){E[C].color=dojox.gfx.normalizeColor(D.color)
});
if(Y[0].offset>0){U.push("0 "+Y[0].color.toHex())
}for(var g=0;
g<Y.length;
++g){U.push(Y[g].offset.toFixed(8)+" "+Y[g].color.toHex())
}var g=Y.length-1;
if(Y[g].offset<1){U.push("1 "+Y[g].color.toHex())
}var a=this.rawNode.fill;
a.colors.value=U.join(";");
a.method="sigma";
a.type="gradient";
var c=Z?A.multiplyPoint(Z,d.x1,d.y1):{x:d.x1,y:d.y1},e=Z?A.multiplyPoint(Z,d.x2,d.y2):{x:d.x2,y:d.y2};
a.angle=(A._radToDeg(Math.atan2(e.x-c.x,e.y-c.y))+180)%360;
a.on=true;
break;
case"radial":var d=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,V);
this.fillStyle=d;
var h=parseFloat(this.rawNode.style.left),W=parseFloat(this.rawNode.style.top),X=parseFloat(this.rawNode.style.width),f=parseFloat(this.rawNode.style.height),b=isNaN(X)?1:2*d.r/X,Y=new Array(d.colors.length);
B.forEach(d.colors,function(D,C){Y[C]={offset:1-D.offset*b,color:dojox.gfx.normalizeColor(D.color)}
});
var g=Y.length-1;
while(g>=0&&Y[g].offset<0){--g
}if(g<Y.length-1){var T=Y[g],S=Y[g+1];
S.color=B.blendColors(T.color,S.color,T.offset/(T.offset-S.offset));
S.offset=0;
while(Y.length-g>2){Y.pop()
}}var g=Y.length-1,U=[];
if(Y[g].offset>0){U.push("0 "+Y[g].color.toHex())
}for(;
g>=0;
--g){U.push(Y[g].offset.toFixed(8)+" "+Y[g].color.toHex())
}if(Y[0].offset<1){U.push("1 "+Y[0].color.toHex())
}var a=this.rawNode.fill;
a.colors.value=U.join(";");
a.method="sigma";
a.type="gradientradial";
if(isNaN(X)||isNaN(f)||isNaN(h)||isNaN(W)){a.focusposition="0.5 0.5"
}else{a.focusposition=((d.cx-h)/X).toFixed(8)+" "+((d.cy-W)/f).toFixed(8)
}a.focussize="0 0";
a.on=true;
break;
case"pattern":var d=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,V);
this.fillStyle=d;
var a=this.rawNode.fill;
a.type="tile";
a.src=d.src;
if(d.width&&d.height){a.size.x=dojox.gfx.px2pt(d.width);
a.size.y=dojox.gfx.px2pt(d.height)
}a.alignShape="f";
a.position.x=0;
a.position.y=0;
a.origin.x=d.width?d.x/d.width:0;
a.origin.y=d.height?d.y/d.height:0;
a.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(V);
this.rawNode.fillcolor=this.fillStyle.toHex();
this.rawNode.fill.opacity=this.fillStyle.a;
this.rawNode.filled=true;
return this
},setStroke:function(A){if(!A){this.strokeStyle=null;
this.rawNode.stroked="f";
return this
}if(typeof A=="string"){A={color:A}
}var F=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A);
F.color=dojox.gfx.normalizeColor(F.color);
var E=this.rawNode;
E.stroked=true;
E.strokecolor=F.color.toCss();
E.strokeweight=F.width+"px";
if(E.stroke){E.stroke.opacity=F.color.a;
E.stroke.endcap=this._translate(this._capMap,F.cap);
if(typeof F.join=="number"){E.stroke.joinstyle="miter";
E.stroke.miterlimit=F.join
}else{E.stroke.joinstyle=F.join
}E.stroke.dashstyle=F.style=="none"?"Solid":F.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(A,D){return(D in A)?A[D]:D
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var T=this._getRealMatrix();
if(!T){return this
}var P=this.rawNode.skew;
if(typeof P=="undefined"){for(var V=0;
V<this.rawNode.childNodes.length;
++V){if(this.rawNode.childNodes[V].tagName=="skew"){P=this.rawNode.childNodes[V];
break
}}}if(P){P.on="f";
var N=T.xx.toFixed(8)+" "+T.xy.toFixed(8)+" "+T.yx.toFixed(8)+" "+T.yy.toFixed(8)+" 0 0",A=Math.floor(T.dx).toFixed()+"px "+Math.floor(T.dy).toFixed()+"px",O=this.rawNode.style,M=parseFloat(O.left),Q=parseFloat(O.top),R=parseFloat(O.width),U=parseFloat(O.height);
if(isNaN(M)){M=0
}if(isNaN(Q)){Q=0
}if(isNaN(R)){R=1
}if(isNaN(U)){U=1
}var S=(-M/R-0.5).toFixed(8)+" "+(-Q/U-0.5).toFixed(8);
P.matrix=N;
P.origin=S;
P.offset=A;
P.on=true
}return this
},setRawNode:function(A){A.stroked="f";
A.filled="f";
this.rawNode=A
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var F=this.rawNode,E=F.parentNode,A=E.firstChild;
E.insertBefore(F,A);
if(A.tagName=="rect"){A.swapNode(F)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
B.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var D=this._getRealMatrix();
for(var A=0;
A<this.children.length;
++A){this.children[A]._updateParentMatrix(D)
}return this
}});
dojox.gfx.Group.nodeType="group";
B.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(M){var N=this.shape=dojox.gfx.makeParameters(this.shape,M);
this.bbox=null;
var J=this.rawNode.style;
J.left=N.x.toFixed();
J.top=N.y.toFixed();
J.width=(typeof N.width=="string"&&N.width.indexOf("%")>=0)?N.width:N.width.toFixed();
J.height=(typeof N.width=="string"&&N.height.indexOf("%")>=0)?N.height:N.height.toFixed();
var I=Math.min(1,(N.r/Math.min(parseFloat(N.width),parseFloat(N.height)))).toFixed(8);
var K=this.rawNode.parentNode,A=null;
if(K){if(K.lastChild!=this.rawNode){for(var L=0;
L<K.childNodes.length;
++L){if(K.childNodes[L]==this.rawNode){A=K.childNodes[L+1];
break
}}}K.removeChild(this.rawNode)
}this.rawNode.arcsize=I;
if(K){if(A){K.insertBefore(this.rawNode,A)
}else{K.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
B.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(E){var F=this.shape=dojox.gfx.makeParameters(this.shape,E);
this.bbox=null;
var A=this.rawNode.style;
A.left=(F.cx-F.rx).toFixed();
A.top=(F.cy-F.ry).toFixed();
A.width=(F.rx*2).toFixed();
A.height=(F.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
B.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(E){var F=this.shape=dojox.gfx.makeParameters(this.shape,E);
this.bbox=null;
var A=this.rawNode.style;
A.left=(F.cx-F.r).toFixed();
A.top=(F.cy-F.r).toFixed();
A.width=(F.r*2).toFixed();
A.height=(F.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
B.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","line")
}},setShape:function(A){var D=this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
this.rawNode.path.v="m"+D.x1.toFixed()+" "+D.y1.toFixed()+"l"+D.x2.toFixed()+" "+D.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
B.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","polyline")
}},setShape:function(H,J){if(H&&H instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:H});
if(J&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,H)
}this.bbox=null;
var L=[],A=this.shape.points;
if(A.length>0){L.push("m");
var K=1;
if(typeof A[0]=="number"){L.push(A[0].toFixed());
L.push(A[1].toFixed());
K=2
}else{L.push(A[0].x.toFixed());
L.push(A[0].y.toFixed())
}if(A.length>K){L.push("l");
for(var I=K;
I<A.length;
++I){if(typeof A[I]=="number"){L.push(A[I].toFixed())
}else{L.push(A[I].x.toFixed());
L.push(A[I].y.toFixed())
}}}}L.push("e");
this.rawNode.path.v=L.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
B.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(E){var F=this.shape=dojox.gfx.makeParameters(this.shape,E);
this.bbox=null;
var A=this.rawNode.firstChild;
A.src=F.src;
if(F.width||F.height){A.style.width=F.width;
A.style.height=F.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var D=this._getRealMatrix();
if(!D){return this
}D=dojox.gfx.matrix.multiply(D,{dx:this.shape.x,dy:this.shape.y});
var A=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
A.M11=D.xx;
A.M12=D.xy;
A.M21=D.yx;
A.M22=D.yy;
A.Dx=D.dx;
A.Dy=D.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
B.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(R){this.shape=dojox.gfx.makeParameters(this.shape,R);
this.bbox=null;
var N=this.rawNode,O=this.shape,S=O.x,U=O.y.toFixed();
switch(O.align){case"middle":S-=5;
break;
case"end":S-=10;
break
}this.rawNode.path.v="m"+S.toFixed()+","+U+"l"+(S+10).toFixed()+","+U+"e";
var M=null,Q=null,V=N.childNodes;
for(var A=0;
A<V.length;
++A){var P=V[A].tagName;
if(P=="path"){M=V[A];
if(Q){break
}}else{if(P=="textpath"){Q=V[A];
if(M){break
}}}}if(!M){M=this.rawNode.ownerDocument.createElement("v:path");
N.appendChild(M)
}if(!Q){Q=this.rawNode.ownerDocument.createElement("v:textpath");
N.appendChild(Q)
}M.textPathOk=true;
Q.on=true;
var T=dojox.gfx.vml.text_alignment[O.align];
Q.style["v-text-align"]=T?T:"left";
Q.style["text-decoration"]=O.decoration;
Q.style["v-rotate-letters"]=O.rotated;
Q.style["v-text-kern"]=O.kerning;
Q.string=O.text;
return this.setTransform(this.matrix)
},_setFont:function(){var E=this.fontStyle,A=this.rawNode.childNodes;
for(var F=0;
F<A.length;
++F){if(A[F].tagName=="textpath"){A[F].style.font=dojox.gfx.makeFontString(E);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var A=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(A){A=dojox.gfx.matrix.multiply(A,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return A
},getTextWidth:function(){var A=this.rawNode,E=A.style.display;
A.style.display="inline";
var F=dojox.gfx.pt2px(parseFloat(A.currentStyle.width));
A.style.display=E;
return F
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(A){var G=Math.cos(A),H=Math.sin(A),F={x:G+(4/3)*(1-G),y:H-(4/3)*G*(1-G)/H};
return{s:{x:G,y:-H},c1:{x:F.x,y:-F.y},c2:F,e:{x:G,y:H}}
};
B.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(A){if(A&&!A.getAttribute("dojoGfxType")){A.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(E){var F=B.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var A=this[this.renderers[E.action]](E,F);
if(typeof this.vmlPath=="string"){this.vmlPath+=A.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(A)
}},setShape:function(A){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(G,I,A,J){if(typeof J=="undefined"){J=I.length
}if(typeof A=="undefined"){A=0
}for(var H=A;
H<J;
++H){G.push(" ");
G.push(I[H].toFixed())
}},_addArgsAdjusted:function(H,I,K,A,L){if(typeof L=="undefined"){L=K.length
}if(typeof A=="undefined"){A=0
}for(var J=A;
J<L;
J+=2){H.push(" ");
H.push((I.x+K[J]).toFixed());
H.push(" ");
H.push((I.y+K[J+1]).toFixed())
}},_moveToA:function(G){var F=[" m"],A=G.args,H=A.length;
if(H==2){this._addArgs(F,A)
}else{this._addArgs(F,A,0,2);
F.push(" l");
this._addArgs(F,A,2)
}this.lastControl={};
return F
},_moveToR:function(H,I){var G=["x" in I?" t":" m"],A=H.args,J=A.length;
if(J==2){this._addArgs(G,A)
}else{this._addArgs(G,A,0,2);
G.push(" r");
this._addArgs(G,A,2)
}this.lastControl={};
return G
},_lineToA:function(D){var A=[" l"];
this._addArgs(A,D.args);
this.lastControl={};
return A
},_lineToR:function(D){var A=[" r"];
this._addArgs(A,D.args);
this.lastControl={};
return A
},_hLineToA:function(K,L){var J=[" l"],A=K.args,N=A.length,I=" "+L.y.toFixed();
for(var M=0;
M<N;
++M){J.push(" ");
J.push(A[M].toFixed());
J.push(I)
}this.lastControl={};
return J
},_hLineToR:function(H){var G=[" r"],A=H.args,J=A.length;
for(var I=0;
I<J;
++I){G.push(" ");
G.push(A[I].toFixed());
G.push(" 0")
}this.lastControl={};
return G
},_vLineToA:function(J,K){var I=[" l"],A=J.args,M=A.length,N=" "+K.x.toFixed();
for(var L=0;
L<M;
++L){I.push(N);
I.push(" ");
I.push(A[L].toFixed())
}this.lastControl={};
return I
},_vLineToR:function(H){var G=[" r"],A=H.args,J=A.length;
for(var I=0;
I<J;
++I){G.push(" 0 ");
G.push(A[I].toFixed())
}this.lastControl={};
return G
},_curveToA:function(H){var G=[],A=H.args,J=A.length;
for(var I=0;
I<J;
I+=6){G.push(" c");
this._addArgs(G,A,I,I+6)
}this.lastControl={x:A[J-4],y:A[J-3],type:"C"};
return G
},_curveToR:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=6){H.push(" v");
this._addArgs(H,A,K,K+6);
this.lastControl={x:J.x+A[K+2],y:J.y+A[K+3]};
J.x+=A[K+4];
J.y+=A[K+5]
}this.lastControl.type="C";
return H
},_smoothCurveToA:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=4){H.push(" c");
if(this.lastControl.type=="C"){this._addArgs(H,[2*J.x-this.lastControl.x,2*J.y-this.lastControl.y])
}else{this._addArgs(H,[J.x,J.y])
}this._addArgs(H,A,K,K+4)
}this.lastControl={x:A[L-4],y:A[L-3],type:"C"};
return H
},_smoothCurveToR:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=4){H.push(" v");
if(this.lastControl.type=="C"){this._addArgs(H,[J.x-this.lastControl.x,J.y-this.lastControl.y])
}else{this._addArgs(H,[0,0])
}this._addArgs(H,A,K,K+4);
this.lastControl={x:J.x+A[K],y:J.y+A[K+1]};
J.x+=A[K+2];
J.y+=A[K+3]
}this.lastControl.type="C";
return H
},_qCurveToA:function(H){var G=[],A=H.args,J=A.length;
for(var I=0;
I<J;
I+=4){G.push(" qb");
this._addArgs(G,A,I,I+4)
}this.lastControl={x:A[J-4],y:A[J-3],type:"Q"};
return G
},_qCurveToR:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=4){H.push(" qb");
this._addArgsAdjusted(H,J,A,K,K+4);
this.lastControl={x:J.x+A[K],y:J.y+A[K+1]};
J.x+=A[K+2];
J.y+=A[K+3]
}this.lastControl.type="Q";
return H
},_qSmoothCurveToA:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=2){H.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(H,[this.lastControl.x=2*J.x-this.lastControl.x,this.lastControl.y=2*J.y-this.lastControl.y])
}else{this._addArgs(H,[this.lastControl.x=J.x,this.lastControl.y=J.y])
}this._addArgs(H,A,K,K+2)
}this.lastControl.type="Q";
return H
},_qSmoothCurveToR:function(I,J){var H=[],A=I.args,L=A.length;
for(var K=0;
K<L;
K+=2){H.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(H,[this.lastControl.x=2*J.x-this.lastControl.x,this.lastControl.y=2*J.y-this.lastControl.y])
}else{this._addArgs(H,[this.lastControl.x=J.x,this.lastControl.y=J.y])
}this._addArgsAdjusted(H,J,A,K,K+2)
}this.lastControl.type="Q";
return H
},_arcTo:function(R,P){var M=[],V=R.args,U=V.length,N=R.action=="a";
for(var S=0;
S<U;
S+=7){var A=V[S+5],Q=V[S+6];
if(N){A+=P.x;
Q+=P.y
}var O=dojox.gfx.arc.arcAsBezier(P,V[S],V[S+1],V[S+2],V[S+3]?1:0,V[S+4]?1:0,A,Q);
for(var T=0;
T<O.length;
++T){M.push(" c");
this._addArgs(M,O[T])
}P={x:A,y:Q}
}this.lastControl={};
return M
},_closePath:function(){this.lastControl={};
return["x"]
}});
dojox.gfx.Path.nodeType="shape";
B.declare("dojox.gfx.TextPath",dojox.gfx.Path,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","textpath")
}this.fontStyle=null;
if(!("text" in this)){this.text=B.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=B.clone(dojox.gfx.defaultFont)
}},setText:function(A){this.text=dojox.gfx.makeParameters(this.text,typeof A=="string"?{text:A}:A);
this._setText();
return this
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
},_setText:function(){this.bbox=null;
var K=this.rawNode,L=this.text,J=null,M=null,A=K.childNodes;
for(var N=0;
N<A.length;
++N){var P=A[N].tagName;
if(P=="path"){J=A[N];
if(M){break
}}else{if(P=="textpath"){M=A[N];
if(J){break
}}}}if(!J){J=this.rawNode.ownerDocument.createElement("v:path");
K.appendChild(J)
}if(!M){M=this.rawNode.ownerDocument.createElement("v:textpath");
K.appendChild(M)
}J.textPathOk=true;
M.on=true;
var O=dojox.gfx.vml.text_alignment[L.align];
M.style["v-text-align"]=O?O:"left";
M.style["text-decoration"]=L.decoration;
M.style["v-rotate-letters"]=L.rotated;
M.style["v-text-kern"]=L.kerning;
M.string=L.text
},_setFont:function(){var E=this.fontStyle,A=this.rawNode.childNodes;
for(var F=0;
F<A.length;
++F){if(A[F].tagName=="textpath"){A[F].style.font=dojox.gfx.makeFontString(E);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
B.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(H,L){this.width=dojox.gfx.normalizedLength(H);
this.height=dojox.gfx.normalizedLength(L);
if(!this.rawNode){return this
}var I=this.clipNode.style,A=this.rawNode,K=A.style,J=this.bgNode.style;
I.width=H;
I.height=L;
I.clip="rect(0 "+H+" "+L+" 0)";
K.width=H;
K.height=L;
A.coordsize=H+" "+L;
J.width=H;
J.height=L;
return this
},getDimensions:function(){var A=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(A.width<=0){A.width=this.width
}if(A.height<=0){A.height=this.height
}return A
}});
dojox.gfx.createSurface=function(U,A,P){if(!A){A="100%"
}if(!P){P="100%"
}var O=new dojox.gfx.Surface(),M=B.byId(U),S=O.clipNode=M.ownerDocument.createElement("div"),N=O.rawNode=M.ownerDocument.createElement("v:group"),T=S.style,V=N.style;
M.style.width=A;
M.style.height=P;
T.width=A;
T.height=P;
T.clip="rect(0 "+A+" "+P+" 0)";
T.position="absolute";
V.width=A;
V.height=P;
N.coordsize=(A=="100%"?A:parseFloat(A))+" "+(P=="100%"?P:parseFloat(P));
N.coordorigin="0 0";
var R=O.bgNode=N.ownerDocument.createElement("v:rect"),Q=R.style;
Q.left=Q.top=0;
Q.width=V.width;
Q.height=V.height;
R.filled=R.stroked="f";
N.appendChild(R);
S.appendChild(N);
M.appendChild(S);
O.width=dojox.gfx.normalizedLength(A);
O.height=dojox.gfx.normalizedLength(P);
return O
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){this.rawNode.appendChild(A.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(D,A){if(this==D.getParent()){if(this.rawNode==D.rawNode.parentNode){this.rawNode.removeChild(D.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.firstChild!=A.lastChild){if(A.firstChild!=this.bgNode){A.removeChild(A.firstChild)
}if(A.lastChild!=this.bgNode){A.removeChild(A.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
B.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var A=this.createObject(dojox.gfx.Group,null);
var D=A.rawNode.ownerDocument.createElement("v:rect");
D.style.left=D.style.top=0;
D.style.width=A.rawNode.style.width;
D.style.height=A.rawNode.style.height;
D.filled=D.stroked="f";
A.rawNode.appendChild(D);
A.bgNode=D;
return A
},createImage:function(A){if(!this.rawNode){return null
}var G=new dojox.gfx.Image(),F=this.rawNode.ownerDocument.createElement("div");
F.style.position="absolute";
F.style.width=this.rawNode.style.width;
F.style.height=this.rawNode.style.height;
F.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var H=this.rawNode.ownerDocument.createElement("img");
F.appendChild(H);
G.setRawNode(F);
this.rawNode.appendChild(F);
G.setShape(A);
this.add(G);
return G
},createObject:function(A,G){if(!this.rawNode){return null
}var H=new A(),F=this.rawNode.ownerDocument.createElement("v:"+A.nodeType);
H.setRawNode(F);
this.rawNode.appendChild(F);
switch(A){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(F)
}H.setShape(G);
this.add(H);
return H
},_overrideSize:function(D){var A=this;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}D.style.width=A.width;
D.style.height=A.height;
D.coordsize=A.width+" "+A.height
}});
B.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
B.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
B.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
B.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});