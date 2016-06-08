if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){try{return eval("("+json+")")
}catch(e){console.debug(e);
return json
}};
dojo._escapeString=function(B){return('"'+B.replace(/(["\\])/g,"\\$1")+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(Y,b,U){U=U||"";
var V=(b?U+dojo.toJsonIndentStr:"");
var X=(b?"\n":"");
var T=typeof (Y);
if(T=="undefined"){return"undefined"
}else{if((T=="number")||(T=="boolean")){return Y+""
}else{if(Y===null){return"null"
}}}if(dojo.isString(Y)){return dojo._escapeString(Y)
}if(Y.nodeType&&Y.cloneNode){return""
}var R=arguments.callee;
var a;
if(typeof Y.__json__=="function"){a=Y.__json__();
if(Y!==a){return R(a,b,V)
}}if(typeof Y.json=="function"){a=Y.json();
if(Y!==a){return R(a,b,V)
}}if(dojo.isArray(Y)){var W=[];
for(var Z=0;
Z<Y.length;
Z++){var O=R(Y[Z],b,V);
if(typeof (O)!="string"){O="undefined"
}W.push(X+V+O)
}return"["+W.join(", ")+X+U+"]"
}if(T=="function"){return null
}var P=[];
for(var S in Y){var Q;
if(typeof (S)=="number"){Q='"'+S+'"'
}else{if(typeof (S)=="string"){Q=dojo._escapeString(S)
}else{continue
}}O=R(Y[S],b,V);
if(typeof (O)!="string"){continue
}P.push(X+V+Q+": "+O)
}return"{"+P.join(", ")+X+U+"}"
}
};