dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.scroller"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.scroller"]){B._hasResource["dojox.grid._grid.scroller"]=true;
B.provide("dojox.grid._grid.scroller");
B.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(F,A,E){switch(arguments.length){case 3:this.rowsPerPage=E;
case 2:this.keepRows=A;
case 1:this.rowCount=F
}this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
this.keepPages=Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
this.invalidate();
if(this.scrollboxNode){this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=B.hitch(this,"onscroll")
}},invalidate:function(){this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize()
},updateRowCount:function(D){this.invalidateNodes();
this.rowCount=D;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var A=oldPageCount-1;
A>=this.pageCount;
A--){this.height-=this.getPageHeight(A);
delete this.pageHeights[A]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(A){},measurePage:function(A){},positionPage:function(A,D){},repositionPages:function(A){},installPage:function(A){},preparePage:function(A,E,F){},renderPage:function(A){},removePage:function(A){},pacify:function(A){},pacifying:false,pacifyTicks:200,setPacifying:function(A){if(this.pacifying!=A){this.pacifying=A;
this.pacify(this.pacifying)
}},startPacify:function(){this.startPacifyTicks=new Date().getTime()
},doPacify:function(){var A=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return A
},endPacify:function(){this.setPacifying(false)
},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}dojox.grid.setStyleHeightPx(this.contentNode,this.height)
},calcLastPageHeight:function(){if(!this.pageCount){return 0
}var A=this.pageCount-1;
var D=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[A]=D;
return D
},updateContentHeight:function(A){this.height+=A;
this.resize()
},updatePageHeight:function(A){if(this.pageExists(A)){var E=this.getPageHeight(A);
var F=(this.measurePage(A))||(E);
this.pageHeights[A]=F;
if((F)&&(E!=F)){this.updateContentHeight(F-E);
this.repositionPages(A)
}}},rowHeightChanged:function(A){this.updatePageHeight(Math.floor(A/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var A=document.createElement("div");
A.style.position="absolute";
A.style.left="0";
return A
},getPageHeight:function(A){var D=this.pageHeights[A];
return(D!==undefined?D:this.defaultPageHeight)
},pushPage:function(A){return this.stack.push(A)
},popPage:function(){return this.stack.shift()
},findPage:function(F){var H=0,G=0;
for(var A=0;
H<this.pageCount;
H++,G+=A){A=this.getPageHeight(H);
if(G+A>=F){break
}}this.page=H;
this.pageTop=G
},buildPage:function(A,F,E){this.preparePage(A,F);
this.positionPage(A,E);
this.installPage(A);
this.renderPage(A);
this.pushPage(A)
},needPage:function(A,F){var H=this.getPageHeight(A),G=H;
if(!this.pageExists(A)){this.buildPage(A,(this.keepPages)&&(this.stack.length>=this.keepPages),F);
H=this.measurePage(A)||H;
this.pageHeights[A]=H;
if(H&&(G!=H)){this.updateContentHeight(H-G)
}}else{this.positionPage(A,F)
}return H
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(H){this.startPacify();
this.findPage(H);
var I=this.height;
var J=this.getScrollBottom(H);
for(var G=this.page,A=this.pageTop;
(G<this.pageCount)&&((J<0)||(A<J));
G++){A+=this.needPage(G,A)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,H);
this.lastVisibleRow=this.getLastVisibleRow(G-1,A,J);
if(I!=this.height){this.repositionPages(G-1)
}this.endPacify()
},getScrollBottom:function(A){return(this.windowHeight>=0?A+this.windowHeight:-1)
},processNodeEvent:function(F,A){var H=F.target;
while(H&&(H!=A)&&H.parentNode&&(H.parentNode.parentNode!=A)){H=H.parentNode
}if(!H||!H.parentNode||(H.parentNode.parentNode!=A)){return false
}var G=H.parentNode;
F.topRowIndex=G.pageIndex*this.rowsPerPage;
F.rowIndex=F.topRowIndex+dojox.grid.indexInParent(H);
F.rowTarget=H;
return true
},processEvent:function(A){return this.processNodeEvent(A,this.contentNode)
},dummy:0});
B.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(A,D){},removeRow:function(A){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(A){return this.getDefaultNodes()[A]
},positionPageNode:function(A,D){A.style.top=D+"px"
},getPageNodePosition:function(A){return A.offsetTop
},repositionPageNodes:function(A,K){var M=0;
for(var N=0;
N<this.stack.length;
N++){M=Math.max(this.stack[N],M)
}var I=K[A];
var J=(I?this.getPageNodePosition(I)+this.getPageHeight(A):0);
for(var L=A+1;
L<=M;
L++){I=K[L];
if(I){if(this.getPageNodePosition(I)==J){return 
}this.positionPage(L,J)
}J+=this.getPageHeight(L)
}},invalidatePageNode:function(A,E){var F=E[A];
if(F){delete E[A];
this.removePage(A,F);
dojox.grid.cleanNode(F);
F.innerHTML=""
}return F
},preparePageNode:function(A,H,F){var G=(H===null?this.createPageNode():this.invalidatePageNode(H,F));
G.pageIndex=A;
G.id="page-"+A;
F[A]=G
},pageExists:function(A){return Boolean(this.getDefaultPageNode(A))
},measurePage:function(A){return this.getDefaultPageNode(A).offsetHeight
},positionPage:function(A,D){this.positionPageNode(this.getDefaultPageNode(A),D)
},repositionPages:function(A){this.repositionPageNodes(A,this.getDefaultNodes())
},preparePage:function(A,D){this.preparePageNode(A,(D?this.popPage():null),this.getDefaultNodes())
},installPage:function(A){this.contentNode.appendChild(this.getDefaultPageNode(A))
},destroyPage:function(A){var D=this.invalidatePageNode(A,this.getDefaultNodes());
dojox.grid.removeNode(D)
},renderPage:function(A){var F=this.pageNodes[A];
for(var G=0,H=A*this.rowsPerPage;
(G<this.rowsPerPage)&&(H<this.rowCount);
G++,H++){this.renderRow(H,F)
}},removePage:function(A){for(var E=0,F=A*this.rowsPerPage;
E<this.rowsPerPage;
E++,F++){this.removeRow(F)
}},getPageRow:function(A){return A*this.rowsPerPage
},getLastPageRow:function(A){return Math.min(this.rowCount,this.getPageRow(A+1))-1
},getFirstVisibleRowNodes:function(P,K,L,A){var J=this.getPageRow(P);
var M=dojox.grid.divkids(A[P]);
for(var N=0,O=M.length;
N<O&&K<L;
N++,J++){K+=M[N].offsetHeight
}return(J?J-1:J)
},getFirstVisibleRow:function(F,A,E){if(!this.pageExists(F)){return 0
}return this.getFirstVisibleRowNodes(F,A,E,this.getDefaultNodes())
},getLastVisibleRowNodes:function(N,J,L,A){var I=this.getLastPageRow(N);
var K=dojox.grid.divkids(A[N]);
for(var M=K.length-1;
M>=0&&J>L;
M--,I--){J-=K[M].offsetHeight
}return I+1
},getLastVisibleRow:function(F,A,E){if(!this.pageExists(F)){return 0
}return this.getLastVisibleRowNodes(F,A,E,this.getDefaultNodes())
},findTopRowForNodes:function(I,A){var J=dojox.grid.divkids(A[this.page]);
for(var L=0,N=J.length,M=this.pageTop,K;
L<N;
L++){K=J[L].offsetHeight;
M+=K;
if(M>=I){this.offset=K-(M-I);
return L+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(J,A){var K=Math.floor(J/this.rowsPerPage);
var N=0;
for(var O=0;
O<K;
O++){N+=this.getPageHeight(O)
}this.pageTop=N;
this.needPage(K,this.pageTop);
var L=dojox.grid.divkids(A[K]);
var M=J-this.rowsPerPage*K;
for(var O=0,P=L.length;
O<P&&O<M;
O++){N+=L[O].offsetHeight
}return N
},findTopRow:function(A){return this.findTopRowForNodes(A,this.getDefaultNodes())
},findScrollTop:function(A){return this.findScrollTopForNodes(A,this.getDefaultNodes())
},dummy:0});
B.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(A){this.setContentNodes(A)
},setContentNodes:function(A){this.contentNodes=A;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var D=0;
D<this.colCount;
D++){this.pageNodes[D]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(A){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,A)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var A=0;
A<this.colCount;
A++){dojox.grid.setStyleHeightPx(this.contentNodes[A],this.height)
}},positionPage:function(A,E){for(var F=0;
F<this.colCount;
F++){this.positionPageNode(this.pageNodes[F][A],E)
}},preparePage:function(A,G){var F=(G?this.popPage():null);
for(var H=0;
H<this.colCount;
H++){this.preparePageNode(A,F,this.pageNodes[H])
}},installPage:function(A){for(var D=0;
D<this.colCount;
D++){this.contentNodes[D].appendChild(this.pageNodes[D][A])
}},destroyPage:function(A){for(var D=0;
D<this.colCount;
D++){dojox.grid.removeNode(this.invalidatePageNode(A,this.pageNodes[D]))
}},renderPage:function(A){var H=[];
for(var F=0;
F<this.colCount;
F++){H[F]=this.pageNodes[F][A]
}for(var F=0,G=A*this.rowsPerPage;
(F<this.rowsPerPage)&&(G<this.rowCount);
F++,G++){this.renderRow(G,H)
}}})
}}});