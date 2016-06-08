dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.htmlstrings"],["require","dojox.dtl._base"]],defineResource:function(B){if(!B._hasResource["dojox.dtl.filter.htmlstrings"]){B._hasResource["dojox.dtl.filter.htmlstrings"]=true;
B.provide("dojox.dtl.filter.htmlstrings");
B.require("dojox.dtl._base");
B.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(A){var D=dojox.dtl.filter.htmlstrings;
return A.replace(D._escapeamp,"&amp;").replace(D._escapelt,"&lt;").replace(D._escapegt,"&gt;").replace(D._escapedblqt,"&quot;").replace(D._escapeqt,"&#39;")
},linebreaks:function(H){var L=[];
var I=dojox.dtl.filter.htmlstrings;
H=H.replace(I._linebreaksrn,"\n");
var A=H.split(I._linebreaksn);
for(var J=0;
J<A.length;
J++){var K=A[J].replace(I._linebreakss,"").replace(I._linebreaksbr,"<br />");
L.push("<p>"+K+"</p>")
}return L.join("\n\n")
},linebreaksbr:function(A){var D=dojox.dtl.filter.htmlstrings;
return A.replace(D._linebreaksrn,"\n").replace(D._linebreaksbr,"<br />")
},removetags:function(G,J){var H=dojox.dtl.filter.htmlstrings;
var I=[];
var A;
while(A=H._removetagsfind.exec(J)){I.push(A[0])
}I="("+I.join("|")+")";
return G.replace(new RegExp("</?s*"+I+"s*[^>]*>","gi"),"")
},striptags:function(A){return A.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
}}});