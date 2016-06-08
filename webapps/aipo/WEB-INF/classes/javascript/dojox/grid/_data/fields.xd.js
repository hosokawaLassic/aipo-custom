dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.fields"]],defineResource:function(B){if(!B._hasResource["dojox.grid._data.fields"]){B._hasResource["dojox.grid._data.fields"]=true;
B.provide("dojox.grid._data.fields");
B.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(A){var D=B.mixin({owner:this},this.defaultValue);
D.key=A;
this.values[A]=D;
return D
},getDefault:function(){return this.defaultValue
},setDefault:function(A){for(var E=0,F;
(F=arguments[E]);
E++){B.mixin(this.defaultValue,F)
}},get:function(A){return this.values[A]||this.build(A)
},_set:function(A,F){var H=this.get(A);
for(var G=1;
G<arguments.length;
G++){B.mixin(H,arguments[G])
}this.values[A]=H
},set:function(){if(arguments.length<1){return 
}var E=arguments[0];
if(!B.isArray(E)){this._set.apply(this,arguments)
}else{if(E.length&&E[0]["default"]){this.setDefault(E.shift())
}for(var A=0,F=E.length;
A<F;
A++){this._set(A,E[A])
}}},insert:function(A,D){if(A>=this.values.length){this.values[A]=D
}else{this.values.splice(A,0,D)
}},remove:function(A){this.values.splice(A,1)
},swap:function(A,D){dojox.grid.arraySwap(this.values,A,D)
},move:function(A,D){dojox.grid.arrayMove(this.values,A,D)
}});
dojox.grid.data.compare=function(A,D){return(A>D?1:(A==D?0:-1))
};
B.declare("dojox.grid.data.Field",null,{constructor:function(A){this.name=A;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
B.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(A){var D=A?A:dojox.grid.data.Field;
this.defaultValue=new D()
},indexOf:function(E){for(var A=0;
A<this.values.length;
A++){var F=this.values[A];
if(F&&F.key==E){return A
}}return -1
}})
}}});