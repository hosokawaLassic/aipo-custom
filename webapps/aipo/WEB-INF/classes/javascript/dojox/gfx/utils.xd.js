dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.utils"],["require","dojox.gfx"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.utils"]){B._hasResource["dojox.gfx.utils"]=true;
B.provide("dojox.gfx.utils");
B.require("dojox.gfx");
dojox.gfx.utils.serialize=function(H){var A={},I,J=H instanceof dojox.gfx.Surface;
if(J||H instanceof dojox.gfx.Group){A.children=[];
for(var G=0;
G<H.children.length;
++G){A.children.push(dojox.gfx.utils.serialize(H.children[G]))
}if(J){return A.children
}}else{A.shape=H.getShape()
}if(H.getTransform){I=H.getTransform();
if(I){A.transform=I
}}if(H.getStroke){I=H.getStroke();
if(I){A.stroke=I
}}if(H.getFill){I=H.getFill();
if(I){A.fill=I
}}if(H.getFont){I=H.getFont();
if(I){A.font=I
}}return A
};
dojox.gfx.utils.toJson=function(D,A){return B.toJson(dojox.gfx.utils.serialize(D),A)
};
dojox.gfx.utils.deserialize=function(A,I){if(I instanceof Array){var G=[];
for(var H=0;
H<I.length;
++H){G.push(dojox.gfx.utils.deserialize(A,I[H]))
}return G
}var J=("shape" in I)?A.createShape(I.shape):A.createGroup();
if("transform" in I){J.setTransform(I.transform)
}if("stroke" in I){J.setStroke(I.stroke)
}if("fill" in I){J.setFill(I.fill)
}if("font" in I){J.setFont(I.font)
}if("children" in I){for(var H=0;
H<I.children.length;
++H){dojox.gfx.utils.deserialize(J,I.children[H])
}}return J
};
dojox.gfx.utils.fromJson=function(A,D){return dojox.gfx.utils.deserialize(A,B.fromJson(D))
}
}}});