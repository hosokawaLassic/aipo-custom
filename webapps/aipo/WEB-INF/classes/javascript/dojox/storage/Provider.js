if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(E,F,G,H){console.warn("dojox.storage.put not implemented")
},get:function(C,D){console.warn("dojox.storage.get not implemented")
},hasKey:function(C,D){return(this.get(C)!=null)
},getKeys:function(B){console.warn("dojox.storage.getKeys not implemented")
},clear:function(B){console.warn("dojox.storage.clear not implemented")
},remove:function(C,D){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(F,E,G,H){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(D,C){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(D,C){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(D){if(D===null||typeof D==="undefined"||!D instanceof Array){return false
}for(var C=0;
C<D.length;
C++){if(!this.isValidKey(D[C])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(B){if((B==null)||(typeof B=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(B)
},getResourceList:function(){return[]
}})
};