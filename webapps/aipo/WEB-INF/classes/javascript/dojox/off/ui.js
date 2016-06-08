if(!dojo._hasResource["dojox.off.ui"]){dojo._hasResource["dojox.off.ui"]=true;
dojo.provide("dojox.off.ui");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.GearsStorageProvider");
dojo.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:dojo.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:dojo.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:dojo.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:dojo.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:dojo.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:dojo.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
dojo.connect(dojox.off,"onNetwork",this,"_onNetwork");
dojo.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){dojo.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(B){dojox.off.enabled=false;
B=B.message||B;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+B)
},load:dojo.hitch(this,this._templateLoaded)})
},_templateLoaded:function(E){var D=dojo.byId(this.autoEmbedID);
if(D){D.innerHTML=E
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var F=dojo.byId("dot-widget-browser-restart");
if(F){F.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(B){this._onNetwork(B?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var E=dojo.byId("dot-widget-network-indicator-online");
var D=dojo.byId("dot-widget-network-indicator-offline");
var F=dojo.byId("dot-widget-title-text");
if(E&&D){if(dojox.off.isOnline==true){E.style.display="inline";
D.style.display="none"
}else{E.style.display="none";
D.style.display="inline"
}}if(F){if(dojox.off.isOnline){F.innerHTML="Online"
}else{F.innerHTML="Offline"
}}},_initLearnHow:function(){var E=dojo.byId("dot-widget-learn-how-link");
if(!E){return 
}if(!this.customLearnHowPath){var F=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(F);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}E.setAttribute("href",this.learnHowPath);
var D=dojo.byId("dot-widget-learn-how-app-name");
if(!D){return 
}D.innerHTML="";
D.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(B){if(!B){return false
}return(/^[a-z0-9 ]*$/i.test(B))
},_updateSyncUI:function(){var H=dojo.byId("dot-roller");
var G=dojo.byId("dot-success-checkmark");
var J=dojo.byId("dot-sync-messages");
var F=dojo.byId("dot-sync-details");
var I=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(H){H.style.display="inline"
}if(G){G.style.display="none"
}if(J){dojo.removeClass(J,"dot-sync-error")
}if(F){F.style.display="none"
}if(I){I.style.display="inline"
}}else{if(H){H.style.display="none"
}if(I){I.style.display="none"
}if(J){dojo.removeClass(J,"dot-sync-error")
}}},_setSyncMessage:function(C){var D=dojo.byId("dot-sync-messages");
if(D){while(D.firstChild){D.removeChild(D.firstChild)
}D.appendChild(document.createTextNode(C))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var F=dojo.byId("dot-widget-network-indicator-online");
if(F){F.setAttribute("src",this.onlineImagePath)
}var E=dojo.byId("dot-widget-network-indicator-offline");
if(E){E.setAttribute("src",this.offlineImagePath)
}var H=dojo.byId("dot-roller");
if(H){H.setAttribute("src",this.rollerImagePath)
}var G=dojo.byId("dot-success-checkmark");
if(G){G.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(J){J.preventDefault();
J.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var H="";
H+="<html><head><title>Sync Details</title><head><body>";
H+="<h1>Sync Details</h1>\n";
H+="<ul>\n";
for(var I=0;
I<dojox.off.sync.details.length;
I++){H+="<li>";
H+=dojox.off.sync.details[I];
H+="</li>"
}H+="</ul>\n";
H+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
H+="</body></html>";
var G="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var F=window.open("","SyncDetails",G);
if(!F){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}F.document.open();
F.document.write(H);
F.document.close();
if(F.focus){F.focus()
}},_cancel:function(B){B.preventDefault();
B.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var E=dojo.byId("dot-widget-browser-restart");
if(E){dojo.addClass(E,"dot-needs-browser-restart")
}var D=dojo.byId("dot-widget-browser-restart-app-name");
if(D){D.innerHTML="";
D.appendChild(document.createTextNode(this.appName))
}var F=dojo.byId("dot-sync-status");
if(F){F.style.display="none"
}},_showNeedsOfflineCache:function(){var B=dojo.byId("dot-widget-container");
if(B){dojo.addClass(B,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var B=dojo.byId("dot-widget-container");
if(B){dojo.removeClass(B,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var D=dojo.byId("dot-sync-details-button");
if(D){dojo.connect(D,"onclick",this,this._showDetails)
}var C=dojo.byId("dot-sync-cancel-button");
if(C){dojo.connect(C,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(F){var D=[];
D.push(dojo.byId("dot-sync-status"));
for(var E=0;
E<D.length;
E++){if(D[E]){D[E].style.visibility=(F?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var E=dojo.byId("dot-success-checkmark");
var D=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(E){E.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(E){E.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var F=dojo.byId("dot-sync-messages");
if(F){dojo.addClass(F,"dot-sync-error")
}if(E){E.style.display="none"
}}}if(dojox.off.sync.details.length&&D){D.style.display="inline"
}},_onFrameworkEvent:function(E,D){if(E=="save"){if(D.status==dojox.storage.FAILED&&!D.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(E=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(E=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var F=dojo.byId("dot-widget-browser-restart");
if(F){F.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(B){switch(B){case"start":this._updateSyncUI();
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
default:dojo.warn("Programming error: Unknown sync type in dojox.off.ui: "+B);
break
}},_onNetwork:function(D){if(!this._initialized){return 
}this._updateNetIndicator();
if(D=="offline"){this._setSyncMessage("You are working offline");
var C=dojo.byId("dot-sync-details");
if(C){C.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
};