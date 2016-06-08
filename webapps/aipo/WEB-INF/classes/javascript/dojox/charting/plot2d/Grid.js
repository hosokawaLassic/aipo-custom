if(!dojo._hasResource["dojox.charting.plot2d.Grid"]){dojo._hasResource["dojox.charting.plot2d.Grid"]=true;
dojo.provide("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.utils;
dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none"},optionalParams:{},constructor:function(A,D){this.opt=dojo.clone(this.defaultParams);
B.updateWithObject(this.opt,D);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},clear:function(){this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(A){if(A){this[A.vertical?"_vAxis":"_hAxis"]=A
}return this
},addSeries:function(A){return this
},calculateAxes:function(A){return this
},getRequiredColors:function(){return 0
},render:function(K,L){if(!this.dirty){return this
}this.cleanGroup();
var M=this.group,O=this.chart.theme.axis,A=this._vAxis.getScaler();
if(this.opt.hMinorLines&&A.minor.tick){for(var N=0;
N<A.minor.count;
++N){var J=K.height-L.b-A.scale*(A.minor.start-A.bounds.lower+N*A.minor.tick);
M.createLine({x1:L.l,y1:J,x2:K.width-L.r,y2:J}).setStroke(O.minorTick)
}}if(this.opt.hMajorLines&&A.major.tick){for(var N=0;
N<A.major.count;
++N){var J=K.height-L.b-A.scale*(A.major.start-A.bounds.lower+N*A.major.tick);
M.createLine({x1:L.l,y1:J,x2:K.width-L.r,y2:J}).setStroke(O.majorTick)
}}A=this._hAxis.getScaler();
if(this.opt.vMinorLines&&A.minor.tick){for(var N=0;
N<A.minor.count;
++N){var P=L.l+A.scale*(A.minor.start-A.bounds.lower+N*A.minor.tick);
M.createLine({x1:P,y1:L.t,x2:P,y2:K.height-L.b}).setStroke(O.minorTick)
}}if(this.opt.vMajorLines&&A.major.tick){for(var N=0;
N<A.major.count;
++N){var P=L.l+A.scale*(A.major.start-A.bounds.lower+N*A.major.tick);
M.createLine({x1:P,y1:L.t,x2:P,y2:K.height-L.b}).setStroke(O.majorTick)
}}this.dirty=false;
return this
}})
})()
};