if(!dojo._hasResource["dijit.form.InlineEditBox"]){dojo._hasResource["dijit.form.InlineEditBox"]=true;
dojo.provide("dijit.form.InlineEditBox");
dojo.require("dojo.i18n");
dojo.require("dijit.form._FormWidget");
dojo.require("dijit._Container");
dojo.require("dijit.form.Button");
dojo.requireLocalization("dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.deprecated("dijit.form.InlineEditBox is deprecated, use dijit.InlineEditBox instead","","1.1");
dojo.declare("dijit.form.InlineEditBox",[dijit.form._FormWidget,dijit._Container],{templateString:'<span\r\n\t><fieldset dojoAttachPoint="editNode" style="display:none;" waiRole="presentation"\r\n\t\t><div dojoAttachPoint="containerNode" dojoAttachEvent="onkeypress:_onEditWidgetKeyPress"></div\r\n\t\t><div dojoAttachPoint="buttonContainer"\r\n\t\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t\t></div\r\n\t></fieldset\r\n\t><span tabIndex="0" dojoAttachPoint="textNode,focusNode" waiRole="button" style="display:none;"\r\n\t\tdojoAttachEvent="onkeypress:_onKeyPress,onclick:_onClick,onmouseout:_onMouseOut,onmouseover:_onMouseOver,onfocus:_onMouseOver,onblur:_onMouseOut"\r\n\t></span\r\n></span>\r\n',editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,widgetsInTemplate:true,_display:"",startup:function(){if(!this._started){if(this.editWidget){this.containerNode.appendChild(this.editWidget.domNode)
}else{this.editWidget=this.getChildren()[0]
}var C=dojo.getComputedStyle(this.domNode);
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(A){this.editWidget.focusNode.style[A]=C[A]
},this);
this._setEditValue=dojo.hitch(this.editWidget,this.editWidget.setDisplayedValue||this.editWidget.setValue);
this._getEditValue=dojo.hitch(this.editWidget,this.editWidget.getDisplayedValue||this.editWidget.getValue);
this._setEditFocus=dojo.hitch(this.editWidget,this.editWidget.focus);
this._isEditValid=dojo.hitch(this.editWidget,this.editWidget.isValid||function(){return true
});
this.editWidget.onChange=dojo.hitch(this,"_onChange");
if(!this.autoSave){this._oldSetValue=this.editWidget.setValue;
var D=this;
this.editWidget.setValue=dojo.hitch(this,function(A){D._oldSetValue.apply(D.editWidget,arguments);
D._onEditWidgetKeyPress(null)
})
}this._showText();
this._started=true
}},postMixInProperties:function(){this._srcTag=this.srcNodeRef.tagName;
this._srcStyle=dojo.getComputedStyle(this.srcNodeRef);
var B=this.srcNodeRef.style;
this._display="";
if(B&&B.display){this._display=B.display
}else{switch(this.srcNodeRef.tagName.toLowerCase()){case"span":case"input":case"img":case"button":this._display="inline";
break;
default:this._display="block";
break
}}this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(A){if(!this[A]){this[A]=this.messages[A]
}},this)
},postCreate:function(){if(this.autoSave){dojo.style(this.buttonContainer,"display","none")
}},_onKeyPress:function(B){if(this.disabled||B.altKey||B.ctrlKey){return 
}if(B.charCode==dojo.keys.SPACE||B.keyCode==dojo.keys.ENTER){dojo.stopEvent(B);
this._onClick(B)
}},_onMouseOver:function(){if(!this.editing){var B=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
dojo.addClass(this.textNode,B)
}},_onMouseOut:function(){if(!this.editing){var B=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
dojo.removeClass(this.textNode,B)
}},_onClick:function(B){if(this.editing||this.disabled){return 
}this._onMouseOut();
this.editing=true;
this._setEditValue(this._isEmpty?"":(this.renderAsHtml?this.textNode.innerHTML:this.textNode.innerHTML.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")));
this._initialText=this._getEditValue();
this._visualize();
setTimeout(dojo.hitch(this,function(){this._setEditFocus();
this.saveButton.setDisabled(true)
}),1)
},_visualize:function(){dojo.style(this.editNode,"display",this.editing?this._display:"none");
if(this.editing){this._setEditFocus()
}dojo.style(this.textNode,"display",this.editing?"none":this._display)
},_showText:function(){var F=""+this._getEditValue();
dijit.form.InlineEditBox.superclass.setValue.call(this,F);
if(/^\s*$/.test(F)){F="?";
this._isEmpty=true
}else{this._isEmpty=false
}if(this.renderAsHtml){this.textNode.innerHTML=F
}else{this.textNode.innerHTML="";
if(F.split){var E=this;
var D=true;
dojo.forEach(F.split("\n"),function(A){if(D){D=false
}else{E.textNode.appendChild(document.createElement("BR"))
}E.textNode.appendChild(document.createTextNode(A))
})
}else{this.textNode.appendChild(document.createTextNode(F))
}}this._visualize()
},save:function(B){if(typeof B=="object"){dojo.stopEvent(B)
}if(!this.enableSave()){return 
}this.editing=false;
this._showText();
if(B){dijit.focus(this.focusNode)
}if(this._lastValue!=this._lastValueReported){this.onChange(this._lastValue)
}},cancel:function(B){if(B){dojo.stopEvent(B)
}this.editing=false;
this._visualize();
if(B){dijit.focus(this.focusNode)
}},setValue:function(B){this._setEditValue(B);
this.editing=false;
this._showText()
},_onEditWidgetKeyPress:function(C){if(!this.editing){return 
}if(this.autoSave){if(C.keyCode==dojo.keys.ESCAPE){this.cancel(C)
}else{if(C.keyCode==dojo.keys.ENTER){this.save(C)
}}}else{var D=this;
setTimeout(function(){D.saveButton.setDisabled(D._getEditValue()==D._initialText)
},100)
}},_onBlur:function(){if(this.autoSave&&this.editing){if(this._getEditValue()==this._initialText){this.cancel()
}else{this.save()
}}},enableSave:function(){return this._isEditValid()
},_onChange:function(){if(!this.editing){this._showText()
}else{if(this.autoSave){this.save(1)
}else{this.saveButton.setDisabled((this._getEditValue()==this._initialText)||!this.enableSave())
}}},setDisabled:function(B){this.saveButton.setDisabled(B);
this.cancelButton.setDisabled(B);
this.textNode.disabled=B;
this.editWidget.setDisabled(B);
this.inherited("setDisabled",arguments)
}})
};