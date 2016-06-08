dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Source"],["require","dojo.dnd.Selector"],["require","dojo.dnd.Manager"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Source"]){B._hasResource["dojo.dnd.Source"]=true;
B.provide("dojo.dnd.Source");
B.require("dojo.dnd.Selector");
B.require("dojo.dnd.Manager");
B.declare("dojo.dnd.Source",B.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(F,A){if(!A){A={}
}this.isSource=typeof A.isSource=="undefined"?true:A.isSource;
var G=A.accept instanceof Array?A.accept:["text"];
this.accept=null;
if(G.length){this.accept={};
for(var H=0;
H<G.length;
++H){this.accept[G[H]]=1
}}this.horizontal=A.horizontal;
this.copyOnly=A.copyOnly;
this.withHandles=A.withHandles;
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){B.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){B.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){B.addClass(this.node,"dojoDndHorizontal")
}this.topics=[B.subscribe("/dnd/source/over",this,"onDndSourceOver"),B.subscribe("/dnd/start",this,"onDndStart"),B.subscribe("/dnd/drop",this,"onDndDrop"),B.subscribe("/dnd/cancel",this,"onDndCancel")]
},checkAcceptance:function(A,K){if(this==A){return true
}for(var I=0;
I<K.length;
++I){var H=A.getItem(K[I].id).type;
var L=false;
for(var J=0;
J<H.length;
++J){if(H[J] in this.accept){L=true;
break
}}if(!L){return false
}}return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){B.dnd.Source.superclass.destroy.call(this);
B.forEach(this.topics,B.unsubscribe);
this.targetAnchor=null
},markupFactory:function(A,D){A._skipStartup=true;
return new B.dnd.Source(D,A)
},onMouseMove:function(A){if(this.isDragging&&this.targetState=="Disabled"){return 
}B.dnd.Source.superclass.onMouseMove.call(this,A);
var H=B.dnd.manager();
if(this.isDragging){var F=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:B.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){F=(A.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{F=(A.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||F!=this.before){this._markTargetAnchor(F);
H.canDrop(!this.current||H.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var G=this.getSelectedNodes();
if(G.length){H.startDrag(this,G,this.copyState(B.dnd.getCopyKeyState(A)))
}}}},onMouseDown:function(A){if(this._legalMouseDown(A)&&(!this.skipForm||!B.dnd.isFormElement(A))){this.mouseDown=true;
this.mouseButton=A.button;
B.dnd.Source.superclass.onMouseDown.call(this,A)
}},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
B.dnd.Source.superclass.onMouseUp.call(this,A)
}},onDndSourceOver:function(A){if(this!=A){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var D=B.dnd.manager();
D.canDrop(this.targetState!="Disabled"&&(!this.current||D.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(G,H,A){if(this.isSource){this._changeState("Source",this==G?(A?"Copied":"Moved"):"")
}var F=this.accept&&this.checkAcceptance(G,H);
this._changeState("Target",F?"":"Disabled");
if(F&&this==G){B.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(F,H,A){do{if(this.containerState!="Over"){break
}var G=this._normalizedCreator;
if(this!=F){if(this.creator){this._normalizedCreator=function(D,C){return G.call(this,F.getItem(D.id).data,C)
}
}else{if(A){this._normalizedCreator=function(E,D){var J=F.getItem(E.id);
var C=E.cloneNode(true);
C.id=B.dnd.getUniqueId();
return{node:C,data:J.data,type:J.type}
}
}else{this._normalizedCreator=function(D,C){var E=F.getItem(D.id);
F.delItem(D.id);
return{node:D,data:E.data,type:E.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(A){this._normalizedCreator=function(D,C){return G.call(this,F.getItem(D.id).data,C)
}
}else{if(!this.current){break
}this._normalizedCreator=function(D,C){var E=F.getItem(D.id);
return{node:D,data:E.data,type:E.type}
}
}}else{if(A){this._normalizedCreator=function(E,D){var J=F.getItem(E.id);
var C=E.cloneNode(true);
C.id=B.dnd.getUniqueId();
return{node:C,data:J.data,type:J.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(D,C){var E=F.getItem(D.id);
return{node:D,data:E.data,type:E.type}
}
}}}this._removeSelection();
if(this!=F){this._removeAnchor()
}if(this!=F&&!A&&!this.creator){F.selectNone()
}this.insertNodes(true,H,this.before,this.current);
if(this!=F&&!A&&this.creator){F.deleteSelectedNodes()
}this._normalizedCreator=G
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
},onOverEvent:function(){B.dnd.Source.superclass.onOverEvent.call(this);
B.dnd.manager().overSource(this)
},onOutEvent:function(){B.dnd.Source.superclass.onOutEvent.call(this);
B.dnd.manager().outSource(this)
},_markTargetAnchor:function(A){if(this.current==this.targetAnchor&&this.before==A){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=A;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(A){this._changeState("Source",A?"Copied":"Moved")
},_legalMouseDown:function(G){if(!this.withHandles){return true
}for(var H=G.target;
H&&!B.hasClass(H,"dojoDndItem");
H=H.parentNode){if(B.hasClass(H,"dojoDndHandle")){var I=G;
if(!I){I=window.event
}var A={x:I.clientX,y:I.clientY};
var J=false;
B.query("a",H).forEach(function(C){if(!J){var D=C.getBoundingClientRect();
J=(D.left<=A.x&&A.x<=D.right&&D.top<=A.y&&A.y<=D.bottom)
}});
if(J){return false
}return true
}}return false
}});
B.declare("dojo.dnd.Target",B.dnd.Source,{constructor:function(D,A){this.isSource=false;
B.removeClass(this.node,"dojoDndSource")
},markupFactory:function(A,D){A._skipStartup=true;
return new B.dnd.Target(D,A)
}})
}}});