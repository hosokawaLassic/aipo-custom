if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(I,L){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var K=dojo.date.stamp._isoRegExp.exec(I);
var G=null;
if(K){K.shift();
K[1]&&K[1]--;
K[6]&&(K[6]*=1000);
if(L){L=new Date(L);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(A){return L["get"+A]()
}).forEach(function(A,B){if(K[B]===undefined){K[B]=A
}})
}G=new Date(K[0]||1970,K[1]||0,K[2]||0,K[3]||0,K[4]||0,K[5]||0,K[6]||0);
var H=0;
var J=K[7]&&K[7].charAt(0);
if(J!="Z"){H=((K[8]||0)*60)+(Number(K[9])||0);
if(J!="-"){H*=-1
}}if(J){H-=G.getTimezoneOffset()
}if(H){G.setTime(G.getTime()+H*60000)
}}return G
};
dojo.date.stamp.toISOString=function(S,O){var P=function(A){return(A<10)?"0"+A:A
};
O=O||{};
var T=[];
var R=O.zulu?"getUTC":"get";
var L="";
if(O.selector!="time"){L=[S[R+"FullYear"](),P(S[R+"Month"]()+1),P(S[R+"Date"]())].join("-")
}T.push(L);
if(O.selector!="date"){var M=[P(S[R+"Hours"]()),P(S[R+"Minutes"]()),P(S[R+"Seconds"]())].join(":");
var N=S[R+"Milliseconds"]();
if(O.milliseconds){M+="."+(N<100?"0":"")+P(N)
}if(O.zulu){M+="Z"
}else{if(O.selector!="time"){var Q=S.getTimezoneOffset();
var K=Math.abs(Q);
M+=(Q>0?"-":"+")+P(Math.floor(K/60))+":"+P(K%60)
}}T.push(M)
}return T.join("T")
}
};