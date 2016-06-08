if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.sorter");
dojo.data.util.simpleFetch.fetch=function(F){F=F||{};
if(!F.store){F.store=this
}var H=this;
var G=function(A,C){if(C.onError){var B=C.scope||dojo.global;
C.onError.call(B,A,C)
}};
var E=function(P,O){var B=O.abort||null;
var T=false;
var D=O.start?O.start:0;
var Q=O.count?(D+O.count):P.length;
O.abort=function(){T=true;
if(B){B.call(O)
}};
var A=O.scope||dojo.global;
if(!O.store){O.store=H
}if(O.onBegin){O.onBegin.call(A,P.length,O)
}if(O.sort){P.sort(dojo.data.util.sorter.createSortFunction(O.sort,H))
}if(O.onItem){for(var R=D;
(R<P.length)&&(R<Q);
++R){var C=P[R];
if(!T){O.onItem.call(A,C,O)
}}}if(O.onComplete&&!T){var S=null;
if(!O.onItem){S=P.slice(D,Q)
}O.onComplete.call(A,S,O)
}};
this._fetchItems(F,E,G);
return F
}
};