dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.html"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.tag.html"]){B._hasResource["dojox.dtl.tag.html"]=true;
B.provide("dojox.dtl.tag.html");
B.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._div=document.createElement("div");
this._lasts=[]
};
B.extend(dojox.dtl.tag.html.HtmlNode,{render:function(J,L){var H=this.contents.resolve(J);
H=H.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=H){L=this.unrender(J,L)
}this._last=H;
if(!this._rendered){this._rendered=true;
var A=this._div;
A.innerHTML=H;
var K=A.childNodes;
while(K.length){var I=A.removeChild(K[0]);
this._lasts.push(I);
L=L.concat(I)
}}return L
},unrender:function(F,H){if(this._rendered){this._rendered=false;
this._last="";
for(var G=0,A;
A=this._lasts[G++];
){H=H.remove(A);
B._destroyElement(A)
}this._lasts=[]
}return H
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(A){this.contents={};
this._styles=A;
for(var D in A){this.contents[D]=new dojox.dtl.Template(A[D])
}};
B.extend(dojox.dtl.tag.html.StyleNode,{render:function(A,F){for(var E in this.contents){B.style(F.getParent(),E,this.contents[E].render(A))
}return F
},unrender:function(A,D){return D
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(A){this.contents=A
};
B.extend(dojox.dtl.tag.html.AttachNode,{render:function(A,D){if(!this._rendered){this._rendered=true;
A.getThis()[this.contents]=D.getParent()
}return D
},unrender:function(A,D){if(this._rendered){this._rendered=false;
if(A.getThis()[this.contents]===D.getParent()){delete A.getThis()[this.contents]
}}return D
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(A,E){var F=E.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(F[1])
};
dojox.dtl.tag.html.tstyle=function(L,O){var M={};
O=O.replace(dojox.dtl.tag.html.tstyle._re,"");
var N=O.split(dojox.dtl.tag.html.tstyle._re1);
for(var A=0,R;
R=N[A];
A++){var K=R.split(dojox.dtl.tag.html.tstyle._re2);
var P=K[0];
var Q=K[1];
if(Q.indexOf("{{")==0){M[P]=Q
}}return new dojox.dtl.tag.html.StyleNode(M)
};
B.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(A,E){var F=E.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(F[1])
};
B.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
}}});