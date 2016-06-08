dojo._xdResourceLoaded({depends:[["provide","dojox.string.Builder"]],defineResource:function(B){if(!B._hasResource["dojox.string.Builder"]){B._hasResource["dojox.string.Builder"]=true;
B.provide("dojox.string.Builder");
(function(){dojox.string.Builder=function(D){this.b=B.isIE?[]:"";
if(D){this.append(D)
}};
var A={append:function(D){return this.appendArray(B._toArray(arguments))
},concat:function(D){return this.append(D)
},appendArray:function(D){this.b=String.prototype.concat.apply(this.b,D);
return this
},clear:function(){this._clear();
this.length=0;
return this
},replace:function(H,G){var F=this.toString();
F=F.replace(H,G);
this._reset(F);
this.length=F.length;
return this
},remove:function(F,H){if(H==0){return this
}var G=this.toString();
this.clear();
if(F>0){this.append(G.substring(0,F))
}if(F+H<G.length){this.append(G.substring(F+H))
}return this
},insert:function(H,F){var G=this.toString();
this.clear();
if(H==0){this.append(F);
this.append(G);
return this
}else{this.append(G.substring(0,H));
this.append(F);
this.append(G.substring(H))
}return this
},toString:function(){return this.b
},_clear:function(){this.b=""
},_reset:function(D){this.b=D
}};
if(B.isIE){B.mixin(A,{toString:function(){return this.b.join("")
},appendArray:function(D){this.b=this.b.concat(D);
return this
},_clear:function(){this.b=[]
},_reset:function(D){this.b=[D]
}})
}B.extend(dojox.string.Builder,A)
})()
}}});