dojo._xdResourceLoaded({depends:[["provide","dojox.fx._core"]],defineResource:function(B){if(!B._hasResource["dojox.fx._core"]){B._hasResource["dojox.fx._core"]=true;
B.provide("dojox.fx._core");
dojox.fx._Line=function(A,F){this.start=A;
this.end=F;
if(B.isArray(A)){var E=[];
B.forEach(this.start,function(C,D){E[D]=this.end[D]-C
},this);
this.getValue=function(C){var D=[];
B.forEach(this.start,function(I,J){D[J]=(E[J]*C)+I
},this);
return D
}
}else{var E=F-A;
this.getValue=function(C){return(E*C)+this.start
}
}}
}}});