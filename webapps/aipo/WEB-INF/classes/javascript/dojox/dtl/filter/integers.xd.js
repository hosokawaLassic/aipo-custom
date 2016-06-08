dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.integers"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.integers"]){B._hasResource["dojox.dtl.filter.integers"]=true;
B.provide("dojox.dtl.filter.integers");
B.mixin(dojox.dtl.filter.integers,{add:function(A,D){A=parseInt(A);
D=parseInt(D);
return isNaN(D)?A:A+D
},get_digit:function(A,D){A=parseInt(A);
D=parseInt(D)-1;
if(D>=0){A+="";
if(D<A.length){A=parseInt(A.charAt(D))
}else{A=0
}}return(isNaN(A)?0:A)
}})
}}});