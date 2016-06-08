if(!dojo._hasResource["dojox.charting.plot2d.Default"]){dojo._hasResource["dojox.charting.plot2d.Default"]=true;
dojo.provide("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var F=dojox.lang.functional,H=dojox.lang.utils,E=dojox.charting.plot2d.common,G=F.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(A,B){this.opt=dojo.clone(this.defaultParams);
H.updateWithObject(this.opt,B);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(A){this._calc(A,E.collectSimpleStats(this.series));
return this
},render:function(Z,e){if(this.dirty){dojo.forEach(this.series,G);
this.cleanGroup();
var A=this.group;
F.forEachReversed(this.series,function(I){I.cleanGroup(A)
})
}var B=this.chart.theme,C,h,d,b;
for(var c=this.series.length-1;
c>=0;
--c){var f=this.series[c];
if(!this.dirty&&!f.dirty){continue
}f.cleanGroup();
if(!f.data.length){f.dirty=false;
continue
}var A=f.group,V;
if(typeof f.data[0]=="number"){V=dojo.map(f.data,function(J,I){return{x:this._hScaler.scale*(I+1-this._hScaler.bounds.lower)+e.l,y:Z.height-e.b-this._vScaler.scale*(J-this._vScaler.bounds.lower)}
},this)
}else{V=dojo.map(f.data,function(J,I){return{x:this._hScaler.scale*(J.x-this._hScaler.bounds.lower)+e.l,y:Z.height-e.b-this._vScaler.scale*(J.y-this._vScaler.bounds.lower)}
},this)
}if(!f.fill||!f.stroke){d=f.dyn.color=new dojo.Color(B.next("color"))
}if(this.opt.areas){var W=dojo.clone(V);
W.push({x:V[V.length-1].x,y:Z.height-e.b});
W.push({x:V[0].x,y:Z.height-e.b});
W.push(V[0]);
var D=f.fill?f.fill:E.augmentFill(B.series.fill,d);
f.dyn.fill=A.createPolyline(W).setFill(D).getFill()
}if(this.opt.lines||this.opt.markers){C=f.stroke?E.makeStroke(f.stroke):E.augmentStroke(B.series.stroke,d);
if(f.outline||B.series.outline){h=E.makeStroke(f.outline?f.outline:B.series.outline);
h.width=2*h.width+C.width
}}if(this.opt.markers){b=f.dyn.marker=f.marker?f.marker:B.next("marker")
}if(this.opt.shadows&&C){var a=this.opt.shadows,X=new dojo.Color([0,0,0,0.3]),g=dojo.map(V,function(I){return{x:I.x+a.dx,y:I.y+a.dy}
}),Y=dojo.clone(h?h:C);
Y.color=X;
Y.width+=a.dw?a.dw:0;
if(this.opt.lines){A.createPolyline(g).setStroke(Y)
}if(this.opt.markers){dojo.forEach(g,function(I){A.createPath("M"+I.x+" "+I.y+" "+b).setStroke(Y).setFill(X)
},this)
}}if(this.opt.lines){if(h){f.dyn.outline=A.createPolyline(V).setStroke(h).getStroke()
}f.dyn.stroke=A.createPolyline(V).setStroke(C).getStroke()
}if(this.opt.markers){dojo.forEach(V,function(I){var J="M"+I.x+" "+I.y+" "+b;
if(h){A.createPath(J).setStroke(h)
}A.createPath(J).setStroke(C).setFill(C.color)
},this)
}f.dirty=false
}this.dirty=false;
return this
}})
})()
};