dojo._xdResourceLoaded({depends:[["provide","dojo.colors"],["provide","dijit.ColorPalette"],["provide","dijit.Declaration"],["provide","dojo.dnd.common"],["provide","dojo.dnd.autoscroll"],["provide","dojo.dnd.Mover"],["provide","dojo.dnd.Moveable"],["provide","dojo.dnd.move"],["provide","dojo.fx"],["provide","dojo.fx.Toggler"],["provide","dijit.layout.ContentPane"],["provide","dijit.form.Form"],["provide","dijit.Dialog"],["provide","dijit._editor.selection"],["provide","dijit._editor.RichText"],["provide","dijit.Toolbar"],["provide","dijit.form.Button"],["provide","dijit._editor._Plugin"],["provide","dijit.Editor"],["provide","dijit.Menu"],["provide","dojo.regexp"],["provide","dojo.number"],["provide","dijit.ProgressBar"],["provide","dijit.TitlePane"],["provide","dijit.Tooltip"],["provide","dojo.cookie"],["provide","dijit.Tree"],["provide","dijit.form.TextBox"],["provide","dijit.InlineEditBox"],["provide","dijit.form.CheckBox"],["provide","dojo.data.util.filter"],["provide","dojo.data.util.sorter"],["provide","dojo.data.util.simpleFetch"],["provide","dojo.data.ItemFileReadStore"],["provide","dijit.form.ValidationTextBox"],["provide","dijit.form.ComboBox"],["provide","dojo.cldr.monetary"],["provide","dojo.currency"],["provide","dijit.form.NumberTextBox"],["provide","dijit.form.CurrencyTextBox"],["provide","dojo.cldr.supplemental"],["provide","dojo.date"],["provide","dojo.date.locale"],["provide","dijit._Calendar"],["provide","dijit._TimePicker"],["provide","dijit.form.TimeTextBox"],["provide","dijit.form.DateTextBox"],["provide","dijit.form.FilteringSelect"],["provide","dijit.form._Spinner"],["provide","dijit.form.NumberSpinner"],["provide","dijit.form.Slider"],["provide","dijit.form.Textarea"],["provide","dijit.layout.StackContainer"],["provide","dijit.layout.AccordionContainer"],["provide","dijit.layout.LayoutContainer"],["provide","dijit.layout.LinkPane"],["provide","dijit.layout.SplitContainer"],["provide","dijit.layout.TabContainer"],["provide","dijit.dijit-all"],["i18n._preloadLocalizations","dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]]],defineResource:function(_1){if(!_1._hasResource["dojo.colors"]){_1._hasResource["dojo.colors"]=true;
_1.provide("dojo.colors");
(function(){var _2=function(m1,m2,h){if(h<0){++h
}if(h>1){--h
}var h6=6*h;
if(h6<1){return m1+(m2-m1)*h6
}if(2*h<1){return m2
}if(3*h<2){return m1+(m2-m1)*(2/3-h)*6
}return m1
};
_1.colorFromRgb=function(_7,_8){var m=_7.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1];
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){var r=c[0];
if(r.charAt(r.length-1)=="%"){var a=_1.map(c,function(x){return parseFloat(x)*2.56
});
if(l==4){a[3]=c[3]
}return _1.colorFromArray(a,_8)
}return _1.colorFromArray(c,_8)
}if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2,a=[_2(m1,m2,H+1/3)*256,_2(m1,m2,H)*256,_2(m1,m2,H-1/3)*256,1];
if(l==4){a[3]=c[3]
}return _1.colorFromArray(a,_8)
}}return null
};
var _15=function(c,low,_18){c=Number(c);
return isNaN(c)?_18:c<low?low:c>_18?_18:c
};
_1.Color.prototype.sanitize=function(){var t=this;
t.r=Math.round(_15(t.r,0,255));
t.g=Math.round(_15(t.g,0,255));
t.b=Math.round(_15(t.b,0,255));
t.a=_15(t.a,0,1);
return this
}
})();
_1.colors.makeGrey=function(g,a){return _1.colorFromArray([g,g,g,a])
};
_1.Color.named=_1.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},_1.Color.named)
}if(!_1._hasResource["dijit.ColorPalette"]){_1._hasResource["dijit.ColorPalette"]=true;
_1.provide("dijit.ColorPalette");
_1.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":_1.moduleUrl("dijit","templates/colors7x10.png"),"3x4":_1.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){_1.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var _1c=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=_1.i18n.getLocalization("dojo","colors",this.lang);
var url=_1.moduleUrl("dijit","templates/blank.gif");
var _1e=new _1.Color(),_1f=this._paletteCoords;
for(var row=0;
row<_1c.length;
row++){for(var col=0;
col<_1c[row].length;
col++){var _22=document.createElement("img");
_22.src=url;
_1.addClass(_22,"dijitPaletteImg");
var _23=_1c[row][col],_24=_1e.setColor(_1.Color.named[_23]);
_22.alt=this.colorNames[_23];
_22.color=_24.toHex();
var _25=_22.style;
_25.color=_25.backgroundColor=_22.color;
_1.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(_26){this.connect(_22,"on"+_26.toLowerCase(),"_onColor"+_26)
},this);
this.divNode.appendChild(_22);
_25.top=_1f.topOffset+(row*_1f.cHeight)+"px";
_25.left=_1f.leftOffset+(col*_1f.cWidth)+"px";
_22.setAttribute("tabIndex","-1");
_22.title=this.colorNames[_23];
dijit.setWaiRole(_22,"gridcell");
_22.index=this._highlightNodes.length;
this._highlightNodes.push(_22)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=_1c[0].length;
this._yDim=_1c.length;
var _27={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var key in _27){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:_1.keys[key],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var _29=_27[key];
return function(_2a){this._navigateByKey(_29,_2a)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(_2b){},_onColorDijitclick:function(evt){var _2d=evt.currentTarget;
if(this._currentFocus!=_2d.index){this._currentFocus=_2d.index;
dijit.focus(_2d)
}this._selectColor(_2d);
_1.stopEvent(evt)
},_onColorMouseOut:function(evt){_1.removeClass(evt.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(evt){var _30=evt.currentTarget;
_30.tabIndex=0;
_30.focus()
},_onColorBlur:function(evt){_1.removeClass(evt.currentTarget,"dijitPaletteImgHighlight");
evt.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(evt){if(this._currentFocus!=evt.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=evt.currentTarget.index;
_1.addClass(evt.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(_33){this.onChange(this.value=_33.color)
},_navigateByKey:function(_34,_35){if(_35==-1){return 
}var _36=this._currentFocus+_34;
if(_36<this._highlightNodes.length&&_36>-1){var _37=this._highlightNodes[_36];
_37.tabIndex=0;
_37.focus()
}}})
}if(!_1._hasResource["dijit.Declaration"]){_1._hasResource["dijit.Declaration"]=true;
_1.provide("dijit.Declaration");
_1.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var src=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var _39=_1.query("> script[type='dojo/method'][event='preamble']",src).orphan();
var _3a=_1.query("> script[type^='dojo/']",src).orphan();
var _3b=src.nodeName;
var _3c=this.defaults||{};
this.mixins=this.mixins.length?_1.map(this.mixins,function(_3d){return _1.getObject(_3d)
}):[dijit._Widget,dijit._Templated];
if(_39.length){_3c.preamble=_1.parser._functionFromScript(_39[0])
}var _3e=_1.map(_3a,function(s){var evt=s.getAttribute("event")||"postscript";
return{event:evt,func:_1.parser._functionFromScript(s)}
});
this.mixins.push(function(){_1.forEach(_3e,function(s){_1.connect(this,s.event,this,s.func)
},this)
});
_3c.widgetsInTemplate=true;
_3c._skipNodeCache=true;
_3c.templateString="<"+_3b+" class='"+src.className+"' dojoAttachPoint='"+(src.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(src.getAttribute("dojoAttachEvent")||"")+"' >"+src.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+_3b+">";
_1.query("[dojoType]",src).forEach(function(_42){_42.removeAttribute("dojoType")
});
_1.declare(this.widgetClass,this.mixins,_3c)
}})
}if(!_1._hasResource["dojo.dnd.common"]){_1._hasResource["dojo.dnd.common"]=true;
_1.provide("dojo.dnd.common");
_1.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
_1.dnd.getCopyKeyState=function(e){return e[_1.dnd._copyKey]
};
_1.dnd._uniqueId=0;
_1.dnd.getUniqueId=function(){var id;
do{id="dojoUnique"+(++_1.dnd._uniqueId)
}while(_1.byId(id));
return id
};
_1.dnd._empty={};
_1.dnd.isFormElement=function(e){var t=e.target;
if(t.nodeType==3){t=t.parentNode
}return" button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0
}
}if(!_1._hasResource["dojo.dnd.autoscroll"]){_1._hasResource["dojo.dnd.autoscroll"]=true;
_1.provide("dojo.dnd.autoscroll");
_1.dnd.getViewport=function(){var d=_1.doc,dd=d.documentElement,w=window,b=_1.body();
if(_1.isMozilla){return{w:dd.clientWidth,h:w.innerHeight}
}else{if(!_1.isOpera&&w.innerWidth){return{w:w.innerWidth,h:w.innerHeight}
}else{if(!_1.isOpera&&dd&&dd.clientWidth){return{w:dd.clientWidth,h:dd.clientHeight}
}else{if(b.clientWidth){return{w:b.clientWidth,h:b.clientHeight}
}}}}return null
};
_1.dnd.V_TRIGGER_AUTOSCROLL=32;
_1.dnd.H_TRIGGER_AUTOSCROLL=32;
_1.dnd.V_AUTOSCROLL_VALUE=16;
_1.dnd.H_AUTOSCROLL_VALUE=16;
_1.dnd.autoScroll=function(e){var v=_1.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<_1.dnd.H_TRIGGER_AUTOSCROLL){dx=-_1.dnd.H_AUTOSCROLL_VALUE
}else{if(e.clientX>v.w-_1.dnd.H_TRIGGER_AUTOSCROLL){dx=_1.dnd.H_AUTOSCROLL_VALUE
}}if(e.clientY<_1.dnd.V_TRIGGER_AUTOSCROLL){dy=-_1.dnd.V_AUTOSCROLL_VALUE
}else{if(e.clientY>v.h-_1.dnd.V_TRIGGER_AUTOSCROLL){dy=_1.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(dx,dy)
};
_1.dnd._validNodes={div:1,p:1,td:1};
_1.dnd._validOverflow={auto:1,scroll:1};
_1.dnd.autoScrollNodes=function(e){for(var n=e.target;
n;
){if(n.nodeType==1&&(n.tagName.toLowerCase() in _1.dnd._validNodes)){var s=_1.getComputedStyle(n);
if(s.overflow.toLowerCase() in _1.dnd._validOverflow){var b=_1._getContentBox(n,s),t=_1._abs(n,true);
b.l+=t.x+n.scrollLeft;
b.t+=t.y+n.scrollTop;
var w=Math.min(_1.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(_1.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-b.l,ry=e.pageY-b.t,dx=0,dy=0;
if(rx>0&&rx<b.w){if(rx<w){dx=-_1.dnd.H_AUTOSCROLL_VALUE
}else{if(rx>b.w-w){dx=_1.dnd.H_AUTOSCROLL_VALUE
}}}if(ry>0&&ry<b.h){if(ry<h){dy=-_1.dnd.V_AUTOSCROLL_VALUE
}else{if(ry>b.h-h){dy=_1.dnd.V_AUTOSCROLL_VALUE
}}}var _5a=n.scrollLeft,_5b=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_5a!=n.scrollLeft||_5b!=n.scrollTop){return 
}}}try{n=n.parentNode
}catch(x){n=null
}}_1.dnd.autoScroll(e)
}
}if(!_1._hasResource["dojo.dnd.Mover"]){_1._hasResource["dojo.dnd.Mover"]=true;
_1.provide("dojo.dnd.Mover");
_1.declare("dojo.dnd.Mover",null,{constructor:function(_5c,e,_5e){this.node=_1.byId(_5c);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=_5e,d=_5c.ownerDocument,_61=_1.connect(d,"onmousemove",this,"onFirstMove");
this.events=[_1.connect(d,"onmousemove",this,"onMouseMove"),_1.connect(d,"onmouseup",this,"onMouseUp"),_1.connect(d,"ondragstart",_1,"stopEvent"),_1.connect(d,"onselectstart",_1,"stopEvent"),_61];
if(h&&h.onMoveStart){h.onMoveStart(this)
}},onMouseMove:function(e){_1.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY})
},onMouseUp:function(e){if(this.mouseButton==e.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var m=_1.marginBox(this.node);
m.l-=this.marginBox.l;
m.t-=this.marginBox.t;
this.marginBox=m;
this.host.onFirstMove(this);
_1.disconnect(this.events.pop())
},destroy:function(){_1.forEach(this.events,_1.disconnect);
var h=this.host;
if(h&&h.onMoveStop){h.onMoveStop(this)
}this.events=this.node=null
}})
}if(!_1._hasResource["dojo.dnd.Moveable"]){_1._hasResource["dojo.dnd.Moveable"]=true;
_1.provide("dojo.dnd.Moveable");
_1.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(_67,_68){this.node=_1.byId(_67);
if(!_68){_68={}
}this.handle=_68.handle?_1.byId(_68.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=_68.delay>0?_68.delay:0;
this.skip=_68.skip;
this.mover=_68.mover?_68.mover:_1.dnd.Mover;
this.events=[_1.connect(this.handle,"onmousedown",this,"onMouseDown"),_1.connect(this.handle,"ondragstart",this,"onSelectStart"),_1.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(_69,_6a){return new _1.dnd.Moveable(_6a,_69)
},destroy:function(){_1.forEach(this.events,_1.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(e){if(this.skip&&_1.dnd.isFormElement(e)){return 
}if(this.delay){this.events.push(_1.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(_1.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY
}else{new this.mover(this.node,e,this)
}_1.stopEvent(e)
},onMouseMove:function(e){if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){this.onMouseUp(e);
new this.mover(this.node,e,this)
}_1.stopEvent(e)
},onMouseUp:function(e){_1.disconnect(this.events.pop());
_1.disconnect(this.events.pop())
},onSelectStart:function(e){if(!this.skip||!_1.dnd.isFormElement(e)){_1.stopEvent(e)
}},onMoveStart:function(_6f){_1.publish("/dnd/move/start",[_6f]);
_1.addClass(_1.body(),"dojoMove");
_1.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(_70){_1.publish("/dnd/move/stop",[_70]);
_1.removeClass(_1.body(),"dojoMove");
_1.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(_71){},onMove:function(_72,_73){this.onMoving(_72,_73);
_1.marginBox(_72.node,_73);
this.onMoved(_72,_73)
},onMoving:function(_74,_75){},onMoved:function(_76,_77){}})
}if(!_1._hasResource["dojo.dnd.move"]){_1._hasResource["dojo.dnd.move"]=true;
_1.provide("dojo.dnd.move");
_1.declare("dojo.dnd.move.constrainedMoveable",_1.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(_78,_79){return new _1.dnd.move.constrainedMoveable(_79,_78)
},constructor:function(_7a,_7b){if(!_7b){_7b={}
}this.constraints=_7b.constraints;
this.within=_7b.within
},onFirstMove:function(_7c){var c=this.constraintBox=this.constraints.call(this,_7c),m=_7c.marginBox;
c.r=c.l+c.w-(this.within?m.w:0);
c.b=c.t+c.h-(this.within?m.h:0)
},onMove:function(_7f,_80){var c=this.constraintBox;
_80.l=_80.l<c.l?c.l:c.r<_80.l?c.r:_80.l;
_80.t=_80.t<c.t?c.t:c.b<_80.t?c.b:_80.t;
_1.marginBox(_7f.node,_80)
}});
_1.declare("dojo.dnd.move.boxConstrainedMoveable",_1.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_82,_83){return new _1.dnd.move.boxConstrainedMoveable(_83,_82)
},constructor:function(_84,_85){var box=_85&&_85.box;
this.constraints=function(){return box
}
}});
_1.declare("dojo.dnd.move.parentConstrainedMoveable",_1.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_87,_88){return new _1.dnd.move.parentConstrainedMoveable(_88,_87)
},constructor:function(_89,_8a){var _8b=_8a&&_8a.area;
this.constraints=function(){var n=this.node.parentNode,s=_1.getComputedStyle(n),mb=_1._getMarginBox(n,s);
if(_8b=="margin"){return mb
}var t=_1._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_8b=="border"){return mb
}t=_1._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_8b=="padding"){return mb
}t=_1._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
}
}});
_1.dnd.move.constrainedMover=function(fun,_91){var _92=function(_93,e,_95){_1.dnd.Mover.call(this,_93,e,_95)
};
_1.extend(_92,_1.dnd.Mover.prototype);
_1.extend(_92,{onMouseMove:function(e){_1.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t})
},onFirstMove:function(){_1.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this),m=this.marginBox;
c.r=c.l+c.w-(_91?m.w:0);
c.b=c.t+c.h-(_91?m.h:0)
}});
return _92
};
_1.dnd.move.boxConstrainedMover=function(box,_9e){return _1.dnd.move.constrainedMover(function(){return box
},_9e)
};
_1.dnd.move.parentConstrainedMover=function(_9f,_a0){var fun=function(){var n=this.node.parentNode,s=_1.getComputedStyle(n),mb=_1._getMarginBox(n,s);
if(_9f=="margin"){return mb
}var t=_1._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_9f=="border"){return mb
}t=_1._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_9f=="padding"){return mb
}t=_1._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
};
return _1.dnd.move.constrainedMover(fun,_a0)
};
_1.dnd.constrainedMover=_1.dnd.move.constrainedMover;
_1.dnd.boxConstrainedMover=_1.dnd.move.boxConstrainedMover;
_1.dnd.parentConstrainedMover=_1.dnd.move.parentConstrainedMover
}if(!_1._hasResource["dojo.fx"]){_1._hasResource["dojo.fx"]=true;
_1.provide("dojo.fx");
_1.provide("dojo.fx.Toggler");
_1.fx.chain=function(_a6){var _a7=_a6.shift();
var _a8=_a7;
_1.forEach(_a6,function(_a9){_1.connect(_a8,"onEnd",_a9,"play");
_a8=_a9
});
return _a7
};
_1.fx.combine=function(_aa){var ctr=new _1._Animation({curve:[0,1]});
if(!_aa.length){return ctr
}ctr.duration=_aa[0].duration;
_1.forEach(_aa,function(_ac){_1.forEach(["play","pause","stop"],function(e){if(_ac[e]){_1.connect(ctr,e,_ac,e)
}})
});
return ctr
};
_1.declare("dojo.fx.Toggler",null,{constructor:function(_ae){var _t=this;
_1.mixin(_t,_ae);
_t.node=_ae.node;
_t._showArgs=_1.mixin({},_ae);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=_1.mixin({},_ae);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
_1.connect(_t.showAnim,"beforeBegin",_1.hitch(_t.hideAnim,"stop",true));
_1.connect(_t.hideAnim,"beforeBegin",_1.hitch(_t.showAnim,"stop",true))
},node:null,showFunc:_1.fadeIn,hideFunc:_1.fadeOut,showDuration:200,hideDuration:200,show:function(_b0){return this.showAnim.play(_b0||0)
},hide:function(_b1){return this.hideAnim.play(_b1||0)
}});
_1.fx.wipeIn=function(_b2){_b2.node=_1.byId(_b2.node);
var _b3=_b2.node,s=_b3.style;
var _b5=_1.animateProperty(_1.mixin({properties:{height:{start:function(){s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){s.height="1px";
s.display="";
s.visibility="";
return 1
}else{var _b6=_1.style(_b3,"height");
return Math.max(_b6,1)
}},end:function(){return _b3.scrollHeight
}}}},_b2));
_1.connect(_b5,"onEnd",function(){s.height="auto"
});
return _b5
};
_1.fx.wipeOut=function(_b7){var _b8=_b7.node=_1.byId(_b7.node);
var s=_b8.style;
var _ba=_1.animateProperty(_1.mixin({properties:{height:{end:1}}},_b7));
_1.connect(_ba,"beforeBegin",function(){s.overflow="hidden";
s.display=""
});
_1.connect(_ba,"onEnd",function(){s.height="auto";
s.display="none"
});
return _ba
};
_1.fx.slideTo=function(_bb){var _bc=(_bb.node=_1.byId(_bb.node));
var top=null;
var _be=null;
var _bf=(function(n){return function(){var cs=_1.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_be=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){var ret=_1.coords(n,true);
top=ret.y;
_be=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_be+"px"
}}
})(_bc);
_bf();
var _c4=_1.animateProperty(_1.mixin({properties:{top:{end:_bb.top||0},left:{end:_bb.left||0}}},_bb));
_1.connect(_c4,"beforeBegin",_c4,_bf);
return _c4
}
}if(!_1._hasResource["dijit.layout.ContentPane"]){_1._hasResource["dijit.layout.ContentPane"]=true;
_1.provide("dijit.layout.ContentPane");
_1.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var _c5=_1.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_1.string.substitute(this.loadingMessage,_c5);
this.errorMessage=_1.string.substitute(this.errorMessage,_c5);
_1.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var _c6=_1.query(">",this.containerNode||this.domNode),_c7=_c6.filter("[widgetId]");
if(_c6.length==1&&_c7.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(_c7[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(_c8){this.href=_c8;
return this._prepareLoad()
},setContent:function(_c9){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(_c9||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(_ca){_1.marginBox(this.domNode,_ca);
var _cb=this.containerNode||this.domNode,mb=_1.mixin(_1.marginBox(_cb),_ca||{});
this._contentBox=dijit.layout.marginBox2contentBox(_cb,mb);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(_cd){this.cancel();
this.isLoaded=false;
this._loadCheck(_cd)
},_loadCheck:function(_ce){var _cf=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(_ce||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&_cf&&!this._xhrDfd)||(!this.isLoaded&&_cf&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var _d0=this;
var _d1={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(_1.isObject(this.ioArgs)){_1.mixin(_d1,this.ioArgs)
}var _d2=this._xhrDfd=(this.ioMethod||_1.xhrGet)(_d1);
_d2.addCallback(function(_d3){try{_d0.onDownloadEnd.call(_d0);
_d0._isDownloaded=true;
_d0.setContent.call(_d0,_d3)
}catch(err){_d0._onError.call(_d0,"Content",err)
}delete _d0._xhrDfd;
return _d3
});
_d2.addErrback(function(err){if(!_d2.cancelled){_d0._onError.call(_d0,"Download",err)
}delete _d0._xhrDfd;
return err
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(_d5){this.destroyDescendants();
try{var _d6=this.containerNode||this.domNode;
while(_d6.firstChild){_1._destroyElement(_d6.firstChild)
}if(typeof _d5=="string"){if(this.extractContent){match=_d5.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){_d5=match[1]
}}_d6.innerHTML=_d5
}else{if(_d5.nodeType){_d6.appendChild(_d5)
}else{_1.forEach(_d5,function(n){_d6.appendChild(n.cloneNode(true))
})
}}}catch(e){var _d8=this.onContentError(e);
try{_d6.innerHTML=_d8
}catch(e){console.error("Fatal "+this.id+" could not change content due to "+e.message,e)
}}},_onError:function(_d9,err,_db){var _dc=this["on"+_d9+"Error"].call(this,err);
if(_db){console.error(_db,err)
}else{if(_dc){this._setContent.call(this,_dc)
}}},_createSubWidgets:function(){var _dd=this.containerNode||this.domNode;
try{_1.parser.parse(_dd,true)
}catch(e){this._onError("Content",e,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(e){},onUnload:function(e){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(_e0){},onDownloadError:function(_e1){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!_1._hasResource["dijit.form.Form"]){_1._hasResource["dijit.form.Form"]=true;
_1.provide("dijit.form.Form");
_1.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:_1.mixin(_1.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(_e2){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(e){_1.stopEvent(e);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(obj){var map={};
_1.forEach(this.getDescendants(),function(_e6){if(!_e6.name){return 
}var _e7=map[_e6.name]||(map[_e6.name]=[]);
_e7.push(_e6)
});
for(var _e8 in map){var _e9=map[_e8],_ea=_1.getObject(_e8,false,obj);
if(!_1.isArray(_ea)){_ea=[_ea]
}if(_e9[0].setChecked){_1.forEach(_e9,function(w,i){w.setChecked(_1.indexOf(_ea,w.value)!=-1)
})
}else{_1.forEach(_e9,function(w,i){w.setValue(_ea[i])
})
}}},getValues:function(){var obj={};
_1.forEach(this.getDescendants(),function(_f0){var _f1=_f0.getValue?_f0.getValue():_f0.value;
var _f2=_f0.name;
if(!_f2){return 
}if(_f0.setChecked){if(/Radio/.test(_f0.declaredClass)){if(_f0.checked){_1.setObject(_f2,_f1,obj)
}}else{var ary=_1.getObject(_f2,false,obj);
if(!ary){ary=[];
_1.setObject(_f2,ary,obj)
}if(_f0.checked){ary.push(_f1)
}}}else{_1.setObject(_f2,_f1,obj)
}});
return obj
},isValid:function(){return _1.every(this.getDescendants(),function(_f4){return !_f4.isValid||_f4.isValid()
})
}});
_1.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!_1._hasResource["dijit.Dialog"]){_1._hasResource["dijit.Dialog"]=true;
_1.provide("dijit.Dialog");
_1.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){_1.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var _f5=dijit.getViewport();
var is=this.node.style,os=this.domNode.style;
os.top=_f5.t+"px";
os.left=_f5.l+"px";
is.width=_f5.w+"px";
is.height=_f5.h+"px";
var _f8=dijit.getViewport();
if(_f5.w!=_f8.w){is.width=_f8.w+"px"
}if(_f5.h!=_f8.h){is.height=_f8.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
_1.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:_1.mixin(_1.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){_1.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new _1.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var _f9=this.domNode;
this._fadeIn=_1.fx.combine([_1.fadeIn({node:_f9,duration:this.duration}),_1.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:_1.hitch(this._underlay,"show")})]);
this._fadeOut=_1.fx.combine([_1.fadeOut({node:_f9,duration:this.duration,onEnd:function(){_f9.style.display="none"
}}),_1.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:_1.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(_1.hasClass(_1.body(),"dojoMove")){return 
}var _fa=dijit.getViewport();
var mb=_1.marginBox(this.domNode);
var _fc=this.domNode.style;
_fc.left=Math.floor((_fa.l+(_fa.w-mb.w)/2))+"px";
_fc.top=Math.floor((_fa.t+(_fa.h-mb.h)/2))+"px"
},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(evt){if(evt.keyCode){var node=evt.target;
if(node==this.titleBar&&evt.shiftKey&&evt.keyCode==_1.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}_1.stopEvent(evt)
}else{while(node){if(node==this.domNode){if(evt.keyCode==_1.keys.ESCAPE){this.hide()
}else{return 
}}node=node.parentNode
}if(evt.keyCode!=_1.keys.TAB){_1.stopEvent(evt)
}else{if(!_1.isOpera){try{this.titleBar.focus()
}catch(e){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(_1.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(_1.connect(document.documentElement,"onkeypress",this,"_onKey"));
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(_1.connect(this.containerNode,ev,this,"_findLastFocus"));
_1.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(_1.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}_1.forEach(this._modalconnects,_1.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",_1.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
_1.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,ev,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(_103){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(_103.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_103.charAt(0)=="T"?"Below":"Above")
},onOpen:function(pos){this.orient(pos.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(evt){if(evt.keyCode==_1.keys.ESCAPE){this.onCancel()
}else{if(evt.target==this.containerNode&&evt.shiftKey&&evt.keyCode==_1.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}_1.stopEvent(evt)
}else{if(evt.keyCode==_1.keys.TAB){evt.stopPropagation()
}}}},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!_1._hasResource["dijit._editor.selection"]){_1._hasResource["dijit._editor.selection"]=true;
_1.provide("dijit._editor.selection");
_1.mixin(dijit._editor.selection,{getType:function(){if(_1.doc.selection){return _1.doc.selection.type.toLowerCase()
}else{var _108="text";
var oSel;
try{oSel=_1.global.getSelection()
}catch(e){}if(oSel&&oSel.rangeCount==1){var _10a=oSel.getRangeAt(0);
if((_10a.startContainer==_10a.endContainer)&&((_10a.endOffset-_10a.startOffset)==1)&&(_10a.startContainer.nodeType!=3)){_108="control"
}}return _108
}},getSelectedText:function(){if(_1.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return _1.doc.selection.createRange().text
}else{var _10b=_1.global.getSelection();
if(_10b){return _10b.toString()
}}},getSelectedHtml:function(){if(_1.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return _1.doc.selection.createRange().htmlText
}else{var _10c=_1.global.getSelection();
if(_10c&&_10c.rangeCount){var frag=_10c.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(_1.doc.selection){var _10f=_1.doc.selection.createRange();
if(_10f&&_10f.item){return _1.doc.selection.createRange().item(0)
}}else{var _110=_1.global.getSelection();
return _110.anchorNode.childNodes[_110.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var p=this.getSelectedElement();
if(p){return p.parentNode
}}else{if(_1.doc.selection){return _1.doc.selection.createRange().parentElement()
}else{var _112=_1.global.getSelection();
if(_112){var node=_112.anchorNode;
while(node&&(node.nodeType!=1)){node=node.parentNode
}return node
}}}},hasAncestorElement:function(_114){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(_115){var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments)
},isTag:function(node,tags){if(node&&node.tagName){var _nlc=node.tagName.toLowerCase();
for(var i=0;
i<tags.length;
i++){var _tlc=String(tags[i]).toLowerCase();
if(_nlc==_tlc){return _tlc
}}}return""
},getParentOfType:function(node,tags){while(node){if(this.isTag(node,tags).length){return node
}node=node.parentNode
}return null
},remove:function(){var _s=_1.doc.selection;
if(_s){if(_s.type.toLowerCase()!="none"){_s.clear()
}return _s
}else{_s=_1.global.getSelection();
_s.deleteFromDocument();
return _s
}},selectElementChildren:function(_11f,_120){var _121=_1.global;
var _122=_1.doc;
_11f=_1.byId(_11f);
if(_122.selection&&_1.body().createTextRange){var _123=_11f.ownerDocument.body.createTextRange();
_123.moveToElementText(_11f);
if(!_120){_123.select()
}}else{if(_121.getSelection){var _124=_121.getSelection();
if(_124.setBaseAndExtent){_124.setBaseAndExtent(_11f,0,_11f,_11f.innerText.length-1)
}else{if(_124.selectAllChildren){_124.selectAllChildren(_11f)
}}}}},selectElement:function(_125,_126){var _127=_1.doc;
_125=_1.byId(_125);
if(_127.selection&&_1.body().createTextRange){try{var _128=_1.body().createControlRange();
_128.addElement(_125);
if(!_126){_128.select()
}}catch(e){this.selectElementChildren(_125,_126)
}}else{if(_1.global.getSelection){var _129=_1.global.getSelection();
if(_129.removeAllRanges){var _128=_127.createRange();
_128.selectNode(_125);
_129.removeAllRanges();
_129.addRange(_128)
}}}}})
}if(!_1._hasResource["dijit._editor.RichText"]){_1._hasResource["dijit._editor.RichText"]=true;
_1.provide("dijit._editor.RichText");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(_1._postLoad){(function(){var _12a=_1.doc.createElement("textarea");
_12a.id="dijit._editor.RichText.savedContent";
var s=_12a.style;
s.display="none";
s.position="absolute";
s.top="-100px";
s.left="-100px";
s.height="3px";
s.width="3px";
_1.body().appendChild(_12a)
})()
}else{try{_1.doc.write('<textarea id="dijit._editor.RichText.savedContent" style="display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;"></textarea>')
}catch(e){}}}_1.declare("dijit._editor.RichText",[dijit._Widget],{constructor:function(){this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this._keyHandlers={};
this.contentPreFilters.push(_1.hitch(this,"_preFixUrlAttributes"));
if(_1.isMoz){this.contentPreFilters.push(this._fixContentForMoz)
}this.onLoadDeferred=new _1.Deferred()
},inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",_content:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",onLoadDeferred:null,postCreate:function(){_1.publish("dijit._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts()
},setupDefaultShortcuts:function(){var ctrl=this.KEY_CTRL;
var exec=function(cmd,arg){return arguments.length==1?function(){this.execCommand(cmd)
}:function(){this.execCommand(cmd,arg)
}
};
this.addKeyHandler("b",ctrl,exec("bold"));
this.addKeyHandler("i",ctrl,exec("italic"));
this.addKeyHandler("u",ctrl,exec("underline"));
this.addKeyHandler("a",ctrl,exec("selectall"));
this.addKeyHandler("s",ctrl,function(){this.save(true)
});
this.addKeyHandler("1",ctrl,exec("formatblock","h1"));
this.addKeyHandler("2",ctrl,exec("formatblock","h2"));
this.addKeyHandler("3",ctrl,exec("formatblock","h3"));
this.addKeyHandler("4",ctrl,exec("formatblock","h4"));
this.addKeyHandler("\\",ctrl,exec("insertunorderedlist"));
if(!_1.isIE){this.addKeyHandler("Z",ctrl,exec("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var _130=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var _131="",_132,i=0;
while((_132=_130[i++])){if(_132.charAt(1)!="l"){_131+="<"+_132+"><span>content</span></"+_132+">"
}else{_131+="<"+_132+"><li>content</li></"+_132+">"
}}var div=document.createElement("div");
div.style.position="absolute";
div.style.left="-2000px";
div.style.top="-2000px";
document.body.appendChild(div);
div.innerHTML=_131;
var node=div.firstChild;
while(node){dijit._editor.selection.selectElement(node.firstChild);
_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[node.firstChild]);
var _136=node.tagName.toLowerCase();
this._local2NativeFormatNames[_136]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_136]]=_136;
node=node.nextSibling
}document.body.removeChild(div)
},open:function(_137){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new _1.Deferred()
}if(!this.isClosed){this.close()
}_1.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(_137.nodeName)){this.domNode=_137
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=_1.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
_1.place(this.domNode,this.textarea,"before");
var _139=_1.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(_1.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(_1.isIE){setTimeout(_139,10)
}else{_139()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var _13a=_1.contentBox(this.domNode);
this._oldHeight=_13a.h;
this._oldWidth=_13a.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=_1.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var _13b=_1.byId("dijit._editor.RichText.savedContent");
if(_13b.value!=""){var _13c=_13b.value.split(this._SEPARATOR),i=0,dat;
while((dat=_13c[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
_13c.splice(i,1);
break
}}}_1.connect(window,"onbeforeunload",this,"_saveContent")
}this.isClosed=false;
if(_1.isIE||_1.isSafari||_1.isOpera){var ifr=this.iframe=_1.doc.createElement("iframe");
ifr.src="javascript:void(0)";
this.editorObject=ifr;
ifr.style.border="none";
ifr.style.width="100%";
ifr.frameBorder=0;
this.editingArea.appendChild(ifr);
this.window=ifr.contentWindow;
this.document=this.window.document;
this.document.open();
this.document.write(this._getIframeDocTxt(html));
this.document.close();
if(_1.isIE>=7){if(this.height){ifr.style.height=this.height
}if(this.minHeight){ifr.style.minHeight=this.minHeight
}}else{ifr.style.height=this.height?this.height:this.minHeight
}if(_1.isIE){this._localizeEditorCommands()
}this.onLoad()
}else{this._drawIframe(html)
}if(this.domNode.nodeName=="LI"){this.domNode.lastChild.style.marginTop="-1.2em"
}this.domNode.className+=" RichTextEditable"
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(html){var _cs=_1.getComputedStyle(this.domNode);
if(!this.height&&!_1.isMoz){html="<div>"+html+"</div>"
}var font=[_cs.fontWeight,_cs.fontSize,_cs.fontFamily].join(" ");
var _144=_cs.lineHeight;
if(_144.indexOf("px")>=0){_144=parseFloat(_144)/parseFloat(_cs.fontSize)
}else{if(_144.indexOf("em")>=0){_144=parseFloat(_144)
}else{_144="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(_1.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","\tbackground:transparent;","\tpadding: 0;","\tmargin: 0;","}","body{","\ttop:0px; left:0px; right:0px;",((this.height||_1.isOpera)?"":"position: fixed;"),"\tfont:",font,";","\tmin-height:",this.minHeight,";","\tline-height:",_144,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+html+"</body></html>"].join("")
},_drawIframe:function(html){if(!this.iframe){var ifr=this.iframe=_1.doc.createElement("iframe");
var ifrs=ifr.style;
ifrs.border="none";
ifrs.lineHeight="0";
ifrs.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=_1.i18n.getLocalization("dijit","Textarea");
var _148=_1.query('label[for="'+this.id+'"]');
if(_148.length){this._localizedIframeTitles.iframeEditTitle=_148[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var _149=this.srcNodeRef
}else{var _149=_1.doc.createElement("div");
_149.style.display="none";
_149.innerHTML=html;
this.editingArea.appendChild(_149)
}this.editingArea.appendChild(this.iframe);
var _14a=false;
var _14b=this.iframe.contentDocument;
_14b.open();
_14b.write(this._getIframeDocTxt(html));
_14b.close();
var _14c=_1.hitch(this,function(){if(!_14a){_14a=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(e){setTimeout(_14c,500);
_14a=false;
return 
}_1._destroyElement(_149);
this.document.designMode="on";
this.onLoad()
}else{_1._destroyElement(_149);
this.editNode.innerHTML=html;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
_14c()
},_applyEditingAreaStyleSheets:function(){var _14d=[];
if(this.styleSheets){_14d=this.styleSheets.split(";");
this.styleSheets=""
}_14d=_14d.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url;
while((url=_14d[i++])){var _151=(new _1._Url(_1.global.location,url)).toString();
this.editingAreaStyleSheets.push(_151);
text+='<link rel="stylesheet" type="text/css" href="'+_151+'"/>'
}return text
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new _1._Url(_1.global.location,url)).toString()
}if(_1.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var _155=this.document.createElement("link");
with(_155){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(_155)
}},removeStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new _1._Url(_1.global.location,url)).toString()
}var _158=_1.indexOf(this.editingAreaStyleSheets,url);
if(_158==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+url+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[_158];
_1.withGlobal(this.window,"query",_1,['link:[href="'+url+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(_159){if(_1.isIE||_1.isSafari||_1.isOpera){this.editNode.contentEditable=!_159
}else{if(_159){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(_159?"off":"on");
if(!_159){_1.forEach(this._mozSettingProps,function(s,i){this.document.execCommand(s,false,this._mozSettings[i])
},this)
}}this.disabled=_159
},_isResized:function(){return false
},onLoad:function(e){this.isLoaded=true;
if(this.height||_1.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var _15d=this.events.concat(this.captureEvents),i=0,et;
while((et=_15d[i++])){this.connect(this.document,et.toLowerCase(),et)
}if(!_1.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(e2){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(e);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(e){if(_1.isIE){if(e.keyCode===_1.keys.BACKSPACE&&this.document.selection.type==="Control"){_1.stopEvent(e);
this.execCommand("delete")
}else{if((65<=e.keyCode&&e.keyCode<=90)||(e.keyCode>=37&&e.keyCode<=40)){e.charCode=e.keyCode;
this.onKeyPress(e)
}}}else{if(_1.isMoz){if(e.keyCode==_1.keys.TAB&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
_1.stopEvent(e)
}else{if(e.keyCode==_1.keys.TAB&&e.shiftKey){if(this.toolbar){this.toolbar.focus()
}_1.stopEvent(e)
}}}}},onKeyUp:function(e){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(e){var _163=e.ctrlKey?this.KEY_CTRL:0|e.shiftKey?this.KEY_SHIFT:0;
var key=e.keyChar||e.keyCode;
if(this._keyHandlers[key]){var _165=this._keyHandlers[key],i=0,h;
while((h=_165[i++])){if(_163==h.modifiers){if(!h.handler.apply(this,arguments)){e.preventDefault()
}break
}}}setTimeout(_1.hitch(this,function(){this.onKeyPressed(e)
}),1)
},addKeyHandler:function(key,_169,_16a){if(!_1.isArray(this._keyHandlers[key])){this._keyHandlers[key]=[]
}this._keyHandlers[key].push({modifiers:_169||0,handler:_16a})
},onKeyPressed:function(e){this.onDisplayChanged()
},onClick:function(e){this.onDisplayChanged(e)
},_onBlur:function(e){var _c=this.getValue(true);
if(_c!=this.savedContent){this.onChange(_c);
this.savedContent=_c
}if(_1.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(e){if((_1.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!_1.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(e){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(_1.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(_171){},_normalizeCommand:function(cmd){var _173=cmd.toLowerCase();
if(_173=="formatblock"){if(_1.isSafari){_173="heading"
}}else{if(_173=="hilitecolor"&&!_1.isMoz){_173="backcolor"
}}return _173
},queryCommandAvailable:function(_174){var ie=1;
var _176=1<<1;
var _177=1<<2;
var _178=1<<3;
var _179=1<<4;
var _17a=_1.isSafari;
function isSupportedBy(_17b){return{ie:Boolean(_17b&ie),mozilla:Boolean(_17b&_176),safari:Boolean(_17b&_177),safari420:Boolean(_17b&_179),opera:Boolean(_17b&_178)}
}var _17c=null;
switch(_174.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":_17c=isSupportedBy(_176|ie|_177|_178);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":_17c=isSupportedBy(_176|ie|_178|_179);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":_17c=isSupportedBy(ie);
break;
case"cut":case"copy":case"paste":_17c=isSupportedBy(ie|_176|_179);
break;
case"inserttable":_17c=isSupportedBy(_176|ie);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":_17c=isSupportedBy(ie|_176);
break;
default:return false
}return(_1.isIE&&_17c.ie)||(_1.isMoz&&_17c.mozilla)||(_1.isSafari&&_17c.safari)||(_17a&&_17c.safari420)||(_1.isOpera&&_17c.opera)
},execCommand:function(_17d,_17e){var _17f;
this.focus();
_17d=this._normalizeCommand(_17d);
if(_17e!=undefined){if(_17d=="heading"){throw new Error("unimplemented")
}else{if((_17d=="formatblock")&&_1.isIE){_17e="<"+_17e+">"
}}}if(_17d=="inserthtml"){_17e=this._preFilterContent(_17e);
if(_1.isIE){var _180=this.document.selection.createRange();
_180.pasteHTML(_17e);
_180.select();
_17f=true
}else{if(_1.isMoz&&!_17e.length){_1.withGlobal(this.window,"remove",dijit._editor.selection);
_17f=true
}else{_17f=this.document.execCommand(_17d,false,_17e)
}}}else{if((_17d=="unlink")&&(this.queryCommandEnabled("unlink"))&&(_1.isMoz||_1.isSafari)){var _181=this.window.getSelection();
var a=_1.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[a]);
_17f=this.document.execCommand("unlink",false,null)
}else{if((_17d=="hilitecolor")&&(_1.isMoz)){this.document.execCommand("styleWithCSS",false,true);
_17f=this.document.execCommand(_17d,false,_17e);
this.document.execCommand("styleWithCSS",false,false)
}else{if((_1.isIE)&&((_17d=="backcolor")||(_17d=="forecolor"))){_17e=arguments.length>1?_17e:null;
_17f=this.document.execCommand(_17d,false,_17e)
}else{_17e=arguments.length>1?_17e:null;
if(_17e||_17d!="createlink"){_17f=this.document.execCommand(_17d,false,_17e)
}}}}}this.onDisplayChanged();
return _17f
},queryCommandEnabled:function(_183){_183=this._normalizeCommand(_183);
if(_1.isMoz||_1.isSafari){if(_183=="unlink"){return _1.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(_183=="inserttable"){return true
}}}if(_1.isSafari){if(_183=="copy"){_183="cut"
}else{if(_183=="paste"){return true
}}}var elem=(_1.isIE)?this.document.selection.createRange():this.document;
return elem.queryCommandEnabled(_183)
},queryCommandState:function(_185){_185=this._normalizeCommand(_185);
return this.document.queryCommandState(_185)
},queryCommandValue:function(_186){_186=this._normalizeCommand(_186);
if(_1.isIE&&_186=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(_186)]
}return this.document.queryCommandValue(_186)
},placeCursorAtStart:function(){this.focus();
var _187=false;
if(_1.isMoz){var _188=this.editNode.firstChild;
while(_188){if(_188.nodeType==3){if(_188.nodeValue.replace(/^\s+|\s+$/g,"").length>0){_187=true;
_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[_188]);
break
}}else{if(_188.nodeType==1){_187=true;
_1.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[_188]);
break
}}_188=_188.nextSibling
}}else{_187=true;
_1.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(_187){_1.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var _189=false;
if(_1.isMoz){var last=this.editNode.lastChild;
while(last){if(last.nodeType==3){if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){_189=true;
_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[last]);
break
}}else{if(last.nodeType==1){_189=true;
if(last.lastChild){_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[last.lastChild])
}else{_1.withGlobal(this.window,"selectElement",dijit._editor.selection,[last])
}break
}}last=last.previousSibling
}}else{_189=true;
_1.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(_189){_1.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(_18b){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,_18b)
},setValue:function(html){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=html
}else{html=this._preFilterContent(html);
if(this.isClosed){this.domNode.innerHTML=html;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=html;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(html){if(this.isClosed){this.setValue(html)
}else{if(this.window&&this.window.getSelection&&!_1.isMoz){this.setValue(html)
}else{if(this.window&&this.window.getSelection){html=this._preFilterContent(html);
this.execCommand("selectall");
if(_1.isMoz&&!html){html="&nbsp;"
}this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(html)
}}}}},_preFilterContent:function(html){var ec=html;
_1.forEach(this.contentPreFilters,function(ef){if(ef){ec=ef(ec)
}});
return ec
},_preDomFilterContent:function(dom){dom=dom||this.editNode;
_1.forEach(this.contentDomPreFilters,function(ef){if(ef&&_1.isFunction(ef)){ef(dom)
}},this)
},_postFilterContent:function(dom,_194){dom=dom||this.editNode;
if(this.contentDomPostFilters.length){if(_194&&dom.cloneNode){dom=dom.cloneNode(true)
}_1.forEach(this.contentDomPostFilters,function(ef){dom=ef(dom)
})
}var ec=this.getNodeChildrenHtml(dom);
if(!ec.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){ec=""
}_1.forEach(this.contentPostFilters,function(ef){ec=ef(ec)
});
return ec
},_saveContent:function(e){var _199=_1.byId("dijit._editor.RichText.savedContent");
_199.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(str,_19b){str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_19b){str=str.replace(/'/gm,"&#39;")
}return str
},getNodeHtml:function(node){switch(node.nodeType){case 1:var _19d="<"+node.tagName.toLowerCase();
if(_1.isMoz){if(node.getAttribute("type")=="_moz"){node.removeAttribute("type")
}if(node.getAttribute("_moz_dirty")!=undefined){node.removeAttribute("_moz_dirty")
}}var _19e=[];
if(_1.isIE){var s=node.outerHTML;
s=s.substr(0,s.indexOf(">"));
s=s.replace(/(?:['"])[^"']*\1/g,"");
var reg=/([^\s=]+)=/g;
var m,key;
while((m=reg.exec(s))!=undefined){key=m[1];
if(key.substr(0,3)!="_dj"){if(key=="src"||key=="href"){if(node.getAttribute("_djrealurl")){_19e.push([key,node.getAttribute("_djrealurl")]);
continue
}}if(key=="class"){_19e.push([key,node.className])
}else{_19e.push([key,node.getAttribute(key)])
}}}}else{var attr,i=0,_1a5=node.attributes;
while((attr=_1a5[i++])){if(attr.name.substr(0,3)!="_dj"){var v=attr.value;
if(attr.name=="src"||attr.name=="href"){if(node.getAttribute("_djrealurl")){v=node.getAttribute("_djrealurl")
}}_19e.push([attr.name,v])
}}}_19e.sort(function(a,b){return a[0]<b[0]?-1:(a[0]==b[0]?0:1)
});
i=0;
while((attr=_19e[i++])){_19d+=" "+attr[0]+'="'+attr[1]+'"'
}if(node.childNodes.length){_19d+=">"+this.getNodeChildrenHtml(node)+"</"+node.tagName.toLowerCase()+">"
}else{_19d+=" />"
}break;
case 3:var _19d=this.escapeXml(node.nodeValue,true);
break;
case 8:var _19d="<!--"+this.escapeXml(node.nodeValue,true)+"-->";
break;
default:var _19d="Element not recognized - Type: "+node.nodeType+" Name: "+node.nodeName
}return _19d
},getNodeChildrenHtml:function(dom){var out="";
if(!dom){return out
}var _1ab=dom.childNodes||dom;
var i=0;
var node;
while((node=_1ab[i++])){out+=this.getNodeHtml(node)
}return out
},close:function(save,_1af){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var _1b0=(this.savedContent!=this._content);
if(this.interval){clearInterval(this.interval)
}if(this.textarea){with(this.textarea.style){position="";
left=top="";
if(_1.isIE){overflow=this.__overflow;
this.__overflow=null
}}if(save){this.textarea.value=this._content
}else{this.textarea.value=this.savedContent
}_1._destroyElement(this.domNode);
this.domNode=this.textarea
}else{if(save){this.domNode.innerHTML=this._content
}else{this.domNode.innerHTML=this.savedContent
}}_1.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
if(this.window&&this.window._frameElement){this.window._frameElement=null
}this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
return _1b0
},destroyRendering:function(){},destroy:function(){this.destroyRendering();
if(!this.isClosed){this.close(false)
}this.inherited("destroy",arguments)
},_fixContentForMoz:function(html){html=html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
html=html.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return html
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(html){html=html.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
html=html.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return html
}})
}if(!_1._hasResource["dijit.Toolbar"]){_1._hasResource["dijit.Toolbar"]=true;
_1.provide("dijit.Toolbar");
_1.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[_1.keys.LEFT_ARROW]:[_1.keys.RIGHT_ARROW],this.isLeftToRight()?[_1.keys.RIGHT_ARROW]:[_1.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
_1.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){_1.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!_1._hasResource["dijit.form.Button"]){_1._hasResource["dijit.form.Button"]=true;
_1.provide("dijit.form.Button");
_1.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(e){if(this.disabled){return false
}this._clicked();
return this.onClick(e)
},_onButtonClick:function(e){_1.stopEvent(e);
var _1b5=this._onClick(e)!==false;
if(this.type=="submit"&&_1b5){for(var node=this.domNode;
node;
node=node.parentNode){var _1b7=dijit.byNode(node);
if(_1b7&&_1b7._onSubmit){_1b7._onSubmit(e);
break
}if(node.tagName.toLowerCase()=="form"){if(!node.onsubmit||node.onsubmit()){node.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var _1b8="";
this.label=this.containerNode.innerHTML;
_1b8=_1.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=_1b8;
_1.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(e){return true
},_clicked:function(e){},setLabel:function(_1bb){this.containerNode.innerHTML=this.label=_1bb;
if(_1.isMozilla){var _1bc=_1.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var _1bd=this;
setTimeout(function(){_1bd.domNode.style.display=_1bc
},1)
}if(this.showLabel==false){this.titleNode.title=_1.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
_1.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var _1be=_1.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_1be[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var _1bf=_1.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_1bf);
delete this.dropDownContainer
}_1.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(e){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(e){var _1c2=_1.isFF&&_1.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!_1c2||e.detail!=0||this._seenKeydown){this._onArrowClick(e)
}this._seenKeydown=false
},_onDropDownKeydown:function(e){this._seenKeydown=true
},_onDropDownBlur:function(e){this._seenKeydown=false
},_onKey:function(e){if(this.disabled){return 
}if(e.keyCode==_1.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){_1.stopEvent(e);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var _1c6=this.dropDown;
if(!_1c6){return false
}if(!_1c6.isShowingNow){if(_1c6.href&&!_1c6.isLoaded){var self=this;
var _1c8=_1.connect(_1c6,"onLoad",function(){_1.disconnect(_1c8);
self._openDropDown()
});
_1c6._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var _1c9=this.dropDown;
var _1ca=_1c9.domNode.style.width;
var self=this;
dijit.popup.open({parent:this,popup:_1c9,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){self._closeDropDown(true)
},onCancel:function(){self._closeDropDown(true)
},onClose:function(){_1c9.domNode.style.width=_1ca;
self.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>_1c9.domNode.offsetWidth){var _1cc=null;
if(!this.isLeftToRight()){_1cc=_1c9.domNode.parentNode;
var _1cd=_1cc.offsetLeft+_1cc.offsetWidth
}_1.marginBox(_1c9.domNode,{w:this.domNode.offsetWidth});
if(_1cc){_1cc.style.left=_1cd-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(_1c9.focus){_1c9.focus()
}},_closeDropDown:function(_1ce){if(this._opened){dijit.popup.close(this.dropDown);
if(_1ce){this.focus()
}this._opened=false
}}});
_1.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:_1.mixin(_1.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
_1.forEach(this._focalNodes,_1.hitch(this,function(node){if(_1.isIE){this.connect(node,"onactivate",this._onNodeFocus)
}else{this.connect(node,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(node){this._focusedNode=node;
dijit.focus(node)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(evt){this._focusedNode=evt.currentTarget
},_onBlur:function(evt){this.inherited(arguments);
this._focusedNode=null
}});
_1.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(evt){this.setChecked(!this.checked)
},setChecked:function(_1d4){this.checked=_1d4;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(_1d4)
}})
}if(!_1._hasResource["dijit._editor._Plugin"]){_1._hasResource["dijit._editor._Plugin"]=true;
_1.provide("dijit._editor._Plugin");
_1.declare("dijit._editor._Plugin",null,{constructor:function(args,node){if(args){_1.mixin(this,args)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var _1d7=this.editor.commands[this.command];
var _1d8="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var _1d9={label:_1d7,showLabel:false,iconClass:_1d8,dropDown:this.dropDown};
this.button=new this.buttonClass(_1d9)
}}},updateState:function(){var _e=this.editor;
var _c=this.command;
if(!_e){return 
}if(!_e.isLoaded){return 
}if(!_c.length){return 
}if(this.button){try{var _1dc=_e.queryCommandEnabled(_c);
this.button.setDisabled(!_1dc);
if(this.button.setChecked){this.button.setChecked(_e.queryCommandState(_c))
}}catch(e){console.debug(e)
}}},setEditor:function(_1dd){this.editor=_1dd;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){_1.connect(this.button,"onClick",_1.hitch(this.editor,"execCommand",this.command,this.commandArg))
}_1.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(_1de){if(this.button){_1de.addChild(this.button)
}}})
}if(!_1._hasResource["dijit.Editor"]){_1._hasResource["dijit.Editor"]=true;
_1.provide("dijit.Editor");
_1.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){_1.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(_1.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=_1.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var _1df=_1.doc.createElement("div");
_1.place(_1df,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},_1df)
}_1.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){_1.forEach(this._plugins,function(p){if(p.destroy){p.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(_1e1,_1e2){var args=_1.isString(_1e1)?{name:_1e1}:_1e1;
if(!args.setEditor){var o={args:args,plugin:null,editor:this};
_1.publish("dijit.Editor.getPlugin",[o]);
if(!o.plugin){var pc=_1.getObject(args.name);
if(pc){o.plugin=new pc(args)
}}if(!o.plugin){console.debug("Cannot find plugin",_1e1);
return 
}_1e1=o.plugin
}if(arguments.length>1){this._plugins[_1e2]=_1e1
}else{this._plugins.push(_1e1)
}_1e1.setEditor(this);
if(_1.isFunction(_1e1.setToolbar)){_1e1.setToolbar(this.toolbar)
}},customUndo:_1.isIE,editActionInterval:3,beginEditing:function(cmd){if(!this._inEditing){this._inEditing=true;
this._beginEditing(cmd)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(_1.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(cmd){if(this.customUndo&&(cmd=="undo"||cmd=="redo")){return this[cmd]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var r=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return r
}catch(e){if(_1.isMoz&&/copy|cut|paste/.test(cmd)){var sub=_1.string.substitute,_1ea={cut:"X",copy:"C",paste:"V"},_1eb=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(sub(this.commands.systemShortcutFF,[this.commands[cmd],sub(this.commands[_1eb?"appleKey":"ctrlKey"],[_1ea[cmd]])]))
}return false
}}},queryCommandEnabled:function(cmd){if(this.customUndo&&(cmd=="undo"||cmd=="redo")){return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(from,to){this.setValue(to.text);
var b=to.bookmark;
if(!b){return 
}if(_1.isIE){if(_1.isArray(b)){var tmp=[];
_1.forEach(b,function(n){tmp.push(dijit.range.getNode(n,this.editNode))
},this);
b=tmp
}}else{var r=dijit.range.create();
r.setStart(dijit.range.getNode(b.startContainer,this.editNode),b.startOffset);
r.setEnd(dijit.range.getNode(b.endContainer,this.editNode),b.endOffset);
b=r
}_1.withGlobal(this.window,"moveToBookmark",dijit,[b])
},undo:function(){this.endEditing(true);
var s=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
return true
}return false
},endEditing:function(_1f5){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(_1f5);
this._inEditing=false
}},_getBookmark:function(){var b=_1.withGlobal(this.window,dijit.getBookmark);
if(_1.isIE){if(_1.isArray(b)){var tmp=[];
_1.forEach(b,function(n){tmp.push(dijit.range.getIndex(n,this.editNode).o)
},this);
b=tmp
}}else{var tmp=dijit.range.getIndex(b.startContainer,this.editNode).o;
b={startContainer:tmp,startOffset:b.startOffset,endContainer:b.endContainer===b.startContainer?tmp:dijit.range.getIndex(b.endContainer,this.editNode).o,endOffset:b.endOffset}
}return b
},_beginEditing:function(cmd){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(_1fa){var v=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()})
},onKeyDown:function(e){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var k=e.keyCode,ks=_1.keys;
if(e.ctrlKey){if(k===90||k===122){_1.stopEvent(e);
this.undo();
return 
}else{if(k===89||k===121){_1.stopEvent(e);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(k){case ks.ENTER:this.beginEditing();
break;
case ks.BACKSPACE:case ks.DELETE:this.beginEditing();
break;
case 88:case 86:if(e.ctrlKey&&!e.altKey&&!e.metaKey){this.endEditing();
if(e.keyCode==88){this.beginEditing("cut");
setTimeout(_1.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(_1.hitch(this,this.endEditing),1)
}break
}default:if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<_1.keys.F1||e.keyCode>_1.keys.F15)){this.beginEditing();
break
}case ks.ALT:this.endEditing();
break;
case ks.UP_ARROW:case ks.DOWN_ARROW:case ks.LEFT_ARROW:case ks.RIGHT_ARROW:case ks.HOME:case ks.END:case ks.PAGE_UP:case ks.PAGE_DOWN:this.endEditing(true);
break;
case ks.CTRL:case ks.SHIFT:case ks.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
_1.subscribe("dijit.Editor.getPlugin",null,function(o){if(o.plugin){return 
}var args=o.args,p;
var _p=dijit._editor._Plugin;
var name=args.name;
switch(name){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":p=new _p({command:name});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":p=new _p({buttonClass:dijit.form.ToggleButton,command:name});
break;
case"|":p=new _p({button:new dijit.ToolbarSeparator()});
break;
case"createLink":p=new dijit._editor.plugins.LinkDialog({command:name});
break;
case"foreColor":case"hiliteColor":p=new dijit._editor.plugins.TextColor({command:name});
break;
case"fontName":case"fontSize":case"formatBlock":p=new dijit._editor.plugins.FontChoice({command:name})
}o.plugin=p
})
}if(!_1._hasResource["dijit.Menu"]){_1._hasResource["dijit.Menu"]=true;
_1.provide("dijit.Menu");
_1.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(_1.body())
}else{_1.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([_1.keys.UP_ARROW],[_1.keys.DOWN_ARROW])
},startup:function(){_1.forEach(this.getChildren(),function(_204){_204.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(_205){},_moveToPopup:function(evt){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(evt)
}},_onKeyPress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}switch(evt.keyCode){case _1.keys.RIGHT_ARROW:this._moveToPopup(evt);
_1.stopEvent(evt);
break;
case _1.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{_1.stopEvent(evt)
}break
}},onItemHover:function(item){this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(_1.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(item){dijit.popup.close(item.popup);
item._blur();
this._stopPopupTimer()
},onItemUnhover:function(item){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var top=this;
top.parentMenu;
top=top.parentMenu){}return top
},onItemClick:function(item){if(item.disabled){return false
}if(item.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
item.onClick()
}},_iframeContentWindow:function(_20d){var win=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(_20d))||dijit.Menu._iframeContentDocument(_20d)["__parent__"]||(_20d.name&&document.frames[_20d.name])||null;
return win
},_iframeContentDocument:function(_20f){var doc=_20f.contentDocument||(_20f.contentWindow&&_20f.contentWindow.document)||(_20f.name&&document.frames[_20f.name]&&document.frames[_20f.name].document)||null;
return doc
},bindDomNode:function(node){node=_1.byId(node);
var win=dijit.getDocumentWindow(node.ownerDocument);
if(node.tagName.toLowerCase()=="iframe"){win=this._iframeContentWindow(node);
node=_1.withGlobal(win,_1.body)
}var cn=(node==_1.body()?_1.doc:node);
node[this.id]=this._bindings.push([_1.connect(cn,"oncontextmenu",this,"_openMyself"),_1.connect(cn,"onkeydown",this,"_contextKey"),_1.connect(cn,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(_214){var node=_1.byId(_214);
var bid=node[this.id]-1,b=this._bindings[bid];
_1.forEach(b,_1.disconnect);
delete this._bindings[bid]
},_contextKey:function(e){this._contextMenuWithMouse=false;
if(e.keyCode==_1.keys.F10){_1.stopEvent(e);
if(e.shiftKey&&e.type=="keydown"){var _e={target:e.target,pageX:e.pageX,pageY:e.pageY};
_e.preventDefault=_e.stopPropagation=function(){};
window.setTimeout(_1.hitch(this,function(){this._openMyself(_e)
}),1)
}}},_contextMouse:function(e){this._contextMenuWithMouse=true
},_openMyself:function(e){_1.stopEvent(e);
var x,y;
if(_1.isSafari||this._contextMenuWithMouse){x=e.pageX;
y=e.pageY
}else{var _21e=_1.coords(e.target,true);
x=_21e.x+10;
y=_21e.y+10
}var self=this;
var _220=dijit.getFocus(this);
function closeAndRestoreFocus(){dijit.focus(_220);
dijit.popup.close(self)
}dijit.popup.open({popup:this,x:x,y:y,onExecute:closeAndRestoreFocus,onCancel:closeAndRestoreFocus,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(e){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var _222=this.focusedChild;
var _223=_222.popup;
if(_223.isShowingNow){return 
}_223.parentMenu=this;
var self=this;
dijit.popup.open({parent:this,popup:_223,around:_222.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(_223);
_222.focus();
self.currentPopup=null
}});
this.currentPopup=_223;
if(_223.focus){_223.focus()
}}});
_1.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){_1.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(evt){this.getParent().onItemClick(this);
_1.stopEvent(evt)
},onClick:function(){},focus:function(){_1.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(e){}},_blur:function(){_1.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(_226){this.disabled=_226;
_1[_226?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",_226?"true":"false")
}});
_1.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var _227=_1.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,_227[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var node=_1.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node)
}_1.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
_1.addClass(this.expand,"dijitMenuExpandEnabled");
_1.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
_1.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){_1.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!_1._hasResource["dojo.regexp"]){_1._hasResource["dojo.regexp"]=true;
_1.provide("dojo.regexp");
_1.regexp.escapeString=function(str,_22a){return str.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(ch){if(_22a&&_22a.indexOf(ch)!=-1){return ch
}return"\\"+ch
})
};
_1.regexp.buildGroupRE=function(arr,re,_22e){if(!(arr instanceof Array)){return re(arr)
}var b=[];
for(var i=0;
i<arr.length;
i++){b.push(re(arr[i]))
}return _1.regexp.group(b.join("|"),_22e)
};
_1.regexp.group=function(_231,_232){return"("+(_232?"?:":"")+_231+")"
}
}if(!_1._hasResource["dojo.number"]){_1._hasResource["dojo.number"]=true;
_1.provide("dojo.number");
_1.number.format=function(_233,_234){_234=_1.mixin({},_234||{});
var _235=_1.i18n.normalizeLocale(_234.locale);
var _236=_1.i18n.getLocalization("dojo.cldr","number",_235);
_234.customs=_236;
var _237=_234.pattern||_236[(_234.type||"decimal")+"Format"];
if(isNaN(_233)){return null
}return _1.number._applyPattern(_233,_237,_234)
};
_1.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_1.number._applyPattern=function(_238,_239,_23a){_23a=_23a||{};
var _23b=_23a.customs.group;
var _23c=_23a.customs.decimal;
var _23d=_239.split(";");
var _23e=_23d[0];
_239=_23d[(_238<0)?1:0]||("-"+_23e);
if(_239.indexOf("%")!=-1){_238*=100
}else{if(_239.indexOf("‰")!=-1){_238*=1000
}else{if(_239.indexOf("¤")!=-1){_23b=_23a.customs.currencyGroup||_23b;
_23c=_23a.customs.currencyDecimal||_23c;
_239=_239.replace(/\u00a4{1,3}/,function(_23f){var prop=["symbol","currency","displayName"][_23f.length-1];
return _23a[prop]||_23a.currency||""
})
}else{if(_239.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var _241=_1.number._numberPatternRE;
var _242=_23e.match(_241);
if(!_242){throw new Error("unable to find a number expression in pattern: "+_239)
}return _239.replace(_241,_1.number._formatAbsolute(_238,_242[0],{decimal:_23c,group:_23b,places:_23a.places}))
};
_1.number.round=function(_243,_244,_245){var _246=String(_243).split(".");
var _247=(_246[1]&&_246[1].length)||0;
if(_247>_244){var _248=Math.pow(10,_244);
if(_245>0){_248*=10/_245;
_244++
}_243=Math.round(_243*_248)/_248;
_246=String(_243).split(".");
_247=(_246[1]&&_246[1].length)||0;
if(_247>_244){_246[1]=_246[1].substr(0,_244);
_243=Number(_246.join("."))
}}return _243
};
_1.number._formatAbsolute=function(_249,_24a,_24b){_24b=_24b||{};
if(_24b.places===true){_24b.places=0
}if(_24b.places===Infinity){_24b.places=6
}var _24c=_24a.split(".");
var _24d=(_24b.places>=0)?_24b.places:(_24c[1]&&_24c[1].length)||0;
if(!(_24b.round<0)){_249=_1.number.round(_249,_24d,_24b.round)
}var _24e=String(Math.abs(_249)).split(".");
var _24f=_24e[1]||"";
if(_24b.places){_24e[1]=_1.string.pad(_24f.substr(0,_24b.places),_24b.places,"0",true)
}else{if(_24c[1]&&_24b.places!==0){var pad=_24c[1].lastIndexOf("0")+1;
if(pad>_24f.length){_24e[1]=_1.string.pad(_24f,pad,"0",true)
}var _251=_24c[1].length;
if(_251<_24f.length){_24e[1]=_24f.substr(0,_251)
}}else{if(_24e[1]){_24e.pop()
}}}var _252=_24c[0].replace(",","");
pad=_252.indexOf("0");
if(pad!=-1){pad=_252.length-pad;
if(pad>_24e[0].length){_24e[0]=_1.string.pad(_24e[0],pad)
}if(_252.indexOf("#")==-1){_24e[0]=_24e[0].substr(_24e[0].length-pad)
}}var _253=_24c[0].lastIndexOf(",");
var _254,_255;
if(_253!=-1){_254=_24c[0].length-_253-1;
var _256=_24c[0].substr(0,_253);
_253=_256.lastIndexOf(",");
if(_253!=-1){_255=_256.length-_253-1
}}var _257=[];
for(var _258=_24e[0];
_258;
){var off=_258.length-_254;
_257.push((off>0)?_258.substr(off):_258);
_258=(off>0)?_258.slice(0,off):"";
if(_255){_254=_255;
delete _255
}}_24e[0]=_257.reverse().join(_24b.group||",");
return _24e.join(_24b.decimal||".")
};
_1.number.regexp=function(_25a){return _1.number._parseInfo(_25a).regexp
};
_1.number._parseInfo=function(_25b){_25b=_25b||{};
var _25c=_1.i18n.normalizeLocale(_25b.locale);
var _25d=_1.i18n.getLocalization("dojo.cldr","number",_25c);
var _25e=_25b.pattern||_25d[(_25b.type||"decimal")+"Format"];
var _25f=_25d.group;
var _260=_25d.decimal;
var _261=1;
if(_25e.indexOf("%")!=-1){_261/=100
}else{if(_25e.indexOf("‰")!=-1){_261/=1000
}else{var _262=_25e.indexOf("¤")!=-1;
if(_262){_25f=_25d.currencyGroup||_25f;
_260=_25d.currencyDecimal||_260
}}}var _263=_25e.split(";");
if(_263.length==1){_263.push("-"+_263[0])
}var re=_1.regexp.buildGroupRE(_263,function(_265){_265="(?:"+_1.regexp.escapeString(_265,".")+")";
return _265.replace(_1.number._numberPatternRE,function(_266){var _267={signed:false,separator:_25b.strict?_25f:[_25f,""],fractional:_25b.fractional,decimal:_260,exponent:false};
var _268=_266.split(".");
var _269=_25b.places;
if(_268.length==1||_269===0){_267.fractional=false
}else{if(typeof _269=="undefined"){_269=_268[1].lastIndexOf("0")+1
}if(_269&&_25b.fractional==undefined){_267.fractional=true
}if(!_25b.places&&(_269<_268[1].length)){_269+=","+_268[1].length
}_267.places=_269
}var _26a=_268[0].split(",");
if(_26a.length>1){_267.groupSize=_26a.pop().length;
if(_26a.length>1){_267.groupSize2=_26a.pop().length
}}return"("+_1.number._realNumberRegexp(_267)+")"
})
},true);
if(_262){re=re.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(_26b,_26c,_26d,_26e){var prop=["symbol","currency","displayName"][_26d.length-1];
var _270=_1.regexp.escapeString(_25b[prop]||_25b.currency||"");
_26c=_26c?"\\s":"";
_26e=_26e?"\\s":"";
if(!_25b.strict){if(_26c){_26c+="*"
}if(_26e){_26e+="*"
}return"(?:"+_26c+_270+_26e+")?"
}return _26c+_270+_26e
})
}return{regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_25f,decimal:_260,factor:_261}
};
_1.number.parse=function(_271,_272){var info=_1.number._parseInfo(_272);
var _274=(new RegExp("^"+info.regexp+"$")).exec(_271);
if(!_274){return NaN
}var _275=_274[1];
if(!_274[1]){if(!_274[2]){return NaN
}_275=_274[2];
info.factor*=-1
}_275=_275.replace(new RegExp("["+info.group+"\\s\\xa0]","g"),"").replace(info.decimal,".");
return Number(_275)*info.factor
};
_1.number._realNumberRegexp=function(_276){_276=_276||{};
if(typeof _276.places=="undefined"){_276.places=Infinity
}if(typeof _276.decimal!="string"){_276.decimal="."
}if(typeof _276.fractional=="undefined"||/^0/.test(_276.places)){_276.fractional=[true,false]
}if(typeof _276.exponent=="undefined"){_276.exponent=[true,false]
}if(typeof _276.eSigned=="undefined"){_276.eSigned=[true,false]
}var _277=_1.number._integerRegexp(_276);
var _278=_1.regexp.buildGroupRE(_276.fractional,function(q){var re="";
if(q&&(_276.places!==0)){re="\\"+_276.decimal;
if(_276.places==Infinity){re="(?:"+re+"\\d+)?"
}else{re+="\\d{"+_276.places+"}"
}}return re
},true);
var _27b=_1.regexp.buildGroupRE(_276.exponent,function(q){if(q){return"([eE]"+_1.number._integerRegexp({signed:_276.eSigned})+")"
}return""
});
var _27d=_277+_278;
if(_278){_27d="(?:(?:"+_27d+")|(?:"+_278+"))"
}return _27d+_27b
};
_1.number._integerRegexp=function(_27e){_27e=_27e||{};
if(typeof _27e.signed=="undefined"){_27e.signed=[true,false]
}if(typeof _27e.separator=="undefined"){_27e.separator=""
}else{if(typeof _27e.groupSize=="undefined"){_27e.groupSize=3
}}var _27f=_1.regexp.buildGroupRE(_27e.signed,function(q){return q?"[-+]":""
},true);
var _281=_1.regexp.buildGroupRE(_27e.separator,function(sep){if(!sep){return"(?:0|[1-9]\\d*)"
}sep=_1.regexp.escapeString(sep);
if(sep==" "){sep="\\s"
}else{if(sep==" "){sep="\\s\\xa0"
}}var grp=_27e.groupSize,grp2=_27e.groupSize2;
if(grp2){var _285="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return((grp-grp2)>0)?"(?:"+_285+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_285
}return"(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)"
},true);
return _27f+_281
}
}if(!_1._hasResource["dijit.ProgressBar"]){_1._hasResource["dijit.ProgressBar"]=true;
_1.provide("dijit.ProgressBar");
_1.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:_1.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(_286){_1.mixin(this,_286||{});
var _287=1,_288;
if(this.indeterminate){_288="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{_288="removeClass";
if(String(this.progress).indexOf("%")!=-1){_287=Math.min(parseFloat(this.progress)/100,1);
this.progress=_287*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
_287=this.progress/this.maximum
}var text=this.report(_287);
this.label.firstChild.nodeValue=text;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}_1[_288](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(_287*100)+"%";
this.onChange()
},report:function(_28a){return _1.number.format(_28a,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
}if(!_1._hasResource["dijit.TitlePane"]){_1._hasResource["dijit.TitlePane"]=true;
_1.provide("dijit.TitlePane");
_1.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated],{title:"",open:true,duration:250,baseClass:"dijitTitlePane",templateString:'<div class="dijitTitlePane">\r\n\t<div dojoAttachEvent="onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus" tabindex="0"\r\n\t\t\twaiRole="button" class="dijitTitlePaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<div dojoAttachPoint="arrowNode" class="dijitInline dijitArrowNode"><span dojoAttachPoint="arrowNodeInner" class="dijitArrowNodeInner"></span></div>\r\n\t\t<div dojoAttachPoint="titleNode" class="dijitTitlePaneTextNode"></div>\r\n\t</div>\r\n\t<div class="dijitTitlePaneContentOuter" dojoAttachPoint="hideNode">\r\n\t\t<div class="dijitReset" dojoAttachPoint="wipeNode">\r\n\t\t\t<div class="dijitTitlePaneContentInner" dojoAttachPoint="containerNode" waiRole="region" tabindex="-1">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn\'t work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setTitle(this.title);
if(!this.open){this.hideNode.style.display=this.wipeNode.style.display="none"
}this._setCss();
_1.setSelectable(this.titleNode,false);
this.inherited("postCreate",arguments);
dijit.setWaiState(this.containerNode,"labelledby",this.titleNode.id);
dijit.setWaiState(this.focusNode,"haspopup","true");
var _28b=this.hideNode,_28c=this.wipeNode;
this._wipeIn=_1.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){_28b.style.display=""
}});
this._wipeOut=_1.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){_28b.style.display="none"
}})
},setContent:function(_28d){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}_1.marginBox(this.wipeNode,{h:_1.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){_1.forEach([this._wipeIn,this._wipeOut],function(_28e){if(_28e.status()=="playing"){_28e.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var _28f=["dijitClosed","dijitOpen"];
var _290=this.open;
_1.removeClass(this.focusNode,_28f[!_290+0]);
this.focusNode.className+=" "+_28f[_290+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(e){if(e.keyCode==_1.keys.ENTER||e.charCode==_1.keys.SPACE){this.toggle()
}else{if(e.keyCode==_1.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
e.preventDefault()
}}}},_handleFocus:function(e){_1[(e.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(_293){this.titleNode.innerHTML=_293
}})
}if(!_1._hasResource["dijit.Tooltip"]){_1._hasResource["dijit.Tooltip"]=true;
_1.provide("dijit.Tooltip");
_1.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){_1.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=_1.fadeIn({node:this.domNode,duration:this.duration,onEnd:_1.hitch(this,"_onShow")});
this.fadeOut=_1.fadeOut({node:this.domNode,duration:this.duration,onEnd:_1.hitch(this,"_onHide")})
},show:function(_294,_295){if(this.aroundNode&&this.aroundNode===_295){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=_294;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var _296=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var pos=dijit.placeOnScreenAroundElement(this.domNode,_295,_296);
this.domNode.className="dijitTooltip dijitTooltip"+(pos.corner=="BL"?"Right":"Left");
_1.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_295
},_onShow:function(){if(_1.isIE){this.domNode.style.filter=""
}},hide:function(_298){if(!this.aroundNode||this.aroundNode!==_298){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(_299,_29a){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(_299,_29a)
};
dijit.hideTooltip=function(_29b){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(_29b)
};
_1.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
_1.forEach(this.connectId,function(id){var node=_1.byId(id);
if(node){this._connectNodes.push(node);
_1.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(_29e){this.connect(node,_29e.toLowerCase(),"_"+_29e)
},this);
if(_1.isIE){node.style.zoom=1
}}},this)
},_onMouseOver:function(e){this._onHover(e)
},_onMouseOut:function(e){if(_1.isDescendant(e.relatedTarget,e.target)){return 
}this._onUnHover(e)
},_onFocus:function(e){this._focus=true;
this._onHover(e)
},_onBlur:function(e){this._focus=false;
this._onUnHover(e)
},_onHover:function(e){if(!this._showTimer){var _2a4=e.target;
this._showTimer=setTimeout(_1.hitch(this,function(){this.open(_2a4)
}),this.showDelay)
}},_onUnHover:function(e){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(_2a6){_2a6=_2a6||this._connectNodes[0];
if(!_2a6){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,_2a6);
this._connectNode=_2a6
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!_1._hasResource["dojo.cookie"]){_1._hasResource["dojo.cookie"]=true;
_1.provide("dojo.cookie");
_1.cookie=function(name,_2a8,_2a9){var c=document.cookie;
if(arguments.length==1){var idx=c.lastIndexOf(name+"=");
if(idx==-1){return null
}var _2ac=idx+name.length+1;
var end=c.indexOf(";",idx+name.length+1);
if(end==-1){end=c.length
}return decodeURIComponent(c.substring(_2ac,end))
}else{_2a9=_2a9||{};
_2a8=encodeURIComponent(_2a8);
if(typeof (_2a9.expires)=="number"){var d=new Date();
d.setTime(d.getTime()+(_2a9.expires*24*60*60*1000));
_2a9.expires=d
}document.cookie=name+"="+_2a8+(_2a9.expires?"; expires="+_2a9.expires.toUTCString():"")+(_2a9.path?"; path="+_2a9.path:"")+(_2a9.domain?"; domain="+_2a9.domain:"")+(_2a9.secure?"; secure":"");
return null
}}
}if(!_1._hasResource["dijit.Tree"]){_1._hasResource["dijit.Tree"]=true;
_1.provide("dijit.Tree");
_1.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(item){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(item);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(item)
},_updateLayout:function(){var _2b0=this.getParent();
if(_2b0&&_2b0.isTree&&_2b0._hideRoot){_1.addClass(this.domNode,"dijitTreeIsRoot")
}else{_1.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(_2b1){var _2b2=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var idx=_2b1?0:(this.isExpandable?(this.isExpanded?1:2):3);
_1.forEach(_2b2,function(s){_1.removeClass(this.expandoNode,s)
},this);
_1.addClass(this.expandoNode,_2b2[idx]);
this.expandoNodeText.innerHTML=_2b1?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
},expand:function(){if(this.isExpanded){return 
}if(this._wipeOut.status()=="playing"){this._wipeOut.stop()
}this.isExpanded=true;
dijit.setWaiState(this.labelNode,"expanded","true");
dijit.setWaiRole(this.containerNode,"group");
this._setExpando();
this._wipeIn.play()
},collapse:function(){if(!this.isExpanded){return 
}if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}this.isExpanded=false;
dijit.setWaiState(this.labelNode,"expanded","false");
this._setExpando();
this._wipeOut.play()
},setLabelNode:function(_2b5){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(_2b5))
},_setChildren:function(_2b6){this.destroyDescendants();
this.state="LOADED";
var _2b7={};
if(_2b6&&_2b6.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}_1.forEach(_2b6,function(_2b8){var _2b9=new dijit._TreeNode(_1.mixin({tree:this.tree,label:this.tree.getLabel(_2b8.item)},_2b8));
this.addChild(_2b9);
var _2ba=this.tree.store.getIdentity(_2b8.item);
_2b7[_2ba]=_2b9;
if(this.tree.persist){if(this.tree._openedItemIds[_2ba]){this.tree._expandNode(_2b9)
}}},this);
_1.forEach(this.getChildren(),function(_2bb,idx){_2bb._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var fc=this.getChildren()[0];
var _2be=fc?fc.labelNode:this.domNode;
_2be.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=_1.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=_1.fx.wipeOut({node:this.containerNode,duration:150})
}return _2b7
},_addChildren:function(_2bf){var _2c0={};
if(_2bf&&_2bf.length>0){_1.forEach(_2bf,function(_2c1){var _2c2=new dijit._TreeNode(_1.mixin({tree:this.tree,label:this.tree.getLabel(_2c1.item)},_2c1));
this.addChild(_2c2);
_2c0[this.tree.store.getIdentity(_2c1.item)]=_2c2
},this);
_1.forEach(this.getChildren(),function(_2c3,idx){_2c3._updateLayout()
})
}return _2c0
},deleteNode:function(node){node.destroy();
var _2c6=this.getChildren();
if(_2c6.length==0){this.isExpandable=false;
this.collapse()
}_1.forEach(_2c6,function(_2c7){_2c7._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
_1.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(_2c8,_2c9){_1.publish(this.id,[_1.mixin({tree:this,event:_2c8},_2c9||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var _2ca=_1.cookie(this.cookieName);
this._openedItemIds={};
if(_2ca){_1.forEach(_2ca.split(","),function(item){this._openedItemIds[item]=true
},this)
}}var div=document.createElement("div");
div.style.display="none";
div.className="dijitTreeContainer";
dijit.setWaiRole(div,"presentation");
this.containerNodeTemplate=div;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(_1.isString(this.dndController)){this.dndController=_1.getObject(this.dndController)
}var _2cd={};
for(var i=0;
i<this.dndParams.length;
i++){if(this[this.dndParams[i]]){_2cd[this.dndParams[i]]=this[this.dndParams[i]]
}}this.dndController=new this.dndController(this,_2cd)
}this.connect(this.domNode,_1.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(item){return _1.some(this.childrenAttr,function(attr){return this.store.hasAttribute(item,attr)
},this)
},getItemChildren:function(_2d1,_2d2){var _2d3=this.store;
if(_2d1==null){_2d3.fetch({query:this.query,onComplete:_2d2})
}else{var _2d4=[];
for(var i=0;
i<this.childrenAttr.length;
i++){_2d4=_2d4.concat(_2d3.getValues(_2d1,this.childrenAttr[i]))
}var _2d6=0;
_1.forEach(_2d4,function(item){if(!_2d3.isItemLoaded(item)){_2d6++
}});
if(_2d6==0){_2d2(_2d4)
}else{function onItem(item){if(--_2d6==0){_2d2(_2d4)
}}_1.forEach(_2d4,function(item){if(!_2d3.isItemLoaded(item)){_2d3.loadItem({item:item,onItem:onItem})
}})
}}},getItemParentIdentity:function(item,_2db){return this.store.getIdentity(_2db.item)
},getLabel:function(item){return this.store.getLabel(item)
},getIconClass:function(item){},getLabelClass:function(item){},_onLoadAllItems:function(node,_2e0){var _2e1=_1.map(_2e0,function(item){return{item:item,isExpandable:this.mayHaveChildren(item)}
},this);
_1.mixin(this._itemNodeMap,node._setChildren(_2e1));
this._expandNode(node)
},_onKeyPress:function(e){if(e.altKey){return 
}var _2e4=dijit.getEnclosingWidget(e.target);
if(!_2e4){return 
}if(e.charCode){var _2e5=e.charCode;
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){_2e5=(String.fromCharCode(_2e5)).toLowerCase();
this._onLetterKeyNav({node:_2e4,key:_2e5});
_1.stopEvent(e)
}}else{var map=this._keyHandlerMap;
if(!map){map={};
map[_1.keys.ENTER]="_onEnterKey";
map[_1.keys.LEFT_ARROW]="_onLeftArrow";
map[_1.keys.RIGHT_ARROW]="_onRightArrow";
map[_1.keys.UP_ARROW]="_onUpArrow";
map[_1.keys.DOWN_ARROW]="_onDownArrow";
map[_1.keys.HOME]="_onHomeKey";
map[_1.keys.END]="_onEndKey";
this._keyHandlerMap=map
}if(this._keyHandlerMap[e.keyCode]){this[this._keyHandlerMap[e.keyCode]]({node:_2e4,item:_2e4.item});
_1.stopEvent(e)
}}},_onEnterKey:function(_2e7){this._publish("execute",{item:_2e7.item,node:_2e7.node});
this.onClick(_2e7.item,_2e7.node)
},_onDownArrow:function(_2e8){var _2e9=this._navToNextNode(_2e8.node);
if(_2e9&&_2e9.isTreeNode){_2e9.tree.focusNode(_2e9);
return _2e9
}},_onUpArrow:function(_2ea){var _2eb=_2ea.node;
var _2ec=_2eb;
var _2ed=_2eb.getPreviousSibling();
if(_2ed){_2eb=_2ed;
while(_2eb.isExpandable&&_2eb.isExpanded&&_2eb.hasChildren()){_2ec=_2eb;
var _2ee=_2eb.getChildren();
_2eb=_2ee[_2ee.length-1]
}}else{var _2ef=_2eb.getParent();
if(!(this._hideRoot&&_2ef===this)){_2eb=_2ef
}}if(_2eb&&_2eb.isTreeNode){_2ec=_2eb
}if(_2ec&&_2ec.isTreeNode){_2ec.tree.focusNode(_2ec);
return _2ec
}},_onRightArrow:function(_2f0){var _2f1=_2f0.node;
var _2f2=_2f1;
if(_2f1.isExpandable&&!_2f1.isExpanded){this._expandNode(_2f1)
}else{if(_2f1.hasChildren()){_2f1=_2f1.getChildren()[0]
}}if(_2f1&&_2f1.isTreeNode){_2f2=_2f1
}if(_2f2&&_2f2.isTreeNode){_2f2.tree.focusNode(_2f2);
return _2f2
}},_onLeftArrow:function(_2f3){var node=_2f3.node;
var _2f5=node;
if(node.isExpandable&&node.isExpanded){this._collapseNode(node)
}else{node=node.getParent()
}if(node&&node.isTreeNode){_2f5=node
}if(_2f5&&_2f5.isTreeNode){_2f5.tree.focusNode(_2f5);
return _2f5
}},_onHomeKey:function(){var _2f6=this._navToRootOrFirstNode();
if(_2f6){_2f6.tree.focusNode(_2f6);
return _2f6
}},_onEndKey:function(_2f7){var _2f8=_2f7.node.tree;
var _2f9=_2f8;
while(_2f9.isExpanded){var c=_2f9.getChildren();
_2f9=c[c.length-1];
if(_2f9.isTreeNode){_2f8=_2f9
}}if(_2f8&&_2f8.isTreeNode){_2f8.tree.focusNode(_2f8);
return _2f8
}},_onLetterKeyNav:function(_2fb){var node=startNode=_2fb.node;
var key=_2fb.key;
do{node=this._navToNextNode(node);
if(!node){node=this._navToRootOrFirstNode()
}}while(node!==startNode&&(node.label.charAt(0).toLowerCase()!=key));
if(node&&node.isTreeNode){if(node!==startNode){node.tree.focusNode(node)
}return node
}},_onClick:function(e){var _2ff=e.target;
var _300=dijit.getEnclosingWidget(_2ff);
if(!_300||!_300.isTreeNode){return 
}if(_2ff==_300.expandoNode||_2ff==_300.expandoNodeText){if(_300.isExpandable){this._onExpandoClick({node:_300})
}}else{this._publish("execute",{item:_300.item,node:_300});
this.onClick(_300.item,_300);
this.focusNode(_300)
}_1.stopEvent(e)
},_onExpandoClick:function(_301){var node=_301.node;
if(node.isExpanded){this._collapseNode(node)
}else{this._expandNode(node)
}},onClick:function(item,node){},_navToNextNode:function(node){var _306;
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){_306=node.getChildren()[0]
}else{while(node&&node.isTreeNode){_306=node.getNextSibling();
if(_306){break
}node=node.getParent()
}}return _306
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var _307=this.getChildren()[0];
if(_307&&_307.isTreeNode){return _307
}}},_collapseNode:function(node){if(node.isExpandable){if(node.state=="LOADING"){return 
}if(this.lastFocused){if(_1.isDescendant(this.lastFocused.domNode,node.domNode)){this.focusNode(node)
}else{this.focusNode(this.lastFocused)
}}node.collapse();
if(this.persist&&node.item){delete this._openedItemIds[this.store.getIdentity(node.item)];
this._saveState()
}}},_expandNode:function(node){var t=node.tree;
if(t.lastFocused){t.focusNode(t.lastFocused)
}if(!node.isExpandable){return 
}var _30b=this.store;
var _30c=this.store.getValue;
switch(node.state){case"LOADING":return ;
case"UNCHECKED":node.markProcessing();
var _30d=this;
var _30e=function(_30f){node.unmarkProcessing();
_30d._onLoadAllItems(node,_30f)
};
this.getItemChildren(node.item,_30e);
break;
default:if(node.expand){node.expand();
if(this.persist&&node.item){this._openedItemIds[this.store.getIdentity(node.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var node=this.lastFocused;
if(!node){return 
}var _311=node.labelNode;
_1.removeClass(_311,"dijitTreeLabelFocused");
_311.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(node){node.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var _313=this.lastFocused.labelNode;
_1.removeClass(_313,"dijitTreeLabelFocused")
}},_onTreeFocus:function(evt){var node=dijit.getEnclosingWidget(evt.target);
if(node!=this.lastFocused){this.blurNode()
}var _316=node.labelNode;
_316.setAttribute("tabIndex","0");
_1.addClass(_316,"dijitTreeLabelFocused");
this.lastFocused=node
},_onNewItem:function(item,_318){var _319;
if(_318){var _31a=this._itemNodeMap[this.getItemParentIdentity(item,_318)];
if(!_31a||_1.indexOf(this.childrenAttr,_318.attribute)==-1){return 
}}var _31b={item:item,isExpandable:this.mayHaveChildren(item)};
if(_31a){if(!_31a.isExpandable){_31a.makeExpandable()
}if(_31a.state=="LOADED"||_31a.isExpanded){var _31c=_31a._addChildren([_31b])
}}else{var _31c=this._addChildren([_31b])
}if(_31c){_1.mixin(this._itemNodeMap,_31c)
}},_onDeleteItem:function(item){var _31e=this.store.getIdentity(item);
var node=this._itemNodeMap[_31e];
if(node){var _320=node.getParent();
_320.deleteNode(node);
this._itemNodeMap[_31e]=null
}},_onSetItem:function(item){var _322=this.store.getIdentity(item);
node=this._itemNodeMap[_322];
if(node){node.setLabelNode(this.getLabel(item));
node._updateItemClasses(item)
}},_saveState:function(){if(!this.persist){return 
}var ary=[];
for(var id in this._openedItemIds){ary.push(id)
}_1.cookie(this.cookieName,ary.join(","))
}})
}if(!_1._hasResource["dijit.form.TextBox"]){_1._hasResource["dijit.form.TextBox"]=true;
_1.provide("dijit.form.TextBox");
_1.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:_1.mixin(_1.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(_325,_326,_327){var _328=this.filter(_325);
if((typeof _328==typeof _325)&&(_327==null||_327==undefined)){_327=this.format(_328,this.constraints)
}if(_327!=null&&_327!=undefined){this.textbox.value=_327
}dijit.form.TextBox.superclass.setValue.call(this,_328,_326)
},setDisplayedValue:function(_329){this.textbox.value=_329;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(_32a,_32b){return((_32a==null||_32a==undefined)?"":(_32a.toString?_32a.toString():_32a))
},parse:function(_32c,_32d){return _32c
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){_1.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(_1.isFF==2&&this.domNode.tagName=="TABLE"){var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
setTimeout(function(){node.style.opacity=old
},0)
}},filter:function(val){if(val==undefined||val==null){return""
}else{if(typeof val!="string"){return val
}}if(this.trim){val=_1.trim(val)
}if(this.uppercase){val=val.toUpperCase()
}if(this.lowercase){val=val.toLowerCase()
}if(this.propercase){val=val.replace(/[^\s]+/g,function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
})
}return val
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!_1._hasResource["dijit.InlineEditBox"]){_1._hasResource["dijit.InlineEditBox"]=true;
_1.provide("dijit.InlineEditBox");
_1.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(_332){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var _333={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var name in _333){this.connect(this.displayNode,name,_333[name])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){_1.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){_1.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(e){if(this.disabled){return 
}if(e){_1.stopEvent(e)
}this._onMouseOut();
setTimeout(_1.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var _336=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var _337=document.createElement("span");
_1.place(_337,this.domNode,"before");
var ew=this.editWidget=new dijit._InlineEditor({value:_1.trim(_336),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:_1.getComputedStyle(this.displayNode),save:_1.hitch(this,"save"),cancel:_1.hitch(this,"cancel"),width:this.width},_337);
var ews=ew.domNode.style;
this.displayNode.style.display="none";
ews.position="static";
ews.visibility="visible";
this.domNode=ew.domNode;
setTimeout(function(){ew.focus()
},100)
},_showText:function(_33a){this.displayNode.style.display="";
var ews=this.editWidget.domNode.style;
ews.position="absolute";
ews.visibility="hidden";
this.domNode=this.displayNode;
var _33c=this;
setTimeout(function(){if(_33a){dijit.focus(_33c.displayNode)
}_33c.editWidget.destroy();
delete _33c.editWidget
},100)
},save:function(_33d){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(_33d)
},_setDisplayValue:function(val){this.displayNode.innerHTML=val||this.noValueIndicator
},cancel:function(_33f){this.editing=false;
this._showText(_33f)
}});
_1.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=_1.i18n.getLocalization("dijit","common",this.lang);
_1.forEach(["buttonSave","buttonCancel"],function(prop){if(!this[prop]){this[prop]=this.messages[prop]
}},this)
},postCreate:function(){var cls=_1.getObject(this.editor);
var ew=this.editWidget=new cls(this.editorParams,this.editorPlaceholder);
var _343=this.style;
_1.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(prop){ew.focusNode.style[prop]=_343[prop]
},this);
_1.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(prop){this.domNode.style[prop]=_343[prop]
},this);
if(this.width=="100%"){ew.domNode.style.width="100%";
this.domNode.style.display="block"
}else{ew.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var ew=this.editWidget;
return ew.getDisplayedValue?ew.getDisplayedValue():ew.getValue()
},_onKeyPress:function(e){if(this._exitInProgress){return 
}if(this.autoSave){if(e.keyCode==_1.keys.ESCAPE){_1.stopEvent(e);
this._exitInProgress=true;
this.cancel(true)
}else{if(e.keyCode==_1.keys.ENTER){_1.stopEvent(e);
this._exitInProgress=true;
this.save(true)
}}}else{var _348=this;
setTimeout(function(){_348.saveButton.setDisabled(_348.getValue()==_348._initialText)
},100)
}},_onBlur:function(){if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
if(this.getValue()==this._initialText){this.cancel(false)
}else{this.save(false)
}}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},_onChange:function(){if(this._ignoreNextOnChange){delete this._ignoreNextOnChange;
return 
}if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
this.save(true)
}else{this.saveButton.setDisabled((this.getValue()==this._initialText)||!this.enableSave())
}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},focus:function(){this.editWidget.focus();
dijit.selectInputText(this.editWidget.focusNode)
}});
dijit.selectInputText=function(_349){var _34a=_1.global;
var _34b=_1.doc;
_349=_1.byId(_349);
if(_34b.selection&&_1.body()["createTextRange"]){if(_349.createTextRange){var _34c=_349.createTextRange();
_34c.moveStart("character",0);
_34c.moveEnd("character",_349.value.length);
_34c.select()
}}else{if(_34a.getSelection){var _34d=_34a.getSelection();
if(_349.setSelectionRange){_349.setSelectionRange(0,_349.value.length)
}}}_349.focus()
}
}if(!_1._hasResource["dijit.form.CheckBox"]){_1._hasResource["dijit.form.CheckBox"]=true;
_1.provide("dijit.form.CheckBox");
_1.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:'<fieldset class="dijitReset dijitInline" waiRole="presentation"\r\n\t><input\r\n\t \ttype="${type}" name="${name}"\r\n\t\tclass="dijitReset dijitCheckBoxInput"\r\n\t\tdojoAttachPoint="inputNode,focusNode"\r\n\t \tdojoAttachEvent="onmouseover:_onMouse,onmouseout:_onMouse,onclick:_onClick"\r\n/></fieldset>\r\n',baseClass:"dijitCheckBox",type:"checkbox",value:"on",postCreate:function(){_1.setSelectable(this.inputNode,false);
this.setChecked(this.checked);
this.inherited(arguments)
},setChecked:function(_34e){if(_1.isIE){if(_34e){this.inputNode.setAttribute("checked","checked")
}else{this.inputNode.removeAttribute("checked")
}}else{this.inputNode.checked=_34e
}this.inherited(arguments)
},setValue:function(_34f){if(_34f==null){_34f=""
}this.inputNode.value=_34f;
dijit.form.CheckBox.superclass.setValue.call(this,_34f)
}});
_1.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_groups:{},postCreate:function(){(this._groups[this.name]=this._groups[this.name]||[]).push(this);
this.inherited(arguments)
},uninitialize:function(){_1.forEach(this._groups[this.name],function(_350,i,arr){if(_350===this){arr.splice(i,1);
return 
}},this)
},setChecked:function(_353){if(_353){_1.forEach(this._groups[this.name],function(_354){if(_354!=this&&_354.checked){_354.setChecked(false)
}},this)
}this.inherited(arguments)
},_clicked:function(e){if(!this.checked){this.setChecked(true)
}}})
}if(!_1._hasResource["dojo.data.util.filter"]){_1._hasResource["dojo.data.util.filter"]=true;
_1.provide("dojo.data.util.filter");
_1.data.util.filter.patternToRegExp=function(_356,_357){var rxp="^";
var c=null;
for(var i=0;
i<_356.length;
i++){c=_356.charAt(i);
switch(c){case"\\":rxp+=c;
i++;
rxp+=_356.charAt(i);
break;
case"*":rxp+=".*";
break;
case"?":rxp+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":rxp+="\\";
default:rxp+=c
}}rxp+="$";
if(_357){return new RegExp(rxp,"i")
}else{return new RegExp(rxp)
}}
}if(!_1._hasResource["dojo.data.util.sorter"]){_1._hasResource["dojo.data.util.sorter"]=true;
_1.provide("dojo.data.util.sorter");
_1.data.util.sorter.basicComparator=function(a,b){var ret=0;
if(a>b||typeof a==="undefined"||a===null){ret=1
}else{if(a<b||typeof b==="undefined"||b===null){ret=-1
}}return ret
};
_1.data.util.sorter.createSortFunction=function(_35e,_35f){var _360=[];
function createSortFunction(attr,dir){return function(_363,_364){var a=_35f.getValue(_363,attr);
var b=_35f.getValue(_364,attr);
var _367=null;
if(_35f.comparatorMap){if(typeof attr!=="string"){attr=_35f.getIdentity(attr)
}_367=_35f.comparatorMap[attr]||_1.data.util.sorter.basicComparator
}_367=_367||_1.data.util.sorter.basicComparator;
return dir*_367(a,b)
}
}for(var i=0;
i<_35e.length;
i++){sortAttribute=_35e[i];
if(sortAttribute.attribute){var _369=(sortAttribute.descending)?-1:1;
_360.push(createSortFunction(sortAttribute.attribute,_369))
}}return function(rowA,rowB){var i=0;
while(i<_360.length){var ret=_360[i++](rowA,rowB);
if(ret!==0){return ret
}}return 0
}
}
}if(!_1._hasResource["dojo.data.util.simpleFetch"]){_1._hasResource["dojo.data.util.simpleFetch"]=true;
_1.provide("dojo.data.util.simpleFetch");
_1.data.util.simpleFetch.fetch=function(_36e){_36e=_36e||{};
if(!_36e.store){_36e.store=this
}var self=this;
var _370=function(_371,_372){if(_372.onError){var _373=_372.scope||_1.global;
_372.onError.call(_373,_371,_372)
}};
var _374=function(_375,_376){var _377=_376.abort||null;
var _378=false;
var _379=_376.start?_376.start:0;
var _37a=_376.count?(_379+_376.count):_375.length;
_376.abort=function(){_378=true;
if(_377){_377.call(_376)
}};
var _37b=_376.scope||_1.global;
if(!_376.store){_376.store=self
}if(_376.onBegin){_376.onBegin.call(_37b,_375.length,_376)
}if(_376.sort){_375.sort(_1.data.util.sorter.createSortFunction(_376.sort,self))
}if(_376.onItem){for(var i=_379;
(i<_375.length)&&(i<_37a);
++i){var item=_375[i];
if(!_378){_376.onItem.call(_37b,item,_376)
}}}if(_376.onComplete&&!_378){var _37e=null;
if(!_376.onItem){_37e=_375.slice(_379,_37a)
}_376.onComplete.call(_37b,_37e,_376)
}};
this._fetchItems(_36e,_374,_370);
return _36e
}
}if(!_1._hasResource["dojo.data.ItemFileReadStore"]){_1._hasResource["dojo.data.ItemFileReadStore"]=true;
_1.provide("dojo.data.ItemFileReadStore");
_1.declare("dojo.data.ItemFileReadStore",null,{constructor:function(_37f){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_37f.url;
this._jsonData=_37f.data;
this._datatypeMap=_37f.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(_380){return _1.date.stamp.fromISOString(_380)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(item){if(!this.isItem(item)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(_382){if(typeof _382!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(item,_384,_385){var _386=this.getValues(item,_384);
return(_386.length>0)?_386[0]:_385
},getValues:function(item,_388){this._assertIsItem(item);
this._assertIsAttribute(_388);
return item[_388]||[]
},getAttributes:function(item){this._assertIsItem(item);
var _38a=[];
for(var key in item){if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)){_38a.push(key)
}}return _38a
},hasAttribute:function(item,_38d){return this.getValues(item,_38d).length>0
},containsValue:function(item,_38f,_390){var _391=undefined;
if(typeof _390==="string"){_391=_1.data.util.filter.patternToRegExp(_390,false)
}return this._containsValue(item,_38f,_390,_391)
},_containsValue:function(item,_393,_394,_395){return _1.some(this.getValues(item,_393),function(_396){if(_396!==null&&!_1.isObject(_396)&&_395){if(_396.toString().match(_395)){return true
}}else{if(_394===_396){return true
}}})
},isItem:function(_397){if(_397&&_397[this._storeRefPropName]===this){if(this._arrayOfAllItems[_397[this._itemNumPropName]]===_397){return true
}}return false
},isItemLoaded:function(_398){return this.isItem(_398)
},loadItem:function(_399){this._assertIsItem(_399.item)
},getFeatures:function(){return this._features
},getLabel:function(item){if(this._labelAttr&&this.isItem(item)){return this.getValue(item,this._labelAttr)
}return undefined
},getLabelAttributes:function(item){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(_39c,_39d,_39e){var self=this;
var _3a0=function(_3a1,_3a2){var _3a3=[];
if(_3a1.query){var _3a4=_3a1.queryOptions?_3a1.queryOptions.ignoreCase:false;
var _3a5={};
for(var key in _3a1.query){var _3a7=_3a1.query[key];
if(typeof _3a7==="string"){_3a5[key]=_1.data.util.filter.patternToRegExp(_3a7,_3a4)
}}for(var i=0;
i<_3a2.length;
++i){var _3a9=true;
var _3aa=_3a2[i];
if(_3aa===null){_3a9=false
}else{for(var key in _3a1.query){var _3a7=_3a1.query[key];
if(!self._containsValue(_3aa,key,_3a7,_3a5[key])){_3a9=false
}}}if(_3a9){_3a3.push(_3aa)
}}_39d(_3a3,_3a1)
}else{for(var i=0;
i<_3a2.length;
++i){var item=_3a2[i];
if(item!==null){_3a3.push(item)
}}_39d(_3a3,_3a1)
}};
if(this._loadFinished){_3a0(_39c,this._getItemsArray(_39c.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:_39c,filter:_3a0})
}else{this._loadInProgress=true;
var _3ac={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var _3ad=_1.xhrGet(_3ac);
_3ad.addCallback(function(data){try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_3a0(_39c,self._getItemsArray(_39c.queryOptions));
self._handleQueuedFetches()
}catch(e){self._loadFinished=true;
self._loadInProgress=false;
_39e(e,_39c)
}});
_3ad.addErrback(function(_3af){self._loadInProgress=false;
_39e(_3af,_39c)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_3a0(_39c,this._getItemsArray(_39c.queryOptions))
}catch(e){_39e(e,_39c)
}}else{_39e(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_39c)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var i=0;
i<this._queuedFetches.length;
i++){var _3b1=this._queuedFetches[i];
var _3b2=_3b1.args;
var _3b3=_3b1.filter;
if(_3b3){_3b3(_3b2,this._getItemsArray(_3b2.queryOptions))
}else{this.fetchItemByIdentity(_3b2)
}}this._queuedFetches=[]
}},_getItemsArray:function(_3b4){if(_3b4&&_3b4.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(_3b5){},_getItemsFromLoadedData:function(_3b6){function valueIsAnItem(_3b7){var _3b8=((_3b7!=null)&&(typeof _3b7=="object")&&(!_1.isArray(_3b7))&&(!_1.isFunction(_3b7))&&(_3b7.constructor==Object)&&(typeof _3b7._reference=="undefined")&&(typeof _3b7._type=="undefined")&&(typeof _3b7._value=="undefined"));
return _3b8
}var self=this;
function addItemAndSubItemsToArrayOfAllItems(_3ba){self._arrayOfAllItems.push(_3ba);
for(var _3bb in _3ba){var _3bc=_3ba[_3bb];
if(_3bc){if(_1.isArray(_3bc)){var _3bd=_3bc;
for(var k=0;
k<_3bd.length;
++k){var _3bf=_3bd[k];
if(valueIsAnItem(_3bf)){addItemAndSubItemsToArrayOfAllItems(_3bf)
}}}else{if(valueIsAnItem(_3bc)){addItemAndSubItemsToArrayOfAllItems(_3bc)
}}}}}this._labelAttr=_3b6.label;
var i;
var item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_3b6.items;
for(i=0;
i<this._arrayOfTopLevelItems.length;
++i){item=this._arrayOfTopLevelItems[i];
addItemAndSubItemsToArrayOfAllItems(item);
item[this._rootItemPropName]=true
}var _3c2={};
var key;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){if(key!==this._rootItemPropName){var _3c4=item[key];
if(_3c4!==null){if(!_1.isArray(_3c4)){item[key]=[_3c4]
}}else{item[key]=[null]
}}_3c2[key]=key
}}while(_3c2[this._storeRefPropName]){this._storeRefPropName+="_"
}while(_3c2[this._itemNumPropName]){this._itemNumPropName+="_"
}var _3c5;
var _3c6=_3b6.identifier;
if(_3c6){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_3c6;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
_3c5=item[_3c6];
var _3c7=_3c5[0];
if(!this._itemsByIdentity[_3c7]){this._itemsByIdentity[_3c7]=item
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_3c6+"].  Value collided: ["+_3c7+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_3c6+"].  Value collided: ["+_3c7+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){_3c5=item[key];
for(var j=0;
j<_3c5.length;
++j){_3c4=_3c5[j];
if(_3c4!==null&&typeof _3c4=="object"){if(_3c4._type&&_3c4._value){var type=_3c4._type;
var _3ca=this._datatypeMap[type];
if(!_3ca){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'")
}else{if(_1.isFunction(_3ca)){_3c5[j]=new _3ca(_3c4._value)
}else{if(_1.isFunction(_3ca.deserialize)){_3c5[j]=_3ca.deserialize(_3c4._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(_3c4._reference){var _3cb=_3c4._reference;
if(_1.isString(_3cb)){_3c5[j]=this._itemsByIdentity[_3cb]
}else{for(var k=0;
k<this._arrayOfAllItems.length;
++k){var _3cd=this._arrayOfAllItems[k];
var _3ce=true;
for(var _3cf in _3cb){if(_3cd[_3cf]!=_3cb[_3cf]){_3ce=false
}}if(_3ce){_3c5[j]=_3cd
}}}}}}}}},getIdentity:function(item){var _3d1=this._features["dojo.data.api.Identity"];
if(_3d1===Number){return item[this._itemNumPropName]
}else{var _3d2=item[_3d1];
if(_3d2){return _3d2[0]
}}return null
},fetchItemByIdentity:function(_3d3){if(!this._loadFinished){var self=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:_3d3})
}else{this._loadInProgress=true;
var _3d5={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var _3d6=_1.xhrGet(_3d5);
_3d6.addCallback(function(data){var _3d8=_3d3.scope?_3d3.scope:_1.global;
try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
var item=self._getItemByIdentity(_3d3.identity);
if(_3d3.onItem){_3d3.onItem.call(_3d8,item)
}self._handleQueuedFetches()
}catch(error){self._loadInProgress=false;
if(_3d3.onError){_3d3.onError.call(_3d8,error)
}}});
_3d6.addErrback(function(_3da){self._loadInProgress=false;
if(_3d3.onError){var _3db=_3d3.scope?_3d3.scope:_1.global;
_3d3.onError.call(_3db,_3da)
}})
}}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
var item=self._getItemByIdentity(_3d3.identity);
if(_3d3.onItem){var _3dd=_3d3.scope?_3d3.scope:_1.global;
_3d3.onItem.call(_3dd,item)
}}}}else{var item=this._getItemByIdentity(_3d3.identity);
if(_3d3.onItem){var _3dd=_3d3.scope?_3d3.scope:_1.global;
_3d3.onItem.call(_3dd,item)
}}},_getItemByIdentity:function(_3de){var item=null;
if(this._itemsByIdentity){item=this._itemsByIdentity[_3de]
}else{item=this._arrayOfAllItems[_3de]
}if(item===undefined){item=null
}return item
},getIdentityAttributes:function(item){var _3e1=this._features["dojo.data.api.Identity"];
if(_3e1===Number){return null
}else{return[_3e1]
}},_forceLoad:function(){var self=this;
if(this._jsonFileUrl){var _3e3={url:self._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var _3e4=_1.xhrGet(_3e3);
_3e4.addCallback(function(data){try{if(self._loadInProgress!==true&&!self._loadFinished){self._getItemsFromLoadedData(data);
self._loadFinished=true
}}catch(e){console.log(e);
throw e
}});
_3e4.addErrback(function(_3e6){throw _3e6
})
}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true
}}}});
_1.extend(_1.data.ItemFileReadStore,_1.data.util.simpleFetch)
}if(!_1._hasResource["dijit.form.ValidationTextBox"]){_1._hasResource["dijit.form.ValidationTextBox"]=true;
_1.provide("dijit.form.ValidationTextBox");
_1.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(_3e7){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(_3e8,_3e9){return(new RegExp("^("+this.regExpGen(_3e9)+")"+(this.required?"":"?")+"$")).test(_3e8)&&(!this.required||!this._isEmpty(_3e8))&&(this._isEmpty(_3e8)||this.parse(_3e8,_3e9)!==null)
},isValid:function(_3ea){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(_3eb){return/^\s*$/.test(_3eb)
},getErrorMessage:function(_3ec){return this.invalidMessage
},getPromptMessage:function(_3ed){return this.promptMessage
},validate:function(_3ee){var _3ef="";
var _3f0=this.isValid(_3ee);
var _3f1=this._isEmpty(this.textbox.value);
this.state=(_3f0||(!this._hasBeenBlurred&&_3f1))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(_3f0?"false":"true"));
if(_3ee){if(_3f1){_3ef=this.getPromptMessage(true)
}if(!_3ef&&!_3f0){_3ef=this.getErrorMessage(true)
}}this._displayMessage(_3ef)
},_message:"",_displayMessage:function(_3f2){if(this._message==_3f2){return 
}this._message=_3f2;
this.displayMessage(_3f2)
},displayMessage:function(_3f3){if(_3f3){dijit.showTooltip(_3f3,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(evt){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(evt){this.validate(true);
this._onMouse(evt)
},onkeyup:function(evt){this.onfocus(evt)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=_1.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var p=this.regExpGen(this.constraints);
this.regExp=p
}});
_1.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(val,_3f9){return(val.toString?val.toString():"")
},toString:function(){var val=this.filter(this.getValue());
return(val!=null)?((typeof val=="string")?val:this.serialize(val,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var _3fb=this.textbox;
var _3fc=(this.valueNode=document.createElement("input"));
_3fc.setAttribute("type",_3fb.type);
_3fc.setAttribute("value",this.toString());
_1.style(_3fc,"display","none");
_3fc.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
_1.place(_3fc,_3fb,"after");
this.inherited("postCreate",arguments)
}});
_1.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(val1,val2){return val1-val2
},rangeCheck:function(_3ff,_400){var _401=(typeof _400.min!="undefined");
var _402=(typeof _400.max!="undefined");
if(_401||_402){return(!_401||this.compare(_3ff,_400.min)>=0)&&(!_402||this.compare(_3ff,_400.max)<=0)
}else{return true
}},isInRange:function(_403){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(_404){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_404))
},getErrorMessage:function(_405){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(_405)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=_1.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!_1._hasResource["dijit.form.ComboBox"]){_1._hasResource["dijit.form.ComboBox"]=true;
_1.provide("dijit.form.ComboBox");
_1.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(_406){this._lastDisplayedValue=_406;
this.setValue(_406,true)
},_getCaretPos:function(_407){if(typeof (_407.selectionStart)=="number"){return _407.selectionStart
}else{if(_1.isIE){var tr=document.selection.createRange().duplicate();
var ntr=_407.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length
}catch(e){return 0
}}}},_setCaretPos:function(_40a,_40b){_40b=parseInt(_40b);
this._setSelectedRange(_40a,_40b,_40b)
},_setSelectedRange:function(_40c,_40d,end){if(!end){end=_40c.value.length
}if(_40c.setSelectionRange){dijit.focus(_40c);
_40c.setSelectionRange(_40d,end)
}else{if(_40c.createTextRange){var _40f=_40c.createTextRange();
with(_40f){collapse(true);
moveEnd("character",end);
moveStart("character",_40d);
select()
}}else{_40c.value=_40c.value;
_40c.blur();
dijit.focus(_40c);
var dist=parseInt(_40c.value.length)-end;
var _411=String.fromCharCode(37);
var tcc=_411.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
_40c.dispatchEvent(te)
}}}},onkeypress:function(evt){if(evt.altKey||(evt.ctrlKey&&evt.charCode!=118)){return 
}var _416=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(evt)
}switch(evt.keyCode){case _1.keys.PAGE_DOWN:case _1.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
_416=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}_1.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case _1.keys.PAGE_UP:case _1.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}_1.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case _1.keys.ENTER:var _417;
if(this._isShowingNow&&(_417=this._popupWidget.getHighlightedOption())){if(_417==this._popupWidget.nextButton){this._nextSearch(1);
_1.stopEvent(evt);
break
}else{if(_417==this._popupWidget.previousButton){this._nextSearch(-1);
_1.stopEvent(evt);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}evt.preventDefault();
case _1.keys.TAB:var _418=this.getDisplayedValue();
if(this._popupWidget&&(_418==this._popupWidget._messages.previousMessage||_418==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case _1.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){_1.stopEvent(evt);
this._selectOption();
this._hideResultList()
}else{_416=true
}break;
case _1.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
_1.stopEvent(evt)
}else{this.setValue(this.getValue(),false)
}break;
case _1.keys.DELETE:case _1.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
_416=true;
break;
case _1.keys.RIGHT_ARROW:case _1.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(_1.isIE||evt.charCode!=0){_416=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(_416){this.searchTimer=setTimeout(_1.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(text){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(text))){var cpos=this._getCaretPos(this.focusNode);
if((cpos+1)>this.focusNode.value.length){this.focusNode.value=text;
this._setSelectedRange(this.focusNode,cpos,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}}else{this.focusNode.value=text;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}},_openResultList:function(_41b,_41c){if(this.disabled||_41c.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!_41b.length){this._hideResultList();
return 
}var _41d=new String(this.store.getValue(_41b[0],this.searchAttr));
if(_41d&&this.autoComplete&&!this._prev_key_backspace&&(_41c.query[this.searchAttr]!="*")){this._autoCompleteText(_41d);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",_41d)
}this._popupWidget.createOptions(_41b,_41c,_1.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(_41c.direction){if(_41c.direction==1){this._popupWidget.highlightFirstOption()
}else{if(_41c.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var _41e=this._popupWidget.getItems(),_41f=Math.min(_41e.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var _421=_1.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==_421.h)&&(best.w==_421.w))?"hidden":"auto";
var _422=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){_422+=16
}_1.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(_422,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var _423=this.getDisplayedValue();
if(this._popupWidget&&(_423==this._popupWidget._messages.previousMessage||_423==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(_423)
}},onfocus:function(evt){this._hasFocus=true;
this._onMouse(evt)
},_announceOption:function(node){if(node==null){return 
}var _426;
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){_426=node.innerHTML
}else{_426=this.store.getValue(node.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(_426)
},_selectOption:function(evt){var tgt=null;
if(!evt){evt={target:this._popupWidget.getHighlightedOption()}
}if(!evt.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{tgt=evt.target
}if(!evt.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(tgt.item,this.searchAttr).length)
}this._doSelect(tgt)
},_doSelect:function(tgt){this.item=tgt.item;
this.setValue(this.store.getValue(tgt.item,this.searchAttr),true)
},_onArrowMouseDown:function(evt){if(this.disabled){return 
}_1.stopEvent(evt);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(key){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:_1.hitch(this,this._selectOption)})
}var _42c=this.query;
this._lastQuery=_42c[this.searchAttr]=key+"*";
var _42d=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:_42c,onComplete:_1.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function nextSearch(_42e,_42f){_42e.start+=_42e.count*_42f;
_42e.direction=_42f;
_42e.store.fetch(_42e)
}this._nextSearch=this._popupWidget.onPage=_1.hitch(this,nextSearch,_42d)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){_1.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){_1.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(evt){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var _431=this.srcNodeRef?_1.query("> option",this.srcNodeRef).map(function(node){node.style.display="none";
return{value:node.getAttribute("value"),name:String(node.innerHTML)}
}):{};
this.store=new _1.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:_431}});
if(_431&&_431.length&&!this.value){this.value=_431[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(item){return{html:false,label:this.store.getValue(item,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
_1.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=_1.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(_434){this.value=_434;
this.onChange(_434)
},onChange:function(_435){},onPage:function(_436){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(item,_438){var _439=_438(item);
var _43a=document.createElement("div");
if(_439.html){_43a.innerHTML=_439.label
}else{_43a.appendChild(document.createTextNode(_439.label))
}if(_43a.innerHTML==""){_43a.innerHTML="&nbsp;"
}_43a.item=item;
return _43a
},createOptions:function(_43b,_43c,_43d){this.previousButton.style.display=_43c.start==0?"none":"";
var _43e=this;
_1.forEach(_43b,function(item){var _440=_43e._createOption(item,_43d);
_440.className="dijitMenuItem";
_43e.domNode.insertBefore(_440,_43e.nextButton)
});
this.nextButton.style.display=_43c.count==_43b.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(evt){_1.stopEvent(evt)
},onmouseup:function(evt){if(evt.target===this.domNode){return 
}else{if(evt.target==this.previousButton){this.onPage(-1)
}else{if(evt.target==this.nextButton){this.onPage(1)
}else{var tgt=evt.target;
while(!tgt.item){tgt=tgt.parentNode
}this.setValue({target:tgt},true)
}}}},onmouseover:function(evt){if(evt.target===this.domNode){return 
}var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){while(!tgt.item){tgt=tgt.parentNode
}}this._focusOptionNode(tgt)
},onmouseout:function(evt){if(evt.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(node){if(this._highlighted_option!=node){this._blurOptionNode();
this._highlighted_option=node;
_1.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){_1.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(up){var _449=0;
var _44a=this.domNode.scrollTop;
var _44b=parseInt(_1.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(_449<_44b){if(up){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var _44c=this.domNode.scrollTop;
_449+=(_44c-_44a)*(up?-1:1);
_44a=_44c
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(evt){switch(evt.keyCode){case _1.keys.DOWN_ARROW:this._highlightNextOption();
break;
case _1.keys.PAGE_DOWN:this.pageDown();
break;
case _1.keys.UP_ARROW:this._highlightPrevOption();
break;
case _1.keys.PAGE_UP:this.pageUp();
break
}}});
_1.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!_1._hasResource["dojo.cldr.monetary"]){_1._hasResource["dojo.cldr.monetary"]=true;
_1.provide("dojo.cldr.monetary");
_1.cldr.monetary.getData=function(code){var _44f={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var _450={CHF:5};
var _451=_44f[code],_452=_450[code];
if(typeof _451=="undefined"){_451=2
}if(typeof _452=="undefined"){_452=0
}return{places:_451,round:_452}
}
}if(!_1._hasResource["dojo.currency"]){_1._hasResource["dojo.currency"]=true;
_1.provide("dojo.currency");
_1.currency._mixInDefaults=function(_453){_453=_453||{};
_453.type="currency";
var _454=_1.i18n.getLocalization("dojo.cldr","currency",_453.locale)||{};
var iso=_453.currency;
var data=_1.cldr.monetary.getData(iso);
_1.forEach(["displayName","symbol","group","decimal"],function(prop){data[prop]=_454[iso+"_"+prop]
});
data.fractional=[true,false];
return _1.mixin(data,_453)
};
_1.currency.format=function(_458,_459){return _1.number.format(_458,_1.currency._mixInDefaults(_459))
};
_1.currency.regexp=function(_45a){return _1.number.regexp(_1.currency._mixInDefaults(_45a))
};
_1.currency.parse=function(_45b,_45c){return _1.number.parse(_45b,_1.currency._mixInDefaults(_45c))
}
}if(!_1._hasResource["dijit.form.NumberTextBox"]){_1._hasResource["dijit.form.NumberTextBox"]=true;
_1.provide("dijit.form.NumberTextBox");
_1.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:_1.number.regexp,format:function(_45d,_45e){if(isNaN(_45d)){return""
}return _1.number.format(_45d,_45e)
},parse:_1.number.parse,filter:function(_45f){if(typeof _45f=="string"){return this.inherited("filter",arguments)
}return(isNaN(_45f)?"":_45f)
},value:NaN});
_1.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
}if(!_1._hasResource["dijit.form.CurrencyTextBox"]){_1._hasResource["dijit.form.CurrencyTextBox"]=true;
_1.provide("dijit.form.CurrencyTextBox");
_1.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",regExpGen:_1.currency.regexp,format:_1.currency.format,parse:_1.currency.parse,postMixInProperties:function(){if(this.constraints===dijit.form.ValidationTextBox.prototype.constraints){this.constraints={}
}this.constraints.currency=this.currency;
dijit.form.CurrencyTextBox.superclass.postMixInProperties.apply(this,arguments)
}})
}if(!_1._hasResource["dojo.cldr.supplemental"]){_1._hasResource["dojo.cldr.supplemental"]=true;
_1.provide("dojo.cldr.supplemental");
_1.cldr.supplemental.getFirstDayOfWeek=function(_460){var _461={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var _462=_1.cldr.supplemental._region(_460);
var dow=_461[_462];
return(typeof dow=="undefined")?1:dow
};
_1.cldr.supplemental._region=function(_464){_464=_1.i18n.normalizeLocale(_464);
var tags=_464.split("-");
var _466=tags[1];
if(!_466){_466={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]]
}else{if(_466.length==4){_466=tags[2]
}}return _466
};
_1.cldr.supplemental.getWeekend=function(_467){var _468={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var _469={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var _46a=_1.cldr.supplemental._region(_467);
var _46b=_468[_46a];
var end=_469[_46a];
if(typeof _46b=="undefined"){_46b=6
}if(typeof end=="undefined"){end=0
}return{start:_46b,end:end}
}
}if(!_1._hasResource["dojo.date"]){_1._hasResource["dojo.date"]=true;
_1.provide("dojo.date");
_1.date.getDaysInMonth=function(_46d){var _46e=_46d.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_46e==1&&_1.date.isLeapYear(_46d)){return 29
}return days[_46e]
};
_1.date.isLeapYear=function(_470){var year=_470.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100))
};
_1.date.getTimezoneName=function(_472){var str=_472.toString();
var tz="";
var _475;
var pos=str.indexOf("(");
if(pos>-1){tz=str.substring(++pos,str.indexOf(")"))
}else{var pat=/([A-Z\/]+) \d{4}$/;
if((_475=str.match(pat))){tz=_475[1]
}else{str=_472.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_475=str.match(pat))){tz=_475[1]
}}}return(tz=="AM"||tz=="PM")?"":tz
};
_1.date.compare=function(_478,_479,_47a){_478=new Date(Number(_478));
_479=new Date(Number(_479||new Date()));
if(typeof _47a!=="undefined"){if(_47a=="date"){_478.setHours(0,0,0,0);
_479.setHours(0,0,0,0)
}else{if(_47a=="time"){_478.setFullYear(0,0,0);
_479.setFullYear(0,0,0)
}}}if(_478>_479){return 1
}if(_478<_479){return -1
}return 0
};
_1.date.add=function(date,_47c,_47d){var sum=new Date(Number(date));
var _47f=false;
var _480="Date";
switch(_47c){case"day":break;
case"weekday":var days,_482;
var adj=0;
var mod=_47d%5;
if(!mod){days=(_47d>0)?5:-5;
_482=(_47d>0)?((_47d-5)/5):((_47d+5)/5)
}else{days=mod;
_482=parseInt(_47d/5)
}var strt=date.getDay();
if(strt==6&&_47d>0){adj=1
}else{if(strt==0&&_47d<0){adj=-1
}}var trgt=strt+days;
if(trgt==0||trgt==6){adj=(_47d>0)?2:-2
}_47d=7*_482+days+adj;
break;
case"year":_480="FullYear";
_47f=true;
break;
case"week":_47d*=7;
break;
case"quarter":_47d*=3;
case"month":_47f=true;
_480="Month";
break;
case"hour":case"minute":case"second":case"millisecond":_480="UTC"+_47c.charAt(0).toUpperCase()+_47c.substring(1)+"s"
}if(_480){sum["set"+_480](sum["get"+_480]()+_47d)
}if(_47f&&(sum.getDate()<date.getDate())){sum.setDate(0)
}return sum
};
_1.date.difference=function(_487,_488,_489){_488=_488||new Date();
_489=_489||"day";
var _48a=_488.getFullYear()-_487.getFullYear();
var _48b=1;
switch(_489){case"quarter":var m1=_487.getMonth();
var m2=_488.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_48a*4);
_48b=q2-q1;
break;
case"weekday":var days=Math.round(_1.date.difference(_487,_488,"day"));
var _491=parseInt(_1.date.difference(_487,_488,"week"));
var mod=days%7;
if(mod==0){days=_491*5
}else{var adj=0;
var aDay=_487.getDay();
var bDay=_488.getDay();
_491=parseInt(days/7);
mod=days%7;
var _496=new Date(_487);
_496.setDate(_496.getDate()+(_491*7));
var _497=_496.getDay();
if(days>0){switch(true){case aDay==6:adj=-1;
break;
case aDay==0:adj=0;
break;
case bDay==6:adj=-1;
break;
case bDay==0:adj=-2;
break;
case (_497+mod)>5:adj=-2
}}else{if(days<0){switch(true){case aDay==6:adj=0;
break;
case aDay==0:adj=1;
break;
case bDay==6:adj=2;
break;
case bDay==0:adj=1;
break;
case (_497+mod)<0:adj=2
}}}days+=adj;
days-=(_491*2)
}_48b=days;
break;
case"year":_48b=_48a;
break;
case"month":_48b=(_488.getMonth()-_487.getMonth())+(_48a*12);
break;
case"week":_48b=parseInt(_1.date.difference(_487,_488,"day")/7);
break;
case"day":_48b/=24;
case"hour":_48b/=60;
case"minute":_48b/=60;
case"second":_48b/=1000;
case"millisecond":_48b*=_488.getTime()-_487.getTime()
}return Math.round(_48b)
}
}if(!_1._hasResource["dojo.date.locale"]){_1._hasResource["dojo.date.locale"]=true;
_1.provide("dojo.date.locale");
(function(){function formatPattern(_498,_499,_49a){return _49a.replace(/([a-z])\1*/ig,function(_49b){var s;
var c=_49b.charAt(0);
var l=_49b.length;
var pad;
var _4a0=["abbr","wide","narrow"];
switch(c){case"G":s=_499[(l<4)?"eraAbbr":"eraNames"][_498.getFullYear()<0?0:1];
break;
case"y":s=_498.getFullYear();
switch(l){case 1:break;
case 2:s=String(s);
s=s.substr(s.length-2);
break;
default:pad=true
}break;
case"Q":case"q":s=Math.ceil((_498.getMonth()+1)/3);
pad=true;
break;
case"M":case"L":var m=_498.getMonth();
var _4a2;
switch(l){case 1:case 2:s=m+1;
pad=true;
break;
case 3:case 4:case 5:_4a2=_4a0[l-3];
break
}if(_4a2){var type=(c=="L")?"standalone":"format";
var prop=["months",type,_4a2].join("-");
s=_499[prop][m]
}break;
case"w":var _4a5=0;
s=_1.date.locale._getWeekOfYear(_498,_4a5);
pad=true;
break;
case"d":s=_498.getDate();
pad=true;
break;
case"D":s=_1.date.locale._getDayOfYear(_498);
pad=true;
break;
case"E":case"e":case"c":var d=_498.getDay();
var _4a2;
switch(l){case 1:case 2:if(c=="e"){var _4a7=_1.cldr.supplemental.getFirstDayOfWeek(options.locale);
d=(d-_4a7+7)%7
}if(c!="c"){s=d+1;
pad=true;
break
}case 3:case 4:case 5:_4a2=_4a0[l-3];
break
}if(_4a2){var type=(c=="c")?"standalone":"format";
var prop=["days",type,_4a2].join("-");
s=_499[prop][d]
}break;
case"a":var _4a8=(_498.getHours()<12)?"am":"pm";
s=_499[_4a8];
break;
case"h":case"H":case"K":case"k":var h=_498.getHours();
switch(c){case"h":s=(h%12)||12;
break;
case"H":s=h;
break;
case"K":s=(h%12);
break;
case"k":s=h||24;
break
}pad=true;
break;
case"m":s=_498.getMinutes();
pad=true;
break;
case"s":s=_498.getSeconds();
pad=true;
break;
case"S":s=Math.round(_498.getMilliseconds()*Math.pow(10,l-3));
break;
case"v":case"z":s=_1.date.getTimezoneName(_498);
if(s){break
}l=4;
case"Z":var _4aa=_498.getTimezoneOffset();
var tz=[(_4aa<=0?"+":"-"),_1.string.pad(Math.floor(Math.abs(_4aa)/60),2),_1.string.pad(Math.abs(_4aa)%60,2)];
if(l==4){tz.splice(0,0,"GMT");
tz.splice(3,0,":")
}s=tz.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+_49a)
}if(pad){s=_1.string.pad(s,l)
}return s
})
}_1.date.locale.format=function(_4ac,_4ad){_4ad=_4ad||{};
var _4ae=_1.i18n.normalizeLocale(_4ad.locale);
var _4af=_4ad.formatLength||"short";
var _4b0=_1.date.locale._getGregorianBundle(_4ae);
var str=[];
var _4b2=_1.hitch(this,formatPattern,_4ac,_4b0);
if(_4ad.selector=="year"){var year=_4ac.getFullYear();
if(_4ae.match(/^zh|^ja/)){year+="年"
}return year
}if(_4ad.selector!="time"){var _4b4=_4ad.datePattern||_4b0["dateFormat-"+_4af];
if(_4b4){str.push(_processPattern(_4b4,_4b2))
}}if(_4ad.selector!="date"){var _4b5=_4ad.timePattern||_4b0["timeFormat-"+_4af];
if(_4b5){str.push(_processPattern(_4b5,_4b2))
}}var _4b6=str.join(" ");
return _4b6
};
_1.date.locale.regexp=function(_4b7){return _1.date.locale._parseInfo(_4b7).regexp
};
_1.date.locale._parseInfo=function(_4b8){_4b8=_4b8||{};
var _4b9=_1.i18n.normalizeLocale(_4b8.locale);
var _4ba=_1.date.locale._getGregorianBundle(_4b9);
var _4bb=_4b8.formatLength||"short";
var _4bc=_4b8.datePattern||_4ba["dateFormat-"+_4bb];
var _4bd=_4b8.timePattern||_4ba["timeFormat-"+_4bb];
var _4be;
if(_4b8.selector=="date"){_4be=_4bc
}else{if(_4b8.selector=="time"){_4be=_4bd
}else{_4be=_4bc+" "+_4bd
}}var _4bf=[];
var re=_processPattern(_4be,_1.hitch(this,_buildDateTimeRE,_4bf,_4ba,_4b8));
return{regexp:re,tokens:_4bf,bundle:_4ba}
};
_1.date.locale.parse=function(_4c1,_4c2){var info=_1.date.locale._parseInfo(_4c2);
var _4c4=info.tokens,_4c5=info.bundle;
var re=new RegExp("^"+info.regexp+"$");
var _4c7=re.exec(_4c1);
if(!_4c7){return null
}var _4c8=["abbr","wide","narrow"];
var _4c9=new Date(1972,0);
var _4ca={};
var amPm="";
_1.forEach(_4c7,function(v,i){if(!i){return 
}var _4ce=_4c4[i-1];
var l=_4ce.length;
switch(_4ce.charAt(0)){case"y":if(l!=2){_4c9.setFullYear(v);
_4ca.year=v
}else{if(v<100){v=Number(v);
var year=""+new Date().getFullYear();
var _4d1=year.substring(0,2)*100;
var _4d2=Number(year.substring(2,4));
var _4d3=Math.min(_4d2+20,99);
var num=(v<_4d3)?_4d1+v:_4d1-100+v;
_4c9.setFullYear(num);
_4ca.year=num
}else{if(_4c2.strict){return null
}_4c9.setFullYear(v);
_4ca.year=v
}}break;
case"M":if(l>2){var _4d5=_4c5["months-format-"+_4c8[l-3]].concat();
if(!_4c2.strict){v=v.replace(".","").toLowerCase();
_4d5=_1.map(_4d5,function(s){return s.replace(".","").toLowerCase()
})
}v=_1.indexOf(_4d5,v);
if(v==-1){return null
}}else{v--
}_4c9.setMonth(v);
_4ca.month=v;
break;
case"E":case"e":var days=_4c5["days-format-"+_4c8[l-3]].concat();
if(!_4c2.strict){v=v.toLowerCase();
days=_1.map(days,"".toLowerCase)
}v=_1.indexOf(days,v);
if(v==-1){return null
}break;
case"d":_4c9.setDate(v);
_4ca.date=v;
break;
case"D":_4c9.setMonth(0);
_4c9.setDate(v);
break;
case"a":var am=_4c2.am||_4c5.am;
var pm=_4c2.pm||_4c5.pm;
if(!_4c2.strict){var _4da=/\./g;
v=v.replace(_4da,"").toLowerCase();
am=am.replace(_4da,"").toLowerCase();
pm=pm.replace(_4da,"").toLowerCase()
}if(_4c2.strict&&v!=am&&v!=pm){return null
}amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case"K":if(v==24){v=0
}case"h":case"H":case"k":if(v>23){return null
}_4c9.setHours(v);
break;
case"m":_4c9.setMinutes(v);
break;
case"s":_4c9.setSeconds(v);
break;
case"S":_4c9.setMilliseconds(v)
}});
var _4db=_4c9.getHours();
if(amPm==="p"&&_4db<12){_4c9.setHours(_4db+12)
}else{if(amPm==="a"&&_4db==12){_4c9.setHours(0)
}}if(_4ca.year&&_4c9.getFullYear()!=_4ca.year){return null
}if(_4ca.month&&_4c9.getMonth()!=_4ca.month){return null
}if(_4ca.date&&_4c9.getDate()!=_4ca.date){return null
}return _4c9
};
function _processPattern(_4dc,_4dd,_4de,_4df){var _4e0=function(x){return x
};
_4dd=_4dd||_4e0;
_4de=_4de||_4e0;
_4df=_4df||_4e0;
var _4e2=_4dc.match(/(''|[^'])+/g);
var _4e3=false;
_1.forEach(_4e2,function(_4e4,i){if(!_4e4){_4e2[i]=""
}else{_4e2[i]=(_4e3?_4de:_4dd)(_4e4);
_4e3=!_4e3
}});
return _4df(_4e2.join(""))
}function _buildDateTimeRE(_4e6,_4e7,_4e8,_4e9){_4e9=_1.regexp.escapeString(_4e9);
if(!_4e8.strict){_4e9=_4e9.replace(" a"," ?a")
}return _4e9.replace(/([a-z])\1*/ig,function(_4ea){var s;
var c=_4ea.charAt(0);
var l=_4ea.length;
var p2="",p3="";
if(_4e8.strict){if(l>1){p2="0{"+(l-1)+"}"
}if(l>2){p3="0{"+(l-2)+"}"
}}else{p2="0?";
p3="0{0,2}"
}switch(c){case"y":s="\\d{2,4}";
break;
case"M":s=(l>2)?"\\S+":p2+"[1-9]|1[0-2]";
break;
case"D":s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":s=p2+"[1-9]|[12]\\d|3[01]";
break;
case"w":s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":s="\\S+";
break;
case"h":s=p2+"[1-9]|1[0-2]";
break;
case"k":s=p2+"\\d|1[01]";
break;
case"H":s=p2+"\\d|1\\d|2[0-3]";
break;
case"K":s=p2+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":s="[0-5]\\d";
break;
case"S":s="\\d{"+l+"}";
break;
case"a":var am=_4e8.am||_4e7.am||"AM";
var pm=_4e8.pm||_4e7.pm||"PM";
if(_4e8.strict){s=am+"|"+pm
}else{s=am+"|"+pm;
if(am!=am.toLowerCase()){s+="|"+am.toLowerCase()
}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase()
}}break;
default:s=".*"
}if(_4e6){_4e6.push(_4ea)
}return"("+s+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var _4f2=[];
_1.date.locale.addCustomFormats=function(_4f3,_4f4){_4f2.push({pkg:_4f3,name:_4f4})
};
_1.date.locale._getGregorianBundle=function(_4f5){var _4f6={};
_1.forEach(_4f2,function(desc){var _4f8=_1.i18n.getLocalization(desc.pkg,desc.name,_4f5);
_4f6=_1.mixin(_4f6,_4f8)
},this);
return _4f6
}
})();
_1.date.locale.addCustomFormats("dojo.cldr","gregorian");
_1.date.locale.getNames=function(item,type,use,_4fc){var _4fd;
var _4fe=_1.date.locale._getGregorianBundle(_4fc);
var _4ff=[item,use,type];
if(use=="standAlone"){_4fd=_4fe[_4ff.join("-")]
}_4ff[1]="format";
return(_4fd||_4fe[_4ff.join("-")]).concat()
};
_1.date.locale.isWeekend=function(_500,_501){var _502=_1.cldr.supplemental.getWeekend(_501);
var day=(_500||new Date()).getDay();
if(_502.end<_502.start){_502.end+=7;
if(day<_502.start){day+=7
}}return day>=_502.start&&day<=_502.end
};
_1.date.locale._getDayOfYear=function(_504){return _1.date.difference(new Date(_504.getFullYear(),0,1),_504)+1
};
_1.date.locale._getWeekOfYear=function(_505,_506){if(arguments.length==1){_506=0
}var _507=new Date(_505.getFullYear(),0,1).getDay();
var adj=(_507-_506+7)%7;
var week=Math.floor((_1.date.locale._getDayOfYear(_505)+adj-1)/7);
if(_507==_506){week++
}return week
}
}if(!_1._hasResource["dijit._Calendar"]){_1._hasResource["dijit._Calendar"]=true;
_1.provide("dijit._Calendar");
_1.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(_50a){if(!this.value||_1.date.compare(_50a,this.value)){_50a=new Date(_50a);
this.displayMonth=new Date(_50a);
if(!this.isDisabledDate(_50a,this.lang)){this.value=_50a;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(node,text){while(node.firstChild){node.removeChild(node.firstChild)
}node.appendChild(document.createTextNode(text))
},_populateGrid:function(){var _50d=this.displayMonth;
_50d.setDate(1);
var _50e=_50d.getDay();
var _50f=_1.date.getDaysInMonth(_50d);
var _510=_1.date.getDaysInMonth(_1.date.add(_50d,"month",-1));
var _511=new Date();
var _512=this.value;
var _513=_1.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_513>_50e){_513-=7
}_1.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_514,i){i+=_513;
var date=new Date(_50d);
var _517,_518="dijitCalendar",adj=0;
if(i<_50e){_517=_510-_50e+i+1;
adj=-1;
_518+="Previous"
}else{if(i>=(_50e+_50f)){_517=i-_50e-_50f+1;
adj=1;
_518+="Next"
}else{_517=i-_50e+1;
_518+="Current"
}}if(adj){date=_1.date.add(date,"month",adj)
}date.setDate(_517);
if(!_1.date.compare(date,_511,"date")){_518="dijitCalendarCurrentDate "+_518
}if(!_1.date.compare(date,_512,"date")){_518="dijitCalendarSelectedDate "+_518
}if(this.isDisabledDate(date,this.lang)){_518="dijitCalendarDisabledDate "+_518
}_514.className=_518+"Month dijitCalendarDateTemplate";
_514.dijitDateValue=date.valueOf();
var _51a=_1.query(".dijitCalendarDateLabel",_514)[0];
this._setText(_51a,date.getDate())
},this);
var _51b=_1.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,_51b[_50d.getMonth()]);
var y=_50d.getFullYear()-1;
_1.forEach(["previous","current","next"],function(name){this._setText(this[name+"YearLabelNode"],_1.date.locale.format(new Date(y++,0),{selector:"year",locale:this.lang}))
},this);
var _51e=this;
var _51f=function(_520,_521,adj){dijit.typematic.addMouseListener(_51e[_520],_51e,function(_523){if(_523>=0){_51e._adjustDisplay(_521,adj)
}},0.8,500)
};
_51f("incrementMonth","month",1);
_51f("decrementMonth","month",-1);
_51f("nextYearLabelNode","year",1);
_51f("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var _524=_1.hitch(this,function(_525,n){var _527=_1.query(_525,this.domNode)[0];
for(var i=0;
i<n;
i++){_527.parentNode.appendChild(_527.cloneNode(true))
}});
_524(".dijitCalendarDayLabelTemplate",6);
_524(".dijitCalendarDateTemplate",6);
_524(".dijitCalendarWeekTemplate",5);
var _529=_1.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var _52a=_1.cldr.supplemental.getFirstDayOfWeek(this.lang);
_1.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_52b,i){this._setText(_52b,_529[(i+_52a)%7])
},this);
var _52d=_1.date.locale.getNames("months","wide","standAlone",this.lang);
_1.forEach(_52d,function(name){var _52f=_1.doc.createElement("div");
this._setText(_52f,name);
this.monthLabelSpacer.appendChild(_52f)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(part,_531){this.displayMonth=_1.date.add(this.displayMonth,part,_531);
this._populateGrid()
},_onDayClick:function(evt){var node=evt.target;
_1.stopEvent(evt);
while(!node.dijitDateValue){node=node.parentNode
}if(!_1.hasClass(node,"dijitCalendarDisabledDate")){this.setValue(node.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(date){},onChange:function(date){},isDisabledDate:function(_536,_537){return false
}})
}if(!_1._hasResource["dijit._TimePicker"]){_1._hasResource["dijit._TimePicker"]=true;
_1.provide("dijit._TimePicker");
_1.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:_1.date.stamp.toISOString,setValue:function(date,_539){this.value=date;
this._showText()
},isDisabledDate:function(_53a,_53b){return false
},_showText:function(){this.timeMenu.innerHTML="";
var _53c=_1.date.stamp.fromISOString;
this._clickableIncrementDate=_53c(this.clickableIncrement);
this._visibleIncrementDate=_53c(this.visibleIncrement);
this._visibleRangeDate=_53c(this.visibleRange);
var _53d=function(date){return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds()
};
var _53f=_53d(this._clickableIncrementDate);
var _540=_53d(this._visibleIncrementDate);
var _541=_53d(this._visibleRangeDate);
var time=this.value.getTime();
this._refDate=new Date(time-time%(_540*1000));
this._clickableIncrement=1;
this._totalIncrements=_541/_53f;
this._visibleIncrement=_540/_53f;
for(var i=-this._totalIncrements/2;
i<=this._totalIncrements/2;
i+=this._clickableIncrement){var div=this._createOption(i);
this.timeMenu.appendChild(div)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,_1.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(_545){var div=document.createElement("div");
var date=(div.date=new Date(this._refDate));
div.index=_545;
var _548=this._clickableIncrementDate;
date.setHours(date.getHours()+_548.getHours()*_545,date.getMinutes()+_548.getMinutes()*_545,date.getSeconds()+_548.getSeconds()*_545);
var _549=document.createElement("div");
_1.addClass(div,this.baseClass+"Item");
_1.addClass(_549,this.baseClass+"ItemInner");
_549.innerHTML=_1.date.locale.format(date,this.constraints);
div.appendChild(_549);
if(_545%this._visibleIncrement<1&&_545%this._visibleIncrement>-1){_1.addClass(div,this.baseClass+"Marker")
}else{if(_545%this._clickableIncrement==0){_1.addClass(div,this.baseClass+"Tick")
}}if(this.isDisabledDate(date)){_1.addClass(div,this.baseClass+"ItemDisabled")
}if(_1.date.compare(this.value,date,this.constraints.selector)==0){div.selected=true;
_1.addClass(div,this.baseClass+"ItemSelected")
}return div
},_onOptionSelected:function(tgt){var _54b=tgt.target.date||tgt.target.parentNode.date;
if(!_54b||this.isDisabledDate(_54b)){return 
}this.setValue(_54b);
this.onValueSelected(_54b)
},onValueSelected:function(_54c){},onmouseover:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlighted_option=tgr;
_1.addClass(tgr,this.baseClass+"ItemHover")
},onmouseout:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(this._highlighted_option===tgr){_1.removeClass(tgr,this.baseClass+"ItemHover")
}},_mouseWheeled:function(e){_1.stopEvent(e);
var _552=(_1.isIE?e.wheelDelta:-e.detail);
this[(_552>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var _553=this.timeMenu.childNodes[0].index-1;
var div=this._createOption(_553);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(div,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var _555=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var div=this._createOption(_555);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(div)
}})
}if(!_1._hasResource["dijit.form.TimeTextBox"]){_1._hasResource["dijit.form.TimeTextBox"]=true;
_1.provide("dijit.form.TimeTextBox");
_1.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:_1.date.locale.regexp,compare:_1.date.compare,format:function(_557,_558){if(!_557||_557.toString()==this._invalid){return null
}return _1.date.locale.format(_557,_558)
},parse:_1.date.locale.parse,serialize:_1.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var _559=this.constraints;
_559.selector="time";
if(typeof _559.min=="string"){_559.min=_1.date.stamp.fromISOString(_559.min)
}if(typeof _559.max=="string"){_559.max=_1.date.stamp.fromISOString(_559.max)
}},_onFocus:function(evt){this._open()
},setValue:function(_55b,_55c){this.inherited("setValue",arguments);
if(this._picker){if(!_55b||_55b.toString()==this._invalid){_55b=new Date()
}this._picker.setValue(_55b)
}},_open:function(){if(this.disabled){return 
}var self=this;
if(!this._picker){var _55e=_1.getObject(this._popupClass,false);
this._picker=new _55e({onValueSelected:function(_55f){self.focus();
setTimeout(_1.hitch(self,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(self,_55f,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(date){return self.constraints&&(_1.date.compare(self.constraints.min,date)>0||_1.date.compare(self.constraints.max,date)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:_1.hitch(this,this._close),onClose:function(){self._opened=false
}});
this._opened=true
}_1.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(_561){this.textbox.value=_561
}})
}if(!_1._hasResource["dijit.form.DateTextBox"]){_1._hasResource["dijit.form.DateTextBox"]=true;
_1.provide("dijit.form.DateTextBox");
_1.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}if(!_1._hasResource["dijit.form.FilteringSelect"]){_1._hasResource["dijit.form.FilteringSelect"]=true;
_1.provide("dijit.form.FilteringSelect");
_1.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(_562,_563,_564){if(_563&&_563.query[this.searchAttr]!=this._lastQuery){return 
}if(!_562.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(_562[0],_564)
}},_openResultList:function(_565,_566){if(_566.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=_565.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(_567,_568,_569){this.valueNode.value=_567;
dijit.form.FilteringSelect.superclass.setValue.call(this,_567,_569,_568);
this._lastDisplayedValue=_568
},setValue:function(_56a,_56b){var self=this;
var _56d=function(item,_56f){if(item){if(self.store.isItemLoaded(item)){self._callbackSetLabel([item],undefined,_56f)
}else{self.store.loadItem({item:item,onItem:function(_570,_571){self._callbackSetLabel(_570,_571,_56f)
}})
}}else{self._isvalid=false;
self.validate(false)
}};
this.store.fetchItemByIdentity({identity:_56a,onItem:function(item){_56d(item,_56b)
}})
},_setValueFromItem:function(item,_574){this._isvalid=true;
this._setValue(this.store.getIdentity(item),this.labelFunc(item,this.store),_574)
},labelFunc:function(item,_576){return _576.getValue(item,this.searchAttr)
},onkeyup:function(evt){},_doSelect:function(tgt){this.item=tgt.item;
this._setValueFromItem(tgt.item,true)
},setDisplayedValue:function(_579){if(this.store){var _57a={};
this._lastQuery=_57a[this.searchAttr]=_579;
this.textbox.value=_579;
this._lastDisplayedValue=_579;
this.store.fetch({query:_57a,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:_1.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(item){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(item,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!_1._hasResource["dijit.form._Spinner"]){_1._hasResource["dijit.form._Spinner"]=true;
_1.provide("dijit.form._Spinner");
_1.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(val,_57d){return val
},_handleUpArrowEvent:function(e){this._onMouse(e,this.upArrowNode)
},_handleDownArrowEvent:function(e){this._onMouse(e,this.downArrowNode)
},_arrowPressed:function(_580,_581){if(this.disabled){return 
}_1.addClass(_580,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),_581*this.smallDelta),false)
},_arrowReleased:function(node){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
_1.removeClass(node,"dijitSpinnerButtonActive")
},_typematicCallback:function(_583,node,evt){if(node==this.textbox){node=(evt.keyCode==_1.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(_583==-1){this._arrowReleased(node)
}else{this._arrowPressed(node,(node==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(evt){_1.stopEvent(evt);
var _587=0;
if(typeof evt.wheelDelta=="number"){_587=evt.wheelDelta
}else{if(typeof evt.detail=="number"){_587=-evt.detail
}}if(_587>0){var node=this.upArrowNode;
var dir=+1
}else{if(_587<0){var node=this.downArrowNode;
var dir=-1
}else{return 
}}this._arrowPressed(node,dir);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var _58a=this;
this._wheelTimer=setTimeout(function(){_58a._arrowReleased(node)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,_1.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:_1.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:_1.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!_1._hasResource["dijit.form.NumberSpinner"]){_1._hasResource["dijit.form.NumberSpinner"]=true;
_1.provide("dijit.form.NumberSpinner");
_1.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(val,_58c){var _58d=val+_58c;
if(isNaN(val)||isNaN(_58d)){return val
}if((typeof this.constraints.max=="number")&&(_58d>this.constraints.max)){_58d=this.constraints.max
}if((typeof this.constraints.min=="number")&&(_58d<this.constraints.min)){_58d=this.constraints.min
}return _58d
}})
}if(!_1._hasResource["dijit.form.Slider"]){_1._hasResource["dijit.form.Slider"]=true;
_1.provide("dijit.form.Slider");
_1.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:_1.mixin(_1.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(e){if(this.disabled||e.altKey||e.ctrlKey){return 
}switch(e.keyCode){case _1.keys.HOME:this.setValue(this.minimum,false);
break;
case _1.keys.END:this.setValue(this.maximum,false);
break;
case _1.keys.UP_ARROW:case (this._isReversed()?_1.keys.LEFT_ARROW:_1.keys.RIGHT_ARROW):case _1.keys.PAGE_UP:this.increment(e);
break;
case _1.keys.DOWN_ARROW:case (this._isReversed()?_1.keys.RIGHT_ARROW:_1.keys.LEFT_ARROW):case _1.keys.PAGE_DOWN:this.decrement(e);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}_1.stopEvent(e)
},_onHandleClick:function(e){if(this.disabled){return 
}if(!_1.isIE){dijit.focus(this.sliderHandle)
}_1.stopEvent(e)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(e){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
_1.stopEvent(e);
var _591=_1.coords(this.sliderBarContainer,true);
var _592=e[this._mousePixelCoord]-_591[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(_591[this._pixelCount]-_592):_592,_591[this._pixelCount],true)
},_setPixelValue:function(_593,_594,_595){if(this.disabled){return 
}_593=_593<0?0:_594<_593?_594:_593;
var _596=this.discreteValues;
if(_596<=1||_596==Infinity){_596=_594
}_596--;
var _597=_594/_596;
var _598=Math.round(_593/_597);
this.setValue((this.maximum-this.minimum)*_598/_596+this.minimum,_595)
},setValue:function(_599,_59a){this.valueNode.value=this.value=_599;
this.inherited("setValue",arguments);
var _59b=(_599-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(_59b*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-_59b)*100)+"%"
},_bumpValue:function(_59c){if(this.disabled){return 
}var s=_1.getComputedStyle(this.sliderBarContainer);
var c=_1._getContentBox(this.sliderBarContainer,s);
var _59f=this.discreteValues;
if(_59f<=1||_59f==Infinity){_59f=c[this._pixelCount]
}_59f--;
var _5a0=(this.value-this.minimum)*_59f/(this.maximum-this.minimum)+_59c;
if(_5a0<0){_5a0=0
}if(_5a0>_59f){_5a0=_59f
}_5a0=_5a0*(this.maximum-this.minimum)/_59f+this.minimum;
this.setValue(_5a0,true)
},decrement:function(e){this._bumpValue(e.keyCode==_1.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(e){this._bumpValue(e.keyCode==_1.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(evt){_1.stopEvent(evt);
var _5a4=0;
if(typeof evt.wheelDelta=="number"){_5a4=evt.wheelDelta
}else{if(typeof evt.detail=="number"){_5a4=-evt.detail
}}if(_5a4>0){this.increment(evt)
}else{if(_5a4<0){this.decrement(evt)
}}},startup:function(){_1.forEach(this.getChildren(),function(_5a5){if(this[_5a5.container]!=this.containerNode){this[_5a5.container].appendChild(_5a5.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,_1.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var _5a6=this;
var _5a7=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=_5a6
};
_1.extend(_5a7,dijit.form._SliderMover.prototype);
this._movable=new _1.dnd.Moveable(this.sliderHandle,{mover:_5a7});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
_1.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
_1.declare("dijit.form._SliderMover",_1.dnd.Mover,{onMouseMove:function(e){var _5a9=this.widget;
var c=this.constraintBox;
if(!c){var _5ab=_5a9.sliderBarContainer;
var s=_1.getComputedStyle(_5ab);
var c=_1._getContentBox(_5ab,s);
c[_5a9._startingPixelCount]=0;
this.constraintBox=c
}var m=this.marginBox;
var _5ae=_5a9._isReversed()?e[_5a9._mousePixelCoord]-_1._abs(_5a9.sliderBarContainer).x:m[_5a9._startingPixelCount]+e[_5a9._mousePixelCoord];
_1.hitch(_5a9,"_setPixelValue")(_5a9._isReversed()||_5a9._upsideDown?(c[_5a9._pixelCount]-_5ae):_5ae,c[_5a9._pixelCount])
},destroy:function(e){var _5b0=this.widget;
_5b0.setValue(_5b0.value,true);
_1.dnd.Mover.prototype.destroy.call(this)
}});
_1.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(pos,ndx){return this._positionPrefix+pos+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var _5b3=this._genHTML(50,0)
}else{var _5b4=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var _5b3=this._genHTML(0,0);
for(var i=1;
i<this.count-1;
i++){_5b3+=this._genHTML(_5b4*i,i)
}_5b3+=this._genHTML(100,this.count-1)
}else{var _5b3=this._genHTML(100,0);
for(var i=1;
i<this.count-1;
i++){_5b3+=this._genHTML(100-_5b4*i,i)
}_5b3+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=_5b3
}});
_1.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
_1.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(pos){return pos
},_genHTML:function(pos,ndx){return this._positionPrefix+this._calcPosition(pos)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[ndx]+this._suffix
},getLabels:function(){var _5b9=this.labels;
if(!_5b9.length){_5b9=_1.query("> li",this.srcNodeRef).map(function(node){return String(node.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!_5b9.length&&this.count>1){var _5bb=this.minimum;
var inc=(this.maximum-_5bb)/(this.count-1);
for(var i=0;
i<this.count;
i++){_5b9.push((i<this.numericMargin||i>=(this.count-this.numericMargin))?"":_1.number.format(_5bb,this.constraints));
_5bb+=inc
}}return _5b9
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
_1.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(pos){return 100-pos
},_isHorizontal:false})
}if(!_1._hasResource["dijit.form.Textarea"]){_1._hasResource["dijit.form.Textarea"]=true;
_1.provide("dijit.form.Textarea");
_1.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:_1.mixin(_1.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(_1.isIE||_1.isSafari||_1.isMozilla)?((_1.isIE||_1.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((_1.isIE||_1.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(_1.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(_5bf,_5c0){var _5c1=this.editNode;
if(typeof _5bf=="string"){_5c1.innerHTML="";
if(_5bf.split){var _5c2=this;
var _5c3=true;
_1.forEach(_5bf.split("\n"),function(line){if(_5c3){_5c3=false
}else{_5c1.appendChild(document.createElement("BR"))
}_5c1.appendChild(document.createTextNode(line))
})
}else{_5c1.appendChild(document.createTextNode(_5bf))
}}else{_5bf=_5c1.innerHTML;
if(this.iframe){_5bf=_5bf.replace(/<div><\/div>\r?\n?$/i,"")
}_5bf=_5bf.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=_5bf;
if(this.iframe){var _5c5=document.createElement("div");
_5c1.appendChild(_5c5);
var _5c6=_5c5.offsetTop;
if(_5c1.scrollWidth>_5c1.clientWidth){_5c6+=16
}if(this.lastHeight!=_5c6){if(_5c6==0){_5c6=16
}_1.contentBox(this.iframe,{h:_5c6});
this.lastHeight=_5c6
}_5c1.removeChild(_5c5)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),_5c0)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(_1.isMozilla){var _5c7=_1.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=_5c7.iframeEditTitle;
this._iframeFocusTitle=_5c7.iframeFocusTitle;
var _5c8=_1.query('label[for="'+this.id+'"]');
if(_5c8.length){this._iframeEditTitle=_5c8[0].innerHTML+" "+this._iframeEditTitle
}var body=this.focusNode=this.editNode=document.createElement("BODY");
body.style.margin="0px";
body.style.padding="0px";
body.style.border="0px"
}},postCreate:function(){if(_1.isIE||_1.isSafari){this.domNode.style.overflowY="hidden"
}else{if(_1.isMozilla){var w=this.iframe.contentWindow;
try{var _5cb=this.iframe.contentDocument.title
}catch(e){var _5cb=""
}if(!w||!_5cb){this.iframe.postCreate=_1.hitch(this,this.postCreate);
return 
}var d=w.document;
d.getElementsByTagName("HTML")[0].replaceChild(this.editNode,d.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){d.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=d;
w.addEventListener("resize",_1.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(e){_1.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(e)
},_blurred:function(e){_1.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(e,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(e){if(e.keyCode==_1.keys.TAB&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
_1.stopEvent(e)
}else{if(e.keyCode==_1.keys.ENTER){e.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.keyCode,e.charCode);
this.iframe.dispatchEvent(te)
}}}this._changing()
},_changing:function(e){setTimeout(_1.hitch(this,"_changed",e,false),1)
},_changed:function(e,_5d3){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,_5d3)
}})
}if(!_1._hasResource["dijit.layout.StackContainer"]){_1._hasResource["dijit.layout.StackContainer"]=true;
_1.provide("dijit.layout.StackContainer");
_1.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var _5d4=this.getChildren();
_1.forEach(_5d4,this._setupChild,this);
_1.some(_5d4,function(_5d5){if(_5d5.selected){this.selectedChildWidget=_5d5
}return _5d5.selected
},this);
var _5d6=this.selectedChildWidget;
if(!_5d6&&_5d4[0]){_5d6=this.selectedChildWidget=_5d4[0];
_5d6.selected=true
}if(_5d6){this._showChild(_5d6)
}_1.publish(this.id+"-startup",[{children:_5d4,selected:_5d6}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(page){page.domNode.style.display="none";
page.domNode.style.position="relative";
return page
},addChild:function(_5d8,_5d9){dijit._Container.prototype.addChild.apply(this,arguments);
_5d8=this._setupChild(_5d8);
if(this._started){this.layout();
_1.publish(this.id+"-addChild",[_5d8,_5d9]);
if(!this.selectedChildWidget){this.selectChild(_5d8)
}}},removeChild:function(page){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){_1.publish(this.id+"-removeChild",[page]);
this.layout()
}if(this.selectedChildWidget===page){this.selectedChildWidget=undefined;
if(this._started){var _5db=this.getChildren();
if(_5db.length){this.selectChild(_5db[0])
}}}},selectChild:function(page){page=dijit.byId(page);
if(this.selectedChildWidget!=page){this._transition(page,this.selectedChildWidget);
this.selectedChildWidget=page;
_1.publish(this.id+"-selectChild",[page])
}},_transition:function(_5dd,_5de){if(_5de){this._hideChild(_5de)
}this._showChild(_5dd);
if(this.doLayout&&_5dd.resize){_5dd.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(_5df){var _5e0=this.getChildren();
var _5e1=_1.indexOf(_5e0,this.selectedChildWidget);
_5e1+=_5df?1:_5e0.length-1;
return _5e0[_5e1%_5e0.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(e){_1.publish(this.id+"-containerKeyPress",[{e:e,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(page){var _5e4=this.getChildren();
page.isFirstChild=(page==_5e4[0]);
page.isLastChild=(page==_5e4[_5e4.length-1]);
page.selected=true;
page.domNode.style.display="";
if(page._loadCheck){page._loadCheck()
}if(page.onShow){page.onShow()
}},_hideChild:function(page){page.selected=false;
page.domNode.style.display="none";
if(page.onHide){page.onHide()
}},closeChild:function(page){var _5e7=page.onClose(this,page);
if(_5e7){this.removeChild(page);
page.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
_1.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[_1.subscribe(this.containerId+"-startup",this,"onStartup"),_1.subscribe(this.containerId+"-addChild",this,"onAddChild"),_1.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),_1.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),_1.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(info){_1.forEach(info.children,this.onAddChild,this);
this.onSelectChild(info.selected)
},destroy:function(){_1.forEach(this._subscriptions,_1.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(page,_5ea){var _5eb=document.createElement("span");
this.domNode.appendChild(_5eb);
var cls=_1.getObject(this.buttonWidget);
var _5ed=new cls({label:page.title,closeButton:page.closable},_5eb);
this.addChild(_5ed,_5ea);
this.pane2button[page]=_5ed;
page.controlButton=_5ed;
_1.connect(_5ed,"onClick",_1.hitch(this,"onButtonClick",page));
_1.connect(_5ed,"onClickCloseButton",_1.hitch(this,"onCloseButtonClick",page));
if(!this._currentChild){_5ed.focusNode.setAttribute("tabIndex","0");
this._currentChild=page
}},onRemoveChild:function(page){if(this._currentChild===page){this._currentChild=null
}var _5ef=this.pane2button[page];
if(_5ef){_5ef.destroy()
}this.pane2button[page]=null
},onSelectChild:function(page){if(!page){return 
}if(this._currentChild){var _5f1=this.pane2button[this._currentChild];
_5f1.setChecked(false);
_5f1.focusNode.setAttribute("tabIndex","-1")
}var _5f2=this.pane2button[page];
_5f2.setChecked(true);
this._currentChild=page;
_5f2.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(page){var _5f4=dijit.byId(this.containerId);
_5f4.selectChild(page)
},onCloseButtonClick:function(page){var _5f6=dijit.byId(this.containerId);
_5f6.closeChild(page);
var b=this.pane2button[this._currentChild];
if(b){dijit.focus(b.focusNode||b.domNode)
}},adjacent:function(_5f8){var _5f9=this.getChildren();
var _5fa=_1.indexOf(_5f9,this.pane2button[this._currentChild]);
var _5fb=_5f8?1:_5f9.length-1;
return _5f9[(_5fa+_5fb)%_5f9.length]
},onkeypress:function(e){if(this.disabled||e.altKey){return 
}var _5fd=true;
if(e.ctrlKey||!e._djpage){var k=_1.keys;
switch(e.keyCode){case k.LEFT_ARROW:case k.UP_ARROW:case k.PAGE_UP:_5fd=false;
case k.RIGHT_ARROW:case k.DOWN_ARROW:case k.PAGE_DOWN:this.adjacent(_5fd).onClick();
_1.stopEvent(e);
break;
case k.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}_1.stopEvent(e);
break;
default:if(e.ctrlKey){if(e.keyCode==k.TAB){this.adjacent(!e.shiftKey).onClick();
_1.stopEvent(e)
}else{if(e.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}_1.stopEvent(e)
}}}}}},onContainerKeyPress:function(info){info.e._djpage=info.page;
this.onkeypress(info.e)
}});
_1.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(evt){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(evt){dijit.focus(this.focusNode)
},onClickCloseButton:function(evt){evt.stopPropagation()
}});
_1.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
}if(!_1._hasResource["dijit.layout.AccordionContainer"]){_1._hasResource["dijit.layout.AccordionContainer"]=true;
_1.provide("dijit.layout.AccordionContainer");
_1.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
_1.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var _603=this.selectedChildWidget.containerNode.style;
_603.display="";
_603.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var _604=0;
var _605=this.selectedChildWidget;
_1.forEach(this.getChildren(),function(_606){_604+=_606.getTitleHeight()
});
var _607=this._contentBox;
this._verticalSpace=(_607.h-_604);
if(_605){_605.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(page){return page
},_transition:function(_609,_60a){if(this._inTransition){return 
}this._inTransition=true;
var _60b=[];
var _60c=this._verticalSpace;
if(_609){_609.setSelected(true);
var _60d=_609.containerNode;
_60d.style.display="";
_60b.push(_1.animateProperty({node:_60d,duration:this.duration,properties:{height:{start:"1",end:_60c}},onEnd:function(){_60d.style.overflow="auto"
}}))
}if(_60a){_60a.setSelected(false);
var _60e=_60a.containerNode;
_60e.style.overflow="hidden";
_60b.push(_1.animateProperty({node:_60e,duration:this.duration,properties:{height:{start:_60c,end:"1"}},onEnd:function(){_60e.style.display="none"
}}))
}this._inTransition=false;
_1.fx.combine(_60b).play()
},_onKeyPress:function(e){if(this.disabled||e.altKey){return 
}var k=_1.keys;
switch(e.keyCode){case k.LEFT_ARROW:case k.UP_ARROW:case k.PAGE_UP:this._adjacent(false)._onTitleClick();
_1.stopEvent(e);
break;
case k.RIGHT_ARROW:case k.DOWN_ARROW:case k.PAGE_DOWN:this._adjacent(true)._onTitleClick();
_1.stopEvent(e);
break;
default:if(e.ctrlKey&&e.keyCode==k.TAB){this._adjacent(e._dijitWidget,!e.shiftKey)._onTitleClick();
_1.stopEvent(e)
}}}});
_1.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
_1.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return _1.marginBox(this.titleNode).h
},_onTitleClick:function(){var _611=this.getParent();
if(!_611._inTransition){_611.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(evt){evt._dijitWidget=this;
return this.getParent()._onKeyPress(evt)
},_setSelectedState:function(_613){this.selected=_613;
_1[(_613?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",_613?"0":"-1")
},_handleFocus:function(e){_1[(e.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(_615){this._setSelectedState(_615);
if(_615){this.onSelected()
}},onSelected:function(){}})
}if(!_1._hasResource["dijit.layout.LayoutContainer"]){_1._hasResource["dijit.layout.LayoutContainer"]=true;
_1.provide("dijit.layout.LayoutContainer");
_1.declare("dijit.layout.LayoutContainer",dijit.layout._LayoutWidget,{layout:function(){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(_616,_617){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(_618){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}}});
_1.extend(dijit._Widget,{layoutAlign:"none"})
}if(!_1._hasResource["dijit.layout.LinkPane"]){_1._hasResource["dijit.layout.LinkPane"]=true;
_1.provide("dijit.layout.LinkPane");
_1.declare("dijit.layout.LinkPane",[dijit.layout.ContentPane,dijit._Templated],{templateString:'<div class="dijitLinkPane"></div>',postCreate:function(){if(this.srcNodeRef){this.title+=this.srcNodeRef.innerHTML
}this.inherited("postCreate",arguments)
}})
}if(!_1._hasResource["dijit.layout.SplitContainer"]){_1._hasResource["dijit.layout.SplitContainer"]=true;
_1.provide("dijit.layout.SplitContainer");
_1.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
_1.addClass(this.domNode,"dijitSplitContainer");
if(_1.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(e){this.sizerWidth=7
}}var _619=this.virtualSizer=document.createElement("div");
_619.style.position="relative";
_619.style.zIndex=10;
_619.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(_619);
_1.setSelectable(_619,false)
},startup:function(){if(this._started){return 
}_1.forEach(this.getChildren(),function(_61a,i,_61c){this._injectChild(_61a);
if(i<_61c.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(_61d){_61d.domNode.style.position="absolute";
_1.addClass(_61d.domNode,"dijitSplitPane")
},_addSizer:function(){var i=this.sizers.length;
var _61f=this.sizers[i]=document.createElement("div");
_61f.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var _620=document.createElement("div");
_620.className="thumb";
_61f.appendChild(_620);
var self=this;
var _622=(function(){var _623=i;
return function(e){self.beginSizing(e,_623)
}
})();
_1.connect(_61f,"onmousedown",_622);
this.domNode.appendChild(_61f);
_1.setSelectable(_61f,false)
},removeChild:function(_625){if(this.sizers.length&&_1.indexOf(this.getChildren(),_625)!=-1){var i=this.sizers.length-1;
_1._destroyElement(this.sizers[i]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(_627,_628){this.inherited("addChild",arguments);
if(this._started){this._injectChild(_627);
var _629=this.getChildren();
if(_629.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var _62a=this.getChildren();
if(!_62a.length){return 
}var _62b=this.isHorizontal?this.paneWidth:this.paneHeight;
if(_62a.length>1){_62b-=this.sizerWidth*(_62a.length-1)
}var _62c=0;
_1.forEach(_62a,function(_62d){_62c+=_62d.sizeShare
});
var _62e=_62b/_62c;
var _62f=0;
_1.forEach(_62a.slice(0,_62a.length-1),function(_630){var size=Math.round(_62e*_630.sizeShare);
_630.sizeActual=size;
_62f+=size
});
_62a[_62a.length-1].sizeActual=_62b-_62f;
this._checkSizes();
var pos=0;
var size=_62a[0].sizeActual;
this._movePanel(_62a[0],pos,size);
_62a[0].position=pos;
pos+=size;
if(!this.sizers){return 
}_1.some(_62a.slice(1),function(_634,i){if(!this.sizers[i]){return true
}this._moveSlider(this.sizers[i],pos,this.sizerWidth);
this.sizers[i].position=pos;
pos+=this.sizerWidth;
size=_634.sizeActual;
this._movePanel(_634,pos,size);
_634.position=pos;
pos+=size
},this)
},_movePanel:function(_636,pos,size){if(this.isHorizontal){_636.domNode.style.left=pos+"px";
_636.domNode.style.top=0;
var box={w:size,h:this.paneHeight};
if(_636.resize){_636.resize(box)
}else{_1.marginBox(_636.domNode,box)
}}else{_636.domNode.style.left=0;
_636.domNode.style.top=pos+"px";
var box={w:this.paneWidth,h:size};
if(_636.resize){_636.resize(box)
}else{_1.marginBox(_636.domNode,box)
}}},_moveSlider:function(_63a,pos,size){if(this.isHorizontal){_63a.style.left=pos+"px";
_63a.style.top=0;
_1.marginBox(_63a,{w:size,h:this.paneHeight})
}else{_63a.style.left=0;
_63a.style.top=pos+"px";
_1.marginBox(_63a,{w:this.paneWidth,h:size})
}},_growPane:function(_63d,pane){if(_63d>0){if(pane.sizeActual>pane.sizeMin){if((pane.sizeActual-pane.sizeMin)>_63d){pane.sizeActual=pane.sizeActual-_63d;
_63d=0
}else{_63d-=pane.sizeActual-pane.sizeMin;
pane.sizeActual=pane.sizeMin
}}}return _63d
},_checkSizes:function(){var _63f=0;
var _640=0;
var _641=this.getChildren();
_1.forEach(_641,function(_642){_640+=_642.sizeActual;
_63f+=_642.sizeMin
});
if(_63f<=_640){var _643=0;
_1.forEach(_641,function(_644){if(_644.sizeActual<_644.sizeMin){_643+=_644.sizeMin-_644.sizeActual;
_644.sizeActual=_644.sizeMin
}});
if(_643>0){var list=this.isDraggingLeft?_641.reverse():_641;
_1.forEach(list,function(_646){_643=this._growPane(_643,_646)
},this)
}}else{_1.forEach(_641,function(_647){_647.sizeActual=Math.round(_640*(_647.sizeMin/_63f))
})
}},beginSizing:function(e,i){var _64a=this.getChildren();
this.paneBefore=_64a[i];
this.paneAfter=_64a[i+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[i];
if(!this.cover){this.cover=_1.doc.createElement("div");
this.domNode.appendChild(this.cover);
var s=this.cover.style;
s.position="absolute";
s.zIndex=1;
s.top=0;
s.left=0;
s.width="100%";
s.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=_1.coords(_64a[0].domNode,true);
if(this.isHorizontal){var _64c=(e.layerX?e.layerX:e.offsetX);
var _64d=e.pageX;
this.originPos=this.originPos.x
}else{var _64c=(e.layerY?e.layerY:e.offsetY);
var _64d=e.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=_64d;
this.screenToClientOffset=_64d-_64c;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(_1.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(_1.connect(document.documentElement,"onmouseup",this,"endSizing"));
_1.stopEvent(e)
},changeSizing:function(e){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?e.pageX:e.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}_1.stopEvent(e)
},endSizing:function(e){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}_1.forEach(this._connects,_1.disconnect)
},movePoint:function(){var p=this.lastPoint-this.screenToClientOffset;
var a=p-this.dragOffset;
a=this.legaliseSplitPoint(a);
p=a+this.dragOffset;
this.lastPoint=p+this.screenToClientOffset
},legaliseSplitPoint:function(a){a+=this.sizingSplitter.position;
this.isDraggingLeft=!!(a>0);
if(!this.activeSizing){var min=this.paneBefore.position+this.paneBefore.sizeMin;
if(a<min){a=min
}var max=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(a>max){a=max
}}a-=this.sizingSplitter.position;
this._checkSizes();
return a
},_updateSize:function(){var pos=this.lastPoint-this.dragOffset-this.originPos;
var _656=this.paneBefore.position;
var _657=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=pos-_656;
this.paneAfter.position=pos+this.sizerWidth;
this.paneAfter.sizeActual=_657-this.paneAfter.position;
_1.forEach(this.getChildren(),function(_658){_658.sizeShare=_658.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
_1.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var pos=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
_1.style(this.virtualSizer,(this.isHorizontal?"left":"top"),pos+"px")
},_getCookieName:function(i){return this.id+"_"+i
},_restoreState:function(){_1.forEach(this.getChildren(),function(_65b,i){var _65d=this._getCookieName(i);
var _65e=_1.cookie(_65d);
if(_65e){var pos=parseInt(_65e);
if(typeof pos=="number"){_65b.sizeShare=pos
}}},this)
},_saveState:function(){_1.forEach(this.getChildren(),function(_660,i){_1.cookie(this._getCookieName(i),_660.sizeShare)
},this)
}});
_1.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}if(!_1._hasResource["dijit.layout.TabContainer"]){_1._hasResource["dijit.layout.TabContainer"]=true;
_1.provide("dijit.layout.TabContainer");
_1.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(tab){_1.addClass(tab.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return tab
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(_1.isSafari){setTimeout(_1.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var _663=this.tabPosition.replace(/-h/,"");
var _664=[{domNode:this.tablist.domNode,layoutAlign:_663},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_664);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_664[1]);
if(this.selectedChildWidget){this._showChild(this.selectedChildWidget);
if(this.doLayout&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._containerContentBox)
}}},destroy:function(){this.tablist.destroy();
this.inherited("destroy",arguments)
}});
_1.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",doLayout:true,buttonWidget:"dijit.layout._TabButton",postMixInProperties:function(){this["class"]="dijitTabLabels-"+this.tabPosition+(this.doLayout?"":" dijitTabNoLayout");
this.inherited("postMixInProperties",arguments)
}});
_1.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",templateString:"<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\r\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\r\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\r\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n",postCreate:function(){if(this.closeButton){_1.addClass(this.innerDiv,"dijitClosable")
}else{this.closeButtonNode.style.display="none"
}this.inherited("postCreate",arguments);
_1.setSelectable(this.containerNode,false)
}})
}if(!_1._hasResource["dijit.dijit-all"]){_1._hasResource["dijit.dijit-all"]=true;
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
_1.provide("dijit.dijit-all")
}}});