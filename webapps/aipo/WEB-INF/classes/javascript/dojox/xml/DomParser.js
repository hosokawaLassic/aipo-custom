if(!dojo._hasResource["dojox.xml.DomParser"]){dojo._hasResource["dojox.xml.DomParser"]=true;
dojo.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var Y={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
var t=/<([^>\/\s+]*)([^>]*)>([^<]*)/g;
var n=/([^=]*)="([^"]*)"/g;
var b=/<!ENTITY\s+([^"]*)\s+"([^"]*)">/g;
var v=/<!\[CDATA\[([\u0001-\uFFFF]*?)\]\]>/g;
var i=/<!--([\u0001-\uFFFF]*?)-->/g;
var e=/^\s+|\s+$/g;
var f=/\s+/g;
var j=/\&gt;/g;
var r=/\&lt;/g;
var q=/\&quot;/g;
var u=/\&apos;/g;
var m=/\&amp;/g;
var l="_def_";
function s(){return new (function(){var A={};
this.nodeType=Y.DOCUMENT;
this.nodeName="#document";
this.namespaces={};
this._nsPaths={};
this.childNodes=[];
this.documentElement=null;
this._add=function(B){if(typeof (B.id)!="undefined"){A[B.id]=B
}};
this._remove=function(B){if(A[B]){delete A[B]
}};
this.byId=this.getElementById=function(B){return keys[B]
};
this.byName=this.getElementsByTagName=a;
this.byNameNS=this.getElementsByTagNameNS=c;
this.childrenByName=d
})()
}function a(B){function A(E,F,D){dojo.forEach(E.childNodes,function(G){if(G.nodeType==Y.ELEMENT){if(F=="*"){D.push(G)
}else{if(G.nodeName==F){D.push(G)
}}A(G,F,D)
}})
}var C=[];
A(this,B,C);
return C
}function c(B,A){function D(F,H,G,E){dojo.forEach(F.childNodes,function(I){if(I.nodeType==Y.ELEMENT){if(H=="*"&&I.ownerDocument._nsPaths[G]==I.namespace){E.push(I)
}else{if(I.localName==H&&I.ownerDocument._nsPaths[G]==I.namespace){E.push(I)
}}D(I,H,G,E)
}})
}if(!A){A=l
}var C=[];
D(this,B,A,C);
return C
}function d(A){var B=[];
dojo.forEach(this.childNodes,function(C){if(C.nodeType==Y.ELEMENT){if(A=="*"){B.push(C)
}else{if(C.nodeName==A){B.push(C)
}}}});
return B
}function o(B){for(var A=0;
A<this.attributes.length;
A++){if(this.attributes[A].nodeName==B){return this.attributes[A].nodeValue
}}return null
}function k(C,A){for(var B=0;
B<this.attributes.length;
B++){if(this.ownerDocument._nsPaths[A]==this.attributes[B].namespace&&this.attributes[B].localName==C){return this.attributes[B].nodeValue
}}return null
}function Z(C,A){var D=null;
for(var B=0;
B<this.attributes.length;
B++){if(this.attributes[B].nodeName==C){D=this.attributes[B].nodeValue;
this.attributes[B].nodeValue=A;
break
}}if(C=="id"){if(D!=null){this.ownerDocument._remove(D)
}this.ownerDocument._add(this)
}}function p(D,A,B){for(var C=0;
C<this.attributes.length;
C++){if(this.ownerDocument._nsPaths[B]==this.attributes[C].namespace&&this.attributes[C].localName==D){this.attributes[C].nodeValue=A;
return 
}}}function h(){var A=this.parentNode;
if(A){for(var B=0;
B<A.childNodes.length;
B++){if(A.childNodes[B]==this&&B>0){return A.childNodes[B-1]
}}}return null
}function g(){var A=this.parentNode;
if(A){for(var B=0;
B<A.childNodes.length;
B++){if(A.childNodes[B]==this&&(B+1)<A.childNodes.length){return A.childNodes[B+1]
}}}return null
}this.parse=function(M){var K=s();
if(M==null){return K
}if(M.length==0){return K
}if(M.indexOf("<!ENTITY")>0){var S,N=[];
if(b.test(M)){b.lastIndex=0;
while((S=b.exec(M))!=null){N.push({entity:"&"+S[1].replace(e,"")+";",expression:S[2]})
}for(var I=0;
I<N.length;
I++){M=M.replace(new RegExp(N[I].entity,"g"),N[I].expression)
}}}var J=[],B;
while((B=v.exec(M))!=null){J.push(B[1])
}for(var I=0;
I<J.length;
I++){M=M.replace(J[I],I)
}var U=[],A;
while((A=i.exec(M))!=null){U.push(A[1])
}for(I=0;
I<U.length;
I++){M=M.replace(U[I],I)
}var E,R=K;
while((E=t.exec(M))!=null){if(E[2].charAt(0)=="/"){if(R.parentNode){R=R.parentNode
}continue
}if(E[1].length>0){if(E[1].charAt(0)=="?"){var C=E[1].substr(1);
var G=E[2].substr(0,E[2].length-2);
R.childNodes.push({nodeType:Y.PROCESSING_INSTRUCTION,nodeName:C,nodeValue:G})
}else{if(E[1].charAt(0)=="!"){if(E[1].indexOf("![CDATA[")==0){var D=parseInt(E[1].replace("![CDATA[","").replace("]]",""));
R.childNodes.push({nodeType:Y.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:J[D]})
}else{if(E[1].substr(0,3)=="!--"){var D=parseInt(E[1].replace("!--","").replace("--",""));
R.childNodes.push({nodeType:Y.COMMENT,nodeName:"#comment",nodeValue:U[D]})
}}}else{var C=E[1].replace(e,"");
var O={nodeType:Y.ELEMENT,nodeName:C,localName:C,namespace:l,ownerDocument:K,attributes:[],parentNode:null,childNodes:[]};
if(C.indexOf(":")>-1){var P=C.split(":");
O.namespace=P[0];
O.localName=P[1]
}O.byName=O.getElementsByTagName=a;
O.byNameNS=O.getElementsByTagNameNS=c;
O.childrenByName=d;
O.getAttribute=o;
O.getAttributeNS=k;
O.setAttribute=Z;
O.setAttributeNS=p;
O.previous=O.previousSibling=h;
O.next=O.nextSibling=g;
var L;
while((L=n.exec(E[2]))!=null){if(L.length>0){var C=L[1].replace(e,"");
var D=L[2].replace(f," ").replace(j,">").replace(r,"<").replace(u,"'").replace(q,'"').replace(m,"&");
if(C.indexOf("xmlns")==0){if(C.indexOf(":")>0){var F=C.split(":");
K.namespaces[F[1]]=D;
K._nsPaths[D]=F[1]
}else{K.namespaces[l]=D;
K._nsPaths[D]=l
}}else{var T=C;
var F=l;
if(C.indexOf(":")>0){var P=C.split(":");
T=P[1];
F=P[0]
}O.attributes.push({nodeType:Y.ATTRIBUTE,nodeName:C,localName:T,namespace:F,nodeValue:D});
if(T=="id"){O.id=D
}}}}K._add(O);
var Q=E[3].replace(e,"");
if(Q.length>0){O.childNodes.push({nodeType:Y.TEXT,nodeName:"#text",nodeValue:Q.replace(f," ").replace(j,">").replace(r,"<").replace(u,"'").replace(q,'"').replace(m,"&")})
}if(R){R.childNodes.push(O);
O.parentNode=R;
if(E[2].charAt(E[2].length-1)!="/"){R=O
}}}}}}for(var I=0;
I<K.childNodes.length;
I++){var H=K.childNodes[I];
if(H.nodeType==Y.ELEMENT){K.documentElement=H;
break
}}return K
}
})()
};