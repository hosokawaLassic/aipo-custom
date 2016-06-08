dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Scatter"],["require","dojox.charting.plot2d.Default"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Scatter"]){B._hasResource["dojox.charting.plot2d.Scatter"]=true;
B.provide("dojox.charting.plot2d.Scatter");
B.require("dojox.charting.plot2d.Default");
B.declare("dojox.charting.plot2d.Scatter",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=false;
this.opt.markers=true
}})
}}});