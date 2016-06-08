if(!dojo._hasResource["dojox.dtl._base"]){dojo._hasResource["dojox.dtl._base"]=true;
dojo.provide("dojox.dtl._base");
dojo.require("dojox.string.Builder");
dojo.require("dojox.string.tokenize");
dojox.dtl.Context=function(B){dojo.mixin(this,B||{});
this._dicts=[];
this._this={}
};
dojo.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(G){var I=new dojox.dtl.Context();
var H=this.getKeys();
for(var J=0,F;
F=H[J];
J++){if(typeof G[F]!="undefined"){I[F]=G[F]
}else{I[F]=this[F]
}}if(G instanceof dojox.dtl.Context){H=G.getKeys()
}else{if(typeof G=="object"){H=[];
for(var F in G){H.push(F)
}}}for(var J=0,F;
F=H[J];
J++){I[F]=G[F]
}return I
},filter:function(I){var J=new dojox.dtl.Context();
var H=[];
if(I instanceof dojox.dtl.Context){H=I.getKeys()
}else{if(typeof I=="object"){for(var K in I){H.push(K)
}}else{for(var L=0,G;
G=arguments[L];
L++){if(typeof G=="string"){H.push(G)
}}}}for(var L=0,K;
K=H[L];
L++){J[K]=this[K]
}return J
},setThis:function(B){this._this=B
},getThis:function(){return this._this
},push:function(){var F={};
var G=this.getKeys();
for(var H=0,E;
E=G[H];
H++){F[E]=this[E];
delete this[E]
}this._dicts.unshift(F)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var B=this._dicts.shift();
dojo.mixin(this,B)
},hasKey:function(F){if(typeof this[F]!="undefined"){return true
}for(var D=0,E;
E=this._dicts[D];
D++){if(typeof E[F]!="undefined"){return true
}}return false
},getKeys:function(){var G=[];
for(var E in this){if(isNaN(E)){var F=false;
for(var H in dojox.dtl.Context.prototype){if(E==H){F=true;
break
}}if(!F){G.push(E)
}}}return G
},get:function(G,E){if(typeof this[G]!="undefined"){return this[G]
}for(var H=0,F;
F=this._dicts[H];
H++){if(typeof F[G]!="undefined"){return F[G]
}}return E
},update:function(B){this.push();
if(B){dojo.mixin(this,B)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(B){B=B.replace(/^\s+|\s+$/,"");
if(!B.length){return[]
}return B.split(/\s+/g)
},urlquote:function(C,D){if(!D){D="/"
}return dojox.string.tokenize(C,/([^\w-_.])/g,function(A){if(D.indexOf(A)==-1){if(A==" "){return"+"
}else{return"%"+A.charCodeAt(0).toString(16).toUpperCase()
}}return A
}).join("")
},_get:function(L,N,O){var U=dojox.dtl.register.get(L,N,O);
if(!U){return 
}var V=U.getRequire();
var R=U.getObj();
var Q=U.getFn();
if(Q.indexOf(":")!=-1){var T=Q.split(":");
Q=T.pop()
}dojo.requireIf(true,V);
var P=window;
var T=R.split(".");
for(var S=0,M;
M=T[S];
S++){if(!P[M]){return 
}P=P[M]
}return P[Q||N]||P[N+"_"]
},getTag:function(C,D){return dojox.dtl.text._get("tag",C,D)
},getFilter:function(C,D){return dojox.dtl.text._get("filter",C,D)
},getTemplate:function(B){return new dojox.dtl.Template(dojox.dtl.getTemplateString(B))
},getTemplateString:function(B){return dojo._getText(B.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(B){return dojox.string.tokenize(B,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(E,D){var F=dojox.dtl.text.types;
if(E){return[F.varr,E]
}else{return[F.tag,D]
}}};
dojox.dtl.Template=function(G){var E=dojox.dtl;
var H=E.text.tokenize(G);
var F=new E.Parser(H);
this.nodelist=F.parse()
};
dojo.extend(dojox.dtl.Template,{render:function(D,C){D=D||new dojox.dtl.Context({});
if(!C){dojo.require("dojox.string.Builder");
C=new dojox.string.Builder()
}return this.nodelist.render(D,C)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(O){if(!O){throw new Error("Filter must be called with variable name")
}this.contents=O;
var P=null;
var L=this._re;
var J,M,I,N;
var K=[];
while(J=L.exec(O)){if(P===null){if(this._exists(J,3)){P=J[3]
}else{if(this._exists(J,1)){P='"'+J[1]+'"'
}else{if(this._exists(J,2)){P='"'+J[2]+'"'
}else{if(this._exists(J,9)){P='"'+J[9]+'"'
}}}}}else{if(this._exists(J,7)){I=[true,J[7]]
}else{if(this._exists(J,5)){I=[false,dojox.dtl.replace(J[5],'\\"','"')]
}else{if(this._exists(J,6)){I=[false,dojox.dtl.replace(J[6],'\\"','"')]
}else{if(this._exists(J,8)){I=[false,dojox.dtl.replace(J[8],"\\'","'")]
}}}}N=dojox.dtl.text.getFilter(J[4]);
if(typeof N!="function"){throw new Error(J[4]+" is not registered as a filter")
}K.push([N,I])
}}this.key=P;
this.filters=K
};
dojo.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(C,D){if(typeof C[D]!="undefined"&&C[D]!==""){return true
}return false
},resolve:function(H){var F=this.resolvePath(this.key,H);
for(var E=0,G;
G=this.filters[E];
E++){if(G[1]){if(G[1][0]){F=G[0](F,this.resolvePath(G[1][1],H))
}else{F=G[0](F,G[1][1])
}}else{F=G[0](F)
}}return F
},resolvePath:function(I,G){var J,K;
var H=I.charAt(0);
var L=I.charAt(I.length-1);
if(!isNaN(parseInt(H))){J=(I.indexOf(".")==-1)?parseInt(I):parseFloat(I)
}else{if(H=='"'&&H==L){J=I.substring(1,I.length-1)
}else{if(I=="true"){return true
}if(I=="false"){return false
}if(I=="null"||I=="None"){return null
}K=I.split(".");
J=G.get(K.shift());
while(K.length){if(J&&typeof J[K[0]]!="undefined"){J=J[K[0]];
if(typeof J=="function"){if(J.alters_data){J=""
}else{J=J()
}}}else{return""
}K.shift()
}}}return J
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(B){this.contents=B
};
dojo.extend(dojox.dtl.Node,{render:function(D,C){return C.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(B){this.contents=B||[]
};
dojo.extend(dojox.dtl.NodeList,{push:function(B){this.contents.push(B)
},render:function(E,D){for(var F=0;
F<this.contents.length;
F++){D=this.contents[F].render(E,D);
if(!D){throw new Error("Template node render functions must return their buffer")
}}return D
},unrender:function(D,C){return C
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(B){this.contents=new dojox.dtl.Filter(B)
};
dojo.extend(dojox.dtl.VarNode,{render:function(F,D){var E=this.contents.resolve(F);
return D.concat(E)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(B){this.contents=B
};
dojo.extend(dojox.dtl.Parser,{parse:function(O){var P=dojox.dtl;
var V=P.text.types;
var L={};
var U=this.contents;
O=O||[];
for(var M=0;
M<O.length;
M++){L[O[M]]=true
}var Q=new P.NodeList();
while(U.length){token=U.shift();
if(typeof token=="string"){Q.push(new P.TextNode(token))
}else{var T=token[0];
var R=token[1];
if(T==V.varr){Q.push(new P.VarNode(R))
}else{if(T==V.tag){if(L[R]){U.unshift(token);
return Q
}var N=R.split(/\s+/g);
if(N.length){N=N[0];
var S=dojox.dtl.text.getTag(N);
if(S){Q.push(S(this,R))
}}}}}}if(O.length){throw new Error("Could not find closing tag(s): "+O.toString())
}return Q
},next:function(){var B=this.contents.shift();
return{type:B[0],text:B[1]}
},skipPast:function(E){var F=dojox.dtl.text.types;
while(this.contents.length){var D=this.contents.shift();
if(D[0]==F.tag&&D[1]==E){return 
}}throw new Error("Unclosed tag found when looking for "+E)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(B){return new dojox.dtl.Template(B)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(K,J,N,P){var L=dojox.dtl.register;
var I=L._mod[K]={params:[],Getter:function(A){L._params=A||{}
}};
J.unshift("name");
for(var M=0,O;
O=J[M];
M++){I.Getter.prototype["get"+O.substring(0,1).toUpperCase()+O.substring(1,O.length)]=L._ret(M)
}L[K]=function(B,G){if(P){var E=P(arguments)
}else{var E=[arguments]
}for(var A=0,C;
C=E[A];
A++){var F=[];
for(var D=0;
D<J.length;
D++){F.push(C[D]||null)
}if(typeof C[0]=="string"){I.params.unshift(F)
}else{I.params.push(F)
}}};
L[K].apply(null,N)
};
dojo.mixin(dojox.dtl.register,{_mod:{},_ret:function(B){return function(){return dojox.dtl.register._params[B]||""
}
},get:function(J,K,L){var M=this._mod[J]||{};
if(M.params){for(var Q=0,R;
R=M.params[Q];
Q++){var N=R[0];
if(typeof N=="string"){if(N==K){return new M.Getter(R)
}}else{if(K.match(N)){var P=N.exec(K);
var O=[];
dojo.mixin(O,R);
O[0]=P[1];
return new M.Getter(R)
}}}}if(!L){throw new Error("'"+J+"' of name '"+K+"' does not exist")
}},_normalize:function(I){var J=I[2];
var F=[];
for(var H=0,G;
G=J[H];
H++){if(typeof G=="string"){F.push([G,I[0],I[1],G])
}else{F.push([G[0],I[0],I[1],G[1]])
}}return F
},tag:function(D,E,F){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(D,E,F){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var E=dojox.dtl.register;
var D="dojox.dtl.tag";
E.tag(D+".logic",D+".logic",["if","for"]);
E.tag(D+".loader",D+".loader",["extends","block"]);
E.tag(D+".misc",D+".misc",["comment","debug","filter"]);
E.tag(D+".loop",D+".loop",["cycle"]);
var F="dojox.dtl.filter";
E.filter(F+".dates",F+".dates",["date","time","timesince","timeuntil"]);
E.filter(F+".htmlstrings",F+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
E.filter(F+".integers",F+".integers",["add","get_digit"]);
E.filter(F+".lists",F+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
E.filter(F+".logic",F+".logic",["default","default_if_none","divisibleby","yesno"]);
E.filter(F+".misc",F+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
E.filter(F+".strings",F+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(H,J,I){I=I||"";
var G,F=J.length;
while(1){G=H.indexOf(J);
if(G==-1){break
}H=H.substring(0,G)+I+H.substring(G+F)
}return H
};
dojox.dtl.resolveVariable=function(F,D){var E=new dojox.dtl.Filter(F);
return E.resolve(D)
}
};