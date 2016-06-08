if(!dojo._hasResource["dojox.dtl.widget"]){dojo._hasResource["dojox.dtl.widget"]=true;
dojo.provide("dojox.dtl.widget");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dojox.dtl.html");
dojo.require("dojox.dtl.render.html");
dojo.declare("dojox.dtl._Widget",[dijit._Widget,dijit._Contained],{buffer:0,buildRendering:function(){this.domNode=this.srcNodeRef;
if(this.domNode){var B=this.getParent();
if(B){this.setAttachPoint(B)
}}},setAttachPoint:function(B){this._attach=B
},render:function(C,D){if(!this._attach){throw new Error("You must use an attach point with dojox.dtl.TemplatedWidget")
}D.setThis(this);
this._attach.render(C,D)
}});
dojo.declare("dojox.dtl.AttachPoint",[dijit._Widget,dijit._Container],{constructor:function(C,D){this._render=new dojox.dtl.render.html.Render(D)
},render:function(C,D){this._render.render(C,D)
}})
};