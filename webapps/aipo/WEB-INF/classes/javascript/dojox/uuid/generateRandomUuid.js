if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){dojo._hasResource["dojox.uuid.generateRandomUuid"]=true;
dojo.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){var M=16;
function L(){var B=Math.floor((Math.random()%1)*Math.pow(2,32));
var A=B.toString(M);
while(A.length<8){A="0"+A
}return A
}var O="-";
var T="4";
var K="8";
var P=L();
var Q=L();
Q=Q.substring(0,4)+O+T+Q.substring(5,8);
var R=L();
R=K+R.substring(1,4)+O+R.substring(4,8);
var S=L();
var N=P+O+Q+O+R+S;
N=N.toLowerCase();
return N
}
};