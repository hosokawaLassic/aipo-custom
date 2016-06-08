if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit.form.Button");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var C=this.getChildren();
dojo.forEach(C,this._setupChild,this);
dojo.some(C,function(A){if(A.selected){this.selectedChildWidget=A
}return A.selected
},this);
var D=this.selectedChildWidget;
if(!D&&C[0]){D=this.selectedChildWidget=C[0];
D.selected=true
}if(D){this._showChild(D)
}dojo.publish(this.id+"-startup",[{children:C,selected:D}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(B){B.domNode.style.display="none";
B.domNode.style.position="relative";
return B
},addChild:function(D,C){dijit._Container.prototype.addChild.apply(this,arguments);
D=this._setupChild(D);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[D,C]);
if(!this.selectedChildWidget){this.selectChild(D)
}}},removeChild:function(D){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[D]);
this.layout()
}if(this.selectedChildWidget===D){this.selectedChildWidget=undefined;
if(this._started){var C=this.getChildren();
if(C.length){this.selectChild(C[0])
}}}},selectChild:function(B){B=dijit.byId(B);
if(this.selectedChildWidget!=B){this._transition(B,this.selectedChildWidget);
this.selectedChildWidget=B;
dojo.publish(this.id+"-selectChild",[B])
}},_transition:function(D,C){if(C){this._hideChild(C)
}this._showChild(D);
if(this.doLayout&&D.resize){D.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(F){var E=this.getChildren();
var D=dojo.indexOf(E,this.selectedChildWidget);
D+=F?1:E.length-1;
return E[D%E.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(B){dojo.publish(this.id+"-containerKeyPress",[{e:B,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(D){var C=this.getChildren();
D.isFirstChild=(D==C[0]);
D.isLastChild=(D==C[C.length-1]);
D.selected=true;
D.domNode.style.display="";
if(D._loadCheck){D._loadCheck()
}if(D.onShow){D.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}},closeChild:function(D){var C=D.onClose(this,D);
if(C){this.removeChild(D);
D.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[dojo.subscribe(this.containerId+"-startup",this,"onStartup"),dojo.subscribe(this.containerId+"-addChild",this,"onAddChild"),dojo.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),dojo.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),dojo.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(B){dojo.forEach(B.children,this.onAddChild,this);
this.onSelectChild(B.selected)
},destroy:function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(G,F){var I=document.createElement("span");
this.domNode.appendChild(I);
var J=dojo.getObject(this.buttonWidget);
var H=new J({label:G.title,closeButton:G.closable},I);
this.addChild(H,F);
this.pane2button[G]=H;
G.controlButton=H;
dojo.connect(H,"onClick",dojo.hitch(this,"onButtonClick",G));
dojo.connect(H,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",G));
if(!this._currentChild){H.focusNode.setAttribute("tabIndex","0");
this._currentChild=G
}},onRemoveChild:function(D){if(this._currentChild===D){this._currentChild=null
}var C=this.pane2button[D];
if(C){C.destroy()
}this.pane2button[D]=null
},onSelectChild:function(E){if(!E){return 
}if(this._currentChild){var D=this.pane2button[this._currentChild];
D.setChecked(false);
D.focusNode.setAttribute("tabIndex","-1")
}var F=this.pane2button[E];
F.setChecked(true);
this._currentChild=E;
F.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(D){var C=dijit.byId(this.containerId);
C.selectChild(D)
},onCloseButtonClick:function(E){var F=dijit.byId(this.containerId);
F.closeChild(E);
var D=this.pane2button[this._currentChild];
if(D){dijit.focus(D.focusNode||D.domNode)
}},adjacent:function(E){var H=this.getChildren();
var G=dojo.indexOf(H,this.pane2button[this._currentChild]);
var F=E?1:H.length-1;
return H[(G+F)%H.length]
},onkeypress:function(E){if(this.disabled||E.altKey){return 
}var F=true;
if(E.ctrlKey||!E._djpage){var D=dojo.keys;
switch(E.keyCode){case D.LEFT_ARROW:case D.UP_ARROW:case D.PAGE_UP:F=false;
case D.RIGHT_ARROW:case D.DOWN_ARROW:case D.PAGE_DOWN:this.adjacent(F).onClick();
dojo.stopEvent(E);
break;
case D.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(E);
break;
default:if(E.ctrlKey){if(E.keyCode==D.TAB){this.adjacent(!E.shiftKey).onClick();
dojo.stopEvent(E)
}else{if(E.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(E)
}}}}}},onContainerKeyPress:function(B){B.e._djpage=B.page;
this.onkeypress(B.e)
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(B){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(B){dijit.focus(this.focusNode)
},onClickCloseButton:function(B){B.stopPropagation()
}});
dojo.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
};