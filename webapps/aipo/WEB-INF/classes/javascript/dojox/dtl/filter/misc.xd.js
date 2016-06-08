dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.misc"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.misc"]){B._hasResource["dojox.dtl.filter.misc"]=true;
B.provide("dojox.dtl.filter.misc");
B.mixin(dojox.dtl.filter.misc,{filesizeformat:function(A){A=parseFloat(A);
if(A<1024){return(A==1)?A+" byte":A+" bytes"
}else{if(A<1024*1024){return(A/1024).toFixed(1)+" KB"
}else{if(A<1024*1024*1024){return(A/1024/1024).toFixed(1)+" MB"
}}}return(A/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(G,J){J=J||"s";
if(J.indexOf(",")==-1){J=","+J
}var A=J.split(",");
if(A.length>2){return""
}var H=A[0];
var I=A[1];
if(parseInt(G)!=1){return I
}return H
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(A){var I=dojox.dtl.filter.misc;
A=A+"";
var J="";
for(var H=0;
H<A.length;
H++){var G=A.charAt(H).toLowerCase();
(I._phone2numeric[G])?J+=I._phone2numeric[G]:J+=A.charAt(H)
}return J
},pprint:function(A){return B.toJson(A)
}})
}}});