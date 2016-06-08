if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.array");
(function(){var C=dojo;
var D=function(A){A.constructor=dojo.NodeList;
dojo._mixin(A,dojo.NodeList.prototype);
return A
};
dojo.NodeList=function(){return D(Array.apply(null,arguments))
};
dojo.NodeList._wrap=D;
dojo.extend(dojo.NodeList,{slice:function(){var A=dojo._toArray(arguments);
return D(A.slice.apply(this,A))
},splice:function(){var A=dojo._toArray(arguments);
return D(A.splice.apply(this,A))
},concat:function(){var A=dojo._toArray(arguments,0,[this]);
return D(A.concat.apply([],A))
},indexOf:function(A,B){return C.indexOf(this,A,B)
},lastIndexOf:function(){return C.lastIndexOf.apply(C,C._toArray(arguments,0,[this]))
},every:function(A,B){return C.every(this,A,B)
},some:function(A,B){return C.some(this,A,B)
},map:function(B,A){return C.map(this,B,A,C.NodeList)
},forEach:function(A,B){C.forEach(this,A,B);
return this
},coords:function(){return C.map(this,C.coords)
},style:function(){var A=C._toArray(arguments,0,[null]);
var B=this.map(function(F){A[0]=F;
return C.style.apply(C,A)
});
return(arguments.length>1)?this:B
},styles:function(){C.deprecated("NodeList.styles","use NodeList.style instead","1.1");
return this.style.apply(this,arguments)
},addClass:function(A){this.forEach(function(B){C.addClass(B,A)
});
return this
},removeClass:function(A){this.forEach(function(B){C.removeClass(B,A)
});
return this
},place:function(B,G){var A=C.query(B)[0];
G=G||"last";
for(var H=0;
H<this.length;
H++){C.place(this[H],A,G)
}return this
},connect:function(F,B,A){this.forEach(function(E){C.connect(E,F,B,A)
});
return this
},orphan:function(A){var B=(A)?C._filterQueryResult(this,A):this;
B.forEach(function(F){if(F.parentNode){F.parentNode.removeChild(F)
}});
return B
},adopt:function(B,F){var A=this[0];
return C.query(B).forEach(function(E){C.place(E,A,(F||"last"))
})
},query:function(A){A=A||"";
var B=C.NodeList();
this.forEach(function(F){C.query(A,F).forEach(function(E){if(typeof E!="undefined"){B.push(E)
}})
});
return B
},filter:function(A){var J=this;
var I=arguments;
var B=C.NodeList();
var H=function(E){if(typeof E!="undefined"){B.push(E)
}};
if(C.isString(A)){J=C._filterQueryResult(this,I[0]);
if(I.length==1){return J
}C.forEach(C.filter(J,I[1],I[2]),H);
return B
}C.forEach(C.filter(J,I[0],I[1]),H);
return B
},addContent:function(A,H){var G=C.doc.createElement("span");
if(C.isString(A)){G.innerHTML=A
}else{G.appendChild(A)
}var B=((H=="first")||(H=="after"))?"lastChild":"firstChild";
this.forEach(function(E){var F=G.cloneNode(true);
while(F[B]){C.place(F[B],E,H)
}});
return this
}});
C.forEach(["blur","click","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],function(B){var A="on"+B;
dojo.NodeList.prototype[A]=function(G,H){return this.connect(A,G,H)
}
})
})()
};