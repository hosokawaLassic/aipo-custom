dojo._xdResourceLoaded({depends:[["provide","dijit.form.Slider"],["require","dijit.form._FormWidget"],["require","dijit._Container"],["require","dojo.dnd.move"],["require","dijit.form.Button"],["require","dojo.number"]],defineResource:function(B){if(!B._hasResource["dijit.form.Slider"]){B._hasResource["dijit.form.Slider"]=true;
B.provide("dijit.form.Slider");
B.require("dijit.form._FormWidget");
B.require("dijit._Container");
B.require("dojo.dnd.move");
B.require("dijit.form.Button");
B.require("dojo.number");
B.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:B.mixin(B.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(A){if(this.disabled||A.altKey||A.ctrlKey){return 
}switch(A.keyCode){case B.keys.HOME:this.setValue(this.minimum,false);
break;
case B.keys.END:this.setValue(this.maximum,false);
break;
case B.keys.UP_ARROW:case (this._isReversed()?B.keys.LEFT_ARROW:B.keys.RIGHT_ARROW):case B.keys.PAGE_UP:this.increment(A);
break;
case B.keys.DOWN_ARROW:case (this._isReversed()?B.keys.RIGHT_ARROW:B.keys.LEFT_ARROW):case B.keys.PAGE_DOWN:this.decrement(A);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}B.stopEvent(A)
},_onHandleClick:function(A){if(this.disabled){return 
}if(!B.isIE){dijit.focus(this.sliderHandle)
}B.stopEvent(A)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(A){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
B.stopEvent(A);
var E=B.coords(this.sliderBarContainer,true);
var F=A[this._mousePixelCoord]-E[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(E[this._pixelCount]-F):F,E[this._pixelCount],true)
},_setPixelValue:function(K,I,A){if(this.disabled){return 
}K=K<0?0:I<K?I:K;
var H=this.discreteValues;
if(H<=1||H==Infinity){H=I
}H--;
var L=I/H;
var J=Math.round(K/L);
this.setValue((this.maximum-this.minimum)*J/H+this.minimum,A)
},setValue:function(A,E){this.valueNode.value=this.value=A;
this.inherited("setValue",arguments);
var F=(A-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(F*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-F)*100)+"%"
},_bumpValue:function(G){if(this.disabled){return 
}var J=B.getComputedStyle(this.sliderBarContainer);
var A=B._getContentBox(this.sliderBarContainer,J);
var I=this.discreteValues;
if(I<=1||I==Infinity){I=A[this._pixelCount]
}I--;
var H=(this.value-this.minimum)*I/(this.maximum-this.minimum)+G;
if(H<0){H=0
}if(H>I){H=I
}H=H*(this.maximum-this.minimum)/I+this.minimum;
this.setValue(H,true)
},decrement:function(A){this._bumpValue(A.keyCode==B.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(A){this._bumpValue(A.keyCode==B.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(D){B.stopEvent(D);
var A=0;
if(typeof D.wheelDelta=="number"){A=D.wheelDelta
}else{if(typeof D.detail=="number"){A=-D.detail
}}if(A>0){this.increment(D)
}else{if(A<0){this.decrement(D)
}}},startup:function(){B.forEach(this.getChildren(),function(A){if(this[A.container]!=this.containerNode){this[A.container].appendChild(A.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,B.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var D=this;
var A=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=D
};
B.extend(A,dijit.form._SliderMover.prototype);
this._movable=new B.dnd.Moveable(this.sliderHandle,{mover:A});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
B.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
B.declare("dijit.form._SliderMover",B.dnd.Mover,{onMouseMove:function(I){var J=this.widget;
var A=this.constraintBox;
if(!A){var L=J.sliderBarContainer;
var K=B.getComputedStyle(L);
var A=B._getContentBox(L,K);
A[J._startingPixelCount]=0;
this.constraintBox=A
}var N=this.marginBox;
var M=J._isReversed()?I[J._mousePixelCoord]-B._abs(J.sliderBarContainer).x:N[J._startingPixelCount]+I[J._mousePixelCoord];
B.hitch(J,"_setPixelValue")(J._isReversed()||J._upsideDown?(A[J._pixelCount]-M):M,A[J._pixelCount])
},destroy:function(A){var D=this.widget;
D.setValue(D.value,true);
B.dnd.Mover.prototype.destroy.call(this)
}});
B.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(A,D){return this._positionPrefix+A+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var A=this._genHTML(50,0)
}else{var F=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var A=this._genHTML(0,0);
for(var E=1;
E<this.count-1;
E++){A+=this._genHTML(F*E,E)
}A+=this._genHTML(100,this.count-1)
}else{var A=this._genHTML(100,0);
for(var E=1;
E<this.count-1;
E++){A+=this._genHTML(100-F*E,E)
}A+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=A
}});
B.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
B.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(A){return A
},_genHTML:function(A,D){return this._positionPrefix+this._calcPosition(A)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[D]+this._suffix
},getLabels:function(){var A=this.labels;
if(!A.length){A=B.query("> li",this.srcNodeRef).map(function(C){return String(C.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!A.length&&this.count>1){var F=this.minimum;
var G=(this.maximum-F)/(this.count-1);
for(var H=0;
H<this.count;
H++){A.push((H<this.numericMargin||H>=(this.count-this.numericMargin))?"":B.number.format(F,this.constraints));
F+=G
}}return A
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
B.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(A){return 100-A
},_isHorizontal:false})
}}});