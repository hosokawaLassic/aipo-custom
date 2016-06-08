dojo._xdResourceLoaded({depends:[["provide","dijit.Menu"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.Menu"]){B._hasResource["dijit.Menu"]=true;
B.provide("dijit.Menu");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dijit._Templated");
B.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(B.body())
}else{B.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([B.keys.UP_ARROW],[B.keys.DOWN_ARROW])
},startup:function(){B.forEach(this.getChildren(),function(A){A.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(A){},_moveToPopup:function(A){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(A)
}},_onKeyPress:function(A){if(A.ctrlKey||A.altKey){return 
}switch(A.keyCode){case B.keys.RIGHT_ARROW:this._moveToPopup(A);
B.stopEvent(A);
break;
case B.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{B.stopEvent(A)
}break
}},onItemHover:function(A){this.focusChild(A);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(B.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(A){dijit.popup.close(A.popup);
A._blur();
this._stopPopupTimer()
},onItemUnhover:function(A){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var A=this;
A.parentMenu;
A=A.parentMenu){}return A
},onItemClick:function(A){if(A.disabled){return false
}if(A.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
A.onClick()
}},_iframeContentWindow:function(D){var A=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(D))||dijit.Menu._iframeContentDocument(D)["__parent__"]||(D.name&&document.frames[D.name])||null;
return A
},_iframeContentDocument:function(D){var A=D.contentDocument||(D.contentWindow&&D.contentWindow.document)||(D.name&&document.frames[D.name]&&document.frames[D.name].document)||null;
return A
},bindDomNode:function(F){F=B.byId(F);
var E=dijit.getDocumentWindow(F.ownerDocument);
if(F.tagName.toLowerCase()=="iframe"){E=this._iframeContentWindow(F);
F=B.withGlobal(E,B.body)
}var A=(F==B.body()?B.doc:F);
F[this.id]=this._bindings.push([B.connect(A,"oncontextmenu",this,"_openMyself"),B.connect(A,"onkeydown",this,"_contextKey"),B.connect(A,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(A){var F=B.byId(A);
var G=F[this.id]-1,H=this._bindings[G];
B.forEach(H,B.disconnect);
delete this._bindings[G]
},_contextKey:function(A){this._contextMenuWithMouse=false;
if(A.keyCode==B.keys.F10){B.stopEvent(A);
if(A.shiftKey&&A.type=="keydown"){var D={target:A.target,pageX:A.pageX,pageY:A.pageY};
D.preventDefault=D.stopPropagation=function(){};
window.setTimeout(B.hitch(this,function(){this._openMyself(D)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(I){B.stopEvent(I);
var N,A;
if(B.isSafari||this._contextMenuWithMouse){N=I.pageX;
A=I.pageY
}else{var J=B.coords(I.target,true);
N=J.x+10;
A=J.y+10
}var L=this;
var M=dijit.getFocus(this);
function K(){dijit.focus(M);
dijit.popup.close(L)
}dijit.popup.open({popup:this,x:N,y:A,onExecute:K,onCancel:K,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(A){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var F=this.focusedChild;
var E=F.popup;
if(E.isShowingNow){return 
}E.parentMenu=this;
var A=this;
dijit.popup.open({parent:this,popup:E,around:F.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(E);
F.focus();
A.currentPopup=null
}});
this.currentPopup=E;
if(E.focus){E.focus()
}}});
B.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){B.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(A){this.getParent().onItemClick(this);
B.stopEvent(A)
},onClick:function(){},focus:function(){B.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(A){}},_blur:function(){B.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(A){this.disabled=A;
B[A?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",A?"true":"false")
}});
B.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var A=B.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var A=B.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(A)
}B.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
B.addClass(this.expand,"dijitMenuExpandEnabled");
B.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
B.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){B.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}}});