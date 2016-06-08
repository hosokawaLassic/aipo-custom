if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.require("dijit._Widget");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dojo.parser");
dojo.require("dojo.string");
dojo.requireLocalization("dijit","loading",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var B=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,B);
this.errorMessage=dojo.string.substitute(this.errorMessage,B);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var D=dojo.query(">",this.containerNode||this.domNode),C=D.filter("[widgetId]");
if(D.length==1&&C.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(C[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(B){this.href=B;
return this._prepareLoad()
},setContent:function(B){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(B||"");
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
},resize:function(D){dojo.marginBox(this.domNode,D);
var F=this.containerNode||this.domNode,E=dojo.mixin(dojo.marginBox(F),D||{});
this._contentBox=dijit.layout.marginBox2contentBox(F,E);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(B){this.cancel();
this.isLoaded=false;
this._loadCheck(B)
},_loadCheck:function(D){var C=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(D||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&C&&!this._xhrDfd)||(!this.isLoaded&&C&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var F=this;
var E={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(E,this.ioArgs)
}var D=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(E);
D.addCallback(function(B){try{F.onDownloadEnd.call(F);
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
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(E){this.destroyDescendants();
try{var H=this.containerNode||this.domNode;
while(H.firstChild){dojo._destroyElement(H.firstChild)
}if(typeof E=="string"){if(this.extractContent){match=E.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){E=match[1]
}}H.innerHTML=E
}else{if(E.nodeType){H.appendChild(E)
}else{dojo.forEach(E,function(A){H.appendChild(A.cloneNode(true))
})
}}}catch(F){var G=this.onContentError(F);
try{H.innerHTML=G
}catch(F){console.error("Fatal "+this.id+" could not change content due to "+F.message,F)
}}},_onError:function(H,F,E){var G=this["on"+H+"Error"].call(this,F);
if(E){console.error(E,F)
}else{if(G){this._setContent.call(this,G)
}}},_createSubWidgets:function(){var C=this.containerNode||this.domNode;
try{dojo.parser.parse(C,true)
}catch(D){this._onError("Content",D,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(B){},onUnload:function(B){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(B){},onDownloadError:function(B){return this.errorMessage
},onDownloadEnd:function(){}})
};