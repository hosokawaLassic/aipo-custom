dojo._xdResourceLoaded({depends:[["provide","dojox.wire.demos.WidgetRepeater"],["require","dojo.parser"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require",this.widget]],defineResource:function(B){if(!B._hasResource["dojox.wire.demos.WidgetRepeater"]){B._hasResource["dojox.wire.demos.WidgetRepeater"]=true;
B.provide("dojox.wire.demos.WidgetRepeater");
B.require("dojo.parser");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit._Container");
B.declare("dojox.wire.demos.WidgetRepeater",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<div class='WidgetRepeater' dojoAttachPoint='repeaterNode'></div>",widget:null,repeater:null,createNew:function(A){try{if(B.isString(this.widget)){B.require(this.widget);
this.widget=B.getObject(this.widget)
}this.addChild(new this.widget(A));
this.repeaterNode.appendChild(document.createElement("br"))
}catch(D){console.debug(D)
}}})
}}});