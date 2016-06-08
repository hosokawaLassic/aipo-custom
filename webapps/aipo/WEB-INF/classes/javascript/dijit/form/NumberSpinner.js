if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.require("dijit.form._Spinner");
dojo.require("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(F,E){var D=F+E;
if(isNaN(F)||isNaN(D)){return F
}if((typeof this.constraints.max=="number")&&(D>this.constraints.max)){D=this.constraints.max
}if((typeof this.constraints.min=="number")&&(D<this.constraints.min)){D=this.constraints.min
}return D
}})
};