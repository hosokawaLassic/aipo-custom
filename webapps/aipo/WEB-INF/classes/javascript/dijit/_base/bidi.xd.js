dojo._xdResourceLoaded({depends:[["provide","dijit._base.bidi"]],defineResource:function(B){if(!B._hasResource["dijit._base.bidi"]){B._hasResource["dijit._base.bidi"]=true;
B.provide("dijit._base.bidi");
B.addOnLoad(function(){if(!B._isBodyLtr()){B.addClass(B.body(),"dijitRtl")
}})
}}});