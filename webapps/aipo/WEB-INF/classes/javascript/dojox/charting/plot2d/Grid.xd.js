dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Grid"],["require","dojox.charting.Element"],["require","dojox.charting.plot2d.common"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Grid"]){B._hasResource["dojox.charting.plot2d.Grid"]=true;
B.provide("dojox.charting.plot2d.Grid");
B.require("dojox.charting.Element");
B.require("dojox.charting.plot2d.common");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.utils;
B.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none"},optionalParams:{},constructor:function(E,F){this.opt=B.clone(this.defaultParams);
A.updateWithObject(this.opt,F);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},clear:function(){this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(D){if(D){this[D.vertical?"_vAxis":"_hAxis"]=D
}return this
},addSeries:function(D){return this
},calculateAxes:function(D){return this
},getRequiredColors:function(){return 0
},render:function(M,N){if(!this.dirty){return this
}this.cleanGroup();
var O=this.group,Q=this.chart.theme.axis,K=this._vAxis.getScaler();
if(this.opt.hMinorLines&&K.minor.tick){for(var P=0;
P<K.minor.count;
++P){var L=M.height-N.b-K.scale*(K.minor.start-K.bounds.lower+P*K.minor.tick);
O.createLine({x1:N.l,y1:L,x2:M.width-N.r,y2:L}).setStroke(Q.minorTick)
}}if(this.opt.hMajorLines&&K.major.tick){for(var P=0;
P<K.major.count;
++P){var L=M.height-N.b-K.scale*(K.major.start-K.bounds.lower+P*K.major.tick);
O.createLine({x1:N.l,y1:L,x2:M.width-N.r,y2:L}).setStroke(Q.majorTick)
}}K=this._hAxis.getScaler();
if(this.opt.vMinorLines&&K.minor.tick){for(var P=0;
P<K.minor.count;
++P){var R=N.l+K.scale*(K.minor.start-K.bounds.lower+P*K.minor.tick);
O.createLine({x1:R,y1:N.t,x2:R,y2:M.height-N.b}).setStroke(Q.minorTick)
}}if(this.opt.vMajorLines&&K.major.tick){for(var P=0;
P<K.major.count;
++P){var R=N.l+K.scale*(K.major.start-K.bounds.lower+P*K.major.tick);
O.createLine({x1:R,y1:N.t,x2:R,y2:M.height-N.b}).setStroke(Q.majorTick)
}}this.dirty=false;
return this
}})
})()
}}});