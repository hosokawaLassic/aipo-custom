dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.dijitEditors"],["require","dojox.grid._data.editors"],["require","dijit.form.DateTextBox"],["require","dijit.form.TimeTextBox"],["require","dijit.form.ComboBox"],["require","dijit.form.CheckBox"],["require","dijit.form.TextBox"],["require","dijit.form.NumberSpinner"],["require","dijit.form.NumberTextBox"],["require","dijit.form.CurrencyTextBox"],["require","dijit.form.Slider"],["require","dijit.Editor"]],defineResource:function(B){if(!B._hasResource["dojox.grid._data.dijitEditors"]){B._hasResource["dojox.grid._data.dijitEditors"]=true;
B.provide("dojox.grid._data.dijitEditors");
B.require("dojox.grid._data.editors");
B.require("dijit.form.DateTextBox");
B.require("dijit.form.TimeTextBox");
B.require("dijit.form.ComboBox");
B.require("dijit.form.CheckBox");
B.require("dijit.form.TextBox");
B.require("dijit.form.NumberSpinner");
B.require("dijit.form.NumberTextBox");
B.require("dijit.form.CurrencyTextBox");
B.require("dijit.form.Slider");
B.require("dijit.Editor");
B.declare("dojox.grid.editors.Dijit",dojox.grid.editors.base,{editorClass:"dijit.form.TextBox",constructor:function(A){this.editor=null;
this.editorClass=B.getObject(this.cell.editorClass||this.editorClass)
},format:function(A,D){this.needFormatNode(A,D);
return"<div></div>"
},getValue:function(A){return this.editor.getValue()
},setValue:function(A,D){if(this.editor&&this.editor.setValue){this.editor.setValue(D)
}else{this.inherited(arguments)
}},getEditorProps:function(A){return B.mixin({},this.cell.editorProps||{},{constraints:B.mixin({},this.cell.constraint)||{},value:A})
},createEditor:function(A,E,F){return new this.editorClass(this.getEditorProps(E),A)
},attachEditor:function(A,E,F){A.appendChild(this.editor.domNode);
this.setValue(F,E)
},formatNode:function(A,E,F){if(!this.editorClass){return E
}if(!this.editor){this.editor=this.createEditor.apply(this,arguments)
}else{this.attachEditor.apply(this,arguments)
}this.sizeEditor.apply(this,arguments);
this.cell.grid.rowHeightChanged(F);
this.focus()
},sizeEditor:function(A,G,H){var I=this.cell.getNode(H),J=B.contentBox(I);
B.marginBox(this.editor.domNode,{w:J.w})
},focus:function(D,A){if(this.editor){setTimeout(B.hitch(this.editor,function(){dojox.grid.fire(this,"focus")
}),0)
}},_finish:function(A){this.inherited(arguments);
dojox.grid.removeNode(this.editor.domNode)
}});
B.declare("dojox.grid.editors.ComboBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.ComboBox",getEditorProps:function(A){var E=[];
B.forEach(this.cell.options,function(C){E.push({name:C,value:C})
});
var F=new B.data.ItemFileReadStore({data:{identifier:"name",items:E}});
return B.mixin({},this.cell.editorProps||{},{value:A,store:F})
},getValue:function(){var A=this.editor;
A.setDisplayedValue(A.getDisplayedValue());
return A.getValue()
}});
B.declare("dojox.grid.editors.DateTextBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.DateTextBox",setValue:function(A,D){if(this.editor){this.editor.setValue(new Date(D))
}else{this.inherited(arguments)
}},getEditorProps:function(A){return B.mixin(this.inherited(arguments),{value:new Date(A)})
}});
B.declare("dojox.grid.editors.CheckBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.CheckBox",getValue:function(){return this.editor.checked
}});
B.declare("dojox.grid.editors.Editor",dojox.grid.editors.Dijit,{editorClass:"dijit.Editor",getEditorProps:function(A){return B.mixin({},this.cell.editorProps||{},{height:this.cell.editorHeight||"100px"})
},createEditor:function(A,F,G){var H=new this.editorClass(this.getEditorProps(F),A);
H.setValue(F);
return H
},formatNode:function(A,F,G){this.inherited(arguments);
var H=this.editor;
H.open();
if(this.cell.editorToolbar){B.place(H.toolbar.domNode,H.editingArea,"before")
}}})
}}});