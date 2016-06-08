if(!dojo._hasResource["dojo.colors"]){dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
(function(){var C=function(G,H,B){if(B<0){++B
}if(B>1){--B
}var A=6*B;
if(A<1){return G+(H-G)*A
}if(2*B<1){return H
}if(3*B<2){return G+(H-G)*(2/3-B)*6
}return G
};
dojo.colorFromRgb=function(Y,W){var A=Y.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(A){var U=A[2].split(/\s*,\s*/),Z=U.length,H=A[1];
if((H=="rgb"&&Z==3)||(H=="rgba"&&Z==4)){var B=U[0];
if(B.charAt(B.length-1)=="%"){var T=dojo.map(U,function(E){return parseFloat(E)*2.56
});
if(Z==4){T[3]=U[3]
}return dojo.colorFromArray(T,W)
}return dojo.colorFromArray(U,W)
}if((H=="hsl"&&Z==3)||(H=="hsla"&&Z==4)){var S=((parseFloat(U[0])%360)+360)%360/360,X=parseFloat(U[1])/100,V=parseFloat(U[2])/100,R=V<=0.5?V*(X+1):V+X-V*X,L=2*V-R,T=[C(L,R,S+1/3)*256,C(L,R,S)*256,C(L,R,S-1/3)*256,1];
if(Z==4){T[3]=U[3]
}return dojo.colorFromArray(T,W)
}}return null
};
var D=function(A,F,B){A=Number(A);
return isNaN(A)?B:A<F?F:A>B?B:A
};
dojo.Color.prototype.sanitize=function(){var A=this;
A.r=Math.round(D(A.r,0,255));
A.g=Math.round(D(A.g,0,255));
A.b=Math.round(D(A.b,0,255));
A.a=D(A.a,0,1);
return this
}
})();
dojo.colors.makeGrey=function(D,C){return dojo.colorFromArray([D,D,D,C])
};
dojo.Color.named=dojo.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},dojo.Color.named)
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(M,L,Q){Q=dojo.i18n.normalizeLocale(Q);
var N=Q.split("-");
var K=[M,"nls",L].join(".");
var O=dojo._loadedModules[K];
if(O){var P;
for(var T=N.length;
T>0;
T--){var R=N.slice(0,T).join("_");
if(O[R]){P=O[R];
break
}}if(!P){P=O.ROOT
}if(P){var S=function(){};
S.prototype=P;
return new S()
}}throw new Error("Bundle not found: "+L+" in "+M+" , locale="+Q)
};
dojo.i18n.normalizeLocale=function(D){var C=D?D.toLowerCase():dojo.locale;
if(C=="root"){C="ROOT"
}return C
};
dojo.i18n._requireLocalization=function(U,T,X,b){var f=dojo.i18n.normalizeLocale(X);
var i=[U,"nls",T].join(".");
var R="";
if(b){var Y=b.split(",");
for(var d=0;
d<Y.length;
d++){if(f.indexOf(Y[d])==0){if(Y[d].length>R.length){R=Y[d]
}}}if(!R){R="ROOT"
}}var a=b?R:f;
var V=dojo._loadedModules[i];
var S=null;
if(V){if(djConfig.localizationComplete&&V._built){return 
}var g=a.replace(/-/g,"_");
var Z=i+"."+g;
S=dojo._loadedModules[Z]
}if(!S){V=dojo.provide(i);
var h=dojo._getModuleSymbols(U);
var c=h.concat("nls").join("/");
var W;
dojo.i18n._searchLocalePath(a,b,function(B){var A=B.replace(/-/g,"_");
var C=i+"."+A;
var E=false;
if(!dojo._loadedModules[C]){dojo.provide(C);
var D=[c];
if(B!="ROOT"){D.push(B)
}D.push(T);
var F=D.join("/")+".js";
E=dojo._loadPath(F,null,function(G){var H=function(){};
H.prototype=W;
V[A]=new H();
for(var I in G){V[A][I]=G[I]
}})
}else{E=true
}if(E&&V[A]){W=V[A]
}else{V[A]=W
}if(b){return true
}})
}if(b&&f!=R){V[f.replace(/-/g,"_")]=V[R.replace(/-/g,"_")]
}};
(function(){var C=djConfig.extraLocale;
if(C){if(!C instanceof Array){C=[C]
}var D=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(H,I,J,A){D(H,I,J,A);
if(J){return 
}for(var B=0;
B<C.length;
B++){D(H,I,C[B],A)
}}
}})();
dojo.i18n._searchLocalePath=function(O,N,K){O=dojo.i18n.normalizeLocale(O);
var M=O.split("-");
var L=[];
for(var R=M.length;
R>0;
R--){L.push(M.slice(0,R).join("-"))
}L.push(false);
if(N){L.reverse()
}for(var J=L.length-1;
J>=0;
J--){var Q=L[J]||"ROOT";
var P=K(Q);
if(P){break
}}};
dojo.i18n._preloadLocalizations=function(G,J){function I(A){A=dojo.i18n.normalizeLocale(A);
dojo.i18n._searchLocalePath(A,true,function(B){for(var C=0;
C<J.length;
C++){if(J[C]==B){dojo.require(G+"_"+B);
return true
}}return false
})
}I();
var F=djConfig.extraLocale||[];
for(var H=0;
H<F.length;
H++){I(F[H])
}}
}if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var R=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);
var O=dojo.moduleUrl("dijit","templates/blank.gif");
var S=new dojo.Color(),V=this._paletteCoords;
for(var Q=0;
Q<R.length;
Q++){for(var N=0;
N<R[Q].length;
N++){var T=document.createElement("img");
T.src=O;
dojo.addClass(T,"dijitPaletteImg");
var M=R[Q][N],P=S.setColor(dojo.Color.named[M]);
T.alt=this.colorNames[M];
T.color=P.toHex();
var W=T.style;
W.color=W.backgroundColor=T.color;
dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(A){this.connect(T,"on"+A.toLowerCase(),"_onColor"+A)
},this);
this.divNode.appendChild(T);
W.top=V.topOffset+(Q*V.cHeight)+"px";
W.left=V.leftOffset+(N*V.cWidth)+"px";
T.setAttribute("tabIndex","-1");
T.title=this.colorNames[M];
dijit.setWaiRole(T,"gridcell");
T.index=this._highlightNodes.length;
this._highlightNodes.push(T)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=R[0].length;
this._yDim=R.length;
var X={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var U in X){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[U],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var A=X[U];
return function(B){this._navigateByKey(A,B)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(B){},_onColorDijitclick:function(C){var D=C.currentTarget;
if(this._currentFocus!=D.index){this._currentFocus=D.index;
dijit.focus(D)
}this._selectColor(D);
dojo.stopEvent(C)
},_onColorMouseOut:function(B){dojo.removeClass(B.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(C){var D=C.currentTarget;
D.tabIndex=0;
D.focus()
},_onColorBlur:function(B){dojo.removeClass(B.currentTarget,"dijitPaletteImgHighlight");
B.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(B){if(this._currentFocus!=B.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=B.currentTarget.index;
dojo.addClass(B.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(B){this.onChange(this.value=B.color)
},_navigateByKey:function(E,G){if(G==-1){return 
}var H=this._currentFocus+E;
if(H<this._highlightNodes.length&&H>-1){var F=this._highlightNodes[H];
F.tabIndex=0;
F.focus()
}}})
}if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var H=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var I=dojo.query("> script[type='dojo/method'][event='preamble']",H).orphan();
var K=dojo.query("> script[type^='dojo/']",H).orphan();
var J=H.nodeName;
var L=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(A){return dojo.getObject(A)
}):[dijit._Widget,dijit._Templated];
if(I.length){L.preamble=dojo.parser._functionFromScript(I[0])
}var G=dojo.map(K,function(A){var B=A.getAttribute("event")||"postscript";
return{event:B,func:dojo.parser._functionFromScript(A)}
});
this.mixins.push(function(){dojo.forEach(G,function(A){dojo.connect(this,A.event,this,A.func)
},this)
});
L.widgetsInTemplate=true;
L._skipNodeCache=true;
L.templateString="<"+J+" class='"+H.className+"' dojoAttachPoint='"+(H.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(H.getAttribute("dojoAttachEvent")||"")+"' >"+H.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+J+">";
dojo.query("[dojoType]",H).forEach(function(A){A.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,L)
}})
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(B){return B[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var B;
do{B="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(B));
return B
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(D){var C=D.target;
if(C.nodeType==3){C=C.parentNode
}return" button textarea input select option ".indexOf(" "+C.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var F=dojo.doc,H=F.documentElement,G=window,E=dojo.body();
if(dojo.isMozilla){return{w:H.clientWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&G.innerWidth){return{w:G.innerWidth,h:G.innerHeight}
}else{if(!dojo.isOpera&&H&&H.clientWidth){return{w:H.clientWidth,h:H.clientHeight}
}else{if(E.clientWidth){return{w:E.clientWidth,h:E.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(F){var G=dojo.dnd.getViewport(),H=0,E=0;
if(F.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){H=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(F.clientX>G.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){H=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(F.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(F.clientY>G.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(H,E)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(Z){for(var P=Z.target;
P;
){if(P.nodeType==1&&(P.tagName.toLowerCase() in dojo.dnd._validNodes)){var S=dojo.getComputedStyle(P);
if(S.overflow.toLowerCase() in dojo.dnd._validOverflow){var Y=dojo._getContentBox(P,S),U=dojo._abs(P,true);
Y.l+=U.x+P.scrollLeft;
Y.t+=U.y+P.scrollTop;
var W=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,Y.w/2),a=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,Y.h/2),Q=Z.pageX-Y.l,R=Z.pageY-Y.t,T=0,V=0;
if(Q>0&&Q<Y.w){if(Q<W){T=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(Q>Y.w-W){T=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(R>0&&R<Y.h){if(R<a){V=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(R>Y.h-a){V=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var O=P.scrollLeft,b=P.scrollTop;
P.scrollLeft=P.scrollLeft+T;
P.scrollTop=P.scrollTop+V;
if(O!=P.scrollLeft||b!=P.scrollTop){return 
}}}try{P=P.parentNode
}catch(X){P=null
}}dojo.dnd.autoScroll(Z)
}
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(J,I,K){this.node=dojo.byId(J);
this.marginBox={l:I.pageX,t:I.pageY};
this.mouseButton=I.button;
var L=this.host=K,H=J.ownerDocument,G=dojo.connect(H,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(H,"onmousemove",this,"onMouseMove"),dojo.connect(H,"onmouseup",this,"onMouseUp"),dojo.connect(H,"ondragstart",dojo,"stopEvent"),dojo.connect(H,"onselectstart",dojo,"stopEvent"),G];
if(L&&L.onMoveStart){L.onMoveStart(this)
}},onMouseMove:function(D){dojo.dnd.autoScroll(D);
var C=this.marginBox;
this.host.onMove(this,{l:C.l+D.pageX,t:C.t+D.pageY})
},onMouseUp:function(B){if(this.mouseButton==B.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var B=dojo.marginBox(this.node);
B.l-=this.marginBox.l;
B.t-=this.marginBox.t;
this.marginBox=B;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var B=this.host;
if(B&&B.onMoveStop){B.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(C,D){this.node=dojo.byId(C);
if(!D){D={}
}this.handle=D.handle?dojo.byId(D.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=D.delay>0?D.delay:0;
this.skip=D.skip;
this.mover=D.mover?D.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(D,C){return new dojo.dnd.Moveable(C,D)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(B){if(this.skip&&dojo.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=B.pageX;
this._lastY=B.pageY
}else{new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseMove:function(B){if(Math.abs(B.pageX-this._lastX)>this.delay||Math.abs(B.pageY-this._lastY)>this.delay){this.onMouseUp(B);
new this.mover(this.node,B,this)
}dojo.stopEvent(B)
},onMouseUp:function(B){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(B){if(!this.skip||!dojo.dnd.isFormElement(B)){dojo.stopEvent(B)
}},onMoveStart:function(B){dojo.publish("/dnd/move/start",[B]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(B){dojo.publish("/dnd/move/stop",[B]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(B){},onMove:function(D,C){this.onMoving(D,C);
dojo.marginBox(D.node,C);
this.onMoved(D,C)
},onMoving:function(D,C){},onMoved:function(D,C){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(D,C){return new dojo.dnd.move.constrainedMoveable(C,D)
},constructor:function(C,D){if(!D){D={}
}this.constraints=D.constraints;
this.within=D.within
},onFirstMove:function(F){var E=this.constraintBox=this.constraints.call(this,F),D=F.marginBox;
E.r=E.l+E.w-(this.within?D.w:0);
E.b=E.t+E.h-(this.within?D.h:0)
},onMove:function(F,D){var E=this.constraintBox;
D.l=D.l<E.l?E.l:E.r<D.l?E.r:D.l;
D.t=D.t<E.t?E.t:E.b<D.t?E.b:D.t;
dojo.marginBox(F.node,D)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(D,C){return new dojo.dnd.move.boxConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.box;
this.constraints=function(){return D
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(D,C){return new dojo.dnd.move.parentConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.area;
this.constraints=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(D=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
}
}});
dojo.dnd.move.constrainedMover=function(D,E){var F=function(B,A,C){dojo.dnd.Mover.call(this,B,A,C)
};
dojo.extend(F,dojo.dnd.Mover.prototype);
dojo.extend(F,{onMouseMove:function(B){dojo.dnd.autoScroll(B);
var J=this.marginBox,A=this.constraintBox,I=J.l+B.pageX,C=J.t+B.pageY;
I=I<A.l?A.l:A.r<I?A.r:I;
C=C<A.t?A.t:A.b<C?A.b:C;
this.host.onMove(this,{l:I,t:C})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var A=this.constraintBox=D.call(this),B=this.marginBox;
A.r=A.l+A.w-(E?B.w:0);
A.b=A.t+A.h-(E?B.h:0)
}});
return F
};
dojo.dnd.move.boxConstrainedMover=function(D,C){return dojo.dnd.move.constrainedMover(function(){return D
},C)
};
dojo.dnd.move.parentConstrainedMover=function(E,F){var D=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(E=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
};
return dojo.dnd.move.constrainedMover(D,F)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(E){var F=E.shift();
var D=F;
dojo.forEach(E,function(A){dojo.connect(D,"onEnd",A,"play");
D=A
});
return F
};
dojo.fx.combine=function(D){var C=new dojo._Animation({curve:[0,1]});
if(!D.length){return C
}C.duration=D[0].duration;
dojo.forEach(D,function(A){dojo.forEach(["play","pause","stop"],function(B){if(A[B]){dojo.connect(C,B,A,B)
}})
});
return C
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(C){var D=this;
dojo.mixin(D,C);
D.node=C.node;
D._showArgs=dojo.mixin({},C);
D._showArgs.node=D.node;
D._showArgs.duration=D.showDuration;
D.showAnim=D.showFunc(D._showArgs);
D._hideArgs=dojo.mixin({},C);
D._hideArgs.node=D.node;
D._hideArgs.duration=D.hideDuration;
D.hideAnim=D.hideFunc(D._hideArgs);
dojo.connect(D.showAnim,"beforeBegin",dojo.hitch(D.hideAnim,"stop",true));
dojo.connect(D.hideAnim,"beforeBegin",dojo.hitch(D.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(B){return this.showAnim.play(B||0)
},hide:function(B){return this.hideAnim.play(B||0)
}});
dojo.fx.wipeIn=function(E){E.node=dojo.byId(E.node);
var G=E.node,H=G.style;
var F=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){H.overflow="hidden";
if(H.visibility=="hidden"||H.display=="none"){H.height="1px";
H.display="";
H.visibility="";
return 1
}else{var A=dojo.style(G,"height");
return Math.max(A,1)
}},end:function(){return G.scrollHeight
}}}},E));
dojo.connect(F,"onEnd",function(){H.height="auto"
});
return F
};
dojo.fx.wipeOut=function(E){var G=E.node=dojo.byId(E.node);
var H=G.style;
var F=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},E));
dojo.connect(F,"beforeBegin",function(){H.overflow="hidden";
H.display=""
});
dojo.connect(F,"onEnd",function(){H.height="auto";
H.display="none"
});
return F
};
dojo.fx.slideTo=function(G){var L=(G.node=dojo.byId(G.node));
var I=null;
var J=null;
var H=(function(A){return function(){var C=dojo.getComputedStyle(A);
var B=C.position;
I=(B=="absolute"?A.offsetTop:parseInt(C.top)||0);
J=(B=="absolute"?A.offsetLeft:parseInt(C.left)||0);
if(B!="absolute"&&B!="relative"){var D=dojo.coords(A,true);
I=D.y;
J=D.x;
A.style.position="absolute";
A.style.top=I+"px";
A.style.left=J+"px"
}}
})(L);
H();
var K=dojo.animateProperty(dojo.mixin({properties:{top:{end:G.top||0},left:{end:G.left||0}}},G));
dojo.connect(K,"beforeBegin",K,H);
return K
}
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var B=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,B);
this.errorMessage=dojo.string.substitute(this.errorMessage,B);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var D=dojo.query(">",this.containerNode||this.domNode),C=D.filter("[widgetId]");
if(D.length==1&&C.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(C[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(B){this.href=B;
return this._prepareLoad()
},setContent:function(B){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(B||"");
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
},resize:function(D){dojo.marginBox(this.domNode,D);
var F=this.containerNode||this.domNode,E=dojo.mixin(dojo.marginBox(F),D||{});
this._contentBox=dijit.layout.marginBox2contentBox(F,E);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(B){this.cancel();
this.isLoaded=false;
this._loadCheck(B)
},_loadCheck:function(D){var C=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(D||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&C&&!this._xhrDfd)||(!this.isLoaded&&C&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var F=this;
var E={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(E,this.ioArgs)
}var D=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(E);
D.addCallback(function(B){try{F.onDownloadEnd.call(F);
F._isDownloaded=true;
F.setContent.call(F,B)
}catch(A){F._onError.call(F,"Content",A)
}delete F._xhrDfd;
return B
});
D.addErrback(function(A){if(!D.cancelled){F._onError.call(F,"Download",A)
}delete F._xhrDfd;
return A
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(E){this.destroyDescendants();
try{var H=this.containerNode||this.domNode;
while(H.firstChild){dojo._destroyElement(H.firstChild)
}if(typeof E=="string"){if(this.extractContent){match=E.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){E=match[1]
}}H.innerHTML=E
}else{if(E.nodeType){H.appendChild(E)
}else{dojo.forEach(E,function(A){H.appendChild(A.cloneNode(true))
})
}}}catch(F){var G=this.onContentError(F);
try{H.innerHTML=G
}catch(F){console.error("Fatal "+this.id+" could not change content due to "+F.message,F)
}}},_onError:function(H,F,E){var G=this["on"+H+"Error"].call(this,F);
if(E){console.error(E,F)
}else{if(G){this._setContent.call(this,G)
}}},_createSubWidgets:function(){var C=this.containerNode||this.domNode;
try{dojo.parser.parse(C,true)
}catch(D){this._onError("Content",D,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(B){},onUnload:function(B){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(B){},onDownloadError:function(B){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(B){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(B){dojo.stopEvent(B);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(G){var H={};
dojo.forEach(this.getDescendants(),function(A){if(!A.name){return 
}var B=H[A.name]||(H[A.name]=[]);
B.push(A)
});
for(var J in H){var I=H[J],F=dojo.getObject(J,false,G);
if(!dojo.isArray(F)){F=[F]
}if(I[0].setChecked){dojo.forEach(I,function(B,A){B.setChecked(dojo.indexOf(F,B.value)!=-1)
})
}else{dojo.forEach(I,function(B,A){B.setValue(F[A])
})
}}},getValues:function(){var B={};
dojo.forEach(this.getDescendants(),function(A){var F=A.getValue?A.getValue():A.value;
var H=A.name;
if(!H){return 
}if(A.setChecked){if(/Radio/.test(A.declaredClass)){if(A.checked){dojo.setObject(H,F,B)
}}else{var G=dojo.getObject(H,false,B);
if(!G){G=[];
dojo.setObject(H,G,B)
}if(A.checked){G.push(F)
}}}else{dojo.setObject(H,F,B)
}});
return B
},isValid:function(){return dojo.every(this.getDescendants(),function(B){return !B.isValid||B.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var E=dijit.getViewport();
var G=this.node.style,F=this.domNode.style;
F.top=E.t+"px";
F.left=E.l+"px";
G.width=E.w+"px";
G.height=E.h+"px";
var H=dijit.getViewport();
if(E.w!=H.w){G.width=H.w+"px"
}if(E.h!=H.h){G.height=H.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var D=dijit.getViewport();
var E=dojo.marginBox(this.domNode);
var F=this.domNode.style;
F.left=Math.floor((D.l+(D.w-E.w)/2))+"px";
F.top=Math.floor((D.t+(D.h-E.h)/2))+"px"
},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(D){if(D.keyCode){var F=D.target;
if(F==this.titleBar&&D.shiftKey&&D.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(D)
}else{while(F){if(F==this.domNode){if(D.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}F=F.parentNode
}if(D.keyCode!=dojo.keys.TAB){dojo.stopEvent(D)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(E){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,B,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,B,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(B){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(B.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(B.charAt(0)=="T"?"Below":"Above")
},onOpen:function(B){this.orient(B.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(B){if(B.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(B.target==this.containerNode&&B.shiftKey&&B.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.TAB){B.stopPropagation()
}}}},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var H="text";
var E;
try{E=dojo.global.getSelection()
}catch(G){}if(E&&E.rangeCount==1){var F=E.getRangeAt(0);
if((F.startContainer==F.endContainer)&&((F.endOffset-F.startOffset)==1)&&(F.startContainer.nodeType!=3)){H="control"
}}return H
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var B=dojo.global.getSelection();
if(B){return B.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var D=dojo.global.getSelection();
if(D&&D.rangeCount){var E=D.getRangeAt(0).cloneContents();
var F=document.createElement("div");
F.appendChild(E);
return F.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var C=dojo.doc.selection.createRange();
if(C&&C.item){return dojo.doc.selection.createRange().item(0)
}}else{var D=dojo.global.getSelection();
return D.anchorNode.childNodes[D.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var E=this.getSelectedElement();
if(E){return E.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var D=dojo.global.getSelection();
if(D){var F=D.anchorNode;
while(F&&(F.nodeType!=1)){F=F.parentNode
}return F
}}}},hasAncestorElement:function(B){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(C){var D=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(D,arguments)
},isTag:function(H,F){if(H&&H.tagName){var G=H.tagName.toLowerCase();
for(var J=0;
J<F.length;
J++){var I=String(F[J]).toLowerCase();
if(G==I){return I
}}}return""
},getParentOfType:function(D,C){while(D){if(this.isTag(D,C).length){return D
}D=D.parentNode
}return null
},remove:function(){var B=dojo.doc.selection;
if(B){if(B.type.toLowerCase()!="none"){B.clear()
}return B
}else{B=dojo.global.getSelection();
B.deleteFromDocument();
return B
}},selectElementChildren:function(J,K){var H=dojo.global;
var G=dojo.doc;
J=dojo.byId(J);
if(G.selection&&dojo.body().createTextRange){var L=J.ownerDocument.body.createTextRange();
L.moveToElementText(J);
if(!K){L.select()
}}else{if(H.getSelection){var I=H.getSelection();
if(I.setBaseAndExtent){I.setBaseAndExtent(J,0,J,J.innerText.length-1)
}else{if(I.selectAllChildren){I.selectAllChildren(J)
}}}}},selectElement:function(J,K){var G=dojo.doc;
J=dojo.byId(J);
if(G.selection&&dojo.body().createTextRange){try{var L=dojo.body().createControlRange();
L.addElement(J);
if(!K){L.select()
}}catch(H){this.selectElementChildren(J,K)
}}else{if(dojo.global.getSelection){var I=dojo.global.getSelection();
if(I.removeAllRanges){var L=G.createRange();
L.selectNode(J);
I.removeAllRanges();
I.addRange(L)
}}}}})
}if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var C=dojo.doc.createElement("textarea");
C.id="dijit._editor.RichText.savedContent";
var D=C.style;
D.display="none";
D.position="absolute";
D.top="-100px";
D.left="-100px";
D.height="3px";
D.width="3px";
dojo.body().appendChild(C)
})()
}else{try{dojo.doc.write('<textarea id="dijit._editor.RichText.savedContent" style="display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;"></textarea>')
}catch(e){}}}dojo.declare("dijit._editor.RichText",[dijit._Widget],{constructor:function(){this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this._keyHandlers={};
this.contentPreFilters.push(dojo.hitch(this,"_preFixUrlAttributes"));
if(dojo.isMoz){this.contentPreFilters.push(this._fixContentForMoz)
}this.onLoadDeferred=new dojo.Deferred()
},inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",_content:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",onLoadDeferred:null,postCreate:function(){dojo.publish("dijit._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts()
},setupDefaultShortcuts:function(){var D=this.KEY_CTRL;
var C=function(A,B){return arguments.length==1?function(){this.execCommand(A)
}:function(){this.execCommand(A,B)
}
};
this.addKeyHandler("b",D,C("bold"));
this.addKeyHandler("i",D,C("italic"));
this.addKeyHandler("u",D,C("underline"));
this.addKeyHandler("a",D,C("selectall"));
this.addKeyHandler("s",D,function(){this.save(true)
});
this.addKeyHandler("1",D,C("formatblock","h1"));
this.addKeyHandler("2",D,C("formatblock","h2"));
this.addKeyHandler("3",D,C("formatblock","h3"));
this.addKeyHandler("4",D,C("formatblock","h4"));
this.addKeyHandler("\\",D,C("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",D,C("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var N=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var K="",J,M=0;
while((J=N[M++])){if(J.charAt(1)!="l"){K+="<"+J+"><span>content</span></"+J+">"
}else{K+="<"+J+"><li>content</li></"+J+">"
}}var I=document.createElement("div");
I.style.position="absolute";
I.style.left="-2000px";
I.style.top="-2000px";
document.body.appendChild(I);
I.innerHTML=K;
var L=I.firstChild;
while(L){dijit._editor.selection.selectElement(L.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[L.firstChild]);
var H=L.tagName.toLowerCase();
this._local2NativeFormatNames[H]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[H]]=H;
L=L.nextSibling
}document.body.removeChild(I)
},open:function(element){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new dojo.Deferred()
}if(!this.isClosed){this.close()
}dojo.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(element.nodeName)){this.domNode=element
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=dojo.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
dojo.place(this.domNode,this.textarea,"before");
var tmpFunc=dojo.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(dojo.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(dojo.isIE){setTimeout(tmpFunc,10)
}else{tmpFunc()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var content=dojo.contentBox(this.domNode);
this._oldHeight=content.h;
this._oldWidth=content.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=dojo.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
if(saveTextarea.value!=""){var datas=saveTextarea.value.split(this._SEPARATOR),i=0,dat;
while((dat=datas[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
datas.splice(i,1);
break
}}}dojo.connect(window,"onbeforeunload",this,"_saveContent")
}this.isClosed=false;
if(dojo.isIE||dojo.isSafari||dojo.isOpera){var ifr=this.iframe=dojo.doc.createElement("iframe");
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
if(dojo.isIE>=7){if(this.height){ifr.style.height=this.height
}if(this.minHeight){ifr.style.minHeight=this.minHeight
}}else{ifr.style.height=this.height?this.height:this.minHeight
}if(dojo.isIE){this._localizeEditorCommands()
}this.onLoad()
}else{this._drawIframe(html)
}if(this.domNode.nodeName=="LI"){this.domNode.lastChild.style.marginTop="-1.2em"
}this.domNode.className+=" RichTextEditable"
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(H){var F=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){H="<div>"+H+"</div>"
}var E=[F.fontWeight,F.fontSize,F.fontFamily].join(" ");
var G=F.lineHeight;
if(G.indexOf("px")>=0){G=parseFloat(G)/parseFloat(F.fontSize)
}else{if(G.indexOf("em")>=0){G=parseFloat(G)
}else{G="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",E,";","	min-height:",this.minHeight,";","	line-height:",G,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+H+"</body></html>"].join("")
},_drawIframe:function(L){if(!this.iframe){var J=this.iframe=dojo.doc.createElement("iframe");
var K=J.style;
K.border="none";
K.lineHeight="0";
K.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var M=dojo.query('label[for="'+this.id+'"]');
if(M.length){this._localizedIframeTitles.iframeEditTitle=M[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var N=this.srcNodeRef
}else{var N=dojo.doc.createElement("div");
N.style.display="none";
N.innerHTML=L;
this.editingArea.appendChild(N)
}this.editingArea.appendChild(this.iframe);
var I=false;
var O=this.iframe.contentDocument;
O.open();
O.write(this._getIframeDocTxt(L));
O.close();
var P=dojo.hitch(this,function(){if(!I){I=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(A){setTimeout(P,500);
I=false;
return 
}dojo._destroyElement(N);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(N);
this.editNode.innerHTML=L;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
P()
},_applyEditingAreaStyleSheets:function(){var H=[];
if(this.styleSheets){H=this.styleSheets.split(";");
this.styleSheets=""
}H=H.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var G="",I=0,J;
while((J=H[I++])){var F=(new dojo._Url(dojo.global.location,J)).toString();
this.editingAreaStyleSheets.push(F);
G+='<link rel="stylesheet" type="text/css" href="'+F+'"/>'
}return G
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var stylesheet=this.document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}},removeStyleSheet:function(E){var F=E.toString();
if(F.charAt(0)=="."||(F.charAt(0)!="/"&&!E.host)){F=(new dojo._Url(dojo.global.location,F)).toString()
}var D=dojo.indexOf(this.editingAreaStyleSheets,F);
if(D==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+F+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[D];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+F+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(B){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!B
}else{if(B){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(B?"off":"on");
if(!B){dojo.forEach(this._mozSettingProps,function(A,D){this.document.execCommand(A,false,this._mozSettings[D])
},this)
}}this.disabled=B
},_isResized:function(){return false
},onLoad:function(G){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var J=this.events.concat(this.captureEvents),F=0,H;
while((H=J[F++])){this.connect(this.document,H.toLowerCase(),H)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(I){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(G);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(B){if(dojo.isIE){if(B.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(B);
this.execCommand("delete")
}else{if((65<=B.keyCode&&B.keyCode<=90)||(B.keyCode>=37&&B.keyCode<=40)){B.charCode=B.keyCode;
this.onKeyPress(B)
}}}else{if(dojo.isMoz){if(B.keyCode==dojo.keys.TAB&&!B.shiftKey&&!B.ctrlKey&&!B.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.TAB&&B.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(B)
}}}}},onKeyUp:function(B){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(H){var L=H.ctrlKey?this.KEY_CTRL:0|H.shiftKey?this.KEY_SHIFT:0;
var J=H.keyChar||H.keyCode;
if(this._keyHandlers[J]){var G=this._keyHandlers[J],K=0,I;
while((I=G[K++])){if(L==I.modifiers){if(!I.handler.apply(this,arguments)){H.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(H)
}),1)
},addKeyHandler:function(F,D,E){if(!dojo.isArray(this._keyHandlers[F])){this._keyHandlers[F]=[]
}this._keyHandlers[F].push({modifiers:D||0,handler:E})
},onKeyPressed:function(B){this.onDisplayChanged()
},onClick:function(B){this.onDisplayChanged(B)
},_onBlur:function(D){var C=this.getValue(true);
if(C!=this.savedContent){this.onChange(C);
this.savedContent=C
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(B){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(B){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(B){},_normalizeCommand:function(C){var D=C.toLowerCase();
if(D=="formatblock"){if(dojo.isSafari){D="heading"
}}else{if(D=="hilitecolor"&&!dojo.isMoz){D="backcolor"
}}return D
},queryCommandAvailable:function(R){var M=1;
var O=1<<1;
var L=1<<2;
var K=1<<3;
var N=1<<4;
var Q=dojo.isSafari;
function J(A){return{ie:Boolean(A&M),mozilla:Boolean(A&O),safari:Boolean(A&L),safari420:Boolean(A&N),opera:Boolean(A&K)}
}var P=null;
switch(R.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":P=J(O|M|L|K);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":P=J(O|M|K|N);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":P=J(M);
break;
case"cut":case"copy":case"paste":P=J(M|O|N);
break;
case"inserttable":P=J(O|M);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":P=J(M|O);
break;
default:return false
}return(dojo.isIE&&P.ie)||(dojo.isMoz&&P.mozilla)||(dojo.isSafari&&P.safari)||(Q&&P.safari420)||(dojo.isOpera&&P.opera)
},execCommand:function(I,J){var K;
this.focus();
I=this._normalizeCommand(I);
if(J!=undefined){if(I=="heading"){throw new Error("unimplemented")
}else{if((I=="formatblock")&&dojo.isIE){J="<"+J+">"
}}}if(I=="inserthtml"){J=this._preFilterContent(J);
if(dojo.isIE){var H=this.document.selection.createRange();
H.pasteHTML(J);
H.select();
K=true
}else{if(dojo.isMoz&&!J.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
K=true
}else{K=this.document.execCommand(I,false,J)
}}}else{if((I=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var L=this.window.getSelection();
var G=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[G]);
K=this.document.execCommand("unlink",false,null)
}else{if((I=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
K=this.document.execCommand(I,false,J);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((I=="backcolor")||(I=="forecolor"))){J=arguments.length>1?J:null;
K=this.document.execCommand(I,false,J)
}else{J=arguments.length>1?J:null;
if(J||I!="createlink"){K=this.document.execCommand(I,false,J)
}}}}}this.onDisplayChanged();
return K
},queryCommandEnabled:function(D){D=this._normalizeCommand(D);
if(dojo.isMoz||dojo.isSafari){if(D=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(D=="inserttable"){return true
}}}if(dojo.isSafari){if(D=="copy"){D="cut"
}else{if(D=="paste"){return true
}}}var C=(dojo.isIE)?this.document.selection.createRange():this.document;
return C.queryCommandEnabled(D)
},queryCommandState:function(B){B=this._normalizeCommand(B);
return this.document.queryCommandState(B)
},queryCommandValue:function(B){B=this._normalizeCommand(B);
if(dojo.isIE&&B=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(B)]
}return this.document.queryCommandValue(B)
},placeCursorAtStart:function(){this.focus();
var C=false;
if(dojo.isMoz){var D=this.editNode.firstChild;
while(D){if(D.nodeType==3){if(D.nodeValue.replace(/^\s+|\s+$/g,"").length>0){C=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D]);
break
}}else{if(D.nodeType==1){C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[D]);
break
}}D=D.nextSibling
}}else{C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(C){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var C=false;
if(dojo.isMoz){var D=this.editNode.lastChild;
while(D){if(D.nodeType==3){if(D.nodeValue.replace(/^\s+|\s+$/g,"").length>0){C=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D]);
break
}}else{if(D.nodeType==1){C=true;
if(D.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D])
}break
}}D=D.previousSibling
}}else{C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(C){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(B){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,B)
},setValue:function(B){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=B
}else{B=this._preFilterContent(B);
if(this.isClosed){this.domNode.innerHTML=B;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=B;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(B){if(this.isClosed){this.setValue(B)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(B)
}else{if(this.window&&this.window.getSelection){B=this._preFilterContent(B);
this.execCommand("selectall");
if(dojo.isMoz&&!B){B="&nbsp;"
}this.execCommand("inserthtml",B);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(B)
}}}}},_preFilterContent:function(D){var C=D;
dojo.forEach(this.contentPreFilters,function(A){if(A){C=A(C)
}});
return C
},_preDomFilterContent:function(B){B=B||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(A){if(A&&dojo.isFunction(A)){A(B)
}},this)
},_postFilterContent:function(E,F){E=E||this.editNode;
if(this.contentDomPostFilters.length){if(F&&E.cloneNode){E=E.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(A){E=A(E)
})
}var D=this.getNodeChildrenHtml(E);
if(!D.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){D=""
}dojo.forEach(this.contentPostFilters,function(A){D=A(D)
});
return D
},_saveContent:function(D){var C=dojo.byId("dijit._editor.RichText.savedContent");
C.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(C,D){C=C.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!D){C=C.replace(/'/gm,"&#39;")
}return C
},getNodeHtml:function(M){switch(M.nodeType){case 1:var N="<"+M.tagName.toLowerCase();
if(dojo.isMoz){if(M.getAttribute("type")=="_moz"){M.removeAttribute("type")
}if(M.getAttribute("_moz_dirty")!=undefined){M.removeAttribute("_moz_dirty")
}}var T=[];
if(dojo.isIE){var P=M.outerHTML;
P=P.substr(0,P.indexOf(">"));
P=P.replace(/(?:['"])[^"']*\1/g,"");
var O=/([^\s=]+)=/g;
var L,Q;
while((L=O.exec(P))!=undefined){Q=L[1];
if(Q.substr(0,3)!="_dj"){if(Q=="src"||Q=="href"){if(M.getAttribute("_djrealurl")){T.push([Q,M.getAttribute("_djrealurl")]);
continue
}}if(Q=="class"){T.push([Q,M.className])
}else{T.push([Q,M.getAttribute(Q)])
}}}}else{var U,V=0,R=M.attributes;
while((U=R[V++])){if(U.name.substr(0,3)!="_dj"){var S=U.value;
if(U.name=="src"||U.name=="href"){if(M.getAttribute("_djrealurl")){S=M.getAttribute("_djrealurl")
}}T.push([U.name,S])
}}}T.sort(function(B,A){return B[0]<A[0]?-1:(B[0]==A[0]?0:1)
});
V=0;
while((U=T[V++])){N+=" "+U[0]+'="'+U[1]+'"'
}if(M.childNodes.length){N+=">"+this.getNodeChildrenHtml(M)+"</"+M.tagName.toLowerCase()+">"
}else{N+=" />"
}break;
case 3:var N=this.escapeXml(M.nodeValue,true);
break;
case 8:var N="<!--"+this.escapeXml(M.nodeValue,true)+"-->";
break;
default:var N="Element not recognized - Type: "+M.nodeType+" Name: "+M.nodeName
}return N
},getNodeChildrenHtml:function(G){var J="";
if(!G){return J
}var F=G.childNodes||G;
var I=0;
var H;
while((H=F[I++])){J+=this.getNodeHtml(H)
}return J
},close:function(save,force){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var changed=(this.savedContent!=this._content);
if(this.interval){clearInterval(this.interval)
}if(this.textarea){with(this.textarea.style){position="";
left=top="";
if(dojo.isIE){overflow=this.__overflow;
this.__overflow=null
}}if(save){this.textarea.value=this._content
}else{this.textarea.value=this.savedContent
}dojo._destroyElement(this.domNode);
this.domNode=this.textarea
}else{if(save){this.domNode.innerHTML=this._content
}else{this.domNode.innerHTML=this.savedContent
}}dojo.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
if(this.window&&this.window._frameElement){this.window._frameElement=null
}this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
return changed
},destroyRendering:function(){},destroy:function(){this.destroyRendering();
if(!this.isClosed){this.close(false)
}this.inherited("destroy",arguments)
},_fixContentForMoz:function(B){B=B.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
B=B.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return B
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(B){B=B.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
B=B.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return B
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(B){if(this.disabled){return false
}this._clicked();
return this.onClick(B)
},_onButtonClick:function(F){dojo.stopEvent(F);
var G=this._onClick(F)!==false;
if(this.type=="submit"&&G){for(var E=this.domNode;
E;
E=E.parentNode){var H=dijit.byNode(E);
if(H&&H._onSubmit){H._onSubmit(F);
break
}if(E.tagName.toLowerCase()=="form"){if(!E.onsubmit||E.onsubmit()){E.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var B="";
this.label=this.containerNode.innerHTML;
B=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=B;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(B){return true
},_clicked:function(B){},setLabel:function(D){this.containerNode.innerHTML=this.label=D;
if(dojo.isMozilla){var F=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var E=this;
setTimeout(function(){E.domNode.style.display=F
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var B=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var B=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(B);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(B){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(D){var C=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!C||D.detail!=0||this._seenKeydown){this._onArrowClick(D)
}this._seenKeydown=false
},_onDropDownKeydown:function(B){this._seenKeydown=true
},_onDropDownBlur:function(B){this._seenKeydown=false
},_onKey:function(B){if(this.disabled){return 
}if(B.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(B);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var E=this.dropDown;
if(!E){return false
}if(!E.isShowingNow){if(E.href&&!E.isLoaded){var D=this;
var F=dojo.connect(E,"onLoad",function(){dojo.disconnect(F);
D._openDropDown()
});
E._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var G=this.dropDown;
var J=G.domNode.style.width;
var I=this;
dijit.popup.open({parent:this,popup:G,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){I._closeDropDown(true)
},onCancel:function(){I._closeDropDown(true)
},onClose:function(){G.domNode.style.width=J;
I.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>G.domNode.offsetWidth){var H=null;
if(!this.isLeftToRight()){H=G.domNode.parentNode;
var F=H.offsetLeft+H.offsetWidth
}dojo.marginBox(G.domNode,{w:this.domNode.offsetWidth});
if(H){H.style.left=F-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(G.focus){G.focus()
}},_closeDropDown:function(B){if(this._opened){dijit.popup.close(this.dropDown);
if(B){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(B){if(dojo.isIE){this.connect(B,"onactivate",this._onNodeFocus)
}else{this.connect(B,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(B){this._focusedNode=B;
dijit.focus(B)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(B){this._focusedNode=B.currentTarget
},_onBlur:function(B){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(B){this.setChecked(!this.checked)
},setChecked:function(B){this.checked=B;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(B)
}})
}if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(C,D){if(C){dojo.mixin(this,C)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var D=this.editor.commands[this.command];
var E="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var F={label:D,showLabel:false,iconClass:E,dropDown:this.dropDown};
this.button=new this.buttonClass(F)
}}},updateState:function(){var E=this.editor;
var H=this.command;
if(!E){return 
}if(!E.isLoaded){return 
}if(!H.length){return 
}if(this.button){try{var G=E.queryCommandEnabled(H);
this.button.setDisabled(!G);
if(this.button.setChecked){this.button.setChecked(E.queryCommandState(H))
}}catch(F){console.debug(F)
}}},setEditor:function(B){this.editor=B;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(B){if(this.button){B.addChild(this.button)
}}})
}if(!dojo._hasResource["dijit.Editor"]){dojo._hasResource["dijit.Editor"]=true;
dojo.provide("dijit.Editor");
dojo.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){dojo.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(dojo.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=dojo.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var B=dojo.doc.createElement("div");
dojo.place(B,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},B)
}dojo.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){dojo.forEach(this._plugins,function(B){if(B.destroy){B.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(H,I){var J=dojo.isString(H)?{name:H}:H;
if(!J.setEditor){var G={args:J,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[G]);
if(!G.plugin){var F=dojo.getObject(J.name);
if(F){G.plugin=new F(J)
}}if(!G.plugin){console.debug("Cannot find plugin",H);
return 
}H=G.plugin
}if(arguments.length>1){this._plugins[I]=H
}else{this._plugins.push(H)
}H.setEditor(this);
if(dojo.isFunction(H.setToolbar)){H.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(B){if(!this._inEditing){this._inEditing=true;
this._beginEditing(B)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(I){if(this.customUndo&&(I=="undo"||I=="redo")){return this[I]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var J=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return J
}catch(H){if(dojo.isMoz&&/copy|cut|paste/.test(I)){var K=dojo.string.substitute,G={cut:"X",copy:"C",paste:"V"},L=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(K(this.commands.systemShortcutFF,[this.commands[I],K(this.commands[L?"appleKey":"ctrlKey"],[G[I]])]))
}return false
}}},queryCommandEnabled:function(B){if(this.customUndo&&(B=="undo"||B=="redo")){return B=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(G,H){this.setValue(H.text);
var F=H.bookmark;
if(!F){return 
}if(dojo.isIE){if(dojo.isArray(F)){var J=[];
dojo.forEach(F,function(A){J.push(dijit.range.getNode(A,this.editNode))
},this);
F=J
}}else{var I=dijit.range.create();
I.setStart(dijit.range.getNode(F.startContainer,this.editNode),F.startOffset);
I.setEnd(dijit.range.getNode(F.endContainer,this.editNode),F.endOffset);
F=I
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[F])
},undo:function(){this.endEditing(true);
var B=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(B,this._steps[this._steps.length-1]);
this._undoedSteps.push(B);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var B=this._undoedSteps.pop();
if(B&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],B);
this._steps.push(B);
this.onDisplayChanged();
return true
}return false
},endEditing:function(B){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(B);
this._inEditing=false
}},_getBookmark:function(){var C=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(C)){var D=[];
dojo.forEach(C,function(A){D.push(dijit.range.getIndex(A,this.editNode).o)
},this);
C=D
}}else{var D=dijit.range.getIndex(C.startContainer,this.editNode).o;
C={startContainer:D,startOffset:C.startOffset,endContainer:C.endContainer===C.startContainer?D:dijit.range.getIndex(C.endContainer,this.editNode).o,endOffset:C.endOffset}
}return C
},_beginEditing:function(B){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(D){var C=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:C,bookmark:this._getBookmark()})
},onKeyDown:function(F){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var D=F.keyCode,E=dojo.keys;
if(F.ctrlKey){if(D===90||D===122){dojo.stopEvent(F);
this.undo();
return 
}else{if(D===89||D===121){dojo.stopEvent(F);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(D){case E.ENTER:this.beginEditing();
break;
case E.BACKSPACE:case E.DELETE:this.beginEditing();
break;
case 88:case 86:if(F.ctrlKey&&!F.altKey&&!F.metaKey){this.endEditing();
if(F.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!F.ctrlKey&&!F.altKey&&!F.metaKey&&(F.keyCode<dojo.keys.F1||F.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case E.ALT:this.endEditing();
break;
case E.UP_ARROW:case E.DOWN_ARROW:case E.LEFT_ARROW:case E.RIGHT_ARROW:case E.HOME:case E.END:case E.PAGE_UP:case E.PAGE_DOWN:this.endEditing(true);
break;
case E.CTRL:case E.SHIFT:case E.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(G){if(G.plugin){return 
}var I=G.args,H;
var F=dijit._editor._Plugin;
var J=I.name;
switch(J){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":H=new F({command:J});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":H=new F({buttonClass:dijit.form.ToggleButton,command:J});
break;
case"|":H=new F({button:new dijit.ToolbarSeparator()});
break;
case"createLink":H=new dijit._editor.plugins.LinkDialog({command:J});
break;
case"foreColor":case"hiliteColor":H=new dijit._editor.plugins.TextColor({command:J});
break;
case"fontName":case"fontSize":case"formatBlock":H=new dijit._editor.plugins.FontChoice({command:J})
}G.plugin=H
})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(B){B.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(B){},_moveToPopup:function(B){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(B)
}},_onKeyPress:function(B){if(B.ctrlKey||B.altKey){return 
}switch(B.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(B);
dojo.stopEvent(B);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(B)
}break
}},onItemHover:function(B){this.focusChild(B);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(B){dijit.popup.close(B.popup);
B._blur();
this._stopPopupTimer()
},onItemUnhover:function(B){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var B=this;
B.parentMenu;
B=B.parentMenu){}return B
},onItemClick:function(B){if(B.disabled){return false
}if(B.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
B.onClick()
}},_iframeContentWindow:function(C){var D=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(C))||dijit.Menu._iframeContentDocument(C)["__parent__"]||(C.name&&document.frames[C.name])||null;
return D
},_iframeContentDocument:function(C){var D=C.contentDocument||(C.contentWindow&&C.contentWindow.document)||(C.name&&document.frames[C.name]&&document.frames[C.name].document)||null;
return D
},bindDomNode:function(D){D=dojo.byId(D);
var F=dijit.getDocumentWindow(D.ownerDocument);
if(D.tagName.toLowerCase()=="iframe"){F=this._iframeContentWindow(D);
D=dojo.withGlobal(F,dojo.body)
}var E=(D==dojo.body()?dojo.doc:D);
D[this.id]=this._bindings.push([dojo.connect(E,"oncontextmenu",this,"_openMyself"),dojo.connect(E,"onkeydown",this,"_contextKey"),dojo.connect(E,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(F){var G=dojo.byId(F);
var H=G[this.id]-1,E=this._bindings[H];
dojo.forEach(E,dojo.disconnect);
delete this._bindings[H]
},_contextKey:function(D){this._contextMenuWithMouse=false;
if(D.keyCode==dojo.keys.F10){dojo.stopEvent(D);
if(D.shiftKey&&D.type=="keydown"){var C={target:D.target,pageX:D.pageX,pageY:D.pageY};
C.preventDefault=C.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(C)
}),1)
}}},_contextMouse:function(B){this._contextMenuWithMouse=true
},_openMyself:function(J){dojo.stopEvent(J);
var H,I;
if(dojo.isSafari||this._contextMenuWithMouse){H=J.pageX;
I=J.pageY
}else{var K=dojo.coords(J.target,true);
H=K.x+10;
I=K.y+10
}var M=this;
var N=dijit.getFocus(this);
function L(){dijit.focus(N);
dijit.popup.close(M)
}dijit.popup.open({popup:this,x:H,y:I,onExecute:L,onCancel:L,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(B){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var D=this.focusedChild;
var F=D.popup;
if(F.isShowingNow){return 
}F.parentMenu=this;
var E=this;
dijit.popup.open({parent:this,popup:F,around:D.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(F);
D.focus();
E.currentPopup=null
}});
this.currentPopup=F;
if(F.focus){F.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(B){this.getParent().onItemClick(this);
dojo.stopEvent(B)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(B){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(B){this.disabled=B;
dojo[B?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",B?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var B=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var B=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(B)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(D,C){return D.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(A){if(C&&C.indexOf(A)!=-1){return A
}return"\\"+A
})
};
dojo.regexp.buildGroupRE=function(J,G,H){if(!(J instanceof Array)){return G(J)
}var F=[];
for(var I=0;
I<J.length;
I++){F.push(G(J[I]))
}return dojo.regexp.group(F.join("|"),H)
};
dojo.regexp.group=function(D,C){return"("+(C?"?:":"")+D+")"
}
}if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.number.format=function(G,I){I=dojo.mixin({},I||{});
var F=dojo.i18n.normalizeLocale(I.locale);
var J=dojo.i18n.getLocalization("dojo.cldr","number",F);
I.customs=J;
var H=I.pattern||J[(I.type||"decimal")+"Format"];
if(isNaN(G)){return null
}return dojo.number._applyPattern(G,H,I)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(Q,R,N){N=N||{};
var P=N.customs.group;
var L=N.customs.decimal;
var M=R.split(";");
var O=M[0];
R=M[(Q<0)?1:0]||("-"+O);
if(R.indexOf("%")!=-1){Q*=100
}else{if(R.indexOf("\u2030")!=-1){Q*=1000
}else{if(R.indexOf("\u00a4")!=-1){P=N.customs.currencyGroup||P;
L=N.customs.currencyDecimal||L;
R=R.replace(/\u00a4{1,3}/,function(B){var A=["symbol","currency","displayName"][B.length-1];
return N[A]||N.currency||""
})
}else{if(R.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var J=dojo.number._numberPatternRE;
var K=O.match(J);
if(!K){throw new Error("unable to find a number expression in pattern: "+R)
}return R.replace(J,dojo.number._formatAbsolute(Q,K[0],{decimal:L,group:P,places:N.places}))
};
dojo.number.round=function(H,L,G){var I=String(H).split(".");
var J=(I[1]&&I[1].length)||0;
if(J>L){var K=Math.pow(10,L);
if(G>0){K*=10/G;
L++
}H=Math.round(H*K)/K;
I=String(H).split(".");
J=(I[1]&&I[1].length)||0;
if(J>L){I[1]=I[1].substr(0,L);
H=Number(I.join("."))
}}return H
};
dojo.number._formatAbsolute=function(a,c,V){V=V||{};
if(V.places===true){V.places=0
}if(V.places===Infinity){V.places=6
}var S=c.split(".");
var W=(V.places>=0)?V.places:(S[1]&&S[1].length)||0;
if(!(V.round<0)){a=dojo.number.round(a,W,V.round)
}var d=String(Math.abs(a)).split(".");
var g=d[1]||"";
if(V.places){d[1]=dojo.string.pad(g.substr(0,V.places),V.places,"0",true)
}else{if(S[1]&&V.places!==0){var h=S[1].lastIndexOf("0")+1;
if(h>g.length){d[1]=dojo.string.pad(g,h,"0",true)
}var U=S[1].length;
if(U<g.length){d[1]=g.substr(0,U)
}}else{if(d[1]){d.pop()
}}}var Y=S[0].replace(",","");
h=Y.indexOf("0");
if(h!=-1){h=Y.length-h;
if(h>d[0].length){d[0]=dojo.string.pad(d[0],h)
}if(Y.indexOf("#")==-1){d[0]=d[0].substr(d[0].length-h)
}}var f=S[0].lastIndexOf(",");
var Z,T;
if(f!=-1){Z=S[0].length-f-1;
var X=S[0].substr(0,f);
f=X.lastIndexOf(",");
if(f!=-1){T=X.length-f-1
}}var i=[];
for(var b=d[0];
b;
){var R=b.length-Z;
i.push((R>0)?b.substr(R):b);
b=(R>0)?b.slice(0,R):"";
if(T){Z=T;
delete T
}}d[0]=i.reverse().join(V.group||",");
return d.join(V.decimal||".")
};
dojo.number.regexp=function(B){return dojo.number._parseInfo(B).regexp
};
dojo.number._parseInfo=function(P){P=P||{};
var S=dojo.i18n.normalizeLocale(P.locale);
var O=dojo.i18n.getLocalization("dojo.cldr","number",S);
var K=P.pattern||O[(P.type||"decimal")+"Format"];
var R=O.group;
var L=O.decimal;
var T=1;
if(K.indexOf("%")!=-1){T/=100
}else{if(K.indexOf("\u2030")!=-1){T/=1000
}else{var M=K.indexOf("\u00a4")!=-1;
if(M){R=O.currencyGroup||R;
L=O.currencyDecimal||L
}}}var N=K.split(";");
if(N.length==1){N.push("-"+N[0])
}var Q=dojo.regexp.buildGroupRE(N,function(A){A="(?:"+dojo.regexp.escapeString(A,".")+")";
return A.replace(dojo.number._numberPatternRE,function(C){var F={signed:false,separator:P.strict?R:[R,""],fractional:P.fractional,decimal:L,exponent:false};
var D=C.split(".");
var E=P.places;
if(D.length==1||E===0){F.fractional=false
}else{if(typeof E=="undefined"){E=D[1].lastIndexOf("0")+1
}if(E&&P.fractional==undefined){F.fractional=true
}if(!P.places&&(E<D[1].length)){E+=","+D[1].length
}F.places=E
}var B=D[0].split(",");
if(B.length>1){F.groupSize=B.pop().length;
if(B.length>1){F.groupSize2=B.pop().length
}}return"("+dojo.number._realNumberRegexp(F)+")"
})
},true);
if(M){Q=Q.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(B,F,E,D){var C=["symbol","currency","displayName"][E.length-1];
var A=dojo.regexp.escapeString(P[C]||P.currency||"");
F=F?"\\s":"";
D=D?"\\s":"";
if(!P.strict){if(F){F+="*"
}if(D){D+="*"
}return"(?:"+F+A+D+")?"
}return F+A+D
})
}return{regexp:Q.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:R,decimal:L,factor:T}
};
dojo.number.parse=function(H,F){var I=dojo.number._parseInfo(F);
var J=(new RegExp("^"+I.regexp+"$")).exec(H);
if(!J){return NaN
}var G=J[1];
if(!J[1]){if(!J[2]){return NaN
}G=J[2];
I.factor*=-1
}G=G.replace(new RegExp("["+I.group+"\\s\\xa0]","g"),"").replace(I.decimal,".");
return Number(G)*I.factor
};
dojo.number._realNumberRegexp=function(F){F=F||{};
if(typeof F.places=="undefined"){F.places=Infinity
}if(typeof F.decimal!="string"){F.decimal="."
}if(typeof F.fractional=="undefined"||/^0/.test(F.places)){F.fractional=[true,false]
}if(typeof F.exponent=="undefined"){F.exponent=[true,false]
}if(typeof F.eSigned=="undefined"){F.eSigned=[true,false]
}var J=dojo.number._integerRegexp(F);
var G=dojo.regexp.buildGroupRE(F.fractional,function(A){var B="";
if(A&&(F.places!==0)){B="\\"+F.decimal;
if(F.places==Infinity){B="(?:"+B+"\\d+)?"
}else{B+="\\d{"+F.places+"}"
}}return B
},true);
var I=dojo.regexp.buildGroupRE(F.exponent,function(A){if(A){return"([eE]"+dojo.number._integerRegexp({signed:F.eSigned})+")"
}return""
});
var H=J+G;
if(G){H="(?:(?:"+H+")|(?:"+G+"))"
}return H+I
};
dojo.number._integerRegexp=function(D){D=D||{};
if(typeof D.signed=="undefined"){D.signed=[true,false]
}if(typeof D.separator=="undefined"){D.separator=""
}else{if(typeof D.groupSize=="undefined"){D.groupSize=3
}}var F=dojo.regexp.buildGroupRE(D.signed,function(A){return A?"[-+]":""
},true);
var E=dojo.regexp.buildGroupRE(D.separator,function(B){if(!B){return"(?:0|[1-9]\\d*)"
}B=dojo.regexp.escapeString(B);
if(B==" "){B="\\s"
}else{if(B=="\xa0"){B="\\s\\xa0"
}}var H=D.groupSize,C=D.groupSize2;
if(C){var A="(?:0|[1-9]\\d{0,"+(C-1)+"}(?:["+B+"]\\d{"+C+"})*["+B+"]\\d{"+H+"})";
return((H-C)>0)?"(?:"+A+"|(?:0|[1-9]\\d{0,"+(H-1)+"}))":A
}return"(?:0|[1-9]\\d{0,"+(H-1)+"}(?:["+B+"]\\d{"+H+"})*)"
},true);
return F+E
}
}if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(E){dojo.mixin(this,E||{});
var H=1,G;
if(this.indeterminate){G="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{G="removeClass";
if(String(this.progress).indexOf("%")!=-1){H=Math.min(parseFloat(this.progress)/100,1);
this.progress=H*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
H=this.progress/this.maximum
}var F=this.report(H);
this.label.firstChild.nodeValue=F;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[G](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(H*100)+"%";
this.onChange()
},report:function(B){return dojo.number.format(B,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
}if(!dojo._hasResource["dijit.TitlePane"]){dojo._hasResource["dijit.TitlePane"]=true;
dojo.provide("dijit.TitlePane");
dojo.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated],{title:"",open:true,duration:250,baseClass:"dijitTitlePane",templateString:'<div class="dijitTitlePane">\r\n\t<div dojoAttachEvent="onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus" tabindex="0"\r\n\t\t\twaiRole="button" class="dijitTitlePaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<div dojoAttachPoint="arrowNode" class="dijitInline dijitArrowNode"><span dojoAttachPoint="arrowNodeInner" class="dijitArrowNodeInner"></span></div>\r\n\t\t<div dojoAttachPoint="titleNode" class="dijitTitlePaneTextNode"></div>\r\n\t</div>\r\n\t<div class="dijitTitlePaneContentOuter" dojoAttachPoint="hideNode">\r\n\t\t<div class="dijitReset" dojoAttachPoint="wipeNode">\r\n\t\t\t<div class="dijitTitlePaneContentInner" dojoAttachPoint="containerNode" waiRole="region" tabindex="-1">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn\'t work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setTitle(this.title);
if(!this.open){this.hideNode.style.display=this.wipeNode.style.display="none"
}this._setCss();
dojo.setSelectable(this.titleNode,false);
this.inherited("postCreate",arguments);
dijit.setWaiState(this.containerNode,"labelledby",this.titleNode.id);
dijit.setWaiState(this.focusNode,"haspopup","true");
var D=this.hideNode,C=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){D.style.display=""
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){D.style.display="none"
}})
},setContent:function(B){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){dojo.forEach([this._wipeIn,this._wipeOut],function(B){if(B.status()=="playing"){B.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var C=["dijitClosed","dijitOpen"];
var D=this.open;
dojo.removeClass(this.focusNode,C[!D+0]);
this.focusNode.className+=" "+C[D+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(B){if(B.keyCode==dojo.keys.ENTER||B.charCode==dojo.keys.SPACE){this.toggle()
}else{if(B.keyCode==dojo.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
B.preventDefault()
}}}},_handleFocus:function(B){dojo[(B.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(B){this.titleNode.innerHTML=B
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(F,E){if(this.aroundNode&&this.aroundNode===E){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=F;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var G=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var H=dijit.placeOnScreenAroundElement(this.domNode,E,G);
this.domNode.className="dijitTooltip dijitTooltip"+(H.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=E
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(B){if(!this.aroundNode||this.aroundNode!==B){return 
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
dijit.showTooltip=function(D,C){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(D,C)
};
dijit.hideTooltip=function(B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(B)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(D){var C=dojo.byId(D);
if(C){this._connectNodes.push(C);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(A){this.connect(C,A.toLowerCase(),"_"+A)
},this);
if(dojo.isIE){C.style.zoom=1
}}},this)
},_onMouseOver:function(B){this._onHover(B)
},_onMouseOut:function(B){if(dojo.isDescendant(B.relatedTarget,B.target)){return 
}this._onUnHover(B)
},_onFocus:function(B){this._focus=true;
this._onHover(B)
},_onBlur:function(B){this._focus=false;
this._onUnHover(B)
},_onHover:function(D){if(!this._showTimer){var C=D.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(C)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,B);
this._connectNode=B
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(O,M,N){var J=document.cookie;
if(arguments.length==1){var I=J.lastIndexOf(O+"=");
if(I==-1){return null
}var K=I+O.length+1;
var P=J.indexOf(";",I+O.length+1);
if(P==-1){P=J.length
}return decodeURIComponent(J.substring(K,P))
}else{N=N||{};
M=encodeURIComponent(M);
if(typeof (N.expires)=="number"){var L=new Date();
L.setTime(L.getTime()+(N.expires*24*60*60*1000));
N.expires=L
}document.cookie=O+"="+M+(N.expires?"; expires="+N.expires.toUTCString():"")+(N.path?"; path="+N.path:"")+(N.domain?"; domain="+N.domain:"")+(N.secure?"; secure":"");
return null
}}
}if(!dojo._hasResource["dijit.Tree"]){dojo._hasResource["dijit.Tree"]=true;
dojo.provide("dijit.Tree");
dojo.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(B){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(B);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(B)
},_updateLayout:function(){var B=this.getParent();
if(B&&B.isTree&&B._hideRoot){dojo.addClass(this.domNode,"dijitTreeIsRoot")
}else{dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(E){var F=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var D=E?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(F,function(A){dojo.removeClass(this.expandoNode,A)
},this);
dojo.addClass(this.expandoNode,F[D]);
this.expandoNodeText.innerHTML=E?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},setLabelNode:function(B){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(B))
},_setChildren:function(F){this.destroyDescendants();
this.state="LOADED";
var G={};
if(F&&F.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(F,function(B){var A=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(B.item)},B));
this.addChild(A);
var C=this.tree.store.getIdentity(B.item);
G[C]=A;
if(this.tree.persist){if(this.tree._openedItemIds[C]){this.tree._expandNode(A)
}}},this);
dojo.forEach(this.getChildren(),function(A,B){A._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var H=this.getChildren()[0];
var E=H?H.labelNode:this.domNode;
E.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return G
},_addChildren:function(D){var C={};
if(D&&D.length>0){dojo.forEach(D,function(B){var A=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(B.item)},B));
this.addChild(A);
C[this.tree.store.getIdentity(B.item)]=A
},this);
dojo.forEach(this.getChildren(),function(A,B){A._updateLayout()
})
}return C
},deleteNode:function(D){D.destroy();
var C=this.getChildren();
if(C.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(C,function(A){A._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(C,D){dojo.publish(this.id,[dojo.mixin({tree:this,event:C},D||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var H=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(H){dojo.forEach(H.split(","),function(A){this._openedItemIds[A]=true
},this)
}}var F=document.createElement("div");
F.style.display="none";
F.className="dijitTreeContainer";
dijit.setWaiRole(F,"presentation");
this.containerNodeTemplate=F;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var G={};
for(var E=0;
E<this.dndParams.length;
E++){if(this[this.dndParams[E]]){G[this.dndParams[E]]=this[this.dndParams[E]]
}}this.dndController=new this.dndController(this,G)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(B){return dojo.some(this.childrenAttr,function(A){return this.store.hasAttribute(B,A)
},this)
},getItemChildren:function(N,J){var M=this.store;
if(N==null){M.fetch({query:this.query,onComplete:J})
}else{var I=[];
for(var K=0;
K<this.childrenAttr.length;
K++){I=I.concat(M.getValues(N,this.childrenAttr[K]))
}var H=0;
dojo.forEach(I,function(A){if(!M.isItemLoaded(A)){H++
}});
if(H==0){J(I)
}else{function L(A){if(--H==0){J(I)
}}dojo.forEach(I,function(A){if(!M.isItemLoaded(A)){M.loadItem({item:A,onItem:L})
}})
}}},getItemParentIdentity:function(D,C){return this.store.getIdentity(C.item)
},getLabel:function(B){return this.store.getLabel(B)
},getIconClass:function(B){},getLabelClass:function(B){},_onLoadAllItems:function(F,D){var E=dojo.map(D,function(A){return{item:A,isExpandable:this.mayHaveChildren(A)}
},this);
dojo.mixin(this._itemNodeMap,F._setChildren(E));
this._expandNode(F)
},_onKeyPress:function(G){if(G.altKey){return 
}var E=dijit.getEnclosingWidget(G.target);
if(!E){return 
}if(G.charCode){var F=G.charCode;
if(!G.altKey&&!G.ctrlKey&&!G.shiftKey&&!G.metaKey){F=(String.fromCharCode(F)).toLowerCase();
this._onLetterKeyNav({node:E,key:F});
dojo.stopEvent(G)
}}else{var H=this._keyHandlerMap;
if(!H){H={};
H[dojo.keys.ENTER]="_onEnterKey";
H[dojo.keys.LEFT_ARROW]="_onLeftArrow";
H[dojo.keys.RIGHT_ARROW]="_onRightArrow";
H[dojo.keys.UP_ARROW]="_onUpArrow";
H[dojo.keys.DOWN_ARROW]="_onDownArrow";
H[dojo.keys.HOME]="_onHomeKey";
H[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=H
}if(this._keyHandlerMap[G.keyCode]){this[this._keyHandlerMap[G.keyCode]]({node:E,item:E.item});
dojo.stopEvent(G)
}}},_onEnterKey:function(B){this._publish("execute",{item:B.item,node:B.node});
this.onClick(B.item,B.node)
},_onDownArrow:function(D){var C=this._navToNextNode(D.node);
if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onUpArrow:function(H){var G=H.node;
var J=G;
var I=G.getPreviousSibling();
if(I){G=I;
while(G.isExpandable&&G.isExpanded&&G.hasChildren()){J=G;
var L=G.getChildren();
G=L[L.length-1]
}}else{var K=G.getParent();
if(!(this._hideRoot&&K===this)){G=K
}}if(G&&G.isTreeNode){J=G
}if(J&&J.isTreeNode){J.tree.focusNode(J);
return J
}},_onRightArrow:function(E){var D=E.node;
var F=D;
if(D.isExpandable&&!D.isExpanded){this._expandNode(D)
}else{if(D.hasChildren()){D=D.getChildren()[0]
}}if(D&&D.isTreeNode){F=D
}if(F&&F.isTreeNode){F.tree.focusNode(F);
return F
}},_onLeftArrow:function(E){var F=E.node;
var D=F;
if(F.isExpandable&&F.isExpanded){this._collapseNode(F)
}else{F=F.getParent()
}if(F&&F.isTreeNode){D=F
}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onHomeKey:function(){var B=this._navToRootOrFirstNode();
if(B){B.tree.focusNode(B);
return B
}},_onEndKey:function(G){var E=G.node.tree;
var H=E;
while(H.isExpanded){var F=H.getChildren();
H=F[F.length-1];
if(H.isTreeNode){E=H
}}if(E&&E.isTreeNode){E.tree.focusNode(E);
return E
}},_onLetterKeyNav:function(E){var F=startNode=E.node;
var D=E.key;
do{F=this._navToNextNode(F);
if(!F){F=this._navToRootOrFirstNode()
}}while(F!==startNode&&(F.label.charAt(0).toLowerCase()!=D));
if(F&&F.isTreeNode){if(F!==startNode){F.tree.focusNode(F)
}return F
}},_onClick:function(F){var E=F.target;
var D=dijit.getEnclosingWidget(E);
if(!D||!D.isTreeNode){return 
}if(E==D.expandoNode||E==D.expandoNodeText){if(D.isExpandable){this._onExpandoClick({node:D})
}}else{this._publish("execute",{item:D.item,node:D});
this.onClick(D.item,D);
this.focusNode(D)
}dojo.stopEvent(F)
},_onExpandoClick:function(D){var C=D.node;
if(C.isExpanded){this._collapseNode(C)
}else{this._expandNode(C)
}},onClick:function(D,C){},_navToNextNode:function(D){var C;
if(D.isExpandable&&D.isExpanded&&D.hasChildren()){C=D.getChildren()[0]
}else{while(D&&D.isTreeNode){C=D.getNextSibling();
if(C){break
}D=D.getParent()
}}return C
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var B=this.getChildren()[0];
if(B&&B.isTreeNode){return B
}}},_collapseNode:function(B){if(B.isExpandable){if(B.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,B.domNode)){this.focusNode(B)
}else{this.focusNode(this.lastFocused)
}}B.collapse();
if(this.persist&&B.item){delete this._openedItemIds[this.store.getIdentity(B.item)];
this._saveState()
}}},_expandNode:function(J){var K=J.tree;
if(K.lastFocused){K.focusNode(K.lastFocused)
}if(!J.isExpandable){return 
}var L=this.store;
var G=this.store.getValue;
switch(J.state){case"LOADING":return ;
case"UNCHECKED":J.markProcessing();
var H=this;
var I=function(A){J.unmarkProcessing();
H._onLoadAllItems(J,A)
};
this.getItemChildren(J.item,I);
break;
default:if(J.expand){J.expand();
if(this.persist&&J.item){this._openedItemIds[this.store.getIdentity(J.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var D=this.lastFocused;
if(!D){return 
}var C=D.labelNode;
dojo.removeClass(C,"dijitTreeLabelFocused");
C.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(B){B.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var B=this.lastFocused.labelNode;
dojo.removeClass(B,"dijitTreeLabelFocused")
}},_onTreeFocus:function(D){var E=dijit.getEnclosingWidget(D.target);
if(E!=this.lastFocused){this.blurNode()
}var F=E.labelNode;
F.setAttribute("tabIndex","0");
dojo.addClass(F,"dijitTreeLabelFocused");
this.lastFocused=E
},_onNewItem:function(J,G){var I;
if(G){var K=this._itemNodeMap[this.getItemParentIdentity(J,G)];
if(!K||dojo.indexOf(this.childrenAttr,G.attribute)==-1){return 
}}var H={item:J,isExpandable:this.mayHaveChildren(J)};
if(K){if(!K.isExpandable){K.makeExpandable()
}if(K.state=="LOADED"||K.isExpanded){var L=K._addChildren([H])
}}else{var L=this._addChildren([H])
}if(L){dojo.mixin(this._itemNodeMap,L)
}},_onDeleteItem:function(F){var E=this.store.getIdentity(F);
var G=this._itemNodeMap[E];
if(G){var H=G.getParent();
H.deleteNode(G);
this._itemNodeMap[E]=null
}},_onSetItem:function(D){var C=this.store.getIdentity(D);
node=this._itemNodeMap[C];
if(node){node.setLabelNode(this.getLabel(D));
node._updateItemClasses(D)
}},_saveState:function(){if(!this.persist){return 
}var C=[];
for(var D in this._openedItemIds){C.push(D)
}dojo.cookie(this.cookieName,C.join(","))
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(F,G,H){var E=this.filter(F);
if((typeof E==typeof F)&&(H==null||H==undefined)){H=this.format(E,this.constraints)
}if(H!=null&&H!=undefined){this.textbox.value=H
}dijit.form.TextBox.superclass.setValue.call(this,E,G)
},setDisplayedValue:function(B){this.textbox.value=B;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(C,D){return((C==null||C==undefined)?"":(C.toString?C.toString():C))
},parse:function(C,D){return C
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var D=this.domNode;
var C=D.style.opacity;
D.style.opacity="0.999";
setTimeout(function(){D.style.opacity=C
},0)
}},filter:function(B){if(B==undefined||B==null){return""
}else{if(typeof B!="string"){return B
}}if(this.trim){B=dojo.trim(B)
}if(this.uppercase){B=B.toUpperCase()
}if(this.lowercase){B=B.toLowerCase()
}if(this.propercase){B=B.replace(/[^\s]+/g,function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
})
}return B
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.InlineEditBox"]){dojo._hasResource["dijit.InlineEditBox"]=true;
dojo.provide("dijit.InlineEditBox");
dojo.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(B){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var D={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var C in D){this.connect(this.displayNode,C,D[C])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){dojo.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){dojo.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(B){if(this.disabled){return 
}if(B){dojo.stopEvent(B)
}this._onMouseOut();
setTimeout(dojo.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var E=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var F=document.createElement("span");
dojo.place(F,this.domNode,"before");
var G=this.editWidget=new dijit._InlineEditor({value:dojo.trim(E),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},F);
var H=G.domNode.style;
this.displayNode.style.display="none";
H.position="static";
H.visibility="visible";
this.domNode=G.domNode;
setTimeout(function(){G.focus()
},100)
},_showText:function(D){this.displayNode.style.display="";
var F=this.editWidget.domNode.style;
F.position="absolute";
F.visibility="hidden";
this.domNode=this.displayNode;
var E=this;
setTimeout(function(){if(D){dijit.focus(E.displayNode)
}E.editWidget.destroy();
delete E.editWidget
},100)
},save:function(B){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(B)
},_setDisplayValue:function(B){this.displayNode.innerHTML=B||this.noValueIndicator
},cancel:function(B){this.editing=false;
this._showText(B)
}});
dojo.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(B){if(!this[B]){this[B]=this.messages[B]
}},this)
},postCreate:function(){var D=dojo.getObject(this.editor);
var E=this.editWidget=new D(this.editorParams,this.editorPlaceholder);
var F=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(A){E.focusNode.style[A]=F[A]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(A){this.domNode.style[A]=F[A]
},this);
if(this.width=="100%"){E.domNode.style.width="100%";
this.domNode.style.display="block"
}else{E.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var B=this.editWidget;
return B.getDisplayedValue?B.getDisplayedValue():B.getValue()
},_onKeyPress:function(C){if(this._exitInProgress){return 
}if(this.autoSave){if(C.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(C);
this._exitInProgress=true;
this.cancel(true)
}else{if(C.keyCode==dojo.keys.ENTER){dojo.stopEvent(C);
this._exitInProgress=true;
this.save(true)
}}}else{var D=this;
setTimeout(function(){D.saveButton.setDisabled(D.getValue()==D._initialText)
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
dijit.selectInputText=function(I){var G=dojo.global;
var F=dojo.doc;
I=dojo.byId(I);
if(F.selection&&dojo.body()["createTextRange"]){if(I.createTextRange){var J=I.createTextRange();
J.moveStart("character",0);
J.moveEnd("character",I.value.length);
J.select()
}}else{if(G.getSelection){var H=G.getSelection();
if(I.setSelectionRange){I.setSelectionRange(0,I.value.length)
}}}I.focus()
}
}if(!dojo._hasResource["dijit.form.CheckBox"]){dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:'<fieldset class="dijitReset dijitInline" waiRole="presentation"\r\n\t><input\r\n\t \ttype="${type}" name="${name}"\r\n\t\tclass="dijitReset dijitCheckBoxInput"\r\n\t\tdojoAttachPoint="inputNode,focusNode"\r\n\t \tdojoAttachEvent="onmouseover:_onMouse,onmouseout:_onMouse,onclick:_onClick"\r\n/></fieldset>\r\n',baseClass:"dijitCheckBox",type:"checkbox",value:"on",postCreate:function(){dojo.setSelectable(this.inputNode,false);
this.setChecked(this.checked);
this.inherited(arguments)
},setChecked:function(B){if(dojo.isIE){if(B){this.inputNode.setAttribute("checked","checked")
}else{this.inputNode.removeAttribute("checked")
}}else{this.inputNode.checked=B
}this.inherited(arguments)
},setValue:function(B){if(B==null){B=""
}this.inputNode.value=B;
dijit.form.CheckBox.superclass.setValue.call(this,B)
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_groups:{},postCreate:function(){(this._groups[this.name]=this._groups[this.name]||[]).push(this);
this.inherited(arguments)
},uninitialize:function(){dojo.forEach(this._groups[this.name],function(E,F,D){if(E===this){D.splice(F,1);
return 
}},this)
},setChecked:function(B){if(B){dojo.forEach(this._groups[this.name],function(A){if(A!=this&&A.checked){A.setChecked(false)
}},this)
}this.inherited(arguments)
},_clicked:function(B){if(!this.checked){this.setChecked(true)
}}})
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(H,J){var F="^";
var G=null;
for(var I=0;
I<H.length;
I++){G=H.charAt(I);
switch(G){case"\\":F+=G;
I++;
F+=H.charAt(I);
break;
case"*":F+=".*";
break;
case"?":F+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":F+="\\";
default:F+=G
}}F+="$";
if(J){return new RegExp(F,"i")
}else{return new RegExp(F)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(F,D){var E=0;
if(F>D||typeof F==="undefined"||F===null){E=1
}else{if(F<D||typeof D==="undefined"||D===null){E=-1
}}return E
};
dojo.data.util.sorter.createSortFunction=function(J,L){var H=[];
function G(B,A){return function(N,C){var D=L.getValue(N,B);
var F=L.getValue(C,B);
var E=null;
if(L.comparatorMap){if(typeof B!=="string"){B=L.getIdentity(B)
}E=L.comparatorMap[B]||dojo.data.util.sorter.basicComparator
}E=E||dojo.data.util.sorter.basicComparator;
return A*E(D,F)
}
}for(var K=0;
K<J.length;
K++){sortAttribute=J[K];
if(sortAttribute.attribute){var I=(sortAttribute.descending)?-1:1;
H.push(G(sortAttribute.attribute,I))
}}return function(C,D){var A=0;
while(A<H.length){var B=H[A++](C,D);
if(B!==0){return B
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(F){F=F||{};
if(!F.store){F.store=this
}var H=this;
var G=function(A,C){if(C.onError){var B=C.scope||dojo.global;
C.onError.call(B,A,C)
}};
var E=function(P,O){var B=O.abort||null;
var T=false;
var D=O.start?O.start:0;
var Q=O.count?(D+O.count):P.length;
O.abort=function(){T=true;
if(B){B.call(O)
}};
var A=O.scope||dojo.global;
if(!O.store){O.store=H
}if(O.onBegin){O.onBegin.call(A,P.length,O)
}if(O.sort){P.sort(dojo.data.util.sorter.createSortFunction(O.sort,H))
}if(O.onItem){for(var R=D;
(R<P.length)&&(R<Q);
++R){var C=P[R];
if(!T){O.onItem.call(A,C,O)
}}}if(O.onComplete&&!T){var S=null;
if(!O.onItem){S=P.slice(D,Q)
}O.onComplete.call(A,S,O)
}};
this._fetchItems(F,E,G);
return F
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(B){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=B.url;
this._jsonData=B.data;
this._datatypeMap=B.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(A){return dojo.date.stamp.fromISOString(A)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(F,G,E){var H=this.getValues(F,G);
return(H.length>0)?H[0]:E
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
return D[C]||[]
},getAttributes:function(E){this._assertIsItem(E);
var D=[];
for(var F in E){if((F!==this._storeRefPropName)&&(F!==this._itemNumPropName)&&(F!==this._rootItemPropName)){D.push(F)
}}return D
},hasAttribute:function(D,C){return this.getValues(D,C).length>0
},containsValue:function(H,E,F){var G=undefined;
if(typeof F==="string"){G=dojo.data.util.filter.patternToRegExp(F,false)
}return this._containsValue(H,E,F,G)
},_containsValue:function(H,E,F,G){return dojo.some(this.getValues(H,E),function(A){if(A!==null&&!dojo.isObject(A)&&G){if(A.toString().match(G)){return true
}}else{if(F===A){return true
}}})
},isItem:function(B){if(B&&B[this._storeRefPropName]===this){if(this._arrayOfAllItems[B[this._itemNumPropName]]===B){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},getFeatures:function(){return this._features
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){return this.getValue(B,this._labelAttr)
}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(O,J,P){var I=this;
var N=function(H,E){var F=[];
if(H.query){var G=H.queryOptions?H.queryOptions.ignoreCase:false;
var C={};
for(var B in H.query){var D=H.query[B];
if(typeof D==="string"){C[B]=dojo.data.util.filter.patternToRegExp(D,G)
}}for(var U=0;
U<E.length;
++U){var T=true;
var V=E[U];
if(V===null){T=false
}else{for(var B in H.query){var D=H.query[B];
if(!I._containsValue(V,B,D,C[B])){T=false
}}}if(T){F.push(V)
}}J(F,H)
}else{for(var U=0;
U<E.length;
++U){var A=E[U];
if(A!==null){F.push(A)
}}J(F,H)
}};
if(this._loadFinished){N(O,this._getItemsArray(O.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:O,filter:N})
}else{this._loadInProgress=true;
var L={url:I._jsonFileUrl,handleAs:"json-comment-optional"};
var M=dojo.xhrGet(L);
M.addCallback(function(B){try{I._getItemsFromLoadedData(B);
I._loadFinished=true;
I._loadInProgress=false;
N(O,I._getItemsArray(O.queryOptions));
I._handleQueuedFetches()
}catch(A){I._loadFinished=true;
I._loadInProgress=false;
P(A,O)
}});
M.addErrback(function(A){I._loadInProgress=false;
P(A,O)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
N(O,this._getItemsArray(O.queryOptions))
}catch(K){P(K,O)
}}else{P(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),O)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var G=0;
G<this._queuedFetches.length;
G++){var E=this._queuedFetches[G];
var H=E.args;
var F=E.filter;
if(F){F(H,this._getItemsArray(H.queryOptions))
}else{this.fetchItemByIdentity(H)
}}this._queuedFetches=[]
}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(B){},_getItemsFromLoadedData:function(k){function n(B){var A=((B!=null)&&(typeof B=="object")&&(!dojo.isArray(B))&&(!dojo.isFunction(B))&&(B.constructor==Object)&&(typeof B._reference=="undefined")&&(typeof B._type=="undefined")&&(typeof B._value=="undefined"));
return A
}var f=this;
function W(D){f._arrayOfAllItems.push(D);
for(var E in D){var F=D[E];
if(F){if(dojo.isArray(F)){var A=F;
for(var B=0;
B<A.length;
++B){var C=A[B];
if(n(C)){W(C)
}}}else{if(n(F)){W(F)
}}}}}this._labelAttr=k.label;
var Z;
var X;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=k.items;
for(Z=0;
Z<this._arrayOfTopLevelItems.length;
++Z){X=this._arrayOfTopLevelItems[Z];
W(X);
X[this._rootItemPropName]=true
}var c={};
var V;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){if(V!==this._rootItemPropName){var d=X[V];
if(d!==null){if(!dojo.isArray(d)){X[V]=[d]
}}else{X[V]=[null]
}}c[V]=V
}}while(c[this._storeRefPropName]){this._storeRefPropName+="_"
}while(c[this._itemNumPropName]){this._itemNumPropName+="_"
}var h;
var l=k.identifier;
if(l){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=l;
for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
h=X[l];
var U=h[0];
if(!this._itemsByIdentity[U]){this._itemsByIdentity[U]=X
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+l+"].  Value collided: ["+U+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+l+"].  Value collided: ["+U+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
X[this._storeRefPropName]=this;
X[this._itemNumPropName]=Z
}for(Z=0;
Z<this._arrayOfAllItems.length;
++Z){X=this._arrayOfAllItems[Z];
for(V in X){h=X[V];
for(var a=0;
a<h.length;
++a){d=h[a];
if(d!==null&&typeof d=="object"){if(d._type&&d._value){var j=d._type;
var i=this._datatypeMap[j];
if(!i){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+j+"'")
}else{if(dojo.isFunction(i)){h[a]=new i(d._value)
}else{if(dojo.isFunction(i.deserialize)){h[a]=i.deserialize(d._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(d._reference){var o=d._reference;
if(dojo.isString(o)){h[a]=this._itemsByIdentity[o]
}else{for(var b=0;
b<this._arrayOfAllItems.length;
++b){var m=this._arrayOfAllItems[b];
var g=true;
for(var Y in o){if(m[Y]!=o[Y]){g=false
}}if(g){h[a]=m
}}}}}}}}},getIdentity:function(F){var D=this._features["dojo.data.api.Identity"];
if(D===Number){return F[this._itemNumPropName]
}else{var E=F[D];
if(E){return E[0]
}}return null
},fetchItemByIdentity:function(L){if(!this._loadFinished){var G=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:L})
}else{this._loadInProgress=true;
var H={url:G._jsonFileUrl,handleAs:"json-comment-optional"};
var I=dojo.xhrGet(H);
I.addCallback(function(A){var C=L.scope?L.scope:dojo.global;
try{G._getItemsFromLoadedData(A);
G._loadFinished=true;
G._loadInProgress=false;
var B=G._getItemByIdentity(L.identity);
if(L.onItem){L.onItem.call(C,B)
}G._handleQueuedFetches()
}catch(D){G._loadInProgress=false;
if(L.onError){L.onError.call(C,D)
}}});
I.addErrback(function(B){G._loadInProgress=false;
if(L.onError){var A=L.scope?L.scope:dojo.global;
L.onError.call(A,B)
}})
}}else{if(this._jsonData){G._getItemsFromLoadedData(G._jsonData);
G._jsonData=null;
G._loadFinished=true;
var J=G._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}}}else{var J=this._getItemByIdentity(L.identity);
if(L.onItem){var K=L.scope?L.scope:dojo.global;
L.onItem.call(K,J)
}}},_getItemByIdentity:function(C){var D=null;
if(this._itemsByIdentity){D=this._itemsByIdentity[C]
}else{D=this._arrayOfAllItems[C]
}if(D===undefined){D=null
}return D
},getIdentityAttributes:function(D){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return null
}else{return[C]
}},_forceLoad:function(){var D=this;
if(this._jsonFileUrl){var E={url:D._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var F=dojo.xhrGet(E);
F.addCallback(function(B){try{if(D._loadInProgress!==true&&!D._loadFinished){D._getItemsFromLoadedData(B);
D._loadFinished=true
}}catch(A){console.log(A);
throw A
}});
F.addErrback(function(A){throw A
})
}else{if(this._jsonData){D._getItemsFromLoadedData(D._jsonData);
D._jsonData=null;
D._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(B){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(C,D){return(new RegExp("^("+this.regExpGen(D)+")"+(this.required?"":"?")+"$")).test(C)&&(!this.required||!this._isEmpty(C))&&(this._isEmpty(C)||this.parse(C,D)!==null)
},isValid:function(B){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(B){return/^\s*$/.test(B)
},getErrorMessage:function(B){return this.invalidMessage
},getPromptMessage:function(B){return this.promptMessage
},validate:function(E){var H="";
var G=this.isValid(E);
var F=this._isEmpty(this.textbox.value);
this.state=(G||(!this._hasBeenBlurred&&F))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(G?"false":"true"));
if(E){if(F){H=this.getPromptMessage(true)
}if(!H&&!G){H=this.getErrorMessage(true)
}}this._displayMessage(H)
},_message:"",_displayMessage:function(B){if(this._message==B){return 
}this._message=B;
this.displayMessage(B)
},displayMessage:function(B){if(B){dijit.showTooltip(B,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(B){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(B){this.validate(true);
this._onMouse(B)
},onkeyup:function(B){this.onfocus(B)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var B=this.regExpGen(this.constraints);
this.regExp=B
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(D,C){return(D.toString?D.toString():"")
},toString:function(){var B=this.filter(this.getValue());
return(B!=null)?((typeof B=="string")?B:this.serialize(B,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var D=this.textbox;
var C=(this.valueNode=document.createElement("input"));
C.setAttribute("type",D.type);
C.setAttribute("value",this.toString());
dojo.style(C,"display","none");
C.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(C,D,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(D,C){return D-C
},rangeCheck:function(E,F){var G=(typeof F.min!="undefined");
var H=(typeof F.max!="undefined");
if(G||H){return(!G||this.compare(E,F.min)>=0)&&(!H||this.compare(E,F.max)<=0)
}else{return true
}},isInRange:function(B){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(B){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(B))
},getErrorMessage:function(B){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(B)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(B){this._lastDisplayedValue=B;
this.setValue(B,true)
},_getCaretPos:function(E){if(typeof (E.selectionStart)=="number"){return E.selectionStart
}else{if(dojo.isIE){var G=document.selection.createRange().duplicate();
var H=E.createTextRange();
G.move("character",0);
H.move("character",0);
try{H.setEndPoint("EndToEnd",G);
return String(H.text).replace(/\r/g,"").length
}catch(F){return 0
}}}},_setCaretPos:function(D,C){C=parseInt(C);
this._setSelectedRange(D,C,C)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(E){if(E.altKey||(E.ctrlKey&&E.charCode!=118)){return 
}var G=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(E)
}switch(E.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
G=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var F;
if(this._isShowingNow&&(F=this._popupWidget.getHighlightedOption())){if(F==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(E);
break
}else{if(F==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(E);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}E.preventDefault();
case dojo.keys.TAB:var H=this.getDisplayedValue();
if(this._popupWidget&&(H==this._popupWidget._messages.previousMessage||H==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(E);
this._selectOption();
this._hideResultList()
}else{G=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(E)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
G=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||E.charCode!=0){G=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(G){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(C){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(C))){var D=this._getCaretPos(this.focusNode);
if((D+1)>this.focusNode.value.length){this.focusNode.value=C;
this._setSelectedRange(this.focusNode,D,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}}else{this.focusNode.value=C;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}},_openResultList:function(D,F){if(this.disabled||F.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!D.length){this._hideResultList();
return 
}var E=new String(this.store.getValue(D[0],this.searchAttr));
if(E&&this.autoComplete&&!this._prev_key_backspace&&(F.query[this.searchAttr]!="*")){this._autoCompleteText(E);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",E)
}this._popupWidget.createOptions(D,F,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(F.direction){if(F.direction==1){this._popupWidget.highlightFirstOption()
}else{if(F.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(B)
}},onfocus:function(B){this._hasFocus=true;
this._onMouse(B)
},_announceOption:function(C){if(C==null){return 
}var D;
if(C==this._popupWidget.nextButton||C==this._popupWidget.previousButton){D=C.innerHTML
}else{D=this.store.getValue(C.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(D)
},_selectOption:function(C){var D=null;
if(!C){C={target:this._popupWidget.getHighlightedOption()}
}if(!C.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{D=C.target
}if(!C.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(D.item,this.searchAttr).length)
}this._doSelect(D)
},_doSelect:function(B){this.item=B.item;
this.setValue(this.store.getValue(B.item,this.searchAttr),true)
},_onArrowMouseDown:function(B){if(this.disabled){return 
}dojo.stopEvent(B);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(E){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var G=this.query;
this._lastQuery=G[this.searchAttr]=E+"*";
var H=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:G,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function F(B,A){B.start+=B.count*A;
B.direction=A;
B.store.fetch(B)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,F,H)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(B){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var B=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(A){A.style.display="none";
return{value:A.getAttribute("value"),name:String(A.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:B}});
if(B&&B.length&&!this.value){this.value=B[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(B){return{html:false,label:this.store.getValue(B,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(B){this.value=B;
this.onChange(B)
},onChange:function(B){},onPage:function(B){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(G,H){var E=H(G);
var F=document.createElement("div");
if(E.html){F.innerHTML=E.label
}else{F.appendChild(document.createTextNode(E.label))
}if(F.innerHTML==""){F.innerHTML="&nbsp;"
}F.item=G;
return F
},createOptions:function(H,G,E){this.previousButton.style.display=G.start==0?"none":"";
var F=this;
dojo.forEach(H,function(B){var A=F._createOption(B,E);
A.className="dijitMenuItem";
F.domNode.insertBefore(A,F.nextButton)
});
this.nextButton.style.display=G.count==H.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(B){dojo.stopEvent(B)
},onmouseup:function(C){if(C.target===this.domNode){return 
}else{if(C.target==this.previousButton){this.onPage(-1)
}else{if(C.target==this.nextButton){this.onPage(1)
}else{var D=C.target;
while(!D.item){D=D.parentNode
}this.setValue({target:D},true)
}}}},onmouseover:function(C){if(C.target===this.domNode){return 
}var D=C.target;
if(!(D==this.previousButton||D==this.nextButton)){while(!D.item){D=D.parentNode
}}this._focusOptionNode(D)
},onmouseout:function(B){if(B.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(B){if(this._highlighted_option!=B){this._blurOptionNode();
this._highlighted_option=B;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
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
},_page:function(J){var G=0;
var I=this.domNode.scrollTop;
var F=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(G<F){if(J){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var H=this.domNode.scrollTop;
G+=(H-I)*(J?-1:1);
I=H
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(B){switch(B.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dojo.cldr.monetary"]){dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.cldr.monetary.getData=function(H){var G={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var I={CHF:5};
var J=G[H],F=I[H];
if(typeof J=="undefined"){J=2
}if(typeof F=="undefined"){F=0
}return{places:J,round:F}
}
}if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.currency._mixInDefaults=function(H){H=H||{};
H.type="currency";
var E=dojo.i18n.getLocalization("dojo.cldr","currency",H.locale)||{};
var G=H.currency;
var F=dojo.cldr.monetary.getData(G);
dojo.forEach(["displayName","symbol","group","decimal"],function(A){F[A]=E[G+"_"+A]
});
F.fractional=[true,false];
return dojo.mixin(F,H)
};
dojo.currency.format=function(D,C){return dojo.number.format(D,dojo.currency._mixInDefaults(C))
};
dojo.currency.regexp=function(B){return dojo.number.regexp(dojo.currency._mixInDefaults(B))
};
dojo.currency.parse=function(D,C){return dojo.number.parse(D,dojo.currency._mixInDefaults(C))
}
}if(!dojo._hasResource["dijit.form.NumberTextBox"]){dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,format:function(C,D){if(isNaN(C)){return""
}return dojo.number.format(C,D)
},parse:dojo.number.parse,filter:function(B){if(typeof B=="string"){return this.inherited("filter",arguments)
}return(isNaN(B)?"":B)
},value:NaN});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
}if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",regExpGen:dojo.currency.regexp,format:dojo.currency.format,parse:dojo.currency.parse,postMixInProperties:function(){if(this.constraints===dijit.form.ValidationTextBox.prototype.constraints){this.constraints={}
}this.constraints.currency=this.currency;
dijit.form.CurrencyTextBox.superclass.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(E){var H={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var G=dojo.cldr.supplemental._region(E);
var F=H[G];
return(typeof F=="undefined")?1:F
};
dojo.cldr.supplemental._region=function(D){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var E=F[1];
if(!E){E={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[F[0]]
}else{if(E.length==4){E=F[2]
}}return E
};
dojo.cldr.supplemental.getWeekend=function(L){var J={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var G={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var I=dojo.cldr.supplemental._region(L);
var H=J[I];
var K=G[I];
if(typeof H=="undefined"){H=6
}if(typeof K=="undefined"){K=0
}return{start:H,end:K}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(D){var F=D.getMonth();
var E=[31,28,31,30,31,30,31,31,30,31,30,31];
if(F==1&&dojo.date.isLeapYear(D)){return 29
}return E[F]
};
dojo.date.isLeapYear=function(D){var C=D.getFullYear();
return !(C%400)||(!(C%4)&&!!(C%100))
};
dojo.date.getTimezoneName=function(K){var J=K.toString();
var H="";
var L;
var I=J.indexOf("(");
if(I>-1){H=J.substring(++I,J.indexOf(")"))
}else{var G=/([A-Z\/]+) \d{4}$/;
if((L=J.match(G))){H=L[1]
}else{J=K.toLocaleString();
G=/ ([A-Z\/]+)$/;
if((L=J.match(G))){H=L[1]
}}}return(H=="AM"||H=="PM")?"":H
};
dojo.date.compare=function(E,F,D){E=new Date(Number(E));
F=new Date(Number(F||new Date()));
if(typeof D!=="undefined"){if(D=="date"){E.setHours(0,0,0,0);
F.setHours(0,0,0,0)
}else{if(D=="time"){E.setFullYear(0,0,0);
F.setFullYear(0,0,0)
}}}if(E>F){return 1
}if(E<F){return -1
}return 0
};
dojo.date.add=function(M,N,X){var V=new Date(Number(M));
var O=false;
var R="Date";
switch(N){case"day":break;
case"weekday":var Q,P;
var T=0;
var S=X%5;
if(!S){Q=(X>0)?5:-5;
P=(X>0)?((X-5)/5):((X+5)/5)
}else{Q=S;
P=parseInt(X/5)
}var W=M.getDay();
if(W==6&&X>0){T=1
}else{if(W==0&&X<0){T=-1
}}var U=W+Q;
if(U==0||U==6){T=(X>0)?2:-2
}X=7*P+Q+T;
break;
case"year":R="FullYear";
O=true;
break;
case"week":X*=7;
break;
case"quarter":X*=3;
case"month":O=true;
R="Month";
break;
case"hour":case"minute":case"second":case"millisecond":R="UTC"+N.charAt(0).toUpperCase()+N.substring(1)+"s"
}if(R){V["set"+R](V["get"+R]()+X)
}if(O&&(V.getDate()<M.getDate())){V.setDate(0)
}return V
};
dojo.date.difference=function(W,Y,R){Y=Y||new Date();
R=R||"day";
var S=Y.getFullYear()-W.getFullYear();
var a=1;
switch(R){case"quarter":var V=W.getMonth();
var X=Y.getMonth();
var d=Math.floor(V/3)+1;
var f=Math.floor(X/3)+1;
f+=(S*4);
a=f-d;
break;
case"weekday":var Z=Math.round(dojo.date.difference(W,Y,"day"));
var U=parseInt(dojo.date.difference(W,Y,"week"));
var b=Z%7;
if(b==0){Z=U*5
}else{var c=0;
var g=W.getDay();
var i=Y.getDay();
U=parseInt(Z/7);
b=Z%7;
var h=new Date(W);
h.setDate(h.getDate()+(U*7));
var T=h.getDay();
if(Z>0){switch(true){case g==6:c=-1;
break;
case g==0:c=0;
break;
case i==6:c=-1;
break;
case i==0:c=-2;
break;
case (T+b)>5:c=-2
}}else{if(Z<0){switch(true){case g==6:c=0;
break;
case g==0:c=1;
break;
case i==6:c=2;
break;
case i==0:c=1;
break;
case (T+b)<0:c=2
}}}Z+=c;
Z-=(U*2)
}a=Z;
break;
case"year":a=S;
break;
case"month":a=(Y.getMonth()-W.getMonth())+(S*12);
break;
case"week":a=parseInt(dojo.date.difference(W,Y,"day")/7);
break;
case"day":a/=24;
case"hour":a/=60;
case"minute":a/=60;
case"second":a/=1000;
case"millisecond":a*=Y.getTime()-W.getTime()
}return Math.round(a)
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function F(B,C,A){return A.replace(/([a-z])\1*/ig,function(b){var X;
var Y=b.charAt(0);
var h=b.length;
var k;
var j=["abbr","wide","narrow"];
switch(Y){case"G":X=C[(h<4)?"eraAbbr":"eraNames"][B.getFullYear()<0?0:1];
break;
case"y":X=B.getFullYear();
switch(h){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:k=true
}break;
case"Q":case"q":X=Math.ceil((B.getMonth()+1)/3);
k=true;
break;
case"M":case"L":var i=B.getMonth();
var m;
switch(h){case 1:case 2:X=i+1;
k=true;
break;
case 3:case 4:case 5:m=j[h-3];
break
}if(m){var Z=(Y=="L")?"standalone":"format";
var n=["months",Z,m].join("-");
X=C[n][i]
}break;
case"w":var o=0;
X=dojo.date.locale._getWeekOfYear(B,o);
k=true;
break;
case"d":X=B.getDate();
k=true;
break;
case"D":X=dojo.date.locale._getDayOfYear(B);
k=true;
break;
case"E":case"e":case"c":var a=B.getDay();
var m;
switch(h){case 1:case 2:if(Y=="e"){var c=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
a=(a-c+7)%7
}if(Y!="c"){X=a+1;
k=true;
break
}case 3:case 4:case 5:m=j[h-3];
break
}if(m){var Z=(Y=="c")?"standalone":"format";
var n=["days",Z,m].join("-");
X=C[n][a]
}break;
case"a":var l=(B.getHours()<12)?"am":"pm";
X=C[l];
break;
case"h":case"H":case"K":case"k":var d=B.getHours();
switch(Y){case"h":X=(d%12)||12;
break;
case"H":X=d;
break;
case"K":X=(d%12);
break;
case"k":X=d||24;
break
}k=true;
break;
case"m":X=B.getMinutes();
k=true;
break;
case"s":X=B.getSeconds();
k=true;
break;
case"S":X=Math.round(B.getMilliseconds()*Math.pow(10,h-3));
break;
case"v":case"z":X=dojo.date.getTimezoneName(B);
if(X){break
}h=4;
case"Z":var f=B.getTimezoneOffset();
var g=[(f<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(f)/60),2),dojo.string.pad(Math.abs(f)%60,2)];
if(h==4){g.splice(0,0,"GMT");
g.splice(3,0,":")
}X=g.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+A)
}if(k){X=dojo.string.pad(X,h)
}return X
})
}dojo.date.locale.format=function(U,O){O=O||{};
var R=dojo.i18n.normalizeLocale(O.locale);
var C=O.formatLength||"short";
var B=dojo.date.locale._getGregorianBundle(R);
var T=[];
var V=dojo.hitch(this,F,U,B);
if(O.selector=="year"){var S=U.getFullYear();
if(R.match(/^zh|^ja/)){S+="\u5E74"
}return S
}if(O.selector!="time"){var A=O.datePattern||B["dateFormat-"+C];
if(A){T.push(E(A,V))
}}if(O.selector!="date"){var P=O.timePattern||B["timeFormat-"+C];
if(P){T.push(E(P,V))
}}var Q=T.join(" ");
return Q
};
dojo.date.locale.regexp=function(A){return dojo.date.locale._parseInfo(A).regexp
};
dojo.date.locale._parseInfo=function(N){N=N||{};
var P=dojo.i18n.normalizeLocale(N.locale);
var C=dojo.date.locale._getGregorianBundle(P);
var M=N.formatLength||"short";
var A=N.datePattern||C["dateFormat-"+M];
var B=N.timePattern||C["timeFormat-"+M];
var R;
if(N.selector=="date"){R=A
}else{if(N.selector=="time"){R=B
}else{R=A+" "+B
}}var Q=[];
var O=E(R,dojo.hitch(this,D,Q,C,N));
return{regexp:O,tokens:Q,bundle:C}
};
dojo.date.locale.parse=function(R,C){var A=dojo.date.locale._parseInfo(C);
var U=A.tokens,B=A.bundle;
var Q=new RegExp("^"+A.regexp+"$");
var W=Q.exec(R);
if(!W){return null
}var X=["abbr","wide","narrow"];
var P=new Date(1972,0);
var V={};
var S="";
dojo.forEach(W,function(h,K){if(!K){return 
}var N=U[K-1];
var M=N.length;
switch(N.charAt(0)){case"y":if(M!=2){P.setFullYear(h);
V.year=h
}else{if(h<100){h=Number(h);
var i=""+new Date().getFullYear();
var L=i.substring(0,2)*100;
var I=Number(i.substring(2,4));
var d=Math.min(I+20,99);
var J=(h<d)?L+h:L-100+h;
P.setFullYear(J);
V.year=J
}else{if(C.strict){return null
}P.setFullYear(h);
V.year=h
}}break;
case"M":if(M>2){var f=B["months-format-"+X[M-3]].concat();
if(!C.strict){h=h.replace(".","").toLowerCase();
f=dojo.map(f,function(Y){return Y.replace(".","").toLowerCase()
})
}h=dojo.indexOf(f,h);
if(h==-1){return null
}}else{h--
}P.setMonth(h);
V.month=h;
break;
case"E":case"e":var g=B["days-format-"+X[M-3]].concat();
if(!C.strict){h=h.toLowerCase();
g=dojo.map(g,"".toLowerCase)
}h=dojo.indexOf(g,h);
if(h==-1){return null
}break;
case"d":P.setDate(h);
V.date=h;
break;
case"D":P.setMonth(0);
P.setDate(h);
break;
case"a":var H=C.am||B.am;
var O=C.pm||B.pm;
if(!C.strict){var G=/\./g;
h=h.replace(G,"").toLowerCase();
H=H.replace(G,"").toLowerCase();
O=O.replace(G,"").toLowerCase()
}if(C.strict&&h!=H&&h!=O){return null
}S=(h==O)?"p":(h==H)?"a":"";
break;
case"K":if(h==24){h=0
}case"h":case"H":case"k":if(h>23){return null
}P.setHours(h);
break;
case"m":P.setMinutes(h);
break;
case"s":P.setSeconds(h);
break;
case"S":P.setMilliseconds(h)
}});
var T=P.getHours();
if(S==="p"&&T<12){P.setHours(T+12)
}else{if(S==="a"&&T==12){P.setHours(0)
}}if(V.year&&P.getFullYear()!=V.year){return null
}if(V.month&&P.getMonth()!=V.month){return null
}if(V.date&&P.getDate()!=V.date){return null
}return P
};
function E(C,N,A,K){var M=function(G){return G
};
N=N||M;
A=A||M;
K=K||M;
var B=C.match(/(''|[^'])+/g);
var L=false;
dojo.forEach(B,function(H,G){if(!H){B[G]=""
}else{B[G]=(L?A:N)(H);
L=!L
}});
return K(B.join(""))
}function D(A,H,C,B){B=dojo.regexp.escapeString(B);
if(!C.strict){B=B.replace(" a"," ?a")
}return B.replace(/([a-z])\1*/ig,function(R){var P;
var T=R.charAt(0);
var S=R.length;
var U="",V="";
if(C.strict){if(S>1){U="0{"+(S-1)+"}"
}if(S>2){V="0{"+(S-2)+"}"
}}else{U="0?";
V="0{0,2}"
}switch(T){case"y":P="\\d{2,4}";
break;
case"M":P=(S>2)?"\\S+":U+"[1-9]|1[0-2]";
break;
case"D":P=U+"[1-9]|"+V+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":P=U+"[1-9]|[12]\\d|3[01]";
break;
case"w":P=U+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":P="\\S+";
break;
case"h":P=U+"[1-9]|1[0-2]";
break;
case"k":P=U+"\\d|1[01]";
break;
case"H":P=U+"\\d|1\\d|2[0-3]";
break;
case"K":P=U+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":P="[0-5]\\d";
break;
case"S":P="\\d{"+S+"}";
break;
case"a":var G=C.am||H.am||"AM";
var Q=C.pm||H.pm||"PM";
if(C.strict){P=G+"|"+Q
}else{P=G+"|"+Q;
if(G!=G.toLowerCase()){P+="|"+G.toLowerCase()
}if(Q!=Q.toLowerCase()){P+="|"+Q.toLowerCase()
}}break;
default:P=".*"
}if(A){A.push(R)
}return"("+P+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var B=[];
dojo.date.locale.addCustomFormats=function(D,A){B.push({pkg:D,name:A})
};
dojo.date.locale._getGregorianBundle=function(D){var A={};
dojo.forEach(B,function(C){var F=dojo.i18n.getLocalization(C.pkg,C.name,D);
A=dojo.mixin(A,F)
},this);
return A
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(J,K,N,H){var M;
var I=dojo.date.locale._getGregorianBundle(H);
var L=[J,N,K];
if(N=="standAlone"){M=I[L.join("-")]
}L[1]="format";
return(M||I[L.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(F,E){var G=dojo.cldr.supplemental.getWeekend(E);
var H=(F||new Date()).getDay();
if(G.end<G.start){G.end+=7;
if(H<G.start){H+=7
}}return H>=G.start&&H<=G.end
};
dojo.date.locale._getDayOfYear=function(B){return dojo.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
dojo.date.locale._getWeekOfYear=function(G,J){if(arguments.length==1){J=0
}var I=new Date(G.getFullYear(),0,1).getDay();
var F=(I-J+7)%7;
var H=Math.floor((dojo.date.locale._getDayOfYear(G)+F-1)/7);
if(I==J){H++
}return H
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
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
}if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
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
}if(!dojo._hasResource["dijit.form.TimeTextBox"]){dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(C,D){if(!C||C.toString()==this._invalid){return null
}return dojo.date.locale.format(C,D)
},parse:dojo.date.locale.parse,serialize:dojo.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var B=this.constraints;
B.selector="time";
if(typeof B.min=="string"){B.min=dojo.date.stamp.fromISOString(B.min)
}if(typeof B.max=="string"){B.max=dojo.date.stamp.fromISOString(B.max)
}},_onFocus:function(B){this._open()
},setValue:function(D,C){this.inherited("setValue",arguments);
if(this._picker){if(!D||D.toString()==this._invalid){D=new Date()
}this._picker.setValue(D)
}},_open:function(){if(this.disabled){return 
}var C=this;
if(!this._picker){var D=dojo.getObject(this._popupClass,false);
this._picker=new D({onValueSelected:function(A){C.focus();
setTimeout(dojo.hitch(C,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(C,A,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(A){return C.constraints&&(dojo.date.compare(C.constraints.min,A)>0||dojo.date.compare(C.constraints.max,A)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){C._opened=false
}});
this._opened=true
}dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(B){this.textbox.value=B
}})
}if(!dojo._hasResource["dijit.form.DateTextBox"]){dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(D,F,E){if(F&&F.query[this.searchAttr]!=this._lastQuery){return 
}if(!D.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(D[0],E)
}},_openResultList:function(C,D){if(D.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=C.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(E,D,F){this.valueNode.value=E;
dijit.form.FilteringSelect.superclass.setValue.call(this,E,F,D);
this._lastDisplayedValue=D
},setValue:function(F,H){var E=this;
var G=function(A,B){if(A){if(E.store.isItemLoaded(A)){E._callbackSetLabel([A],undefined,B)
}else{E.store.loadItem({item:A,onItem:function(D,C){E._callbackSetLabel(D,C,B)
}})
}}else{E._isvalid=false;
E.validate(false)
}};
this.store.fetchItemByIdentity({identity:F,onItem:function(A){G(A,H)
}})
},_setValueFromItem:function(D,C){this._isvalid=true;
this._setValue(this.store.getIdentity(D),this.labelFunc(D,this.store),C)
},labelFunc:function(D,C){return C.getValue(D,this.searchAttr)
},onkeyup:function(B){},_doSelect:function(B){this.item=B.item;
this._setValueFromItem(B.item,true)
},setDisplayedValue:function(C){if(this.store){var D={};
this._lastQuery=D[this.searchAttr]=C;
this.textbox.value=C;
this._lastDisplayedValue=C;
this.store.fetch({query:D,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(B){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(B,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dijit.form._Spinner"]){dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(C,D){return C
},_handleUpArrowEvent:function(B){this._onMouse(B,this.upArrowNode)
},_handleDownArrowEvent:function(B){this._onMouse(B,this.downArrowNode)
},_arrowPressed:function(C,D){if(this.disabled){return 
}dojo.addClass(C,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),D*this.smallDelta),false)
},_arrowReleased:function(B){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
dojo.removeClass(B,"dijitSpinnerButtonActive")
},_typematicCallback:function(E,F,D){if(F==this.textbox){F=(D.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(E==-1){this._arrowReleased(F)
}else{this._arrowPressed(F,(F==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(F){dojo.stopEvent(F);
var H=0;
if(typeof F.wheelDelta=="number"){H=F.wheelDelta
}else{if(typeof F.detail=="number"){H=-F.detail
}}if(H>0){var I=this.upArrowNode;
var J=+1
}else{if(H<0){var I=this.downArrowNode;
var J=-1
}else{return 
}}this._arrowPressed(I,J);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var G=this;
this._wheelTimer=setTimeout(function(){G._arrowReleased(I)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(F,E){var D=F+E;
if(isNaN(F)||isNaN(D)){return F
}if((typeof this.constraints.max=="number")&&(D>this.constraints.max)){D=this.constraints.max
}if((typeof this.constraints.min=="number")&&(D<this.constraints.min)){D=this.constraints.min
}return D
}})
}if(!dojo._hasResource["dijit.form.Slider"]){dojo._hasResource["dijit.form.Slider"]=true;
dojo.provide("dijit.form.Slider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(B){if(this.disabled||B.altKey||B.ctrlKey){return 
}switch(B.keyCode){case dojo.keys.HOME:this.setValue(this.minimum,false);
break;
case dojo.keys.END:this.setValue(this.maximum,false);
break;
case dojo.keys.UP_ARROW:case (this._isReversed()?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):case dojo.keys.PAGE_UP:this.increment(B);
break;
case dojo.keys.DOWN_ARROW:case (this._isReversed()?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):case dojo.keys.PAGE_DOWN:this.decrement(B);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}dojo.stopEvent(B)
},_onHandleClick:function(B){if(this.disabled){return 
}if(!dojo.isIE){dijit.focus(this.sliderHandle)
}dojo.stopEvent(B)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(E){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(E);
var F=dojo.coords(this.sliderBarContainer,true);
var D=E[this._mousePixelCoord]-F[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(F[this._pixelCount]-D):D,F[this._pixelCount],true)
},_setPixelValue:function(L,J,H){if(this.disabled){return 
}L=L<0?0:J<L?J:L;
var I=this.discreteValues;
if(I<=1||I==Infinity){I=J
}I--;
var G=J/I;
var K=Math.round(L/G);
this.setValue((this.maximum-this.minimum)*K/I+this.minimum,H)
},setValue:function(E,F){this.valueNode.value=this.value=E;
this.inherited("setValue",arguments);
var D=(E-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(D*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-D)*100)+"%"
},_bumpValue:function(H){if(this.disabled){return 
}var F=dojo.getComputedStyle(this.sliderBarContainer);
var G=dojo._getContentBox(this.sliderBarContainer,F);
var J=this.discreteValues;
if(J<=1||J==Infinity){J=G[this._pixelCount]
}J--;
var I=(this.value-this.minimum)*J/(this.maximum-this.minimum)+H;
if(I<0){I=0
}if(I>J){I=J
}I=I*(this.maximum-this.minimum)/J+this.minimum;
this.setValue(I,true)
},decrement:function(B){this._bumpValue(B.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(B){this._bumpValue(B.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(C){dojo.stopEvent(C);
var D=0;
if(typeof C.wheelDelta=="number"){D=C.wheelDelta
}else{if(typeof C.detail=="number"){D=-C.detail
}}if(D>0){this.increment(C)
}else{if(D<0){this.decrement(C)
}}},startup:function(){dojo.forEach(this.getChildren(),function(B){if(this[B.container]!=this.containerNode){this[B.container].appendChild(B.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var C=this;
var D=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=C
};
dojo.extend(D,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:D});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(J){var K=this.widget;
var I=this.constraintBox;
if(!I){var M=K.sliderBarContainer;
var L=dojo.getComputedStyle(M);
var I=dojo._getContentBox(M,L);
I[K._startingPixelCount]=0;
this.constraintBox=I
}var H=this.marginBox;
var N=K._isReversed()?J[K._mousePixelCoord]-dojo._abs(K.sliderBarContainer).x:H[K._startingPixelCount]+J[K._mousePixelCoord];
dojo.hitch(K,"_setPixelValue")(K._isReversed()||K._upsideDown?(I[K._pixelCount]-N):N,I[K._pixelCount])
},destroy:function(D){var C=this.widget;
C.setValue(C.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(D,C){return this._positionPrefix+D+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var E=this._genHTML(50,0)
}else{var D=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var E=this._genHTML(0,0);
for(var F=1;
F<this.count-1;
F++){E+=this._genHTML(D*F,F)
}E+=this._genHTML(100,this.count-1)
}else{var E=this._genHTML(100,0);
for(var F=1;
F<this.count-1;
F++){E+=this._genHTML(100-D*F,F)
}E+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=E
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(B){return B
},_genHTML:function(D,C){return this._positionPrefix+this._calcPosition(D)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[C]+this._suffix
},getLabels:function(){var F=this.labels;
if(!F.length){F=dojo.query("> li",this.srcNodeRef).map(function(A){return String(A.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!F.length&&this.count>1){var G=this.minimum;
var H=(this.maximum-G)/(this.count-1);
for(var E=0;
E<this.count;
E++){F.push((E<this.numericMargin||E>=(this.count-this.numericMargin))?"":dojo.number.format(G,this.constraints));
G+=H
}}return F
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
dojo.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(B){return 100-B
},_isHorizontal:false})
}if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(J,K){var M=this.editNode;
if(typeof J=="string"){M.innerHTML="";
if(J.split){var I=this;
var H=true;
dojo.forEach(J.split("\n"),function(A){if(H){H=false
}else{M.appendChild(document.createElement("BR"))
}M.appendChild(document.createTextNode(A))
})
}else{M.appendChild(document.createTextNode(J))
}}else{J=M.innerHTML;
if(this.iframe){J=J.replace(/<div><\/div>\r?\n?$/i,"")
}J=J.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=J;
if(this.iframe){var L=document.createElement("div");
M.appendChild(L);
var N=L.offsetTop;
if(M.scrollWidth>M.clientWidth){N+=16
}if(this.lastHeight!=N){if(N==0){N=16
}dojo.contentBox(this.iframe,{h:N});
this.lastHeight=N
}M.removeChild(L)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),K)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var F=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=F.iframeEditTitle;
this._iframeFocusTitle=F.iframeFocusTitle;
var E=dojo.query('label[for="'+this.id+'"]');
if(E.length){this._iframeEditTitle=E[0].innerHTML+" "+this._iframeEditTitle
}var D=this.focusNode=this.editNode=document.createElement("BODY");
D.style.margin="0px";
D.style.padding="0px";
D.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var E=this.iframe.contentWindow;
try{var F=this.iframe.contentDocument.title
}catch(H){var F=""
}if(!E||!F){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var G=E.document;
G.getElementsByTagName("HTML")[0].replaceChild(this.editNode,G.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){G.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=G;
E.addEventListener("resize",dojo.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(B){dojo.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B)
},_blurred:function(B){dojo.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(B,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(C){if(C.keyCode==dojo.keys.TAB&&!C.shiftKey&&!C.ctrlKey&&!C.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(C)
}else{if(C.keyCode==dojo.keys.ENTER){C.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var D=document.createEvent("KeyEvents");
D.initKeyEvent("keypress",true,true,null,C.ctrlKey,C.altKey,C.shiftKey,C.metaKey,C.keyCode,C.charCode);
this.iframe.dispatchEvent(D)
}}}this._changing()
},_changing:function(B){setTimeout(dojo.hitch(this,"_changed",B,false),1)
},_changed:function(D,C){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,C)
}})
}if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var C=this.getChildren();
dojo.forEach(C,this._setupChild,this);
dojo.some(C,function(A){if(A.selected){this.selectedChildWidget=A
}return A.selected
},this);
var D=this.selectedChildWidget;
if(!D&&C[0]){D=this.selectedChildWidget=C[0];
D.selected=true
}if(D){this._showChild(D)
}dojo.publish(this.id+"-startup",[{children:C,selected:D}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(B){B.domNode.style.display="none";
B.domNode.style.position="relative";
return B
},addChild:function(D,C){dijit._Container.prototype.addChild.apply(this,arguments);
D=this._setupChild(D);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[D,C]);
if(!this.selectedChildWidget){this.selectChild(D)
}}},removeChild:function(D){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[D]);
this.layout()
}if(this.selectedChildWidget===D){this.selectedChildWidget=undefined;
if(this._started){var C=this.getChildren();
if(C.length){this.selectChild(C[0])
}}}},selectChild:function(B){B=dijit.byId(B);
if(this.selectedChildWidget!=B){this._transition(B,this.selectedChildWidget);
this.selectedChildWidget=B;
dojo.publish(this.id+"-selectChild",[B])
}},_transition:function(D,C){if(C){this._hideChild(C)
}this._showChild(D);
if(this.doLayout&&D.resize){D.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(F){var E=this.getChildren();
var D=dojo.indexOf(E,this.selectedChildWidget);
D+=F?1:E.length-1;
return E[D%E.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(B){dojo.publish(this.id+"-containerKeyPress",[{e:B,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(D){var C=this.getChildren();
D.isFirstChild=(D==C[0]);
D.isLastChild=(D==C[C.length-1]);
D.selected=true;
D.domNode.style.display="";
if(D._loadCheck){D._loadCheck()
}if(D.onShow){D.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}},closeChild:function(D){var C=D.onClose(this,D);
if(C){this.removeChild(D);
D.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[dojo.subscribe(this.containerId+"-startup",this,"onStartup"),dojo.subscribe(this.containerId+"-addChild",this,"onAddChild"),dojo.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),dojo.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),dojo.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(B){dojo.forEach(B.children,this.onAddChild,this);
this.onSelectChild(B.selected)
},destroy:function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(G,F){var I=document.createElement("span");
this.domNode.appendChild(I);
var J=dojo.getObject(this.buttonWidget);
var H=new J({label:G.title,closeButton:G.closable},I);
this.addChild(H,F);
this.pane2button[G]=H;
G.controlButton=H;
dojo.connect(H,"onClick",dojo.hitch(this,"onButtonClick",G));
dojo.connect(H,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",G));
if(!this._currentChild){H.focusNode.setAttribute("tabIndex","0");
this._currentChild=G
}},onRemoveChild:function(D){if(this._currentChild===D){this._currentChild=null
}var C=this.pane2button[D];
if(C){C.destroy()
}this.pane2button[D]=null
},onSelectChild:function(E){if(!E){return 
}if(this._currentChild){var D=this.pane2button[this._currentChild];
D.setChecked(false);
D.focusNode.setAttribute("tabIndex","-1")
}var F=this.pane2button[E];
F.setChecked(true);
this._currentChild=E;
F.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(D){var C=dijit.byId(this.containerId);
C.selectChild(D)
},onCloseButtonClick:function(E){var F=dijit.byId(this.containerId);
F.closeChild(E);
var D=this.pane2button[this._currentChild];
if(D){dijit.focus(D.focusNode||D.domNode)
}},adjacent:function(E){var H=this.getChildren();
var G=dojo.indexOf(H,this.pane2button[this._currentChild]);
var F=E?1:H.length-1;
return H[(G+F)%H.length]
},onkeypress:function(E){if(this.disabled||E.altKey){return 
}var F=true;
if(E.ctrlKey||!E._djpage){var D=dojo.keys;
switch(E.keyCode){case D.LEFT_ARROW:case D.UP_ARROW:case D.PAGE_UP:F=false;
case D.RIGHT_ARROW:case D.DOWN_ARROW:case D.PAGE_DOWN:this.adjacent(F).onClick();
dojo.stopEvent(E);
break;
case D.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(E);
break;
default:if(E.ctrlKey){if(E.keyCode==D.TAB){this.adjacent(!E.shiftKey).onClick();
dojo.stopEvent(E)
}else{if(E.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(E)
}}}}}},onContainerKeyPress:function(B){B.e._djpage=B.page;
this.onkeypress(B.e)
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(B){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(B){dijit.focus(this.focusNode)
},onClickCloseButton:function(B){B.stopPropagation()
}});
dojo.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
}if(!dojo._hasResource["dijit.layout.AccordionContainer"]){dojo._hasResource["dijit.layout.AccordionContainer"]=true;
dojo.provide("dijit.layout.AccordionContainer");
dojo.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
dojo.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var B=this.selectedChildWidget.containerNode.style;
B.display="";
B.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var E=0;
var F=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(A){E+=A.getTitleHeight()
});
var D=this._contentBox;
this._verticalSpace=(D.h-E);
if(F){F.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(B){return B
},_transition:function(I,J){if(this._inTransition){return 
}this._inTransition=true;
var H=[];
var K=this._verticalSpace;
if(I){I.setSelected(true);
var L=I.containerNode;
L.style.display="";
H.push(dojo.animateProperty({node:L,duration:this.duration,properties:{height:{start:"1",end:K}},onEnd:function(){L.style.overflow="auto"
}}))
}if(J){J.setSelected(false);
var G=J.containerNode;
G.style.overflow="hidden";
H.push(dojo.animateProperty({node:G,duration:this.duration,properties:{height:{start:K,end:"1"}},onEnd:function(){G.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(H).play()
},_onKeyPress:function(D){if(this.disabled||D.altKey){return 
}var C=dojo.keys;
switch(D.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(D);
break;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(D);
break;
default:if(D.ctrlKey&&D.keyCode==C.TAB){this._adjacent(D._dijitWidget,!D.shiftKey)._onTitleClick();
dojo.stopEvent(D)
}}}});
dojo.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
dojo.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return dojo.marginBox(this.titleNode).h
},_onTitleClick:function(){var B=this.getParent();
if(!B._inTransition){B.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(B){B._dijitWidget=this;
return this.getParent()._onKeyPress(B)
},_setSelectedState:function(B){this.selected=B;
dojo[(B?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",B?"0":"-1")
},_handleFocus:function(B){dojo[(B.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(B){this._setSelectedState(B);
if(B){this.onSelected()
}},onSelected:function(){}})
}if(!dojo._hasResource["dijit.layout.LayoutContainer"]){dojo._hasResource["dijit.layout.LayoutContainer"]=true;
dojo.provide("dijit.layout.LayoutContainer");
dojo.declare("dijit.layout.LayoutContainer",dijit.layout._LayoutWidget,{layout:function(){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(D,C){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}}});
dojo.extend(dijit._Widget,{layoutAlign:"none"})
}if(!dojo._hasResource["dijit.layout.LinkPane"]){dojo._hasResource["dijit.layout.LinkPane"]=true;
dojo.provide("dijit.layout.LinkPane");
dojo.declare("dijit.layout.LinkPane",[dijit.layout.ContentPane,dijit._Templated],{templateString:'<div class="dijitLinkPane"></div>',postCreate:function(){if(this.srcNodeRef){this.title+=this.srcNodeRef.innerHTML
}this.inherited("postCreate",arguments)
}})
}if(!dojo._hasResource["dijit.layout.SplitContainer"]){dojo._hasResource["dijit.layout.SplitContainer"]=true;
dojo.provide("dijit.layout.SplitContainer");
dojo.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
dojo.addClass(this.domNode,"dijitSplitContainer");
if(dojo.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(D){this.sizerWidth=7
}}var C=this.virtualSizer=document.createElement("div");
C.style.position="relative";
C.style.zIndex=10;
C.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(C);
dojo.setSelectable(C,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(E,F,D){this._injectChild(E);
if(F<D.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(B){B.domNode.style.position="absolute";
dojo.addClass(B.domNode,"dijitSplitPane")
},_addSizer:function(){var I=this.sizers.length;
var G=this.sizers[I]=document.createElement("div");
G.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var J=document.createElement("div");
J.className="thumb";
G.appendChild(J);
var F=this;
var H=(function(){var A=I;
return function(B){F.beginSizing(B,A)
}
})();
dojo.connect(G,"onmousedown",H);
this.domNode.appendChild(G);
dojo.setSelectable(G,false)
},removeChild:function(D){if(this.sizers.length&&dojo.indexOf(this.getChildren(),D)!=-1){var C=this.sizers.length-1;
dojo._destroyElement(this.sizers[C]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(E,D){this.inherited("addChild",arguments);
if(this._started){this._injectChild(E);
var F=this.getChildren();
if(F.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var M=this.getChildren();
if(!M.length){return 
}var K=this.isHorizontal?this.paneWidth:this.paneHeight;
if(M.length>1){K-=this.sizerWidth*(M.length-1)
}var L=0;
dojo.forEach(M,function(A){L+=A.sizeShare
});
var J=K/L;
var H=0;
dojo.forEach(M.slice(0,M.length-1),function(A){var B=Math.round(J*A.sizeShare);
A.sizeActual=B;
H+=B
});
M[M.length-1].sizeActual=K-H;
this._checkSizes();
var I=0;
var N=M[0].sizeActual;
this._movePanel(M[0],I,N);
M[0].position=I;
I+=N;
if(!this.sizers){return 
}dojo.some(M.slice(1),function(A,B){if(!this.sizers[B]){return true
}this._moveSlider(this.sizers[B],I,this.sizerWidth);
this.sizers[B].position=I;
I+=this.sizerWidth;
N=A.sizeActual;
this._movePanel(A,I,N);
A.position=I;
I+=N
},this)
},_movePanel:function(E,F,H){if(this.isHorizontal){E.domNode.style.left=F+"px";
E.domNode.style.top=0;
var G={w:H,h:this.paneHeight};
if(E.resize){E.resize(G)
}else{dojo.marginBox(E.domNode,G)
}}else{E.domNode.style.left=0;
E.domNode.style.top=F+"px";
var G={w:this.paneWidth,h:H};
if(E.resize){E.resize(G)
}else{dojo.marginBox(E.domNode,G)
}}},_moveSlider:function(F,E,D){if(this.isHorizontal){F.style.left=E+"px";
F.style.top=0;
dojo.marginBox(F,{w:D,h:this.paneHeight})
}else{F.style.left=0;
F.style.top=E+"px";
dojo.marginBox(F,{w:this.paneWidth,h:D})
}},_growPane:function(C,D){if(C>0){if(D.sizeActual>D.sizeMin){if((D.sizeActual-D.sizeMin)>C){D.sizeActual=D.sizeActual-C;
C=0
}else{C-=D.sizeActual-D.sizeMin;
D.sizeActual=D.sizeMin
}}}return C
},_checkSizes:function(){var H=0;
var J=0;
var I=this.getChildren();
dojo.forEach(I,function(A){J+=A.sizeActual;
H+=A.sizeMin
});
if(H<=J){var F=0;
dojo.forEach(I,function(A){if(A.sizeActual<A.sizeMin){F+=A.sizeMin-A.sizeActual;
A.sizeActual=A.sizeMin
}});
if(F>0){var G=this.isDraggingLeft?I.reverse():I;
dojo.forEach(G,function(A){F=this._growPane(F,A)
},this)
}}else{dojo.forEach(I,function(A){A.sizeActual=Math.round(J*(A.sizeMin/H))
})
}},beginSizing:function(H,J){var K=this.getChildren();
this.paneBefore=K[J];
this.paneAfter=K[J+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[J];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var I=this.cover.style;
I.position="absolute";
I.zIndex=1;
I.top=0;
I.left=0;
I.width="100%";
I.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(K[0].domNode,true);
if(this.isHorizontal){var G=(H.layerX?H.layerX:H.offsetX);
var L=H.pageX;
this.originPos=this.originPos.x
}else{var G=(H.layerY?H.layerY:H.offsetY);
var L=H.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=L;
this.screenToClientOffset=L-G;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(H)
},changeSizing:function(B){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?B.pageX:B.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}dojo.stopEvent(B)
},endSizing:function(B){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}dojo.forEach(this._connects,dojo.disconnect)
},movePoint:function(){var D=this.lastPoint-this.screenToClientOffset;
var C=D-this.dragOffset;
C=this.legaliseSplitPoint(C);
D=C+this.dragOffset;
this.lastPoint=D+this.screenToClientOffset
},legaliseSplitPoint:function(F){F+=this.sizingSplitter.position;
this.isDraggingLeft=!!(F>0);
if(!this.activeSizing){var E=this.paneBefore.position+this.paneBefore.sizeMin;
if(F<E){F=E
}var D=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(F>D){F=D
}}F-=this.sizingSplitter.position;
this._checkSizes();
return F
},_updateSize:function(){var E=this.lastPoint-this.dragOffset-this.originPos;
var D=this.paneBefore.position;
var F=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=E-D;
this.paneAfter.position=E+this.sizerWidth;
this.paneAfter.sizeActual=F-this.paneAfter.position;
dojo.forEach(this.getChildren(),function(A){A.sizeShare=A.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
dojo.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var B=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
dojo.style(this.virtualSizer,(this.isHorizontal?"left":"top"),B+"px")
},_getCookieName:function(B){return this.id+"_"+B
},_restoreState:function(){dojo.forEach(this.getChildren(),function(G,F){var H=this._getCookieName(F);
var J=dojo.cookie(H);
if(J){var I=parseInt(J);
if(typeof I=="number"){G.sizeShare=I
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(D,C){dojo.cookie(this._getCookieName(C),D.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}if(!dojo._hasResource["dijit.layout.TabContainer"]){dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(B){dojo.addClass(B.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return B
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(dojo.isSafari){setTimeout(dojo.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var D=this.tabPosition.replace(/-h/,"");
var C=[{domNode:this.tablist.domNode,layoutAlign:D},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,C);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,C[1]);
if(this.selectedChildWidget){this._showChild(this.selectedChildWidget);
if(this.doLayout&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._containerContentBox)
}}},destroy:function(){this.tablist.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",doLayout:true,buttonWidget:"dijit.layout._TabButton",postMixInProperties:function(){this["class"]="dijitTabLabels-"+this.tabPosition+(this.doLayout?"":" dijitTabNoLayout");
this.inherited("postMixInProperties",arguments)
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",templateString:"<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\r\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\r\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\r\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n",postCreate:function(){if(this.closeButton){dojo.addClass(this.innerDiv,"dijitClosable")
}else{this.closeButtonNode.style.display="none"
}this.inherited("postCreate",arguments);
dojo.setSelectable(this.containerNode,false)
}})
}if(!dojo._hasResource["dijit.dijit-all"]){dojo._hasResource["dijit.dijit-all"]=true;
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
dojo.provide("dijit.dijit-all")
}dojo.i18n._preloadLocalizations("dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]);