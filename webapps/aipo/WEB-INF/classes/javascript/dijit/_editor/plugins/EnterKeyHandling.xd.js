dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.EnterKeyHandling"]],defineResource:function(B){if(!B._hasResource["dijit._editor.plugins.EnterKeyHandling"]){B._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
B.provide("dijit._editor.plugins.EnterKeyHandling");
B.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(A){if(A){B.mixin(this,A)
}},setEditor:function(A){this.editor=A;
if(this.blockNodeForEnter=="BR"){if(B.isIE){A.contentDomPreFilters.push(B.hitch(this,"regularPsToSingleLinePs"));
A.contentDomPostFilters.push(B.hitch(this,"singleLinePsToRegularPs"));
A.onLoadDeferred.addCallback(B.hitch(this,"_fixNewLineBehaviorForIE"))
}else{A.onLoadDeferred.addCallback(B.hitch(this,function(C){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(F){}return C
}))
}}else{if(this.blockNodeForEnter){B.require("dijit._editor.range");
var D=B.hitch(this,this.handleEnterKey);
A.addKeyHandler(13,0,D);
A.addKeyHandler(13,2,D);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(A,F,E){if(!this._connects){this._connects=[]
}this._connects.push(B.connect(A,F,this,E))
},destroy:function(){B.forEach(this._connects,B.disconnect);
this._connects=[]
},onKeyPressed:function(E){if(this._checkListLater){if(B.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!B.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var A=B.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(A){A.innerHTML=this.bogusHtmlContent;
if(B.isIE){var F=this.editor.document.selection.createRange();
F.move("character",-1);
F.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(R){if(!this.blockNodeForEnter){return true
}if(R.shiftKey||this.blockNodeForEnter=="BR"){var Q=B.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var K=dijit.range.getAncestor(Q,this.editor.blockNodes);
if(K){if(K.tagName=="LI"){return true
}var P=dijit.range.getSelection(this.editor.window);
var A=P.getRangeAt(0);
if(!A.collapsed){A.deleteContents()
}if(dijit.range.atBeginningOfContainer(K,A.startContainer,A.startOffset)){B.place(this.editor.document.createElement("br"),K,"before")
}else{if(dijit.range.atEndOfContainer(K,A.startContainer,A.startOffset)){B.place(this.editor.document.createElement("br"),K,"after");
var M=dijit.range.create();
M.setStartAfter(K);
P.removeAllRanges();
P.addRange(M)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var O=true;
var P=dijit.range.getSelection(this.editor.window);
var A=P.getRangeAt(0);
if(!A.collapsed){A.deleteContents()
}var L=dijit.range.getBlockAncestor(A.endContainer,null,this.editor.editNode);
if(L.blockNode&&L.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!L.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
L={blockNode:B.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(L.blockNode){if((L.blockNode.textContent||L.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(L.blockNode);
return false
}}else{L.blockNode=this.editor.editNode
}P=dijit.range.getSelection(this.editor.window);
A=P.getRangeAt(0)
}var N=this.editor.document.createElement(this.blockNodeForEnter);
N.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(L.blockNode);
if(dijit.range.atEndOfContainer(L.blockNode,A.endContainer,A.endOffset)){if(L.blockNode===L.blockContainer){L.blockNode.appendChild(N)
}else{B.place(N,L.blockNode,"after")
}O=false;
var M=dijit.range.create();
M.setStart(N,0);
P.removeAllRanges();
P.addRange(M);
if(this.editor.height){N.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(L.blockNode,A.startContainer,A.startOffset)){if(L.blockNode===L.blockContainer){B.place(N,L.blockNode,"first")
}else{B.place(N,L.blockNode,"before")
}if(this.editor.height){N.scrollIntoView(false)
}O=false
}else{if(B.isMoz){this._pressedEnterInBlock=L.blockNode
}}}return O
},removeTrailingBr:function(A){if(/P|DIV|LI/i.test(A.tagName)){var D=A
}else{var D=dijit._editor.selection.getParentOfType(A,["P","DIV","LI"])
}if(!D){return 
}if(D.lastChild){if(D.childNodes.length>1&&D.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(D.lastChild.nodeValue)){B._destroyElement(D.lastChild)
}if(D.lastChild&&D.lastChild.tagName=="BR"){B._destroyElement(D.lastChild)
}}if(D.childNodes.length==0){D.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(E){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var F="p{margin:0 !important;}";
var A=function(O,C,N){if(!O){return 
}if(!C){C=document
}var D=C.createElement("style");
D.setAttribute("type","text/css");
var M=C.getElementsByTagName("head")[0];
if(!M){console.debug("No head tag in document, aborting styles");
return 
}else{M.appendChild(D)
}if(D.styleSheet){var P=function(){try{D.styleSheet.cssText=O
}catch(G){B.debug(G)
}};
if(D.styleSheet.disabled){setTimeout(P,10)
}else{P()
}}else{var L=C.createTextNode(O);
D.appendChild(L)
}return D
};
A(F,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return E
}},regularPsToSingleLinePs:function(K,L){function A(D){function F(R){var M=R[0].ownerDocument.createElement("p");
R[0].parentNode.insertBefore(M,R[0]);
for(var Q=0;
Q<R.length;
Q++){M.appendChild(R[Q])
}}var N=0;
var C=[];
var E;
while(N<D.childNodes.length){E=D.childNodes[N];
if((E.nodeName!="BR")&&(E.nodeType==1)&&(B.style(E,"display")!="block")){C.push(E)
}else{var G=E.nextSibling;
if(C.length){F(C);
N=(N+1)-C.length;
if(E.nodeName=="BR"){B._destroyElement(E)
}}C=[]
}N++
}if(C.length){F(C)
}}function H(D){var E=null;
var G=[];
var N=D.childNodes.length-1;
for(var F=N;
F>=0;
F--){E=D.childNodes[F];
if(E.nodeName=="BR"){var C=E.ownerDocument.createElement("p");
B.place(C,D,"after");
if(G.length==0&&F!=N){C.innerHTML="&nbsp;"
}B.forEach(G,function(M){C.appendChild(M)
});
B._destroyElement(E);
G=[]
}else{G.unshift(E)
}}}var J=[];
var I=K.getElementsByTagName("p");
B.forEach(I,function(C){J.push(C)
});
B.forEach(J,function(C){if((C.previousSibling)&&(C.previousSibling.nodeName=="P"||B.style(C.previousSibling,"display")!="block")){var D=C.parentNode.insertBefore(this.document.createElement("p"),C);
D.innerHTML=L?"":"&nbsp;"
}H(C)
},this.editor);
A(K);
return K
},singleLinePsToRegularPs:function(P){function K(G){var E=G.getElementsByTagName("p");
var I=[];
for(var H=0;
H<E.length;
H++){var F=E[H];
var C=false;
for(var D=0;
D<I.length;
D++){if(I[D]===F.parentNode){C=true;
break
}}if(!C){I.push(F.parentNode)
}}return I
}function Q(C){if(C.nodeType!=1||C.tagName!="P"){return(B.style(C,"display")=="block")
}else{if(!C.childNodes.length||C.innerHTML=="&nbsp;"){return true
}}}var R=K(P);
for(var O=0;
O<R.length;
O++){var L=R[O];
var M=null;
var A=L.firstChild;
var N=null;
while(A){if(A.nodeType!="1"||A.tagName!="P"){M=null
}else{if(Q(A)){N=A;
M=null
}else{if(M==null){M=A
}else{if((!M.lastChild||M.lastChild.nodeName!="BR")&&(A.firstChild)&&(A.firstChild.nodeName!="BR")){M.appendChild(this.editor.document.createElement("br"))
}while(A.firstChild){M.appendChild(A.firstChild)
}N=A
}}}A=A.nextSibling;
if(N){B._destroyElement(N);
N=null
}}}return P
}})
}}});