if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var E=dojo.global;
var D=dojo.doc;
if(D.selection){return !D.selection.createRange().text
}else{if(E.getSelection){var F=E.getSelection();
if(dojo.isString(F)){return !F
}else{return F.isCollapsed||!F.toString()
}}}},getBookmark:function(){var E,F=dojo.doc.selection;
if(F){var D=F.createRange();
if(F.type.toUpperCase()=="CONTROL"){E=D.length?dojo._toArray(D):null
}else{E=D.getBookmark()
}}else{if(dojo.global.getSelection){F=dojo.global.getSelection();
if(F){var D=F.getRangeAt(0);
E=D.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return E
},moveToBookmark:function(F){var E=dojo.doc;
if(E.selection){var H;
if(dojo.isArray(F)){H=E.body.createControlRange();
dojo.forEach(F,H.addElement)
}else{H=E.selection.createRange();
H.moveToBookmark(F)
}H.select()
}else{var G=dojo.global.getSelection&&dojo.global.getSelection();
if(G&&G.removeAllRanges){G.removeAllRanges();
G.addRange(F)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(D,C){return{node:D&&dojo.isDescendant(dijit._curFocus,D.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(C||dojo.global,dijit.isCollapsed)?dojo.withGlobal(C||dojo.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(J){if(!J){return 
}var K="node" in J?J.node:J,L=J.bookmark,G=J.openedForWindow;
if(K){var H=(K.tagName.toLowerCase()=="iframe")?K.contentWindow:K;
if(H&&H.focus){try{H.focus()
}catch(I){}}dijit._onFocusNode(K)
}if(L&&dojo.withGlobal(G||dojo.global,dijit.isCollapsed)){if(G){G.focus()
}try{dojo.withGlobal(G||dojo.global,moveToBookmark,null,[L])
}catch(I){}}},_activeStack:[],registerWin:function(D){if(!D){D=window
}dojo.connect(D.document,"onmousedown",null,function(A){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(A.target||A.srcElement)
});
var C=D.document.body||D.document.getElementsByTagName("body")[0];
if(C){if(dojo.isIE){C.attachEvent("onactivate",function(A){if(A.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(A.srcElement)
}});
C.attachEvent("ondeactivate",function(A){dijit._onBlurNode(A.srcElement)
})
}else{C.addEventListener("focus",function(A){dijit._onFocusNode(A.target)
},true);
C.addEventListener("blur",function(A){dijit._onBlurNode(A.target)
},true)
}}C=null
},_onBlurNode:function(D){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var C=dijit.getEnclosingWidget(D);
if(C&&C._setStateClass){C._focused=false;
C._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(H){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var E=[];
try{while(H){if(H.dijitPopupParent){H=dijit.byId(H.dijitPopupParent).domNode
}else{if(H.tagName&&H.tagName.toLowerCase()=="body"){if(H===dojo.body()){break
}H=dojo.query("iframe").filter(function(A){return A.contentDocument.body===H
})[0]
}else{var F=H.getAttribute&&H.getAttribute("widgetId");
if(F){E.unshift(F)
}H=H.parentNode
}}}}catch(G){}dijit._setStack(E)
},_onFocusNode:function(D){if(D&&D.tagName&&D.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(D);
if(D==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=D;
dojo.publish("focusNode",[D]);
var C=dijit.getEnclosingWidget(D);
if(C&&C._setStateClass){C._focused=true;
C._setStateClass()
}},_setStack:function(F){var G=dijit._activeStack;
dijit._activeStack=F;
for(var I=0;
I<Math.min(G.length,F.length);
I++){if(G[I]!=F[I]){break
}}for(var J=G.length-1;
J>=I;
J--){var H=dijit.byId(G[J]);
if(H){dojo.publish("widgetBlur",[H]);
if(H._onBlur){H._onBlur()
}}}for(var J=I;
J<F.length;
J++){var H=dijit.byId(F[J]);
if(H){dojo.publish("widgetFocus",[H]);
if(H._onFocus){H._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
};