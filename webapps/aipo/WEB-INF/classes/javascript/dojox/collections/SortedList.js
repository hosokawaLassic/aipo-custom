if(!dojo._hasResource["dojox.collections.SortedList"]){dojo._hasResource["dojox.collections.SortedList"]=true;
dojo.provide("dojox.collections.SortedList");
dojo.require("dojox.collections._base");
dojox.collections.SortedList=function(Q){var K=this;
var R={};
var M=[];
var N=function(A,B){if(A.key>B.key){return 1
}if(A.key<B.key){return -1
}return 0
};
var P=function(){M=[];
var A=K.getIterator();
while(!A.atEnd()){M.push(A.get())
}M.sort(N)
};
var L={};
this.count=M.length;
this.add=function(A,B){if(!R[A]){R[A]=new dojox.collections.DictionaryEntry(A,B);
this.count=M.push(R[A]);
M.sort(N)
}};
this.clear=function(){R={};
M=[];
this.count=M.length
};
this.clone=function(){return new dojox.collections.SortedList(this)
};
this.contains=this.containsKey=function(A){if(L[A]){return false
}return(R[A]!=null)
};
this.containsValue=function(A){var B=this.getIterator();
while(!B.atEnd()){var C=B.get();
if(C.value==A){return true
}}return false
};
this.copyTo=function(B,A){var D=this.getIterator();
var C=A;
while(!D.atEnd()){B.splice(C,0,D.get());
C++
}};
this.entry=function(A){return R[A]
};
this.forEach=function(A,B){dojo.forEach(M,A,B)
};
this.getByIndex=function(A){return M[A].valueOf()
};
this.getIterator=function(){return new dojox.collections.DictionaryIterator(R)
};
this.getKey=function(A){return M[A].key
};
this.getKeyList=function(){var B=[];
var A=this.getIterator();
while(!A.atEnd()){B.push(A.get().key)
}return B
};
this.getValueList=function(){var B=[];
var A=this.getIterator();
while(!A.atEnd()){B.push(A.get().value)
}return B
};
this.indexOfKey=function(B){for(var A=0;
A<M.length;
A++){if(M[A].key==B){return A
}}return -1
};
this.indexOfValue=function(A){for(var B=0;
B<M.length;
B++){if(M[B].value==A){return B
}}return -1
};
this.item=function(A){if(A in R&&!L[A]){return R[A].valueOf()
}return undefined
};
this.remove=function(A){delete R[A];
P();
this.count=M.length
};
this.removeAt=function(A){delete R[M[A].key];
P();
this.count=M.length
};
this.replace=function(A,B){if(!R[A]){this.add(A,B);
return false
}else{R[A]=new dojox.collections.DictionaryEntry(A,B);
P();
return true
}};
this.setByIndex=function(B,A){R[M[B].key].value=A;
P();
this.count=M.length
};
if(Q){var J=Q.getIterator();
while(!J.atEnd()){var O=J.get();
M[M.length]=R[O.key]=new dojox.collections.DictionaryEntry(O.key,O.value)
}M.sort(N)
}}
};