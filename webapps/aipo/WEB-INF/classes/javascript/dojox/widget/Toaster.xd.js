dojo._xdResourceLoaded({depends:[["provide","dojox.widget.Toaster"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dojox.widget.Toaster"]){B._hasResource["dojox.widget.Toaster"]=true;
B.provide("dojox.widget.Toaster");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dojox.widget.Toaster",[dijit._Widget,dijit._Templated],{templateString:'<div dojoAttachPoint="clipNode"><div dojoAttachPoint="containerNode" dojoAttachEvent="onclick:onSelect"><div dojoAttachPoint="contentNode"></div></div></div>',messageTopic:"",_uniqueId:0,messageTypes:{MESSAGE:"message",WARNING:"warning",ERROR:"error",FATAL:"fatal"},defaultType:"message",positionDirection:"br-up",positionDirectionTypes:["br-up","br-left","bl-up","bl-right","tr-down","tr-left","tl-down","tl-right"],duration:"2000",separator:"<hr></hr>",postCreate:function(){dojox.widget.Toaster.superclass.postCreate.apply(this);
this.hide();
this.clipNode.className="dijitToasterClip";
this.containerNode.className+=" dijitToasterContainer";
this.contentNode.className="dijitToasterContent";
if(this.messageTopic){B.subscribe(this.messageTopic,this,"_handleMessage")
}},_handleMessage:function(A){if(B.isString(A)){this.setContent(A)
}else{this.setContent(A.message,A.type,A.duration)
}},setContent:function(J,M,A){A=A||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(B.hitch(this,function(){this.setContent(J,M)
}),50);
return 
}}var N=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
for(var K in this.messageTypes){B.removeClass(this.containerNode,"dijitToaster"+N(this.messageTypes[K]))
}B.style(this.containerNode,"opacity",1);
if(J&&this.isVisible){J=this.contentNode.innerHTML+this.separator+J
}this.contentNode.innerHTML=J;
B.addClass(this.containerNode,"dijitToaster"+N(M||this.defaultType));
this.show();
var P=B.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var L=this.containerNode.style;
var O=this.positionDirection;
if(O.indexOf("-up")>=0){L.left=0+"px";
L.top=P.h+10+"px"
}else{if(O.indexOf("-left")>=0){L.left=P.w+10+"px";
L.top=0+"px"
}else{if(O.indexOf("-right")>=0){L.left=0-P.w-10+"px";
L.top=0+"px"
}else{if(O.indexOf("-down")>=0){L.left=0+"px";
L.top=0-P.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+O)
}}}}this.slideAnim=B.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
B.connect(this.slideAnim,"onEnd",this,function(D,C){this.fadeAnim=B.fadeOut({node:this.containerNode,duration:1000});
B.connect(this.fadeAnim,"onEnd",this,function(E){this.isVisible=false;
this.hide()
});
if(A>0){setTimeout(B.hitch(this,function(E){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),A)
}else{B.connect(this,"onSelect",this,function(E){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var I=dijit.getViewport();
var J=B.marginBox(this.containerNode);
var A=this.clipNode.style;
A.height=J.h+"px";
A.width=J.w+"px";
var H=this.positionDirection;
if(H.match(/^t/)){A.top=I.t+"px"
}else{if(H.match(/^b/)){A.top=(I.h-J.h-2+I.t)+"px"
}}if(H.match(/^[tb]r-/)){A.left=(I.w-J.w-1-I.l)+"px"
}else{if(H.match(/^[tb]l-/)){A.left=0+"px"
}}A.clip="rect(0px, "+J.w+"px, "+J.h+"px, 0px)";
if(B.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var G=this.bgIframe.iframe;
G&&(G.style.display="block")
}},onSelect:function(A){},show:function(){B.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=B.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){B.style(this.containerNode,"display","none");
if(this._scrollConnected){B.disconnect(this._scrollConnected);
this._scrollConnected=false
}B.style(this.containerNode,"opacity",1)
}})
}}});