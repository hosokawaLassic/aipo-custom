if(!dojo._hasResource["dojox.gfx.utils"]){dojo._hasResource["dojox.gfx.utils"]=true;
dojo.provide("dojox.gfx.utils");
dojo.require("dojox.gfx");
dojox.gfx.utils.serialize=function(I){var G={},J,F=I instanceof dojox.gfx.Surface;
if(F||I instanceof dojox.gfx.Group){G.children=[];
for(var H=0;
H<I.children.length;
++H){G.children.push(dojox.gfx.utils.serialize(I.children[H]))
}if(F){return G.children
}}else{G.shape=I.getShape()
}if(I.getTransform){J=I.getTransform();
if(J){G.transform=J
}}if(I.getStroke){J=I.getStroke();
if(J){G.stroke=J
}}if(I.getFill){J=I.getFill();
if(J){G.fill=J
}}if(I.getFont){J=I.getFont();
if(J){G.font=J
}}return G
};
dojox.gfx.utils.toJson=function(C,D){return dojo.toJson(dojox.gfx.utils.serialize(C),D)
};
dojox.gfx.utils.deserialize=function(G,J){if(J instanceof Array){var H=[];
for(var I=0;
I<J.length;
++I){H.push(dojox.gfx.utils.deserialize(G,J[I]))
}return H
}var F=("shape" in J)?G.createShape(J.shape):G.createGroup();
if("transform" in J){F.setTransform(J.transform)
}if("stroke" in J){F.setStroke(J.stroke)
}if("fill" in J){F.setFill(J.fill)
}if("font" in J){F.setFont(J.font)
}if("children" in J){for(var I=0;
I<J.children.length;
++I){dojox.gfx.utils.deserialize(F,J.children[I])
}}return F
};
dojox.gfx.utils.fromJson=function(D,C){return dojox.gfx.utils.deserialize(D,dojo.fromJson(C))
}
};