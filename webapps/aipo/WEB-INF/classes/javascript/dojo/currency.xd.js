dojo._xdResourceLoaded({depends:[["provide","dojo.currency"],["require","dojo.number"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh","ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh"],["require","dojo.cldr.monetary"]],defineResource:function(B){if(!B._hasResource["dojo.currency"]){B._hasResource["dojo.currency"]=true;
B.provide("dojo.currency");
B.require("dojo.number");
B.require("dojo.i18n");
B.require("dojo.cldr.monetary");
B.currency._mixInDefaults=function(G){G=G||{};
G.type="currency";
var H=B.i18n.getLocalization("dojo.cldr","currency",G.locale)||{};
var F=G.currency;
var A=B.cldr.monetary.getData(F);
B.forEach(["displayName","symbol","group","decimal"],function(C){A[C]=H[F+"_"+C]
});
A.fractional=[true,false];
return B.mixin(A,G)
};
B.currency.format=function(A,D){return B.number.format(A,B.currency._mixInDefaults(D))
};
B.currency.regexp=function(A){return B.number.regexp(B.currency._mixInDefaults(A))
};
B.currency.parse=function(A,D){return B.number.parse(A,B.currency._mixInDefaults(D))
}
}}});