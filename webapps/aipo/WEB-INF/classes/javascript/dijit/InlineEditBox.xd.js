dojo._xdResourceLoaded({depends:[["provide","dijit.InlineEditBox"],["require","dojo.i18n"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit.form.Button"],["require","dijit.form.TextBox"],["requireLocalization","dijit","common",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.InlineEditBox"]){B._hasResource["dijit.InlineEditBox"]=true;
B.provide("dijit.InlineEditBox");
B.require("dojo.i18n");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dijit.form.Button");
B.require("dijit.form.TextBox");
B.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(A){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var A={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var D in A){this.connect(this.displayNode,D,A[D])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){B.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){B.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(A){if(this.disabled){return 
}if(A){B.stopEvent(A)
}this._onMouseOut();
setTimeout(B.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var H=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var A=document.createElement("span");
B.place(A,this.domNode,"before");
var F=this.editWidget=new dijit._InlineEditor({value:B.trim(H),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:B.getComputedStyle(this.displayNode),save:B.hitch(this,"save"),cancel:B.hitch(this,"cancel"),width:this.width},A);
var G=F.domNode.style;
this.displayNode.style.display="none";
G.position="static";
G.visibility="visible";
this.domNode=F.domNode;
setTimeout(function(){F.focus()
},100)
},_showText:function(F){this.displayNode.style.display="";
var E=this.editWidget.domNode.style;
E.position="absolute";
E.visibility="hidden";
this.domNode=this.displayNode;
var A=this;
setTimeout(function(){if(F){dijit.focus(A.displayNode)
}A.editWidget.destroy();
delete A.editWidget
},100)
},save:function(A){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(A)
},_setDisplayValue:function(A){this.displayNode.innerHTML=A||this.noValueIndicator
},cancel:function(A){this.editing=false;
this._showText(A)
}});
B.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=B.i18n.getLocalization("dijit","common",this.lang);
B.forEach(["buttonSave","buttonCancel"],function(A){if(!this[A]){this[A]=this.messages[A]
}},this)
},postCreate:function(){var F=B.getObject(this.editor);
var A=this.editWidget=new F(this.editorParams,this.editorPlaceholder);
var E=this.style;
B.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(C){A.focusNode.style[C]=E[C]
},this);
B.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(C){this.domNode.style[C]=E[C]
},this);
if(this.width=="100%"){A.domNode.style.width="100%";
this.domNode.style.display="block"
}else{A.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var A=this.editWidget;
return A.getDisplayedValue?A.getDisplayedValue():A.getValue()
},_onKeyPress:function(D){if(this._exitInProgress){return 
}if(this.autoSave){if(D.keyCode==B.keys.ESCAPE){B.stopEvent(D);
this._exitInProgress=true;
this.cancel(true)
}else{if(D.keyCode==B.keys.ENTER){B.stopEvent(D);
this._exitInProgress=true;
this.save(true)
}}}else{var A=this;
setTimeout(function(){A.saveButton.setDisabled(A.getValue()==A._initialText)
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
dijit.selectInputText=function(H){var A=B.global;
var J=B.doc;
H=B.byId(H);
if(J.selection&&B.body()["createTextRange"]){if(H.createTextRange){var I=H.createTextRange();
I.moveStart("character",0);
I.moveEnd("character",H.value.length);
I.select()
}}else{if(A.getSelection){var G=A.getSelection();
if(H.setSelectionRange){H.setSelectionRange(0,H.value.length)
}}}H.focus()
}
}}});