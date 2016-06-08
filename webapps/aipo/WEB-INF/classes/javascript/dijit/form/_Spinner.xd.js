dojo._xdResourceLoaded({depends:[["provide","dijit.form._Spinner"],["require","dijit.form.ValidationTextBox"]],defineResource:function(B){if(!B._hasResource["dijit.form._Spinner"]){B._hasResource["dijit.form._Spinner"]=true;
B.provide("dijit.form._Spinner");
B.require("dijit.form.ValidationTextBox");
B.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(D,A){return D
},_handleUpArrowEvent:function(A){this._onMouse(A,this.upArrowNode)
},_handleDownArrowEvent:function(A){this._onMouse(A,this.downArrowNode)
},_arrowPressed:function(D,A){if(this.disabled){return 
}B.addClass(D,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),A*this.smallDelta),false)
},_arrowReleased:function(A){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
B.removeClass(A,"dijitSpinnerButtonActive")
},_typematicCallback:function(A,E,F){if(E==this.textbox){E=(F.keyCode==B.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(A==-1){this._arrowReleased(E)
}else{this._arrowPressed(E,(E==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(J){B.stopEvent(J);
var G=0;
if(typeof J.wheelDelta=="number"){G=J.wheelDelta
}else{if(typeof J.detail=="number"){G=-J.detail
}}if(G>0){var H=this.upArrowNode;
var I=+1
}else{if(G<0){var H=this.downArrowNode;
var I=-1
}else{return 
}}this._arrowPressed(H,I);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var A=this;
this._wheelTimer=setTimeout(function(){A._arrowReleased(H)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,B.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:B.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:B.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}}});