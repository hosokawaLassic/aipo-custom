if(!dojo._hasResource["dojox.charting.scaler"]){dojo._hasResource["dojox.charting.scaler"]=true;
dojo.provide("dojox.charting.scaler");
(function(){var D=3;
var E=function(A,B){A=A.toLowerCase();
for(var C=0;
C<B.length;
++C){if(A==B[C]){return true
}}return false
};
var F=function(c,a,X,f,l,A,b){X=dojo.clone(X);
if(!f){if(X.fixUpper=="major"){X.fixUpper="minor"
}if(X.fixLower=="major"){X.fixLower="minor"
}}if(!l){if(X.fixUpper=="minor"){X.fixUpper="micro"
}if(X.fixLower=="minor"){X.fixLower="micro"
}}if(!A){if(X.fixUpper=="micro"){X.fixUpper="none"
}if(X.fixLower=="micro"){X.fixLower="none"
}}var k=E(X.fixLower,["major"])?Math.floor(c/f)*f:E(X.fixLower,["minor"])?Math.floor(c/l)*l:E(X.fixLower,["micro"])?Math.floor(c/A)*unit:c,h=E(X.fixUpper,["major"])?Math.ceil(a/f)*f:E(X.fixUpper,["minor"])?Math.ceil(a/l)*l:E(X.fixUpper,["unit"])?Math.ceil(a/unit)*unit:a,n=(E(X.fixLower,["major"])||!f)?k:Math.ceil(k/f)*f,i=(E(X.fixLower,["major","minor"])||!l)?k:Math.ceil(k/l)*l,Z=(E(X.fixLower,["major","minor","micro"])||!A)?k:Math.ceil(k/A)*A,m=!f?0:(E(X.fixUpper,["major"])?Math.round((h-n)/f):Math.floor((h-n)/f))+1,g=!l?0:(E(X.fixUpper,["major","minor"])?Math.round((h-i)/l):Math.floor((h-i)/l))+1,Y=!A?0:(E(X.fixUpper,["major","minor","micro"])?Math.round((h-Z)/A):Math.floor((h-Z)/A))+1,d=l?Math.round(f/l):0,j=A?Math.round(l/A):0,B=f?Math.floor(Math.log(f)/Math.LN10):0,e=l?Math.floor(Math.log(l)/Math.LN10):0,C=b/(h-k);
if(!isFinite(C)){C=1
}return{bounds:{lower:k,upper:h},major:{tick:f,start:n,count:m,prec:B},minor:{tick:l,start:i,count:g,prec:e},micro:{tick:A,start:Z,count:Y,prec:0},minorPerMajor:d,microPerMinor:j,scale:C}
};
dojox.charting.scaler=function(T,N,B,P){var Q={fixUpper:"none",fixLower:"none",natural:false};
if(P){if("fixUpper" in P){Q.fixUpper=String(P.fixUpper)
}if("fixLower" in P){Q.fixLower=String(P.fixLower)
}if("natural" in P){Q.natural=Boolean(P.natural)
}}if(N<=T){return F(T,N,Q,0,0,0,B)
}var S=Math.floor(Math.log(N-T)/Math.LN10),O=P&&("majorTick" in P)?P.majorTick:Math.pow(10,S),R=0,A=0,C;
if(P&&("minorTick" in P)){R=P.minorTick
}else{do{R=O/10;
if(!Q.natural||R>0.9){C=F(T,N,Q,O,R,0,B);
if(C.scale*C.minor.tick>D){break
}}R=O/5;
if(!Q.natural||R>0.9){C=F(T,N,Q,O,R,0,B);
if(C.scale*C.minor.tick>D){break
}}R=O/2;
if(!Q.natural||R>0.9){C=F(T,N,Q,O,R,0,B);
if(C.scale*C.minor.tick>D){break
}}return F(T,N,Q,O,0,0,B)
}while(false)
}if(P&&("microTick" in P)){A=P.microTick;
C=F(T,N,Q,O,R,A,B)
}else{do{A=R/10;
if(!Q.natural||A>0.9){C=F(T,N,Q,O,R,A,B);
if(C.scale*C.micro.tick>D){break
}}A=R/5;
if(!Q.natural||A>0.9){C=F(T,N,Q,O,R,A,B);
if(C.scale*C.micro.tick>D){break
}}A=R/2;
if(!Q.natural||A>0.9){C=F(T,N,Q,O,R,A,B);
if(C.scale*C.micro.tick>D){break
}}A=0
}while(false)
}return A?C:F(T,N,Q,O,R,0,B)
}
})()
};