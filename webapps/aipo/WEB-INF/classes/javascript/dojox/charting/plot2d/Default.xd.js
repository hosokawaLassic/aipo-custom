dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Default"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Default"]){B._hasResource["dojox.charting.plot2d.Default"]=true;
B.provide("dojox.charting.plot2d.Default");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Base");
B.require("dojox.lang.utils");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,G=dojox.lang.utils,H=dojox.charting.plot2d.common,F=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(C,D){this.opt=B.clone(this.defaultParams);
G.updateWithObject(this.opt,D);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(C){this._calc(C,H.collectSimpleStats(this.series));
return this
},render:function(b,g){if(this.dirty){B.forEach(this.series,F);
this.cleanGroup();
var C=this.group;
A.forEachReversed(this.series,function(I){I.cleanGroup(C)
})
}var D=this.chart.theme,E,j,f,d;
for(var e=this.series.length-1;
e>=0;
--e){var h=this.series[e];
if(!this.dirty&&!h.dirty){continue
}h.cleanGroup();
if(!h.data.length){h.dirty=false;
continue
}var C=h.group,X;
if(typeof h.data[0]=="number"){X=B.map(h.data,function(I,J){return{x:this._hScaler.scale*(J+1-this._hScaler.bounds.lower)+g.l,y:b.height-g.b-this._vScaler.scale*(I-this._vScaler.bounds.lower)}
},this)
}else{X=B.map(h.data,function(I,J){return{x:this._hScaler.scale*(I.x-this._hScaler.bounds.lower)+g.l,y:b.height-g.b-this._vScaler.scale*(I.y-this._vScaler.bounds.lower)}
},this)
}if(!h.fill||!h.stroke){f=h.dyn.color=new B.Color(D.next("color"))
}if(this.opt.areas){var Y=B.clone(X);
Y.push({x:X[X.length-1].x,y:b.height-g.b});
Y.push({x:X[0].x,y:b.height-g.b});
Y.push(X[0]);
var W=h.fill?h.fill:H.augmentFill(D.series.fill,f);
h.dyn.fill=C.createPolyline(Y).setFill(W).getFill()
}if(this.opt.lines||this.opt.markers){E=h.stroke?H.makeStroke(h.stroke):H.augmentStroke(D.series.stroke,f);
if(h.outline||D.series.outline){j=H.makeStroke(h.outline?h.outline:D.series.outline);
j.width=2*j.width+E.width
}}if(this.opt.markers){d=h.dyn.marker=h.marker?h.marker:D.next("marker")
}if(this.opt.shadows&&E){var c=this.opt.shadows,Z=new B.Color([0,0,0,0.3]),i=B.map(X,function(I){return{x:I.x+c.dx,y:I.y+c.dy}
}),a=B.clone(j?j:E);
a.color=Z;
a.width+=c.dw?c.dw:0;
if(this.opt.lines){C.createPolyline(i).setStroke(a)
}if(this.opt.markers){B.forEach(i,function(I){C.createPath("M"+I.x+" "+I.y+" "+d).setStroke(a).setFill(Z)
},this)
}}if(this.opt.lines){if(j){h.dyn.outline=C.createPolyline(X).setStroke(j).getStroke()
}h.dyn.stroke=C.createPolyline(X).setStroke(E).getStroke()
}if(this.opt.markers){B.forEach(X,function(J){var I="M"+J.x+" "+J.y+" "+d;
if(j){C.createPath(I).setStroke(j)
}C.createPath(I).setStroke(E).setFill(E.color)
},this)
}h.dirty=false
}this.dirty=false;
return this
}})
})()
}}});