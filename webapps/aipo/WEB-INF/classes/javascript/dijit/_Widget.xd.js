dojo._xdResourceLoaded({depends:[["provide","dijit._Widget"],["require","dijit._base"]],defineResource:function(B){if(!B._hasResource["dijit._Widget"]){B._hasResource["dijit._Widget"]=true;
B.provide("dijit._Widget");
B.require("dijit._base");
B.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(A,D){this.create(A,D)
},create:function(A,I){this.srcNodeRef=B.byId(I);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(A){B.mixin(this,A)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var J in this.attributeMap){var G=this[this.attributeMap[J]||"domNode"];
var H=this[J];
if(typeof H!="object"&&(H!==""||(A&&A[J]))){switch(J){case"class":B.addClass(G,H);
break;
case"style":if(G.style.cssText){G.style.cssText+="; "+H
}else{G.style.cssText=H
}break;
default:G.setAttribute(J,H)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||B.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(A){this.destroyDescendants();
this.destroy()
},destroy:function(A){this.uninitialize();
B.forEach(this._connects,function(D){B.forEach(D,B.disconnect)
});
this.destroyRendering(A);
dijit.registry.remove(this.id)
},destroyRendering:function(A){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){B._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){B._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){B.forEach(this.getDescendants(),function(A){A.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var A=B.query("[widgetId]",this.domNode);
return A.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(G,H,A){var I=[];
if(H=="ondijitclick"){var J=this;
if(!this.nodesWithKeyClick[G.nodeName]){I.push(B.connect(G,"onkeydown",this,function(C){if(C.keyCode==B.keys.ENTER){return(B.isString(A))?J[A](C):A.call(J,C)
}else{if(C.keyCode==B.keys.SPACE){B.stopEvent(C)
}}}));
I.push(B.connect(G,"onkeyup",this,function(C){if(C.keyCode==B.keys.SPACE){return B.isString(A)?J[A](C):A.call(J,C)
}}))
}H="onclick"
}I.push(B.connect(G,H,this,A));
this._connects.push(I);
return I
},disconnect:function(A){for(var D=0;
D<this._connects.length;
D++){if(this._connects[D]==A){B.forEach(A,B.disconnect);
this._connects.splice(D,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=B.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(B.style(this.domNode,"display")!="none")
}})
}}});