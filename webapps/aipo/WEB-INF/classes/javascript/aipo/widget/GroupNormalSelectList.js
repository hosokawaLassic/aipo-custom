if(!dojo._hasResource["aipo.widget.GroupNormalSelectList"]){dojo._hasResource["aipo.widget.GroupNormalSelectList"]=true;
dojo.provide("aipo.widget.GroupNormalSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.GroupNormalSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",memberLimit:0,changeGroupUrl:"",widgetId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup" style="width:335px"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c \u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(E,H,G,F){aimluck.io.addOption(E,H,G,F)
},addOptionSync:function(I,H,G){var F=dojo.byId(this.memberToId);
if(this.memberLimit!=0&&F.options.length>=this.memberLimit){return 
}if(document.all){var J=document.createElement("OPTION");
J.value=I;
J.text=H;
J.selected=G;
if(F.options.length==1&&F.options[0].value==""){F.options.remove(0)
}F.add(J,F.options.length)
}else{var J=document.createElement("OPTION");
J.value=I;
J.text=H;
J.selected=G;
if(F.options.length==1&&F.options[0].value==""){F.removeChild(F.options[0])
}F.insertBefore(J,F.options[F.options.length])
}},addMember:function(I,L){if(document.all){var G=I.options;
var H=L.options;
if(G.length==1&&G[0].value==""){return 
}for(i=0;
i<G.length;
i++){if(!G[i].selected){continue
}var J=false;
for(j=0;
j<H.length;
j++){if(H[j].value==G[i].value){J=true;
break
}}if(J){continue
}var K=document.createElement("OPTION");
K.value=G[i].value;
K.text=G[i].text;
K.selected=true;
if(H.length==1&&H[0].value==""){H.remove(0)
}if(this.memberLimit!=0&&L.options.length>=this.memberLimit){return 
}H.add(K,H.length)
}}else{var G=I.options;
var H=L.options;
if(G.length==1&&G[0].value==""){return 
}for(i=0;
i<G.length;
i++){if(!G[i].selected){continue
}var J=false;
for(j=0;
j<H.length;
j++){if(H[j].value==G[i].value){J=true;
break
}}if(J){continue
}var K=document.createElement("OPTION");
K.value=G[i].value;
K.text=G[i].text;
K.selected=true;
if(L.options.length==1&&L.options[0].value==""){L.removeChild(L.options[0])
}if(this.memberLimit!=0&&L.options.length>=this.memberLimit){return 
}L.insertBefore(K,H[H.length])
}}},removeAllMember:function(C){if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1
}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1
}}}},removeMember:function(C){if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1
}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1
}}}},removeMemberSync:function(){var C=dojo.byId(this.memberToId);
if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1
}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1
}}}},changeGroup:function(E){var F=E.target.options[E.target.selectedIndex].value;
var H=this.changeGroupUrl+"&groupname="+F;
var G={url:H,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,G)
},onMemberAddClick:function(B){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMemberSync()
}})
};