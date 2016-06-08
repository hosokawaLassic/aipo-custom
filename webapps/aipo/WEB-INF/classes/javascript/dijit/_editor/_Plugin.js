if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.require("dijit._Widget");
dojo.require("dijit.Editor");
dojo.require("dijit.form.Button");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(C,D){if(C){dojo.mixin(this,C)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var D=this.editor.commands[this.command];
var E="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var F={label:D,showLabel:false,iconClass:E,dropDown:this.dropDown};
this.button=new this.buttonClass(F)
}}},updateState:function(){var E=this.editor;
var H=this.command;
if(!E){return 
}if(!E.isLoaded){return 
}if(!H.length){return 
}if(this.button){try{var G=E.queryCommandEnabled(H);
this.button.setDisabled(!G);
if(this.button.setChecked){this.button.setChecked(E.queryCommandState(H))
}}catch(F){console.debug(F)
}}},setEditor:function(B){this.editor=B;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(B){if(this.button){B.addChild(this.button)
}}})
};