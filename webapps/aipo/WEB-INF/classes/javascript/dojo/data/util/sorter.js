if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(F,D){var E=0;
if(F>D||typeof F==="undefined"||F===null){E=1
}else{if(F<D||typeof D==="undefined"||D===null){E=-1
}}return E
};
dojo.data.util.sorter.createSortFunction=function(J,L){var H=[];
function G(B,A){return function(N,C){var D=L.getValue(N,B);
var F=L.getValue(C,B);
var E=null;
if(L.comparatorMap){if(typeof B!=="string"){B=L.getIdentity(B)
}E=L.comparatorMap[B]||dojo.data.util.sorter.basicComparator
}E=E||dojo.data.util.sorter.basicComparator;
return A*E(D,F)
}
}for(var K=0;
K<J.length;
K++){sortAttribute=J[K];
if(sortAttribute.attribute){var I=(sortAttribute.descending)?-1:1;
H.push(G(sortAttribute.attribute,I))
}}return function(C,D){var A=0;
while(A<H.length){var B=H[A++](C,D);
if(B!==0){return B
}}return 0
}
}
};