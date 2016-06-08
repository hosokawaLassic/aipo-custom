if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var F=this.domNode.parentNode;
F;
F=F.parentNode){var E=F.getAttribute&&F.getAttribute("widgetId");
if(E){var D=dijit.byId(E);
return D.isContainer?D:null
}}return null
},_getSibling:function(F){var D=this.domNode;
do{D=D[F+"Sibling"]
}while(D&&D.nodeType!=1);
if(!D){return null
}var E=D.getAttribute("widgetId");
return dijit.byId(E)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(F,E){if(E===undefined){E="last"
}var H=this.containerNode||this.domNode;
if(E&&typeof E=="number"){var G=dojo.query("> [widgetid]",H);
if(G&&G.length>=E){H=G[E-1];
E="after"
}}dojo.place(F.domNode,H,E);
if(this._started&&!F._started){F.startup()
}},removeChild:function(D){var C=D.domNode;
C.parentNode.removeChild(C)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(F,E){var H=F.domNode;
var G=(E>0?"nextSibling":"previousSibling");
do{H=H[G]
}while(H&&(H.nodeType!=1||!dijit.byNode(H)));
return H?dijit.byNode(H):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(F,G){var J=this._keyNavCodes={};
var H=dojo.hitch(this,this.focusPrev);
var I=dojo.hitch(this,this.focusNext);
dojo.forEach(F,function(A){J[A]=H
});
dojo.forEach(G,function(A){J[A]=I
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(D,C){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(D)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var D=this._getNextFocusableChild(this.focusedChild,-1);
if(D.getFocalNodes){var C=D.getFocalNodes();
this.focusChild(D,C[C.length-1])
}else{this.focusChild(D)
}},focusChild:function(D,C){if(D){if(this.focusedChild&&D!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=D;
if(C&&D.focusFocalNode){D.focusFocalNode(C)
}else{D.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){dojo.forEach(B.getFocalNodes(),function(A){A.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(C){this.domNode.setAttribute("tabIndex",-1);
if(C.target===this.domNode){this.focusFirstChild()
}else{var D=dijit.getEnclosingWidget(C.target);
if(D&&D.isFocusable()){this.focusedChild=D
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(C){if(C.ctrlKey||C.altKey){return 
}var D=this._keyNavCodes[C.keyCode];
if(D){D();
dojo.stopEvent(C)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(F,E){if(F){F=this._getSiblingOfChild(F,E)
}var G=this.getChildren();
for(var H=0;
H<G.length;
H++){if(!F){F=G[(E>0)?0:(G.length-1)]
}if(F.isFocusable()){return F
}F=this._getSiblingOfChild(F,E)
}}})
};