dojo._xdResourceLoaded({depends:[["provide","dojox.validate._base"],["require","dojo.regexp"],["require","dojo.number"],["require","dojox.validate.regexp"]],defineResource:function(B){if(!B._hasResource["dojox.validate._base"]){B._hasResource["dojox.validate._base"]=true;
B.provide("dojox.validate._base");
B.require("dojo.regexp");
B.require("dojo.number");
B.require("dojox.validate.regexp");
dojox.validate.isText=function(A,D){D=(typeof D=="object")?D:{};
if(/^\s*$/.test(A)){return false
}if(typeof D.length=="number"&&D.length!=A.length){return false
}if(typeof D.minlength=="number"&&D.minlength>A.length){return false
}if(typeof D.maxlength=="number"&&D.maxlength<A.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(I,M){I=B.number.parse(I,M);
if(isNaN(I)){return false
}M=(typeof M=="object")?M:{};
var N=(typeof M.max=="number")?M.max:Infinity;
var K=(typeof M.min=="number")?M.min:-Infinity;
var A=(typeof M.decimal=="string")?M.decimal:".";
var L=dojox.validate._isInRangeCache;
var J=I+"max"+N+"min"+K+"dec"+A;
if(typeof L[J]!="undefined"){return L[J]
}if(I<K||I>N){L[J]=false;
return false
}L[J]=true;
return true
};
dojox.validate.isNumberFormat=function(A,F){var E=new RegExp("^"+dojox.regexp.numberFormat(F)+"$","i");
return E.test(A)
};
dojox.validate.isValidLuhn=function(A){var H,G,J;
if(typeof A!="string"){A=String(A)
}A=A.replace(/[- ]/g,"");
G=A.length%2;
H=0;
for(var I=0;
I<A.length;
I++){J=parseInt(A.charAt(I));
if(I%2==G){J*=2
}if(J>9){J-=9
}H+=J
}return !(H%10)
}
}}});