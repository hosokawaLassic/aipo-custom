dojo._xdResourceLoaded({depends:[["require","dojox.gfx.silverlight"]],defineResource:function(B){B.require("dojox.gfx.silverlight");
B.experimental("dojox.gfx.silverlight_attach");
(function(){dojox.gfx.attachNode=function(C){return null;
if(!C){return null
}var D=null;
switch(C.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:D=new dojox.gfx.Rect(C);
break;
case dojox.gfx.Ellipse.nodeType:if(C.width==C.height){D=new dojox.gfx.Circle(C)
}else{D=new dojox.gfx.Ellipse(C)
}break;
case dojox.gfx.Polyline.nodeType:D=new dojox.gfx.Polyline(C);
break;
case dojox.gfx.Path.nodeType:D=new dojox.gfx.Path(C);
break;
case dojox.gfx.Line.nodeType:D=new dojox.gfx.Line(C);
break;
case dojox.gfx.Image.nodeType:D=new dojox.gfx.Image(C);
break;
case dojox.gfx.Text.nodeType:D=new dojox.gfx.Text(C);
G(D);
break;
default:return null
}J(D);
if(!(D instanceof dojox.gfx.Image)){I(D);
A(D)
}H(D);
return D
};
dojox.gfx.attachSurface=function(C){return null
};
var I=function(C){return null
};
var A=function(C){return null
};
var H=function(C){return null
};
var G=function(C){return null
};
var J=function(C){return null
}
})()
}});