dojo._xdResourceLoaded({depends:[["provide","dojox.data.FlickrRestStore"],["require","dojox.data.FlickrStore"]],defineResource:function(B){if(!B._hasResource["dojox.data.FlickrRestStore"]){B._hasResource["dojox.data.FlickrRestStore"]=true;
B.provide("dojox.data.FlickrRestStore");
B.require("dojox.data.FlickrStore");
B.declare("dojox.data.FlickrRestStore",dojox.data.FlickrStore,{constructor:function(A){if(A&&A.label){if(A.label){this.label=A.label
}if(A.apikey){this._apikey=A.apikey
}}this._cache=[];
this._prevRequests={};
this._handlers={};
this._prevRequestRanges=[];
this._maxPhotosPerUser={};
this._id=dojox.data.FlickrRestStore.prototype._id++
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(u,v,o){var r={};
if(!u.query){u.query=r={}
}else{B.mixin(r,u.query)
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
var w=function(D,F,H){var E=H.request.onBegin;
H.request.onBegin=null;
var C;
var G=H.request;
if(typeof (G._realStart)!=undefined&&G._realStart!=null){G.start=G._realStart;
G.count=G._realCount;
G._realStart=G._realCount=null
}if(E){if(F&&typeof (F.photos.perpage)!="undefined"&&typeof (F.photos.pages)!="undefined"){if(F.photos.perpage*F.photos.pages<=H.request.start+H.request.count){C=H.request.start+F.photos.photo.length
}else{C=F.photos.perpage*F.photos.pages
}f._maxPhotosPerUser[x]=C;
E(C,H.request)
}else{if(f._maxPhotosPerUser[x]){E(f._maxPhotosPerUser[x],H.request)
}}}H.fetchHandler(D,H.request);
if(E){H.request.onBegin=E
}};
var k=function(E){if(E.stat!="ok"){o(null,u)
}else{var D=f._handlers[l];
if(!D){console.log("FlickrRestStore: no handlers for data",E);
return 
}f._handlers[l]=null;
f._prevRequests[l]=E;
var C=f._processFlickrData(E,u,x);
if(!f._prevRequestRanges[x]){f._prevRequestRanges[x]=[]
}f._prevRequestRanges[x].push({start:u.start,end:u.start+E.photos.photo.length});
for(var F=0;
F<D.length;
F++){w(C,E,D[F])
}}};
var a=this._prevRequests[l];
if(a){this._handlers[l]=null;
w(this._cache[x],a,n);
return 
}else{if(this._checkPrevRanges(x,u.start,u.count)){this._handlers[l]=null;
w(this._cache[x],null,n);
return 
}}B.global[m]=function(C){k(C);
B.global[m]=null
};
var A=B.io.script.get(e);
A.addErrback(function(C){B.disconnect(b);
o(C,u)
})
},getAttributes:function(A){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(A,D){this._assertIsItem(A);
this._assertIsAttribute(D);
if(D==="title"){return[this._unescapeHtml(A.title)]
}else{if(D==="author"){return[A.ownername]
}else{if(D==="imageUrlSmall"){return[A.media.s]
}else{if(D==="imageUrl"){return[A.media.l]
}else{if(D==="imageUrlMedium"){return[A.media.m]
}else{if(D==="imageUrlThumb"){return[A.media.t]
}else{if(D==="link"){return["http://www.flickr.com/photos/"+A.owner+"/"+A.id]
}else{if(D==="dateTaken"){return A.datetaken
}else{if(D==="datePublished"){return A.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(V,A,R){if(V.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var P=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var Q=[];
if(V.stat=="ok"&&V.photos&&V.photos.photo){Q=V.photos.photo;
for(var U=0;
U<Q.length;
U++){var O=Q[U];
O[this._storeRef]=this;
P[1]=O.farm;
P[3]=O.server;
P[5]=O.id;
P[7]=O.secret;
var M=P.join("");
O.media={s:M+"_s.jpg",m:M+"_m.jpg",l:M+".jpg",t:M+"_t.jpg"}
}}var N=A.start?A.start:0;
var T=this._cache[R];
if(!T){this._cache[R]=T=[]
}for(var S=0;
S<Q.length;
S++){T[S+N]=Q[S]
}return T
},_checkPrevRanges:function(J,A,H){var K=A+H;
var L=this._prevRequestRanges[J];
if(!L){return false
}for(var I=0;
I<L.length;
I++){if(A>=L[I].start&&K<=L[I].end){return true
}}return false
}})
}}});