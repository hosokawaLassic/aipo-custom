if(!dojo._hasResource["dojo.foo"]){dojo._hasResource["dojo.foo"]=true;
(function(){var E=dojo;
dojo.mixin(dojo,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(B){var A=this._modulePrefixes;
return !!(A[B]&&A[B].value)
},_getModulePrefix:function(B){var A=this._modulePrefixes;
if(this._moduleHasPrefix(B)){return A[B].value
}return B
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(A,I,J){var C=(((A.charAt(0)=="/"||A.match(/^\w+:/)))?"":this.baseUrl)+A;
if(djConfig.cacheBust&&E.isBrowser){C+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return !I?this._loadUri(C,J):this._loadUriAndCheck(C,I,J)
}catch(B){console.debug(B);
return false
}};
dojo._loadUri=function(B,H){if(this._loadedUrls[B]){return true
}var C=this._getText(B,true);
if(!C){return false
}this._loadedUrls[B]=true;
this._loadedUrls.push(B);
if(H){C="("+C+")"
}var A=E["eval"](C+"\r\n//@ sourceURL="+B);
if(H){H(A)
}return true
};
dojo._loadUriAndCheck=function(B,I,J){var C=false;
try{C=this._loadUri(B,J)
}catch(A){console.debug("failed loading "+B+" with error: "+A)
}return Boolean(C&&this._loadedModules[I])
};
dojo.loaded=function(){this._loadNotifying=true;
this._postLoad=true;
var A=this._loaders;
this._loaders=[];
for(var B=0;
B<A.length;
B++){A[B]()
}this._loadNotifying=false;
if(E._postLoad&&E._inFlightCount==0&&this._loaders.length>0){E._callLoaded()
}};
dojo.unloaded=function(){var A=this._unloaders;
while(A.length){(A.pop())()
}};
dojo.addOnLoad=function(A,B){if(arguments.length==1){E._loaders.push(A)
}else{if(arguments.length>1){E._loaders.push(function(){A[B]()
})
}}if(E._postLoad&&E._inFlightCount==0&&!E._loadNotifying){E._callLoaded()
}};
dojo.addOnUnload=function(A,B){if(arguments.length==1){E._unloaders.push(A)
}else{if(arguments.length>1){E._unloaders.push(function(){A[B]()
})
}}};
dojo._modulesLoaded=function(){if(E._postLoad){return 
}if(E._inFlightCount>0){console.debug("files still in flight!");
return 
}E._callLoaded()
};
dojo._callLoaded=function(){if(typeof setTimeout=="object"||(djConfig.useXDomain&&E.isOpera)){setTimeout("dojo.loaded();",0)
}else{E.loaded()
}};
dojo._getModuleSymbols=function(I){var A=I.split(".");
for(var J=A.length;
J>0;
J--){var B=A.slice(0,J).join(".");
if((J==1)&&!this._moduleHasPrefix(B)){A[0]="../"+A[0]
}else{var C=this._getModulePrefix(B);
if(C!=B){A.splice(0,J,C);
break
}}}return A
};
dojo._global_omit_module_check=false;
dojo._loadModule=dojo.require=function(K,B){B=this._global_omit_module_check||B;
var C=this._loadedModules[K];
if(C){return C
}var A=this._getModuleSymbols(K).join("/")+".js";
var L=(!B)?K:null;
var J=this._loadPath(A,L);
if((!J)&&(!B)){throw new Error("Could not load '"+K+"'; last tried '"+A+"'")
}if((!B)&&(!this["_isXDomain"])){C=this._loadedModules[K];
if(!C){throw new Error("symbol '"+K+"' is not defined after loading '"+A+"'")
}}return C
};
dojo.provide=function(A){A=A+"";
return(E._loadedModules[A]=E.getObject(A,true))
};
dojo.platformRequire=function(A){var C=A.common||[];
var I=C.concat(A[E._name]||A["default"]||[]);
for(var J=0;
J<I.length;
J++){var B=I[J];
if(B.constructor==Array){E._loadModule.apply(E,B)
}else{E._loadModule(B)
}}};
dojo.requireIf=function(A,B){if(A===true){var H=[];
for(var C=1;
C<arguments.length;
C++){H.push(arguments[C])
}E.require.apply(E,H)
}};
dojo.requireAfterIf=E.requireIf;
dojo.registerModulePath=function(B,A){E._modulePrefixes[B]={name:B,value:A}
};
dojo.requireLocalization=function(C,B,H,A){E.require("dojo.i18n");
E.i18n._requireLocalization.apply(E.hostenv,arguments)
};
var D=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var F=new RegExp("^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$");
dojo._Url=function(){var S=null;
var N=arguments;
var R=N[0];
for(var P=1;
P<N.length;
P++){if(!N[P]){continue
}var O=new E._Url(N[P]+"");
var C=new E._Url(R+"");
if((O.path=="")&&(!O.scheme)&&(!O.authority)&&(!O.query)){if(O.fragment!=S){C.fragment=O.fragment
}O=C
}else{if(!O.scheme){O.scheme=C.scheme;
if(!O.authority){O.authority=C.authority;
if(O.path.charAt(0)!="/"){var B=C.path.substring(0,C.path.lastIndexOf("/")+1)+O.path;
var T=B.split("/");
for(var Q=0;
Q<T.length;
Q++){if(T[Q]=="."){if(Q==T.length-1){T[Q]=""
}else{T.splice(Q,1);
Q--
}}else{if(Q>0&&!(Q==1&&T[0]=="")&&T[Q]==".."&&T[Q-1]!=".."){if(Q==(T.length-1)){T.splice(Q,1);
T[Q-1]=""
}else{T.splice(Q-1,2);
Q-=2
}}}}O.path=T.join("/")
}}}}R="";
if(O.scheme){R+=O.scheme+":"
}if(O.authority){R+="//"+O.authority
}R+=O.path;
if(O.query){R+="?"+O.query
}if(O.fragment){R+="#"+O.fragment
}}this.uri=R.toString();
var A=this.uri.match(D);
this.scheme=A[2]||(A[1]?"":S);
this.authority=A[4]||(A[3]?"":S);
this.path=A[5];
this.query=A[7]||(A[6]?"":S);
this.fragment=A[9]||(A[8]?"":S);
if(this.authority!=S){A=this.authority.match(F);
this.user=A[3]||S;
this.password=A[4]||S;
this.host=A[5];
this.port=A[7]||S
}};
dojo._Url.prototype.toString=function(){return this.uri
};
dojo.moduleUrl=function(B,C){var A=dojo._getModuleSymbols(B).join("/");
if(!A){return null
}if(A.lastIndexOf("/")!=A.length-1){A+="/"
}var H=A.indexOf(":");
if(A.charAt(0)!="/"&&(H==-1||H>A.indexOf("/"))){A=E.baseUrl+A
}return new E._Url(A,C)
}
})()
};