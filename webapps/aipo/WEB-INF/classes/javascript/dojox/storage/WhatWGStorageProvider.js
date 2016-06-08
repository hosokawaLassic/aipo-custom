if(!dojo._hasResource["dojox.storage.WhatWGStorageProvider"]){dojo._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
dojo.provide("dojox.storage.WhatWGStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var D=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(C){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(H,K,M,N){if(this.isValidKey(H)==false){throw new Error("Invalid key given: "+H)
}N=N||this.DEFAULT_NAMESPACE;
H=this.getFullKey(H,N);
this._statusHandler=M;
if(dojo.isString(K)){K="string:"+K
}else{K=dojo.toJson(K)
}var L=dojo.hitch(this,function(A){window.removeEventListener("storage",L,false);
if(M){M.call(null,this.SUCCESS,H)
}});
window.addEventListener("storage",L,false);
try{var I=globalStorage[this._domain];
I.setItem(H,K)
}catch(J){this._statusHandler.call(null,this.FAILED,H,J.toString())
}},get:function(H,G){if(this.isValidKey(H)==false){throw new Error("Invalid key given: "+H)
}G=G||this.DEFAULT_NAMESPACE;
H=this.getFullKey(H,G);
var F=globalStorage[this._domain];
var E=F.getItem(H);
if(E==null||E==""){return null
}E=E.value;
if(dojo.isString(E)&&(/^string:/.test(E))){E=E.substring("string:".length)
}else{E=dojo.fromJson(E)
}return E
},getNamespaces:function(){var M=[this.DEFAULT_NAMESPACE];
var K={};
var J=globalStorage[this._domain];
var H=/^__([^_]*)_/;
for(var N=0;
N<J.length;
N++){var I=J.key(N);
if(H.test(I)==true){var L=I.match(H)[1];
if(typeof K[L]=="undefined"){K[L]=true;
M.push(L)
}}}return M
},getKeys:function(K){K=K||this.DEFAULT_NAMESPACE;
if(this.isValidKey(K)==false){throw new Error("Invalid namespace given: "+K)
}var H;
if(K==this.DEFAULT_NAMESPACE){H=new RegExp("^([^_]{2}.*)$")
}else{H=new RegExp("^__"+K+"_(.*)$")
}var J=globalStorage[this._domain];
var G=[];
for(var L=0;
L<J.length;
L++){var I=J.key(L);
if(H.test(I)==true){I=I.match(H)[1];
G.push(I)
}}return G
},clear:function(J){J=J||this.DEFAULT_NAMESPACE;
if(this.isValidKey(J)==false){throw new Error("Invalid namespace given: "+J)
}var G;
if(J==this.DEFAULT_NAMESPACE){G=new RegExp("^[^_]{2}")
}else{G=new RegExp("^__"+J+"_")
}var H=globalStorage[this._domain];
var I=[];
for(var F=0;
F<H.length;
F++){if(G.test(H.key(F))==true){I[I.length]=H.key(F)
}}dojo.forEach(I,dojo.hitch(H,"removeItem"))
},remove:function(D,F){D=this.getFullKey(D,F);
var E=globalStorage[this._domain];
E.removeItem(D)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(C,D){D=D||this.DEFAULT_NAMESPACE;
if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}if(D==this.DEFAULT_NAMESPACE){return C
}else{return"__"+D+"_"+C
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
};