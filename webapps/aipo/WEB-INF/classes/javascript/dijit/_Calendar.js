if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(B){if(!this.value||dojo.date.compare(B,this.value)){B=new Date(B);
this.displayMonth=new Date(B);
if(!this.isDisabledDate(B,this.lang)){this.value=B;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(C,D){while(C.firstChild){C.removeChild(C.firstChild)
}C.appendChild(document.createTextNode(D))
},_populateGrid:function(){var U=this.displayMonth;
U.setDate(1);
var O=U.getDay();
var N=dojo.date.getDaysInMonth(U);
var R=dojo.date.getDaysInMonth(dojo.date.add(U,"month",-1));
var T=new Date();
var M=this.value;
var P=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(P>O){P-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(C,D){D+=P;
var E=new Date(U);
var B,F="dijitCalendar",A=0;
if(D<O){B=R-O+D+1;
A=-1;
F+="Previous"
}else{if(D>=(O+N)){B=D-O-N+1;
A=1;
F+="Next"
}else{B=D-O+1;
F+="Current"
}}if(A){E=dojo.date.add(E,"month",A)
}E.setDate(B);
if(!dojo.date.compare(E,T,"date")){F="dijitCalendarCurrentDate "+F
}if(!dojo.date.compare(E,M,"date")){F="dijitCalendarSelectedDate "+F
}if(this.isDisabledDate(E,this.lang)){F="dijitCalendarDisabledDate "+F
}C.className=F+"Month dijitCalendarDateTemplate";
C.dijitDateValue=E.valueOf();
var G=dojo.query(".dijitCalendarDateLabel",C)[0];
this._setText(G,E.getDate())
},this);
var L=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,L[U.getMonth()]);
var S=U.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(A){this._setText(this[A+"YearLabelNode"],dojo.date.locale.format(new Date(S++,0),{selector:"year",locale:this.lang}))
},this);
var V=this;
var Q=function(C,B,A){dijit.typematic.addMouseListener(V[C],V,function(D){if(D>=0){V._adjustDisplay(B,A)
}},0.8,500)
};
Q("incrementMonth","month",1);
Q("decrementMonth","month",-1);
Q("nextYearLabelNode","year",1);
Q("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var H=dojo.hitch(this,function(D,A){var B=dojo.query(D,this.domNode)[0];
for(var C=0;
C<A;
C++){B.parentNode.appendChild(B.cloneNode(true))
}});
H(".dijitCalendarDayLabelTemplate",6);
H(".dijitCalendarDateTemplate",6);
H(".dijitCalendarWeekTemplate",5);
var F=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var E=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(B,A){this._setText(B,F[(A+E)%7])
},this);
var G=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(G,function(A){var B=dojo.doc.createElement("div");
this._setText(B,A);
this.monthLabelSpacer.appendChild(B)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(C,D){this.displayMonth=dojo.date.add(this.displayMonth,C,D);
this._populateGrid()
},_onDayClick:function(C){var D=C.target;
dojo.stopEvent(C);
while(!D.dijitDateValue){D=D.parentNode
}if(!dojo.hasClass(D,"dijitCalendarDisabledDate")){this.setValue(D.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(B){},onChange:function(B){},isDisabledDate:function(D,C){return false
}})
};