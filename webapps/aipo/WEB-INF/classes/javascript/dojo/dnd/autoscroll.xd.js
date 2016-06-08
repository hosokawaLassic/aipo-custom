dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.autoscroll"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.autoscroll"]){B._hasResource["dojo.dnd.autoscroll"]=true;
B.provide("dojo.dnd.autoscroll");
B.dnd.getViewport=function(){var A=B.doc,G=A.documentElement,F=window,H=B.body();
if(B.isMozilla){return{w:G.clientWidth,h:F.innerHeight}
}else{if(!B.isOpera&&F.innerWidth){return{w:F.innerWidth,h:F.innerHeight}
}else{if(!B.isOpera&&G&&G.clientWidth){return{w:G.clientWidth,h:G.clientHeight}
}else{if(H.clientWidth){return{w:H.clientWidth,h:H.clientHeight}
}}}}return null
};
B.dnd.V_TRIGGER_AUTOSCROLL=32;
B.dnd.H_TRIGGER_AUTOSCROLL=32;
B.dnd.V_AUTOSCROLL_VALUE=16;
B.dnd.H_AUTOSCROLL_VALUE=16;
B.dnd.autoScroll=function(A){var F=B.dnd.getViewport(),G=0,H=0;
if(A.clientX<B.dnd.H_TRIGGER_AUTOSCROLL){G=-B.dnd.H_AUTOSCROLL_VALUE
}else{if(A.clientX>F.w-B.dnd.H_TRIGGER_AUTOSCROLL){G=B.dnd.H_AUTOSCROLL_VALUE
}}if(A.clientY<B.dnd.V_TRIGGER_AUTOSCROLL){H=-B.dnd.V_AUTOSCROLL_VALUE
}else{if(A.clientY>F.h-B.dnd.V_TRIGGER_AUTOSCROLL){H=B.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(G,H)
};
B.dnd._validNodes={div:1,p:1,td:1};
B.dnd._validOverflow={auto:1,scroll:1};
B.dnd.autoScrollNodes=function(Y){for(var A=Y.target;
A;
){if(A.nodeType==1&&(A.tagName.toLowerCase() in B.dnd._validNodes)){var R=B.getComputedStyle(A);
if(R.overflow.toLowerCase() in B.dnd._validOverflow){var X=B._getContentBox(A,R),T=B._abs(A,true);
X.l+=T.x+A.scrollLeft;
X.t+=T.y+A.scrollTop;
var V=Math.min(B.dnd.H_TRIGGER_AUTOSCROLL,X.w/2),Z=Math.min(B.dnd.V_TRIGGER_AUTOSCROLL,X.h/2),P=Y.pageX-X.l,Q=Y.pageY-X.t,S=0,U=0;
if(P>0&&P<X.w){if(P<V){S=-B.dnd.H_AUTOSCROLL_VALUE
}else{if(P>X.w-V){S=B.dnd.H_AUTOSCROLL_VALUE
}}}if(Q>0&&Q<X.h){if(Q<Z){U=-B.dnd.V_AUTOSCROLL_VALUE
}else{if(Q>X.h-Z){U=B.dnd.V_AUTOSCROLL_VALUE
}}}var b=A.scrollLeft,a=A.scrollTop;
A.scrollLeft=A.scrollLeft+S;
A.scrollTop=A.scrollTop+U;
if(b!=A.scrollLeft||a!=A.scrollTop){return 
}}}try{A=A.parentNode
}catch(W){A=null
}}B.dnd.autoScroll(Y)
}
}}});