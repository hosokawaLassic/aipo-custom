dojo._xdResourceLoaded({depends:[["provide","dijit.layout._LayoutWidget"],["require","dijit._Widget"],["require","dijit._Container"]],defineResource:function(B){if(!B._hasResource["dijit.layout._LayoutWidget"]){B._hasResource["dijit.layout._LayoutWidget"]=true;
B.provide("dijit.layout._LayoutWidget");
B.require("dijit._Widget");
B.require("dijit._Container");
B.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){B.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){B.forEach(this.getChildren(),function(A){A.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(F){var E=this.domNode;
if(F){B.marginBox(E,F);
if(F.t){E.style.top=F.t+"px"
}if(F.l){E.style.left=F.l+"px"
}}var A=B.mixin(B.marginBox(E),F||{});
this._contentBox=dijit.layout.marginBox2contentBox(E,A);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(G,A){var I=B.getComputedStyle(G);
var H=B._getMarginExtents(G,I);
var J=B._getPadBorderExtents(G,I);
return{l:B._toPixelValue(G,I.paddingLeft),t:B._toPixelValue(G,I.paddingTop),w:A.w-(H.w+J.w),h:A.h-(H.h+J.h)}
};
(function(){var A=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var D=function(F,C){F.resize?F.resize(C):B.marginBox(F.domNode,C);
B.mixin(F,B.marginBox(F.domNode));
B.mixin(F,C)
};
dijit.layout.layoutChildren=function(H,C,G){C=B.mixin({},C);
B.addClass(H,"dijitLayoutContainer");
G=B.filter(G,function(E){return E.layoutAlign!="client"
}).concat(B.filter(G,function(E){return E.layoutAlign=="client"
}));
B.forEach(G,function(E){var F=E.domNode,K=E.layoutAlign;
var L=F.style;
L.left=C.l+"px";
L.top=C.t+"px";
L.bottom=L.right="auto";
B.addClass(F,"dijitAlign"+A(K));
if(K=="top"||K=="bottom"){D(E,{w:C.w});
C.h-=E.h;
if(K=="top"){C.t+=E.h
}else{L.top=C.t+C.h+"px"
}}else{if(K=="left"||K=="right"){D(E,{h:C.h});
C.w-=E.w;
if(K=="left"){C.l+=E.w
}else{L.left=C.l+C.w+"px"
}}else{if(K=="client"){D(E,C)
}}}})
}
})()
}}});