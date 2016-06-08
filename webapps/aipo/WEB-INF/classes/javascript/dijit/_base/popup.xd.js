dojo._xdResourceLoaded({depends:[["provide","dijit._base.popup"],["require","dijit._base.focus"],["require","dijit._base.place"],["require","dijit._base.window"]],defineResource:function(B){if(!B._hasResource["dijit._base.popup"]){B._hasResource["dijit._base.popup"]=true;
B.provide("dijit._base.popup");
B.require("dijit._base.focus");
B.require("dijit._base.place");
B.require("dijit._base.window");
dijit.popup=new function(){var F=[],E=1000,A=1;
this.open=function(D){var O=D.popup,P=D.orient||{BL:"TL",TL:"BL"},C=D.around,T=(D.around&&D.around.id)?(D.around.id+"_dropdown"):("popup_"+A++);
var U=B.doc.createElement("div");
U.id=T;
U.className="dijitPopup";
U.style.zIndex=E+F.length;
U.style.visibility="hidden";
if(D.parent){U.dijitPopupParent=D.parent.id
}B.body().appendChild(U);
O.domNode.style.display="";
U.appendChild(O.domNode);
var Q=new dijit.BackgroundIframe(U);
var R=C?dijit.placeOnScreenAroundElement(U,C,P,O.orient?B.hitch(O,"orient"):null):dijit.placeOnScreen(U,D,P=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
U.style.visibility="visible";
var S=[];
function V(){for(var G=F.length-1;
G>0&&F[G].parent===F[G-1].widget;
G--){}return F[G]
}S.push(B.connect(U,"onkeypress",this,function(H){if(H.keyCode==B.keys.ESCAPE&&D.onCancel){D.onCancel()
}else{if(H.keyCode==B.keys.TAB){B.stopEvent(H);
var G=V();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(O.onCancel){S.push(B.connect(O,"onCancel",null,D.onCancel))
}S.push(B.connect(O,O.onExecute?"onExecute":"onChange",null,function(){var G=V();
if(G&&G.onExecute){G.onExecute()
}}));
F.push({wrapper:U,iframe:Q,widget:O,parent:D.parent,onExecute:D.onExecute,onCancel:D.onCancel,onClose:D.onClose,handlers:S});
if(O.onOpen){O.onOpen(R)
}return R
};
this.close=function(M){while(B.some(F,function(G){return G.widget==M
})){var D=F.pop(),C=D.wrapper,L=D.iframe,K=D.widget,N=D.onClose;
if(K.onClose){K.onClose()
}B.forEach(D.handlers,B.disconnect);
if(!K||!K.domNode){return 
}B.style(K.domNode,"display","none");
B.body().appendChild(K.domNode);
L.destroy();
B._destroyElement(C);
if(N){N()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var E;
if(A.length){E=A.pop();
E.style.display=""
}else{if(B.isIE){var F="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
E=B.doc.createElement(F)
}else{var E=B.doc.createElement("iframe");
E.src='javascript:""';
E.className="dijitBackgroundIframe"
}E.tabIndex=-1;
B.body().appendChild(E)
}return E
};
this.push=function(D){D.style.display="";
if(B.isIE){D.style.removeExpression("width");
D.style.removeExpression("height")
}A.push(D)
}
}();
if(B.isIE&&B.isIE<7){B.addOnLoad(function(){var A=dijit._frames;
B.forEach([A.pop()],A.push)
})
}dijit.BackgroundIframe=function(A){if(!A.id){throw new Error("no id")
}if((B.isIE&&B.isIE<7)||(B.isFF&&B.isFF<3&&B.hasClass(B.body(),"dijit_a11y"))){var D=dijit._frames.pop();
A.appendChild(D);
if(B.isIE){D.style.setExpression("width","document.getElementById('"+A.id+"').offsetWidth");
D.style.setExpression("height","document.getElementById('"+A.id+"').offsetHeight")
}this.iframe=D
}};
B.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}}});