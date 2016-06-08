if(!dojo._hasResource["dojo.data.api.Read"]){dojo._hasResource["dojo.data.api.Read"]=true;
dojo.provide("dojo.data.api.Read");
dojo.require("dojo.data.api.Request");
dojo.declare("dojo.data.api.Read",null,{getValue:function(F,G,E){var H=null;
throw new Error("Unimplemented API: dojo.data.api.Read.getValue");
return H
},getValues:function(F,D){var E=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getValues");
return E
},getAttributes:function(C){var D=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");
return D
},hasAttribute:function(D,C){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");
return false
},containsValue:function(F,D,E){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");
return false
},isItem:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");
return false
},isItemLoaded:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");
return false
},loadItem:function(B){if(!this.isItemLoaded(B.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem")
}},fetch:function(C){var D=null;
throw new Error("Unimplemented API: dojo.data.api.Read.fetch");
return D
},getFeatures:function(){return{"dojo.data.api.Read":true}
},close:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.close")
},getLabel:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");
return undefined
},getLabelAttributes:function(B){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");
return null
}})
};