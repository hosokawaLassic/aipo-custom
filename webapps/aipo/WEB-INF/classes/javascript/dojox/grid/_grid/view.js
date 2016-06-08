if(!dojo._hasResource["dojox.grid._grid.view"]){dojo._hasResource["dojox.grid._grid.view"]=true;
dojo.provide("dojox.grid._grid.view");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.grid._grid.builder");
dojo.declare("dojox.GridView",[dijit._Widget,dijit._Templated],{defaultWidth:"18em",viewWidth:"",templateString:'<div class="dojoxGrid-view"><div class="dojoxGrid-header" dojoAttachPoint="headerNode"><div style="width: 9000em"><div dojoAttachPoint="headerContentNode"></div></div></div><input type="checkbox" class="dojoxGrid-hidden-focus" dojoAttachPoint="hiddenFocusNode" /><input type="checkbox" class="dojoxGrid-hidden-focus" /><div class="dojoxGrid-scrollbox" dojoAttachPoint="scrollboxNode"><div class="dojoxGrid-content" dojoAttachPoint="contentNode" hidefocus="hidefocus"></div></div></div>',themeable:false,classTag:"dojoxGrid",marginBottom:0,rowPad:2,postMixInProperties:function(){this.rowNodes=[]
},postCreate:function(){dojo.connect(this.scrollboxNode,"onscroll",dojo.hitch(this,"doscroll"));
dojox.grid.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu"]);
dojox.grid.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new dojox.grid.contentBuilder(this);
this.header=new dojox.grid.headerBuilder(this)
},destroy:function(){dojox.grid.removeNode(this.headerNode);
this.inherited("destroy",arguments)
},focus:function(){if(dojo.isSafari||dojo.isOpera){this.hiddenFocusNode.focus()
}else{this.scrollboxNode.focus()
}},setStructure:function(C){var D=this.structure=C;
if(D.width&&dojo.isNumber(D.width)){this.viewWidth=D.width+"em"
}else{this.viewWidth=D.width||this.viewWidth
}this.onBeforeRow=D.onBeforeRow;
this.noscroll=D.noscroll;
if(this.noscroll){this.scrollboxNode.style.overflow="hidden"
}this.testFlexCells();
this.updateStructure()
},testFlexCells:function(){this.flexCells=false;
for(var H=0,F;
(F=this.structure.rows[H]);
H++){for(var G=0,E;
(E=F[G]);
G++){E.view=this;
this.flexCells=this.flexCells||E.isFlex()
}}return this.flexCells
},updateStructure:function(){this.header.update();
this.content.update()
},getScrollbarWidth:function(){return(this.noscroll?0:dojox.grid.getScrollbarWidth())
},getColumnsWidth:function(){return this.headerContentNode.firstChild.offsetWidth
},getWidth:function(){return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px"
},getContentWidth:function(){return Math.max(0,dojo._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px"
},render:function(){this.scrollboxNode.style.height="";
this.renderHeader()
},renderHeader:function(){this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent)
},_getHeaderContent:function(C){var D=C.name||C.grid.getCellName(C);
if(C.index!=C.grid.getSortIndex()){return D
}return['<div class="',C.grid.sortInfo>0?"dojoxGrid-sort-down":"dojoxGrid-sort-up",'">',D,"</div>"].join("")
},resize:function(){this.resizeHeight();
this.resizeWidth()
},hasScrollbar:function(){return(this.scrollboxNode.clientHeight!=this.scrollboxNode.offsetHeight)
},resizeHeight:function(){if(!this.grid.autoHeight){var B=this.domNode.clientHeight;
if(!this.hasScrollbar()){B-=dojox.grid.getScrollbarWidth()
}dojox.grid.setStyleHeightPx(this.scrollboxNode,B)
}},resizeWidth:function(){if(this.flexCells){this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth
}var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
w=Math.max(w,this.getColumnsWidth())+"px";
with(this.contentNode){style.width="";
offsetWidth;
style.width=w
}},setSize:function(w,h){with(this.domNode.style){if(w){width=w
}height=(h>=0?h+"px":"")
}with(this.headerNode.style){if(w){width=w
}}},renderRow:function(E,D){var F=this.createRowNode(E);
this.buildRow(E,F,D);
this.grid.edit.restore(this,E);
return F
},createRowNode:function(D){var C=document.createElement("div");
C.className=this.classTag+"-row";
C[dojox.grid.rowIndexTag]=D;
this.rowNodes[D]=C;
return C
},buildRow:function(D,C){this.buildRowContent(D,C);
this.styleRow(D,C)
},buildRowContent:function(D,C){C.innerHTML=this.content.generateHtml(D,D);
if(this.flexCells){C.firstChild.style.width=this.contentWidth
}},rowRemoved:function(B){this.grid.edit.save(this,B);
delete this.rowNodes[B]
},getRowNode:function(B){return this.rowNodes[B]
},getCellNode:function(E,D){var F=this.getRowNode(E);
if(F){return this.content.getCellNode(F,D)
}},styleRow:function(D,C){C._style=dojox.grid.getStyleText(C);
this.styleRowNode(D,C)
},styleRowNode:function(D,C){if(C){this.doStyleRowNode(D,C)
}},doStyleRowNode:function(D,C){this.grid.styleRowNode(D,C)
},updateRow:function(F,E,H){var G=this.getRowNode(F);
if(G){G.style.height="";
this.buildRow(F,G)
}return G
},updateRowStyles:function(B){this.styleRowNode(B,this.getRowNode(B))
},lastTop:0,doscroll:function(C){this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var D=this.scrollboxNode.scrollTop;
if(D!=this.lastTop){this.grid.scrollTo(D)
}},setScrollTop:function(B){this.lastTop=B;
this.scrollboxNode.scrollTop=B;
return this.scrollboxNode.scrollTop
},doContentEvent:function(B){if(this.content.decorateEvent(B)){this.grid.onContentEvent(B)
}},doHeaderEvent:function(B){if(this.header.decorateEvent(B)){this.grid.onHeaderEvent(B)
}},dispatchContentEvent:function(B){return this.content.dispatchEvent(B)
},dispatchHeaderEvent:function(B){return this.header.dispatchEvent(B)
},setColWidth:function(D,C){this.grid.setCellWidth(D,C+"px")
},update:function(){var B=this.scrollboxNode.scrollLeft;
this.content.update();
this.grid.update();
this.scrollboxNode.scrollLeft=B
}})
};