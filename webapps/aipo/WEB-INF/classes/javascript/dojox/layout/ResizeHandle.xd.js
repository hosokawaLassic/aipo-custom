dojo._xdResourceLoaded({depends:[["provide","dojox.layout.ResizeHandle"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojo.fx"]],defineResource:function(B){if(!B._hasResource["dojox.layout.ResizeHandle"]){B._hasResource["dojox.layout.ResizeHandle"]=true;
B.provide("dojox.layout.ResizeHandle");
B.experimental("dojox.layout.ResizeHandle");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dojo.fx");
B.declare("dojox.layout.ResizeHandle",[dijit._Widget,dijit._Templated],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,templateString:'<div dojoAttachPoint="resizeHandle" class="dojoxResizeHandle"><div></div></div>',_isSizing:false,_connects:[],_activeResizeNode:null,_activeResizeLastEvent:null,_resizeX:true,_resizeY:true,postCreate:function(){B.connect(this.resizeHandle,"onmousedown",this,"_beginSizing");
if(!this.activeResize){this._activeResizeNode=document.createElement("div");
B.addClass(this._activeResizeNode,this.activeResizeClass)
}else{this.animateSizing=false
}if(!this.minSize){this.minSize={w:this.minWidth,h:this.minHeight}
}this._resizeX=this._resizeY=false;
switch(this.resizeAxis.toLowerCase()){case"xy":this._resizeX=this._resizeY=true;
B.addClass(this.resizeHandle,"dojoxResizeNW");
break;
case"x":this._resizeX=true;
B.addClass(this.resizeHandle,"dojoxResizeW");
break;
case"y":this._resizeY=true;
B.addClass(this.resizeHandle,"dojoxResizeN");
break
}},_beginSizing:function(D){if(this._isSizing){return false
}this.targetWidget=dijit.byId(this.targetId);
if(this.targetWidget){this.activeResize=true
}this.targetDomNode=this.targetWidget?this.targetWidget.domNode:B.byId(this.targetId);
if(this.targetContainer){this.targetDomNode=this.targetContainer
}if(!this.targetDomNode){return 
}if(!this.activeResize){this.targetDomNode.appendChild(this._activeResizeNode);
B.fadeIn({node:this._activeResizeNode,duration:120,beforeBegin:B.hitch(this,function(){this._activeResizeNode.style.display=""
})}).play()
}this._isSizing=true;
this.startPoint={x:D.clientX,y:D.clientY};
var A=(this.targetWidget)?B.marginBox(this.targetDomNode):B.contentBox(this.targetDomNode);
this.startSize={w:A.w,h:A.h};
this._connects=[];
this._connects.push(B.connect(document,"onmousemove",this,"_updateSizing"));
this._connects.push(B.connect(document,"onmouseup",this,"_endSizing"));
D.preventDefault()
},_updateSizing:function(A){if(this.activeResize){this._changeSizing(A)
}else{var D=this._getNewCoords(A);
if(D===false){return 
}B.style(this._activeResizeNode,"width",D.width+"px");
B.style(this._activeResizeNode,"height",D.height+"px");
this._activeResizeNode.style.display=""
}},_getNewCoords:function(G){try{if(!G.clientX||!G.clientY){return false
}}catch(G){return false
}this._activeResizeLastEvent=G;
var I=this.startPoint.x-G.clientX;
var J=this.startPoint.y-G.clientY;
var A=(this._resizeX)?this.startSize.w-I:this.startSize.w;
var H=(this._resizeY)?this.startSize.h-J:this.startSize.h;
if(this.minSize){if(A<this.minSize.w){A=this.minSize.w
}if(H<this.minSize.h){H=this.minSize.h
}}return{width:A,height:H}
},_changeSizing:function(A){var F=this._getNewCoords(A);
if(F===false){return 
}if(this.targetWidget&&typeof this.targetWidget.resize=="function"){this.targetWidget.resize({w:F.width,h:F.height})
}else{if(this.animateSizing){var E=B.fx[this.animateMethod]([B.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:F.width,unit:"px"}},duration:this.animateDuration}),B.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:F.height,unit:"px"}},duration:this.animateDuration})]);
E.play()
}else{B.style(this.targetDomNode,"width",F.width+"px");
B.style(this.targetDomNode,"height",F.height+"px")
}}A.preventDefault()
},_endSizing:function(A){B.forEach(this._connects,function(D){B.disconnect(D)
});
if(!this.activeResize){B.fadeOut({node:this._activeResizeNode,duration:250,onEnd:B.hitch(this,function(){this._activeResizeNode.style.display="none"
})}).play();
this._changeSizing(A)
}this._isSizing=false
}})
}}});