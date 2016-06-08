if(!dojo._hasResource["dojox.dtl.tag.loader"]){dojo._hasResource["dojox.dtl.tag.loader"]=true;
dojo.provide("dojox.dtl.tag.loader");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(C,D){this.name=C;
this.nodelist=D
};
dojo.extend(dojox.dtl.tag.loader.BlockNode,{render:function(D,C){if(this.override){C=this.override.render(D,C,this);
this.rendered=this.override
}else{C=this.nodelist.render(D,C,this);
this.rendered=this.nodelist
}this.override=null;
return C
},unrender:function(D,C){return this.rendered.unrender(D,C)
},setOverride:function(B){if(!this.override){this.override=B
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(G,H){var I=H.split(" ");
var F=I[1];
G._blocks=G._blocks||{};
G._blocks[F]=G._blocks[F]||[];
G._blocks[F].push(F);
var J=G.parse(["endblock","endblock "+F]);
G.next();
return new dojox.dtl.tag.loader.BlockNode(F,J)
};
dojox.dtl.tag.loader.ExtendsNode=function(F,H,G,I,J){this.getTemplate=F;
this.nodelist=H;
this.shared=G;
this.parent=I;
this.key=J
};
dojo.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(C){if(!this.parent){this.parent=C.get(this.key,false);
if(!this.parent){throw new Error("extends tag used a variable that did not resolve")
}if(typeof this.parent=="object"){if(this.parent.url){if(this.parent.shared){this.shared=true
}this.parent=this.parent.url.toString()
}else{this.parent=this.parent.toString()
}}if(this.parent&&this.parent.indexOf("shared:")==0){this.shared=true;
this.parent=this.parent.substring(7,D.length)
}}var D=this.parent;
if(!D){throw new Error("Invalid template name in 'extends' tag.")
}if(D.render){return D
}if(this.parents[D]){return this.parents[D]
}this.parent=this.getTemplate(dojox.dtl.text.getTemplateString(D));
if(this.shared){this.parents[D]=this.parent
}return this.parent
},render:function(M,T){var O=dojox.dtl;
var S=dojox.dtl.tag.loader;
var P=this.getParent(M);
var N=P.nodelist[0] instanceof this.constructor;
var Q={};
for(var R=0,L;
L=P.nodelist.contents[R];
R++){if(L instanceof S.BlockNode){Q[L.name]=L
}}for(var R=0,L;
L=this.nodelist.contents[R];
R++){if(L instanceof S.BlockNode){var K=Q[L.name];
if(!K){if(N){P.nodelist[0].nodelist.append(L)
}}else{if(this.shared){K.setOverride(L.nodelist)
}else{K.nodelist=L.nodelist
}}}}this.rendered=P;
return P.render(M,T,this)
},unrender:function(D,C){return this.rendered.unrender(D,C,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(I,J){var K=J.split(" ");
var L=false;
var N=null;
var H=null;
if(K[1].charAt(0)=='"'||K[1].charAt(0)=="'"){N=K[1].substring(1,K[1].length-1)
}else{H=K[1]
}if(N&&N.indexOf("shared:")==0){L=true;
N=N.substring(7,N.length)
}var M=I.parse();
return new dojox.dtl.tag.loader.ExtendsNode(I.getTemplate,M,L,N,H)
}
};