dojo._xdResourceLoaded({depends:[["provide","dojox.image.Gallery"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.image.ThumbnailPicker"],["require","dojox.image.SlideShow"]],defineResource:function(B){if(!B._hasResource["dojox.image.Gallery"]){B._hasResource["dojox.image.Gallery"]=true;
B.provide("dojox.image.Gallery");
B.experimental("dojox.image.Gallery");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dojox.image.ThumbnailPicker");
B.require("dojox.image.SlideShow");
B.declare("dojox.image.Gallery",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,pageSize:dojox.image.SlideShow.prototype.pageSize,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="imageGalleryWrapper">\r\n\t<div dojoAttachPoint="thumbPickerNode"></div>\r\n\t<div dojoAttachPoint="slideShowNode"></div>\r\n</div>\r\n',postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.thumbPicker=new dojox.image.ThumbnailPicker({linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,useLoadNotifier:true},this.thumbPickerNode);
this.slideShow=new dojox.image.SlideShow({imageHeight:this.imageHeight,imageWidth:this.imageWidth,autoLoad:this.autoLoad,linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,slideshowInterval:this.slideshowInterval,pageSize:this.pageSize},this.slideShowNode);
var A=this;
B.subscribe(this.slideShow.getShowTopicName(),function(D){A.thumbPicker._showThumbs(D.index)
});
B.subscribe(this.thumbPicker.getClickTopicName(),function(D){A.slideShow.showImage(D.index)
});
B.subscribe(this.thumbPicker.getShowTopicName(),function(D){A.slideShow.moveImageLoadingPointer(D.index)
});
B.subscribe(this.slideShow.getLoadTopicName(),function(D){A.thumbPicker.markImageLoaded(D)
});
this._centerChildren()
},setDataStore:function(F,E,A){this.thumbPicker.setDataStore(F,E,A);
this.slideShow.setDataStore(F,E,A)
},reset:function(){this.slideShow.reset();
this.thumbPicker.reset()
},showNextImage:function(A){this.slideShow.showNextImage()
},toggleSlideshow:function(){this.slideShow.toggleSlideshow()
},showImage:function(D,A){this.slideShow.showImage(D,A)
},_centerChildren:function(){var F=B.marginBox(this.thumbPicker.outerNode);
var E=B.marginBox(this.slideShow.outerNode);
var A=(F.w-E.w)/2;
if(A>0){B.style(this.slideShow.outerNode,"marginLeft",A+"px")
}else{if(A<0){B.style(this.thumbPicker.outerNode,"marginLeft",(A*-1)+"px")
}}}})
}}});