dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.common"],["require","dojox.gfx"]],defineResource:function(B){if(!B._hasResource["dojox.charting.axis2d.common"]){B._hasResource["dojox.charting.axis2d.common"]=true;
B.provide("dojox.charting.axis2d.common");
B.require("dojox.gfx");
(function(){var A=dojox.gfx;
B.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(O,P,R,K,L,M,Q,N){return P.createText({x:R,y:K,text:M,align:L}).setFont(Q).setFill(N)
},html:function(Z,d,W,X,b,U,Q,a){var R=B.doc.createElement("div"),S=R.style;
S.marginLeft="0px";
S.marginTop="0px";
S.marginRight="0px";
S.marginBottom="0px";
S.paddingLeft="0px";
S.paddingTop="0px";
S.paddingRight="0px";
S.paddingBottom="0px";
S.borderLeftWidth="0px";
S.borderTopWidth="0px";
S.borderRightWidth="0px";
S.borderBottomWidth="0px";
S.position="absolute";
S.font=Q;
R.innerHTML=U;
S.color=a;
Z.node.appendChild(R);
var V=Z.getCoords(),c=B.marginBox(R),T=A.normalizedLength(A.splitFontString(Q).size),Y=V.y+Math.floor(X-T);
switch(b){case"middle":B.marginBox(R,{l:V.x+Math.floor(W-c.w/2),t:Y});
break;
case"end":B.marginBox(R,{l:V.x+Math.floor(W-c.w),t:Y});
break;
default:B.marginBox(R,{l:V.x+Math.floor(W),t:Y});
break
}return R
}}})
})()
}}});