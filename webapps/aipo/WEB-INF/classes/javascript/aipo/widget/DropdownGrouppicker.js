if(!dojo._hasResource["aipo.widget.DropdownGrouppicker"]){dojo._hasResource["aipo.widget.DropdownGrouppicker"]=true;
dojo.provide("aipo.widget.DropdownGrouppicker");
dojo.require("aimluck.widget.Dropdown");
dojo.require("aipo.widget.GroupSelectList");
dojo.declare("aipo.widget.DropdownGrouppicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var F={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromTitle:this.memberFromTitle,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue};
var E=dijit.byId(this.listWidgetId);
if(E){this.dropDown=E;
var D=dojo.byId(E.selectId);
this.removeAllOptions(D);
D=dojo.byId(E.memberToId);
this.removeAllOptions(D)
}else{this.dropDown=new aipo.widget.GroupSelectList(F,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(D){var F;
if(document.all){var E=D.options;
for(F=0;
F<E.length;
F++){E.remove(F);
F-=1
}}else{var E=D.options;
for(F=0;
F<E.length;
F++){D.removeChild(E[F]);
F-=1
}}},addOptionSync:function(K,J,I){var N=dojo.byId(this.memberToId);
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
},inputMemberSync:function(){var L=dojo.byId(this.selectId);
var K=dojo.byId(this.inputId);
var I="";
var H=L.options;
var J=0;
var G=H.length;
if(G<=0){return 
}for(J=0;
J<G;
J++){if(J!=0){I+=", "
}I+=H[J].text
}K.innerHTML=I
}})
};