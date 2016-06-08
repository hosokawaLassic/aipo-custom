dojo._xdResourceLoaded({depends:[["provide","dijit._base.place"]],defineResource:function(B){if(!B._hasResource["dijit._base.place"]){B._hasResource["dijit._base.place"]=true;
B.provide("dijit._base.place");
dijit.getViewport=function(){var L=B.global;
var O=B.doc;
var N=0,A=0;
if(B.isMozilla){var M,R,Q,K;
if(O.body.clientWidth>O.documentElement.clientWidth){M=O.documentElement.clientWidth;
Q=O.body.clientWidth
}else{Q=O.documentElement.clientWidth;
M=O.body.clientWidth
}if(O.body.clientHeight>O.documentElement.clientHeight){R=O.documentElement.clientHeight;
K=O.body.clientHeight
}else{K=O.documentElement.clientHeight;
R=O.body.clientHeight
}N=(Q>L.innerWidth)?M:Q;
A=(K>L.innerHeight)?R:K
}else{if(!B.isOpera&&L.innerWidth){N=L.innerWidth;
A=L.innerHeight
}else{if(B.isIE&&O.documentElement&&O.documentElement.clientHeight){N=O.documentElement.clientWidth;
A=O.documentElement.clientHeight
}else{if(B.body().clientWidth){N=B.body().clientWidth;
A=B.body().clientHeight
}}}}var P=B._docScroll();
return{w:N,h:A,l:P.x,t:P.y}
};
dijit.placeOnScreen=function(I,A,J,H){var G=B.map(J,function(C){return{corner:C,pos:A}
});
return dijit._place(I,G)
};
dijit._place=function(V,Y,c){var b=dijit.getViewport();
if(!V.parentNode||String(V.parentNode.tagName).toLowerCase()!="body"){B.body().appendChild(V)
}var f=null;
for(var U=0;
U<Y.length;
U++){var d=Y[U].corner;
var e=Y[U].pos;
if(c){c(d)
}var Z=V.style.display;
var i=V.style.visibility;
V.style.visibility="hidden";
V.style.display="";
var j=B.marginBox(V);
V.style.display=Z;
V.style.visibility=i;
var A=(d.charAt(1)=="L"?e.x:Math.max(b.l,e.x-j.w)),T=(d.charAt(0)=="T"?e.y:Math.max(b.t,e.y-j.h)),g=(d.charAt(1)=="L"?Math.min(b.l+b.w,A+j.w):e.x),h=(d.charAt(0)=="T"?Math.min(b.t+b.h,T+j.h):e.y),X=g-A,a=h-T,W=(j.w-X)+(j.h-a);
if(f==null||W<f.overflow){f={corner:d,aroundCorner:Y[U].aroundCorner,x:A,y:T,w:X,h:a,overflow:W}
}if(W==0){break
}}V.style.left=f.x+"px";
V.style.top=f.y+"px";
return f
};
dijit.placeOnScreenAroundElement=function(L,S,R,A){S=B.byId(S);
var P=S.style.display;
S.style.display="";
var O=S.offsetWidth;
var T=S.offsetHeight;
var Q=B.coords(S,true);
S.style.display=P;
var N=[];
for(var M in R){N.push({aroundCorner:M,corner:R[M],pos:{x:Q.x+(M.charAt(1)=="L"?0:O),y:Q.y+(M.charAt(0)=="T"?0:T)}})
}return dijit._place(L,N,A)
}
}}});