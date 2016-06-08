if(!dojo._hasResource["dojox.dtl.filter.logic"]){dojo._hasResource["dojox.dtl.filter.logic"]=true;
dojo.provide("dojox.dtl.filter.logic");
dojo.mixin(dojox.dtl.filter.logic,{default_:function(D,C){return D||C||""
},default_if_none:function(D,C){return(D===null)?C||"":D||""
},divisibleby:function(D,C){return(parseInt(D)%parseInt(C))==0
},_yesno:/\s*,\s*/g,yesno:function(F,D){if(!D){D="yes,no,maybe"
}var E=D.split(dojox.dtl.filter.logic._yesno);
if(E.length<2){return F
}if(F){return E[0]
}if((!F&&F!==null)||E.length<3){return E[1]
}return E[2]
}})
};