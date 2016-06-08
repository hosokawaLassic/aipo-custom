dojo.provide("aipo.common");
aipo.common.showDialog=function(E,G,F){var H=dijit.byId("modalDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#modalDialog").addClass("mb_dialog");
if(!H){H=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:G,_callback:F},"modalDialog")
}else{H.setCallback(G,F)
}if(H){H.setHref(E);
H.show()
}};
aipo.common.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}};
aipo.common.showDialogSub=function(J,I,G){var F=dijit.byId("modalDialog");
var H=window.navigator.userAgent.toLowerCase();
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
if(!F){F=new aimluck.widget.DialogSub({widgetId:"modalDialog",_portlet_id:I,_callback:G,templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"},"modalDialog")
}else{F.setCallback(I,G)
}if(F){F.setHref(J);
F.show()
}};
aipo.common.hideDialogSub=function(){dijit.byId("modalDialog").hide()
};
aipo.common.customizeDialog=function(){if(dojo.byId("data-activecustomizeurl")!=undefined&&dojo.byId("data-activecustomizeurl")!=""){var B=dojo.byId("data-activecustomizeurl").value;
aipo.common.showDialog(B)
}};