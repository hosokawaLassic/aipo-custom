dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.dates"],["require","dojox.dtl.utils.date"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.dates"]){B._hasResource["dojox.dtl.filter.dates"]=true;
B.provide("dojox.dtl.filter.dates");
B.require("dojox.dtl.utils.date");
B.mixin(dojox.dtl.filter.dates,{date:function(A,D){if(!A||!(A instanceof Date)){return""
}D=D||"N j, Y";
return dojox.dtl.utils.date.format(A,D)
},time:function(A,D){if(!A||!(A instanceof Date)){return""
}D=D||"P";
return dojox.dtl.utils.date.format(A,D)
},timesince:function(A,F){var E=dojox.dtl.utils.date.timesince;
if(!A){return""
}if(F){return E(F,A)
}return E(A)
},timeuntil:function(A,F){var E=dojox.dtl.utils.date.timesince;
if(!A){return""
}if(F){return E(F,A)
}return E(new Date(),A)
}})
}}});