dojo._xdResourceLoaded({depends:[["provide","dojox.validate.web"],["require","dojox.validate._base"]],defineResource:function(B){if(!B._hasResource["dojox.validate.web"]){B._hasResource["dojox.validate.web"]=true;
B.provide("dojox.validate.web");
B.require("dojox.validate._base");
dojox.validate.isIpAddress=function(A,F){var E=new RegExp("^"+dojox.regexp.ipAddress(F)+"$","i");
return E.test(A)
};
dojox.validate.isUrl=function(A,F){var E=new RegExp("^"+dojox.regexp.url(F)+"$","i");
return E.test(A)
};
dojox.validate.isEmailAddress=function(A,F){var E=new RegExp("^"+dojox.regexp.emailAddress(F)+"$","i");
return E.test(A)
};
dojox.validate.isEmailAddressList=function(A,F){var E=new RegExp("^"+dojox.regexp.emailAddressList(F)+"$","i");
return E.test(A)
};
dojox.validate.getEmailAddressList=function(A,D){if(!D){D={}
}if(!D.listSeparator){D.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(A,D)){return A.split(new RegExp("\\s*["+D.listSeparator+"]\\s*"))
}return[]
}
}}});