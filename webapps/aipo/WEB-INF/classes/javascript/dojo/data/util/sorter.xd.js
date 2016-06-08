dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.sorter"]],defineResource:function(B){if(!B._hasResource["dojo.data.util.sorter"]){B._hasResource["dojo.data.util.sorter"]=true;
B.provide("dojo.data.util.sorter");
B.data.util.sorter.basicComparator=function(E,F){var A=0;
if(E>F||typeof E==="undefined"||E===null){A=1
}else{if(E<F||typeof F==="undefined"||F===null){A=-1
}}return A
};
B.data.util.sorter.createSortFunction=function(I,K){var A=[];
function L(D,C){return function(O,P){var E=K.getValue(O,D);
var G=K.getValue(P,D);
var F=null;
if(K.comparatorMap){if(typeof D!=="string"){D=K.getIdentity(D)
}F=K.comparatorMap[D]||B.data.util.sorter.basicComparator
}F=F||B.data.util.sorter.basicComparator;
return C*F(E,G)
}
}for(var J=0;
J<I.length;
J++){sortAttribute=I[J];
if(sortAttribute.attribute){var H=(sortAttribute.descending)?-1:1;
A.push(L(sortAttribute.attribute,H))
}}return function(E,F){var C=0;
while(C<A.length){var D=A[C++](E,F);
if(D!==0){return D
}}return 0
}
}
}}});