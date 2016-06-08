dojo._xdResourceLoaded({depends:[["provide","dijit.form.Form"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.form.Form"]){B._hasResource["dijit.form.Form"]=true;
B.provide("dijit.form.Form");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:B.mixin(B.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){B.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(A){var G={};
B.forEach(this.getDescendants(),function(C){if(!C.name){return 
}var D=G[C.name]||(G[C.name]=[]);
D.push(C)
});
for(var I in G){var H=G[I],J=B.getObject(I,false,A);
if(!B.isArray(J)){J=[J]
}if(H[0].setChecked){B.forEach(H,function(D,C){D.setChecked(B.indexOf(J,D.value)!=-1)
})
}else{B.forEach(H,function(D,C){D.setValue(J[C])
})
}}},getValues:function(){var A={};
B.forEach(this.getDescendants(),function(G){var H=G.getValue?G.getValue():G.value;
var J=G.name;
if(!J){return 
}if(G.setChecked){if(/Radio/.test(G.declaredClass)){if(G.checked){B.setObject(J,H,A)
}}else{var I=B.getObject(J,false,A);
if(!I){I=[];
B.setObject(J,I,A)
}if(G.checked){I.push(H)
}}}else{B.setObject(J,H,A)
}});
return A
},isValid:function(){return B.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
B.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}}});