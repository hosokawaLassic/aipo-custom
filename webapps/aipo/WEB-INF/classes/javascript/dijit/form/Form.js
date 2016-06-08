if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(B){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(B){dojo.stopEvent(B);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(G){var H={};
dojo.forEach(this.getDescendants(),function(A){if(!A.name){return 
}var B=H[A.name]||(H[A.name]=[]);
B.push(A)
});
for(var J in H){var I=H[J],F=dojo.getObject(J,false,G);
if(!dojo.isArray(F)){F=[F]
}if(I[0].setChecked){dojo.forEach(I,function(B,A){B.setChecked(dojo.indexOf(F,B.value)!=-1)
})
}else{dojo.forEach(I,function(B,A){B.setValue(F[A])
})
}}},getValues:function(){var B={};
dojo.forEach(this.getDescendants(),function(A){var F=A.getValue?A.getValue():A.value;
var H=A.name;
if(!H){return 
}if(A.setChecked){if(/Radio/.test(A.declaredClass)){if(A.checked){dojo.setObject(H,F,B)
}}else{var G=dojo.getObject(H,false,B);
if(!G){G=[];
dojo.setObject(H,G,B)
}if(A.checked){G.push(F)
}}}else{dojo.setObject(H,F,B)
}});
return B
},isValid:function(){return dojo.every(this.getDescendants(),function(B){return !B.isValid||B.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
};