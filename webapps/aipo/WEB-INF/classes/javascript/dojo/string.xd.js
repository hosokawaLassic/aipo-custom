dojo._xdResourceLoaded({depends:[["provide","dojo.string"]],defineResource:function(B){if(!B._hasResource["dojo.string"]){B._hasResource["dojo.string"]=true;
B.provide("dojo.string");
B.string.pad=function(A,H,G,J){var I=String(A);
if(!G){G="0"
}while(I.length<H){if(J){I+=G
}else{I=G+I
}}return I
};
B.string.substitute=function(F,A,G,H){return F.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(J,E,C){var D=B.getObject(E,false,A);
if(C){D=B.getObject(C,false,H)(D)
}if(G){D=G(D,E)
}return D.toString()
})
};
B.string.trim=function(A){A=A.replace(/^\s+/,"");
for(var D=A.length-1;
D>0;
D--){if(/\S/.test(A.charAt(D))){A=A.substring(0,D+1);
break
}}return A
}
}}});