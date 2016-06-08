dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.TextColor"],["require","dijit._editor._Plugin"],["require","dijit.ColorPalette"]],defineResource:function(B){if(!B._hasResource["dijit._editor.plugins.TextColor"]){B._hasResource["dijit._editor.plugins.TextColor"]=true;
B.provide("dijit._editor.plugins.TextColor");
B.require("dijit._editor._Plugin");
B.require("dijit.ColorPalette");
B.declare("dijit._editor.plugins.TextColor",dijit._editor._Plugin,{buttonClass:dijit.form.DropDownButton,constructor:function(){this.dropDown=new dijit.ColorPalette();
B.connect(this.dropDown,"onChange",this,function(A){this.editor.execCommand(this.command,A)
})
}})
}}});