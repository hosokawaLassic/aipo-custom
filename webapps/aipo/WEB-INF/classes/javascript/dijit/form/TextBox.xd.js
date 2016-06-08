dojo._xdResourceLoaded({depends:[["provide","dijit.form.TextBox"],["require","dijit.form._FormWidget"]],defineResource:function(B){if(!B._hasResource["dijit.form.TextBox"]){B._hasResource["dijit.form.TextBox"]=true;
B.provide("dijit.form.TextBox");
B.require("dijit.form._FormWidget");
B.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:B.mixin(B.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(A,F,G){var H=this.filter(A);
if((typeof H==typeof A)&&(G==null||G==undefined)){G=this.format(H,this.constraints)
}if(G!=null&&G!=undefined){this.textbox.value=G
}dijit.form.TextBox.superclass.setValue.call(this,H,F)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(D,A){return((D==null||D==undefined)?"":(D.toString?D.toString():D))
},parse:function(D,A){return D
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){B.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(B.isFF==2&&this.domNode.tagName=="TABLE"){var A=this.domNode;
var D=A.style.opacity;
A.style.opacity="0.999";
setTimeout(function(){A.style.opacity=D
},0)
}},filter:function(A){if(A==undefined||A==null){return""
}else{if(typeof A!="string"){return A
}}if(this.trim){A=B.trim(A)
}if(this.uppercase){A=A.toUpperCase()
}if(this.lowercase){A=A.toLowerCase()
}if(this.propercase){A=A.replace(/[^\s]+/g,function(D){return D.substring(0,1).toUpperCase()+D.substring(1)
})
}return A
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}}});