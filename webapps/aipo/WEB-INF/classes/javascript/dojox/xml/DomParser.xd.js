dojo._xdResourceLoaded({depends:[["provide","dojox.xml.DomParser"]],defineResource:function(B){if(!B._hasResource["dojox.xml.DomParser"]){B._hasResource["dojox.xml.DomParser"]=true;
B.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var A={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
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
function s(){return new (function(){var C={};
this.nodeType=A.DOCUMENT;
this.nodeName="#document";
this.namespaces={};
this._nsPaths={};
this.childNodes=[];
this.documentElement=null;
this._add=function(D){if(typeof (D.id)!="undefined"){C[D.id]=D
}};
this._remove=function(D){if(C[D]){delete C[D]
}};
this.byId=this.getElementById=function(D){return keys[D]
};
this.byName=this.getElementsByTagName=a;
this.byNameNS=this.getElementsByTagNameNS=c;
this.childrenByName=d
})()
}function a(C){function E(G,H,F){B.forEach(G.childNodes,function(I){if(I.nodeType==A.ELEMENT){if(H=="*"){F.push(I)
}else{if(I.nodeName==H){F.push(I)
}}E(I,H,F)
}})
}var D=[];
E(this,C,D);
return D
}function c(C,F){function E(H,J,I,G){B.forEach(H.childNodes,function(K){if(K.nodeType==A.ELEMENT){if(J=="*"&&K.ownerDocument._nsPaths[I]==K.namespace){G.push(K)
}else{if(K.localName==J&&K.ownerDocument._nsPaths[I]==K.namespace){G.push(K)
}}E(K,J,I,G)
}})
}if(!F){F=l
}var D=[];
E(this,C,F,D);
return D
}function d(C){var D=[];
B.forEach(this.childNodes,function(E){if(E.nodeType==A.ELEMENT){if(C=="*"){D.push(E)
}else{if(E.nodeName==C){D.push(E)
}}}});
return D
}function o(D){for(var C=0;
C<this.attributes.length;
C++){if(this.attributes[C].nodeName==D){return this.attributes[C].nodeValue
}}return null
}function k(E,C){for(var D=0;
D<this.attributes.length;
D++){if(this.ownerDocument._nsPaths[C]==this.attributes[D].namespace&&this.attributes[D].localName==E){return this.attributes[D].nodeValue
}}return null
}function Z(D,F){var E=null;
for(var C=0;
C<this.attributes.length;
C++){if(this.attributes[C].nodeName==D){E=this.attributes[C].nodeValue;
this.attributes[C].nodeValue=F;
break
}}if(D=="id"){if(E!=null){this.ownerDocument._remove(E)
}this.ownerDocument._add(this)
}}function p(E,F,C){for(var D=0;
D<this.attributes.length;
D++){if(this.ownerDocument._nsPaths[C]==this.attributes[D].namespace&&this.attributes[D].localName==E){this.attributes[D].nodeValue=F;
return 
}}}function h(){var C=this.parentNode;
if(C){for(var D=0;
D<C.childNodes.length;
D++){if(C.childNodes[D]==this&&D>0){return C.childNodes[D-1]
}}}return null
}function g(){var C=this.parentNode;
if(C){for(var D=0;
D<C.childNodes.length;
D++){if(C.childNodes[D]==this&&(D+1)<C.childNodes.length){return C.childNodes[D+1]
}}}return null
}this.parse=function(N){var L=s();
if(N==null){return L
}if(N.length==0){return L
}if(N.indexOf("<!ENTITY")>0){var T,O=[];
if(b.test(N)){b.lastIndex=0;
while((T=b.exec(N))!=null){O.push({entity:"&"+T[1].replace(e,"")+";",expression:T[2]})
}for(var J=0;
J<O.length;
J++){N=N.replace(new RegExp(O[J].entity,"g"),O[J].expression)
}}}var K=[],C;
while((C=v.exec(N))!=null){K.push(C[1])
}for(var J=0;
J<K.length;
J++){N=N.replace(K[J],J)
}var V=[],W;
while((W=i.exec(N))!=null){V.push(W[1])
}for(J=0;
J<V.length;
J++){N=N.replace(V[J],J)
}var F,S=L;
while((F=t.exec(N))!=null){if(F[2].charAt(0)=="/"){if(S.parentNode){S=S.parentNode
}continue
}if(F[1].length>0){if(F[1].charAt(0)=="?"){var D=F[1].substr(1);
var H=F[2].substr(0,F[2].length-2);
S.childNodes.push({nodeType:A.PROCESSING_INSTRUCTION,nodeName:D,nodeValue:H})
}else{if(F[1].charAt(0)=="!"){if(F[1].indexOf("![CDATA[")==0){var E=parseInt(F[1].replace("![CDATA[","").replace("]]",""));
S.childNodes.push({nodeType:A.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:K[E]})
}else{if(F[1].substr(0,3)=="!--"){var E=parseInt(F[1].replace("!--","").replace("--",""));
S.childNodes.push({nodeType:A.COMMENT,nodeName:"#comment",nodeValue:V[E]})
}}}else{var D=F[1].replace(e,"");
var P={nodeType:A.ELEMENT,nodeName:D,localName:D,namespace:l,ownerDocument:L,attributes:[],parentNode:null,childNodes:[]};
if(D.indexOf(":")>-1){var Q=D.split(":");
P.namespace=Q[0];
P.localName=Q[1]
}P.byName=P.getElementsByTagName=a;
P.byNameNS=P.getElementsByTagNameNS=c;
P.childrenByName=d;
P.getAttribute=o;
P.getAttributeNS=k;
P.setAttribute=Z;
P.setAttributeNS=p;
P.previous=P.previousSibling=h;
P.next=P.nextSibling=g;
var M;
while((M=n.exec(F[2]))!=null){if(M.length>0){var D=M[1].replace(e,"");
var E=M[2].replace(f," ").replace(j,">").replace(r,"<").replace(u,"'").replace(q,'"').replace(m,"&");
if(D.indexOf("xmlns")==0){if(D.indexOf(":")>0){var G=D.split(":");
L.namespaces[G[1]]=E;
L._nsPaths[E]=G[1]
}else{L.namespaces[l]=E;
L._nsPaths[E]=l
}}else{var U=D;
var G=l;
if(D.indexOf(":")>0){var Q=D.split(":");
U=Q[1];
G=Q[0]
}P.attributes.push({nodeType:A.ATTRIBUTE,nodeName:D,localName:U,namespace:G,nodeValue:E});
if(U=="id"){P.id=E
}}}}L._add(P);
var R=F[3].replace(e,"");
if(R.length>0){P.childNodes.push({nodeType:A.TEXT,nodeName:"#text",nodeValue:R.replace(f," ").replace(j,">").replace(r,"<").replace(u,"'").replace(q,'"').replace(m,"&")})
}if(S){S.childNodes.push(P);
P.parentNode=S;
if(F[2].charAt(F[2].length-1)!="/"){S=P
}}}}}}for(var J=0;
J<L.childNodes.length;
J++){var I=L.childNodes[J];
if(I.nodeType==A.ELEMENT){L.documentElement=I;
break
}}return L
}
})()
}}});