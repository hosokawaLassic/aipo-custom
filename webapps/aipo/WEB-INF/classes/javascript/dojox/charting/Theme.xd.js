dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Theme"],["require","dojox.charting._color"]],defineResource:function(B){if(!B._hasResource["dojox.charting.Theme"]){B._hasResource["dojox.charting.Theme"]=true;
B.provide("dojox.charting.Theme");
B.require("dojox.charting._color");
(function(){var A=dojox.charting;
A.Theme=function(D){D=D||{};
this.chart=B.mixin(B.clone(A.Theme._def.chart),D.chart||{});
this.plotarea=B.mixin(B.clone(A.Theme._def.plotarea),D.plotarea||{});
this.axis=B.mixin(B.clone(A.Theme._def.axis),D.axis||{});
this.series=B.mixin(B.clone(A.Theme._def.series),D.series||{});
this.marker=B.mixin(B.clone(A.Theme._def.marker),D.marker||{});
this.markers=B.mixin(B.clone(A.Theme.Markers),D.markers||{});
this.colors=[];
this.antiAlias=("antiAlias" in D)?D.antiAlias:true;
this.assignColors=("assignColors" in D)?D.assignColors:true;
this.assignMarkers=("assignMarkers" in D)?D.assignMarkers:true;
this._colorCache=null;
D.colors=D.colors||A.Theme._def.colors;
B.forEach(D.colors,function(C){this.colors.push(C)
},this);
this._current={color:0,marker:0};
this._markers=[];
this._buildMarkerArray()
};
A.Theme.Markers={CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"};
A.Theme._def={chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},line:{color:"#ccc",width:1,style:"Dot",cap:"round"},majorTick:{color:"#666",width:1,length:6,position:"center"},minorTick:{color:"#666",width:0.8,length:3,position:"center"},font:"normal normal normal 7pt Tahoma",fontColor:"#333"},series:{outline:{width:2,color:"#ccc"},stroke:{width:2,color:"#333"},fill:"#ccc",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:1},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:["#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc"]};
B.extend(A.Theme,{defineColors:function(X){var V=X||{};
var Q=false;
if(V.cache===undefined){Q=true
}if(V.cache==true){Q=true
}if(Q){this._colorCache=V
}else{var S=this._colorCache||{};
V=B.mixin(B.clone(S),V)
}var U=[],a=V.num||32;
if(V.colors){var Z=V.colors.length;
for(var W=0;
W<a;
W++){U.push(V.colors[W%Z])
}this.colors=U
}else{if(V.hue){var R=V.saturation||100;
var T=V.low||30;
var Y=V.high||90;
var b=(Y-T)/a;
for(var W=0;
W<a;
W++){U.push(A._color.fromHsb(V.hue,R,T+(b*W)).toHex())
}this.colors=U
}else{if(V.stops){var Z=V.stops.length;
if(Z<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (V.stops[0].offset)=="undefined"){var P=1/(Z-1);
for(var W=0;
W<Z;
W++){V.stops[W]={color:V.stops[W],offset:P*W}
}}V.stops[0].offset=0;
V.stops[Z-1].offset=1;
V.stops.sort(function(C,D){return C.offset-D.offset
});
U.push(V.stops[0].color.toHex());
U.push(V.stops[Z-1].color.toHex());
this.colors=U
}}}},_buildMarkerArray:function(){this._markers=[];
for(var D in this.markers){this._markers.push(this.markers[D])
}this._current.marker=0
},addMarker:function(F,E){this.markers[F]=E;
this._buildMarkerArray()
},setMarkers:function(D){this.markers=D;
this._buildMarkerArray()
},next:function(D){if(!D){D="color"
}if(D=="color"){return this.colors[this._current.color++%this.colors.length]
}else{if(D=="marker"){return this._markers[this._current.marker++%this._markers.length]
}}},clear:function(){this._current={color:0,marker:0}
}})
})()
}}});