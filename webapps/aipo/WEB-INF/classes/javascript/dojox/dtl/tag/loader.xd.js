dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loader"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.loader"]){B._hasResource["dojox.dtl.tag.loader"]=true;
B.provide("dojox.dtl.tag.loader");
B.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(D,A){this.name=D;
this.nodelist=A
};
B.extend(dojox.dtl.tag.loader.BlockNode,{render:function(A,D){if(this.override){D=this.override.render(A,D,this);
this.rendered=this.override
}else{D=this.nodelist.render(A,D,this);
this.rendered=this.nodelist
}this.override=null;
return D
},unrender:function(A,D){return this.rendered.unrender(A,D)
},setOverride:function(A){if(!this.override){this.override=A
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(A,G){var H=G.split(" ");
var J=H[1];
A._blocks=A._blocks||{};
A._blocks[J]=A._blocks[J]||[];
A._blocks[J].push(J);
var I=A.parse(["endblock","endblock "+J]);
A.next();
return new dojox.dtl.tag.loader.BlockNode(J,I)
};
dojox.dtl.tag.loader.ExtendsNode=function(J,G,A,H,I){this.getTemplate=J;
this.nodelist=G;
this.shared=A;
this.parent=H;
this.key=I
};
B.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(D){if(!this.parent){this.parent=D.get(this.key,false);
if(!this.parent){throw new Error("extends tag used a variable that did not resolve")
}if(typeof this.parent=="object"){if(this.parent.url){if(this.parent.shared){this.shared=true
}this.parent=this.parent.url.toString()
}else{this.parent=this.parent.toString()
}}if(this.parent&&this.parent.indexOf("shared:")==0){this.shared=true;
this.parent=this.parent.substring(7,A.length)
}}var A=this.parent;
if(!A){throw new Error("Invalid template name in 'extends' tag.")
}if(A.render){return A
}if(this.parents[A]){return this.parents[A]
}this.parent=this.getTemplate(dojox.dtl.text.getTemplateString(A));
if(this.shared){this.parents[A]=this.parent
}return this.parent
},render:function(L,S){var N=dojox.dtl;
var R=dojox.dtl.tag.loader;
var O=this.getParent(L);
var M=O.nodelist[0] instanceof this.constructor;
var P={};
for(var Q=0,A;
A=O.nodelist.contents[Q];
Q++){if(A instanceof R.BlockNode){P[A.name]=A
}}for(var Q=0,A;
A=this.nodelist.contents[Q];
Q++){if(A instanceof R.BlockNode){var T=P[A.name];
if(!T){if(M){O.nodelist[0].nodelist.append(A)
}}else{if(this.shared){T.setOverride(A.nodelist)
}else{T.nodelist=A.nodelist
}}}}this.rendered=O;
return O.render(L,S,this)
},unrender:function(A,D){return this.rendered.unrender(A,D,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(A,I){var J=I.split(" ");
var K=false;
var M=null;
var N=null;
if(J[1].charAt(0)=='"'||J[1].charAt(0)=="'"){M=J[1].substring(1,J[1].length-1)
}else{N=J[1]
}if(M&&M.indexOf("shared:")==0){K=true;
M=M.substring(7,M.length)
}var L=A.parse();
return new dojox.dtl.tag.loader.ExtendsNode(A.getTemplate,L,K,M,N)
}
}}});