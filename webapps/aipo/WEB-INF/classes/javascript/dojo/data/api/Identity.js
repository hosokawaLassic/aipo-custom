if(!dojo._hasResource["dojo.data.api.Identity"]){dojo._hasResource["dojo.data.api.Identity"]=true;
dojo.provide("dojo.data.api.Identity");
dojo.require("dojo.data.api.Read");
dojo.declare("dojo.data.api.Identity",dojo.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},getIdentity:function(D){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentity");
var C=null;
return C
},getIdentityAttributes:function(B){throw new Error("Unimplemented API: dojo.data.api.Identity.getIdentityAttributes");
return null
},fetchItemByIdentity:function(B){if(!this.isItemLoaded(B.item)){throw new Error("Unimplemented API: dojo.data.api.Identity.fetchItemByIdentity")
}}})
};