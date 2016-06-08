dojo._xdResourceLoaded({depends:[["provide","dojo._base.lang"]],defineResource:function(B){if(!B._hasResource["dojo._base.lang"]){B._hasResource["dojo._base.lang"]=true;
B.provide("dojo._base.lang");
B.isString=function(A){return typeof A=="string"||A instanceof String
};
B.isArray=function(A){return A&&A instanceof Array||typeof A=="array"
};
B.isFunction=(function(){var A=function(D){return typeof D=="function"||D instanceof Function
};
return B.isSafari?function(D){if(typeof D=="function"&&D=="[object NodeList]"){return false
}return A(D)
}:A
})();
B.isObject=function(A){return A!==undefined&&(A===null||typeof A=="object"||B.isArray(A)||B.isFunction(A))
};
B.isArrayLike=function(D){var A=B;
return D&&D!==undefined&&!A.isString(D)&&!A.isFunction(D)&&!(D.tagName&&D.tagName.toLowerCase()=="form")&&(A.isArray(D)||isFinite(D.length))
};
B.isAlien=function(A){return A&&!B.isFunction(A)&&/\{\s*\[native code\]\s*\}/.test(String(A))
};
B.extend=function(A,F){for(var G=1,H=arguments.length;
G<H;
G++){B._mixin(A.prototype,arguments[G])
}return A
};
B._hitchArgs=function(G,A){var F=B._toArray(arguments,2);
var H=B.isString(A);
return function(){var D=B._toArray(arguments);
var C=H?(G||B.global)[A]:A;
return C&&C.apply(G||this,F.concat(D))
}
};
B.hitch=function(D,A){if(arguments.length>2){return B._hitchArgs.apply(B,arguments)
}if(!A){A=D;
D=null
}if(B.isString(A)){D=D||B.global;
if(!D[A]){throw (['dojo.hitch: scope["',A,'"] is null (scope="',D,'")'].join(""))
}return function(){return D[A].apply(D,arguments||[])
}
}return !D?A:function(){return A.apply(D,arguments||[])
}
};
B.delegate=B._delegate=function(A,F){function H(){}H.prototype=A;
var G=new H();
if(F){B.mixin(G,F)
}return G
};
B.partial=function(A){var D=[null];
return B.hitch.apply(B,D.concat(B._toArray(arguments)))
};
B._toArray=function(G,A,H){var I=H||[];
for(var J=A||0;
J<G.length;
J++){I.push(G[J])
}return I
};
B.clone=function(A){if(!A){return A
}if(B.isArray(A)){var E=[];
for(var F=0;
F<A.length;
++F){E.push(B.clone(A[F]))
}return E
}if(!B.isObject(A)){return A
}if(A.nodeType&&A.cloneNode){return A.cloneNode(true)
}if(A instanceof Date){return new Date(A.getTime())
}var E=new A.constructor();
for(var F in A){if(!(F in E)||E[F]!=A[F]){E[F]=B.clone(A[F])
}}return E
};
B.trim=function(A){return A.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
}}});