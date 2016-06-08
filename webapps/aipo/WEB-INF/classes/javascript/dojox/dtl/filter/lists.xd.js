dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.lists"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.lists"]){B._hasResource["dojox.dtl.filter.lists"]=true;
B.provide("dojox.dtl.filter.lists");
B.require("dojox.dtl._base");
B.mixin(dojox.dtl.filter.lists,{_dictsort:function(A,D){if(A[0]==D[0]){return 0
}return(A[0]<D[0])?-1:1
},dictsort:function(A,N){if(!N){return A
}var L=[];
for(var J in A){L.push([dojox.dtl.resolveVariable("var."+N,new dojox.dtl.Context({"var":A[J]})),A[J]])
}L.sort(dojox.dtl.filter.lists._dictsort);
var M=[];
for(var K=0,I;
I=L[K];
K++){M.push(I[1])
}return M
},dictsortreversed:function(A,F){if(!F){return A
}var E=dojox.dtl.filter.lists.dictsort(A,F);
return E.reverse()
},first:function(A){return(A.length)?A[0]:""
},join:function(A,D){return A.join(D||",")
},length:function(A){return(isNaN(A.length))?(A+"").length:A.length
},length_is:function(A,D){return A.length==parseInt(D)
},random:function(A){return A[Math.floor(Math.random()*A.length)]
},slice:function(G,J){J=J||"";
var A=J.split(":");
var H=[];
for(var I=0;
I<A.length;
I++){if(!A[I].length){H.push(null)
}else{H.push(parseInt(A[I]))
}}if(H[0]===null){H[0]=0
}if(H[0]<0){H[0]=G.length+H[0]
}if(H.length<2||H[1]===null){H[1]=G.length
}if(H[1]<0){H[1]=G.length+H[1]
}return G.slice(H[0],H[1])
},_unordered_list:function(H,J){var A=dojox.dtl.filter.lists;
var L="";
for(var K=0;
K<J;
K++){L+="\t"
}if(H[1]&&H[1].length){var I=[];
for(var K=0;
K<H[1].length;
K++){I.push(A._unordered_list(H[1][K],J+1))
}return L+"<li>"+H[0]+"\n"+L+"<ul>\n"+I.join("\n")+"\n"+L+"</ul>\n"+L+"</li>"
}else{return L+"<li>"+H[0]+"</li>"
}},unordered_list:function(A){return dojox.dtl.filter.lists._unordered_list(A,1)
}})
}}});