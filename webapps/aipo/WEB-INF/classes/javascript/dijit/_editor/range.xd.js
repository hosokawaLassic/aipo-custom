dojo._xdResourceLoaded({depends:[["provide","dijit._editor.range"]],defineResource:function(B){if(!B._hasResource["dijit._editor.range"]){B._hasResource["dijit._editor.range"]=true;
B.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(K,M){var P=[],A=[];
var N=M;
var O=K;
while(K!=N){var R=0;
var Q=K.parentNode,L;
while(L=Q.childNodes[R++]){if(L===K){--R;
break
}}if(R>=Q.childNodes.length){B.debug("Error finding index of a node in dijit.range.getIndex")
}P.unshift(R);
A.unshift(R-Q.childNodes.length);
K=Q
}if(P.length>0&&O.nodeType==3){var L=O.previousSibling;
while(L&&L.nodeType==3){P[P.length-1]--;
L=L.previousSibling
}L=O.nextSibling;
while(L&&L.nodeType==3){A[A.length-1]++;
L=L.nextSibling
}}return{o:P,r:A}
};
dijit.range.getNode=function(F,E){if(!B.isArray(F)||F.length==0){return E
}var A=E;
B.every(F,function(C){if(C>=0&&C<A.childNodes.length){A=A.childNodes[C]
}else{A=null;
console.debug("Error: can not find node with index",F,"under parent node",E);
return false
}return true
});
return A
};
dijit.range.getCommonAncestor=function(N,P,M){var O=function(E,C){var D=[];
while(E){D.unshift(E);
if(E!=C&&E.tagName!="BODY"){E=E.parentNode
}else{break
}}return D
};
var K=O(N,M);
var Q=O(P,M);
var A=Math.min(K.length,Q.length);
var L=K[0];
for(var R=1;
R<A;
R++){if(K[R]===Q[R]){L=K[R]
}else{break
}}return L
};
dijit.range.getAncestor=function(A,F,H){H=H||A.ownerDocument.body;
while(A&&A!==H){var G=A.nodeName.toUpperCase();
if(F.test(G)){return A
}A=A.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(H,I,L){L=L||H.ownerDocument.body;
I=I||dijit.range.BlockTagNames;
var A=null,J;
while(H&&H!==L){var K=H.nodeName.toUpperCase();
if(!A&&I.test(K)){A=H
}if(!J&&(/^(?:BODY|TD|TH|CAPTION)$/).test(K)){J=H
}H=H.parentNode
}return{blockNode:A,blockContainer:J||H.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(L,J,A){var H=false;
var I=(A==0);
if(!I&&J.nodeType==3){if(B.trim(J.nodeValue.substr(0,A))==0){I=true
}}if(I){var K=J;
H=true;
while(K&&K!==L){if(K.previousSibling){H=false;
break
}K=K.parentNode
}}return H
};
dijit.range.atEndOfContainer=function(J,H,A){var K=false;
var L=(A==(H.length||H.childNodes.length));
if(!L&&H.nodeType==3){if(B.trim(H.nodeValue.substr(A))==0){L=true
}}if(L){var I=H;
K=true;
while(I&&I!==J){if(I.nextSibling){K=false;
break
}I=I.parentNode
}}return K
};
dijit.range.adjacentNoneTextNode=function(G,I){var H=G;
var J=(0-G.length)||0;
var A=I?"nextSibling":"previousSibling";
while(H){if(H.nodeType!=3){break
}J+=H.length;
H=H[A]
}return[H,J]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(F,G){if(dijit.range._w3c){return F.getSelection()
}else{var A=F.__W3CRange;
if(!A||!dijit.range.ie.cachedSelection[A]){var H=new dijit.range.ie.selection(F);
A=(new Date).getTime();
while(A in dijit.range.ie.cachedSelection){A=A+1
}A=String(A);
dijit.range.ie.cachedSelection[A]=H
}else{var H=dijit.range.ie.cachedSelection[A]
}if(!G){H._getCurrentSelection()
}return H
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(A){this._ranges=[];
this.addRange=function(C,F){this._ranges.push(C);
if(!F){C._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var D=function(){var C=A.document.selection.createRange();
var F=A.document.selection.type.toUpperCase();
if(F=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(C))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(C))
}};
this.getRangeAt=function(C){return this._ranges[C]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var C=D();
if(C){this.addRange(C,true)
}}
},decomposeControlRange:function(L){var M=L.item(0),A=L.item(L.length-1);
var J=M.parentNode,I=A.parentNode;
var N=dijit.range.getIndex(M,J).o;
var K=dijit.range.getIndex(A,I).o+1;
return[[J,N],[I,K]]
},getEndPoint:function(L,M){var N=L.duplicate();
N.collapse(!M);
var A="EndTo"+(M?"End":"Start");
var O=N.parentElement();
var J,P,K;
if(O.childNodes.length>0){B.every(O.childNodes,function(F,G){var D;
if(F.nodeType!=3){N.moveToElementText(F);
if(N.compareEndPoints(A,L)>0){J=F.previousSibling;
if(K&&K.nodeType==3){J=K;
D=true
}else{J=O;
P=G;
return false
}}else{if(G==O.childNodes.length-1){J=O;
P=O.childNodes.length;
return false
}}}else{if(G==O.childNodes.length-1){J=F;
D=true
}}if(D&&J){var H=dijit.range.adjacentNoneTextNode(J)[0];
if(H){J=H.nextSibling
}else{J=O.firstChild
}var C=dijit.range.adjacentNoneTextNode(J);
H=C[0];
var E=C[1];
if(H){N.moveToElementText(H);
N.collapse(false)
}else{N.moveToElementText(O)
}N.setEndPoint(A,L);
P=N.text.length-E;
return false
}K=F;
return true
})
}else{J=O;
P=0
}if(!M&&J.nodeType!=3&&P==J.childNodes.length){if(J.nextSibling&&J.nextSibling.nodeType==3){J=J.nextSibling;
P=0
}}return[J,P]
},setEndPoint:function(L,M,A){var O=L.duplicate();
if(M.nodeType!=3){O.moveToElementText(M);
O.collapse(true);
if(A==M.childNodes.length){if(A>0){var J=M.lastChild;
var P=0;
while(J&&J.nodeType==3){P+=J.length;
M=J;
J=J.previousSibling
}if(J){O.moveToElementText(J)
}O.collapse(false);
A=P
}else{O.moveToElementText(M);
O.collapse(true)
}}else{if(A>0){var J=M.childNodes[A-1];
if(J.nodeType==3){M=J;
A=J.length
}else{O.moveToElementText(J);
O.collapse(false)
}}}}if(M.nodeType==3){var N=dijit.range.adjacentNoneTextNode(M);
var K=N[0],P=N[1];
if(K){O.moveToElementText(K);
O.collapse(false);
if(K.contentEditable!="inherit"){P++
}}else{O.moveToElementText(M.parentNode);
O.collapse(true)
}A+=P;
if(A>0){if(O.moveEnd("character",A)!=A){alert("Error when moving!")
}O.collapse(false)
}}return O
},decomposeTextRange:function(K){var A=dijit.range.ie.getEndPoint(K);
var H=A[0],L=A[1];
var I=A[0],J=A[1];
if(K.htmlText.length){if(K.htmlText==K.text){J=L+K.text.length
}else{A=dijit.range.ie.getEndPoint(K,true);
I=A[0],J=A[1]
}}return[[H,L],[I,J],K.parentElement()]
},setRange:function(L,A,O,J,K,N){var M=dijit.range.ie.setEndPoint(L,A,O);
L.setEndPoint("StartToStart",M);
if(!this.collapsed){var P=dijit.range.ie.setEndPoint(L,J,K);
L.setEndPoint("EndToEnd",P)
}return L
}};
B.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(A,G,H){var F=(this._body||A.ownerDocument.body).createTextRange();
if(A.nodeType!=1){F.moveToElementText(A.parentNode)
}else{F.moveToElementText(A)
}F.collapse(true);
G.setEndPoint(H?"EndToEnd":"StartToStart",F)
},_updateInternal:function(A){if(this.startContainer!==this.endContainer){if(!A){var D=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,D);
this._simpleSetEndPoint(this.endContainer,D,true);
A=D.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,A)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(F,A,E){if(this.startContainer===F&&this.startOffset==A){return 
}delete this._cachedBookmark;
this.startContainer=F;
this.startOffset=A;
if(!this.endContainer){this.setEnd(F,A,E)
}else{this._updateInternal(E)
}},setEnd:function(F,A,E){if(this.endContainer===F&&this.endOffset==A){return 
}delete this._cachedBookmark;
this.endContainer=F;
this.endOffset=A;
if(!this.startContainer){this.setStart(F,A,E)
}else{this._updateInternal(E)
}},setStartAfter:function(D,A){this._setPoint("setStart",D,A,1)
},setStartBefore:function(D,A){this._setPoint("setStart",D,A,0)
},setEndAfter:function(D,A){this._setPoint("setEnd",D,A,1)
},setEndBefore:function(D,A){this._setPoint("setEnd",D,A,0)
},_setPoint:function(G,H,A,I){var J=dijit.range.getIndex(H,H.parentNode).o;
this[G](H.parentNode,J.pop()+I)
},_getIERange:function(){var A=(this._body||this.endContainer.ownerDocument.body).createTextRange();
dijit.range.ie.setRange(A,this.startContainer,this.startOffset,this.endContainer,this.endOffset);
return A
},getBookmark:function(A){this._getIERange();
return this._cachedBookmark
},_select:function(){var A=this._getIERange();
A.select()
},deleteContents:function(){var A=this._getIERange();
A.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true
},cloneRange:function(){var A=new dijit.range.W3CRange([[this.startContainer,this.startOffset],[this.endContainer,this.endOffset]]);
A._body=this._body;
return A
},detach:function(){this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}})
}}}});