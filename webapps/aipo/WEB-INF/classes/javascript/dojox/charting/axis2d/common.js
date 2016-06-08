if(!dojo._hasResource["dojox.charting.axis2d.common"]){dojo._hasResource["dojox.charting.axis2d.common"]=true;
dojo.provide("dojox.charting.axis2d.common");
dojo.require("dojox.gfx");
(function(){var B=dojox.gfx;
dojo.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(M,N,P,A,J,K,O,L){return N.createText({x:P,y:A,text:K,align:J}).setFont(O).setFill(L)
},html:function(Y,A,V,W,a,T,P,Z){var Q=dojo.doc.createElement("div"),R=Q.style;
R.marginLeft="0px";
R.marginTop="0px";
R.marginRight="0px";
R.marginBottom="0px";
R.paddingLeft="0px";
R.paddingTop="0px";
R.paddingRight="0px";
R.paddingBottom="0px";
R.borderLeftWidth="0px";
R.borderTopWidth="0px";
R.borderRightWidth="0px";
R.borderBottomWidth="0px";
R.position="absolute";
R.font=P;
Q.innerHTML=T;
R.color=Z;
Y.node.appendChild(Q);
var U=Y.getCoords(),b=dojo.marginBox(Q),S=B.normalizedLength(B.splitFontString(P).size),X=U.y+Math.floor(W-S);
switch(a){case"middle":dojo.marginBox(Q,{l:U.x+Math.floor(V-b.w/2),t:X});
break;
case"end":dojo.marginBox(Q,{l:U.x+Math.floor(V-b.w),t:X});
break;
default:dojo.marginBox(Q,{l:U.x+Math.floor(V),t:X});
break
}return Q
}}})
})()
};