if(!dojo._hasResource["dojox.grid._grid.edit"]){dojo._hasResource["dojox.grid._grid.edit"]=true;
dojo.provide("dojox.grid._grid.edit");
dojo.declare("dojox.grid.edit",null,{constructor:function(B){this.grid=B;
this.connections=[];
if(dojo.isIE){this.connections.push(dojo.connect(document.body,"onfocus",dojo.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){dojo.forEach(this.connections,function(B){dojo.disconnect(B)
})
},cellFocus:function(C,D){if(this.grid.singleClickEdit||this.isEditRow(D)){this.setEditCell(C,D)
}else{this.apply()
}if(this.isEditing()||(C&&(C.editor||0).alwaysOn)){this._focusEditor(C,D)
}},rowClick:function(B){if(this.isEditing()&&!this.isEditRow(B.rowIndex)){this.apply()
}},styleRow:function(B){if(B.index==this.info.rowIndex){B.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(F){var E=F.cell,D=E&&E.editor;
return D&&D.dispatchEvent(F.dispatch,F)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(D,C){return(this.info.rowIndex===D)&&(this.info.cell.index==C)
},isEditRow:function(B){return this.info.rowIndex===B
},setEditCell:function(C,D){if(!this.isEditCell(D,C.index)){this.start(C,D,this.isEditRow(D)||C.editor)
}},_focusEditor:function(C,D){dojox.grid.fire(C.editor,"focus",[D])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(dojo.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(D,E,F){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(E)){this.applyRowEdit();
this.grid.updateRow(E)
}if(F){this.info={cell:D,rowIndex:E};
this.grid.doStartEdit(D,E);
this.grid.updateRow(E)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(D,E);
this._doCatchBoomerang()
},_editorDo:function(C){var D=this.info.cell;
D&&D.editor&&D.editor[C](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(D,F,E){this.grid.doApplyCellEdit(D,E,F.fieldIndex)
},applyRowEdit:function(){this.grid.doApplyEdit(this.info.rowIndex)
},apply:function(){if(this.isEditing()){this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang()
}},cancel:function(){if(this.isEditing()){this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang()
}},save:function(F,D){var E=this.info.cell;
if(this.isEditRow(F)&&(!D||E.view==D)&&E.editor){E.editor.save(E,this.info.rowIndex)
}},restore:function(D,F){var E=this.info.cell;
if(this.isEditRow(F)&&E.view==D&&E.editor){E.editor.restore(E,this.info.rowIndex)
}}})
};