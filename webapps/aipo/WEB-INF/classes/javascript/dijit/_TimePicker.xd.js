dojo._xdResourceLoaded({depends:[["provide","dijit._TimePicker"],["require","dijit.form._FormWidget"],["require","dojo.date.locale"]],defineResource:function(B){if(!B._hasResource["dijit._TimePicker"]){B._hasResource["dijit._TimePicker"]=true;
B.provide("dijit._TimePicker");
B.require("dijit.form._FormWidget");
B.require("dojo.date.locale");
B.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:B.date.stamp.toISOString,setValue:function(D,A){this.value=D;
this._showText()
},isDisabledDate:function(A,D){return false
},_showText:function(){this.timeMenu.innerHTML="";
var P=B.date.stamp.fromISOString;
this._clickableIncrementDate=P(this.clickableIncrement);
this._visibleIncrementDate=P(this.visibleIncrement);
this._visibleRangeDate=P(this.visibleRange);
var L=function(C){return C.getHours()*60*60+C.getMinutes()*60+C.getSeconds()
};
var M=L(this._clickableIncrementDate);
var J=L(this._visibleIncrementDate);
var N=L(this._visibleRangeDate);
var K=this.value.getTime();
this._refDate=new Date(K-K%(J*1000));
this._clickableIncrement=1;
this._totalIncrements=N/M;
this._visibleIncrement=J/M;
for(var O=-this._totalIncrements/2;
O<=this._totalIncrements/2;
O+=this._clickableIncrement){var A=this._createOption(O);
this.timeMenu.appendChild(A)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,B.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(H){var A=document.createElement("div");
var I=(A.date=new Date(this._refDate));
A.index=H;
var J=this._clickableIncrementDate;
I.setHours(I.getHours()+J.getHours()*H,I.getMinutes()+J.getMinutes()*H,I.getSeconds()+J.getSeconds()*H);
var G=document.createElement("div");
B.addClass(A,this.baseClass+"Item");
B.addClass(G,this.baseClass+"ItemInner");
G.innerHTML=B.date.locale.format(I,this.constraints);
A.appendChild(G);
if(H%this._visibleIncrement<1&&H%this._visibleIncrement>-1){B.addClass(A,this.baseClass+"Marker")
}else{if(H%this._clickableIncrement==0){B.addClass(A,this.baseClass+"Tick")
}}if(this.isDisabledDate(I)){B.addClass(A,this.baseClass+"ItemDisabled")
}if(B.date.compare(this.value,I,this.constraints.selector)==0){A.selected=true;
B.addClass(A,this.baseClass+"ItemSelected")
}return A
},_onOptionSelected:function(A){var D=A.target.date||A.target.parentNode.date;
if(!D||this.isDisabledDate(D)){return 
}this.setValue(D);
this.onValueSelected(D)
},onValueSelected:function(A){},onmouseover:function(A){var D=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
this._highlighted_option=D;
B.addClass(D,this.baseClass+"ItemHover")
},onmouseout:function(A){var D=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
if(this._highlighted_option===D){B.removeClass(D,this.baseClass+"ItemHover")
}},_mouseWheeled:function(D){B.stopEvent(D);
var A=(B.isIE?D.wheelDelta:-D.detail);
this[(A>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var D=this.timeMenu.childNodes[0].index-1;
var A=this._createOption(D);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(A,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var D=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var A=this._createOption(D);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(A)
}})
}}});