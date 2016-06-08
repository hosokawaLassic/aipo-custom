dojo._xdResourceLoaded({depends:[["provide","dijit.form.ValidationTextBox"],["require","dojo.i18n"],["require","dijit.form.TextBox"],["require","dijit.Tooltip"],["requireLocalization","dijit.form","validate",null,"cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.form.ValidationTextBox"]){B._hasResource["dijit.form.ValidationTextBox"]=true;
B.provide("dijit.form.ValidationTextBox");
B.require("dojo.i18n");
B.require("dijit.form.TextBox");
B.require("dijit.Tooltip");
B.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(A){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(D,A){return(new RegExp("^("+this.regExpGen(A)+")"+(this.required?"":"?")+"$")).test(D)&&(!this.required||!this._isEmpty(D))&&(this._isEmpty(D)||this.parse(D,A)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(H){var G="";
var F=this.isValid(H);
var A=this._isEmpty(this.textbox.value);
this.state=(F||(!this._hasBeenBlurred&&A))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(F?"false":"true"));
if(H){if(A){G=this.getPromptMessage(true)
}if(!G&&!F){G=this.getErrorMessage(true)
}}this._displayMessage(G)
},_message:"",_displayMessage:function(A){if(this._message==A){return 
}this._message=A;
this.displayMessage(A)
},displayMessage:function(A){if(A){dijit.showTooltip(A,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(A){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(A){this.validate(true);
this._onMouse(A)
},onkeyup:function(A){this.onfocus(A)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=B.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var A=this.regExpGen(this.constraints);
this.regExp=A
}});
B.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(A,D){return(A.toString?A.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var A=this.textbox;
var D=(this.valueNode=document.createElement("input"));
D.setAttribute("type",A.type);
D.setAttribute("value",this.toString());
B.style(D,"display","none");
D.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
B.place(D,A,"after");
this.inherited("postCreate",arguments)
}});
B.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(A,D){return A-D
},rangeCheck:function(H,A){var F=(typeof A.min!="undefined");
var G=(typeof A.max!="undefined");
if(F||G){return(!F||this.compare(H,A.min)>=0)&&(!G||this.compare(H,A.max)<=0)
}else{return true
}},isInRange:function(A){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(A){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(A))
},getErrorMessage:function(A){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(A)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=B.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}}});