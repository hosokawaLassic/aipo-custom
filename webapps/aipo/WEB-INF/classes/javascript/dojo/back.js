if(!dojo._hasResource["dojo.back"]){dojo._hasResource["dojo.back"]=true;
dojo.provide("dojo.back");
(function(){var b=dojo.back;
function c(){var A=window.location.hash;
if(A.charAt(0)=="#"){A=A.substring(1)
}return dojo.isMozilla?A:decodeURIComponent(A)
}function h(A){if(!A){A=""
}window.location.hash=encodeURIComponent(A);
W=history.length
}if(dojo.exists("tests.back-hash")){b.getHash=c;
b.setHash=h
}var Y=(typeof (window)!=="undefined")?window.location.href:"";
var l=(typeof (window)!=="undefined")?c():"";
var Z=null;
var a=null;
var m=null;
var i=null;
var e=[];
var U=[];
var n=false;
var k=false;
var W;
function f(){var A=U.pop();
if(!A){return 
}var B=U[U.length-1];
if(!B&&U.length==0){B=Z
}if(B){if(B.kwArgs.back){B.kwArgs.back()
}else{if(B.kwArgs.backButton){B.kwArgs.backButton()
}else{if(B.kwArgs.handle){B.kwArgs.handle("back")
}}}}e.push(A)
}b.goBack=f;
function V(){var A=e.pop();
if(!A){return 
}if(A.kwArgs.forward){A.kwArgs.forward()
}else{if(A.kwArgs.forwardButton){A.kwArgs.forwardButton()
}else{if(A.kwArgs.handle){A.kwArgs.handle("forward")
}}}U.push(A)
}b.goForward=V;
function d(B,C,A){return{url:B,kwArgs:C,urlHash:A}
}function j(A){var B=A.split("?");
if(B.length<2){return null
}else{return B[1]
}}function X(){var A=(djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
n=true;
if(i){(dojo.isSafari)?i.location=A:window.frames[i.name].location=A
}else{}return A
}function g(){if(!k){var C=U.length;
var A=c();
if((A===l||window.location.href==Y)&&(C==1)){f();
return 
}if(e.length>0){if(e[e.length-1].urlHash===A){V();
return 
}}if((C>=2)&&(U[C-2])){if(U[C-2].urlHash===A){f();
return 
}}if(dojo.isSafari&&dojo.isSafari<3){var B=history.length;
if(B>W){V()
}else{if(B<W){f()
}}W=B
}}}b.init=function(){if(dojo.byId("dj_history")){return 
}var A=djConfig.dojoIframeHistoryUrl||dojo.moduleUrl("dojo","resources/iframe_history.html");
document.write('<iframe style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="dj_history" id="dj_history" src="'+A+'"></iframe>')
};
b.setInitialState=function(A){Z=d(Y,A,l)
};
b.addToHistory=function(C){e=[];
var F=null;
var D=null;
if(!i){if(djConfig.useXDomain&&!djConfig.dojoIframeHistoryUrl){console.debug("dojo.back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html")
}i=window.frames.dj_history
}if(!m){m=document.createElement("a");
dojo.body().appendChild(m);
m.style.display="none"
}if(C.changeUrl){F=""+((C.changeUrl!==true)?C.changeUrl:(new Date()).getTime());
if(U.length==0&&Z.urlHash==F){Z=d(D,C,F);
return 
}else{if(U.length>0&&U[U.length-1].urlHash==F){U[U.length-1]=d(D,C,F);
return 
}}k=true;
setTimeout(function(){h(F);
k=false
},1);
m.href=F;
if(dojo.isIE){D=X();
var B=C.back||C.backButton||C.handle;
var E=function(H){if(c()!=""){setTimeout(function(){h(F)
},1)
}B.apply(this,[H])
};
if(C.back){C.back=E
}else{if(C.backButton){C.backButton=E
}else{if(C.handle){C.handle=E
}}}var G=C.forward||C.forwardButton||C.handle;
var A=function(H){if(c()!=""){h(F)
}if(G){G.apply(this,[H])
}};
if(C.forward){C.forward=A
}else{if(C.forwardButton){C.forwardButton=A
}else{if(C.handle){C.handle=A
}}}}else{if(!dojo.isIE){if(!a){a=setInterval(g,200)
}}}}else{D=X()
}U.push(d(D,C,F))
};
b._iframeLoaded=function(C,A){var B=j(A.href);
if(B==null){if(U.length==1){f()
}return 
}if(n){n=false;
return 
}if(U.length>=2&&B==j(U[U.length-2].url)){f()
}else{if(e.length>0&&B==j(e[e.length-1].url)){V()
}}}
})()
};