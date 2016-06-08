if(!dojo._hasResource["dojox.fx._core"]){dojo._hasResource["dojox.fx._core"]=true;
dojo.provide("dojox.fx._core");
dojox.fx._Line=function(E,D){this.start=E;
this.end=D;
if(dojo.isArray(E)){var F=[];
dojo.forEach(this.start,function(A,B){F[B]=this.end[B]-A
},this);
this.getValue=function(A){var B=[];
dojo.forEach(this.start,function(C,H){B[H]=(F[H]*A)+C
},this);
return B
}
}else{var F=D-E;
this.getValue=function(A){return(F*A)+this.start
}
}}
};