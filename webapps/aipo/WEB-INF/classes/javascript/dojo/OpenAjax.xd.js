dojo._xdResourceLoaded({defineResource:function(B){if(!window.OpenAjax){OpenAjax=new function(){var K=true;
var A=false;
var I=window;
var H;
var L="org.openajax.hub.";
var J={};
this.hub=J;
J.implementer="http://openajax.org";
J.implVersion="0.6";
J.specVersion="0.6";
J.implExtraData={};
var H={};
J.libraries=H;
J.registerLibrary=function(C,D,E,F){H[C]={prefix:C,namespaceURI:D,version:E,extraData:F};
this.publish(L+"registerLibrary",H[C])
};
J.unregisterLibrary=function(C){this.publish(L+"unregisterLibrary",H[C]);
delete H[C]
};
J._subscriptions={c:{},s:[]};
J._cleanup=[];
J._subIndex=0;
J._pubDepth=0;
J.subscribe=function(G,P,C,D,E){if(!C){C=window
}var R=G+"."+this._subIndex;
var F={scope:C,cb:P,fcb:E,data:D,sid:this._subIndex++,hdl:R};
var Q=G.split(".");
this._subscribe(this._subscriptions,Q,0,F);
return R
};
J.publish=function(F,D){var C=F.split(".");
this._pubDepth++;
this._publish(this._subscriptions,C,0,F,D);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var E=0;
E<this._cleanup.length;
E++){this.unsubscribe(this._cleanup[E].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
J.unsubscribe=function(D){var C=D.split(".");
var E=C.pop();
this._unsubscribe(this._subscriptions,C,0,E)
};
J._subscribe=function(G,C,F,D){var E=C[F];
if(F==C.length){G.s.push(D)
}else{if(typeof G.c=="undefined"){G.c={}
}if(typeof G.c[E]=="undefined"){G.c[E]={c:{},s:[]};
this._subscribe(G.c[E],C,F+1,D)
}else{this._subscribe(G.c[E],C,F+1,D)
}}};
J._publish=function(C,D,V,b,a){if(typeof C!="undefined"){var Z;
if(V==D.length){Z=C
}else{this._publish(C.c[D[V]],D,V+1,b,a);
this._publish(C.c["*"],D,V+1,b,a);
Z=C.c["**"]
}if(typeof Z!="undefined"){var U=Z.s;
var E=U.length;
for(var X=0;
X<E;
X++){if(U[X].cb){var F=U[X].scope;
var Y=U[X].cb;
var W=U[X].fcb;
var G=U[X].data;
if(typeof Y=="string"){Y=F[Y]
}if(typeof W=="string"){W=F[W]
}if((!W)||(W.call(F,b,a,G))){Y.call(F,b,a,G)
}}}}}};
J._unsubscribe=function(C,D,Q,S){if(typeof C!="undefined"){if(Q<D.length){var T=C.c[D[Q]];
this._unsubscribe(T,D,Q+1,S);
if(T.s.length==0){for(var E in T.c){return 
}delete C.c[D[Q]]
}return 
}else{var G=C.s;
var F=G.length;
for(var R=0;
R<F;
R++){if(S==G[R].sid){if(this._pubDepth>0){G[R].cb=null;
this._cleanup.push(G[R])
}else{G.splice(R,1)
}return 
}}}}};
J.reinit=function(){for(var C in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[C]
}OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{});
delete OpenAjax._subscriptions;
OpenAjax._subscriptions={c:{},s:[]};
delete OpenAjax._cleanup;
OpenAjax._cleanup=[];
OpenAjax._subIndex=0;
OpenAjax._pubDepth=0
}
};
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{})
}}});