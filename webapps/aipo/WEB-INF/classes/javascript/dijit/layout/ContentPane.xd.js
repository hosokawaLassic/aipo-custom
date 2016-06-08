dojo._xdResourceLoaded({depends:[["provide","dijit.layout.ContentPane"],["require","dijit._Widget"],["require","dijit.layout._LayoutWidget"],["require","dojo.parser"],["require","dojo.string"],["requireLocalization","dijit","loading",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw","cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.layout.ContentPane"]){B._hasResource["dijit.layout.ContentPane"]=true;
B.provide("dijit.layout.ContentPane");
B.require("dijit._Widget");
B.require("dijit.layout._LayoutWidget");
B.require("dojo.parser");
B.require("dojo.string");
B.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var A=B.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=B.string.substitute(this.loadingMessage,A);
this.errorMessage=B.string.substitute(this.errorMessage,A);
B.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var A=B.query(">",this.containerNode||this.domNode),D=A.filter("[widgetId]");
if(A.length==1&&D.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(D[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(A){this.href=A;
return this._prepareLoad()
},setContent:function(A){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(A||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(F){B.marginBox(this.domNode,F);
var E=this.containerNode||this.domNode,A=B.mixin(B.marginBox(E),F||{});
this._contentBox=dijit.layout.marginBox2contentBox(E,A);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(A){var D=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(A||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&D&&!this._xhrDfd)||(!this.isLoaded&&D&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var E=this;
var A={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(B.isObject(this.ioArgs)){B.mixin(A,this.ioArgs)
}var F=this._xhrDfd=(this.ioMethod||B.xhrGet)(A);
F.addCallback(function(D){try{E.onDownloadEnd.call(E);
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
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(H){this.destroyDescendants();
try{var G=this.containerNode||this.domNode;
while(G.firstChild){B._destroyElement(G.firstChild)
}if(typeof H=="string"){if(this.extractContent){match=H.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){H=match[1]
}}G.innerHTML=H
}else{if(H.nodeType){G.appendChild(H)
}else{B.forEach(H,function(C){G.appendChild(C.cloneNode(true))
})
}}}catch(A){var F=this.onContentError(A);
try{G.innerHTML=F
}catch(A){console.error("Fatal "+this.id+" could not change content due to "+A.message,A)
}}},_onError:function(G,A,H){var F=this["on"+G+"Error"].call(this,A);
if(H){console.error(H,A)
}else{if(F){this._setContent.call(this,F)
}}},_createSubWidgets:function(){var D=this.containerNode||this.domNode;
try{B.parser.parse(D,true)
}catch(A){this._onError("Content",A,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
}}});