if(!dojo._hasResource["dojox.string.Builder"]){dojo._hasResource["dojox.string.Builder"]=true;
dojo.provide("dojox.string.Builder");
(function(){dojox.string.Builder=function(A){this.b=dojo.isIE?[]:"";
if(A){this.append(A)
}};
var B={append:function(A){return this.appendArray(dojo._toArray(arguments))
},concat:function(A){return this.append(A)
},appendArray:function(A){this.b=String.prototype.concat.apply(this.b,A);
return this
},clear:function(){this._clear();
this.length=0;
return this
},replace:function(F,E){var A=this.toString();
A=A.replace(F,E);
this._reset(A);
this.length=A.length;
return this
},remove:function(A,F){if(F==0){return this
}var E=this.toString();
this.clear();
if(A>0){this.append(E.substring(0,A))
}if(A+F<E.length){this.append(E.substring(A+F))
}return this
},insert:function(F,A){var E=this.toString();
this.clear();
if(F==0){this.append(A);
this.append(E);
return this
}else{this.append(E.substring(0,F));
this.append(A);
this.append(E.substring(F))
}return this
},toString:function(){return this.b
},_clear:function(){this.b=""
},_reset:function(A){this.b=A
}};
if(dojo.isIE){dojo.mixin(B,{toString:function(){return this.b.join("")
},appendArray:function(A){this.b=this.b.concat(A);
return this
},_clear:function(){this.b=[]
},_reset:function(A){this.b=[A]
}})
}dojo.extend(dojox.string.Builder,B)
})()
};