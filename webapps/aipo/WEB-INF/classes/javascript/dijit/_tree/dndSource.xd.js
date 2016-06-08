dojo._xdResourceLoaded({depends:[["provide","dijit._tree.dndSource"],["require","dijit._tree.dndSelector"],["require","dojo.dnd.Manager"]],defineResource:function(B){if(!B._hasResource["dijit._tree.dndSource"]){B._hasResource["dijit._tree.dndSource"]=true;
B.provide("dijit._tree.dndSource");
B.require("dijit._tree.dndSelector");
B.require("dojo.dnd.Manager");
B.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(F,A){if(!A){A={}
}B.mixin(this,A);
this.isSource=typeof A.isSource=="undefined"?true:A.isSource;
var G=A.accept instanceof Array?A.accept:["text"];
this.accept=null;
if(G.length){this.accept={};
for(var H=0;
H<G.length;
++H){this.accept[G[H]]=1
}}this.isDragging=false;
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
},startup:function(){},checkAcceptance:function(A,D){return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){this.inherited("destroy",arguments);
B.forEach(this.topics,B.unsubscribe);
this.targetAnchor=null
},markupFactory:function(A,D){A._skipStartup=true;
return new dijit._tree.dndSource(D,A)
},onMouseMove:function(H){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var L=B.dnd.manager();
if(this.isDragging){if(this.allowBetween){var I=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:B.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){I=(H.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{I=(H.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||I!=this.before){this._markTargetAnchor(I);
L.canDrop(!this.current||L.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var A=this.getSelectedNodes();
var K=[];
for(var J in A){K.push(A[J])
}if(K.length){L.startDrag(this,K,this.copyState(B.dnd.getCopyKeyState(H)))
}}}},onMouseDown:function(A){this.mouseDown=true;
this.mouseButton=A.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(F){var A=F.relatedTarget;
while(A){if(A==this.node){break
}try{A=A.parentNode
}catch(G){A=null
}}if(!A){this._changeState("Container","Over");
this.onOverEvent()
}A=this._getChildByEvent(F);
if(this.current==A){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(A){this._addItemClass(A,"Over");
if(this.isDragging){var H=B.dnd.manager();
if(this.checkItemAcceptance(A,H.source)){H.canDrop(this.targetState!="Disabled"&&(!this.current||H.source!=this||!(this.current.id in this.selection)))
}else{H.canDrop(false)
}}}else{if(this.isDragging){var H=B.dnd.manager();
if(H.source&&this.checkAcceptance(H.source,H.source.getSelectedNodes())){H.canDrop(this.targetState!="Disabled"&&(!this.current||H.source!=this||!(this.current.id in this.selection)))
}else{H.canDrop(false)
}}}this.current=A
},checkItemAcceptance:function(D,A){return true
},onDndSourceOver:function(A){if(this!=A){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var D=B.dnd.manager();
D.canDrop(this.targetState!="Disabled"&&(!this.current||D.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(G,H,A){if(this.isSource){this._changeState("Source",this==G?(A?"Copied":"Moved"):"")
}var F=this.checkAcceptance(G,H);
this._changeState("Target",F?"":"Disabled");
if(F){B.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(E){var F=[];
for(var A=0;
A<E.length;
A++){F.push({name:E[A].textContent,id:E[A].id})
}return F
},onDndDrop:function(J,M,A){if(this.containerState=="Over"){this.isDragging=false;
var I=this.current;
var N=this.itemCreator(M,I);
if(!I||I==this.tree.domNode){for(var K=0;
K<N.length;
K++){this.tree.store.newItem(N[K],null)
}}else{for(var K=0;
K<N.length;
K++){pInfo={parent:dijit.getEnclosingWidget(I).item,attribute:"children"};
var L=this.tree.store.newItem(N[K],pInfo);
console.log("newItem:",L)
}}}this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){this.inherited("onOverEvent",arguments);
B.dnd.manager().overSource(this)
},onOutEvent:function(){this.inherited("onOutEvent",arguments);
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
}});
B.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(D,A){this.isSource=false;
B.removeClass(this.node,"dojoDndSource")
},markupFactory:function(A,D){A._skipStartup=true;
return new dijit._tree.dndTarget(D,A)
}})
}}});