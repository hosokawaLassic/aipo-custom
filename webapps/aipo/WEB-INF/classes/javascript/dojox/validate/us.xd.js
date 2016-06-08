dojo._xdResourceLoaded({depends:[["provide","dojox.validate.us"],["require","dojox.validate._base"]],defineResource:function(B){if(!B._hasResource["dojox.validate.us"]){B._hasResource["dojox.validate.us"]=true;
B.provide("dojox.validate.us");
B.require("dojox.validate._base");
dojox.validate.us.isState=function(A,F){var E=new RegExp("^"+dojox.regexp.us.state(F)+"$","i");
return E.test(A)
};
dojox.validate.us.isPhoneNumber=function(A){var D={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(A,D)
};
dojox.validate.us.isSocialSecurityNumber=function(A){var D={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(A,D)
};
dojox.validate.us.isZipCode=function(A){var D={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(A,D)
}
}}});