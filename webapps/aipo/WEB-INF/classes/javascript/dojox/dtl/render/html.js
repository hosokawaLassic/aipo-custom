if(!dojo._hasResource["dojox.dtl.render.html"]){dojo._hasResource["dojox.dtl.render.html"]=true;
dojo.provide("dojox.dtl.render.html");
dojox.dtl.render.html.sensitivity={NODE:1,ATTRIBUTE:2,TEXT:3};
dojox.dtl.render.html.Render=function(C,D){this._tpl=D;
this._node=C;
this._swap=dojo.hitch(this,function(){if(this._node===this._tpl.getRootNode()){var A=this._node;
this._node=this._node.cloneNode(true);
A.parentNode.replaceChild(this._node,A)
}})
};
dojo.extend(dojox.dtl.render.html.Render,{sensitivity:dojox.dtl.render.html.sensitivity,setAttachPoint:function(B){this._node=B
},render:function(K,I,L){if(!this._node){throw new Error("You cannot use the Render object without specifying where you want to render it")
}L=L||K.getBuffer();
if(I.getThis()&&I.getThis().buffer==this.sensitivity.NODE){var G=dojo.connect(L,"onAddNode",this,"_swap");
var J=dojo.connect(L,"onRemoveNode",this,"_swap")
}if(this._tpl&&this._tpl!==K){this._tpl.unrender(I,L)
}this._tpl=K;
var H=K.render(I,L).getParent();
dojo.disconnect(G);
dojo.disconnect(J);
if(this._node!==H){this._node.parentNode.replaceChild(H,this._node);
dojo._destroyElement(this._node);
this._node=H
}}})
};