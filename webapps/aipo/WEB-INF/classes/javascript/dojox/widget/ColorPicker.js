if(!dojo._hasResource["dojox.widget.ColorPicker"]){dojo._hasResource["dojox.widget.ColorPicker"]=true;
dojo.provide("dojox.widget.ColorPicker");
dojo.experimental("dojox.widget.ColorPicker");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.dnd.move");
dojo.require("dojo.fx");
dojo.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,_underlay:dojo.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),templateString:'<div class="dojoxColorPicker">\r\n\t<div class="dojoxColorPickerBox">\r\n\t\t<div dojoAttachPoint="cursorNode" class="dojoxColorPickerPoint"></div>\r\n\t\t<img dojoAttachPoint="colorUnderlay" dojoAttachEvent="onclick: _setPoint" class="dojoxColorPickerUnderlay" src="${_underlay}">\r\n\t</div>\r\n\t<div class="dojoxHuePicker">\r\n\t\t<div dojoAttachPoint="hueCursorNode" class="dojoxHuePickerPoint"></div>\r\n\t\t<div dojoAttachPoint="hueNode" class="dojoxHuePickerUnderlay" dojoAttachEvent="onclick: _setHuePoint"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="previewNode" class="dojoxColorPickerPreview"></div>\r\n\t<div dojoAttachPoint="safePreviewNode" class="dojoxColorPickerWebSafePreview"></div>\r\n\t<div class="dojoxColorPickerOptional">\r\n\t\t<div class="dijitInline dojoxColorPickerRgb" dojoAttachPoint="rgbNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>r</td><td><input dojoAttachPoint="Rval" size="1"></td></tr>\r\n\t\t\t<tr><td>g</td><td><input dojoAttachPoint="Gval" size="1"></td></tr>\r\n\t\t\t<tr><td>b</td><td><input dojoAttachPoint="Bval" size="1"></td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dijitInline dojoxColorPickerHsv" dojoAttachPoint="hsvNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>h</td><td><input dojoAttachPoint="Hval"size="1"> &deg;</td></tr>\r\n\t\t\t<tr><td>s</td><td><input dojoAttachPoint="Sval" size="1"> %</td></tr>\r\n\t\t\t<tr><td>v</td><td><input dojoAttachPoint="Vval" size="1"> %</td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dojoxColorPickerHex" dojoAttachPoint="hexNode">\t\r\n\t\t\thex: <input dojoAttachPoint="hexCode, focusNode" size="6" class="dojoxColorPickerHexCode">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){if(dojo.isIE&&dojo.isIE<7){this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=dojo.moduleUrl("dojox.widget","FisheyeList/blank.gif").toString()
}if(!this.showRgb){this.rgbNode.style.display="none"
}if(!this.showHsv){this.hsvNode.style.display="none"
}if(!this.showHex){this.hexNode.style.display="none"
}if(!this.webSafe){this.safePreviewNode.style.display="none"
}},startup:function(){this._offset=0;
this._mover=new dojo.dnd.Moveable(this.cursorNode,{mover:dojo.dnd.boxConstrainedMover({t:0,l:0,w:150,h:150})});
this._hueMover=new dojo.dnd.Moveable(this.hueCursorNode,{mover:dojo.dnd.boxConstrainedMover({t:0,l:0,w:0,h:150})});
dojo.subscribe("/dnd/move/stop",dojo.hitch(this,"_clearTimer"));
dojo.subscribe("/dnd/move/start",dojo.hitch(this,"_setTimer"));
this._sc=(1/dojo.coords(this.colorUnderlay).w);
this._hueSc=(255/(dojo.coords(this.hueNode).h+this._offset));
this._updateColor()
},_setTimer:function(B){this._timer=setInterval(dojo.hitch(this,"_updateColor"),45)
},_clearTimer:function(B){clearInterval(this._timer);
this.onChange(this.value)
},_setHue:function(D){var C=dojo.colorFromArray(this._hsv2rgb(D,1,1,{inputRange:1})).toHex();
dojo.style(this.colorUnderlay,"backgroundColor",C)
},_updateColor:function(){var H=Math.round((255+(this._offset))-((dojo.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var I=Math.round((dojo.style(this.cursorNode,"left")*this._sc)*100);
var F=Math.round(100-(dojo.style(this.cursorNode,"top")*this._sc)*100);
if(H!=this._hue){this._setHue(H)
}var J=this._hsv2rgb(H,I/100,F/100,{inputRange:1});
var G=(dojo.colorFromArray(J).toHex());
this.previewNode.style.backgroundColor=G;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=G
}if(this.showHex){this.hexCode.value=G
}if(this.showRgb){this.Rval.value=J[0];
this.Gval.value=J[1];
this.Bval.value=J[2]
}if(this.showHsv){this.Hval.value=Math.round((H*360)/255);
this.Sval.value=I;
this.Vval.value=F
}this.value=G;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(B){if(this.animatePoint){dojo.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:B.layerY,left:0,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.hueCursorNode,"top",(B.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(B){if(this.animatePoint){dojo.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:B.layerY-this._offset,left:B.layerX-this._offset,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.cursorNode,"left",(B.layerX-this._offset)+"px");
dojo.style(this.cursorNode,"top",(B.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(Z,T,V,S){if(dojo.isArray(Z)){if(T){S=T
}V=Z[2]||0;
T=Z[1]||0;
Z=Z[0]||0
}var O={inputRange:(S&&S.inputRange)?S.inputRange:[255,255,255],outputRange:(S&&S.outputRange)?S.outputRange:255};
switch(O.inputRange[0]){case 1:Z=Z*360;
break;
case 100:Z=(Z/100)*360;
break;
case 360:Z=Z;
break;
default:Z=(Z/255)*360
}if(Z==360){Z=0
}switch(O.inputRange[1]){case 100:T/=100;
break;
case 255:T/=255
}switch(O.inputRange[2]){case 100:V/=100;
break;
case 255:V/=255
}var R=null;
var Y=null;
var W=null;
if(T==0){R=V;
Y=V;
W=V
}else{var b=Z/60;
var a=Math.floor(b);
var X=b-a;
var P=V*(1-T);
var Q=V*(1-(T*X));
var U=V*(1-(T*(1-X)));
switch(a){case 0:R=V;
Y=U;
W=P;
break;
case 1:R=Q;
Y=V;
W=P;
break;
case 2:R=P;
Y=V;
W=U;
break;
case 3:R=P;
Y=Q;
W=V;
break;
case 4:R=U;
Y=P;
W=V;
break;
case 5:R=V;
Y=P;
W=Q;
break
}}switch(O.outputRange){case 1:R=dojo.math.round(R,2);
Y=dojo.math.round(Y,2);
W=dojo.math.round(W,2);
break;
case 100:R=Math.round(R*100);
Y=Math.round(Y*100);
W=Math.round(W*100);
break;
default:R=Math.round(R*255);
Y=Math.round(Y*255);
W=Math.round(W*255)
}return[R,Y,W]
}})
};