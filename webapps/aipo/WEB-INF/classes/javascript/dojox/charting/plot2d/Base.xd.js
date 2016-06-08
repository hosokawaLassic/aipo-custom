dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Base"],["require","dojox.charting.Element"],["require","dojox.charting.plot2d.common"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Base"]){B._hasResource["dojox.charting.plot2d.Base"]=true;
B.provide("dojox.charting.plot2d.Base");
B.require("dojox.charting.Element");
B.require("dojox.charting.plot2d.common");
B.declare("dojox.charting.plot2d.Base",dojox.charting.Element,{clear:function(){this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this
},setAxis:function(A){if(A){this[A.vertical?"_vAxis":"_hAxis"]=A
}return this
},addSeries:function(A){this.series.push(A);
return this
},calculateAxes:function(A){return this
},render:function(A,D){return this
},getRequiredColors:function(){return this.series.length
},_calc:function(A,D){if(this._hAxis){if(!this._hAxis.initialized()){this._hAxis.calculate(D.hmin,D.hmax,A.width)
}this._hScaler=this._hAxis.getScaler()
}else{this._hScaler={bounds:{lower:D.hmin,upper:D.hmax},scale:A.width/(D.hmax-D.hmin)}
}if(this._vAxis){if(!this._vAxis.initialized()){this._vAxis.calculate(D.vmin,D.vmax,A.height)
}this._vScaler=this._vAxis.getScaler()
}else{this._vScaler={bounds:{lower:D.vmin,upper:D.vmax},scale:A.height/(D.vmax-D.vmin)}
}}})
}}});