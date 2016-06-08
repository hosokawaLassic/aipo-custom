if(!dojo._hasResource["dojox.dtl.tag.misc"]){dojo._hasResource["dojox.dtl.tag.misc"]=true;
dojo.provide("dojox.dtl.tag.misc");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(D,C){return C
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(B){this._TextNode=B
};
dojo.extend(dojox.dtl.tag.misc.DebugNode,{render:function(I,G){var H=I.getKeys();
var L="";
for(var J=0,K;
K=H[J];
J++){console.debug("DEBUG",K,":",I[K]);
L+=K+": "+dojo.toJson(I[K])+"\n\n"
}return new this._TextNode(L).render(I,G,this)
},unrender:function(D,C){return C
},clone:function(B){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(C,D){this._varnode=C;
this._nodelist=D
};
dojo.extend(dojox.dtl.tag.misc.FilterNode,{render:function(F,E){var H=this._nodelist.render(F,new dojox.string.Builder());
F.update({"var":H.toString()});
var G=this._varnode.render(F,E);
F.pop();
return E
},unrender:function(D,C){return C
},clone:function(B){return new this.constructor(this._expression,this._nodelist.clone(B))
}});
dojox.dtl.tag.misc.comment=function(D,C){D.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(D,C){return new dojox.dtl.tag.misc.DebugNode(D.getTextNode())
};
dojox.dtl.tag.misc.filter=function(G,H){var I=H.split(" ",2);
var F=new (G.getVarNode())("var|"+I[1]);
var J=G.parse(["endfilter"]);
G.next();
return new dojox.dtl.tag.misc.FilterNode(F,J)
}
};