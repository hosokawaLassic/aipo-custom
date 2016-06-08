dojo._xdResourceLoaded({depends:[["provide","dojo.cookie"]],defineResource:function(B){if(!B._hasResource["dojo.cookie"]){B._hasResource["dojo.cookie"]=true;
B.provide("dojo.cookie");
B.cookie=function(N,L,M){var A=document.cookie;
if(arguments.length==1){var P=A.lastIndexOf(N+"=");
if(P==-1){return null
}var J=P+N.length+1;
var O=A.indexOf(";",P+N.length+1);
if(O==-1){O=A.length
}return decodeURIComponent(A.substring(J,O))
}else{M=M||{};
L=encodeURIComponent(L);
if(typeof (M.expires)=="number"){var K=new Date();
K.setTime(K.getTime()+(M.expires*24*60*60*1000));
M.expires=K
}document.cookie=N+"="+L+(M.expires?"; expires="+M.expires.toUTCString():"")+(M.path?"; path="+M.path:"")+(M.domain?"; domain="+M.domain:"")+(M.secure?"; secure":"");
return null
}}
}}});