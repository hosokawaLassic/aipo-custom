if(!dojo._hasResource["dojox.encoding.bits"]){dojo._hasResource["dojox.encoding.bits"]=true;
dojo.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
dojo.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(F,G){while(G){var E=Math.min(G,this.available);
var H=(E<=G?F>>>(G-E):F)<<(this.available-E);
this.accumulator|=H&(255>>>(8-this.available));
this.available-=E;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}G-=E
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var B=this.buffer;
if(this.available<8){B.push(this.accumulator&(255<<this.available))
}this.reset();
return B
}});
dojox.encoding.bits.InputStream=function(C,D){this.buffer=C;
this.width=D;
this.bbyte=this.bit=0
};
dojo.extend(dojox.encoding.bits.InputStream,{getBits:function(G){var F=0;
while(G){var E=Math.min(G,8-this.bit);
var H=this.buffer[this.bbyte]>>>(8-this.bit-E);
F<<=E;
F|=H&~(~0<<E);
this.bit+=E;
if(this.bit==8){++this.bbyte;
this.bit=0
}G-=E
}return F
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
};