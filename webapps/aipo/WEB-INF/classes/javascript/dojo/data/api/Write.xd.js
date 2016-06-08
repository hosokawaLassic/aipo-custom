dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Write"],["require","dojo.data.api.Read"]],defineResource:function(B){if(!B._hasResource["dojo.data.api.Write"]){B._hasResource["dojo.data.api.Write"]=true;
B.provide("dojo.data.api.Write");
B.require("dojo.data.api.Read");
B.declare("dojo.data.api.Write",B.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Write":true}
},newItem:function(E,F){var A;
throw new Error("Unimplemented API: dojo.data.api.Write.newItem");
return A
},deleteItem:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.deleteItem");
return false
},setValue:function(E,F,A){throw new Error("Unimplemented API: dojo.data.api.Write.setValue");
return false
},setValues:function(A,E,F){throw new Error("Unimplemented API: dojo.data.api.Write.setValues");
return false
},unsetAttribute:function(A,D){throw new Error("Unimplemented API: dojo.data.api.Write.clear");
return false
},save:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.save")
},revert:function(){throw new Error("Unimplemented API: dojo.data.api.Write.revert");
return false
},isDirty:function(A){throw new Error("Unimplemented API: dojo.data.api.Write.isDirty");
return false
}})
}}});