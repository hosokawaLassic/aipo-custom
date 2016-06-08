if(!dojo._hasResource["dojox.image.SlideShow"]){dojo._hasResource["dojox.image.SlideShow"]=true;
dojo.provide("dojox.image.SlideShow");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.image.SlideShow",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,title:"",titleTemplate:'@title <span class="slideShowCounterText">(@current of @total)</span>',noLink:false,loop:true,hasNav:true,images:[],pageSize:20,autoLoad:true,fixedHeight:false,imageStore:null,linkAttr:"link",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="slideShowWrapper">\r\n\t<div style="position:relative;" dojoAttachPoint="innerWrapper">\r\n\t\t<div class="slideShowNav" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<div class="dijitInline slideShowTitle" dojoAttachPoint="titleNode">${title}</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="navNode" class="slideShowCtrl" dojoAttachEvent="onclick: _handleClick">\r\n\t\t\t<span dojoAttachPoint="navPrev" class="slideShowCtrlPrev"></span>\r\n\t\t\t<span dojoAttachPoint="navPlay" class="slideShowCtrlPlay"></span>\r\n\t\t\t<span dojoAttachPoint="navNext" class="slideShowCtrlNext"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint="largeNode" class="slideShowImageWrapper"></div>\t\t\r\n\t\t<div dojoAttachPoint="hiddenNode" class="slideShowHidden"></div>\r\n\t</div>\r\n</div>\r\n',_tempImgPath:dojo.moduleUrl("dojox.image","resources/images/1pixel.gif"),_imageCounter:0,_tmpImage:null,_request:null,postCreate:function(){this.inherited("postCreate",arguments);
var C=document.createElement("img");
C.setAttribute("width",this.imageWidth);
C.setAttribute("height",this.imageHeight);
if(this.hasNav){dojo.connect(this.outerNode,"onmouseover",function(B){try{D._showNav()
}catch(A){}});
dojo.connect(this.outerNode,"onmouseout",function(B){try{D._hideNav(B)
}catch(A){}})
}this.outerNode.style.width=this.imageWidth+"px";
C.setAttribute("src",this._tempImgPath);
var D=this;
this.largeNode.appendChild(C);
this._tmpImage=C;
this._currentImage=C;
this._fitSize(true);
this._loadImage(0,function(){D.showImage(0)
});
this._calcNavDimensions()
},setDataStore:function(J,I,G){this.reset();
var H=this;
this._request={query:{},start:((I.start)?I.start:0),count:((I.count)?I.count:this.pageSize),onBegin:function(A,B){H.maxPhotos=A
}};
if(I.query){dojo.mixin(this._request.query,I.query)
}if(G&&G.imageLargeAttr){this.imageLargeAttr=G.imageLargeAttr
}var H=this;
var F=function(A){H.showImage(0);
H._request.onComplete=null
};
this.imageStore=J;
this._request.onComplete=F;
this._request.start=0;
this.imageStore.fetch(this._request)
},reset:function(){while(this.largeNode.firstChild){this.largeNode.removeChild(this.largeNode.firstChild)
}this.largeNode.appendChild(this._tmpImage);
while(this.hiddenNode.firstChild){this.hiddenNode.removeChild(this.hiddenNode.firstChild)
}var C;
for(var D=0;
D<this.images.length;
D++){C=this.images[D];
if(C&&C.parentNode){C.parentNode.removeChild(C)
}}this.images=[];
this.isInitialized=false;
this._imageCounter=0
},isImageLoaded:function(B){return this.images&&this.images.length>index&&this.images[B]
},moveImageLoadingPointer:function(B){this._imageCounter=B
},destroy:function(){if(this._slideId){this._stop()
}this.inherited("destroy",arguments)
},showNextImage:function(F,D){if(F&&this._timerCancelled){return false
}if(this.imageIndex+1>=this.maxPhotos){if(F&&(this.loop||D)){this.imageIndex=-1
}else{if(this._slideId){this._stop()
}return false
}}var E=this;
this.showImage(this.imageIndex+1,function(){if(F){E._startTimer()
}});
return true
},toggleSlideShow:function(){if(this._slideId){this._stop()
}else{dojo.toggleClass(this.domNode,"slideShowPaused");
this._timerCancelled=false;
var B=this.showNextImage(true,true);
if(!B){this._stop()
}}},getShowTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageShow"
},getLoadTopicName:function(){return(this.widgetId?this.widgetId:this.id)+"/imageLoad"
},showImage:function(F,G){if(!G&&this._slideId){this.toggleSlideShow()
}var H=this;
var I=this.largeNode.getElementsByTagName("div");
this.imageIndex=F;
var J=function(){if(H.images[F]){while(H.largeNode.firstChild){H.largeNode.removeChild(H.largeNode.firstChild)
}H.images[F].style.opacity=0;
H.largeNode.appendChild(H.images[F]);
H._currentImage=H.images[F]._img;
H._fitSize();
var A=function(D,E,B){var C=H.images[F].firstChild;
if(C.tagName.toLowerCase()!="img"){C=C.firstChild
}title=C.getAttribute("title");
if(H._navShowing){H._showNav(true)
}dojo.publish(H.getShowTopicName(),[{index:F,title:title,url:C.getAttribute("src")}]);
if(G){G(D,E,B)
}H._setTitle(title)
};
dojo.fadeIn({node:H.images[F],duration:300,onEnd:A}).play()
}else{H._loadImage(F,function(){dojo.publish(H.getLoadTopicName(),[F]);
H.showImage(F,G)
})
}};
if(I&&I.length>0){dojo.fadeOut({node:I[0],duration:300,onEnd:function(){H.hiddenNode.appendChild(I[0]);
J()
}}).play()
}else{J()
}},_fitSize:function(D){if(!this.fixedHeight||D){var C=(this._currentImage.height+(this.hasNav?20:0));
dojo.style(this.innerWrapper,"height",C+"px");
return 
}dojo.style(this.largeNode,"paddingTop",this._getTopPadding()+"px")
},_getTopPadding:function(){if(!this.fixedHeight){return 0
}return(this.imageHeight-this._currentImage.height)/2
},_loadNextImage:function(){if(!this.autoLoad){return 
}while(this.images.length>=this._imageCounter&&this.images[this._imageCounter]){this._imageCounter++
}this._loadImage(this._imageCounter)
},_loadImage:function(F,J){if(this.images[F]||!this._request){return 
}var I=F-(F%this.pageSize);
this._request.start=I;
this._request.onComplete=function(B){var A=F-I;
if(B&&B.length>A){H(B[A])
}else{}};
var G=this;
var H=function(C){var E=G.imageStore.getValue(C,G.imageLargeAttr);
var N=document.createElement("img");
var P=document.createElement("div");
P._img=N;
var D=G.imageStore.getValue(C,G.linkAttr);
if(!D||G.noLink){P.appendChild(N)
}else{var O=document.createElement("a");
O.setAttribute("href",D);
O.setAttribute("target","_blank");
P.appendChild(O);
O.appendChild(N)
}P.setAttribute("id",G.id+"_imageDiv"+F);
dojo.connect(N,"onload",function(){G._fitImage(N);
P.setAttribute("width",G.imageWidth);
P.setAttribute("height",G.imageHeight);
dojo.publish(G.getLoadTopicName(),[F]);
G._loadNextImage();
if(J){J()
}});
G.hiddenNode.appendChild(P);
var B=document.createElement("div");
dojo.addClass(B,"slideShowTitle");
P.appendChild(B);
G.images[F]=P;
N.setAttribute("src",E);
var A=G.imageStore.getValue(C,G.titleAttr);
if(A){N.setAttribute("title",A)
}};
this.imageStore.fetch(this._request)
},_stop:function(){if(this._slideId){clearTimeout(this._slideId)
}this._slideId=null;
this._timerCancelled=true;
dojo.removeClass(this.domNode,"slideShowPaused")
},_prev:function(){if(this.imageIndex<1){return 
}this.showImage(this.imageIndex-1)
},_next:function(){this.showNextImage()
},_startTimer:function(){this._slideId=setTimeout("dijit.byId('"+this.id+"').showNextImage(true);",this.slideshowInterval*1000)
},_calcNavDimensions:function(){dojo.style(this.navNode,"position","absolute");
dojo.style(this.navNode,"left","-10000px");
dojo._setOpacity(this.navNode,99);
this.navPlay._size=dojo.marginBox(this.navPlay);
this.navPrev._size=dojo.marginBox(this.navPrev);
this.navNext._size=dojo.marginBox(this.navNext);
dojo._setOpacity(this.navNode,0);
dojo.style(this.navNode,"position","");
dojo.style(this.navNode,"left","")
},_setTitle:function(B){this.titleNode.innerHTML=this.titleTemplate.replace("@title",B).replace("@current",String(Number(this.imageIndex)+1)).replace("@total",String(this.maxPhotos))
},_fitImage:function(F){var E=F.width;
var D=F.height;
if(E>this.imageWidth){D=Math.floor(D*(this.imageWidth/E));
F.setAttribute("height",D+"px");
F.setAttribute("width",this.imageWidth+"px")
}if(D>this.imageHeight){E=Math.floor(E*(this.imageHeight/D));
F.setAttribute("height",this.imageHeight+"px");
F.setAttribute("width",E+"px")
}},_handleClick:function(B){switch(B.target){case this.navNext:this._next();
break;
case this.navPrev:this._prev();
break;
case this.navPlay:this.toggleSlideShow();
break
}},_showNav:function(G){if(this._navShowing&&!G){return 
}dojo.style(this.navNode,"marginTop","0px");
dojo.style(this.navPlay,"marginLeft","0px");
var E=dojo.marginBox(this.outerNode);
var H=this._currentImage.height-this.navPlay._size.h-10+this._getTopPadding();
if(H>this._currentImage.height){H+=10
}dojo[this.imageIndex<1?"addClass":"removeClass"](this.navPrev,"slideShowCtrlHide");
dojo[this.imageIndex+1>=this.maxPhotos?"addClass":"removeClass"](this.navNext,"slideShowCtrlHide");
var F=this;
if(this._navAnim){this._navAnim.stop()
}if(this._navShowing){return 
}this._navAnim=dojo.fadeIn({node:this.navNode,duration:300,onEnd:function(){F._navAnim=null
}});
this._navAnim.play();
this._navShowing=true
},_hideNav:function(C){if(!C||!this._overElement(this.outerNode,C)){var D=this;
if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.fadeOut({node:this.navNode,duration:300,onEnd:function(){D._navAnim=null
}});
this._navAnim.play();
this._navShowing=false
}},_overElement:function(L,J){if(typeof (dojo)=="undefined"){return false
}L=dojo.byId(L);
var G={x:J.pageX,y:J.pageY};
var I=dojo._getBorderBox(L);
var H=dojo.coords(L,true);
var K=H.x;
return(G.x>=K&&G.x<=(K+I.w)&&G.y>=H.y&&G.y<=(top+I.h))
}})
};