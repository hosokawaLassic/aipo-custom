if(!dojo._hasResource["dojox.validate._base"]){dojo._hasResource["dojox.validate._base"]=true;
dojo.provide("dojox.validate._base");
dojo.require("dojo.regexp");
dojo.require("dojo.number");
dojo.require("dojox.validate.regexp");
dojox.validate.isText=function(D,C){C=(typeof C=="object")?C:{};
if(/^\s*$/.test(D)){return false
}if(typeof C.length=="number"&&C.length!=D.length){return false
}if(typeof C.minlength=="number"&&C.minlength>D.length){return false
}if(typeof C.maxlength=="number"&&C.maxlength<D.length){return false
}return true
};
dojox.validate._isInRangeCache={};
dojox.validate.isInRange=function(J,N){J=dojo.number.parse(J,N);
if(isNaN(J)){return false
}N=(typeof N=="object")?N:{};
var H=(typeof N.max=="number")?N.max:Infinity;
var L=(typeof N.min=="number")?N.min:-Infinity;
var I=(typeof N.decimal=="string")?N.decimal:".";
var M=dojox.validate._isInRangeCache;
var K=J+"max"+H+"min"+L+"dec"+I;
if(typeof M[K]!="undefined"){return M[K]
}if(J<L||J>H){M[K]=false;
return false
}M[K]=true;
return true
};
dojox.validate.isNumberFormat=function(E,D){var F=new RegExp("^"+dojox.regexp.numberFormat(D)+"$","i");
return F.test(E)
};
dojox.validate.isValidLuhn=function(G){var I,H,F;
if(typeof G!="string"){G=String(G)
}G=G.replace(/[- ]/g,"");
H=G.length%2;
I=0;
for(var J=0;
J<G.length;
J++){F=parseInt(G.charAt(J));
if(J%2==H){F*=2
}if(F>9){F-=9
}I+=F
}return !(I%10)
}
};