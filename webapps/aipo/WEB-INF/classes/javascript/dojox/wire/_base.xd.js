dojo._xdResourceLoaded({depends:[["provide","dojox.wire._base"]],defineResource:function(B){if(!B._hasResource["dojox.wire._base"]){B._hasResource["dojox.wire._base"]=true;
B.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(A,D){if(!A||!D){return 
}if(dojox.wire._wireClasses[D]){return 
}dojox.wire._wireClasses[D]=A
};
dojox.wire._getClass=function(A){B.require(A);
return B.getObject(A)
};
dojox.wire.create=function(F){if(!F){F={}
}var A=F.wireClass;
if(A){if(B.isString(A)){A=dojox.wire._getClass(A)
}}else{for(var E in F){if(!F[E]){continue
}A=dojox.wire._wireClasses[E];
if(A){if(B.isString(A)){A=dojox.wire._getClass(A);
dojox.wire._wireClasses[E]=A
}break
}}}if(!A){if(B.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}A=dojox.wire._defaultWireClass
}return new A(F)
};
dojox.wire.isWire=function(A){return(A&&A._wireClass)
};
dojox.wire.transfer=function(G,A,I,J){if(!G||!A){return 
}if(!dojox.wire.isWire(G)){G=dojox.wire.create(G)
}if(!dojox.wire.isWire(A)){A=dojox.wire.create(A)
}var H=G.getValue(I);
A.setValue(H,(J||I))
};
dojox.wire.connect=function(G,F,A){if(!G||!F||!A){return 
}var H={topic:G.topic};
if(G.topic){H.handle=B.subscribe(G.topic,function(){dojox.wire.transfer(F,A,arguments)
})
}else{if(G.event){H.handle=B.connect(G.scope,G.event,function(){dojox.wire.transfer(F,A,arguments)
})
}}return H
};
dojox.wire.disconnect=function(A){if(!A||!A.handle){return 
}if(A.topic){B.unsubscribe(A.handle)
}else{B.disconnect(A.handle)
}}
}}});