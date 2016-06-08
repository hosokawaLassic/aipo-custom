if(!dojo._hasResource["dojox.dtl.filter.misc"]){dojo._hasResource["dojox.dtl.filter.misc"]=true;
dojo.provide("dojox.dtl.filter.misc");
dojo.mixin(dojox.dtl.filter.misc,{filesizeformat:function(B){B=parseFloat(B);
if(B<1024){return(B==1)?B+" byte":B+" bytes"
}else{if(B<1024*1024){return(B/1024).toFixed(1)+" KB"
}else{if(B<1024*1024*1024){return(B/1024/1024).toFixed(1)+" MB"
}}}return(B/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(H,F){F=F||"s";
if(F.indexOf(",")==-1){F=","+F
}var G=F.split(",");
if(G.length>2){return""
}var I=G[0];
var J=G[1];
if(parseInt(H)!=1){return J
}return I
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(G){var J=dojox.dtl.filter.misc;
G=G+"";
var F="";
for(var I=0;
I<G.length;
I++){var H=G.charAt(I).toLowerCase();
(J._phone2numeric[H])?F+=J._phone2numeric[H]:F+=G.charAt(I)
}return F
},pprint:function(B){return dojo.toJson(B)
}})
};