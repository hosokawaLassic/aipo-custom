if(!dojo._hasResource["dojox.fx.style"]){dojo._hasResource["dojox.fx.style"]=true;
dojo.provide("dojox.fx.style");
dojo.experimental("dojox.fx.style");
dojo.require("dojox.fx._base");
dojox.fx.addClass=function(G){var I=(G.node=dojo.byId(G.node));
var J=(function(){var A=I;
return function(){dojo.addClass(A,G.cssClass);
A.style.cssText=H
}
})();
var L=dojox.fx._getCalculatedStyleChanges(G,true);
var H=I.style.cssText;
var K=dojo.animateProperty(dojo.mixin({properties:L},G));
dojo.connect(K,"onEnd",K,J);
return K
};
dojox.fx.removeClass=function(L){var I=(L.node=dojo.byId(L.node));
var G=(function(){var A=I;
return function(){dojo.removeClass(A,L.cssClass);
A.style.cssText=H
}
})();
var K=dojox.fx._getCalculatedStyleChanges(L,false);
var H=I.style.cssText;
var J=dojo.animateProperty(dojo.mixin({properties:K},L));
dojo.connect(J,"onEnd",J,G);
return J
};
dojox.fx.toggleClass=function(F,D,E){if(typeof E=="undefined"){E=!dojo.hasClass(F,D)
}return dojox.fx[(E?"addClass":"removeClass")]({node:F,cssClass:D})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(B){return dojo.map(dojox.fx._allowedProperties,function(A){return B[A]
})
};
dojox.fx._getCalculatedStyleChanges=function(O,K){var L=(O.node=dojo.byId(O.node));
var J=dojo.getComputedStyle(L);
var I=dojox.fx._getStyleSnapshot(J);
dojo[(K?"addClass":"removeClass")](L,O.cssClass);
var M=dojox.fx._getStyleSnapshot(J);
dojo[(K?"removeClass":"addClass")](L,O.cssClass);
var P={};
var N=0;
dojo.forEach(dojox.fx._allowedProperties,function(A){if(I[N]!=M[N]){P[A]={end:parseInt(M[N])}
}N++
});
return P
}
};