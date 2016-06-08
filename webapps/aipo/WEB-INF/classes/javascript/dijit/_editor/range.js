if(!dojo._hasResource["dijit._editor.range"]){dojo._hasResource["dijit._editor.range"]=true;
dojo.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(L,N){var Q=[],K=[];
var O=N;
var P=L;
while(L!=O){var J=0;
var R=L.parentNode,M;
while(M=R.childNodes[J++]){if(M===L){--J;
break
}}if(J>=R.childNodes.length){dojo.debug("Error finding index of a node in dijit.range.getIndex")
}Q.unshift(J);
K.unshift(J-R.childNodes.length);
L=R
}if(Q.length>0&&P.nodeType==3){var M=P.previousSibling;
while(M&&M.nodeType==3){Q[Q.length-1]--;
M=M.previousSibling
}M=P.nextSibling;
while(M&&M.nodeType==3){K[K.length-1]++;
M=M.nextSibling
}}return{o:Q,r:K}
};
dijit.range.getNode=function(D,F){if(!dojo.isArray(D)||D.length==0){return F
}var E=F;
dojo.every(D,function(A){if(A>=0&&A<E.childNodes.length){E=E.childNodes[A]
}else{E=null;
console.debug("Error: can not find node with index",D,"under parent node",F);
return false
}return true
});
return E
};
dijit.range.getCommonAncestor=function(O,Q,N){var P=function(A,B){var C=[];
while(A){C.unshift(A);
if(A!=B&&A.tagName!="BODY"){A=A.parentNode
}else{break
}}return C
};
var L=P(O,N);
var R=P(Q,N);
var K=Math.min(L.length,R.length);
var M=L[0];
for(var J=1;
J<K;
J++){if(L[J]===R[J]){M=L[J]
}else{break
}}return M
};
dijit.range.getAncestor=function(F,G,E){E=E||F.ownerDocument.body;
while(F&&F!==E){var H=F.nodeName.toUpperCase();
if(G.test(H)){return F
}F=F.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(I,J,G){G=G||I.ownerDocument.body;
J=J||dijit.range.BlockTagNames;
var H=null,K;
while(I&&I!==G){var L=I.nodeName.toUpperCase();
if(!H&&J.test(L)){H=I
}if(!K&&(/^(?:BODY|TD|TH|CAPTION)$/).test(L)){K=I
}I=I.parentNode
}return{blockNode:H,blockContainer:K||I.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(G,K,H){var I=false;
var J=(H==0);
if(!J&&K.nodeType==3){if(dojo.trim(K.nodeValue.substr(0,H))==0){J=true
}}if(J){var L=K;
I=true;
while(L&&L!==G){if(L.previousSibling){I=false;
break
}L=L.parentNode
}}return I
};
dijit.range.atEndOfContainer=function(K,I,H){var L=false;
var G=(H==(I.length||I.childNodes.length));
if(!G&&I.nodeType==3){if(dojo.trim(I.nodeValue.substr(H))==0){G=true
}}if(G){var J=I;
L=true;
while(J&&J!==K){if(J.nextSibling){L=false;
break
}J=J.parentNode
}}return L
};
dijit.range.adjacentNoneTextNode=function(H,J){var I=H;
var F=(0-H.length)||0;
var G=J?"nextSibling":"previousSibling";
while(I){if(I.nodeType!=3){break
}F+=I.length;
I=I[G]
}return[I,F]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(G,H){if(dijit.range._w3c){return G.getSelection()
}else{var F=G.__W3CRange;
if(!F||!dijit.range.ie.cachedSelection[F]){var E=new dijit.range.ie.selection(G);
F=(new Date).getTime();
while(F in dijit.range.ie.cachedSelection){F=F+1
}F=String(F);
dijit.range.ie.cachedSelection[F]=E
}else{var E=dijit.range.ie.cachedSelection[F]
}if(!H){E._getCurrentSelection()
}return E
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(D){this._ranges=[];
this.addRange=function(A,B){this._ranges.push(A);
if(!B){A._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var C=function(){var A=D.document.selection.createRange();
var B=D.document.selection.type.toUpperCase();
if(B=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(A))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(A))
}};
this.getRangeAt=function(A){return this._ranges[A]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var A=C();
if(A){this.addRange(A,true)
}}
},decomposeControlRange:function(M){var N=M.item(0),I=M.item(M.length-1);
var K=N.parentNode,J=I.parentNode;
var H=dijit.range.getIndex(N,K).o;
var L=dijit.range.getIndex(I,J).o+1;
return[[K,H],[J,L]]
},getEndPoint:function(M,N){var O=M.duplicate();
O.collapse(!N);
var J="EndTo"+(N?"End":"Start");
var P=O.parentElement();
var K,I,L;
if(P.childNodes.length>0){dojo.every(P.childNodes,function(E,F){var C;
if(E.nodeType!=3){O.moveToElementText(E);
if(O.compareEndPoints(J,M)>0){K=E.previousSibling;
if(L&&L.nodeType==3){K=L;
C=true
}else{K=P;
I=F;
return false
}}else{if(F==P.childNodes.length-1){K=P;
I=P.childNodes.length;
return false
}}}else{if(F==P.childNodes.length-1){K=E;
C=true
}}if(C&&K){var A=dijit.range.adjacentNoneTextNode(K)[0];
if(A){K=A.nextSibling
}else{K=P.firstChild
}var B=dijit.range.adjacentNoneTextNode(K);
A=B[0];
var D=B[1];
if(A){O.moveToElementText(A);
O.collapse(false)
}else{O.moveToElementText(P)
}O.setEndPoint(J,M);
I=O.text.length-D;
return false
}L=E;
return true
})
}else{K=P;
I=0
}if(!N&&K.nodeType!=3&&I==K.childNodes.length){if(K.nextSibling&&K.nextSibling.nodeType==3){K=K.nextSibling;
I=0
}}return[K,I]
},setEndPoint:function(M,N,J){var P=M.duplicate();
if(N.nodeType!=3){P.moveToElementText(N);
P.collapse(true);
if(J==N.childNodes.length){if(J>0){var K=N.lastChild;
var I=0;
while(K&&K.nodeType==3){I+=K.length;
N=K;
K=K.previousSibling
}if(K){P.moveToElementText(K)
}P.collapse(false);
J=I
}else{P.moveToElementText(N);
P.collapse(true)
}}else{if(J>0){var K=N.childNodes[J-1];
if(K.nodeType==3){N=K;
J=K.length
}else{P.moveToElementText(K);
P.collapse(false)
}}}}if(N.nodeType==3){var O=dijit.range.adjacentNoneTextNode(N);
var L=O[0],I=O[1];
if(L){P.moveToElementText(L);
P.collapse(false);
if(L.contentEditable!="inherit"){I++
}}else{P.moveToElementText(N.parentNode);
P.collapse(true)
}J+=I;
if(J>0){if(P.moveEnd("character",J)!=J){alert("Error when moving!")
}P.collapse(false)
}}return P
},decomposeTextRange:function(L){var H=dijit.range.ie.getEndPoint(L);
var I=H[0],G=H[1];
var J=H[0],K=H[1];
if(L.htmlText.length){if(L.htmlText==L.text){K=G+L.text.length
}else{H=dijit.range.ie.getEndPoint(L,true);
J=H[0],K=H[1]
}}return[[I,G],[J,K],L.parentElement()]
},setRange:function(M,J,P,K,L,O){var N=dijit.range.ie.setEndPoint(M,J,P);
M.setEndPoint("StartToStart",N);
if(!this.collapsed){var I=dijit.range.ie.setEndPoint(M,K,L);
M.setEndPoint("EndToEnd",I)
}return M
}};
dojo.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(F,H,E){var G=(this._body||F.ownerDocument.body).createTextRange();
if(F.nodeType!=1){G.moveToElementText(F.parentNode)
}else{G.moveToElementText(F)
}G.collapse(true);
H.setEndPoint(E?"EndToEnd":"StartToStart",G)
},_updateInternal:function(D){if(this.startContainer!==this.endContainer){if(!D){var C=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,C);
this._simpleSetEndPoint(this.endContainer,C,true);
D=C.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,D)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(D,E,F){if(this.startContainer===D&&this.startOffset==E){return 
}delete this._cachedBookmark;
this.startContainer=D;
this.startOffset=E;
if(!this.endContainer){this.setEnd(D,E,F)
}else{this._updateInternal(F)
}},setEnd:function(D,E,F){if(this.endContainer===D&&this.endOffset==E){return 
}delete this._cachedBookmark;
this.endContainer=D;
this.endOffset=E;
if(!this.startContainer){this.setStart(D,E,F)
}else{this._updateInternal(F)
}},setStartAfter:function(C,D){this._setPoint("setStart",C,D,1)
},setStartBefore:function(C,D){this._setPoint("setStart",C,D,0)
},setEndAfter:function(C,D){this._setPoint("setEnd",C,D,1)
},setEndBefore:function(C,D){this._setPoint("setEnd",C,D,0)
},_setPoint:function(H,I,G,J){var F=dijit.range.getIndex(I,I.parentNode).o;
this[H](I.parentNode,F.pop()+J)
},_getIERange:function(){var B=(this._body||this.endContainer.ownerDocument.body).createTextRange();
dijit.range.ie.setRange(B,this.startContainer,this.startOffset,this.endContainer,this.endOffset);
return B
},getBookmark:function(B){this._getIERange();
return this._cachedBookmark
},_select:function(){var B=this._getIERange();
B.select()
},deleteContents:function(){var B=this._getIERange();
B.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true
},cloneRange:function(){var B=new dijit.range.W3CRange([[this.startContainer,this.startOffset],[this.endContainer,this.endOffset]]);
B._body=this._body;
return B
},detach:function(){this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}})
}};