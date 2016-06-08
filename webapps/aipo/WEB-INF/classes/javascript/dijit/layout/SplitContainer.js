if(!dojo._hasResource["dijit.layout.SplitContainer"]){dojo._hasResource["dijit.layout.SplitContainer"]=true;
dojo.provide("dijit.layout.SplitContainer");
dojo.require("dojo.cookie");
dojo.require("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
dojo.addClass(this.domNode,"dijitSplitContainer");
if(dojo.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(D){this.sizerWidth=7
}}var C=this.virtualSizer=document.createElement("div");
C.style.position="relative";
C.style.zIndex=10;
C.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(C);
dojo.setSelectable(C,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(E,F,D){this._injectChild(E);
if(F<D.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(B){B.domNode.style.position="absolute";
dojo.addClass(B.domNode,"dijitSplitPane")
},_addSizer:function(){var I=this.sizers.length;
var G=this.sizers[I]=document.createElement("div");
G.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var J=document.createElement("div");
J.className="thumb";
G.appendChild(J);
var F=this;
var H=(function(){var A=I;
return function(B){F.beginSizing(B,A)
}
})();
dojo.connect(G,"onmousedown",H);
this.domNode.appendChild(G);
dojo.setSelectable(G,false)
},removeChild:function(D){if(this.sizers.length&&dojo.indexOf(this.getChildren(),D)!=-1){var C=this.sizers.length-1;
dojo._destroyElement(this.sizers[C]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(E,D){this.inherited("addChild",arguments);
if(this._started){this._injectChild(E);
var F=this.getChildren();
if(F.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var M=this.getChildren();
if(!M.length){return 
}var K=this.isHorizontal?this.paneWidth:this.paneHeight;
if(M.length>1){K-=this.sizerWidth*(M.length-1)
}var L=0;
dojo.forEach(M,function(A){L+=A.sizeShare
});
var J=K/L;
var H=0;
dojo.forEach(M.slice(0,M.length-1),function(A){var B=Math.round(J*A.sizeShare);
A.sizeActual=B;
H+=B
});
M[M.length-1].sizeActual=K-H;
this._checkSizes();
var I=0;
var N=M[0].sizeActual;
this._movePanel(M[0],I,N);
M[0].position=I;
I+=N;
if(!this.sizers){return 
}dojo.some(M.slice(1),function(A,B){if(!this.sizers[B]){return true
}this._moveSlider(this.sizers[B],I,this.sizerWidth);
this.sizers[B].position=I;
I+=this.sizerWidth;
N=A.sizeActual;
this._movePanel(A,I,N);
A.position=I;
I+=N
},this)
},_movePanel:function(E,F,H){if(this.isHorizontal){E.domNode.style.left=F+"px";
E.domNode.style.top=0;
var G={w:H,h:this.paneHeight};
if(E.resize){E.resize(G)
}else{dojo.marginBox(E.domNode,G)
}}else{E.domNode.style.left=0;
E.domNode.style.top=F+"px";
var G={w:this.paneWidth,h:H};
if(E.resize){E.resize(G)
}else{dojo.marginBox(E.domNode,G)
}}},_moveSlider:function(F,E,D){if(this.isHorizontal){F.style.left=E+"px";
F.style.top=0;
dojo.marginBox(F,{w:D,h:this.paneHeight})
}else{F.style.left=0;
F.style.top=E+"px";
dojo.marginBox(F,{w:this.paneWidth,h:D})
}},_growPane:function(C,D){if(C>0){if(D.sizeActual>D.sizeMin){if((D.sizeActual-D.sizeMin)>C){D.sizeActual=D.sizeActual-C;
C=0
}else{C-=D.sizeActual-D.sizeMin;
D.sizeActual=D.sizeMin
}}}return C
},_checkSizes:function(){var H=0;
var J=0;
var I=this.getChildren();
dojo.forEach(I,function(A){J+=A.sizeActual;
H+=A.sizeMin
});
if(H<=J){var F=0;
dojo.forEach(I,function(A){if(A.sizeActual<A.sizeMin){F+=A.sizeMin-A.sizeActual;
A.sizeActual=A.sizeMin
}});
if(F>0){var G=this.isDraggingLeft?I.reverse():I;
dojo.forEach(G,function(A){F=this._growPane(F,A)
},this)
}}else{dojo.forEach(I,function(A){A.sizeActual=Math.round(J*(A.sizeMin/H))
})
}},beginSizing:function(H,J){var K=this.getChildren();
this.paneBefore=K[J];
this.paneAfter=K[J+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[J];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var I=this.cover.style;
I.position="absolute";
I.zIndex=1;
I.top=0;
I.left=0;
I.width="100%";
I.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(K[0].domNode,true);
if(this.isHorizontal){var G=(H.layerX?H.layerX:H.offsetX);
var L=H.pageX;
this.originPos=this.originPos.x
}else{var G=(H.layerY?H.layerY:H.offsetY);
var L=H.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=L;
this.screenToClientOffset=L-G;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(H)
},changeSizing:function(B){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?B.pageX:B.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}dojo.stopEvent(B)
},endSizing:function(B){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}dojo.forEach(this._connects,dojo.disconnect)
},movePoint:function(){var D=this.lastPoint-this.screenToClientOffset;
var C=D-this.dragOffset;
C=this.legaliseSplitPoint(C);
D=C+this.dragOffset;
this.lastPoint=D+this.screenToClientOffset
},legaliseSplitPoint:function(F){F+=this.sizingSplitter.position;
this.isDraggingLeft=!!(F>0);
if(!this.activeSizing){var E=this.paneBefore.position+this.paneBefore.sizeMin;
if(F<E){F=E
}var D=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(F>D){F=D
}}F-=this.sizingSplitter.position;
this._checkSizes();
return F
},_updateSize:function(){var E=this.lastPoint-this.dragOffset-this.originPos;
var D=this.paneBefore.position;
var F=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=E-D;
this.paneAfter.position=E+this.sizerWidth;
this.paneAfter.sizeActual=F-this.paneAfter.position;
dojo.forEach(this.getChildren(),function(A){A.sizeShare=A.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
dojo.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var B=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
dojo.style(this.virtualSizer,(this.isHorizontal?"left":"top"),B+"px")
},_getCookieName:function(B){return this.id+"_"+B
},_restoreState:function(){dojo.forEach(this.getChildren(),function(G,F){var H=this._getCookieName(F);
var J=dojo.cookie(H);
if(J){var I=parseInt(J);
if(typeof I=="number"){G.sizeShare=I
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(D,C){dojo.cookie(this._getCookieName(C),D.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
};