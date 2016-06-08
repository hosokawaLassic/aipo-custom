dojo._xdResourceLoaded({depends:[["provide","dojox.widget.ColorPicker"],["require","dijit.form._FormWidget"],["require","dojo.dnd.move"],["require","dojo.fx"]],defineResource:function(B){if(!B._hasResource["dojox.widget.ColorPicker"]){B._hasResource["dojox.widget.ColorPicker"]=true;
B.provide("dojox.widget.ColorPicker");
B.experimental("dojox.widget.ColorPicker");
B.require("dijit.form._FormWidget");
B.require("dojo.dnd.move");
B.require("dojo.fx");
B.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,_underlay:B.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),templateString:'<div class="dojoxColorPicker">\r\n\t<div class="dojoxColorPickerBox">\r\n\t\t<div dojoAttachPoint="cursorNode" class="dojoxColorPickerPoint"></div>\r\n\t\t<img dojoAttachPoint="colorUnderlay" dojoAttachEvent="onclick: _setPoint" class="dojoxColorPickerUnderlay" src="${_underlay}">\r\n\t</div>\r\n\t<div class="dojoxHuePicker">\r\n\t\t<div dojoAttachPoint="hueCursorNode" class="dojoxHuePickerPoint"></div>\r\n\t\t<div dojoAttachPoint="hueNode" class="dojoxHuePickerUnderlay" dojoAttachEvent="onclick: _setHuePoint"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="previewNode" class="dojoxColorPickerPreview"></div>\r\n\t<div dojoAttachPoint="safePreviewNode" class="dojoxColorPickerWebSafePreview"></div>\r\n\t<div class="dojoxColorPickerOptional">\r\n\t\t<div class="dijitInline dojoxColorPickerRgb" dojoAttachPoint="rgbNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>r</td><td><input dojoAttachPoint="Rval" size="1"></td></tr>\r\n\t\t\t<tr><td>g</td><td><input dojoAttachPoint="Gval" size="1"></td></tr>\r\n\t\t\t<tr><td>b</td><td><input dojoAttachPoint="Bval" size="1"></td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dijitInline dojoxColorPickerHsv" dojoAttachPoint="hsvNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>h</td><td><input dojoAttachPoint="Hval"size="1"> &deg;</td></tr>\r\n\t\t\t<tr><td>s</td><td><input dojoAttachPoint="Sval" size="1"> %</td></tr>\r\n\t\t\t<tr><td>v</td><td><input dojoAttachPoint="Vval" size="1"> %</td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dojoxColorPickerHex" dojoAttachPoint="hexNode">\t\r\n\t\t\thex: <input dojoAttachPoint="hexCode, focusNode" size="6" class="dojoxColorPickerHexCode">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){if(B.isIE&&B.isIE<7){this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=B.moduleUrl("dojox.widget","FisheyeList/blank.gif").toString()
}if(!this.showRgb){this.rgbNode.style.display="none"
}if(!this.showHsv){this.hsvNode.style.display="none"
}if(!this.showHex){this.hexNode.style.display="none"
}if(!this.webSafe){this.safePreviewNode.style.display="none"
}},startup:function(){this._offset=0;
this._mover=new B.dnd.Moveable(this.cursorNode,{mover:B.dnd.boxConstrainedMover({t:0,l:0,w:150,h:150})});
this._hueMover=new B.dnd.Moveable(this.hueCursorNode,{mover:B.dnd.boxConstrainedMover({t:0,l:0,w:0,h:150})});
B.subscribe("/dnd/move/stop",B.hitch(this,"_clearTimer"));
B.subscribe("/dnd/move/start",B.hitch(this,"_setTimer"));
this._sc=(1/B.coords(this.colorUnderlay).w);
this._hueSc=(255/(B.coords(this.hueNode).h+this._offset));
this._updateColor()
},_setTimer:function(A){this._timer=setInterval(B.hitch(this,"_updateColor"),45)
},_clearTimer:function(A){clearInterval(this._timer);
this.onChange(this.value)
},_setHue:function(A){var D=B.colorFromArray(this._hsv2rgb(A,1,1,{inputRange:1})).toHex();
B.style(this.colorUnderlay,"backgroundColor",D)
},_updateColor:function(){var G=Math.round((255+(this._offset))-((B.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var H=Math.round((B.style(this.cursorNode,"left")*this._sc)*100);
var J=Math.round(100-(B.style(this.cursorNode,"top")*this._sc)*100);
if(G!=this._hue){this._setHue(G)
}var I=this._hsv2rgb(G,H/100,J/100,{inputRange:1});
var A=(B.colorFromArray(I).toHex());
this.previewNode.style.backgroundColor=A;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=A
}if(this.showHex){this.hexCode.value=A
}if(this.showRgb){this.Rval.value=I[0];
this.Gval.value=I[1];
this.Bval.value=I[2]
}if(this.showHsv){this.Hval.value=Math.round((G*360)/255);
this.Sval.value=H;
this.Vval.value=J
}this.value=A;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(A){if(this.animatePoint){B.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:A.layerY,left:0,onEnd:B.hitch(this,"_updateColor")}).play()
}else{B.style(this.hueCursorNode,"top",(A.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(A){if(this.animatePoint){B.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:A.layerY-this._offset,left:A.layerX-this._offset,onEnd:B.hitch(this,"_updateColor")}).play()
}else{B.style(this.cursorNode,"left",(A.layerX-this._offset)+"px");
B.style(this.cursorNode,"top",(A.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(Y,S,U,R){if(B.isArray(Y)){if(S){R=S
}U=Y[2]||0;
S=Y[1]||0;
Y=Y[0]||0
}var b={inputRange:(R&&R.inputRange)?R.inputRange:[255,255,255],outputRange:(R&&R.outputRange)?R.outputRange:255};
switch(b.inputRange[0]){case 1:Y=Y*360;
break;
case 100:Y=(Y/100)*360;
break;
case 360:Y=Y;
break;
default:Y=(Y/255)*360
}if(Y==360){Y=0
}switch(b.inputRange[1]){case 100:S/=100;
break;
case 255:S/=255
}switch(b.inputRange[2]){case 100:U/=100;
break;
case 255:U/=255
}var Q=null;
var X=null;
var V=null;
if(S==0){Q=U;
X=U;
V=U
}else{var a=Y/60;
var Z=Math.floor(a);
var W=a-Z;
var A=U*(1-S);
var P=U*(1-(S*W));
var T=U*(1-(S*(1-W)));
switch(Z){case 0:Q=U;
X=T;
V=A;
break;
case 1:Q=P;
X=U;
V=A;
break;
case 2:Q=A;
X=U;
V=T;
break;
case 3:Q=A;
X=P;
V=U;
break;
case 4:Q=T;
X=A;
V=U;
break;
case 5:Q=U;
X=A;
V=P;
break
}}switch(b.outputRange){case 1:Q=B.math.round(Q,2);
X=B.math.round(X,2);
V=B.math.round(V,2);
break;
case 100:Q=Math.round(Q*100);
X=Math.round(X*100);
V=Math.round(V*100);
break;
default:Q=Math.round(Q*255);
X=Math.round(X*255);
V=Math.round(V*255)
}return[Q,X,V]
}})
}}});