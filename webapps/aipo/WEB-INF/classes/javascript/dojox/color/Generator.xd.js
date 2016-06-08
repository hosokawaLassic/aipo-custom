dojo._xdResourceLoaded({depends:[["provide","dojox.color.Generator"]],defineResource:function(B){if(!B._hasResource["dojox.color.Generator"]){B._hasResource["dojox.color.Generator"]=true;
B.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var I=dojox.color;
var J=function(D,C){if(!D){console.warn("dojox.color.Generator::",C,": no base color was passed. ",D);
return null
}if(!D.toHsv){D=new I.Color(D)
}return D
};
var G=function(P,D,O){var N=[];
var F,E=(D-O)/P,C=D;
for(F=0;
F<P;
F++,C-=E){N.push(C)
}return N
};
var H=function(S,Q,E){var F=E.length-1,C=[],T,P,D;
for(var R=0;
R<Q;
R++){if(R<E.length){T=S.r+(255-S.r)*E[R],P=S.g+(255-S.g)*E[R],D=S.b+(255-S.b)*E[R];
C.push(new I.Color({r:T,g:P,b:D}))
}else{if(R==E.length){C.push(S)
}else{if(F<0){F=E.length-1
}T=S.r*(1-E[F]),P=S.g*(1-E[F]),D=S.b*(1-E[F--]);
C.push(new I.Color({r:T,g:P,b:D}))
}}}return C
};
var A=function(F,N,M){var D=[];
for(var C=0;
C<F[0].length;
C++){for(var E=0;
E<F.length;
E++){D.push(F[E][C])
}}D.length=N;
return D
};
this.analogous=function(S){S=B.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},S||{});
var V=J(S.base,"analogous");
if(!V){return[]
}var R=S.num,Q=V.toHsv();
var C=S.series+1,E=Math.ceil(R/C);
var F=G(Math.floor(E/2),S.high,S.low);
var U=[],D=Q.h-(S.angle*(S.series/2));
for(var T=0;
T<C;
T++,D+=S.angle){if(D<0){D+=360
}if(D>=360){D-=360
}U.push(H(I.fromHsv({h:D,s:Q.s,v:Q.v}),E,F))
}return A(U,R,S.order)
};
this.monochromatic=function(D){D=B.mixin({num:32,high:0.5,low:0.15},D||{});
var C=J(D.base,"monochromatic");
if(!C){return[]
}var F=G(Math.floor(D.num/2),D.high,D.low);
var E=H(C,D.num,F);
return E
};
this.triadic=function(Z){Z=B.mixin({num:32,order:"bottom up",high:0.5,low:0.15},Z||{});
var b=J(Z.base,"triadic");
if(!b){return[]
}var Y=Z.num,C=3,T=Math.ceil(Y/C),W=G(Math.floor(T/2),Z.high,Z.low);
var a=[],X=b.toHsv();
var U=X.h+57,V=X.h-157;
if(U>360){U-=360
}if(V<0){V+=360
}var D=(X.s>=20)?X.s-10:X.s+10;
var E=(X.s>=95)?X.s-5:X.s+5;
var F=(X.v>=70)?X.v-30:X.v+30;
a.push(H(dojox.color.fromHsv({h:U,s:D,v:X.v}),T,W));
a.push(H(b,T,W));
a.push(H(dojox.color.fromHsv({h:V,s:E,v:F}),T,W));
return A(a,Y,Z.order)
};
this.complementary=function(Q){Q=B.mixin({num:32,order:"bottom up",high:0.5,low:0.15},Q||{});
var S=J(Q.base,"complimentary");
if(!S){return[]
}var P=Q.num,C=2,D=Math.ceil(P/C),E=G(Math.floor(D/2),Q.high,Q.low);
var R=[],F=S.toHsv();
var T=(F.h+120)%360;
R.push(H(S,D,E));
R.push(H(dojox.color.fromHsv({h:T,s:F.s,v:F.v}),D,E));
return A(R,P,Q.order)
};
this.splitComplementary=function(T){T=B.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},T||{});
var V=J(T.base,"splitComplementary");
if(!V){return[]
}var S=T.num,C=3,E=Math.ceil(S/C),F=G(Math.floor(E/2),T.high,T.low);
var U=[],R=V.toHsv();
var W=(R.h+120)%360;
var X=W-T.angle,D=(W+T.angle)%360;
if(X<0){X+=360
}U.push(H(V,E,F));
U.push(H(dojox.color.fromHsv({h:X,s:R.s,v:R.v}),E,F));
U.push(H(dojox.color.fromHsv({h:D,s:R.s,v:R.v}),E,F));
return A(U,S,T.order)
};
this.compound=function(f){f=B.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},f||{});
var h=J(f.base,"compound");
if(!h){return[]
}var e=f.num,C=4,X=Math.ceil(e/C),b=G(Math.floor(X/2),f.high,f.low);
var g=[],d=h.toHsv();
var c=(d.h+120)%360;
var Y=(d.h+f.angle)%360,Z=c-f.angle,a=c-(f.angle/2);
if(Z<0){Z+=360
}if(a<0){a+=360
}var D=(d.s>=90&&d.s<=100)?d.s-10:d.s+10;
var E=(d.s<=35)?d.s+25:d.s-25;
var F=d.v-20;
var W=d.v;
g.push(H(h,X,b));
g.push(H(dojox.color.fromHsv({h:Y,s:D,v:F}),X,b));
g.push(H(dojox.color.fromHsv({h:Z,s:D,v:F}),X,b));
g.push(H(dojox.color.fromHsv({h:a,s:E,v:W}),X,b));
return A(g,e,f.order)
};
this.shades=function(D){D=B.mixin({num:32,high:1.5,low:0.5},D||{});
var R=J(D.base,"shades");
if(!R){return[]
}var F=D.num,O=R.toHsv();
var C=(D.high-D.low)/F,Q=D.low;
var P=[];
for(var E=0;
E<F;
E++,Q+=C){P.push(I.fromHsv({h:O.h,s:O.s,v:Math.min(Math.round(O.v*Q),100)}))
}console.log("generated color list from shades: ",P);
return P
}
})()
}}});