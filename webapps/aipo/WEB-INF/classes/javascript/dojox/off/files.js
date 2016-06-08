if(!dojo._hasResource["dojox.off.files"]){dojo._hasResource["dojox.off.files"]=true;
dojo.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(C){if(dojo.isString(C)){var D=this._trimAnchor(C+"");
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}}else{if(C instanceof dojo._Url){var D=this._trimAnchor(C.uri);
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}}else{dojo.forEach(C,function(A){A=this._trimAnchor(A);
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(B){console.debug(B)
})
},remove:function(C){for(var D=0;
D<this.listOfURLs.length;
D++){if(this.listOfURLs[D]==C){this.listOfURLs=this.listOfURLs.splice(D,1);
break
}}},isAvailable:function(C){for(var D=0;
D<this.listOfURLs.length;
D++){if(this.listOfURLs[D]==C){return true
}}return false
},refresh:function(D){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(F,B,A){if(djConfig.isDebug||!B||A||!F||F!=B){console.warn("Refreshing offline file list");
this._doRefresh(D,B)
}else{console.warn("No need to refresh offline file list");
D(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(D)
}}catch(C){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var B=dojo.hitch(this,function(A){if(this._sameLocation(A)){this.cache(A)
}});
B(window.location.href);
dojo.query("script").forEach(function(D){try{B(D.getAttribute("src"))
}catch(A){}});
dojo.query("link").forEach(function(D){try{if(!D.getAttribute("rel")||D.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}B(D.getAttribute("href"))
}catch(A){}});
dojo.query("img").forEach(function(D){try{B(D.getAttribute("src"))
}catch(A){}});
dojo.query("a").forEach(function(D){try{B(D.getAttribute("href"))
}catch(A){}});
dojo.forEach(document.styleSheets,function(J){try{if(J.cssRules){dojo.forEach(J.cssRules,function(D){var C=D.cssText;
if(C){var E=C.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!E){return 
}for(var F=1;
F<E.length;
F++){B(E[F])
}}})
}else{if(J.cssText){var I;
var A=J.cssText.toString();
var L=A.split(/\f|\r|\n/);
for(var K=0;
K<L.length;
K++){I=L[K].match(/url\(\s*([^\) ]*)\s*\)/i);
if(I&&I.length){B(I[1])
}}}}}catch(H){}})
},_sameLocation:function(B){if(!B){return false
}if(B.length&&B.charAt(0)=="#"){return false
}B=new dojo._Url(B);
if(!B.scheme&&!B.port&&!B.host){return true
}if(!B.scheme&&B.host&&B.port&&window.location.hostname==B.host&&window.location.port==B.port){return true
}if(!B.scheme&&B.host&&!B.port&&window.location.hostname==B.host&&window.location.port==80){return true
}return window.location.protocol==(B.scheme+":")&&window.location.hostname==B.host&&(window.location.port==B.port||!window.location.port&&!B.port)
},_trimAnchor:function(B){return B.replace(/\#.*$/,"")
},_doRefresh:function(I,L){var K;
try{K=google.gears.factory.create("beta.localserver","1.0")
}catch(J){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var M="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
K.removeStore(M);
K.openStore(M);
var N=K.createStore(M);
this._store=N;
var H=this;
this._currentFileIndex=0;
this._cancelID=N.capture(this.listOfURLs,function(C,A,D){if(!A&&H.refreshing){H._cancelID=null;
H.refreshing=false;
var B=[];
B.push("Unable to capture: "+C);
I(true,B);
return 
}else{if(A){H._currentFileIndex++
}}if(A&&H._currentFileIndex>=H.listOfURLs.length){H._cancelID=null;
H.refreshing=false;
if(L){dojox.storage.put("oldVersion",L,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
I(false,[])
}})
},_getVersionInfo:function(F){var G=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var E=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var H=null;
F=dojo.hitch(this,F);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(A){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
F(E,H,G)
},load:function(A){if(A){H=A
}F(E,H,G)
}})
}}
};