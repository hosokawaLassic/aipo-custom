if(!dojo._hasResource["dojox.grid._grid.scroller"]){dojo._hasResource["dojox.grid._grid.scroller"]=true;
dojo.provide("dojox.grid._grid.scroller");
dojo.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(D,E,F){switch(arguments.length){case 3:this.rowsPerPage=F;
case 2:this.keepRows=E;
case 1:this.rowCount=D
}this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
this.keepPages=Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
this.invalidate();
if(this.scrollboxNode){this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=dojo.hitch(this,"onscroll")
}},invalidate:function(){this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize()
},updateRowCount:function(C){this.invalidateNodes();
this.rowCount=C;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var D=oldPageCount-1;
D>=this.pageCount;
D--){this.height-=this.getPageHeight(D);
delete this.pageHeights[D]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(B){},measurePage:function(B){},positionPage:function(D,C){},repositionPages:function(B){},installPage:function(B){},preparePage:function(E,F,D){},renderPage:function(B){},removePage:function(B){},pacify:function(B){},pacifying:false,pacifyTicks:200,setPacifying:function(B){if(this.pacifying!=B){this.pacifying=B;
this.pacify(this.pacifying)
}},startPacify:function(){this.startPacifyTicks=new Date().getTime()
},doPacify:function(){var B=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return B
},endPacify:function(){this.setPacifying(false)
},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}dojox.grid.setStyleHeightPx(this.contentNode,this.height)
},calcLastPageHeight:function(){if(!this.pageCount){return 0
}var D=this.pageCount-1;
var C=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[D]=C;
return C
},updateContentHeight:function(B){this.height+=B;
this.resize()
},updatePageHeight:function(E){if(this.pageExists(E)){var F=this.getPageHeight(E);
var D=(this.measurePage(E))||(F);
this.pageHeights[E]=D;
if((D)&&(F!=D)){this.updateContentHeight(D-F);
this.repositionPages(E)
}}},rowHeightChanged:function(B){this.updatePageHeight(Math.floor(B/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var B=document.createElement("div");
B.style.position="absolute";
B.style.left="0";
return B
},getPageHeight:function(D){var C=this.pageHeights[D];
return(C!==undefined?C:this.defaultPageHeight)
},pushPage:function(B){return this.stack.push(B)
},popPage:function(){return this.stack.shift()
},findPage:function(G){var E=0,H=0;
for(var F=0;
E<this.pageCount;
E++,H+=F){F=this.getPageHeight(E);
if(H+F>=G){break
}}this.page=E;
this.pageTop=H
},buildPage:function(E,D,F){this.preparePage(E,D);
this.positionPage(E,F);
this.installPage(E);
this.renderPage(E);
this.pushPage(E)
},needPage:function(F,G){var E=this.getPageHeight(F),H=E;
if(!this.pageExists(F)){this.buildPage(F,(this.keepPages)&&(this.stack.length>=this.keepPages),G);
E=this.measurePage(F)||E;
this.pageHeights[F]=E;
if(E&&(H!=E)){this.updateContentHeight(E-H)
}}else{this.positionPage(F,G)
}return E
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(I){this.startPacify();
this.findPage(I);
var J=this.height;
var F=this.getScrollBottom(I);
for(var H=this.page,G=this.pageTop;
(H<this.pageCount)&&((F<0)||(G<F));
H++){G+=this.needPage(H,G)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,I);
this.lastVisibleRow=this.getLastVisibleRow(H-1,G,F);
if(J!=this.height){this.repositionPages(H-1)
}this.endPacify()
},getScrollBottom:function(B){return(this.windowHeight>=0?B+this.windowHeight:-1)
},processNodeEvent:function(G,F){var E=G.target;
while(E&&(E!=F)&&E.parentNode&&(E.parentNode.parentNode!=F)){E=E.parentNode
}if(!E||!E.parentNode||(E.parentNode.parentNode!=F)){return false
}var H=E.parentNode;
G.topRowIndex=H.pageIndex*this.rowsPerPage;
G.rowIndex=G.topRowIndex+dojox.grid.indexInParent(E);
G.rowTarget=E;
return true
},processEvent:function(B){return this.processNodeEvent(B,this.contentNode)
},dummy:0});
dojo.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(D,C){},removeRow:function(B){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(B){return this.getDefaultNodes()[B]
},positionPageNode:function(D,C){D.style.top=C+"px"
},getPageNodePosition:function(B){return B.offsetTop
},repositionPageNodes:function(I,L){var N=0;
for(var H=0;
H<this.stack.length;
H++){N=Math.max(this.stack[H],N)
}var J=L[I];
var K=(J?this.getPageNodePosition(J)+this.getPageHeight(I):0);
for(var M=I+1;
M<=N;
M++){J=L[M];
if(J){if(this.getPageNodePosition(J)==K){return 
}this.positionPage(M,K)
}K+=this.getPageHeight(M)
}},invalidatePageNode:function(E,F){var D=F[E];
if(D){delete F[E];
this.removePage(E,D);
dojox.grid.cleanNode(D);
D.innerHTML=""
}return D
},preparePageNode:function(F,E,G){var H=(E===null?this.createPageNode():this.invalidatePageNode(E,G));
H.pageIndex=F;
H.id="page-"+F;
G[F]=H
},pageExists:function(B){return Boolean(this.getDefaultPageNode(B))
},measurePage:function(B){return this.getDefaultPageNode(B).offsetHeight
},positionPage:function(D,C){this.positionPageNode(this.getDefaultPageNode(D),C)
},repositionPages:function(B){this.repositionPageNodes(B,this.getDefaultNodes())
},preparePage:function(D,C){this.preparePageNode(D,(C?this.popPage():null),this.getDefaultNodes())
},installPage:function(B){this.contentNode.appendChild(this.getDefaultPageNode(B))
},destroyPage:function(D){var C=this.invalidatePageNode(D,this.getDefaultNodes());
dojox.grid.removeNode(C)
},renderPage:function(F){var G=this.pageNodes[F];
for(var H=0,E=F*this.rowsPerPage;
(H<this.rowsPerPage)&&(E<this.rowCount);
H++,E++){this.renderRow(E,G)
}},removePage:function(E){for(var F=0,D=E*this.rowsPerPage;
F<this.rowsPerPage;
F++,D++){this.removeRow(D)
}},getPageRow:function(B){return B*this.rowsPerPage
},getLastPageRow:function(B){return Math.min(this.rowCount,this.getPageRow(B+1))-1
},getFirstVisibleRowNodes:function(I,L,M,J){var K=this.getPageRow(I);
var N=dojox.grid.divkids(J[I]);
for(var O=0,P=N.length;
O<P&&L<M;
O++,K++){L+=N[O].offsetHeight
}return(K?K-1:K)
},getFirstVisibleRow:function(D,E,F){if(!this.pageExists(D)){return 0
}return this.getFirstVisibleRowNodes(D,E,F,this.getDefaultNodes())
},getLastVisibleRowNodes:function(H,K,M,I){var J=this.getLastPageRow(H);
var L=dojox.grid.divkids(I[H]);
for(var N=L.length-1;
N>=0&&K>M;
N--,J--){K-=L[N].offsetHeight
}return J+1
},getLastVisibleRow:function(D,E,F){if(!this.pageExists(D)){return 0
}return this.getLastVisibleRowNodes(D,E,F,this.getDefaultNodes())
},findTopRowForNodes:function(J,I){var K=dojox.grid.divkids(I[this.page]);
for(var M=0,H=K.length,N=this.pageTop,L;
M<H;
M++){L=K[M].offsetHeight;
N+=L;
if(N>=J){this.offset=L-(N-J);
return M+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(K,J){var L=Math.floor(K/this.rowsPerPage);
var O=0;
for(var P=0;
P<L;
P++){O+=this.getPageHeight(P)
}this.pageTop=O;
this.needPage(L,this.pageTop);
var M=dojox.grid.divkids(J[L]);
var N=K-this.rowsPerPage*L;
for(var P=0,I=M.length;
P<I&&P<N;
P++){O+=M[P].offsetHeight
}return O
},findTopRow:function(B){return this.findTopRowForNodes(B,this.getDefaultNodes())
},findScrollTop:function(B){return this.findScrollTopForNodes(B,this.getDefaultNodes())
},dummy:0});
dojo.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(B){this.setContentNodes(B)
},setContentNodes:function(D){this.contentNodes=D;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var C=0;
C<this.colCount;
C++){this.pageNodes[C]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(B){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,B)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var B=0;
B<this.colCount;
B++){dojox.grid.setStyleHeightPx(this.contentNodes[B],this.height)
}},positionPage:function(E,F){for(var D=0;
D<this.colCount;
D++){this.positionPageNode(this.pageNodes[D][E],F)
}},preparePage:function(F,H){var G=(H?this.popPage():null);
for(var E=0;
E<this.colCount;
E++){this.preparePageNode(F,G,this.pageNodes[E])
}},installPage:function(D){for(var C=0;
C<this.colCount;
C++){this.contentNodes[C].appendChild(this.pageNodes[C][D])
}},destroyPage:function(D){for(var C=0;
C<this.colCount;
C++){dojox.grid.removeNode(this.invalidatePageNode(D,this.pageNodes[C]))
}},renderPage:function(F){var E=[];
for(var G=0;
G<this.colCount;
G++){E[G]=this.pageNodes[G][F]
}for(var G=0,H=F*this.rowsPerPage;
(G<this.rowsPerPage)&&(H<this.rowCount);
G++,H++){this.renderRow(H,E)
}}})
};