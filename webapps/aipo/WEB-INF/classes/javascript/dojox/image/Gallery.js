if(!dojo._hasResource["dojox.image.Gallery"]){dojo._hasResource["dojox.image.Gallery"]=true;
dojo.provide("dojox.image.Gallery");
dojo.experimental("dojox.image.Gallery");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.image.ThumbnailPicker");
dojo.require("dojox.image.SlideShow");
dojo.declare("dojox.image.Gallery",[dijit._Widget,dijit._Templated],{imageHeight:375,imageWidth:500,pageSize:dojox.image.SlideShow.prototype.pageSize,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",titleAttr:"title",slideshowInterval:3,templateString:'<div dojoAttachPoint="outerNode" class="imageGalleryWrapper">\r\n\t<div dojoAttachPoint="thumbPickerNode"></div>\r\n\t<div dojoAttachPoint="slideShowNode"></div>\r\n</div>\r\n',postCreate:function(){this.widgetid=this.id;
this.inherited("postCreate",arguments);
this.thumbPicker=new dojox.image.ThumbnailPicker({linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,useLoadNotifier:true},this.thumbPickerNode);
this.slideShow=new dojox.image.SlideShow({imageHeight:this.imageHeight,imageWidth:this.imageWidth,autoLoad:this.autoLoad,linkAttr:this.linkAttr,imageLargeAttr:this.imageLargeAttr,titleAttr:this.titleAttr,slideshowInterval:this.slideshowInterval,pageSize:this.pageSize},this.slideShowNode);
var B=this;
dojo.subscribe(this.slideShow.getShowTopicName(),function(A){B.thumbPicker._showThumbs(A.index)
});
dojo.subscribe(this.thumbPicker.getClickTopicName(),function(A){B.slideShow.showImage(A.index)
});
dojo.subscribe(this.thumbPicker.getShowTopicName(),function(A){B.slideShow.moveImageLoadingPointer(A.index)
});
dojo.subscribe(this.slideShow.getLoadTopicName(),function(A){B.thumbPicker.markImageLoaded(A)
});
this._centerChildren()
},setDataStore:function(D,F,E){this.thumbPicker.setDataStore(D,F,E);
this.slideShow.setDataStore(D,F,E)
},reset:function(){this.slideShow.reset();
this.thumbPicker.reset()
},showNextImage:function(B){this.slideShow.showNextImage()
},toggleSlideshow:function(){this.slideShow.toggleSlideshow()
},showImage:function(C,D){this.slideShow.showImage(C,D)
},_centerChildren:function(){var D=dojo.marginBox(this.thumbPicker.outerNode);
var F=dojo.marginBox(this.slideShow.outerNode);
var E=(D.w-F.w)/2;
if(E>0){dojo.style(this.slideShow.outerNode,"marginLeft",E+"px")
}else{if(E<0){dojo.style(this.thumbPicker.outerNode,"marginLeft",(E*-1)+"px")
}}}})
};