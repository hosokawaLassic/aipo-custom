if(!dojo._hasResource["dojox.charting.plot2d.Pie"]){dojo._hasResource["dojox.charting.plot2d.Pie"]=true;
dojo.provide("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
dojo.require("dojox.gfx");
(function(){var H=dojox.lang.functional,J=dojox.lang.utils,L=dojox.charting.plot2d.common,K=dojox.charting.axis2d.common,I=dojox.gfx,G=0.8;
dojo.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(A,B){this.opt=dojo.clone(this.defaultParams);
J.updateWithObject(this.opt,B);
J.updateWithPattern(this.opt,B,this.optionalParams);
this.run=null;
this.dyn=[]
},clear:function(){this.dirty=true;
this.dyn=[];
return this
},setAxis:function(A){return this
},addSeries:function(A){this.run=A;
return this
},calculateAxes:function(A){return this
},getRequiredColors:function(){return this.run?this.run.data.length:0
},render:function(D,g){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var d=this.group,E,e=this.chart.theme;
var h=(D.width-g.l-g.r)/2,i=(D.height-g.t-g.b)/2,b=Math.min(h,i),p="font" in this.opt?this.opt.font:e.axis.font,m="fontColor" in this.opt?this.opt.fontColor:e.axis.fontColor,l=H.foldl1(this.run.data,"+"),j=0,f,n=dojo.map(this.run.data,function(M){return M/l
}),C,F,c;
if(this.opt.labels){var A=dojo.map(n,function(M){return this._getLabel(M*100)+"%"
},this);
C=H.foldl1(dojo.map(A,H.pluck("length")),"x, y -> Math.max(x, y)");
F=p?I.normalizedLength(I.splitFontString(p).size):0;
C=Math.max(C*G,1)/2*F;
if(this.opt.labelOffset<0){b=Math.min(h-2*C,i-F)+this.opt.labelOffset
}c=b-this.opt.labelOffset
}if("radius" in this.opt){b=this.opt.radius;
c=b-this.opt.labelOffset
}var k={cx:g.l+h,cy:g.t+i,r:b};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){E=new dojo.Color(e.next("color"));
var o=d.createCircle(k).setFill(L.augmentFill(e.run.fill,E)).setStroke(L.augmentStroke(e.series.stroke,E));
this.dyn.push({color:E,fill:o.getFill(),stroke:o.getStroke()});
if(this.opt.labels){var C=4,p="font" in this.opt?this.opt.font:e.axis.font,m="fontColor" in this.opt?this.opt.fontColor:e.axis.fontColor,F=p?I.normalizedLength(I.splitFontString(p).size):0;
C=Math.max(C*G,1)/2*F;
var B=K.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,d,k.cx,k.cy+F/2,"middle","100%",p,m);
if(this.opt.htmlLabels){this.htmlElements.push(B)
}}return this
}dojo.forEach(n,function(M,Q){var R=j+M*2*Math.PI;
if(Q+1==n.length){R=2*Math.PI
}var S=R-j,T=k.cx+b*Math.cos(j),N=k.cy+b*Math.sin(j),U=k.cx+b*Math.cos(R),O=k.cy+b*Math.sin(R);
E=new dojo.Color(e.next("color"));
var P=d.createPath({}).moveTo(k.cx,k.cy).lineTo(T,N).arcTo(b,b,0,S>Math.PI,true,U,O).lineTo(k.cx,k.cy).closePath().setFill(L.augmentFill(e.series.fill,E)).setStroke(L.augmentStroke(e.series.stroke,E));
this.dyn.push({color:E,fill:P.getFill(),stroke:P.getStroke()});
j=R
},this);
if(this.opt.labels){j=0;
dojo.forEach(n,function(M,P){var R=j+M*2*Math.PI;
if(P+1==n.length){R=2*Math.PI
}var Q=(j+R)/2,M=k.cx+c*Math.cos(Q),N=k.cy+c*Math.sin(Q)+F/2;
var O=K.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,d,M,N,"middle",A[P],p,m);
if(this.opt.htmlLabels){this.htmlElements.push(O)
}j=R
},this)
}return this
},_getLabel:function(A){return this.opt.fixed?A.toFixed(this.opt.precision):A.toString()
}})
})()
};