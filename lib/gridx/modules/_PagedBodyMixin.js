//>>built
define("gridx/modules/_PagedBodyMixin","dojo/_base/declare dojo/_base/lang dojo/query dojo/_base/array dojo/dom-construct dojo/dom-geometry dojo/dom-class dojo/_base/Deferred dojo/_base/sniff dijit/a11y".split(" "),function(v,m,q,s,r,y,h,n,p,t){return v([],{preload:function(){var a=this,b=a.grid,d=b.view;d.paging=1;d.rootStart=0;a._autoPageSize="auto"==a.arg("pageSize")||"auto"==b.pageSize;a.pageSize=a.pageSize||a.model._cache.pageSize||20;d.rootCount=a.pageSize;h.remove(a.domNode,"gridxBodyRowHoverEffect");
a.connect(a.domNode,"onscroll",function(c){b.hScrollerNode.scrollLeft=a.domNode.scrollLeft});a.aspect(a.model,"onSizeChange","_onSizeChange");a.aspect(b,"onHScroll","_onHScroll");a.arg("createBottom")&&(a._bottomNode=r.create("div",{"class":"gridxBodyBottom"}),a.createBottom(a._bottomNode),a.connect(a._bottomNode,"onmouseover",function(){q("\x3e .gridxRowOver",a.domNode).removeClass("gridxRowOver")}));a.arg("createTop")&&(a._topNode=r.create("div",{"class":"gridxBodyTop"}),a.createTop(a._topNode),
a.connect(a._topNode,"onmouseover",function(){q("\x3e .gridxRowOver",a.domNode).removeClass("gridxRowOver")}));a._initFocus()},_onHScroll:function(a){},_onSizeChange:function(a){this.grid.view.updateRootRange(0,a<this.pageSize?a:this.pageSize)},_initFocus:function(){var a=this.grid.focus,b=function(b,e,d){return b.parentNode?(a.stopEvent(e),(b=t._getTabNavigable(b)[0>d?"last":"first"])&&b.focus(),!!b):!1},d=function(a,b,d){return a.parentNode?(a=t._getTabNavigable(a),b?b.target==(0>d?a.first:a.last):
!0):!0};this.inherited(arguments);this._topNode&&a.registerArea({name:"bodyTop",priority:0.9999,focusNode:this._topNode,scope:this,doFocus:m.partial(b,this._topNode),doBlur:m.partial(d,this._topNode)});this._bottomNode&&a.registerArea({name:"bodyBottom",priority:1.0001,focusNode:this._bottomNode,scope:this,doFocus:m.partial(b,this._bottomNode),doBlur:m.partial(d,this._bottomNode)})},load:function(a,b){var d=this,c=d.grid.view;c._err&&d._loadFail(c._err);b.then(function(){if(d._autoPageSize){var a=
parseInt(1.5*(d.grid.mainNode.offsetHeight/d.arg("defaultRowHeight",24)),10);d.pageSize=a;c.updateRootRange(0,a)}d.loaded.callback()})},refresh:function(a){var b=this,d=b.grid.loadingNode,c=new n;delete b._err;h.add(d,"gridxLoading");b.grid.view.updateVisualCount().then(function(){try{b.renderStart=0;var e=b.renderCount=b.grid.view.visualCount;if("number"==typeof a&&0<=a){var l=e-a,g=q('\x3e [visualindex\x3d"'+a+'"]',b.domNode)[0],e=[],f=[];if(g){var k=b._buildRows(a,l,e,f);k&&r.place(k,g,"before")}for(;g&&
(!b._bottomNode||g!==b._bottomNode);){var w=g.nextSibling,x=parseInt(g.getAttribute("visualindex"),10),m=g.getAttribute("rowid");r.destroy(g);if(x>=a+l)b.onUnrender(m);g=w}s.forEach(f,b.onAfterRow,b);n.when(b._buildUncachedRows(e),function(){b.onRender(a,l);h.remove(d,"gridxLoading");c.callback()})}else b.renderRows(0,e,0,1),h.remove(d,"gridxLoading"),c.callback()}catch(u){b._loadFail(u),h.remove(d,"gridxLoading"),c.errback(u)}},function(a){b._loadFail(a);h.remove(d,"gridxLoading");c.errback(a)});
return c},renderRows:function(a,b,d){var c=this,e=c.grid,l=[],g=[],f=c.domNode,k=e.emptyNode;if(!c._err)if(0<b){k.innerHTML=c.arg("loadingInfo",e.nls.loadingInfo);k.style.zIndex="";d=c._buildRows(a,b,l,g);c.renderStart=a;c.renderCount=b;f.scrollTop=0;if(p("ie")||p("trident"))for(;f.childNodes.length;)f.removeChild(f.firstChild);f.innerHTML=d;c._topNode&&0<e.view.rootStart&&(d?f.insertBefore(c._topNode,f.firstChild):f.appendChild(c._topNode));c._bottomNode&&e.view.rootStart+e.view.rootCount<e.model.size()&&
f.appendChild(c._bottomNode);f.scrollLeft=e.hScrollerNode.scrollLeft;d?k.innerHTML="":k.style.zIndex=1;if(!c._skipUnrender)c.onUnrender();s.forEach(g,c.onAfterRow,c);n.when(c._buildUncachedRows(l),function(){c.onRender(a,b)})}else if(!{top:1,bottom:1}[d]){f.scrollTop=0;if(p("ie")||p("trident"))for(;f.childNodes.length;)f.removeChild(f.firstChild);f.innerHTML="";if(!c._skipUnrender)c.onUnrender();c.model.size()?f.appendChild(c._bottomNode):(k.innerHTML=c.arg("emptyInfo",e.nls.emptyInfo),k.style.zIndex=
1,c.onEmpty(),c.model.free())}},onRender:function(){var a=this.domNode;q(".gridxBodyFirstRow",a).removeClass("gridxBodyFirstRow");if(this._topNode){var b=this._topNode.nextSibling;b&&b!=this._bottomNode&&h.add(b,"gridxBodyFirstRow")}q(".gridxBodyLastRow",a).removeClass("gridxBodyLastRow");this._bottomNode&&(a=this._bottomNode.previousSibling)&&a!=this._topNode&&h.add(a,"gridxBodyLastRow")},_load:function(a){var b=this,d=b.grid,c=b.model,e=d.view,l=b.arg("pageSize"),g=a?b._bottomNode:b._topNode,f=
e.rootStart,k=e.rootCount,h=a?f:f<l?0:f-l,m=a?k+l:f+k-h,p=function(c,e){b._busy(a);b._onLoadFinish(!a,c,e,function(){b.onRender(c,e);d.indirectSelect&&d.indirectSelect._onSelectionChange()})};b._busy(a,1);c.when({start:a?f+k:h,count:a?l:f-h},function(){var f=c.size();a&&h+m>f&&(m=f-h);e.updateRootRange(h,m).then(function(){var h=a?b.renderCount:0,k=e.visualCount-b.renderCount;b.renderStart=0;b.renderCount=e.visualCount;if(k){for(var l=[],m=0;m<k;++m){var n=e.getRowInfo({visualIndex:h+m});c.isId(n.id)||
l.push({parentId:n.parentId,start:n.rowIndex,count:1})}c.when(l,function(){var c=[],m=d.bodyNode.scrollHeight,l;l=b._buildRows(h,k,[],c);g?r.place(l,g,a?"before":"after"):r.place(l,b.domNode,a?"last":"first");a||(d.bodyNode.scrollTop+=d.bodyNode.scrollHeight-m);(a&&g&&g.parentNode?e.rootStart+e.rootCount>=f:0===e.rootStart)&&b.domNode.removeChild(g);s.forEach(c,b.onAfterRow,b);p(h,k)})}else a&&(g&&g.parentNode&&e.rootStart+e.rootCount>=f)&&b.domNode.removeChild(g),a||q(".gridxBodyFirstRow").removeClass("gridxBodyFirstRow"),
p(h,k)})})}})});
//# sourceMappingURL=_PagedBodyMixin.js.map