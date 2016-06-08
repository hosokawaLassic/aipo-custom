dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.generateRandomUuid"]],defineResource:function(B){if(!B._hasResource["dojox.uuid.generateRandomUuid"]){B._hasResource["dojox.uuid.generateRandomUuid"]=true;
B.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var L=16;
function A(){var C=Math.floor((Math.random()%1)*Math.pow(2,32));
var D=C.toString(L);
while(D.length<8){D="0"+D
}return D
}var N="-";
var S="4";
var T="8";
var O=A();
var P=A();
P=P.substring(0,4)+N+S+P.substring(5,8);
var Q=A();
Q=T+Q.substring(1,4)+N+Q.substring(4,8);
var R=A();
var M=O+N+P+N+Q+R;
M=M.toLowerCase();
return M
}
}}});