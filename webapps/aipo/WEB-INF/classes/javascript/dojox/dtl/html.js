if(!dojo._hasResource["dojox.dtl.html"]){dojo._hasResource["dojox.dtl.html"]=true;
dojo.provide("dojox.dtl.html");
dojo.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
dojo.extend(dojox.dtl.ObjectMap,{get:function(H){var F=this.contents;
for(var E=0,G;
G=F[E];
E++){if(G[0]===H){return G[1]
}}},put:function(J,G){var H=this.contents;
for(var F=0,I;
I=H[F];
F++){if(I[0]===J){if(arguments.length==1){H.splice(F,1);
return 
}I[1]=G;
return 
}}H.push([J,G])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:dojo.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(B){return B.replace(this._re,"")
},getTemplate:function(G){if(typeof this._commentable=="undefined"){this._commentable=false;
var F=document.createElement("div");
F.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(F.childNodes.length&&F.childNodes[0].nodeType==8&&F.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){G=G.replace(this._re3,"$1")
}var H;
while(H=this._re2.exec(G)){this._attributes[H[1]]=true
}var F=document.createElement("div");
F.innerHTML=G;
var E={pres:[],posts:[]};
while(F.childNodes.length){if(!E.node&&F.childNodes[0].nodeType==1){E.node=F.removeChild(F.childNodes[0])
}else{if(!E.node){E.pres.push(F.removeChild(F.childNodes[0]))
}else{E.posts.push(F.removeChild(F.childNodes[0]))
}}}if(!E.node){throw new Error("Template did not provide any content")
}return E
},tokenize:function(N,T,U,Z){T=T||[];
var W=!T.length;
var V=this.types;
var O=[];
for(var X=0,P;
P=N.childNodes[X];
X++){O.push(P)
}if(U){for(var X=0,P;
P=U[X];
X++){this._tokenize(N,P,T)
}}T.push([V.elem,N]);
T.push([V.change,N]);
for(var R in this._attributes){var S="";
if(R=="class"){S=N.className||S
}else{if(R=="for"){S=N.htmlFor||S
}else{if(N.getAttribute){S=N.getAttribute(R,2)||S;
if(R=="href"||R=="src"){if(dojo.isIE){var Y=location.href.lastIndexOf(location.hash);
var Q=location.href.substring(0,Y).split("/");
Q.pop();
Q=Q.join("/")+"/";
if(S.indexOf(Q)==0){S=S.replace(Q,"")
}S=S.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(S.indexOf("{%")!=-1||S.indexOf("{{")!=-1){N.setAttribute(R,"")
}}}}}if(typeof S=="function"){S=S.toString().replace(this._re4,"$1")
}if(typeof S=="string"&&(S.indexOf("{%")!=-1||S.indexOf("{{")!=-1||(S&&dojox.dtl.text.getTag("attr:"+R,true)))){T.push([V.attr,N,R,S])
}}if(!O.length){T.push([V.change,N.parentNode,true]);
if(Z){for(var X=0,P;
P=Z[X];
X++){this._tokenize(N,P,T)
}}return T
}for(var X=0,P;
P=O[X];
X++){this._tokenize(N,P,T)
}if(N.parentNode&&N.parentNode.tagName){T.push([V.change,N.parentNode,true]);
N.parentNode.removeChild(N)
}if(Z){for(var X=0,P;
P=Z[X];
X++){this._tokenize(N,P,T)
}}if(W){T.push([V.change,N,true])
}return T
},_tokenize:function(O,J,L){var P=this.types;
var M=J.data;
switch(J.nodeType){case 1:this.tokenize(J,L);
break;
case 3:if(M.match(/[^\s\n]/)){if(M.indexOf("{{")!=-1||M.indexOf("{%")!=-1){var N=dojox.dtl.text.tokenize(M);
for(var I=0,K;
K=N[I];
I++){if(typeof K=="string"){L.push([P.text,K])
}else{L.push(K)
}}}else{L.push([J.nodeType,J])
}}if(J.parentNode){J.parentNode.removeChild(J)
}break;
case 8:if(M.indexOf("{%")==0){L.push([P.tag,this._trim(M.substring(2,M.length-3))])
}if(M.indexOf("{{")==0){L.push([P.varr,this._trim(M.substring(2,M.length-3))])
}if(J.parentNode){J.parentNode.removeChild(J)
}break
}}};
dojox.dtl.HtmlTemplate=function(H){var F=dojox.dtl;
var J=F.html;
if(!H.node){if(typeof H=="object"){H=dojox.dtl.text.getTemplateString(H)
}H=J.getTemplate(H)
}var I=J.tokenize(H.node,[],H.pres,H.posts);
var G=new F.HtmlParser(I);
this.nodelist=G.parse()
};
dojo.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(B){this.getRootNode().className=B
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(F,E){E=E||this.getBuffer();
this.rootNode=null;
var G=dojo.connect(E,"onSetParent",this,function(A){if(!this.rootNode){this.rootNode=A||true
}});
var H=this.nodelist.render(F||new dojox.dtl.Context({}),E);
dojo.disconnect(G);
E._flushCache();
return H
},unrender:function(D,C){return this.nodelist.unrender(D,C)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(B){this._parent=B;
this._cache=[]
};
dojo.extend(dojox.dtl.HtmlBuffer,{concat:function(F){if(!this._parent){return this
}if(F.nodeType){var E=this._getCache(this._parent);
if(F.parentNode===this._parent){var G=0;
for(var G=0,H;
H=E[G];
G++){this.onAddNode(F);
this._parent.insertBefore(H,F)
}E.length=0
}if(!F.parentNode||!F.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(F);
this._parent.appendChild(F)
}else{E.push(F)
}}}return this
},remove:function(B){if(typeof B=="string"){this._parent.removeAttribute(B)
}else{if(B.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(B)
}}return this
},setAttribute:function(C,D){if(C=="class"){this._parent.className=D
}else{if(C=="for"){this._parent.htmlFor=D
}else{if(this._parent.setAttribute){this._parent.setAttribute(C,D)
}}}return this
},setParent:function(G,F){if(!this._parent){this._parent=G
}var J=this._getCache(this._parent);
if(J&&J.length&&F){for(var H=0,I;
I=J[H];
H++){if(I!==this._parent&&(!I.parentNode||!I.parentNode.tagName)){this.onAddNode(I);
this._parent.appendChild(I)
}}J.length=0
}this.onSetParent(G,F);
this._parent=G;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(F){for(var G=0,H;
H=this._cache[G];
G++){if(H[0]===F){return H[1]
}}var E=[];
this._cache.push([F,E]);
return E
},_flushCache:function(E){for(var F=0,D;
D=this._cache[F];
F++){if(!D[1].length){this._cache.splice(F--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(B){this.contents=B
};
dojo.extend(dojox.dtl.HtmlNode,{render:function(D,C){return C.concat(this.contents)
},unrender:function(D,C){return C.remove(this.contents)
},clone:function(B){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(B){this.contents=B||[]
};
dojo.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(B){this.contents.push(B)
},unshift:function(B){this.contents.unshift(B)
},render:function(H,J,F){if(F){var G=J.getParent()
}for(var I=0;
I<this.contents.length;
I++){J=this.contents[I].render(H,J);
if(!J){throw new Error("Template node render functions must return their buffer")
}}if(G){J.setParent(G,true)
}return J
},unrender:function(E,D){for(var F=0;
F<this.contents.length;
F++){D=this.contents[F].unrender(E,D);
if(!D){throw new Error("Template node render functions must return their buffer")
}}return D
},clone:function(M){var R=dojox.dtl;
var V=R.html;
var S=M.getParent();
var N=this.contents;
var P=new R.HtmlNodeList();
var U=[];
for(var L=0;
L<N.length;
L++){var T=N[L].clone(M);
if(T instanceof R.ChangeNode||T instanceof R.HtmlNode){var Q=this.parents.get(T.contents);
if(Q){T.contents=Q
}else{if(S!==T.contents&&T instanceof R.HtmlNode){var O=T.contents;
T.contents=T.contents.cloneNode(false);
U.push(O);
this.parents.put(O,T.contents)
}}}P.push(T)
}for(var L=0,T;
T=U[L];
L++){this.parents.put(T)
}return P
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._lists={}
};
dojo.extend(dojox.dtl.HtmlVarNode,{render:function(L,N){this._rendered=true;
var P=dojox.dtl;
var M=P.html;
var J=this.contents.resolve(L);
if(J&&J.render&&J.getRootNode){var O=this._curr=J.getRootNode();
var I=this._lists;
var K=I[O];
if(!K){K=I[O]=new P.HtmlNodeList();
K.push(new P.ChangeNode(N.getParent()));
K.push(new P.HtmlNode(O));
K.push(J);
K.push(new P.ChangeNode(N.getParent(),true))
}return K.render(L,N)
}else{if(!this._txt){this._txt=document.createTextNode(J)
}if(this._txt.data!=J){this._txt.data=J
}return N.concat(this._txt)
}return N
},unrender:function(D,C){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(D,C)
}else{if(this._txt){return C.remove(this._txt)
}}}return C
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(D,C){this.contents=D;
this._up=C
};
dojo.extend(dojox.dtl.ChangeNode,{render:function(D,C){return C.setParent(this.contents,this._up)
},unrender:function(D,C){return C.setParent(this.contents)
},clone:function(B){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(C,D){this._key=C;
this._value=D;
this._tpl=new dojox.dtl.Template(D);
this.contents=""
};
dojo.extend(dojox.dtl.AttributeNode,{render:function(G,E){var H=this._key;
var F=this._tpl.render(G);
if(this._rendered){if(F!=this.contents){this.contents=F;
return E.setAttribute(H,F)
}}else{this._rendered=true;
this.contents=F;
return E.setAttribute(H,F)
}return E
},unrender:function(D,C){if(this._rendered){this._rendered=false;
this.contents="";
return C.remove(this.contents)
}return C
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(B){this.contents=document.createTextNode(B)
};
dojo.extend(dojox.dtl.HtmlTextNode,{render:function(D,C){return C.concat(this.contents)
},unrender:function(D,C){return C.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(B){this.contents=B
};
dojo.extend(dojox.dtl.HtmlParser,{parse:function(R){var T=dojox.dtl;
var b=T.html;
var Y=b.types;
var a={};
var W=this.contents;
if(!R){R=[]
}for(var O=0;
O<R.length;
O++){a[R[O]]=true
}var S=new T.HtmlNodeList();
while(W.length){var P=W.shift();
var X=P[0];
var U=P[1];
if(X==Y.change){S.push(new T.ChangeNode(U,P[2]))
}else{if(X==Y.attr){var V=dojox.dtl.text.getTag("attr:"+P[2],true);
if(V){S.push(V(null,P[2]+" "+P[3]))
}else{S.push(new T.AttributeNode(P[2],P[3]))
}}else{if(X==Y.elem){var V=dojox.dtl.text.getTag("node:"+U.tagName.toLowerCase(),true);
if(V){S.push(V(null,U,U.tagName.toLowerCase()))
}S.push(new T.HtmlNode(U))
}else{if(X==Y.varr){S.push(new T.HtmlVarNode(U))
}else{if(X==Y.text){S.push(new T.HtmlTextNode(U.data||U))
}else{if(X==Y.tag){if(a[U]){W.unshift(P);
return S
}var Q=U.split(/\s+/g);
if(Q.length){Q=Q[0];
var V=dojox.dtl.text.getTag(Q);
if(typeof V!="function"){throw new Error("Function not found for ",Q)
}var Z=V(this,U);
if(Z){S.push(Z)
}}}}}}}}}if(R.length){throw new Error("Could not find closing tag(s): "+R.toString())
}return S
},next:function(){var B=this.contents.shift();
return{type:B[0],text:B[1]}
},skipPast:function(B){return dojox.dtl.Parser.prototype.skipPast.call(this,B)
},getVarNode:function(){return dojox.dtl.HtmlVarNode
},getTextNode:function(){return dojox.dtl.HtmlTextNode
},getTemplate:function(B){return new dojox.dtl.HtmlTemplate(dojox.dtl.html.getTemplate(B))
},toString:function(){return"dojox.dtl.HtmlParser"
}});
dojox.dtl.register.tag("dojox.dtl.tag.event","dojox.dtl.tag.event",[[/(attr:)?on(click|key(up))/i,"on"]]);
dojox.dtl.register.tag("dojox.dtl.tag.html","dojox.dtl.tag.html",["html","attr:attach","attr:tstyle"])
};