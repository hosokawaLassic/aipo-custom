if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var H="text";
var E;
try{E=dojo.global.getSelection()
}catch(G){}if(E&&E.rangeCount==1){var F=E.getRangeAt(0);
if((F.startContainer==F.endContainer)&&((F.endOffset-F.startOffset)==1)&&(F.startContainer.nodeType!=3)){H="control"
}}return H
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var B=dojo.global.getSelection();
if(B){return B.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var D=dojo.global.getSelection();
if(D&&D.rangeCount){var E=D.getRangeAt(0).cloneContents();
var F=document.createElement("div");
F.appendChild(E);
return F.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var C=dojo.doc.selection.createRange();
if(C&&C.item){return dojo.doc.selection.createRange().item(0)
}}else{var D=dojo.global.getSelection();
return D.anchorNode.childNodes[D.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var E=this.getSelectedElement();
if(E){return E.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var D=dojo.global.getSelection();
if(D){var F=D.anchorNode;
while(F&&(F.nodeType!=1)){F=F.parentNode
}return F
}}}},hasAncestorElement:function(B){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(C){var D=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(D,arguments)
},isTag:function(H,F){if(H&&H.tagName){var G=H.tagName.toLowerCase();
for(var J=0;
J<F.length;
J++){var I=String(F[J]).toLowerCase();
if(G==I){return I
}}}return""
},getParentOfType:function(D,C){while(D){if(this.isTag(D,C).length){return D
}D=D.parentNode
}return null
},remove:function(){var B=dojo.doc.selection;
if(B){if(B.type.toLowerCase()!="none"){B.clear()
}return B
}else{B=dojo.global.getSelection();
B.deleteFromDocument();
return B
}},selectElementChildren:function(J,K){var H=dojo.global;
var G=dojo.doc;
J=dojo.byId(J);
if(G.selection&&dojo.body().createTextRange){var L=J.ownerDocument.body.createTextRange();
L.moveToElementText(J);
if(!K){L.select()
}}else{if(H.getSelection){var I=H.getSelection();
if(I.setBaseAndExtent){I.setBaseAndExtent(J,0,J,J.innerText.length-1)
}else{if(I.selectAllChildren){I.selectAllChildren(J)
}}}}},selectElement:function(J,K){var G=dojo.doc;
J=dojo.byId(J);
if(G.selection&&dojo.body().createTextRange){try{var L=dojo.body().createControlRange();
L.addElement(J);
if(!K){L.select()
}}catch(H){this.selectElementChildren(J,K)
}}else{if(dojo.global.getSelection){var I=dojo.global.getSelection();
if(I.removeAllRanges){var L=G.createRange();
L.selectNode(J);
I.removeAllRanges();
I.addRange(L)
}}}}})
};