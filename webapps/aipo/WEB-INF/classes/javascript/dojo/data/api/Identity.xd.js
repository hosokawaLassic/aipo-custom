dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Identity"],["require","dojo.data.api.Read"]],defineResource:function(B){if(!B._hasResource["dojo.data.api.Identity"]){B._hasResource["dojo.data.api.Identity"]=true;
B.provide("dojo.data.api.Identity");
B.require("dojo.data.api.Read");
B.declare("dojo.data.api.Identity",B.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},getIdentity:function(A){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentity");
var D=null;
return D
},getIdentityAttributes:function(A){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentityAttributes");
return null
},fetchItemByIdentity:function(A){if(!this.isItemLoaded(A.item)){throw new Error("Unimplemented API: dojo.data.api.Identity.fetchItemByIdentity")
}}})
}}});