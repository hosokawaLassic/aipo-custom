dojo._xdResourceLoaded({depends:[["provide","dijit.layout.SplitContainer"],["require","dojo.cookie"],["require","dijit.layout._LayoutWidget"]],defineResource:function(B){if(!B._hasResource["dijit.layout.SplitContainer"]){B._hasResource["dijit.layout.SplitContainer"]=true;
B.provide("dijit.layout.SplitContainer");
B.require("dojo.cookie");
B.require("dijit.layout._LayoutWidget");
B.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
B.addClass(this.domNode,"dijitSplitContainer");
if(B.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(A){this.sizerWidth=7
}}var D=this.virtualSizer=document.createElement("div");
D.style.position="relative";
D.style.zIndex=10;
D.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(D);
B.setSelectable(D,false)
},startup:function(){if(this._started){return 
}B.forEach(this.getChildren(),function(A,E,F){this._injectChild(A);
if(E<F.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
B.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var H=this.sizers.length;
var A=this.sizers[H]=document.createElement("div");
A.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var I=document.createElement("div");
I.className="thumb";
A.appendChild(I);
var J=this;
var G=(function(){var C=H;
return function(D){J.beginSizing(D,C)
}
})();
B.connect(A,"onmousedown",G);
this.domNode.appendChild(A);
B.setSelectable(A,false)
},removeChild:function(A){if(this.sizers.length&&B.indexOf(this.getChildren(),A)!=-1){var D=this.sizers.length-1;
B._destroyElement(this.sizers[D]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(A,F){this.inherited("addChild",arguments);
if(this._started){this._injectChild(A);
var E=this.getChildren();
if(E.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var L=this.getChildren();
if(!L.length){return 
}var J=this.isHorizontal?this.paneWidth:this.paneHeight;
if(L.length>1){J-=this.sizerWidth*(L.length-1)
}var K=0;
B.forEach(L,function(C){K+=C.sizeShare
});
var I=J/K;
var N=0;
B.forEach(L.slice(0,L.length-1),function(C){var D=Math.round(I*C.sizeShare);
C.sizeActual=D;
N+=D
});
L[L.length-1].sizeActual=J-N;
this._checkSizes();
var A=0;
var M=L[0].sizeActual;
this._movePanel(L[0],A,M);
L[0].position=A;
A+=M;
if(!this.sizers){return 
}B.some(L.slice(1),function(C,D){if(!this.sizers[D]){return true
}this._moveSlider(this.sizers[D],A,this.sizerWidth);
this.sizers[D].position=A;
A+=this.sizerWidth;
M=C.sizeActual;
this._movePanel(C,A,M);
C.position=A;
A+=M
},this)
},_movePanel:function(H,A,G){if(this.isHorizontal){H.domNode.style.left=A+"px";
H.domNode.style.top=0;
var F={w:G,h:this.paneHeight};
if(H.resize){H.resize(F)
}else{B.marginBox(H.domNode,F)
}}else{H.domNode.style.left=0;
H.domNode.style.top=A+"px";
var F={w:this.paneWidth,h:G};
if(H.resize){H.resize(F)
}else{B.marginBox(H.domNode,F)
}}},_moveSlider:function(E,A,F){if(this.isHorizontal){E.style.left=A+"px";
E.style.top=0;
B.marginBox(E,{w:F,h:this.paneHeight})
}else{E.style.left=0;
E.style.top=A+"px";
B.marginBox(E,{w:this.paneWidth,h:F})
}},_growPane:function(D,A){if(D>0){if(A.sizeActual>A.sizeMin){if((A.sizeActual-A.sizeMin)>D){A.sizeActual=A.sizeActual-D;
D=0
}else{D-=A.sizeActual-A.sizeMin;
A.sizeActual=A.sizeMin
}}}return D
},_checkSizes:function(){var G=0;
var I=0;
var H=this.getChildren();
B.forEach(H,function(C){I+=C.sizeActual;
G+=C.sizeMin
});
if(G<=I){var J=0;
B.forEach(H,function(C){if(C.sizeActual<C.sizeMin){J+=C.sizeMin-C.sizeActual;
C.sizeActual=C.sizeMin
}});
if(J>0){var A=this.isDraggingLeft?H.reverse():H;
B.forEach(A,function(C){J=this._growPane(J,C)
},this)
}}else{B.forEach(H,function(C){C.sizeActual=Math.round(I*(C.sizeMin/G))
})
}},beginSizing:function(A,I){var J=this.getChildren();
this.paneBefore=J[I];
this.paneAfter=J[I+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[I];
if(!this.cover){this.cover=B.doc.createElement("div");
this.domNode.appendChild(this.cover);
var H=this.cover.style;
H.position="absolute";
H.zIndex=1;
H.top=0;
H.left=0;
H.width="100%";
H.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=B.coords(J[0].domNode,true);
if(this.isHorizontal){var L=(A.layerX?A.layerX:A.offsetX);
var K=A.pageX;
this.originPos=this.originPos.x
}else{var L=(A.layerY?A.layerY:A.offsetY);
var K=A.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=K;
this.screenToClientOffset=K-L;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(B.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(B.connect(document.documentElement,"onmouseup",this,"endSizing"));
B.stopEvent(A)
},changeSizing:function(A){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?A.pageX:A.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}B.stopEvent(A)
},endSizing:function(A){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}B.forEach(this._connects,B.disconnect)
},movePoint:function(){var A=this.lastPoint-this.screenToClientOffset;
var D=A-this.dragOffset;
D=this.legaliseSplitPoint(D);
A=D+this.dragOffset;
this.lastPoint=A+this.screenToClientOffset
},legaliseSplitPoint:function(E){E+=this.sizingSplitter.position;
this.isDraggingLeft=!!(E>0);
if(!this.activeSizing){var A=this.paneBefore.position+this.paneBefore.sizeMin;
if(E<A){E=A
}var F=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(E>F){E=F
}}E-=this.sizingSplitter.position;
this._checkSizes();
return E
},_updateSize:function(){var A=this.lastPoint-this.dragOffset-this.originPos;
var F=this.paneBefore.position;
var E=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=A-F;
this.paneAfter.position=A+this.sizerWidth;
this.paneAfter.sizeActual=E-this.paneAfter.position;
B.forEach(this.getChildren(),function(C){C.sizeShare=C.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
B.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var A=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
B.style(this.virtualSizer,(this.isHorizontal?"left":"top"),A+"px")
},_getCookieName:function(A){return this.id+"_"+A
},_restoreState:function(){B.forEach(this.getChildren(),function(A,J){var G=this._getCookieName(J);
var I=B.cookie(G);
if(I){var H=parseInt(I);
if(typeof H=="number"){A.sizeShare=H
}}},this)
},_saveState:function(){B.forEach(this.getChildren(),function(A,D){B.cookie(this._getCookieName(D),A.sizeShare)
},this)
}});
B.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}}});