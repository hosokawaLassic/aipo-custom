dojo._xdResourceLoaded({depends:[["provide","dojo._base"],["require","dojo._base.lang"],["require","dojo._base.declare"],["require","dojo._base.connect"],["require","dojo._base.Deferred"],["require","dojo._base.json"],["require","dojo._base.array"],["require","dojo._base.Color"],["requireIf",dojo.isBrowser,"dojo._base.window"],["requireIf",dojo.isBrowser,"dojo._base.event"],["requireIf",dojo.isBrowser,"dojo._base.html"],["requireIf",dojo.isBrowser,"dojo._base.NodeList"],["requireIf",dojo.isBrowser,"dojo._base.query"],["requireIf",dojo.isBrowser,"dojo._base.xhr"],["requireIf",dojo.isBrowser,"dojo._base.fx"]],defineResource:function(B){if(!B._hasResource["dojo._base"]){B._hasResource["dojo._base"]=true;
B.provide("dojo._base");
B.require("dojo._base.lang");
B.require("dojo._base.declare");
B.require("dojo._base.connect");
B.require("dojo._base.Deferred");
B.require("dojo._base.json");
B.require("dojo._base.array");
B.require("dojo._base.Color");
B.requireIf(B.isBrowser,"dojo._base.window");
B.requireIf(B.isBrowser,"dojo._base.event");
B.requireIf(B.isBrowser,"dojo._base.html");
B.requireIf(B.isBrowser,"dojo._base.NodeList");
B.requireIf(B.isBrowser,"dojo._base.query");
B.requireIf(B.isBrowser,"dojo._base.xhr");
B.requireIf(B.isBrowser,"dojo._base.fx");
(function(){if(djConfig.require){for(var A=0;
A<djConfig.require.length;
A++){B.require(djConfig.require[A])
}}})()
}}});