dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.strings"],["require","dojox.dtl.filter.htmlstrings"],["require","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.strings"]){B._hasResource["dojox.dtl.filter.strings"]=true;
B.provide("dojox.dtl.filter.strings");
B.require("dojox.dtl.filter.htmlstrings");
B.require("dojox.string.sprintf");
B.require("dojox.string.tokenize");
B.mixin(dojox.dtl.filter.strings,{addslashes:function(A){return A.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(A){A=""+A;
return A.charAt(0).toUpperCase()+A.substring(1)
},center:function(F,H){H=H||F.length;
F=F+"";
var A=H-F.length;
if(A%2){F=F+" ";
A-=1
}for(var G=0;
G<A;
G+=2){F=" "+F+" "
}return F
},cut:function(A,D){D=D+""||"";
A=A+"";
return A.replace(new RegExp(D,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(A){return A.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(A,E){E=parseInt(E||-1);
A=parseFloat(A);
var F=A-A.toFixed(0);
if(!F&&E<0){return A.toFixed()
}A=A.toFixed(Math.abs(E));
return(E<0)?parseFloat(A)+"":A
},iriencode:function(A){return dojox.dtl.text.urlquote(A,"/#%[]=:;$&()+,!")
},linenumbers:function(I){var A=dojox.dtl.filter;
var M=I.split("\n");
var L=[];
var J=(M.length+"").length;
for(var K=0,N;
K<M.length;
K++){N=M[K];
L.push(A.strings.ljust(K+1,J)+". "+A.htmlstrings.escape(N))
}return L.join("\n")
},ljust:function(A,D){A=A+"";
D=parseInt(D);
while(A.length<D){A=A+" "
}return A
},lower:function(A){return(A+"").toLowerCase()
},make_list:function(A){var H=[];
if(typeof A=="number"){A=A+""
}if(A.charAt){for(var F=0;
F<A.length;
F++){H.push(A.charAt(F))
}return H
}if(typeof A=="object"){for(var G in A){H.push(A[G])
}return H
}return[]
},rjust:function(A,D){A=A+"";
D=parseInt(D);
while(A.length<D){A=" "+A
}return A
},slugify:function(A){A=A.replace(/[^\w\s-]/g,"").toLowerCase();
return A.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(A,E){E=""+E;
var F=dojox.dtl.filter.strings._strings;
if(!F[E]){F[E]=new dojox.string.sprintf.Formatter("%"+E)
}return F[E].format(A)
},title:function(H){var I,A="";
for(var J=0,G;
J<H.length;
J++){G=H.charAt(J);
if(I==" "||I=="\n"||I=="\t"||!I){A+=G.toUpperCase()
}else{A+=G.toLowerCase()
}I=G
}return A
},_truncatewords:/[ \n\r\t]/,truncatewords:function(I,N){N=parseInt(N);
if(!N){return I
}for(var L=0,M=I.length,J=0,A,K;
L<I.length;
L++){A=I.charAt(L);
if(dojox.dtl.filter.strings._truncatewords.test(K)){if(!dojox.dtl.filter.strings._truncatewords.test(A)){++J;
if(J==N){return I.substring(0,M+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(A)){M=L
}}K=A
}return I
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(J,N){N=parseInt(N);
if(N<=0){return""
}var O=dojox.dtl.filter.strings;
var A=0;
var L=[];
var M=dojox.string.tokenize(J,O._truncate_words,function(H,F){if(F){++A;
if(A<N){return F
}else{if(A==N){return F+" ..."
}}}var E=H.match(O._truncate_tag);
if(!E||A>=N){return 
}var I=E[1];
var G=E[2].toLowerCase();
var C=E[3];
if(I||O._truncate_singlets[G]){}else{if(I){var D=B.indexOf(L,G);
if(D!=-1){L=L.slice(D+1)
}}else{L.unshift(G)
}}return H
}).join("");
M=M.replace(/\s+$/g,"");
for(var K=0,P;
P=L[K];
K++){M+="</"+P+">"
}return M
},upper:function(A){return A.toUpperCase()
},urlencode:function(A){return dojox.dtl.text.urlquote(A)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(A){return dojox.dtl.filter.strings.urlizetrunc(A)
},urlizetrunc:function(A,D){D=parseInt(D);
return dojox.string.tokenize(A,/(\S+)/g,function(b){var a=dojox.dtl.filter.strings._urlize.exec(b);
if(!a){return b
}var W=a[1];
var Q=a[2];
var C=a[3];
var T=Q.indexOf("www.")==0;
var R=Q.indexOf("@")!=-1;
var Y=Q.indexOf(":")!=-1;
var V=Q.indexOf("http://")==0;
var S=Q.indexOf("https://")==0;
var U=/[a-zA-Z0-9]/.test(Q.charAt(0));
var X=Q.substring(Q.length-4);
var Z=Q;
if(D>3){Z=Z.substring(0,D-3)+"..."
}if(T||(!R&&!V&&Q.length&&U&&(X==".org"||X==".net"||X==".com"))){return'<a href="http://'+Q+'" rel="nofollow">'+Z+"</a>"
}else{if(V||S){return'<a href="'+Q+'" rel="nofollow">'+Z+"</a>"
}else{if(R&&!T&&!Y&&dojox.dtl.filter.strings._urlize2.test(Q)){return'<a href="mailto:'+Q+'">'+Q+"</a>"
}}}return b
}).join("")
},wordcount:function(A){return dojox.dtl.text.pySplit(A).length
},wordwrap:function(L,P){P=parseInt(P);
var N=[];
var J=L.split(/ /g);
if(J.length){var K=J.shift();
N.push(K);
var A=K.length-K.lastIndexOf("\n")-1;
for(var M=0;
M<J.length;
M++){K=J[M];
if(K.indexOf("\n")!=-1){var O=K.split(/\n/g)
}else{var O=[K]
}A+=O[0].length+1;
if(P&&A>P){N.push("\n");
A=O[O.length-1].length
}else{N.push(" ");
if(O.length>1){A=O[O.length-1].length
}}N.push(K)
}}return N.join("")
}})
}}});