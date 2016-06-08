dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Bars"],["require","dojox.charting.plot3d.Base"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot3d.Bars"]){B._hasResource["dojox.charting.plot3d.Bars"]=true;
B.provide("dojox.charting.plot3d.Bars");
B.require("dojox.charting.plot3d.Base");
(function(){var A=function(L,J,H){L=typeof L=="string"?L.split(""):L;
H=H||B.global;
var I=L[0];
for(var K=1;
K<L.length;
I=J.call(H,I,L[K++])){}return I
};
B.declare("dojox.charting.plot3d.Bars",dojox.charting.plot3d.Base,{constructor:function(G,I,H){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"dull",color:"lime"};
if(H){if("depth" in H){this.depth=H.depth
}if("gap" in H){this.gap=H.gap
}if("material" in H){var J=H.material;
if(typeof J=="string"||J instanceof B.Color){this.material.color=J
}else{this.material=J
}}}},getDepth:function(){if(this.depth=="auto"){var D=this.width;
if(this.data&&this.data.length){D=D/this.data.length
}return D-2*this.gap
}return this.depth
},generate:function(N,O){if(!this.data){return this
}var M=this.width/this.data.length,J=0,K=this.depth=="auto"?M-2*this.gap:this.depth,L=this.height/A(this.data,Math.max);
if(!O){O=N.view
}for(var P=0;
P<this.data.length;
++P,J+=M){O.createCube({bottom:{x:J+this.gap,y:0,z:0},top:{x:J+M-this.gap,y:this.data[P]*L,z:K}}).setFill(this.material)
}}})
})()
}}});