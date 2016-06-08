dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Stack"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.Stack"]){B._hasResource["dojox.collections.Stack"]=true;
B.provide("dojox.collections.Stack");
B.require("dojox.collections._base");
dojox.collections.Stack=function(D){var A=[];
if(D){A=A.concat(D)
}this.count=A.length;
this.clear=function(){A=[];
this.count=A.length
};
this.clone=function(){return new dojox.collections.Stack(A)
};
this.contains=function(C){for(var F=0;
F<A.length;
F++){if(A[F]==C){return true
}}return false
};
this.copyTo=function(F,C){F.splice(C,0,A)
};
this.forEach=function(C,F){B.forEach(A,C,F)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.peek=function(){return A[(A.length-1)]
};
this.pop=function(){var C=A.pop();
this.count=A.length;
return C
};
this.push=function(C){this.count=A.push(C)
};
this.toArray=function(){return[].concat(A)
}
}
}}});