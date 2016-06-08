if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(G,I,H,F){var J=String(G);
if(!H){H="0"
}while(J.length<I){if(F){J+=H
}else{J=H+J
}}return J
};
dojo.string.substitute=function(G,F,H,E){return G.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(D,C,A){var B=dojo.getObject(C,false,F);
if(A){B=dojo.getObject(A,false,E)(B)
}if(H){B=H(B,C)
}return B.toString()
})
};
dojo.string.trim=function(D){D=D.replace(/^\s+/,"");
for(var C=D.length-1;
C>0;
C--){if(/\S/.test(D.charAt(C))){D=D.substring(0,C+1);
break
}}return D
}
};