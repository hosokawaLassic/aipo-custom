dojo._xdResourceLoaded({depends:[["provide","dojox.collections.ArrayList"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.ArrayList"]){B._hasResource["dojox.collections.ArrayList"]=true;
B.provide("dojox.collections.ArrayList");
B.require("dojox.collections._base");
dojox.collections.ArrayList=function(D){var A=[];
if(D){A=A.concat(D)
}this.count=A.length;
this.add=function(C){A.push(C);
this.count=A.length
};
this.addRange=function(H){if(H.getIterator){var C=H.getIterator();
while(!C.atEnd()){this.add(C.get())
}this.count=A.length
}else{for(var G=0;
G<H.length;
G++){A.push(H[G])
}this.count=A.length
}};
this.clear=function(){A.splice(0,A.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(A)
};
this.contains=function(C){for(var F=0;
F<A.length;
F++){if(A[F]==C){return true
}}return false
};
this.forEach=function(C,F){B.forEach(A,C,F)
};
this.getIterator=function(){return new dojox.collections.Iterator(A)
};
this.indexOf=function(C){for(var F=0;
F<A.length;
F++){if(A[F]==C){return F
}}return -1
};
this.insert=function(F,C){A.splice(F,0,C);
this.count=A.length
};
this.item=function(C){return A[C]
};
this.remove=function(C){var F=this.indexOf(C);
if(F>=0){A.splice(F,1)
}this.count=A.length
};
this.removeAt=function(C){A.splice(C,1);
this.count=A.length
};
this.reverse=function(){A.reverse()
};
this.sort=function(C){if(C){A.sort(C)
}else{A.sort()
}};
this.setByIndex=function(F,C){A[F]=C;
this.count=A.length
};
this.toArray=function(){return[].concat(A)
};
this.toString=function(C){return A.join((C||","))
}
}
}}});