if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.place");
dojo.require("dijit._base.window");
dijit.popup=new function(){var D=[],F=1000,E=1;
this.open=function(C){var N=C.popup,O=C.orient||{BL:"TL",TL:"BL"},B=C.around,S=(C.around&&C.around.id)?(C.around.id+"_dropdown"):("popup_"+E++);
var T=dojo.doc.createElement("div");
T.id=S;
T.className="dijitPopup";
T.style.zIndex=F+D.length;
T.style.visibility="hidden";
if(C.parent){T.dijitPopupParent=C.parent.id
}dojo.body().appendChild(T);
N.domNode.style.display="";
T.appendChild(N.domNode);
var P=new dijit.BackgroundIframe(T);
var Q=B?dijit.placeOnScreenAroundElement(T,B,O,N.orient?dojo.hitch(N,"orient"):null):dijit.placeOnScreen(T,C,O=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
T.style.visibility="visible";
var R=[];
function A(){for(var G=D.length-1;
G>0&&D[G].parent===D[G-1].widget;
G--){}return D[G]
}R.push(dojo.connect(T,"onkeypress",this,function(H){if(H.keyCode==dojo.keys.ESCAPE&&C.onCancel){C.onCancel()
}else{if(H.keyCode==dojo.keys.TAB){dojo.stopEvent(H);
var G=A();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(N.onCancel){R.push(dojo.connect(N,"onCancel",null,C.onCancel))
}R.push(dojo.connect(N,N.onExecute?"onExecute":"onChange",null,function(){var G=A();
if(G&&G.onExecute){G.onExecute()
}}));
D.push({wrapper:T,iframe:P,widget:N,parent:C.parent,onExecute:C.onExecute,onCancel:C.onCancel,onClose:C.onClose,handlers:R});
if(N.onOpen){N.onOpen(Q)
}return Q
};
this.close=function(K){while(dojo.some(D,function(G){return G.widget==K
})){var B=D.pop(),A=B.wrapper,J=B.iframe,C=B.widget,L=B.onClose;
if(C.onClose){C.onClose()
}dojo.forEach(B.handlers,dojo.disconnect);
if(!C||!C.domNode){return 
}dojo.style(C.domNode,"display","none");
dojo.body().appendChild(C.domNode);
J.destroy();
dojo._destroyElement(A);
if(L){L()
}}}
}();
dijit._frames=new function(){var B=[];
this.pop=function(){var A;
if(B.length){A=B.pop();
A.style.display=""
}else{if(dojo.isIE){var D="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
A=dojo.doc.createElement(D)
}else{var A=dojo.doc.createElement("iframe");
A.src='javascript:""';
A.className="dijitBackgroundIframe"
}A.tabIndex=-1;
dojo.body().appendChild(A)
}return A
};
this.push=function(A){A.style.display="";
if(dojo.isIE){A.style.removeExpression("width");
A.style.removeExpression("height")
}B.push(A)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var B=dijit._frames;
dojo.forEach([B.pop()],B.push)
})
}dijit.BackgroundIframe=function(D){if(!D.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var C=dijit._frames.pop();
D.appendChild(C);
if(dojo.isIE){C.style.setExpression("width","document.getElementById('"+D.id+"').offsetWidth");
C.style.setExpression("height","document.getElementById('"+D.id+"').offsetHeight")
}this.iframe=C
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
};