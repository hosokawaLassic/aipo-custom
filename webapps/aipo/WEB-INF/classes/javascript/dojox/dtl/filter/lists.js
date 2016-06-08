if(!dojo._hasResource["dojox.dtl.filter.lists"]){dojo._hasResource["dojox.dtl.filter.lists"]=true;
dojo.provide("dojox.dtl.filter.lists");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.lists,{_dictsort:function(D,C){if(D[0]==C[0]){return 0
}return(D[0]<C[0])?-1:1
},dictsort:function(I,H){if(!H){return I
}var M=[];
for(var K in I){M.push([dojox.dtl.resolveVariable("var."+H,new dojox.dtl.Context({"var":I[K]})),I[K]])
}M.sort(dojox.dtl.filter.lists._dictsort);
var N=[];
for(var L=0,J;
J=M[L];
L++){N.push(J[1])
}return N
},dictsortreversed:function(E,D){if(!D){return E
}var F=dojox.dtl.filter.lists.dictsort(E,D);
return F.reverse()
},first:function(B){return(B.length)?B[0]:""
},join:function(D,C){return D.join(C||",")
},length:function(B){return(isNaN(B.length))?(B+"").length:B.length
},length_is:function(D,C){return D.length==parseInt(C)
},random:function(B){return B[Math.floor(Math.random()*B.length)]
},slice:function(H,F){F=F||"";
var G=F.split(":");
var I=[];
for(var J=0;
J<G.length;
J++){if(!G[J].length){I.push(null)
}else{I.push(parseInt(G[J]))
}}if(I[0]===null){I[0]=0
}if(I[0]<0){I[0]=H.length+I[0]
}if(I.length<2||I[1]===null){I[1]=H.length
}if(I[1]<0){I[1]=H.length+I[1]
}return H.slice(I[0],I[1])
},_unordered_list:function(I,K){var H=dojox.dtl.filter.lists;
var G="";
for(var L=0;
L<K;
L++){G+="\t"
}if(I[1]&&I[1].length){var J=[];
for(var L=0;
L<I[1].length;
L++){J.push(H._unordered_list(I[1][L],K+1))
}return G+"<li>"+I[0]+"\n"+G+"<ul>\n"+J.join("\n")+"\n"+G+"</ul>\n"+G+"</li>"
}else{return G+"<li>"+I[0]+"</li>"
}},unordered_list:function(B){return dojox.dtl.filter.lists._unordered_list(B,1)
}})
};