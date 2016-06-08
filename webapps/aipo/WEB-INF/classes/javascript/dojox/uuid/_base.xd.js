dojo._xdResourceLoaded({depends:[["provide","dojox.uuid._base"]],defineResource:function(B){if(!B._hasResource["dojox.uuid._base"]){B._hasResource["dojox.uuid._base"]=true;
B.provide("dojox.uuid._base");
dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";
dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};
dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};
dojox.uuid.assert=function(A,D){if(!A){if(!D){D="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"
}throw new Error(D)
}};
dojox.uuid.generateNilUuid=function(){return dojox.uuid.NIL_UUID
};
dojox.uuid.isValid=function(I){I=I.toString();
var J=(B.isString(I)&&(I.length==36)&&(I==I.toLowerCase()));
if(J){var K=I.split("-");
J=((K.length==5)&&(K[0].length==8)&&(K[1].length==4)&&(K[2].length==4)&&(K[3].length==4)&&(K[4].length==12));
var A=16;
for(var L in K){var M=K[L];
var N=parseInt(M,A);
J=J&&isFinite(N)
}}return J
};
dojox.uuid.getVariant=function(H){if(!dojox.uuid._ourVariantLookupTable){var K=dojox.uuid.variant;
var J=[];
J[0]=K.NCS;
J[1]=K.NCS;
J[2]=K.NCS;
J[3]=K.NCS;
J[4]=K.NCS;
J[5]=K.NCS;
J[6]=K.NCS;
J[7]=K.NCS;
J[8]=K.DCE;
J[9]=K.DCE;
J[10]=K.DCE;
J[11]=K.DCE;
J[12]=K.MICROSOFT;
J[13]=K.MICROSOFT;
J[14]=K.UNKNOWN;
J[15]=K.UNKNOWN;
dojox.uuid._ourVariantLookupTable=J
}H=H.toString();
var I=H.charAt(19);
var A=16;
var L=parseInt(I,A);
dojox.uuid.assert((L>=0)&&(L<=16));
return dojox.uuid._ourVariantLookupTable[L]
};
dojox.uuid.getVersion=function(G){var J="dojox.uuid.getVersion() was not passed a DCE Variant UUID.";
dojox.uuid.assert(dojox.uuid.getVariant(G)==dojox.uuid.variant.DCE,J);
G=G.toString();
var H=G.charAt(14);
var A=16;
var I=parseInt(H,A);
return I
};
dojox.uuid.getNode=function(G){var H="dojox.uuid.getNode() was not passed a TIME_BASED UUID.";
dojox.uuid.assert(dojox.uuid.getVersion(G)==dojox.uuid.version.TIME_BASED,H);
G=G.toString();
var A=G.split("-");
var F=A[4];
return F
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
case null:case"date":case Date:var A=3394248;
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
var o=A;
var c=o*q;
var p=c*1000;
var Z=r-p;
var l=new Date(Z);
return l;
break;
default:dojox.uuid.assert(false,"dojox.uuid.getTimestamp was not passed a valid returnType: "+a);
break
}}
}}});