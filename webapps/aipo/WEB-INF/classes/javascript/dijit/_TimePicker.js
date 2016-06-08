if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.date.locale");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(C,D){this.value=C;
this._showText()
},isDisabledDate:function(D,C){return false
},_showText:function(){this.timeMenu.innerHTML="";
var I=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=I(this.clickableIncrement);
this._visibleIncrementDate=I(this.visibleIncrement);
this._visibleRangeDate=I(this.visibleRange);
var M=function(A){return A.getHours()*60*60+A.getMinutes()*60+A.getSeconds()
};
var N=M(this._clickableIncrementDate);
var K=M(this._visibleIncrementDate);
var O=M(this._visibleRangeDate);
var L=this.value.getTime();
this._refDate=new Date(L-L%(K*1000));
this._clickableIncrement=1;
this._totalIncrements=O/N;
this._visibleIncrement=K/N;
for(var P=-this._totalIncrements/2;
P<=this._totalIncrements/2;
P+=this._clickableIncrement){var J=this._createOption(P);
this.timeMenu.appendChild(J)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(I){var G=document.createElement("div");
var J=(G.date=new Date(this._refDate));
G.index=I;
var F=this._clickableIncrementDate;
J.setHours(J.getHours()+F.getHours()*I,J.getMinutes()+F.getMinutes()*I,J.getSeconds()+F.getSeconds()*I);
var H=document.createElement("div");
dojo.addClass(G,this.baseClass+"Item");
dojo.addClass(H,this.baseClass+"ItemInner");
H.innerHTML=dojo.date.locale.format(J,this.constraints);
G.appendChild(H);
if(I%this._visibleIncrement<1&&I%this._visibleIncrement>-1){dojo.addClass(G,this.baseClass+"Marker")
}else{if(I%this._clickableIncrement==0){dojo.addClass(G,this.baseClass+"Tick")
}}if(this.isDisabledDate(J)){dojo.addClass(G,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,J,this.constraints.selector)==0){G.selected=true;
dojo.addClass(G,this.baseClass+"ItemSelected")
}return G
},_onOptionSelected:function(D){var C=D.target.date||D.target.parentNode.date;
if(!C||this.isDisabledDate(C)){return 
}this.setValue(C);
this.onValueSelected(C)
},onValueSelected:function(B){},onmouseover:function(D){var C=(D.target.parentNode===this.timeMenu)?D.target:D.target.parentNode;
this._highlighted_option=C;
dojo.addClass(C,this.baseClass+"ItemHover")
},onmouseout:function(D){var C=(D.target.parentNode===this.timeMenu)?D.target:D.target.parentNode;
if(this._highlighted_option===C){dojo.removeClass(C,this.baseClass+"ItemHover")
}},_mouseWheeled:function(C){dojo.stopEvent(C);
var D=(dojo.isIE?C.wheelDelta:-C.detail);
this[(D>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var C=this.timeMenu.childNodes[0].index-1;
var D=this._createOption(C);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(D,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var C=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var D=this._createOption(C);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(D)
}})
};