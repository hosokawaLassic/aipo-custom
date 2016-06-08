if(!dojo._hasResource["dojox.wire.ml.DataStore"]){dojo._hasResource["dojox.wire.ml.DataStore"]=true;
dojo.provide("dojox.wire.ml.DataStore");
dojo.require("dijit._Widget");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.ml.DataStore",dijit._Widget,{storeClass:"",postCreate:function(){this.store=this._createStore()
},_createStore:function(){if(!this.storeClass){return null
}var F=dojox.wire._getClass(this.storeClass);
if(!F){return null
}var H={};
var I=this.domNode.attributes;
for(var G=0;
G<I.length;
G++){var J=I.item(G);
if(J.specified&&!this[J.nodeName]){H[J.nodeName]=J.nodeValue
}}return new F(H)
},getFeatures:function(){return this.store.getFeatures()
},fetch:function(B){return this.store.fetch(B)
},save:function(B){this.store.save(B)
},newItem:function(B){return this.store.newItem(B)
},deleteItem:function(B){return this.store.deleteItem(B)
},revert:function(){return this.store.revert()
}})
};