if(!dojo._hasResource["dojox.grid._data.model"]){dojo._hasResource["dojox.grid._data.model"]=true;
dojo.provide("dojox.grid._data.model");
dojo.require("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Model",null,{constructor:function(D,C){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(D){this.fields.set(D)
}this.setData(C)
},count:0,updating:0,observer:function(D,C){this.observers.push({o:D,p:C||"model"})
},notObserver:function(H){for(var G=0,E,F;
(F=this.observers[G]);
G++){if(F.o==H){this.observers.splice(G,1);
return 
}}},notify:function(I,J){if(!this.isUpdating()){var L=J||[];
for(var K=0,G,H;
(H=this.observers[K]);
K++){G=H.p+I,H=H.o;
(G in H)&&(H[G].apply(H,L))
}}},clear:function(){this.fields.clear();
this.clearData()
},beginUpdate:function(){this.updating++
},endUpdate:function(){if(this.updating){this.updating--
}},isUpdating:function(){return Boolean(this.updating)
},clearData:function(){this.setData(null)
},change:function(){this.notify("Change",arguments)
},insertion:function(){this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){this.notify("Removal",arguments);
this.notify("Change",arguments)
},insert:function(B){if(!this._insert.apply(this,arguments)){return false
}this.insertion.apply(this,dojo._toArray(arguments,1));
return true
},remove:function(B){if(!this._remove.apply(this,arguments)){return false
}this.removal.apply(this,arguments);
return true
},canSort:function(){return this.sort!=null
},makeComparator:function(I){var L,K,H,G=null;
for(var J=I.length-1;
J>=0;
J--){L=I[J];
K=Math.abs(L)-1;
if(K>=0){H=this.fields.get(K);
G=this.generateComparator(H.compare,H.key,L>0,G)
}}return G
},sort:null,dummy:0});
dojo.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(B){if(!this.cache[B]){this.cache[B]=this.copyRow(B)
}},endModifyRow:function(E){var D=this.cache[E];
if(D){var F=this.getRow(E);
if(!dojox.grid.arrayCompare(D,F)){this.update(D,F,E)
}delete this.cache[E]
}},cancelModifyRow:function(D){var C=this.cache[D];
if(C){this.setRow(C,D);
delete this.cache[D]
}},generateComparator:function(H,G,E,F){return function(B,C){var A=H(B[G],C[G]);
return A?(E?A:-A):F&&F(B,C)
}
}});
dojo.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(C,D){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(D,C){return(D>=0&&D<this.count&&(arguments.length<2||(C>=0&&C<this.colCount)))
},getRow:function(B){return this.data[B]
},copyRow:function(B){return this.getRow(B).slice(0)
},getDatum:function(D,C){return this.data[D][C]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(B){this.data=(B||[]);
this.allChange()
},setRow:function(C,D){this.data[D]=C;
this.rowChange(C,D);
this.change()
},setDatum:function(E,F,D){this.data[F][D]=E;
this.datumChange(E,F,D)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(F,G){for(var I=0,J=F.length,H=G;
I<J;
I++,H++){this.setRow(F[I],H)
}},update:function(F,D,E){return true
},_insert:function(C,D){dojox.grid.arrayInsert(this.data,D,C);
this.count++;
return true
},_remove:function(D){for(var C=D.length-1;
C>=0;
C--){dojox.grid.arrayRemove(this.data,D[C])
}this.count-=D.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(D,C){dojox.grid.arraySwap(this.data,D,C);
this.rowChange(this.getRow(D),D);
this.rowChange(this.getRow(C),C);
this.change()
},dummy:0});
dojo.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(E,D,F){if(!E){this.autoAssignFields()
}},autoAssignFields:function(){var E=this.data[0],D=0;
for(var F in E){this.fields.get(D++).key=F
}},getDatum:function(D,C){return this.data[D][this.fields.get(C).key]
}});
dojo.declare("dojox.grid.data.Dynamic",dojox.grid.data.Table,{constructor:function(){this.page=[];
this.pages=[]
},page:null,pages:null,rowsPerPage:100,requests:0,bop:-1,eop:-1,clearData:function(){this.pages=[];
this.bop=this.eop=-1;
this.setData([])
},getRowCount:function(){return this.count
},getColCount:function(){return this.fields.count()
},setRowCount:function(B){this.count=B;
this.change()
},requestsPending:function(B){},rowToPage:function(B){return(this.rowsPerPage?Math.floor(B/this.rowsPerPage):B)
},pageToRow:function(B){return(this.rowsPerPage?this.rowsPerPage*B:B)
},requestRows:function(D,C){},rowsProvided:function(D,C){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(E){var F=this.pageToRow(E);
var D=Math.min(this.rowsPerPage,this.count-F);
if(D>0){this.requests++;
this.requestsPending(true);
setTimeout(dojo.hitch(this,"requestRows",F,D),1)
}},needPage:function(B){if(!this.pages[B]){this.pages[B]=true;
this.requestPage(B)
}},preparePage:function(E,F){if(E<this.bop||E>=this.eop){var D=this.rowToPage(E);
this.needPage(D);
this.bop=D*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(B){return Boolean(this.data[B])
},removePages:function(E){for(var D=0,F;
((F=E[D])!=undefined);
D++){this.pages[this.rowToPage(F)]=false
}this.bop=this.eop=-1
},remove:function(B){this.removePages(B);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(D){var C=this.data[D];
if(!C){this.preparePage(D)
}return C
},getDatum:function(E,D){var F=this.getRow(E);
return(F?F[D]:this.fields.get(D).na)
},setDatum:function(F,G,E){var H=this.getRow(G);
if(H){H[E]=F;
this.datumChange(F,G,E)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
dojo.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(G,E,H){this.count=1;
this._rowIdentities={};
if(H){dojo.mixin(this,H)
}if(this.store){var F=this.store.getFeatures();
this._canNotify=F["dojo.data.api.Notification"];
this._canWrite=F["dojo.data.api.Write"];
if(this._canNotify){dojo.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(C,D){return new dojox.grid.data.DojoData(null,null,C)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(B){this.store=B;
this.data=[];
this.allChange()
},setRowCount:function(B){this.count=B;
this.allChange()
},beginReturn:function(B){if(this.count!=B){this.setRowCount(B)
}},_setupFields:function(E){if(this.fields._nameMaps){return 
}var F={};
var D=dojo.map(this.store.getAttributes(E),function(A,B){F[A]=B;
F[B+".idx"]=A;
return{name:A,key:A}
},this);
this.fields._nameMaps=F;
this.fields.set(D);
this.notify("FieldsChange")
},_getRowFromItem:function(B){},processRows:function(D,C){if(!D){return 
}this._setupFields(D[0]);
dojo.forEach(D,function(B,F){var A={};
A.__dojo_data_item=B;
dojo.forEach(this.fields.values,function(E){A[E.name]=this.store.getValue(B,E.name)||""
},this);
this._rowIdentities[this.store.getIdentity(B)]=C.start+F;
this.setRow(A,C.start+F)
},this)
},requestRows:function(F,E){var G=F||0;
var H={start:G,count:this.rowsPerPage,query:this.query,onBegin:dojo.hitch(this,"beginReturn"),onComplete:dojo.hitch(this,"processRows")};
this.store.fetch(H)
},getDatum:function(F,E){var G=this.getRow(F);
var H=this.fields.values[E];
return G&&H?G[H.name]:H?H.na:"?"
},setDatum:function(G,H,E){var F=this.fields._nameMaps[E+".idx"];
if(F){this.data[H][F]=G;
this.datumChange(G,H,E)
}},copyRow:function(G){var H={};
var J={};
var I=this.getRow(G);
for(var F in I){if(I[F]!=J[F]){H[F]=I[F]
}}return H
},_attrCompare:function(C,D){dojo.forEach(this.fields.values,function(A){if(C[A.name]!=D[A.name]){return false
}},this);
return true
},endModifyRow:function(E){var D=this.cache[E];
if(D){var F=this.getRow(E);
if(!this._attrCompare(D,F)){this.update(D,F,E)
}delete this.cache[E]
}},cancelModifyRow:function(D){var C=this.cache[D];
if(C){this.setRow(C,D);
delete this.cache[D]
}},_storeDatumChange:function(K,H,N,M){var J=this._rowIdentities[this.store.getIdentity(K)];
var I=this.getRow(J);
I[H]=M;
var L=this.fields._nameMaps[H];
this.notify("DatumChange",[M,J,L])
},datumChange:function(J,F,G){if(this._canWrite){var H=this.getRow(F);
var I=this.fields._nameMaps[G+".idx"];
this.store.setValue(H.__dojo_data_item,I,J)
}else{this.notify("DatumChange",arguments)
}},insertion:function(){console.debug("Insertion",arguments);
this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){console.debug("Removal",arguments);
this.notify("Removal",arguments);
this.notify("Change",arguments)
},canSort:function(){return this.clientSort
}})
};