dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"]],defineResource:function(B){if(!B._hasResource["dijit._base.focus"]){B._hasResource["dijit._base.focus"]=true;
B.provide("dijit._base.focus");
B.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var A=B.global;
var F=B.doc;
if(F.selection){return !F.selection.createRange().text
}else{if(A.getSelection){var E=A.getSelection();
if(B.isString(E)){return !E
}else{return E.isCollapsed||!E.toString()
}}}},getBookmark:function(){var A,E=B.doc.selection;
if(E){var F=E.createRange();
if(E.type.toUpperCase()=="CONTROL"){A=F.length?B._toArray(F):null
}else{A=F.getBookmark()
}}else{if(B.global.getSelection){E=B.global.getSelection();
if(E){var F=E.getRangeAt(0);
A=F.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return A
},moveToBookmark:function(A){var H=B.doc;
if(H.selection){var G;
if(B.isArray(A)){G=H.body.createControlRange();
B.forEach(A,G.addElement)
}else{G=H.selection.createRange();
G.moveToBookmark(A)
}G.select()
}else{var F=B.global.getSelection&&B.global.getSelection();
if(F&&F.removeAllRanges){F.removeAllRanges();
F.addRange(A)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,D){return{node:A&&B.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!B.withGlobal(D||B.global,dijit.isCollapsed)?B.withGlobal(D||B.global,dijit.getBookmark):null,openedForWindow:D}
},focus:function(I){if(!I){return 
}var J="node" in I?I.node:I,K=I.bookmark,L=I.openedForWindow;
if(J){var A=(J.tagName.toLowerCase()=="iframe")?J.contentWindow:J;
if(A&&A.focus){try{A.focus()
}catch(H){}}dijit._onFocusNode(J)
}if(K&&B.withGlobal(L||B.global,dijit.isCollapsed)){if(L){L.focus()
}try{B.withGlobal(L||B.global,moveToBookmark,null,[K])
}catch(H){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
}B.connect(A.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var D=A.document.body||A.document.getElementsByTagName("body")[0];
if(D){if(B.isIE){D.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
D.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{D.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
D.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}D=null
},_onBlurNode:function(A){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var D=dijit.getEnclosingWidget(A);
if(D&&D._setStateClass){D._focused=false;
D._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(G){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var H=[];
try{while(G){if(G.dijitPopupParent){G=dijit.byId(G.dijitPopupParent).domNode
}else{if(G.tagName&&G.tagName.toLowerCase()=="body"){if(G===B.body()){break
}G=B.query("iframe").filter(function(C){return C.contentDocument.body===G
})[0]
}else{var A=G.getAttribute&&G.getAttribute("widgetId");
if(A){H.unshift(A)
}G=G.parentNode
}}}}catch(F){}dijit._setStack(H)
},_onFocusNode:function(A){if(A&&A.tagName&&A.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(A);
if(A==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=A;
B.publish("focusNode",[A]);
var D=dijit.getEnclosingWidget(A);
if(D&&D._setStateClass){D._focused=true;
D._setStateClass()
}},_setStack:function(J){var A=dijit._activeStack;
dijit._activeStack=J;
for(var H=0;
H<Math.min(A.length,J.length);
H++){if(A[H]!=J[H]){break
}}for(var I=A.length-1;
I>=H;
I--){var G=dijit.byId(A[I]);
if(G){B.publish("widgetBlur",[G]);
if(G._onBlur){G._onBlur()
}}}for(var I=H;
I<J.length;
I++){var G=dijit.byId(J[I]);
if(G){B.publish("widgetFocus",[G]);
if(G._onFocus){G._onFocus()
}}}}});
B.addOnLoad(dijit.registerWin)
}}});