dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownDatepicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.DateCalendar"],["require","dojo.date.locale"]],defineResource:function(B){if(!B._hasResource["aipo.widget.DropdownDatepicker"]){B._hasResource["aipo.widget.DropdownDatepicker"]=true;
B.provide("aipo.widget.DropdownDatepicker");
B.require("aimluck.widget.Dropdown");
B.require("aipo.widget.DateCalendar");
B.require("dojo.date.locale");
B.declare("aipo.widget.DropdownDatepicker",[aimluck.widget.Dropdown],{dateId:"",dateValue:"",initValue:"",displayCheck:"",iconURL:"",iconAlt:"",callback:function(){},listWidgetId:"datewidget",templateString:'<div class="dijit dijitLeft dijitInline"><div dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t style="float:left;"><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span></div></div><div class="alignleft"><span name="${dateId}_view" id="${dateId}_view" dojoAttachPoint="inputNode" style="vertical-align:middle;background:#ffffff ;border:0px;" autocomplete="off" readonly="readonly"></span><span style="display:${displayCheck}"><input name="${dateId}_check" type="checkbox" value="TRUE" id="${dateId}_flag" dojoAttachEvent="onclick:onCheckBlank" /><label for="${dateId}_flag">\u0020\u6307\u5b9a\u3057\u306a\u3044</label></span><input type="hidden" id="${dateId}" name="${dateId}" value="${dateValue}" dojoAttachPoint="valueNode" /><input type="hidden" id="${dateId}_year" name="${dateId}_year" value="" dojoAttachPoint="valueYearNode" /><input type="hidden" id="${dateId}_month" name="${dateId}_month" value="" dojoAttachPoint="valueMonthNode" /><input type="hidden" id="${dateId}_day" name="${dateId}_day" value="" dojoAttachPoint="valueDayNode" /></div></div>\n',_openDropDown:function(){aimluck.widget.Dropdown.prototype._openDropDown.apply(this);
if(aipo.userAgent.isAndroid()){B.query("input,select,button").forEach(function(A,D){A.disabled=true
})
}},_closeDropDown:function(){aimluck.widget.Dropdown.prototype._closeDropDown.apply(this);
if(aipo.userAgent.isAndroid()){B.query("input,select,button:not(.disabled)").forEach(function(A,D){A.disabled=false
})
}},postCreate:function(){this.inherited(arguments);
var A={widgetId:this.listWidgetId,dateId:this.dateId,callback:this.callback};
this.dropDown=new aipo.widget.DateCalendar(A,this.listWidgetId);
if(this.initValue!=""){var K=this.initValue.split("/");
if(K.length==3){var I=K[0];
var L=K[1]-1;
var J=K[2];
var H=B.byId(this.dateId);
H.value=this.initValue;
this.dropDown.clearDate();
this.dropDown.setValue(new Date(I,L,J))
}}else{this.dropDown.disabledCalendar(true)
}},onCheckBlank:function(A){this.dropDown.disabledCalendar(B.byId(this.dateId+"_flag").checked)
}})
}}});