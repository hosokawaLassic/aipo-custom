if(!dojo._hasResource["dojox.grid.Grid"]){dojo._hasResource["dojox.grid.Grid"]=true;
dojo.provide("dojox.grid.Grid");
dojo.require("dojox.grid.VirtualGrid");
dojo.require("dojox.grid._data.model");
dojo.require("dojox.grid._data.editors");
dojo.declare("dojox.Grid",dojox.VirtualGrid,{model:"dojox.grid.data.Table",postCreate:function(){if(this.model){var B=this.model;
if(dojo.isString(B)){B=dojo.getObject(B)
}this.model=(dojo.isFunction(B))?new B():B;
this._setModel(this.model)
}this.inherited(arguments)
},destroy:function(){this.setModel(null);
this.inherited(arguments)
},_structureChanged:function(){this.indexCellFields();
this.inherited(arguments)
},_setModel:function(B){this.model=B;
if(this.model){this.model.observer(this);
this.model.measure();
this.indexCellFields()
}},setModel:function(B){if(this.model){this.model.notObserver(this)
}this._setModel(B)
},get:function(B){return this.grid.model.getDatum(B,this.fieldIndex)
},modelAllChange:function(){this.rowCount=(this.model?this.model.getRowCount():0);
this.updateRowCount(this.rowCount)
},modelRowChange:function(C,D){this.updateRow(D)
},modelDatumChange:function(E,F,D){this.updateRow(F)
},modelFieldsChange:function(){this.indexCellFields();
this.render()
},modelInsertion:function(B){this.updateRowCount(this.model.getRowCount())
},modelRemoval:function(B){this.updateRowCount(this.model.getRowCount())
},getCellName:function(E){var D=this.model.fields.values,F=E.fieldIndex;
return F>=0&&F<D.length&&D[F].name||this.inherited(arguments)
},indexCellFields:function(){var D=this.layout.cells;
for(var F=0,E;
D&&(E=D[F]);
F++){if(dojo.isString(E.field)){E.fieldIndex=this.model.fields.indexOf(E.field)
}}},refresh:function(){this.edit.cancel();
this.model.measure()
},canSort:function(C){var D=this.getSortField(C);
return D&&this.model.canSort(D)
},getSortField:function(C){var D=this.getCell(this.getSortIndex(C));
return(D.fieldIndex+1)*(this.sortInfo>0?1:-1)
},sort:function(){this.edit.apply();
this.model.sort(this.getSortField())
},addRow:function(F,G){this.edit.apply();
var I=G||-1;
if(I<0){I=this.selection.getFirstSelected()||0
}if(I<0){I=0
}this.model.insert(F,I);
this.model.beginModifyRow(I);
for(var J=0,H;
((H=this.getCell(J))&&!H.editor);
J++){}if(H&&H.editor){this.edit.setEditCell(H,I)
}},removeSelectedRows:function(){this.edit.apply();
var B=this.selection.getSelected();
if(B.length){this.model.remove(B);
this.selection.clear()
}},canEdit:function(C,D){return(this.model.canModify?this.model.canModify(D):true)
},doStartEdit:function(D,E){var F=this.canEdit(D,E);
if(F){this.model.beginModifyRow(E);
this.onStartEdit(D,E)
}return F
},doApplyCellEdit:function(D,E,F){this.model.setDatum(D,E,F);
this.onApplyCellEdit(D,E,F)
},doCancelEdit:function(B){this.model.cancelModifyRow(B);
this.onCancelEdit.apply(this,arguments)
},doApplyEdit:function(B){this.model.endModifyRow(B);
this.onApplyEdit(B)
},styleRowState:function(I){if(this.model.getState){var G=this.model.getState(I.index),H="";
for(var K=0,L=["inflight","error","inserting"],J;
J=L[K];
K++){if(G[J]){H=" dojoxGrid-row-"+J;
break
}}I.customClasses+=H
}},onStyleRow:function(B){this.styleRowState(B);
this.inherited(arguments)
},junk:0})
};