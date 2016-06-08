dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.editors"],["provide","dojox.grid.editors"]],defineResource:function(B){if(!B._hasResource["dojox.grid._data.editors"]){B._hasResource["dojox.grid._data.editors"]=true;
B.provide("dojox.grid._data.editors");
B.provide("dojox.grid.editors");
B.declare("dojox.grid.editors.Base",null,{constructor:function(A){this.cell=A
},_valueProp:"value",_formatPending:false,format:function(A,D){},needFormatNode:function(A,D){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",A,D)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(A,D){if(this._formatPending){this._formatPending=false;
B.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(D),A,D)
}},getNode:function(A){return(this.cell.getNode(A)||0).firstChild||0
},formatNode:function(A,E,F){if(B.isIE){dojox.grid.whenIdle(this,"focus",F,A)
}else{this.focus(F,A)
}},dispatchEvent:function(D,A){if(D in this){return this[D](A)
}},getValue:function(A){return this.getNode(A)[this._valueProp]
},setValue:function(E,F){var A=this.getNode(E);
if(A){A[this._valueProp]=F
}},focus:function(D,A){dojox.grid.focusSelectNode(A||this.getNode(D))
},save:function(A){this.value=this.value||this.getValue(A)
},restore:function(A){this.setValue(A,this.value)
},_finish:function(A){B.setSelectable(this.cell.grid.domNode,false);
this.cancelFormatNode(this.cell)
},apply:function(A){this.cell.applyEdit(this.getValue(A),A);
this._finish(A)
},cancel:function(A){this.cell.cancelEdit(A);
this._finish(A)
}});
dojox.grid.editors.base=dojox.grid.editors.Base;
B.declare("dojox.grid.editors.Input",dojox.grid.editors.Base,{constructor:function(A){this.keyFilter=this.keyFilter||this.cell.keyFilter
},keyFilter:null,format:function(A,D){this.needFormatNode(A,D);
return'<input class="dojoxGrid-input" type="text" value="'+A+'">'
},formatNode:function(A,E,F){this.inherited(arguments);
this.cell.registerOnBlur(A,F)
},doKey:function(A){if(this.keyFilter){var D=String.fromCharCode(A.charCode);
if(D.search(this.keyFilter)==-1){B.stopEvent(A)
}}},_finish:function(E){this.inherited(arguments);
var A=this.getNode(E);
try{dojox.grid.fire(A,"blur")
}catch(F){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
B.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(A){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(A,H){this.needFormatNode(A,H);
var J=['<select class="dojoxGrid-select">'];
for(var K=0,I,L;
(I=this.options[K])&&(L=this.values[K]);
K++){J.push("<option",(A==I?" selected":""),">",I,"</option>")
}J.push("</select>");
return J.join("")
},getValue:function(F){var A=this.getNode(F);
if(A){var H=A.selectedIndex,G=A.options[H];
return this.cell.returnIndex?H:G.value||G.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
B.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(A,D){this.formatNode(this.getNode(D),A,D)
},applyStaticValue:function(A){var D=this.cell.grid.edit;
D.applyCellEdit(this.getValue(A),this.cell,A);
D.start(this.cell,A,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
B.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(A,D){return'<input class="dojoxGrid-input" type="checkbox"'+(A?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(A){if(A.target.tagName=="INPUT"){this.applyStaticValue(A.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
}}});