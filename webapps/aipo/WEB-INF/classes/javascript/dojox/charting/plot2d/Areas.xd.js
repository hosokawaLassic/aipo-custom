dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Areas"],["require","dojox.charting.plot2d.Default"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Areas"]){B._hasResource["dojox.charting.plot2d.Areas"]=true;
B.provide("dojox.charting.plot2d.Areas");
B.require("dojox.charting.plot2d.Default");
B.declare("dojox.charting.plot2d.Areas",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=true;
this.opt.areas=true
}})
}}});