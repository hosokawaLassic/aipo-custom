if(!dojo._hasResource["dijit.form.NumberTextBox"]){dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dojo.number");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,format:function(C,D){if(isNaN(C)){return""
}return dojo.number.format(C,D)
},parse:dojo.number.parse,filter:function(B){if(typeof B=="string"){return this.inherited("filter",arguments)
}return(isNaN(B)?"":B)
},value:NaN});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
};