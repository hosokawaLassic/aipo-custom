dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DateCalendar"],["require","dijit._Calendar"]],defineResource:function(B){if(!B._hasResource["aipo.widget.DateCalendar"]){B._hasResource["aipo.widget.DateCalendar"]=true;
B.provide("aipo.widget.DateCalendar");
B.require("dijit._Calendar");
B.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(A){this.onChangeNoCallback(A);
this.callback(A)
},onValueSelected:function(A){this.onChange(A)
},onChangeNoCallback:function(V){var P=V.getFullYear();
var A=1+V.getMonth();
var M=V.getDate();
var N=B.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var Q=N[V.getDay()];
var T=B.byId(this.dateId+"_view");
T.innerHTML=P+"\u5e74"+A+"\u6708"+M+"\u65e5\uff08"+Q+"\uff09";
var O=B.byId(this.dateId);
O.value=P+"/"+A+"/"+M;
var R=B.byId(this.dateId+"_year");
R.value=P;
var S=B.byId(this.dateId+"_month");
S.value=A;
var U=B.byId(this.dateId+"_day");
U.value=M;
B.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(A){if(A){var U=B.byId(this.dateId+"_view");
U.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var R=B.byId(this.dateId+"_year");
R.value="";
var T=B.byId(this.dateId+"_month");
T.value="";
var V=B.byId(this.dateId+"_day");
V.value="";
this.value="";
if(!B.byId(this.dateId+"_flag").checked){B.byId(this.dateId+"_flag").checked=true
}}else{var O=B.byId(this.dateId);
if((!O.value)||(O.value=="")){this.setValue(new Date())
}else{var P=O.value.split("/");
if(P.length==3){var Q=P[0];
var M=P[1]-1;
var S=P[2];
var N=new Date(Q,M,S);
this.setValue(N)
}}}},clearDate:function(){this.value=null
}})
}}});