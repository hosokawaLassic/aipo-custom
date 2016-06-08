dojo._xdResourceLoaded({depends:[["provide","dijit.ProgressBar"],["require","dojo.fx"],["require","dojo.number"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.ProgressBar"]){B._hasResource["dijit.ProgressBar"]=true;
B.provide("dijit.ProgressBar");
B.require("dojo.fx");
B.require("dojo.number");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:B.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(H){B.mixin(this,H||{});
var G=1,F;
if(this.indeterminate){F="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{F="removeClass";
if(String(this.progress).indexOf("%")!=-1){G=Math.min(parseFloat(this.progress)/100,1);
this.progress=G*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
G=this.progress/this.maximum
}var A=this.report(G);
this.label.firstChild.nodeValue=A;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}B[F](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(G*100)+"%";
this.onChange()
},report:function(A){return B.number.format(A,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
}}});