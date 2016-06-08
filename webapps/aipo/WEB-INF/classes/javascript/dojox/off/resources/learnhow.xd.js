dojo._xdResourceLoaded({defineResource:function(B){window.onload=function(){var L=window.location.href;
var Q=L.match(/appName=([a-z0-9 \%]*)/i);
var O="Application";
if(Q&&Q.length>0){O=decodeURIComponent(Q[1])
}var P=document.getElementById("dot-learn-how-app-name");
P.innerHTML="";
P.appendChild(document.createTextNode(O));
Q=L.match(/hasOfflineCache=(true|false)/);
var S=false;
if(Q&&Q.length>0){S=Q[1];
S=(S=="true")?true:false
}if(S==true){var T=document.getElementById("dot-download-step");
var R=document.getElementById("dot-install-step");
T.parentNode.removeChild(T);
R.parentNode.removeChild(R)
}Q=L.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(Q&&Q.length>0){var A=decodeURIComponent(Q[1]);
var M=document.getElementById("dot-learn-how-run-link");
M.setAttribute("href",A);
var N=decodeURIComponent(Q[2]);
M.innerHTML="";
M.appendChild(document.createTextNode(N))
}}
}});