dojo.require("dojox.gfx.silverlight");
dojo.experimental("dojox.gfx.silverlight_attach");
(function(){dojox.gfx.attachNode=function(A){return null;
if(!A){return null
}var B=null;
switch(A.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:B=new dojox.gfx.Rect(A);
break;
case dojox.gfx.Ellipse.nodeType:if(A.width==A.height){B=new dojox.gfx.Circle(A)
}else{B=new dojox.gfx.Ellipse(A)
}break;
case dojox.gfx.Polyline.nodeType:B=new dojox.gfx.Polyline(A);
break;
case dojox.gfx.Path.nodeType:B=new dojox.gfx.Path(A);
break;
case dojox.gfx.Line.nodeType:B=new dojox.gfx.Line(A);
break;
case dojox.gfx.Image.nodeType:B=new dojox.gfx.Image(A);
break;
case dojox.gfx.Text.nodeType:B=new dojox.gfx.Text(A);
H(B);
break;
default:return null
}F(B);
if(!(B instanceof dojox.gfx.Image)){J(B);
G(B)
}I(B);
return B
};
dojox.gfx.attachSurface=function(A){return null
};
var J=function(A){return null
};
var G=function(A){return null
};
var I=function(A){return null
};
var H=function(A){return null
};
var F=function(A){return null
}
})();