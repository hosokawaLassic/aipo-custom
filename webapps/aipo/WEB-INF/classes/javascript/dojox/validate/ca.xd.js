dojo._xdResourceLoaded({depends:[["provide","dojox.validate.ca"],["require","dojox.validate._base"]],defineResource:function(B){if(!B._hasResource["dojox.validate.ca"]){B._hasResource["dojox.validate.ca"]=true;
B.provide("dojox.validate.ca");
B.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(A){return dojox.validate.us.isPhoneNumber(A)
};
dojox.validate.ca.isProvince=function(A){var D=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return D.test(A)
};
dojox.validate.ca.isSocialInsuranceNumber=function(A){var D={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(A,D)
};
dojox.validate.ca.isPostalCode=function(A){var D=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return D.test(A)
}
}}});