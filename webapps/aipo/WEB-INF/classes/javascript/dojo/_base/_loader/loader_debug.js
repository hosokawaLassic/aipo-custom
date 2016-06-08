if(!dojo._hasResource["dojo._base._loader.loader_debug"]){dojo._hasResource["dojo._base._loader.loader_debug"]=true;
dojo.provide("dojo._base._loader.loader_debug");
dojo.nonDebugProvide=dojo.provide;
dojo.provide=function(D){var C=dojo._xdDebugQueue;
if(C&&C.length>0&&D==C.currentResourceName){window.setTimeout("dojo._xdDebugFileLoaded('"+D+"')",1)
}return dojo.nonDebugProvide.apply(dojo,arguments)
};
dojo._xdDebugFileLoaded=function(E){var D=this._xdDebugQueue;
if(E&&E==D.currentResourceName){D.shift()
}if(D.length==0){D.currentResourceName=null;
this._xdNotifyLoaded()
}else{D.currentResourceName=D[0].resourceName;
var F=document.createElement("script");
F.type="text/javascript";
F.src=D[0].resourcePath;
document.getElementsByTagName("head")[0].appendChild(F)
}}
};