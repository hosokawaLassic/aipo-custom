dojo._xdResourceLoaded({depends:[["provide","dojo._base.declare"],["require","dojo._base.lang"]],defineResource:function(B){if(!B._hasResource["dojo._base.declare"]){B._hasResource["dojo._base.declare"]=true;
B.provide("dojo._base.declare");
B.require("dojo._base.lang");
B.declare=function(V,P,T){if(B.isFunction(T)||(arguments.length>3)){B.deprecated("dojo.declare: for class '"+V+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var U=T;
T=arguments[3]||{};
T.constructor=U
}var Q=arguments.callee,A=null;
if(B.isArray(P)){A=P;
P=A.shift()
}if(A){for(var M=0,N;
M<A.length;
M++){N=A[M];
if(!N){throw ("Mixin #"+M+" to declaration of "+V+" is null. It's likely a required module is not loaded.")
}P=Q._delegate(P,N)
}}var O=(T||0).constructor,R=Q._delegate(P),S;
for(var M in T){if(B.isFunction(S=T[M])&&(!0[M])){S.nom=M
}}B.extend(R,{declaredClass:V,_constructor:O,preamble:null},T||0);
R.prototype.constructor=R;
return B.setObject(V,R)
};
B.mixin(B.declare,{_delegate:function(A,J){var G=(A||0).prototype,H=(J||0).prototype;
var I=B.declare._makeCtor();
B.mixin(I,{superclass:G,mixin:H,extend:B.declare._extend});
if(A){I.prototype=B._delegate(G)
}B.extend(I,B.declare._core,H||0,{_constructor:null,preamble:null});
I.prototype.constructor=I;
I.prototype.declaredClass=(G||0).declaredClass+"_"+(H||0).declaredClass;
return I
},_extend:function(A){for(var D in A){if(B.isFunction(fn=A[D])&&(!0[D])){fn.nom=D
}}B.extend(this,A)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(R){var Q=R.callee,M=Q.superclass,A=M&&M.constructor,K=Q.mixin,L=K&&K.constructor,O=R,N,P;
if(O[0]){if((P=O[0]["preamble"])){O=P.apply(this,O)||O
}}if(P=Q.prototype.preamble){O=P.apply(this,O)||O
}if(A&&A.apply){A.apply(this,O)
}if(L&&L.apply){L.apply(this,O)
}if(N=Q.prototype._constructor){N.apply(this,R)
}if(this.constructor.prototype==Q.prototype&&(A=this.postscript)){A.apply(this,R)
}},_findMixin:function(G){var A=this.constructor,F,H;
while(A){F=A.superclass;
H=A.mixin;
if(H==G||(H instanceof G.constructor)){return F
}if(H&&(H=H._findMixin(G))){return H
}A=F&&F.constructor
}},_findMethod:function(N,A,M,O){var K=M,J,P,L;
do{J=K.constructor;
P=J.mixin;
if(P&&(P=this._findMethod(N,A,P,O))){return P
}if((L=K[N])&&(O==(L==A))){return K
}K=J.superclass
}while(K);
return !O&&(K=this._findMixin(M))&&this._findMethod(N,A,K,O)
},inherited:function(M,N,O){var P=arguments;
if(!B.isString(P[0])){O=N;
N=M;
M=N.callee.nom
}var A=N.callee,J=this.constructor.prototype,P=O||N,L,K;
if(this[M]!=A||J[M]==A){K=this._findMethod(M,A,J,true);
if(!K){throw (this.declaredClass+': name argument ("'+M+'") to inherited must match callee (declare.js)')
}J=this._findMethod(M,A,K,false)
}L=J&&J[M];
if(!L){console.debug(K.declaredClass+': no inherited "'+M+'" was found (declare.js)');
return 
}return L.apply(this,P)
}}})
}}});