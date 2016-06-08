if(!dojo._hasResource["dojox.dtl.utils.date"]){dojo._hasResource["dojox.dtl.utils.date"]=true;
dojo.provide("dojox.dtl.utils.date");
dojo.require("dojox.date.php");
dojo.mixin(dojox.dtl.utils.date,{format:function(C,D){return dojox.date.php.format(C,D,dojox.dtl.utils.date._overrides)
},timesince:function(I,L){if(!(I instanceof Date)){I=new Date(I.year,I.month,I.day)
}if(!L){L=new Date()
}var H=Math.abs(L.getTime()-I.getTime());
for(var K=0,G;
G=dojox.dtl.utils.date._chunks[K];
K++){var J=Math.floor(H/G[0]);
if(J){break
}}return J+" "+G[1](J)
},_chunks:[[60*60*24*365*1000,function(B){return(B==1)?"year":"years"
}],[60*60*24*30*1000,function(B){return(B==1)?"month":"months"
}],[60*60*24*7*1000,function(B){return(B==1)?"week":"weeks"
}],[60*60*24*1000,function(B){return(B==1)?"day":"days"
}],[60*60*1000,function(B){return(B==1)?"hour":"hours"
}],[60*1000,function(B){return(B==1)?"minute":"minutes"
}]],_months_ap:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],_overrides:{f:function(){if(!this.date.getMinutes()){return this.g()
}},N:function(){return dojox.dtl.utils.date._months_ap[this.date.getMonth()]
},P:function(){if(!this.date.getMinutes()&&!this.date.getHours()){return"midnight"
}if(!this.date.getMinutes()&&this.date.getHours()==12){return"noon"
}return self.f()+" "+self.a()
}}})
};