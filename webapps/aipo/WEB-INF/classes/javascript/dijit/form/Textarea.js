if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(J,K){var M=this.editNode;
if(typeof J=="string"){M.innerHTML="";
if(J.split){var I=this;
var H=true;
dojo.forEach(J.split("\n"),function(A){if(H){H=false
}else{M.appendChild(document.createElement("BR"))
}M.appendChild(document.createTextNode(A))
})
}else{M.appendChild(document.createTextNode(J))
}}else{J=M.innerHTML;
if(this.iframe){J=J.replace(/<div><\/div>\r?\n?$/i,"")
}J=J.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=J;
if(this.iframe){var L=document.createElement("div");
M.appendChild(L);
var N=L.offsetTop;
if(M.scrollWidth>M.clientWidth){N+=16
}if(this.lastHeight!=N){if(N==0){N=16
}dojo.contentBox(this.iframe,{h:N});
this.lastHeight=N
}M.removeChild(L)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),K)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var F=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=F.iframeEditTitle;
this._iframeFocusTitle=F.iframeFocusTitle;
var E=dojo.query('label[for="'+this.id+'"]');
if(E.length){this._iframeEditTitle=E[0].innerHTML+" "+this._iframeEditTitle
}var D=this.focusNode=this.editNode=document.createElement("BODY");
D.style.margin="0px";
D.style.padding="0px";
D.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var E=this.iframe.contentWindow;
try{var F=this.iframe.contentDocument.title
}catch(H){var F=""
}if(!E||!F){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var G=E.document;
G.getElementsByTagName("HTML")[0].replaceChild(this.editNode,G.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){G.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=G;
E.addEventListener("resize",dojo.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(B){dojo.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B)
},_blurred:function(B){dojo.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(C){if(C.keyCode==dojo.keys.TAB&&!C.shiftKey&&!C.ctrlKey&&!C.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(C)
}else{if(C.keyCode==dojo.keys.ENTER){C.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var D=document.createEvent("KeyEvents");
D.initKeyEvent("keypress",true,true,null,C.ctrlKey,C.altKey,C.shiftKey,C.metaKey,C.keyCode,C.charCode);
this.iframe.dispatchEvent(D)
}}}this._changing()
},_changing:function(B){setTimeout(dojo.hitch(this,"_changed",B,false),1)
},_changed:function(D,C){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,C)
}})
};