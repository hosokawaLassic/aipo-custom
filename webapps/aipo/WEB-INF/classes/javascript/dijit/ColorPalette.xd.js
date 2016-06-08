dojo._xdResourceLoaded({depends:[["provide","dijit.ColorPalette"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojo.colors"],["require","dojo.i18n"],["requireLocalization","dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.ColorPalette"]){B._hasResource["dijit.ColorPalette"]=true;
B.provide("dijit.ColorPalette");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dojo.colors");
B.require("dojo.i18n");
B.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":B.moduleUrl("dijit","templates/colors7x10.png"),"3x4":B.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){B.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var Q=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=B.i18n.getLocalization("dojo","colors",this.lang);
var N=B.moduleUrl("dijit","templates/blank.gif");
var R=new B.Color(),U=this._paletteCoords;
for(var P=0;
P<Q.length;
P++){for(var A=0;
A<Q[P].length;
A++){var S=document.createElement("img");
S.src=N;
B.addClass(S,"dijitPaletteImg");
var X=Q[P][A],O=R.setColor(B.Color.named[X]);
S.alt=this.colorNames[X];
S.color=O.toHex();
var V=S.style;
V.color=V.backgroundColor=S.color;
B.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(C){this.connect(S,"on"+C.toLowerCase(),"_onColor"+C)
},this);
this.divNode.appendChild(S);
V.top=U.topOffset+(P*U.cHeight)+"px";
V.left=U.leftOffset+(A*U.cWidth)+"px";
S.setAttribute("tabIndex","-1");
S.title=this.colorNames[X];
dijit.setWaiRole(S,"gridcell");
S.index=this._highlightNodes.length;
this._highlightNodes.push(S)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=Q[0].length;
this._yDim=Q.length;
var W={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var T in W){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:B.keys[T],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var C=W[T];
return function(D){this._navigateByKey(C,D)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(A){},_onColorDijitclick:function(D){var A=D.currentTarget;
if(this._currentFocus!=A.index){this._currentFocus=A.index;
dijit.focus(A)
}this._selectColor(A);
B.stopEvent(D)
},_onColorMouseOut:function(A){B.removeClass(A.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(D){var A=D.currentTarget;
A.tabIndex=0;
A.focus()
},_onColorBlur:function(A){B.removeClass(A.currentTarget,"dijitPaletteImgHighlight");
A.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(A){if(this._currentFocus!=A.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=A.currentTarget.index;
B.addClass(A.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(A){this.onChange(this.value=A.color)
},_navigateByKey:function(H,F){if(F==-1){return 
}var G=this._currentFocus+H;
if(G<this._highlightNodes.length&&G>-1){var A=this._highlightNodes[G];
A.tabIndex=0;
A.focus()
}}})
}}});