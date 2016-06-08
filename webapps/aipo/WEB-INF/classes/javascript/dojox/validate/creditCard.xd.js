dojo._xdResourceLoaded({depends:[["provide","dojox.validate.creditCard"],["require","dojox.validate._base"]],defineResource:function(B){if(!B._hasResource["dojox.validate.creditCard"]){B._hasResource["dojox.validate.creditCard"]=true;
B.provide("dojox.validate.creditCard");
B.require("dojox.validate._base");
dojox.validate.isValidCreditCard=function(A,D){if(A&&D&&((D.toLowerCase()=="er"||dojox.validate.isValidLuhn(A))&&(dojox.validate.isValidCreditCardNumber(A,D.toLowerCase())))){return true
}return false
};
dojox.validate.isValidCreditCardNumber=function(G,I){if(typeof G!="string"){G=String(G)
}G=G.replace(/[- ]/g,"");
var J=[];
var H={mc:"5[1-5][0-9]{14}",ec:"5[1-5][0-9]{14}",vi:"4([0-9]{12}|[0-9]{15})",ax:"3[47][0-9]{13}",dc:"3(0[0-5][0-9]{11}|[68][0-9]{12})",bl:"3(0[0-5][0-9]{11}|[68][0-9]{12})",di:"6011[0-9]{12}",jcb:"(3[0-9]{15}|(2131|1800)[0-9]{11})",er:"2(014|149)[0-9]{11}"};
if(I&&B.indexOf(H,I.toLowerCase())){return Boolean(G.match(H[I.toLowerCase()]))
}else{for(var A in H){if(G.match("^"+H[A]+"$")!=null){J.push(A)
}}return(J.length)?J.join("|"):false
}};
dojox.validate.isValidCvv=function(F,G){if(typeof F!="string"){F=String(F)
}var A;
switch(G.toLowerCase()){case"mc":case"ec":case"vi":case"di":A="###";
break;
case"ax":A="####";
break;
default:return false
}var H={format:A};
if((F.length==A.length)&&(dojox.validate.isNumberFormat(F,H))){return true
}return false
}
}}});