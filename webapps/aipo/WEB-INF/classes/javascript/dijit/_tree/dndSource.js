if(!dojo._hasResource["dijit._tree.dndSource"]){dojo._hasResource["dijit._tree.dndSource"]=true;
dojo.provide("dijit._tree.dndSource");
dojo.require("dijit._tree.dndSelector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dijit._tree.dndSource",dijit._tree.dndSelector,{isSource:true,copyOnly:false,skipForm:false,accept:["text"],constructor:function(G,F){if(!F){F={}
}dojo.mixin(this,F);
this.isSource=typeof F.isSource=="undefined"?true:F.isSource;
var H=F.accept instanceof Array?F.accept:["text"];
this.accept=null;
if(H.length){this.accept={};
for(var E=0;
E<H.length;
++E){this.accept[H[E]]=1
}}this.isDragging=false;
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
},startup:function(){},checkAcceptance:function(D,C){return true
},copyState:function(B){return this.copyOnly||B
},destroy:function(){this.inherited("destroy",arguments);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(D,C){D._skipStartup=true;
return new dijit._tree.dndSource(C,D)
},onMouseMove:function(I){if(this.isDragging&&this.targetState=="Disabled"){return 
}this.inherited("onMouseMove",arguments);
var G=dojo.dnd.manager();
if(this.isDragging){if(this.allowBetween){var J=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){J=(I.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{J=(I.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||J!=this.before){this._markTargetAnchor(J);
G.canDrop(!this.current||G.source!=this||!(this.current.id in this.selection))
}}}else{if(this.mouseDown&&this.isSource){var H=this.getSelectedNodes();
var L=[];
for(var K in H){L.push(H[K])
}if(L.length){G.startDrag(this,L,this.copyState(dojo.dnd.getCopyKeyState(I)))
}}}},onMouseDown:function(B){this.mouseDown=true;
this.mouseButton=B.button;
this.inherited("onMouseDown",arguments)
},onMouseUp:function(B){if(this.mouseDown){this.mouseDown=false;
this.inherited("onMouseUp",arguments)
}},onMouseOver:function(G){var F=G.relatedTarget;
while(F){if(F==this.node){break
}try{F=F.parentNode
}catch(H){F=null
}}if(!F){this._changeState("Container","Over");
this.onOverEvent()
}F=this._getChildByEvent(G);
if(this.current==F){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(F){this._addItemClass(F,"Over");
if(this.isDragging){var E=dojo.dnd.manager();
if(this.checkItemAcceptance(F,E.source)){E.canDrop(this.targetState!="Disabled"&&(!this.current||E.source!=this||!(this.current.id in this.selection)))
}else{E.canDrop(false)
}}}else{if(this.isDragging){var E=dojo.dnd.manager();
if(E.source&&this.checkAcceptance(E.source,E.source.getSelectedNodes())){E.canDrop(this.targetState!="Disabled"&&(!this.current||E.source!=this||!(this.current.id in this.selection)))
}else{E.canDrop(false)
}}}this.current=F
},checkItemAcceptance:function(C,D){return true
},onDndSourceOver:function(D){if(this!=D){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var C=dojo.dnd.manager();
C.canDrop(this.targetState!="Disabled"&&(!this.current||C.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(H,E,F){if(this.isSource){this._changeState("Source",this==H?(F?"Copied":"Moved"):"")
}var G=this.checkAcceptance(H,E);
this._changeState("Target",G?"":"Disabled");
if(G){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},itemCreator:function(F){var D=[];
for(var E=0;
E<F.length;
E++){D.push({name:F[E].textContent,id:F[E].id})
}return D
},onDndDrop:function(K,N,I){if(this.containerState=="Over"){this.isDragging=false;
var J=this.current;
var H=this.itemCreator(N,J);
if(!J||J==this.tree.domNode){for(var L=0;
L<H.length;
L++){this.tree.store.newItem(H[L],null)
}}else{for(var L=0;
L<H.length;
L++){pInfo={parent:dijit.getEnclosingWidget(J).item,attribute:"children"};
var M=this.tree.store.newItem(H[L],pInfo);
console.log("newItem:",M)
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
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){this.inherited("onOutEvent",arguments);
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
}});
dojo.declare("dijit._tree.dndTarget",dijit._tree.dndSource,{constructor:function(C,D){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(D,C){D._skipStartup=true;
return new dijit._tree.dndTarget(C,D)
}})
};