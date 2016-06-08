dojo._xdResourceLoaded({depends:[["provide","dijit.layout.LinkPane"],["require","dijit.layout.ContentPane"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.layout.LinkPane"]){B._hasResource["dijit.layout.LinkPane"]=true;
B.provide("dijit.layout.LinkPane");
B.require("dijit.layout.ContentPane");
B.require("dijit._Templated");
B.declare("dijit.layout.LinkPane",[dijit.layout.ContentPane,dijit._Templated],{templateString:'<div class="dijitLinkPane"></div>',postCreate:function(){if(this.srcNodeRef){this.title+=this.srcNodeRef.innerHTML
}this.inherited("postCreate",arguments)
}})
}}});