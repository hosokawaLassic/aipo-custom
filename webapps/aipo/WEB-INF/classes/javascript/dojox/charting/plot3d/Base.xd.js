dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Base"],["require","dojox.charting.Chart3D"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot3d.Base"]){B._hasResource["dojox.charting.plot3d.Base"]=true;
B.provide("dojox.charting.plot3d.Base");
B.require("dojox.charting.Chart3D");
B.declare("dojox.charting.plot3d.Base",null,{constructor:function(A,F,E){this.width=A;
this.height=F
},setData:function(A){this.data=A?A:[];
return this
},getDepth:function(){return this.depth
},generate:function(A,D){}})
}}});