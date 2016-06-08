dojo._xdResourceLoaded({depends:[["provide","dojox.fx.style"],["require","dojox.fx._base"]],defineResource:function(B){if(!B._hasResource["dojox.fx.style"]){B._hasResource["dojox.fx.style"]=true;
B.provide("dojox.fx.style");
B.experimental("dojox.fx.style");
B.require("dojox.fx._base");
dojox.fx.addClass=function(L){var H=(L.node=B.byId(L.node));
var I=(function(){var C=H;
return function(){B.addClass(C,L.cssClass);
C.style.cssText=A
}
})();
var K=dojox.fx._getCalculatedStyleChanges(L,true);
var A=H.style.cssText;
var J=B.animateProperty(B.mixin({properties:K},L));
B.connect(J,"onEnd",J,I);
return J
};
dojox.fx.removeClass=function(K){var H=(K.node=B.byId(K.node));
var L=(function(){var C=H;
return function(){B.removeClass(C,K.cssClass);
C.style.cssText=A
}
})();
var J=dojox.fx._getCalculatedStyleChanges(K,false);
var A=H.style.cssText;
var I=B.animateProperty(B.mixin({properties:J},K));
B.connect(I,"onEnd",I,L);
return I
};
dojox.fx.toggleClass=function(E,F,A){if(typeof A=="undefined"){A=!B.hasClass(E,F)
}return dojox.fx[(A?"addClass":"removeClass")]({node:E,cssClass:F})
};
dojox.fx._allowedProperties=["width","height","left","top","right","bottom","backgroundColor","color","borderBottomColor","borderBottomWidth","borderTopColor","borderTopWidth","borderLeftColor","borderLeftWidth","borderRightColor","borderRightWidth","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginTop","marginRight","marginBottom","lineHeight","letterSpacing","fontSize"];
dojox.fx._getStyleSnapshot=function(A){return B.map(dojox.fx._allowedProperties,function(D){return A[D]
})
};
dojox.fx._getCalculatedStyleChanges=function(N,J){var K=(N.node=B.byId(N.node));
var A=B.getComputedStyle(K);
var P=dojox.fx._getStyleSnapshot(A);
B[(J?"addClass":"removeClass")](K,N.cssClass);
var L=dojox.fx._getStyleSnapshot(A);
B[(J?"removeClass":"addClass")](K,N.cssClass);
var O={};
var M=0;
B.forEach(dojox.fx._allowedProperties,function(C){if(P[M]!=L[M]){O[C]={end:parseInt(L[M])}
}M++
});
return O
}
}}});