if(!dojo._hasResource["dojox.widget.FisheyeList"]){dojo._hasResource["dojox.widget.FisheyeList"]=true;
dojo.provide("dojox.widget.FisheyeList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.declare("dojox.widget.FisheyeList",[dijit._Widget,dijit._Templated,dijit._Container],{constructor:function(){this.pos={x:-1,y:-1};
this.timerScale=1
},EDGE:{CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4},templateString:'<div class="dojoxFisheyeListBar" dojoAttachPoint="containerNode"></div>',snarfChildDomOutput:true,itemWidth:40,itemHeight:40,itemMaxWidth:150,itemMaxHeight:150,imgNode:null,orientation:"horizontal",isFixed:false,conservativeTrigger:false,effectUnits:2,itemPadding:10,attachEdge:"center",labelEdge:"bottom",postCreate:function(){var F=this.EDGE;
dojo.setSelectable(this.domNode,false);
var E=this.isHorizontal=(this.orientation=="horizontal");
this.selectedNode=-1;
this.isOver=false;
this.hitX1=-1;
this.hitY1=-1;
this.hitX2=-1;
this.hitY2=-1;
this.anchorEdge=this._toEdge(this.attachEdge,F.CENTER);
this.labelEdge=this._toEdge(this.labelEdge,F.TOP);
if(this.labelEdge==F.CENTER){this.labelEdge=F.TOP
}if(E){if(this.anchorEdge==F.LEFT){this.anchorEdge=F.CENTER
}if(this.anchorEdge==F.RIGHT){this.anchorEdge=F.CENTER
}if(this.labelEdge==F.LEFT){this.labelEdge=F.TOP
}if(this.labelEdge==F.RIGHT){this.labelEdge=F.TOP
}}else{if(this.anchorEdge==F.TOP){this.anchorEdge=F.CENTER
}if(this.anchorEdge==F.BOTTOM){this.anchorEdge=F.CENTER
}if(this.labelEdge==F.TOP){this.labelEdge=F.LEFT
}if(this.labelEdge==F.BOTTOM){this.labelEdge=F.LEFT
}}var D=this.effectUnits;
this.proximityLeft=this.itemWidth*(D-0.5);
this.proximityRight=this.itemWidth*(D-0.5);
this.proximityTop=this.itemHeight*(D-0.5);
this.proximityBottom=this.itemHeight*(D-0.5);
if(this.anchorEdge==F.LEFT){this.proximityLeft=0
}if(this.anchorEdge==F.RIGHT){this.proximityRight=0
}if(this.anchorEdge==F.TOP){this.proximityTop=0
}if(this.anchorEdge==F.BOTTOM){this.proximityBottom=0
}if(this.anchorEdge==F.CENTER){this.proximityLeft/=2;
this.proximityRight/=2;
this.proximityTop/=2;
this.proximityBottom/=2
}},startup:function(){this.children=this.getChildren();
this._initializePositioning();
if(!this.conservativeTrigger){this._onMouseMoveHandle=dojo.connect(document.documentElement,"onmousemove",this,"_onMouseMove")
}if(this.isFixed){this._onScrollHandle=dojo.connect(document,"onscroll",this,"_onScroll")
}this._onMouseOutHandle=dojo.connect(document.documentElement,"onmouseout",this,"_onBodyOut");
this._addChildHandle=dojo.connect(this,"addChild",this,"_initializePositioning");
this._onResizeHandle=dojo.connect(window,"onresize",this,"_initializePositioning")
},_initializePositioning:function(){this.itemCount=this.children.length;
this.barWidth=(this.isHorizontal?this.itemCount:1)*this.itemWidth;
this.barHeight=(this.isHorizontal?1:this.itemCount)*this.itemHeight;
this.totalWidth=this.proximityLeft+this.proximityRight+this.barWidth;
this.totalHeight=this.proximityTop+this.proximityBottom+this.barHeight;
for(var V=0;
V<this.children.length;
V++){this.children[V].posX=this.itemWidth*(this.isHorizontal?V:0);
this.children[V].posY=this.itemHeight*(this.isHorizontal?0:V);
this.children[V].cenX=this.children[V].posX+(this.itemWidth/2);
this.children[V].cenY=this.children[V].posY+(this.itemHeight/2);
var U=this.isHorizontal?this.itemWidth:this.itemHeight;
var O=this.effectUnits*U;
var R=this.isHorizontal?this.children[V].cenX:this.children[V].cenY;
var L=this.isHorizontal?this.proximityLeft:this.proximityTop;
var T=this.isHorizontal?this.proximityRight:this.proximityBottom;
var M=this.isHorizontal?this.barWidth:this.barHeight;
var P=O;
var N=O;
if(P>R+L){P=R+L
}if(N>(M-R+T)){N=M-R+T
}this.children[V].effectRangeLeft=P/U;
this.children[V].effectRangeRght=N/U
}this.domNode.style.width=this.barWidth+"px";
this.domNode.style.height=this.barHeight+"px";
for(var V=0;
V<this.children.length;
V++){var Q=this.children[V];
var S=Q.domNode;
S.style.left=Q.posX+"px";
S.style.top=Q.posY+"px";
S.style.width=this.itemWidth+"px";
S.style.height=this.itemHeight+"px";
Q.imgNode.style.left=this.itemPadding+"%";
Q.imgNode.style.top=this.itemPadding+"%";
Q.imgNode.style.width=(100-2*this.itemPadding)+"%";
Q.imgNode.style.height=(100-2*this.itemPadding)+"%"
}this._calcHitGrid()
},_overElement:function(K,J){K=dojo.byId(K);
var R={x:J.pageX,y:J.pageY};
var Q=dojo._getBorderBox(K);
var O=dojo.coords(K,true);
var P=O.y;
var M=P+Q.h;
var L=O.x;
var N=L+Q.w;
return(R.x>=L&&R.x<=N&&R.y>=P&&R.y<=M)
},_onBodyOut:function(B){if(this._overElement(dojo.body(),B)){return 
}this._setDormant(B)
},_setDormant:function(B){if(!this.isOver){return 
}this.isOver=false;
if(this.conservativeTrigger){dojo.disconnect(this._onMouseMoveHandle)
}this._onGridMouseMove(-1,-1)
},_setActive:function(B){if(this.isOver){return 
}this.isOver=true;
if(this.conservativeTrigger){this._onMouseMoveHandle=dojo.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this.timerScale=0;
this._onMouseMove(B);
this._expandSlowly()
}},_onMouseMove:function(B){if((B.pageX>=this.hitX1)&&(B.pageX<=this.hitX2)&&(B.pageY>=this.hitY1)&&(B.pageY<=this.hitY2)){if(!this.isOver){this._setActive(B)
}this._onGridMouseMove(B.pageX-this.hitX1,B.pageY-this.hitY1)
}else{if(this.isOver){this._setDormant(B)
}}},_onScroll:function(){this._calcHitGrid()
},onResized:function(){this._calcHitGrid()
},_onGridMouseMove:function(C,D){this.pos={x:C,y:D};
this._paint()
},_paint:function(){var S=this.pos.x;
var V=this.pos.y;
if(this.itemCount<=0){return 
}var U=this.isHorizontal?S:V;
var a=this.isHorizontal?this.proximityLeft:this.proximityTop;
var R=this.isHorizontal?this.itemWidth:this.itemHeight;
var T=this.isHorizontal?(1-this.timerScale)*this.itemWidth+this.timerScale*this.itemMaxWidth:(1-this.timerScale)*this.itemHeight+this.timerScale*this.itemMaxHeight;
var Y=((U-a)/R)-0.5;
var W=(T/R)-0.5;
if(W>this.effectUnits){W=this.effectUnits
}var O=0;
if(this.anchorEdge==this.EDGE.BOTTOM){var X=(V-this.proximityTop)/this.itemHeight;
O=(X>0.5)?1:V/(this.proximityTop+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.TOP){var X=(V-this.proximityTop)/this.itemHeight;
O=(X<0.5)?1:(this.totalHeight-V)/(this.proximityBottom+(this.itemHeight/2))
}if(this.anchorEdge==this.EDGE.RIGHT){var X=(S-this.proximityLeft)/this.itemWidth;
O=(X>0.5)?1:S/(this.proximityLeft+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.LEFT){var X=(S-this.proximityLeft)/this.itemWidth;
O=(X<0.5)?1:(this.totalWidth-S)/(this.proximityRight+(this.itemWidth/2))
}if(this.anchorEdge==this.EDGE.CENTER){if(this.isHorizontal){O=V/(this.totalHeight)
}else{O=S/(this.totalWidth)
}if(O>0.5){O=1-O
}O*=2
}for(var P=0;
P<this.itemCount;
P++){var b=this._weighAt(Y,P);
if(b<0){b=0
}this._setItemSize(P,b*O)
}var Z=Math.round(Y);
var Q=0;
if(Y<0){Z=0
}else{if(Y>this.itemCount-1){Z=this.itemCount-1
}else{Q=(Y-Z)*((this.isHorizontal?this.itemWidth:this.itemHeight)-this.children[Z].sizeMain)
}}this._positionElementsFrom(Z,Q)
},_weighAt:function(H,G){var F=Math.abs(H-G);
var E=((H-G)>0)?this.children[G].effectRangeRght:this.children[G].effectRangeLeft;
return(F>E)?0:(1-F/E)
},_setItemSize:function(J,I){I*=this.timerScale;
var L=Math.round(this.itemWidth+((this.itemMaxWidth-this.itemWidth)*I));
var K=Math.round(this.itemHeight+((this.itemMaxHeight-this.itemHeight)*I));
if(this.isHorizontal){this.children[J].sizeW=L;
this.children[J].sizeH=K;
this.children[J].sizeMain=L;
this.children[J].sizeOff=K;
var H=0;
if(this.anchorEdge==this.EDGE.TOP){H=(this.children[J].cenY-(this.itemHeight/2))
}else{if(this.anchorEdge==this.EDGE.BOTTOM){H=(this.children[J].cenY-(K-(this.itemHeight/2)))
}else{H=(this.children[J].cenY-(K/2))
}}this.children[J].usualX=Math.round(this.children[J].cenX-(L/2));
this.children[J].domNode.style.top=H+"px";
this.children[J].domNode.style.left=this.children[J].usualX+"px"
}else{this.children[J].sizeW=L;
this.children[J].sizeH=K;
this.children[J].sizeOff=L;
this.children[J].sizeMain=K;
var G=0;
if(this.anchorEdge==this.EDGE.LEFT){G=this.children[J].cenX-(this.itemWidth/2)
}else{if(this.anchorEdge==this.EDGE.RIGHT){G=this.children[J].cenX-(L-(this.itemWidth/2))
}else{G=this.children[J].cenX-(L/2)
}}this.children[J].domNode.style.left=G+"px";
this.children[J].usualY=Math.round(this.children[J].cenY-(K/2));
this.children[J].domNode.style.top=this.children[J].usualY+"px"
}this.children[J].domNode.style.width=L+"px";
this.children[J].domNode.style.height=K+"px";
if(this.children[J].svgNode){this.children[J].svgNode.setSize(L,K)
}},_positionElementsFrom:function(J,I){var H=0;
if(this.isHorizontal){H=Math.round(this.children[J].usualX+I);
this.children[J].domNode.style.left=H+"px"
}else{H=Math.round(this.children[J].usualY+I);
this.children[J].domNode.style.top=H+"px"
}this._positionLabel(this.children[J]);
var G=H;
for(var L=J-1;
L>=0;
L--){G-=this.children[L].sizeMain;
if(this.isHorizontal){this.children[L].domNode.style.left=G+"px"
}else{this.children[L].domNode.style.top=G+"px"
}this._positionLabel(this.children[L])
}var K=H;
for(var L=J+1;
L<this.itemCount;
L++){K+=this.children[L-1].sizeMain;
if(this.isHorizontal){this.children[L].domNode.style.left=K+"px"
}else{this.children[L].domNode.style.top=K+"px"
}this._positionLabel(this.children[L])
}},_positionLabel:function(F){var E=0;
var G=0;
var H=dojo.marginBox(F.lblNode);
if(this.labelEdge==this.EDGE.TOP){E=Math.round((F.sizeW/2)-(H.w/2));
G=-H.h
}if(this.labelEdge==this.EDGE.BOTTOM){E=Math.round((F.sizeW/2)-(H.w/2));
G=F.sizeH
}if(this.labelEdge==this.EDGE.LEFT){E=-H.w;
G=Math.round((F.sizeH/2)-(H.h/2))
}if(this.labelEdge==this.EDGE.RIGHT){E=F.sizeW;
G=Math.round((F.sizeH/2)-(H.h/2))
}F.lblNode.style.left=E+"px";
F.lblNode.style.top=G+"px"
},_calcHitGrid:function(){var B=dojo.coords(this.domNode,true);
this.hitX1=B.x-this.proximityLeft;
this.hitY1=B.y-this.proximityTop;
this.hitX2=this.hitX1+this.totalWidth;
this.hitY2=this.hitY1+this.totalHeight
},_toEdge:function(C,D){return this.EDGE[C.toUpperCase()]||D
},_expandSlowly:function(){if(!this.isOver){return 
}this.timerScale+=0.2;
this._paint();
if(this.timerScale<1){setTimeout(dojo.hitch(this,"_expandSlowly"),10)
}},destroyRecursive:function(){dojo.disconnect(this._onMouseOutHandle);
dojo.disconnect(this._onMouseMoveHandle);
dojo.disconnect(this._addChildHandle);
if(this.isFixed){dojo.disconnect(this._onScrollHandle)
}dojo.disconnect(this._onResizeHandle);
this.inherited("destroyRecursive",arguments)
}});
dojo.declare("dojox.widget.FisheyeListItem",[dijit._Widget,dijit._Templated,dijit._Contained],{iconSrc:"",label:"",id:"",_blankImgPath:dojo.moduleUrl("dojox.widget","FisheyeList/blank.gif"),templateString:'<div class="dojoxFisheyeListItem">  <img class="dojoxFisheyeListItemImage" dojoAttachPoint="imgNode" dojoAttachEvent="onmouseover:onMouseOver,onmouseout:onMouseOut,onclick:onClick">  <div class="dojoxFisheyeListItemLabel" dojoAttachPoint="lblNode"></div></div>',_isNode:function(C){if(typeof Element=="function"){try{return C instanceof Element
}catch(D){}}else{return C&&!isNaN(C.nodeType)
}},_hasParent:function(B){return Boolean(B&&B.parentNode&&this._isNode(B.parentNode))
},postCreate:function(){if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.isIE)&&(dojo.isIE<7)){if(this._hasParent(this.imgNode)&&this.id!=""){var B=this.imgNode.parentNode;
B.setAttribute("id",this.id)
}this.imgNode.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='scale')";
this.imgNode.src=this._blankImgPath.toString()
}else{if(this._hasParent(this.imgNode)&&this.id!=""){var B=this.imgNode.parentNode;
B.setAttribute("id",this.id)
}this.imgNode.src=this.iconSrc
}if(this.lblNode){this.lblNode.appendChild(document.createTextNode(this.label))
}dojo.setSelectable(this.domNode,false);
this.startup()
},startup:function(){this.parent=this.getParent()
},onMouseOver:function(B){if(!this.parent.isOver){this.parent._setActive(B)
}if(this.label!=""){dojo.addClass(this.lblNode,"dojoxFishSelected");
this.parent._positionLabel(this)
}},onMouseOut:function(B){dojo.removeClass(this.lblNode,"dojoxFishSelected")
},onClick:function(B){}})
};