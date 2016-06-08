dojo._xdResourceLoaded({depends:[["provide","dijit.form.NumberSpinner"],["require","dijit.form._Spinner"],["require","dijit.form.NumberTextBox"]],defineResource:function(B){if(!B._hasResource["dijit.form.NumberSpinner"]){B._hasResource["dijit.form.NumberSpinner"]=true;
B.provide("dijit.form.NumberSpinner");
B.require("dijit.form._Spinner");
B.require("dijit.form.NumberTextBox");
B.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(E,A){var F=E+A;
if(isNaN(E)||isNaN(F)){return E
}if((typeof this.constraints.max=="number")&&(F>this.constraints.max)){F=this.constraints.max
}if((typeof this.constraints.min=="number")&&(F<this.constraints.min)){F=this.constraints.min
}return F
}})
}}});