dojo._xdResourceLoaded({depends:[["require","dojox.gfx.vml"]],defineResource:function(B){B.require("dojox.gfx.vml");
B.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(C){if(!C){return null
}var D=null;
switch(C.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:D=new dojox.gfx.Rect(C);
A(D);
break;
case dojox.gfx.Ellipse.nodeType:if(C.style.width==C.style.height){D=new dojox.gfx.Circle(C);
T(D)
}else{D=new dojox.gfx.Ellipse(C);
S(D)
}break;
case dojox.gfx.Path.nodeType:switch(C.getAttribute("dojoGfxType")){case"line":D=new dojox.gfx.Line(C);
a(D);
break;
case"polyline":D=new dojox.gfx.Polyline(C);
Y(D);
break;
case"path":D=new dojox.gfx.Path(C);
b(D);
break;
case"text":D=new dojox.gfx.Text(C);
d(D);
U(D);
W(D);
break;
case"textpath":D=new dojox.gfx.TextPath(C);
b(D);
d(D);
U(D);
break
}break;
case dojox.gfx.Image.nodeType:switch(C.getAttribute("dojoGfxType")){case"image":D=new dojox.gfx.Image(C);
X(D);
R(D);
break
}break;
default:return null
}if(!(D instanceof dojox.gfx.Image)){c(D);
V(D);
if(!(D instanceof dojox.gfx.Text)){Z(D)
}}return D
};
dojox.gfx.attachSurface=function(C){var E=new dojox.gfx.Surface();
E.clipNode=C;
var D=E.rawNode=C.firstChild;
var F=D.firstChild;
if(!F||F.tagName!="rect"){return null
}E.bgNode=D;
return E
};
var c=function(K){var E=null,L=K.rawNode,H=L.fill;
if(H.on&&H.type=="gradient"){var E=B.clone(dojox.gfx.defaultLinearGradient),G=dojox.gfx.matrix._degToRad(H.angle);
E.x2=Math.cos(G);
E.y2=Math.sin(G);
E.colors=[];
var D=H.colors.value.split(";");
for(var J=0;
J<D.length;
++J){var C=D[J].match(/\S+/g);
if(!C||C.length!=2){continue
}E.colors.push({offset:dojox.gfx.vml._parseFloat(C[0]),color:new B.Color(C[1])})
}}else{if(H.on&&H.type=="gradientradial"){var E=B.clone(dojox.gfx.defaultRadialGradient),F=parseFloat(L.style.width),I=parseFloat(L.style.height);
E.cx=isNaN(F)?0:H.focusposition.x*F;
E.cy=isNaN(I)?0:H.focusposition.y*I;
E.r=isNaN(F)?1:F/2;
E.colors=[];
var D=H.colors.value.split(";");
for(var J=D.length-1;
J>=0;
--J){var C=D[J].match(/\S+/g);
if(!C||C.length!=2){continue
}E.colors.push({offset:dojox.gfx.vml._parseFloat(C[0]),color:new B.Color(C[1])})
}}else{if(H.on&&H.type=="tile"){var E=B.clone(dojox.gfx.defaultPattern);
E.width=dojox.gfx.pt2px(H.size.x);
E.height=dojox.gfx.pt2px(H.size.y);
E.x=H.origin.x*E.width;
E.y=H.origin.y*E.height;
E.src=H.src
}else{if(H.on&&L.fillcolor){E=new B.Color(L.fillcolor+"");
E.a=H.opacity
}}}}K.fillStyle=E
};
var V=function(E){var D=E.rawNode;
if(!D.stroked){E.strokeStyle=null;
return 
}var C=E.strokeStyle=B.clone(dojox.gfx.defaultStroke),F=D.stroke;
C.color=new B.Color(D.strokecolor.value);
C.width=dojox.gfx.normalizedLength(D.strokeweight+"");
C.color.a=F.opacity;
C.cap=this._translate(this._capMapReversed,F.endcap);
C.join=F.joinstyle=="miter"?F.miterlimit:F.joinstyle;
C.style=F.dashstyle
};
var Z=function(F){var E=rawNode.skew,C=E.matrix,D=E.offset;
F.matrix=dojox.gfx.matrix.normalize({xx:C.xtox,xy:C.ytox,yx:C.xtoy,yy:C.ytoy,dx:dojox.gfx.pt2px(D.x),dy:dojox.gfx.pt2px(D.y)})
};
var Q=function(C){C.bgNode=C.rawNode.firstChild
};
var A=function(F){var C=F.rawNode,G=C.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],D=C.style,E=parseFloat(D.width),H=parseFloat(D.height);
G=(G.indexOf("%")>=0)?parseFloat(G)/100:dojox.gfx.vml._parseFloat(G);
F.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(D.left),y:parseInt(D.top),width:E,height:H,r:Math.min(E,H)*G})
};
var S=function(F){var E=F.rawNode.style,C=parseInt(E.width)/2,D=parseInt(E.height)/2;
F.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(E.left)+C,cy:parseInt(E.top)+D,rx:C,ry:D})
};
var T=function(E){var D=E.rawNode.style,C=parseInt(D.width)/2;
E.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(D.left)+C,cy:parseInt(D.top)+C,r:C})
};
var a=function(D){var E=D.shape=B.clone(dojox.gfx.defaultLine),C=D.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(C.length<7||C[0]!="m"||C[3]!="l"||C[6]!="e"){break
}E.x1=parseInt(C[1]);
E.y1=parseInt(C[2]);
E.x2=parseInt(C[4]);
E.y2=parseInt(C[5])
}while(false)
};
var Y=function(F){var G=F.shape=B.clone(dojox.gfx.defaultPolyline),D=F.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(D.length<3||D[0]!="m"){break
}var H=parseInt(D[0]),C=parseInt(D[1]);
if(isNaN(H)||isNaN(C)){break
}G.points.push({x:H,y:C});
if(D.length<6||D[3]!="l"){break
}for(var E=4;
E<D.length;
E+=2){H=parseInt(D[E]);
C=parseInt(D[E+1]);
if(isNaN(H)||isNaN(C)){break
}G.points.push({x:H,y:C})
}}while(false)
};
var X=function(C){C.shape=B.clone(dojox.gfx.defaultImage);
C.shape.src=C.rawNode.firstChild.src
};
var R=function(C){var D=C.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
C.matrix=dojox.gfx.matrix.normalize({xx:D.M11,xy:D.M12,yx:D.M21,yy:D.M22,dx:D.Dx,dy:D.Dy})
};
var d=function(H){var I=H.shape=B.clone(dojox.gfx.defaultText),E=H.rawNode,D=E.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(!D||D.length!=7){break
}var C=E.childNodes,G=0;
for(;
G<C.length&&C[G].tagName!="textpath";
++G){}if(G>=C.length){break
}var F=C[G].style;
I.text=C[G].string;
switch(F["v-text-align"]){case"left":I.x=parseInt(D[1]);
I.align="start";
break;
case"center":I.x=(parseInt(D[1])+parseInt(D[4]))/2;
I.align="middle";
break;
case"right":I.x=parseInt(D[4]);
I.align="end";
break
}I.y=parseInt(D[2]);
I.decoration=F["text-decoration"];
I.rotated=F["v-rotate-letters"].toLowerCase() in dojox.gfx.vml._bool;
I.kerning=F["v-text-kern"].toLowerCase() in dojox.gfx.vml._bool;
return 
}while(false);
H.shape=null
};
var U=function(G){var D=G.fontStyle=B.clone(dojox.gfx.defaultFont),C=G.rawNode.childNodes,F=0;
for(;
F<C.length&&C[F].tagName=="textpath";
++F){}if(F>=C.length){G.fontStyle=null;
return 
}var E=C[F].style;
D.style=E.fontstyle;
D.variant=E.fontvariant;
D.weight=E.fontweight;
D.size=E.fontsize;
D.family=E.fontfamily
};
var W=function(C){Z(C);
var D=C.matrix,E=C.fontStyle;
if(D&&E){C.matrix=dojox.gfx.matrix.multiply(D,{dy:dojox.gfx.normalizedLength(E.size)*0.35})
}};
var b=function(H){var F=H.shape=B.clone(dojox.gfx.defaultPath),K=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),D=[],E=false,L=dojox.gfx.Path._pathVmlToSvgMap;
for(var G=0;
G<K.length;
++K){var C=K[G];
if(C in L){E=false;
D.push(L[C])
}else{if(!E){var J=parseInt(C);
if(isNaN(J)){E=true
}else{D.push(J)
}}}}var I=D.length;
if(I>=4&&D[I-1]==""&&D[I-2]==0&&D[I-3]==0&&D[I-4]=="l"){D.splice(I-4,4)
}if(I){F.path=D.join(" ")
}}
})()
}});