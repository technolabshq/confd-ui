//>>built
define("gridx/modules/HeaderMenu","dojo/_base/declare dojo/_base/event dijit/registry dojo/dom-construct dojo/dom-class dojo/keys ../core/_Module ./HeaderRegions".split(" "),function(g,h,k,l,m,n,p){return g(p,{name:"headerMenu",forced:["headerRegions"],preload:function(){var c=this,d=c.grid;d.headerRegions.add(function(e){var a=e.menu&&k.byId(e.menu);if(a){var b=l.create("div",{className:"gridxHeaderMenuBtn",tabIndex:-1,innerHTML:'\x3cspan class\x3d"gridxHeaderMenuBtnInner"\x3e\x26#9662;\x3c/span\x3e\x26nbsp;'});
m.add(a.domNode,"gridxHeaderMenu");a.bindDomNode(b);c.connect(b,"onkeydown",function(f){f.keyCode==n.ENTER&&(h.stop(f),a._scheduleOpen(b))});a.bindGrid&&a.bindGrid(d,e);c.aspect(a,"onClose",function(a){d.headerRegions._doFocus(a)});return b}},0,1)}})});
//# sourceMappingURL=HeaderMenu.js.map