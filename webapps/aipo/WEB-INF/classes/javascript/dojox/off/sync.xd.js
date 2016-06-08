dojo._xdResourceLoaded({depends:[["provide","dojox.off.sync"],["require","dojox.storage.GearsStorageProvider"],["require","dojox.off._common"],["require","dojox.off.files"]],defineResource:function(B){if(!B._hasResource["dojox.off.sync"]){B._hasResource["dojox.off.sync"]=true;
B.provide("dojox.off.sync");
B.require("dojox.storage.GearsStorageProvider");
B.require("dojox.off._common");
B.require("dojox.off.files");
B.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(A){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(A,D){if(typeof A=="undefined"){A=true
}if(!A){this.successful=false;
this.details.push(D);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(B.hitch(this,function(F,A){if(F){this.error=true;
this.successful=false;
for(var E=0;
E<A.length;
E++){this.details.push(A[E])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
B.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(A){this.actions._save(function(){A()
})
},_load:function(A){this.actions._load(function(){A()
})
}});
B.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(A){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(A);
if(this.autoSave){this._save()
}},onReplay:function(D,A){},length:function(){return this.entries.length
},haltReplay:function(A){if(!this.isReplaying){return 
}if(A){this.reasonHalted=A.toString()
}if(this.autoSave){var D=this;
this._save(function(){D.isReplaying=false;
D.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var A=this;
this._save(function(){A.isReplaying=false;
A.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var D=this.entries[0];
this.onReplay(D,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var A=this.entries[0];
this.onReplay(A,this)
},onReplayFinished:function(){},toString:function(){var A="";
A+="[";
for(var E=0;
E<this.entries.length;
E++){A+="{";
for(var F in this.entries[E]){A+=F+': "'+this.entries[E][F]+'"';
A+=", "
}A+="}, "
}A+="]";
return A
},_save:function(A){if(!A){A=function(){}
}try{var H=this;
var G=function(E,D,C){if(E==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:D,value:C,namespace:dojox.off.STORAGE_NAMESPACE});
A()
}else{if(E==dojox.storage.SUCCESS){A()
}}};
dojox.storage.put("actionlog",this.entries,G,dojox.off.STORAGE_NAMESPACE)
}catch(F){console.debug("dojox.off.sync._save: "+F.message||F);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
A()
}},_load:function(A){var D=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!D){D=[]
}this.entries=D;
A()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}}});