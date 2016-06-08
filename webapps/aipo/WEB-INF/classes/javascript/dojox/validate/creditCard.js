if(!dojo._hasResource["dojox.validate.creditCard"]){dojo._hasResource["dojox.validate.creditCard"]=true;
dojo.provide("dojox.validate.creditCard");
dojo.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(D,C){if(D&&C&&((C.toLowerCase()=="er"||dojox.validate.isValidLuhn(D))&&(dojox.validate.isValidCreditCardNumber(D,C.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(H,J){if(typeof H!="string"){H=String(H)
}H=H.replace(/[- ]/g,"");
var F=[];
var I={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(J&&dojo.indexOf(I,J.toLowerCase())){return Boolean(H.match(I[J.toLowerCase()]))
}else{for(var G in I){if(H.match("^"+I[G]+"$")!=null){F.push(G)
}}return(F.length)?F.join("|"):false
}};
dojox.validate.isValidCvv=function(G,H){if(typeof G!="string"){G=String(G)
}var F;
switch(H.toLowerCase()){case"mc":case"ec":case"vi":case"di":F="###";
break;
case"ax":F="####";
break;
default:return false
}var E={format:F};
if((G.length==F.length)&&(dojox.validate.isNumberFormat(G,E))){return true
}return false
}
};