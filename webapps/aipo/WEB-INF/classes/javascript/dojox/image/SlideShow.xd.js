dojo._xdResourceLoaded({depends:[["provide","dojox.image.SlideShow"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dojox.image.SlideShow"]){B._hasResource["dojox.image.SlideShow"]=true;
B.provide("dojox.image.SlideShow");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:B.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var D=document.createElement("img");
D.setAttribute("width",this.imageWidth);
D.setAttribute("height",this.imageHeight);
if(this.hasNav){B.connect(this.outerNode,"onmouseover",function(F){try{A._showNav()
}catch(C){}});
B.connect(this.outerNode,"onmouseout",function(F){try{A._hideNav(F)
}catch(C){}})
}this.outerNode.style.width=this.imageWidth+"px";
D.setAttribute("src",this._tempImgPath);
var A=this;
this.largeNode.appendChild(D);
this._tmpImage=D;
this._currentImage=D;
this._fitSize(true);
this._loadImage(0,function(){A.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(I,H,A){this.reset();
var G=this;
this._request={query:{},start:((H.start)?H.start:0),count:((H.count)?H.count:this.pageSize),onBegin:function(C,D){G.maxPhotos=C
}};
if(H.query){B.mixin(this._request.query,H.query)
}if(A&&A.imageLargeAttr){this.imageLargeAttr=A.imageLargeAttr
}var G=this;
var J=function(C){G.showImage(0);
G._request.onComplete=null
};
this.imageStore=I;
this._request.onComplete=J;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var D;
for(var A=0;
A<this.images.length;
A++){D=this.images[A];
if(D&&D.parentNode){D.parentNode.removeChild(D)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(A){return this.images&&this.images.length>index&&this.images[A]
},moveImageLoadingPointer:function(A){this._imageCounter=A
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(E,F){if(E&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(E&&(this.loop||F)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var A=this;
this.showImage(this.imageIndex+1,function(){if(E){A._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{B.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var A=this.showNextImage(true,true);
if(!A){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(J,A){if(!A&&this._slideId){this.toggleSlideShow()
}var G=this;
var H=this.largeNode.getElementsByTagName("div");
this.imageIndex=J;
var I=function(){if(G.images[J]){while(G.largeNode.firstChild){G.largeNode.removeChild(G.largeNode.firstChild)
}G.images[J].style.opacity=0;
G.largeNode.appendChild(G.images[J]);
G._currentImage=G.images[J]._img;
G._fitSize();
var C=function(F,L,D){var E=G.images[J].firstChild;
if(E.tagName.toLowerCase()!="img"){E=E.firstChild
}title=E.getAttribute("title");
if(G._navShowing){G._showNav(true)
}B.publish(G.getShowTopicName(),[{index:J,title:title,url:E.getAttribute("src")}]);
if(A){A(F,L,D)
}G._setTitle(title)
};
B.fadeIn({node:G.images[J],duration:300,onEnd:C}).play()
}else{G._loadImage(J,function(){B.publish(G.getLoadTopicName(),[J]);
G.showImage(J,A)
})
}};
if(H&&H.length>0){B.fadeOut({node:H[0],duration:300,onEnd:function(){G.hiddenNode.appendChild(H[0]);
I()
}}).play()
}else{I()
}},_fitSize:function(A){if(!this.fixedHeight||A){var D=(this._currentImage.height+(this.hasNav?20:0));
B.style(this.innerWrapper,"height",D+"px");
return 
}B.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(J,I){if(this.images[J]||!this._request){return 
}var H=J-(J%this.pageSize);
this._request.start=H;
this._request.onComplete=function(D){var C=J-H;
if(D&&D.length>C){G(D[C])
}else{}};
var A=this;
var G=function(D){var F=A.imageStore.getValue(D,A.imageLargeAttr);
var O=document.createElement("img");
var Q=document.createElement("div");
Q._img=O;
var E=A.imageStore.getValue(D,A.linkAttr);
if(!E||A.noLink){Q.appendChild(O)
}else{var P=document.createElement("a");
P.setAttribute("href",E);
P.setAttribute("target","_blank");
Q.appendChild(P);
P.appendChild(O)
}Q.setAttribute("id",A.id+"_imageDiv"+J);
B.connect(O,"onload",function(){A._fitImage(O);
Q.setAttribute("width",A.imageWidth);
Q.setAttribute("height",A.imageHeight);
B.publish(A.getLoadTopicName(),[J]);
A._loadNextImage();
if(I){I()
}});
A.hiddenNode.appendChild(Q);
var C=document.createElement("div");
B.addClass(C,"slideShowTitle");
Q.appendChild(C);
A.images[J]=Q;
O.setAttribute("src",F);
var R=A.imageStore.getValue(D,A.titleAttr);
if(R){O.setAttribute("title",R)
}};
this.imageStore.fetch(this._request)
},_stop:function(){if(this._slideId){clearTimeout(this._slideId)
}this._slideId=null;
this._timerCancelled=true;
B.removeClass(this.domNode,"slideShowPaused")
},_prev:function(){if(this.imageIndex<1){return 
}this.showImage(this.imageIndex-1)
},_next:function(){this.showNextImage()
},_startTimer:function(){this._slideId=setTimeout("dijit.byId('"+this.id+"').showNextImage(true);",this.slideshowInterval*1000)
},_calcNavDimensions:function(){B.style(this.navNode,"position","absolute");
B.style(this.navNode,"left","-10000px");
B._setOpacity(this.navNode,99);
this.navPlay._size=B.marginBox(this.navPlay);
this.navPrev._size=B.marginBox(this.navPrev);
this.navNext._size=B.marginBox(this.navNext);
B._setOpacity(this.navNode,0);
B.style(this.navNode,"position","");
B.style(this.navNode,"left","")
},_setTitle:function(A){this.titleNode.innerHTML=this.titleTemplate.replace("@title",A).replace("@current",String(Number(this.imageIndex)+1)).replace("@total",String(this.maxPhotos))
},_fitImage:function(E){var A=E.width;
var F=E.height;
if(A>this.imageWidth){F=Math.floor(F*(this.imageWidth/A));
E.setAttribute("height",F+"px");
E.setAttribute("width",this.imageWidth+"px")
}if(F>this.imageHeight){A=Math.floor(A*(this.imageHeight/F));
E.setAttribute("height",this.imageHeight+"px");
E.setAttribute("width",A+"px")
}},_handleClick:function(A){switch(A.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(F){if(this._navShowing&&!F){return 
}B.style(this.navNode,"marginTop","0px");
B.style(this.navPlay,"marginLeft","0px");
var H=B.marginBox(this.outerNode);
var G=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(G>this._currentImage.height){G+=10
}B[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
B[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var A=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=B.fadeIn({node:this.navNode,duration:300,onEnd:function(){A._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(D){if(!D||!this._overElement(this.outerNode,D)){var A=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=B.fadeOut({node:this.navNode,duration:300,onEnd:function(){A._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(K,I){if(typeof (B)=="undefined"){return false
}K=B.byId(K);
var L={x:I.pageX,y:I.pageY};
var H=B._getBorderBox(K);
var A=B.coords(K,true);
var J=A.x;
return(L.x>=J&&L.x<=(J+H.w)&&L.y>=A.y&&L.y<=(top+H.h))
}})
}}});