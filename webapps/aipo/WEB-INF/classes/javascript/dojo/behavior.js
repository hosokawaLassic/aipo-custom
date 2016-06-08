if(!dojo._hasResource["dojo.behavior"]){dojo._hasResource["dojo.behavior"]=true;
dojo.provide("dojo.behavior");
dojo.behavior=new function(){function H(A,B){if(!A[B]){A[B]=[]
}return A[B]
}var G=0;
function E(B,D,C){var A={};
for(var J in B){if(typeof A[J]=="undefined"){if(!C){D(B[J],J)
}else{C.call(D,B[J],J)
}}}}this._behaviors={};
this.add=function(B){var A={};
E(B,this,function(D,L){var K=H(this._behaviors,L);
if(typeof K.id!="number"){K.id=G++
}var C=[];
K.push(C);
if((dojo.isString(D))||(dojo.isFunction(D))){D={found:D}
}E(D,function(I,J){H(C,J).push(I)
})
})
};
var F=function(B,A,C){if(dojo.isString(A)){if(C=="found"){dojo.publish(A,[B])
}else{dojo.connect(B,C,function(){dojo.publish(A,arguments)
})
}}else{if(dojo.isFunction(A)){if(C=="found"){A(B)
}else{dojo.connect(B,C,A)
}}}};
this.apply=function(){E(this._behaviors,function(B,A){dojo.query(A).forEach(function(C){var D=0;
var M="_dj_behavior_"+B.id;
if(typeof C[M]=="number"){D=C[M];
if(D==(B.length)){return 
}}for(var N=D,L;
L=B[N];
N++){E(L,function(J,I){if(dojo.isArray(J)){dojo.forEach(J,function(K){F(C,K,I)
})
}})
}C[M]=B.length
})
})
}
};
dojo.addOnLoad(dojo.behavior,"apply")
};