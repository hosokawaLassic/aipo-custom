dojo._xdResourceLoaded({depends:[["provide","dojox.image.Lightbox"],["require","dijit.Dialog"],["require","dojox.fx"]],defineResource:function(B){if(!B._hasResource["dojox.image.Lightbox"]){B._hasResource["dojox.image.Lightbox"]=true;
B.provide("dojox.image.Lightbox");
B.experimental("dojox.image.Lightbox");
B.require("dijit.Dialog");
B.require("dojox.fx");
B.declare("dojox.image.Lightbox",dijit._Widget,{group:"",title:"",href:"",duration:500,_allowPassthru:false,_attachedDialog:null,startup:function(){this.inherited("startup",arguments);
var A=dijit.byId("dojoxLightboxDialog");
if(A){this._attachedDialog=A
}else{this._attachedDialog=new dojox.image._LightboxDialog({id:"dojoxLightboxDialog"});
this._attachedDialog.startup()
}if(!this.store){this._addSelf();
this.connect(this.domNode,"onclick","_handleClick")
}},_addSelf:function(){this._attachedDialog.addImage({href:this.href,title:this.title},this.group||null)
},_handleClick:function(A){if(!this._allowPassthru){A.preventDefault()
}else{return 
}this.show()
},show:function(){this._attachedDialog.show(this)
},disable:function(){this._allowPassthru=true
},enable:function(){this._allowPassthru=false
}});
B.declare("dojox.image._LightboxDialog",dijit.Dialog,{title:"",inGroup:null,imgUrl:"",_groups:{XnoGroupX:[]},_imageReady:false,templateString:'<div class="dojoxLightbox" dojoAttachPoint="containerNode">\r\n\t<div style="position:relative">\r\n\t\t<div dojoAttachPoint="imageContainer" class="dojoxLightboxContainer">\r\n\t\t\t<img dojoAttachPoint="imgNode" src="${imgUrl}" class="dojoxLightboxImage" alt="${title}">\r\n\t\t\t<div class="dojoxLightboxFooter" dojoAttachPoint="titleNode">\r\n\t\t\t\t<div class="dijitInline LightboxClose" dojoAttachPoint="closeNode"></div>\r\n\t\t\t\t<div class="dijitInline LightboxNext" dojoAttachPoint="nextNode"></div>\t\r\n\t\t\t\t<div class="dijitInline LightboxPrev" dojoAttachPoint="prevNode"></div>\r\n\r\n\t\t\t\t<div class="dojoxLightboxText"><span dojoAttachPoint="textNode">${title}</span><span dojoAttachPoint="groupCount" class="dojoxLightboxGroupText"></span></div>\r\n\t\t\t</div>\r\n\t\t</div>\t\r\n\t\t\r\n\t</div>\r\n</div>\r\n',startup:function(){this.inherited("startup",arguments);
B.connect(document.documentElement,"onkeypress",this,"_handleKey");
this.connect(window,"onresize","_position");
this.connect(this.nextNode,"onclick","_nextImage");
this.connect(this.prevNode,"onclick","_prevImage");
this.connect(this.closeNode,"onclick","hide")
},show:function(D){B.style(this.imgNode,"opacity","0");
B.style(this.titleNode,"opacity","0");
if(!this.open){this.inherited("show",arguments)
}this._imageReady=false;
this.imgNode.src=D.href;
if((D.group&&!(D=="XnoGroupX"))||this.inGroup){if(!this.inGroup){this.inGroup=this._groups[(D.group)];
var A=0;
B.forEach(this.inGroup,function(C){if(C.href==D.href){this._positionIndex=A
}A++
},this)
}if(!this._positionIndex){this._positionIndex=0;
this.imgNode.src=this.inGroup[this._positionIndex].href
}this.groupCount.innerHTML=" ("+(this._positionIndex+1)+" of "+this.inGroup.length+")";
this.prevNode.style.visibility="visible";
this.nextNode.style.visibility="visible"
}else{this.groupCount.innerHTML="";
this.prevNode.style.visibility="hidden";
this.nextNode.style.visibility="hidden"
}this.textNode.innerHTML=D.title;
if(!this._imageReady||this.imgNode.complete===true){this._imgConnect=B.connect(this.imgNode,"onload",this,function(){this._imageReady=true;
this.resizeTo({w:this.imgNode.width,h:this.imgNode.height,duration:this.duration});
B.disconnect(this._imgConnect)
});
if(B.isIE){this.imgNode.src=this.imgNode.src
}}else{this.resizeTo({w:this.imgNode.width,h:this.imgNode.height,duration:1})
}},_nextImage:function(){if(this._positionIndex+1<this.inGroup.length){this._positionIndex++
}else{this._positionIndex=0
}this._loadImage()
},_prevImage:function(){if(this._positionIndex==0){this._positionIndex=this.inGroup.length-1
}else{this._positionIndex--
}this._loadImage()
},_loadImage:function(){var A=B.fx.combine([B.fadeOut({node:this.imgNode,duration:(this.duration/2)}),B.fadeOut({node:this.titleNode,duration:(this.duration/2)})]);
this.connect(A,"onEnd","_prepNodes");
A.play(10)
},_prepNodes:function(){this._imageReady=false;
this.show({href:this.inGroup[this._positionIndex].href,title:this.inGroup[this._positionIndex].title})
},resizeTo:function(D){var A=dojox.fx.sizeTo({node:this.containerNode,duration:D.duration||this.duration,width:D.w,height:D.h+30});
this.connect(A,"onEnd","_showImage");
A.play(this.duration)
},_showImage:function(){B.fadeIn({node:this.imgNode,duration:this.duration,onEnd:B.hitch(this,"_showNav")}).play(75)
},_showNav:function(){B.fadeIn({node:this.titleNode,duration:200}).play(25)
},hide:function(){B.fadeOut({node:this.titleNode,duration:200}).play(25);
this.inherited("hide",arguments);
this.inGroup=null;
this._positionIndex=null
},addImage:function(A,E){var F=E;
if(!A.href){return 
}if(F){if(this._groups[(F)]){this._groups[(F)].push(A)
}else{this._groups[(F)]=[(A)]
}}else{this._groups.XnoGroupX.push(A)
}},_handleKey:function(A){if(!this.open){return 
}var D=(A.charCode==B.keys.SPACE?B.keys.SPACE:A.keyCode);
switch(D){case B.keys.ESCAPE:this.hide();
break;
case B.keys.DOWN_ARROW:case B.keys.RIGHT_ARROW:case 78:this._nextImage();
break;
case B.keys.UP_ARROW:case B.keys.LEFT_ARROW:case 80:this._prevImage();
break
}}})
}}});