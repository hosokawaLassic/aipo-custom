if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
dojo.require("dojo._base.array");
dojo.require("dojo._base.lang");
dojo.Color=function(B){if(B){this.setColor(B)
}};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(G,H,F,J){var I=this;
I.r=G;
I.g=H;
I.b=F;
I.a=J
},setColor:function(C){var D=dojo;
if(D.isString(C)){D.colorFromString(C,this)
}else{if(D.isArray(C)){D.colorFromArray(C,this)
}else{this._set(C.r,C.g,C.b,C.a);
if(!(C instanceof D.Color)){this.sanitize()
}}}return this
},sanitize:function(){return this
},toRgb:function(){var B=this;
return[B.r,B.g,B.b]
},toRgba:function(){var B=this;
return[B.r,B.g,B.b,B.a]
},toHex:function(){var B=dojo.map(["r","g","b"],function(D){var A=this[D].toString(16);
return A.length<2?"0"+A:A
},this);
return"#"+B.join("")
},toCss:function(D){var E=this,F=E.r+", "+E.g+", "+E.b;
return(D?"rgba("+F+", "+E.a:"rgb("+F)+")"
},toString:function(){return this.toCss(true)
}});
dojo.blendColors=function(H,G,K,J){var I=dojo,L=J||new dojo.Color();
I.forEach(["r","g","b","a"],function(A){L[A]=H[A]+(G[A]-H[A])*K;
if(A!="a"){L[A]=Math.round(L[A])
}});
return L.sanitize()
};
dojo.colorFromRgb=function(F,E){var D=F.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return D&&dojo.colorFromArray(D[1].split(/\s*,\s*/),E)
};
dojo.colorFromHex=function(L,I){var H=dojo,K=I||new H.Color(),J=(L.length==4)?4:8,G=(1<<J)-1;
L=Number("0x"+L.substr(1));
if(isNaN(L)){return null
}H.forEach(["b","g","r"],function(B){var A=L&G;
L>>=J;
K[B]=J==4?17*A:A
});
K.a=1;
return K
};
dojo.colorFromArray=function(D,E){var F=E||new dojo.Color();
F._set(Number(D[0]),Number(D[1]),Number(D[2]),Number(D[3]));
if(isNaN(F.a)){F.a=1
}return F.sanitize()
};
dojo.colorFromString=function(E,F){var D=dojo.Color.named[E];
return D&&dojo.colorFromArray(D,F)||dojo.colorFromRgb(E,F)||dojo.colorFromHex(E,F)
}
};