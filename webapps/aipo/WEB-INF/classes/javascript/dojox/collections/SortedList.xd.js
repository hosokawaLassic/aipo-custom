dojo._xdResourceLoaded({depends:[["provide","dojox.collections.SortedList"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.SortedList"]){B._hasResource["dojox.collections.SortedList"]=true;
B.provide("dojox.collections.SortedList");
B.require("dojox.collections._base");
dojox.collections.SortedList=function(P){var A=this;
var Q={};
var L=[];
var M=function(C,D){if(C.key>D.key){return 1
}if(C.key<D.key){return -1
}return 0
};
var O=function(){L=[];
var C=A.getIterator();
while(!C.atEnd()){L.push(C.get())
}L.sort(M)
};
var K={};
this.count=L.length;
this.add=function(C,D){if(!Q[C]){Q[C]=new dojox.collections.DictionaryEntry(C,D);
this.count=L.push(Q[C]);
L.sort(M)
}};
this.clear=function(){Q={};
L=[];
this.count=L.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(C){if(K[C]){return false
}return(Q[C]!=null)
};
this.containsValue=function(E){var C=this.getIterator();
while(!C.atEnd()){var D=C.get();
if(D.value==E){return true
}}return false
};
this.copyTo=function(C,F){var E=this.getIterator();
var D=F;
while(!E.atEnd()){C.splice(D,0,E.get());
D++
}};
this.entry=function(C){return Q[C]
};
this.forEach=function(C,D){B.forEach(L,C,D)
};
this.getByIndex=function(C){return L[C].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(Q)
};
this.getKey=function(C){return L[C].key
};
this.getKeyList=function(){var D=[];
var C=this.getIterator();
while(!C.atEnd()){D.push(C.get().key)
}return D
};
this.getValueList=function(){var D=[];
var C=this.getIterator();
while(!C.atEnd()){D.push(C.get().value)
}return D
};
this.indexOfKey=function(D){for(var C=0;
C<L.length;
C++){if(L[C].key==D){return C
}}return -1
};
this.indexOfValue=function(C){for(var D=0;
D<L.length;
D++){if(L[D].value==C){return D
}}return -1
};
this.item=function(C){if(C in Q&&!K[C]){return Q[C].valueOf()
}return undefined
};
this.remove=function(C){delete Q[C];
O();
this.count=L.length
};
this.removeAt=function(C){delete Q[L[C].key];
O();
this.count=L.length
};
this.replace=function(C,D){if(!Q[C]){this.add(C,D);
return false
}else{Q[C]=new dojox.collections.DictionaryEntry(C,D);
O();
return true
}};
this.setByIndex=function(D,C){Q[L[D].key].value=C;
O();
this.count=L.length
};
if(P){var R=P.getIterator();
while(!R.atEnd()){var N=R.get();
L[L.length]=Q[N.key]=new dojox.collections.DictionaryEntry(N.key,N.value)
}L.sort(M)
}}
}}});