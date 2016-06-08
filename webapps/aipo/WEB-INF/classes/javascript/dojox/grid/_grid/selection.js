if(!dojo._hasResource["dojox.grid._grid.selection"]){dojo._hasResource["dojox.grid._grid.selection"]=true;
dojo.provide("dojox.grid._grid.selection");
dojo.declare("dojox.grid.selection",null,{constructor:function(B){this.grid=B;
this.selected=[]
},multiSelect:true,selected:null,updating:0,selectedIndex:-1,onCanSelect:function(B){return this.grid.onCanSelect(B)
},onCanDeselect:function(B){return this.grid.onCanDeselect(B)
},onSelected:function(B){return this.grid.onSelected(B)
},onDeselected:function(B){return this.grid.onDeselected(B)
},onChanging:function(){},onChanged:function(){return this.grid.onSelectionChanged()
},isSelected:function(B){return this.selected[B]
},getFirstSelected:function(){for(var D=0,C=this.selected.length;
D<C;
D++){if(this.selected[D]){return D
}}return -1
},getNextSelected:function(E){for(var F=E+1,D=this.selected.length;
F<D;
F++){if(this.selected[F]){return F
}}return -1
},getSelected:function(){var D=[];
for(var E=0,F=this.selected.length;
E<F;
E++){if(this.selected[E]){D.push(E)
}}return D
},getSelectedCount:function(){var D=0;
for(var C=0;
C<this.selected.length;
C++){if(this.selected[C]){D++
}}return D
},beginUpdate:function(){if(this.updating==0){this.onChanging()
}this.updating++
},endUpdate:function(){this.updating--;
if(this.updating==0){this.onChanged()
}},select:function(B){this.unselectAll(B);
this.addToSelection(B)
},addToSelection:function(B){B=Number(B);
if(this.selected[B]){this.selectedIndex=B
}else{if(this.onCanSelect(B)!==false){this.selectedIndex=B;
this.beginUpdate();
this.selected[B]=true;
this.grid.onSelected(B);
this.endUpdate()
}}},deselect:function(B){B=Number(B);
if(this.selectedIndex==B){this.selectedIndex=-1
}if(this.selected[B]){if(this.onCanDeselect(B)===false){return 
}this.beginUpdate();
delete this.selected[B];
this.grid.onDeselected(B);
this.endUpdate()
}},setSelected:function(D,C){this[(C?"addToSelection":"deselect")](D)
},toggleSelect:function(B){this.setSelected(B,!this.selected[B])
},insert:function(B){this.selected.splice(B,0,false);
if(this.selectedIndex>=B){this.selectedIndex++
}},remove:function(B){this.selected.splice(B,1);
if(this.selectedIndex>=B){this.selectedIndex--
}},unselectAll:function(D){for(var C in this.selected){if((C!=D)&&(this.selected[C]===true)){this.deselect(C)
}}},shiftSelect:function(F,H){var I=(F>=0?F:H),G=H;
if(I>G){G=I;
I=H
}for(var J=I;
J<=G;
J++){this.addToSelection(J)
}},clickSelect:function(F,E,H){this.beginUpdate();
if(!this.multiSelect){this.select(F)
}else{var G=this.selectedIndex;
if(!E){this.unselectAll(F)
}if(H){this.shiftSelect(G,F)
}else{if(E){this.toggleSelect(F)
}else{this.addToSelection(F)
}}}this.endUpdate()
},clickSelectEvent:function(B){this.clickSelect(B.rowIndex,B.ctrlKey,B.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
};