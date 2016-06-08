dojo._xdResourceLoaded({depends:[["provide","dijit.form.DateTextBox"],["require","dijit._Calendar"],["require","dijit.form.TimeTextBox"]],defineResource:function(B){if(!B._hasResource["dijit.form.DateTextBox"]){B._hasResource["dijit.form.DateTextBox"]=true;
B.provide("dijit.form.DateTextBox");
B.require("dijit._Calendar");
B.require("dijit.form.TimeTextBox");
B.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}}});