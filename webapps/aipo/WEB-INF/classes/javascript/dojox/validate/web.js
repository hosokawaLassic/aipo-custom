if(!dojo._hasResource["dojox.validate.web"]){dojo._hasResource["dojox.validate.web"]=true;
dojo.provide("dojox.validate.web");
dojo.require("dojox.validate._base");
dojox.validate.isIpAddress=function(E,D){var F=new RegExp("^"+dojox.regexp.ipAddress(D)+"$","i");
return F.test(E)
};
dojox.validate.isUrl=function(E,D){var F=new RegExp("^"+dojox.regexp.url(D)+"$","i");
return F.test(E)
};
dojox.validate.isEmailAddress=function(E,D){var F=new RegExp("^"+dojox.regexp.emailAddress(D)+"$","i");
return F.test(E)
};
dojox.validate.isEmailAddressList=function(E,D){var F=new RegExp("^"+dojox.regexp.emailAddressList(D)+"$","i");
return F.test(E)
};
dojox.validate.getEmailAddressList=function(D,C){if(!C){C={}
}if(!C.listSeparator){C.listSeparator="\\s;,"
}if(dojox.validate.isEmailAddressList(D,C)){return D.split(new RegExp("\\s*["+C.listSeparator+"]\\s*"))
}return[]
}
};