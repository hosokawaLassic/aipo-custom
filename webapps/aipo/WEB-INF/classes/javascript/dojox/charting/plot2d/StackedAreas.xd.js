dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedAreas"],["require","dojox.charting.plot2d.Stacked"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.StackedAreas"]){B._hasResource["dojox.charting.plot2d.StackedAreas"]=true;
B.provide("dojox.charting.plot2d.StackedAreas");
B.require("dojox.charting.plot2d.Stacked");
B.declare("dojox.charting.plot2d.StackedAreas",dojox.charting.plot2d.Stacked,{constructor:function(){this.opt.lines=true;
this.opt.areas=true
}})
}}});