if(!dojo._hasResource["dojox.wire.demos.WidgetRepeater"]){dojo._hasResource["dojox.wire.demos.WidgetRepeater"]=true;
dojo.provide("dojox.wire.demos.WidgetRepeater");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.declare("dojox.wire.demos.WidgetRepeater",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<div class='WidgetRepeater' dojoAttachPoint='repeaterNode'></div>",widget:null,repeater:null,createNew:function(B){try{if(dojo.isString(this.widget)){dojo.require(this.widget);
this.widget=dojo.getObject(this.widget)
}this.addChild(new this.widget(B));
this.repeaterNode.appendChild(document.createElement("br"))
}catch(A){console.debug(A)
}}})
};