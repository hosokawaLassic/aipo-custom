dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateTimeBasedUuid"]],defineResource:function(B){if(!B._hasResource["dojox.uuid.generateTimeBasedUuid"]){B._hasResource["dojox.uuid.generateTimeBasedUuid"]=true;
B.provide("dojox.uuid.generateTimeBasedUuid");
dojox.uuid.generateTimeBasedUuid=function(D){var A=dojox.uuid.generateTimeBasedUuid._generator.generateUuidString(D);
return A
};
dojox.uuid.generateTimeBasedUuid.isValidNode=function(F){var A=16;
var H=parseInt(F,A);
var G=B.isString(F)&&F.length==12&&isFinite(H);
return G
};
dojox.uuid.generateTimeBasedUuid.setNode=function(A){dojox.uuid.assert((A===null)||this.isValidNode(A));
this._uniformNode=A
};
dojox.uuid.generateTimeBasedUuid.getNode=function(){return this._uniformNode
};
dojox.uuid.generateTimeBasedUuid._generator=new function(){this.GREGORIAN_CHANGE_OFFSET_IN_HOURS=3394248;
var Z=null;
var S=null;
var R=null;
var W=0;
var X=null;
var Y=null;
var O=16;
function P(C){C[2]+=C[3]>>>16;
C[3]&=65535;
C[1]+=C[2]>>>16;
C[2]&=65535;
C[0]+=C[1]>>>16;
C[1]&=65535;
dojox.uuid.assert((C[0]>>>16)===0)
}function V(C){var D=new Array(0,0,0,0);
D[3]=C%65536;
C-=D[3];
C/=65536;
D[2]=C%65536;
C-=D[2];
C/=65536;
D[1]=C%65536;
C-=D[1];
C/=65536;
D[0]=C;
return D
}function T(C,D){dojox.uuid.assert(B.isArray(C));
dojox.uuid.assert(B.isArray(D));
dojox.uuid.assert(C.length==4);
dojox.uuid.assert(D.length==4);
var E=new Array(0,0,0,0);
E[3]=C[3]+D[3];
E[2]=C[2]+D[2];
E[1]=C[1]+D[1];
E[0]=C[0]+D[0];
P(E);
return E
}function U(D,E){dojox.uuid.assert(B.isArray(D));
dojox.uuid.assert(B.isArray(E));
dojox.uuid.assert(D.length==4);
dojox.uuid.assert(E.length==4);
var C=false;
if(D[0]*E[0]!==0){C=true
}if(D[0]*E[1]!==0){C=true
}if(D[0]*E[2]!==0){C=true
}if(D[1]*E[0]!==0){C=true
}if(D[1]*E[1]!==0){C=true
}if(D[2]*E[0]!==0){C=true
}dojox.uuid.assert(!C);
var F=new Array(0,0,0,0);
F[0]+=D[0]*E[3];
P(F);
F[0]+=D[1]*E[2];
P(F);
F[0]+=D[2]*E[1];
P(F);
F[0]+=D[3]*E[0];
P(F);
F[1]+=D[1]*E[3];
P(F);
F[1]+=D[2]*E[2];
P(F);
F[1]+=D[3]*E[1];
P(F);
F[2]+=D[2]*E[3];
P(F);
F[2]+=D[3]*E[2];
P(F);
F[3]+=D[3]*E[3];
P(F);
return F
}function Q(C,D){while(C.length<D){C="0"+C
}return C
}function A(){var C=Math.floor((Math.random()%1)*Math.pow(2,32));
var D=C.toString(O);
while(D.length<8){D="0"+D
}return D
}this.generateUuidString=function(r){if(r){dojox.uuid.assert(dojox.uuid.generateTimeBasedUuid.isValidNode(r))
}else{if(dojox.uuid.generateTimeBasedUuid._uniformNode){r=dojox.uuid.generateTimeBasedUuid._uniformNode
}else{if(!Z){var t=32768;
var p=Math.floor((Math.random()%1)*Math.pow(2,15));
var I=(t|p).toString(O);
Z=I+A()
}r=Z
}}if(!S){var K=32768;
var H=Math.floor((Math.random()%1)*Math.pow(2,14));
S=(K|H).toString(O)
}var N=new Date();
var m=N.valueOf();
var D=V(m);
if(!X){var G=V(60*60);
var q=V(dojox.uuid.generateTimeBasedUuid._generator.GREGORIAN_CHANGE_OFFSET_IN_HOURS);
var o=U(q,G);
var s=V(1000);
X=U(o,s);
Y=V(10000)
}var E=D;
var x=T(X,E);
var u=U(x,Y);
if(N.valueOf()==R){u[3]+=W;
P(u);
W+=1;
if(W==10000){while(N.valueOf()==R){N=new Date()
}}}else{R=N.valueOf();
W=1
}var J=u[2].toString(O);
var M=u[3].toString(O);
var C=Q(J,4)+Q(M,4);
var F=u[1].toString(O);
F=Q(F,4);
var w=u[0].toString(O);
w=Q(w,3);
var v="-";
var L="1";
var n=C+v+F+v+L+w+v+S+v+r;
n=n.toLowerCase();
return n
}
}()
}}});