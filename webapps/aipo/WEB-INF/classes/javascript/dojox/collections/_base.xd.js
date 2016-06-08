dojo._xdResourceLoaded({depends:[["provide","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections._base"]){B._hasResource["dojox.collections._base"]=true;
B.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(A,D){this.key=A;
this.value=D;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(E){var A=E;
var F=0;
this.element=A[F]||null;
this.atEnd=function(){return(F>=A.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=A[F++];
return this.element
};
this.map=function(C,D){return B.map(A,C,D)
};
this.reset=function(){F=0;
this.element=A[F]
}
};
dojox.collections.DictionaryIterator=function(A){var I=[];
var H={};
for(var G in A){if(!H[G]){I.push(A[G])
}}var J=0;
this.element=I[J]||null;
this.atEnd=function(){return(J>=I.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=I[J++];
return this.element
};
this.map=function(C,D){return B.map(I,C,D)
};
this.reset=function(){J=0;
this.element=I[J]
}
}
}}});