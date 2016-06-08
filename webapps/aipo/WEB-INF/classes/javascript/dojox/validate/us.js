if(!dojo._hasResource["dojox.validate.us"]){dojo._hasResource["dojox.validate.us"]=true;
dojo.provide("dojox.validate.us");
dojo.require("dojox.validate._base");
dojox.validate.us.isState=function(E,D){var F=new RegExp("^"+dojox.regexp.us.state(D)+"$","i");
return F.test(E)
};
dojox.validate.us.isPhoneNumber=function(D){var C={format:["###-###-####","(###) ###-####","(###) ### ####","###.###.####","###/###-####","### ### ####","###-###-#### x#???","(###) ###-#### x#???","(###) ### #### x#???","###.###.#### x#???","###/###-#### x#???","### ### #### x#???","##########"]};
return dojox.validate.isNumberFormat(D,C)
};
dojox.validate.us.isSocialSecurityNumber=function(D){var C={format:["###-##-####","### ## ####","#########"]};
return dojox.validate.isNumberFormat(D,C)
};
dojox.validate.us.isZipCode=function(D){var C={format:["#####-####","##### ####","#########","#####"]};
return dojox.validate.isNumberFormat(D,C)
}
};