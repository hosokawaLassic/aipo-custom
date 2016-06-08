if(!dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]){dojo._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
dojo.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(C){var D=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(C);
return D
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(G){var F=16;
var E=parseInt(G,F);
var H=dojo.isString(G)&&G.length==12&&isFinite(E);
return H
};
dojox.uuid.generateTimeBasedUuid.setNode=function(B){dojox.uuid.assert((B===null)||this.isValidNode(B));
this._uniformNode=B
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var N=null;
var T=null;
var S=null;
var X=0;
var Y=null;
var Z=null;
var P=16;
function Q(A){A[2]+=A[3]>>>16;
A[3]&=65535;
A[1]+=A[2]>>>16;
A[2]&=65535;
A[0]+=A[1]>>>16;
A[1]&=65535;
dojox.uuid.assert((A[0]>>>16)===0)
}function W(A){var B=new Array(0,0,0,0);
B[3]=A%65536;
A-=B[3];
A/=65536;
B[2]=A%65536;
A-=B[2];
A/=65536;
B[1]=A%65536;
A-=B[1];
A/=65536;
B[0]=A;
return B
}function U(A,B){dojox.uuid.assert(dojo.isArray(A));
dojox.uuid.assert(dojo.isArray(B));
dojox.uuid.assert(A.length==4);
dojox.uuid.assert(B.length==4);
var C=new Array(0,0,0,0);
C[3]=A[3]+B[3];
C[2]=A[2]+B[2];
C[1]=A[1]+B[1];
C[0]=A[0]+B[0];
Q(C);
return C
}function V(B,C){dojox.uuid.assert(dojo.isArray(B));
dojox.uuid.assert(dojo.isArray(C));
dojox.uuid.assert(B.length==4);
dojox.uuid.assert(C.length==4);
var A=false;
if(B[0]*C[0]!==0){A=true
}if(B[0]*C[1]!==0){A=true
}if(B[0]*C[2]!==0){A=true
}if(B[1]*C[0]!==0){A=true
}if(B[1]*C[1]!==0){A=true
}if(B[2]*C[0]!==0){A=true
}dojox.uuid.assert(!A);
var D=new Array(0,0,0,0);
D[0]+=B[0]*C[3];
Q(D);
D[0]+=B[1]*C[2];
Q(D);
D[0]+=B[2]*C[1];
Q(D);
D[0]+=B[3]*C[0];
Q(D);
D[1]+=B[1]*C[3];
Q(D);
D[1]+=B[2]*C[2];
Q(D);
D[1]+=B[3]*C[1];
Q(D);
D[2]+=B[2]*C[3];
Q(D);
D[2]+=B[3]*C[2];
Q(D);
D[3]+=B[3]*C[3];
Q(D);
return D
}function R(A,B){while(A.length<B){A="0"+A
}return A
}function O(){var A=Math.floor((Math.random()%1)*Math.pow(2,32));
var B=A.toString(P);
while(B.length<8){B="0"+B
}return B
}this.generateUuidString=function(q){if(q){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(q))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){q=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!N){var s=32768;
var o=Math.floor((Math.random()%1)*Math.pow(2,15));
var H=(s|o).toString(P);
N=H+O()
}q=N
}}if(!T){var J=32768;
var G=Math.floor((Math.random()%1)*Math.pow(2,14));
T=(J|G).toString(P)
}var M=new Date();
var l=M.valueOf();
var C=W(l);
if(!Y){var F=W(60*60);
var p=W(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var n=V(p,F);
var r=W(1000);
Y=V(n,r);
Z=W(10000)
}var D=C;
var A=U(Y,D);
var t=V(A,Z);
if(M.valueOf()==S){t[3]+=X;
Q(t);
X+=1;
if(X==10000){while(M.valueOf()==S){M=new Date()
}}}else{S=M.valueOf();
X=1
}var I=t[2].toString(P);
var L=t[3].toString(P);
var B=R(I,4)+R(L,4);
var E=t[1].toString(P);
E=R(E,4);
var v=t[0].toString(P);
v=R(v,3);
var u="-";
var K="1";
var m=B+u+E+u+K+v+u+T+u+q;
m=m.toLowerCase();
return m
}
}()
};