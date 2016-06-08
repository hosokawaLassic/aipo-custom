dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Contentpane"],["require","dijit.layout.ContentPane"]],defineResource:function(B){if(!B._hasResource["aimluck.widget.Contentpane"]){B._hasResource["aimluck.widget.Contentpane"]=true;
B.provide("aimluck.widget.Contentpane");
B.require("dijit.layout.ContentPane");
B.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(A){this.href=A;
return this._prepareLoad(true)
},setParam:function(D,A){this.params[D]=A
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
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
}})
}}});