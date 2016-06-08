dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Container"],["require","dojo.dnd.common"],["require","dojo.parser"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Container"]){B._hasResource["dojo.dnd.Container"]=true;
B.provide("dojo.dnd.Container");
B.require("dojo.dnd.common");
B.require("dojo.parser");
B.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(D,A){this.node=B.byId(D);
if(!A){A={}
}this.creator=A.creator||null;
this.skipForm=A.skipForm;
this.defaultCreator=B.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
B.addClass(this.node,"dojoDndContainer");
if(!(A&&A._skipStartup)){this.startup()
}this.events=[B.connect(this.node,"onmouseover",this,"onMouseOver"),B.connect(this.node,"onmouseout",this,"onMouseOut"),B.connect(this.node,"ondragstart",this,"onSelectStart"),B.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(A){return this.map[A]
},setItem:function(D,A){this.map[D]=A
},delItem:function(A){delete this.map[A]
},forInItems:function(H,A){A=A||B.global;
var J=this.map,G=B.dnd._empty;
for(var I in this.map){if(I in G){continue
}H.call(A,J[I],I,J)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return B.query("> .dojoDndItem",this.parent)
},insertNodes:function(A,G,J){if(!this.parent.firstChild){J=null
}else{if(G){if(!J){J=this.parent.firstChild
}}else{if(J){J=J.nextSibling
}}}if(J){for(var H=0;
H<A.length;
++H){var I=this._normalizedCreator(A[H]);
this.setItem(I.node.id,{data:I.data,type:I.type});
this.parent.insertBefore(I.node,J)
}}else{for(var H=0;
H<A.length;
++H){var I=this._normalizedCreator(A[H]);
this.setItem(I.node.id,{data:I.data,type:I.type});
this.parent.appendChild(I.node)
}}return this
},destroy:function(){B.forEach(this.events,B.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(A,D){A._skipStartup=true;
return new B.dnd.Container(D,A)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var A=this.parent.getElementsByTagName("tbody");
if(A&&A.length){this.parent=A[0]
}}B.query("> .dojoDndItem",this.parent).forEach(function(G){if(!G.id){G.id=B.dnd.getUniqueId()
}var H=G.getAttribute("dndType"),F=G.getAttribute("dndData");
this.setItem(G.id,{data:F?F:G.innerHTML,type:H?H.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(E){var A=E.relatedTarget;
while(A){if(A==this.node){break
}try{A=A.parentNode
}catch(F){A=null
}}if(!A){this._changeState("Container","Over");
this.onOverEvent()
}A=this._getChildByEvent(E);
if(this.current==A){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(A){this._addItemClass(A,"Over")
}this.current=A
},onMouseOut:function(E){for(var A=E.relatedTarget;
A;
){if(A==this.node){return 
}try{A=A.parentNode
}catch(F){A=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(A){if(!this.skipForm||!B.dnd.isFormElement(A)){B.stopEvent(A)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(H,A){var F="dojoDnd"+H;
var G=H.toLowerCase()+"State";
B.removeClass(this.node,F+this[G]);
B.addClass(this.node,F+A);
this[G]=A
},_addItemClass:function(A,D){B.addClass(A,"dojoDndItem"+D)
},_removeItemClass:function(A,D){B.removeClass(A,"dojoDndItem"+D)
},_getChildByEvent:function(A){var E=A.target;
if(E){for(var F=E.parentNode;
F;
E=F,F=E.parentNode){if(F==this.parent&&B.hasClass(E,"dojoDndItem")){return E
}}}return null
},_normalizedCreator:function(E,A){var F=(this.creator?this.creator:this.defaultCreator)(E,A);
if(!B.isArray(F.type)){F.type=["text"]
}if(!F.node.id){F.node.id=B.dnd.getUniqueId()
}B.addClass(F.node,"dojoDndItem");
return F
}});
B.dnd._createNode=function(A){if(!A){return B.dnd._createSpan
}return function(F){var E=B.doc.createElement(A);
E.innerHTML=F;
return E
}
};
B.dnd._createTrTd=function(E){var F=B.doc.createElement("tr");
var A=B.doc.createElement("td");
A.innerHTML=E;
F.appendChild(A);
return F
};
B.dnd._createSpan=function(D){var A=B.doc.createElement("span");
A.innerHTML=D;
return A
};
B.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
B.dnd._defaultCreator=function(E){var F=E.tagName.toLowerCase();
var A=F=="table"?B.dnd._createTrTd:B.dnd._createNode(B.dnd._defaultCreatorNodes[F]);
return function(M,D){var P=B.isObject(M)&&M;
var L=(P&&M.data)?M.data:M;
var N=(P&&M.type)?M.type:["text"];
var O=String(L),C=(D=="avatar"?B.dnd._createSpan:A)(O);
C.id=B.dnd.getUniqueId();
return{node:C,data:L,type:N}
}
}
}}});