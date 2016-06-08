if(!dojo._hasResource["aipo.widget.MemberSelectList"]){dojo._hasResource["aipo.widget.MemberSelectList"]=true;
dojo.provide("aipo.widget.MemberSelectList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("aipo.widget.MemberSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(E,H,G,F){aimluck.io.addOption(E,H,G,F)
},addOptionSync:function(K,J,I){var N=dojo.byId(this.memberToId);
var H=dojo.byId(this.selectId);
if(this.memberLimit!=0&&N.options.length>=this.memberLimit){return 
}if(document.all){var L=document.createElement("OPTION");
L.value=K;
L.text=J;
L.selected=I;
var M=document.createElement("OPTION");
M.value=K;
M.text=J;
M.selected=I;
if(N.options.length==1&&N.options[0].value==""){N.options.remove(0);
H.options.remove(0)
}N.add(L,N.options.length);
H.add(M,H.options.length)
}else{var L=document.createElement("OPTION");
L.value=K;
L.text=J;
L.selected=I;
var M=document.createElement("OPTION");
M.value=K;
M.text=J;
M.selected=I;
if(N.options.length==1&&N.options[0].value==""){N.removeChild(N.options[0]);
H.removeChild(N.options[0])
}N.insertBefore(L,N.options[N.options.length]);
H.insertBefore(M,H.options[H.options.length])
}this.inputMemberSync()
},addMember:function(I,L){if(document.all){var G=I.options;
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
}}}},removeMemberSync:function(){var G=dojo.byId(this.memberToId);
var H=dojo.byId(this.selectId);
if(document.all){var F=G.options;
var E=H.options;
for(i=0;
i<F.length;
i++){if(F[i].selected){F.remove(i);
E.remove(i);
i-=1
}}}else{var F=G.options;
var E=H.options;
for(i=0;
i<F.length;
i++){if(F[i].selected){G.removeChild(F[i]);
H.removeChild(E[i]);
i-=1
}}}},inputMemberSync:function(){var E=dojo.byId(this.selectId);
var H=dojo.byId(this.inputId);
var G="";
var F=E.options;
for(i=0;
i<F.length;
i++){if(i!=0){G+=", "
}G+=F[i].text
}H.innerHTML=G
},changeGroup:function(E){var F=E.target.options[E.target.selectedIndex].value;
var H=this.changeGroupUrl+"&groupname="+F;
var G={url:H,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,G)
},onMemberAddClick:function(B){this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.memberToId));
this.addMember(dojo.byId(this.memberFromId),dojo.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(B){this.removeMemberSync();
this.inputMemberSync()
}})
};