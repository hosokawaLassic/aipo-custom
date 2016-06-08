dojo._xdResourceLoaded({depends:[["provide","dojo._base.Color"],["require","dojo._base.array"],["require","dojo._base.lang"]],defineResource:function(B){if(!B._hasResource["dojo._base.Color"]){B._hasResource["dojo._base.Color"]=true;
B.provide("dojo._base.Color");
B.require("dojo._base.array");
B.require("dojo._base.lang");
B.Color=function(A){if(A){this.setColor(A)
}};
B.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
B.extend(B.Color,{r:255,g:255,b:255,a:1,_set:function(A,G,J,I){var H=this;
H.r=A;
H.g=G;
H.b=J;
H.a=I
},setColor:function(D){var A=B;
if(A.isString(D)){A.colorFromString(D,this)
}else{if(A.isArray(D)){A.colorFromArray(D,this)
}else{this._set(D.r,D.g,D.b,D.a);
if(!(D instanceof A.Color)){this.sanitize()
}}}return this
},sanitize:function(){return this
},toRgb:function(){var A=this;
return[A.r,A.g,A.b]
},toRgba:function(){var A=this;
return[A.r,A.g,A.b,A.a]
},toHex:function(){var A=B.map(["r","g","b"],function(F){var E=this[F].toString(16);
return E.length<2?"0"+E:E
},this);
return"#"+A.join("")
},toCss:function(F){var A=this,E=A.r+", "+A.g+", "+A.b;
return(F?"rgba("+E+", "+A.a:"rgb("+E)+")"
},toString:function(){return this.toCss(true)
}});
B.blendColors=function(A,L,J,I){var H=B,K=I||new B.Color();
H.forEach(["r","g","b","a"],function(C){K[C]=A[C]+(L[C]-A[C])*J;
if(C!="a"){K[C]=Math.round(K[C])
}});
return K.sanitize()
};
B.colorFromRgb=function(E,A){var F=E.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return F&&B.colorFromArray(F[1].split(/\s*,\s*/),A)
};
B.colorFromHex=function(K,H){var A=B,J=H||new A.Color(),I=(K.length==4)?4:8,L=(1<<I)-1;
K=Number("0x"+K.substr(1));
if(isNaN(K)){return null
}A.forEach(["b","g","r"],function(D){var C=K&L;
K>>=I;
J[D]=I==4?17*C:C
});
J.a=1;
return J
};
B.colorFromArray=function(F,A){var E=A||new B.Color();
E._set(Number(F[0]),Number(F[1]),Number(F[2]),Number(F[3]));
if(isNaN(E.a)){E.a=1
}return E.sanitize()
};
B.colorFromString=function(A,E){var F=B.Color.named[A];
return F&&B.colorFromArray(F,E)||B.colorFromRgb(A,E)||B.colorFromHex(A,E)
}
}}});