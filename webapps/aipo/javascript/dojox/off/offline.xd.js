dojo._xdResourceLoaded({depends:[["provide","dojox.storage.Provider"],["provide","dojox.storage.manager"],["provide","dojox._sql._crypto"],["provide","dojox._sql.common"],["provide","dojox.sql"],["provide","dojox.storage.GearsStorageProvider"],["provide","dojox.storage._common"],["provide","dojox.storage"],["provide","dojox.off.files"],["provide","dojox.off.sync"],["provide","dojox.off._common"],["provide","dojox.off"],["provide","dojox.off.ui"],["provide","dojox.off.offline"]],defineResource:function(_1){if(!_1._hasResource["dojox.storage.Provider"]){_1._hasResource["dojox.storage.Provider"]=true;
_1.provide("dojox.storage.Provider");
_1.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(_2,_3,_4,_5){console.warn("dojox.storage.put not implemented")
},get:function(_6,_7){console.warn("dojox.storage.get not implemented")
},hasKey:function(_8,_9){return(this.get(_8)!=null)
},getKeys:function(_a){console.warn("dojox.storage.getKeys not implemented")
},clear:function(_b){console.warn("dojox.storage.clear not implemented")
},remove:function(_c,_d){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(_e,_f,_10,_11){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(_12,_13){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(_14,_15){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(_16){if(_16===null||typeof _16==="undefined"||!_16 instanceof Array){return false
}for(var k=0;
k<_16.length;
k++){if(!this.isValidKey(_16[k])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(_18){if((_18==null)||(typeof _18=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(_18)
},getResourceList:function(){return[]
}})
}if(!_1._hasResource["dojox.storage.manager"]){_1._hasResource["dojox.storage.manager"]=true;
_1.provide("dojox.storage.manager");
dojox.storage.manager=new function(){this.currentProvider=null;
this.available=false;
this._initialized=false;
this._providers=[];
this._onLoadListeners=[];
this.initialize=function(){this.autodetect()
};
this.register=function(_19,_1a){this._providers[this._providers.length]=_1a;
this._providers[_19]=_1a
};
this.setProvider=function(_1b){};
this.autodetect=function(){if(this._initialized){return 
}var _1c=djConfig.forceStorageProvider||false;
var _1d;
for(var i=0;
i<this._providers.length;
i++){_1d=this._providers[i];
if(_1c==_1d.declaredClass){_1d.isAvailable();
break
}else{if(_1d.isAvailable()){break
}}}if(!_1d){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=_1d;
_1.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(_1f){this._onLoadListeners.push(_1f);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(_20){for(var i=0;
i<this._onLoadListeners.length;
i++){if(_20==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(_22){try{var _23=eval("new "+_22+"()");
var _24=_23.isAvailable();
if(!_24){return false
}return _24
}catch(e){return false
}};
this.getProvider=function(){return this.currentProvider
};
this.loaded=function(){this._fireLoaded()
};
this._fireLoaded=function(){_1.forEach(this._onLoadListeners,function(i){try{i()
}catch(e){console.debug(e)
}})
};
this.getResourceList=function(){var _26=[];
_1.forEach(dojox.storage.manager._providers,function(_27){_26=_26.concat(_27.getResourceList())
});
return _26
}
}
}if(!_1._hasResource["dojox._sql._crypto"]){_1._hasResource["dojox._sql._crypto"]=true;
_1.provide("dojox._sql._crypto");
_1.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(_28,_29,_2a){this._initWorkerPool();
var msg={plaintext:_28,password:_29};
msg=_1.toJson(msg);
msg="encr:"+String(msg);
this._assignWork(msg,_2a)
},decrypt:function(_2c,_2d,_2e){this._initWorkerPool();
var msg={ciphertext:_2c,password:_2d};
msg=_1.toJson(msg);
msg="decr:"+String(msg);
this._assignWork(msg,_2e)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var _30=this;
this._manager.onmessage=function(msg,_32){var _33=_30._employed["_"+_32];
_30._employed["_"+_32]=undefined;
_30._unemployed.push("_"+_32);
if(_30._handleMessage.length){var _34=_30._handleMessage.shift();
_30._assignWork(_34.msg,_34.callback)
}_33(msg)
};
var _35="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var _36=_35+" _workerInit();";
for(var i=0;
i<this._POOL_SIZE;
i++){this._unemployed.push("_"+this._manager.createWorker(_36))
}}catch(exp){throw exp.message||exp
}}},_assignWork:function(msg,_39){if(!this._handleMessage.length&&this._unemployed.length){var _3a=this._unemployed.shift().substring(1);
this._employed["_"+_3a]=_39;
this._manager.sendMessage(msg,_3a)
}else{this._handleMessage={msg:msg,callback:_39}
}},_workerHandler:function(msg,_3c){var _3d=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var _3e=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
function Cipher(_3f,w){var Nb=4;
var Nr=w.length/Nb-1;
var _43=[[],[],[],[]];
for(var i=0;
i<4*Nb;
i++){_43[i%4][Math.floor(i/4)]=_3f[i]
}_43=AddRoundKey(_43,w,0,Nb);
for(var _45=1;
_45<Nr;
_45++){_43=SubBytes(_43,Nb);
_43=ShiftRows(_43,Nb);
_43=MixColumns(_43,Nb);
_43=AddRoundKey(_43,w,_45,Nb)
}_43=SubBytes(_43,Nb);
_43=ShiftRows(_43,Nb);
_43=AddRoundKey(_43,w,Nr,Nb);
var _46=new Array(4*Nb);
for(var i=0;
i<4*Nb;
i++){_46[i]=_43[i%4][Math.floor(i/4)]
}return _46
}function SubBytes(s,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){s[r][c]=_3d[s[r][c]]
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
}function AddRoundKey(_56,w,rnd,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){_56[r][c]^=w[rnd*4+c][r]
}}return _56
}function KeyExpansion(key){var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var _61=new Array(4);
for(var i=0;
i<Nk;
i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r
}for(var i=Nk;
i<(Nb*(Nr+1));
i++){w[i]=new Array(4);
for(var t=0;
t<4;
t++){_61[t]=w[i-1][t]
}if(i%Nk==0){_61=SubWord(RotWord(_61));
for(var t=0;
t<4;
t++){_61[t]^=_3e[i/Nk][t]
}}else{if(Nk>6&&i%Nk==4){_61=SubWord(_61)
}}for(var t=0;
t<4;
t++){w[i][t]=w[i-Nk][t]^_61[t]
}}return w
}function SubWord(w){for(var i=0;
i<4;
i++){w[i]=_3d[w[i]]
}return w
}function RotWord(w){w[4]=w[0];
for(var i=0;
i<4;
i++){w[i]=w[i+1]
}return w
}function AESEncryptCtr(_69,_6a,_6b){if(!(_6b==128||_6b==192||_6b==256)){return""
}var _6c=_6b/8;
var _6d=new Array(_6c);
for(var i=0;
i<_6c;
i++){_6d[i]=_6a.charCodeAt(i)&255
}var key=Cipher(_6d,KeyExpansion(_6d));
key=key.concat(key.slice(0,_6c-16));
var _70=16;
var _71=new Array(_70);
var _72=(new Date()).getTime();
for(var i=0;
i<4;
i++){_71[i]=(_72>>>i*8)&255
}for(var i=0;
i<4;
i++){_71[i+4]=(_72/4294967296>>>i*8)&255
}var _73=KeyExpansion(key);
var _74=Math.ceil(_69.length/_70);
var _75=new Array(_74);
for(var b=0;
b<_74;
b++){for(var c=0;
c<4;
c++){_71[15-c]=(b>>>c*8)&255
}for(var c=0;
c<4;
c++){_71[15-c-4]=(b/4294967296>>>c*8)
}var _78=Cipher(_71,_73);
var _79=b<_74-1?_70:(_69.length-1)%_70+1;
var ct="";
for(var i=0;
i<_79;
i++){var _7b=_69.charCodeAt(b*_70+i);
var _7c=_7b^_78[i];
ct+=String.fromCharCode(_7c)
}_75[b]=escCtrlChars(ct)
}var _7d="";
for(var i=0;
i<8;
i++){_7d+=String.fromCharCode(_71[i])
}_7d=escCtrlChars(_7d);
return _7d+"-"+_75.join("-")
}function AESDecryptCtr(_7e,_7f,_80){if(!(_80==128||_80==192||_80==256)){return""
}var _81=_80/8;
var _82=new Array(_81);
for(var i=0;
i<_81;
i++){_82[i]=_7f.charCodeAt(i)&255
}var _84=KeyExpansion(_82);
var key=Cipher(_82,_84);
key=key.concat(key.slice(0,_81-16));
var _86=KeyExpansion(key);
_7e=_7e.split("-");
var _87=16;
var _88=new Array(_87);
var _89=unescCtrlChars(_7e[0]);
for(var i=0;
i<8;
i++){_88[i]=_89.charCodeAt(i)
}var _8a=new Array(_7e.length-1);
for(var b=1;
b<_7e.length;
b++){for(var c=0;
c<4;
c++){_88[15-c]=((b-1)>>>c*8)&255
}for(var c=0;
c<4;
c++){_88[15-c-4]=((b/4294967296-1)>>>c*8)&255
}var _8d=Cipher(_88,_86);
_7e[b]=unescCtrlChars(_7e[b]);
var pt="";
for(var i=0;
i<_7e[b].length;
i++){var _8f=_7e[b].charCodeAt(i);
var _90=_8f^_8d[i];
pt+=String.fromCharCode(_90)
}_8a[b-1]=pt
}return _8a.join("")
}function escCtrlChars(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return"!"+c.charCodeAt(0)+"!"
})
}function unescCtrlChars(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1))
})
}function encrypt(_95,_96){return AESEncryptCtr(_95,_96,256)
}function decrypt(_97,_98){return AESDecryptCtr(_97,_98,256)
}var cmd=msg.substr(0,4);
var arg=msg.substr(5);
if(cmd=="encr"){arg=eval("("+arg+")");
var _9b=arg.plaintext;
var _9c=arg.password;
var _9d=encrypt(_9b,_9c);
gearsWorkerPool.sendMessage(String(_9d),_3c)
}else{if(cmd=="decr"){arg=eval("("+arg+")");
var _9e=arg.ciphertext;
var _9c=arg.password;
var _9d=decrypt(_9e,_9c);
gearsWorkerPool.sendMessage(String(_9d),_3c)
}}}})
}if(!_1._hasResource["dojox._sql.common"]){_1._hasResource["dojox._sql.common"]=true;
_1.provide("dojox._sql.common");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
_1.mixin(dojox.sql,{dbName:null,debug:(_1.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(_9f){if(this._dbOpen&&(!_9f||_9f==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!_9f){_9f=this.dbName
}try{this._initDb();
this.db.open(_9f);
this._dbOpen=true
}catch(exp){throw exp.message||exp
}},close:function(_a0){if(_1.isIE){return 
}if(!this._dbOpen&&(!_a0||_a0==this.dbName)){return 
}if(!_a0){_a0=this.dbName
}try{this.db.close(_a0);
this._dbOpen=false
}catch(exp){throw exp.message||exp
}},_exec:function(_a1){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var sql=null;
var _a3=null;
var _a4=null;
var _a5=_1._toArray(_a1);
sql=_a5.splice(0,1)[0];
if(this._needsEncrypt(sql)||this._needsDecrypt(sql)){_a3=_a5.splice(_a5.length-1,1)[0];
_a4=_a5.splice(_a5.length-1,1)[0]
}if(this.debug){this._printDebugSQL(sql,_a5)
}if(this._needsEncrypt(sql)){var _a6=new dojox.sql._SQLCrypto("encrypt",sql,_a4,_a5,_a3);
return 
}else{if(this._needsDecrypt(sql)){var _a6=new dojox.sql._SQLCrypto("decrypt",sql,_a4,_a5,_a3);
return 
}}var rs=this.db.execute(sql,_a5);
rs=this._normalizeResults(rs);
if(this._autoClose){this.close()
}return rs
}catch(exp){exp=exp.message||exp;
console.debug("SQL Exception: "+exp);
if(this._autoClose){try{this.close()
}catch(e){console.debug("Error closing database: "+e.message||e)
}}throw exp
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(exp){_1.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(sql,_a9){var msg='dojox.sql("'+sql+'"';
for(var i=0;
i<_a9.length;
i++){if(typeof _a9[i]=="string"){msg+=', "'+_a9[i]+'"'
}else{msg+=", "+_a9[i]
}}msg+=")";
console.debug(msg)
},_normalizeResults:function(rs){var _ad=[];
if(!rs){return[]
}while(rs.isValidRow()){var row={};
for(var i=0;
i<rs.fieldCount();
i++){var _b0=rs.fieldName(i);
var _b1=rs.field(i);
row[_b0]=_b1
}_ad.push(row);
rs.next()
}rs.close();
return _ad
},_needsEncrypt:function(sql){return/encrypt\([^\)]*\)/i.test(sql)
},_needsDecrypt:function(sql){return/decrypt\([^\)]*\)/i.test(sql)
}});
_1.declare("dojox.sql._SQLCrypto",null,{constructor:function(_b4,sql,_b6,_b7,_b8){if(_b4=="encrypt"){this._execEncryptSQL(sql,_b6,_b7,_b8)
}else{this._execDecryptSQL(sql,_b6,_b7,_b8)
}},_execEncryptSQL:function(sql,_ba,_bb,_bc){var _bd=this._stripCryptoSQL(sql);
var _be=this._flagEncryptedArgs(sql,_bb);
var _bf=this;
this._encrypt(_bd,_ba,_bb,_be,function(_c0){var _c1=false;
var _c2=[];
var exp=null;
try{_c2=dojox.sql.db.execute(_bd,_c0)
}catch(execError){_c1=true;
exp=execError.message||execError
}if(exp!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(e){}}_bc(null,true,exp.toString());
return 
}_c2=dojox.sql._normalizeResults(_c2);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(sql)){var _c4=_bf._determineDecryptedColumns(sql);
_bf._decrypt(_c2,_c4,_ba,function(_c5){_bc(_c5,false,null)
})
}else{_bc(_c2,false,null)
}})
},_execDecryptSQL:function(sql,_c7,_c8,_c9){var _ca=this._stripCryptoSQL(sql);
var _cb=this._determineDecryptedColumns(sql);
var _cc=false;
var _cd=[];
var exp=null;
try{_cd=dojox.sql.db.execute(_ca,_c8)
}catch(execError){_cc=true;
exp=execError.message||execError
}if(exp!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(e){}}_c9(_cd,true,exp.toString());
return 
}_cd=dojox.sql._normalizeResults(_cd);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(_cd,_cb,_c7,function(_cf){_c9(_cf,false,null)
})
},_encrypt:function(sql,_d1,_d2,_d3,_d4){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=_d2;
for(var i=0;
i<_d2.length;
i++){if(_d3[i]){var _d6=_d2[i];
var _d7=i;
this._totalCrypto++;
dojox._sql._crypto.encrypt(_d6,_d1,_1.hitch(this,function(_d8){this._finalArgs[_d7]=_d8;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){_d4(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(_d9,_da,_db,_dc){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=_d9;
for(var i=0;
i<_d9.length;
i++){var row=_d9[i];
for(var _df in row){if(_da=="*"||_da[_df]){this._totalCrypto++;
var _e0=row[_df];
this._decryptSingleColumn(_df,_e0,_db,i,function(_e1){_dc(_e1)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(sql){sql=sql.replace(/DECRYPT\(\*\)/ig,"*");
var _e3=sql.match(/ENCRYPT\([^\)]*\)/ig);
if(_e3!=null){for(var i=0;
i<_e3.length;
i++){var _e5=_e3[i];
var _e6=_e5.match(/ENCRYPT\(([^\)]*)\)/i)[1];
sql=sql.replace(_e5,_e6)
}}_e3=sql.match(/DECRYPT\([^\)]*\)/ig);
if(_e3!=null){for(var i=0;
i<_e3.length;
i++){var _e7=_e3[i];
var _e8=_e7.match(/DECRYPT\(([^\)]*)\)/i)[1];
sql=sql.replace(_e7,_e8)
}}return sql
},_flagEncryptedArgs:function(sql,_ea){var _eb=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var _ec;
var _ed=0;
var _ee=[];
while((_ec=_eb.exec(sql))!=null){var _ef=RegExp.lastMatch+"";
if(/^[\"\']/.test(_ef)){continue
}var _f0=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){_f0=true
}_ee[_ed]=_f0;
_ed++
}return _ee
},_determineDecryptedColumns:function(sql){var _f2={};
if(/DECRYPT\(\*\)/i.test(sql)){_f2="*"
}else{var _f3=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var _f4;
while(_f4=_f3.exec(sql)){var _f5=new String(RegExp.lastMatch);
var _f6=_f5.replace(/DECRYPT\(/i,"");
_f6=_f6.replace(/\)/,"");
_f6=_f6.split(/\s*,\s*/);
_1.forEach(_f6,function(_f7){if(/\s*\w* AS (\w*)/i.test(_f7)){_f7=_f7.match(/\s*\w* AS (\w*)/i)[1]
}_f2[_f7]=true
})
}}return _f2
},_decryptSingleColumn:function(_f8,_f9,_fa,_fb,_fc){dojox._sql._crypto.decrypt(_f9,_fa,_1.hitch(this,function(_fd){this._finalResultSet[_fb][_f8]=_fd;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){_fc(this._finalResultSet)
}}))
}})
}if(!_1._hasResource["dojox.sql"]){_1._hasResource["dojox.sql"]=true;
_1.provide("dojox.sql")
}if(!_1._hasResource["dojox.storage.GearsStorageProvider"]){_1._hasResource["dojox.storage.GearsStorageProvider"]=true;
_1.provide("dojox.storage.GearsStorageProvider");
if(_1.isGears){(function(){_1.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(e){console.debug("dojox.storage.GearsStorageProvider.initialize:",e);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=_1.isGears
},put:function(key,_ff,_100,_101){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}_101=_101||this.DEFAULT_NAMESPACE;
if(_1.isString(_ff)){_ff="string:"+_ff
}else{_ff=_1.toJson(_ff)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",_101,key);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",_101,key,_ff)
}catch(e){console.debug("dojox.storage.GearsStorageProvider.put:",e);
_100(this.FAILED,key,e.toString());
return 
}if(_100){_100(dojox.storage.SUCCESS,key,null)
}},get:function(key,_103){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}_103=_103||this.DEFAULT_NAMESPACE;
var _104=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",_103,key);
if(!_104.length){return null
}else{_104=_104[0].value
}if(_1.isString(_104)&&(/^string:/.test(_104))){_104=_104.substring("string:".length)
}else{_104=_1.fromJson(_104)
}return _104
},getNamespaces:function(){var _105=[dojox.storage.DEFAULT_NAMESPACE];
var rs=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var i=0;
i<rs.length;
i++){if(rs[i].namespace!=dojox.storage.DEFAULT_NAMESPACE){_105.push(rs[i].namespace)
}}return _105
},getKeys:function(_108){_108=_108||this.DEFAULT_NAMESPACE;
if(this.isValidKey(_108)==false){throw new Error("Invalid namespace given: "+_108)
}var rs=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",_108);
var _10a=[];
for(var i=0;
i<rs.length;
i++){_10a.push(rs[i].key)
}return _10a
},clear:function(_10c){if(this.isValidKey(_10c)==false){throw new Error("Invalid namespace given: "+_10c)
}_10c=_10c||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",_10c)
},remove:function(key,_10e){_10e=_10e||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",_10e,key)
},putMultiple:function(keys,_110,_111,_112){if(this.isValidKeyArray(keys)===false||!_110 instanceof Array||keys.length!=_110.length){throw new Error("Invalid arguments: keys = ["+keys+"], values = ["+_110+"]")
}if(_112==null||typeof _112=="undefined"){_112=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(_112)==false){throw new Error("Invalid namespace given: "+_112)
}this._statusHandler=_111;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var _113="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var i=0;
i<keys.length;
i++){var _115=_110[i];
if(_1.isString(_115)){_115="string:"+_115
}else{_115=_1.toJson(_115)
}dojox.sql.db.execute(_113,[_112,keys[i],_115])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(e){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",e);
if(_111){_111(this.FAILED,keys,e.toString())
}return 
}if(_111){_111(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(keys,_117){if(this.isValidKeyArray(keys)===false){throw new ("Invalid key array given: "+keys)
}if(_117==null||typeof _117=="undefined"){_117=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(_117)==false){throw new Error("Invalid namespace given: "+_117)
}var _118="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var _119=[];
for(var i=0;
i<keys.length;
i++){var _11b=dojox.sql(_118,_117,keys[i]);
if(!_11b.length){_119[i]=null
}else{_11b=_11b[0].value;
if(_1.isString(_11b)&&(/^string:/.test(_11b))){_119[i]=_11b.substring("string:".length)
}else{_119[i]=_1.fromJson(_11b)
}}}return _119
},removeMultiple:function(keys,_11d){_11d=_11d||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var _11e="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var i=0;
i<keys.length;
i++){dojox.sql.db.execute(_11e,[_11d,keys[i]])
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
}}if(!_1._hasResource["dojox.storage._common"]){_1._hasResource["dojox.storage._common"]=true;
_1.provide("dojox.storage._common");
dojox.storage.manager.initialize()
}if(!_1._hasResource["dojox.storage"]){_1._hasResource["dojox.storage"]=true;
_1.provide("dojox.storage")
}if(!_1._hasResource["dojox.off.files"]){_1._hasResource["dojox.off.files"]=true;
_1.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(_120){if(_1.isString(_120)){var url=this._trimAnchor(_120+"");
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}}else{if(_120 instanceof _1._Url){var url=this._trimAnchor(_120.uri);
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}}else{_1.forEach(_120,function(url){url=this._trimAnchor(url);
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
_1.forEach(this.listOfURLs,function(i){console.debug(i)
})
},remove:function(url){for(var i=0;
i<this.listOfURLs.length;
i++){if(this.listOfURLs[i]==url){this.listOfURLs=this.listOfURLs.splice(i,1);
break
}}},isAvailable:function(url){for(var i=0;
i<this.listOfURLs.length;
i++){if(this.listOfURLs[i]==url){return true
}}return false
},refresh:function(_128){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(_129,_12a,_12b){if(djConfig.isDebug||!_12a||_12b||!_129||_129!=_12a){console.warn("Refreshing offline file list");
this._doRefresh(_128,_12a)
}else{console.warn("No need to refresh offline file list");
_128(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(_128)
}}catch(e){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var _12c=_1.hitch(this,function(url){if(this._sameLocation(url)){this.cache(url)
}});
_12c(window.location.href);
_1.query("script").forEach(function(i){try{_12c(i.getAttribute("src"))
}catch(exp){}});
_1.query("link").forEach(function(i){try{if(!i.getAttribute("rel")||i.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}_12c(i.getAttribute("href"))
}catch(exp){}});
_1.query("img").forEach(function(i){try{_12c(i.getAttribute("src"))
}catch(exp){}});
_1.query("a").forEach(function(i){try{_12c(i.getAttribute("href"))
}catch(exp){}});
_1.forEach(document.styleSheets,function(_132){try{if(_132.cssRules){_1.forEach(_132.cssRules,function(rule){var text=rule.cssText;
if(text){var _135=text.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!_135){return 
}for(var i=1;
i<_135.length;
i++){_12c(_135[i])
}}})
}else{if(_132.cssText){var _137;
var text=_132.cssText.toString();
var _139=text.split(/\f|\r|\n/);
for(var i=0;
i<_139.length;
i++){_137=_139[i].match(/url\(\s*([^\) ]*)\s*\)/i);
if(_137&&_137.length){_12c(_137[1])
}}}}}catch(exp){}})
},_sameLocation:function(url){if(!url){return false
}if(url.length&&url.charAt(0)=="#"){return false
}url=new _1._Url(url);
if(!url.scheme&&!url.port&&!url.host){return true
}if(!url.scheme&&url.host&&url.port&&window.location.hostname==url.host&&window.location.port==url.port){return true
}if(!url.scheme&&url.host&&!url.port&&window.location.hostname==url.host&&window.location.port==80){return true
}return window.location.protocol==(url.scheme+":")&&window.location.hostname==url.host&&(window.location.port==url.port||!window.location.port&&!url.port)
},_trimAnchor:function(url){return url.replace(/\#.*$/,"")
},_doRefresh:function(_13d,_13e){var _13f;
try{_13f=google.gears.factory.create("beta.localserver","1.0")
}catch(exp){_1.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var _140="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
_13f.removeStore(_140);
_13f.openStore(_140);
var _141=_13f.createStore(_140);
this._store=_141;
var self=this;
this._currentFileIndex=0;
this._cancelID=_141.capture(this.listOfURLs,function(url,_144,_145){if(!_144&&self.refreshing){self._cancelID=null;
self.refreshing=false;
var _146=[];
_146.push("Unable to capture: "+url);
_13d(true,_146);
return 
}else{if(_144){self._currentFileIndex++
}}if(_144&&self._currentFileIndex>=self.listOfURLs.length){self._cancelID=null;
self.refreshing=false;
if(_13e){dojox.storage.put("oldVersion",_13e,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
_13d(false,[])
}})
},_getVersionInfo:function(_147){var _148=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var _149=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var _14a=null;
_147=_1.hitch(this,_147);
_1.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(err){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
_147(_149,_14a,_148)
},load:function(data){if(data){_14a=data
}_147(_149,_14a,_148)
}})
}}
}if(!_1._hasResource["dojox.off.sync"]){_1._hasResource["dojox.off.sync"]=true;
_1.provide("dojox.off.sync");
_1.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(type){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(_14e,_14f){if(typeof _14e=="undefined"){_14e=true
}if(!_14e){this.successful=false;
this.details.push(_14f);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(_1.hitch(this,function(_150,_151){if(_150){this.error=true;
this.successful=false;
for(var i=0;
i<_151.length;
i++){this.details.push(_151[i])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
_1.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(_153){this.actions._save(function(){_153()
})
},_load:function(_154){this.actions._load(function(){_154()
})
}});
_1.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(_155){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(_155);
if(this.autoSave){this._save()
}},onReplay:function(_156,_157){},length:function(){return this.entries.length
},haltReplay:function(_158){if(!this.isReplaying){return 
}if(_158){this.reasonHalted=_158.toString()
}if(this.autoSave){var self=this;
this._save(function(){self.isReplaying=false;
self.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var self=this;
this._save(function(){self.isReplaying=false;
self.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var _15b=this.entries[0];
this.onReplay(_15b,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var _15c=this.entries[0];
this.onReplay(_15c,this)
},onReplayFinished:function(){},toString:function(){var _15d="";
_15d+="[";
for(var i=0;
i<this.entries.length;
i++){_15d+="{";
for(var j in this.entries[i]){_15d+=j+': "'+this.entries[i][j]+'"';
_15d+=", "
}_15d+="}, "
}_15d+="]";
return _15d
},_save:function(_160){if(!_160){_160=function(){}
}try{var self=this;
var _162=function(_163,key,_165){if(_163==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:key,value:_165,namespace:dojox.off.STORAGE_NAMESPACE});
_160()
}else{if(_163==dojox.storage.SUCCESS){_160()
}}};
dojox.storage.put("actionlog",this.entries,_162,dojox.off.STORAGE_NAMESPACE)
}catch(exp){console.debug("dojox.off.sync._save: "+exp.message||exp);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
_160()
}},_load:function(_166){var _167=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!_167){_167=[]
}this.entries=_167;
_166()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}if(!_1._hasResource["dojox.off._common"]){_1._hasResource["dojox.off._common"]=true;
_1.provide("dojox.off._common");
_1.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:_1.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(type){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(_169){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(_169)
},onFrameworkEvent:function(type,_16b){if(type=="save"){if(_16b.isCoreSave&&(_16b.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(type=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(_16c){this.hasOfflineCache=_1.isGears;
_16c()
},_onLoad:function(){dojox.off.files.cache(_1.moduleUrl("dojo","dojo.js"));
this._cacheDojoResources();
dojox.off.files.cache(dojox.storage.manager.getResourceList());
dojox.off.files._slurp();
this._checkOfflineCacheAvailable(_1.hitch(this,"_onOfflineCacheChecked"))
},_onOfflineCacheChecked:function(){if(this.hasOfflineCache&&this.enabled){this._load(_1.hitch(this,"_finishStartingUp"))
}else{if(this.hasOfflineCache&&!this.enabled){this._finishStartingUp()
}else{this._keepCheckingUntilInstalled()
}}},_keepCheckingUntilInstalled:function(){this._finishStartingUp()
},_finishStartingUp:function(){if(!this.hasOfflineCache){this.onLoad()
}else{if(this.enabled){this._startNetworkThread();
this.goOnline(_1.hitch(this,function(){dojox.off.onLoad()
}))
}else{if(this.coreOpFailed){this.onFrameworkEvent("coreOperationFailed")
}else{this.onLoad()
}}}},_onPageLoad:function(){this._pageLoaded=true;
if(this._storageLoaded&&this._initializeCalled){this._onLoad()
}},_onStorageLoad:function(){this._storageLoaded=true;
if(!dojox.storage.manager.isAvailable()&&dojox.storage.manager.isInitialized()){this.coreOpFailed=true;
this.enabled=false
}if(this._pageLoaded&&this._initializeCalled){this._onLoad()
}},_isSiteAvailable:function(_16d){_1.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:_1.hitch(this,function(err){this.goingOnline=false;
this.isOnline=false;
if(_16d){_16d(false)
}}),load:_1.hitch(this,function(data){this.goingOnline=false;
this.isOnline=true;
if(_16d){_16d(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(_1.hitch(this,function(){var d=_1.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:_1.hitch(this,function(err){if(this.isOnline){this.isOnline=false;
try{if(typeof d.ioArgs.xhr.abort=="function"){d.ioArgs.xhr.abort()
}}catch(e){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:_1.hitch(this,function(data){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var url=this.availabilityURL.toString();
if(url.indexOf("?")==-1){url+="?"
}else{url+="&"
}url+="browserbust="+new Date().getTime();
return url
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var _174=true;
_1.forEach(_1.query("script"),function(i){var src=i.getAttribute("src");
if(!src){return 
}if(src.indexOf("_base/_loader/bootstrap.js")!=-1){_174=false
}});
if(!_174){dojox.off.files.cache(_1.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(_1.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(_1.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(_1.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var i=0;
i<_1._loadedUrls.length;
i++){dojox.off.files.cache(_1._loadedUrls[i])
}},_save:function(){},_load:function(_178){dojox.off.sync._load(_178)
}});
dojox.storage.manager.addOnLoad(_1.hitch(dojox.off,"_onStorageLoad"));
_1.addOnLoad(dojox.off,"_onPageLoad")
}if(!_1._hasResource["dojox.off"]){_1._hasResource["dojox.off"]=true;
_1.provide("dojox.off")
}if(!_1._hasResource["dojox.off.ui"]){_1._hasResource["dojox.off.ui"]=true;
_1.provide("dojox.off.ui");
_1.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:_1.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:_1.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:_1.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:_1.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:_1.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:_1.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:_1.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:_1.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
_1.connect(dojox.off,"onNetwork",this,"_onNetwork");
_1.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){_1.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(err){dojox.off.enabled=false;
err=err.message||err;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+err)
},load:_1.hitch(this,this._templateLoaded)})
},_templateLoaded:function(data){var _17b=_1.byId(this.autoEmbedID);
if(_17b){_17b.innerHTML=data
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var _17c=_1.byId("dot-widget-browser-restart");
if(_17c){_17c.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(_1.hitch(this,function(_17d){this._onNetwork(_17d?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var _17e=_1.byId("dot-widget-network-indicator-online");
var _17f=_1.byId("dot-widget-network-indicator-offline");
var _180=_1.byId("dot-widget-title-text");
if(_17e&&_17f){if(dojox.off.isOnline==true){_17e.style.display="inline";
_17f.style.display="none"
}else{_17e.style.display="none";
_17f.style.display="inline"
}}if(_180){if(dojox.off.isOnline){_180.innerHTML="Online"
}else{_180.innerHTML="Offline"
}}},_initLearnHow:function(){var _181=_1.byId("dot-widget-learn-how-link");
if(!_181){return 
}if(!this.customLearnHowPath){var _182=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(_182);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}_181.setAttribute("href",this.learnHowPath);
var _183=_1.byId("dot-widget-learn-how-app-name");
if(!_183){return 
}_183.innerHTML="";
_183.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(_184){if(!_184){return false
}return(/^[a-z0-9 ]*$/i.test(_184))
},_updateSyncUI:function(){var _185=_1.byId("dot-roller");
var _186=_1.byId("dot-success-checkmark");
var _187=_1.byId("dot-sync-messages");
var _188=_1.byId("dot-sync-details");
var _189=_1.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(_185){_185.style.display="inline"
}if(_186){_186.style.display="none"
}if(_187){_1.removeClass(_187,"dot-sync-error")
}if(_188){_188.style.display="none"
}if(_189){_189.style.display="inline"
}}else{if(_185){_185.style.display="none"
}if(_189){_189.style.display="none"
}if(_187){_1.removeClass(_187,"dot-sync-error")
}}},_setSyncMessage:function(_18a){var _18b=_1.byId("dot-sync-messages");
if(_18b){while(_18b.firstChild){_18b.removeChild(_18b.firstChild)
}_18b.appendChild(document.createTextNode(_18a))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var _18c=_1.byId("dot-widget-network-indicator-online");
if(_18c){_18c.setAttribute("src",this.onlineImagePath)
}var _18d=_1.byId("dot-widget-network-indicator-offline");
if(_18d){_18d.setAttribute("src",this.offlineImagePath)
}var _18e=_1.byId("dot-roller");
if(_18e){_18e.setAttribute("src",this.rollerImagePath)
}var _18f=_1.byId("dot-success-checkmark");
if(_18f){_18f.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(evt){evt.preventDefault();
evt.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var html="";
html+="<html><head><title>Sync Details</title><head><body>";
html+="<h1>Sync Details</h1>\n";
html+="<ul>\n";
for(var i=0;
i<dojox.off.sync.details.length;
i++){html+="<li>";
html+=dojox.off.sync.details[i];
html+="</li>"
}html+="</ul>\n";
html+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
html+="</body></html>";
var _193="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var _194=window.open("","SyncDetails",_193);
if(!_194){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}_194.document.open();
_194.document.write(html);
_194.document.close();
if(_194.focus){_194.focus()
}},_cancel:function(evt){evt.preventDefault();
evt.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var _196=_1.byId("dot-widget-browser-restart");
if(_196){_1.addClass(_196,"dot-needs-browser-restart")
}var _197=_1.byId("dot-widget-browser-restart-app-name");
if(_197){_197.innerHTML="";
_197.appendChild(document.createTextNode(this.appName))
}var _198=_1.byId("dot-sync-status");
if(_198){_198.style.display="none"
}},_showNeedsOfflineCache:function(){var _199=_1.byId("dot-widget-container");
if(_199){_1.addClass(_199,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var _19a=_1.byId("dot-widget-container");
if(_19a){_1.removeClass(_19a,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var _19b=_1.byId("dot-sync-details-button");
if(_19b){_1.connect(_19b,"onclick",this,this._showDetails)
}var _19c=_1.byId("dot-sync-cancel-button");
if(_19c){_1.connect(_19c,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(_19d){var _19e=[];
_19e.push(_1.byId("dot-sync-status"));
for(var i=0;
i<_19e.length;
i++){if(_19e[i]){_19e[i].style.visibility=(_19d?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var _1a0=_1.byId("dot-success-checkmark");
var _1a1=_1.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(_1a0){_1a0.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(_1a0){_1a0.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var _1a2=_1.byId("dot-sync-messages");
if(_1a2){_1.addClass(_1a2,"dot-sync-error")
}if(_1a0){_1a0.style.display="none"
}}}if(dojox.off.sync.details.length&&_1a1){_1a1.style.display="inline"
}},_onFrameworkEvent:function(type,_1a4){if(type=="save"){if(_1a4.status==dojox.storage.FAILED&&!_1a4.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(type=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(type=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var _1a5=_1.byId("dot-widget-browser-restart");
if(_1a5){_1a5.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(type){switch(type){case"start":this._updateSyncUI();
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
default:_1.warn("Programming error: Unknown sync type in dojox.off.ui: "+type);
break
}},_onNetwork:function(type){if(!this._initialized){return 
}this._updateNetIndicator();
if(type=="offline"){this._setSyncMessage("You are working offline");
var _1a8=_1.byId("dot-sync-details");
if(_1a8){_1a8.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
_1.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
_1.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}if(!_1._hasResource["dojox.off.offline"]){_1._hasResource["dojox.off.offline"]=true;
_1.provide("dojox.off.offline")
}}});