window.onload=function(){var M=window.location.href;
var R=M.match(/appName=([a-z0-9 \%]*)/i);
var P="Application";
if(R&&R.length>0){P=decodeURIComponent(R[1])
}var Q=document.getElementById("dot-learn-how-app-name");
Q.innerHTML="";
Q.appendChild(document.createTextNode(P));
R=M.match(/hasOfflineCache=(true|false)/);
var T=false;
if(R&&R.length>0){T=R[1];
T=(T=="true")?true:false
}if(T==true){var K=document.getElementById("dot-download-step");
var S=document.getElementById("dot-install-step");
K.parentNode.removeChild(K);
S.parentNode.removeChild(S)
}R=M.match(/runLink=([^\&]*)\&runLinkText=([^\&]*)/);
if(R&&R.length>0){var L=decodeURIComponent(R[1]);
var N=document.getElementById("dot-learn-how-run-link");
N.setAttribute("href",L);
var O=decodeURIComponent(R[2]);
N.innerHTML="";
N.appendChild(document.createTextNode(O))
}};