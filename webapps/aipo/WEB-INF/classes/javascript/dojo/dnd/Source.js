if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.require("dojo.dnd.Selector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(G,F){if(!F){F={}
}this.isSource=typeof F.isSource=="undefined"?true:F.isSource;
var H=F.accept instanceof Array?F.accept:["text"];
this.accept=null;
if(H.length){this.accept={};
for(var E=0;
E<H.length;
++E){this.accept[H[E]]=1
}}this.horizontal=F.horizontal;
this.copyOnly=F.copyOnly;
this.withHandles=F.withHandles;
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){dojo.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){dojo.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){dojo.addClass(this.node,"dojoDndHorizontal")
}this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")]
},checkAcceptance:function(H,L){if(this==H){return true
}for(var J=0;
J<L.length;
++J){var I=H.getItem(L[J].id).type;
var G=false;
for(var K=0;
K<I.length;
++K){if(I[K] in this.accept){G=true;
break
}}if(!G){return false
}}return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Source(C,D)
},onMouseMove:function(F){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,F);
var E=dojo.dnd.manager();
if(this.isDragging){var G=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){G=(F.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{G=(F.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||G!=this.before){this._markTargetAnchor(G);
E.canDrop(!this.current||E.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var H=this.getSelectedNodes();
if(H.length){E.startDrag(this,H,this.copyState(dojo.dnd.getCopyKeyState(F)))
}}}},onMouseDown:function(B){if(this._legalMouseDown(B)&&(!this.skipForm||!dojo.dnd.isFormElement(B))){this.mouseDown=true;
this.mouseButton=B.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,B)
}},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,B)
}},onDndSourceOver:function(D){if(this!=D){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var C=dojo.dnd.manager();
C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(H,E,F){if(this.isSource){this._changeState("Source",this==H?(F?"Copied":"Moved"):"")
}var G=this.accept&&this.checkAcceptance(H,E);
this._changeState("Target",G?"":"Disabled");
if(G&&this==H){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(G,E,F){do{if(this.containerState!="Over"){break
}var H=this._normalizedCreator;
if(this!=G){if(this.creator){this._normalizedCreator=function(B,A){return H.call(this,G.getItem(B.id).data,A)
}
}else{if(F){this._normalizedCreator=function(C,B){var D=G.getItem(C.id);
var A=C.cloneNode(true);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:D.data,type:D.type}
}
}else{this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
G.delItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(F){this._normalizedCreator=function(B,A){return H.call(this,G.getItem(B.id).data,A)
}
}else{if(!this.current){break
}this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}else{if(F){this._normalizedCreator=function(C,B){var D=G.getItem(C.id);
var A=C.cloneNode(true);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:D.data,type:D.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(B,A){var C=G.getItem(B.id);
return{node:B,data:C.data,type:C.type}
}
}}}this._removeSelection();
if(this!=G){this._removeAnchor()
}if(this!=G&&!F&&!this.creator){G.selectNone()
}this.insertNodes(true,E,this.before,this.current);
if(this!=G&&!F&&this.creator){G.deleteSelectedNodes()
}this._normalizedCreator=H
}while(false);
this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this)
},_markTargetAnchor:function(B){if(this.current==this.targetAnchor&&this.before==B){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=B;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(B){this._changeState("Source",B?"Copied":"Moved")
},_legalMouseDown:function(H){if(!this.withHandles){return true
}for(var I=H.target;
I&&!dojo.hasClass(I,"dojoDndItem");
I=I.parentNode){if(dojo.hasClass(I,"dojoDndHandle")){var J=H;
if(!J){J=window.event
}var G={x:J.clientX,y:J.clientY};
var F=false;
dojo.query("a",I).forEach(function(A){if(!F){var B=A.getBoundingClientRect();
F=(B.left<=G.x&&G.x<=B.right&&B.top<=G.y&&G.y<=B.bottom)
}});
if(F){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(C,D){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Target(C,D)
}})
};