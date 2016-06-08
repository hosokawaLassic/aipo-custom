if(!dojo._hasResource["dojox.encoding.splay"]){dojo._hasResource["dojox.encoding.splay"]=true;
dojo.provide("dojox.encoding.splay");
dojox.encoding.Splay=function(B){this.up=new Array(2*B+1);
this.left=new Array(B);
this.right=new Array(B);
this.reset()
};
dojo.extend(dojox.encoding.Splay,{reset:function(){for(var B=1;
B<this.up.length;
this.up[B]=Math.floor((B-1)/2),++B){}for(var B=0;
B<this.left.length;
this.left[B]=2*B+1,this.right[B]=2*B+2,++B){}},splay:function(I){var J=I+this.left.length;
do{var G=this.up[J];
if(G){var H=this.up[G];
var F=this.left[H];
if(G==F){F=this.right[H];
this.right[H]=J
}else{this.left[H]=J
}this[J==this.left[G]?"left":"right"][G]=F;
this.up[J]=H;
this.up[F]=G;
J=H
}else{J=G
}}while(J)
},encode:function(H,G){var I=[],J=H+this.left.length;
do{I.push(this.right[this.up[J]]==J);
J=this.up[J]
}while(J);
this.splay(H);
var F=I.length;
while(I.length){G.putBits(I.pop()?1:0,1)
}return F
},decode:function(D){var C=0;
do{C=this[D.getBits(1)?"right":"left"][C]
}while(C<this.left.length);
C-=this.left.length;
this.splay(C);
return C
}})
};