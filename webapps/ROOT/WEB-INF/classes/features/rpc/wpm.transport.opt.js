gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var D,C;
function B(G,H,F){if(typeof window.addEventListener!="undefined"){window.addEventListener(G,H,F)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+G,H)
}}}function A(G,H,F){if(window.removeEventListener){window.removeEventListener(G,H,F)
}else{if(window.detachEvent){window.detachEvent("on"+G,H)
}}}function E(G){var H=gadgets.json.parse(G.data);
if(!H||!H.f){return 
}var F=gadgets.rpc.getTargetOrigin(H.f);
if(typeof G.origin!=="undefined"?G.origin!==F:G.domain!==/^.+:\/\/([^:]+).*/.exec(F)[1]){return 
}D(H,G.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(F,G){D=F;
C=G;
B("message",E,false);
C("..",true);
return true
},setup:function(G,F){C(G,true);
return true
},call:function(G,J,I){var F=gadgets.rpc.getTargetOrigin(G);
var H=gadgets.rpc._getTargetWin(G);
if(F){window.setTimeout(function(){H.postMessage(gadgets.json.stringify(I),F)
},0)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
};