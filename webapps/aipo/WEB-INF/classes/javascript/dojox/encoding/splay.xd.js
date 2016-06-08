dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.splay"]],defineResource:function(B){if(!B._hasResource["dojox.encoding.splay"]){B._hasResource["dojox.encoding.splay"]=true;
B.provide("dojox.encoding.splay");
dojox.encoding.Splay=function(A){this.up=new Array(2*A+1);
this.left=new Array(A);
this.right=new Array(A);
this.reset()
};
B.extend(dojox.encoding.Splay,{reset:function(){for(var A=1;
A<this.up.length;
this.up[A]=Math.floor((A-1)/2),++A){}for(var A=0;
A<this.left.length;
this.left[A]=2*A+1,this.right[A]=2*A+2,++A){}},splay:function(H){var I=H+this.left.length;
do{var A=this.up[I];
if(A){var G=this.up[A];
var J=this.left[G];
if(A==J){J=this.right[G];
this.right[G]=I
}else{this.left[G]=I
}this[I==this.left[A]?"left":"right"][A]=J;
this.up[I]=G;
this.up[J]=A;
I=G
}else{I=A
}}while(I)
},encode:function(G,A){var H=[],I=G+this.left.length;
do{H.push(this.right[this.up[I]]==I);
I=this.up[I]
}while(I);
this.splay(G);
var J=H.length;
while(H.length){A.putBits(H.pop()?1:0,1)
}return J
},decode:function(A){var D=0;
do{D=this[A.getBits(1)?"right":"left"][D]
}while(D<this.left.length);
D-=this.left.length;
this.splay(D);
return D
}})
}}});