if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(G){if(dojo.isIE){if(dojo.marginBox(G.parentNode).h<=G.parentNode.scrollHeight){G.scrollIntoView(false)
}}else{if(dojo.isMozilla){G.scrollIntoView(false)
}else{var E=G.parentNode;
var H=E.scrollTop+dojo.marginBox(E).h;
var F=G.offsetTop+dojo.marginBox(G).h;
if(H<F){E.scrollTop+=(F-H)
}else{if(E.scrollTop>G.offsetTop){E.scrollTop-=(E.scrollTop-G.offsetTop)
}}}}}
};