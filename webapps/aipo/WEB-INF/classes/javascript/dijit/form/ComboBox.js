if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(B){this._lastDisplayedValue=B;
this.setValue(B,true)
},_getCaretPos:function(E){if(typeof (E.selectionStart)=="number"){return E.selectionStart
}else{if(dojo.isIE){var G=document.selection.createRange().duplicate();
var H=E.createTextRange();
G.move("character",0);
H.move("character",0);
try{H.setEndPoint("EndToEnd",G);
return String(H.text).replace(/\r/g,"").length
}catch(F){return 0
}}}},_setCaretPos:function(D,C){C=parseInt(C);
this._setSelectedRange(D,C,C)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(E){if(E.altKey||(E.ctrlKey&&E.charCode!=118)){return 
}var G=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(E)
}switch(E.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
G=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var F;
if(this._isShowingNow&&(F=this._popupWidget.getHighlightedOption())){if(F==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(E);
break
}else{if(F==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(E);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}E.preventDefault();
case dojo.keys.TAB:var H=this.getDisplayedValue();
if(this._popupWidget&&(H==this._popupWidget._messages.previousMessage||H==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(E);
this._selectOption();
this._hideResultList()
}else{G=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(E)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
G=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||E.charCode!=0){G=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(G){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(C){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(C))){var D=this._getCaretPos(this.focusNode);
if((D+1)>this.focusNode.value.length){this.focusNode.value=C;
this._setSelectedRange(this.focusNode,D,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}}else{this.focusNode.value=C;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}},_openResultList:function(D,F){if(this.disabled||F.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!D.length){this._hideResultList();
return 
}var E=new String(this.store.getValue(D[0],this.searchAttr));
if(E&&this.autoComplete&&!this._prev_key_backspace&&(F.query[this.searchAttr]!="*")){this._autoCompleteText(E);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",E)
}this._popupWidget.createOptions(D,F,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(F.direction){if(F.direction==1){this._popupWidget.highlightFirstOption()
}else{if(F.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(B)
}},onfocus:function(B){this._hasFocus=true;
this._onMouse(B)
},_announceOption:function(C){if(C==null){return 
}var D;
if(C==this._popupWidget.nextButton||C==this._popupWidget.previousButton){D=C.innerHTML
}else{D=this.store.getValue(C.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(D)
},_selectOption:function(C){var D=null;
if(!C){C={target:this._popupWidget.getHighlightedOption()}
}if(!C.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{D=C.target
}if(!C.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(D.item,this.searchAttr).length)
}this._doSelect(D)
},_doSelect:function(B){this.item=B.item;
this.setValue(this.store.getValue(B.item,this.searchAttr),true)
},_onArrowMouseDown:function(B){if(this.disabled){return 
}dojo.stopEvent(B);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(E){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var G=this.query;
this._lastQuery=G[this.searchAttr]=E+"*";
var H=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:G,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function F(B,A){B.start+=B.count*A;
B.direction=A;
B.store.fetch(B)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,F,H)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(B){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var B=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(A){A.style.display="none";
return{value:A.getAttribute("value"),name:String(A.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:B}});
if(B&&B.length&&!this.value){this.value=B[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(B){return{html:false,label:this.store.getValue(B,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(B){this.value=B;
this.onChange(B)
},onChange:function(B){},onPage:function(B){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(G,H){var E=H(G);
var F=document.createElement("div");
if(E.html){F.innerHTML=E.label
}else{F.appendChild(document.createTextNode(E.label))
}if(F.innerHTML==""){F.innerHTML="&nbsp;"
}F.item=G;
return F
},createOptions:function(H,G,E){this.previousButton.style.display=G.start==0?"none":"";
var F=this;
dojo.forEach(H,function(B){var A=F._createOption(B,E);
A.className="dijitMenuItem";
F.domNode.insertBefore(A,F.nextButton)
});
this.nextButton.style.display=G.count==H.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(B){dojo.stopEvent(B)
},onmouseup:function(C){if(C.target===this.domNode){return 
}else{if(C.target==this.previousButton){this.onPage(-1)
}else{if(C.target==this.nextButton){this.onPage(1)
}else{var D=C.target;
while(!D.item){D=D.parentNode
}this.setValue({target:D},true)
}}}},onmouseover:function(C){if(C.target===this.domNode){return 
}var D=C.target;
if(!(D==this.previousButton||D==this.nextButton)){while(!D.item){D=D.parentNode
}}this._focusOptionNode(D)
},onmouseout:function(B){if(B.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(B){if(this._highlighted_option!=B){this._blurOptionNode();
this._highlighted_option=B;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(J){var G=0;
var I=this.domNode.scrollTop;
var F=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(G<F){if(J){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var H=this.domNode.scrollTop;
G+=(H-I)*(J?-1:1);
I=H
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(B){switch(B.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
};