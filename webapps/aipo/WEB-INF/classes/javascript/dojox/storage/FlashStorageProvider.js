if(!dojo._hasResource["dojox.storage.FlashStorageProvider"]){dojo._hasResource["dojox.storage.FlashStorageProvider"]=true;
dojo.provide("dojox.storage.FlashStorageProvider");
dojo.require("dojox.flash");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.Provider");
dojo.declare("dojox.storage.FlashStorageProvider",[dojox.storage.Provider],{initialized:false,_available:null,_statusHandler:null,initialize:function(){if(djConfig.disableFlashStorage==true){return 
}var B=function(){dojox.storage._flashLoaded()
};
dojox.flash.addLoadedListener(B);
dojox.flash.setSwf({flash6:dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString(),flash8:dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString(),visible:false})
},setFlushDelay:function(B){if(B===null||typeof B==="undefined"||isNaN(B)){throw new Error("Invalid argunment: "+B)
}dojox.flash.comm.setFlushDelay(String(B))
},getFlushDelay:function(){return Number(dojox.flash.comm.getFlushDelay())
},flush:function(B){if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}dojox.flash.comm.flush(B)
},isAvailable:function(){return(this._available=!djConfig.disableFlashStorage)
},put:function(E,F,G,H){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}if(H==null||typeof H=="undefined"){H=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(H)==false){throw new Error("Invalid namespace given: "+H)
}this._statusHandler=G;
if(dojo.isString(F)){F="string:"+F
}else{F=dojo.toJson(F)
}dojox.flash.comm.put(E,F,H)
},putMultiple:function(N,O,Q,L){if(this.isValidKeyArray(N)===false||!O instanceof Array||N.length!=O.length){throw new Error("Invalid arguments: keys = ["+N+"], values = ["+O+"]")
}if(L==null||typeof L=="undefined"){L=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(L)==false){throw new Error("Invalid namespace given: "+L)
}this._statusHandler=Q;
var P=N.join(",");
var M=[];
for(var J=0;
J<O.length;
J++){if(dojo.isString(O[J])){O[J]="string:"+O[J]
}else{O[J]=dojo.toJson(O[J])
}M[J]=O[J].length
}var K=O.join("");
var R=M.join(",");
dojox.flash.comm.putMultiple(P,K,R,this.namespace)
},get:function(F,E){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}if(E==null||typeof E=="undefined"){E=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}var D=dojox.flash.comm.get(F,E);
if(D==""){return null
}return this._destringify(D)
},getMultiple:function(keys,namespace){if(this.isValidKeyArray(keys)===false){throw new ("Invalid key array given: "+keys)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var metaKey=keys.join(",");
var metaResults=dojox.flash.comm.getMultiple(metaKey,this.namespace);
var results=eval("("+metaResults+")");
for(var i=0;
i<results.length;
i++){results[i]=(results[i]=="")?null:this._destringify(results[i])
}return results
},_destringify:function(B){if(dojo.isString(B)&&(/^string:/.test(B))){B=B.substring("string:".length)
}else{B=dojo.fromJson(B)
}return B
},getKeys:function(D){if(D==null||typeof D=="undefined"){D=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var C=dojox.flash.comm.getKeys(D);
if(C==""){return[]
}C=C.split(",");
return C
},getNamespaces:function(){var B=dojox.flash.comm.getNamespaces();
if(B==""){return[dojox.storage.DEFAULT_NAMESPACE]
}B=B.split(",");
return B
},clear:function(B){if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}dojox.flash.comm.clear(B)
},remove:function(C,D){if(D==null||typeof D=="undefined"){D=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}dojox.flash.comm.remove(C,D)
},removeMultiple:function(F,D){if(this.isValidKeyArray(F)===false){dojo.raise("Invalid key array given: "+F)
}if(D==null||typeof D=="undefined"){D=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var E=F.join(",");
dojox.flash.comm.removeMultiple(E,this.namespace)
},isPermanent:function(){return true
},getMaximumSize:function(){return dojox.storage.SIZE_NO_LIMIT
},hasSettingsUI:function(){return true
},showSettingsUI:function(){dojox.flash.comm.showSettings();
dojox.flash.obj.setVisible(true);
dojox.flash.obj.center()
},hideSettingsUI:function(){dojox.flash.obj.setVisible(false);
if(dojo.isFunction(dojox.storage.onHideSettingsUI)){dojox.storage.onHideSettingsUI.call(null)
}},getResourceList:function(){var E=dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString();
var F=dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString();
var D=dojox.flash.info.getResourceList(E,F);
D.push(dojo.moduleUrl("dojox","storage/storage_dialog.swf").toString());
return D
},_flashLoaded:function(){this._allNamespaces=this.getNamespaces();
this._initialized=true;
dojox.storage.manager.loaded()
},_onStatus:function(G,H){var F=dojox.storage;
var E=dojox.flash.obj;
if(G==F.PENDING){E.center();
E.setVisible(true)
}else{E.setVisible(false)
}if(F._statusHandler){F._statusHandler.call(null,G,H)
}}});
dojox.storage.manager.register("dojox.storage.FlashStorageProvider",new dojox.storage.FlashStorageProvider());
dojox.storage.manager.initialize()
};