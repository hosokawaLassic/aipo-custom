dojo._xdResourceLoaded({depends:[["provide","dijit.Dialog"],["require","dojo.dnd.move"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit.layout.ContentPane"],["require","dijit.form.Form"]],defineResource:function(B){if(!B._hasResource["dijit.Dialog"]){B._hasResource["dijit.Dialog"]=true;
B.provide("dijit.Dialog");
B.require("dojo.dnd.move");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit.layout.ContentPane");
B.require("dijit.form.Form");
B.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){B.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var H=dijit.getViewport();
var F=this.node.style,A=this.domNode.style;
A.top=H.t+"px";
A.left=H.l+"px";
F.width=H.w+"px";
F.height=H.h+"px";
var G=dijit.getViewport();
if(H.w!=G.w){F.width=G.w+"px"
}if(H.h!=G.h){F.height=G.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
B.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:B.mixin(B.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){B.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(B.hasClass(B.body(),"dojoMove")){return 
}var F=dijit.getViewport();
var A=B.marginBox(this.domNode);
var E=this.domNode.style;
E.left=Math.floor((F.l+(F.w-A.w)/2))+"px";
E.top=Math.floor((F.t+(F.h-A.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(F){if(F.keyCode){var E=F.target;
if(E==this.titleBar&&F.shiftKey&&F.keyCode==B.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}B.stopEvent(F)
}else{while(E){if(E==this.domNode){if(F.keyCode==B.keys.ESCAPE){this.hide()
}else{return 
}}E=E.parentNode
}if(F.keyCode!=B.keys.TAB){B.stopEvent(F)
}else{if(!B.isOpera){try{this.titleBar.focus()
}catch(A){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(B.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(B.connect(document.documentElement,"onkeypress",this,"_onKey"));
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(B.connect(this.containerNode,A,this,"_findLastFocus"));
B.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(B.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}B.forEach(this._modalconnects,B.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",B.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
B.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,A,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(A){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(A.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(A.charAt(0)=="T"?"Below":"Above")
},onOpen:function(A){this.orient(A.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(A){if(A.keyCode==B.keys.ESCAPE){this.onCancel()
}else{if(A.target==this.containerNode&&A.shiftKey&&A.keyCode==B.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}B.stopEvent(A)
}else{if(A.keyCode==B.keys.TAB){A.stopPropagation()
}}}},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}}});