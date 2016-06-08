dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Cylinders"],["require","dojox.charting.plot3d.Base"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot3d.Cylinders"]){B._hasResource["dojox.charting.plot3d.Cylinders"]=true;
B.provide("dojox.charting.plot3d.Cylinders");
B.require("dojox.charting.plot3d.Base");
(function(){var A=function(L,J,H){L=typeof L=="string"?L.split(""):L;
H=H||B.global;
var I=L[0];
for(var K=1;
K<L.length;
I=J.call(H,I,L[K++])){}return I
};
B.declare("dojox.charting.plot3d.Cylinders",dojox.charting.plot3d.Base,{constructor:function(G,I,H){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"shiny",color:"lime"};
this.outline=null;
if(H){if("depth" in H){this.depth=H.depth
}if("gap" in H){this.gap=H.gap
}if("material" in H){var J=H.material;
if(typeof J=="string"||J instanceof B.Color){this.material.color=J
}else{this.material=J
}}if("outline" in H){this.outline=H.outline
}}},getDepth:function(){if(this.depth=="auto"){var D=this.width;
if(this.data&&this.data.length){D=D/this.data.length
}return D-2*this.gap
}return this.depth
},generate:function(L,M){if(!this.data){return this
}var K=this.width/this.data.length,I=0,J=this.height/A(this.data,Math.max);
if(!M){M=L.view
}for(var N=0;
N<this.data.length;
++N,I+=K){M.createCylinder({center:{x:I+K/2,y:0,z:0},radius:K/2-this.gap,height:this.data[N]*J}).setTransform(dojox.gfx3d.matrix.rotateXg(-90)).setFill(this.material).setStroke(this.outline)
}}})
})()
}}});