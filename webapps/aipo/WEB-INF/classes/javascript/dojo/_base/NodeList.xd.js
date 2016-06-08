dojo._xdResourceLoaded({depends:[["provide","dojo._base.NodeList"],["require","dojo._base.lang"],["require","dojo._base.array"]],defineResource:function(B){if(!B._hasResource["dojo._base.NodeList"]){B._hasResource["dojo._base.NodeList"]=true;
B.provide("dojo._base.NodeList");
B.require("dojo._base.lang");
B.require("dojo._base.array");
(function(){var D=B;
var A=function(C){C.constructor=B.NodeList;
B._mixin(C,B.NodeList.prototype);
return C
};
B.NodeList=function(){return A(Array.apply(null,arguments))
};
B.NodeList._wrap=A;
B.extend(B.NodeList,{slice:function(){var C=B._toArray(arguments);
return A(C.slice.apply(this,C))
},splice:function(){var C=B._toArray(arguments);
return A(C.splice.apply(this,C))
},concat:function(){var C=B._toArray(arguments,0,[this]);
return A(C.concat.apply([],C))
},indexOf:function(C,F){return D.indexOf(this,C,F)
},lastIndexOf:function(){return D.lastIndexOf.apply(D,D._toArray(arguments,0,[this]))
},every:function(C,F){return D.every(this,C,F)
},some:function(C,F){return D.some(this,C,F)
},map:function(F,C){return D.map(this,F,C,D.NodeList)
},forEach:function(C,F){D.forEach(this,C,F);
return this
},coords:function(){return D.map(this,D.coords)
},style:function(){var C=D._toArray(arguments,0,[null]);
var F=this.map(function(E){C[0]=E;
return D.style.apply(D,C)
});
return(arguments.length>1)?this:F
},styles:function(){D.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(C){this.forEach(function(F){D.addClass(F,C)
});
return this
},removeClass:function(C){this.forEach(function(F){D.removeClass(F,C)
});
return this
},place:function(H,I){var C=D.query(H)[0];
I=I||"last";
for(var J=0;
J<this.length;
J++){D.place(this[J],C,I)
}return this
},connect:function(H,G,C){this.forEach(function(E){D.connect(E,H,G,C)
});
return this
},orphan:function(C){var F=(C)?D._filterQueryResult(this,C):this;
F.forEach(function(E){if(E.parentNode){E.parentNode.removeChild(E)
}});
return F
},adopt:function(G,H){var C=this[0];
return D.query(G).forEach(function(E){D.place(E,C,(H||"last"))
})
},query:function(C){C=C||"";
var F=D.NodeList();
this.forEach(function(E){D.query(C,E).forEach(function(H){if(typeof H!="undefined"){F.push(H)
}})
});
return F
},filter:function(C){var L=this;
var K=arguments;
var I=D.NodeList();
var J=function(E){if(typeof E!="undefined"){I.push(E)
}};
if(D.isString(C)){L=D._filterQueryResult(this,K[0]);
if(K.length==1){return L
}D.forEach(D.filter(L,K[1],K[2]),J);
return I
}D.forEach(D.filter(L,K[0],K[1]),J);
return I
},addContent:function(C,J){var I=D.doc.createElement("span");
if(D.isString(C)){I.innerHTML=C
}else{I.appendChild(C)
}var H=((J=="first")||(J=="after"))?"lastChild":"firstChild";
this.forEach(function(E){var F=I.cloneNode(true);
while(F[H]){D.place(F[H],E,J)
}});
return this
}});
D.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(F){var C="on"+F;
B.NodeList.prototype[C]=function(E,H){return this.connect(C,E,H)
}
})
})()
}}});