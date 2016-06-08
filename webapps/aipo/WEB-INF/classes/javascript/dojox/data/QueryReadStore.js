if(!dojo._hasResource["dojox.data.QueryReadStore"]){dojo._hasResource["dojox.data.QueryReadStore"]=true;
dojo.provide("dojox.data.QueryReadStore");
dojo.provide("dojox.data.QueryReadStore.InvalidItemError");
dojo.provide("dojox.data.QueryReadStore.InvalidAttributeError");
dojo.require("dojo.string");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(B){dojo.mixin(this,B)
},getValue:function(E,F,D){this._assertIsItem(E);
if(!dojo.isString(F)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(E,F)){if(D){return D
}console.log(this._className+".getValue(): Item does not have the attribute '"+F+"'.")
}return E.i[F]
},getValues:function(E,F){var D=[];
if(this.hasAttribute(E,F)){D.push(E.i[F])
}return D
},getAttributes:function(E){this._assertIsItem(E);
var D=[];
for(var F in E.i){D.push(F)
}return D
},hasAttribute:function(D,C){return this.isItem(D)&&typeof D.i[C]!="undefined"
},containsValue:function(I,J,H){var L=this.getValues(I,J);
var G=L.length;
for(var K=0;
K<G;
K++){if(L[K]==H){return true
}}return false
},isItem:function(B){if(B){return typeof B.r!="undefined"&&B.r==this
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){if(this.isItemLoaded(B.item)){return 
}},fetch:function(F){F=F||{};
if(!F.store){F.store=this
}var H=this;
var G=function(A,C){if(C.onError){var B=C.scope||dojo.global;
C.onError.call(B,A,C)
}};
var E=function(P,O){var B=O.abort||null;
var T=false;
var D=O.start?O.start:0;
if(H.doClientPaging==false){D=0
}var Q=O.count?(D+O.count):P.length;
O.abort=function(){T=true;
if(B){B.call(O)
}};
var A=O.scope||dojo.global;
if(!O.store){O.store=H
}if(O.onBegin){O.onBegin.call(A,P.length,O)
}if(O.sort){P.sort(dojo.data.util.sorter.createSortFunction(O.sort,H))
}if(O.onItem){for(var R=D;
(R<P.length)&&(R<Q);
++R){var C=P[R];
if(!T){O.onItem.call(A,C,O)
}}}if(O.onComplete&&!T){var S=null;
if(!O.onItem){S=P.slice(D,Q)
}O.onComplete.call(A,S,O)
}};
this._fetchItems(F,E,G);
return F
},getFeatures:function(){return this._features
},close:function(B){},getLabel:function(B){return undefined
},getLabelAttributes:function(B){return null
},_fetchItems:function(J,H,K){var L=J.serverQuery||J.query||{};
if(!this.doClientPaging){L.start=J.start||0;
if(J.count){L.count=J.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(L)==dojo.toJson(this._lastServerQuery)){H(this._items,J)
}else{var G=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var I=G({url:this.url,handleAs:"json-comment-optional",content:L});
I.addCallback(dojo.hitch(this,function(A){A=this._filterResponse(A);
this._items=[];
dojo.forEach(A.items,function(E){this._items.push({i:E,r:this})
},this);
var C=A.identifier;
this._itemsByIdentity={};
if(C){this._identifier=C;
for(i=0;
i<this._items.length;
++i){var B=this._items[i].i;
var D=B[C];
if(!this._itemsByIdentity[D]){this._itemsByIdentity[D]=B
}else{throw new Error("dojo.data.QueryReadStore:  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+C+"].  Value collided: ["+D+"]")
}}}else{this._identifier=Number;
for(i=0;
i<this._items.length;
++i){this._items[i].n=i
}}H(this._items,J)
}));
I.addErrback(function(A){K(A,J)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},L)
}},_filterResponse:function(B){return B
},_assertIsItem:function(B){if(!this.isItem(B)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+B+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(L){if(this._itemsByIdentity){var H=this._itemsByIdentity[L.identity];
if(!(H===undefined)){if(L.onItem){var J=L.scope?L.scope:dojo.global;
L.onItem.call(J,{i:H,r:this})
}return 
}}var K=function(A,C){var B=L.scope?L.scope:dojo.global;
if(L.onError){L.onError.call(B,error)
}};
var G=function(D,E){var B=L.scope?L.scope:dojo.global;
try{var A=null;
if(D&&D.length==1){A=D[0]
}if(L.onItem){L.onItem.call(B,A)
}}catch(C){if(L.onError){L.onError.call(B,C)
}}};
var I={serverQuery:{id:L.identity}};
this._fetchItems(I,G,K)
},getIdentity:function(D){var C=null;
if(this._identifier===Number){C=D.n
}else{C=D.i[this._identifier]
}return C
},getIdentityAttributes:function(B){return[this._identifier]
}});
dojo.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
dojo.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
};