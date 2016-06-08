if(!dojo._hasResource["dojo.data.api.Write"]){dojo._hasResource["dojo.data.api.Write"]=true;
dojo.provide("dojo.data.api.Write");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Write",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Write":true}
},newItem:function(F,D){var E;
throw new Error("Unimplemented API: dojo.data.api.Write.newItem");
return E
},deleteItem:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.deleteItem");
return false
},setValue:function(F,D,E){throw new Error("Unimplemented API: dojo.data.api.Write.setValue");
return false
},setValues:function(E,F,D){throw new Error("Unimplemented API: dojo.data.api.Write.setValues");
return false
},unsetAttribute:function(D,C){throw new Error("Unimplemented API: dojo.data.api.Write.clear");
return false
},save:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.save")
},revert:function(){throw new Error("Unimplemented API: dojo.data.api.Write.revert");
return false
},isDirty:function(B){throw new Error("Unimplemented API: dojo.data.api.Write.isDirty");
return false
}})
};