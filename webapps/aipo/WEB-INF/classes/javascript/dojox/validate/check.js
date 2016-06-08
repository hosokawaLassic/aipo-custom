if(!dojo._hasResource["dojox.validate.check"]){dojo._hasResource["dojox.validate.check"]=true;
dojo.provide("dojox.validate.check");
dojo.require("dojox.validate._base");
dojox.validate.check=function(R,P){var b=[];
var W=[];
var a={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(b.length>0)
},getMissing:function(){return b
},isMissing:function(A){for(var B=0;
B<b.length;
B++){if(A==b[B]){return true
}}return false
},hasInvalid:function(){return(W.length>0)
},getInvalid:function(){return W
},isInvalid:function(A){for(var B=0;
B<W.length;
B++){if(A==W[B]){return true
}}return false
}};
var Y=function(A,B){return(typeof B[A]=="undefined")
};
if(P.trim instanceof Array){for(var Z=0;
Z<P.trim.length;
Z++){var Q=R[P.trim[Z]];
if(Y("type",Q)||Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}Q.value=Q.value.replace(/(^\s*|\s*$)/g,"")
}}if(P.uppercase instanceof Array){for(var Z=0;
Z<P.uppercase.length;
Z++){var Q=R[P.uppercase[Z]];
if(Y("type",Q)||Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}Q.value=Q.value.toUpperCase()
}}if(P.lowercase instanceof Array){for(var Z=0;
Z<P.lowercase.length;
Z++){var Q=R[P.lowercase[Z]];
if(Y("type",Q)||Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}Q.value=Q.value.toLowerCase()
}}if(P.ucfirst instanceof Array){for(var Z=0;
Z<P.ucfirst.length;
Z++){var Q=R[P.ucfirst[Z]];
if(Y("type",Q)||Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}Q.value=Q.value.replace(/\b\w+\b/g,function(A){return A.substring(0,1).toUpperCase()+A.substring(1).toLowerCase()
})
}}if(P.digit instanceof Array){for(var Z=0;
Z<P.digit.length;
Z++){var Q=R[P.digit[Z]];
if(Y("type",Q)||Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}Q.value=Q.value.replace(/\D/g,"")
}}if(P.required instanceof Array){for(var Z=0;
Z<P.required.length;
Z++){if(!dojo.isString(P.required[Z])){continue
}var Q=R[P.required[Z]];
if(!Y("type",Q)&&(Q.type=="text"||Q.type=="textarea"||Q.type=="password"||Q.type=="file")&&/^\s*$/.test(Q.value)){b[b.length]=Q.name
}else{if(!Y("type",Q)&&(Q.type=="select-one"||Q.type=="select-multiple")&&(Q.selectedIndex==-1||/^\s*$/.test(Q.options[Q.selectedIndex].value))){b[b.length]=Q.name
}else{if(Q instanceof Array){var V=false;
for(var c=0;
c<Q.length;
c++){if(Q[c].checked){V=true
}}if(!V){b[b.length]=Q[0].name
}}}}}}if(P.required instanceof Array){for(var Z=0;
Z<P.required.length;
Z++){if(!dojo.isObject(P.required[Z])){continue
}var Q,T;
for(var S in P.required[Z]){Q=R[S];
T=P.required[Z][S]
}if(Q instanceof Array){var V=0;
for(var c=0;
c<Q.length;
c++){if(Q[c].checked){V++
}}if(V<T){b[b.length]=Q[0].name
}}else{if(!Y("type",Q)&&Q.type=="select-multiple"){var d=0;
for(var c=0;
c<Q.options.length;
c++){if(Q.options[c].selected&&!/^\s*$/.test(Q.options[c].value)){d++
}}if(d<T){b[b.length]=Q.name
}}}}}if(dojo.isObject(P.dependencies)){for(S in P.dependencies){var Q=R[S];
if(Y("type",Q)){continue
}if(Q.type!="text"&&Q.type!="textarea"&&Q.type!="password"){continue
}if(/\S+/.test(Q.value)){continue
}if(a.isMissing(Q.name)){continue
}var X=R[P.dependencies[S]];
if(X.type!="text"&&X.type!="textarea"&&X.type!="password"){continue
}if(/^\s*$/.test(X.value)){continue
}b[b.length]=Q.name
}}if(dojo.isObject(P.constraints)){for(S in P.constraints){var Q=R[S];
if(!Q){continue
}if(!Y("tagName",Q)&&(Q.tagName.toLowerCase().indexOf("input")>=0||Q.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(Q.value)){continue
}var U=true;
if(dojo.isFunction(P.constraints[S])){U=P.constraints[S](Q.value)
}else{if(dojo.isArray(P.constraints[S])){if(dojo.isArray(P.constraints[S][0])){for(var Z=0;
Z<P.constraints[S].length;
Z++){U=dojox.validate.evaluateConstraint(P,P.constraints[S][Z],S,Q);
if(!U){break
}}}else{U=dojox.validate.evaluateConstraint(P,P.constraints[S],S,Q)
}}}if(!U){W[W.length]=Q.name
}}}if(dojo.isObject(P.confirm)){for(S in P.confirm){var Q=R[S];
var X=R[P.confirm[S]];
if(Y("type",Q)||Y("type",X)||(Q.type!="text"&&Q.type!="textarea"&&Q.type!="password")||(X.type!=Q.type)||(X.value==Q.value)||(a.isInvalid(Q.name))||(/^\s*$/.test(X.value))){continue
}W[W.length]=Q.name
}}return a
};
dojox.validate.evaluateConstraint=function(G,K,H,L){var I=K[0];
var J=K.slice(1);
J.unshift(L.value);
if(typeof I!="undefined"){return I.apply(null,J)
}return false
}
};