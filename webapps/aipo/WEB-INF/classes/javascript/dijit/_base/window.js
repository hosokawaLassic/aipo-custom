if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(E){if(dojo.isSafari&&!E._parentWindow){var D=function(A){A.document._parentWindow=A;
for(var B=0;
B<A.frames.length;
B++){D(A.frames[B])
}};
D(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!E._parentWindow){E.parentWindow.execScript("document._parentWindow = window;","Javascript");
var F=E._parentWindow;
E._parentWindow=null;
return F
}return E._parentWindow||E.parentWindow||E.defaultView
}
};