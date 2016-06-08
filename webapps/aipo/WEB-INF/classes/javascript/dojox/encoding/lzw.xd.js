dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.lzw"]],defineResource:function(B){if(!B._hasResource["dojox.encoding.lzw"]){B._hasResource["dojox.encoding.lzw"]=true;
B.provide("dojox.encoding.lzw");
(function(){var A=function(H){var G=1;
for(var F=2;
H>=F;
F<<=1,++G){}return G
};
dojox.encoding.lzw.Encoder=function(D){this.size=D;
this.init()
};
B.extend(dojox.encoding.lzw.Encoder,{init:function(){this.dict={};
for(var D=0;
D<this.size;
++D){this.dict[String.fromCharCode(D)]=D
}this.width=A(this.code=this.size);
this.p=""
},encode:function(K,I){var H=String.fromCharCode(K),J=this.p+H,L=0;
if(J in this.dict){this.p=J;
return L
}I.putBits(this.dict[this.p],this.width);
if((this.code&(this.code+1))==0){I.putBits(this.code++,L=this.width++)
}this.dict[J]=this.code++;
this.p=H;
return L+this.width
},flush:function(D){if(this.p.length==0){return 0
}D.putBits(this.dict[this.p],this.width);
this.p="";
return this.width
}});
dojox.encoding.lzw.Decoder=function(D){this.size=D;
this.init()
};
B.extend(dojox.encoding.lzw.Decoder,{init:function(){this.codes=new Array(this.size);
for(var D=0;
D<this.size;
++D){this.codes[D]=String.fromCharCode(D)
}this.width=A(this.size);
this.p=-1
},decode:function(H){var G=H.getBits(this.width),I;
if(G<this.codes.length){I=this.codes[G];
if(this.p>=0){this.codes.push(this.codes[this.p]+I.substr(0,1))
}}else{if((G&(G+1))==0){this.codes.push("");
++this.width;
return""
}var J=this.codes[this.p];
I=J+J.substr(0,1);
this.codes.push(I)
}this.p=G;
return I
}})
})()
}}});