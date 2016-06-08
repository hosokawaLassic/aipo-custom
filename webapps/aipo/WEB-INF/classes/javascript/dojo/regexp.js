if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(D,C){return D.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(A){if(C&&C.indexOf(A)!=-1){return A
}return"\\"+A
})
};
dojo.regexp.buildGroupRE=function(J,G,H){if(!(J instanceof Array)){return G(J)
}var F=[];
for(var I=0;
I<J.length;
I++){F.push(G(J[I]))
}return dojo.regexp.group(F.join("|"),H)
};
dojo.regexp.group=function(D,C){return"("+(C?"?:":"")+D+")"
}
};