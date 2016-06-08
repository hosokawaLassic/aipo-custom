if(!dojo._hasResource["dojox.collections._base"]){dojo._hasResource["dojox.collections._base"]=true;
dojo.provide("dojox.collections._base");
dojox.collections.DictionaryEntry=function(D,C){this.key=D;
this.value=C;
this.valueOf=function(){return this.value
};
this.toString=function(){return String(this.value)
}
};
dojox.collections.Iterator=function(F){var E=F;
var D=0;
this.element=E[D]||null;
this.atEnd=function(){return(D>=E.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=E[D++];
return this.element
};
this.map=function(A,B){return dojo.map(E,A,B)
};
this.reset=function(){D=0;
this.element=E[D]
}
};
dojox.collections.DictionaryIterator=function(G){var J=[];
var I={};
for(var H in G){if(!I[H]){J.push(G[H])
}}var F=0;
this.element=J[F]||null;
this.atEnd=function(){return(F>=J.length)
};
this.get=function(){if(this.atEnd()){return null
}this.element=J[F++];
return this.element
};
this.map=function(A,B){return dojo.map(J,A,B)
};
this.reset=function(){F=0;
this.element=J[F]
}
}
};