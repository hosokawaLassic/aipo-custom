dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownGrouppicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.GroupSelectList"]],defineResource:function(B){if(!B._hasResource["aipo.widget.DropdownGrouppicker"]){B._hasResource["aipo.widget.DropdownGrouppicker"]=true;
B.provide("aipo.widget.DropdownGrouppicker");
B.require("aimluck.widget.Dropdown");
B.require("aipo.widget.GroupSelectList");
B.declare("aipo.widget.DropdownGrouppicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var E={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromTitle:this.memberFromTitle,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue};
var A=dijit.byId(this.listWidgetId);
if(A){this.dropDown=A;
var F=B.byId(A.selectId);
this.removeAllOptions(F);
F=B.byId(A.memberToId);
this.removeAllOptions(F)
}else{this.dropDown=new aipo.widget.GroupSelectList(E,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(F){var E;
if(document.all){var A=F.options;
for(E=0;
E<A.length;
E++){A.remove(E);
E-=1
}}else{var A=F.options;
for(E=0;
E<A.length;
E++){F.removeChild(A[E]);
E-=1
}}},addOptionSync:function(J,I,A){var M=B.byId(this.memberToId);
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
},inputMemberSync:function(){var K=B.byId(this.selectId);
var J=B.byId(this.inputId);
var H="";
var A=K.options;
var I=0;
var L=A.length;
if(L<=0){return 
}for(I=0;
I<L;
I++){if(I!=0){H+=", "
}H+=A[I].text
}J.innerHTML=H
}})
}}});