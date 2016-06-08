if(!dojo._hasResource["dojox.grid._data.fields"]){dojo._hasResource["dojox.grid._data.fields"]=true;
dojo.provide("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(D){var C=dojo.mixin({owner:this},this.defaultValue);
C.key=D;
this.values[D]=C;
return C
},getDefault:function(){return this.defaultValue
},setDefault:function(E){for(var F=0,D;
(D=arguments[F]);
F++){dojo.mixin(this.defaultValue,D)
}},get:function(B){return this.values[B]||this.build(B)
},_set:function(F,G){var E=this.get(F);
for(var H=1;
H<arguments.length;
H++){dojo.mixin(E,arguments[H])
}this.values[F]=E
},set:function(){if(arguments.length<1){return 
}var F=arguments[0];
if(!dojo.isArray(F)){this._set.apply(this,arguments)
}else{if(F.length&&F[0]["default"]){this.setDefault(F.shift())
}for(var E=0,D=F.length;
E<D;
E++){this._set(E,F[E])
}}},insert:function(D,C){if(D>=this.values.length){this.values[D]=C
}else{this.values.splice(D,0,C)
}},remove:function(B){this.values.splice(B,1)
},swap:function(D,C){dojox.grid.arraySwap(this.values,D,C)
},move:function(D,C){dojox.grid.arrayMove(this.values,D,C)
}});
dojox.grid.data.compare=function(D,C){return(D>C?1:(D==C?0:-1))
};
dojo.declare("dojox.grid.data.Field",null,{constructor:function(B){this.name=B;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
dojo.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(D){var C=D?D:dojox.grid.data.Field;
this.defaultValue=new C()
},indexOf:function(F){for(var E=0;
E<this.values.length;
E++){var D=this.values[E];
if(D&&D.key==F){return E
}}return -1
}})
};