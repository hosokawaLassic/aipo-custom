dojo.provide("aipo.io");
aipo.io.loadHtml=function(D,E,F){dojo.xhrGet({url:D,transport:"ScriptSrcTransport",jsonParamName:"callback",content:E,method:"get",mimetype:"application/json",encoding:"utf-8",load:function(C,A,B,H){dojo.byId("content-"+F).innerHTML=A.body;
dojo.html.setVisibility(dojo.byId("content-"+F),true);
dojo.html.setDisplay(dojo.byId("indicator-"+F),false)
},error:function(C,A,B,H){dojo.byId("content-"+F).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u8aad\u307f\u8fbc\u307f\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
dojo.html.setVisibility(dojo.byId("content-"+F),true);
dojo.html.setDisplay(dojo.byId("indicator-"+F),false)
},timeout:function(C,A,B,H){dojo.byId("content-"+F).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002";
dojo.html.setVisibility(dojo.byId("content-"+F),true);
dojo.html.setDisplay(dojo.byId("indicator-"+F),false)
},timeoutSeconds:10})
};