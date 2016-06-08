if(!dojo._hasResource["dojox.grid._grid.rowbar"]){dojo._hasResource["dojox.grid._grid.rowbar"]=true;
dojo.provide("dojox.grid._grid.rowbar");
dojo.require("dojox.grid._grid.view");
dojo.declare("dojox.GridRowView",dojox.GridView,{defaultWidth:"3em",noscroll:true,padBorderWidth:2,buildRendering:function(){this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden"
},getWidth:function(){return this.viewWidth||this.defaultWidth
},buildRowContent:function(E,F){var D=this.contentNode.offsetWidth-this.padBorderWidth;
F.innerHTML='<table style="width:'+D+'px;" role="wairole:presentation"><tr><td class="dojoxGrid-rowbar-inner"></td></tr></table>'
},renderHeader:function(){},resize:function(){this.resizeHeight()
},doStyleRowNode:function(F,D){var E=["dojoxGrid-rowbar"];
if(this.grid.rows.isOver(F)){E.push("dojoxGrid-rowbar-over")
}if(this.grid.selection.isSelected(F)){E.push("dojoxGrid-rowbar-selected")
}D.className=E.join(" ")
},domouseover:function(B){this.grid.onMouseOverRow(B)
},domouseout:function(B){if(!this.isIntraRowEvent(B)){this.grid.onMouseOutRow(B)
}}})
};