dojo._xdResourceLoaded({depends:[["provide","dojox._cometd.cometd"],["require","dojo.AdapterRegistry"],["require","dojo.io.script"]],defineResource:function(B){if(!B._hasResource["dojox._cometd.cometd"]){B._hasResource["dojox._cometd.cometd"]=true;
B.provide("dojox._cometd.cometd");
B.require("dojo.AdapterRegistry");
B.require("dojo.io.script");
dojox.cometd=new function(){this._initialized=false;
this._connected=false;
this._polling=false;
this.connectionTypes=new B.AdapterRegistry(true);
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
this.tunnelInit=function(D,A){};
this.tunnelCollapse=function(){console.debug("tunnel collapsed!")
};
this.init=function(O,P,A){P=P||{};
P.version=this.version;
P.minimumVersion=this.minimumVersion;
P.channel="/meta/handshake";
P.id=""+this.messageId++;
this.url=O||djConfig.cometdRoot;
if(!this.url){console.debug("no cometd root specified in djConfig and no root passed");
return 
}var Q="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var N=(""+window.location).match(new RegExp(Q));
if(N[4]){var S=N[4].split(":");
var M=S[0];
var U=S[1]||"80";
N=this.url.match(new RegExp(Q));
if(N[4]){S=N[4].split(":");
var V=S[0];
var R=S[1]||"80";
this._isXD=((V!=M)||(R!=U))
}}if(!this._isXD){if(P.ext){if(P.ext["json-comment-filtered"]!==true&&P.ext["json-comment-filtered"]!==false){P.ext["json-comment-filtered"]=true
}}else{P.ext={"json-comment-filtered":true}
}}var T={url:this.url,handleAs:this.handleAs,content:{message:B.toJson([P])},load:B.hitch(this,"finishInit"),error:function(C){console.debug("handshake error!:",C)
}};
if(A){B.mixin(T,A)
}this._props=P;
this._initialized=true;
this.batch=0;
this.startBatch();
if(this._isXD){T.callbackParamName="jsonp";
return B.io.script.get(T)
}return B.xhrPost(T)
};
this.finishInit=function(A){A=A[0];
this.handshakeReturn=A;
if(A.advice){this.advice=A.advice
}if(!A.successful){console.debug("cometd init failed");
if(this.advice&&this.advice.reconnect=="none"){return 
}if(this.advice&&this.advice.interval&&this.advice.interval>0){var D=this;
setTimeout(function(){D.init(D.url,D._props)
},this.advice.interval)
}else{this.init(this.url,this._props)
}return 
}if(A.version<this.minimumVersion){console.debug("cometd protocol version mismatch. We wanted",this.minimumVersion,"but got",A.version);
return 
}this.currentTransport=this.connectionTypes.match(A.supportedConnectionTypes,A.version,this._isXD);
this.currentTransport._cometd=this;
this.currentTransport.version=A.version;
this.clientId=A.clientId;
this.tunnelInit=B.hitch(this.currentTransport,"tunnelInit");
this.tunnelCollapse=B.hitch(this.currentTransport,"tunnelCollapse");
this.currentTransport.startup(A)
};
this.deliver=function(A){B.forEach(A,this._deliver,this);
return A
};
this._deliver=function(E){if(!E.channel){if(E.success!==true){console.debug("cometd error: no channel for message!",E);
return 
}}this.lastMessage=E;
if(E.advice){this.advice=E.advice
}if((E.channel)&&(E.channel.length>5)&&(E.channel.substr(0,5)=="/meta")){switch(E.channel){case"/meta/connect":if(E.successful&&!this._connected){this._connected=this._initialized;
this.endBatch()
}else{if(!this._initialized){this._connected=false
}}break;
case"/meta/subscribe":var A=this.pendingSubscriptions[E.subscription];
if(!E.successful){if(A){A.errback(new Error(E.error));
delete this.pendingSubscriptions[E.subscription]
}return 
}dojox.cometd.subscribed(E.subscription,E);
if(A){A.callback(true);
delete this.pendingSubscriptions[E.subscription]
}break;
case"/meta/unsubscribe":var A=this.pendingUnsubscriptions[E.subscription];
if(!E.successful){if(A){A.errback(new Error(E.error));
delete this.pendingUnsubscriptions[E.subscription]
}return 
}this.unsubscribed(E.subscription,E);
if(A){A.callback(true);
delete this.pendingUnsubscriptions[E.subscription]
}break
}}this.currentTransport.deliver(E);
if(E.data){var F="/cometd"+E.channel;
B.publish(F,[E])
}};
this.disconnect=function(){B.forEach(this._subscriptions,B.unsubscribe);
this._subscriptions=[];
this._messageQ=[];
if(this._initialized&&this.currentTransport){this._initialized=false;
this.currentTransport.disconnect()
}this._initialized=false;
if(!this._polling){this._connected=false
}};
this.publish=function(F,A,H){var G={data:A,channel:F};
if(H){B.mixin(G,H)
}this._sendMessage(G)
};
this._sendMessage=function(A){if(this.currentTransport&&this._connected&&this.batch==0){return this.currentTransport.sendMessages([A])
}else{this._messageQ.push(A)
}};
this.subscribe=function(J,L,A){if(this.pendingSubscriptions[J]){var N=this.pendingSubscriptions[J];
N.cancel();
delete this.pendingSubscriptions[J]
}var I=new B.Deferred();
this.pendingSubscriptions[J]=I;
if(L){var K="/cometd"+J;
if(this.topics[K]){B.unsubscribe(this.topics[K])
}var M=B.subscribe(K,L,A);
this.topics[K]=M
}this._sendMessage({channel:"/meta/subscribe",subscription:J});
return I
};
this.subscribed=function(A,D){};
this.unsubscribe=function(F){if(this.pendingUnsubscriptions[F]){var H=this.pendingUnsubscriptions[F];
H.cancel();
delete this.pendingUnsubscriptions[F]
}var A=new B.Deferred();
this.pendingUnsubscriptions[F]=A;
var G="/cometd"+F;
if(this.topics[G]){B.unsubscribe(this.topics[G])
}this._sendMessage({channel:"/meta/unsubscribe",subscription:F});
return A
};
this.unsubscribed=function(A,D){};
this.startBatch=function(){this.batch++
};
this.endBatch=function(){if(--this.batch<=0&&this.currentTransport&&this._connected){this.batch=0;
var A=this._messageQ;
this._messageQ=[];
if(A.length>0){this.currentTransport.sendMessages(A)
}}};
this._onUnload=function(){B.addOnUnload(dojox.cometd,"disconnect")
}
};
dojox.cometd.longPollTransport=new function(){this._connectionType="long-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(A,F,E){return((!E)&&(B.indexOf(A,"long-polling")>=0))
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:B.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=function(){if(!this._cometd._polling){this._cometd._polling=false;
if(this._cometd.advice){if(this._cometd.advice.reconnect=="none"){return 
}if((this._cometd.advice.interval)&&(this._cometd.advice.interval>0)){var A=this;
setTimeout(function(){A._connect()
},this._cometd.advice.interval)
}else{this._connect()
}}else{this._connect()
}}};
this._connect=function(){if((this._cometd.advice)&&(this._cometd.advice.reconnect=="handshake")){this._cometd.init(this._cometd.url,this._cometd._props)
}else{if(this._cometd._connected){this.openTunnelWith({message:B.toJson([{channel:"/meta/connect",connectionType:this._connectionType,clientId:this._cometd.clientId,timestamp:this.lastTimestamp,id:""+this._cometd.messageId++}])})
}}};
this.deliver=function(A){if(A.timestamp){this.lastTimestamp=A.timestamp
}};
this.openTunnelWith=function(E,F){var A=B.xhrPost({url:(F||this._cometd.url),content:E,handleAs:this._cometd.handleAs,load:B.hitch(this,function(C){this._cometd._polling=false;
this._cometd.deliver(C);
this.tunnelCollapse()
}),error:function(C){console.debug("tunnel opening failed:",C);
B.cometd._polling=false
}});
this._cometd._polling=true
};
this.sendMessages=function(A){for(var D=0;
D<A.length;
D++){A[D].clientId=this._cometd.clientId;
A[D].id=""+this._cometd.messageId++
}return B.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,load:B.hitch(this._cometd,"deliver"),content:{message:B.toJson(A)}})
};
this.startup=function(A){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=function(){B.xhrPost({url:this._cometd.url||djConfig.cometdRoot,handleAs:this._cometd.handleAs,content:{message:B.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.callbackPollTransport=new function(){this._connectionType="callback-polling";
this._cometd=null;
this.lastTimestamp=null;
this.check=function(A,F,E){return(B.indexOf(A,"callback-polling")>=0)
};
this.tunnelInit=function(){if(this._cometd._polling){return 
}this.openTunnelWith({message:B.toJson([{channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++}])})
};
this.tunnelCollapse=dojox.cometd.longPollTransport.tunnelCollapse;
this._connect=dojox.cometd.longPollTransport._connect;
this.deliver=dojox.cometd.longPollTransport.deliver;
this.openTunnelWith=function(A,D){B.io.script.get({load:B.hitch(this,function(C){this._cometd._polling=false;
this._cometd.deliver(C);
this.tunnelCollapse()
}),error:function(){this._cometd._polling=false;
console.debug("tunnel opening failed")
},url:(D||this._cometd.url),content:A,callbackParamName:"jsonp"});
this._cometd._polling=true
};
this.sendMessages=function(A){for(var E=0;
E<A.length;
E++){A[E].clientId=this._cometd.clientId;
A[E].id=""+this._cometd.messageId++
}var F={url:this._cometd.url||djConfig.cometdRoot,load:B.hitch(this._cometd,"deliver"),callbackParamName:"jsonp",content:{message:B.toJson(A)}};
return B.io.script.get(F)
};
this.startup=function(A){if(this._cometd._connected){return 
}this.tunnelInit()
};
this.disconnect=dojox.cometd.longPollTransport.disconnect;
this.disconnect=function(){B.io.script.get({url:this._cometd.url||djConfig.cometdRoot,callbackParamName:"jsonp",content:{message:B.toJson([{channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++}])}})
}
};
dojox.cometd.connectionTypes.register("long-polling",dojox.cometd.longPollTransport.check,dojox.cometd.longPollTransport);
dojox.cometd.connectionTypes.register("callback-polling",dojox.cometd.callbackPollTransport.check,dojox.cometd.callbackPollTransport);
B.addOnUnload(dojox.cometd,"_onUnload")
}}});