if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.declare=function(L,Q,U){if(dojo.isFunction(U)||(arguments.length>3)){dojo.deprecated("dojo.declare: for class '"+L+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var V=U;
U=arguments[3]||{};
U.constructor=V
}var R=arguments.callee,M=null;
if(dojo.isArray(Q)){M=Q;
Q=M.shift()
}if(M){for(var N=0,O;
N<M.length;
N++){O=M[N];
if(!O){throw ("Mixin #"+N+" to declaration of "+L+" is null. It's likely a required module is not loaded.")
}Q=R._delegate(Q,O)
}}var P=(U||0).constructor,S=R._delegate(Q),T;
for(var N in U){if(dojo.isFunction(T=U[N])&&(!0[N])){T.nom=N
}}dojo.extend(S,{declaredClass:L,_constructor:P,preamble:null},U||0);
S.prototype.constructor=S;
return dojo.setObject(L,S)
};
dojo.mixin(dojo.declare,{_delegate:function(G,F){var H=(G||0).prototype,I=(F||0).prototype;
var J=dojo.declare._makeCtor();
dojo.mixin(J,{superclass:H,mixin:I,extend:dojo.declare._extend});
if(G){J.prototype=dojo._delegate(H)
}dojo.extend(J,dojo.declare._core,I||0,{_constructor:null,preamble:null});
J.prototype.constructor=J;
J.prototype.declaredClass=(H||0).declaredClass+"_"+(I||0).declaredClass;
return J
},_extend:function(D){for(var C in D){if(dojo.isFunction(fn=D[C])&&(!0[C])){fn.nom=C
}}dojo.extend(this,D)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(J){var R=J.callee,N=R.superclass,K=N&&N.constructor,L=R.mixin,M=L&&L.constructor,P=J,O,Q;
if(P[0]){if((Q=P[0]["preamble"])){P=Q.apply(this,P)||P
}}if(Q=R.prototype.preamble){P=Q.apply(this,P)||P
}if(K&&K.apply){K.apply(this,P)
}if(M&&M.apply){M.apply(this,P)
}if(O=R.prototype._constructor){O.apply(this,J)
}if(this.constructor.prototype==R.prototype&&(K=this.postscript)){K.apply(this,J)
}},_findMixin:function(H){var F=this.constructor,G,E;
while(F){G=F.superclass;
E=F.mixin;
if(E==H||(E instanceof H.constructor)){return G
}if(E&&(E=E._findMixin(H))){return E
}F=G&&G.constructor
}},_findMethod:function(O,J,N,P){var L=N,K,I,M;
do{K=L.constructor;
I=K.mixin;
if(I&&(I=this._findMethod(O,J,I,P))){return I
}if((M=L[O])&&(P==(M==J))){return L
}L=K.superclass
}while(L);
return !P&&(L=this._findMixin(N))&&this._findMethod(O,J,L,P)
},inherited:function(N,O,P){var I=arguments;
if(!dojo.isString(I[0])){P=O;
O=N;
N=O.callee.nom
}var J=O.callee,K=this.constructor.prototype,I=P||O,M,L;
if(this[N]!=J||K[N]==J){L=this._findMethod(N,J,K,true);
if(!L){throw (this.declaredClass+': name argument ("'+N+'") to inherited must match callee (declare.js)')
}K=this._findMethod(N,J,L,false)
}M=K&&K[N];
if(!M){console.debug(L.declaredClass+': no inherited "'+N+'" was found (declare.js)');
return 
}return M.apply(this,I)
}}})
};