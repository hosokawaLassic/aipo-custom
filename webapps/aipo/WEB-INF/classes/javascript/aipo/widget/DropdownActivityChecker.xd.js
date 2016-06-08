dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownActivityChecker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.ActivityList"]],defineResource:function(B){if(!B._hasResource["aipo.widget.DropdownActivityChecker"]){B._hasResource["aipo.widget.DropdownActivityChecker"]=true;
B.provide("aipo.widget.DropdownActivityChecker");
B.require("aimluck.widget.Dropdown");
B.require("aipo.widget.ActivityList");
B.declare("aipo.widget.DropdownActivityChecker",[aimluck.widget.Dropdown],{initValue:"",displayCheck:"",iconURL:"",iconAlt:"",iconWidth:"",iconHeight:"",callback:function(){},templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div style="outline:0" class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><div id="activitychecker" class="zero counter"></div>お知らせ</div></div></div>\n',postCreate:function(){this.inherited(arguments);
this.dropDown=new aipo.widget.ActivityList({},"activityLiteList")
},_openDropDown:function(){this.inherited(arguments);
this.dropDown.reload()
},onCheckActivity:function(A){var D=B.byId("activitychecker");
if(A>99){D.innerHTML="99+";
B.removeClass("activitychecker","zero")
}else{if(A==0){D.innerHTML=A;
B.addClass("activitychecker","zero")
}else{D.innerHTML=A;
B.removeClass("activitychecker","zero")
}}},onCheckBlank:function(A){}})
}}});