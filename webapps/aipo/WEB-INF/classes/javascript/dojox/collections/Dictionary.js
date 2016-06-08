if(!dojo._hasResource["dojox.collections.Dictionary"]){dojo._hasResource["dojox.collections.Dictionary"]=true;
dojo.provide("dojox.collections.Dictionary");
dojo.require("dojox.collections._base");
dojox.collections.Dictionary=function(F){var E={};
this.count=0;
var H={};
this.add=function(A,B){var C=(A in E);
E[A]=new dojox.collections.DictionaryEntry(A,B);
if(!C){this.count++
}};
this.clear=function(){E={};
this.count=0
};
this.clone=function(){return new dojox.collections.Dictionary(this)
};
this.contains=this.containsKey=function(A){if(H[A]){return false
}return(E[A]!=null)
};
this.containsValue=function(B){var A=this.getIterator();
while(A.get()){if(A.element.value==B){return true
}}return false
};
this.entry=function(A){return E[A]
};
this.forEach=function(B,C){var D=[];
for(var A in E){if(!H[A]){D.push(E[A])
}}dojo.forEach(D,B,C)
};
this.getKeyList=function(){return(this.getIterator()).map(function(A){return A.key
})
};
this.getValueList=function(){return(this.getIterator()).map(function(A){return A.value
})
};
this.item=function(A){if(A in E){return E[A].valueOf()
}return undefined
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(E)
};
this.remove=function(A){if(A in E&&!H[A]){delete E[A];
this.count--;
return true
}return false
};
if(F){var G=F.getIterator();
while(G.get()){this.add(G.element.key,G.element.value)
}}}
};