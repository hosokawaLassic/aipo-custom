dojo._xdResourceLoaded({depends:[["provide","dijit.form.Button"],["require","dijit.form._FormWidget"],["require","dijit._Container"]],defineResource:function(B){if(!B._hasResource["dijit.form.Button"]){B._hasResource["dijit.form.Button"]=true;
B.provide("dijit.form.Button");
B.require("dijit.form._FormWidget");
B.require("dijit._Container");
B.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(A){if(this.disabled){return false
}this._clicked();
return this.onClick(A)
},_onButtonClick:function(A){B.stopEvent(A);
var F=this._onClick(A)!==false;
if(this.type=="submit"&&F){for(var H=this.domNode;
H;
H=H.parentNode){var G=dijit.byNode(H);
if(G&&G._onSubmit){G._onSubmit(A);
break
}if(H.tagName.toLowerCase()=="form"){if(!H.onsubmit||H.onsubmit()){H.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=B.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
B.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(F){this.containerNode.innerHTML=this.label=F;
if(B.isMozilla){var E=B.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var A=this;
setTimeout(function(){A.domNode.style.display=E
},1)
}if(this.showLabel==false){this.titleNode.title=B.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
B.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var A=B.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var A=B.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(A);
delete this.dropDownContainer
}B.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(A){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(A){var D=B.isFF&&B.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!D||A.detail!=0||this._seenKeydown){this._onArrowClick(A)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==B.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){B.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var A=this.dropDown;
if(!A){return false
}if(!A.isShowingNow){if(A.href&&!A.isLoaded){var F=this;
var E=B.connect(A,"onLoad",function(){B.disconnect(E);
F._openDropDown()
});
A._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var A=this.dropDown;
var I=A.domNode.style.width;
var H=this;
dijit.popup.open({parent:this,popup:A,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){H._closeDropDown(true)
},onCancel:function(){H._closeDropDown(true)
},onClose:function(){A.domNode.style.width=I;
H.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>A.domNode.offsetWidth){var G=null;
if(!this.isLeftToRight()){G=A.domNode.parentNode;
var J=G.offsetLeft+G.offsetWidth
}B.marginBox(A.domNode,{w:this.domNode.offsetWidth});
if(G){G.style.left=J-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(A.focus){A.focus()
}},_closeDropDown:function(A){if(this._opened){dijit.popup.close(this.dropDown);
if(A){this.focus()
}this._opened=false
}}});
B.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:B.mixin(B.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
B.forEach(this._focalNodes,B.hitch(this,function(A){if(B.isIE){this.connect(A,"onactivate",this._onNodeFocus)
}else{this.connect(A,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(A){this._focusedNode=A;
dijit.focus(A)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(A){this._focusedNode=A.currentTarget
},_onBlur:function(A){this.inherited(arguments);
this._focusedNode=null
}});
B.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(A){this.setChecked(!this.checked)
},setChecked:function(A){this.checked=A;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(A)
}})
}}});