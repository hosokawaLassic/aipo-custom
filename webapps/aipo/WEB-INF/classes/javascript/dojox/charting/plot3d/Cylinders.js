if(!dojo._hasResource["dojox.charting.plot3d.Cylinders"]){dojo._hasResource["dojox.charting.plot3d.Cylinders"]=true;
dojo.provide("dojox.charting.plot3d.Cylinders");
dojo.require("dojox.charting.plot3d.Base");
(function(){var B=function(J,H,A){J=typeof J=="string"?J.split(""):J;
A=A||dojo.global;
var G=J[0];
for(var I=1;
I<J.length;
G=H.call(A,G,J[I++])){}return G
};
dojo.declare("dojox.charting.plot3d.Cylinders",dojox.charting.plot3d.Base,{constructor:function(A,G,F){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"shiny",color:"lime"};
this.outline=null;
if(F){if("depth" in F){this.depth=F.depth
}if("gap" in F){this.gap=F.gap
}if("material" in F){var H=F.material;
if(typeof H=="string"||H instanceof dojo.Color){this.material.color=H
}else{this.material=H
}}if("outline" in F){this.outline=F.outline
}}},getDepth:function(){if(this.depth=="auto"){var A=this.width;
if(this.data&&this.data.length){A=A/this.data.length
}return A-2*this.gap
}return this.depth
},generate:function(J,K){if(!this.data){return this
}var I=this.width/this.data.length,A=0,H=this.height/B(this.data,Math.max);
if(!K){K=J.view
}for(var L=0;
L<this.data.length;
++L,A+=I){K.createCylinder({center:{x:A+I/2,y:0,z:0},radius:I/2-this.gap,height:this.data[L]*H}).setTransform(dojox.gfx3d.matrix.rotateXg(-90)).setFill(this.material).setStroke(this.outline)
}}})
})()
};