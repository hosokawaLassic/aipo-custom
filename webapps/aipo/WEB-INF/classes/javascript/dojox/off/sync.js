if(!dojo._hasResource["dojox.off.sync"]){dojo._hasResource["dojox.off.sync"]=true;
dojo.provide("dojox.off.sync");
dojo.require("dojox.storage.GearsStorageProvider");
dojo.require("dojox.off._common");
dojo.require("dojox.off.files");
dojo.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(B){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(D,C){if(typeof D=="undefined"){D=true
}if(!D){this.successful=false;
this.details.push(C);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(D,E){if(D){this.error=true;
this.successful=false;
for(var F=0;
F<E.length;
F++){this.details.push(E[F])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
dojo.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(B){this.actions._save(function(){B()
})
},_load:function(B){this.actions._load(function(){B()
})
}});
dojo.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(B){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(B);
if(this.autoSave){this._save()
}},onReplay:function(C,D){},length:function(){return this.entries.length
},haltReplay:function(D){if(!this.isReplaying){return 
}if(D){this.reasonHalted=D.toString()
}if(this.autoSave){var C=this;
this._save(function(){C.isReplaying=false;
C.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var D=this;
this._save(function(){D.isReplaying=false;
D.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var C=this.entries[0];
this.onReplay(C,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var B=this.entries[0];
this.onReplay(B,this)
},onReplayFinished:function(){},toString:function(){var E="";
E+="[";
for(var F=0;
F<this.entries.length;
F++){E+="{";
for(var D in this.entries[F]){E+=D+': "'+this.entries[F][D]+'"';
E+=", "
}E+="}, "
}E+="]";
return E
},_save:function(F){if(!F){F=function(){}
}try{var E=this;
var H=function(C,B,A){if(C==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:B,value:A,namespace:dojox.off.STORAGE_NAMESPACE});
F()
}else{if(C==dojox.storage.SUCCESS){F()
}}};
dojox.storage.put("actionlog",this.entries,H,dojox.off.STORAGE_NAMESPACE)
}catch(G){console.debug("dojox.off.sync._save: "+G.message||G);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
F()
}},_load:function(D){var C=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!C){C=[]
}this.entries=C;
D()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
};