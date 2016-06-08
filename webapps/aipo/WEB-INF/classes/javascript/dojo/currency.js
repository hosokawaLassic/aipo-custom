if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.require("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","currency",null,"ROOT,de,en,en-au,en-ca,en-us,es,fr,it,ja,ko,pt,zh");
dojo.require("dojo.cldr.monetary");
dojo.currency._mixInDefaults=function(H){H=H||{};
H.type="currency";
var E=dojo.i18n.getLocalization("dojo.cldr","currency",H.locale)||{};
var G=H.currency;
var F=dojo.cldr.monetary.getData(G);
dojo.forEach(["displayName","symbol","group","decimal"],function(A){F[A]=E[G+"_"+A]
});
F.fractional=[true,false];
return dojo.mixin(F,H)
};
dojo.currency.format=function(D,C){return dojo.number.format(D,dojo.currency._mixInDefaults(C))
};
dojo.currency.regexp=function(B){return dojo.number.regexp(dojo.currency._mixInDefaults(B))
};
dojo.currency.parse=function(D,C){return dojo.number.parse(D,dojo.currency._mixInDefaults(C))
}
};