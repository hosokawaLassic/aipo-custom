dojo._xdResourceLoaded({depends:[["provide","dijit.layout.AccordionContainer"],["require","dojo.fx"],["require","dijit._Container"],["require","dijit._Templated"],["require","dijit.layout.StackContainer"],["require","dijit.layout.ContentPane"]],defineResource:function(B){if(!B._hasResource["dijit.layout.AccordionContainer"]){B._hasResource["dijit.layout.AccordionContainer"]=true;
B.provide("dijit.layout.AccordionContainer");
B.require("dojo.fx");
B.require("dijit._Container");
B.require("dijit._Templated");
B.require("dijit.layout.StackContainer");
B.require("dijit.layout.ContentPane");
B.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
B.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var A=this.selectedChildWidget.containerNode.style;
A.display="";
A.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var A=0;
var E=this.selectedChildWidget;
B.forEach(this.getChildren(),function(C){A+=C.getTitleHeight()
});
var F=this._contentBox;
this._verticalSpace=(F.h-A);
if(E){E.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(A){return A
},_transition:function(H,I){if(this._inTransition){return 
}this._inTransition=true;
var A=[];
var J=this._verticalSpace;
if(H){H.setSelected(true);
var K=H.containerNode;
K.style.display="";
A.push(B.animateProperty({node:K,duration:this.duration,properties:{height:{start:"1",end:J}},onEnd:function(){K.style.overflow="auto"
}}))
}if(I){I.setSelected(false);
var L=I.containerNode;
L.style.overflow="hidden";
A.push(B.animateProperty({node:L,duration:this.duration,properties:{height:{start:J,end:"1"}},onEnd:function(){L.style.display="none"
}}))
}this._inTransition=false;
B.fx.combine(A).play()
},_onKeyPress:function(A){if(this.disabled||A.altKey){return 
}var D=B.keys;
switch(A.keyCode){case D.LEFT_ARROW:case D.UP_ARROW:case D.PAGE_UP:this._adjacent(false)._onTitleClick();
B.stopEvent(A);
break;
case D.RIGHT_ARROW:case D.DOWN_ARROW:case D.PAGE_DOWN:this._adjacent(true)._onTitleClick();
B.stopEvent(A);
break;
default:if(A.ctrlKey&&A.keyCode==D.TAB){this._adjacent(A._dijitWidget,!A.shiftKey)._onTitleClick();
B.stopEvent(A)
}}}});
B.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
B.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return B.marginBox(this.titleNode).h
},_onTitleClick:function(){var A=this.getParent();
if(!A._inTransition){A.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(A){A._dijitWidget=this;
return this.getParent()._onKeyPress(A)
},_setSelectedState:function(A){this.selected=A;
B[(A?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",A?"0":"-1")
},_handleFocus:function(A){B[(A.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(A){this._setSelectedState(A);
if(A){this.onSelected()
}},onSelected:function(){}})
}}});