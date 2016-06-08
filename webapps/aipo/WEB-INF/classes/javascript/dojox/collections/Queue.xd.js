dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Queue"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.Queue"]){B._hasResource["dojox.collections.Queue"]=true;
B.provide("dojox.collections.Queue");
B.require("dojox.collections._base");
dojox.collections.Queue=function(D){var A=[];
if(D){A=A.concat(D)
}this.count=A.length;
this.clear=function(){A=[];
this.count=A.length
};
this.clone=function(){return new dojox.collections.Queue(A)
};
this.contains=function(C){for(var F=0;
F<A.length;
F++){if(A[F]==C){return true
}}return false
};
this.copyTo=function(F,C){F.splice(C,0,A)
};
this.dequeue=function(){var C=A.shift();
this.count=A.length;
return C
};
this.enqueue=function(C){this.count=A.push(C)
};
this.forEach=function(C,F){B.forEach(A,C,F)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.peek=function(){return A[0]
};
this.toArray=function(){return[].concat(A)
}
}
}}});