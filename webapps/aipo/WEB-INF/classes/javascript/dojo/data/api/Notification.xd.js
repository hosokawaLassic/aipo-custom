dojo._xdResourceLoaded({depends:[["provide","dojo.data.api.Notification"],["require","dojo.data.api.Read"]],defineResource:function(B){if(!B._hasResource["dojo.data.api.Notification"]){B._hasResource["dojo.data.api.Notification"]=true;
B.provide("dojo.data.api.Notification");
B.require("dojo.data.api.Read");
B.declare("dojo.data.api.Notification",B.data.api.Read,{getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Notification":true}
},onSet:function(F,G,H,A){throw new Error("Unimplemented API: dojo.data.api.Notification.onSet")
},onNew:function(A,D){throw new Error("Unimplemented API: dojo.data.api.Notification.onNew")
},onDelete:function(A){throw new Error("Unimplemented API: dojo.data.api.Notification.onDelete")
}})
}}});