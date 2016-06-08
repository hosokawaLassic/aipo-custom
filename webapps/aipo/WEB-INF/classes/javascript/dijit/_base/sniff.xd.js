dojo._xdResourceLoaded({depends:[["provide","dijit._base.sniff"]],defineResource:function(B){if(!B._hasResource["dijit._base.sniff"]){B._hasResource["dijit._base.sniff"]=true;
B.provide("dijit._base.sniff");
(function(){var A=B;
var I=A.isIE;
var N=A.isOpera;
var M=Math.floor;
var K={dj_ie:I,dj_ie6:M(I)==6,dj_ie7:M(I)==7,dj_iequirks:I&&A.isQuirks,dj_opera:N,dj_opera8:M(N)==8,dj_opera9:M(N)==9,dj_khtml:A.isKhtml,dj_safari:A.isSafari,dj_gecko:A.isMozilla};
for(var J in K){if(K[J]){var L=B.doc.documentElement;
if(L.className){L.className+=" "+J
}else{L.className=J
}}}})()
}}});