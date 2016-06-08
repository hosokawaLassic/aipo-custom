dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.model"],["require","dojox.grid._data.fields"]],defineResource:function(B){if(!B._hasResource["dojox.grid._data.model"]){B._hasResource["dojox.grid._data.model"]=true;
B.provide("dojox.grid._data.model");
B.require("dojox.grid._data.fields");
B.declare("dojox.grid.data.Model",null,{constructor:function(A,D){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(A){this.fields.set(A)
}this.setData(D)
},count:0,updating:0,observer:function(A,D){this.observers.push({o:A,p:D||"model"})
},notObserver:function(G){for(var F=0,H,A;
(A=this.observers[F]);
F++){if(A.o==G){this.observers.splice(F,1);
return 
}}},notify:function(H,I){if(!this.isUpdating()){var K=I||[];
for(var J=0,L,A;
(A=this.observers[J]);
J++){L=A.p+H,A=A.o;
(L in A)&&(A[L].apply(A,K))
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
},insert:function(A){if(!this._insert.apply(this,arguments)){return false
}this.insertion.apply(this,B._toArray(arguments,1));
return true
},remove:function(A){if(!this._remove.apply(this,arguments)){return false
}this.removal.apply(this,arguments);
return true
},canSort:function(){return this.sort!=null
},makeComparator:function(H){var K,J,A,L=null;
for(var I=H.length-1;
I>=0;
I--){K=H[I];
J=Math.abs(K)-1;
if(J>=0){A=this.fields.get(J);
L=this.generateComparator(A.compare,A.key,K>0,L)
}}return L
},sort:null,dummy:0});
B.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(A){if(!this.cache[A]){this.cache[A]=this.copyRow(A)
}},endModifyRow:function(A){var F=this.cache[A];
if(F){var E=this.getRow(A);
if(!dojox.grid.arrayCompare(F,E)){this.update(F,E,A)
}delete this.cache[A]
}},cancelModifyRow:function(A){var D=this.cache[A];
if(D){this.setRow(D,A);
delete this.cache[A]
}},generateComparator:function(G,F,H,A){return function(D,E){var C=G(D[F],E[F]);
return C?(H?C:-C):A&&A(D,E)
}
}});
B.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(D,A){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(A,D){return(A>=0&&A<this.count&&(arguments.length<2||(D>=0&&D<this.colCount)))
},getRow:function(A){return this.data[A]
},copyRow:function(A){return this.getRow(A).slice(0)
},getDatum:function(A,D){return this.data[A][D]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(A){this.data=(A||[]);
this.allChange()
},setRow:function(D,A){this.data[A]=D;
this.rowChange(D,A);
this.change()
},setDatum:function(A,E,F){this.data[E][F]=A;
this.datumChange(A,E,F)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(J,A){for(var H=0,I=J.length,G=A;
H<I;
H++,G++){this.setRow(J[H],G)
}},update:function(E,F,A){return true
},_insert:function(D,A){dojox.grid.arrayInsert(this.data,A,D);
this.count++;
return true
},_remove:function(A){for(var D=A.length-1;
D>=0;
D--){dojox.grid.arrayRemove(this.data,A[D])
}this.count-=A.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(A,D){dojox.grid.arraySwap(this.data,A,D);
this.rowChange(this.getRow(A),A);
this.rowChange(this.getRow(D),D);
this.change()
},dummy:0});
B.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(A,F,E){if(!A){this.autoAssignFields()
}},autoAssignFields:function(){var A=this.data[0],F=0;
for(var E in A){this.fields.get(F++).key=E
}},getDatum:function(A,D){return this.data[A][this.fields.get(D).key]
}});
B.declare("dojox.grid.data.Dynamic",dojox.grid.data.Table,{constructor:function(){this.page=[];
this.pages=[]
},page:null,pages:null,rowsPerPage:100,requests:0,bop:-1,eop:-1,clearData:function(){this.pages=[];
this.bop=this.eop=-1;
this.setData([])
},getRowCount:function(){return this.count
},getColCount:function(){return this.fields.count()
},setRowCount:function(A){this.count=A;
this.change()
},requestsPending:function(A){},rowToPage:function(A){return(this.rowsPerPage?Math.floor(A/this.rowsPerPage):A)
},pageToRow:function(A){return(this.rowsPerPage?this.rowsPerPage*A:A)
},requestRows:function(A,D){},rowsProvided:function(A,D){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(A){var E=this.pageToRow(A);
var F=Math.min(this.rowsPerPage,this.count-E);
if(F>0){this.requests++;
this.requestsPending(true);
setTimeout(B.hitch(this,"requestRows",E,F),1)
}},needPage:function(A){if(!this.pages[A]){this.pages[A]=true;
this.requestPage(A)
}},preparePage:function(A,E){if(A<this.bop||A>=this.eop){var F=this.rowToPage(A);
this.needPage(F);
this.bop=F*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(A){return Boolean(this.data[A])
},removePages:function(A){for(var F=0,E;
((E=A[F])!=undefined);
F++){this.pages[this.rowToPage(E)]=false
}this.bop=this.eop=-1
},remove:function(A){this.removePages(A);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(A){var D=this.data[A];
if(!D){this.preparePage(A)
}return D
},getDatum:function(A,F){var E=this.getRow(A);
return(E?E[F]:this.fields.get(F).na)
},setDatum:function(A,F,H){var G=this.getRow(F);
if(G){G[H]=A;
this.datumChange(A,F,H)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
B.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(F,H,G){this.count=1;
this._rowIdentities={};
if(G){B.mixin(this,G)
}if(this.store){var A=this.store.getFeatures();
this._canNotify=A["dojo.data.api.Notification"];
this._canWrite=A["dojo.data.api.Write"];
if(this._canNotify){B.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(D,A){return new dojox.grid.data.DojoData(null,null,D)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(A){this.store=A;
this.data=[];
this.allChange()
},setRowCount:function(A){this.count=A;
this.allChange()
},beginReturn:function(A){if(this.count!=A){this.setRowCount(A)
}},_setupFields:function(A){if(this.fields._nameMaps){return 
}var E={};
var F=B.map(this.store.getAttributes(A),function(C,D){E[C]=D;
E[D+".idx"]=C;
return{name:C,key:C}
},this);
this.fields._nameMaps=E;
this.fields.set(F);
this.notify("FieldsChange")
},_getRowFromItem:function(A){},processRows:function(A,D){if(!A){return 
}this._setupFields(A[0]);
B.forEach(A,function(G,H){var C={};
C.__dojo_data_item=G;
B.forEach(this.fields.values,function(E){C[E.name]=this.store.getValue(G,E.name)||""
},this);
this._rowIdentities[this.store.getIdentity(G)]=D.start+H;
this.setRow(C,D.start+H)
},this)
},requestRows:function(A,H){var F=A||0;
var G={start:F,count:this.rowsPerPage,query:this.query,onBegin:B.hitch(this,"beginReturn"),onComplete:B.hitch(this,"processRows")};
this.store.fetch(G)
},getDatum:function(A,H){var F=this.getRow(A);
var G=this.fields.values[H];
return F&&G?F[G.name]:G?G.na:"?"
},setDatum:function(F,G,H){var A=this.fields._nameMaps[H+".idx"];
if(A){this.data[G][A]=F;
this.datumChange(F,G,H)
}},copyRow:function(A){var G={};
var I={};
var H=this.getRow(A);
for(var J in H){if(H[J]!=I[J]){G[J]=H[J]
}}return G
},_attrCompare:function(D,A){B.forEach(this.fields.values,function(C){if(D[C.name]!=A[C.name]){return false
}},this);
return true
},endModifyRow:function(A){var F=this.cache[A];
if(F){var E=this.getRow(A);
if(!this._attrCompare(F,E)){this.update(F,E,A)
}delete this.cache[A]
}},cancelModifyRow:function(A){var D=this.cache[A];
if(D){this.setRow(D,A);
delete this.cache[A]
}},_storeDatumChange:function(J,N,M,L){var I=this._rowIdentities[this.store.getIdentity(J)];
var A=this.getRow(I);
A[N]=L;
var K=this.fields._nameMaps[N];
this.notify("DatumChange",[L,I,K])
},datumChange:function(I,J,A){if(this._canWrite){var G=this.getRow(J);
var H=this.fields._nameMaps[A+".idx"];
this.store.setValue(G.__dojo_data_item,H,I)
}else{this.notify("DatumChange",arguments)
}},insertion:function(){console.debug("Insertion",arguments);
this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){console.debug("Removal",arguments);
this.notify("Removal",arguments);
this.notify("Change",arguments)
},canSort:function(){return this.clientSort
}})
}}});