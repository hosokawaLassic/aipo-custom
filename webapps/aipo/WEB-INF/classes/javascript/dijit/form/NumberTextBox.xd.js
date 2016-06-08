dojo._xdResourceLoaded({depends:[["provide","dijit.form.NumberTextBox"],["require","dijit.form.ValidationTextBox"],["require","dojo.number"]],defineResource:function(B){if(!B._hasResource["dijit.form.NumberTextBox"]){B._hasResource["dijit.form.NumberTextBox"]=true;
B.provide("dijit.form.NumberTextBox");
B.require("dijit.form.ValidationTextBox");
B.require("dojo.number");
B.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:B.number.regexp,format:function(D,A){if(isNaN(D)){return""
}return B.number.format(D,A)
},parse:B.number.parse,filter:function(A){if(typeof A=="string"){return this.inherited("filter",arguments)
}return(isNaN(A)?"":A)
},value:NaN});
B.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
}}});