dojo.require("dojox.gfx.vml");
dojo.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(A){if(!A){return null
}var B=null;
switch(A.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:B=new dojox.gfx.Rect(A);
Q(B);
break;
case dojox.gfx.Ellipse.nodeType:if(A.style.width==A.style.height){B=new dojox.gfx.Circle(A);
U(B)
}else{B=new dojox.gfx.Ellipse(A);
T(B)
}break;
case dojox.gfx.Path.nodeType:switch(A.getAttribute("dojoGfxType")){case"line":B=new dojox.gfx.Line(A);
b(B);
break;
case"polyline":B=new dojox.gfx.Polyline(A);
Z(B);
break;
case"path":B=new dojox.gfx.Path(A);
c(B);
break;
case"text":B=new dojox.gfx.Text(A);
P(B);
V(B);
X(B);
break;
case"textpath":B=new dojox.gfx.TextPath(A);
c(B);
P(B);
V(B);
break
}break;
case dojox.gfx.Image.nodeType:switch(A.getAttribute("dojoGfxType")){case"image":B=new dojox.gfx.Image(A);
Y(B);
S(B);
break
}break;
default:return null
}if(!(B instanceof dojox.gfx.Image)){d(B);
W(B);
if(!(B instanceof dojox.gfx.Text)){a(B)
}}return B
};
dojox.gfx.attachSurface=function(A){var C=new dojox.gfx.Surface();
C.clipNode=A;
var B=C.rawNode=A.firstChild;
var D=B.firstChild;
if(!D||D.tagName!="rect"){return null
}C.bgNode=B;
return C
};
var d=function(I){var C=null,J=I.rawNode,F=J.fill;
if(F.on&&F.type=="gradient"){var C=dojo.clone(dojox.gfx.defaultLinearGradient),E=dojox.gfx.matrix._degToRad(F.angle);
C.x2=Math.cos(E);
C.y2=Math.sin(E);
C.colors=[];
var B=F.colors.value.split(";");
for(var H=0;
H<B.length;
++H){var A=B[H].match(/\S+/g);
if(!A||A.length!=2){continue
}C.colors.push({offset:dojox.gfx.vml._parseFloat(A[0]),color:new dojo.Color(A[1])})
}}else{if(F.on&&F.type=="gradientradial"){var C=dojo.clone(dojox.gfx.defaultRadialGradient),D=parseFloat(J.style.width),G=parseFloat(J.style.height);
C.cx=isNaN(D)?0:F.focusposition.x*D;
C.cy=isNaN(G)?0:F.focusposition.y*G;
C.r=isNaN(D)?1:D/2;
C.colors=[];
var B=F.colors.value.split(";");
for(var H=B.length-1;
H>=0;
--H){var A=B[H].match(/\S+/g);
if(!A||A.length!=2){continue
}C.colors.push({offset:dojox.gfx.vml._parseFloat(A[0]),color:new dojo.Color(A[1])})
}}else{if(F.on&&F.type=="tile"){var C=dojo.clone(dojox.gfx.defaultPattern);
C.width=dojox.gfx.pt2px(F.size.x);
C.height=dojox.gfx.pt2px(F.size.y);
C.x=F.origin.x*C.width;
C.y=F.origin.y*C.height;
C.src=F.src
}else{if(F.on&&J.fillcolor){C=new dojo.Color(J.fillcolor+"");
C.a=F.opacity
}}}}I.fillStyle=C
};
var W=function(C){var B=C.rawNode;
if(!B.stroked){C.strokeStyle=null;
return 
}var A=C.strokeStyle=dojo.clone(dojox.gfx.defaultStroke),D=B.stroke;
A.color=new dojo.Color(B.strokecolor.value);
A.width=dojox.gfx.normalizedLength(B.strokeweight+"");
A.color.a=D.opacity;
A.cap=this._translate(this._capMapReversed,D.endcap);
A.join=D.joinstyle=="miter"?D.miterlimit:D.joinstyle;
A.style=D.dashstyle
};
var a=function(D){var C=rawNode.skew,A=C.matrix,B=C.offset;
D.matrix=dojox.gfx.matrix.normalize({xx:A.xtox,xy:A.ytox,yx:A.xtoy,yy:A.ytoy,dx:dojox.gfx.pt2px(B.x),dy:dojox.gfx.pt2px(B.y)})
};
var R=function(A){A.bgNode=A.rawNode.firstChild
};
var Q=function(D){var A=D.rawNode,E=A.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],B=A.style,C=parseFloat(B.width),F=parseFloat(B.height);
E=(E.indexOf("%")>=0)?parseFloat(E)/100:dojox.gfx.vml._parseFloat(E);
D.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(B.left),y:parseInt(B.top),width:C,height:F,r:Math.min(C,F)*E})
};
var T=function(D){var C=D.rawNode.style,A=parseInt(C.width)/2,B=parseInt(C.height)/2;
D.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(C.left)+A,cy:parseInt(C.top)+B,rx:A,ry:B})
};
var U=function(C){var B=C.rawNode.style,A=parseInt(B.width)/2;
C.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(B.left)+A,cy:parseInt(B.top)+A,r:A})
};
var b=function(B){var C=B.shape=dojo.clone(dojox.gfx.defaultLine),A=B.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(A.length<7||A[0]!="m"||A[3]!="l"||A[6]!="e"){break
}C.x1=parseInt(A[1]);
C.y1=parseInt(A[2]);
C.x2=parseInt(A[4]);
C.y2=parseInt(A[5])
}while(false)
};
var Z=function(D){var E=D.shape=dojo.clone(dojox.gfx.defaultPolyline),B=D.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(B.length<3||B[0]!="m"){break
}var F=parseInt(B[0]),A=parseInt(B[1]);
if(isNaN(F)||isNaN(A)){break
}E.points.push({x:F,y:A});
if(B.length<6||B[3]!="l"){break
}for(var C=4;
C<B.length;
C+=2){F=parseInt(B[C]);
A=parseInt(B[C+1]);
if(isNaN(F)||isNaN(A)){break
}E.points.push({x:F,y:A})
}}while(false)
};
var Y=function(A){A.shape=dojo.clone(dojox.gfx.defaultImage);
A.shape.src=A.rawNode.firstChild.src
};
var S=function(A){var B=A.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
A.matrix=dojox.gfx.matrix.normalize({xx:B.M11,xy:B.M12,yx:B.M21,yy:B.M22,dx:B.Dx,dy:B.Dy})
};
var P=function(F){var G=F.shape=dojo.clone(dojox.gfx.defaultText),C=F.rawNode,B=C.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(!B||B.length!=7){break
}var A=C.childNodes,E=0;
for(;
E<A.length&&A[E].tagName!="textpath";
++E){}if(E>=A.length){break
}var D=A[E].style;
G.text=A[E].string;
switch(D["v-text-align"]){case"left":G.x=parseInt(B[1]);
G.align="start";
break;
case"center":G.x=(parseInt(B[1])+parseInt(B[4]))/2;
G.align="middle";
break;
case"right":G.x=parseInt(B[4]);
G.align="end";
break
}G.y=parseInt(B[2]);
G.decoration=D["text-decoration"];
G.rotated=D["v-rotate-letters"].toLowerCase() in dojox.gfx.vml._bool;
G.kerning=D["v-text-kern"].toLowerCase() in dojox.gfx.vml._bool;
return 
}while(false);
F.shape=null
};
var V=function(E){var B=E.fontStyle=dojo.clone(dojox.gfx.defaultFont),A=E.rawNode.childNodes,D=0;
for(;
D<A.length&&A[D].tagName=="textpath";
++D){}if(D>=A.length){E.fontStyle=null;
return 
}var C=A[D].style;
B.style=C.fontstyle;
B.variant=C.fontvariant;
B.weight=C.fontweight;
B.size=C.fontsize;
B.family=C.fontfamily
};
var X=function(A){a(A);
var B=A.matrix,C=A.fontStyle;
if(B&&C){A.matrix=dojox.gfx.matrix.multiply(B,{dy:dojox.gfx.normalizedLength(C.size)*0.35})
}};
var c=function(F){var D=F.shape=dojo.clone(dojox.gfx.defaultPath),I=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),B=[],C=false,J=dojox.gfx.Path._pathVmlToSvgMap;
for(var E=0;
E<I.length;
++I){var A=I[E];
if(A in J){C=false;
B.push(J[A])
}else{if(!C){var H=parseInt(A);
if(isNaN(H)){C=true
}else{B.push(H)
}}}}var G=B.length;
if(G>=4&&B[G-1]==""&&B[G-2]==0&&B[G-3]==0&&B[G-4]=="l"){B.splice(G-4,4)
}if(G){D.path=B.join(" ")
}}
})();