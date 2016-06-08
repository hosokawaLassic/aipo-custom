if(!dojo._hasResource["dojo._base._loader.loader_xd"]){dojo._hasResource["dojo._base._loader.loader_xd"]=true;
dojo.provide("dojo._base._loader.loader_xd");
dojo._xdReset=function(){this._isXDomain=djConfig.useXDomain||false;
this._xdTimer=0;
this._xdInFlight={};
this._xdOrderedReqs=[];
this._xdDepMap={};
this._xdContents=[];
this._xdDefList=[]
};
dojo._xdReset();
dojo._xdCreateResource=function(contents,resourceName,resourcePath){var depContents=contents.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");
var deps=[];
var depRegExp=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\(([\w\W]*?)\)/mg;
var match;
while((match=depRegExp.exec(depContents))!=null){if(match[1]=="requireLocalization"){eval(match[0])
}else{deps.push('"'+match[1]+'", '+match[2])
}}var output=[];
output.push("dojo._xdResourceLoaded({\n");
if(deps.length>0){output.push("depends: [");
for(var i=0;
i<deps.length;
i++){if(i>0){output.push(",\n")
}output.push("["+deps[i]+"]")
}output.push("],")
}output.push("\ndefineResource: function(dojo){");
if(!djConfig.debugAtAllCosts||resourceName=="dojo._base._loader.loader_debug"){output.push(contents)
}output.push("\n}, resourceName: '"+resourceName+"', resourcePath: '"+resourcePath+"'});");
return output.join("")
};
dojo._xdIsXDomainPath=function(F){var H=F.indexOf(":");
var G=F.indexOf("/");
if(H>0&&H<G){return true
}else{var E=this.baseUrl;
H=E.indexOf(":");
G=E.indexOf("/");
if(H>0&&H<G&&(!location.host||E.indexOf("http://"+location.host)!=0)){return true
}}return false
};
dojo._loadPath=function(J,O,I){var M=this._xdIsXDomainPath(J);
this._isXDomain|=M;
var N=this.baseUrl+J;
if(M){var P=J.indexOf(":");
var L=J.indexOf("/");
if(P>0&&P<L){N=J
}}if(djConfig.cacheBust&&dojo.isBrowser){N+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return((!O||this._isXDomain)?this._loadUri(N,I,M,O):this._loadUriAndCheck(N,O,I))
}catch(K){console.debug(K);
return false
}};
dojo._loadUri=function(uri,cb,currentIsXDomain,module){if(this._loadedUrls[uri]){return 1
}if(this._isXDomain&&module&&module!="dojo.i18n"){this._xdOrderedReqs.push(module);
if(currentIsXDomain||uri.indexOf("/nls/")==-1){this._xdInFlight[module]=true;
this._inFlightCount++
}if(!this._xdTimer){this._xdTimer=setInterval("dojo._xdWatchInFlight();",100)
}this._xdStartTime=(new Date()).getTime()
}if(currentIsXDomain){var lastIndex=uri.lastIndexOf(".");
if(lastIndex<=0){lastIndex=uri.length-1
}var xdUri=uri.substring(0,lastIndex)+".xd";
if(lastIndex!=uri.length-1){xdUri+=uri.substring(lastIndex,uri.length)
}var element=document.createElement("script");
element.type="text/javascript";
element.src=xdUri;
if(!this.headElement){this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){this._headElement=document.getElementsByTagName("html")[0]
}}this._headElement.appendChild(element)
}else{var contents=this._getText(uri,null,true);
if(contents==null){return 0
}if(this._isXDomain&&uri.indexOf("/nls/")==-1&&module!="dojo.i18n"){var res=this._xdCreateResource(contents,module,uri);
dojo.eval(res)
}else{if(cb){contents="("+contents+")"
}var value=dojo.eval(contents);
if(cb){cb(value)
}}}this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
return true
};
dojo._xdResourceLoaded=function(V){var R=V.depends;
var S=null;
var W=null;
var Q=[];
if(R&&R.length>0){var T=null;
var X=0;
var P=false;
for(var O=0;
O<R.length;
O++){T=R[O];
if(T[0]=="provide"){Q.push(T[1])
}else{if(!S){S=[]
}if(!W){W=[]
}var U=this._xdUnpackDependency(T);
if(U.requires){S=S.concat(U.requires)
}if(U.requiresAfter){W=W.concat(U.requiresAfter)
}}var Y=T[0];
var Z=Y.split(".");
if(Z.length==2){dojo[Z[0]][Z[1]].apply(dojo[Z[0]],T.slice(1))
}else{dojo[Y].apply(dojo,T.slice(1))
}}if(Q.length==1&&Q[0]=="dojo._base._loader.loader_debug"){V.defineResource(dojo)
}else{var N=this._xdContents.push({content:V.defineResource,resourceName:V.resourceName,resourcePath:V.resourcePath,isDefined:false})-1;
for(var O=0;
O<Q.length;
O++){this._xdDepMap[Q[O]]={requires:S,requiresAfter:W,contentIndex:N}
}}for(var O=0;
O<Q.length;
O++){this._xdInFlight[Q[O]]=false
}}};
dojo._xdLoadFlattenedBundle=function(N,M,P,S){P=P||"root";
var T=dojo.i18n.normalizeLocale(P).replace("-","_");
var Q=[N,"nls",M].join(".");
var O=dojo.provide(Q);
O[T]=S;
var R=[N,T,M].join(".");
var L=dojo._xdBundleMap[R];
if(L){for(var K in L){O[K]=S
}}};
dojo._xdInitExtraLocales=function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(H,I,J,G){dojo._xdReqLoc(H,I,J,G);
if(J){return 
}for(var A=0;
A<B.length;
A++){dojo._xdReqLoc(H,I,B[A],G)
}}
}};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(P,O,Q,U){if(dojo._xdInitExtraLocales){dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return 
}var M=U.split(",");
var W=dojo.i18n.normalizeLocale(Q);
var X="";
for(var V=0;
V<M.length;
V++){if(W.indexOf(M[V])==0){if(M[V].length>X.length){X=M[V]
}}}var S=X.replace("-","_");
var R=dojo.getObject([P,"nls",O].join("."));
if(R&&R[S]){bundle[W.replace("-","_")]=R[S]
}else{var T=[P,(S||"root"),O].join(".");
var N=dojo._xdBundleMap[T];
if(!N){N=dojo._xdBundleMap[T]={}
}N[W.replace("-","_")]=true;
dojo.require(P+".nls"+(X?"."+X:"")+"."+O)
}};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(J,I,F,G){var H=this.moduleUrl(J).toString();
if(this._xdIsXDomainPath(H)){return dojo.xdRequireLocalization.apply(dojo,arguments)
}else{return dojo._xdRealRequireLocalization.apply(dojo,arguments)
}};
dojo._xdUnpackDependency=function(I){var J=null;
var K=null;
switch(I[0]){case"requireIf":case"requireAfterIf":if(I[1]===true){J=[{name:I[2],content:null}]
}break;
case"platformRequire":var H=I[1];
var L=H.common||[];
var J=(H[dojo.hostenv.name_])?L.concat(H[dojo.hostenv.name_]||[]):L.concat(H["default"]||[]);
if(J){for(var G=0;
G<J.length;
G++){if(J[G] instanceof Array){J[G]={name:J[G][0],content:null}
}else{J[G]={name:J[G],content:null}
}}}break;
case"require":J=[{name:I[1],content:null}];
break;
case"i18n._preloadLocalizations":dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,I.slice(1));
break
}if(I[0]=="requireAfterIf"||I[0]=="requireIf"){K=J;
J=null
}return{requires:J,requiresAfter:K}
};
dojo._xdWalkReqs=function(){var E=null;
var F;
for(var D=0;
D<this._xdOrderedReqs.length;
D++){F=this._xdOrderedReqs[D];
if(this._xdDepMap[F]){E=[F];
E[F]=true;
this._xdEvalReqs(E)
}}};
dojo._xdEvalReqs=function(J){while(J.length>0){var K=J[J.length-1];
var N=this._xdDepMap[K];
if(N){var P=N.requires;
if(P&&P.length>0){var I;
for(var O=0;
O<P.length;
O++){I=P[O].name;
if(I&&!J[I]){J.push(I);
J[I]=true;
this._xdEvalReqs(J)
}}}var L=this._xdContents[N.contentIndex];
if(!L.isDefined){var M=L.content;
M.resourceName=L.resourceName;
M.resourcePath=L.resourcePath;
this._xdDefList.push(M);
L.isDefined=true
}this._xdDepMap[K]=null;
var P=N.requiresAfter;
if(P&&P.length>0){var I;
for(var O=0;
O<P.length;
O++){I=P[O].name;
if(I&&!J[I]){J.push(I);
J[I]=true;
this._xdEvalReqs(J)
}}}}J.pop()
}};
dojo._xdClearInterval=function(){clearInterval(this._xdTimer);
this._xdTimer=0
};
dojo._xdWatchInFlight=function(){var J="";
var K=(djConfig.xdWaitSeconds||15)*1000;
var O=(this._xdStartTime+K)<(new Date()).getTime();
for(var L in this._xdInFlight){if(this._xdInFlight[L]===true){if(O){J+=L+" "
}else{return 
}}}this._xdClearInterval();
if(O){throw"Could not load cross-domain resources: "+J
}this._xdWalkReqs();
var I=this._xdDefList.length;
for(var P=0;
P<I;
P++){var N=dojo._xdDefList[P];
if(djConfig.debugAtAllCosts&&N.resourceName){if(!this["_xdDebugQueue"]){this._xdDebugQueue=[]
}this._xdDebugQueue.push({resourceName:N.resourceName,resourcePath:N.resourcePath})
}else{N(dojo)
}}for(var P=0;
P<this._xdContents.length;
P++){var M=this._xdContents[P];
if(M.content&&!M.isDefined){M.content(dojo)
}}this._xdReset();
if(this["_xdDebugQueue"]&&this._xdDebugQueue.length>0){this._xdDebugFileLoaded()
}else{this._xdNotifyLoaded()
}};
dojo._xdNotifyLoaded=function(){this._inFlightCount=0;
if(this._initFired&&!this._loadNotifying){this._callLoaded()
}}
};