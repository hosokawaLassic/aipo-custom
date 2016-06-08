if(!dojo._hasResource["aimluck.widget.Dialog"]){dojo._hasResource["aimluck.widget.Dialog"]=true;
dojo.provide("aimluck.widget.Dialog");
dojo.provide("aimluck.widget.DialogSub");
dojo.provide("aimluck.widget.DialogUnderlay");
dojo.provide("aimluck.widget.Timeout");
dojo.require("dijit.Dialog");
dojo.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var D="";
var E="";
os="";
os.top="";
os.left="";
E.width="";
E.height="";
var F=""
}});
dojo.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
dojo.declare("aimluck.widget.DialogSub",[aimluck.widget.Dialog,dijit.Dialog],{templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"});
dojo.declare("aimluck.widget.Dialog",[dijit.Dialog],{loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar});
var C=this.domNode;
dojo.connect(this._moveable,"onMoving",function(A,B){var I=dijit.getViewport();
var H=parseInt(dojo.getComputedStyle(C).width);
var J=parseInt(I.w);
if(B.l<0){B.l=0
}if(B.l+H>J){B.l=J-H
}if(B.t<0){B.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var D=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:D,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:D,dialog:this,duration:this.duration,onEnd:function(){D.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var B=dojo.byId("weeklyScrollPane_"+this._portlet_id);
if(B){if(typeof aipo.schedule.tmpScroll=="undefined"){dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var C=window.navigator.userAgent.toLowerCase();
if(C.indexOf("iphone")>-1||C.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var D=dojo.byId(this.widgetId);
if(D){D.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(C,D){this._portlet_id=C;
this._callback=D
},setParam:function(C,D){this.params[C]=D
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(B){this.href=B;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var D=dijit.getViewport();
var E=dojo.marginBox(this.domNode);
var F=this.domNode.style;
F.left=Math.floor((D.l+(D.w-E.w)/2))+"px";
if(Math.floor((D.t+(D.h-E.h)/2))>0){F.top=Math.floor((D.t+(D.h-E.h)/2))+"px"
}else{F.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var F=this;
var E={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(E,this.ioArgs)
}var D=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(E);
D.addCallback(function(B){F.clearParams();
F.clearReloadIds();
try{F.onDownloadEnd.call(F);
F._isDownloaded=true;
F.setContent.call(F,B)
}catch(A){F._onError.call(F,"Content",A)
}delete F._xhrDfd;
return B
});
D.addErrback(function(A){if(!D.cancelled){F._onError.call(F,"Download",A)
}delete F._xhrDfd;
return A
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
dojo.query(".mb_dialoghide").removeClass("mb_dialoghide");
dojo.query("#modalDialog").removeClass("mb_dialog")
}})
};