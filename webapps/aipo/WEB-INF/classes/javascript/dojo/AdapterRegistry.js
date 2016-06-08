if(!dojo._hasResource["dojo.AdapterRegistry"]){dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(B){this.pairs=[];
this.returnWrappers=B||false
};
dojo.extend(dojo.AdapterRegistry,{register:function(I,J,G,F,H){this.pairs[((H)?"unshift":"push")]([I,J,G,F])
},match:function(){for(var C=0;
C<this.pairs.length;
C++){var D=this.pairs[C];
if(D[1].apply(this,arguments)){if((D[3])||(this.returnWrappers)){return D[2]
}else{return D[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(D){for(var F=0;
F<this.pairs.length;
F++){var E=this.pairs[F];
if(E[0]==D){this.pairs.splice(F,1);
return true
}}return false
}})
};