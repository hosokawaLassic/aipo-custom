if(!dojo._hasResource["dojox.uuid._base"]){dojo._hasResource["dojox.uuid._base"]=true;
dojo.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(D,C){if(!D){if(!C){C="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(C)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(J){J=J.toString();
var K=(dojo.isString(J)&&(J.length==36)&&(J==J.toLowerCase()));
if(K){var L=J.split("-");
K=((L.length==5)&&(L[0].length==8)&&(L[1].length==4)&&(L[2].length==4)&&(L[3].length==4)&&(L[4].length==12));
var I=16;
for(var M in L){var N=L[M];
var H=parseInt(N,I);
K=K&&isFinite(H)
}}return K
};
dojox.uuid.getVariant=function(I){if(!dojox.uuid._ourVariantLookupTable){var L=dojox.uuid.variant;
var K=[];
K[0]=L.NCS;
K[1]=L.NCS;
K[2]=L.NCS;
K[3]=L.NCS;
K[4]=L.NCS;
K[5]=L.NCS;
K[6]=L.NCS;
K[7]=L.NCS;
K[8]=L.DCE;
K[9]=L.DCE;
K[10]=L.DCE;
K[11]=L.DCE;
K[12]=L.MICROSOFT;
K[13]=L.MICROSOFT;
K[14]=L.UNKNOWN;
K[15]=L.UNKNOWN;
dojox.uuid._ourVariantLookupTable=K
}I=I.toString();
var J=I.charAt(19);
var H=16;
var G=parseInt(J,H);
dojox.uuid.assert((G>=0)&&(G<=16));
return dojox.uuid._ourVariantLookupTable[G]
};
dojox.uuid.getVersion=function(H){var F="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(H)==dojox.uuid.variant.DCE,F);
H=H.toString();
var I=H.charAt(14);
var G=16;
var J=parseInt(I,G);
return J
};
dojox.uuid.getNode=function(H){var E="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(H)==dojox.uuid.version.TIME_BASED,E);
H=H.toString();
var F=H.split("-");
var G=F[4];
return G
};
dojox.uuid.getTimestamp=function(g,a){var d="dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(g)==dojox.uuid.version.TIME_BASED,d);
g=g.toString();
if(!a){a=null
}switch(a){case"string":case String:return dojox.uuid.getTimestamp(g,Date).toUTCString();
break;
case"hex":var Y=g.split("-");
var i=Y[0];
var k=Y[1];
var f=Y[2];
f=f.slice(1);
var n=f+k+i;
dojox.uuid.assert(n.length==15);
return n;
break;
case null:case"date":case Date:var W=3394248;
var m=16;
var h=g.split("-");
var X=parseInt(h[0],m);
var b=parseInt(h[1],m);
var j=parseInt(h[2],m);
var e=j&4095;
e<<=16;
e+=b;
e*=4294967296;
e+=X;
var r=e/10000;
var q=60*60;
var o=W;
var c=o*q;
var p=c*1000;
var Z=r-p;
var l=new Date(Z);
return l;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+a);
break
}}
};