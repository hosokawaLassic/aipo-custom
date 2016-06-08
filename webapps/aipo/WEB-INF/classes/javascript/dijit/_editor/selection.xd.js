dojo._xdResourceLoaded({depends:[["provide","dijit._editor.selection"]],defineResource:function(B){if(!B._hasResource["dijit._editor.selection"]){B._hasResource["dijit._editor.selection"]=true;
B.provide("dijit._editor.selection");
B.mixin(dijit._editor.selection,{getType:function(){if(B.doc.selection){return B.doc.selection.type.toLowerCase()
}else{var G="text";
var H;
try{H=B.global.getSelection()
}catch(F){}if(H&&H.rangeCount==1){var A=H.getRangeAt(0);
if((A.startContainer==A.endContainer)&&((A.endOffset-A.startOffset)==1)&&(A.startContainer.nodeType!=3)){G="control"
}}return G
}},getSelectedText:function(){if(B.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return B.doc.selection.createRange().text
}else{var A=B.global.getSelection();
if(A){return A.toString()
}}},getSelectedHtml:function(){if(B.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return B.doc.selection.createRange().htmlText
}else{var F=B.global.getSelection();
if(F&&F.rangeCount){var A=F.getRangeAt(0).cloneContents();
var E=document.createElement("div");
E.appendChild(A);
return E.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(B.doc.selection){var D=B.doc.selection.createRange();
if(D&&D.item){return B.doc.selection.createRange().item(0)
}}else{var A=B.global.getSelection();
return A.anchorNode.childNodes[A.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var A=this.getSelectedElement();
if(A){return A.parentNode
}}else{if(B.doc.selection){return B.doc.selection.createRange().parentElement()
}else{var F=B.global.getSelection();
if(F){var E=F.anchorNode;
while(E&&(E.nodeType!=1)){E=E.parentNode
}return E
}}}},hasAncestorElement:function(A){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(D){var A=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(A,arguments)
},isTag:function(G,J){if(G&&G.tagName){var A=G.tagName.toLowerCase();
for(var I=0;
I<J.length;
I++){var H=String(J[I]).toLowerCase();
if(A==H){return H
}}}return""
},getParentOfType:function(A,D){while(A){if(this.isTag(A,D).length){return A
}A=A.parentNode
}return null
},remove:function(){var A=B.doc.selection;
if(A){if(A.type.toLowerCase()!="none"){A.clear()
}return A
}else{A=B.global.getSelection();
A.deleteFromDocument();
return A
}},selectElementChildren:function(I,J){var A=B.global;
var L=B.doc;
I=B.byId(I);
if(L.selection&&B.body().createTextRange){var K=I.ownerDocument.body.createTextRange();
K.moveToElementText(I);
if(!J){K.select()
}}else{if(A.getSelection){var H=A.getSelection();
if(H.setBaseAndExtent){H.setBaseAndExtent(I,0,I,I.innerText.length-1)
}else{if(H.selectAllChildren){H.selectAllChildren(I)
}}}}},selectElement:function(I,J){var L=B.doc;
I=B.byId(I);
if(L.selection&&B.body().createTextRange){try{var K=B.body().createControlRange();
K.addElement(I);
if(!J){K.select()
}}catch(A){this.selectElementChildren(I,J)
}}else{if(B.global.getSelection){var H=B.global.getSelection();
if(H.removeAllRanges){var K=L.createRange();
K.selectNode(I);
H.removeAllRanges();
H.addRange(K)
}}}}})
}}});