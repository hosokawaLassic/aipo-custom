dojo._xdResourceLoaded({depends:[["provide","dojox.widget.FisheyeList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"]],defineResource:function(B){if(!B._hasResource["dojox.widget.FisheyeList"]){B._hasResource["dojox.widget.FisheyeList"]=true;
B.provide("dojox.widget.FisheyeList");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit._Container");
B.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var E=this.EDGE;
B.setSelectable(this.domNode,false);
var A=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,E.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,E.TOP);
if(this.labelEdge==E.CENTER){this.labelEdge=E.TOP
}if(A){if(this.anchorEdge==E.LEFT){this.anchorEdge=E.CENTER
}if(this.anchorEdge==E.RIGHT){this.anchorEdge=E.CENTER
}if(this.labelEdge==E.LEFT){this.labelEdge=E.TOP
}if(this.labelEdge==E.RIGHT){this.labelEdge=E.TOP
}}else{if(this.anchorEdge==E.TOP){this.anchorEdge=E.CENTER
}if(this.anchorEdge==E.BOTTOM){this.anchorEdge=E.CENTER
}if(this.labelEdge==E.TOP){this.labelEdge=E.LEFT
}if(this.labelEdge==E.BOTTOM){this.labelEdge=E.LEFT
}}var F=this.effectUnits;
this.proximityLeft=this.itemWidth*(F-0.5);
this.proximityRight=this.itemWidth*(F-0.5);
this.proximityTop=this.itemHeight*(F-0.5);
this.proximityBottom=this.itemHeight*(F-0.5);
if(this.anchorEdge==E.LEFT){this.proximityLeft=0
}if(this.anchorEdge==E.RIGHT){this.proximityRight=0
}if(this.anchorEdge==E.TOP){this.proximityTop=0
}if(this.anchorEdge==E.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==E.CENTER){this.proximityLeft/=2;
this.proximityRight/=2;
this.proximityTop/=2;
this.proximityBottom/=2
}},startup:function(){this.children=this.getChildren();
this._initializePositioning();
if(!this.conservativeTrigger){this._onMouseMoveHandle=B.connect(document.documentElement,"onmousemove",this,"_onMouseMove")
}if(this.isFixed){this._onScrollHandle=B.connect(document,"onscroll",this,"_onScroll")
}this._onMouseOutHandle=B.connect(document.documentElement,"onmouseout",this,"_onBodyOut");
this._addChildHandle=B.connect(this,"addChild",this,"_initializePositioning");
this._onResizeHandle=B.connect(window,"onresize",this,"_initializePositioning")
},_initializePositioning:function(){this.itemCount=this.children.length;
this.barWidth=(this.isHorizontal?this.itemCount:1)*this.itemWidth;
this.barHeight=(this.isHorizontal?1:this.itemCount)*this.itemHeight;
this.totalWidth=this.proximityLeft+this.proximityRight+this.barWidth;
this.totalHeight=this.proximityTop+this.proximityBottom+this.barHeight;
for(var U=0;
U<this.children.length;
U++){this.children[U].posX=this.itemWidth*(this.isHorizontal?U:0);
this.children[U].posY=this.itemHeight*(this.isHorizontal?0:U);
this.children[U].cenX=this.children[U].posX+(this.itemWidth/2);
this.children[U].cenY=this.children[U].posY+(this.itemHeight/2);
var T=this.isHorizontal?this.itemWidth:this.itemHeight;
var N=this.effectUnits*T;
var Q=this.isHorizontal?this.children[U].cenX:this.children[U].cenY;
var V=this.isHorizontal?this.proximityLeft:this.proximityTop;
var S=this.isHorizontal?this.proximityRight:this.proximityBottom;
var A=this.isHorizontal?this.barWidth:this.barHeight;
var O=N;
var M=N;
if(O>Q+V){O=Q+V
}if(M>(A-Q+S)){M=A-Q+S
}this.children[U].effectRangeLeft=O/T;
this.children[U].effectRangeRght=M/T
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var U=0;
U<this.children.length;
U++){var P=this.children[U];
var R=P.domNode;
R.style.left=P.posX+"px";
R.style.top=P.posY+"px";
R.style.width=this.itemWidth+"px";
R.style.height=this.itemHeight+"px";
P.imgNode.style.left=this.itemPadding+"%";
P.imgNode.style.top=this.itemPadding+"%";
P.imgNode.style.width=(100-2*this.itemPadding)+"%";
P.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(A,R){A=B.byId(A);
var Q={x:R.pageX,y:R.pageY};
var P=B._getBorderBox(A);
var N=B.coords(A,true);
var O=N.y;
var L=O+P.h;
var K=N.x;
var M=K+P.w;
return(Q.x>=K&&Q.x<=M&&Q.y>=O&&Q.y<=L)
},_onBodyOut:function(A){if(this._overElement(B.body(),A)){return 
}this._setDormant(A)
},_setDormant:function(A){if(!this.isOver){return 
}this.isOver=false;
if(this.conservativeTrigger){B.disconnect(this._onMouseMoveHandle)
}this._onGridMouseMove(-1,-1)
},_setActive:function(A){if(this.isOver){return 
}this.isOver=true;
if(this.conservativeTrigger){this._onMouseMoveHandle=B.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this.timerScale=0;
this._onMouseMove(A);
this._expandSlowly()
}},_onMouseMove:function(A){if((A.pageX>=this.hitX1)&&(A.pageX<=this.hitX2)&&(A.pageY>=this.hitY1)&&(A.pageY<=this.hitY2)){if(!this.isOver){this._setActive(A)
}this._onGridMouseMove(A.pageX-this.hitX1,A.pageY-this.hitY1)
}else{if(this.isOver){this._setDormant(A)
}}},_onScroll:function(){this._calcHitGrid()
},onResized:function(){this._calcHitGrid()
},_onGridMouseMove:function(D,A){this.pos={x:D,y:A};
this._paint()
},_paint:function(){var R=this.pos.x;
var U=this.pos.y;
if(this.itemCount<=0){return 
}var T=this.isHorizontal?R:U;
var Z=this.isHorizontal?this.proximityLeft:this.proximityTop;
var Q=this.isHorizontal?this.itemWidth:this.itemHeight;
var S=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var X=((T-Z)/Q)-0.5;
var V=(S/Q)-0.5;
if(V>this.effectUnits){V=this.effectUnits
}var b=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var W=(U-this.proximityTop)/this.itemHeight;
b=(W>0.5)?1:U/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var W=(U-this.proximityTop)/this.itemHeight;
b=(W<0.5)?1:(this.totalHeight-U)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var W=(R-this.proximityLeft)/this.itemWidth;
b=(W>0.5)?1:R/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var W=(R-this.proximityLeft)/this.itemWidth;
b=(W<0.5)?1:(this.totalWidth-R)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){b=U/(this.totalHeight)
}else{b=R/(this.totalWidth)
}if(b>0.5){b=1-b
}b*=2
}for(var A=0;
A<this.itemCount;
A++){var a=this._weighAt(X,A);
if(a<0){a=0
}this._setItemSize(A,a*b)
}var Y=Math.round(X);
var P=0;
if(X<0){Y=0
}else{if(X>this.itemCount-1){Y=this.itemCount-1
}else{P=(X-Y)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[Y].sizeMain)
}}this._positionElementsFrom(Y,P)
},_weighAt:function(G,F){var A=Math.abs(G-F);
var H=((G-F)>0)?this.children[F].effectRangeRght:this.children[F].effectRangeLeft;
return(A>H)?0:(1-A/H)
},_setItemSize:function(I,H){H*=this.timerScale;
var K=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*H));
var J=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*H));
if(this.isHorizontal){this.children[I].sizeW=K;
this.children[I].sizeH=J;
this.children[I].sizeMain=K;
this.children[I].sizeOff=J;
var A=0;
if(this.anchorEdge==this.EDGE.TOP){A=(this.children[I].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){A=(this.children[I].cenY-(J-(this.itemHeight/2)))
}else{A=(this.children[I].cenY-(J/2))
}}this.children[I].usualX=Math.round(this.children[I].cenX-(K/2));
this.children[I].domNode.style.top=A+"px";
this.children[I].domNode.style.left=this.children[I].usualX+"px"
}else{this.children[I].sizeW=K;
this.children[I].sizeH=J;
this.children[I].sizeOff=K;
this.children[I].sizeMain=J;
var L=0;
if(this.anchorEdge==this.EDGE.LEFT){L=this.children[I].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){L=this.children[I].cenX-(K-(this.itemWidth/2))
}else{L=this.children[I].cenX-(K/2)
}}this.children[I].domNode.style.left=L+"px";
this.children[I].usualY=Math.round(this.children[I].cenY-(J/2));
this.children[I].domNode.style.top=this.children[I].usualY+"px"
}this.children[I].domNode.style.width=K+"px";
this.children[I].domNode.style.height=J+"px";
if(this.children[I].svgNode){this.children[I].svgNode.setSize(K,J)
}},_positionElementsFrom:function(I,H){var A=0;
if(this.isHorizontal){A=Math.round(this.children[I].usualX+H);
this.children[I].domNode.style.left=A+"px"
}else{A=Math.round(this.children[I].usualY+H);
this.children[I].domNode.style.top=A+"px"
}this._positionLabel(this.children[I]);
var L=A;
for(var K=I-1;
K>=0;
K--){L-=this.children[K].sizeMain;
if(this.isHorizontal){this.children[K].domNode.style.left=L+"px"
}else{this.children[K].domNode.style.top=L+"px"
}this._positionLabel(this.children[K])
}var J=A;
for(var K=I+1;
K<this.itemCount;
K++){J+=this.children[K-1].sizeMain;
if(this.isHorizontal){this.children[K].domNode.style.left=J+"px"
}else{this.children[K].domNode.style.top=J+"px"
}this._positionLabel(this.children[K])
}},_positionLabel:function(A){var H=0;
var F=0;
var G=B.marginBox(A.lblNode);
if(this.labelEdge==this.EDGE.TOP){H=Math.round((A.sizeW/2)-(G.w/2));
F=-G.h
}if(this.labelEdge==this.EDGE.BOTTOM){H=Math.round((A.sizeW/2)-(G.w/2));
F=A.sizeH
}if(this.labelEdge==this.EDGE.LEFT){H=-G.w;
F=Math.round((A.sizeH/2)-(G.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){H=A.sizeW;
F=Math.round((A.sizeH/2)-(G.h/2))
}A.lblNode.style.left=H+"px";
A.lblNode.style.top=F+"px"
},_calcHitGrid:function(){var A=B.coords(this.domNode,true);
this.hitX1=A.x-this.proximityLeft;
this.hitY1=A.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(D,A){return this.EDGE[D.toUpperCase()]||A
},_expandSlowly:function(){if(!this.isOver){return 
}this.timerScale+=0.2;
this._paint();
if(this.timerScale<1){setTimeout(B.hitch(this,"_expandSlowly"),10)
}},destroyRecursive:function(){B.disconnect(this._onMouseOutHandle);
B.disconnect(this._onMouseMoveHandle);
B.disconnect(this._addChildHandle);
if(this.isFixed){B.disconnect(this._onScrollHandle)
}B.disconnect(this._onResizeHandle);
this.inherited("destroyRecursive",arguments)
}});
B.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:B.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(D){if(typeof Element=="function"){try{return D instanceof Element
}catch(A){}}else{return D&&!isNaN(D.nodeType)
}},_hasParent:function(A){return Boolean(A&&A.parentNode&&this._isNode(A.parentNode))
},postCreate:function(){if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(B.isIE)&&(B.isIE<7)){if(this._hasParent(this.imgNode)&&this.id!=""){var A=this.imgNode.parentNode;
A.setAttribute("id",this.id)
}this.imgNode.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='scale')";
this.imgNode.src=this._blankImgPath.toString()
}else{if(this._hasParent(this.imgNode)&&this.id!=""){var A=this.imgNode.parentNode;
A.setAttribute("id",this.id)
}this.imgNode.src=this.iconSrc
}if(this.lblNode){this.lblNode.appendChild(document.createTextNode(this.label))
}B.setSelectable(this.domNode,false);
this.startup()
},startup:function(){this.parent=this.getParent()
},onMouseOver:function(A){if(!this.parent.isOver){this.parent._setActive(A)
}if(this.label!=""){B.addClass(this.lblNode,"dojoxFishSelected");
this.parent._positionLabel(this)
}},onMouseOut:function(A){B.removeClass(this.lblNode,"dojoxFishSelected")
},onClick:function(A){}})
}}});