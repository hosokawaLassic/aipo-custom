if(!dojo._hasResource["dojox.grid.VirtualGrid"]){dojo._hasResource["dojox.grid.VirtualGrid"]=true;
dojo.provide("dojox.grid.VirtualGrid");
dojo.require("dojox.grid._grid.lib");
dojo.require("dojox.grid._grid.scroller");
dojo.require("dojox.grid._grid.view");
dojo.require("dojox.grid._grid.views");
dojo.require("dojox.grid._grid.layout");
dojo.require("dojox.grid._grid.rows");
dojo.require("dojox.grid._grid.focus");
dojo.require("dojox.grid._grid.selection");
dojo.require("dojox.grid._grid.edit");
dojo.require("dojox.grid._grid.rowbar");
dojo.require("dojox.grid._grid.publicEvents");
dojo.declare("dojox.VirtualGrid",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxGrid" hidefocus="hidefocus" role="wairole:grid"><div class="dojoxGrid-master-header" dojoAttachPoint="headerNode"></div><div class="dojoxGrid-master-view" dojoAttachPoint="viewsNode"></div><span dojoAttachPoint="lastFocusNode" tabindex="0"></span></div>',classTag:"dojoxGrid",get:function(B){},rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,autoHeight:false,autoRender:true,defaultHeight:"15em",structure:"",elasticView:-1,singleClickEdit:false,sortInfo:0,themeable:true,buildRendering:function(){this.inherited(arguments);
if(this.get==dojox.VirtualGrid.prototype.get){this.get=null
}if(!this.domNode.getAttribute("tabIndex")){this.domNode.tabIndex="0"
}this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
dojox.grid.initTextSizePoll();
this.connect(dojox.grid,"textSizeChanged","textSizeChanged");
dojox.grid.funnelEvents(this.domNode,this,"doKeyEvent",dojox.grid.keyEvents);
this.connect(this,"onShow","renderOnIdle")
},postCreate:function(){this.styleChanged=this._styleChanged;
this.setStructure(this.structure)
},destroy:function(){this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
this.edit.destroy();
this.views.destroyViews();
this.inherited(arguments)
},styleChanged:function(){this.setStyledClass(this.domNode,"")
},_styleChanged:function(){this.styleChanged();
this.update()
},textSizeChanged:function(){setTimeout(dojo.hitch(this,"_textSizeChanged"),1)
},_textSizeChanged:function(){if(this.domNode){this.views.forEach(function(B){B.content.update()
});
this.render()
}},sizeChange:function(){dojox.grid.jobs.job(this.id+"SizeChange",50,dojo.hitch(this,"update"))
},renderOnIdle:function(){setTimeout(dojo.hitch(this,"render"),1)
},createManagers:function(){this.rows=new dojox.grid.rows(this);
this.focus=new dojox.grid.focus(this);
this.selection=new dojox.grid.selection(this);
this.edit=new dojox.grid.edit(this)
},createScroller:function(){this.scroller=new dojox.grid.scroller.columns();
this.scroller.renderRow=dojo.hitch(this,"renderRow");
this.scroller.removeRow=dojo.hitch(this,"rowRemoved")
},createLayout:function(){this.layout=new dojox.grid.layout(this)
},createViews:function(){this.views=new dojox.grid.views(this);
this.views.createView=dojo.hitch(this,"createView")
},createView:function(inClass){var c=eval(inClass);
var view=new c({grid:this});
this.viewsNode.appendChild(view.domNode);
this.headerNode.appendChild(view.headerNode);
this.views.addView(view);
return view
},buildViews:function(){for(var C=0,D;
(D=this.layout.structure[C]);
C++){this.createView(D.type||"dojox.GridView").setStructure(D)
}this.scroller.setContentNodes(this.views.getContentNodes())
},setStructure:function(B){this.views.destroyViews();
this.structure=B;
if((this.structure)&&(dojo.isString(this.structure))){this.structure=dojox.grid.getProp(this.structure)
}if(!this.structure){this.structure=window.layout
}if(!this.structure){return 
}this.layout.setStructure(this.structure);
this._structureChanged()
},_structureChanged:function(){this.buildViews();
if(this.autoRender){this.render()
}},resize:function(){if(!this.domNode.parentNode){return 
}var G=dojo._getPadBorderExtents(this.domNode);
if(this.autoHeight){this.domNode.style.height="auto";
this.viewsNode.style.height=""
}else{if(this.flex>0){}else{if(this.domNode.clientHeight<=G.h){if(this.domNode.parentNode==document.body){this.domNode.style.height=this.defaultHeight
}else{this.fitTo="parent"
}}}}if(this.fitTo=="parent"){var H=dojo._getContentBox(this.domNode.parentNode).h;
dojo.marginBox(this.domNode,{h:Math.max(0,H)})
}var I=this.views.measureHeader();
this.headerNode.style.height=I+"px";
var J=1,H=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-I,0)||0);
if(this.autoWidth){this.domNode.style.width=this.views.arrange(J,0,0,H)+"px"
}else{var F=this.domNode.clientWidth||(this.domNode.offsetWidth-G.w);
this.views.arrange(J,0,F,H)
}this.scroller.windowHeight=H;
this.scroller.defaultRowHeight=this.rows.getDefaultHeightPx()+1;
this.postresize()
},resizeHeight:function(){var C=this.views.measureHeader();
this.headerNode.style.height=C+"px";
var D=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-C,0)||0);
this.views.onEach("setSize",[0,D]);
this.views.onEach("resizeHeight");
this.scroller.windowHeight=D
},render:function(){if(!this.domNode){return 
}this.update=this.defaultUpdate;
this.scroller.init(this.rowCount,this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender()
},prerender:function(){this.views.render();
this.resize()
},postrender:function(){this.postresize();
this.focus.initFocusView();
dojo.setSelectable(this.domNode,false)
},postresize:function(){if(this.autoHeight){this.viewsNode.style.height=this.views.measureContent()+"px"
}},renderRow:function(D,C){this.views.renderRow(D,C)
},rowRemoved:function(B){this.views.rowRemoved(B)
},invalidated:null,updating:false,beginUpdate:function(){this.invalidated=[];
this.updating=true
},endUpdate:function(){this.updating=false;
var B=this.invalidated;
if(B.all){this.update()
}else{if(B.rowCount!=undefined){this.updateRowCount(B.rowCount)
}else{for(r in B){this.updateRow(Number(r))
}}}this.invalidated=null
},defaultUpdate:function(){if(this.updating){this.invalidated.all=true;
return 
}this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.scrollTop);
this.postrender()
},update:function(){this.render()
},updateRow:function(B){B=Number(B);
if(this.updating){this.invalidated[B]=true;
return 
}this.views.updateRow(B,this.rows.getHeight(B));
this.scroller.rowHeightChanged(B)
},updateRowCount:function(B){if(this.updating){this.invalidated.rowCount=B;
return 
}this.rowCount=B;
this.scroller.updateRowCount(B);
this.setScrollTop(this.scrollTop);
this.resize()
},updateRowStyles:function(B){this.views.updateRowStyles(B)
},rowHeightChanged:function(B){this.views.renormalizeRow(B);
this.scroller.rowHeightChanged(B)
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(dojo.isIE?100:50),scrollTo:function(C){if(!this.fastScroll){this.setScrollTop(C);
return 
}var D=Math.abs(this.lastScrollTop-C);
this.lastScrollTop=C;
if(D>this.scrollRedrawThreshold||this.delayScroll){this.delayScroll=true;
this.scrollTop=C;
this.views.setScrollTop(C);
dojox.grid.jobs.job("dojoxGrid-scroll",200,dojo.hitch(this,"finishScrollJob"))
}else{this.setScrollTop(C)
}},finishScrollJob:function(){this.delayScroll=false;
this.setScrollTop(this.scrollTop)
},setScrollTop:function(B){this.scrollTop=this.views.setScrollTop(B);
this.scroller.scroll(this.scrollTop)
},scrollToRow:function(B){this.setScrollTop(this.scroller.findScrollTop(B)+1)
},styleRowNode:function(D,C){if(C){this.rows.styleRowNode(D,C)
}},getCell:function(B){return this.layout.cells[B]
},setCellWidth:function(D,C){this.getCell(D).unitWidth=C
},getCellName:function(B){return"Cell "+B.index
},canSort:function(B){},sort:function(){},getSortAsc:function(B){B=B==undefined?this.sortInfo:B;
return Boolean(B>0)
},getSortIndex:function(B){B=B==undefined?this.sortInfo:B;
return Math.abs(B)-1
},setSortIndex:function(E,F){var D=E+1;
if(F!=undefined){D*=(F?1:-1)
}else{if(this.getSortIndex()==E){D=-this.sortInfo
}}this.setSortInfo(D)
},setSortInfo:function(B){if(this.canSort(B)){this.sortInfo=B;
this.sort();
this.update()
}},doKeyEvent:function(B){B.dispatch="do"+B.type;
this.onKeyEvent(B)
},_dispatch:function(C,D){if(C in this){return this[C](D)
}},dispatchKeyEvent:function(B){this._dispatch(B.dispatch,B)
},dispatchContentEvent:function(B){this.edit.dispatchEvent(B)||B.sourceView.dispatchContentEvent(B)||this._dispatch(B.dispatch,B)
},dispatchHeaderEvent:function(B){B.sourceView.dispatchHeaderEvent(B)||this._dispatch("doheader"+B.type,B)
},dokeydown:function(B){this.onKeyDown(B)
},doclick:function(B){if(B.cellNode){this.onCellClick(B)
}else{this.onRowClick(B)
}},dodblclick:function(B){if(B.cellNode){this.onCellDblClick(B)
}else{this.onRowDblClick(B)
}},docontextmenu:function(B){if(B.cellNode){this.onCellContextMenu(B)
}else{this.onRowContextMenu(B)
}},doheaderclick:function(B){if(B.cellNode){this.onHeaderCellClick(B)
}else{this.onHeaderClick(B)
}},doheaderdblclick:function(B){if(B.cellNode){this.onHeaderCellDblClick(B)
}else{this.onHeaderDblClick(B)
}},doheadercontextmenu:function(B){if(B.cellNode){this.onHeaderCellContextMenu(B)
}else{this.onHeaderContextMenu(B)
}},doStartEdit:function(C,D){this.onStartEdit(C,D)
},doApplyCellEdit:function(D,E,F){this.onApplyCellEdit(D,E,F)
},doCancelEdit:function(B){this.onCancelEdit(B)
},doApplyEdit:function(B){this.onApplyEdit(B)
},addRow:function(){this.updateRowCount(this.rowCount+1)
},removeSelectedRows:function(){this.updateRowCount(Math.max(0,this.rowCount-this.selection.getSelected().length));
this.selection.clear()
}});
dojo.mixin(dojox.VirtualGrid.prototype,dojox.grid.publicEvents)
};