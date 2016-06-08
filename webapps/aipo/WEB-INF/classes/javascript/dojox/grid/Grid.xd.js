dojo._xdResourceLoaded({depends:[["provide","dojox.grid.Grid"],["require","dojox.grid.VirtualGrid"],["require","dojox.grid._data.model"],["require","dojox.grid._data.editors"]],defineResource:function(B){if(!B._hasResource["dojox.grid.Grid"]){B._hasResource["dojox.grid.Grid"]=true;
B.provide("dojox.grid.Grid");
B.require("dojox.grid.VirtualGrid");
B.require("dojox.grid._data.model");
B.require("dojox.grid._data.editors");
B.declare("dojox.Grid",dojox.VirtualGrid,{model:"dojox.grid.data.Table",postCreate:function(){if(this.model){var A=this.model;
if(B.isString(A)){A=B.getObject(A)
}this.model=(B.isFunction(A))?new A():A;
this._setModel(this.model)
}this.inherited(arguments)
},destroy:function(){this.setModel(null);
this.inherited(arguments)
},_structureChanged:function(){this.indexCellFields();
this.inherited(arguments)
},_setModel:function(A){this.model=A;
if(this.model){this.model.observer(this);
this.model.measure();
this.indexCellFields()
}},setModel:function(A){if(this.model){this.model.notObserver(this)
}this._setModel(A)
},get:function(A){return this.grid.model.getDatum(A,this.fieldIndex)
},modelAllChange:function(){this.rowCount=(this.model?this.model.getRowCount():0);
this.updateRowCount(this.rowCount)
},modelRowChange:function(D,A){this.updateRow(A)
},modelDatumChange:function(A,E,F){this.updateRow(E)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(A){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(A){this.updateRowCount(this.model.getRowCount())
},getCellName:function(A){var F=this.model.fields.values,E=A.fieldIndex;
return E>=0&&E<F.length&&F[E].name||this.inherited(arguments)
},indexCellFields:function(){var F=this.layout.cells;
for(var E=0,A;
F&&(A=F[E]);
E++){if(B.isString(A.field)){A.fieldIndex=this.model.fields.indexOf(A.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(D){var A=this.getSortField(D);
return A&&this.model.canSort(A)
},getSortField:function(D){var A=this.getCell(this.getSortIndex(D));
return(A.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(J,A){this.edit.apply();
var H=A||-1;
if(H<0){H=this.selection.getFirstSelected()||0
}if(H<0){H=0
}this.model.insert(J,H);
this.model.beginModifyRow(H);
for(var I=0,G;
((G=this.getCell(I))&&!G.editor);
I++){}if(G&&G.editor){this.edit.setEditCell(G,H)
}},removeSelectedRows:function(){this.edit.apply();
var A=this.selection.getSelected();
if(A.length){this.model.remove(A);
this.selection.clear()
}},canEdit:function(D,A){return(this.model.canModify?this.model.canModify(A):true)
},doStartEdit:function(F,A){var E=this.canEdit(F,A);
if(E){this.model.beginModifyRow(A);
this.onStartEdit(F,A)
}return E
},doApplyCellEdit:function(F,A,E){this.model.setDatum(F,A,E);
this.onApplyCellEdit(F,A,E)
},doCancelEdit:function(A){this.model.cancelModifyRow(A);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(A){this.model.endModifyRow(A);
this.onApplyEdit(A)
},styleRowState:function(H){if(this.model.getState){var L=this.model.getState(H.index),A="";
for(var J=0,K=["inflight","error","inserting"],I;
I=K[J];
J++){if(L[I]){A=" dojoxGrid-row-"+I;
break
}}H.customClasses+=A
}},onStyleRow:function(A){this.styleRowState(A);
this.inherited(arguments)
},junk:0})
}}});