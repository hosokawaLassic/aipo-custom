dojo._xdResourceLoaded({depends:[["provide","dojox.storage.WhatWGStorageProvider"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"]],defineResource:function(B){if(!B._hasResource["dojox.storage.WhatWGStorageProvider"]){B._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
B.provide("dojox.storage.WhatWGStorageProvider");
B.require("dojox.storage.Provider");
B.require("dojox.storage.manager");
B.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var A=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(D){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(N,J,L,M){if(this.isValidKey(N)==false){throw new Error("Invalid key given: "+N)
}M=M||this.DEFAULT_NAMESPACE;
N=this.getFullKey(N,M);
this._statusHandler=L;
if(B.isString(J)){J="string:"+J
}else{J=B.toJson(J)
}var K=B.hitch(this,function(C){window.removeEventListener("storage",K,false);
if(L){L.call(null,this.SUCCESS,N)
}});
window.addEventListener("storage",K,false);
try{var A=globalStorage[this._domain];
A.setItem(N,J)
}catch(I){this._statusHandler.call(null,this.FAILED,N,I.toString())
}},get:function(G,F){if(this.isValidKey(G)==false){throw new Error("Invalid key given: "+G)
}F=F||this.DEFAULT_NAMESPACE;
G=this.getFullKey(G,F);
var A=globalStorage[this._domain];
var H=A.getItem(G);
if(H==null||H==""){return null
}H=H.value;
if(B.isString(H)&&(/^string:/.test(H))){H=H.substring("string:".length)
}else{H=B.fromJson(H)
}return H
},getNamespaces:function(){var L=[this.DEFAULT_NAMESPACE];
var J={};
var I=globalStorage[this._domain];
var N=/^__([^_]*)_/;
for(var M=0;
M<I.length;
M++){var A=I.key(M);
if(N.test(A)==true){var K=A.match(N)[1];
if(typeof J[K]=="undefined"){J[K]=true;
L.push(K)
}}}return L
},getKeys:function(J){J=J||this.DEFAULT_NAMESPACE;
if(this.isValidKey(J)==false){throw new Error("Invalid namespace given: "+J)
}var A;
if(J==this.DEFAULT_NAMESPACE){A=new RegExp("^([^_]{2}.*)$")
}else{A=new RegExp("^__"+J+"_(.*)$")
}var I=globalStorage[this._domain];
var L=[];
for(var K=0;
K<I.length;
K++){var H=I.key(K);
if(A.test(H)==true){H=H.match(A)[1];
L.push(H)
}}return L
},clear:function(I){I=I||this.DEFAULT_NAMESPACE;
if(this.isValidKey(I)==false){throw new Error("Invalid namespace given: "+I)
}var A;
if(I==this.DEFAULT_NAMESPACE){A=new RegExp("^[^_]{2}")
}else{A=new RegExp("^__"+I+"_")
}var G=globalStorage[this._domain];
var H=[];
for(var J=0;
J<G.length;
J++){if(A.test(G.key(J))==true){H[H.length]=G.key(J)
}}B.forEach(H,B.hitch(G,"removeItem"))
},remove:function(F,E){F=this.getFullKey(F,E);
var A=globalStorage[this._domain];
A.removeItem(F)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(D,A){A=A||this.DEFAULT_NAMESPACE;
if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}if(A==this.DEFAULT_NAMESPACE){return D
}else{return"__"+A+"_"+D
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
}}});