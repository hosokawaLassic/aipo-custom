if(!dojo._hasResource["dojox.image.ThumbnailPicker"]){dojo._hasResource["dojox.image.ThumbnailPicker"]=true;
dojo.provide("dojox.image.ThumbnailPicker");
dojo.experimental("dojox.image.ThumbnailPicker");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.image.ThumbnailPicker",[dijit._Widget,dijit._Templated],{imageStore:null,request:null,size:500,thumbHeight:75,thumbWidth:100,useLoadNotifier:false,useHyperlink:false,hyperlinkTarget:"new",isClickable:true,isScrollable:true,isHorizontal:true,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",pageSize:20,titleAttr:"title",templateString:'<div dojoAttachPoint="outerNode" class="thumbOuter">\r\n\t<div dojoAttachPoint="navPrev" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navPrevImg"/>    \r\n\t</div>\r\n\t<div dojoAttachPoint="thumbScroller" class="thumbScroller">\r\n\t  <div dojoAttachPoint="thumbsNode" class="thumbWrapper"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="navNext" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navNextImg"/>  \r\n\t</div>\r\n</div>\r\n',tempImgPath:dojo.moduleUrl("dojox.image","resources/images/1pixel.gif"),_thumbs:[],_thumbIndex:0,_maxPhotos:0,_loadedImages:{},postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.pageSize=Number(this.pageSize);
this._scrollerSize=this.size-(51*2);
var B=this._sizeProperty=this.isHorizontal?"width":"height";
dojo.style(this.outerNode,"textAlign","center");
dojo.style(this.outerNode,B,this.size+"px");
dojo.style(this.thumbScroller,B,this._scrollerSize+"px");
if(this.useHyperlink){dojo.subscribe(this.getClickTopicName(),this,function(A){var E=A.index;
var F=this.imageStore.getValue(A.data,this.linkAttr);
if(!F){return 
}if(this.hyperlinkTarget=="new"){window.open(F)
}else{window.location=F
}})
}if(this.isScrollable){dojo.require("dojox.fx.scroll");
dojo.require("dojox.fx.easing")
}if(this.isClickable){dojo.addClass(this.thumbsNode,"thumbClickable")
}this._totalSize=0;
this.init()
},init:function(){if(this.isInitialized){return false
}var B=this.isHorizontal?"Horiz":"Vert";
dojo.addClass(this.navPrev,"prev"+B);
dojo.addClass(this.navNext,"next"+B);
dojo.addClass(this.thumbsNode,"thumb"+B);
dojo.addClass(this.outerNode,"thumb"+B);
this.navNextImg.setAttribute("src",this.tempImgPath);
this.navPrevImg.setAttribute("src",this.tempImgPath);
dojo.connect(this.navPrev,"onclick",this,"_prev");
dojo.connect(this.navNext,"onclick",this,"_next");
this.isInitialized=true;
if(this.isHorizontal){this._offsetAttr="offsetLeft";
this._sizeAttr="offsetWidth";
this._scrollAttr="scrollLeft"
}else{this._offsetAttr="offsetTop";
this._sizeAttr="offsetHeight";
this._scrollAttr="scrollTop"
}this._updateNavControls();
if(this.imageStore&&this.request){this._loadNextPage()
}return true
},getClickTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/select"
},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/show"
},setDataStore:function(F,I,G){this.reset();
this.request={query:{},start:I.start?I.start:0,count:I.count?I.count:10,onBegin:dojo.hitch(this,function(A){this._maxPhotos=A
})};
if(I.query){dojo.mixin(this.request.query,I.query)
}if(G&&G.imageThumbAttr){var H=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var J=0;
J<H.length;
J++){if(G[H[J]]){this[H[J]]=G[H[J]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=F;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var C;
for(var D=0;
D<this._thumbs.length;
D++){C=this._thumbs[D];
if(C){if(C.parentNode){C.parentNode.removeChild(C)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(G){var K=this._thumbs[G];
if(!K){return false
}var H=this.isHorizontal?"offsetLeft":"offsetTop";
var J=this.isHorizontal?"offsetWidth":"offsetHeight";
var L=this.isHorizontal?"scrollLeft":"scrollTop";
var I=K[H]-this.thumbsNode[H];
return(I>=this.thumbScroller[L]&&I+K[J]<=this.thumbScroller[L]+this._scrollerSize)
},_next:function(){var J=this.isHorizontal?"offsetLeft":"offsetTop";
var M=this.isHorizontal?"offsetWidth":"offsetHeight";
var K=this.thumbsNode[J];
var P=this._thumbs[this._thumbIndex];
var L=P[J]-K;
var I=-1,O;
for(var N=this._thumbIndex+1;
N<this._thumbs.length;
N++){O=this._thumbs[N];
if(O[J]-K+O[M]-L>this._scrollerSize){this._showThumbs(N);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var I=this.isHorizontal?"offsetLeft":"offsetTop";
var K=this.isHorizontal?"offsetWidth":"offsetHeight";
var N=this._thumbs[this._thumbIndex];
var J=N[I]-this.thumbsNode[I];
var H=-1,M;
for(var L=this._thumbIndex-1;
L>-1;
L--){M=this._thumbs[L];
if(J-M[I]>this._scrollerSize){this._showThumbs(L+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(D,C){dojo.publish(this.getShowTopicName(),[{index:C}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=C;
if(this.thumbsNode.offsetWidth-D.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(H){var I=this;
var H=arguments.length==0?this._thumbIndex:arguments[0];
H=Math.min(Math.max(H,0),this._maxPhotos);
if(H>=this._maxPhotos){return 
}var N=this._thumbs[H];
if(!N){return 
}var K=N.offsetLeft-this.thumbsNode.offsetLeft;
var L=N.offsetTop-this.thumbsNode.offsetTop;
var J=this.isHorizontal?K:L;
if((J>=this.thumbScroller[this._scrollAttr])&&(J+N[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var M=this.isHorizontal?{x:K,y:0}:{x:0,y:L};
dojox.fx.smoothScroll({target:M,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:dojo.hitch(this,"_checkLoad",N,H)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=K
}else{this.thumbScroller.scrollTop=L
}this._checkLoad(N,H)
}},markImageLoaded:function(C){var D=dojo.byId("loadingDiv_"+this.widgetid+"_"+C);
if(D){this._setThumbClass(D,"thumbLoaded")
}this._loadedImages[C]=true
},_setThumbClass:function(C,D){if(!this.autoLoad){return 
}dojo.addClass(C,D)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var G=this.request.start+(this._noImages==true?0:this.pageSize);
var H=G;
while(H<this._thumbs.length&&this._thumbs[H]){H++
}var I=this;
var F=function(D,B){if(D&&D.length){var C=0;
var A=function(){if(C>=D.length){I._loadInProgress=false;
return 
}var E=C++;
I._loadImage(D[E],H+E,A)
};
A();
I._updateNavControls()
}else{I._loadInProgress=false
}};
var J=function(){I._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=F;
this.request.onError=J;
this.request.start=G;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(Y,W,T){var Q=this.imageStore.getValue(Y,this.imageThumbAttr);
var X=document.createElement("img");
var P=document.createElement("div");
P.setAttribute("id","img_"+this.widgetid+"_"+W);
P.appendChild(X);
X._index=W;
X._data=Y;
this._thumbs[W]=P;
var N;
if(this.useLoadNotifier){N=document.createElement("div");
N.setAttribute("id","loadingDiv_"+this.widgetid+"_"+W);
this._setThumbClass(N,this._loadedImages[W]?"thumbLoaded":"thumbNotifier");
P.appendChild(N)
}var R=dojo.marginBox(this.thumbsNode);
var U;
var O;
if(this.isHorizontal){U=this.thumbWidth;
O="w"
}else{U=this.thumbHeight;
O="h"
}R=R[O];
var Z=this.thumbScroller.scrollLeft,S=this.thumbScroller.scrollTop;
dojo.style(this.thumbsNode,this._sizeProperty,(R+U+20)+"px");
this.thumbScroller.scrollLeft=Z;
this.thumbScroller.scrollTop=S;
this.thumbsNode.appendChild(P);
dojo.connect(X,"onload",this,function(){var A=dojo.marginBox(X)[O];
this._totalSize+=(Number(A)+4);
dojo.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){dojo.style(N,"width",(X.width-4)+"px")
}T();
return false
});
dojo.connect(X,"onclick",this,function(A){dojo.publish(this.getClickTopicName(),[{index:A.target._index,data:A.target._data,url:X.getAttribute("src"),largeUrl:this.imageStore.getValue(Y,this.imageLargeAttr),title:this.imageStore.getValue(Y,this.titleAttr),link:this.imageStore.getValue(Y,this.linkAttr)}]);
return false
});
dojo.addClass(X,"imageGalleryThumb");
X.setAttribute("src",Q);
var V=this.imageStore.getValue(Y,this.titleAttr);
if(V){X.setAttribute("title",V)
}this._updateNavControls()
},_updateNavControls:function(){var G=[];
var H=function(B,A){var C=A?"addClass":"removeClass";
dojo[C](B,"enabled");
dojo[C](B,"thumbClickable")
};
var I=this.isHorizontal?"scrollLeft":"scrollTop";
var L=this.isHorizontal?"offsetWidth":"offsetHeight";
H(this.navPrev,(this.thumbScroller[I]>0));
var K=this._thumbs[this._thumbs.length-1];
var J=(this.thumbScroller[I]+this._scrollerSize<this.thumbsNode[L]);
H(this.navNext,J)
}})
};