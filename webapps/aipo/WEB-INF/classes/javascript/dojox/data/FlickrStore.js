if(!dojo._hasResource["dojox.data.FlickrStore"]){dojo._hasResource["dojox.data.FlickrStore"]=true;
dojo.provide("dojox.data.FlickrStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.FlickrStore",null,{constructor:function(B){if(B&&B.label){this.label=B.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(E,F){var D=this.getValues(E,F);
if(D){return D[0]
}return undefined
},getAttributes:function(B){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(D,C){if(this.getValue(D,C)){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){return this.getValue(B,this.label)
},getLabelAttributes:function(B){return[this.label]
},containsValue:function(H,I,G){var F=this.getValues(H,I);
for(var J=0;
J<F.length;
J++){if(F[J]===G){return true
}}return false
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
if(C==="title"){return[this._unescapeHtml(D.title)]
}else{if(C==="author"){return[this._unescapeHtml(D.author)]
}else{if(C==="datePublished"){return[dojo.date.stamp.fromISOString(D.published)]
}else{if(C==="dateTaken"){return[dojo.date.stamp.fromISOString(D.date_taken)]
}else{if(C==="imageUrlSmall"){return[D.media.m.replace(/_m\./,"_s.")]
}else{if(C==="imageUrl"){return[D.media.m.replace(/_m\./,".")]
}else{if(C==="imageUrlMedium"){return[D.media.m]
}else{if(C==="link"){return[D.link]
}else{if(C==="tags"){return D.tags.split(" ")
}else{if(C==="description"){return[this._unescapeHtml(D.description)]
}}}}}}}}}}return undefined
},isItem:function(B){if(B&&B[this._storeRef]===this){return true
}return false
},close:function(B){},_fetchItems:function(L,M,K){if(!L.query){L.query={}
}var R={format:"json",tagmode:"any"};
if(L.query.tags){R.tags=L.query.tags
}if(L.query.tagmode){R.tagmode=L.query.tagmode
}if(L.query.userid){R.id=L.query.userid
}if(L.query.userids){R.ids=L.query.userids
}if(L.query.lang){R.lang=L.query.lang
}var N=this;
var J=null;
var Q={url:this._flickrUrl,preventCache:true,content:R};
var O=function(A){if(J!==null){dojo.disconnect(J)
}M(N._processFlickrData(A),L)
};
J=dojo.connect("jsonFlickrFeed",O);
var P=dojo.io.script.get(Q);
P.addErrback(function(A){dojo.disconnect(J);
K(A,L)
})
},_processFlickrData:function(F){var E=[];
if(F.items){E=F.items;
for(var H=0;
H<F.items.length;
H++){var G=F.items[H];
G[this._storeRef]=this
}}return E
},_unescapeHtml:function(B){B=B.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
B=B.replace(/&#39;/gm,"'");
return B
}});
dojo.extend(dojox.data.FlickrStore,dojo.data.util.simpleFetch);
if(!jsonFlickrFeed){var jsonFlickrFeed=function(B){}
}};