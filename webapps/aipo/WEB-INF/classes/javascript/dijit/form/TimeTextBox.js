if(!dojo._hasResource["dijit.form.TimeTextBox"]){dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dijit._TimePicker");
dojo.require("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(C,D){if(!C||C.toString()==this._invalid){return null
}return dojo.date.locale.format(C,D)
},parse:dojo.date.locale.parse,serialize:dojo.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var B=this.constraints;
B.selector="time";
if(typeof B.min=="string"){B.min=dojo.date.stamp.fromISOString(B.min)
}if(typeof B.max=="string"){B.max=dojo.date.stamp.fromISOString(B.max)
}},_onFocus:function(B){this._open()
},setValue:function(D,C){this.inherited("setValue",arguments);
if(this._picker){if(!D||D.toString()==this._invalid){D=new Date()
}this._picker.setValue(D)
}},_open:function(){if(this.disabled){return 
}var C=this;
if(!this._picker){var D=dojo.getObject(this._popupClass,false);
this._picker=new D({onValueSelected:function(A){C.focus();
setTimeout(dojo.hitch(C,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(C,A,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(A){return C.constraints&&(dojo.date.compare(C.constraints.min,A)>0||dojo.date.compare(C.constraints.max,A)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){C._opened=false
}});
this._opened=true
}dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(B){this.textbox.value=B
}})
};