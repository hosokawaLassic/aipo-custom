if(!dojo._hasResource["dojox.grid._grid.cell"]){dojo._hasResource["dojox.grid._grid.cell"]=true;
dojo.provide("dojox.grid._grid.cell");
dojo.declare("dojox.grid.cell",null,{styles:"",constructor:function(B){dojo.mixin(this,B);
if(this.editor){this.editor=new this.editor(this)
}},format:function(F){var H,E=this.grid.edit.info,G=this.get?this.get(F):this.value;
if(this.editor&&(this.editor.alwaysOn||(E.rowIndex==F&&E.cell==this))){return this.editor.format(G,F)
}else{return(H=this.formatter)?H.call(this,G,F):G
}},getNode:function(B){return this.view.getCellNode(B,this.index)
},isFlex:function(){var B=this.unitWidth;
return B&&(B=="auto"||B.slice(-1)=="%")
},applyEdit:function(C,D){this.grid.edit.applyCellEdit(C,this,D)
},cancelEdit:function(B){this.grid.doCancelEdit(B)
},_onEditBlur:function(B){if(this.grid.edit.isEditCell(B,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(D,C){if(this.commitOnBlur){dojo.connect(D,"onblur",function(A){setTimeout(dojo.hitch(this,"_onEditBlur",C),250)
})
}}})
};