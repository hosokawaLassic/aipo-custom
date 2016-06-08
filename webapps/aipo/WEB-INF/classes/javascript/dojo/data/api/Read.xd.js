dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Read"],["require","dojo.data.api.Request"]],defineResource:function(B){if(!B._hasResource["dojo.data.api.Read"]){B._hasResource["dojo.data.api.Read"]=true;
B.provide("dojo.data.api.Read");
B.require("dojo.data.api.Request");
B.declare("dojo.data.api.Read",null,{getValue:function(A,F,H){var G=null;
throw new Error("Unimplemented API: dojo.data.api.Read.getValue");
return G
},getValues:function(E,F){var A=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getValues");
return A
},getAttributes:function(D){var A=[];
throw new Error("Unimplemented API: dojo.data.api.Read.getAttributes");
return A
},hasAttribute:function(A,D){throw new Error("Unimplemented API: dojo.data.api.Read.hasAttribute");
return false
},containsValue:function(E,F,A){throw new Error("Unimplemented API: dojo.data.api.Read.containsValue");
return false
},isItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItem");
return false
},isItemLoaded:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.isItemLoaded");
return false
},loadItem:function(A){if(!this.isItemLoaded(A.item)){throw new Error("Unimplemented API: dojo.data.api.Read.loadItem")
}},fetch:function(D){var A=null;
throw new Error("Unimplemented API: dojo.data.api.Read.fetch");
return A
},getFeatures:function(){return{"dojo.data.api.Read":true}
},close:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.close")
},getLabel:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabel");
return undefined
},getLabelAttributes:function(A){throw new Error("Unimplemented API: dojo.data.api.Read.getLabelAttributes");
return null
}})
}}});