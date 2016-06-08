dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.logic"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.logic"]){B._hasResource["dojox.dtl.filter.logic"]=true;
B.provide("dojox.dtl.filter.logic");
B.mixin(dojox.dtl.filter.logic,{default_:function(A,D){return A||D||""
},default_if_none:function(A,D){return(A===null)?D||"":A||""
},divisibleby:function(A,D){return(parseInt(A)%parseInt(D))==0
},_yesno:/\s*,\s*/g,yesno:function(E,F){if(!F){F="yes,no,maybe"
}var A=F.split(dojox.dtl.filter.logic._yesno);
if(A.length<2){return E
}if(E){return A[0]
}if((!E&&E!==null)||A.length<3){return A[1]
}return A[2]
}})
}}});