if(!dojo._hasResource["dojox.layout.ResizeHandle"]){dojo._hasResource["dojox.layout.ResizeHandle"]=true;
dojo.provide("dojox.layout.ResizeHandle");
dojo.experimental("dojox.layout.ResizeHandle");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.declare("dojox.layout.ResizeHandle",[dijit._Widget,dijit._Templated],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,templateString:'<div dojoAttachPoint="resizeHandle" class="dojoxResizeHandle"><div></div></div>',_isSizing:false,_connects:[],_activeResizeNode:null,_activeResizeLastEvent:null,_resizeX:true,_resizeY:true,postCreate:function(){dojo.connect(this.resizeHandle,"onmousedown",this,"_beginSizing");
if(!this.activeResize){this._activeResizeNode=document.createElement("div");
dojo.addClass(this._activeResizeNode,this.activeResizeClass)
}else{this.animateSizing=false
}if(!this.minSize){this.minSize={w:this.minWidth,h:this.minHeight}
}this._resizeX=this._resizeY=false;
switch(this.resizeAxis.toLowerCase()){case"xy":this._resizeX=this._resizeY=true;
dojo.addClass(this.resizeHandle,"dojoxResizeNW");
break;
case"x":this._resizeX=true;
dojo.addClass(this.resizeHandle,"dojoxResizeW");
break;
case"y":this._resizeY=true;
dojo.addClass(this.resizeHandle,"dojoxResizeN");
break
}},_beginSizing:function(C){if(this._isSizing){return false
}this.targetWidget=dijit.byId(this.targetId);
if(this.targetWidget){this.activeResize=true
}this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetId);
if(this.targetContainer){this.targetDomNode=this.targetContainer
}if(!this.targetDomNode){return 
}if(!this.activeResize){this.targetDomNode.appendChild(this._activeResizeNode);
dojo.fadeIn({node:this._activeResizeNode,duration:120,beforeBegin:dojo.hitch(this,function(){this._activeResizeNode.style.display=""
})}).play()
}this._isSizing=true;
this.startPoint={x:C.clientX,y:C.clientY};
var D=(this.targetWidget)?dojo.marginBox(this.targetDomNode):dojo.contentBox(this.targetDomNode);
this.startSize={w:D.w,h:D.h};
this._connects=[];
this._connects.push(dojo.connect(document,"onmousemove",this,"_updateSizing"));
this._connects.push(dojo.connect(document,"onmouseup",this,"_endSizing"));
C.preventDefault()
},_updateSizing:function(D){if(this.activeResize){this._changeSizing(D)
}else{var C=this._getNewCoords(D);
if(C===false){return 
}dojo.style(this._activeResizeNode,"width",C.width+"px");
dojo.style(this._activeResizeNode,"height",C.height+"px");
this._activeResizeNode.style.display=""
}},_getNewCoords:function(H){try{if(!H.clientX||!H.clientY){return false
}}catch(H){return false
}this._activeResizeLastEvent=H;
var J=this.startPoint.x-H.clientX;
var F=this.startPoint.y-H.clientY;
var G=(this._resizeX)?this.startSize.w-J:this.startSize.w;
var I=(this._resizeY)?this.startSize.h-F:this.startSize.h;
if(this.minSize){if(G<this.minSize.w){G=this.minSize.w
}if(I<this.minSize.h){I=this.minSize.h
}}return{width:G,height:I}
},_changeSizing:function(E){var D=this._getNewCoords(E);
if(D===false){return 
}if(this.targetWidget&&typeof this.targetWidget.resize=="function"){this.targetWidget.resize({w:D.width,h:D.height})
}else{if(this.animateSizing){var F=dojo.fx[this.animateMethod]([dojo.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:D.width,unit:"px"}},duration:this.animateDuration}),dojo.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:D.height,unit:"px"}},duration:this.animateDuration})]);
F.play()
}else{dojo.style(this.targetDomNode,"width",D.width+"px");
dojo.style(this.targetDomNode,"height",D.height+"px")
}}E.preventDefault()
},_endSizing:function(B){dojo.forEach(this._connects,function(A){dojo.disconnect(A)
});
if(!this.activeResize){dojo.fadeOut({node:this._activeResizeNode,duration:250,onEnd:dojo.hitch(this,function(){this._activeResizeNode.style.display="none"
})}).play();
this._changeSizing(B)
}this._isSizing=false
}})
};