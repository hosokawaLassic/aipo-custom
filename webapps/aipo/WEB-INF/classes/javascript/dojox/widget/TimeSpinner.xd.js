dojo._xdResourceLoaded({depends:[["provide","dojox.widget.TimeSpinner"],["require","dijit.form._Spinner"],["require","dijit.form.NumberTextBox"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojox.widget.TimeSpinner"]){B._hasResource["dojox.widget.TimeSpinner"]=true;
B.provide("dojox.widget.TimeSpinner");
B.require("dijit.form._Spinner");
B.require("dijit.form.NumberTextBox");
B.require("dojo.date");
B.require("dojo.date.locale");
B.require("dojo.date.stamp");
B.declare("dojox.widget.TimeSpinner",[dijit.form._Spinner],{required:false,adjust:function(D,A){return B.date.add(D,"minute",A)
},isValid:function(){return true
},smallDelta:5,largeDelta:30,timeoutChangeRate:0.5,parse:function(A,D){return B.date.locale.parse(A,{selector:"time",formatLength:"short"})
},format:function(A,D){if(B.isString(A)){return A
}return B.date.locale.format(A,{selector:"time",formatLength:"short"})
},serialize:B.date.stamp.toISOString,value:"12:00 AM"})
}}});