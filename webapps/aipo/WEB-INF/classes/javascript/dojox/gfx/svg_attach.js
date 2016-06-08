dojo.require("dojox.gfx.svg");
dojo.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(A){if(!A){return null
}var B=null;
switch(A.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:B=new dojox.gfx.Rect(A);
K(B);
break;
case dojox.gfx.Ellipse.nodeType:B=new dojox.gfx.Ellipse(A);
N(B,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:B=new dojox.gfx.Polyline(A);
N(B,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:B=new dojox.gfx.Path(A);
N(B,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:B=new dojox.gfx.Circle(A);
N(B,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:B=new dojox.gfx.Line(A);
N(B,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:B=new dojox.gfx.Image(A);
N(B,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var C=A.getElementsByTagName("textPath");
if(C&&C.length){B=new dojox.gfx.TextPath(A);
N(B,dojox.gfx.defaultPath);
M(B)
}else{B=new dojox.gfx.Text(A);
J(B)
}O(B);
break;
default:return null
}if(!(B instanceof dojox.gfx.Image)){R(B);
P(B)
}Q(B);
return B
};
dojox.gfx.attachSurface=function(A){var B=new dojox.gfx.Surface();
B.rawNode=A;
var C=A.getElementsByTagName("defs");
if(C.length==0){return null
}B.defNode=C[0];
return B
};
var R=function(A){var D=A.rawNode.getAttribute("fill");
if(D=="none"){A.fillStyle=null;
return 
}var C=null,E=dojox.gfx.svg.getRef(D);
if(ref){switch(E.tagName.toLowerCase()){case"lineargradient":C=L(dojox.gfx.defaultLinearGradient,E);
dojo.forEach(["x1","y1","x2","y2"],function(F){C[F]=E.getAttribute(F)
});
break;
case"radialgradient":C=L(dojox.gfx.defaultRadialGradient,E);
dojo.forEach(["cx","cy","r"],function(F){C[F]=E.getAttribute(F)
});
C.cx=E.getAttribute("cx");
C.cy=E.getAttribute("cy");
C.r=E.getAttribute("r");
break;
case"pattern":C=dojo.lang.shallowCopy(dojox.gfx.defaultPattern,true);
dojo.forEach(["x","y","width","height"],function(F){C[F]=E.getAttribute(F)
});
C.src=E.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{C=new dojo.Color(D);
var B=rawNode.getAttribute("fill-opacity");
if(B!=null){C.a=B
}}A.fillStyle=C
};
var L=function(A,D){var C=dojo.clone(A);
C.colors=[];
for(var B=0;
B<D.childNodes.length;
++B){C.colors.push({offset:D.childNodes[B].getAttribute("offset"),color:new dojo.Color(D.childNodes[B].getAttribute("stop-color"))})
}return C
};
var P=function(B){var E=B.rawNode,A=E.getAttribute("stroke");
if(A==null||A=="none"){B.strokeStyle=null;
return 
}var D=B.strokeStyle=dojo.clone(dojox.gfx.defaultStroke);
var C=new dojo.Color(A);
if(C){D.color=C;
D.color.a=E.getAttribute("stroke-opacity");
D.width=E.getAttribute("stroke-width");
D.cap=E.getAttribute("stroke-linecap");
D.join=E.getAttribute("stroke-linejoin");
if(D.join=="miter"){D.join=E.getAttribute("stroke-miterlimit")
}D.style=E.getAttribute("dojoGfxStrokeStyle")
}};
var Q=function(B){var C=B.rawNode.getAttribute("transform");
if(C.match(/^matrix\(.+\)$/)){var A=C.slice(7,-1).split(",");
B.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(A[0]),xy:parseFloat(A[2]),yx:parseFloat(A[1]),yy:parseFloat(A[3]),dx:parseFloat(A[4]),dy:parseFloat(A[5])})
}else{B.matrix=null
}};
var O=function(C){var A=C.fontStyle=dojo.clone(dojox.gfx.defaultFont),B=C.rawNode;
A.style=B.getAttribute("font-style");
A.variant=B.getAttribute("font-variant");
A.weight=B.getAttribute("font-weight");
A.size=B.getAttribute("font-size");
A.family=B.getAttribute("font-family")
};
var N=function(B,D){var C=B.shape=dojo.clone(D),E=B.rawNode;
for(var A in C){C[A]=E.getAttribute(A)
}};
var K=function(A){N(A,dojox.gfx.defaultRect);
A.shape.r=Math.min(A.rawNode.getAttribute("rx"),A.rawNode.getAttribute("ry"))
};
var J=function(B){var C=B.shape=dojo.clone(dojox.gfx.defaultText),A=B.rawNode;
C.x=A.getAttribute("x");
C.y=A.getAttribute("y");
C.align=A.getAttribute("text-anchor");
C.decoration=A.getAttribute("text-decoration");
C.rotated=parseFloat(A.getAttribute("rotate"))!=0;
C.kerning=A.getAttribute("kerning")=="auto";
C.text=A.firstChild.nodeValue
};
var M=function(B){var C=B.shape=dojo.clone(dojox.gfx.defaultTextPath),A=B.rawNode;
C.align=A.getAttribute("text-anchor");
C.decoration=A.getAttribute("text-decoration");
C.rotated=parseFloat(A.getAttribute("rotate"))!=0;
C.kerning=A.getAttribute("kerning")=="auto";
C.text=A.firstChild.nodeValue
}
})();