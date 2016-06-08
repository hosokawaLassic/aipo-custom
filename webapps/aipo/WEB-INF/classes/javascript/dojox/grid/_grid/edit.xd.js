dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.edit"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.edit"]){B._hasResource["dojox.grid._grid.edit"]=true;
B.provide("dojox.grid._grid.edit");
B.declare("dojox.grid.edit",null,{constructor:function(A){this.grid=A;
this.connections=[];
if(B.isIE){this.connections.push(B.connect(document.body,"onfocus",B.hitch(this,"_boomerangFocus")))
}},info:{},destroy:function(){B.forEach(this.connections,function(A){B.disconnect(A)
})
},cellFocus:function(D,A){if(this.grid.singleClickEdit||this.isEditRow(A)){this.setEditCell(D,A)
}else{this.apply()
}if(this.isEditing()||(D&&(D.editor||0).alwaysOn)){this._focusEditor(D,A)
}},rowClick:function(A){if(this.isEditing()&&!this.isEditRow(A.rowIndex)){this.apply()
}},styleRow:function(A){if(A.index==this.info.rowIndex){A.customClasses+=" dojoxGrid-row-editing"
}},dispatchEvent:function(E){var A=E.cell,F=A&&A.editor;
return F&&F.dispatchEvent(E.dispatch,E)
},isEditing:function(){return this.info.rowIndex!==undefined
},isEditCell:function(A,D){return(this.info.rowIndex===A)&&(this.info.cell.index==D)
},isEditRow:function(A){return this.info.rowIndex===A
},setEditCell:function(D,A){if(!this.isEditCell(A,D.index)){this.start(D,A,this.isEditRow(A)||D.editor)
}},_focusEditor:function(D,A){dojox.grid.fire(D.editor,"focus",[A])
},focusEditor:function(){if(this.isEditing()){this._focusEditor(this.info.cell,this.info.rowIndex)
}},_boomerangWindow:500,_shouldCatchBoomerang:function(){return this._catchBoomerang>new Date().getTime()
},_boomerangFocus:function(){if(this._shouldCatchBoomerang()){this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0
}},_doCatchBoomerang:function(){if(B.isIE){this._catchBoomerang=new Date().getTime()+this._boomerangWindow
}},start:function(F,A,E){this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(A)){this.applyRowEdit();
this.grid.updateRow(A)
}if(E){this.info={cell:F,rowIndex:A};
this.grid.doStartEdit(F,A);
this.grid.updateRow(A)
}else{this.info={}
}this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(F,A);
this._doCatchBoomerang()
},_editorDo:function(D){var A=this.info.cell;
A&&A.editor&&A.editor[D](this.info.rowIndex)
},editorApply:function(){this._editorDo("apply")
},editorCancel:function(){this._editorDo("cancel")
},applyCellEdit:function(F,E,A){this.grid.doApplyCellEdit(F,A,E.fieldIndex)
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
}},save:function(E,F){var A=this.info.cell;
if(this.isEditRow(E)&&(!F||A.view==F)&&A.editor){A.editor.save(A,this.info.rowIndex)
}},restore:function(F,E){var A=this.info.cell;
if(this.isEditRow(E)&&A.view==F&&A.editor){A.editor.restore(A,this.info.rowIndex)
}}})
}}});