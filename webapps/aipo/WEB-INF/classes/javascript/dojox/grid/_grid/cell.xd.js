dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.cell"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.cell"]){B._hasResource["dojox.grid._grid.cell"]=true;
B.provide("dojox.grid._grid.cell");
B.declare("dojox.grid.cell",null,{styles:"",constructor:function(A){B.mixin(this,A);
if(this.editor){this.editor=new this.editor(this)
}},format:function(A){var G,H=this.grid.edit.info,F=this.get?this.get(A):this.value;
if(this.editor&&(this.editor.alwaysOn||(H.rowIndex==A&&H.cell==this))){return this.editor.format(F,A)
}else{return(G=this.formatter)?G.call(this,F,A):F
}},getNode:function(A){return this.view.getCellNode(A,this.index)
},isFlex:function(){var A=this.unitWidth;
return A&&(A=="auto"||A.slice(-1)=="%")
},applyEdit:function(D,A){this.grid.edit.applyCellEdit(D,this,A)
},cancelEdit:function(A){this.grid.doCancelEdit(A)
},_onEditBlur:function(A){if(this.grid.edit.isEditCell(A,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(A,D){if(this.commitOnBlur){B.connect(A,"onblur",function(C){setTimeout(B.hitch(this,"_onEditBlur",D),250)
})
}}})
}}});