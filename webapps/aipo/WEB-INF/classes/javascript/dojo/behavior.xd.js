dojo._xdResourceLoaded({depends:[["provide","dojo.behavior"]],defineResource:function(B){if(!B._hasResource["dojo.behavior"]){B._hasResource["dojo.behavior"]=true;
B.provide("dojo.behavior");
B.behavior=new function(){function G(C,D){if(!C[D]){C[D]=[]
}return C[D]
}var F=0;
function H(D,K,E){var C={};
for(var L in D){if(typeof C[L]=="undefined"){if(!E){K(D[L],L)
}else{E.call(K,D[L],L)
}}}}this._behaviors={};
this.add=function(D){var C={};
H(D,this,function(L,N){var M=G(this._behaviors,N);
if(typeof M.id!="number"){M.id=F++
}var E=[];
M.push(E);
if((B.isString(L))||(B.isFunction(L))){L={found:L}
}H(L,function(J,I){G(E,I).push(J)
})
})
};
var A=function(D,C,E){if(B.isString(C)){if(E=="found"){B.publish(C,[D])
}else{B.connect(D,E,function(){B.publish(C,arguments)
})
}}else{if(B.isFunction(C)){if(E=="found"){C(D)
}else{B.connect(D,E,C)
}}}};
this.apply=function(){H(this._behaviors,function(D,C){B.query(C).forEach(function(E){var M=0;
var O="_dj_behavior_"+D.id;
if(typeof E[O]=="number"){M=E[O];
if(M==(D.length)){return 
}}for(var P=M,N;
N=D[P];
P++){H(N,function(I,J){if(B.isArray(I)){B.forEach(I,function(K){A(E,K,J)
})
}})
}E[O]=D.length
})
})
}
};
B.addOnLoad(B.behavior,"apply")
}}});