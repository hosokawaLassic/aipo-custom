dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.misc"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.misc"]){B._hasResource["dojox.dtl.tag.misc"]=true;
B.provide("dojox.dtl.tag.misc");
B.require("dojox.dtl._base");
dojox.dtl.tag.misc.commentNode=new function(){this.render=this.unrender=function(A,D){return D
};
this.clone=function(){return this
};
this.toString=function(){return"dojox.dtl.tag.misc.CommentNode"
}
};
dojox.dtl.tag.misc.DebugNode=function(A){this._TextNode=A
};
B.extend(dojox.dtl.tag.misc.DebugNode,{render:function(H,L){var A=H.getKeys();
var K="";
for(var I=0,J;
J=A[I];
I++){console.debug("DEBUG",J,":",H[J]);
K+=J+": "+B.toJson(H[J])+"\n\n"
}return new this._TextNode(K).render(H,L,this)
},unrender:function(A,D){return D
},clone:function(A){return new this.constructor(this._TextNode)
},toString:function(){return"dojox.dtl.tag.misc.DebugNode"
}});
dojox.dtl.tag.misc.FilterNode=function(D,A){this._varnode=D;
this._nodelist=A
};
B.extend(dojox.dtl.tag.misc.FilterNode,{render:function(A,H){var G=this._nodelist.render(A,new dojox.string.Builder());
A.update({"var":G.toString()});
var F=this._varnode.render(A,H);
A.pop();
return H
},unrender:function(A,D){return D
},clone:function(A){return new this.constructor(this._expression,this._nodelist.clone(A))
}});
dojox.dtl.tag.misc.comment=function(A,D){A.skipPast("endcomment");
return dojox.dtl.tag.misc.commentNode
};
dojox.dtl.tag.misc.debug=function(A,D){return new dojox.dtl.tag.misc.DebugNode(A.getTextNode())
};
dojox.dtl.tag.misc.filter=function(A,G){var H=G.split(" ",2);
var J=new (A.getVarNode())("var|"+H[1]);
var I=A.parse(["endfilter"]);
A.next();
return new dojox.dtl.tag.misc.FilterNode(J,I)
}
}}});