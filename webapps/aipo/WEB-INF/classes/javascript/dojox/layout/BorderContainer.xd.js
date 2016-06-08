dojo._xdResourceLoaded({depends:[["provide","dojox.layout.BorderContainer"],["require","dijit.layout._LayoutWidget"]],defineResource:function(B){if(!B._hasResource["dojox.layout.BorderContainer"]){B._hasResource["dojox.layout.BorderContainer"]=true;
B.provide("dojox.layout.BorderContainer");
B.require("dijit.layout._LayoutWidget");
B.experimental("dojox.layout.BorderContainer");
B.declare("dojox.layout.BorderContainer",dijit.layout._LayoutWidget,{top:{},bottom:{},left:{},right:{},center:{},layout:function(){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(A,D){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){this._layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},_layoutChildren:function(P,Y,A){this.domNode.style.position="relative";
B.addClass(P,"dijitBorderContainer");
B.forEach(A,function(C){var D=C.domNode.style;
D.position="absolute";
if(C.position){this[C.position]=C.domNode
}},this);
var V=this.top.style;
var U=this.right.style;
var Z=this.left.style;
var R=this.center.style;
var T=this.bottom.style;
var Q=B.coords(this.right);
var X=B.coords(this.left);
var O=B.coords(this.center);
var W=B.coords(this.bottom);
var S=B.coords(this.top);
U.top=Z.top=R.top=S.h+"px";
V.top=V.left=V.right="0px";
T.left=T.bottom=T.right="0px";
Z.left=U.right="0px";
R.left=X.w+"px";
R.right=Q.w+"px";
U.bottom=Z.bottom=R.bottom=W.h+"px"
},resize:function(A){this.layout()
}});
B.extend(dijit._Widget,{position:"none"})
}}});