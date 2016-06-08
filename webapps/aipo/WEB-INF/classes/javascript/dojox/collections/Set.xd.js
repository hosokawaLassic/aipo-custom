dojo._xdResourceLoaded({depends:[["provide","dojox.collections.Set"],["require","dojox.collections.ArrayList"]],defineResource:function(B){if(!B._hasResource["dojox.collections.Set"]){B._hasResource["dojox.collections.Set"]=true;
B.provide("dojox.collections.Set");
B.require("dojox.collections.ArrayList");
(function(){var A=dojox.collections;
A.Set=new (function(){function D(C){if(C.constructor==Array){return new dojox.collections.ArrayList(C)
}return C
}this.union=function(K,C){K=D(K);
C=D(C);
var L=new dojox.collections.ArrayList(K.toArray());
var I=C.getIterator();
while(!I.atEnd()){var J=I.get();
if(!L.contains(J)){L.add(J)
}}return L
};
this.intersection=function(K,C){K=D(K);
C=D(C);
var L=new dojox.collections.ArrayList();
var I=C.getIterator();
while(!I.atEnd()){var J=I.get();
if(K.contains(J)){L.add(J)
}}return L
};
this.difference=function(K,C){K=D(K);
C=D(C);
var L=new dojox.collections.ArrayList();
var I=K.getIterator();
while(!I.atEnd()){var J=I.get();
if(!C.contains(J)){L.add(J)
}}return L
};
this.isSubSet=function(H,C){H=D(H);
C=D(C);
var G=H.getIterator();
while(!G.atEnd()){if(!C.contains(G.get())){return false
}}return true
};
this.isSuperSet=function(H,C){H=D(H);
C=D(C);
var G=C.getIterator();
while(!G.atEnd()){if(!H.contains(G.get())){return false
}}return true
}
})()
})()
}}});