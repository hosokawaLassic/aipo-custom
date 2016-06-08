if(!dojo._hasResource["dojox.validate.ca"]){dojo._hasResource["dojox.validate.ca"]=true;
dojo.provide("dojox.validate.ca");
dojo.require("dojox.validate._base");
dojox.validate.ca.isPhoneNumber=function(B){return dojox.validate.us.isPhoneNumber(B)
};
dojox.validate.ca.isProvince=function(D){var C=new RegExp("^"+dojox.regexp.ca.province()+"$","i");
return C.test(D)
};
dojox.validate.ca.isSocialInsuranceNumber=function(D){var C={format:["###-###-###","### ### ###","#########"]};
return dojox.validate.isNumberFormat(D,C)
};
dojox.validate.ca.isPostalCode=function(D){var C=new RegExp("^"+dojox.regexp.ca.postalCode()+"$","i");
return C.test(D)
}
};