dojo._xdResourceLoaded({depends:[["provide","dojo.back"]],defineResource:function(B){if(!B._hasResource["dojo.back"]){B._hasResource["dojo.back"]=true;
B.provide("dojo.back");
(function(){var b=B.back;
function c(){var C=window.location.hash;
if(C.charAt(0)=="#"){C=C.substring(1)
}return B.isMozilla?C:decodeURIComponent(C)
}function h(C){if(!C){C=""
}window.location.hash=encodeURIComponent(C);
W=history.length
}if(B.exists("tests.back-hash")){b.getHash=c;
b.setHash=h
}var Y=(typeof (window)!=="undefined")?window.location.href:"";
var l=(typeof (window)!=="undefined")?c():"";
var Z=null;
var a=null;
var m=null;
var i=null;
var e=[];
var A=[];
var n=false;
var k=false;
var W;
function f(){var C=A.pop();
if(!C){return 
}var D=A[A.length-1];
if(!D&&A.length==0){D=Z
}if(D){if(D.kwArgs.back){D.kwArgs.back()
}else{if(D.kwArgs.backButton){D.kwArgs.backButton()
}else{if(D.kwArgs.handle){D.kwArgs.handle("back")
}}}}e.push(C)
}b.goBack=f;
function V(){var C=e.pop();
if(!C){return 
}if(C.kwArgs.forward){C.kwArgs.forward()
}else{if(C.kwArgs.forwardButton){C.kwArgs.forwardButton()
}else{if(C.kwArgs.handle){C.kwArgs.handle("forward")
}}}A.push(C)
}b.goForward=V;
function d(C,D,E){return{url:C,kwArgs:D,urlHash:E}
}function j(C){var D=C.split("?");
if(D.length<2){return null
}else{return D[1]
}}function X(){var C=(djConfig.dojoIframeHistoryUrl||B.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
n=true;
if(i){(B.isSafari)?i.location=C:window.frames[i.name].location=C
}else{}return C
}function g(){if(!k){var D=A.length;
var E=c();
if((E===l||window.location.href==Y)&&(D==1)){f();
return 
}if(e.length>0){if(e[e.length-1].urlHash===E){V();
return 
}}if((D>=2)&&(A[D-2])){if(A[D-2].urlHash===E){f();
return 
}}if(B.isSafari&&B.isSafari<3){var C=history.length;
if(C>W){V()
}else{if(C<W){f()
}}W=C
}}}b.init=function(){if(B.byId("dj_history")){return 
}var C=djConfig.dojoIframeHistoryUrl||B.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+C+'"></iframe>')
};
b.setInitialState=function(C){Z=d(Y,C,l)
};
b.addToHistory=function(D){e=[];
var G=null;
var F=null;
if(!i){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}i=window.frames.dj_history
}if(!m){m=document.createElement("a");
B.body().appendChild(m);
m.style.display="none"
}if(D.changeUrl){G=""+((D.changeUrl!==true)?D.changeUrl:(new Date()).getTime());
if(A.length==0&&Z.urlHash==G){Z=d(F,D,G);
return 
}else{if(A.length>0&&A[A.length-1].urlHash==G){A[A.length-1]=d(F,D,G);
return 
}}k=true;
setTimeout(function(){h(G);
k=false
},1);
m.href=G;
if(B.isIE){F=X();
var C=D.back||D.backButton||D.handle;
var E=function(J){if(c()!=""){setTimeout(function(){h(G)
},1)
}C.apply(this,[J])
};
if(D.back){D.back=E
}else{if(D.backButton){D.backButton=E
}else{if(D.handle){D.handle=E
}}}var H=D.forward||D.forwardButton||D.handle;
var I=function(J){if(c()!=""){h(G)
}if(H){H.apply(this,[J])
}};
if(D.forward){D.forward=I
}else{if(D.forwardButton){D.forwardButton=I
}else{if(D.handle){D.handle=I
}}}}else{if(!B.isIE){if(!a){a=setInterval(g,200)
}}}}else{F=X()
}A.push(d(F,D,G))
};
b._iframeLoaded=function(D,E){var C=j(E.href);
if(C==null){if(A.length==1){f()
}return 
}if(n){n=false;
return 
}if(A.length>=2&&C==j(A[A.length-2].url)){f()
}else{if(e.length>0&&C==j(e[e.length-1].url)){V()
}}}
})()
}}});