dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Dictionary"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.Dictionary"]){B._hasResource["dojox.collections.Dictionary"]=true;
B.provide("dojox.collections.Dictionary");
B.require("dojox.collections._base");
dojox.collections.Dictionary=function(A){var H={};
this.count=0;
var G={};
this.add=function(C,D){var E=(C in H);
H[C]=new dojox.collections.DictionaryEntry(C,D);
if(!E){this.count++
}};
this.clear=function(){H={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(C){if(G[C]){return false
}return(H[C]!=null)
};
this.containsValue=function(D){var C=this.getIterator();
while(C.get()){if(C.element.value==D){return true
}}return false
};
this.entry=function(C){return H[C]
};
this.forEach=function(D,E){var J=[];
for(var C in H){if(!G[C]){J.push(H[C])
}}B.forEach(J,D,E)
};
this.getKeyList=function(){return(this.getIterator()).map(function(C){return C.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(C){return C.value
})
};
this.item=function(C){if(C in H){return H[C].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(H)
};
this.remove=function(C){if(C in H&&!G[C]){delete H[C];
this.count--;
return true
}return false
};
if(A){var F=A.getIterator();
while(F.get()){this.add(F.element.key,F.element.value)
}}}
}}});