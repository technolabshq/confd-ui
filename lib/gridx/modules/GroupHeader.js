//>>built
define("gridx/modules/GroupHeader","dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/sniff dojo/dom-class dojo/keys dojo/query ./Header".split(" "),function(t,v,q,w,x,r,n,g,y){t.experimental("gridx/modules/GroupHeader");return v(y,{preload:function(a){this.inherited(arguments);var b=this.grid,c=b._escapeId;b.columnResizer&&this.aspect(b.columnResizer,"onResize",function(a){var e=g('[colid\x3d"'+c(a)+'"]',b.headerNode)[0].offsetWidth-b.columnWidth._padBorder+"px";e!=
b._columnsById[a].width&&g('[colid\x3d"'+c(a)+'"]',b.domNode).forEach(function(a){a=a.style;a.width=e;a.minWidth=e;a.maxWidth=e})})},refresh:function(){this.inherited(arguments);this._curNode=0},_parse:function(){var a=this.grid._columns,b=a.length,c=0,f=0,e=this.arg("groups",[]),z=this._groupsById={},l=function(e,p,g){q.isArrayLike(e)||(e=[e]);p>f&&(f=p);for(var h=0,k=0;k<e.length;){var d=e[k];if(c>=b)e.splice(k,1);else if("number"==typeof d&&0<d){c+d>b&&(d=e[k]=b-c);for(var m=0;m<d;++m)a[c+m].groupId=
g;h+=d;c+=d;++k}else d&&q.isObject(d)?(q.isArrayLike(d.children)||(d.children=[d.children]),d.groupId=g,d.id=d.id||"group-"+p+"-"+a[c].id,d.level=p,d.start=c,m=l(d.children,p+1,d.id),d.children.length?(z[d.id]=d,d.colCount=m,h+=m,++k):e.splice(k,1)):e.splice(k,1)}return h};l(e,0);c<b&&e.push(b-c);return f},_configMoveColumn:function(){var a=this.grid;if(a.move&&a.move.column){var b=a.move.column.arg("constraints",{}),c;for(c in this._groupsById){var f=this._groupsById[c],e=f.start+f.colCount-1;if("number"!=
typeof b[f.start]||e<b[f.start])b[f.start]=e}var g=-1,l=0;w.forEach(a._columns,function(a,c){a.groupId||(c!=g+1&&(l=c),g=c,b[l]=c)})}},_build:function(){var a=this.grid,b=a.focus,c=a._columns.slice(),f=0,e=this._parse(),g=this.groups.slice(),l=['\x3ctable role\x3d"presentation" border\x3d"0" cellpadding\x3d"0" cellspacing\x3d"0"\x3e'];for(this._configMoveColumn();g.length;){l.push("\x3ctr\x3e");for(var n=0,p=0,t=g.length;p<t;++p){var h=g.shift();if("number"==typeof h){for(var k=0;k<h;++k){var d=c[n+
k],m=d.headerClass,s=d.headerStyle,u=d.width;d._domId=(a.id+"-"+d.id).replace(/\s+/,"");l.push('\x3ctd role\x3d"columnheader" aria-readonly\x3d"true" tabindex\x3d"-1" id\x3d"',d._domId,'" colid\x3d"',d.id,e-f?'" rowspan\x3d"'+(e-f+1):"",'" class\x3d"gridxCell ',f?"gridxSubHeader":"",b&&"header"==b.currentArea()&&d.id==this._focusHeaderId?this._focusClass:"",(m&&q.isFunction(m)?m(d):m)||"",'" style\x3d"width:',u,";min-width:",u,";max-width:",u,";",a.getTextDirStyle(d.id,d.name),(s&&q.isFunction(s)?
s(d):s)||"",'"\x3e\x3cdiv class\x3d"gridxSortNode"\x3e',d.name||"","\x3c/div\x3e\x3c/td\x3e")}c.splice(n,h)}else n+=h.colCount,g=g.concat(h.children),l.push('\x3ctd tabindex\x3d"-1" colspan\x3d"',h.colCount,'" class\x3d"gridxGroupHeader',f?" gridxSubHeader":"",'" groupid\x3d"',h.id,'"\x3e\x3cdiv class\x3d"gridxSortNode"\x3e',h.name||"","\x3c/div\x3e\x3c/td\x3e")}l.push("\x3c/tr\x3e");f++}l.push("\x3c/table\x3e");this.innerNode.innerHTML=l.join("");r.toggle(this.domNode,"gridxHeaderRowHidden",this.arg("hidden"));
r.add(a.domNode,"gridxGH")},_initFocus:function(){var a=this,b=a.grid;b.focus&&b.focus.registerArea({name:"header",priority:0,focusNode:a.innerNode,scope:a,doFocus:a._doFocus,doBlur:a._blurNode,onBlur:a._blurNode,connects:[a.connect(a.domNode,"onkeydown","_onKeyDown"),a.connect(a.domNode,"onmousedown",function(c){a._focusNode(g(c.target).closest("td",a.domNode)[0]);b.focus.currentArea()})]})},_doFocus:function(a,b){var c=this._curNode||g("td",this.domNode)[0];this._focusNode(c);return c},_focusNode:function(a){if(a){var b=
this,c=b.grid,f=b._focusHeaderId=a.getAttribute("colid");if(!f){var f=b._focusGroupId=a.getAttribute("groupid"),e=b._groupsById[f];e&&(f=c._columns[a.offsetLeft+a.offsetWidth>b.innerNode.scrollLeft+b.innerNode.clientWidth?e.start+e.colCount-1:e.start].id)}if(f&&c._columnsById[f])return b._blurNode(),c.hScroller&&c.hScroller.scrollToColumn(f),c.body._focusCellCol=c._columnsById[f].index,b._curNode=a,r.add(a,b._focusClass),setTimeout(function(){x("webkit")&&r.add(a,b._focusClass);a.focus();b._isMSIE()&&
(b.innerNode.scrollLeft=b._scrollLeft)},0),!0}return!1},_isMSIE:function(){var a=navigator.userAgent.toLowerCase();return(/msie/.test(a)||/trident/.test(a))&&!/opera/.test(a)},_blurNode:function(){var a=g("."+this._focusClass,this.innerNode)[0];a&&r.remove(a,this._focusClass);return!0},_getUpNode:function(a){var b=a.getAttribute("colid");a=a.getAttribute("groupid");return(b=this.grid._columnsById[b]||this._groupsById[a])&&g('[groupid\x3d"'+b.groupId+'"]',this.domNode)[0]},_getDownNode:function(a,
b){var c=this._groupsById[a.getAttribute("groupid")];if(c){var f=c.children[0];if("number"==typeof f)return this.getHeaderNode(this.grid._columns[c.start].id);c=g('[groupid\x3d"'+f.id+'"]',this.domNode);return b?c[c.length-1]:c[0]}},_getPrevNode:function(a){var b=a.previousSibling;b||(b=(b=(b=this._getUpNode(a))&&this._getPrevNode(b))&&this._getDownNode(b,1)||b);return b},_getNextNode:function(a){var b=a.nextSibling;b||(b=(b=(b=this._getUpNode(a))&&this._getNextNode(b))&&this._getDownNode(b)||b);
return b},_onKeyDown:function(a){var b=this.grid,c=this._curNode;if(!b._isCtrlKey(a)&&!a.altKey&&(a.keyCode==n.LEFT_ARROW||a.keyCode==n.RIGHT_ARROW)){if(b.focus.stopEvent(a),b=b.isLeftToRight()^a.keyCode==n.RIGHT_ARROW?this._getPrevNode(c):this._getNextNode(c))if(this._focusHeaderId=b.getAttribute("colid"),this._focusGroupId=b.getAttribute("groupid"),this._focusNode(b),this._focusHeaderId)this.onMoveToHeaderCell(this._focusHeaderId,a)}else a.keyCode==n.UP_ARROW?(b.focus.stopEvent(a),this._focusNode(this._getUpNode(c))):
a.keyCode==n.DOWN_ARROW&&(b.focus.stopEvent(a),this._focusNode(this._getDownNode(c)))}})});
//# sourceMappingURL=GroupHeader.js.map