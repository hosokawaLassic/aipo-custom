dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ActivityList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","aimluck.widget.Contentpane"]],defineResource:function(B){if(!B._hasResource["aipo.widget.ActivityList"]){B._hasResource["aipo.widget.ActivityList"]=true;
B.provide("aipo.widget.ActivityList");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("aimluck.widget.Contentpane");
B.declare("aipo.widget.ActivityList",[dijit._Widget,dijit._Templated],{widgetId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><div class="activityPopup"><div class="clearfix"><div id="activityListPane" widgetId="activityListPane"></div></div></div></div>\n',postCreate:function(){},reload:function(){var A=dijit.byId("activityListPane");
if(!A){A=new aimluck.widget.Contentpane({},"activityListPane")
}if(window.webkitNotifications){A.viewPage("?template=ActivityListScreen&s=1&p="+window.webkitNotifications.checkPermission())
}else{A.viewPage("?template=ActivityListScreen&s=0")
}}})
}}});