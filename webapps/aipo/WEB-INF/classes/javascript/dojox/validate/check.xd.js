dojo._xdResourceLoaded({depends:[["provide","dojox.validate.check"],["require","dojox.validate._base"]],defineResource:function(B){if(!B._hasResource["dojox.validate.check"]){B._hasResource["dojox.validate.check"]=true;
B.provide("dojox.validate.check");
B.require("dojox.validate._base");
dojox.validate.check=function(Q,d){var a=[];
var V=[];
var Z={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(a.length>0)
},getMissing:function(){return a
},isMissing:function(C){for(var D=0;
D<a.length;
D++){if(C==a[D]){return true
}}return false
},hasInvalid:function(){return(V.length>0)
},getInvalid:function(){return V
},isInvalid:function(C){for(var D=0;
D<V.length;
D++){if(C==V[D]){return true
}}return false
}};
var X=function(C,D){return(typeof D[C]=="undefined")
};
if(d.trim instanceof Array){for(var Y=0;
Y<d.trim.length;
Y++){var A=Q[d.trim[Y]];
if(X("type",A)||A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}A.value=A.value.replace(/(^\s*|\s*$)/g,"")
}}if(d.uppercase instanceof Array){for(var Y=0;
Y<d.uppercase.length;
Y++){var A=Q[d.uppercase[Y]];
if(X("type",A)||A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}A.value=A.value.toUpperCase()
}}if(d.lowercase instanceof Array){for(var Y=0;
Y<d.lowercase.length;
Y++){var A=Q[d.lowercase[Y]];
if(X("type",A)||A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}A.value=A.value.toLowerCase()
}}if(d.ucfirst instanceof Array){for(var Y=0;
Y<d.ucfirst.length;
Y++){var A=Q[d.ucfirst[Y]];
if(X("type",A)||A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}A.value=A.value.replace(/\b\w+\b/g,function(C){return C.substring(0,1).toUpperCase()+C.substring(1).toLowerCase()
})
}}if(d.digit instanceof Array){for(var Y=0;
Y<d.digit.length;
Y++){var A=Q[d.digit[Y]];
if(X("type",A)||A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}A.value=A.value.replace(/\D/g,"")
}}if(d.required instanceof Array){for(var Y=0;
Y<d.required.length;
Y++){if(!B.isString(d.required[Y])){continue
}var A=Q[d.required[Y]];
if(!X("type",A)&&(A.type=="text"||A.type=="textarea"||A.type=="password"||A.type=="file")&&/^\s*$/.test(A.value)){a[a.length]=A.name
}else{if(!X("type",A)&&(A.type=="select-one"||A.type=="select-multiple")&&(A.selectedIndex==-1||/^\s*$/.test(A.options[A.selectedIndex].value))){a[a.length]=A.name
}else{if(A instanceof Array){var U=false;
for(var b=0;
b<A.length;
b++){if(A[b].checked){U=true
}}if(!U){a[a.length]=A[0].name
}}}}}}if(d.required instanceof Array){for(var Y=0;
Y<d.required.length;
Y++){if(!B.isObject(d.required[Y])){continue
}var A,S;
for(var R in d.required[Y]){A=Q[R];
S=d.required[Y][R]
}if(A instanceof Array){var U=0;
for(var b=0;
b<A.length;
b++){if(A[b].checked){U++
}}if(U<S){a[a.length]=A[0].name
}}else{if(!X("type",A)&&A.type=="select-multiple"){var c=0;
for(var b=0;
b<A.options.length;
b++){if(A.options[b].selected&&!/^\s*$/.test(A.options[b].value)){c++
}}if(c<S){a[a.length]=A.name
}}}}}if(B.isObject(d.dependencies)){for(R in d.dependencies){var A=Q[R];
if(X("type",A)){continue
}if(A.type!="text"&&A.type!="textarea"&&A.type!="password"){continue
}if(/\S+/.test(A.value)){continue
}if(Z.isMissing(A.name)){continue
}var W=Q[d.dependencies[R]];
if(W.type!="text"&&W.type!="textarea"&&W.type!="password"){continue
}if(/^\s*$/.test(W.value)){continue
}a[a.length]=A.name
}}if(B.isObject(d.constraints)){for(R in d.constraints){var A=Q[R];
if(!A){continue
}if(!X("tagName",A)&&(A.tagName.toLowerCase().indexOf("input")>=0||A.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(A.value)){continue
}var T=true;
if(B.isFunction(d.constraints[R])){T=d.constraints[R](A.value)
}else{if(B.isArray(d.constraints[R])){if(B.isArray(d.constraints[R][0])){for(var Y=0;
Y<d.constraints[R].length;
Y++){T=dojox.validate.evaluateConstraint(d,d.constraints[R][Y],R,A);
if(!T){break
}}}else{T=dojox.validate.evaluateConstraint(d,d.constraints[R],R,A)
}}}if(!T){V[V.length]=A.name
}}}if(B.isObject(d.confirm)){for(R in d.confirm){var A=Q[R];
var W=Q[d.confirm[R]];
if(X("type",A)||X("type",W)||(A.type!="text"&&A.type!="textarea"&&A.type!="password")||(W.type!=A.type)||(W.value==A.value)||(Z.isInvalid(A.name))||(/^\s*$/.test(W.value))){continue
}V[V.length]=A.name
}}return Z
};
dojox.validate.evaluateConstraint=function(L,J,A,K){var H=J[0];
var I=J.slice(1);
I.unshift(K.value);
if(typeof H!="undefined"){return H.apply(null,I)
}return false
}
}}});