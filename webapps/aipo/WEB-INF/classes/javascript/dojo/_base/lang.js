if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(B){return typeof B=="string"||B instanceof String
};
dojo.isArray=function(B){return B&&B instanceof Array||typeof B=="array"
};
dojo.isFunction=(function(){var B=function(A){return typeof A=="function"||A instanceof Function
};
return dojo.isSafari?function(A){if(typeof A=="function"&&A=="[object NodeList]"){return false
}return B(A)
}:B
})();
dojo.isObject=function(B){return B!==undefined&&(B===null||typeof B=="object"||dojo.isArray(B)||dojo.isFunction(B))
};
dojo.isArrayLike=function(C){var D=dojo;
return C&&C!==undefined&&!D.isString(C)&&!D.isFunction(C)&&!(C.tagName&&C.tagName.toLowerCase()=="form")&&(D.isArray(C)||isFinite(C.length))
};
dojo.isAlien=function(B){return B&&!dojo.isFunction(B)&&/\{\s*\[native code\]\s*\}/.test(String(B))
};
dojo.extend=function(F,G){for(var H=1,E=arguments.length;
H<E;
H++){dojo._mixin(F.prototype,arguments[H])
}return F
};
dojo._hitchArgs=function(H,F){var G=dojo._toArray(arguments,2);
var E=dojo.isString(F);
return function(){var B=dojo._toArray(arguments);
var A=E?(H||dojo.global)[F]:F;
return A&&A.apply(H||this,G.concat(B))
}
};
dojo.hitch=function(C,D){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments)
}if(!D){D=C;
C=null
}if(dojo.isString(D)){C=C||dojo.global;
if(!C[D]){throw (['dojo.hitch: scope["',D,'"] is null (scope="',C,'")'].join(""))
}return function(){return C[D].apply(C,arguments||[])
}
}return !C?D:function(){return D.apply(C,arguments||[])
}
};
dojo.delegate=dojo._delegate=function(F,G){function E(){}E.prototype=F;
var H=new E();
if(G){dojo.mixin(H,G)
}return H
};
dojo.partial=function(D){var C=[null];
return dojo.hitch.apply(dojo,C.concat(dojo._toArray(arguments)))
};
dojo._toArray=function(H,G,I){var J=I||[];
for(var F=G||0;
F<H.length;
F++){J.push(H[F])
}return J
};
dojo.clone=function(E){if(!E){return E
}if(dojo.isArray(E)){var F=[];
for(var D=0;
D<E.length;
++D){F.push(dojo.clone(E[D]))
}return F
}if(!dojo.isObject(E)){return E
}if(E.nodeType&&E.cloneNode){return E.cloneNode(true)
}if(E instanceof Date){return new Date(E.getTime())
}var F=new E.constructor();
for(var D in E){if(!(D in F)||F[D]!=E[D]){F[D]=dojo.clone(E[D])
}}return F
};
dojo.trim=function(B){return B.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
};