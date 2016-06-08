if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var M=dojo.global;
var P=dojo.doc;
var O=0,K=0;
if(dojo.isMozilla){var N,J,R,L;
if(P.body.clientWidth>P.documentElement.clientWidth){N=P.documentElement.clientWidth;
R=P.body.clientWidth
}else{R=P.documentElement.clientWidth;
N=P.body.clientWidth
}if(P.body.clientHeight>P.documentElement.clientHeight){J=P.documentElement.clientHeight;
L=P.body.clientHeight
}else{L=P.documentElement.clientHeight;
J=P.body.clientHeight
}O=(R>M.innerWidth)?N:R;
K=(L>M.innerHeight)?J:L
}else{if(!dojo.isOpera&&M.innerWidth){O=M.innerWidth;
K=M.innerHeight
}else{if(dojo.isIE&&P.documentElement&&P.documentElement.clientHeight){O=P.documentElement.clientWidth;
K=P.documentElement.clientHeight
}else{if(dojo.body().clientWidth){O=dojo.body().clientWidth;
K=dojo.body().clientHeight
}}}}var Q=dojo._docScroll();
return{w:O,h:K,l:Q.x,t:Q.y}
};
dijit.placeOnScreen=function(J,G,F,I){var H=dojo.map(F,function(A){return{corner:A,pos:G}
});
return dijit._place(J,H)
};
dijit._place=function(V,Y,c){var b=dijit.getViewport();
if(!V.parentNode||String(V.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(V)
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
var j=dojo.marginBox(V);
V.style.display=Z;
V.style.visibility=i;
var S=(d.charAt(1)=="L"?e.x:Math.max(b.l,e.x-j.w)),T=(d.charAt(0)=="T"?e.y:Math.max(b.t,e.y-j.h)),g=(d.charAt(1)=="L"?Math.min(b.l+b.w,S+j.w):e.x),h=(d.charAt(0)=="T"?Math.min(b.t+b.h,T+j.h):e.y),X=g-S,a=h-T,W=(j.w-X)+(j.h-a);
if(f==null||W<f.overflow){f={corner:d,aroundCorner:Y[U].aroundCorner,x:S,y:T,w:X,h:a,overflow:W}
}if(W==0){break
}}V.style.left=f.x+"px";
V.style.top=f.y+"px";
return f
};
dijit.placeOnScreenAroundElement=function(M,T,S,L){T=dojo.byId(T);
var Q=T.style.display;
T.style.display="";
var P=T.offsetWidth;
var K=T.offsetHeight;
var R=dojo.coords(T,true);
T.style.display=Q;
var O=[];
for(var N in S){O.push({aroundCorner:N,corner:S[N],pos:{x:R.x+(N.charAt(1)=="L"?0:P),y:R.y+(N.charAt(0)=="T"?0:K)}})
}return dijit._place(M,O,L)
}
};