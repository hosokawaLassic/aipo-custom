dojo._xdResourceLoaded({depends:[["provide","dijit.form.TimeTextBox"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.date.stamp"],["require","dijit._TimePicker"],["require","dijit.form.ValidationTextBox"]],defineResource:function(B){if(!B._hasResource["dijit.form.TimeTextBox"]){B._hasResource["dijit.form.TimeTextBox"]=true;
B.provide("dijit.form.TimeTextBox");
B.require("dojo.date");
B.require("dojo.date.locale");
B.require("dojo.date.stamp");
B.require("dijit._TimePicker");
B.require("dijit.form.ValidationTextBox");
B.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:B.date.locale.regexp,compare:B.date.compare,format:function(D,A){if(!D||D.toString()==this._invalid){return null
}return B.date.locale.format(D,A)
},parse:B.date.locale.parse,serialize:B.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var A=this.constraints;
A.selector="time";
if(typeof A.min=="string"){A.min=B.date.stamp.fromISOString(A.min)
}if(typeof A.max=="string"){A.max=B.date.stamp.fromISOString(A.max)
}},_onFocus:function(A){this._open()
},setValue:function(A,D){this.inherited("setValue",arguments);
if(this._picker){if(!A||A.toString()==this._invalid){A=new Date()
}this._picker.setValue(A)
}},_open:function(){if(this.disabled){return 
}var D=this;
if(!this._picker){var A=B.getObject(this._popupClass,false);
this._picker=new A({onValueSelected:function(C){D.focus();
setTimeout(B.hitch(D,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(D,C,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(C){return D.constraints&&(B.date.compare(D.constraints.min,C)>0||B.date.compare(D.constraints.max,C)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:B.hitch(this,this._close),onClose:function(){D._opened=false
}});
this._opened=true
}B.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(A){this.textbox.value=A
}})
}}});