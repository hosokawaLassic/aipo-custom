if(!dojo._hasResource["dojox.dtl.filter.dates"]){dojo._hasResource["dojox.dtl.filter.dates"]=true;
dojo.provide("dojox.dtl.filter.dates");
dojo.require("dojox.dtl.utils.date");
dojo.mixin(dojox.dtl.filter.dates,{date:function(D,C){if(!D||!(D instanceof Date)){return""
}C=C||"N j, Y";
return dojox.dtl.utils.date.format(D,C)
},time:function(D,C){if(!D||!(D instanceof Date)){return""
}C=C||"P";
return dojox.dtl.utils.date.format(D,C)
},timesince:function(E,D){var F=dojox.dtl.utils.date.timesince;
if(!E){return""
}if(D){return F(D,E)
}return F(E)
},timeuntil:function(E,D){var F=dojox.dtl.utils.date.timesince;
if(!E){return""
}if(D){return F(D,E)
}return F(new Date(),E)
}})
};