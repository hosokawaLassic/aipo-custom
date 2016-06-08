if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var I=dojo;
var J=I.isIE;
var H=I.isOpera;
var N=Math.floor;
var L={dj_ie:J,dj_ie6:N(J)==6,dj_ie7:N(J)==7,dj_iequirks:J&&I.isQuirks,dj_opera:H,dj_opera8:N(H)==8,dj_opera9:N(H)==9,dj_khtml:I.isKhtml,dj_safari:I.isSafari,dj_gecko:I.isMozilla};
for(var K in L){if(L[K]){var M=dojo.doc.documentElement;
if(M.className){M.className+=" "+K
}else{M.className=K
}}}})()
};