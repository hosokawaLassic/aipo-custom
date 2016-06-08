dojo._xdResourceLoaded({depends:[["provide","dojox.data.QueryReadStore"],["provide","dojox.data.QueryReadStore.InvalidItemError"],["provide","dojox.data.QueryReadStore.InvalidAttributeError"],["require","dojo.string"],["require","dojo.data.util.simpleFetch"]],defineResource:function(B){if(!B._hasResource["dojox.data.QueryReadStore"]){B._hasResource["dojox.data.QueryReadStore"]=true;
B.provide("dojox.data.QueryReadStore");
B.provide("dojox.data.QueryReadStore.InvalidItemError");
B.provide("dojox.data.QueryReadStore.InvalidAttributeError");
B.require("dojo.string");
B.require("dojo.data.util.simpleFetch");
B.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(A){B.mixin(this,A)
},getValue:function(A,E,F){this._assertIsItem(A);
if(!B.isString(E)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(A,E)){if(F){return F
}console.log(this._className+".getValue(): Item does not have the attribute '"+E+"'.")
}return A.i[E]
},getValues:function(A,E){var F=[];
if(this.hasAttribute(A,E)){F.push(A.i[E])
}return F
},getAttributes:function(A){this._assertIsItem(A);
var F=[];
for(var E in A.i){F.push(E)
}return F
},hasAttribute:function(A,D){return this.isItem(A)&&typeof A.i[D]!="undefined"
},containsValue:function(H,I,A){var K=this.getValues(H,I);
var L=K.length;
for(var J=0;
J<L;
J++){if(K[J]==A){return true
}}return false
},isItem:function(A){if(A){return typeof A.r!="undefined"&&A.r==this
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){if(this.isItemLoaded(A.item)){return 
}},fetch:function(A){A=A||{};
if(!A.store){A.store=this
}var G=this;
var F=function(C,E){if(E.onError){var D=E.scope||B.global;
E.onError.call(D,C,E)
}};
var H=function(R,Q){var D=Q.abort||null;
var V=false;
var P=Q.start?Q.start:0;
if(G.doClientPaging==false){P=0
}var S=Q.count?(P+Q.count):R.length;
Q.abort=function(){V=true;
if(D){D.call(Q)
}};
var C=Q.scope||B.global;
if(!Q.store){Q.store=G
}if(Q.onBegin){Q.onBegin.call(C,R.length,Q)
}if(Q.sort){R.sort(B.data.util.sorter.createSortFunction(Q.sort,G))
}if(Q.onItem){for(var T=P;
(T<R.length)&&(T<S);
++T){var E=R[T];
if(!V){Q.onItem.call(C,E,Q)
}}}if(Q.onComplete&&!V){var U=null;
if(!Q.onItem){U=R.slice(P,S)
}Q.onComplete.call(C,U,Q)
}};
this._fetchItems(A,H,F);
return A
},getFeatures:function(){return this._features
},close:function(A){},getLabel:function(A){return undefined
},getLabelAttributes:function(A){return null
},_fetchItems:function(I,A,J){var K=I.serverQuery||I.query||{};
if(!this.doClientPaging){K.start=I.start||0;
if(I.count){K.count=I.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&B.toJson(K)==B.toJson(this._lastServerQuery)){A(this._items,I)
}else{var L=this.requestMethod.toLowerCase()=="post"?B.xhrPost:B.xhrGet;
var H=L({url:this.url,handleAs:"json-comment-optional",content:K});
H.addCallback(B.hitch(this,function(C){C=this._filterResponse(C);
this._items=[];
B.forEach(C.items,function(G){this._items.push({i:G,r:this})
},this);
var E=C.identifier;
this._itemsByIdentity={};
if(E){this._identifier=E;
for(i=0;
i<this._items.length;
++i){var D=this._items[i].i;
var F=D[E];
if(!this._itemsByIdentity[F]){this._itemsByIdentity[F]=D
}else{throw new Error("dojo.data.QueryReadStore:  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+E+"].  Value collided: ["+F+"]")
}}}else{this._identifier=Number;
for(i=0;
i<this._items.length;
++i){this._items[i].n=i
}}A(this._items,I)
}));
H.addErrback(function(C){J(C,I)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=B.mixin({},K)
}},_filterResponse:function(A){return A
},_assertIsItem:function(A){if(!this.isItem(A)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+A+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(K){if(this._itemsByIdentity){var A=this._itemsByIdentity[K.identity];
if(!(A===undefined)){if(K.onItem){var I=K.scope?K.scope:B.global;
K.onItem.call(I,{i:A,r:this})
}return 
}}var J=function(C,E){var D=K.scope?K.scope:B.global;
if(K.onError){K.onError.call(D,error)
}};
var L=function(F,G){var D=K.scope?K.scope:B.global;
try{var C=null;
if(F&&F.length==1){C=F[0]
}if(K.onItem){K.onItem.call(D,C)
}}catch(E){if(K.onError){K.onError.call(D,E)
}}};
var H={serverQuery:{id:K.identity}};
this._fetchItems(H,L,J)
},getIdentity:function(A){var D=null;
if(this._identifier===Number){D=A.n
}else{D=A.i[this._identifier]
}return D
},getIdentityAttributes:function(A){return[this._identifier]
}});
B.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
B.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
}}});