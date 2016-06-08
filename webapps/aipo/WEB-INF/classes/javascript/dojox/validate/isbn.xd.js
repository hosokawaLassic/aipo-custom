dojo._xdResourceLoaded({depends:[["provide","dojox.validate.isbn"]],defineResource:function(B){if(!B._hasResource["dojox.validate.isbn"]){B._hasResource["dojox.validate.isbn"]=true;
B.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(A){var L,I,H;
if(typeof A!="string"){A=String(A)
}A=A.replace(/[- ]/g,"");
L=A.length;
I=0;
if(L==10){H=10;
for(var J=0;
J<9;
J++){I+=parseInt(A.charAt(J))*H;
H--
}var K=A.charAt(9).toUpperCase();
I+=K=="X"?10:parseInt(K);
return I%11==0
}else{if(L==13){H=-1;
for(var J=0;
J<L;
J++){I+=parseInt(A.charAt(J))*(2+H);
H*=-1
}return I%10==0
}else{return false
}}}
}}});