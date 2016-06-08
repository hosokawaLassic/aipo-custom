dojo._xdResourceLoaded({depends:[["provide","dojox.data.FlickrStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(D){if(!D._hasResource["dojox.data.FlickrStore"]){D._hasResource["dojox.data.FlickrStore"]=true;
D.provide("dojox.data.FlickrStore");
D.require("dojo.data.util.simpleFetch");
D.require("dojo.io.script");
D.require("dojo.date.stamp");
D.declare("dojox.data.FlickrStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(A,B){var F=this.getValues(A,B);
if(F){return F[0]
}return undefined
},getAttributes:function(A){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(A,B){if(this.getValue(A,B)){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){return this.getValue(A,this.label)
},getLabelAttributes:function(A){return[this.label]
},containsValue:function(B,H,A){var J=this.getValues(B,H);
for(var I=0;
I<J.length;
I++){if(J[I]===A){return true
}}return false
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
if(B==="title"){return[this._unescapeHtml(A.title)]
}else{if(B==="author"){return[this._unescapeHtml(A.author)]
}else{if(B==="datePublished"){return[D.date.stamp.fromISOString(A.published)]
}else{if(B==="dateTaken"){return[D.date.stamp.fromISOString(A.date_taken)]
}else{if(B==="imageUrlSmall"){return[A.media.m.replace(/_m\./,"_s.")]
}else{if(B==="imageUrl"){return[A.media.m.replace(/_m\./,".")]
}else{if(B==="imageUrlMedium"){return[A.media.m]
}else{if(B==="link"){return[A.link]
}else{if(B==="tags"){return A.tags.split(" ")
}else{if(B==="description"){return[this._unescapeHtml(A.description)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(A,B,R){if(!A.query){A.query={}
}var P={format:"json",tagmode:"any"};
if(A.query.tags){P.tags=A.query.tags
}if(A.query.tagmode){P.tagmode=A.query.tagmode
}if(A.query.userid){P.id=A.query.userid
}if(A.query.userids){P.ids=A.query.userids
}if(A.query.lang){P.lang=A.query.lang
}var L=this;
var Q=null;
var O={url:this._flickrUrl,preventCache:true,content:P};
var M=function(E){if(Q!==null){D.disconnect(Q)
}B(L._processFlickrData(E),A)
};
Q=D.connect("jsonFlickrFeed",M);
var N=D.io.script.get(O);
N.addErrback(function(E){D.disconnect(Q);
R(E,A)
})
},_processFlickrData:function(A){var H=[];
if(A.items){H=A.items;
for(var G=0;
G<A.items.length;
G++){var B=A.items[G];
B[this._storeRef]=this
}}return H
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
D.extend(dojox.data.FlickrStore,D.data.util.simpleFetch);
if(!C){var C=function(A){}
}}}});