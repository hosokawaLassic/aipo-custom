dojo._xdResourceLoaded({depends:[["provide","dojo._base.connect"],["require","dojo._base.lang"]],defineResource:function(B){if(!B._hasResource["dojo._base.connect"]){B._hasResource["dojo._base.connect"]=true;
B.provide("dojo._base.connect");
B.require("dojo._base.lang");
B._listener={getDispatcher:function(){return function(){var I=Array.prototype,A=arguments.callee,L=A._listeners,J=A.target;
var H=J&&J.apply(this,arguments);
for(var K in L){if(!(K in I)){L[K].apply(this,arguments)
}}return H
}
},add:function(H,A,I){H=H||B.global;
var J=H[A];
if(!J||!J._listeners){var G=B._listener.getDispatcher();
G.target=J;
G._listeners=[];
J=H[A]=G
}return J._listeners.push(I)
},remove:function(F,A,G){var H=(F||B.global)[A];
if(H&&H._listeners&&G--){delete H._listeners[G]
}}};
B.connect=function(R,L,T,M,N){var O=arguments,P=[],Q=0;
P.push(B.isString(O[0])?null:O[Q++],O[Q++]);
var A=O[Q+1];
P.push(B.isString(A)||B.isFunction(A)?O[Q++]:null,O[Q++]);
for(var S=O.length;
Q<S;
Q++){P.push(O[Q])
}return B._connect.apply(this,P)
};
B._connect=function(H,I,K,A){var L=B._listener,J=L.add(H,I,B.hitch(K,A));
return[H,I,J,L]
};
B.disconnect=function(A){if(A&&A[0]!==undefined){B._disconnect.apply(this,A);
delete A[0]
}};
B._disconnect=function(A,H,F,G){G.remove(A,H,F)
};
B._topics={};
B.subscribe=function(F,E,A){return[F,B._listener.add(B._topics,F,B.hitch(E,A))]
};
B.unsubscribe=function(A){if(A){B._listener.remove(B._topics,A[0],A[1])
}};
B.publish=function(E,F){var A=B._topics[E];
if(A){A.apply(this,F||[])
}};
B.connectPublisher=function(G,A,F){var H=function(){B.publish(G,arguments)
};
return(F)?B.connect(A,F,H):B.connect(A,H)
}
}}});