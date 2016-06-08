dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.widget"],["require","dijit._Widget"],["require","dijit._Container"],["require","dojox.dtl.html"],["require","dojox.dtl.render.html"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.widget"]){B._hasResource["dojox.dtl.widget"]=true;
B.provide("dojox.dtl.widget");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dojox.dtl.html");
B.require("dojox.dtl.render.html");
B.declare("dojox.dtl._Widget",[dijit._Widget,dijit._Contained],{buffer:0,buildRendering:function(){this.domNode=this.srcNodeRef;
if(this.domNode){var A=this.getParent();
if(A){this.setAttachPoint(A)
}}},setAttachPoint:function(A){this._attach=A
},render:function(D,A){if(!this._attach){throw new Error("You must use an attach point with dojox.dtl.TemplatedWidget")
}A.setThis(this);
this._attach.render(D,A)
}});
B.declare("dojox.dtl.AttachPoint",[dijit._Widget,dijit._Container],{constructor:function(D,A){this._render=new dojox.dtl.render.html.Render(A)
},render:function(D,A){this._render.render(D,A)
}})
}}});