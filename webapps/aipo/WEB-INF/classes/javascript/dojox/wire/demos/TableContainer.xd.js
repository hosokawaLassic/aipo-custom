dojo._xdResourceLoaded({depends:[["provide","dojox.wire.demos.TableContainer"],["require","dojo.parser"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dojox.wire.demos.TableContainer"]){B._hasResource["dojox.wire.demos.TableContainer"]=true;
B.provide("dojox.wire.demos.TableContainer");
B.require("dojo.parser");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(A){try{var H=document.createElement("tr");
if((this.rowCount%2)===0){B.addClass(H,"alternate")
}this.rowCount++;
for(var K in A){var L=document.createElement("td");
var I=document.createTextNode(A[K]);
L.appendChild(I);
H.appendChild(L)
}this.tableContainer.appendChild(H)
}catch(J){console.debug(J)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var G=this.headers.split(",");
var I=document.createElement("tr");
for(i in G){var A=G[i];
var J=document.createElement("th");
var H=document.createTextNode(A);
J.appendChild(H);
I.appendChild(J)
}this.tableContainer.appendChild(I)
}})
}}});