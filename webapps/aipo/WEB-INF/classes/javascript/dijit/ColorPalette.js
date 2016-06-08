if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.colors");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
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
};