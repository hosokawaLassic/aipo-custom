dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.rowbar"],["require","dojox.grid._grid.view"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.rowbar"]){B._hasResource["dojox.grid._grid.rowbar"]=true;
B.provide("dojox.grid._grid.rowbar");
B.require("dojox.grid._grid.view");
B.declare("dojox.GridRowView",dojox.GridView,{defaultWidth:"3em",noscroll:true,padBorderWidth:2,buildRendering:function(){this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden"
},getWidth:function(){return this.viewWidth||this.defaultWidth
},buildRowContent:function(A,E){var F=this.contentNode.offsetWidth-this.padBorderWidth;
E.innerHTML='<table style="width:'+F+'px;" role="wairole:presentation"><tr><td class="dojoxGrid-rowbar-inner"></td></tr></table>'
},renderHeader:function(){},resize:function(){this.resizeHeight()
},doStyleRowNode:function(E,F){var A=["dojoxGrid-rowbar"];
if(this.grid.rows.isOver(E)){A.push("dojoxGrid-rowbar-over")
}if(this.grid.selection.isSelected(E)){A.push("dojoxGrid-rowbar-selected")
}F.className=A.join(" ")
},domouseover:function(A){this.grid.onMouseOverRow(A)
},domouseout:function(A){if(!this.isIntraRowEvent(A)){this.grid.onMouseOutRow(A)
}}})
}}});