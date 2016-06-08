dojo._xdResourceLoaded({depends:[["provide","dojox.layout.FloatingPane"],["require","dojox.layout.ContentPane"],["require","dijit._Templated"],["require","dijit._Widget"],["require","dojo.dnd.move"],["require","dojox.layout.ResizeHandle"]],defineResource:function(B){if(!B._hasResource["dojox.layout.FloatingPane"]){B._hasResource["dojox.layout.FloatingPane"]=true;
B.provide("dojox.layout.FloatingPane");
B.experimental("dojox.layout.FloatingPane");
B.require("dojox.layout.ContentPane");
B.require("dijit._Templated");
B.require("dijit._Widget");
B.require("dojo.dnd.move");
B.require("dojox.layout.ResizeHandle");
B.declare("dojox.layout.FloatingPane",[dojox.layout.ContentPane,dijit._Templated],{closable:true,dockable:true,resizable:false,maxable:false,resizeAxis:"xy",title:"",dockTo:null,duration:400,_showAnim:null,_hideAnim:null,_dockNode:null,iconSrc:null,contentClass:"dojoxFloatingPaneContent",templateString:null,templateString:'<div class="dojoxFloatingPane" id="${id}">\r\n\t<div tabindex="0" waiRole="button" class="dojoxFloatingPaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<span dojoAttachPoint="closeNode" dojoAttachEvent="onclick: close" class="dojoxFloatingCloseIcon"></span>\r\n\t\t<span dojoAttachPoint="maxNode" dojoAttachEvent="onclick: maximize" class="dojoxFloatingMaximizeIcon"></span>\r\n\t\t<span dojoAttachPoint="restoreNode" dojoAttachEvent="onclick: _restore" class="dojoxFloatingRestoreIcon"></span>\t\r\n\t\t<span dojoAttachPoint="dockNode" dojoAttachEvent="onclick: minimize" class="dojoxFloatingMinimizeIcon"></span>\r\n\t\t<span dojoAttachPoint="titleNode" class="dijitInline dijitTitleNode"></span>\r\n\t</div>\r\n\t<div dojoAttachPoint="canvas" class="dojoxFloatingPaneCanvas">\r\n\t\t<div dojoAttachPoint="containerNode" waiRole="region" tabindex="-1" class="${contentClass}">\r\n\t\t</div>\r\n\t\t<span dojoAttachPoint="resizeHandle" class="dojoxFloatingResizeHandle"></span>\r\n\t</div>\r\n</div>\r\n',_restoreState:{},_allFPs:[],postCreate:function(){this.setTitle(this.title);
this.inherited("postCreate",arguments);
var D=new B.dnd.Moveable(this.domNode,{handle:this.focusNode});
if(!this.dockable){this.dockNode.style.display="none"
}if(!this.closable){this.closeNode.style.display="none"
}if(!this.maxable){this.maxNode.style.display="none";
this.restoreNode.style.display="none"
}if(!this.resizable){this.resizeHandle.style.display="none"
}else{var A=B.marginBox(this.domNode);
this.domNode.style.width=A.w+"px"
}this._allFPs.push(this)
},startup:function(){this.inherited("startup",arguments);
if(this.resizable){if(B.isIE){this.canvas.style.overflow="auto"
}else{this.containerNode.style.overflow="auto"
}var F=new dojox.layout.ResizeHandle({targetId:this.id,resizeAxis:this.resizeAxis},this.resizeHandle)
}if(this.dockable){tmpName=this.dockTo;
if(this.dockTo){this.dockTo=dijit.byId(this.dockTo)
}else{this.dockTo=dijit.byId("dojoxGlobalFloatingDock")
}if(!this.dockTo){if(tmpName){var A=tmpName;
var E=B.byId(tmpName)
}else{var E=document.createElement("div");
B.body().appendChild(E);
B.addClass(E,"dojoxFloatingDockDefault");
var A="dojoxGlobalFloatingDock"
}this.dockTo=new dojox.layout.Dock({id:A,autoPosition:"south"},E);
this.dockTo.startup()
}if((this.domNode.style.display=="none")||(this.domNode.style.visibility=="hidden")){this.minimize()
}}this.connect(this.focusNode,"onmousedown","bringToTop");
this.connect(this.domNode,"onmousedown","bringToTop")
},setTitle:function(A){this.titleNode.innerHTML=A
},close:function(){if(!this.closable){return 
}B.unsubscribe(this._listener);
this.hide(B.hitch(this,"destroy"))
},hide:function(A){B.fadeOut({node:this.domNode,duration:this.duration,onEnd:B.hitch(this,function(){this.domNode.style.display="none";
this.domNode.style.visibility="hidden";
if(this.dockTo){this.dockTo._positionDock(null)
}if(A){A()
}})}).play()
},show:function(A){var D=B.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:B.hitch(this,function(){this.domNode.style.display="";
this.domNode.style.visibility="visible";
this.dockTo._positionDock(null);
if(this.dockTo){this.dockTo._positionDock(null)
}if(typeof A=="function"){A()
}this._isDocked=false;
if(this._dockNode){this._dockNode.destroy();
this._dockNode=null
}})}).play();
this.resize(B.coords(this.domNode))
},minimize:function(){if(!this._isDocked){this.hide(B.hitch(this,"_dock"))
}},maximize:function(){if(this._maximized){return 
}this._naturalState=B.coords(this.domNode);
if(this._isDocked){this.show();
setTimeout(B.hitch(this,"maximize"),this.duration)
}B.addClass(this.focusNode,"floatingPaneMaximized");
this.resize(dijit.getViewport());
this._maximized=true
},_restore:function(){if(this._maximized){this.resize(this._naturalState);
B.removeClass(this.focusNode,"floatingPaneMaximized");
this._maximized=false
}},_dock:function(){if(!this._isDocked){this._dockNode=this.dockTo.addNode(this);
this._isDocked=true
}},resize:function(A){this._currentState=A;
var D=this.domNode.style;
D.top=A.t+"px";
D.left=A.l+"px";
D.width=A.w+"px";
this.canvas.style.width=A.w+"px";
D.height=A.h+"px";
this.canvas.style.height=(A.h-this.focusNode.offsetHeight)+"px"
},_startZ:100,bringToTop:function(){var A=B.filter(this._allFPs,function(D){return D!==this
},this);
A.sort(function(E,F){return E.domNode.style.zIndex-F.domNode.style.zIndex
});
A.push(this);
B.forEach(A,function(E,F){E.domNode.style.zIndex=(this._startZ+F*2);
B.removeClass(E.domNode,"dojoxFloatingPaneFg")
},this);
B.addClass(this.domNode,"dojoxFloatingPaneFg")
},destroy:function(){this._allFPs.splice(B.indexOf(this._allFPs,this),1);
this.inherited("destroy",arguments)
}});
B.declare("dojox.layout.Dock",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxDock"><ul dojoAttachPoint="containerNode" class="dojoxDockList"></ul></div>',_docked:[],_inPositioning:false,autoPosition:false,addNode:function(F){var A=document.createElement("li");
this.containerNode.appendChild(A);
var E=new dojox.layout._DockNode({title:F.title,paneRef:F},A);
E.startup();
return E
},startup:function(){if(this.id=="dojoxGlobalFloatingDock"||this.isFixedDock){B.connect(window,"onresize",this,"_positionDock");
B.connect(window,"onscroll",this,"_positionDock");
if(B.isIE){B.connect(this.domNode,"onresize",this,"_positionDock")
}}this._positionDock(null);
this.inherited("startup",arguments)
},_positionDock:function(A){if(!this._inPositioning){if(this.autoPosition=="south"){setTimeout(B.hitch(this,function(){this._inPositiononing=true;
var F=dijit.getViewport();
var E=this.domNode.style;
E.left=F.l+"px";
E.width=(F.w-2)+"px";
E.top=(F.h+F.t)-this.domNode.offsetHeight+"px";
this._inPositioning=false
}),500)
}}}});
B.declare("dojox.layout._DockNode",[dijit._Widget,dijit._Templated],{title:"",paneRef:null,templateString:'<li dojoAttachEvent="onclick: restore" class="dojoxDockNode"><span dojoAttachPoint="restoreNode" class="dojoxDockRestoreButton" dojoAttachEvent="onclick: restore"></span><span class="dojoxDockTitleNode" dojoAttachPoint="titleNode">${title}</span></li>',restore:function(){this.paneRef.show();
this.paneRef.bringToTop();
this.destroy()
}})
}}});