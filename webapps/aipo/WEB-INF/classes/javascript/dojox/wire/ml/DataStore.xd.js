dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.DataStore"],["require","dijit._Widget"],["require","dojox.wire._base"]],defineResource:function(B){if(!B._hasResource["dojox.wire.ml.DataStore"]){B._hasResource["dojox.wire.ml.DataStore"]=true;
B.provide("dojox.wire.ml.DataStore");
B.require("dijit._Widget");
B.require("dojox.wire._base");
B.declare("dojox.wire.ml.DataStore",dijit._Widget,{storeClass:"",postCreate:function(){this.store=this._createStore()
},_createStore:function(){if(!this.storeClass){return null
}var J=dojox.wire._getClass(this.storeClass);
if(!J){return null
}var G={};
var H=this.domNode.attributes;
for(var A=0;
A<H.length;
A++){var I=H.item(A);
if(I.specified&&!this[I.nodeName]){G[I.nodeName]=I.nodeValue
}}return new J(G)
},getFeatures:function(){return this.store.getFeatures()
},fetch:function(A){return this.store.fetch(A)
},save:function(A){this.store.save(A)
},newItem:function(A){return this.store.newItem(A)
},deleteItem:function(A){return this.store.deleteItem(A)
},revert:function(){return this.store.revert()
}})
}}});