if(!dojo._hasResource["dojox.gfx.vml"]){dojo._hasResource["dojox.gfx.vml"]=true;
dojo.provide("dojox.gfx.vml");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.require("dojox.gfx.arc");
dojox.gfx.vml.xmlns="urn:schemas-microsoft-com:vml";
dojox.gfx.vml.text_alignment={start:"left",middle:"center",end:"right"};
dojox.gfx.vml._parseFloat=function(B){return B.match(/^\d+f$/i)?parseInt(B)/65536:parseFloat(B)
};
dojox.gfx.vml._bool={t:1,"true":1};
dojo.extend(dojox.gfx.Shape,{setFill:function(W){if(!W){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof W=="object"&&"type" in W){switch(W.type){case"linear":var e=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,W),V=[],Z=e.colors,a=this._getRealMatrix(),S=dojox.gfx.matrix;
this.fillStyle=e;
dojo.forEach(Z,function(B,A,C){C[A].color=dojox.gfx.normalizeColor(B.color)
});
if(Z[0].offset>0){V.push("0 "+Z[0].color.toHex())
}for(var h=0;
h<Z.length;
++h){V.push(Z[h].offset.toFixed(8)+" "+Z[h].color.toHex())
}var h=Z.length-1;
if(Z[h].offset<1){V.push("1 "+Z[h].color.toHex())
}var b=this.rawNode.fill;
b.colors.value=V.join(";");
b.method="sigma";
b.type="gradient";
var d=a?S.multiplyPoint(a,e.x1,e.y1):{x:e.x1,y:e.y1},f=a?S.multiplyPoint(a,e.x2,e.y2):{x:e.x2,y:e.y2};
b.angle=(S._radToDeg(Math.atan2(f.x-d.x,f.y-d.y))+180)%360;
b.on=true;
break;
case"radial":var e=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,W);
this.fillStyle=e;
var R=parseFloat(this.rawNode.style.left),X=parseFloat(this.rawNode.style.top),Y=parseFloat(this.rawNode.style.width),g=parseFloat(this.rawNode.style.height),c=isNaN(Y)?1:2*e.r/Y,Z=new Array(e.colors.length);
dojo.forEach(e.colors,function(B,A){Z[A]={offset:1-B.offset*c,color:dojox.gfx.normalizeColor(B.color)}
});
var h=Z.length-1;
while(h>=0&&Z[h].offset<0){--h
}if(h<Z.length-1){var U=Z[h],T=Z[h+1];
T.color=dojo.blendColors(U.color,T.color,U.offset/(U.offset-T.offset));
T.offset=0;
while(Z.length-h>2){Z.pop()
}}var h=Z.length-1,V=[];
if(Z[h].offset>0){V.push("0 "+Z[h].color.toHex())
}for(;
h>=0;
--h){V.push(Z[h].offset.toFixed(8)+" "+Z[h].color.toHex())
}if(Z[0].offset<1){V.push("1 "+Z[0].color.toHex())
}var b=this.rawNode.fill;
b.colors.value=V.join(";");
b.method="sigma";
b.type="gradientradial";
if(isNaN(Y)||isNaN(g)||isNaN(R)||isNaN(X)){b.focusposition="0.5 0.5"
}else{b.focusposition=((e.cx-R)/Y).toFixed(8)+" "+((e.cy-X)/g).toFixed(8)
}b.focussize="0 0";
b.on=true;
break;
case"pattern":var e=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,W);
this.fillStyle=e;
var b=this.rawNode.fill;
b.type="tile";
b.src=e.src;
if(e.width&&e.height){b.size.x=dojox.gfx.px2pt(e.width);
b.size.y=dojox.gfx.px2pt(e.height)
}b.alignShape="f";
b.position.x=0;
b.position.y=0;
b.origin.x=e.width?e.x/e.width:0;
b.origin.y=e.height?e.y/e.height:0;
b.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(W);
this.rawNode.fillcolor=this.fillStyle.toHex();
this.rawNode.fill.opacity=this.fillStyle.a;
this.rawNode.filled=true;
return this
},setStroke:function(E){if(!E){this.strokeStyle=null;
this.rawNode.stroked="f";
return this
}if(typeof E=="string"){E={color:E}
}var D=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,E);
D.color=dojox.gfx.normalizeColor(D.color);
var F=this.rawNode;
F.stroked=true;
F.strokecolor=D.color.toCss();
F.strokeweight=D.width+"px";
if(F.stroke){F.stroke.opacity=D.color.a;
F.stroke.endcap=this._translate(this._capMap,D.cap);
if(typeof D.join=="number"){F.stroke.joinstyle="miter";
F.stroke.miterlimit=D.join
}else{F.stroke.joinstyle=D.join
}F.stroke.dashstyle=D.style=="none"?"Solid":D.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(D,C){return(C in D)?D[C]:C
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var U=this._getRealMatrix();
if(!U){return this
}var Q=this.rawNode.skew;
if(typeof Q=="undefined"){for(var L=0;
L<this.rawNode.childNodes.length;
++L){if(this.rawNode.childNodes[L].tagName=="skew"){Q=this.rawNode.childNodes[L];
break
}}}if(Q){Q.on="f";
var O=U.xx.toFixed(8)+" "+U.xy.toFixed(8)+" "+U.yx.toFixed(8)+" "+U.yy.toFixed(8)+" 0 0",M=Math.floor(U.dx).toFixed()+"px "+Math.floor(U.dy).toFixed()+"px",P=this.rawNode.style,N=parseFloat(P.left),R=parseFloat(P.top),S=parseFloat(P.width),V=parseFloat(P.height);
if(isNaN(N)){N=0
}if(isNaN(R)){R=0
}if(isNaN(S)){S=1
}if(isNaN(V)){V=1
}var T=(-N/S-0.5).toFixed(8)+" "+(-R/V-0.5).toFixed(8);
Q.matrix=O;
Q.origin=T;
Q.offset=M;
Q.on=true
}return this
},setRawNode:function(B){B.stroked="f";
B.filled="f";
this.rawNode=B
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var D=this.rawNode,F=D.parentNode,E=F.firstChild;
F.insertBefore(D,E);
if(E.tagName=="rect"){E.swapNode(D)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var C=this._getRealMatrix();
for(var D=0;
D<this.children.length;
++D){this.children[D]._updateParentMatrix(C)
}return this
}});
dojox.gfx.Group.nodeType="group";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(N){var H=this.shape=dojox.gfx.makeParameters(this.shape,N);
this.bbox=null;
var K=this.rawNode.style;
K.left=H.x.toFixed();
K.top=H.y.toFixed();
K.width=(typeof H.width=="string"&&H.width.indexOf("%")>=0)?H.width:H.width.toFixed();
K.height=(typeof H.width=="string"&&H.height.indexOf("%")>=0)?H.height:H.height.toFixed();
var J=Math.min(1,(H.r/Math.min(parseFloat(H.width),parseFloat(H.height)))).toFixed(8);
var L=this.rawNode.parentNode,I=null;
if(L){if(L.lastChild!=this.rawNode){for(var M=0;
M<L.childNodes.length;
++M){if(L.childNodes[M]==this.rawNode){I=L.childNodes[M+1];
break
}}}L.removeChild(this.rawNode)
}this.rawNode.arcsize=J;
if(L){if(I){L.insertBefore(this.rawNode,I)
}else{L.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(F){var D=this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode.style;
E.left=(D.cx-D.rx).toFixed();
E.top=(D.cy-D.ry).toFixed();
E.width=(D.rx*2).toFixed();
E.height=(D.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(F){var D=this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode.style;
E.left=(D.cx-D.r).toFixed();
E.top=(D.cy-D.r).toFixed();
E.width=(D.r*2).toFixed();
E.height=(D.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","line")
}},setShape:function(D){var C=this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
this.rawNode.path.v="m"+C.x1.toFixed()+" "+C.y1.toFixed()+"l"+C.x2.toFixed()+" "+C.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","polyline")
}},setShape:function(I,K){if(I&&I instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:I});
if(K&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,I)
}this.bbox=null;
var G=[],H=this.shape.points;
if(H.length>0){G.push("m");
var L=1;
if(typeof H[0]=="number"){G.push(H[0].toFixed());
G.push(H[1].toFixed());
L=2
}else{G.push(H[0].x.toFixed());
G.push(H[0].y.toFixed())
}if(H.length>L){G.push("l");
for(var J=L;
J<H.length;
++J){if(typeof H[J]=="number"){G.push(H[J].toFixed())
}else{G.push(H[J].x.toFixed());
G.push(H[J].y.toFixed())
}}}}G.push("e");
this.rawNode.path.v=G.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(F){var D=this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var E=this.rawNode.firstChild;
E.src=D.src;
if(D.width||D.height){E.style.width=D.width;
E.style.height=D.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var C=this._getRealMatrix();
if(!C){return this
}C=dojox.gfx.matrix.multiply(C,{dx:this.shape.x,dy:this.shape.y});
var D=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
D.M11=C.xx;
D.M12=C.xy;
D.M21=C.yx;
D.M22=C.yy;
D.Dx=C.dx;
D.Dy=C.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(S){this.shape=dojox.gfx.makeParameters(this.shape,S);
this.bbox=null;
var O=this.rawNode,P=this.shape,T=P.x,V=P.y.toFixed();
switch(P.align){case"middle":T-=5;
break;
case"end":T-=10;
break
}this.rawNode.path.v="m"+T.toFixed()+","+V+"l"+(T+10).toFixed()+","+V+"e";
var N=null,R=null,L=O.childNodes;
for(var M=0;
M<L.length;
++M){var Q=L[M].tagName;
if(Q=="path"){N=L[M];
if(R){break
}}else{if(Q=="textpath"){R=L[M];
if(N){break
}}}}if(!N){N=this.rawNode.ownerDocument.createElement("v:path");
O.appendChild(N)
}if(!R){R=this.rawNode.ownerDocument.createElement("v:textpath");
O.appendChild(R)
}N.textPathOk=true;
R.on=true;
var U=dojox.gfx.vml.text_alignment[P.align];
R.style["v-text-align"]=U?U:"left";
R.style["text-decoration"]=P.decoration;
R.style["v-rotate-letters"]=P.rotated;
R.style["v-text-kern"]=P.kerning;
R.string=P.text;
return this.setTransform(this.matrix)
},_setFont:function(){var F=this.fontStyle,E=this.rawNode.childNodes;
for(var D=0;
D<E.length;
++D){if(E[D].tagName=="textpath"){E[D].style.font=dojox.gfx.makeFontString(F);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var B=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(B){B=dojox.gfx.matrix.multiply(B,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return B
},getTextWidth:function(){var E=this.rawNode,F=E.style.display;
E.style.display="inline";
var D=dojox.gfx.pt2px(parseFloat(E.currentStyle.width));
E.style.display=F;
return D
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(F){var H=Math.cos(F),E=Math.sin(F),G={x:H+(4/3)*(1-H),y:E-(4/3)*H*(1-H)/E};
return{s:{x:H,y:-E},c1:{x:G.x,y:-G.y},c2:G,e:{x:H,y:E}}
};
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(B){if(B&&!B.getAttribute("dojoGfxType")){B.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(F){var D=dojo.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var E=this[this.renderers[F.action]](F,D);
if(typeof this.vmlPath=="string"){this.vmlPath+=E.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(E)
}},setShape:function(B){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(H,J,G,F){if(typeof F=="undefined"){F=J.length
}if(typeof G=="undefined"){G=0
}for(var I=G;
I<F;
++I){H.push(" ");
H.push(J[I].toFixed())
}},_addArgsAdjusted:function(I,J,L,H,G){if(typeof G=="undefined"){G=L.length
}if(typeof H=="undefined"){H=0
}for(var K=H;
K<G;
K+=2){I.push(" ");
I.push((J.x+L[K]).toFixed());
I.push(" ");
I.push((J.y+L[K+1]).toFixed())
}},_moveToA:function(H){var G=[" m"],F=H.args,E=F.length;
if(E==2){this._addArgs(G,F)
}else{this._addArgs(G,F,0,2);
G.push(" l");
this._addArgs(G,F,2)
}this.lastControl={};
return G
},_moveToR:function(I,J){var H=["x" in J?" t":" m"],G=I.args,F=G.length;
if(F==2){this._addArgs(H,G)
}else{this._addArgs(H,G,0,2);
H.push(" r");
this._addArgs(H,G,2)
}this.lastControl={};
return H
},_lineToA:function(C){var D=[" l"];
this._addArgs(D,C.args);
this.lastControl={};
return D
},_lineToR:function(C){var D=[" r"];
this._addArgs(D,C.args);
this.lastControl={};
return D
},_hLineToA:function(L,M){var K=[" l"],I=L.args,H=I.length,J=" "+M.y.toFixed();
for(var N=0;
N<H;
++N){K.push(" ");
K.push(I[N].toFixed());
K.push(J)
}this.lastControl={};
return K
},_hLineToR:function(I){var H=[" r"],G=I.args,F=G.length;
for(var J=0;
J<F;
++J){H.push(" ");
H.push(G[J].toFixed());
H.push(" 0")
}this.lastControl={};
return H
},_vLineToA:function(K,L){var J=[" l"],I=K.args,N=I.length,H=" "+L.x.toFixed();
for(var M=0;
M<N;
++M){J.push(H);
J.push(" ");
J.push(I[M].toFixed())
}this.lastControl={};
return J
},_vLineToR:function(I){var H=[" r"],G=I.args,F=G.length;
for(var J=0;
J<F;
++J){H.push(" 0 ");
H.push(G[J].toFixed())
}this.lastControl={};
return H
},_curveToA:function(I){var H=[],G=I.args,F=G.length;
for(var J=0;
J<F;
J+=6){H.push(" c");
this._addArgs(H,G,J,J+6)
}this.lastControl={x:G[F-4],y:G[F-3],type:"C"};
return H
},_curveToR:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=6){I.push(" v");
this._addArgs(I,H,L,L+6);
this.lastControl={x:K.x+H[L+2],y:K.y+H[L+3]};
K.x+=H[L+4];
K.y+=H[L+5]
}this.lastControl.type="C";
return I
},_smoothCurveToA:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=4){I.push(" c");
if(this.lastControl.type=="C"){this._addArgs(I,[2*K.x-this.lastControl.x,2*K.y-this.lastControl.y])
}else{this._addArgs(I,[K.x,K.y])
}this._addArgs(I,H,L,L+4)
}this.lastControl={x:H[G-4],y:H[G-3],type:"C"};
return I
},_smoothCurveToR:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=4){I.push(" v");
if(this.lastControl.type=="C"){this._addArgs(I,[K.x-this.lastControl.x,K.y-this.lastControl.y])
}else{this._addArgs(I,[0,0])
}this._addArgs(I,H,L,L+4);
this.lastControl={x:K.x+H[L],y:K.y+H[L+1]};
K.x+=H[L+2];
K.y+=H[L+3]
}this.lastControl.type="C";
return I
},_qCurveToA:function(I){var H=[],G=I.args,F=G.length;
for(var J=0;
J<F;
J+=4){H.push(" qb");
this._addArgs(H,G,J,J+4)
}this.lastControl={x:G[F-4],y:G[F-3],type:"Q"};
return H
},_qCurveToR:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=4){I.push(" qb");
this._addArgsAdjusted(I,K,H,L,L+4);
this.lastControl={x:K.x+H[L],y:K.y+H[L+1]};
K.x+=H[L+2];
K.y+=H[L+3]
}this.lastControl.type="Q";
return I
},_qSmoothCurveToA:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=2){I.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(I,[this.lastControl.x=2*K.x-this.lastControl.x,this.lastControl.y=2*K.y-this.lastControl.y])
}else{this._addArgs(I,[this.lastControl.x=K.x,this.lastControl.y=K.y])
}this._addArgs(I,H,L,L+2)
}this.lastControl.type="Q";
return I
},_qSmoothCurveToR:function(J,K){var I=[],H=J.args,G=H.length;
for(var L=0;
L<G;
L+=2){I.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(I,[this.lastControl.x=2*K.x-this.lastControl.x,this.lastControl.y=2*K.y-this.lastControl.y])
}else{this._addArgs(I,[this.lastControl.x=K.x,this.lastControl.y=K.y])
}this._addArgsAdjusted(I,K,H,L,L+2)
}this.lastControl.type="Q";
return I
},_arcTo:function(S,Q){var N=[],L=S.args,V=L.length,O=S.action=="a";
for(var T=0;
T<V;
T+=7){var M=L[T+5],R=L[T+6];
if(O){M+=Q.x;
R+=Q.y
}var P=dojox.gfx.arc.arcAsBezier(Q,L[T],L[T+1],L[T+2],L[T+3]?1:0,L[T+4]?1:0,M,R);
for(var U=0;
U<P.length;
++U){N.push(" c");
this._addArgs(N,P[U])
}Q={x:M,y:R}
}this.lastControl={};
return N
},_closePath:function(){this.lastControl={};
return["x"]
}});
dojox.gfx.Path.nodeType="shape";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.Path,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","textpath")
}this.fontStyle=null;
if(!("text" in this)){this.text=dojo.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=dojo.clone(dojox.gfx.defaultFont)
}},setText:function(B){this.text=dojox.gfx.makeParameters(this.text,typeof B=="string"?{text:B}:B);
this._setText();
return this
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
},_setText:function(){this.bbox=null;
var L=this.rawNode,M=this.text,K=null,N=null,J=L.childNodes;
for(var O=0;
O<J.length;
++O){var I=J[O].tagName;
if(I=="path"){K=J[O];
if(N){break
}}else{if(I=="textpath"){N=J[O];
if(K){break
}}}}if(!K){K=this.rawNode.ownerDocument.createElement("v:path");
L.appendChild(K)
}if(!N){N=this.rawNode.ownerDocument.createElement("v:textpath");
L.appendChild(N)
}K.textPathOk=true;
N.on=true;
var P=dojox.gfx.vml.text_alignment[M.align];
N.style["v-text-align"]=P?P:"left";
N.style["text-decoration"]=M.decoration;
N.style["v-rotate-letters"]=M.rotated;
N.style["v-text-kern"]=M.kerning;
N.string=M.text
},_setFont:function(){var F=this.fontStyle,E=this.rawNode.childNodes;
for(var D=0;
D<E.length;
++D){if(E[D].tagName=="textpath"){E[D].style.font=dojox.gfx.makeFontString(F);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(I,G){this.width=dojox.gfx.normalizedLength(I);
this.height=dojox.gfx.normalizedLength(G);
if(!this.rawNode){return this
}var J=this.clipNode.style,H=this.rawNode,L=H.style,K=this.bgNode.style;
J.width=I;
J.height=G;
J.clip="rect(0 "+I+" "+G+" 0)";
L.width=I;
L.height=G;
H.coordsize=I+" "+G;
K.width=I;
K.height=G;
return this
},getDimensions:function(){var B=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(B.width<=0){B.width=this.width
}if(B.height<=0){B.height=this.height
}return B
}});
dojox.gfx.createSurface=function(V,M,Q){if(!M){M="100%"
}if(!Q){Q="100%"
}var P=new dojox.gfx.Surface(),N=dojo.byId(V),T=P.clipNode=N.ownerDocument.createElement("div"),O=P.rawNode=N.ownerDocument.createElement("v:group"),U=T.style,L=O.style;
N.style.width=M;
N.style.height=Q;
U.width=M;
U.height=Q;
U.clip="rect(0 "+M+" "+Q+" 0)";
U.position="absolute";
L.width=M;
L.height=Q;
O.coordsize=(M=="100%"?M:parseFloat(M))+" "+(Q=="100%"?Q:parseFloat(Q));
O.coordorigin="0 0";
var S=P.bgNode=O.ownerDocument.createElement("v:rect"),R=S.style;
R.left=R.top=0;
R.width=L.width;
R.height=L.height;
S.filled=S.stroked="f";
O.appendChild(S);
T.appendChild(O);
N.appendChild(T);
P.width=dojox.gfx.normalizedLength(M);
P.height=dojox.gfx.normalizedLength(Q);
return P
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){this.rawNode.appendChild(B.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(C,D){if(this==C.getParent()){if(this.rawNode==C.rawNode.parentNode){this.rawNode.removeChild(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.firstChild!=B.lastChild){if(B.firstChild!=this.bgNode){B.removeChild(B.firstChild)
}if(B.lastChild!=this.bgNode){B.removeChild(B.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var D=this.createObject(dojox.gfx.Group,null);
var C=D.rawNode.ownerDocument.createElement("v:rect");
C.style.left=C.style.top=0;
C.style.width=D.rawNode.style.width;
C.style.height=D.rawNode.style.height;
C.filled=C.stroked="f";
D.rawNode.appendChild(C);
D.bgNode=C;
return D
},createImage:function(F){if(!this.rawNode){return null
}var H=new dojox.gfx.Image(),G=this.rawNode.ownerDocument.createElement("div");
G.style.position="absolute";
G.style.width=this.rawNode.style.width;
G.style.height=this.rawNode.style.height;
G.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var E=this.rawNode.ownerDocument.createElement("img");
G.appendChild(E);
H.setRawNode(G);
this.rawNode.appendChild(G);
H.setShape(F);
this.add(H);
return H
},createObject:function(F,H){if(!this.rawNode){return null
}var E=new F(),G=this.rawNode.ownerDocument.createElement("v:"+F.nodeType);
E.setRawNode(G);
this.rawNode.appendChild(G);
switch(F){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(G)
}E.setShape(H);
this.add(E);
return E
},_overrideSize:function(C){var D=this;
for(;
D&&!(D instanceof dojox.gfx.Surface);
D=D.parent){}C.style.width=D.width;
C.style.height=D.height;
C.coordsize=D.width+" "+D.height
}});
dojo.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};