dojo._xdResourceLoaded({depends:[["provide","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(B){if(!B._hasResource["dojox.string.sprintf"]){B._hasResource["dojox.string.sprintf"]=true;
B.provide("dojox.string.sprintf");
B.require("dojox.string.tokenize");
dojox.string.sprintf=function(A,G){for(var J=[],H=1;
H<arguments.length;
H++){J.push(arguments[H])
}var I=new dojox.string.sprintf.Formatter(A);
return I.format.apply(I,J)
};
dojox.string.sprintf.Formatter=function(A){var D=[];
this._mapped=false;
this._format=A;
this._tokens=dojox.string.tokenize(A,this._re,this._parseDelim,this)
};
B.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(K,L,M,I,A,N,J){if(K){this._mapped=true
}return{mapping:K,intmapping:L,flags:M,_minWidth:I,period:A,_precision:N,specifier:J}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(A){if(!isNaN(A.arg)){var D=parseInt(A.arg);
if(D<0||D>127){throw new Error("invalid character code passed to %c in sprintf")
}A.arg=isNaN(D)?""+D:String.fromCharCode(D)
}}},s:{setMaxWidth:function(A){A.maxWidth=(A.period==".")?A.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(A){if(this._mapped&&typeof A!="object"){throw new Error("format requires a mapping")
}var N="";
var Q=0;
for(var R=0,K;
R<this._tokens.length;
R++){K=this._tokens[R];
if(typeof K=="string"){N+=K
}else{if(this._mapped){if(typeof A[K.mapping]=="undefined"){throw new Error("missing key "+K.mapping)
}K.arg=A[K.mapping]
}else{if(K.intmapping){var Q=parseInt(K.intmapping)-1
}if(Q>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}K.arg=arguments[Q++]
}if(!K.compiled){K.compiled=true;
K.sign="";
K.zeroPad=false;
K.rightJustify=false;
K.alternative=false;
var L={};
for(var M=K.flags.length;
M--;
){var O=K.flags.charAt(M);
L[O]=true;
switch(O){case" ":K.sign=" ";
break;
case"+":K.sign="+";
break;
case"0":K.zeroPad=(L["-"])?false:true;
break;
case"-":K.rightJustify=true;
K.zeroPad=false;
break;
case"#":K.alternative=true;
break;
default:throw Error("bad formatting flag '"+K.flags.charAt(M)+"'")
}}K.minWidth=(K._minWidth)?parseInt(K._minWidth):0;
K.maxWidth=-1;
K.toUpper=false;
K.isUnsigned=false;
K.isInt=false;
K.isDouble=false;
K.precision=1;
if(K.period=="."){if(K._precision){K.precision=parseInt(K._precision)
}else{K.precision=0
}}var P=this._specifiers[K.specifier];
if(typeof P=="undefined"){throw new Error("unexpected specifier '"+K.specifier+"'")
}if(P.extend){B.mixin(P,this._specifiers[P.extend]);
delete P.extend
}B.mixin(K,P)
}if(typeof K.setArg=="function"){K.setArg(K)
}if(typeof K.setMaxWidth=="function"){K.setMaxWidth(K)
}if(K._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}K.minWidth=parseInt(arguments[Q++]);
if(isNaN(K.minWidth)){throw new Error("the argument for * width at position "+Q+" is not a number in "+this._format)
}if(K.minWidth<0){K.rightJustify=true;
K.minWidth=-K.minWidth
}}if(K._precision=="*"&&K.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}K.precision=parseInt(arguments[Q++]);
if(isNaN(K.precision)){throw Error("the argument for * precision at position "+Q+" is not a number in "+this._format)
}if(K.precision<0){K.precision=1;
K.period=""
}}if(K.isInt){if(K.period=="."){K.zeroPad=false
}this.formatInt(K)
}else{if(K.isDouble){if(K.period!="."){K.precision=6
}this.formatDouble(K)
}}this.fitField(K);
N+=""+K.arg
}}return N
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(A){var D=parseInt(A.arg);
if(!isFinite(D)){if(typeof A.arg!="number"){throw new Error("format argument '"+A.arg+"' not an integer; parseInt returned "+D)
}D=0
}if(D<0&&(A.isUnsigned||A.base!=10)){D=4294967295+D+1
}if(D<0){A.arg=(-D).toString(A.base);
this.zeroPad(A);
A.arg="-"+A.arg
}else{A.arg=D.toString(A.base);
if(!D&&!A.precision){A.arg=""
}else{this.zeroPad(A)
}if(A.sign){A.arg=A.sign+A.arg
}}if(A.base==16){if(A.alternative){A.arg="0x"+A.arg
}toke.art=A.toUpper?A.arg.toUpperCase():A.arg.toLowerCase()
}if(A.base==8){if(A.alternative&&A.arg.charAt(0)!="0"){A.arg="0"+A.arg
}}},formatDouble:function(D){var A=parseFloat(D.arg);
if(!isFinite(A)){if(typeof D.arg!="number"){throw new Error("format argument '"+D.arg+"' not a float; parseFloat returned "+A)
}A=0
}switch(D.doubleNotation){case"e":D.arg=A.toExponential(D.precision);
break;
case"f":D.arg=A.toFixed(D.precision);
break;
case"g":if(Math.abs(A)<0.0001){D.arg=A.toExponential(D.precision>0?D.precision-1:D.precision)
}else{D.arg=A.toPrecision(D.precision)
}if(!D.alternative){D.arg=D.arg.replace(/(\..*[^0])0*/,"$1");
D.arg=D.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+D.doubleNotation+"'")
}D.arg=D.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(B.isOpera){D.arg=D.arg.replace(/^\./,"0.")
}if(D.alternative){D.arg=D.arg.replace(/^(\d+)$/,"$1.");
D.arg=D.arg.replace(/^(\d+)e/,"$1.e")
}if(A>=0&&D.sign){D.arg=D.sign+D.arg
}D.arg=D.toUpper?D.arg.toUpperCase():D.arg.toLowerCase()
},zeroPad:function(G,F){F=(arguments.length==2)?F:G.precision;
if(typeof G.arg!="string"){G.arg=""+G.arg
}var H=F-10;
while(G.arg.length<H){G.arg=(G.rightJustify)?G.arg+this._zeros10:this._zeros10+G.arg
}var A=F-G.arg.length;
G.arg=(G.rightJustify)?G.arg+this._zeros10.substring(0,A):this._zeros10.substring(0,A)+G.arg
},fitField:function(A){if(A.maxWidth>=0&&A.arg.length>A.maxWidth){return A.arg.substring(0,A.maxWidth)
}if(A.zeroPad){this.zeroPad(A,A.minWidth);
return 
}this.spacePad(A)
},spacePad:function(G,F){F=(arguments.length==2)?F:G.minWidth;
if(typeof G.arg!="string"){G.arg=""+G.arg
}var H=F-10;
while(G.arg.length<H){G.arg=(G.rightJustify)?G.arg+this._spaces10:this._spaces10+G.arg
}var A=F-G.arg.length;
G.arg=(G.rightJustify)?G.arg+this._spaces10.substring(0,A):this._spaces10.substring(0,A)+G.arg
}})
}}});