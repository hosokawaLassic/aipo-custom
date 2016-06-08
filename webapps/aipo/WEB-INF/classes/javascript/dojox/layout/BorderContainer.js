if(!dojo._hasResource["dojox.layout.BorderContainer"]){dojo._hasResource["dojox.layout.BorderContainer"]=true;
dojo.provide("dojox.layout.BorderContainer");
dojo.require("dijit.layout._LayoutWidget");
dojo.experimental("dojox.layout.BorderContainer");
dojo.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(D,C){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(Q,Z,O){this.domNode.style.position="relative";
dojo.addClass(Q,"dijitBorderContainer");
dojo.forEach(O,function(A){var B=A.domNode.style;
B.position="absolute";
if(A.position){this[A.position]=A.domNode
}},this);
var W=this.top.style;
var V=this.right.style;
var N=this.left.style;
var S=this.center.style;
var U=this.bottom.style;
var R=dojo.coords(this.right);
var Y=dojo.coords(this.left);
var P=dojo.coords(this.center);
var X=dojo.coords(this.bottom);
var T=dojo.coords(this.top);
V.top=N.top=S.top=T.h+"px";
W.top=W.left=W.right="0px";
U.left=U.bottom=U.right="0px";
N.left=V.right="0px";
S.left=Y.w+"px";
S.right=R.w+"px";
V.bottom=N.bottom=S.bottom=X.h+"px"
},resize:function(B){this.layout()
}});
dojo.extend(dijit._Widget,{position:"none"})
};