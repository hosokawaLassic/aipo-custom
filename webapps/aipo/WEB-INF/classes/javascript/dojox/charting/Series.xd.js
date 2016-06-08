dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Series"],["require","dojox.charting.Element"]],defineResource:function(B){if(!B._hasResource["dojox.charting.Series"]){B._hasResource["dojox.charting.Series"]=true;
B.provide("dojox.charting.Series");
B.require("dojox.charting.Element");
B.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(E,A,F){B.mixin(this,F);
if(typeof this.plot!="string"){this.plot="default"
}this.data=A;
this.dirty=true;
this.clear()
},clear:function(){this.dyn={}
}})
}}});