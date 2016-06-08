if(!dojo._hasResource["dojox.dtl.filter.strings"]){dojo._hasResource["dojox.dtl.filter.strings"]=true;
dojo.provide("dojox.dtl.filter.strings");
dojo.require("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojo.mixin(dojox.dtl.filter.strings,{addslashes:function(B){return B.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(B){B=""+B;
return B.charAt(0).toUpperCase()+B.substring(1)
},center:function(G,E){E=E||G.length;
G=G+"";
var F=E-G.length;
if(F%2){G=G+" ";
F-=1
}for(var H=0;
H<F;
H+=2){G=" "+G+" "
}return G
},cut:function(D,C){C=C+""||"";
D=D+"";
return D.replace(new RegExp(C,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(B){return B.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(E,F){F=parseInt(F||-1);
E=parseFloat(E);
var D=E-E.toFixed(0);
if(!D&&F<0){return E.toFixed()
}E=E.toFixed(Math.abs(F));
return(F<0)?parseFloat(E)+"":E
},iriencode:function(B){return dojox.dtl.text.urlquote(B,"/#%[]=:;$&()+,!")
},linenumbers:function(J){var I=dojox.dtl.filter;
var N=J.split("\n");
var M=[];
var K=(N.length+"").length;
for(var L=0,H;
L<N.length;
L++){H=N[L];
M.push(I.strings.ljust(L+1,K)+". "+I.htmlstrings.escape(H))
}return M.join("\n")
},ljust:function(D,C){D=D+"";
C=parseInt(C);
while(D.length<C){D=D+" "
}return D
},lower:function(B){return(B+"").toLowerCase()
},make_list:function(F){var E=[];
if(typeof F=="number"){F=F+""
}if(F.charAt){for(var G=0;
G<F.length;
G++){E.push(F.charAt(G))
}return E
}if(typeof F=="object"){for(var H in F){E.push(F[H])
}return E
}return[]
},rjust:function(D,C){D=D+"";
C=parseInt(C);
while(D.length<C){D=" "+D
}return D
},slugify:function(B){B=B.replace(/[^\w\s-]/g,"").toLowerCase();
return B.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(E,F){F=""+F;
var D=dojox.dtl.filter.strings._strings;
if(!D[F]){D[F]=new dojox.string.sprintf.Formatter("%"+F)
}return D[F].format(E)
},title:function(I){var J,G="";
for(var F=0,H;
F<I.length;
F++){H=I.charAt(F);
if(J==" "||J=="\n"||J=="\t"||!J){G+=H.toUpperCase()
}else{G+=H.toLowerCase()
}J=H
}return G
},_truncatewords:/[ \n\r\t]/,truncatewords:function(J,H){H=parseInt(H);
if(!H){return J
}for(var M=0,N=J.length,K=0,I,L;
M<J.length;
M++){I=J.charAt(M);
if(dojox.dtl.filter.strings._truncatewords.test(L)){if(!dojox.dtl.filter.strings._truncatewords.test(I)){++K;
if(K==H){return J.substring(0,N+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(I)){N=M
}}L=I
}return J
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(K,O){O=parseInt(O);
if(O<=0){return""
}var P=dojox.dtl.filter.strings;
var J=0;
var M=[];
var N=dojox.string.tokenize(K,P._truncate_words,function(G,E){if(E){++J;
if(J<O){return E
}else{if(J==O){return E+" ..."
}}}var D=G.match(P._truncate_tag);
if(!D||J>=O){return 
}var A=D[1];
var F=D[2].toLowerCase();
var B=D[3];
if(A||P._truncate_singlets[F]){}else{if(A){var C=dojo.indexOf(M,F);
if(C!=-1){M=M.slice(C+1)
}}else{M.unshift(F)
}}return G
}).join("");
N=N.replace(/\s+$/g,"");
for(var L=0,I;
I=M[L];
L++){N+="</"+I+">"
}return N
},upper:function(B){return B.toUpperCase()
},urlencode:function(B){return dojox.dtl.text.urlquote(B)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(B){return dojox.dtl.filter.strings.urlizetrunc(B)
},urlizetrunc:function(D,C){C=parseInt(C);
return dojox.string.tokenize(D,/(\S+)/g,function(A){var Z=dojox.dtl.filter.strings._urlize.exec(A);
if(!Z){return A
}var V=Z[1];
var P=Z[2];
var B=Z[3];
var S=P.indexOf("www.")==0;
var Q=P.indexOf("@")!=-1;
var X=P.indexOf(":")!=-1;
var U=P.indexOf("http://")==0;
var R=P.indexOf("https://")==0;
var T=/[a-zA-Z0-9]/.test(P.charAt(0));
var W=P.substring(P.length-4);
var Y=P;
if(C>3){Y=Y.substring(0,C-3)+"..."
}if(S||(!Q&&!U&&P.length&&T&&(W==".org"||W==".net"||W==".com"))){return'<a href="http://'+P+'" rel="nofollow">'+Y+"</a>"
}else{if(U||R){return'<a href="'+P+'" rel="nofollow">'+Y+"</a>"
}else{if(Q&&!S&&!X&&dojox.dtl.filter.strings._urlize2.test(P)){return'<a href="mailto:'+P+'">'+P+"</a>"
}}}return A
}).join("")
},wordcount:function(B){return dojox.dtl.text.pySplit(B).length
},wordwrap:function(M,I){I=parseInt(I);
var O=[];
var K=M.split(/ /g);
if(K.length){var L=K.shift();
O.push(L);
var J=L.length-L.lastIndexOf("\n")-1;
for(var N=0;
N<K.length;
N++){L=K[N];
if(L.indexOf("\n")!=-1){var P=L.split(/\n/g)
}else{var P=[L]
}J+=P[0].length+1;
if(I&&J>I){O.push("\n");
J=P[P.length-1].length
}else{O.push(" ");
if(P.length>1){J=P[P.length-1].length
}}O.push(L)
}}return O.join("")
}})
};