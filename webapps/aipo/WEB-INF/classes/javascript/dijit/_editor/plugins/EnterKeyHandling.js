if(!dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]){dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
dojo.provide("dijit._editor.plugins.EnterKeyHandling");
dojo.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(B){if(B){dojo.mixin(this,B)
}},setEditor:function(D){this.editor=D;
if(this.blockNodeForEnter=="BR"){if(dojo.isIE){D.contentDomPreFilters.push(dojo.hitch(this,"regularPsToSingleLinePs"));
D.contentDomPostFilters.push(dojo.hitch(this,"singleLinePsToRegularPs"));
D.onLoadDeferred.addCallback(dojo.hitch(this,"_fixNewLineBehaviorForIE"))
}else{D.onLoadDeferred.addCallback(dojo.hitch(this,function(A){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(B){}return A
}))
}}else{if(this.blockNodeForEnter){dojo.require("dijit._editor.range");
var C=dojo.hitch(this,this.handleEnterKey);
D.addKeyHandler(13,0,C);
D.addKeyHandler(13,2,C);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(E,D,F){if(!this._connects){this._connects=[]
}this._connects.push(dojo.connect(E,D,this,F))
},destroy:function(){dojo.forEach(this._connects,dojo.disconnect);
this._connects=[]
},onKeyPressed:function(F){if(this._checkListLater){if(dojo.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!dojo.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var E=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(E){E.innerHTML=this.bogusHtmlContent;
if(dojo.isIE){var D=this.editor.document.selection.createRange();
D.move("character",-1);
D.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(J){if(!this.blockNodeForEnter){return true
}if(J.shiftKey||this.blockNodeForEnter=="BR"){var R=dojo.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var L=dijit.range.getAncestor(R,this.editor.blockNodes);
if(L){if(L.tagName=="LI"){return true
}var Q=dijit.range.getSelection(this.editor.window);
var K=Q.getRangeAt(0);
if(!K.collapsed){K.deleteContents()
}if(dijit.range.atBeginningOfContainer(L,K.startContainer,K.startOffset)){dojo.place(this.editor.document.createElement("br"),L,"before")
}else{if(dijit.range.atEndOfContainer(L,K.startContainer,K.startOffset)){dojo.place(this.editor.document.createElement("br"),L,"after");
var N=dijit.range.create();
N.setStartAfter(L);
Q.removeAllRanges();
Q.addRange(N)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var P=true;
var Q=dijit.range.getSelection(this.editor.window);
var K=Q.getRangeAt(0);
if(!K.collapsed){K.deleteContents()
}var M=dijit.range.getBlockAncestor(K.endContainer,null,this.editor.editNode);
if(M.blockNode&&M.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!M.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
M={blockNode:dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(M.blockNode){if((M.blockNode.textContent||M.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(M.blockNode);
return false
}}else{M.blockNode=this.editor.editNode
}Q=dijit.range.getSelection(this.editor.window);
K=Q.getRangeAt(0)
}var O=this.editor.document.createElement(this.blockNodeForEnter);
O.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(M.blockNode);
if(dijit.range.atEndOfContainer(M.blockNode,K.endContainer,K.endOffset)){if(M.blockNode===M.blockContainer){M.blockNode.appendChild(O)
}else{dojo.place(O,M.blockNode,"after")
}P=false;
var N=dijit.range.create();
N.setStart(O,0);
Q.removeAllRanges();
Q.addRange(N);
if(this.editor.height){O.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(M.blockNode,K.startContainer,K.startOffset)){if(M.blockNode===M.blockContainer){dojo.place(O,M.blockNode,"first")
}else{dojo.place(O,M.blockNode,"before")
}if(this.editor.height){O.scrollIntoView(false)
}P=false
}else{if(dojo.isMoz){this._pressedEnterInBlock=M.blockNode
}}}return P
},removeTrailingBr:function(D){if(/P|DIV|LI/i.test(D.tagName)){var C=D
}else{var C=dijit._editor.selection.getParentOfType(D,["P","DIV","LI"])
}if(!C){return 
}if(C.lastChild){if(C.childNodes.length>1&&C.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(C.lastChild.nodeValue)){dojo._destroyElement(C.lastChild)
}if(C.lastChild&&C.lastChild.tagName=="BR"){dojo._destroyElement(C.lastChild)
}}if(C.childNodes.length==0){C.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(F){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var D="p{margin:0 !important;}";
var E=function(M,A,L){if(!M){return 
}if(!A){A=document
}var B=A.createElement("style");
B.setAttribute("type","text/css");
var K=A.getElementsByTagName("head")[0];
if(!K){console.debug("No head tag in document, aborting styles");
return 
}else{K.appendChild(B)
}if(B.styleSheet){var N=function(){try{B.styleSheet.cssText=M
}catch(G){dojo.debug(G)
}};
if(B.styleSheet.disabled){setTimeout(N,10)
}else{N()
}}else{var C=A.createTextNode(M);
B.appendChild(C)
}return B
};
E(D,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return F
}},regularPsToSingleLinePs:function(L,G){function H(C){function E(R){var P=R[0].ownerDocument.createElement("p");
R[0].parentNode.insertBefore(P,R[0]);
for(var Q=0;
Q<R.length;
Q++){P.appendChild(R[Q])
}}var A=0;
var B=[];
var D;
while(A<C.childNodes.length){D=C.childNodes[A];
if((D.nodeName!="BR")&&(D.nodeType==1)&&(dojo.style(D,"display")!="block")){B.push(D)
}else{var F=D.nextSibling;
if(B.length){E(B);
A=(A+1)-B.length;
if(D.nodeName=="BR"){dojo._destroyElement(D)
}}B=[]
}A++
}if(B.length){E(B)
}}function I(C){var D=null;
var F=[];
var A=C.childNodes.length-1;
for(var E=A;
E>=0;
E--){D=C.childNodes[E];
if(D.nodeName=="BR"){var B=D.ownerDocument.createElement("p");
dojo.place(B,C,"after");
if(F.length==0&&E!=A){B.innerHTML="&nbsp;"
}dojo.forEach(F,function(N){B.appendChild(N)
});
dojo._destroyElement(D);
F=[]
}else{F.unshift(D)
}}}var K=[];
var J=L.getElementsByTagName("p");
dojo.forEach(J,function(A){K.push(A)
});
dojo.forEach(K,function(A){if((A.previousSibling)&&(A.previousSibling.nodeName=="P"||dojo.style(A.previousSibling,"display")!="block")){var B=A.parentNode.insertBefore(this.document.createElement("p"),A);
B.innerHTML=G?"":"&nbsp;"
}I(A)
},this.editor);
H(L);
return L
},singleLinePsToRegularPs:function(Q){function L(F){var D=F.getElementsByTagName("p");
var A=[];
for(var G=0;
G<D.length;
G++){var E=D[G];
var B=false;
for(var C=0;
C<A.length;
C++){if(A[C]===E.parentNode){B=true;
break
}}if(!B){A.push(E.parentNode)
}}return A
}function R(A){if(A.nodeType!=1||A.tagName!="P"){return(dojo.style(A,"display")=="block")
}else{if(!A.childNodes.length||A.innerHTML=="&nbsp;"){return true
}}}var J=L(Q);
for(var P=0;
P<J.length;
P++){var M=J[P];
var N=null;
var K=M.firstChild;
var O=null;
while(K){if(K.nodeType!="1"||K.tagName!="P"){N=null
}else{if(R(K)){O=K;
N=null
}else{if(N==null){N=K
}else{if((!N.lastChild||N.lastChild.nodeName!="BR")&&(K.firstChild)&&(K.firstChild.nodeName!="BR")){N.appendChild(this.editor.document.createElement("br"))
}while(K.firstChild){N.appendChild(K.firstChild)
}O=K
}}}K=K.nextSibling;
if(O){dojo._destroyElement(O);
O=null
}}}return Q
}})
};