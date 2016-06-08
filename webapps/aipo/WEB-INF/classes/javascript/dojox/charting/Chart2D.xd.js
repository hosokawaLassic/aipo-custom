dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Chart2D"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.charting.Theme"],["require","dojox.charting.Series"],["require","dojox.charting.axis2d.Default"],["require","dojox.charting.plot2d.Default"],["require","dojox.charting.plot2d.Lines"],["require","dojox.charting.plot2d.Areas"],["require","dojox.charting.plot2d.Markers"],["require","dojox.charting.plot2d.MarkersOnly"],["require","dojox.charting.plot2d.Scatter"],["require","dojox.charting.plot2d.Stacked"],["require","dojox.charting.plot2d.StackedLines"],["require","dojox.charting.plot2d.StackedAreas"],["require","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.StackedColumns"],["require","dojox.charting.plot2d.ClusteredColumns"],["require","dojox.charting.plot2d.Bars"],["require","dojox.charting.plot2d.StackedBars"],["require","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.Grid"],["require","dojox.charting.plot2d.Pie"]],defineResource:function(B){if(!B._hasResource["dojox.charting.Chart2D"]){B._hasResource["dojox.charting.Chart2D"]=true;
B.provide("dojox.charting.Chart2D");
B.require("dojox.gfx");
B.require("dojox.lang.functional");
B.require("dojox.charting.Theme");
B.require("dojox.charting.Series");
B.require("dojox.charting.axis2d.Default");
B.require("dojox.charting.plot2d.Default");
B.require("dojox.charting.plot2d.Lines");
B.require("dojox.charting.plot2d.Areas");
B.require("dojox.charting.plot2d.Markers");
B.require("dojox.charting.plot2d.MarkersOnly");
B.require("dojox.charting.plot2d.Scatter");
B.require("dojox.charting.plot2d.Stacked");
B.require("dojox.charting.plot2d.StackedLines");
B.require("dojox.charting.plot2d.StackedAreas");
B.require("dojox.charting.plot2d.Columns");
B.require("dojox.charting.plot2d.StackedColumns");
B.require("dojox.charting.plot2d.ClusteredColumns");
B.require("dojox.charting.plot2d.Bars");
B.require("dojox.charting.plot2d.StackedBars");
B.require("dojox.charting.plot2d.ClusteredBars");
B.require("dojox.charting.plot2d.Grid");
B.require("dojox.charting.plot2d.Pie");
(function(){var A=dojox.lang.functional,M=dojox.charting,N=A.lambda("item.clear()"),L=A.lambda("item.purgeGroup()"),I=A.lambda("item.destroy()"),K=A.lambda("item.dirty = false"),J=A.lambda("item.dirty = true");
B.declare("dojox.charting.Chart2D",null,{constructor:function(C,E){if(!E){E={}
}this.margins=E.margins?E.margins:{l:10,t:10,r:10,b:10};
this.stroke=E.stroke;
this.fill=E.fill;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=B.byId(C);
var D=B.marginBox(C);
this.surface=dojox.gfx.createSurface(this.node,D.w,D.h)
},destroy:function(){B.forEach(this.series,I);
B.forEach(this.stack,I);
A.forIn(this.axes,I)
},getCoords:function(){if(!this.coords){this.coords=B.coords(this.node,true)
}return this.coords
},setTheme:function(C){this.theme=C;
this.dirty=true;
return this
},addAxis:function(E,D){var C;
if(!D||!("type" in D)){C=new M.axis2d.Default(this,D)
}else{C=typeof D.type=="string"?new M.axis2d[D.type](this,D):new D.type(this,D)
}C.name=E;
C.dirty=true;
if(E in this.axes){this.axes[E].destroy()
}this.axes[E]=C;
this.dirty=true;
return this
},addPlot:function(E,D){var C;
if(!D||!("type" in D)){C=new M.plot2d.Default(this,D)
}else{C=typeof D.type=="string"?new M.plot2d[D.type](this,D):new D.type(this,D)
}C.name=E;
C.dirty=true;
if(E in this.plots){this.stack[this.plots[E]].destroy();
this.stack[this.plots[E]]=C
}else{this.plots[E]=this.stack.length;
this.stack.push(C)
}this.dirty=true;
return this
},addSeries:function(F,D,E){var C=new M.Series(this,D,E);
if(F in this.runs){this.series[this.runs[F]].destroy();
this.series[this.runs[F]]=C
}else{this.runs[F]=this.series.length;
this.series.push(C)
}this.dirty=true;
if(!("ymin" in C)&&"min" in C){C.ymin=C.min
}if(!("ymax" in C)&&"max" in C){C.ymax=C.max
}return this
},updateSeries:function(F,D){if(F in this.runs){var G=this.series[this.runs[F]],C=this.stack[this.plots[G.plot]],E;
G.data=D;
G.dirty=true;
if(C.hAxis){E=this.axes[C.hAxis];
if(E.dependOnData()){E.dirty=true;
B.forEach(this.stack,function(H){if(H.hAxis&&H.hAxis==C.hAxis){H.dirty=true
}})
}}else{C.dirty=true
}if(C.vAxis){E=this.axes[C.vAxis];
if(E.dependOnData()){E.dirty=true;
B.forEach(this.stack,function(H){if(H.vAxis&&H.vAxis==C.vAxis){H.dirty=true
}})
}}else{C.dirty=true
}}return this
},resize:function(D,E){var C;
switch(arguments.length){case 0:C=B.marginBox(this.node);
break;
case 1:C=D;
break;
default:C={w:D,h:E};
break
}B.marginBox(this.node,C);
this.surface.setDimensions(C.w,C.h);
this.dirty=true;
this.coords=null;
return this.render()
},render:function(){if(this.dirty){return this.fullRender()
}B.forEach(this.stack,function(C){if(C.dirty||(C.hAxis&&this.axes[C.hAxis].dirty)||(C.vAxis&&this.axes[C.vAxis].dirty)){C.calculateAxes(this.plotArea)
}},this);
A.forEachReversed(this.stack,function(C){C.render(this.dim,this.offsets)
},this);
A.forIn(this.axes,function(C){C.render(this.dim,this.offsets)
},this);
this._makeClean();
if(this.surface.render){this.surface.render()
}return this
},fullRender:function(){this._makeDirty();
B.forEach(this.stack,N);
B.forEach(this.series,L);
A.forIn(this.axes,L);
B.forEach(this.stack,L);
this.surface.clear();
B.forEach(this.series,function(Q){if(!(Q.plot in this.plots)){var R=new M.plot2d.Default(this,{});
R.name=Q.plot;
this.plots[Q.plot]=this.stack.length;
this.stack.push(R)
}this.stack[this.plots[Q.plot]].addSeries(Q)
},this);
B.forEach(this.stack,function(P){if(P.hAxis){P.setAxis(this.axes[P.hAxis])
}if(P.vAxis){P.setAxis(this.axes[P.vAxis])
}},this);
if(!this.theme){this.theme=new dojox.charting.Theme(dojox.charting._def)
}var E=A.foldl(this.stack,"z + plot.getRequiredColors()",0);
this.theme.defineColors({num:E,cache:false});
var G=this.dim=this.surface.getDimensions();
G.width=dojox.gfx.normalizedLength(G.width);
G.height=dojox.gfx.normalizedLength(G.height);
A.forIn(this.axes,N);
B.forEach(this.stack,function(P){P.calculateAxes(G)
});
var D=this.offsets={l:0,r:0,t:0,b:0};
A.forIn(this.axes,function(P){A.forIn(P.getOffsets(),function(O,R){D[R]+=O
})
});
A.forIn(this.margins,function(Q,R){D[R]+=Q
});
this.plotArea={width:G.width-D.l-D.r,height:G.height-D.t-D.b};
A.forIn(this.axes,N);
B.forEach(this.stack,function(P){P.calculateAxes(this.plotArea)
},this);
var F=this.theme,H=this.fill?this.fill:(F.chart&&F.chart.fill),C=this.stroke?this.stroke:(F.chart&&F.chart.stroke);
if(H){this.surface.createRect({width:G.width,height:G.height}).setFill(H)
}if(C){this.surface.createRect({width:G.width-1,height:G.height-1}).setStroke(C)
}H=F.plotarea&&F.plotarea.fill;
C=F.plotarea&&F.plotarea.stroke;
if(H){this.surface.createRect({x:D.l,y:D.t,width:G.width-D.l-D.r,height:G.height-D.t-D.b}).setFill(H)
}if(C){this.surface.createRect({x:D.l,y:D.t,width:G.width-D.l-D.r-1,height:G.height-D.t-D.b-1}).setStroke(C)
}A.foldr(this.stack,function(Q,R){return R.render(G,D),0
},0);
A.forIn(this.axes,function(P){P.render(G,D)
});
this._makeClean();
return this
},_makeClean:function(){B.forEach(this.axes,K);
B.forEach(this.stack,K);
B.forEach(this.series,K);
this.dirty=false
},_makeDirty:function(){B.forEach(this.axes,J);
B.forEach(this.stack,J);
B.forEach(this.series,J);
this.dirty=true
}})
})()
}}});