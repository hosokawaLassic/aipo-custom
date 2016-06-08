dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.html"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.html"]){B._hasResource["dojox.dtl.html"]=true;
B.provide("dojox.dtl.html");
B.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
B.extend(dojox.dtl.ObjectMap,{get:function(G){var A=this.contents;
for(var H=0,F;
F=A[H];
H++){if(F[0]===G){return F[1]
}}},put:function(I,A){var G=this.contents;
for(var J=0,H;
H=G[J];
J++){if(H[0]===I){if(arguments.length==1){G.splice(J,1);
return 
}H[1]=A;
return 
}}G.push([I,A])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:B.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(A){return A.replace(this._re,"")
},getTemplate:function(F){if(typeof this._commentable=="undefined"){this._commentable=false;
var A=document.createElement("div");
A.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(A.childNodes.length&&A.childNodes[0].nodeType==8&&A.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){F=F.replace(this._re3,"$1")
}var G;
while(G=this._re2.exec(F)){this._attributes[G[1]]=true
}var A=document.createElement("div");
A.innerHTML=F;
var H={pres:[],posts:[]};
while(A.childNodes.length){if(!H.node&&A.childNodes[0].nodeType==1){H.node=A.removeChild(A.childNodes[0])
}else{if(!H.node){H.pres.push(A.removeChild(A.childNodes[0]))
}else{H.posts.push(A.removeChild(A.childNodes[0]))
}}}if(!H.node){throw new Error("Template did not provide any content")
}return H
},tokenize:function(Z,S,T,Y){S=S||[];
var V=!S.length;
var U=this.types;
var A=[];
for(var W=0,O;
O=Z.childNodes[W];
W++){A.push(O)
}if(T){for(var W=0,O;
O=T[W];
W++){this._tokenize(Z,O,S)
}}S.push([U.elem,Z]);
S.push([U.change,Z]);
for(var Q in this._attributes){var R="";
if(Q=="class"){R=Z.className||R
}else{if(Q=="for"){R=Z.htmlFor||R
}else{if(Z.getAttribute){R=Z.getAttribute(Q,2)||R;
if(Q=="href"||Q=="src"){if(B.isIE){var X=location.href.lastIndexOf(location.hash);
var P=location.href.substring(0,X).split("/");
P.pop();
P=P.join("/")+"/";
if(R.indexOf(P)==0){R=R.replace(P,"")
}R=R.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(R.indexOf("{%")!=-1||R.indexOf("{{")!=-1){Z.setAttribute(Q,"")
}}}}}if(typeof R=="function"){R=R.toString().replace(this._re4,"$1")
}if(typeof R=="string"&&(R.indexOf("{%")!=-1||R.indexOf("{{")!=-1||(R&&dojox.dtl.text.getTag("attr:"+Q,true)))){S.push([U.attr,Z,Q,R])
}}if(!A.length){S.push([U.change,Z.parentNode,true]);
if(Y){for(var W=0,O;
O=Y[W];
W++){this._tokenize(Z,O,S)
}}return S
}for(var W=0,O;
O=A[W];
W++){this._tokenize(Z,O,S)
}if(Z.parentNode&&Z.parentNode.tagName){S.push([U.change,Z.parentNode,true]);
Z.parentNode.removeChild(Z)
}if(Y){for(var W=0,O;
O=Y[W];
W++){this._tokenize(Z,O,S)
}}if(V){S.push([U.change,Z,true])
}return S
},_tokenize:function(N,A,K){var O=this.types;
var L=A.data;
switch(A.nodeType){case 1:this.tokenize(A,K);
break;
case 3:if(L.match(/[^\s\n]/)){if(L.indexOf("{{")!=-1||L.indexOf("{%")!=-1){var M=dojox.dtl.text.tokenize(L);
for(var P=0,J;
J=M[P];
P++){if(typeof J=="string"){K.push([O.text,J])
}else{K.push(J)
}}}else{K.push([A.nodeType,A])
}}if(A.parentNode){A.parentNode.removeChild(A)
}break;
case 8:if(L.indexOf("{%")==0){K.push([O.tag,this._trim(L.substring(2,L.length-3))])
}if(L.indexOf("{{")==0){K.push([O.varr,this._trim(L.substring(2,L.length-3))])
}if(A.parentNode){A.parentNode.removeChild(A)
}break
}}};
dojox.dtl.HtmlTemplate=function(G){var J=dojox.dtl;
var I=J.html;
if(!G.node){if(typeof G=="object"){G=dojox.dtl.text.getTemplateString(G)
}G=I.getTemplate(G)
}var H=I.tokenize(G.node,[],G.pres,G.posts);
var A=new J.HtmlParser(H);
this.nodelist=A.parse()
};
B.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(A){this.getRootNode().className=A
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(A,H){H=H||this.getBuffer();
this.rootNode=null;
var F=B.connect(H,"onSetParent",this,function(C){if(!this.rootNode){this.rootNode=C||true
}});
var G=this.nodelist.render(A||new dojox.dtl.Context({}),H);
B.disconnect(F);
H._flushCache();
return G
},unrender:function(A,D){return this.nodelist.unrender(A,D)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(A){this._parent=A;
this._cache=[]
};
B.extend(dojox.dtl.HtmlBuffer,{concat:function(A){if(!this._parent){return this
}if(A.nodeType){var H=this._getCache(this._parent);
if(A.parentNode===this._parent){var F=0;
for(var F=0,G;
G=H[F];
F++){this.onAddNode(A);
this._parent.insertBefore(G,A)
}H.length=0
}if(!A.parentNode||!A.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(A);
this._parent.appendChild(A)
}else{H.push(A)
}}}return this
},remove:function(A){if(typeof A=="string"){this._parent.removeAttribute(A)
}else{if(A.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(A)
}}return this
},setAttribute:function(D,A){if(D=="class"){this._parent.className=A
}else{if(D=="for"){this._parent.htmlFor=A
}else{if(this._parent.setAttribute){this._parent.setAttribute(D,A)
}}}return this
},setParent:function(A,J){if(!this._parent){this._parent=A
}var I=this._getCache(this._parent);
if(I&&I.length&&J){for(var G=0,H;
H=I[G];
G++){if(H!==this._parent&&(!H.parentNode||!H.parentNode.tagName)){this.onAddNode(H);
this._parent.appendChild(H)
}}I.length=0
}this.onSetParent(A,J);
this._parent=A;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(A){for(var F=0,G;
G=this._cache[F];
F++){if(G[0]===A){return G[1]
}}var H=[];
this._cache.push([A,H]);
return H
},_flushCache:function(A){for(var E=0,F;
F=this._cache[E];
E++){if(!F[1].length){this._cache.splice(E--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(A){this.contents=A
};
B.extend(dojox.dtl.HtmlNode,{render:function(A,D){return D.concat(this.contents)
},unrender:function(A,D){return D.remove(this.contents)
},clone:function(A){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(A){this.contents=A||[]
};
B.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(A){this.contents.push(A)
},unshift:function(A){this.contents.unshift(A)
},render:function(G,I,J){if(J){var A=I.getParent()
}for(var H=0;
H<this.contents.length;
H++){I=this.contents[H].render(G,I);
if(!I){throw new Error("Template node render functions must return their buffer")
}}if(A){I.setParent(A,true)
}return I
},unrender:function(A,F){for(var E=0;
E<this.contents.length;
E++){F=this.contents[E].unrender(A,F);
if(!F){throw new Error("Template node render functions must return their buffer")
}}return F
},clone:function(A){var Q=dojox.dtl;
var U=Q.html;
var R=A.getParent();
var M=this.contents;
var O=new Q.HtmlNodeList();
var T=[];
for(var V=0;
V<M.length;
V++){var S=M[V].clone(A);
if(S instanceof Q.ChangeNode||S instanceof Q.HtmlNode){var P=this.parents.get(S.contents);
if(P){S.contents=P
}else{if(R!==S.contents&&S instanceof Q.HtmlNode){var N=S.contents;
S.contents=S.contents.cloneNode(false);
T.push(N);
this.parents.put(N,S.contents)
}}}O.push(S)
}for(var V=0,S;
S=T[V];
V++){this.parents.put(S)
}return O
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._lists={}
};
B.extend(dojox.dtl.HtmlVarNode,{render:function(K,M){this._rendered=true;
var O=dojox.dtl;
var L=O.html;
var A=this.contents.resolve(K);
if(A&&A.render&&A.getRootNode){var N=this._curr=A.getRootNode();
var P=this._lists;
var J=P[N];
if(!J){J=P[N]=new O.HtmlNodeList();
J.push(new O.ChangeNode(M.getParent()));
J.push(new O.HtmlNode(N));
J.push(A);
J.push(new O.ChangeNode(M.getParent(),true))
}return J.render(K,M)
}else{if(!this._txt){this._txt=document.createTextNode(A)
}if(this._txt.data!=A){this._txt.data=A
}return M.concat(this._txt)
}return M
},unrender:function(A,D){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(A,D)
}else{if(this._txt){return D.remove(this._txt)
}}}return D
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(A,D){this.contents=A;
this._up=D
};
B.extend(dojox.dtl.ChangeNode,{render:function(A,D){return D.setParent(this.contents,this._up)
},unrender:function(A,D){return D.setParent(this.contents)
},clone:function(A){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(D,A){this._key=D;
this._value=A;
this._tpl=new dojox.dtl.Template(A);
this.contents=""
};
B.extend(dojox.dtl.AttributeNode,{render:function(F,H){var G=this._key;
var A=this._tpl.render(F);
if(this._rendered){if(A!=this.contents){this.contents=A;
return H.setAttribute(G,A)
}}else{this._rendered=true;
this.contents=A;
return H.setAttribute(G,A)
}return H
},unrender:function(A,D){if(this._rendered){this._rendered=false;
this.contents="";
return D.remove(this.contents)
}return D
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(A){this.contents=document.createTextNode(A)
};
B.extend(dojox.dtl.HtmlTextNode,{render:function(A,D){return D.concat(this.contents)
},unrender:function(A,D){return D.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(A){this.contents=A
};
B.extend(dojox.dtl.HtmlParser,{parse:function(Q){var S=dojox.dtl;
var a=S.html;
var X=a.types;
var Z={};
var V=this.contents;
if(!Q){Q=[]
}for(var b=0;
b<Q.length;
b++){Z[Q[b]]=true
}var R=new S.HtmlNodeList();
while(V.length){var A=V.shift();
var W=A[0];
var T=A[1];
if(W==X.change){R.push(new S.ChangeNode(T,A[2]))
}else{if(W==X.attr){var U=dojox.dtl.text.getTag("attr:"+A[2],true);
if(U){R.push(U(null,A[2]+" "+A[3]))
}else{R.push(new S.AttributeNode(A[2],A[3]))
}}else{if(W==X.elem){var U=dojox.dtl.text.getTag("node:"+T.tagName.toLowerCase(),true);
if(U){R.push(U(null,T,T.tagName.toLowerCase()))
}R.push(new S.HtmlNode(T))
}else{if(W==X.varr){R.push(new S.HtmlVarNode(T))
}else{if(W==X.text){R.push(new S.HtmlTextNode(T.data||T))
}else{if(W==X.tag){if(Z[T]){V.unshift(A);
return R
}var P=T.split(/\s+/g);
if(P.length){P=P[0];
var U=dojox.dtl.text.getTag(P);
if(typeof U!="function"){throw new Error("Function not found for ",P)
}var Y=U(this,T);
if(Y){R.push(Y)
}}}}}}}}}if(Q.length){throw new Error("Could not find closing tag(s): "+Q.toString())
}return R
},next:function(){var A=this.contents.shift();
return{type:A[0],text:A[1]}
},skipPast:function(A){return dojox.dtl.Parser.prototype.skipPast.call(this,A)
},getVarNode:function(){return dojox.dtl.HtmlVarNode
},getTextNode:function(){return dojox.dtl.HtmlTextNode
},getTemplate:function(A){return new dojox.dtl.HtmlTemplate(dojox.dtl.html.getTemplate(A))
},toString:function(){return"dojox.dtl.HtmlParser"
}});
dojox.dtl.register.tag("dojox.dtl.tag.event","dojox.dtl.tag.event",[[/(attr:)?on(click|key(up))/i,"on"]]);
dojox.dtl.register.tag("dojox.dtl.tag.html","dojox.dtl.tag.html",["html","attr:attach","attr:tstyle"])
}}});