dojo._xdResourceLoaded({depends:[["provide","dijit._Calendar"],["require","dojo.cldr.supplemental"],["require","dojo.date"],["require","dojo.date.locale"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit._Calendar"]){B._hasResource["dijit._Calendar"]=true;
B.provide("dijit._Calendar");
B.require("dojo.cldr.supplemental");
B.require("dojo.date");
B.require("dojo.date.locale");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||B.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(D,A){while(D.firstChild){D.removeChild(D.firstChild)
}D.appendChild(document.createTextNode(A))
},_populateGrid:function(){var T=this.displayMonth;
T.setDate(1);
var N=T.getDay();
var M=B.date.getDaysInMonth(T);
var Q=B.date.getDaysInMonth(B.date.add(T,"month",-1));
var S=new Date();
var A=this.value;
var O=B.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(O>N){O-=7
}B.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(D,E){E+=O;
var F=new Date(T);
var C,G="dijitCalendar",I=0;
if(E<N){C=Q-N+E+1;
I=-1;
G+="Previous"
}else{if(E>=(N+M)){C=E-N-M+1;
I=1;
G+="Next"
}else{C=E-N+1;
G+="Current"
}}if(I){F=B.date.add(F,"month",I)
}F.setDate(C);
if(!B.date.compare(F,S,"date")){G="dijitCalendarCurrentDate "+G
}if(!B.date.compare(F,A,"date")){G="dijitCalendarSelectedDate "+G
}if(this.isDisabledDate(F,this.lang)){G="dijitCalendarDisabledDate "+G
}D.className=G+"Month dijitCalendarDateTemplate";
D.dijitDateValue=F.valueOf();
var H=B.query(".dijitCalendarDateLabel",D)[0];
this._setText(H,F.getDate())
},this);
var V=B.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,V[T.getMonth()]);
var R=T.getFullYear()-1;
B.forEach(["previous","current","next"],function(C){this._setText(this[C+"YearLabelNode"],B.date.locale.format(new Date(R++,0),{selector:"year",locale:this.lang}))
},this);
var U=this;
var P=function(D,C,E){dijit.typematic.addMouseListener(U[D],U,function(F){if(F>=0){U._adjustDisplay(C,E)
}},0.8,500)
};
P("incrementMonth","month",1);
P("decrementMonth","month",-1);
P("nextYearLabelNode","year",1);
P("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var G=B.hitch(this,function(J,C){var D=B.query(J,this.domNode)[0];
for(var E=0;
E<C;
E++){D.parentNode.appendChild(D.cloneNode(true))
}});
G(".dijitCalendarDayLabelTemplate",6);
G(".dijitCalendarDateTemplate",6);
G(".dijitCalendarWeekTemplate",5);
var A=B.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var H=B.cldr.supplemental.getFirstDayOfWeek(this.lang);
B.query(".dijitCalendarDayLabel",this.domNode).forEach(function(D,C){this._setText(D,A[(C+H)%7])
},this);
var F=B.date.locale.getNames("months","wide","standAlone",this.lang);
B.forEach(F,function(C){var D=B.doc.createElement("div");
this._setText(D,C);
this.monthLabelSpacer.appendChild(D)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(D,A){this.displayMonth=B.date.add(this.displayMonth,D,A);
this._populateGrid()
},_onDayClick:function(D){var A=D.target;
B.stopEvent(D);
while(!A.dijitDateValue){A=A.parentNode
}if(!B.hasClass(A,"dijitCalendarDisabledDate")){this.setValue(A.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(A,D){return false
}})
}}});