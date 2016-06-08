dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.bits"]],defineResource:function(B){if(!B._hasResource["dojox.encoding.bits"]){B._hasResource["dojox.encoding.bits"]=true;
B.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
B.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(A,F){while(F){var H=Math.min(F,this.available);
var G=(H<=F?A>>>(F-H):A)<<(this.available-H);
this.accumulator|=G&(255>>>(8-this.available));
this.available-=H;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}F-=H
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var A=this.buffer;
if(this.available<8){A.push(this.accumulator&(255<<this.available))
}this.reset();
return A
}});
dojox.encoding.bits.InputStream=function(D,A){this.buffer=D;
this.width=A;
this.bbyte=this.bit=0
};
B.extend(dojox.encoding.bits.InputStream,{getBits:function(F){var A=0;
while(F){var H=Math.min(F,8-this.bit);
var G=this.buffer[this.bbyte]>>>(8-this.bit-H);
A<<=H;
A|=G&~(~0<<H);
this.bit+=H;
if(this.bit==8){++this.bbyte;
this.bit=0
}F-=H
}return A
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
}}});