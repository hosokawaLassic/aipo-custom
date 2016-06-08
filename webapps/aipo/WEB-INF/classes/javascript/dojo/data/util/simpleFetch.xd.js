dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.simpleFetch"],["require","dojo.data.util.sorter"]],defineResource:function(B){if(!B._hasResource["dojo.data.util.simpleFetch"]){B._hasResource["dojo.data.util.simpleFetch"]=true;
B.provide("dojo.data.util.simpleFetch");
B.require("dojo.data.util.sorter");
B.data.util.simpleFetch.fetch=function(A){A=A||{};
if(!A.store){A.store=this
}var G=this;
var F=function(C,E){if(E.onError){var D=E.scope||B.global;
E.onError.call(D,C,E)
}};
var H=function(R,Q){var D=Q.abort||null;
var V=false;
var P=Q.start?Q.start:0;
var S=Q.count?(P+Q.count):R.length;
Q.abort=function(){V=true;
if(D){D.call(Q)
}};
var C=Q.scope||B.global;
if(!Q.store){Q.store=G
}if(Q.onBegin){Q.onBegin.call(C,R.length,Q)
}if(Q.sort){R.sort(B.data.util.sorter.createSortFunction(Q.sort,G))
}if(Q.onItem){for(var T=P;
(T<R.length)&&(T<S);
++T){var E=R[T];
if(!V){Q.onItem.call(C,E,Q)
}}}if(Q.onComplete&&!V){var U=null;
if(!Q.onItem){U=R.slice(P,S)
}Q.onComplete.call(C,U,Q)
}};
this._fetchItems(A,H,F);
return A
}
}}});