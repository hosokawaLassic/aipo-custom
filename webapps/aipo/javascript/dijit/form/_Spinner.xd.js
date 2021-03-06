dojo._xdResourceLoaded({depends:[["provide","dijit.form._Spinner"],["require","dijit.form.ValidationTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form._Spinner"]){A._hasResource["dijit.form._Spinner"]=true;
A.provide("dijit.form._Spinner");
A.require("dijit.form.ValidationTextBox");
A.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(B,C){return B
},_handleUpArrowEvent:function(B){this._onMouse(B,this.upArrowNode)
},_handleDownArrowEvent:function(B){this._onMouse(B,this.downArrowNode)
},_arrowPressed:function(B,C){if(this.disabled){return 
}A.addClass(B,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),C*this.smallDelta),false)
},_arrowReleased:function(B){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
A.removeClass(B,"dijitSpinnerButtonActive")
},_typematicCallback:function(D,C,B){if(C==this.textbox){C=(B.keyCode==A.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(D==-1){this._arrowReleased(C)
}else{this._arrowPressed(C,(C==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(B){A.stopEvent(B);
var E=0;
if(typeof B.wheelDelta=="number"){E=B.wheelDelta
}else{if(typeof B.detail=="number"){E=-B.detail
}}if(E>0){var D=this.upArrowNode;
var C=+1
}else{if(E<0){var D=this.downArrowNode;
var C=-1
}else{return 
}}this._arrowPressed(D,C);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var F=this;
this._wheelTimer=setTimeout(function(){F._arrowReleased(D)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:A.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:A.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}}});