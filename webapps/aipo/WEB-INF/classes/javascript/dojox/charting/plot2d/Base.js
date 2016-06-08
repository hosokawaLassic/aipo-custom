if(!dojo._hasResource["dojox.charting.plot2d.Base"]){dojo._hasResource["dojox.charting.plot2d.Base"]=true;
dojo.provide("dojox.charting.plot2d.Base");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.plot2d.common");
dojo.declare("dojox.charting.plot2d.Base",dojox.charting.Element,{clear:function(){this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(B){if(B){this[B.vertical?"_vAxis":"_hAxis"]=B
}return this
},addSeries:function(B){this.series.push(B);
return this
},calculateAxes:function(B){return this
},render:function(D,C){return this
},getRequiredColors:function(){return this.series.length
},_calc:function(D,C){if(this._hAxis){if(!this._hAxis.initialized()){this._hAxis.calculate(C.hmin,C.hmax,D.width)
}this._hScaler=this._hAxis.getScaler()
}else{this._hScaler={bounds:{lower:C.hmin,upper:C.hmax},scale:D.width/(C.hmax-C.hmin)}
}if(this._vAxis){if(!this._vAxis.initialized()){this._vAxis.calculate(C.vmin,C.vmax,D.height)
}this._vScaler=this._vAxis.getScaler()
}else{this._vScaler={bounds:{lower:C.vmin,upper:C.vmax},scale:D.height/(C.vmax-C.vmin)}
}}})
};