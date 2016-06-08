dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.layout"],["require","dojox.grid._grid.cell"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.layout"]){B._hasResource["dojox.grid._grid.layout"]=true;
B.provide("dojox.grid._grid.layout");
B.require("dojox.grid._grid.cell");
B.declare("dojox.grid.layout",null,{constructor:function(A){this.grid=A
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(J){this.fieldIndex=0;
this.cells=[];
var H=this.structure=[];
for(var I=0,A,G;
(A=J[I]);
I++){H.push(this.addViewDef(A))
}this.cellCount=this.cells.length
},addViewDef:function(A){this._defaultCellProps=A.defaultCell||{};
return B.mixin({},A,{rows:this.addRowsDef(A.rows||A.cells)})
},addRowsDef:function(F){var H=[];
for(var G=0,A;
F&&(A=F[G]);
G++){H.push(this.addRowDef(G,A))
}return H
},addRowDef:function(A,I){var K=[];
for(var J=0,H,L;
(H=I[J]);
J++){L=this.addCellDef(A,J,H);
K.push(L);
this.cells.push(L)
}return K
},addCellDef:function(A,I,G){var J=0;
if(G.colSpan>1){J=0
}else{if(!isNaN(G.width)){J=G.width+"em"
}else{J=G.width||this.defaultWidth
}}var H=G.field!=undefined?G.field:(G.get?-1:this.fieldIndex);
if((G.field!=undefined)||!G.get){this.fieldIndex=(G.field>-1?G.field:this.fieldIndex)+1
}return new dojox.grid.cell(B.mixin({},this._defaultCellProps,G,{grid:this.grid,subrow:A,layoutIndex:I,index:this.cells.length,fieldIndex:H,unitWidth:J}))
}})
}}});