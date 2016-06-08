if(!dojo._hasResource["dojox.dtl.filter.integers"]){dojo._hasResource["dojox.dtl.filter.integers"]=true;
dojo.provide("dojox.dtl.filter.integers");
dojo.mixin(dojox.dtl.filter.integers,{add:function(D,C){D=parseInt(D);
C=parseInt(C);
return isNaN(C)?D:D+C
},get_digit:function(D,C){D=parseInt(D);
C=parseInt(C)-1;
if(C>=0){D+="";
if(C<D.length){D=parseInt(D.charAt(C))
}else{D=0
}}return(isNaN(D)?0:D)
}})
};