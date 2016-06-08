dojo._xdResourceLoaded({depends:[["provide","dojox.validate.regexp"],["require","dojo.regexp"]],defineResource:function(B){if(!B._hasResource["dojox.validate.regexp"]){B._hasResource["dojox.validate.regexp"]=true;
B.provide("dojox.validate.regexp");
B.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(J){J=(typeof J=="object")?J:{};
if(typeof J.allowCC!="boolean"){J.allowCC=true
}if(typeof J.allowInfra!="boolean"){J.allowInfra=true
}if(typeof J.allowGeneric!="boolean"){J.allowGeneric=true
}var A="arpa";
var H="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var I="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var K=[];
if(J.allowInfra){K.push(A)
}if(J.allowGeneric){K.push(H)
}if(J.allowCC){K.push(I)
}var L="";
if(K.length>0){L="("+K.join("|")+")"
}return L
};
dojox.regexp.ipAddress=function(A){A=(typeof A=="object")?A:{};
if(typeof A.allowDottedDecimal!="boolean"){A.allowDottedDecimal=true
}if(typeof A.allowDottedHex!="boolean"){A.allowDottedHex=true
}if(typeof A.allowDottedOctal!="boolean"){A.allowDottedOctal=true
}if(typeof A.allowDecimal!="boolean"){A.allowDecimal=true
}if(typeof A.allowHex!="boolean"){A.allowHex=true
}if(typeof A.allowIPv6!="boolean"){A.allowIPv6=true
}if(typeof A.allowHybrid!="boolean"){A.allowHybrid=true
}var P="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var M="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var S="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var T="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var L="0[xX]0*[\\da-fA-F]{1,8}";
var N="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var O="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var Q=[];
if(A.allowDottedDecimal){Q.push(P)
}if(A.allowDottedHex){Q.push(M)
}if(A.allowDottedOctal){Q.push(S)
}if(A.allowDecimal){Q.push(T)
}if(A.allowHex){Q.push(L)
}if(A.allowIPv6){Q.push(N)
}if(A.allowHybrid){Q.push(O)
}var R="";
if(Q.length>0){R="("+Q.join("|")+")"
}return R
};
dojox.regexp.host=function(H){H=(typeof H=="object")?H:{};
if(typeof H.allowIP!="boolean"){H.allowIP=true
}if(typeof H.allowLocal!="boolean"){H.allowLocal=false
}if(typeof H.allowPort!="boolean"){H.allowPort=true
}var A="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(H);
var F=(H.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var G=A;
if(H.allowIP){G+="|"+dojox.regexp.ipAddress(H)
}if(H.allowLocal){G+="|localhost"
}return"("+G+")"+F
};
dojox.regexp.url=function(E){E=(typeof E=="object")?E:{};
if(typeof E.scheme=="undefined"){E.scheme=[true,false]
}var A=B.regexp.buildGroupRE(E.scheme,function(C){if(C){return"(https?|ftps?)\\://"
}return""
});
var F="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return A+dojox.regexp.host(E)+F
};
dojox.regexp.emailAddress=function(F){F=(typeof F=="object")?F:{};
if(typeof F.allowCruft!="boolean"){F.allowCruft=false
}F.allowPort=false;
var E="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var A=E+"@"+dojox.regexp.host(F);
if(F.allowCruft){A="<?(mailto\\:)?"+A+">?"
}return A
};
dojox.regexp.emailAddressList=function(F){F=(typeof F=="object")?F:{};
if(typeof F.listSeparator!="string"){F.listSeparator="\\s;,"
}var A=dojox.regexp.emailAddress(F);
var E="("+A+"\\s*["+F.listSeparator+"]\\s*)*"+A+"\\s*["+F.listSeparator+"]?\\s*";
return E
};
dojox.regexp.us.state=function(G){G=(typeof G=="object")?G:{};
if(typeof G.allowTerritories!="boolean"){G.allowTerritories=true
}if(typeof G.allowMilitary!="boolean"){G.allowMilitary=true
}var F="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var H="AS|FM|GU|MH|MP|PW|PR|VI";
var A="AA|AE|AP";
if(G.allowTerritories){F+="|"+H
}if(G.allowMilitary){F+="|"+A
}return"("+F+")"
};
dojox.regexp.ca.postalCode=function(){var A="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+A+")"
};
dojox.regexp.ca.province=function(){var A="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(D){D=(typeof D=="object")?D:{};
if(typeof D.format=="undefined"){D.format="###-###-####"
}var A=function(C){C=B.regexp.escapeString(C,"?");
C=C.replace(/\?/g,"\\d?");
C=C.replace(/#/g,"\\d");
return C
};
return B.regexp.buildGroupRE(D.format,A)
}
}}});