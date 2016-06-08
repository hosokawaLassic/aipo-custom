if(!dojo._hasResource["dojox.color.Generator"]){dojo._hasResource["dojox.color.Generator"]=true;
dojo.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var J=dojox.color;
var F=function(B,A){if(!B){console.warn("dojox.color.Generator::",A,": no base color was passed. ",B);
return null
}if(!B.toHsv){B=new J.Color(B)
}return B
};
var H=function(A,C,N){var M=[];
var E,D=(C-N)/A,B=C;
for(E=0;
E<A;
E++,B-=D){M.push(B)
}return M
};
var I=function(Q,O,C){var D=C.length-1,A=[],R,E,B;
for(var P=0;
P<O;
P++){if(P<C.length){R=Q.r+(255-Q.r)*C[P],E=Q.g+(255-Q.g)*C[P],B=Q.b+(255-Q.b)*C[P];
A.push(new J.Color({r:R,g:E,b:B}))
}else{if(P==C.length){A.push(Q)
}else{if(D<0){D=C.length-1
}R=Q.r*(1-C[D]),E=Q.g*(1-C[D]),B=Q.b*(1-C[D--]);
A.push(new J.Color({r:R,g:E,b:B}))
}}}return A
};
var G=function(D,L,E){var B=[];
for(var A=0;
A<D[0].length;
A++){for(var C=0;
C<D.length;
C++){B.push(D[C][A])
}}B.length=L;
return B
};
this.analogous=function(Q){Q=dojo.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},Q||{});
var T=F(Q.base,"analogous");
if(!T){return[]
}var P=Q.num,E=T.toHsv();
var A=Q.series+1,C=Math.ceil(P/A);
var D=H(Math.floor(C/2),Q.high,Q.low);
var S=[],B=E.h-(Q.angle*(Q.series/2));
for(var R=0;
R<A;
R++,B+=Q.angle){if(B<0){B+=360
}if(B>=360){B-=360
}S.push(I(J.fromHsv({h:B,s:E.s,v:E.v}),C,D))
}return G(S,P,Q.order)
};
this.monochromatic=function(B){B=dojo.mixin({num:32,high:0.5,low:0.15},B||{});
var A=F(B.base,"monochromatic");
if(!A){return[]
}var D=H(Math.floor(B.num/2),B.high,B.low);
var C=I(A,B.num,D);
return C
};
this.triadic=function(X){X=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},X||{});
var Z=F(X.base,"triadic");
if(!Z){return[]
}var W=X.num,A=3,E=Math.ceil(W/A),U=H(Math.floor(E/2),X.high,X.low);
var Y=[],V=Z.toHsv();
var S=V.h+57,T=V.h-157;
if(S>360){S-=360
}if(T<0){T+=360
}var B=(V.s>=20)?V.s-10:V.s+10;
var C=(V.s>=95)?V.s-5:V.s+5;
var D=(V.v>=70)?V.v-30:V.v+30;
Y.push(I(dojox.color.fromHsv({h:S,s:B,v:V.v}),E,U));
Y.push(I(Z,E,U));
Y.push(I(dojox.color.fromHsv({h:T,s:C,v:D}),E,U));
return G(Y,W,X.order)
};
this.complementary=function(O){O=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},O||{});
var Q=F(O.base,"complimentary");
if(!Q){return[]
}var E=O.num,A=2,B=Math.ceil(E/A),C=H(Math.floor(B/2),O.high,O.low);
var P=[],D=Q.toHsv();
var R=(D.h+120)%360;
P.push(I(Q,B,C));
P.push(I(dojox.color.fromHsv({h:R,s:D.s,v:D.v}),B,C));
return G(P,E,O.order)
};
this.splitComplementary=function(R){R=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},R||{});
var T=F(R.base,"splitComplementary");
if(!T){return[]
}var Q=R.num,A=3,C=Math.ceil(Q/A),D=H(Math.floor(C/2),R.high,R.low);
var S=[],E=T.toHsv();
var U=(E.h+120)%360;
var V=U-R.angle,B=(U+R.angle)%360;
if(V<0){V+=360
}S.push(I(T,C,D));
S.push(I(dojox.color.fromHsv({h:V,s:E.s,v:E.v}),C,D));
S.push(I(dojox.color.fromHsv({h:B,s:E.s,v:E.v}),C,D));
return G(S,Q,R.order)
};
this.compound=function(d){d=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},d||{});
var f=F(d.base,"compound");
if(!f){return[]
}var c=d.num,A=4,V=Math.ceil(c/A),Z=H(Math.floor(V/2),d.high,d.low);
var e=[],b=f.toHsv();
var a=(b.h+120)%360;
var W=(b.h+d.angle)%360,X=a-d.angle,Y=a-(d.angle/2);
if(X<0){X+=360
}if(Y<0){Y+=360
}var B=(b.s>=90&&b.s<=100)?b.s-10:b.s+10;
var C=(b.s<=35)?b.s+25:b.s-25;
var D=b.v-20;
var E=b.v;
e.push(I(f,V,Z));
e.push(I(dojox.color.fromHsv({h:W,s:B,v:D}),V,Z));
e.push(I(dojox.color.fromHsv({h:X,s:B,v:D}),V,Z));
e.push(I(dojox.color.fromHsv({h:Y,s:C,v:E}),V,Z));
return G(e,c,d.order)
};
this.shades=function(C){C=dojo.mixin({num:32,high:1.5,low:0.5},C||{});
var A=F(C.base,"shades");
if(!A){return[]
}var E=C.num,N=A.toHsv();
var B=(C.high-C.low)/E,P=C.low;
var O=[];
for(var D=0;
D<E;
D++,P+=B){O.push(J.fromHsv({h:N.h,s:N.s,v:Math.min(Math.round(N.v*P),100)}))
}console.log("generated color list from shades: ",O);
return O
}
})()
};