if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.require("dojo.fx");
dojo.require("dojo.number");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(E){dojo.mixin(this,E||{});
var H=1,G;
if(this.indeterminate){G="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{G="removeClass";
if(String(this.progress).indexOf("%")!=-1){H=Math.min(parseFloat(this.progress)/100,1);
this.progress=H*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
H=this.progress/this.maximum
}var F=this.report(H);
this.label.firstChild.nodeValue=F;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[G](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(H*100)+"%";
this.onChange()
},report:function(B){return dojo.number.format(B,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
};