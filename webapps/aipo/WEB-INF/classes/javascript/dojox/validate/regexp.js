if(!dojo._hasResource["dojox.validate.regexp"]){dojo._hasResource["dojox.validate.regexp"]=true;
dojo.provide("dojox.validate.regexp");
dojo.require("dojo.regexp");
dojox.regexp={ca:{},us:{}};
dojox.regexp.tld=function(K){K=(typeof K=="object")?K:{};
if(typeof K.allowCC!="boolean"){K.allowCC=true
}if(typeof K.allowInfra!="boolean"){K.allowInfra=true
}if(typeof K.allowGeneric!="boolean"){K.allowGeneric=true
}var H="arpa";
var I="aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post";
var J="ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw";
var L=[];
if(K.allowInfra){L.push(H)
}if(K.allowGeneric){L.push(I)
}if(K.allowCC){L.push(J)
}var G="";
if(L.length>0){G="("+L.join("|")+")"
}return G
};
dojox.regexp.ipAddress=function(L){L=(typeof L=="object")?L:{};
if(typeof L.allowDottedDecimal!="boolean"){L.allowDottedDecimal=true
}if(typeof L.allowDottedHex!="boolean"){L.allowDottedHex=true
}if(typeof L.allowDottedOctal!="boolean"){L.allowDottedOctal=true
}if(typeof L.allowDecimal!="boolean"){L.allowDecimal=true
}if(typeof L.allowHex!="boolean"){L.allowHex=true
}if(typeof L.allowIPv6!="boolean"){L.allowIPv6=true
}if(typeof L.allowHybrid!="boolean"){L.allowHybrid=true
}var Q="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var N="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var T="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var K="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var M="0[xX]0*[\\da-fA-F]{1,8}";
var O="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var P="([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var R=[];
if(L.allowDottedDecimal){R.push(Q)
}if(L.allowDottedHex){R.push(N)
}if(L.allowDottedOctal){R.push(T)
}if(L.allowDecimal){R.push(K)
}if(L.allowHex){R.push(M)
}if(L.allowIPv6){R.push(O)
}if(L.allowHybrid){R.push(P)
}var S="";
if(R.length>0){S="("+R.join("|")+")"
}return S
};
dojox.regexp.host=function(E){E=(typeof E=="object")?E:{};
if(typeof E.allowIP!="boolean"){E.allowIP=true
}if(typeof E.allowLocal!="boolean"){E.allowLocal=false
}if(typeof E.allowPort!="boolean"){E.allowPort=true
}var F="([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+"+dojox.regexp.tld(E);
var G=(E.allowPort)?"(\\:"+dojox.regexp.integer({signed:false})+")?":"";
var H=F;
if(E.allowIP){H+="|"+dojox.regexp.ipAddress(E)
}if(E.allowLocal){H+="|localhost"
}return"("+H+")"+G
};
dojox.regexp.url=function(F){F=(typeof F=="object")?F:{};
if(typeof F.scheme=="undefined"){F.scheme=[true,false]
}var E=dojo.regexp.buildGroupRE(F.scheme,function(A){if(A){return"(https?|ftps?)\\://"
}return""
});
var D="(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?";
return E+dojox.regexp.host(F)+D
};
dojox.regexp.emailAddress=function(D){D=(typeof D=="object")?D:{};
if(typeof D.allowCruft!="boolean"){D.allowCruft=false
}D.allowPort=false;
var F="([\\da-zA-Z]+[-._+&'])*[\\da-zA-Z]+";
var E=F+"@"+dojox.regexp.host(D);
if(D.allowCruft){E="<?(mailto\\:)?"+E+">?"
}return E
};
dojox.regexp.emailAddressList=function(D){D=(typeof D=="object")?D:{};
if(typeof D.listSeparator!="string"){D.listSeparator="\\s;,"
}var E=dojox.regexp.emailAddress(D);
var F="("+E+"\\s*["+D.listSeparator+"]\\s*)*"+E+"\\s*["+D.listSeparator+"]?\\s*";
return F
};
dojox.regexp.us.state=function(H){H=(typeof H=="object")?H:{};
if(typeof H.allowTerritories!="boolean"){H.allowTerritories=true
}if(typeof H.allowMilitary!="boolean"){H.allowMilitary=true
}var G="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var E="AS|FM|GU|MH|MP|PW|PR|VI";
var F="AA|AE|AP";
if(H.allowTerritories){G+="|"+E
}if(H.allowMilitary){G+="|"+F
}return"("+G+")"
};
dojox.regexp.ca.postalCode=function(){var B="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]";
return"("+B+")"
};
dojox.regexp.ca.province=function(){var B="AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";
return"("+statesRE+")"
};
dojox.regexp.numberFormat=function(C){C=(typeof C=="object")?C:{};
if(typeof C.format=="undefined"){C.format="###-###-####"
}var D=function(A){A=dojo.regexp.escapeString(A,"?");
A=A.replace(/\?/g,"\\d?");
A=A.replace(/#/g,"\\d");
return A
};
return dojo.regexp.buildGroupRE(C.format,D)
}
};