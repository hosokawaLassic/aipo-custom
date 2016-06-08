dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["aipo.widget.MemberSelectList"]){B._hasResource["aipo.widget.MemberSelectList"]=true;
B.provide("aipo.widget.MemberSelectList");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("aipo.widget.MemberSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(H,G,F,A){aimluck.io.addOption(H,G,F,A)
},addOptionSync:function(J,I,A){var M=B.byId(this.memberToId);
var N=B.byId(this.selectId);
if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}if(document.all){var K=document.createElement("OPTION");
K.value=J;
K.text=I;
K.selected=A;
var L=document.createElement("OPTION");
L.value=J;
L.text=I;
L.selected=A;
if(M.options.length==1&&M.options[0].value==""){M.options.remove(0);
N.options.remove(0)
}M.add(K,M.options.length);
N.add(L,N.options.length)
}else{var K=document.createElement("OPTION");
K.value=J;
K.text=I;
K.selected=A;
var L=document.createElement("OPTION");
L.value=J;
L.text=I;
L.selected=A;
if(M.options.length==1&&M.options[0].value==""){M.removeChild(M.options[0]);
N.removeChild(M.options[0])
}M.insertBefore(K,M.options[M.options.length]);
N.insertBefore(L,N.options[N.options.length])
}this.inputMemberSync()
},addMember:function(H,K){if(document.all){var L=H.options;
var A=K.options;
if(L.length==1&&L[0].value==""){return 
}for(i=0;
i<L.length;
i++){if(!L[i].selected){continue
}var I=false;
for(j=0;
j<A.length;
j++){if(A[j].value==L[i].value){I=true;
break
}}if(I){continue
}var J=document.createElement("OPTION");
J.value=L[i].value;
J.text=L[i].text;
J.selected=true;
if(A.length==1&&A[0].value==""){A.remove(0)
}if(this.memberLimit!=0&&K.options.length>=this.memberLimit){return 
}A.add(J,A.length)
}}else{var L=H.options;
var A=K.options;
if(L.length==1&&L[0].value==""){return 
}for(i=0;
i<L.length;
i++){if(!L[i].selected){continue
}var I=false;
for(j=0;
j<A.length;
j++){if(A[j].value==L[i].value){I=true;
break
}}if(I){continue
}var J=document.createElement("OPTION");
J.value=L[i].value;
J.text=L[i].text;
J.selected=true;
if(K.options.length==1&&K.options[0].value==""){K.removeChild(K.options[0])
}if(this.memberLimit!=0&&K.options.length>=this.memberLimit){return 
}K.insertBefore(J,A[A.length])
}}},removeAllMember:function(D){if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1
}}}},removeMember:function(D){if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1
}}}},removeMemberSync:function(){var F=B.byId(this.memberToId);
var G=B.byId(this.selectId);
if(document.all){var A=F.options;
var H=G.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
H.remove(i);
i-=1
}}}else{var A=F.options;
var H=G.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){F.removeChild(A[i]);
G.removeChild(H[i]);
i-=1
}}}},inputMemberSync:function(){var H=B.byId(this.selectId);
var G=B.byId(this.inputId);
var F="";
var A=H.options;
for(i=0;
i<A.length;
i++){if(i!=0){F+=", "
}F+=A[i].text
}G.innerHTML=F
},changeGroup:function(H){var A=H.target.options[H.target.selectedIndex].value;
var G=this.changeGroupUrl+"&groupname="+A;
var F={url:G,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,F)
},onMemberAddClick:function(A){this.addMember(B.byId(this.memberFromId),B.byId(this.memberToId));
this.addMember(B.byId(this.memberFromId),B.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(A){this.removeMemberSync();
this.inputMemberSync()
}})
}}});