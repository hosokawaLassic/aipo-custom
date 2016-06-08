dojo._xdResourceLoaded({depends:[["provide","dijit._Container"]],defineResource:function(B){if(!B._hasResource["dijit._Container"]){B._hasResource["dijit._Container"]=true;
B.provide("dijit._Container");
B.declare("dijit._Contained",null,{getParent:function(){for(var E=this.domNode.parentNode;
E;
E=E.parentNode){var A=E.getAttribute&&E.getAttribute("widgetId");
if(A){var F=dijit.byId(A);
return F.isContainer?F:null
}}return null
},_getSibling:function(E){var F=this.domNode;
do{F=F[E+"Sibling"]
}while(F&&F.nodeType!=1);
if(!F){return null
}var A=F.getAttribute("widgetId");
return dijit.byId(A)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
B.declare("dijit._Container",null,{isContainer:true,addChild:function(A,H){if(H===undefined){H="last"
}var G=this.containerNode||this.domNode;
if(H&&typeof H=="number"){var F=B.query("> [widgetid]",G);
if(F&&F.length>=H){G=F[H-1];
H="after"
}}B.place(A.domNode,G,H);
if(this._started&&!A._started){A.startup()
}},removeChild:function(A){var D=A.domNode;
D.parentNode.removeChild(D)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return B.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(A,H){var G=A.domNode;
var F=(H>0?"nextSibling":"previousSibling");
do{G=G[F]
}while(G&&(G.nodeType!=1||!dijit.byNode(G)));
return G?dijit.byNode(G):null
}});
B.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(J,A){var I=this._keyNavCodes={};
var G=B.hitch(this,this.focusPrev);
var H=B.hitch(this,this.focusNext);
B.forEach(J,function(C){I[C]=G
});
B.forEach(A,function(C){I[C]=H
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(B.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){B.forEach(this.getChildren(),B.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(A,D){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(A)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var A=this._getNextFocusableChild(this.focusedChild,-1);
if(A.getFocalNodes){var D=A.getFocalNodes();
this.focusChild(A,D[D.length-1])
}else{this.focusChild(A)
}},focusChild:function(A,D){if(A){if(this.focusedChild&&A!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=A;
if(D&&A.focusFocalNode){A.focusFocalNode(D)
}else{A.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){B.forEach(A.getFocalNodes(),function(D){D.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(D){this.domNode.setAttribute("tabIndex",-1);
if(D.target===this.domNode){this.focusFirstChild()
}else{var A=dijit.getEnclosingWidget(D.target);
if(A&&A.isFocusable()){this.focusedChild=A
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(D){if(D.ctrlKey||D.altKey){return 
}var A=this._keyNavCodes[D.keyCode];
if(A){A();
B.stopEvent(D)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(A,H){if(A){A=this._getSiblingOfChild(A,H)
}var F=this.getChildren();
for(var G=0;
G<F.length;
G++){if(!A){A=F[(H>0)?0:(F.length-1)]
}if(A.isFocusable()){return A
}A=this._getSiblingOfChild(A,H)
}}})
}}});