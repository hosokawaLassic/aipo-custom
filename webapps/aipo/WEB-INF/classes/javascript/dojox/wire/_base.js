if(!dojo._hasResource["dojox.wire._base"]){dojo._hasResource["dojox.wire._base"]=true;
dojo.provide("dojox.wire._base");
dojox.wire._defaultWireClass="dojox.wire.Wire";
dojox.wire._wireClasses={attribute:"dojox.wire.DataWire",path:"dojox.wire.XmlWire",children:"dojox.wire.CompositeWire",columns:"dojox.wire.TableAdapter",nodes:"dojox.wire.TreeAdapter",segments:"dojox.wire.TextAdapter"};
dojox.wire.register=function(D,C){if(!D||!C){return 
}if(dojox.wire._wireClasses[C]){return 
}dojox.wire._wireClasses[C]=D
};
dojox.wire._getClass=function(B){dojo.require(B);
return dojo.getObject(B)
};
dojox.wire.create=function(D){if(!D){D={}
}var E=D.wireClass;
if(E){if(dojo.isString(E)){E=dojox.wire._getClass(E)
}}else{for(var F in D){if(!D[F]){continue
}E=dojox.wire._wireClasses[F];
if(E){if(dojo.isString(E)){E=dojox.wire._getClass(E);
dojox.wire._wireClasses[F]=E
}break
}}}if(!E){if(dojo.isString(dojox.wire._defaultWireClass)){dojox.wire._defaultWireClass=dojox.wire._getClass(dojox.wire._defaultWireClass)
}E=dojox.wire._defaultWireClass
}return new E(D)
};
dojox.wire.isWire=function(B){return(B&&B._wireClass)
};
dojox.wire.transfer=function(H,G,J,F){if(!H||!G){return 
}if(!dojox.wire.isWire(H)){H=dojox.wire.create(H)
}if(!dojox.wire.isWire(G)){G=dojox.wire.create(G)
}var I=H.getValue(J);
G.setValue(I,(F||J))
};
dojox.wire.connect=function(H,G,F){if(!H||!G||!F){return 
}var E={topic:H.topic};
if(H.topic){E.handle=dojo.subscribe(H.topic,function(){dojox.wire.transfer(G,F,arguments)
})
}else{if(H.event){E.handle=dojo.connect(H.scope,H.event,function(){dojox.wire.transfer(G,F,arguments)
})
}}return E
};
dojox.wire.disconnect=function(B){if(!B||!B.handle){return 
}if(B.topic){dojo.unsubscribe(B.handle)
}else{dojo.disconnect(B.handle)
}}
};