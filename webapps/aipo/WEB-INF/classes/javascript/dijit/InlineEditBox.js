if(!dojo._hasResource["dijit.InlineEditBox"]){dojo._hasResource["dijit.InlineEditBox"]=true;
dojo.provide("dijit.InlineEditBox");
dojo.require("dojo.i18n");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.requireLocalization("dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(B){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var D={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var C in D){this.connect(this.displayNode,C,D[C])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){dojo.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){dojo.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(B){if(this.disabled){return 
}if(B){dojo.stopEvent(B)
}this._onMouseOut();
setTimeout(dojo.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var E=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var F=document.createElement("span");
dojo.place(F,this.domNode,"before");
var G=this.editWidget=new dijit._InlineEditor({value:dojo.trim(E),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},F);
var H=G.domNode.style;
this.displayNode.style.display="none";
H.position="static";
H.visibility="visible";
this.domNode=G.domNode;
setTimeout(function(){G.focus()
},100)
},_showText:function(D){this.displayNode.style.display="";
var F=this.editWidget.domNode.style;
F.position="absolute";
F.visibility="hidden";
this.domNode=this.displayNode;
var E=this;
setTimeout(function(){if(D){dijit.focus(E.displayNode)
}E.editWidget.destroy();
delete E.editWidget
},100)
},save:function(B){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(B)
},_setDisplayValue:function(B){this.displayNode.innerHTML=B||this.noValueIndicator
},cancel:function(B){this.editing=false;
this._showText(B)
}});
dojo.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(B){if(!this[B]){this[B]=this.messages[B]
}},this)
},postCreate:function(){var D=dojo.getObject(this.editor);
var E=this.editWidget=new D(this.editorParams,this.editorPlaceholder);
var F=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(A){E.focusNode.style[A]=F[A]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(A){this.domNode.style[A]=F[A]
},this);
if(this.width=="100%"){E.domNode.style.width="100%";
this.domNode.style.display="block"
}else{E.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var B=this.editWidget;
return B.getDisplayedValue?B.getDisplayedValue():B.getValue()
},_onKeyPress:function(C){if(this._exitInProgress){return 
}if(this.autoSave){if(C.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(C);
this._exitInProgress=true;
this.cancel(true)
}else{if(C.keyCode==dojo.keys.ENTER){dojo.stopEvent(C);
this._exitInProgress=true;
this.save(true)
}}}else{var D=this;
setTimeout(function(){D.saveButton.setDisabled(D.getValue()==D._initialText)
},100)
}},_onBlur:function(){if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
if(this.getValue()==this._initialText){this.cancel(false)
}else{this.save(false)
}}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},_onChange:function(){if(this._ignoreNextOnChange){delete this._ignoreNextOnChange;
return 
}if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
this.save(true)
}else{this.saveButton.setDisabled((this.getValue()==this._initialText)||!this.enableSave())
}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},focus:function(){this.editWidget.focus();
dijit.selectInputText(this.editWidget.focusNode)
}});
dijit.selectInputText=function(I){var G=dojo.global;
var F=dojo.doc;
I=dojo.byId(I);
if(F.selection&&dojo.body()["createTextRange"]){if(I.createTextRange){var J=I.createTextRange();
J.moveStart("character",0);
J.moveEnd("character",I.value.length);
J.select()
}}else{if(G.getSelection){var H=G.getSelection();
if(I.setSelectionRange){I.setSelectionRange(0,I.value.length)
}}}I.focus()
}
};