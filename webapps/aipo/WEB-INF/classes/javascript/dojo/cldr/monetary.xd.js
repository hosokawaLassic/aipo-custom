dojo._xdResourceLoaded({depends:[["provide","dojo.cldr.monetary"]],defineResource:function(B){if(!B._hasResource["dojo.cldr.monetary"]){B._hasResource["dojo.cldr.monetary"]=true;
B.provide("dojo.cldr.monetary");
B.cldr.monetary.getData=function(G){var A={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var H={CHF:5};
var I=A[G],J=H[G];
if(typeof I=="undefined"){I=2
}if(typeof J=="undefined"){J=0
}return{places:I,round:J}
}
}}});