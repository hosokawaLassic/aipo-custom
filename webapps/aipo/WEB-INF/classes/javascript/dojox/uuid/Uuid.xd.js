dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.Uuid"],["require","dojox.uuid"]],defineResource:function(B){if(!B._hasResource["dojox.uuid.Uuid"]){B._hasResource["dojox.uuid.Uuid"]=true;
B.provide("dojox.uuid.Uuid");
B.require("dojox.uuid");
dojox.uuid.Uuid=function(A){this._uuidString=dojox.uuid.NIL_UUID;
if(A){dojox.uuid.assert(B.isString(A));
this._uuidString=A.toLowerCase();
dojox.uuid.assert(this.isValid())
}else{var D=dojox.uuid.Uuid.getGenerator();
if(D){this._uuidString=D();
dojox.uuid.assert(this.isValid())
}}};
dojox.uuid.Uuid.compare=function(A,F){var G=A.toString();
var H=F.toString();
if(G>H){return 1
}if(G<H){return -1
}return 0
};
dojox.uuid.Uuid.setGenerator=function(A){dojox.uuid.assert(!A||B.isFunction(A));
dojox.uuid.Uuid._ourGenerator=A
};
dojox.uuid.Uuid.getGenerator=function(){return dojox.uuid.Uuid._ourGenerator
};
dojox.uuid.Uuid.prototype.toString=function(){return this._uuidString
};
dojox.uuid.Uuid.prototype.compare=function(A){return dojox.uuid.Uuid.compare(this,A)
};
dojox.uuid.Uuid.prototype.isEqual=function(A){return(this.compare(A)==0)
};
dojox.uuid.Uuid.prototype.isValid=function(){return dojox.uuid.isValid(this)
};
dojox.uuid.Uuid.prototype.getVariant=function(){return dojox.uuid.getVariant(this)
};
dojox.uuid.Uuid.prototype.getVersion=function(){if(!this._versionNumber){this._versionNumber=dojox.uuid.getVersion(this)
}return this._versionNumber
};
dojox.uuid.Uuid.prototype.getNode=function(){if(!this._nodeString){this._nodeString=dojox.uuid.getNode(this)
}return this._nodeString
};
dojox.uuid.Uuid.prototype.getTimestamp=function(A){if(!A){A=null
}switch(A){case"string":case String:return this.getTimestamp(Date).toUTCString();
break;
case"hex":if(!this._timestampAsHexString){this._timestampAsHexString=dojox.uuid.getTimestamp(this,"hex")
}return this._timestampAsHexString;
break;
case null:case"date":case Date:if(!this._timestampAsDate){this._timestampAsDate=dojox.uuid.getTimestamp(this,Date)
}return this._timestampAsDate;
break;
default:dojox.uuid.assert(false,"The getTimestamp() method dojox.uuid.Uuid was passed a bogus returnType: "+A);
break
}}
}}});