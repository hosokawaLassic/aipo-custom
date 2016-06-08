if(!dojo._hasResource["dojox.dtl.tag.html"]){dojo._hasResource["dojox.dtl.tag.html"]=true;
dojo.provide("dojox.dtl.tag.html");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._div=document.createElement("div");
this._lasts=[]
};
dojo.extend(dojox.dtl.tag.html.HtmlNode,{render:function(K,G){var I=this.contents.resolve(K);
I=I.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=I){G=this.unrender(K,G)
}this._last=I;
if(!this._rendered){this._rendered=true;
var H=this._div;
H.innerHTML=I;
var L=H.childNodes;
while(L.length){var J=H.removeChild(L[0]);
this._lasts.push(J);
G=G.concat(J)
}}return G
},unrender:function(G,E){if(this._rendered){this._rendered=false;
this._last="";
for(var H=0,F;
F=this._lasts[H++];
){E=E.remove(F);
dojo._destroyElement(F)
}this._lasts=[]
}return E
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(D){this.contents={};
this._styles=D;
for(var C in D){this.contents[C]=new dojox.dtl.Template(D[C])
}};
dojo.extend(dojox.dtl.tag.html.StyleNode,{render:function(E,D){for(var F in this.contents){dojo.style(D.getParent(),F,this.contents[F].render(E))
}return D
},unrender:function(D,C){return C
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(B){this.contents=B
};
dojo.extend(dojox.dtl.tag.html.AttachNode,{render:function(D,C){if(!this._rendered){this._rendered=true;
D.getThis()[this.contents]=C.getParent()
}return C
},unrender:function(D,C){if(this._rendered){this._rendered=false;
if(D.getThis()[this.contents]===C.getParent()){delete D.getThis()[this.contents]
}}return C
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(E,F){var D=F.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(D[1])
};
dojox.dtl.tag.html.tstyle=function(M,P){var N={};
P=P.replace(dojox.dtl.tag.html.tstyle._re,"");
var O=P.split(dojox.dtl.tag.html.tstyle._re1);
for(var K=0,J;
J=O[K];
K++){var L=J.split(dojox.dtl.tag.html.tstyle._re2);
var Q=L[0];
var R=L[1];
if(R.indexOf("{{")==0){N[Q]=R
}}return new dojox.dtl.tag.html.StyleNode(N)
};
dojo.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(E,F){var D=F.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(D[1])
};
dojo.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
};