dojo._xdResourceLoaded({depends:[["provide","dijit.layout.LayoutContainer"],["require","dijit.layout._LayoutWidget"]],defineResource:function(B){if(!B._hasResource["dijit.layout.LayoutContainer"]){B._hasResource["dijit.layout.LayoutContainer"]=true;
B.provide("dijit.layout.LayoutContainer");
B.require("dijit.layout._LayoutWidget");
B.declare("dijit.layout.LayoutContainer",dijit.layout._LayoutWidget,{layout:function(){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(A,D){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}}});
B.extend(dijit._Widget,{layoutAlign:"none"})
}}});