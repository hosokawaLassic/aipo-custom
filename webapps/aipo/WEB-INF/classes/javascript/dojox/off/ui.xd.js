dojo._xdResourceLoaded({depends:[["provide","dojox.off.ui"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"],["require","dojox.storage.GearsStorageProvider"]],defineResource:function(B){if(!B._hasResource["dojox.off.ui"]){B._hasResource["dojox.off.ui"]=true;
B.provide("dojox.off.ui");
B.require("dojox.storage.Provider");
B.require("dojox.storage.manager");
B.require("dojox.storage.GearsStorageProvider");
B.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:B.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:B.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:B.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:B.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:B.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:B.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:B.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:B.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
B.connect(dojox.off,"onNetwork",this,"_onNetwork");
B.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){B.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(A){dojox.off.enabled=false;
A=A.message||A;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+A)
},load:B.hitch(this,this._templateLoaded)})
},_templateLoaded:function(A){var F=B.byId(this.autoEmbedID);
if(F){F.innerHTML=A
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var E=B.byId("dot-widget-browser-restart");
if(E){E.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(B.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var A=B.byId("dot-widget-network-indicator-online");
var F=B.byId("dot-widget-network-indicator-offline");
var E=B.byId("dot-widget-title-text");
if(A&&F){if(dojox.off.isOnline==true){A.style.display="inline";
F.style.display="none"
}else{A.style.display="none";
F.style.display="inline"
}}if(E){if(dojox.off.isOnline){E.innerHTML="Online"
}else{E.innerHTML="Offline"
}}},_initLearnHow:function(){var A=B.byId("dot-widget-learn-how-link");
if(!A){return 
}if(!this.customLearnHowPath){var E=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(E);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}A.setAttribute("href",this.learnHowPath);
var F=B.byId("dot-widget-learn-how-app-name");
if(!F){return 
}F.innerHTML="";
F.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(A){if(!A){return false
}return(/^[a-z0-9 ]*$/i.test(A))
},_updateSyncUI:function(){var G=B.byId("dot-roller");
var A=B.byId("dot-success-checkmark");
var I=B.byId("dot-sync-messages");
var J=B.byId("dot-sync-details");
var H=B.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(G){G.style.display="inline"
}if(A){A.style.display="none"
}if(I){B.removeClass(I,"dot-sync-error")
}if(J){J.style.display="none"
}if(H){H.style.display="inline"
}}else{if(G){G.style.display="none"
}if(H){H.style.display="none"
}if(I){B.removeClass(I,"dot-sync-error")
}}},_setSyncMessage:function(D){var A=B.byId("dot-sync-messages");
if(A){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(D))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var A=B.byId("dot-widget-network-indicator-online");
if(A){A.setAttribute("src",this.onlineImagePath)
}var H=B.byId("dot-widget-network-indicator-offline");
if(H){H.setAttribute("src",this.offlineImagePath)
}var G=B.byId("dot-roller");
if(G){G.setAttribute("src",this.rollerImagePath)
}var F=B.byId("dot-success-checkmark");
if(F){F.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(I){I.preventDefault();
I.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var G="";
G+="<html><head><title>Sync Details</title><head><body>";
G+="<h1>Sync Details</h1>\n";
G+="<ul>\n";
for(var H=0;
H<dojox.off.sync.details.length;
H++){G+="<li>";
G+=dojox.off.sync.details[H];
G+="</li>"
}G+="</ul>\n";
G+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
G+="</body></html>";
var A="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var J=window.open("","SyncDetails",A);
if(!J){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}J.document.open();
J.document.write(G);
J.document.close();
if(J.focus){J.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var A=B.byId("dot-widget-browser-restart");
if(A){B.addClass(A,"dot-needs-browser-restart")
}var F=B.byId("dot-widget-browser-restart-app-name");
if(F){F.innerHTML="";
F.appendChild(document.createTextNode(this.appName))
}var E=B.byId("dot-sync-status");
if(E){E.style.display="none"
}},_showNeedsOfflineCache:function(){var A=B.byId("dot-widget-container");
if(A){B.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=B.byId("dot-widget-container");
if(A){B.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var A=B.byId("dot-sync-details-button");
if(A){B.connect(A,"onclick",this,this._showDetails)
}var D=B.byId("dot-sync-cancel-button");
if(D){B.connect(D,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(E){var F=[];
F.push(B.byId("dot-sync-status"));
for(var A=0;
A<F.length;
A++){if(F[A]){F[A].style.visibility=(E?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var A=B.byId("dot-success-checkmark");
var F=B.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(A){A.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(A){A.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var E=B.byId("dot-sync-messages");
if(E){B.addClass(E,"dot-sync-error")
}if(A){A.style.display="none"
}}}if(dojox.off.sync.details.length&&F){F.style.display="inline"
}},_onFrameworkEvent:function(A,F){if(A=="save"){if(F.status==dojox.storage.FAILED&&!F.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(A=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(A=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var E=B.byId("dot-widget-browser-restart");
if(E){E.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(A){switch(A){case"start":this._updateSyncUI();
break;
case"refreshFiles":this._setSyncMessage("Downloading UI...");
break;
case"upload":this._setSyncMessage("Uploading new data...");
break;
case"download":this._setSyncMessage("Downloading new data...");
break;
case"finished":this._syncFinished();
break;
case"cancel":this._setSyncMessage("Canceling Sync...");
break;
default:B.warn("Programming error: Unknown sync type in dojox.off.ui: "+A);
break
}},_onNetwork:function(A){if(!this._initialized){return 
}this._updateNetIndicator();
if(A=="offline"){this._setSyncMessage("You are working offline");
var D=B.byId("dot-sync-details");
if(D){D.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
B.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
B.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}}});