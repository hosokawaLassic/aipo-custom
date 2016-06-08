dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.selection"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.selection"]){B._hasResource["dojox.grid._grid.selection"]=true;
B.provide("dojox.grid._grid.selection");
B.declare("dojox.grid.selection",null,{constructor:function(A){this.grid=A;
this.selected=[]
},multiSelect:true,selected:null,updating:0,selectedIndex:-1,onCanSelect:function(A){return this.grid.onCanSelect(A)
},onCanDeselect:function(A){return this.grid.onCanDeselect(A)
},onSelected:function(A){return this.grid.onSelected(A)
},onDeselected:function(A){return this.grid.onDeselected(A)
},onChanging:function(){},onChanged:function(){return this.grid.onSelectionChanged()
},isSelected:function(A){return this.selected[A]
},getFirstSelected:function(){for(var A=0,D=this.selected.length;
A<D;
A++){if(this.selected[A]){return A
}}return -1
},getNextSelected:function(A){for(var E=A+1,F=this.selected.length;
E<F;
E++){if(this.selected[E]){return E
}}return -1
},getSelected:function(){var F=[];
for(var A=0,E=this.selected.length;
A<E;
A++){if(this.selected[A]){F.push(A)
}}return F
},getSelectedCount:function(){var A=0;
for(var D=0;
D<this.selected.length;
D++){if(this.selected[D]){A++
}}return A
},beginUpdate:function(){if(this.updating==0){this.onChanging()
}this.updating++
},endUpdate:function(){this.updating--;
if(this.updating==0){this.onChanged()
}},select:function(A){this.unselectAll(A);
this.addToSelection(A)
},addToSelection:function(A){A=Number(A);
if(this.selected[A]){this.selectedIndex=A
}else{if(this.onCanSelect(A)!==false){this.selectedIndex=A;
this.beginUpdate();
this.selected[A]=true;
this.grid.onSelected(A);
this.endUpdate()
}}},deselect:function(A){A=Number(A);
if(this.selectedIndex==A){this.selectedIndex=-1
}if(this.selected[A]){if(this.onCanDeselect(A)===false){return 
}this.beginUpdate();
delete this.selected[A];
this.grid.onDeselected(A);
this.endUpdate()
}},setSelected:function(A,D){this[(D?"addToSelection":"deselect")](A)
},toggleSelect:function(A){this.setSelected(A,!this.selected[A])
},insert:function(A){this.selected.splice(A,0,false);
if(this.selectedIndex>=A){this.selectedIndex++
}},remove:function(A){this.selected.splice(A,1);
if(this.selectedIndex>=A){this.selectedIndex--
}},unselectAll:function(A){for(var D in this.selected){if((D!=A)&&(this.selected[D]===true)){this.deselect(D)
}}},shiftSelect:function(J,G){var H=(J>=0?J:G),A=G;
if(H>A){A=H;
H=G
}for(var I=H;
I<=A;
I++){this.addToSelection(I)
}},clickSelect:function(A,H,G){this.beginUpdate();
if(!this.multiSelect){this.select(A)
}else{var F=this.selectedIndex;
if(!H){this.unselectAll(A)
}if(G){this.shiftSelect(F,A)
}else{if(H){this.toggleSelect(A)
}else{this.addToSelection(A)
}}}this.endUpdate()
},clickSelectEvent:function(A){this.clickSelect(A.rowIndex,A.ctrlKey,A.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
}}});