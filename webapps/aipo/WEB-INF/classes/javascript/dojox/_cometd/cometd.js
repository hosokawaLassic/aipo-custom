if(!dojo._hasResource["dojox._cometd.cometd"]){dojo._hasResource["dojox._cometd.cometd"]=true;
dojo.provide("dojox._cometd.cometd");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.io.script");
dojox.cometd=new function(){this._initialized=false;
this._connected=false;
this._polling=false;
this.connectionTypes=new dojo.AdapterRegistry(true);
this.version="1.0";
this.minimumVersion="0.9";
this.clientId=null;
this.messageId=0;
this.batch=0;
this._isXD=false;
this.handshakeReturn=null;
this.currentTransport=null;
this.url=null;
this.lastMessage=null;
this.topics={};
this._messageQ=[];
this.handleAs="json-comment-optional";
this.advice;
this.pendingSubscriptions={};
this.pendingUnsubscriptions={};
this._subscriptions=[];
this.tunnelInit=function(C,D){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(P,Q,M){Q=Q||{};
Q.version=this.version;
Q.minimumVersion=this.minimumVersion;
Q.channel="/meta/handshake";
Q.id=""+this.messageId++;
this.url=P||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var R="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var O=(""+window.location).match(new RegExp(R));
if(O[4]){var T=O[4].split(":");
var N=T[0];
var V=T[1]||"80";
O=this.url.match(new RegExp(R));
if(O[4]){T=O[4].split(":");
var L=T[0];
var S=T[1]||"80";
this._isXD=((L!=N)||(S!=V))
}}if(!this._isXD){if(Q.ext){if(Q.ext["json-comment-filtered"]!==true&&Q.ext["json-comment-filtered"]!==false){Q.ext["json-comment-filtered"]=true
}}else{Q.ext={"json-comment-filtered":true}
}}var U={url:this.url,handleAs:this.handleAs,content:{message:dojo.toJson([Q])},load:dojo.hitch(this,"finishInit"),error:function(A){console.debug("handshake error!:",A)
}};
if(M){dojo.mixin(U,M)
}this._props=Q;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){U.callbackParamName="jsonp";
return dojo.io.script.get(U)
}return dojo.xhrPost(U)
};
this.finishInit=function(D){D=D[0];
this.handshakeReturn=D;
if(D.advice){this.advice=D.advice
}if(!D.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var C=this;
setTimeout(function(){C.init(C.url,C._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(D.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",D.version);
return 
}this.currentTransport=this.connectionTypes.match(D.supportedConnectionTypes,D.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=D.version;
this.clientId=D.clientId;
this.tunnelInit=dojo.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=dojo.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(D)
};
this.deliver=function(B){dojo.forEach(B,this._deliver,this);
return B
};
this._deliver=function(F){if(!F.channel){if(F.success!==true){console.debug("cometd error: no channel for message!",F);
return 
}}this.lastMessage=F;
if(F.advice){this.advice=F.advice
}if((F.channel)&&(F.channel.length>5)&&(F.channel.substr(0,5)=="/meta")){switch(F.channel){case"/meta/connect":if(F.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var E=this.pendingSubscriptions[F.subscription];
if(!F.successful){if(E){E.errback(new Error(F.error));
delete this.pendingSubscriptions[F.subscription]
}return 
}dojox.cometd.subscribed(F.subscription,F);
if(E){E.callback(true);
delete this.pendingSubscriptions[F.subscription]
}break;
case"/meta/unsubscribe":var E=this.pendingUnsubscriptions[F.subscription];
if(!F.successful){if(E){E.errback(new Error(F.error));
delete this.pendingUnsubscriptions[F.subscription]
}return 
}this.unsubscribed(F.subscription,F);
if(E){E.callback(true);
delete this.pendingUnsubscriptions[F.subscription]
}break
}}this.currentTransport.deliver(F);
if(F.data){var D="/cometd"+F.channel;
dojo.publish(D,[F])
}};
this.disconnect=function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(G,F,E){var H={data:F,channel:G};
if(E){dojo.mixin(H,E)
}this._sendMessage(H)
};
this._sendMessage=function(B){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([B])
}else{this._messageQ.push(B)
}};
this.subscribe=function(K,M,I){if(this.pendingSubscriptions[K]){var H=this.pendingSubscriptions[K];
H.cancel();
delete this.pendingSubscriptions[K]
}var J=new dojo.Deferred();
this.pendingSubscriptions[K]=J;
if(M){var L="/cometd"+K;
if(this.topics[L]){dojo.unsubscribe(this.topics[L])
}var N=dojo.subscribe(L,M,I);
this.topics[L]=N
}this._sendMessage({channel:"/meta/subscribe",subscription:K});
return J
};
this.subscribed=function(D,C){};
this.unsubscribe=function(G){if(this.pendingUnsubscriptions[G]){var E=this.pendingUnsubscriptions[G];
E.cancel();
delete this.pendingUnsubscriptions[G]
}var F=new dojo.Deferred();
this.pendingUnsubscriptions[G]=F;
var H="/cometd"+G;
if(this.topics[H]){dojo.unsubscribe(this.topics[H])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:G});
return F
};
this.unsubscribed=function(D,C){};
this.startBatch=function(){this.batch++
};
this.endBatch=function(){if(--this.batch<=0&&this.currentTransport&&this._connected){this.batch=0;
var B=this._messageQ;
this._messageQ=[];
if(B.length>0){this.currentTransport.sendMessages(B)
}}};
this._onUnload=function(){dojo.addOnUnload(dojox.cometd,"disconnect")
}
};
dojox.cometd.longPollTransport=new function(){this._connectionType="long-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(E,D,F){return((!F)&&(dojo.indexOf(E,"long-polling")>=0))
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=function(){if(!this._cometd._polling){this._cometd._polling=false;
if(this._cometd.advice){if(this._cometd.advice.reconnect=="none"){return 
}if((this._cometd.advice.interval)&&(this._cometd.advice.interval>0)){var B=this;
setTimeout(function(){B._connect()
},this._cometd.advice.interval)
}else{this._connect()
}}else{this._connect()
}}};
this._connect=function(){if((this._cometd.advice)&&(this._cometd.advice.reconnect=="handshake")){this._cometd.init(this._cometd.url,this._cometd._props)
}else{if(this._cometd._connected){this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",connectionType:this._connectionType,clientId:this._cometd.clientId,timestamp:this.lastTimestamp,id:""+this._cometd.messageId++}])})
}}};
this.deliver=function(B){if(B.timestamp){this.lastTimestamp=B.timestamp
}};
this.openTunnelWith=function(F,D){var E=dojo.xhrPost({url:(D||this._cometd.url),content:F,handleAs:this._cometd.handleAs,load:dojo.hitch(this,function(A){this._cometd._polling=false;
this._cometd.deliver(A);
this.tunnelCollapse()
}),error:function(A){console.debug("tunnel opening failed:",A);
dojo.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(D){for(var C=0;
C<D.length;
C++){D[C].clientId=this._cometd.clientId;
D[C].id=""+this._cometd.messageId++
}return dojo.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:dojo.hitch(this._cometd,"deliver"),content:{message:dojo.toJson(D)}})
};
this.startup=function(B){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=function(){dojo.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,content:{message:dojo.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.callbackPollTransport=new function(){this._connectionType="callback-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(E,D,F){return(dojo.indexOf(E,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:dojo.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(D,C){dojo.io.script.get({load:dojo.hitch(this,function(A){this._cometd._polling=false;
this._cometd.deliver(A);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(C||this._cometd.url),content:D,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(E){for(var F=0;
F<E.length;
F++){E[F].clientId=this._cometd.clientId;
E[F].id=""+this._cometd.messageId++
}var D={url:this._cometd.url||djConfig.cometdRoot,load:dojo.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:dojo.toJson(E)}};
return dojo.io.script.get(D)
};
this.startup=function(B){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=dojox.cometd.longPollTransport.disconnect;
this.disconnect=function(){dojo.io.script.get({url:this._cometd.url||djConfig.cometdRoot,callbackParamName:"jsonp",content:{message:dojo.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.connectionTypes.register("long-polling",dojox.cometd.longPollTransport.check,dojox.cometd.longPollTransport);
dojox.cometd.connectionTypes.register("callback-polling",dojox.cometd.callbackPollTransport.check,dojox.cometd.callbackPollTransport);
dojo.addOnUnload(dojox.cometd,"_onUnload")
};