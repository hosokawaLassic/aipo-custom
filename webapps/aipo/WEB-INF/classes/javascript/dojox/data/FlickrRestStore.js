if(!dojo._hasResource["dojox.data.FlickrRestStore"]){dojo._hasResource["dojox.data.FlickrRestStore"]=true;
dojo.provide("dojox.data.FlickrRestStore");
dojo.require("dojox.data.FlickrStore");
dojo.declare("dojox.data.FlickrRestStore",dojox.data.FlickrStore,{constructor:function(B){if(B&&B.label){if(B.label){this.label=B.label
}if(B.apikey){this._apikey=B.apikey
}}this._cache=[];
this._prevRequests={};
this._handlers={};
this._prevRequestRanges=[];
this._maxPhotosPerUser={};
this._id=dojox.data.FlickrRestStore.prototype._id++
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(u,v,o){var r={};
if(!u.query){u.query=r={}
}else{dojo.mixin(r,u.query)
}var x=[];
var i=[];
var m="FlickrRestStoreCallback_"+this._id+"_"+(++this._requestCount);
var d={format:"json",method:"flickr.photos.search",api_key:this._apikey,extras:"owner_name,date_upload,date_taken",jsoncallback:m};
var g=false;
if(r.userid){g=true;
d.user_id=u.query.userid;
x.push("userid"+u.query.userid)
}if(r.apikey){g=true;
d.api_key=u.query.apikey;
i.push("api"+u.query.apikey)
}else{throw Error("dojox.data.FlickrRestStore: An API key must be specified.")
}u._curCount=u.count;
if(r.page){d.page=u.query.page;
i.push("page"+d.page)
}else{if(typeof (u.start)!="undefined"&&u.start!=null){if(!u.count){u.count=20
}var j=u.start%u.count;
var t=u.start,p=u.count;
if(j!=0){if(t<p/2){p=t+p;
t=0
}else{var q=20,h=2;
for(var c=q;
c>0;
c--){if(t%c==0&&(t/c)>=p){h=c;
break
}}p=t/h
}u._realStart=u.start;
u._realCount=u.count;
u._curStart=t;
u._curCount=p
}else{u._realStart=u._realCount=null;
u._curStart=u.start;
u._curCount=u.count
}d.page=(t/p)+1;
i.push("page"+d.page)
}}if(u._curCount){d.per_page=u._curCount;
i.push("count"+u._curCount)
}if(r.lang){d.lang=u.query.lang;
x.push("lang"+u.lang)
}var s=this._flickrRestUrl;
if(r.setid){d.method="flickr.photosets.getPhotos";
d.photoset_id=u.query.set;
x.push("set"+u.query.set)
}if(r.tags){if(r.tags instanceof Array){d.tags=r.tags.join(",")
}else{d.tags=r.tags
}x.push("tags"+d.tags);
if(r.tag_mode&&(r.tag_mode.toLowerCase()=="any"||r.tag_mode.toLowerCase()=="all")){d.tag_mode=r.tag_mode
}}if(r.text){d.text=r.text;
x.push("text:"+r.text)
}if(r.sort&&r.sort.length>0){if(!r.sort[0].attribute){r.sort[0].attribute="date-posted"
}if(this._sortAttributes[r.sort[0].attribute]){if(r.sort[0].descending){d.sort=r.sort[0].attribute+"-desc"
}else{d.sort=r.sort[0].attribute+"-asc"
}}}else{d.sort="date-posted-asc"
}x.push("sort:"+d.sort);
x=x.join(".");
i=i.length>0?"."+i.join("."):"";
var l=x+i;
u={query:r,count:u._curCount,start:u._curStart,_realCount:u._realCount,_realStart:u._realStart,onBegin:u.onBegin,onComplete:u.onComplete,onItem:u.onItem};
var n={request:u,fetchHandler:v,errorHandler:o};
if(this._handlers[l]){this._handlers[l].push(n);
return 
}this._handlers[l]=[n];
var f=this;
var b=null;
var e={url:this._flickrRestUrl,preventCache:true,content:d};
var w=function(D,E,A){var C=A.request.onBegin;
A.request.onBegin=null;
var B;
var F=A.request;
if(typeof (F._realStart)!=undefined&&F._realStart!=null){F.start=F._realStart;
F.count=F._realCount;
F._realStart=F._realCount=null
}if(C){if(E&&typeof (E.photos.perpage)!="undefined"&&typeof (E.photos.pages)!="undefined"){if(E.photos.perpage*E.photos.pages<=A.request.start+A.request.count){B=A.request.start+E.photos.photo.length
}else{B=E.photos.perpage*E.photos.pages
}f._maxPhotosPerUser[x]=B;
C(B,A.request)
}else{if(f._maxPhotosPerUser[x]){C(f._maxPhotosPerUser[x],A.request)
}}}A.fetchHandler(D,A.request);
if(C){A.request.onBegin=C
}};
var k=function(D){if(D.stat!="ok"){o(null,u)
}else{var C=f._handlers[l];
if(!C){console.log("FlickrRestStore: no handlers for data",D);
return 
}f._handlers[l]=null;
f._prevRequests[l]=D;
var B=f._processFlickrData(D,u,x);
if(!f._prevRequestRanges[x]){f._prevRequestRanges[x]=[]
}f._prevRequestRanges[x].push({start:u.start,end:u.start+D.photos.photo.length});
for(var A=0;
A<C.length;
A++){w(B,D,C[A])
}}};
var a=this._prevRequests[l];
if(a){this._handlers[l]=null;
w(this._cache[x],a,n);
return 
}else{if(this._checkPrevRanges(x,u.start,u.count)){this._handlers[l]=null;
w(this._cache[x],null,n);
return 
}}dojo.global[m]=function(A){k(A);
dojo.global[m]=null
};
var Z=dojo.io.script.get(e);
Z.addErrback(function(A){dojo.disconnect(b);
o(A,u)
})
},getAttributes:function(B){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
if(C==="title"){return[this._unescapeHtml(D.title)]
}else{if(C==="author"){return[D.ownername]
}else{if(C==="imageUrlSmall"){return[D.media.s]
}else{if(C==="imageUrl"){return[D.media.l]
}else{if(C==="imageUrlMedium"){return[D.media.m]
}else{if(C==="imageUrlThumb"){return[D.media.t]
}else{if(C==="link"){return["http://www.flickr.com/photos/"+D.owner+"/"+D.id]
}else{if(C==="dateTaken"){return D.datetaken
}else{if(C==="datePublished"){return D.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(L,M,S){if(L.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var Q=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var R=[];
if(L.stat=="ok"&&L.photos&&L.photos.photo){R=L.photos.photo;
for(var V=0;
V<R.length;
V++){var P=R[V];
P[this._storeRef]=this;
Q[1]=P.farm;
Q[3]=P.server;
Q[5]=P.id;
Q[7]=P.secret;
var N=Q.join("");
P.media={s:N+"_s.jpg",m:N+"_m.jpg",l:N+".jpg",t:N+"_t.jpg"}
}}var O=M.start?M.start:0;
var U=this._cache[S];
if(!U){this._cache[S]=U=[]
}for(var T=0;
T<R.length;
T++){U[T+O]=R[T]
}return U
},_checkPrevRanges:function(K,H,I){var L=H+I;
var G=this._prevRequestRanges[K];
if(!G){return false
}for(var J=0;
J<G.length;
J++){if(H>=G[J].start&&L<=G[J].end){return true
}}return false
}})
};