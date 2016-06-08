if(!dojo._hasResource["dojox.data.PicasaStore"]){dojo._hasResource["dojox.data.PicasaStore"]=true;
dojo.provide("dojox.data.PicasaStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.PicasaStore",null,{constructor:function(B){if(B&&B.label){this.label=B.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(E,F){var D=this.getValues(E,F);
if(D){return D[0]
}return undefined
},getAttributes:function(B){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
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
}else{if(C==="author"){return[this._unescapeHtml(D.author[0].name)]
}else{if(C==="datePublished"){return[dojo.date.stamp.fromISOString(D.published)]
}else{if(C==="dateTaken"){return[dojo.date.stamp.fromISOString(D.date_taken)]
}else{if(C==="imageUrlSmall"){return[D.media.thumbnail[1].url]
}else{if(C==="imageUrl"){return[D.content$src]
}else{if(C==="imageUrlMedium"){return[D.media.thumbnail[2].url]
}else{if(C==="link"){return[D.link[1]]
}else{if(C==="tags"){return D.tags.split(" ")
}else{if(C==="description"){return[this._unescapeHtml(D.summary)]
}}}}}}}}}}return undefined
},isItem:function(B){if(B&&B[this._storeRef]===this){return true
}return false
},close:function(B){},_fetchItems:function(L,M,K){if(!L.query){L.query={}
}var R={alt:"jsonm",pp:"1",psc:"G"};
R["start-index"]="1";
if(L.query.start){R["start-index"]=L.query.start
}if(L.query.tags){R.q=L.query.tags
}if(L.query.userid){R.uname=L.query.userid
}if(L.query.userids){R.ids=L.query.userids
}if(L.query.lang){R.hl=L.query.lang
}if(L.count){R["max-results"]=L.count
}else{R["max-results"]="20"
}var N=this;
var J=null;
var O=function(A){if(J!==null){dojo.disconnect(J)
}M(N._processPicasaData(A),L)
};
var Q={url:this._picasaUrl,content:R,callbackParamName:"callback",handle:O};
var P=dojo.io.script.get(Q);
P.addErrback(function(A){dojo.disconnect(J);
K(A,L)
})
},_processPicasaData:function(F){var E=[];
if(F.feed){E=F.feed.entry;
for(var H=0;
H<E.length;
H++){var G=E[H];
G[this._storeRef]=this
}}return E
},_unescapeHtml:function(B){B=B.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
B=B.replace(/&#39;/gm,"'");
return B
}});
dojo.extend(dojox.data.PicasaStore,dojo.data.util.simpleFetch)
};