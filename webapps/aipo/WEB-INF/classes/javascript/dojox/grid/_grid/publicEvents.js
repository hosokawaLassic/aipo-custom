if(!dojo._hasResource["dojox.grid._grid.publicEvents"]){dojo._hasResource["dojox.grid._grid.publicEvents"]=true;
dojo.provide("dojox.grid._grid.publicEvents");
dojox.grid.publicEvents={cellOverClass:"dojoxGrid-cell-over",onKeyEvent:function(B){this.dispatchKeyEvent(B)
},onContentEvent:function(B){this.dispatchContentEvent(B)
},onHeaderEvent:function(B){this.dispatchHeaderEvent(B)
},onStyleRow:function(inRow){with(inRow){customClasses+=(odd?" dojoxGrid-row-odd":"")+(selected?" dojoxGrid-row-selected":"")+(over?" dojoxGrid-row-over":"")
}this.focus.styleRow(inRow);
this.edit.styleRow(inRow)
},onKeyDown:function(D){if(D.altKey||D.ctrlKey||D.metaKey){return 
}switch(D.keyCode){case dojo.keys.ESCAPE:this.edit.cancel();
break;
case dojo.keys.ENTER:if(!D.shiftKey){var C=this.edit.isEditing();
this.edit.apply();
if(!C){this.edit.setEditCell(this.focus.cell,this.focus.rowIndex)
}}break;
case dojo.keys.TAB:this.focus[D.shiftKey?"previousKey":"nextKey"](D);
break;
case dojo.keys.LEFT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,-1)
}break;
case dojo.keys.RIGHT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,1)
}break;
case dojo.keys.UP_ARROW:if(!this.edit.isEditing()){this.focus.move(-1,0)
}break;
case dojo.keys.DOWN_ARROW:if(!this.edit.isEditing()){this.focus.move(1,0)
}break
}},onMouseOver:function(B){B.rowIndex==-1?this.onHeaderCellMouseOver(B):this.onCellMouseOver(B)
},onMouseOut:function(B){B.rowIndex==-1?this.onHeaderCellMouseOut(B):this.onCellMouseOut(B)
},onMouseOverRow:function(B){if(!this.rows.isOver(B.rowIndex)){this.rows.setOverRow(B.rowIndex);
B.rowIndex==-1?this.onHeaderMouseOver(B):this.onRowMouseOver(B)
}},onMouseOutRow:function(B){if(this.rows.isOver(-1)){this.onHeaderMouseOut(B)
}else{if(!this.rows.isOver(-2)){this.rows.setOverRow(-2);
this.onRowMouseOut(B)
}}},onCellMouseOver:function(B){dojo.addClass(B.cellNode,this.cellOverClass)
},onCellMouseOut:function(B){dojo.removeClass(B.cellNode,this.cellOverClass)
},onCellClick:function(B){this.focus.setFocusCell(B.cell,B.rowIndex);
this.onRowClick(B)
},onCellDblClick:function(B){this.edit.setEditCell(B.cell,B.rowIndex);
this.onRowDblClick(B)
},onCellContextMenu:function(B){this.onRowContextMenu(B)
},onCellFocus:function(C,D){this.edit.cellFocus(C,D)
},onRowClick:function(B){this.edit.rowClick(B);
this.selection.clickSelectEvent(B)
},onRowDblClick:function(B){},onRowMouseOver:function(B){},onRowMouseOut:function(B){},onRowContextMenu:function(B){dojo.stopEvent(B)
},onHeaderMouseOver:function(B){},onHeaderMouseOut:function(B){},onHeaderCellMouseOver:function(B){dojo.addClass(B.cellNode,this.cellOverClass)
},onHeaderCellMouseOut:function(B){dojo.removeClass(B.cellNode,this.cellOverClass)
},onHeaderClick:function(B){},onHeaderCellClick:function(B){this.setSortIndex(B.cell.index);
this.onHeaderClick(B)
},onHeaderDblClick:function(B){},onHeaderCellDblClick:function(B){this.onHeaderDblClick(B)
},onHeaderCellContextMenu:function(B){this.onHeaderContextMenu(B)
},onHeaderContextMenu:function(B){dojo.stopEvent(B)
},onStartEdit:function(C,D){},onApplyCellEdit:function(D,E,F){},onCancelEdit:function(B){},onApplyEdit:function(B){},onCanSelect:function(B){return true
},onCanDeselect:function(B){return true
},onSelected:function(B){this.updateRowStyles(B)
},onDeselected:function(B){this.updateRowStyles(B)
},onSelectionChanged:function(){}}
};