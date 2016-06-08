if(!dojo._hasResource["dojox.grid._data.editors"]){dojo._hasResource["dojox.grid._data.editors"]=true;
dojo.provide("dojox.grid._data.editors");
dojo.provide("dojox.grid.editors");
dojo.declare("dojox.grid.editors.Base",null,{constructor:function(B){this.cell=B
},_valueProp:"value",_formatPending:false,format:function(D,C){},needFormatNode:function(D,C){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",D,C)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(D,C){if(this._formatPending){this._formatPending=false;
dojo.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(C),D,C)
}},getNode:function(B){return(this.cell.getNode(B)||0).firstChild||0
},formatNode:function(E,F,D){if(dojo.isIE){dojox.grid.whenIdle(this,"focus",D,E)
}else{this.focus(D,E)
}},dispatchEvent:function(C,D){if(C in this){return this[C](D)
}},getValue:function(B){return this.getNode(B)[this._valueProp]
},setValue:function(F,D){var E=this.getNode(F);
if(E){E[this._valueProp]=D
}},focus:function(C,D){dojox.grid.focusSelectNode(D||this.getNode(C))
},save:function(B){this.value=this.value||this.getValue(B)
},restore:function(B){this.setValue(B,this.value)
},_finish:function(B){dojo.setSelectable(this.cell.grid.domNode,false);
this.cancelFormatNode(this.cell)
},apply:function(B){this.cell.applyEdit(this.getValue(B),B);
this._finish(B)
},cancel:function(B){this.cell.cancelEdit(B);
this._finish(B)
}});
dojox.grid.editors.base=dojox.grid.editors.Base;
dojo.declare("dojox.grid.editors.Input",dojox.grid.editors.Base,{constructor:function(B){this.keyFilter=this.keyFilter||this.cell.keyFilter
},keyFilter:null,format:function(D,C){this.needFormatNode(D,C);
return'<input class="dojoxGrid-input" type="text" value="'+D+'">'
},formatNode:function(E,F,D){this.inherited(arguments);
this.cell.registerOnBlur(E,D)
},doKey:function(D){if(this.keyFilter){var C=String.fromCharCode(D.charCode);
if(C.search(this.keyFilter)==-1){dojo.stopEvent(D)
}}},_finish:function(F){this.inherited(arguments);
var E=this.getNode(F);
try{dojox.grid.fire(E,"blur")
}catch(D){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
dojo.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(B){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(H,I){this.needFormatNode(H,I);
var K=['<select class="dojoxGrid-select">'];
for(var L=0,J,G;
(J=this.options[L])&&(G=this.values[L]);
L++){K.push("<option",(H==J?" selected":""),">",J,"</option>")
}K.push("</select>");
return K.join("")
},getValue:function(G){var F=this.getNode(G);
if(F){var E=F.selectedIndex,H=F.options[E];
return this.cell.returnIndex?E:H.value||H.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
dojo.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(D,C){this.formatNode(this.getNode(C),D,C)
},applyStaticValue:function(D){var C=this.cell.grid.edit;
C.applyCellEdit(this.getValue(D),this.cell,D);
C.start(this.cell,D,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
dojo.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(D,C){return'<input class="dojoxGrid-input" type="checkbox"'+(D?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(B){if(B.target.tagName=="INPUT"){this.applyStaticValue(B.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
};