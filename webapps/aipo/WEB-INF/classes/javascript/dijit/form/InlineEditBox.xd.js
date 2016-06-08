dojo._xdResourceLoaded({depends:[["provide","dijit.form.InlineEditBox"],["require","dojo.i18n"],["require","dijit.form._FormWidget"],["require","dijit._Container"],["require","dijit.form.Button"],["requireLocalization","dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.form.InlineEditBox"]){B._hasResource["dijit.form.InlineEditBox"]=true;
B.provide("dijit.form.InlineEditBox");
B.require("dojo.i18n");
B.require("dijit.form._FormWidget");
B.require("dijit._Container");
B.require("dijit.form.Button");
B.deprecated("dijit.form.InlineEditBox is deprecated, use dijit.InlineEditBox instead","","1.1");
B.declare("dijit.form.InlineEditBox",[dijit.form._FormWidget,dijit._Container],{templateString:'<span\r\n\t><fieldset dojoAttachPoint="editNode" style="display:none;" waiRole="presentation"\r\n\t\t><div dojoAttachPoint="containerNode" dojoAttachEvent="onkeypress:_onEditWidgetKeyPress"></div\r\n\t\t><div dojoAttachPoint="buttonContainer"\r\n\t\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t\t></div\r\n\t></fieldset\r\n\t><span tabIndex="0" dojoAttachPoint="textNode,focusNode" waiRole="button" style="display:none;"\r\n\t\tdojoAttachEvent="onkeypress:_onKeyPress,onclick:_onClick,onmouseout:_onMouseOut,onmouseover:_onMouseOver,onfocus:_onMouseOver,onblur:_onMouseOut"\r\n\t></span\r\n></span>\r\n',editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,widgetsInTemplate:true,_display:"",startup:function(){if(!this._started){if(this.editWidget){this.containerNode.appendChild(this.editWidget.domNode)
}else{this.editWidget=this.getChildren()[0]
}var D=B.getComputedStyle(this.domNode);
B.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(C){this.editWidget.focusNode.style[C]=D[C]
},this);
this._setEditValue=B.hitch(this.editWidget,this.editWidget.setDisplayedValue||this.editWidget.setValue);
this._getEditValue=B.hitch(this.editWidget,this.editWidget.getDisplayedValue||this.editWidget.getValue);
this._setEditFocus=B.hitch(this.editWidget,this.editWidget.focus);
this._isEditValid=B.hitch(this.editWidget,this.editWidget.isValid||function(){return true
});
this.editWidget.onChange=B.hitch(this,"_onChange");
if(!this.autoSave){this._oldSetValue=this.editWidget.setValue;
var A=this;
this.editWidget.setValue=B.hitch(this,function(C){A._oldSetValue.apply(A.editWidget,arguments);
A._onEditWidgetKeyPress(null)
})
}this._showText();
this._started=true
}},postMixInProperties:function(){this._srcTag=this.srcNodeRef.tagName;
this._srcStyle=B.getComputedStyle(this.srcNodeRef);
var A=this.srcNodeRef.style;
this._display="";
if(A&&A.display){this._display=A.display
}else{switch(this.srcNodeRef.tagName.toLowerCase()){case"span":case"input":case"img":case"button":this._display="inline";
break;
default:this._display="block";
break
}}this.inherited("postMixInProperties",arguments);
this.messages=B.i18n.getLocalization("dijit","common",this.lang);
B.forEach(["buttonSave","buttonCancel"],function(D){if(!this[D]){this[D]=this.messages[D]
}},this)
},postCreate:function(){if(this.autoSave){B.style(this.buttonContainer,"display","none")
}},_onKeyPress:function(A){if(this.disabled||A.altKey||A.ctrlKey){return 
}if(A.charCode==B.keys.SPACE||A.keyCode==B.keys.ENTER){B.stopEvent(A);
this._onClick(A)
}},_onMouseOver:function(){if(!this.editing){var A=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
B.addClass(this.textNode,A)
}},_onMouseOut:function(){if(!this.editing){var A=this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion";
B.removeClass(this.textNode,A)
}},_onClick:function(A){if(this.editing||this.disabled){return 
}this._onMouseOut();
this.editing=true;
this._setEditValue(this._isEmpty?"":(this.renderAsHtml?this.textNode.innerHTML:this.textNode.innerHTML.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")));
this._initialText=this._getEditValue();
this._visualize();
setTimeout(B.hitch(this,function(){this._setEditFocus();
this.saveButton.setDisabled(true)
}),1)
},_visualize:function(){B.style(this.editNode,"display",this.editing?this._display:"none");
if(this.editing){this._setEditFocus()
}B.style(this.textNode,"display",this.editing?"none":this._display)
},_showText:function(){var E=""+this._getEditValue();
dijit.form.InlineEditBox.superclass.setValue.call(this,E);
if(/^\s*$/.test(E)){E="?";
this._isEmpty=true
}else{this._isEmpty=false
}if(this.renderAsHtml){this.textNode.innerHTML=E
}else{this.textNode.innerHTML="";
if(E.split){var A=this;
var F=true;
B.forEach(E.split("\n"),function(C){if(F){F=false
}else{A.textNode.appendChild(document.createElement("BR"))
}A.textNode.appendChild(document.createTextNode(C))
})
}else{this.textNode.appendChild(document.createTextNode(E))
}}this._visualize()
},save:function(A){if(typeof A=="object"){B.stopEvent(A)
}if(!this.enableSave()){return 
}this.editing=false;
this._showText();
if(A){dijit.focus(this.focusNode)
}if(this._lastValue!=this._lastValueReported){this.onChange(this._lastValue)
}},cancel:function(A){if(A){B.stopEvent(A)
}this.editing=false;
this._visualize();
if(A){dijit.focus(this.focusNode)
}},setValue:function(A){this._setEditValue(A);
this.editing=false;
this._showText()
},_onEditWidgetKeyPress:function(D){if(!this.editing){return 
}if(this.autoSave){if(D.keyCode==B.keys.ESCAPE){this.cancel(D)
}else{if(D.keyCode==B.keys.ENTER){this.save(D)
}}}else{var A=this;
setTimeout(function(){A.saveButton.setDisabled(A._getEditValue()==A._initialText)
},100)
}},_onBlur:function(){if(this.autoSave&&this.editing){if(this._getEditValue()==this._initialText){this.cancel()
}else{this.save()
}}},enableSave:function(){return this._isEditValid()
},_onChange:function(){if(!this.editing){this._showText()
}else{if(this.autoSave){this.save(1)
}else{this.saveButton.setDisabled((this._getEditValue()==this._initialText)||!this.enableSave())
}}},setDisabled:function(A){this.saveButton.setDisabled(A);
this.cancelButton.setDisabled(A);
this.textNode.disabled=A;
this.editWidget.setDisabled(A);
this.inherited("setDisabled",arguments)
}})
}}});