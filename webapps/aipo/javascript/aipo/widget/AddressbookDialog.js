if(!dojo._hasResource["aipo.widget.AddressbookDialog"]){dojo._hasResource["aipo.widget.AddressbookDialog"]=true;
dojo.provide("aipo.widget.AddressbookDialog");
dojo.provide("aipo.widget.AddressbookDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.webmail.widget.AddressbookDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=addressbookDialogUnderlayWrapper id='${id}_underlay'><div class=addressbookDialogUnderlay dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.webmail.widget.AddressbookDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"addressbookDialog",templateString:"<div id='addressbookDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.webmail.widget.AddressbookDialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
}})
};