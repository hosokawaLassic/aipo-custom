if(!dojo._hasResource["aipo.widget.DateCalendar"]){dojo._hasResource["aipo.widget.DateCalendar"]=true;
dojo.provide("aipo.widget.DateCalendar");
dojo.require("dijit._Calendar");
dojo.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(B){this.onChangeNoCallback(B);
this.callback(B)
},onValueSelected:function(B){this.onChange(B)
},onChangeNoCallback:function(L){var Q=L.getFullYear();
var M=1+L.getMonth();
var N=L.getDate();
var O=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var R=O[L.getDay()];
var U=dojo.byId(this.dateId+"_view");
U.innerHTML=Q+"\u5e74"+M+"\u6708"+N+"\u65e5\uff08"+R+"\uff09";
var P=dojo.byId(this.dateId);
P.value=Q+"/"+M+"/"+N;
var S=dojo.byId(this.dateId+"_year");
S.value=Q;
var T=dojo.byId(this.dateId+"_month");
T.value=M;
var V=dojo.byId(this.dateId+"_day");
V.value=N;
dojo.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(M){if(M){var V=dojo.byId(this.dateId+"_view");
V.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var S=dojo.byId(this.dateId+"_year");
S.value="";
var U=dojo.byId(this.dateId+"_month");
U.value="";
var L=dojo.byId(this.dateId+"_day");
L.value="";
this.value="";
if(!dojo.byId(this.dateId+"_flag").checked){dojo.byId(this.dateId+"_flag").checked=true
}}else{var P=dojo.byId(this.dateId);
if((!P.value)||(P.value=="")){this.setValue(new Date())
}else{var Q=P.value.split("/");
if(Q.length==3){var R=Q[0];
var N=Q[1]-1;
var T=Q[2];
var O=new Date(R,N,T);
this.setValue(O)
}}}},clearDate:function(){this.value=null
}})
};