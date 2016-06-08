dojo._xdResourceLoaded({depends:[["require","dojox.gfx.svg"]],defineResource:function(B){B.require("dojox.gfx.svg");
B.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(E){if(!E){return null
}var C=null;
switch(E.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:C=new dojox.gfx.Rect(E);
A(C);
break;
case dojox.gfx.Ellipse.nodeType:C=new dojox.gfx.Ellipse(E);
M(C,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:C=new dojox.gfx.Polyline(E);
M(C,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:C=new dojox.gfx.Path(E);
M(C,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:C=new dojox.gfx.Circle(E);
M(C,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:C=new dojox.gfx.Line(E);
M(C,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:C=new dojox.gfx.Image(E);
M(C,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var D=E.getElementsByTagName("textPath");
if(D&&D.length){C=new dojox.gfx.TextPath(E);
M(C,dojox.gfx.defaultPath);
L(C)
}else{C=new dojox.gfx.Text(E);
R(C)
}N(C);
break;
default:return null
}if(!(C instanceof dojox.gfx.Image)){Q(C);
O(C)
}P(C);
return C
};
dojox.gfx.attachSurface=function(E){var C=new dojox.gfx.Surface();
C.rawNode=E;
var D=E.getElementsByTagName("defs");
if(D.length==0){return null
}C.defNode=D[0];
return C
};
var Q=function(G){var E=G.rawNode.getAttribute("fill");
if(E=="none"){G.fillStyle=null;
return 
}var D=null,F=dojox.gfx.svg.getRef(E);
if(ref){switch(F.tagName.toLowerCase()){case"lineargradient":D=K(dojox.gfx.defaultLinearGradient,F);
B.forEach(["x1","y1","x2","y2"],function(H){D[H]=F.getAttribute(H)
});
break;
case"radialgradient":D=K(dojox.gfx.defaultRadialGradient,F);
B.forEach(["cx","cy","r"],function(H){D[H]=F.getAttribute(H)
});
D.cx=F.getAttribute("cx");
D.cy=F.getAttribute("cy");
D.r=F.getAttribute("r");
break;
case"pattern":D=B.lang.shallowCopy(dojox.gfx.defaultPattern,true);
B.forEach(["x","y","width","height"],function(H){D[H]=F.getAttribute(H)
});
D.src=F.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{D=new B.Color(E);
var C=rawNode.getAttribute("fill-opacity");
if(C!=null){D.a=C
}}G.fillStyle=D
};
var K=function(F,E){var D=B.clone(F);
D.colors=[];
for(var C=0;
C<E.childNodes.length;
++C){D.colors.push({offset:E.childNodes[C].getAttribute("offset"),color:new B.Color(E.childNodes[C].getAttribute("stop-color"))})
}return D
};
var O=function(C){var F=C.rawNode,G=F.getAttribute("stroke");
if(G==null||G=="none"){C.strokeStyle=null;
return 
}var E=C.strokeStyle=B.clone(dojox.gfx.defaultStroke);
var D=new B.Color(G);
if(D){E.color=D;
E.color.a=F.getAttribute("stroke-opacity");
E.width=F.getAttribute("stroke-width");
E.cap=F.getAttribute("stroke-linecap");
E.join=F.getAttribute("stroke-linejoin");
if(E.join=="miter"){E.join=F.getAttribute("stroke-miterlimit")
}E.style=F.getAttribute("dojoGfxStrokeStyle")
}};
var P=function(C){var D=C.rawNode.getAttribute("transform");
if(D.match(/^matrix\(.+\)$/)){var E=D.slice(7,-1).split(",");
C.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(E[0]),xy:parseFloat(E[2]),yx:parseFloat(E[1]),yy:parseFloat(E[3]),dx:parseFloat(E[4]),dy:parseFloat(E[5])})
}else{C.matrix=null
}};
var N=function(D){var E=D.fontStyle=B.clone(dojox.gfx.defaultFont),C=D.rawNode;
E.style=C.getAttribute("font-style");
E.variant=C.getAttribute("font-variant");
E.weight=C.getAttribute("font-weight");
E.size=C.getAttribute("font-size");
E.family=C.getAttribute("font-family")
};
var M=function(C,E){var D=C.shape=B.clone(E),F=C.rawNode;
for(var G in D){D[G]=F.getAttribute(G)
}};
var A=function(C){M(C,dojox.gfx.defaultRect);
C.shape.r=Math.min(C.rawNode.getAttribute("rx"),C.rawNode.getAttribute("ry"))
};
var R=function(C){var D=C.shape=B.clone(dojox.gfx.defaultText),E=C.rawNode;
D.x=E.getAttribute("x");
D.y=E.getAttribute("y");
D.align=E.getAttribute("text-anchor");
D.decoration=E.getAttribute("text-decoration");
D.rotated=parseFloat(E.getAttribute("rotate"))!=0;
D.kerning=E.getAttribute("kerning")=="auto";
D.text=E.firstChild.nodeValue
};
var L=function(C){var D=C.shape=B.clone(dojox.gfx.defaultTextPath),E=C.rawNode;
D.align=E.getAttribute("text-anchor");
D.decoration=E.getAttribute("text-decoration");
D.rotated=parseFloat(E.getAttribute("rotate"))!=0;
D.kerning=E.getAttribute("kerning")=="auto";
D.text=E.firstChild.nodeValue
}
})()
}});