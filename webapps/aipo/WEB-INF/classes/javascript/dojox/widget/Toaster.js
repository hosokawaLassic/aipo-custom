if(!dojo._hasResource["dojox.widget.Toaster"]){dojo._hasResource["dojox.widget.Toaster"]=true;
dojo.provide("dojox.widget.Toaster");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.Toaster",[dijit._Widget,dijit._Templated],{templateString:'<div dojoAttachPoint="clipNode"><div dojoAttachPoint="containerNode" dojoAttachEvent="onclick:onSelect"><div dojoAttachPoint="contentNode"></div></div></div>',messageTopic:"",_uniqueId:0,messageTypes:{MESSAGE:"message",WARNING:"warning",ERROR:"error",FATAL:"fatal"},defaultType:"message",positionDirection:"br-up",positionDirectionTypes:["br-up","br-left","bl-up","bl-right","tr-down","tr-left","tl-down","tl-right"],duration:"2000",separator:"<hr></hr>",postCreate:function(){dojox.widget.Toaster.superclass.postCreate.apply(this);
this.hide();
this.clipNode.className="dijitToasterClip";
this.containerNode.className+=" dijitToasterContainer";
this.contentNode.className="dijitToasterContent";
if(this.messageTopic){dojo.subscribe(this.messageTopic,this,"_handleMessage")
}},_handleMessage:function(B){if(dojo.isString(B)){this.setContent(B)
}else{this.setContent(B.message,B.type,B.duration)
}},setContent:function(K,N,J){J=J||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(dojo.hitch(this,function(){this.setContent(K,N)
}),50);
return 
}}var O=function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
};
for(var L in this.messageTypes){dojo.removeClass(this.containerNode,"dijitToaster"+O(this.messageTypes[L]))
}dojo.style(this.containerNode,"opacity",1);
if(K&&this.isVisible){K=this.contentNode.innerHTML+this.separator+K
}this.contentNode.innerHTML=K;
dojo.addClass(this.containerNode,"dijitToaster"+O(N||this.defaultType));
this.show();
var I=dojo.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var M=this.containerNode.style;
var P=this.positionDirection;
if(P.indexOf("-up")>=0){M.left=0+"px";
M.top=I.h+10+"px"
}else{if(P.indexOf("-left")>=0){M.left=I.w+10+"px";
M.top=0+"px"
}else{if(P.indexOf("-right")>=0){M.left=0-I.w-10+"px";
M.top=0+"px"
}else{if(P.indexOf("-down")>=0){M.left=0+"px";
M.top=0-I.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+P)
}}}}this.slideAnim=dojo.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
dojo.connect(this.slideAnim,"onEnd",this,function(B,A){this.fadeAnim=dojo.fadeOut({node:this.containerNode,duration:1000});
dojo.connect(this.fadeAnim,"onEnd",this,function(C){this.isVisible=false;
this.hide()
});
if(J>0){setTimeout(dojo.hitch(this,function(C){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),J)
}else{dojo.connect(this,"onSelect",this,function(C){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var J=dijit.getViewport();
var F=dojo.marginBox(this.containerNode);
var G=this.clipNode.style;
G.height=F.h+"px";
G.width=F.w+"px";
var I=this.positionDirection;
if(I.match(/^t/)){G.top=J.t+"px"
}else{if(I.match(/^b/)){G.top=(J.h-F.h-2+J.t)+"px"
}}if(I.match(/^[tb]r-/)){G.left=(J.w-F.w-1-J.l)+"px"
}else{if(I.match(/^[tb]l-/)){G.left=0+"px"
}}G.clip="rect(0px, "+F.w+"px, "+F.h+"px, 0px)";
if(dojo.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var H=this.bgIframe.iframe;
H&&(H.style.display="block")
}},onSelect:function(B){},show:function(){dojo.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=dojo.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){dojo.style(this.containerNode,"display","none");
if(this._scrollConnected){dojo.disconnect(this._scrollConnected);
this._scrollConnected=false
}dojo.style(this.containerNode,"opacity",1)
}})
};