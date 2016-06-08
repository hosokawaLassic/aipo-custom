if(!dojo._hasResource["dojox.date.php"]){dojo._hasResource["dojox.date.php"]=true;
dojo.provide("dojox.date.php");
dojo.require("dojo.date");
dojox.date.php.format=function(E,H,F){var G=new dojox.date.php.DateFormat(E);
return G.format(H,F)
};
dojox.date.php.DateFormat=function(B){this.date=B
};
dojo.extend(dojox.date.php.DateFormat,{weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdays_3:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],months_3:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthdays:[31,28,31,30,31,30,31,31,30,31,30,31],format:function(H,G){var I=[];
for(var F=0;
F<H.length;
F++){var J=H.charAt(F);
if(G&&typeof G[J]=="function"){I.push(G[J].call(this))
}else{if(typeof this[J]=="function"){I.push(this[J]())
}else{I.push(J)
}}}return I.join("")
},d:function(){var B=this.j();
return(B.length==1)?"0"+B:B
},D:function(){return this.weekdays_3[this.date.getDay()]
},j:function(){return this.date.getDate()+""
},l:function(){return this.weekdays[this.date.getDay()]
},N:function(){var B=this.w();
return(!B)?7:B
},S:function(){switch(this.date.getDate()){case 11:case 12:case 13:return"th";
case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}},w:function(){return this.date.getDay()+""
},z:function(){var B=this.date.getTime()-new Date(this.date.getFullYear(),0,1).getTime();
return Math.floor(B/86400000)+""
},W:function(){var J;
var H=new Date(this.date.getFullYear(),0,1).getDay()+1;
var N=this.date.getDay()+1;
var I=parseInt(this.z());
if(I<=(8-H)&&H>4){var K=new Date(this.date.getFullYear()-1,this.date.getMonth(),this.date.getDate());
if(H==5||(H==6&&dojo.date.isLeapYear(K))){J=53
}else{J=52
}}else{var L;
if(Boolean(this.L())){L=366
}else{L=365
}if((L-I)<(4-N)){J=1
}else{var M=I+(7-N)+(H-1);
J=Math.ceil(M/7);
if(H>4){--J
}}}return J
},F:function(){return this.months[this.date.getMonth()]
},m:function(){var B=this.n();
return(B.length==1)?"0"+B:B
},M:function(){return months_3[this.date.getMonth()]
},n:function(){return this.date.getMonth()+1+""
},t:function(){return(Boolean(this.L())&&this.date.getMonth()==1)?29:this.monthdays[this.getMonth()]
},L:function(){return(dojo.date.isLeapYear(this.date))?"1":"0"
},o:function(){},Y:function(){return this.date.getFullYear()+""
},y:function(){return this.date.getFullYear.substsring(2,4)
},a:function(){return this.date.getHours()>=12?"pm":"am"
},b:function(){return this.a().toUpperCase()
},B:function(){var E=this.date.getTimezoneOffset()+60;
var D=(this.date.getHours()*3600)+(this.date.getMinutes()*60)+this.getSeconds()+(E*60);
var F=Math.abs(Math.floor(D/86.4)%1000)+"";
while(F.length<2){F="0"+F
}return F
},g:function(){return(this.date.getHours()>12)?this.date.getHours()-12+"":this.date.getHours()+""
},G:function(){return this.date.getHours()+""
},h:function(){var B=this.g();
return(B.length==1)?"0"+B:B
},H:function(){var B=this.G();
return(B.length==1)?"0"+B:B
},i:function(){var B=this.date.getMinutes()+"";
return(B.length==1)?"0"+B:B
},s:function(){var B=this.date.getSeconds()+"";
return(B.length==1)?"0"+B:B
},e:function(){return dojo.date.getTimezoneName(this.date)
},I:function(){},O:function(){var E=Math.abs(this.date.getTimezoneOffset());
var D=Math.floor(E/60)+"";
var F=(E%60)+"";
if(D.length==1){D="0"+D
}if(F.length==1){D="0"+F
}return((this.date.getTimezoneOffset()<0)?"+":"-")+D+F
},P:function(){var B=this.O();
return B.substring(0,2)+":"+B.substring(2,4)
},T:function(){return this.e().substring(0,3)
},Z:function(){return this.date.getTimezoneOffset()*-60
},c:function(){return this.Y()+"-"+this.m()+"-"+this.d()+"T"+this.h()+":"+this.i()+":"+this.s()+this.P()
},r:function(){return this.D()+", "+this.d()+" "+this.M()+" "+this.Y()+" "+this.H()+":"+this.i()+":"+this.s()+" "+this.O()
},U:function(){return Math.floor(this.date.getTime()/1000)
}})
};