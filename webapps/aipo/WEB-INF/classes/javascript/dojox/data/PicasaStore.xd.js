dojo._xdResourceLoaded({depends:[["provide","dojox.data.PicasaStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojox.data.PicasaStore"]){B._hasResource["dojox.data.PicasaStore"]=true;
B.provide("dojox.data.PicasaStore");
B.require("dojo.data.util.simpleFetch");
B.require("dojo.io.script");
B.require("dojo.date.stamp");
B.declare("dojox.data.PicasaStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(A,E){var F=this.getValues(A,E);
if(F){return F[0]
}return undefined
},getAttributes:function(A){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
},hasAttribute:function(A,D){if(this.getValue(A,D)){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){return this.getValue(A,this.label)
},getLabelAttributes:function(A){return[this.label]
},containsValue:function(G,H,A){var J=this.getValues(G,H);
for(var I=0;
I<J.length;
I++){if(J[I]===A){return true
}}return false
},getValues:function(A,D){this._assertIsItem(A);
this._assertIsAttribute(D);
if(D==="title"){return[this._unescapeHtml(A.title)]
}else{if(D==="author"){return[this._unescapeHtml(A.author[0].name)]
}else{if(D==="datePublished"){return[B.date.stamp.fromISOString(A.published)]
}else{if(D==="dateTaken"){return[B.date.stamp.fromISOString(A.date_taken)]
}else{if(D==="imageUrlSmall"){return[A.media.thumbnail[1].url]
}else{if(D==="imageUrl"){return[A.content$src]
}else{if(D==="imageUrlMedium"){return[A.media.thumbnail[2].url]
}else{if(D==="link"){return[A.link[1]]
}else{if(D==="tags"){return A.tags.split(" ")
}else{if(D==="description"){return[this._unescapeHtml(A.summary)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(K,L,A){if(!K.query){K.query={}
}var Q={alt:"jsonm",pp:"1",psc:"G"};
Q["start-index"]="1";
if(K.query.start){Q["start-index"]=K.query.start
}if(K.query.tags){Q.q=K.query.tags
}if(K.query.userid){Q.uname=K.query.userid
}if(K.query.userids){Q.ids=K.query.userids
}if(K.query.lang){Q.hl=K.query.lang
}if(K.count){Q["max-results"]=K.count
}else{Q["max-results"]="20"
}var M=this;
var R=null;
var N=function(C){if(R!==null){B.disconnect(R)
}L(M._processPicasaData(C),K)
};
var P={url:this._picasaUrl,content:Q,callbackParamName:"callback",handle:N};
var O=B.io.script.get(P);
O.addErrback(function(C){B.disconnect(R);
A(C,K)
})
},_processPicasaData:function(A){var H=[];
if(A.feed){H=A.feed.entry;
for(var G=0;
G<H.length;
G++){var F=H[G];
F[this._storeRef]=this
}}return H
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
B.extend(dojox.data.PicasaStore,B.data.util.simpleFetch)
}}});