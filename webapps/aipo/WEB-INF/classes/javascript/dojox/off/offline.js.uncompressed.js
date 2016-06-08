if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(E,F,G,H){console.warn("dojox.storage.put not implemented")
},get:function(C,D){console.warn("dojox.storage.get not implemented")
},hasKey:function(C,D){return(this.get(C)!=null)
},getKeys:function(B){console.warn("dojox.storage.getKeys not implemented")
},clear:function(B){console.warn("dojox.storage.clear not implemented")
},remove:function(C,D){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(F,E,G,H){console.warn("dojox.storage.putMultiple not implemented")
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
this.register=function(name,instance){this._providers[this._providers.length]=instance;
this._providers[name]=instance
};
this.setProvider=function(storageClass){};
this.autodetect=function(){if(this._initialized){return 
}var forceProvider=djConfig.forceStorageProvider||false;
var providerToUse;
for(var i=0;
i<this._providers.length;
i++){providerToUse=this._providers[i];
if(forceProvider==providerToUse.declaredClass){providerToUse.isAvailable();
break
}else{if(providerToUse.isAvailable()){break
}}}if(!providerToUse){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=providerToUse;
dojo.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(func){this._onLoadListeners.push(func);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(func){for(var i=0;
i<this._onLoadListeners.length;
i++){if(func==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(storageClass){try{var provider=eval("new "+storageClass+"()");
var results=provider.isAvailable();
if(!results){return false
}return results
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
this.getResourceList=function(){var results=[];
dojo.forEach(dojox.storage.manager._providers,function(currentProvider){results=results.concat(currentProvider.getResourceList())
});
return results
}
}
}if(!dojo._hasResource["dojox._sql._crypto"]){dojo._hasResource["dojox._sql._crypto"]=true;
dojo.provide("dojox._sql._crypto");
dojo.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(H,E,F){this._initWorkerPool();
var G={plaintext:H,password:E};
G=dojo.toJson(G);
G="encr:"+String(G);
this._assignWork(G,F)
},decrypt:function(H,E,F){this._initWorkerPool();
var G={ciphertext:H,password:E};
G=dojo.toJson(G);
G="decr:"+String(G);
this._assignWork(G,F)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var J=this;
this._manager.onmessage=function(B,D){var A=J._employed["_"+D];
J._employed["_"+D]=undefined;
J._unemployed.push("_"+D);
if(J._handleMessage.length){var C=J._handleMessage.shift();
J._assignWork(C.msg,C.callback)
}A(B)
};
var F="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var H=F+" _workerInit();";
for(var I=0;
I<this._POOL_SIZE;
I++){this._unemployed.push("_"+this._manager.createWorker(H))
}}catch(G){throw G.message||G
}}},_assignWork:function(F,E){if(!this._handleMessage.length&&this._unemployed.length){var D=this._unemployed.shift().substring(1);
this._employed["_"+D]=E;
this._manager.sendMessage(F,D)
}else{this._handleMessage={msg:F,callback:E}
}},_workerHandler:function(msg,sender){var Sbox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var Rcon=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
function Cipher(input,w){var Nb=4;
var Nr=w.length/Nb-1;
var state=[[],[],[],[]];
for(var i=0;
i<4*Nb;
i++){state[i%4][Math.floor(i/4)]=input[i]
}state=AddRoundKey(state,w,0,Nb);
for(var round=1;
round<Nr;
round++){state=SubBytes(state,Nb);
state=ShiftRows(state,Nb);
state=MixColumns(state,Nb);
state=AddRoundKey(state,w,round,Nb)
}state=SubBytes(state,Nb);
state=ShiftRows(state,Nb);
state=AddRoundKey(state,w,Nr,Nb);
var output=new Array(4*Nb);
for(var i=0;
i<4*Nb;
i++){output[i]=state[i%4][Math.floor(i/4)]
}return output
}function SubBytes(s,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){s[r][c]=Sbox[s[r][c]]
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
}function AddRoundKey(state,w,rnd,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){state[r][c]^=w[rnd*4+c][r]
}}return state
}function KeyExpansion(key){var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var temp=new Array(4);
for(var i=0;
i<Nk;
i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r
}for(var i=Nk;
i<(Nb*(Nr+1));
i++){w[i]=new Array(4);
for(var t=0;
t<4;
t++){temp[t]=w[i-1][t]
}if(i%Nk==0){temp=SubWord(RotWord(temp));
for(var t=0;
t<4;
t++){temp[t]^=Rcon[i/Nk][t]
}}else{if(Nk>6&&i%Nk==4){temp=SubWord(temp)
}}for(var t=0;
t<4;
t++){w[i][t]=w[i-Nk][t]^temp[t]
}}return w
}function SubWord(w){for(var i=0;
i<4;
i++){w[i]=Sbox[w[i]]
}return w
}function RotWord(w){w[4]=w[0];
for(var i=0;
i<4;
i++){w[i]=w[i+1]
}return w
}function AESEncryptCtr(plaintext,password,nBits){if(!(nBits==128||nBits==192||nBits==256)){return""
}var nBytes=nBits/8;
var pwBytes=new Array(nBytes);
for(var i=0;
i<nBytes;
i++){pwBytes[i]=password.charCodeAt(i)&255
}var key=Cipher(pwBytes,KeyExpansion(pwBytes));
key=key.concat(key.slice(0,nBytes-16));
var blockSize=16;
var counterBlock=new Array(blockSize);
var nonce=(new Date()).getTime();
for(var i=0;
i<4;
i++){counterBlock[i]=(nonce>>>i*8)&255
}for(var i=0;
i<4;
i++){counterBlock[i+4]=(nonce/4294967296>>>i*8)&255
}var keySchedule=KeyExpansion(key);
var blockCount=Math.ceil(plaintext.length/blockSize);
var ciphertext=new Array(blockCount);
for(var b=0;
b<blockCount;
b++){for(var c=0;
c<4;
c++){counterBlock[15-c]=(b>>>c*8)&255
}for(var c=0;
c<4;
c++){counterBlock[15-c-4]=(b/4294967296>>>c*8)
}var cipherCntr=Cipher(counterBlock,keySchedule);
var blockLength=b<blockCount-1?blockSize:(plaintext.length-1)%blockSize+1;
var ct="";
for(var i=0;
i<blockLength;
i++){var plaintextByte=plaintext.charCodeAt(b*blockSize+i);
var cipherByte=plaintextByte^cipherCntr[i];
ct+=String.fromCharCode(cipherByte)
}ciphertext[b]=escCtrlChars(ct)
}var ctrTxt="";
for(var i=0;
i<8;
i++){ctrTxt+=String.fromCharCode(counterBlock[i])
}ctrTxt=escCtrlChars(ctrTxt);
return ctrTxt+"-"+ciphertext.join("-")
}function AESDecryptCtr(ciphertext,password,nBits){if(!(nBits==128||nBits==192||nBits==256)){return""
}var nBytes=nBits/8;
var pwBytes=new Array(nBytes);
for(var i=0;
i<nBytes;
i++){pwBytes[i]=password.charCodeAt(i)&255
}var pwKeySchedule=KeyExpansion(pwBytes);
var key=Cipher(pwBytes,pwKeySchedule);
key=key.concat(key.slice(0,nBytes-16));
var keySchedule=KeyExpansion(key);
ciphertext=ciphertext.split("-");
var blockSize=16;
var counterBlock=new Array(blockSize);
var ctrTxt=unescCtrlChars(ciphertext[0]);
for(var i=0;
i<8;
i++){counterBlock[i]=ctrTxt.charCodeAt(i)
}var plaintext=new Array(ciphertext.length-1);
for(var b=1;
b<ciphertext.length;
b++){for(var c=0;
c<4;
c++){counterBlock[15-c]=((b-1)>>>c*8)&255
}for(var c=0;
c<4;
c++){counterBlock[15-c-4]=((b/4294967296-1)>>>c*8)&255
}var cipherCntr=Cipher(counterBlock,keySchedule);
ciphertext[b]=unescCtrlChars(ciphertext[b]);
var pt="";
for(var i=0;
i<ciphertext[b].length;
i++){var ciphertextByte=ciphertext[b].charCodeAt(i);
var plaintextByte=ciphertextByte^cipherCntr[i];
pt+=String.fromCharCode(plaintextByte)
}plaintext[b-1]=pt
}return plaintext.join("")
}function escCtrlChars(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return"!"+c.charCodeAt(0)+"!"
})
}function unescCtrlChars(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1))
})
}function encrypt(plaintext,password){return AESEncryptCtr(plaintext,password,256)
}function decrypt(ciphertext,password){return AESDecryptCtr(ciphertext,password,256)
}var cmd=msg.substr(0,4);
var arg=msg.substr(5);
if(cmd=="encr"){arg=eval("("+arg+")");
var plaintext=arg.plaintext;
var password=arg.password;
var results=encrypt(plaintext,password);
gearsWorkerPool.sendMessage(String(results),sender)
}else{if(cmd=="decr"){arg=eval("("+arg+")");
var ciphertext=arg.ciphertext;
var password=arg.password;
var results=decrypt(ciphertext,password);
gearsWorkerPool.sendMessage(String(results),sender)
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
}},_exec:function(L){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var N=null;
var O=null;
var P=null;
var Q=dojo._toArray(L);
N=Q.splice(0,1)[0];
if(this._needsEncrypt(N)||this._needsDecrypt(N)){O=Q.splice(Q.length-1,1)[0];
P=Q.splice(Q.length-1,1)[0]
}if(this.debug){this._printDebugSQL(N,Q)
}if(this._needsEncrypt(N)){var M=new dojox.sql._SQLCrypto("encrypt",N,P,Q,O);
return 
}else{if(this._needsDecrypt(N)){var M=new dojox.sql._SQLCrypto("decrypt",N,P,Q,O);
return 
}}var J=this.db.execute(N,Q);
J=this._normalizeResults(J);
if(this._autoClose){this.close()
}return J
}catch(K){K=K.message||K;
console.debug("SQL Exception: "+K);
if(this._autoClose){try{this.close()
}catch(R){console.debug("Error closing database: "+R.message||R)
}}throw K
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(B){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(F,E){var G='dojox.sql("'+F+'"';
for(var H=0;
H<E.length;
H++){if(typeof E[H]=="string"){G+=', "'+E[H]+'"'
}else{G+=", "+E[H]
}}G+=")";
console.debug(G)
},_normalizeResults:function(G){var K=[];
if(!G){return[]
}while(G.isValidRow()){var I={};
for(var L=0;
L<G.fieldCount();
L++){var H=G.fieldName(L);
var J=G.field(L);
I[H]=J
}K.push(I);
G.next()
}G.close();
return K
},_needsEncrypt:function(B){return/encrypt\([^\)]*\)/i.test(B)
},_needsDecrypt:function(B){return/decrypt\([^\)]*\)/i.test(B)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(I,H,J,F,G){if(I=="encrypt"){this._execEncryptSQL(H,J,F,G)
}else{this._execDecryptSQL(H,J,F,G)
}},_execEncryptSQL:function(K,M,N,I){var J=this._stripCryptoSQL(K);
var L=this._flagEncryptedArgs(K,N);
var H=this;
this._encrypt(J,M,N,L,function(A){var D=false;
var C=[];
var F=null;
try{C=dojox.sql.db.execute(J,A)
}catch(B){D=true;
F=B.message||B
}if(F!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(G){}}I(null,true,F.toString());
return 
}C=dojox.sql._normalizeResults(C);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(K)){var E=H._determineDecryptedColumns(K);
H._decrypt(C,E,M,function(P){I(P,false,null)
})
}else{I(C,false,null)
}})
},_execDecryptSQL:function(P,T,M,R){var Q=this._stripCryptoSQL(P);
var S=this._determineDecryptedColumns(P);
var L=false;
var U=[];
var O=null;
try{U=dojox.sql.db.execute(Q,M)
}catch(V){L=true;
O=V.message||V
}if(O!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(N){}}R(U,true,O.toString());
return 
}U=dojox.sql._normalizeResults(U);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(U,S,T,function(A){R(A,false,null)
})
},_encrypt:function(K,P,I,M,J){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=I;
for(var O=0;
O<I.length;
O++){if(M[O]){var L=I[O];
var N=O;
this._totalCrypto++;
dojox._sql._crypto.encrypt(L,P,dojo.hitch(this,function(A){this._finalArgs[N]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){J(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(M,P,O,J){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=M;
for(var N=0;
N<M.length;
N++){var K=M[N];
for(var I in K){if(P=="*"||P[I]){this._totalCrypto++;
var L=K[I];
this._decryptSingleColumn(I,L,O,N,function(A){J(A)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(J){J=J.replace(/DECRYPT\(\*\)/ig,"*");
var L=J.match(/ENCRYPT\([^\)]*\)/ig);
if(L!=null){for(var M=0;
M<L.length;
M++){var H=L[M];
var I=H.match(/ENCRYPT\(([^\)]*)\)/i)[1];
J=J.replace(H,I)
}}L=J.match(/DECRYPT\([^\)]*\)/ig);
if(L!=null){for(var M=0;
M<L.length;
M++){var N=L[M];
var K=N.match(/DECRYPT\(([^\)]*)\)/i)[1];
J=J.replace(N,K)
}}return J
},_flagEncryptedArgs:function(J,O){var P=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var L;
var M=0;
var N=[];
while((L=P.exec(J))!=null){var I=RegExp.lastMatch+"";
if(/^[\"\']/.test(I)){continue
}var K=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){K=true
}N[M]=K;
M++
}return N
},_determineDecryptedColumns:function(J){var L={};
if(/DECRYPT\(\*\)/i.test(J)){L="*"
}else{var G=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var K;
while(K=G.exec(J)){var H=new String(RegExp.lastMatch);
var I=H.replace(/DECRYPT\(/i,"");
I=I.replace(/\)/,"");
I=I.split(/\s*,\s*/);
dojo.forEach(I,function(A){if(/\s*\w* AS (\w*)/i.test(A)){A=A.match(/\s*\w* AS (\w*)/i)[1]
}L[A]=true
})
}}return L
},_decryptSingleColumn:function(F,H,J,I,G){dojox._sql._crypto.decrypt(H,J,dojo.hitch(this,function(A){this._finalResultSet[I][F]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){G(this._finalResultSet)
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
},put:function(F,H,I,J){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}J=J||this.DEFAULT_NAMESPACE;
if(dojo.isString(H)){H="string:"+H
}else{H=dojo.toJson(H)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",J,F);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",J,F,H)
}catch(G){console.debug("dojox.storage.GearsStorageProvider.put:",G);
I(this.FAILED,F,G.toString());
return 
}if(I){I(dojox.storage.SUCCESS,F,null)
}},get:function(F,E){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}E=E||this.DEFAULT_NAMESPACE;
var D=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",E,F);
if(!D.length){return null
}else{D=D[0].value
}if(dojo.isString(D)&&(/^string:/.test(D))){D=D.substring("string:".length)
}else{D=dojo.fromJson(D)
}return D
},getNamespaces:function(){var E=[dojox.storage.DEFAULT_NAMESPACE];
var D=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var F=0;
F<D.length;
F++){if(D[F].namespace!=dojox.storage.DEFAULT_NAMESPACE){E.push(D[F].namespace)
}}return E
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
},putMultiple:function(L,I,M,N){if(this.isValidKeyArray(L)===false||!I instanceof Array||L.length!=I.length){throw new Error("Invalid arguments: keys = ["+L+"], values = ["+I+"]")
}if(N==null||typeof N=="undefined"){N=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(N)==false){throw new Error("Invalid namespace given: "+N)
}this._statusHandler=M;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var O="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var P=0;
P<L.length;
P++){var K=I[P];
if(dojo.isString(K)){K="string:"+K
}else{K=dojo.toJson(K)
}dojox.sql.db.execute(O,[N,L[P],K])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(J){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",J);
if(M){M(this.FAILED,L,J.toString())
}return 
}if(M){M(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(H,I){if(this.isValidKeyArray(H)===false){throw new ("Invalid key array given: "+H)
}if(I==null||typeof I=="undefined"){I=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(I)==false){throw new Error("Invalid namespace given: "+I)
}var J="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var K=[];
for(var L=0;
L<H.length;
L++){var G=dojox.sql(J,I,H[L]);
if(!G.length){K[L]=null
}else{G=G[0].value;
if(dojo.isString(G)&&(/^string:/.test(G))){K[L]=G.substring("string:".length)
}else{K[L]=dojo.fromJson(G)
}}}return K
},removeMultiple:function(F,G){G=G||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var H="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var E=0;
E<F.length;
E++){dojox.sql.db.execute(H,[G,F[E]])
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
},cache:function(C){if(dojo.isString(C)){var D=this._trimAnchor(C+"");
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}}else{if(C instanceof dojo._Url){var D=this._trimAnchor(C.uri);
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}}else{dojo.forEach(C,function(A){A=this._trimAnchor(A);
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
},refresh:function(D){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(F,B,A){if(djConfig.isDebug||!B||A||!F||F!=B){console.warn("Refreshing offline file list");
this._doRefresh(D,B)
}else{console.warn("No need to refresh offline file list");
D(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(D)
}}catch(C){this.refreshing=false;
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
dojo.forEach(document.styleSheets,function(J){try{if(J.cssRules){dojo.forEach(J.cssRules,function(D){var C=D.cssText;
if(C){var E=C.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!E){return 
}for(var F=1;
F<E.length;
F++){B(E[F])
}}})
}else{if(J.cssText){var I;
var A=J.cssText.toString();
var L=A.split(/\f|\r|\n/);
for(var K=0;
K<L.length;
K++){I=L[K].match(/url\(\s*([^\) ]*)\s*\)/i);
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
},_doRefresh:function(I,L){var K;
try{K=google.gears.factory.create("beta.localserver","1.0")
}catch(J){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var M="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
K.removeStore(M);
K.openStore(M);
var N=K.createStore(M);
this._store=N;
var H=this;
this._currentFileIndex=0;
this._cancelID=N.capture(this.listOfURLs,function(C,A,D){if(!A&&H.refreshing){H._cancelID=null;
H.refreshing=false;
var B=[];
B.push("Unable to capture: "+C);
I(true,B);
return 
}else{if(A){H._currentFileIndex++
}}if(A&&H._currentFileIndex>=H.listOfURLs.length){H._cancelID=null;
H.refreshing=false;
if(L){dojox.storage.put("oldVersion",L,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
I(false,[])
}})
},_getVersionInfo:function(F){var G=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var E=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var H=null;
F=dojo.hitch(this,F);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(A){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
F(E,H,G)
},load:function(A){if(A){H=A
}F(E,H,G)
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
}if(!dojo._hasResource["dojox.off.offline"]){dojo._hasResource["dojox.off.offline"]=true;
dojo.provide("dojox.off.offline")
};