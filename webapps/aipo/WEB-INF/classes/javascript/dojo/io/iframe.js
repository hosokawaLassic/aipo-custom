if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname]
}if(window.frames[fname]){return window.frames[fname]
}var cframe=null;
var turi=uri;
if(!turi){if(djConfig.useXDomain&&!djConfig.dojoBlankHtmlUrl){console.debug("dojo.io.iframe.create: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html")
}turi=(djConfig.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html"))
}var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':"iframe";
cframe=dojo.doc.createElement(ifrstr);
with(cframe){name=fname;
setAttribute("name",fname);
id=fname
}dojo.body().appendChild(cframe);
window[fname]=cframe;
with(cframe.style){if(dojo.isSafari<3){position="absolute"
}left=top="1px";
height=width="1px";
visibility="hidden"
}if(!dojo.isIE){this.setSrc(cframe,turi,true);
cframe.onload=new Function(onloadstr)
}return cframe
},setSrc:function(I,G,J){try{if(!J){if(dojo.isSafari){I.location=G
}else{frames[I.name].location=G
}}else{var F;
if(dojo.isIE||dojo.isSafari>2){F=I.contentWindow.document
}else{if(dojo.isSafari){F=I.document
}else{F=I.contentWindow
}}if(!F){I.location=G;
return 
}else{F.location.replace(G)
}}}catch(H){console.debug("dojo.io.iframe.setSrc: ",H)
}},doc:function(C){var D=C.contentDocument||((C.contentWindow)&&(C.contentWindow.document))||((C.name)&&(document.frames[C.name])&&(document.frames[C.name].document))||null;
return D
},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,"dojo.io.iframe._iframeOnload();")
}var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;
dfd.ioArgs._callNext()
},function(dfd){var value=null;
try{var ioArgs=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var handleAs=ioArgs.handleAs;
value=ifd;
if(handleAs!="html"){value=ifd.getElementsByTagName("textarea")[0].value;
if(handleAs=="json"){value=dojo.fromJson(value)
}else{if(handleAs=="javascript"){value=dojo.eval(value)
}}}}catch(e){value=e
}finally{ioArgs._callNext()
}return value
},function(error,dfd){dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error
});
dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest()
}};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){return !dfd.ioArgs._hasError
},function(dfd){return(!!dfd.ioArgs._finished)
},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd)
}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"))
}});
return dfd
},_currentDfd:null,_dfdQueue:[],_iframeName:"dojoIoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return 
}var S=this._currentDfd=this._dfdQueue.shift();
var N=S.ioArgs;
var W=N.args;
N._contentToClean=[];
var V=W.form;
var X=W.content||{};
if(V){if(X){for(var U in X){if(!V[U]){var T;
if(dojo.isIE){T=dojo.doc.createElement("<input type='hidden' name='"+U+"'>")
}else{T=dojo.doc.createElement("input");
T.type="hidden";
T.name=U
}T.value=X[U];
V.appendChild(T);
N._contentToClean.push(U)
}else{V[U].value=X[U]
}}}var Q=V.getAttributeNode("action");
var O=V.getAttributeNode("method");
var P=V.getAttributeNode("target");
if(W.url){N._originalAction=Q?Q.value:null;
if(Q){Q.value=W.url
}else{V.setAttribute("action",W.url)
}}if(!O||!O.value){if(O){O.value=(W.method)?W.method:"post"
}else{V.setAttribute("method",(W.method)?W.method:"post")
}}N._originalTarget=P?P.value:null;
if(P){P.value=this._iframeName
}else{V.setAttribute("target",this._iframeName)
}V.target=this._iframeName;
V.submit()
}else{var R=W.url+(W.url.indexOf("?")>-1?"&":"?")+N.query;
this.setSrc(this._frame,R,true)
}}catch(M){S.errback(M)
}},_iframeOnload:function(){var O=this._currentDfd;
if(!O){this._fireNextRequest();
return 
}var J=O.ioArgs;
var R=J.args;
var Q=R.form;
if(Q){var L=J._contentToClean;
for(var K=0;
K<L.length;
K++){var P=L[K];
if(dojo.isSafari<3){for(var M=0;
M<Q.childNodes.length;
M++){var N=Q.childNodes[M];
if(N.name==P){dojo._destroyElement(N);
break
}}}else{dojo._destroyElement(Q[P]);
Q[P]=null
}}if(J._originalAction){Q.setAttribute("action",J._originalAction)
}if(J._originalTarget){Q.setAttribute("target",J._originalTarget);
Q.target=J._originalTarget
}}J._finished=true
}}
};