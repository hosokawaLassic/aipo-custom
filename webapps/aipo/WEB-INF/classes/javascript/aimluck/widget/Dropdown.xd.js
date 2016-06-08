dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dropdown"],["require","dijit.form.Button"]],defineResource:function(B){if(!B._hasResource["aimluck.widget.Dropdown"]){B._hasResource["aimluck.widget.Dropdown"]=true;
B.provide("aimluck.widget.Dropdown");
B.require("dijit.form.Button");
B.declare("aimluck.widget.Dropdown",[dijit.form.DropDownButton],{inputWidth:"250px",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",iconURL:"",iconAlt:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',_openDropDown:function(){this.inherited(arguments);
var E=window.navigator.userAgent.toLowerCase();
if(E.indexOf("chrome")>-1||(B.isFF&&(B.isFF>=3.6))){var F=this.dropDown.domNode.parentNode;
var A=F.style.top.replace("px","");
top_new=parseInt(A)+window.scrollY;
F.style.top=top_new+"px"
}},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var A=this.dropDown;
if(!A){return false
}if(!this._opened){if(A.href&&!A.isLoaded){var F=this;
var E=B.connect(A,"onLoad",function(){B.disconnect(E);
F._openDropDown()
});
A._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}}})
}}});