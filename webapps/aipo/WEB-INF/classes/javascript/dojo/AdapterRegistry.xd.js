dojo._xdResourceLoaded({depends:[["provide","dojo.AdapterRegistry"]],defineResource:function(B){if(!B._hasResource["dojo.AdapterRegistry"]){B._hasResource["dojo.AdapterRegistry"]=true;
B.provide("dojo.AdapterRegistry");
B.AdapterRegistry=function(A){this.pairs=[];
this.returnWrappers=A||false
};
B.extend(B.AdapterRegistry,{register:function(H,I,A,J,G){this.pairs[((G)?"unshift":"push")]([H,I,A,J])
},match:function(){for(var D=0;
D<this.pairs.length;
D++){var A=this.pairs[D];
if(A[1].apply(this,arguments)){if((A[3])||(this.returnWrappers)){return A[2]
}else{return A[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(F){for(var E=0;
E<this.pairs.length;
E++){var A=this.pairs[E];
if(A[0]==F){this.pairs.splice(E,1);
return true
}}return false
}})
}}});