dojo._xdResourceLoaded({depends:[["provide","dijit.form.Textarea"],["require","dijit.form._FormWidget"],["require","dojo.i18n"],["requireLocalization","dijit","Textarea",null,"ROOT","ROOT"]],defineResource:function(B){if(!B._hasResource["dijit.form.Textarea"]){B._hasResource["dijit.form.Textarea"]=true;
B.provide("dijit.form.Textarea");
B.require("dijit.form._FormWidget");
B.require("dojo.i18n");
B.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:B.mixin(B.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(B.isIE||B.isSafari||B.isMozilla)?((B.isIE||B.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((B.isIE||B.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(B.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(I,J){var L=this.editNode;
if(typeof I=="string"){L.innerHTML="";
if(I.split){var A=this;
var N=true;
B.forEach(I.split("\n"),function(C){if(N){N=false
}else{L.appendChild(document.createElement("BR"))
}L.appendChild(document.createTextNode(C))
})
}else{L.appendChild(document.createTextNode(I))
}}else{I=L.innerHTML;
if(this.iframe){I=I.replace(/<div><\/div>\r?\n?$/i,"")
}I=I.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=I;
if(this.iframe){var K=document.createElement("div");
L.appendChild(K);
var M=K.offsetTop;
if(L.scrollWidth>L.clientWidth){M+=16
}if(this.lastHeight!=M){if(M==0){M=16
}B.contentBox(this.iframe,{h:M});
this.lastHeight=M
}L.removeChild(K)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),J)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(B.isMozilla){var E=B.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=E.iframeEditTitle;
this._iframeFocusTitle=E.iframeFocusTitle;
var A=B.query('label[for="'+this.id+'"]');
if(A.length){this._iframeEditTitle=A[0].innerHTML+" "+this._iframeEditTitle
}var F=this.focusNode=this.editNode=document.createElement("BODY");
F.style.margin="0px";
F.style.padding="0px";
F.style.border="0px"
}},postCreate:function(){if(B.isIE||B.isSafari){this.domNode.style.overflowY="hidden"
}else{if(B.isMozilla){var H=this.iframe.contentWindow;
try{var A=this.iframe.contentDocument.title
}catch(G){var A=""
}if(!H||!A){this.iframe.postCreate=B.hitch(this,this.postCreate);
return 
}var F=H.document;
F.getElementsByTagName("HTML")[0].replaceChild(this.editNode,F.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){F.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=F;
H.addEventListener("resize",B.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(A){B.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A)
},_blurred:function(A){B.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(D){if(D.keyCode==B.keys.TAB&&!D.shiftKey&&!D.ctrlKey&&!D.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
B.stopEvent(D)
}else{if(D.keyCode==B.keys.ENTER){D.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var A=document.createEvent("KeyEvents");
A.initKeyEvent("keypress",true,true,null,D.ctrlKey,D.altKey,D.shiftKey,D.metaKey,D.keyCode,D.charCode);
this.iframe.dispatchEvent(A)
}}}this._changing()
},_changing:function(A){setTimeout(B.hitch(this,"_changed",A,false),1)
},_changed:function(A,D){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,D)
}})
}}});