dojo._xdResourceLoaded({depends:[["provide","dojox.dtl._base"],["require","dojox.string.Builder"],["require","dojox.string.tokenize"],["requireIf",true,require],["require","dojox.string.Builder"]],defineResource:function(B){if(!B._hasResource["dojox.dtl._base"]){B._hasResource["dojox.dtl._base"]=true;
B.provide("dojox.dtl._base");
B.require("dojox.string.Builder");
B.require("dojox.string.tokenize");
dojox.dtl.Context=function(A){B.mixin(this,A||{});
this._dicts=[];
this._this={}
};
B.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(A){var H=new dojox.dtl.Context();
var G=this.getKeys();
for(var I=0,J;
J=G[I];
I++){if(typeof A[J]!="undefined"){H[J]=A[J]
}else{H[J]=this[J]
}}if(A instanceof dojox.dtl.Context){G=A.getKeys()
}else{if(typeof A=="object"){G=[];
for(var J in A){G.push(J)
}}}for(var I=0,J;
J=G[I];
I++){H[J]=A[J]
}return H
},filter:function(H){var I=new dojox.dtl.Context();
var A=[];
if(H instanceof dojox.dtl.Context){A=H.getKeys()
}else{if(typeof H=="object"){for(var J in H){A.push(J)
}}else{for(var K=0,L;
L=arguments[K];
K++){if(typeof L=="string"){A.push(L)
}}}}for(var K=0,J;
J=A[K];
K++){I[J]=this[J]
}return I
},setThis:function(A){this._this=A
},getThis:function(){return this._this
},push:function(){var A={};
var F=this.getKeys();
for(var G=0,H;
H=F[G];
G++){A[H]=this[H];
delete this[H]
}this._dicts.unshift(A)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var A=this._dicts.shift();
B.mixin(this,A)
},hasKey:function(E){if(typeof this[E]!="undefined"){return true
}for(var F=0,A;
A=this._dicts[F];
F++){if(typeof A[E]!="undefined"){return true
}}return false
},getKeys:function(){var F=[];
for(var H in this){if(isNaN(H)){var A=false;
for(var G in dojox.dtl.Context.prototype){if(H==G){A=true;
break
}}if(!A){F.push(H)
}}}return F
},get:function(F,H){if(typeof this[F]!="undefined"){return this[F]
}for(var G=0,A;
A=this._dicts[G];
G++){if(typeof A[F]!="undefined"){return A[F]
}}return H
},update:function(A){this.push();
if(A){B.mixin(this,A)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(A){A=A.replace(/^\s+|\s+$/,"");
if(!A.length){return[]
}return A.split(/\s+/g)
},urlquote:function(D,A){if(!A){A="/"
}return dojox.string.tokenize(D,/([^\w-_.])/g,function(C){if(A.indexOf(C)==-1){if(C==" "){return"+"
}else{return"%"+C.charCodeAt(0).toString(16).toUpperCase()
}}return C
}).join("")
},_get:function(V,M,N){var T=dojox.dtl.register.get(V,M,N);
if(!T){return 
}var U=T.getRequire();
var Q=T.getObj();
var P=T.getFn();
if(P.indexOf(":")!=-1){var S=P.split(":");
P=S.pop()
}B.requireIf(true,U);
var O=window;
var S=Q.split(".");
for(var R=0,A;
A=S[R];
R++){if(!O[A]){return 
}O=O[A]
}return O[P||M]||O[M+"_"]
},getTag:function(D,A){return dojox.dtl.text._get("tag",D,A)
},getFilter:function(D,A){return dojox.dtl.text._get("filter",D,A)
},getTemplate:function(A){return new dojox.dtl.Template(dojox.dtl.getTemplateString(A))
},getTemplateString:function(A){return B._getText(A.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(A){return dojox.string.tokenize(A,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(A,F){var E=dojox.dtl.text.types;
if(A){return[E.varr,A]
}else{return[E.tag,F]
}}};
dojox.dtl.Template=function(F){var H=dojox.dtl;
var G=H.text.tokenize(F);
var A=new H.Parser(G);
this.nodelist=A.parse()
};
B.extend(dojox.dtl.Template,{render:function(A,D){A=A||new dojox.dtl.Context({});
if(!D){B.require("dojox.string.Builder");
D=new dojox.string.Builder()
}return this.nodelist.render(A,D)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(N){if(!N){throw new Error("Filter must be called with variable name")
}this.contents=N;
var O=null;
var K=this._re;
var A,L,P,M;
var J=[];
while(A=K.exec(N)){if(O===null){if(this._exists(A,3)){O=A[3]
}else{if(this._exists(A,1)){O='"'+A[1]+'"'
}else{if(this._exists(A,2)){O='"'+A[2]+'"'
}else{if(this._exists(A,9)){O='"'+A[9]+'"'
}}}}}else{if(this._exists(A,7)){P=[true,A[7]]
}else{if(this._exists(A,5)){P=[false,dojox.dtl.replace(A[5],'\\"','"')]
}else{if(this._exists(A,6)){P=[false,dojox.dtl.replace(A[6],'\\"','"')]
}else{if(this._exists(A,8)){P=[false,dojox.dtl.replace(A[8],"\\'","'")]
}}}}M=dojox.dtl.text.getFilter(A[4]);
if(typeof M!="function"){throw new Error(A[4]+" is not registered as a filter")
}J.push([M,P])
}}this.key=O;
this.filters=J
};
B.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(D,A){if(typeof D[A]!="undefined"&&D[A]!==""){return true
}return false
},resolve:function(G){var A=this.resolvePath(this.key,G);
for(var H=0,F;
F=this.filters[H];
H++){if(F[1]){if(F[1][0]){A=F[0](A,this.resolvePath(F[1][1],G))
}else{A=F[0](A,F[1][1])
}}else{A=F[0](A)
}}return A
},resolvePath:function(H,L){var I,J;
var A=H.charAt(0);
var K=H.charAt(H.length-1);
if(!isNaN(parseInt(A))){I=(H.indexOf(".")==-1)?parseInt(H):parseFloat(H)
}else{if(A=='"'&&A==K){I=H.substring(1,H.length-1)
}else{if(H=="true"){return true
}if(H=="false"){return false
}if(H=="null"||H=="None"){return null
}J=H.split(".");
I=L.get(J.shift());
while(J.length){if(I&&typeof I[J[0]]!="undefined"){I=I[J[0]];
if(typeof I=="function"){if(I.alters_data){I=""
}else{I=I()
}}}else{return""
}J.shift()
}}}return I
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(A){this.contents=A
};
B.extend(dojox.dtl.Node,{render:function(A,D){return D.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(A){this.contents=A||[]
};
B.extend(dojox.dtl.NodeList,{push:function(A){this.contents.push(A)
},render:function(A,F){for(var E=0;
E<this.contents.length;
E++){F=this.contents[E].render(A,F);
if(!F){throw new Error("Template node render functions must return their buffer")
}}return F
},unrender:function(A,D){return D
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(A){this.contents=new dojox.dtl.Filter(A)
};
B.extend(dojox.dtl.VarNode,{render:function(E,F){var A=this.contents.resolve(E);
return F.concat(A)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(A){this.contents=A
};
B.extend(dojox.dtl.Parser,{parse:function(N){var O=dojox.dtl;
var U=O.text.types;
var V={};
var T=this.contents;
N=N||[];
for(var A=0;
A<N.length;
A++){V[N[A]]=true
}var P=new O.NodeList();
while(T.length){token=T.shift();
if(typeof token=="string"){P.push(new O.TextNode(token))
}else{var S=token[0];
var Q=token[1];
if(S==U.varr){P.push(new O.VarNode(Q))
}else{if(S==U.tag){if(V[Q]){T.unshift(token);
return P
}var M=Q.split(/\s+/g);
if(M.length){M=M[0];
var R=dojox.dtl.text.getTag(M);
if(R){P.push(R(this,Q))
}}}}}}if(N.length){throw new Error("Could not find closing tag(s): "+N.toString())
}return P
},next:function(){var A=this.contents.shift();
return{type:A[0],text:A[1]}
},skipPast:function(A){var E=dojox.dtl.text.types;
while(this.contents.length){var F=this.contents.shift();
if(F[0]==E.tag&&F[1]==A){return 
}}throw new Error("Unclosed tag found when looking for "+A)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(A){return new dojox.dtl.Template(A)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(J,A,M,O){var K=dojox.dtl.register;
var P=K._mod[J]={params:[],Getter:function(C){K._params=C||{}
}};
A.unshift("name");
for(var L=0,N;
N=A[L];
L++){P.Getter.prototype["get"+N.substring(0,1).toUpperCase()+N.substring(1,N.length)]=K._ret(L)
}K[J]=function(C,H){if(O){var F=O(arguments)
}else{var F=[arguments]
}for(var I=0,D;
D=F[I];
I++){var G=[];
for(var E=0;
E<A.length;
E++){G.push(D[E]||null)
}if(typeof D[0]=="string"){P.params.unshift(G)
}else{P.params.push(G)
}}};
K[J].apply(null,M)
};
B.mixin(dojox.dtl.register,{_mod:{},_ret:function(A){return function(){return dojox.dtl.register._params[A]||""
}
},get:function(R,A,K){var L=this._mod[R]||{};
if(L.params){for(var P=0,Q;
Q=L.params[P];
P++){var M=Q[0];
if(typeof M=="string"){if(M==A){return new L.Getter(Q)
}}else{if(A.match(M)){var O=M.exec(A);
var N=[];
B.mixin(N,Q);
N[0]=O[1];
return new L.Getter(Q)
}}}}if(!K){throw new Error("'"+R+"' of name '"+A+"' does not exist")
}},_normalize:function(H){var I=H[2];
var J=[];
for(var G=0,A;
A=I[G];
G++){if(typeof A=="string"){J.push([A,H[0],H[1],A])
}else{J.push([A[0],H[0],H[1],A[1]])
}}return J
},tag:function(F,A,E){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(F,A,E){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var A=dojox.dtl.register;
var F="dojox.dtl.tag";
A.tag(F+".logic",F+".logic",["if","for"]);
A.tag(F+".loader",F+".loader",["extends","block"]);
A.tag(F+".misc",F+".misc",["comment","debug","filter"]);
A.tag(F+".loop",F+".loop",["cycle"]);
var E="dojox.dtl.filter";
A.filter(E+".dates",E+".dates",["date","time","timesince","timeuntil"]);
A.filter(E+".htmlstrings",E+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
A.filter(E+".integers",E+".integers",["add","get_digit"]);
A.filter(E+".lists",E+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
A.filter(E+".logic",E+".logic",["default","default_if_none","divisibleby","yesno"]);
A.filter(E+".misc",E+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
A.filter(E+".strings",E+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(G,I,H){H=H||"";
var A,J=I.length;
while(1){A=G.indexOf(I);
if(A==-1){break
}G=G.substring(0,A)+H+G.substring(A+J)
}return G
};
dojox.dtl.resolveVariable=function(E,F){var A=new dojox.dtl.Filter(E);
return A.resolve(F)
}
}}});