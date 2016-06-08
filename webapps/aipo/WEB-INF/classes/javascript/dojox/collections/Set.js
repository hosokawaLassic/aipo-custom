if(!dojo._hasResource["dojox.collections.Set"]){dojo._hasResource["dojox.collections.Set"]=true;
dojo.provide("dojox.collections.Set");
dojo.require("dojox.collections.ArrayList");
(function(){var B=dojox.collections;
B.Set=new (function(){function A(D){if(D.constructor==Array){return new dojox.collections.ArrayList(D)
}return D
}this.union=function(K,H){K=A(K);
H=A(H);
var L=new dojox.collections.ArrayList(K.toArray());
var I=H.getIterator();
while(!I.atEnd()){var J=I.get();
if(!L.contains(J)){L.add(J)
}}return L
};
this.intersection=function(K,H){K=A(K);
H=A(H);
var L=new dojox.collections.ArrayList();
var I=H.getIterator();
while(!I.atEnd()){var J=I.get();
if(K.contains(J)){L.add(J)
}}return L
};
this.difference=function(K,H){K=A(K);
H=A(H);
var L=new dojox.collections.ArrayList();
var I=K.getIterator();
while(!I.atEnd()){var J=I.get();
if(!H.contains(J)){L.add(J)
}}return L
};
this.isSubSet=function(H,F){H=A(H);
F=A(F);
var G=H.getIterator();
while(!G.atEnd()){if(!F.contains(G.get())){return false
}}return true
};
this.isSuperSet=function(H,F){H=A(H);
F=A(F);
var G=F.getIterator();
while(!G.atEnd()){if(!H.contains(G.get())){return false
}}return true
}
})()
})()
};