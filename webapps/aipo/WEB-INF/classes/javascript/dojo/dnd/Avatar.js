if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.require("dojo.dnd.common");
dojo.dnd.Avatar=function(B){this.manager=B;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var P=dojo.doc.createElement("table");
P.className="dojoDndAvatar";
P.style.position="absolute";
P.style.zIndex=1999;
P.style.margin="0px";
var I=dojo.doc.createElement("tbody");
var K=dojo.doc.createElement("tr");
K.className="dojoDndAvatarHeader";
var J=dojo.doc.createElement("td");
J.innerHTML=this._generateText();
K.appendChild(J);
dojo.style(K,"opacity",0.9);
I.appendChild(K);
var O=Math.min(5,this.manager.nodes.length);
var L=this.manager.source;
for(var N=0;
N<O;
++N){K=dojo.doc.createElement("tr");
K.className="dojoDndAvatarItem";
J=dojo.doc.createElement("td");
var M=L.creator?M=L._normalizedCreator(L.getItem(this.manager.nodes[N].id).data,"avatar").node:M=this.manager.nodes[N].cloneNode(true);
M.id="";
J.appendChild(M);
K.appendChild(J);
dojo.style(K,"opacity",(9-N)/10);
I.appendChild(K)
}P.appendChild(I);
this.node=P
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var F=this.node.getElementsByTagName("td");
for(var D=0;
D<F.length;
++D){var E=F[D];
if(dojo.hasClass(E.parentNode,"dojoDndAvatarHeader")){E.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
};