aipo.PortletLayoutManager=function(){shindig.LayoutManager.call(this)
};
aipo.PortletLayoutManager.inherits(shindig.LayoutManager);
aipo.PortletLayoutManager.prototype.getGadgetChrome=function(D){var C="gadget-chrome-"+D.portletId;
return C?document.getElementById(C):null
};
aipo.PsmlUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
aipo.PsmlUserPrefStore.inherits(shindig.UserPrefStore);
aipo.PsmlUserPrefStore.prototype.getPrefs=function(B){};
aipo.PsmlUserPrefStore.prototype.savePrefs=function(B){};
aipo.IfrGadget={getMainContent:function(C){var D=this.getIframeId();
gadgets.rpc.setRelayUrl(D,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(D,this.rpcToken);
C('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+D+'" name="'+D+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no"'+(this.scrolling?' scrolling="'+this.scrolling+'"':"no")+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(B){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+aipo.container.nocache_+"&country="+aipo.container.country_+"&lang="+aipo.container.language_+"&view="+aipo.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
aipo.IfrGadgetService=function(){shindig.IfrGadgetService.call(this);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestCheckActivity",this.requestCheckActivity);
gadgets.rpc.register("requestCheckTimeline",this.requestCheckTimeline)
};
aipo.IfrGadgetService.inherits(shindig.IfrGadgetService);
aipo.IfrGadgetService.prototype.setUserPref=function(U,O,Q){var S=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var R=null;
for(key in aipo.container.gadgets_){var N=aipo.container.gadgets_[key];
if(S==N.portletId){R=key;
break
}}var X={};
for(var V=1,M=arguments.length;
V<M;
V+=2){X[arguments[V]]=arguments[V+1];
if(R){aipo.container.gadgets_[R].userPrefs[arguments[V]]={};
aipo.container.gadgets_[R].userPrefs[arguments[V]]["value"]=arguments[V+1]
}}var W={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(X)};
var P="?template=UserPrefUpdateJSONScreen&js_peid="+encodeURIComponent(S);
gadgets.io.makeNonProxiedRequest(P,T,W,"application/javascript");
function T(A){if(A.rc==200){}}};
aipo.IfrGadgetService.prototype.setTitle=function(B){};
aipo.IfrGadgetService.prototype.requestNavigateTo=function(F,G){var I=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var J="?js_peid="+encodeURIComponent(I);
if(F=="canvas"){J+="&action=controls.Maximize"
}else{if(F=="home"){J+="&action=controls.Restore"
}}if(G){var H=gadgets.json.stringify(G);
if(H.length>0){J+="&appParams="+encodeURIComponent(H)
}}document.location.href=J
};
aipo.activityDesktopNotifyEnable=null;
aipo.IfrGadgetService.prototype.requestDesktopNotifyEnable=function(J){function G(A){if(A.rc==200){var B=A.data;
if(B){aipo.activityDesktopNotifyEnable=B.enable
}}}var H={};
var I={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(H)};
var F="?template=ActivityNotifyEnableJSONScreen";
if(aipo.activityDesktopNotifyEnable!=null){if(!aipo.activityDesktopNotifyEnable||window.webkitNotifications.checkPermission()!=0){window.webkitNotifications.requestPermission(function(){if(window.webkitNotifications.checkPermission()==0){F+="&enable=T";
gadgets.io.makeNonProxiedRequest(F,G,I,"application/javascript")
}})
}else{F+="&enable=F";
gadgets.io.makeNonProxiedRequest(F,G,I,"application/javascript")
}}else{gadgets.io.makeNonProxiedRequest(F,G,I,"application/javascript")
}};
aipo.activityMax=null;
aipo.IfrGadgetService.prototype.requestCheckActivity=function(F){var H={};
var I={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(H)};
var J="?template=CheckActivityJSONScreen&isRead="+F;
if(aipo.activityMax){J+="&max="+aipo.activityMax
}gadgets.io.makeNonProxiedRequest(J,G,I,"application/javascript");
function G(T){if(T.rc==200){var S=T.data;
var U=S.unreadCount;
var V={Workflow:"workflow",todo:"todo",Report:"report",Note:"note"};
aipo.activityMax=S.max;
var A=dijit.byId("activitycheckerContainer");
var R;
if(dojo.byId("messagechecker")!=undefined){R=parseInt(U)+parseInt(dojo.byId("messagechecker").innerHTML)
}else{R=parseInt(U)
}if(!R){document.title=djConfig.siteTitle
}else{if(R>99){document.title="(99+) "+djConfig.siteTitle
}else{document.title="("+R+") "+djConfig.siteTitle
}}if(A){A.onCheckActivity(U);
for(key in S.activities){var D=S.activities[key];
var B=D.appId;
var E=V[B];
if(E=="workflow"||E=="todo"||E=="report"||E=="note"){aipo.portletReload(E)
}}}if(aipo.activityDesktopNotifyEnable&&window.webkitNotifications&&window.webkitNotifications.checkPermission()==0){var C=new Array();
for(key in S.activities){var W=S.activities[key];
var X=window.webkitNotifications.createNotification("images/favicon48.png",W.displayName,W.text);
X.show();
X.ondisplay=function(K){setTimeout(function(){K.currentTarget.cancel()
},7*1000)
};
C.push(X)
}}}}};
aipo.IfrGadgetService.prototype.requestCheckTimeline=function(){var C=0;
var D=dojo.byId("getTimelineOnClick").innerHTML;
if(D!="true"){dojo.query("#timelineOuter .elastic").forEach(function(A){if(A.value!=A.defaultValue){C++
}});
if(dojo.byId("modalDialog")!=undefined&&dojo.byId("modalDialog").style.display!="none"){C++
}}if(C==0){aipo.portletReload("timeline")
}else{dojo.query(".newMessage").style("display","")
}};
aipo.IfrContainer=function(){shindig.Container.call(this);
this.context=new Array()
};
aipo.IfrContainer.inherits(shindig.Container);
aipo.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
aipo.IfrContainer.prototype.gadgetService=new aipo.IfrGadgetService();
aipo.IfrContainer.prototype.setParentUrl=function(B){if(!B.match(/^http[s]?:\/\//)){B=document.location.href.match(/^[^?#]+\//)[0]+B
}this.parentUrl_=B
};
aipo.IfrContainer.prototype.assign=function(B){this.context.push(B)
};
aipo.IfrContainer.prototype.getContext=function(){return this.context
};
aipo.IfrContainer.prototype.addGadget=function(B){this.gadgets_[this.getGadgetKey_(B.id)]=B
};
aipo.IfrContainer.prototype.renderGadget=function(D){var C=this.layoutManager.getGadgetChrome(D);
if(!D.count){D.count=0
}D.count++;
D.render(C)
};
aipo.IfrContainer.prototype.renderGadgets=function(){var H=this.context;
for(var E=0;
E<H.length;
E++){var F=H[E];
var G=this.createGadget(F);
G.setServerBase(F.serverBase);
this.addGadget(G)
}aipo.cron.start()
};
var tmpGadget;
aipo.IfrContainer.prototype.renderGadgetFromContext=function(G){var F=this.createGadget(G);
F.setServerBase(G.serverBase);
F.id=this.getNextGadgetInstanceId();
F.portletId+="-popup";
var H="gadget-chrome-"+F.portletId;
var E=H?document.getElementById(H):null;
if(!F.count){F.count=0
}F.count++;
F.render(E);
tmpGadget=F
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.portletId+"_NN_"+this.count
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var E=this;
var F=aipo.IfrGadget;
for(var D in F){if(F.hasOwnProperty(D)){E[D]=F[D]
}}};
shindig.Gadget.prototype.getContent=function(B){shindig.callAsyncAndJoin(["getMainContent"],function(A){B(A.join(""))
},this)
};
aipo.container=new aipo.IfrContainer();
aipo.container.layoutManager=new aipo.PortletLayoutManager();
aipo.container.userPrefStore=new aipo.PsmlUserPrefStore();
aipo.cron=new CronTask(function(H){var F=aipo.container.context;
var I={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(aipo.container.context)};
var J="?template=GadgetsSecurityTokenUpdateJSONScreen&view="+aipo.container.view_;
if(!aipo.cron.isFirst){J+="&update=1"
}function G(O){if(O.rc==200){var E=O.data;
for(var D=0;
D<E.length;
D++){var Q=E[D];
var P=aipo.container.gadgets_["gadget_"+Q.id];
if(!aipo.cron.isFirst){gadgets.rpc.call("remote_iframe_"+Q.portletId+"_NN_"+P.count,"update_security_token",null,Q.secureToken);
P.secureToken=Q.secureToken
}var A=Q.height;
var B=null;
if(Q.views){B=Q.views[aipo.container.view_];
var R=0;
if(B){R=B.preferredHeight
}else{var C=Q.views["default"];
if(C){R=C.preferredHeight
}}}if(A>0){P.height=A
}if(R>0){P.height=R
}P.scrolling=Q.scrolling?"true":"no";
if(aipo.cron.isFirst){aipo.container.renderGadget(P)
}}aipo.cron.isFirst=false
}}gadgets.io.makeNonProxiedRequest(J,G,I,"application/javascript");
H()
},30*60*1000,true);
aipo.cron.isFirst=true;
aipo.container.onPopupGadgets=function(){var B=document.getElementById("gadgets-popup-action");
if(B){location.href=B.href
}};