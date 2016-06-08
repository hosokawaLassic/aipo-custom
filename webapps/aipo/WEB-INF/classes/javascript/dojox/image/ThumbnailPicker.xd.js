dojo._xdResourceLoaded({depends:[["provide","dojox.image.ThumbnailPicker"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.fx.scroll"],["require","dojox.fx.easing"]],defineResource:function(B){if(!B._hasResource["dojox.image.ThumbnailPicker"]){B._hasResource["dojox.image.ThumbnailPicker"]=true;
B.provide("dojox.image.ThumbnailPicker");
B.experimental("dojox.image.ThumbnailPicker");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dojox.image.ThumbnailPicker",[dijit._Widget,dijit._Templated],{imageStore:null,request:null,size:500,thumbHeight:75,thumbWidth:100,useLoadNotifier:false,useHyperlink:false,hyperlinkTarget:"new",isClickable:true,isScrollable:true,isHorizontal:true,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",pageSize:20,titleAttr:"title",templateString:'<div dojoAttachPoint="outerNode" class="thumbOuter">\r\n\t<div dojoAttachPoint="navPrev" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navPrevImg"/>    \r\n\t</div>\r\n\t<div dojoAttachPoint="thumbScroller" class="thumbScroller">\r\n\t  <div dojoAttachPoint="thumbsNode" class="thumbWrapper"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="navNext" class="thumbNav thumbClickable">\r\n\t  <img src="" dojoAttachPoint="navNextImg"/>  \r\n\t</div>\r\n</div>\r\n',tempImgPath:B.moduleUrl("dojox.image","resources/images/1pixel.gif"),_thumbs:[],_thumbIndex:0,_maxPhotos:0,_loadedImages:{},postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.pageSize=Number(this.pageSize);
this._scrollerSize=this.size-(51*2);
var A=this._sizeProperty=this.isHorizontal?"width":"height";
B.style(this.outerNode,"textAlign","center");
B.style(this.outerNode,A,this.size+"px");
B.style(this.thumbScroller,A,this._scrollerSize+"px");
if(this.useHyperlink){B.subscribe(this.getClickTopicName(),this,function(F){var G=F.index;
var H=this.imageStore.getValue(F.data,this.linkAttr);
if(!H){return 
}if(this.hyperlinkTarget=="new"){window.open(H)
}else{window.location=H
}})
}if(this.isScrollable){B.require("dojox.fx.scroll");
B.require("dojox.fx.easing")
}if(this.isClickable){B.addClass(this.thumbsNode,"thumbClickable")
}this._totalSize=0;
this.init()
},init:function(){if(this.isInitialized){return false
}var A=this.isHorizontal?"Horiz":"Vert";
B.addClass(this.navPrev,"prev"+A);
B.addClass(this.navNext,"next"+A);
B.addClass(this.thumbsNode,"thumb"+A);
B.addClass(this.outerNode,"thumb"+A);
this.navNextImg.setAttribute("src",this.tempImgPath);
this.navPrevImg.setAttribute("src",this.tempImgPath);
B.connect(this.navPrev,"onclick",this,"_prev");
B.connect(this.navNext,"onclick",this,"_next");
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
},setDataStore:function(J,H,A){this.reset();
this.request={query:{},start:H.start?H.start:0,count:H.count?H.count:10,onBegin:B.hitch(this,function(C){this._maxPhotos=C
})};
if(H.query){B.mixin(this.request.query,H.query)
}if(A&&A.imageThumbAttr){var G=["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"];
for(var I=0;
I<G.length;
I++){if(A[G[I]]){this[G[I]]=A[G[I]]
}}}this.request.start=0;
this.request.count=this.pageSize;
this.imageStore=J;
if(!this.init()){this._loadNextPage()
}},reset:function(){this._loadedImages={};
var D;
for(var A=0;
A<this._thumbs.length;
A++){D=this._thumbs[A];
if(D){if(D.parentNode){D.parentNode.removeChild(D)
}}}this._thumbs=[];
this.isInitialized=false;
this._noImages=true
},isVisible:function(L){var J=this._thumbs[L];
if(!J){return false
}var A=this.isHorizontal?"offsetLeft":"offsetTop";
var I=this.isHorizontal?"offsetWidth":"offsetHeight";
var K=this.isHorizontal?"scrollLeft":"scrollTop";
var H=J[A]-this.thumbsNode[A];
return(H>=this.thumbScroller[K]&&H+J[I]<=this.thumbScroller[K]+this._scrollerSize)
},_next:function(){var A=this.isHorizontal?"offsetLeft":"offsetTop";
var L=this.isHorizontal?"offsetWidth":"offsetHeight";
var J=this.thumbsNode[A];
var O=this._thumbs[this._thumbIndex];
var K=O[A]-J;
var P=-1,N;
for(var M=this._thumbIndex+1;
M<this._thumbs.length;
M++){N=this._thumbs[M];
if(N[A]-J+N[L]-K>this._scrollerSize){this._showThumbs(M);
return 
}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return 
}var A=this.isHorizontal?"offsetLeft":"offsetTop";
var J=this.isHorizontal?"offsetWidth":"offsetHeight";
var M=this._thumbs[this._thumbIndex];
var I=M[A]-this.thumbsNode[A];
var N=-1,L;
for(var K=this._thumbIndex-1;
K>-1;
K--){L=this._thumbs[K];
if(I-L[A]>this._scrollerSize){this._showThumbs(K+1);
return 
}}this._showThumbs(0)
},_checkLoad:function(A,D){B.publish(this.getShowTopicName(),[{index:D}]);
this._updateNavControls();
this._loadingImages={};
this._thumbIndex=D;
if(this.thumbsNode.offsetWidth-A.offsetLeft<(this._scrollerSize*2)){this._loadNextPage()
}},_showThumbs:function(N){var A=this;
var N=arguments.length==0?this._thumbIndex:arguments[0];
N=Math.min(Math.max(N,0),this._maxPhotos);
if(N>=this._maxPhotos){return 
}var M=this._thumbs[N];
if(!M){return 
}var J=M.offsetLeft-this.thumbsNode.offsetLeft;
var K=M.offsetTop-this.thumbsNode.offsetTop;
var I=this.isHorizontal?J:K;
if((I>=this.thumbScroller[this._scrollAttr])&&(I+M[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return 
}if(this.isScrollable){var L=this.isHorizontal?{x:J,y:0}:{x:0,y:K};
dojox.fx.smoothScroll({target:L,win:this.thumbScroller,duration:300,easing:dojox.fx.easing.easeOut,onEnd:B.hitch(this,"_checkLoad",M,N)}).play(10)
}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=J
}else{this.thumbScroller.scrollTop=K
}this._checkLoad(M,N)
}},markImageLoaded:function(D){var A=B.byId("loadingDiv_"+this.widgetid+"_"+D);
if(A){this._setThumbClass(A,"thumbLoaded")
}this._loadedImages[D]=true
},_setThumbClass:function(D,A){if(!this.autoLoad){return 
}B.addClass(D,A)
},_loadNextPage:function(){if(this._loadInProgress){return 
}this._loadInProgress=true;
var A=this.request.start+(this._noImages==true?0:this.pageSize);
var G=A;
while(G<this._thumbs.length&&this._thumbs[G]){G++
}var H=this;
var J=function(F,D){if(F&&F.length){var E=0;
var C=function(){if(E>=F.length){H._loadInProgress=false;
return 
}var L=E++;
H._loadImage(F[L],G+L,C)
};
C();
H._updateNavControls()
}else{H._loadInProgress=false
}};
var I=function(){H._loadInProgress=false;
console.debug("Error getting items")
};
this.request.onComplete=J;
this.request.onError=I;
this.request.start=A;
this._noImages=false;
this.imageStore.fetch(this.request)
},_loadImage:function(X,V,S){var P=this.imageStore.getValue(X,this.imageThumbAttr);
var W=document.createElement("img");
var O=document.createElement("div");
O.setAttribute("id","img_"+this.widgetid+"_"+V);
O.appendChild(W);
W._index=V;
W._data=X;
this._thumbs[V]=O;
var Z;
if(this.useLoadNotifier){Z=document.createElement("div");
Z.setAttribute("id","loadingDiv_"+this.widgetid+"_"+V);
this._setThumbClass(Z,this._loadedImages[V]?"thumbLoaded":"thumbNotifier");
O.appendChild(Z)
}var Q=B.marginBox(this.thumbsNode);
var T;
var A;
if(this.isHorizontal){T=this.thumbWidth;
A="w"
}else{T=this.thumbHeight;
A="h"
}Q=Q[A];
var Y=this.thumbScroller.scrollLeft,R=this.thumbScroller.scrollTop;
B.style(this.thumbsNode,this._sizeProperty,(Q+T+20)+"px");
this.thumbScroller.scrollLeft=Y;
this.thumbScroller.scrollTop=R;
this.thumbsNode.appendChild(O);
B.connect(W,"onload",this,function(){var C=B.marginBox(W)[A];
this._totalSize+=(Number(C)+4);
B.style(this.thumbsNode,this._sizeProperty,this._totalSize+"px");
if(this.useLoadNotifier){B.style(Z,"width",(W.width-4)+"px")
}S();
return false
});
B.connect(W,"onclick",this,function(C){B.publish(this.getClickTopicName(),[{index:C.target._index,data:C.target._data,url:W.getAttribute("src"),largeUrl:this.imageStore.getValue(X,this.imageLargeAttr),title:this.imageStore.getValue(X,this.titleAttr),link:this.imageStore.getValue(X,this.linkAttr)}]);
return false
});
B.addClass(W,"imageGalleryThumb");
W.setAttribute("src",P);
var U=this.imageStore.getValue(X,this.titleAttr);
if(U){W.setAttribute("title",U)
}this._updateNavControls()
},_updateNavControls:function(){var L=[];
var A=function(D,C){var E=C?"addClass":"removeClass";
B[E](D,"enabled");
B[E](D,"thumbClickable")
};
var H=this.isHorizontal?"scrollLeft":"scrollTop";
var K=this.isHorizontal?"offsetWidth":"offsetHeight";
A(this.navPrev,(this.thumbScroller[H]>0));
var J=this._thumbs[this._thumbs.length-1];
var I=(this.thumbScroller[H]+this._scrollerSize<this.thumbsNode[K]);
A(this.navNext,I)
}})
}}});