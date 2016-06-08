dojo._xdResourceLoaded({depends:[["provide","dijit._base.window"]],defineResource:function(B){if(!B._hasResource["dijit._base.window"]){B._hasResource["dijit._base.window"]=true;
B.provide("dijit._base.window");
dijit.getDocumentWindow=function(A){if(B.isSafari&&!A._parentWindow){var F=function(C){C.document._parentWindow=C;
for(var D=0;
D<C.frames.length;
D++){F(C.frames[D])
}};
F(window.top)
}if(B.isIE&&window!==document.parentWindow&&!A._parentWindow){A.parentWindow.execScript("document._parentWindow = window;","Javascript");
var E=A._parentWindow;
A._parentWindow=null;
return E
}return A._parentWindow||A.parentWindow||A.defaultView
}
}}});