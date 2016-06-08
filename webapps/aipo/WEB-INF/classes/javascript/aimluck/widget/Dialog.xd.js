dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dialog"],["provide","aimluck.widget.DialogUnderlay"],["provide","aimluck.widget.Timeout"],["require","dijit.Dialog"]],defineResource:function(B){if(!B._hasResource["aimluck.widget.Dialog"]){B._hasResource["aimluck.widget.Dialog"]=true;
B.provide("aimluck.widget.Dialog");
B.provide("aimluck.widget.DialogUnderlay");
B.provide("aimluck.widget.Timeout");
B.require("dijit.Dialog");
B.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var F="";
var A="";
os="";
os.top="";
os.left="";
A.width="";
A.height="";
var E=""
}});
B.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
B.declare("aimluck.widget.Dialog",[dijit.Dialog],{widgetId:null,loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar});
var D=this.domNode;
B.connect(this._moveable,"onMoving",function(C,I){var K=dijit.getViewport();
var J=parseInt(B.getComputedStyle(D).width);
var L=parseInt(K.w);
if(I.l<0){I.l=0
}if(I.l+J>L){I.l=L-J
}if(I.t<0){I.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,dialog:this,duration:this.duration,onEnd:function(){A.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var A=B.byId("weeklyScrollPane_"+this._portlet_id);
if(A){if(typeof aipo.schedule.tmpScroll=="undefined"){B.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{B.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var D=window.navigator.userAgent.toLowerCase();
if(D.indexOf("iphone")>-1||D.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var A=B.byId(this.widgetId);
if(A){A.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(D,A){this._portlet_id=D;
this._callback=A
},setParam:function(D,A){this.params[D]=A
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(A){this.href=A;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(B.hasClass(B.body(),"dojoMove")){return 
}var F=dijit.getViewport();
var A=B.marginBox(this.domNode);
var E=this.domNode.style;
E.left=Math.floor((F.l+(F.w-A.w)/2))+"px";
if(Math.floor((F.t+(F.h-A.h)/2))>0){E.top=Math.floor((F.t+(F.h-A.h)/2))+"px"
}else{E.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var E=this;
var A={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(B.isObject(this.ioArgs)){B.mixin(A,this.ioArgs)
}var F=this._xhrDfd=(this.ioMethod||B.xhrPost)(A);
F.addCallback(function(D){E.clearParams();
E.clearReloadIds();
try{E.onDownloadEnd.call(E);
E._isDownloaded=true;
E.setContent.call(E,D)
}catch(C){E._onError.call(E,"Content",C)
}delete E._xhrDfd;
return D
});
F.addErrback(function(C){if(!F.cancelled){E._onError.call(E,"Download",C)
}delete E._xhrDfd;
return C
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
B.query(".mb_dialoghide").removeClass("mb_dialoghide");
B.query("#modalDialog").removeClass("mb_dialog")
}})
}}});