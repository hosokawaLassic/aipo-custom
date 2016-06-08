if(!dojo._hasResource["dojox.charting.Chart2D"]){dojo._hasResource["dojox.charting.Chart2D"]=true;
dojo.provide("dojox.charting.Chart2D");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
dojo.require("dojox.charting.Theme");
dojo.require("dojox.charting.Series");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.plot2d.Lines");
dojo.require("dojox.charting.plot2d.Areas");
dojo.require("dojox.charting.plot2d.Markers");
dojo.require("dojox.charting.plot2d.MarkersOnly");
dojo.require("dojox.charting.plot2d.Scatter");
dojo.require("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.StackedLines");
dojo.require("dojox.charting.plot2d.StackedAreas");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.StackedColumns");
dojo.require("dojox.charting.plot2d.ClusteredColumns");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.StackedBars");
dojo.require("dojox.charting.plot2d.ClusteredBars");
dojo.require("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.plot2d.Pie");
(function(){var I=dojox.lang.functional,N=dojox.charting,H=I.lambda("item.clear()"),M=I.lambda("item.purgeGroup()"),J=I.lambda("item.destroy()"),L=I.lambda("item.dirty = false"),K=I.lambda("item.dirty = true");
dojo.declare("dojox.charting.Chart2D",null,{constructor:function(A,C){if(!C){C={}
}this.margins=C.margins?C.margins:{l:10,t:10,r:10,b:10};
this.stroke=C.stroke;
this.fill=C.fill;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=dojo.byId(A);
var B=dojo.marginBox(A);
this.surface=dojox.gfx.createSurface(this.node,B.w,B.h)
},destroy:function(){dojo.forEach(this.series,J);
dojo.forEach(this.stack,J);
I.forIn(this.axes,J)
},getCoords:function(){if(!this.coords){this.coords=dojo.coords(this.node,true)
}return this.coords
},setTheme:function(A){this.theme=A;
this.dirty=true;
return this
},addAxis:function(C,B){var A;
if(!B||!("type" in B)){A=new N.axis2d.Default(this,B)
}else{A=typeof B.type=="string"?new N.axis2d[B.type](this,B):new B.type(this,B)
}A.name=C;
A.dirty=true;
if(C in this.axes){this.axes[C].destroy()
}this.axes[C]=A;
this.dirty=true;
return this
},addPlot:function(C,B){var A;
if(!B||!("type" in B)){A=new N.plot2d.Default(this,B)
}else{A=typeof B.type=="string"?new N.plot2d[B.type](this,B):new B.type(this,B)
}A.name=C;
A.dirty=true;
if(C in this.plots){this.stack[this.plots[C]].destroy();
this.stack[this.plots[C]]=A
}else{this.plots[C]=this.stack.length;
this.stack.push(A)
}this.dirty=true;
return this
},addSeries:function(D,B,C){var A=new N.Series(this,B,C);
if(D in this.runs){this.series[this.runs[D]].destroy();
this.series[this.runs[D]]=A
}else{this.runs[D]=this.series.length;
this.series.push(A)
}this.dirty=true;
if(!("ymin" in A)&&"min" in A){A.ymin=A.min
}if(!("ymax" in A)&&"max" in A){A.ymax=A.max
}return this
},updateSeries:function(E,C){if(E in this.runs){var A=this.series[this.runs[E]],B=this.stack[this.plots[A.plot]],D;
A.data=C;
A.dirty=true;
if(B.hAxis){D=this.axes[B.hAxis];
if(D.dependOnData()){D.dirty=true;
dojo.forEach(this.stack,function(F){if(F.hAxis&&F.hAxis==B.hAxis){F.dirty=true
}})
}}else{B.dirty=true
}if(B.vAxis){D=this.axes[B.vAxis];
if(D.dependOnData()){D.dirty=true;
dojo.forEach(this.stack,function(F){if(F.vAxis&&F.vAxis==B.vAxis){F.dirty=true
}})
}}else{B.dirty=true
}}return this
},resize:function(B,C){var A;
switch(arguments.length){case 0:A=dojo.marginBox(this.node);
break;
case 1:A=B;
break;
default:A={w:B,h:C};
break
}dojo.marginBox(this.node,A);
this.surface.setDimensions(A.w,A.h);
this.dirty=true;
this.coords=null;
return this.render()
},render:function(){if(this.dirty){return this.fullRender()
}dojo.forEach(this.stack,function(A){if(A.dirty||(A.hAxis&&this.axes[A.hAxis].dirty)||(A.vAxis&&this.axes[A.vAxis].dirty)){A.calculateAxes(this.plotArea)
}},this);
I.forEachReversed(this.stack,function(A){A.render(this.dim,this.offsets)
},this);
I.forIn(this.axes,function(A){A.render(this.dim,this.offsets)
},this);
this._makeClean();
if(this.surface.render){this.surface.render()
}return this
},fullRender:function(){this._makeDirty();
dojo.forEach(this.stack,H);
dojo.forEach(this.series,M);
I.forIn(this.axes,M);
dojo.forEach(this.stack,M);
this.surface.clear();
dojo.forEach(this.series,function(G){if(!(G.plot in this.plots)){var P=new N.plot2d.Default(this,{});
P.name=G.plot;
this.plots[G.plot]=this.stack.length;
this.stack.push(P)
}this.stack[this.plots[G.plot]].addSeries(G)
},this);
dojo.forEach(this.stack,function(G){if(G.hAxis){G.setAxis(this.axes[G.hAxis])
}if(G.vAxis){G.setAxis(this.axes[G.vAxis])
}},this);
if(!this.theme){this.theme=new dojox.charting.Theme(dojox.charting._def)
}var D=I.foldl(this.stack,"z + plot.getRequiredColors()",0);
this.theme.defineColors({num:D,cache:false});
var F=this.dim=this.surface.getDimensions();
F.width=dojox.gfx.normalizedLength(F.width);
F.height=dojox.gfx.normalizedLength(F.height);
I.forIn(this.axes,H);
dojo.forEach(this.stack,function(G){G.calculateAxes(F)
});
var C=this.offsets={l:0,r:0,t:0,b:0};
I.forIn(this.axes,function(G){I.forIn(G.getOffsets(),function(Q,R){C[R]+=Q
})
});
I.forIn(this.margins,function(G,P){C[P]+=G
});
this.plotArea={width:F.width-C.l-C.r,height:F.height-C.t-C.b};
I.forIn(this.axes,H);
dojo.forEach(this.stack,function(G){G.calculateAxes(this.plotArea)
},this);
var E=this.theme,A=this.fill?this.fill:(E.chart&&E.chart.fill),B=this.stroke?this.stroke:(E.chart&&E.chart.stroke);
if(A){this.surface.createRect({width:F.width,height:F.height}).setFill(A)
}if(B){this.surface.createRect({width:F.width-1,height:F.height-1}).setStroke(B)
}A=E.plotarea&&E.plotarea.fill;
B=E.plotarea&&E.plotarea.stroke;
if(A){this.surface.createRect({x:C.l,y:C.t,width:F.width-C.l-C.r,height:F.height-C.t-C.b}).setFill(A)
}if(B){this.surface.createRect({x:C.l,y:C.t,width:F.width-C.l-C.r-1,height:F.height-C.t-C.b-1}).setStroke(B)
}I.foldr(this.stack,function(G,P){return P.render(F,C),0
},0);
I.forIn(this.axes,function(G){G.render(F,C)
});
this._makeClean();
return this
},_makeClean:function(){dojo.forEach(this.axes,L);
dojo.forEach(this.stack,L);
dojo.forEach(this.series,L);
this.dirty=false
},_makeDirty:function(){dojo.forEach(this.axes,K);
dojo.forEach(this.stack,K);
dojo.forEach(this.series,K);
this.dirty=true
}})
})()
};