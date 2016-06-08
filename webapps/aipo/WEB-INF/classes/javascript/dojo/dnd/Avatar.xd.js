dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Avatar"],["require","dojo.dnd.common"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.Avatar"]){B._hasResource["dojo.dnd.Avatar"]=true;
B.provide("dojo.dnd.Avatar");
B.require("dojo.dnd.common");
B.dnd.Avatar=function(A){this.manager=A;
this.construct()
};
B.extend(B.dnd.Avatar,{construct:function(){var O=B.doc.createElement("table");
O.className="dojoDndAvatar";
O.style.position="absolute";
O.style.zIndex=1999;
O.style.margin="0px";
var P=B.doc.createElement("tbody");
var J=B.doc.createElement("tr");
J.className="dojoDndAvatarHeader";
var A=B.doc.createElement("td");
A.innerHTML=this._generateText();
J.appendChild(A);
B.style(J,"opacity",0.9);
P.appendChild(J);
var N=Math.min(5,this.manager.nodes.length);
var K=this.manager.source;
for(var M=0;
M<N;
++M){J=B.doc.createElement("tr");
J.className="dojoDndAvatarItem";
A=B.doc.createElement("td");
var L=K.creator?L=K._normalizedCreator(K.getItem(this.manager.nodes[M].id).data,"avatar").node:L=this.manager.nodes[M].cloneNode(true);
L.id="";
A.appendChild(L);
J.appendChild(A);
B.style(J,"opacity",(9-M)/10);
P.appendChild(J)
}O.appendChild(P);
this.node=O
},destroy:function(){B._destroyElement(this.node);
this.node=false
},update:function(){B[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var E=this.node.getElementsByTagName("td");
for(var F=0;
F<E.length;
++F){var A=E[F];
if(B.hasClass(A.parentNode,"dojoDndAvatarHeader")){A.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}}});