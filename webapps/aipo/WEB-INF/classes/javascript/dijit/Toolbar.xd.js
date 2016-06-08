dojo._xdResourceLoaded({depends:[["provide","dijit.Toolbar"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.Toolbar"]){B._hasResource["dijit.Toolbar"]=true;
B.provide("dijit.Toolbar");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dijit._Templated");
B.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[B.keys.LEFT_ARROW]:[B.keys.RIGHT_ARROW],this.isLeftToRight()?[B.keys.RIGHT_ARROW]:[B.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
B.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){B.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}}});