dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.MarkersOnly"],["require","dojox.charting.plot2d.Default"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.MarkersOnly"]){B._hasResource["dojox.charting.plot2d.MarkersOnly"]=true;
B.provide("dojox.charting.plot2d.MarkersOnly");
B.require("dojox.charting.plot2d.Default");
B.declare("dojox.charting.plot2d.MarkersOnly",dojox.charting.plot2d.Default,{constructor:function(){this.opt.lines=false;
this.opt.markers=true
}})
}}});