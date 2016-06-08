dojo._xdResourceLoaded({depends:[["provide","dijit.layout.StackContainer"],["require","dijit._Templated"],["require","dijit.layout._LayoutWidget"],["require","dijit.form.Button"]],defineResource:function(B){if(!B._hasResource["dijit.layout.StackContainer"]){B._hasResource["dijit.layout.StackContainer"]=true;
B.provide("dijit.layout.StackContainer");
B.require("dijit._Templated");
B.require("dijit.layout._LayoutWidget");
B.require("dijit.form.Button");
B.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var D=this.getChildren();
B.forEach(D,this._setupChild,this);
B.some(D,function(C){if(C.selected){this.selectedChildWidget=C
}return C.selected
},this);
var A=this.selectedChildWidget;
if(!A&&D[0]){A=this.selectedChildWidget=D[0];
A.selected=true
}if(A){this._showChild(A)
}B.publish(this.id+"-startup",[{children:D,selected:A}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(A){A.domNode.style.display="none";
A.domNode.style.position="relative";
return A
},addChild:function(A,D){dijit._Container.prototype.addChild.apply(this,arguments);
A=this._setupChild(A);
if(this._started){this.layout();
B.publish(this.id+"-addChild",[A,D]);
if(!this.selectedChildWidget){this.selectChild(A)
}}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){B.publish(this.id+"-removeChild",[A]);
this.layout()
}if(this.selectedChildWidget===A){this.selectedChildWidget=undefined;
if(this._started){var D=this.getChildren();
if(D.length){this.selectChild(D[0])
}}}},selectChild:function(A){A=dijit.byId(A);
if(this.selectedChildWidget!=A){this._transition(A,this.selectedChildWidget);
this.selectedChildWidget=A;
B.publish(this.id+"-selectChild",[A])
}},_transition:function(A,D){if(D){this._hideChild(D)
}this._showChild(A);
if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(E){var A=this.getChildren();
var F=B.indexOf(A,this.selectedChildWidget);
F+=E?1:A.length-1;
return A[F%A.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(A){B.publish(this.id+"-containerKeyPress",[{e:A,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(A){var D=this.getChildren();
A.isFirstChild=(A==D[0]);
A.isLastChild=(A==D[D.length-1]);
A.selected=true;
A.domNode.style.display="";
if(A._loadCheck){A._loadCheck()
}if(A.onShow){A.onShow()
}},_hideChild:function(A){A.selected=false;
A.domNode.style.display="none";
if(A.onHide){A.onHide()
}},closeChild:function(A){var D=A.onClose(this,A);
if(D){this.removeChild(A);
A.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
B.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[B.subscribe(this.containerId+"-startup",this,"onStartup"),B.subscribe(this.containerId+"-addChild",this,"onAddChild"),B.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),B.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),B.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(A){B.forEach(A.children,this.onAddChild,this);
this.onSelectChild(A.selected)
},destroy:function(){B.forEach(this._subscriptions,B.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(A,J){var H=document.createElement("span");
this.domNode.appendChild(H);
var I=B.getObject(this.buttonWidget);
var G=new I({label:A.title,closeButton:A.closable},H);
this.addChild(G,J);
this.pane2button[A]=G;
A.controlButton=G;
B.connect(G,"onClick",B.hitch(this,"onButtonClick",A));
B.connect(G,"onClickCloseButton",B.hitch(this,"onCloseButtonClick",A));
if(!this._currentChild){G.focusNode.setAttribute("tabIndex","0");
this._currentChild=A
}},onRemoveChild:function(A){if(this._currentChild===A){this._currentChild=null
}var D=this.pane2button[A];
if(D){D.destroy()
}this.pane2button[A]=null
},onSelectChild:function(A){if(!A){return 
}if(this._currentChild){var F=this.pane2button[this._currentChild];
F.setChecked(false);
F.focusNode.setAttribute("tabIndex","-1")
}var E=this.pane2button[A];
E.setChecked(true);
this._currentChild=A;
E.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(A){var D=dijit.byId(this.containerId);
D.selectChild(A)
},onCloseButtonClick:function(A){var E=dijit.byId(this.containerId);
E.closeChild(A);
var F=this.pane2button[this._currentChild];
if(F){dijit.focus(F.focusNode||F.domNode)
}},adjacent:function(H){var G=this.getChildren();
var F=B.indexOf(G,this.pane2button[this._currentChild]);
var A=H?1:G.length-1;
return G[(F+A)%G.length]
},onkeypress:function(A){if(this.disabled||A.altKey){return 
}var E=true;
if(A.ctrlKey||!A._djpage){var F=B.keys;
switch(A.keyCode){case F.LEFT_ARROW:case F.UP_ARROW:case F.PAGE_UP:E=false;
case F.RIGHT_ARROW:case F.DOWN_ARROW:case F.PAGE_DOWN:this.adjacent(E).onClick();
B.stopEvent(A);
break;
case F.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}B.stopEvent(A);
break;
default:if(A.ctrlKey){if(A.keyCode==F.TAB){this.adjacent(!A.shiftKey).onClick();
B.stopEvent(A)
}else{if(A.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}B.stopEvent(A)
}}}}}},onContainerKeyPress:function(A){A.e._djpage=A.page;
this.onkeypress(A.e)
}});
B.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(A){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(A){dijit.focus(this.focusNode)
},onClickCloseButton:function(A){A.stopPropagation()
}});
B.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
}}});