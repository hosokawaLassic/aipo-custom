dojo._xdResourceLoaded({depends:[["provide","dojo.cldr.supplemental"],["require","dojo.i18n"]],defineResource:function(B){if(!B._hasResource["dojo.cldr.supplemental"]){B._hasResource["dojo.cldr.supplemental"]=true;
B.provide("dojo.cldr.supplemental");
B.require("dojo.i18n");
B.cldr.supplemental.getFirstDayOfWeek=function(H){var G={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var F=B.cldr.supplemental._region(H);
var A=G[F];
return(typeof A=="undefined")?1:A
};
B.cldr.supplemental._region=function(F){F=B.i18n.normalizeLocale(F);
var E=F.split("-");
var A=E[1];
if(!A){A={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[E[0]]
}else{if(A.length==4){A=E[2]
}}return A
};
B.cldr.supplemental.getWeekend=function(K){var I={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var L={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var H=B.cldr.supplemental._region(K);
var A=I[H];
var J=L[H];
if(typeof A=="undefined"){A=6
}if(typeof J=="undefined"){J=0
}return{start:A,end:J}
}
}}});