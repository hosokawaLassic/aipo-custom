dojo._xdResourceLoaded({depends:[["provide","dijit._base.wai"]],defineResource:function(B){if(!B._hasResource["dijit._base.wai"]){B._hasResource["dijit._base.wai"]=true;
B.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+B.moduleUrl("dijit","form/templates/blank.gif")+'");';
B.body().appendChild(A);
function D(){var G=B.getComputedStyle(A);
if(G){var H=G.backgroundImage;
var C=(G.borderTopColor==G.borderRightColor)||(H!=null&&(H=="none"||H=="url(invalid-url:)"));
B[C?"addClass":"removeClass"](B.body(),"dijit_a11y")
}}D();
if(B.isIE){setInterval(D,4000)
}}};
if(B.isIE||B.isMoz){B._loaders.unshift(dijit.wai.onload)
}B.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(E){var A=E.getAttribute("role");
if(A){var F=A.indexOf(":");
return F==-1?A:A.substring(F+1)
}else{return""
}},setWaiRole:function(D,A){if(B.isFF&&B.isFF<3){D.setAttribute("role","wairole:"+A)
}else{D.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(D,A){if(B.isFF&&B.isFF<3){return D.hasAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{if(D.hasAttribute){return D.hasAttribute("aria-"+A)
}else{return D.getAttribute("aria-"+A)?true:false
}}},getWaiState:function(F,A){if(B.isFF&&B.isFF<3){return F.getAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{var E=F.getAttribute("aria-"+A);
return E?E:""
}},setWaiState:function(F,A,E){if(B.isFF&&B.isFF<3){F.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+A,E)
}else{F.setAttribute("aria-"+A,E)
}},removeWaiState:function(D,A){if(B.isFF&&B.isFF<3){D.removeAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{D.removeAttribute("aria-"+A)
}}})
}}});