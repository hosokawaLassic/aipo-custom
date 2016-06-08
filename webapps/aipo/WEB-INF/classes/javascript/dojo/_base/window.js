if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo._gearsObject=function(){var E;
var H;
var F=dojo.getObject("google.gears");
if(F){return F
}if(typeof GearsFactory!="undefined"){E=new GearsFactory()
}else{if(dojo.isIE){try{E=new ActiveXObject("Gears.Factory")
}catch(G){}}else{if(navigator.mimeTypes["application/x-googlegears"]){E=document.createElement("object");
E.setAttribute("type","application/x-googlegears");
E.setAttribute("width",0);
E.setAttribute("height",0);
E.style.display="none";
document.documentElement.appendChild(E)
}}}if(!E){return null
}dojo.setObject("google.gears.factory",E);
return dojo.getObject("google.gears")
};
dojo.isGears=(!!dojo._gearsObject())||0;
dojo.doc=window.document||null;
dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0]
};
dojo.setContext=function(D,C){dojo.global=D;
dojo.doc=C
};
dojo._fireCallback=function(E,D,F){if(D&&dojo.isString(E)){E=D[E]
}return(D?E.apply(D,F||[]):E())
};
dojo.withGlobal=function(I,J,M,K){var L;
var H=dojo.global;
var N=dojo.doc;
try{dojo.setContext(I,I.document);
L=dojo._fireCallback(J,M,K)
}finally{dojo.setContext(H,N)
}return L
};
dojo.withDoc=function(G,H,K,I){var J;
var L=dojo.doc;
try{dojo.doc=G;
J=dojo._fireCallback(H,K,I)
}finally{dojo.doc=L
}return J
};
(function(){var C=djConfig.modulePaths;
if(C){for(var D in C){dojo.registerModulePath(D,C[D])
}}})()
};