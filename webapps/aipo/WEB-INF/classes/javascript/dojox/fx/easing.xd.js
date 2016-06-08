dojo._xdResourceLoaded({depends:[["provide","dojox.fx.easing"]],defineResource:function(B){if(!B._hasResource["dojox.fx.easing"]){B._hasResource["dojox.fx.easing"]=true;
B.provide("dojox.fx.easing");
dojox.fx.easing={easeIn:function(A){return Math.pow(A,3)
},easeOut:function(A){return(1-Math.pow(1-A,3))
},easeInOut:function(A){return((3*Math.pow(A,2))-(2*Math.pow(A,3)))
}}
}}});