if(!dojo._hasResource["dojox.fx.easing"]){dojo._hasResource["dojox.fx.easing"]=true;
dojo.provide("dojox.fx.easing");
dojox.fx.easing={easeIn:function(B){return Math.pow(B,3)
},easeOut:function(B){return(1-Math.pow(1-B,3))
},easeInOut:function(B){return((3*Math.pow(B,2))-(2*Math.pow(B,3)))
}}
};