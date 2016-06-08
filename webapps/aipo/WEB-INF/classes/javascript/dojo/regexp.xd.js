dojo._xdResourceLoaded({depends:[["provide","dojo.regexp"]],defineResource:function(B){if(!B._hasResource["dojo.regexp"]){B._hasResource["dojo.regexp"]=true;
B.provide("dojo.regexp");
B.regexp.escapeString=function(A,D){return A.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(D&&D.indexOf(C)!=-1){return C
}return"\\"+C
})
};
B.regexp.buildGroupRE=function(I,A,G){if(!(I instanceof Array)){return A(I)
}var J=[];
for(var H=0;
H<I.length;
H++){J.push(A(I[H]))
}return B.regexp.group(J.join("|"),G)
};
B.regexp.group=function(A,D){return"("+(D?"?:":"")+A+")"
}
}}});