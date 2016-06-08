dojo._xdResourceLoaded({depends:[["provide","dijit.ProgressBar"],["require","dojo.fx"],["require","dojo.number"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.ProgressBar"]){A._hasResource["dijit.ProgressBar"]=true;
A.provide("dijit.ProgressBar");
A.require("dojo.fx");
A.require("dojo.number");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:A.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(B){A.mixin(this,B||{});
var C=1,D;
if(this.indeterminate){D="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{D="removeClass";
if(String(this.progress).indexOf("%")!=-1){C=Math.min(parseFloat(this.progress)/100,1);
this.progress=C*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
C=this.progress/this.maximum
}var E=this.report(C);
this.label.firstChild.nodeValue=E;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}A[D](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(C*100)+"%";
this.onChange()
},report:function(B){return A.number.format(B,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
}}});