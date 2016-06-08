if(!dojo._hasResource["dojox.wire.demos.TableContainer"]){dojo._hasResource["dojox.wire.demos.TableContainer"]=true;
dojo.provide("dojox.wire.demos.TableContainer");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(H){try{var I=document.createElement("tr");
if((this.rowCount%2)===0){dojo.addClass(I,"alternate")
}this.rowCount++;
for(var L in H){var G=document.createElement("td");
var J=document.createTextNode(H[L]);
G.appendChild(J);
I.appendChild(G)
}this.tableContainer.appendChild(I)
}catch(K){console.debug(K)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var H=this.headers.split(",");
var J=document.createElement("tr");
for(i in H){var G=H[i];
var F=document.createElement("th");
var I=document.createTextNode(G);
F.appendChild(I);
J.appendChild(F)
}this.tableContainer.appendChild(J)
}})
};