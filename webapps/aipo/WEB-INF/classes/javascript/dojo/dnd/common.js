if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(B){return B[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var B;
do{B="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(B));
return B
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(D){var C=D.target;
if(C.nodeType==3){C=C.parentNode
}return" button textarea input select option ".indexOf(" "+C.tagName.toLowerCase()+" ")>=0
}
};