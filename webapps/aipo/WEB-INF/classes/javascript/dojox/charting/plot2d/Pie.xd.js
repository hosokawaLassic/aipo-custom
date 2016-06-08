dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Pie"],["require","dojox.charting.Element"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.plot2d.common"],["require","dojox.lang.functional"],["require","dojox.gfx"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Pie"]){B._hasResource["dojox.charting.plot2d.Pie"]=true;
B.provide("dojox.charting.plot2d.Pie");
B.require("dojox.charting.Element");
B.require("dojox.charting.axis2d.common");
B.require("dojox.charting.plot2d.common");
B.require("dojox.lang.functional");
B.require("dojox.gfx");
(function(){var A=dojox.lang.functional,I=dojox.lang.utils,K=dojox.charting.plot2d.common,J=dojox.charting.axis2d.common,H=dojox.gfx,L=0.8;
B.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(C,D){this.opt=B.clone(this.defaultParams);
I.updateWithObject(this.opt,D);
I.updateWithPattern(this.opt,D,this.optionalParams);
this.run=null;
this.dyn=[]
},clear:function(){this.dirty=true;
this.dyn=[];
return this
},setAxis:function(C){return this
},addSeries:function(C){this.run=C;
return this
},calculateAxes:function(C){return this
},getRequiredColors:function(){return this.run?this.run.data.length:0
},render:function(E,h){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var e=this.group,F,f=this.chart.theme;
var i=(E.width-h.l-h.r)/2,j=(E.height-h.t-h.b)/2,c=Math.min(i,j),q="font" in this.opt?this.opt.font:f.axis.font,n="fontColor" in this.opt?this.opt.fontColor:f.axis.fontColor,m=A.foldl1(this.run.data,"+"),k=0,g,o=B.map(this.run.data,function(M){return M/m
}),D,G,d;
if(this.opt.labels){var r=B.map(o,function(M){return this._getLabel(M*100)+"%"
},this);
D=A.foldl1(B.map(r,A.pluck("length")),"x, y -> Math.max(x, y)");
G=q?H.normalizedLength(H.splitFontString(q).size):0;
D=Math.max(D*L,1)/2*G;
if(this.opt.labelOffset<0){c=Math.min(i-2*D,j-G)+this.opt.labelOffset
}d=c-this.opt.labelOffset
}if("radius" in this.opt){c=this.opt.radius;
d=c-this.opt.labelOffset
}var l={cx:h.l+i,cy:h.t+j,r:c};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){F=new B.Color(f.next("color"));
var p=e.createCircle(l).setFill(K.augmentFill(f.run.fill,F)).setStroke(K.augmentStroke(f.series.stroke,F));
this.dyn.push({color:F,fill:p.getFill(),stroke:p.getStroke()});
if(this.opt.labels){var D=4,q="font" in this.opt?this.opt.font:f.axis.font,n="fontColor" in this.opt?this.opt.fontColor:f.axis.fontColor,G=q?H.normalizedLength(H.splitFontString(q).size):0;
D=Math.max(D*L,1)/2*G;
var C=J.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,e,l.cx,l.cy+G/2,"middle","100%",q,n);
if(this.opt.htmlLabels){this.htmlElements.push(C)
}}return this
}B.forEach(o,function(M,Q){var R=k+M*2*Math.PI;
if(Q+1==o.length){R=2*Math.PI
}var S=R-k,T=l.cx+c*Math.cos(k),N=l.cy+c*Math.sin(k),U=l.cx+c*Math.cos(R),O=l.cy+c*Math.sin(R);
F=new B.Color(f.next("color"));
var P=e.createPath({}).moveTo(l.cx,l.cy).lineTo(T,N).arcTo(c,c,0,S>Math.PI,true,U,O).lineTo(l.cx,l.cy).closePath().setFill(K.augmentFill(f.series.fill,F)).setStroke(K.augmentStroke(f.series.stroke,F));
this.dyn.push({color:F,fill:P.getFill(),stroke:P.getStroke()});
k=R
},this);
if(this.opt.labels){k=0;
B.forEach(o,function(R,O){var Q=k+R*2*Math.PI;
if(O+1==o.length){Q=2*Math.PI
}var P=(k+Q)/2,R=l.cx+d*Math.cos(P),M=l.cy+d*Math.sin(P)+G/2;
var N=J.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,e,R,M,"middle",r[O],q,n);
if(this.opt.htmlLabels){this.htmlElements.push(N)
}k=Q
},this)
}return this
},_getLabel:function(C){return this.opt.fixed?C.toFixed(this.opt.precision):C.toString()
}})
})()
}}});