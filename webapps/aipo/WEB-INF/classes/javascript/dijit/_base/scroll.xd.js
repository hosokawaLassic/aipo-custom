dojo._xdResourceLoaded({depends:[["provide","dijit._base.scroll"]],defineResource:function(B){if(!B._hasResource["dijit._base.scroll"]){B._hasResource["dijit._base.scroll"]=true;
B.provide("dijit._base.scroll");
dijit.scrollIntoView=function(F){if(B.isIE){if(B.marginBox(F.parentNode).h<=F.parentNode.scrollHeight){F.scrollIntoView(false)
}}else{if(B.isMozilla){F.scrollIntoView(false)
}else{var H=F.parentNode;
var G=H.scrollTop+B.marginBox(H).h;
var A=F.offsetTop+B.marginBox(F).h;
if(G<A){H.scrollTop+=(A-G)
}else{if(H.scrollTop>F.offsetTop){H.scrollTop-=(H.scrollTop-F.offsetTop)
}}}}}
}}});