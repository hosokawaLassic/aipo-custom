if(!dojo._hasResource["dojox.charting.plot3d.Bars"]){dojo._hasResource["dojox.charting.plot3d.Bars"]=true;
dojo.provide("dojox.charting.plot3d.Bars");
dojo.require("dojox.charting.plot3d.Base");
(function(){var B=function(J,H,A){J=typeof J=="string"?J.split(""):J;
A=A||dojo.global;
var G=J[0];
for(var I=1;
I<J.length;
G=H.call(A,G,J[I++])){}return G
};
dojo.declare("dojox.charting.plot3d.Bars",dojox.charting.plot3d.Base,{constructor:function(A,G,F){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"dull",color:"lime"};
if(F){if("depth" in F){this.depth=F.depth
}if("gap" in F){this.gap=F.gap
}if("material" in F){var H=F.material;
if(typeof H=="string"||H instanceof dojo.Color){this.material.color=H
}else{this.material=H
}}}},getDepth:function(){if(this.depth=="auto"){var A=this.width;
if(this.data&&this.data.length){A=A/this.data.length
}return A-2*this.gap
}return this.depth
},generate:function(L,M){if(!this.data){return this
}var K=this.width/this.data.length,A=0,I=this.depth=="auto"?K-2*this.gap:this.depth,J=this.height/B(this.data,Math.max);
if(!M){M=L.view
}for(var N=0;
N<this.data.length;
++N,A+=K){M.createCube({bottom:{x:A+this.gap,y:0,z:0},top:{x:A+K-this.gap,y:this.data[N]*J,z:I}}).setFill(this.material)
}}})
})()
};