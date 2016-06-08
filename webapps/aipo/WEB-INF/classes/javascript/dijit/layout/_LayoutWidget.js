if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(B){B.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(D){var F=this.domNode;
if(D){dojo.marginBox(F,D);
if(D.t){F.style.top=D.t+"px"
}if(D.l){F.style.left=D.l+"px"
}}var E=dojo.mixin(dojo.marginBox(F),D||{});
this._contentBox=dijit.layout.marginBox2contentBox(F,E);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(H,G){var J=dojo.getComputedStyle(H);
var I=dojo._getMarginExtents(H,J);
var F=dojo._getPadBorderExtents(H,J);
return{l:dojo._toPixelValue(H,J.paddingLeft),t:dojo._toPixelValue(H,J.paddingTop),w:G.w-(I.w+F.w),h:G.h-(I.h+F.h)}
};
(function(){var D=function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
};
var C=function(B,A){B.resize?B.resize(A):dojo.marginBox(B.domNode,A);
dojo.mixin(B,dojo.marginBox(B.domNode));
dojo.mixin(B,A)
};
dijit.layout.layoutChildren=function(F,A,B){A=dojo.mixin({},A);
dojo.addClass(F,"dijitLayoutContainer");
B=dojo.filter(B,function(E){return E.layoutAlign!="client"
}).concat(dojo.filter(B,function(E){return E.layoutAlign=="client"
}));
dojo.forEach(B,function(E){var J=E.domNode,K=E.layoutAlign;
var L=J.style;
L.left=A.l+"px";
L.top=A.t+"px";
L.bottom=L.right="auto";
dojo.addClass(J,"dijitAlign"+D(K));
if(K=="top"||K=="bottom"){C(E,{w:A.w});
A.h-=E.h;
if(K=="top"){A.t+=E.h
}else{L.top=A.t+A.h+"px"
}}else{if(K=="left"||K=="right"){C(E,{h:A.h});
A.w-=E.w;
if(K=="left"){A.l+=E.w
}else{L.left=A.l+A.w+"px"
}}else{if(K=="client"){C(E,A)
}}}})
}
})()
};