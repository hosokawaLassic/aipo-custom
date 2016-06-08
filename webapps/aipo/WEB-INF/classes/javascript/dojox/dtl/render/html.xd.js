dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.render.html"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.render.html"]){B._hasResource["dojox.dtl.render.html"]=true;
B.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(D,A){this._tpl=A;
this._node=D;
this._swap=B.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var C=this._node;
this._node=this._node.cloneNode(true);
C.parentNode.replaceChild(this._node,C)
}})
};
B.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(A){this._node=A
},render:function(J,H,K){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}K=K||J.getBuffer();
if(H.getThis()&&H.getThis().buffer==this.sensitivity.NODE){var L=B.connect(K,"onAddNode",this,"_swap");
var I=B.connect(K,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==J){this._tpl.unrender(H,K)
}this._tpl=J;
var A=J.render(H,K).getParent();
B.disconnect(L);
B.disconnect(I);
if(this._node!==A){this._node.parentNode.replaceChild(A,this._node);
B._destroyElement(this._node);
this._node=A
}}})
}}});