if(!dojo._hasResource["dojo.io.script"]){dojo._hasResource["dojo.io.script"]=true;
dojo.provide("dojo.io.script");
dojo.io.script={get:function(E){var D=this._makeScriptDeferred(E);
var F=D.ioArgs;
dojo._ioAddQueryToUrl(F);
this.attach(F.id,F.url);
dojo._ioWatch(D,this._validCheck,this._ioCheck,this._resHandle);
return D
},attach:function(E,D){var F=dojo.doc.createElement("script");
F.type="text/javascript";
F.src=D;
F.id=E;
dojo.doc.getElementsByTagName("head")[0].appendChild(F)
},remove:function(B){dojo._destroyElement(dojo.byId(B));
if(this["jsonp_"+B]){delete this["jsonp_"+B]
}},_makeScriptDeferred:function(E){var D=dojo._ioSetArgs(E,this._deferredCancel,this._deferredOk,this._deferredError);
var F=D.ioArgs;
F.id="dojoIoScript"+(this._counter++);
F.canDelete=false;
if(E.callbackParamName){F.query=F.query||"";
if(F.query.length>0){F.query+="&"
}F.query+=E.callbackParamName+"=dojo.io.script.jsonp_"+F.id+"._jsonpCallback";
F.canDelete=true;
D._jsonpCallback=this._jsonpCallback;
this["jsonp_"+F.id]=D
}return D
},_deferredCancel:function(B){B.canceled=true;
if(B.ioArgs.canDelete){dojo.io.script._deadScripts.push(B.ioArgs.id)
}},_deferredOk:function(B){if(B.ioArgs.canDelete){dojo.io.script._deadScripts.push(B.ioArgs.id)
}if(B.ioArgs.json){return B.ioArgs.json
}else{return B.ioArgs
}},_deferredError:function(D,C){if(C.ioArgs.canDelete){if(D.dojoType=="timeout"){dojo.io.script.remove(C.ioArgs.id)
}else{dojo.io.script._deadScripts.push(C.ioArgs.id)
}}console.debug("dojo.io.script error",D);
return D
},_deadScripts:[],_counter:1,_validCheck:function(H){var E=dojo.io.script;
var G=E._deadScripts;
if(G&&G.length>0){for(var F=0;
F<G.length;
F++){E.remove(G[F])
}dojo.io.script._deadScripts=[]
}return true
},_ioCheck:function(dfd){if(dfd.ioArgs.json){return true
}var checkString=dfd.ioArgs.args.checkString;
if(checkString&&eval("typeof("+checkString+") != 'undefined'")){return true
}return false
},_resHandle:function(B){if(dojo.io.script._ioCheck(B)){B.callback(B)
}else{B.errback(new Error("inconceivable dojo.io.script._resHandle error"))
}},_jsonpCallback:function(B){this.ioArgs.json=B
}}
};