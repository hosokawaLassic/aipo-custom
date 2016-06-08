if(!dojo._hasResource["dojox.encoding.lzw"]){dojo._hasResource["dojox.encoding.lzw"]=true;
dojo.provide("dojox.encoding.lzw");
(function(){var B=function(F){var E=1;
for(var A=2;
F>=A;
A<<=1,++E){}return E
};
dojox.encoding.lzw.Encoder=function(A){this.size=A;
this.init()
};
dojo.extend(dojox.encoding.lzw.Encoder,{init:function(){this.dict={};
for(var A=0;
A<this.size;
++A){this.dict[String.fromCharCode(A)]=A
}this.width=B(this.code=this.size);
this.p=""
},encode:function(I,G){var A=String.fromCharCode(I),H=this.p+A,J=0;
if(H in this.dict){this.p=H;
return J
}G.putBits(this.dict[this.p],this.width);
if((this.code&(this.code+1))==0){G.putBits(this.code++,J=this.width++)
}this.dict[H]=this.code++;
this.p=A;
return J+this.width
},flush:function(A){if(this.p.length==0){return 0
}A.putBits(this.dict[this.p],this.width);
this.p="";
return this.width
}});
dojox.encoding.lzw.Decoder=function(A){this.size=A;
this.init()
};
dojo.extend(dojox.encoding.lzw.Decoder,{init:function(){this.codes=new Array(this.size);
for(var A=0;
A<this.size;
++A){this.codes[A]=String.fromCharCode(A)
}this.width=B(this.size);
this.p=-1
},decode:function(F){var A=F.getBits(this.width),G;
if(A<this.codes.length){G=this.codes[A];
if(this.p>=0){this.codes.push(this.codes[this.p]+G.substr(0,1))
}}else{if((A&(A+1))==0){this.codes.push("");
++this.width;
return""
}var H=this.codes[this.p];
G=H+H.substr(0,1);
this.codes.push(G)
}this.p=A;
return G
}})
})()
};