if(!dojo._hasResource["dojox.charting.plot3d.Base"]){dojo._hasResource["dojox.charting.plot3d.Base"]=true;
dojo.provide("dojox.charting.plot3d.Base");
dojo.require("dojox.charting.Chart3D");
dojo.declare("dojox.charting.plot3d.Base",null,{constructor:function(E,D,F){this.width=E;
this.height=D
},setData:function(B){this.data=B?B:[];
return this
},getDepth:function(){return this.depth
},generate:function(D,C){}})
};