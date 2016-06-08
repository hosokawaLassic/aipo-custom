if(!dojo._hasResource["dojox.flash._common"]){dojo._hasResource["dojox.flash._common"]=true;
dojo.provide("dojox.flash._common");
dojox.flash=function(){};
dojox.flash={flash6_version:null,flash8_version:null,ready:false,_visible:true,_loadedListeners:new Array(),_installingListeners:new Array(),setSwf:function(B){if(!B){return 
}if(B.flash6){this.flash6_version=B.flash6
}if(B.flash8){this.flash8_version=B.flash8
}if(B.visible){this._visible=B.visible
}this._initialize()
},useFlash6:function(){if(this.flash6_version==null){return false
}else{if(this.flash6_version!=null&&dojox.flash.info.commVersion==6){return true
}else{return false
}}},useFlash8:function(){if(this.flash8_version==null){return false
}else{if(this.flash8_version!=null&&dojox.flash.info.commVersion==8){return true
}else{return false
}}},addLoadedListener:function(B){this._loadedListeners.push(B)
},addInstallingListener:function(B){this._installingListeners.push(B)
},loaded:function(){dojox.flash.ready=true;
if(dojox.flash._loadedListeners.length>0){for(var B=0;
B<dojox.flash._loadedListeners.length;
B++){dojox.flash._loadedListeners[B].call(null)
}}},installing:function(){if(dojox.flash._installingListeners.length>0){for(var B=0;
B<dojox.flash._installingListeners.length;
B++){dojox.flash._installingListeners[B].call(null)
}}},_initialize:function(){var B=new dojox.flash.Install();
dojox.flash.installer=B;
if(B.needed()==true){B.install()
}else{dojox.flash.obj=new dojox.flash.Embed(this._visible);
dojox.flash.obj.write(dojox.flash.info.commVersion);
dojox.flash.comm=new dojox.flash.Communicator()
}}};
dojox.flash.Info=function(){if(dojo.isIE){document.write(['<script language="VBScript" type="text/vbscript">',"Function VBGetSwfVer(i)","  on error resume next","  Dim swControl, swVersion","  swVersion = 0",'  set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))',"  if (IsObject(swControl)) then",'    swVersion = swControl.GetVariable("$version")',"  end if","  VBGetSwfVer = swVersion","End Function","<\/script>"].join("\r\n"))
}this._detectVersion();
this._detectCommunicationVersion()
};
dojox.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:false,commVersion:6,installing:false,isVersionOrAbove:function(E,D,F){F=parseFloat("."+F);
if(this.versionMajor>=E&&this.versionMinor>=D&&this.versionRevision>=F){return true
}else{return false
}},getResourceList:function(F,G){var E=[];
var H=F;
E.push(H);
H=H+"?baseRelativePath="+escape(dojo.baseUrl);
E.push(H);
H+="'%20'%20quality=";
E.push(H);
H=G;
E.push(H);
H+="?baseRelativePath="+escape(dojo.baseUrl);
E.push(H);
H+="'%20'%20quality=";
E.push(H);
E.push(dojo.moduleUrl("dojox","flash/flash6/flash6_gateway.swf")+"");
return E
},_detectVersion:function(){var H;
for(var L=25;
L>0;
L--){if(dojo.isIE){H=VBGetSwfVer(L)
}else{H=this._JSFlashInfo(L)
}if(H==-1){this.capable=false;
return 
}else{if(H!=0){var J;
if(dojo.isIE){var I=H.split(" ");
var K=I[1];
J=K.split(",")
}else{J=H.split(".")
}this.versionMajor=J[0];
this.versionMinor=J[1];
this.versionRevision=J[2];
var G=this.versionMajor+"."+this.versionRevision;
this.version=parseFloat(G);
this.capable=true;
break
}}}},_JSFlashInfo:function(M){if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var Q=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var P=navigator.plugins["Shockwave Flash"+Q].description;
var K=P.split(" ");
var T=K[2].split(".");
var N=T[0];
var O=T[1];
if(K[3]!=""){var L=K[3].split("r")
}else{var L=K[4].split("r")
}var S=L[1]>0?L[1]:0;
var R=N+"."+O+"."+S;
return R
}}return -1
},_detectCommunicationVersion:function(){if(this.capable==false){this.commVersion=null;
return 
}if(typeof djConfig.forceFlashComm!="undefined"&&typeof djConfig.forceFlashComm!=null){this.commVersion=djConfig.forceFlashComm;
return 
}if(dojo.isSafari||dojo.isOpera){this.commVersion=8
}else{this.commVersion=6
}}};
dojox.flash.Embed=function(B){this._visible=B
};
dojox.flash.Embed.prototype={width:215,height:138,id:"flashObject",_visible:true,protocol:function(){switch(window.location.protocol){case"https:":return"https";
break;
default:return"http";
break
}},write:function(T,N){N=!!N;
var P="";
P+=("width: "+this.width+"px; ");
P+=("height: "+this.height+"px; ");
if(this._visible==false){P+="position: absolute; z-index: 10000; top: -1000px; left: -1000px; "
}var K;
var O;
if(T==6){O=dojox.flash.flash6_version;
var S=djConfig.baseRelativePath;
O=O+"?baseRelativePath="+escape(S);
K='<embed id="'+this.id+'" src="'+O+'"     quality="high" bgcolor="#ffffff"     width="'+this.width+'" height="'+this.height+'"     name="'+this.id+'"     align="middle" allowScriptAccess="sameDomain"     type="application/x-shockwave-flash" swLiveConnect="true"     pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer">'
}else{O=dojox.flash.flash8_version;
var Q=O;
var L=O;
var S=djConfig.baseRelativePath;
if(N){var R=escape(window.location);
document.title=document.title.slice(0,47)+" - Flash Player Installation";
var M=escape(document.title);
Q+="?MMredirectURL="+R+"&MMplayerType=ActiveX&MMdoctitle="+M+"&baseRelativePath="+escape(S);
L+="?MMredirectURL="+R+"&MMplayerType=PlugIn&baseRelativePath="+escape(S)
}if(L.indexOf("?")==-1){L+="?baseRelativePath="+escape(S)+"' "
}K='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+this.protocol()+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" align="middle"> <param name="allowScriptAccess" value="sameDomain" /> <param name="movie" value="'+Q+'" /> <param name="quality" value="high" /> <param name="bgcolor" value="#ffffff" /> <embed src="'+L+'\' quality="high" bgcolor="#ffffff" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" name="'+this.id+'" swLiveConnect="true" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer" /></object>'
}K='<div id="'+this.id+'Container" style="'+P+'"> '+K+"</div>";
document.writeln(K)
},get:function(){return document.getElementById(this.id)
},setVisible:function(D){var C=dojo.byId(this.id+"Container");
if(D==true){C.style.visibility="visible"
}else{C.style.position="absolute";
C.style.x="-1000px";
C.style.y="-1000px";
C.style.visibility="hidden"
}},center:function(){var D=100;
var E=100;
var F=dojo.byId(this.id+"Container");
F.style.top=E+"px";
F.style.left=D+"px"
}};
dojox.flash.Communicator=function(){if(dojox.flash.useFlash6()){this._writeFlash6()
}else{if(dojox.flash.useFlash8()){this._writeFlash8()
}}};
dojox.flash.Communicator.prototype={_writeFlash6:function(){var B=dojox.flash.obj.id;
document.writeln('<script language="JavaScript">');
document.writeln("  function "+B+"_DoFSCommand(command, args){ ");
document.writeln("    dojox.flash.comm._handleFSCommand(command, args); ");
document.writeln("}");
document.writeln("<\/script>");
if(dojo.isIE){document.writeln("<SCRIPT LANGUAGE=VBScript> ");
document.writeln("on error resume next ");
document.writeln("Sub "+B+"_FSCommand(ByVal command, ByVal args)");
document.writeln(" call "+B+"_DoFSCommand(command, args)");
document.writeln("end sub");
document.writeln("</SCRIPT> ")
}},_writeFlash8:function(){},_handleFSCommand:function(D,C){if((D)&&dojo.isString(D)&&(/^FSCommand:(.*)/.test(D)==true)){D=D.match(/^FSCommand:(.*)/)[1]
}if(D=="addCallback"){this._fscommandAddCallback(D,C)
}else{if(D=="call"){this._fscommandCall(D,C)
}else{if(D=="fscommandReady"){this._fscommandReady()
}}}},_fscommandAddCallback:function(F,H){var G=H;
var E=function(){return dojox.flash.comm._call(G,arguments)
};
dojox.flash.comm[G]=E;
dojox.flash.obj.get().SetVariable("_succeeded",true)
},_fscommandCall:function(command,args){var plugin=dojox.flash.obj.get();
var functionName=args;
var numArgs=parseInt(plugin.GetVariable("_numArgs"));
var flashArgs=new Array();
for(var i=0;
i<numArgs;
i++){var currentArg=plugin.GetVariable("_"+i);
flashArgs.push(currentArg)
}var runMe;
if(functionName.indexOf(".")==-1){runMe=window[functionName]
}else{runMe=eval(functionName)
}var results=null;
if(dojo.isFunction(runMe)){results=runMe.apply(null,flashArgs)
}plugin.SetVariable("_returnResult",results)
},_fscommandReady:function(){var B=dojox.flash.obj.get();
B.SetVariable("fscommandReady","true")
},_call:function(H,G){var J=dojox.flash.obj.get();
J.SetVariable("_functionName",H);
J.SetVariable("_numArgs",G.length);
for(var K=0;
K<G.length;
K++){var I=G[K];
I=I.replace(/\0/g,"\\0");
J.SetVariable("_"+K,I)
}J.TCallLabel("/_flashRunner","execute");
var L=J.GetVariable("_returnResult");
L=L.replace(/\\0/g,"\0");
return L
},_addExternalInterfaceCallback:function(C){var D=function(){var B=new Array(arguments.length);
for(var A=0;
A<arguments.length;
A++){B[A]=arguments[A]
}return dojox.flash.comm._execFlash(C,B)
};
dojox.flash.comm[C]=D
},_encodeData:function(C){var D=/\&([^;]*)\;/g;
C=C.replace(D,"&amp;$1;");
C=C.replace(/</g,"&lt;");
C=C.replace(/>/g,"&gt;");
C=C.replace("\\","&custom_backslash;&custom_backslash;");
C=C.replace(/\n/g,"\\n");
C=C.replace(/\r/g,"\\r");
C=C.replace(/\f/g,"\\f");
C=C.replace(/\0/g,"\\0");
C=C.replace(/\'/g,"\\'");
C=C.replace(/\"/g,'\\"');
return C
},_decodeData:function(data){if(data==null||typeof data=="undefined"){return data
}data=data.replace(/\&custom_lt\;/g,"<");
data=data.replace(/\&custom_gt\;/g,">");
data=eval('"'+data+'"');
return data
},_chunkArgumentData:function(J,K){var M=dojox.flash.obj.get();
var L=Math.ceil(J.length/1024);
for(var O=0;
O<L;
O++){var P=O*1024;
var I=O*1024+1024;
if(O==(L-1)){I=O*1024+J.length
}var N=J.substring(P,I);
N=this._encodeData(N);
M.CallFunction('<invoke name="chunkArgumentData" returntype="javascript"><arguments><string>'+N+"</string><number>"+K+"</number></arguments></invoke>")
}},_chunkReturnData:function(){var J=dojox.flash.obj.get();
var I=J.getReturnLength();
var H=new Array();
for(var L=0;
L<I;
L++){var K=J.CallFunction('<invoke name="chunkReturnData" returntype="javascript"><arguments><number>'+L+"</number></arguments></invoke>");
if(K=='""'||K=="''"){K=""
}else{K=K.substring(1,K.length-1)
}H.push(K)
}var G=H.join("");
return G
},_execFlash:function(J,F){var G=dojox.flash.obj.get();
G.startExec();
G.setNumberArguments(F.length);
for(var H=0;
H<F.length;
H++){this._chunkArgumentData(F[H],H)
}G.exec(J);
var I=this._chunkReturnData();
I=this._decodeData(I);
G.endExec();
return I
}};
dojox.flash.Install=function(){};
dojox.flash.Install.prototype={needed:function(){if(dojox.flash.info.capable==false){return true
}var B=(navigator.appVersion.indexOf("Macintosh")>=0);
if(B&&(!dojox.flash.info.isVersionOrAbove(8,0,0))){return true
}if(!dojox.flash.info.isVersionOrAbove(6,0,0)){return true
}return false
},install:function(){dojox.flash.info.installing=true;
dojox.flash.installing();
if(dojox.flash.info.capable==false){var B=new dojox.flash.Embed(false);
B.write(8)
}else{if(dojox.flash.info.isVersionOrAbove(6,0,65)){var B=new dojox.flash.Embed(false);
B.write(8,true);
B.setVisible(true);
B.center()
}else{alert("This content requires a more recent version of the Macromedia  Flash Player.");
window.location.href=+dojox.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}}},_onInstallStatus:function(B){if(B=="Download.Complete"){dojox.flash._initialize()
}else{if(B=="Download.Cancelled"){alert("This content requires a more recent version of the Macromedia  Flash Player.");
window.location.href=dojox.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}else{if(B=="Download.Failed"){alert("There was an error downloading the Flash Player update. Please try again later, or visit macromedia.com to download the latest version of the Flash plugin.")
}}}}};
dojox.flash.info=new dojox.flash.Info()
};