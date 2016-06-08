if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(O,M,N){var J=document.cookie;
if(arguments.length==1){var I=J.lastIndexOf(O+"=");
if(I==-1){return null
}var K=I+O.length+1;
var P=J.indexOf(";",I+O.length+1);
if(P==-1){P=J.length
}return decodeURIComponent(J.substring(K,P))
}else{N=N||{};
M=encodeURIComponent(M);
if(typeof (N.expires)=="number"){var L=new Date();
L.setTime(L.getTime()+(N.expires*24*60*60*1000));
N.expires=L
}document.cookie=O+"="+M+(N.expires?"; expires="+N.expires.toUTCString():"")+(N.path?"; path="+N.path:"")+(N.domain?"; domain="+N.domain:"")+(N.secure?"; secure":"");
return null
}}
};