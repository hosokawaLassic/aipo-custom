if(!dojo._hasResource["dojox.grid._grid.layout"]){dojo._hasResource["dojox.grid._grid.layout"]=true;
dojo.provide("dojox.grid._grid.layout");
dojo.require("dojox.grid._grid.cell");
dojo.declare("dojox.grid.layout",null,{constructor:function(B){this.grid=B
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(F){this.fieldIndex=0;
this.cells=[];
var I=this.structure=[];
for(var J=0,G,H;
(G=F[J]);
J++){I.push(this.addViewDef(G))
}this.cellCount=this.cells.length
},addViewDef:function(B){this._defaultCellProps=B.defaultCell||{};
return dojo.mixin({},B,{rows:this.addRowsDef(B.rows||B.cells)})
},addRowsDef:function(G){var E=[];
for(var H=0,F;
G&&(F=G[H]);
H++){E.push(this.addRowDef(H,F))
}return E
},addRowDef:function(H,J){var L=[];
for(var K=0,I,G;
(I=J[K]);
K++){G=this.addCellDef(H,K,I);
L.push(G);
this.cells.push(G)
}return L
},addCellDef:function(G,J,H){var F=0;
if(H.colSpan>1){F=0
}else{if(!isNaN(H.width)){F=H.width+"em"
}else{F=H.width||this.defaultWidth
}}var I=H.field!=undefined?H.field:(H.get?-1:this.fieldIndex);
if((H.field!=undefined)||!H.get){this.fieldIndex=(H.field>-1?H.field:this.fieldIndex)+1
}return new dojox.grid.cell(dojo.mixin({},this._defaultCellProps,H,{grid:this.grid,subrow:G,layoutIndex:J,index:this.cells.length,fieldIndex:I,unitWidth:F}))
}})
};