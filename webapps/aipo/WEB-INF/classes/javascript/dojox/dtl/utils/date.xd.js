dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.utils.date"],["require","dojox.date.php"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.utils.date"]){B._hasResource["dojox.dtl.utils.date"]=true;
B.provide("dojox.dtl.utils.date");
B.require("dojox.date.php");
B.mixin(dojox.dtl.utils.date,{format:function(D,A){return dojox.date.php.format(D,A,dojox.dtl.utils.date._overrides)
},timesince:function(H,K){if(!(H instanceof Date)){H=new Date(H.year,H.month,H.day)
}if(!K){K=new Date()
}var A=Math.abs(K.getTime()-H.getTime());
for(var J=0,L;
L=dojox.dtl.utils.date._chunks[J];
J++){var I=Math.floor(A/L[0]);
if(I){break
}}return I+" "+L[1](I)
},_chunks:[[60*60*24*365*1000,function(A){return(A==1)?"year":"years"
}],[60*60*24*30*1000,function(A){return(A==1)?"month":"months"
}],[60*60*24*7*1000,function(A){return(A==1)?"week":"weeks"
}],[60*60*24*1000,function(A){return(A==1)?"day":"days"
}],[60*60*1000,function(A){return(A==1)?"hour":"hours"
}],[60*1000,function(A){return(A==1)?"minute":"minutes"
}]],_months_ap:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],_overrides:{f:function(){if(!this.date.getMinutes()){return this.g()
}},N:function(){return dojox.dtl.utils.date._months_ap[this.date.getMonth()]
},P:function(){if(!this.date.getMinutes()&&!this.date.getHours()){return"midnight"
}if(!this.date.getMinutes()&&this.date.getHours()==12){return"noon"
}return self.f()+" "+self.a()
}}})
}}});