if(!dojo._hasResource["dojox.string.sprintf"]){dojo._hasResource["dojox.string.sprintf"]=true;
dojo.provide("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojox.string.sprintf=function(G,H){for(var F=[],I=1;
I<arguments.length;
I++){F.push(arguments[I])
}var J=new dojox.string.sprintf.Formatter(G);
return J.format.apply(J,F)
};
dojox.string.sprintf.Formatter=function(D){var C=[];
this._mapped=false;
this._format=D;
this._tokens=dojox.string.tokenize(D,this._re,this._parseDelim,this)
};
dojo.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(L,M,N,J,I,H,K){if(L){this._mapped=true
}return{mapping:L,intmapping:M,flags:N,_minWidth:J,period:I,_precision:H,specifier:K}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(D){if(!isNaN(D.arg)){var C=parseInt(D.arg);
if(C<0||C>127){throw new Error("invalid character code passed to %c in sprintf")
}D.arg=isNaN(C)?""+C:String.fromCharCode(C)
}}},s:{setMaxWidth:function(B){B.maxWidth=(B.period==".")?B.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(K){if(this._mapped&&typeof K!="object"){throw new Error("format requires a mapping")
}var O="";
var R=0;
for(var J=0,L;
J<this._tokens.length;
J++){L=this._tokens[J];
if(typeof L=="string"){O+=L
}else{if(this._mapped){if(typeof K[L.mapping]=="undefined"){throw new Error("missing key "+L.mapping)
}L.arg=K[L.mapping]
}else{if(L.intmapping){var R=parseInt(L.intmapping)-1
}if(R>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}L.arg=arguments[R++]
}if(!L.compiled){L.compiled=true;
L.sign="";
L.zeroPad=false;
L.rightJustify=false;
L.alternative=false;
var M={};
for(var N=L.flags.length;
N--;
){var P=L.flags.charAt(N);
M[P]=true;
switch(P){case" ":L.sign=" ";
break;
case"+":L.sign="+";
break;
case"0":L.zeroPad=(M["-"])?false:true;
break;
case"-":L.rightJustify=true;
L.zeroPad=false;
break;
case"#":L.alternative=true;
break;
default:throw Error("bad formatting flag '"+L.flags.charAt(N)+"'")
}}L.minWidth=(L._minWidth)?parseInt(L._minWidth):0;
L.maxWidth=-1;
L.toUpper=false;
L.isUnsigned=false;
L.isInt=false;
L.isDouble=false;
L.precision=1;
if(L.period=="."){if(L._precision){L.precision=parseInt(L._precision)
}else{L.precision=0
}}var Q=this._specifiers[L.specifier];
if(typeof Q=="undefined"){throw new Error("unexpected specifier '"+L.specifier+"'")
}if(Q.extend){dojo.mixin(Q,this._specifiers[Q.extend]);
delete Q.extend
}dojo.mixin(L,Q)
}if(typeof L.setArg=="function"){L.setArg(L)
}if(typeof L.setMaxWidth=="function"){L.setMaxWidth(L)
}if(L._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}L.minWidth=parseInt(arguments[R++]);
if(isNaN(L.minWidth)){throw new Error("the argument for * width at position "+R+" is not a number in "+this._format)
}if(L.minWidth<0){L.rightJustify=true;
L.minWidth=-L.minWidth
}}if(L._precision=="*"&&L.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}L.precision=parseInt(arguments[R++]);
if(isNaN(L.precision)){throw Error("the argument for * precision at position "+R+" is not a number in "+this._format)
}if(L.precision<0){L.precision=1;
L.period=""
}}if(L.isInt){if(L.period=="."){L.zeroPad=false
}this.formatInt(L)
}else{if(L.isDouble){if(L.period!="."){L.precision=6
}this.formatDouble(L)
}}this.fitField(L);
O+=""+L.arg
}}return O
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(D){var C=parseInt(D.arg);
if(!isFinite(C)){if(typeof D.arg!="number"){throw new Error("format argument '"+D.arg+"' not an integer; parseInt returned "+C)
}C=0
}if(C<0&&(D.isUnsigned||D.base!=10)){C=4294967295+C+1
}if(C<0){D.arg=(-C).toString(D.base);
this.zeroPad(D);
D.arg="-"+D.arg
}else{D.arg=C.toString(D.base);
if(!C&&!D.precision){D.arg=""
}else{this.zeroPad(D)
}if(D.sign){D.arg=D.sign+D.arg
}}if(D.base==16){if(D.alternative){D.arg="0x"+D.arg
}toke.art=D.toUpper?D.arg.toUpperCase():D.arg.toLowerCase()
}if(D.base==8){if(D.alternative&&D.arg.charAt(0)!="0"){D.arg="0"+D.arg
}}},formatDouble:function(C){var D=parseFloat(C.arg);
if(!isFinite(D)){if(typeof C.arg!="number"){throw new Error("format argument '"+C.arg+"' not a float; parseFloat returned "+D)
}D=0
}switch(C.doubleNotation){case"e":C.arg=D.toExponential(C.precision);
break;
case"f":C.arg=D.toFixed(C.precision);
break;
case"g":if(Math.abs(D)<0.0001){C.arg=D.toExponential(C.precision>0?C.precision-1:C.precision)
}else{C.arg=D.toPrecision(C.precision)
}if(!C.alternative){C.arg=C.arg.replace(/(\..*[^0])0*/,"$1");
C.arg=C.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+C.doubleNotation+"'")
}C.arg=C.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(dojo.isOpera){C.arg=C.arg.replace(/^\./,"0.")
}if(C.alternative){C.arg=C.arg.replace(/^(\d+)$/,"$1.");
C.arg=C.arg.replace(/^(\d+)e/,"$1.e")
}if(D>=0&&C.sign){C.arg=C.sign+C.arg
}C.arg=C.toUpper?C.arg.toUpperCase():C.arg.toLowerCase()
},zeroPad:function(H,G){G=(arguments.length==2)?G:H.precision;
if(typeof H.arg!="string"){H.arg=""+H.arg
}var E=G-10;
while(H.arg.length<E){H.arg=(H.rightJustify)?H.arg+this._zeros10:this._zeros10+H.arg
}var F=G-H.arg.length;
H.arg=(H.rightJustify)?H.arg+this._zeros10.substring(0,F):this._zeros10.substring(0,F)+H.arg
},fitField:function(B){if(B.maxWidth>=0&&B.arg.length>B.maxWidth){return B.arg.substring(0,B.maxWidth)
}if(B.zeroPad){this.zeroPad(B,B.minWidth);
return 
}this.spacePad(B)
},spacePad:function(H,G){G=(arguments.length==2)?G:H.minWidth;
if(typeof H.arg!="string"){H.arg=""+H.arg
}var E=G-10;
while(H.arg.length<E){H.arg=(H.rightJustify)?H.arg+this._spaces10:this._spaces10+H.arg
}var F=G-H.arg.length;
H.arg=(H.rightJustify)?H.arg+this._spaces10.substring(0,F):this._spaces10.substring(0,F)+H.arg
}})
};