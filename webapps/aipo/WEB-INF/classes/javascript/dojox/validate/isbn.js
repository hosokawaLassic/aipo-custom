if(!dojo._hasResource["dojox.validate.isbn"]){dojo._hasResource["dojox.validate.isbn"]=true;
dojo.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(H){var G,J,I;
if(typeof H!="string"){H=String(H)
}H=H.replace(/[- ]/g,"");
G=H.length;
J=0;
if(G==10){I=10;
for(var K=0;
K<9;
K++){J+=parseInt(H.charAt(K))*I;
I--
}var L=H.charAt(9).toUpperCase();
J+=L=="X"?10:parseInt(L);
return J%11==0
}else{if(G==13){I=-1;
for(var K=0;
K<G;
K++){J+=parseInt(H.charAt(K))*(2+I);
I*=-1
}return J%10==0
}else{return false
}}}
};