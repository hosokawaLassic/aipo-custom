if(!window.OpenAjax){OpenAjax=new function(){var L=true;
var H=false;
var J=window;
var I;
var G="org.openajax.hub.";
var K={};
this.hub=K;
K.implementer="http://openajax.org";
K.implVersion="0.6";
K.specVersion="0.6";
K.implExtraData={};
var I={};
K.libraries=I;
K.registerLibrary=function(A,B,C,D){I[A]={prefix:A,namespaceURI:B,version:C,extraData:D};
this.publish(G+"registerLibrary",I[A])
};
K.unregisterLibrary=function(A){this.publish(G+"unregisterLibrary",I[A]);
delete I[A]
};
K._subscriptions={c:{},s:[]};
K._cleanup=[];
K._subIndex=0;
K._pubDepth=0;
K.subscribe=function(F,O,B,C,D){if(!B){B=window
}var A=F+"."+this._subIndex;
var E={scope:B,cb:O,fcb:D,data:C,sid:this._subIndex++,hdl:A};
var P=F.split(".");
this._subscribe(this._subscriptions,P,0,E);
return A
};
K.publish=function(D,B){var A=D.split(".");
this._pubDepth++;
this._publish(this._subscriptions,A,0,D,B);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var C=0;
C<this._cleanup.length;
C++){this.unsubscribe(this._cleanup[C].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
K.unsubscribe=function(B){var A=B.split(".");
var C=A.pop();
this._unsubscribe(this._subscriptions,A,0,C)
};
K._subscribe=function(E,A,D,B){var C=A[D];
if(D==A.length){E.s.push(B)
}else{if(typeof E.c=="undefined"){E.c={}
}if(typeof E.c[C]=="undefined"){E.c[C]={c:{},s:[]};
this._subscribe(E.c[C],A,D+1,B)
}else{this._subscribe(E.c[C],A,D+1,B)
}}};
K._publish=function(A,B,T,Z,Y){if(typeof A!="undefined"){var X;
if(T==B.length){X=A
}else{this._publish(A.c[B[T]],B,T+1,Z,Y);
this._publish(A.c["*"],B,T+1,Z,Y);
X=A.c["**"]
}if(typeof X!="undefined"){var F=X.s;
var C=F.length;
for(var V=0;
V<C;
V++){if(F[V].cb){var D=F[V].scope;
var W=F[V].cb;
var U=F[V].fcb;
var E=F[V].data;
if(typeof W=="string"){W=D[W]
}if(typeof U=="string"){U=D[U]
}if((!U)||(U.call(D,Z,Y,E))){W.call(D,Z,Y,E)
}}}}}};
K._unsubscribe=function(A,B,F,Q){if(typeof A!="undefined"){if(F<B.length){var R=A.c[B[F]];
this._unsubscribe(R,B,F+1,Q);
if(R.s.length==0){for(var C in R.c){return 
}delete A.c[B[F]]
}return 
}else{var E=A.s;
var D=E.length;
for(var P=0;
P<D;
P++){if(Q==E[P].sid){if(this._pubDepth>0){E[P].cb=null;
this._cleanup.push(E[P])
}else{E.splice(P,1)
}return 
}}}}};
K.reinit=function(){for(var A in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[A]
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
};