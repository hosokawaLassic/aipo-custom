dojo._xdResourceLoaded({depends:[["provide","dojox.off.files"]],defineResource:function(B){if(!B._hasResource["dojox.off.files"]){B._hasResource["dojox.off.files"]=true;
B.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(D){if(B.isString(D)){var A=this._trimAnchor(D+"");
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{if(D instanceof B._Url){var A=this._trimAnchor(D.uri);
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{B.forEach(D,function(C){C=this._trimAnchor(C);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
B.forEach(this.listOfURLs,function(A){console.debug(A)
})
},remove:function(D){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==D){this.listOfURLs=this.listOfURLs.splice(A,1);
break
}}},isAvailable:function(D){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==D){return true
}}return false
},refresh:function(A){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(H,G,C){if(djConfig.isDebug||!G||C||!H||H!=G){console.warn("Refreshing offline file list");
this._doRefresh(A,G)
}else{console.warn("No need to refresh offline file list");
A(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(A)
}}catch(D){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var A=B.hitch(this,function(D){if(this._sameLocation(D)){this.cache(D)
}});
A(window.location.href);
B.query("script").forEach(function(F){try{A(F.getAttribute("src"))
}catch(E){}});
B.query("link").forEach(function(F){try{if(!F.getAttribute("rel")||F.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}A(F.getAttribute("href"))
}catch(E){}});
B.query("img").forEach(function(F){try{A(F.getAttribute("src"))
}catch(E){}});
B.query("a").forEach(function(F){try{A(F.getAttribute("href"))
}catch(E){}});
B.forEach(document.styleSheets,function(L){try{if(L.cssRules){B.forEach(L.cssRules,function(D){var C=D.cssText;
if(C){var E=C.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!E){return 
}for(var F=1;
F<E.length;
F++){A(E[F])
}}})
}else{if(L.cssText){var K;
var I=L.cssText.toString();
var N=I.split(/\f|\r|\n/);
for(var M=0;
M<N.length;
M++){K=N[M].match(/url\(\s*([^\) ]*)\s*\)/i);
if(K&&K.length){A(K[1])
}}}}}catch(J){}})
},_sameLocation:function(A){if(!A){return false
}if(A.length&&A.charAt(0)=="#"){return false
}A=new B._Url(A);
if(!A.scheme&&!A.port&&!A.host){return true
}if(!A.scheme&&A.host&&A.port&&window.location.hostname==A.host&&window.location.port==A.port){return true
}if(!A.scheme&&A.host&&!A.port&&window.location.hostname==A.host&&window.location.port==80){return true
}return window.location.protocol==(A.scheme+":")&&window.location.hostname==A.host&&(window.location.port==A.port||!window.location.port&&!A.port)
},_trimAnchor:function(A){return A.replace(/\#.*$/,"")
},_doRefresh:function(A,K){var J;
try{J=google.gears.factory.create("beta.localserver","1.0")
}catch(I){B.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var L="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
J.removeStore(L);
J.openStore(L);
var M=J.createStore(L);
this._store=M;
var N=this;
this._currentFileIndex=0;
this._cancelID=M.capture(this.listOfURLs,function(E,C,F){if(!C&&N.refreshing){N._cancelID=null;
N.refreshing=false;
var D=[];
D.push("Unable to capture: "+E);
A(true,D);
return 
}else{if(C){N._currentFileIndex++
}}if(C&&N._currentFileIndex>=N.listOfURLs.length){N._cancelID=null;
N.refreshing=false;
if(K){dojox.storage.put("oldVersion",K,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
A(false,[])
}})
},_getVersionInfo:function(A){var F=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var H=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var G=null;
A=B.hitch(this,A);
B.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(C){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
A(H,G,F)
},load:function(C){if(C){G=C
}A(H,G,F)
}})
}}
}}});