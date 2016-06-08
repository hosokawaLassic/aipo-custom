if(!dojo._hasResource["dojox.charting.Theme"]){dojo._hasResource["dojox.charting.Theme"]=true;
dojo.provide("dojox.charting.Theme");
dojo.require("dojox.charting._color");
(function(){var B=dojox.charting;
B.Theme=function(A){A=A||{};
this.chart=dojo.mixin(dojo.clone(B.Theme._def.chart),A.chart||{});
this.plotarea=dojo.mixin(dojo.clone(B.Theme._def.plotarea),A.plotarea||{});
this.axis=dojo.mixin(dojo.clone(B.Theme._def.axis),A.axis||{});
this.series=dojo.mixin(dojo.clone(B.Theme._def.series),A.series||{});
this.marker=dojo.mixin(dojo.clone(B.Theme._def.marker),A.marker||{});
this.markers=dojo.mixin(dojo.clone(B.Theme.Markers),A.markers||{});
this.colors=[];
this.antiAlias=("antiAlias" in A)?A.antiAlias:true;
this.assignColors=("assignColors" in A)?A.assignColors:true;
this.assignMarkers=("assignMarkers" in A)?A.assignMarkers:true;
this._colorCache=null;
A.colors=A.colors||B.Theme._def.colors;
dojo.forEach(A.colors,function(D){this.colors.push(D)
},this);
this._current={color:0,marker:0};
this._markers=[];
this._buildMarkerArray()
};
B.Theme.Markers={CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"};
B.Theme._def={chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},line:{color:"#ccc",width:1,style:"Dot",cap:"round"},majorTick:{color:"#666",width:1,length:6,position:"center"},minorTick:{color:"#666",width:0.8,length:3,position:"center"},font:"normal normal normal 7pt Tahoma",fontColor:"#333"},series:{outline:{width:2,color:"#ccc"},stroke:{width:2,color:"#333"},fill:"#ccc",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:1},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:["#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc"]};
dojo.extend(B.Theme,{defineColors:function(W){var U=W||{};
var P=false;
if(U.cache===undefined){P=true
}if(U.cache==true){P=true
}if(P){this._colorCache=U
}else{var R=this._colorCache||{};
U=dojo.mixin(dojo.clone(R),U)
}var T=[],Z=U.num||32;
if(U.colors){var Y=U.colors.length;
for(var V=0;
V<Z;
V++){T.push(U.colors[V%Y])
}this.colors=T
}else{if(U.hue){var Q=U.saturation||100;
var S=U.low||30;
var X=U.high||90;
var A=(X-S)/Z;
for(var V=0;
V<Z;
V++){T.push(B._color.fromHsb(U.hue,Q,S+(A*V)).toHex())
}this.colors=T
}else{if(U.stops){var Y=U.stops.length;
if(Y<2){throw new Error("dojox.charting.Theme::defineColors: when using stops to define a color range, you MUST specify at least 2 colors.")
}if(typeof (U.stops[0].offset)=="undefined"){var O=1/(Y-1);
for(var V=0;
V<Y;
V++){U.stops[V]={color:U.stops[V],offset:O*V}
}}U.stops[0].offset=0;
U.stops[Y-1].offset=1;
U.stops.sort(function(C,D){return C.offset-D.offset
});
T.push(U.stops[0].color.toHex());
T.push(U.stops[Y-1].color.toHex());
this.colors=T
}}}},_buildMarkerArray:function(){this._markers=[];
for(var A in this.markers){this._markers.push(this.markers[A])
}this._current.marker=0
},addMarker:function(D,A){this.markers[D]=A;
this._buildMarkerArray()
},setMarkers:function(A){this.markers=A;
this._buildMarkerArray()
},next:function(A){if(!A){A="color"
}if(A=="color"){return this.colors[this._current.color++%this.colors.length]
}else{if(A=="marker"){return this._markers[this._current.marker++%this._markers.length]
}}},clear:function(){this._current={color:0,marker:0}
}})
})()
};