if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var D=document.createElement("div");
D.id="a11yTestNode";
D.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(D);
function C(){var B=dojo.getComputedStyle(D);
if(B){var F=B.backgroundImage;
var A=(B.borderTopColor==B.borderRightColor)||(F!=null&&(F=="none"||F=="url(invalid-url:)"));
dojo[A?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}C();
if(dojo.isIE){setInterval(C,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(F){var E=F.getAttribute("role");
if(E){var D=E.indexOf(":");
return D==-1?E:E.substring(D+1)
}else{return""
}},setWaiRole:function(C,D){if(dojo.isFF&&dojo.isFF<3){C.setAttribute("role","wairole:"+D)
}else{C.setAttribute("role",D)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(C,D){if(dojo.isFF&&dojo.isFF<3){return C.hasAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{if(C.hasAttribute){return C.hasAttribute("aria-"+D)
}else{return C.getAttribute("aria-"+D)?true:false
}}},getWaiState:function(D,E){if(dojo.isFF&&dojo.isFF<3){return D.getAttributeNS("http://www.w3.org/2005/07/aaa",E)
}else{var F=D.getAttribute("aria-"+E);
return F?F:""
}},setWaiState:function(D,E,F){if(dojo.isFF&&dojo.isFF<3){D.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+E,F)
}else{D.setAttribute("aria-"+E,F)
}},removeWaiState:function(C,D){if(dojo.isFF&&dojo.isFF<3){C.removeAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{C.removeAttribute("aria-"+D)
}}})
};