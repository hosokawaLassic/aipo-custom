if(!dojo._hasResource["dojox.grid._grid.rows"]){dojo._hasResource["dojox.grid._grid.rows"]=true;
dojo.provide("dojox.grid._grid.rows");
dojo.declare("dojox.grid.rows",null,{constructor:function(B){this.grid=B
},linesToEms:2,defaultRowHeight:1,overRow:-2,getHeight:function(B){return""
},getDefaultHeightPx:function(){return 32
},prepareStylingRow:function(D,C){return{index:D,node:C,odd:Boolean(D&1),selected:this.grid.selection.isSelected(D),over:this.isOver(D),customStyles:"",customClasses:"dojoxGrid-row"}
},styleRowNode:function(E,D){var F=this.prepareStylingRow(E,D);
this.grid.onStyleRow(F);
this.applyStyles(F)
},applyStyles:function(inRow){with(inRow){node.className=customClasses;
var h=node.style.height;
dojox.grid.setStyleText(node,customStyles+";"+(node._style||""));
node.style.height=h
}},updateStyles:function(B){this.grid.updateRowStyles(B)
},setOverRow:function(D){var C=this.overRow;
this.overRow=D;
if((C!=this.overRow)&&(C>=0)){this.updateStyles(C)
}this.updateStyles(this.overRow)
},isOver:function(B){return(this.overRow==B)
}})
};