if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo.require("dojo._base.lang");
dojo._listener={getDispatcher:function(){return function(){var J=Array.prototype,H=arguments.callee,G=H._listeners,K=H.target;
var I=K&&K.apply(this,arguments);
for(var L in G){if(!(L in J)){G[L].apply(this,arguments)
}}return I
}
},add:function(I,G,J){I=I||dojo.global;
var F=I[G];
if(!F||!F._listeners){var H=dojo._listener.getDispatcher();
H.target=F;
H._listeners=[];
F=I[G]=H
}return F._listeners.push(J)
},remove:function(G,F,H){var E=(G||dojo.global)[F];
if(E&&E._listeners&&H--){delete E._listeners[H]
}}};
dojo.connect=function(S,M,K,N,O){var P=arguments,Q=[],R=0;
Q.push(dojo.isString(P[0])?null:P[R++],P[R++]);
var L=P[R+1];
Q.push(dojo.isString(L)||dojo.isFunction(L)?P[R++]:null,P[R++]);
for(var T=P.length;
R<T;
R++){Q.push(P[R])
}return dojo._connect.apply(this,Q)
};
dojo._connect=function(I,J,L,H){var G=dojo._listener,K=G.add(I,J,dojo.hitch(L,H));
return[I,J,K,G]
};
dojo.disconnect=function(B){if(B&&B[0]!==undefined){dojo._disconnect.apply(this,B);
delete B[0]
}};
dojo._disconnect=function(F,E,G,H){H.remove(F,E,G)
};
dojo._topics={};
dojo.subscribe=function(D,F,E){return[D,dojo._listener.add(dojo._topics,D,dojo.hitch(F,E))]
};
dojo.unsubscribe=function(B){if(B){dojo._listener.remove(dojo._topics,B[0],B[1])
}};
dojo.publish=function(F,D){var E=dojo._topics[F];
if(E){E.apply(this,D||[])
}};
dojo.connectPublisher=function(H,F,G){var E=function(){dojo.publish(H,arguments)
};
return(G)?dojo.connect(F,G,E):dojo.connect(F,E)
}
};