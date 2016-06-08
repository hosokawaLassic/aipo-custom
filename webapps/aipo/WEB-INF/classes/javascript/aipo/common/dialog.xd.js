dojo._xdResourceLoaded({depends:[["provide","aipo.common"]],defineResource:function(B){if(!B._hasResource["aipo.common"]){B._hasResource["aipo.common"]=true;
B.provide("aipo.common");
aipo.common.showDialog=function(H,F,A){var G=dijit.byId("modalDialog");
B.query(".roundBlockContent").addClass("mb_dialoghide");
B.query("#modalDialog").addClass("mb_dialog");
if(!G){G=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:F,_callback:A},"modalDialog")
}else{G.setCallback(F,A)
}if(G){G.setHref(H);
G.show()
}};
aipo.common.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}}
}}});