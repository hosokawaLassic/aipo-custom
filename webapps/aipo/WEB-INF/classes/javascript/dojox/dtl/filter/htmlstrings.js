if(!dojo._hasResource["dojox.dtl.filter.htmlstrings"]){dojo._hasResource["dojox.dtl.filter.htmlstrings"]=true;
dojo.provide("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(D){var C=dojox.dtl.filter.htmlstrings;
return D.replace(C._escapeamp,"&amp;").replace(C._escapelt,"&lt;").replace(C._escapegt,"&gt;").replace(C._escapedblqt,"&quot;").replace(C._escapeqt,"&#39;")
},linebreaks:function(I){var G=[];
var J=dojox.dtl.filter.htmlstrings;
I=I.replace(J._linebreaksrn,"\n");
var H=I.split(J._linebreaksn);
for(var K=0;
K<H.length;
K++){var L=H[K].replace(J._linebreakss,"").replace(J._linebreaksbr,"<br />");
G.push("<p>"+L+"</p>")
}return G.join("\n\n")
},linebreaksbr:function(D){var C=dojox.dtl.filter.htmlstrings;
return D.replace(C._linebreaksrn,"\n").replace(C._linebreaksbr,"<br />")
},removetags:function(H,F){var I=dojox.dtl.filter.htmlstrings;
var J=[];
var G;
while(G=I._removetagsfind.exec(F)){J.push(G[0])
}J="("+J.join("|")+")";
return H.replace(new RegExp("</?s*"+J+"s*[^>]*>","gi"),"")
},striptags:function(B){return B.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
};