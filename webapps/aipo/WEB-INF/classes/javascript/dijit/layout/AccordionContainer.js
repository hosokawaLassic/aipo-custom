if(!dojo._hasResource["dijit.layout.AccordionContainer"]){dojo._hasResource["dijit.layout.AccordionContainer"]=true;
dojo.provide("dijit.layout.AccordionContainer");
dojo.require("dojo.fx");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit.layout.ContentPane");
dojo.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
dojo.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var B=this.selectedChildWidget.containerNode.style;
B.display="";
B.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var E=0;
var F=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(A){E+=A.getTitleHeight()
});
var D=this._contentBox;
this._verticalSpace=(D.h-E);
if(F){F.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(B){return B
},_transition:function(I,J){if(this._inTransition){return 
}this._inTransition=true;
var H=[];
var K=this._verticalSpace;
if(I){I.setSelected(true);
var L=I.containerNode;
L.style.display="";
H.push(dojo.animateProperty({node:L,duration:this.duration,properties:{height:{start:"1",end:K}},onEnd:function(){L.style.overflow="auto"
}}))
}if(J){J.setSelected(false);
var G=J.containerNode;
G.style.overflow="hidden";
H.push(dojo.animateProperty({node:G,duration:this.duration,properties:{height:{start:K,end:"1"}},onEnd:function(){G.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(H).play()
},_onKeyPress:function(D){if(this.disabled||D.altKey){return 
}var C=dojo.keys;
switch(D.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(D);
break;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(D);
break;
default:if(D.ctrlKey&&D.keyCode==C.TAB){this._adjacent(D._dijitWidget,!D.shiftKey)._onTitleClick();
dojo.stopEvent(D)
}}}});
dojo.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
dojo.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return dojo.marginBox(this.titleNode).h
},_onTitleClick:function(){var B=this.getParent();
if(!B._inTransition){B.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(B){B._dijitWidget=this;
return this.getParent()._onKeyPress(B)
},_setSelectedState:function(B){this.selected=B;
dojo[(B?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",B?"0":"-1")
},_handleFocus:function(B){dojo[(B.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(B){this._setSelectedState(B);
if(B){this.onSelected()
}},onSelected:function(){}})
};