if(!dojo._hasResource["aimluck.widget.Contentpane"]){dojo._hasResource["aimluck.widget.Contentpane"]=true;
dojo.provide("aimluck.widget.Contentpane");
dojo.require("dijit.layout.ContentPane");
dojo.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(B){this.href=B;
return this._prepareLoad(true)
},setParam:function(C,D){this.params[C]=D
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
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
}})
};