if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(F,G,H,E){console.warn("dojox.storage.put not implemented")
},get:function(D,C){console.warn("dojox.storage.get not implemented")
},hasKey:function(D,C){return(this.get(D)!=null)
},getKeys:function(B){console.warn("dojox.storage.getKeys not implemented")
},clear:function(B){console.warn("dojox.storage.clear not implemented")
},remove:function(D,C){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(H,E,F,G){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(D,C){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(D,C){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(D){if(D===null||typeof D==="undefined"||!D instanceof Array){return false
}for(var C=0;
C<D.length;
C++){if(!this.isValidKey(D[C])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(B){if((B==null)||(typeof B=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(B)
},getResourceList:function(){return[]
}})
}if(!dojo._hasResource["dojox.storage.manager"]){dojo._hasResource["dojox.storage.manager"]=true;
dojo.provide("dojox.storage.manager");
dojox.storage.manager=new function(){this.currentProvider=null;
this.available=false;
this._initialized=false;
this._providers=[];
this._onLoadListeners=[];
this.initialize=function(){this.autodetect()
};
this.register=function(_18,_19){this._providers[this._providers.length]=_19;
this._providers[_18]=_19
};
this.setProvider=function(_1a){};
this.autodetect=function(){if(this._initialized){return 
}var _1b=djConfig.forceStorageProvider||false;
var _1c;
for(var i=0;
i<this._providers.length;
i++){_1c=this._providers[i];
if(_1b==_1c.declaredClass){_1c.isAvailable();
break
}else{if(_1c.isAvailable()){break
}}}if(!_1c){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=_1c;
dojo.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(_1e){this._onLoadListeners.push(_1e);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(_1f){for(var i=0;
i<this._onLoadListeners.length;
i++){if(_1f==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(_21){try{var _22=eval("new "+_21+"()");
var _23=_22.isAvailable();
if(!_23){return false
}return _23
}catch(e){return false
}};
this.getProvider=function(){return this.currentProvider
};
this.loaded=function(){this._fireLoaded()
};
this._fireLoaded=function(){dojo.forEach(this._onLoadListeners,function(i){try{i()
}catch(e){console.debug(e)
}})
};
this.getResourceList=function(){var _25=[];
dojo.forEach(dojox.storage.manager._providers,function(_26){_25=_25.concat(_26.getResourceList())
});
return _25
}
}
}if(!dojo._hasResource["dojox._sql._crypto"]){dojo._hasResource["dojox._sql._crypto"]=true;
dojo.provide("dojox._sql._crypto");
dojo.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(G,H,E){this._initWorkerPool();
var F={plaintext:G,password:H};
F=dojo.toJson(F);
F="encr:"+String(F);
this._assignWork(F,E)
},decrypt:function(G,H,E){this._initWorkerPool();
var F={ciphertext:G,password:H};
F=dojo.toJson(F);
F="decr:"+String(F);
this._assignWork(F,E)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var F=this;
this._manager.onmessage=function(A,B){var C=F._employed["_"+B];
F._employed["_"+B]=undefined;
F._unemployed.push("_"+B);
if(F._handleMessage.length){var D=F._handleMessage.shift();
F._assignWork(D.msg,D.callback)
}C(A)
};
var G="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var H=G+" _workerInit();";
for(var J=0;
J<this._POOL_SIZE;
J++){this._unemployed.push("_"+this._manager.createWorker(H))
}}catch(I){throw I.message||I
}}},_assignWork:function(E,F){if(!this._handleMessage.length&&this._unemployed.length){var D=this._unemployed.shift().substring(1);
this._employed["_"+D]=F;
this._manager.sendMessage(E,D)
}else{this._handleMessage={msg:E,callback:F}
}},_workerHandler:function(msg,_3b){var _3c=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var _3d=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
function Cipher(_3e,w){var Nb=4;
var Nr=w.length/Nb-1;
var _42=[[],[],[],[]];
for(var i=0;
i<4*Nb;
i++){_42[i%4][Math.floor(i/4)]=_3e[i]
}_42=AddRoundKey(_42,w,0,Nb);
for(var _44=1;
_44<Nr;
_44++){_42=SubBytes(_42,Nb);
_42=ShiftRows(_42,Nb);
_42=MixColumns(_42,Nb);
_42=AddRoundKey(_42,w,_44,Nb)
}_42=SubBytes(_42,Nb);
_42=ShiftRows(_42,Nb);
_42=AddRoundKey(_42,w,Nr,Nb);
var _45=new Array(4*Nb);
for(var i=0;
i<4*Nb;
i++){_45[i]=_42[i%4][Math.floor(i/4)]
}return _45
}function SubBytes(s,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){s[r][c]=_3c[s[r][c]]
}}return s
}function ShiftRows(s,Nb){var t=new Array(4);
for(var r=1;
r<4;
r++){for(var c=0;
c<4;
c++){t[c]=s[r][(c+r)%Nb]
}for(var c=0;
c<4;
c++){s[r][c]=t[c]
}}return s
}function MixColumns(s,Nb){for(var c=0;
c<4;
c++){var a=new Array(4);
var b=new Array(4);
for(var i=0;
i<4;
i++){a[i]=s[i][c];
b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1
}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];
s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];
s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];
s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]
}return s
}function AddRoundKey(_55,w,rnd,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){_55[r][c]^=w[rnd*4+c][r]
}}return _55
}function KeyExpansion(key){var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var _60=new Array(4);
for(var i=0;
i<Nk;
i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r
}for(var i=Nk;
i<(Nb*(Nr+1));
i++){w[i]=new Array(4);
for(var t=0;
t<4;
t++){_60[t]=w[i-1][t]
}if(i%Nk==0){_60=SubWord(RotWord(_60));
for(var t=0;
t<4;
t++){_60[t]^=_3d[i/Nk][t]
}}else{if(Nk>6&&i%Nk==4){_60=SubWord(_60)
}}for(var t=0;
t<4;
t++){w[i][t]=w[i-Nk][t]^_60[t]
}}return w
}function SubWord(w){for(var i=0;
i<4;
i++){w[i]=_3c[w[i]]
}return w
}function RotWord(w){w[4]=w[0];
for(var i=0;
i<4;
i++){w[i]=w[i+1]
}return w
}function AESEncryptCtr(_68,_69,_6a){if(!(_6a==128||_6a==192||_6a==256)){return""
}var _6b=_6a/8;
var _6c=new Array(_6b);
for(var i=0;
i<_6b;
i++){_6c[i]=_69.charCodeAt(i)&255
}var key=Cipher(_6c,KeyExpansion(_6c));
key=key.concat(key.slice(0,_6b-16));
var _6f=16;
var _70=new Array(_6f);
var _71=(new Date()).getTime();
for(var i=0;
i<4;
i++){_70[i]=(_71>>>i*8)&255
}for(var i=0;
i<4;
i++){_70[i+4]=(_71/4294967296>>>i*8)&255
}var _72=KeyExpansion(key);
var _73=Math.ceil(_68.length/_6f);
var _74=new Array(_73);
for(var b=0;
b<_73;
b++){for(var c=0;
c<4;
c++){_70[15-c]=(b>>>c*8)&255
}for(var c=0;
c<4;
c++){_70[15-c-4]=(b/4294967296>>>c*8)
}var _77=Cipher(_70,_72);
var _78=b<_73-1?_6f:(_68.length-1)%_6f+1;
var ct="";
for(var i=0;
i<_78;
i++){var _7a=_68.charCodeAt(b*_6f+i);
var _7b=_7a^_77[i];
ct+=String.fromCharCode(_7b)
}_74[b]=escCtrlChars(ct)
}var _7c="";
for(var i=0;
i<8;
i++){_7c+=String.fromCharCode(_70[i])
}_7c=escCtrlChars(_7c);
return _7c+"-"+_74.join("-")
}function AESDecryptCtr(_7d,_7e,_7f){if(!(_7f==128||_7f==192||_7f==256)){return""
}var _80=_7f/8;
var _81=new Array(_80);
for(var i=0;
i<_80;
i++){_81[i]=_7e.charCodeAt(i)&255
}var _83=KeyExpansion(_81);
var key=Cipher(_81,_83);
key=key.concat(key.slice(0,_80-16));
var _85=KeyExpansion(key);
_7d=_7d.split("-");
var _86=16;
var _87=new Array(_86);
var _88=unescCtrlChars(_7d[0]);
for(var i=0;
i<8;
i++){_87[i]=_88.charCodeAt(i)
}var _89=new Array(_7d.length-1);
for(var b=1;
b<_7d.length;
b++){for(var c=0;
c<4;
c++){_87[15-c]=((b-1)>>>c*8)&255
}for(var c=0;
c<4;
c++){_87[15-c-4]=((b/4294967296-1)>>>c*8)&255
}var _8c=Cipher(_87,_85);
_7d[b]=unescCtrlChars(_7d[b]);
var pt="";
for(var i=0;
i<_7d[b].length;
i++){var _8e=_7d[b].charCodeAt(i);
var _8f=_8e^_8c[i];
pt+=String.fromCharCode(_8f)
}_89[b-1]=pt
}return _89.join("")
}function escCtrlChars(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return"!"+c.charCodeAt(0)+"!"
})
}function unescCtrlChars(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1))
})
}function encrypt(_94,_95){return AESEncryptCtr(_94,_95,256)
}function decrypt(_96,_97){return AESDecryptCtr(_96,_97,256)
}var cmd=msg.substr(0,4);
var arg=msg.substr(5);
if(cmd=="encr"){arg=eval("("+arg+")");
var _9a=arg.plaintext;
var _9b=arg.password;
var _9c=encrypt(_9a,_9b);
gearsWorkerPool.sendMessage(String(_9c),_3b)
}else{if(cmd=="decr"){arg=eval("("+arg+")");
var _9d=arg.ciphertext;
var _9b=arg.password;
var _9c=decrypt(_9d,_9b);
gearsWorkerPool.sendMessage(String(_9c),_3b)
}}}})
}if(!dojo._hasResource["dojox._sql.common"]){dojo._hasResource["dojox._sql.common"]=true;
dojo.provide("dojox._sql.common");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
dojo.mixin(dojox.sql,{dbName:null,debug:(dojo.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(C){if(this._dbOpen&&(!C||C==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!C){C=this.dbName
}try{this._initDb();
this.db.open(C);
this._dbOpen=true
}catch(D){throw D.message||D
}},close:function(C){if(dojo.isIE){return 
}if(!this._dbOpen&&(!C||C==this.dbName)){return 
}if(!C){C=this.dbName
}try{this.db.close(C);
this._dbOpen=false
}catch(D){throw D.message||D
}},_exec:function(O){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var N=null;
var P=null;
var Q=null;
var R=dojo._toArray(O);
N=R.splice(0,1)[0];
if(this._needsEncrypt(N)||this._needsDecrypt(N)){P=R.splice(R.length-1,1)[0];
Q=R.splice(R.length-1,1)[0]
}if(this.debug){this._printDebugSQL(N,R)
}if(this._needsEncrypt(N)){var J=new dojox.sql._SQLCrypto("encrypt",N,Q,R,P);
return 
}else{if(this._needsDecrypt(N)){var J=new dojox.sql._SQLCrypto("decrypt",N,Q,R,P);
return 
}}var L=this.db.execute(N,R);
L=this._normalizeResults(L);
if(this._autoClose){this.close()
}return L
}catch(M){M=M.message||M;
console.debug("SQL Exception: "+M);
if(this._autoClose){try{this.close()
}catch(K){console.debug("Error closing database: "+K.message||K)
}}throw M
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(B){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(G,F){var H='dojox.sql("'+G+'"';
for(var E=0;
E<F.length;
E++){if(typeof F[E]=="string"){H+=', "'+F[E]+'"'
}else{H+=", "+F[E]
}}H+=")";
console.debug(H)
},_normalizeResults:function(L){var G=[];
if(!L){return[]
}while(L.isValidRow()){var H={};
for(var K=0;
K<L.fieldCount();
K++){var J=L.fieldName(K);
var I=L.field(K);
H[J]=I
}G.push(H);
L.next()
}L.close();
return G
},_needsEncrypt:function(B){return/encrypt\([^\)]*\)/i.test(B)
},_needsDecrypt:function(B){return/decrypt\([^\)]*\)/i.test(B)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(H,G,I,J,F){if(H=="encrypt"){this._execEncryptSQL(G,I,J,F)
}else{this._execDecryptSQL(G,I,J,F)
}},_execEncryptSQL:function(I,N,J,K){var L=this._stripCryptoSQL(I);
var M=this._flagEncryptedArgs(I,J);
var H=this;
this._encrypt(L,N,J,M,function(F){var E=false;
var G=[];
var A=null;
try{G=dojox.sql.db.execute(L,F)
}catch(D){E=true;
A=D.message||D
}if(A!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(B){}}K(null,true,A.toString());
return 
}G=dojox.sql._normalizeResults(G);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(I)){var C=H._determineDecryptedColumns(I);
H._decrypt(G,C,N,function(P){K(P,false,null)
})
}else{K(G,false,null)
}})
},_execDecryptSQL:function(Q,T,U,V){var M=this._stripCryptoSQL(Q);
var P=this._determineDecryptedColumns(Q);
var R=false;
var S=[];
var O=null;
try{S=dojox.sql.db.execute(M,U)
}catch(L){R=true;
O=L.message||L
}if(O!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(N){}}V(S,true,O.toString());
return 
}S=dojox.sql._normalizeResults(S);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(S,P,T,function(A){V(A,false,null)
})
},_encrypt:function(K,O,P,I,J){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=P;
for(var N=0;
N<P.length;
N++){if(I[N]){var L=P[N];
var M=N;
this._totalCrypto++;
dojox._sql._crypto.encrypt(L,O,dojo.hitch(this,function(A){this._finalArgs[M]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){J(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(M,N,K,L){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=M;
for(var O=0;
O<M.length;
O++){var J=M[O];
for(var P in J){if(N=="*"||N[P]){this._totalCrypto++;
var I=J[P];
this._decryptSingleColumn(P,I,K,O,function(A){L(A)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(J){J=J.replace(/DECRYPT\(\*\)/ig,"*");
var N=J.match(/ENCRYPT\([^\)]*\)/ig);
if(N!=null){for(var M=0;
M<N.length;
M++){var H=N[M];
var I=H.match(/ENCRYPT\(([^\)]*)\)/i)[1];
J=J.replace(H,I)
}}N=J.match(/DECRYPT\([^\)]*\)/ig);
if(N!=null){for(var M=0;
M<N.length;
M++){var K=N[M];
var L=K.match(/DECRYPT\(([^\)]*)\)/i)[1];
J=J.replace(K,L)
}}return J
},_flagEncryptedArgs:function(K,O){var J=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var L;
var M=0;
var N=[];
while((L=J.exec(K))!=null){var P=RegExp.lastMatch+"";
if(/^[\"\']/.test(P)){continue
}var I=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){I=true
}N[M]=I;
M++
}return N
},_determineDecryptedColumns:function(H){var I={};
if(/DECRYPT\(\*\)/i.test(H)){I="*"
}else{var J=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var K;
while(K=J.exec(H)){var L=new String(RegExp.lastMatch);
var G=L.replace(/DECRYPT\(/i,"");
G=G.replace(/\)/,"");
G=G.split(/\s*,\s*/);
dojo.forEach(G,function(A){if(/\s*\w* AS (\w*)/i.test(A)){A=A.match(/\s*\w* AS (\w*)/i)[1]
}I[A]=true
})
}}return I
},_decryptSingleColumn:function(G,H,I,J,F){dojox._sql._crypto.decrypt(H,I,dojo.hitch(this,function(A){this._finalResultSet[J][G]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){F(this._finalResultSet)
}}))
}})
}if(!dojo._hasResource["dojox.sql"]){dojo._hasResource["dojox.sql"]=true;
dojo.provide("dojox.sql")
}if(!dojo._hasResource["dojox.storage.GearsStorageProvider"]){dojo._hasResource["dojox.storage.GearsStorageProvider"]=true;
dojo.provide("dojox.storage.GearsStorageProvider");
if(dojo.isGears){(function(){dojo.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(B){console.debug("dojox.storage.GearsStorageProvider.initialize:",B);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=dojo.isGears
},put:function(F,G,I,J){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}J=J||this.DEFAULT_NAMESPACE;
if(dojo.isString(G)){G="string:"+G
}else{G=dojo.toJson(G)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",J,F);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",J,F,G)
}catch(H){console.debug("dojox.storage.GearsStorageProvider.put:",H);
I(this.FAILED,F,H.toString());
return 
}if(I){I(dojox.storage.SUCCESS,F,null)
}},get:function(E,F){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}F=F||this.DEFAULT_NAMESPACE;
var D=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",F,E);
if(!D.length){return null
}else{D=D[0].value
}if(dojo.isString(D)&&(/^string:/.test(D))){D=D.substring("string:".length)
}else{D=dojo.fromJson(D)
}return D
},getNamespaces:function(){var F=[dojox.storage.DEFAULT_NAMESPACE];
var D=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var E=0;
E<D.length;
E++){if(D[E].namespace!=dojox.storage.DEFAULT_NAMESPACE){F.push(D[E].namespace)
}}return F
},getKeys:function(F){F=F||this.DEFAULT_NAMESPACE;
if(this.isValidKey(F)==false){throw new Error("Invalid namespace given: "+F)
}var E=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",F);
var G=[];
for(var H=0;
H<E.length;
H++){G.push(E[H].key)
}return G
},clear:function(B){if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",B)
},remove:function(C,D){D=D||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",D,C)
},putMultiple:function(N,L,J,M){if(this.isValidKeyArray(N)===false||!L instanceof Array||N.length!=L.length){throw new Error("Invalid arguments: keys = ["+N+"], values = ["+L+"]")
}if(M==null||typeof M=="undefined"){M=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(M)==false){throw new Error("Invalid namespace given: "+M)
}this._statusHandler=J;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var O="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var P=0;
P<N.length;
P++){var I=L[P];
if(dojo.isString(I)){I="string:"+I
}else{I=dojo.toJson(I)
}dojox.sql.db.execute(O,[M,N[P],I])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(K){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",K);
if(J){J(this.FAILED,N,K.toString())
}return 
}if(J){J(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(H,K){if(this.isValidKeyArray(H)===false){throw new ("Invalid key array given: "+H)
}if(K==null||typeof K=="undefined"){K=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(K)==false){throw new Error("Invalid namespace given: "+K)
}var L="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var G=[];
for(var I=0;
I<H.length;
I++){var J=dojox.sql(L,K,H[I]);
if(!J.length){G[I]=null
}else{J=J[0].value;
if(dojo.isString(J)&&(/^string:/.test(J))){G[I]=J.substring("string:".length)
}else{G[I]=dojo.fromJson(J)
}}}return G
},removeMultiple:function(F,H){H=H||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var E="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var G=0;
G<F.length;
G++){dojox.sql.db.execute(E,[H,F[G]])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
}});
dojox.storage.manager.register("dojox.storage.GearsStorageProvider",new dojox.storage.GearsStorageProvider());
dojox.storage.manager.initialize()
})()
}}if(!dojo._hasResource["dojox.storage._common"]){dojo._hasResource["dojox.storage._common"]=true;
dojo.provide("dojox.storage._common");
dojox.storage.manager.initialize()
}if(!dojo._hasResource["dojox.storage"]){dojo._hasResource["dojox.storage"]=true;
dojo.provide("dojox.storage")
}if(!dojo._hasResource["dojox.off.files"]){dojo._hasResource["dojox.off.files"]=true;
dojo.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(D){if(dojo.isString(D)){var C=this._trimAnchor(D+"");
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}}else{if(D instanceof dojo._Url){var C=this._trimAnchor(D.uri);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}}else{dojo.forEach(D,function(A){A=this._trimAnchor(A);
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(B){console.debug(B)
})
},remove:function(C){for(var D=0;
D<this.listOfURLs.length;
D++){if(this.listOfURLs[D]==C){this.listOfURLs=this.listOfURLs.splice(D,1);
break
}}},isAvailable:function(C){for(var D=0;
D<this.listOfURLs.length;
D++){if(this.listOfURLs[D]==C){return true
}}return false
},refresh:function(C){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(B,F,A){if(djConfig.isDebug||!F||A||!B||B!=F){console.warn("Refreshing offline file list");
this._doRefresh(C,F)
}else{console.warn("No need to refresh offline file list");
C(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(C)
}}catch(D){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var B=dojo.hitch(this,function(A){if(this._sameLocation(A)){this.cache(A)
}});
B(window.location.href);
dojo.query("script").forEach(function(D){try{B(D.getAttribute("src"))
}catch(A){}});
dojo.query("link").forEach(function(D){try{if(!D.getAttribute("rel")||D.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}B(D.getAttribute("href"))
}catch(A){}});
dojo.query("img").forEach(function(D){try{B(D.getAttribute("src"))
}catch(A){}});
dojo.query("a").forEach(function(D){try{B(D.getAttribute("href"))
}catch(A){}});
dojo.forEach(document.styleSheets,function(L){try{if(L.cssRules){dojo.forEach(L.cssRules,function(D){var C=D.cssText;
if(C){var E=C.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!E){return 
}for(var F=1;
F<E.length;
F++){B(E[F])
}}})
}else{if(L.cssText){var I;
var A=L.cssText.toString();
var J=A.split(/\f|\r|\n/);
for(var K=0;
K<J.length;
K++){I=J[K].match(/url\(\s*([^\) ]*)\s*\)/i);
if(I&&I.length){B(I[1])
}}}}}catch(H){}})
},_sameLocation:function(B){if(!B){return false
}if(B.length&&B.charAt(0)=="#"){return false
}B=new dojo._Url(B);
if(!B.scheme&&!B.port&&!B.host){return true
}if(!B.scheme&&B.host&&B.port&&window.location.hostname==B.host&&window.location.port==B.port){return true
}if(!B.scheme&&B.host&&!B.port&&window.location.hostname==B.host&&window.location.port==80){return true
}return window.location.protocol==(B.scheme+":")&&window.location.hostname==B.host&&(window.location.port==B.port||!window.location.port&&!B.port)
},_trimAnchor:function(B){return B.replace(/\#.*$/,"")
},_doRefresh:function(J,K){var L;
try{L=google.gears.factory.create("beta.localserver","1.0")
}catch(I){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var N="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
L.removeStore(N);
L.openStore(N);
var M=L.createStore(N);
this._store=M;
var H=this;
this._currentFileIndex=0;
this._cancelID=M.capture(this.listOfURLs,function(C,D,A){if(!D&&H.refreshing){H._cancelID=null;
H.refreshing=false;
var B=[];
B.push("Unable to capture: "+C);
J(true,B);
return 
}else{if(D){H._currentFileIndex++
}}if(D&&H._currentFileIndex>=H.listOfURLs.length){H._cancelID=null;
H.refreshing=false;
if(K){dojox.storage.put("oldVersion",K,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
J(false,[])
}})
},_getVersionInfo:function(F){var G=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var H=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var E=null;
F=dojo.hitch(this,F);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(A){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
F(H,E,G)
},load:function(A){if(A){E=A
}F(H,E,G)
}})
}}
}if(!dojo._hasResource["dojox.off.sync"]){dojo._hasResource["dojox.off.sync"]=true;
dojo.provide("dojox.off.sync");
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
dojox.off.files.refresh(dojo.hitch(this,function(F,E){if(F){this.error=true;
this.successful=false;
for(var D=0;
D<E.length;
D++){this.details.push(E[D])
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
},_save:function(G){if(!G){G=function(){}
}try{var E=this;
var H=function(A,B,C){if(A==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:B,value:C,namespace:dojox.off.STORAGE_NAMESPACE});
G()
}else{if(A==dojox.storage.SUCCESS){G()
}}};
dojox.storage.put("actionlog",this.entries,H,dojox.off.STORAGE_NAMESPACE)
}catch(F){console.debug("dojox.off.sync._save: "+F.message||F);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
G()
}},_load:function(D){var C=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!C){C=[]
}this.entries=C;
D()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}if(!dojo._hasResource["dojox.off._common"]){dojo._hasResource["dojox.off._common"]=true;
dojo.provide("dojox.off._common");
dojo.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:dojo.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(B){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(B){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(B)
},onFrameworkEvent:function(D,C){if(D=="save"){if(C.isCoreSave&&(C.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(D=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(B){this.hasOfflineCache=dojo.isGears;
B()
},_onLoad:function(){dojox.off.files.cache(dojo.moduleUrl("dojo","dojo.js"));
this._cacheDojoResources();
dojox.off.files.cache(dojox.storage.manager.getResourceList());
dojox.off.files._slurp();
this._checkOfflineCacheAvailable(dojo.hitch(this,"_onOfflineCacheChecked"))
},_onOfflineCacheChecked:function(){if(this.hasOfflineCache&&this.enabled){this._load(dojo.hitch(this,"_finishStartingUp"))
}else{if(this.hasOfflineCache&&!this.enabled){this._finishStartingUp()
}else{this._keepCheckingUntilInstalled()
}}},_keepCheckingUntilInstalled:function(){this._finishStartingUp()
},_finishStartingUp:function(){if(!this.hasOfflineCache){this.onLoad()
}else{if(this.enabled){this._startNetworkThread();
this.goOnline(dojo.hitch(this,function(){dojox.off.onLoad()
}))
}else{if(this.coreOpFailed){this.onFrameworkEvent("coreOperationFailed")
}else{this.onLoad()
}}}},_onPageLoad:function(){this._pageLoaded=true;
if(this._storageLoaded&&this._initializeCalled){this._onLoad()
}},_onStorageLoad:function(){this._storageLoaded=true;
if(!dojox.storage.manager.isAvailable()&&dojox.storage.manager.isInitialized()){this.coreOpFailed=true;
this.enabled=false
}if(this._pageLoaded&&this._initializeCalled){this._onLoad()
}},_isSiteAvailable:function(B){dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(A){this.goingOnline=false;
this.isOnline=false;
if(B){B(false)
}}),load:dojo.hitch(this,function(A){this.goingOnline=false;
this.isOnline=true;
if(B){B(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(dojo.hitch(this,function(){var B=dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(D){if(this.isOnline){this.isOnline=false;
try{if(typeof B.ioArgs.xhr.abort=="function"){B.ioArgs.xhr.abort()
}}catch(A){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:dojo.hitch(this,function(A){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var B=this.availabilityURL.toString();
if(B.indexOf("?")==-1){B+="?"
}else{B+="&"
}B+="browserbust="+new Date().getTime();
return B
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var D=true;
dojo.forEach(dojo.query("script"),function(B){var A=B.getAttribute("src");
if(!A){return 
}if(A.indexOf("_base/_loader/bootstrap.js")!=-1){D=false
}});
if(!D){dojox.off.files.cache(dojo.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var C=0;
C<dojo._loadedUrls.length;
C++){dojox.off.files.cache(dojo._loadedUrls[C])
}},_save:function(){},_load:function(B){dojox.off.sync._load(B)
}});
dojox.storage.manager.addOnLoad(dojo.hitch(dojox.off,"_onStorageLoad"));
dojo.addOnLoad(dojox.off,"_onPageLoad")
}if(!dojo._hasResource["dojox.off"]){dojo._hasResource["dojox.off"]=true;
dojo.provide("dojox.off")
}if(!dojo._hasResource["dojox.off.ui"]){dojo._hasResource["dojox.off.ui"]=true;
dojo.provide("dojox.off.ui");
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
},_templateLoaded:function(E){var F=dojo.byId(this.autoEmbedID);
if(F){F.innerHTML=E
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var D=dojo.byId("dot-widget-browser-restart");
if(D){D.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(B){this._onNetwork(B?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var F=dojo.byId("dot-widget-network-indicator-online");
var D=dojo.byId("dot-widget-network-indicator-offline");
var E=dojo.byId("dot-widget-title-text");
if(F&&D){if(dojox.off.isOnline==true){F.style.display="inline";
D.style.display="none"
}else{F.style.display="none";
D.style.display="inline"
}}if(E){if(dojox.off.isOnline){E.innerHTML="Online"
}else{E.innerHTML="Offline"
}}},_initLearnHow:function(){var D=dojo.byId("dot-widget-learn-how-link");
if(!D){return 
}if(!this.customLearnHowPath){var E=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(E);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}D.setAttribute("href",this.learnHowPath);
var F=dojo.byId("dot-widget-learn-how-app-name");
if(!F){return 
}F.innerHTML="";
F.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(B){if(!B){return false
}return(/^[a-z0-9 ]*$/i.test(B))
},_updateSyncUI:function(){var G=dojo.byId("dot-roller");
var H=dojo.byId("dot-success-checkmark");
var I=dojo.byId("dot-sync-messages");
var J=dojo.byId("dot-sync-details");
var F=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(G){G.style.display="inline"
}if(H){H.style.display="none"
}if(I){dojo.removeClass(I,"dot-sync-error")
}if(J){J.style.display="none"
}if(F){F.style.display="inline"
}}else{if(G){G.style.display="none"
}if(F){F.style.display="none"
}if(I){dojo.removeClass(I,"dot-sync-error")
}}},_setSyncMessage:function(C){var D=dojo.byId("dot-sync-messages");
if(D){while(D.firstChild){D.removeChild(D.firstChild)
}D.appendChild(document.createTextNode(C))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var F=dojo.byId("dot-widget-network-indicator-online");
if(F){F.setAttribute("src",this.onlineImagePath)
}var G=dojo.byId("dot-widget-network-indicator-offline");
if(G){G.setAttribute("src",this.offlineImagePath)
}var H=dojo.byId("dot-roller");
if(H){H.setAttribute("src",this.rollerImagePath)
}var E=dojo.byId("dot-success-checkmark");
if(E){E.setAttribute("src",this.checkmarkImagePath)
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
var F="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var G=window.open("","SyncDetails",F);
if(!G){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}G.document.open();
G.document.write(H);
G.document.close();
if(G.focus){G.focus()
}},_cancel:function(B){B.preventDefault();
B.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var E=dojo.byId("dot-widget-browser-restart");
if(E){dojo.addClass(E,"dot-needs-browser-restart")
}var F=dojo.byId("dot-widget-browser-restart-app-name");
if(F){F.innerHTML="";
F.appendChild(document.createTextNode(this.appName))
}var D=dojo.byId("dot-sync-status");
if(D){D.style.display="none"
}},_showNeedsOfflineCache:function(){var B=dojo.byId("dot-widget-container");
if(B){dojo.addClass(B,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var B=dojo.byId("dot-widget-container");
if(B){dojo.removeClass(B,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var D=dojo.byId("dot-sync-details-button");
if(D){dojo.connect(D,"onclick",this,this._showDetails)
}var C=dojo.byId("dot-sync-cancel-button");
if(C){dojo.connect(C,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(E){var F=[];
F.push(dojo.byId("dot-sync-status"));
for(var D=0;
D<F.length;
D++){if(F[D]){F[D].style.visibility=(E?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var D=dojo.byId("dot-success-checkmark");
var E=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(D){D.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(D){D.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var F=dojo.byId("dot-sync-messages");
if(F){dojo.addClass(F,"dot-sync-error")
}if(D){D.style.display="none"
}}}if(dojox.off.sync.details.length&&E){E.style.display="inline"
}},_onFrameworkEvent:function(E,F){if(E=="save"){if(F.status==dojox.storage.FAILED&&!F.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(E=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(E=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var D=dojo.byId("dot-widget-browser-restart");
if(D){D.style.display="none"
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
}},_onNetwork:function(C){if(!this._initialized){return 
}this._updateNetIndicator();
if(C=="offline"){this._setSyncMessage("You are working offline");
var D=dojo.byId("dot-sync-details");
if(D){D.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}if(!dojo._hasResource["dojox.off.offline"]){dojo._hasResource["dojox.off.offline"]=true;
dojo.provide("dojox.off.offline")
};