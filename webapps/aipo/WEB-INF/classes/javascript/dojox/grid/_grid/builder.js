if(!dojo._hasResource["dojox.grid._grid.builder"]){dojo._hasResource["dojox.grid._grid.builder"]=true;
dojo.provide("dojox.grid._grid.builder");
dojo.require("dojox.grid._grid.drag");
dojo.declare("dojox.grid.Builder",null,{constructor:function(B){this.view=B;
this.grid=B.grid
},view:null,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation">',generateCellMarkup:function(K,H,J,I){var G=[],L;
if(I){L=['<th tabIndex="-1" role="wairole:columnheader"']
}else{L=['<td tabIndex="-1" role="wairole:gridcell"']
}K.colSpan&&L.push(' colspan="',K.colSpan,'"');
K.rowSpan&&L.push(' rowspan="',K.rowSpan,'"');
L.push(' class="dojoxGrid-cell ');
K.classes&&L.push(K.classes," ");
J&&L.push(J," ");
G.push(L.join(""));
G.push("");
L=['" idx="',K.index,'" style="'];
L.push(K.styles,H||"");
K.unitWidth&&L.push("width:",K.unitWidth,";");
G.push(L.join(""));
G.push("");
L=['"'];
K.attrs&&L.push(" ",K.attrs);
L.push(">");
G.push(L.join(""));
G.push("");
G.push("</td>");
return G
},isCellNode:function(B){return Boolean(B&&B.getAttribute&&B.getAttribute("idx"))
},getCellNodeIndex:function(B){return B?Number(B.getAttribute("idx")):-1
},getCellNode:function(L,K){for(var I=0,H;
H=dojox.grid.getTr(L.firstChild,I);
I++){for(var J=0,G;
G=H.cells[J];
J++){if(this.getCellNodeIndex(G)==K){return G
}}}},findCellTarget:function(D,F){var E=D;
while(E&&!this.isCellNode(E)&&(E!=F)){E=E.parentNode
}return E!=F?E:null
},baseDecorateEvent:function(B){B.dispatch="do"+B.type;
B.grid=this.grid;
B.sourceView=this.view;
B.cellNode=this.findCellTarget(B.target,B.rowNode);
B.cellIndex=this.getCellNodeIndex(B.cellNode);
B.cell=(B.cellIndex>=0?this.grid.getCell(B.cellIndex):null)
},findTarget:function(D,E){var F=D;
while(F&&!(E in F)&&(F!=this.domNode)){F=F.parentNode
}return(F!=this.domNode)?F:null
},findRowTarget:function(B){return this.findTarget(B,dojox.grid.rowIndexTag)
},isIntraNodeEvent:function(D){try{return(D.cellNode&&D.relatedTarget&&dojo.isDescendant(D.relatedTarget,D.cellNode))
}catch(C){return false
}},isIntraRowEvent:function(F){try{var E=F.relatedTarget&&this.findRowTarget(F.relatedTarget);
return !E&&(F.rowIndex==-1)||E&&(F.rowIndex==E.gridRowIndex)
}catch(D){return false
}},dispatchEvent:function(B){if(B.dispatch in this){return this[B.dispatch](B)
}},domouseover:function(B){if(B.cellNode&&(B.cellNode!=this.lastOverCellNode)){this.lastOverCellNode=B.cellNode;
this.grid.onMouseOver(B)
}this.grid.onMouseOverRow(B)
},domouseout:function(B){if(B.cellNode&&(B.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(B,this.lastOverCellNode)){this.lastOverCellNode=null;
this.grid.onMouseOut(B);
if(!this.isIntraRowEvent(B)){this.grid.onMouseOutRow(B)
}}}});
dojo.declare("dojox.grid.contentBuilder",dojox.grid.Builder,{update:function(){this.prepareHtml()
},prepareHtml:function(){var J=this.grid.get,I=this.view.structure.rows;
for(var L=0,H;
(H=I[L]);
L++){for(var K=0,G;
(G=H[K]);
K++){G.get=G.get||(G.value==undefined)&&J;
G.markup=this.generateCellMarkup(G,G.cellStyles,G.cellClasses,false)
}}},generateHtml:function(W,T){var Y=[this._table],U=this.view,Q=U.onBeforeRow,R=U.structure.rows;
Q&&Q(T,R);
for(var N=0,S;
(S=R[N]);
N++){if(S.hidden||S.header){continue
}Y.push(!S.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var Z=0,V,O,P,X;
(V=S[Z]);
Z++){O=V.markup,P=V.customClasses=[],X=V.customStyles=[];
O[5]=V.format(W);
O[1]=P.join(" ");
O[3]=X.join(";");
Y.push.apply(Y,O)
}Y.push("</tr>")
}Y.push("</table>");
return Y.join("")
},decorateEvent:function(B){B.rowNode=this.findRowTarget(B.target);
if(!B.rowNode){return false
}B.rowIndex=B.rowNode[dojox.grid.rowIndexTag];
this.baseDecorateEvent(B);
B.cell=this.grid.getCell(B.cellIndex);
return true
}});
dojo.declare("dojox.grid.headerBuilder",dojox.grid.Builder,{bogusClickTime:0,overResizeWidth:4,minColWidth:1,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation"',update:function(){this.tableMap=new dojox.grid.tableMap(this.view.structure.rows)
},generateHtml:function(Q,M){var J=[this._table],N=this.view.structure.rows;
if(this.view.viewWidth){J.push([' style="width:',this.view.viewWidth,';"'].join(""))
}J.push(">");
dojox.grid.fire(this.view,"onBeforeRow",[-1,N]);
for(var L=0,O;
(O=N[L]);
L++){if(O.hidden){continue
}J.push(!O.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var K=0,R,P;
(R=O[K]);
K++){R.customClasses=[];
R.customStyles=[];
P=this.generateCellMarkup(R,R.headerStyles,R.headerClasses,true);
P[5]=(M!=undefined?M:Q(R));
P[3]=R.customStyles.join(";");
P[1]=R.customClasses.join(" ");
J.push(P.join(""))
}J.push("</tr>")
}J.push("</table>");
return J.join("")
},getCellX:function(F){var D=F.layerX;
if(dojo.isMoz){var E=dojox.grid.ascendDom(F.target,dojox.grid.makeNotTagName("th"));
D-=(E&&E.offsetLeft)||0
}var E=dojox.grid.ascendDom(F.target,function(){if(!E||E==F.cellNode){return false
}D+=(E.offsetLeft<0?0:E.offsetLeft);
return true
});
return D
},decorateEvent:function(B){this.baseDecorateEvent(B);
B.rowIndex=-1;
B.cellX=this.getCellX(B);
return true
},prepareLeftResize:function(D){var C=dojox.grid.getTdIndex(D.cellNode);
D.cellNode=(C?D.cellNode.parentNode.cells[C-1]:null);
D.cellIndex=(D.cellNode?this.getCellNodeIndex(D.cellNode):-1);
return Boolean(D.cellNode)
},canResize:function(D){if(!D.cellNode||D.cellNode.colSpan>1){return false
}var C=this.grid.getCell(D.cellIndex);
return !C.noresize&&!C.isFlex()
},overLeftResizeArea:function(B){return(B.cellIndex>0)&&(B.cellX<this.overResizeWidth)&&this.prepareLeftResize(B)
},overRightResizeArea:function(B){return B.cellNode&&(B.cellX>=B.cellNode.offsetWidth-this.overResizeWidth)
},domousemove:function(C){var D=(this.overRightResizeArea(C)?"e-resize":(this.overLeftResizeArea(C)?"w-resize":""));
if(D&&!this.canResize(C)){D="not-allowed"
}C.sourceView.headerNode.style.cursor=D||""
},domousedown:function(B){if(!dojox.grid.drag.dragging){if((this.overRightResizeArea(B)||this.overLeftResizeArea(B))&&this.canResize(B)){this.beginColumnResize(B)
}}},doclick:function(B){if(new Date().getTime()<this.bogusClickTime){dojo.stopEvent(B);
return true
}},beginColumnResize:function(H){dojo.stopEvent(H);
var I=[],L=this.tableMap.findOverlappingNodes(H.cellNode);
for(var K=0,G;
(G=L[K]);
K++){I.push({node:G,index:this.getCellNodeIndex(G),width:G.offsetWidth})
}var J={view:H.sourceView,node:H.cellNode,index:H.cellIndex,w:H.cellNode.clientWidth,spanners:I};
dojox.grid.drag.start(H.cellNode,dojo.hitch(this,"doResizeColumn",J),dojo.hitch(this,"endResizeColumn",J),H)
},doResizeColumn:function(I,M){var N=I.w+M.deltaX;
if(N>=this.minColWidth){for(var K=0,J,H;
(J=I.spanners[K]);
K++){H=J.width+M.deltaX;
J.node.style.width=H+"px";
I.view.setColWidth(J.index,H)
}I.node.style.width=N+"px";
I.view.setColWidth(I.index,N)
}if(I.view.flexCells&&!I.view.testFlexCells()){var L=dojox.grid.findTable(I.node);
L&&(L.style.width="")
}},endResizeColumn:function(B){this.bogusClickTime=new Date().getTime()+30;
setTimeout(dojo.hitch(B.view,"update"),50)
}});
dojo.declare("dojox.grid.tableMap",null,{constructor:function(B){this.mapRows(B)
},map:null,mapRows:function(P){var U=P.length;
if(!U){return 
}this.map=[];
for(var O=0,Q;
(Q=P[O]);
O++){this.map[O]=[]
}for(var O=0,Q;
(Q=P[O]);
O++){for(var N=0,T=0,S,M,L;
(S=Q[N]);
N++){while(this.map[O][T]){T++
}this.map[O][T]={c:N,r:O};
L=S.rowSpan||1;
M=S.colSpan||1;
for(var V=0;
V<L;
V++){for(var R=0;
R<M;
R++){this.map[O+V][T+R]=this.map[O][T]
}}T+=M
}}},dumpMap:function(){for(var J=0,G,H="";
(G=this.map[J]);
J++,H=""){for(var I=0,F;
(F=G[I]);
I++){H+=F.r+","+F.c+"   "
}console.log(H)
}},getMapCoords:function(I,L){for(var K=0,H;
(H=this.map[K]);
K++){for(var J=0,G;
(G=H[J]);
J++){if(G.c==L&&G.r==I){return{j:K,i:J}
}}}return{j:-1,i:-1}
},getNode:function(H,G,E){var F=H&&H.rows[G];
return F&&F.cells[E]
},_findOverlappingNodes:function(inTable,inRow,inCol){var nodes=[];
var m=this.getMapCoords(inRow,inCol);
var row=this.map[m.j];
for(var j=0,row;
(row=this.map[j]);
j++){if(j==m.j){continue
}with(row[m.i]){var n=this.getNode(inTable,r,c);
if(n){nodes.push(n)
}}}return nodes
},findOverlappingNodes:function(B){return this._findOverlappingNodes(dojox.grid.findTable(B),dojox.grid.getTrIndex(B.parentNode),dojox.grid.getTdIndex(B))
}});
dojox.grid.rowIndexTag="gridRowIndex"
};