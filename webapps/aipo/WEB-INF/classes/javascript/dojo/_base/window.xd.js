dojo._xdResourceLoaded({depends:[["provide","dojo._base.window"]],defineResource:function(B){if(!B._hasResource["dojo._base.window"]){B._hasResource["dojo._base.window"]=true;
B.provide("dojo._base.window");
B._gearsObject=function(){var H;
var G;
var A=B.getObject("google.gears");
if(A){return A
}if(typeof GearsFactory!="undefined"){H=new GearsFactory()
}else{if(B.isIE){try{H=new ActiveXObject("Gears.Factory")
}catch(F){}}else{if(navigator.mimeTypes["application/x-googlegears"]){H=document.createElement("object");
H.setAttribute("type","application/x-googlegears");
H.setAttribute("width",0);
H.setAttribute("height",0);
H.style.display="none";
document.documentElement.appendChild(H)
}}}if(!H){return null
}B.setObject("google.gears.factory",H);
return B.getObject("google.gears")
};
B.isGears=(!!B._gearsObject())||0;
B.doc=window.document||null;
B.body=function(){return B.doc.body||B.doc.getElementsByTagName("body")[0]
};
B.setContext=function(A,D){B.global=A;
B.doc=D
};
B._fireCallback=function(A,F,E){if(F&&B.isString(A)){A=F[A]
}return(F?A.apply(F,E||[]):A())
};
B.withGlobal=function(A,I,L,J){var K;
var N=B.global;
var M=B.doc;
try{B.setContext(A,A.document);
K=B._fireCallback(I,L,J)
}finally{B.setContext(N,M)
}return K
};
B.withDoc=function(L,A,J,H){var I;
var K=B.doc;
try{B.doc=L;
I=B._fireCallback(A,J,H)
}finally{B.doc=K
}return I
};
(function(){var D=djConfig.modulePaths;
if(D){for(var A in D){B.registerModulePath(A,D[A])
}}})()
}}});