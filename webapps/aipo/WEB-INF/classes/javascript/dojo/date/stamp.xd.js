dojo._xdResourceLoaded({depends:[["provide","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojo.date.stamp"]){B._hasResource["dojo.date.stamp"]=true;
B.provide("dojo.date.stamp");
B.date.stamp.fromISOString=function(H,K){if(!B.date.stamp._isoRegExp){B.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var J=B.date.stamp._isoRegExp.exec(H);
var L=null;
if(J){J.shift();
J[1]&&J[1]--;
J[6]&&(J[6]*=1000);
if(K){K=new Date(K);
B.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(C){return K["get"+C]()
}).forEach(function(C,D){if(J[D]===undefined){J[D]=C
}})
}L=new Date(J[0]||1970,J[1]||0,J[2]||0,J[3]||0,J[4]||0,J[5]||0,J[6]||0);
var A=0;
var I=J[7]&&J[7].charAt(0);
if(I!="Z"){A=((J[8]||0)*60)+(Number(J[9])||0);
if(I!="-"){A*=-1
}}if(I){A-=L.getTimezoneOffset()
}if(A){L.setTime(L.getTime()+A*60000)
}}return L
};
B.date.stamp.toISOString=function(R,N){var O=function(C){return(C<10)?"0"+C:C
};
N=N||{};
var S=[];
var Q=N.zulu?"getUTC":"get";
var A="";
if(N.selector!="time"){A=[R[Q+"FullYear"](),O(R[Q+"Month"]()+1),O(R[Q+"Date"]())].join("-")
}S.push(A);
if(N.selector!="date"){var L=[O(R[Q+"Hours"]()),O(R[Q+"Minutes"]()),O(R[Q+"Seconds"]())].join(":");
var M=R[Q+"Milliseconds"]();
if(N.milliseconds){L+="."+(M<100?"0":"")+O(M)
}if(N.zulu){L+="Z"
}else{if(N.selector!="time"){var P=R.getTimezoneOffset();
var T=Math.abs(P);
L+=(P>0?"-":"+")+O(Math.floor(T/60))+":"+O(T%60)
}}S.push(L)
}return S.join("T")
}
}}});