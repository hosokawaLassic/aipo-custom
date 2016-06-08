if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var F=dojo.doc,H=F.documentElement,G=window,E=dojo.body();
if(dojo.isMozilla){return{w:H.clientWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&G.innerWidth){return{w:G.innerWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&H&&H.clientWidth){return{w:H.clientWidth,h:H.clientHeight}
}else{if(E.clientWidth){return{w:E.clientWidth,h:E.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(F){var G=dojo.dnd.getViewport(),H=0,E=0;
if(F.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){H=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(F.clientX>G.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){H=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(F.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(F.clientY>G.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(H,E)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(Z){for(var P=Z.target;
P;
){if(P.nodeType==1&&(P.tagName.toLowerCase() in dojo.dnd._validNodes)){var S=dojo.getComputedStyle(P);
if(S.overflow.toLowerCase() in dojo.dnd._validOverflow){var Y=dojo._getContentBox(P,S),U=dojo._abs(P,true);
Y.l+=U.x+P.scrollLeft;
Y.t+=U.y+P.scrollTop;
var W=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,Y.w/2),a=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,Y.h/2),Q=Z.pageX-Y.l,R=Z.pageY-Y.t,T=0,V=0;
if(Q>0&&Q<Y.w){if(Q<W){T=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(Q>Y.w-W){T=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(R>0&&R<Y.h){if(R<a){V=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(R>Y.h-a){V=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var O=P.scrollLeft,b=P.scrollTop;
P.scrollLeft=P.scrollLeft+T;
P.scrollTop=P.scrollTop+V;
if(O!=P.scrollLeft||b!=P.scrollTop){return 
}}}try{P=P.parentNode
}catch(X){P=null
}}dojo.dnd.autoScroll(Z)
}
};