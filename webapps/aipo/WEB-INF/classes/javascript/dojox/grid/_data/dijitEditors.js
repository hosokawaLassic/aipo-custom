if(!dojo._hasResource["dojox.grid._data.dijitEditors"]){dojo._hasResource["dojox.grid._data.dijitEditors"]=true;
dojo.provide("dojox.grid._data.dijitEditors");
dojo.require("dojox.grid._data.editors");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.TimeTextBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dijit.form.CurrencyTextBox");
dojo.require("dijit.form.Slider");
dojo.require("dijit.Editor");
dojo.declare("dojox.grid.editors.Dijit",dojox.grid.editors.base,{editorClass:"dijit.form.TextBox",constructor:function(B){this.editor=null;
this.editorClass=dojo.getObject(this.cell.editorClass||this.editorClass)
},format:function(D,C){this.needFormatNode(D,C);
return"<div></div>"
},getValue:function(B){return this.editor.getValue()
},setValue:function(D,C){if(this.editor&&this.editor.setValue){this.editor.setValue(C)
}else{this.inherited(arguments)
}},getEditorProps:function(B){return dojo.mixin({},this.cell.editorProps||{},{constraints:dojo.mixin({},this.cell.constraint)||{},value:B})
},createEditor:function(E,F,D){return new this.editorClass(this.getEditorProps(F),E)
},attachEditor:function(E,F,D){E.appendChild(this.editor.domNode);
this.setValue(D,F)
},formatNode:function(E,F,D){if(!this.editorClass){return F
}if(!this.editor){this.editor=this.createEditor.apply(this,arguments)
}else{this.attachEditor.apply(this,arguments)
}this.sizeEditor.apply(this,arguments);
this.cell.grid.rowHeightChanged(D);
this.focus()
},sizeEditor:function(G,H,I){var J=this.cell.getNode(I),F=dojo.contentBox(J);
dojo.marginBox(this.editor.domNode,{w:F.w})
},focus:function(C,D){if(this.editor){setTimeout(dojo.hitch(this.editor,function(){dojox.grid.fire(this,"focus")
}),0)
}},_finish:function(B){this.inherited(arguments);
dojox.grid.removeNode(this.editor.domNode)
}});
dojo.declare("dojox.grid.editors.ComboBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.ComboBox",getEditorProps:function(E){var F=[];
dojo.forEach(this.cell.options,function(A){F.push({name:A,value:A})
});
var D=new dojo.data.ItemFileReadStore({data:{identifier:"name",items:F}});
return dojo.mixin({},this.cell.editorProps||{},{value:E,store:D})
},getValue:function(){var B=this.editor;
B.setDisplayedValue(B.getDisplayedValue());
return B.getValue()
}});
dojo.declare("dojox.grid.editors.DateTextBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.DateTextBox",setValue:function(D,C){if(this.editor){this.editor.setValue(new Date(C))
}else{this.inherited(arguments)
}},getEditorProps:function(B){return dojo.mixin(this.inherited(arguments),{value:new Date(B)})
}});
dojo.declare("dojox.grid.editors.CheckBox",dojox.grid.editors.Dijit,{editorClass:"dijit.form.CheckBox",getValue:function(){return this.editor.checked
}});
dojo.declare("dojox.grid.editors.Editor",dojox.grid.editors.Dijit,{editorClass:"dijit.Editor",getEditorProps:function(B){return dojo.mixin({},this.cell.editorProps||{},{height:this.cell.editorHeight||"100px"})
},createEditor:function(F,G,H){var E=new this.editorClass(this.getEditorProps(G),F);
E.setValue(G);
return E
},formatNode:function(F,G,H){this.inherited(arguments);
var E=this.editor;
E.open();
if(this.cell.editorToolbar){dojo.place(E.toolbar.domNode,E.editingArea,"before")
}}})
};