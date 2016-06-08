dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.common"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.common"]){B._hasResource["dojo.dnd.common"]=true;
B.provide("dojo.dnd.common");
B.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
B.dnd.getCopyKeyState=function(A){return A[B.dnd._copyKey]
};
B.dnd._uniqueId=0;
B.dnd.getUniqueId=function(){var A;
do{A="dojoUnique"+(++B.dnd._uniqueId)
}while(B.byId(A));
return A
};
B.dnd._empty={};
B.dnd.isFormElement=function(A){var D=A.target;
if(D.nodeType==3){D=D.parentNode
}return" button textarea input select option ".indexOf(" "+D.tagName.toLowerCase()+" ")>=0
}
}}});