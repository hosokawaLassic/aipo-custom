if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.require("dojo.dnd.common");
dojo.require("dojo.parser");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(C,D){this.node=dojo.byId(C);
if(!D){D={}
}this.creator=D.creator||null;
this.skipForm=D.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(D&&D._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(B){return this.map[B]
},setItem:function(C,D){this.map[C]=D
},delItem:function(B){delete this.map[B]
},forInItems:function(I,G){G=G||dojo.global;
var F=this.map,H=dojo.dnd._empty;
for(var J in this.map){if(J in H){continue
}I.call(G,F[J],J,F)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(G,H,F){if(!this.parent.firstChild){F=null
}else{if(H){if(!F){F=this.parent.firstChild
}}else{if(F){F=F.nextSibling
}}}if(F){for(var I=0;
I<G.length;
++I){var J=this._normalizedCreator(G[I]);
this.setItem(J.node.id,{data:J.data,type:J.type});
this.parent.insertBefore(J.node,F)
}}else{for(var I=0;
I<G.length;
++I){var J=this._normalizedCreator(G[I]);
this.setItem(J.node.id,{data:J.data,type:J.type});
this.parent.appendChild(J.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(D,C){D._skipStartup=true;
return new dojo.dnd.Container(C,D)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var B=this.parent.getElementsByTagName("tbody");
if(B&&B.length){this.parent=B[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(E){if(!E.id){E.id=dojo.dnd.getUniqueId()
}var F=E.getAttribute("dndType"),A=E.getAttribute("dndData");
this.setItem(E.id,{data:A?A:E.innerHTML,type:F?F.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(F){var E=F.relatedTarget;
while(E){if(E==this.node){break
}try{E=E.parentNode
}catch(D){E=null
}}if(!E){this._changeState("Container","Over");
this.onOverEvent()
}E=this._getChildByEvent(F);
if(this.current==E){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(E){this._addItemClass(E,"Over")
}this.current=E
},onMouseOut:function(F){for(var E=F.relatedTarget;
E;
){if(E==this.node){return 
}try{E=E.parentNode
}catch(D){E=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(B){if(!this.skipForm||!dojo.dnd.isFormElement(B)){dojo.stopEvent(B)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(E,F){var G="dojoDnd"+E;
var H=E.toLowerCase()+"State";
dojo.removeClass(this.node,G+this[H]);
dojo.addClass(this.node,G+F);
this[H]=F
},_addItemClass:function(D,C){dojo.addClass(D,"dojoDndItem"+C)
},_removeItemClass:function(D,C){dojo.removeClass(D,"dojoDndItem"+C)
},_getChildByEvent:function(E){var F=E.target;
if(F){for(var D=F.parentNode;
D;
F=D,D=F.parentNode){if(D==this.parent&&dojo.hasClass(F,"dojoDndItem")){return F
}}}return null
},_normalizedCreator:function(F,E){var D=(this.creator?this.creator:this.defaultCreator)(F,E);
if(!dojo.isArray(D.type)){D.type=["text"]
}if(!D.node.id){D.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(D.node,"dojoDndItem");
return D
}});
dojo.dnd._createNode=function(B){if(!B){return dojo.dnd._createSpan
}return function(D){var A=dojo.doc.createElement(B);
A.innerHTML=D;
return A
}
};
dojo.dnd._createTrTd=function(F){var D=dojo.doc.createElement("tr");
var E=dojo.doc.createElement("td");
E.innerHTML=F;
D.appendChild(E);
return D
};
dojo.dnd._createSpan=function(C){var D=dojo.doc.createElement("span");
D.innerHTML=C;
return D
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(F){var D=F.tagName.toLowerCase();
var E=D=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[D]);
return function(K,B){var N=dojo.isObject(K)&&K;
var C=(N&&K.data)?K.data:K;
var L=(N&&K.type)?K.type:["text"];
var M=String(C),A=(B=="avatar"?dojo.dnd._createSpan:E)(M);
A.id=dojo.dnd.getUniqueId();
return{node:A,data:C,type:L}
}
}
};